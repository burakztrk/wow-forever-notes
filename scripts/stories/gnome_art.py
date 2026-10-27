#!/usr/bin/env python3
"""Generates src/lib/stories/gnome-art.ts: the maps and drawings of the Gnome story.

Run from the repo root:  python3 scripts/stories/gnome_art.py   (helpers in art_lib.py)
"""
from art_lib import *  # noqa: F401,F403

PUBLIC = ROOT / "public" / "stories" / "gnome"


def ek_svg():
    r = random.Random(5)
    glyphs = []
    tries = 0
    while len(glyphs) < 24 and tries < 4000:
        tries += 1
        x, y = r.uniform(235, 465), r.uniform(425, 552)
        if not in_poly(x, y, KM_PTS):
            continue
        if 340 < x < 462 and 512 < y < 538:  # label area
            continue
        if math.hypot(x - 322, y - 476) < 22 or math.hypot(x - 264, y - 468) < 22:
            continue
        if any(math.hypot(x - gx, y - gy) < 17 for gx, gy in glyphs):
            continue
        glyphs.append((x, y))
    g_mt = "".join(f'<path class="mt" d="{mtn(x, y, r.uniform(.8, 1.2))}"/>' for x, y in glyphs)
    # a few peaks in Alterac and Lordaeron
    extra = [(250, 318), (268, 330), (232, 334), (420, 300), (436, 286), (404, 312)]
    g_mt += "".join(f'<path class="mt" d="{mtn(x, y, .9)}"/>' for x, y in extra)

    QT, LD, IF, GN, SW, DP = (360, 64), (232, 152), (322, 476), (264, 468), (262, 594), (438, 684)

    def route(pts, cls, headcls=None):
        d = smooth_open(pts)
        s = f'<path class="rt {cls} draw" pathLength="1" d="{d}"/>'
        if headcls:
            s += head(*pts[-1], end_angle(pts), headcls)
        return s

    l1 = (f'<g class="ly on" data-ly="1">'
          + route([GN, (292, 462), IF], "gold") +
          f'<circle class="pulse-ring" cx="{GN[0]}" cy="{GN[1]}" r="14"/>'
          f'<circle class="pulse-ring d2" cx="{IF[0]}" cy="{IF[1]}" r="14"/>'
          + ftext(293, 446, "%%neighbours%%") + '</g>')
    horde = [DP, (400, 664), (350, 640), (298, 616), (270, 600)]
    l2 = ('<g class="ly" data-ly="2">' + route(horde, "horde", "horde") +
          f'<circle class="ruin" cx="{SW[0]}" cy="{SW[1]}" r="16"/>'
          + ftext(262, 628, "%%swFalls%%") + ftext(372, 668, "%%hordeInvasion%%", "ft dim") + '</g>')
    l3 = ('<g class="ly" data-ly="3">'
          + route([QT, (300, 96), (244, 142)], "al", "al")
          + route([IF, (330, 400), (292, 300), (240, 164)], "al", "al")
          + route([GN, (238, 380), (218, 262), (228, 166)], "al", "al")
          + route([SW, (190, 566), (148, 430), (128, 300), (170, 200), (222, 158)], "al dash", "al")
          + f'<circle class="banner" cx="{LD[0]}" cy="{LD[1]}" r="18"/>'
          + ftext(232, 122, "Alliance of Lordaeron") + ftext(126, 380, "%%swRefugees%%", "ft dim") + '</g>')
    push = [(236, 176), (250, 300), (300, 400), (350, 500), (392, 572), (426, 664)]
    l4 = ('<g class="ly" data-ly="4">' + route(push, "al wide", "al")
          + route([IF, (362, 520), (390, 560)], "al")
          + f'<circle class="banner gold" cx="{DP[0]}" cy="{DP[1]}" r="18"/>'
          + ftext(438, 724, "%%toPortal%%") + ftext(196, 300, "%%allianceOffensive%%", "ft dim") + '</g>')
    west = [(146, 300), (90, 300), (22, 300)]
    l5 = ('<g class="ly" data-ly="5">'
          f'<circle class="tox-ring" cx="{GN[0]}" cy="{GN[1]}" r="26"/>'
          + ftext(264, 432, "%%gnCrisis%%")
          + route(west, "mute dash", "mute")
          + ftext(20, 286, "Kalimdor · Mount Hyjal", "ft dim", "start")
          + f'<circle class="scourge" cx="{LD[0]}" cy="{LD[1]}" r="18"/>'
          + ftext(232, 188, "Scourge") + '</g>')

    pins = (pin(*QT, "Quel'Thalas", "r") + pin(*LD, "Lordaeron", "r") + pin(*IF, "Ironforge", "r", "pin-if") +
            pin(*GN, "Gnomeregan", "l", "pin-gn") + pin(*SW, "Stormwind", "l", "pin-sw") +
            pin(*DP, "Dark Portal", "r", "pin-dp"))
    rl = (ftext(320, 250, "LORDAERON", "rl") + ftext(400, 526, "KHAZ MODAN", "rl") +
          ftext(300, 662, "STORMWIND", "rl"))
    cams = {1: [196, 380, 300, 220], 2: [200, 520, 290, 200], 3: [110, 30, 330, 600], 4: [120, 110, 360, 620], 5: [0, 0, 500, 760]}
    return (f'<svg id="ek" class="map" viewBox="196 380 300 220" data-cams=\'{json.dumps(cams, separators=(",", ":"))}\' role="img" '
            f'aria-label="%%ekAria%%">'
            f'<defs>{grid_def("gEK")}</defs>'
            f'<rect x="-400" y="-400" width="1400" height="1600" fill="url(#gEK)"/>'
            f'<path class="halo" d="{EK_D}"/><path class="land" d="{EK_D}"/><path class="km" d="{KM_D}"/>'
            f'<g>{g_mt}</g>{rl}{l1}{l2}{l3}{l4}{l5}{pins}</svg>')



# ---------- Dun Morogh ----------
DM_PTS = [(60, 190), (110, 120), (200, 92), (300, 84), (410, 70), (520, 76), (630, 92), (720, 135),
          (760, 215), (735, 295), (660, 350), (540, 382), (420, 392), (300, 388), (190, 365), (110, 320),
          (62, 260)]


def dm_svg():
    r = random.Random(9)
    poly = jitter_closed(DM_PTS, 9, r)
    D = smooth_closed(poly)
    cx = sum(p[0] for p in DM_PTS) / len(DM_PTS)
    cy = sum(p[1] for p in DM_PTS) / len(DM_PTS)
    glyphs = []
    n = len(DM_PTS)
    for _ in range(140):
        i = r.randrange(n)
        a, b = DM_PTS[i], DM_PTS[(i + 1) % n]
        t = r.random()
        x, y = a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t
        vx, vy = x - cx, y - cy
        L = math.hypot(vx, vy)
        d = r.uniform(4, 40)
        x, y = x + vx / L * d, y + vy / L * d
        if not (8 < x < 792 and 10 < y < 432):
            continue
        if any(math.hypot(x - gx, y - gy) < 16 for gx, gy, _s in glyphs):
            continue
        glyphs.append((x, y, r.uniform(.9, 1.5)))
    # the Ironforge mountain
    for _ in range(40):
        a = r.uniform(math.pi * 1.05, math.pi * 1.95)
        rad = r.uniform(26, 62)
        x, y = 588 + math.cos(a) * rad, 150 + math.sin(a) * rad * .8
        if any(math.hypot(x - gx, y - gy) < 15 for gx, gy, _s in glyphs):
            continue
        glyphs.append((x, y, r.uniform(1.1, 1.6)))
    g_mt = "".join(f'<path class="mt" d="{mtn(x, y, s)}"/>' for x, y, s in glyphs)
    snow = []
    while len(snow) < 70:
        x, y = r.uniform(70, 750), r.uniform(80, 390)
        if in_poly(x, y, DM_PTS):
            snow.append(f'<circle cx="{f(x)}" cy="{f(y)}" r="{r.choice([1, 1.3, 1.7])}"/>')

    GN, NT, KH, IF, CV = (118, 198), (180, 262), (425, 255), (588, 148), (330, 350)
    exile = [GN, (190, 214), (270, 236), (350, 252), KH, (495, 226), (548, 184), (580, 156)]
    back = [(584, 160), (566, 220), (500, 292), (400, 312), (290, 296), (196, 268)]
    ex_d, bk_d = smooth_open(exile), smooth_open(back)
    road = smooth_open([(28, 214), GN, (190, 214), (270, 236), (350, 252), KH, (495, 226), (548, 184), IF,
                        (660, 196), (770, 236)])

    routes = (
        f'<defs><mask id="mEx" maskUnits="userSpaceOnUse" x="0" y="0" width="800" height="440">'
        f'<path d="{ex_d}" pathLength="1" stroke="#fff" stroke-width="18" fill="none" stroke-dasharray="1 1" stroke-dashoffset="0" data-r="0.05,0.5"/></mask>'
        f'<mask id="mBk" maskUnits="userSpaceOnUse" x="0" y="0" width="800" height="440">'
        f'<path d="{bk_d}" pathLength="1" stroke="#fff" stroke-width="18" fill="none" stroke-dasharray="1 1" stroke-dashoffset="0" data-r="0.55,0.95"/></mask>'
        f'<radialGradient id="tox"><stop offset="0" stop-color="#7bdc5c" stop-opacity=".55"/>'
        f'<stop offset=".6" stop-color="#3f8a3a" stop-opacity=".25"/><stop offset="1" stop-color="#3f8a3a" stop-opacity="0"/></radialGradient>'
        f'{grid_def("gDM", 40)}</defs>'
        f'<path class="road" d="{road}"/>'
        f'<path class="rt rage dashed" d="{ex_d}" mask="url(#mEx)"/>'
        f'<path class="rt gold dashed" d="{bk_d}" mask="url(#mBk)"/>'
    )
    heads = (f'<g data-show="0.5">{head(*exile[-1], end_angle(exile), "rage")}</g>'
             f'<g data-show="0.95">{head(*back[-1], end_angle(back), "gold")}</g>')
    pins = (pin(*GN, "Gnomeregan", "t", "", 1) +
            f'<g data-show="0.93">{pin(*NT, "New Tinkertown", "b", "", 2)}</g>' +
            pin(*KH, "Kharanos", "b", "", 3) +
            f'<g data-show="0.48">{pin(*IF, "Ironforge · Tinker Town", "r", "", 4)}</g>' +
            pin(*CV, "Coldridge Valley", "b", "", 5))
    labels = (ftext(400, 120, "DUN MOROGH", "rl") + ftext(252, 154, "Iceflow Lake", "ft lake") +
              ftext(792, 214, "Loch Modan →", "ft dim", "end") +
              ftext(296, 222, "%%exile%%", "ft rage") + ftext(420, 336, "Operation Gnomeregan", "ft goldt"))
    return (f'<svg class="map numbered" viewBox="0 0 800 440" role="img" '
            f'aria-label="%%dmAria%%">'
            f'<rect width="800" height="440" fill="url(#gDM)"/>'
            f'{routes.split("</defs>")[0]}</defs>'
            f'<path class="halo" d="{D}"/><path class="land snowy" d="{D}"/>'
            f'<g class="snowdots">{"".join(snow)}</g>'
            f'<ellipse class="lakef" cx="252" cy="150" rx="40" ry="19"/>'
            f'<circle class="toxzone" cx="{GN[0]}" cy="{GN[1]}" r="52" fill="url(#tox)"/>'
            f'<g>{g_mt}</g>'
            f'<circle class="ttown" cx="{IF[0]}" cy="{IF[1]}" r="20"/>'
            f'{routes.split("</defs>")[1]}{labels}{heads}{pins}</svg>')



def world_svg():
    land = world_base()
    IF, DP, FZ, TS, UL, HY = (722, 348), (787, 457), (380, 96), (912, 96), (548, 46), (225, 172)
    r1 = [IF, (660, 280), (580, 200), (480, 140), (392, 102)]
    r2 = [IF, (752, 400), DP, (860, 430), (915, 330), (930, 220), (914, 108)]
    d1, d2 = smooth_open(r1), smooth_open(r2)
    defs = (f'<defs>{grid_def("gW", 50)}'
            f'<mask id="mW1" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="520">'
            f'<path d="{d1}" pathLength="1" stroke="#fff" stroke-width="18" fill="none" stroke-dasharray="1 1" stroke-dashoffset="0" data-r="0.05,0.55"/></mask>'
            f'<mask id="mW2" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="520">'
            f'<path d="{d2}" pathLength="1" stroke="#fff" stroke-width="18" fill="none" stroke-dasharray="1 1" stroke-dashoffset="0" data-r="0.3,0.95"/></mask></defs>')
    pins = (pin(*UL, "%%ulduarOrigin%%", "r", "origin", 1) +
            f'<g data-show="0.53">{pin(*FZ, "Fizzcrank Airstrip", "l", "", 2)}</g>' +
            pin(*IF, "Ironforge", "l", "", 3) +
            pin(*DP, "Dark Portal", "l", "", 4) +
            f'<g data-show="0.93">{pin(*TS, "Toshley&#8217;s Station", "t", "", 5)}</g>' +
            pin(*HY, "Mount Hyjal", "r", "faded", 6))
    labels = world_labels()
    return (f'<svg class="map numbered" viewBox="0 0 1000 520" role="img" '
            f'aria-label="%%worldAria%%">'
            f'{defs}<rect width="1000" height="520" fill="url(#gW)"/>'
            f'{land}'
            f'<path class="rt gold dashed" d="{d1}" mask="url(#mW1)"/>'
            f'<path class="rt gold dashed" d="{d2}" mask="url(#mW2)"/>'
            f'{labels}'
            f'<g data-show="0.55">{head(*r1[-1], end_angle(r1), "gold")}</g>'
            f'<g data-show="0.95">{head(*r2[-1], end_angle(r2), "gold")}</g>'
            f'{pins}</svg>')




def gearpair_svg():
    big = chunky_gear(12, 80, 104)
    small = chunky_gear(8, 50, 72, r_tip=6, r_root=5)
    BX, BY = 150, 165
    a = math.radians(-30)
    SX, SY = BX + 153 * math.cos(a), BY + 153 * math.sin(a)
    cx, cy = BX + 92 * math.cos(a), BY + 92 * math.sin(a)

    def gear(gid, path_id, cxg, cyg, rot, body, rim, ink, ring, R1, R2, name):
        return f"""
<g transform="translate({f(cxg)},{f(cyg)})">
  <g transform="translate(4,7)" opacity=".55" filter="url(#gShadow)"><g data-gear="{gid}" transform="rotate({rot})"><use href="#{path_id}" fill="#000"/></g></g>
  <g data-gear="{gid}" transform="rotate({rot})">
    <use href="#{path_id}" fill="none" stroke="{ink}" stroke-width="7" stroke-linejoin="round"/>
    <use href="#{path_id}" fill="url(#{body})" filter="url(#gGrain)"/>
    <use href="#{path_id}" fill="none" stroke="url(#{rim})" stroke-width="2.5" stroke-linejoin="round" transform="scale(.955)"/>
  </g>
  <circle r="{R1 + 3}" fill="#000" opacity=".35" transform="translate(2,4)" filter="url(#gShadow)"/>
  <circle r="{R1}" fill="url(#{ring})" stroke="{ink}" stroke-width="5" filter="url(#gGrain)"/>
  <circle r="{R1 - 4}" fill="none" stroke="url(#gRingHi)" stroke-width="2.5"/>
  <circle r="{R2}" fill="#0e1015" stroke="{ink}" stroke-width="5"/>
  <path d="M{f(-R2 + 3)},{f(2)}A{f(R2 - 3)},{f(R2 - 3)} 0 0 1 {f(R2 - 3)},{f(2)}" fill="none" stroke="#000" stroke-opacity=".5" stroke-width="4" transform="rotate(-20)"/>
</g>"""

    defs = f"""<defs>
<path id="gpBig" d="{big}"/><path id="gpSmall" d="{small}"/>
<filter id="gShadow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3"/></filter>
<filter id="gGrain" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7" result="n"/>
  <feColorMatrix in="n" type="saturate" values="0" result="g"/>
  <feComponentTransfer in="g" result="t"><feFuncR type="linear" slope=".42" intercept=".7"/><feFuncG type="linear" slope=".42" intercept=".7"/><feFuncB type="linear" slope=".42" intercept=".7"/><feFuncA type="linear" slope="0" intercept="1"/></feComponentTransfer>
  <feBlend in="SourceGraphic" in2="t" mode="multiply" result="b"/>
  <feComposite in="b" in2="SourceGraphic" operator="in"/>
</filter>
<linearGradient id="gIronBody" x1="0" y1="0" x2="1" y2="1" data-gear-grad="big" gradientTransform="rotate(15 .5 .5)"><stop offset="0" stop-color="#868a91"/><stop offset=".42" stop-color="#4b4e54"/><stop offset="1" stop-color="#1c1d21"/></linearGradient>
<linearGradient id="gIronRim" x1="0" y1="0" x2="1" y2="1" data-gear-grad="big" gradientTransform="rotate(15 .5 .5)"><stop offset="0" stop-color="#c9ccd2" stop-opacity=".75"/><stop offset=".45" stop-color="#c9ccd2" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient>
<linearGradient id="gBronzeBody" x1="0" y1="0" x2="1" y2="1" data-gear-grad="small" gradientTransform="rotate(-15 .5 .5)"><stop offset="0" stop-color="#e9b465"/><stop offset=".45" stop-color="#b3722f"/><stop offset="1" stop-color="#5f3512"/></linearGradient>
<linearGradient id="gBronzeRim" x1="0" y1="0" x2="1" y2="1" data-gear-grad="small" gradientTransform="rotate(-15 .5 .5)"><stop offset="0" stop-color="#ffe2a3" stop-opacity=".8"/><stop offset=".45" stop-color="#ffe2a3" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient>
<linearGradient id="gGoldRing" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe7a1"/><stop offset=".5" stop-color="#e2a940"/><stop offset="1" stop-color="#94591a"/></linearGradient>
<linearGradient id="gSteelRing" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a7abb2"/><stop offset=".5" stop-color="#62656c"/><stop offset="1" stop-color="#2c2e33"/></linearGradient>
<linearGradient id="gRingHi" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient>
</defs>"""
    return (f'<svg viewBox="0 0 420 310" role="img" aria-label="%%gearsAria%%">'
            f'{defs}'
            f'{gear("big", "gpBig", BX, BY, -15, "gIronBody", "gIronRim", "#0b0c0f", "gSteelRing", 50, 19, "Dwarf")}'
            f'{gear("small", "gpSmall", SX, SY, 15, "gBronzeBody", "gBronzeRim", "#241304", "gGoldRing", 33, 12, "Gnome")}'
            f'<g class="spark"><circle cx="{f(cx + 4)}" cy="{f(cy - 6)}" r="2.5"/><circle cx="{f(cx + 12)}" cy="{f(cy - 15)}" r="1.8"/><circle cx="{f(cx - 4)}" cy="{f(cy - 16)}" r="1.4"/></g>'
            f'<text class="gtxt" x="{BX}" y="300" text-anchor="middle">Dwarf</text>'
            f'<text class="gtxt" x="{f(SX + 84)}" y="{f(SY + 6)}" text-anchor="start">Gnome</text>'
            f'</svg>')



# ---------- Gnomeregan cross-section ----------
def scene_svg():
    r = random.Random(17)
    floors = [160, 242, 322]
    plates = "".join(f'<rect x="108" y="{y}" width="512" height="7" rx="2" fill="#2a3040"/>' for y in floors)
    bld, wins = "", ""
    for fy in floors:
        x = 122
        while x < 590:
            w = r.choice([34, 42, 50, 58])
            h = r.choice([34, 40, 46, 52])
            if x + w > 610:
                break
            bx, by = x, fy - h
            bld += f'<rect x="{bx}" y="{by}" width="{w}" height="{h}" rx="3" fill="#1b1f2b" stroke="#2a2f3d"/>'
            if r.random() < .5:
                bld += f'<path d="M{bx + w / 2} {by}v-10" stroke="#3a3f4d" stroke-width="3"/>'
            for wx in range(bx + 7, bx + w - 6, 11):
                for wy in range(by + 8, fy - 8, 13):
                    wins += f'<rect class="win" data-y="{wy}" x="{wx}" y="{wy}" width="5" height="6" rx="1"/>'
            x += w + r.choice([8, 14, 20])
    pipes = "".join(f'<path d="M{x} 74V320" stroke="#3a3f4d" stroke-width="6"/>' for x in (214, 438, 566))
    joints = "".join(f'<rect x="{x - 6}" y="{y - 4}" width="12" height="8" rx="2" fill="#4a4f5e"/>'
                     for x in (214, 438, 566) for y in (120, 202, 284))
    vents = "".join(f'<g transform="translate({x},332)"><rect x="-14" y="-3" width="28" height="9" rx="2" fill="#2a3040"/>'
                    f'<path d="M-9 -3v9M-3 -3v9M3 -3v9M9 -3v9" stroke="#12151c" stroke-width="2"/></g>'
                    for x in (170, 340, 520))
    cracks = ('<path d="M150 420L162 388L150 364L168 336" /><path d="M300 420L292 392L310 370L298 340" />'
              '<path d="M470 420L486 396L474 372L492 344" /><path d="M590 420L578 380L596 352" />')
    troggs = ""
    order = [("brown", 150, 66, False), ("blue", 228, 62, True), ("grey", 306, 70, False), ("purple", 378, 64, True),
             ("white", 446, 62, False), ("red", 524, 68, True), ("orange", 600, 60, False)]
    for name, x, hgt, flip in order:
        w0, h0 = webp_size(PUBLIC / f"trogg-{name}.webp")
        wd = hgt * w0 / h0
        tf = f' transform="translate({f(2 * x)},0) scale(-1,1)"' if flip else ""
        troggs += (f'<image href="%%base%%stories/gnome/trogg-{name}.webp" x="{f(x - wd / 2)}" y="{f(424 - hgt)}"'
                   f' width="{f(wd)}" height="{hgt}" preserveAspectRatio="xMidYMax meet"{tf}/>')
    wave = "M0 0" + "".join(f"Q{x + 40} -12 {x + 80} 0T{x + 160} 0" for x in range(0, 1440, 160)) + "V420H0Z"
    valve_spokes = "".join(
        f'<path d="M0 0L{P(math.cos(a) * 12, math.sin(a) * 12)}"/>' for a in [i * math.pi / 3 for i in range(6)])
    surf_cog = gear_d(14, 24, 31, 0)
    labels = "".join(ftext(14, y, t, "slbl", "start") for y, t in
                     ((60, "%%sSurface%%"), (150, "%%sUpper%%"), (232, "%%sWorks%%"), (312, "%%sLower%%"), (396, "%%sTunnels%%")))
    return f'''<svg class="map" viewBox="0 0 640 420" role="img" aria-label="%%sceneAria%%">
<defs><linearGradient id="gasG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7bdc5c" stop-opacity=".62"/><stop offset=".25" stop-color="#3f8a3a" stop-opacity=".42"/><stop offset="1" stop-color="#3f8a3a" stop-opacity=".3"/></linearGradient>
<clipPath id="cave"><rect x="0" y="74" width="640" height="346"/></clipPath></defs>
<rect width="640" height="420" fill="#12151c"/>
<path d="M0 40L60 18L120 34L190 8L260 30L330 14L410 34L480 10L560 30L640 16V74H0Z" fill="#1d2130"/>
<path d="M0 74Q80 62 160 72T320 68T480 74T640 66V82H0Z" fill="#d8dde6" opacity=".22"/>
<g transform="translate(580,74)"><path d="{surf_cog}" fill="#1d2130" stroke="#8a7440" stroke-width="2"/><circle r="9" fill="#c8a656"/></g>
<g stroke="#1b1f29" stroke-width="2" fill="none"><path d="M0 120Q160 110 300 126T640 118"/><path d="M0 356Q200 344 380 360T640 350"/></g>
{pipes}{joints}{plates}<g>{bld}</g><g class="wins2">{wins}</g>{vents}
<g transform="translate(214,93)"><g class="valve"><circle r="13" fill="none" stroke="#c8a656" stroke-width="3"/><g stroke="#c8a656" stroke-width="2">{valve_spokes}</g><circle r="3" fill="#c8a656"/></g></g>
<g stroke="#262b38" stroke-width="3" fill="none">{cracks}</g>
<g clip-path="url(#cave)"><g class="flood" transform="translate(0,300)"><g class="flood-wave"><path d="{wave}" fill="url(#gasG)"/></g></g>
<g class="risers" transform="translate(0,0)">{troggs}</g></g>
{labels}
</svg>'''




def icons():
    cog_g = gear_d(10, 13, 17, 0, 20, 22)
    tre = "".join(
        f'<path d="M20 22L{P(20 + math.cos(a - .5) * 9, 22 + math.sin(a - .5) * 9)}A9 9 0 0 1 '
        f'{P(20 + math.cos(a + .5) * 9, 22 + math.sin(a + .5) * 9)}Z" fill="currentColor" stroke="none"/>'
        for a in (-math.pi / 2, math.pi / 6, math.pi * 5 / 6))
    return {
        "cog": f'<path d="{gear_d(9, 11, 15.5, 5, 24, 24)}"/>',
        "gnomeregan": f'<path d="{cog_g}"/>{tre}<circle cx="20" cy="22" r="2.2" fill="var(--bg-elev)" stroke="none"/>',
        "newTinkertown": f'<path d="{gear_d(10, 10, 14, 4, 20, 28)}"/><path d="M20 14V3h11l-3 4 3 4H20"/>',
        "sepCog": gear_d(10, 9, 13, 4),
        "brandCog": gear_d(10, 7, 10, 3.2, 12, 12),
    }


def main():
    write_ts(LIB / "gnome-art.ts", "GNOME_ART", {
        "gears": gearpair_svg(),
        "ek": ek_svg(),
        "scene": scene_svg(),
        "dm": dm_svg(),
        "world": world_svg(),
        "icons": icons(),
    })


if __name__ == "__main__":
    main()
