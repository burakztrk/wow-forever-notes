#!/usr/bin/env python3
"""Generates src/lib/stories/gnome-art.ts: the maps and drawings of the Gnome story.

Run from the repo root:  python3 scripts/stories/gnome_art.py   (helpers in art_lib.py)
"""
from art_lib import *  # noqa: F401,F403

PUBLIC = ROOT / "public" / "stories" / "gnome"


EK_IMG = '<image class="map-img" href="%%base%%maps/eastern-kingdoms.webp" width="1002" height="668"/>'
DM_IMG = '<image class="map-img" href="%%base%%maps/dun-morogh.webp" width="1002" height="668"/>'


def route(pts, cls, headcls=None):
    s = f'<path class="rt {cls} draw" pathLength="1" d="{smooth_open(pts)}"/>'
    if headcls:
        s += head(*pts[-1], end_angle(pts), headcls)
    return s


def ek_svg():
    """The Eastern Kingdoms game map; one layer and one camera per step of chapter III."""
    QT, LD, IF, GN, SW, DP = (615, 70), (468, 155), (455, 372), (420, 368), (440, 500), (538, 545)

    l1 = (f'<g class="ly on" data-ly="1">'
          + route([GN, (437, 360), IF], "gold") +
          f'<circle class="pulse-ring" cx="{GN[0]}" cy="{GN[1]}" r="12"/>'
          f'<circle class="pulse-ring d2" cx="{IF[0]}" cy="{IF[1]}" r="12"/>'
          + ftext(437, 344, "%%neighbours%%") + '</g>')
    horde = [DP, (515, 538), (488, 524), (462, 510), SW]
    l2 = ('<g class="ly" data-ly="2">' + route(horde, "horde", "horde") +
          f'<circle class="ruin" cx="{SW[0]}" cy="{SW[1]}" r="14"/>'
          + ftext(SW[0], SW[1] + 30, "%%swFalls%%") + ftext(520, 575, "%%hordeInvasion%%", "ft dim") + '</g>')
    l3 = ('<g class="ly" data-ly="3">'
          + route([QT, (565, 105), (510, 135), (482, 150)], "al", "al")
          + route([IF, (472, 320), (490, 240), (476, 172)], "al", "al")
          + route([GN, (412, 318), (424, 236), (458, 172)], "al", "al")
          + route([SW, (404, 478), (382, 400), (386, 300), (420, 220), (456, 166)], "al dash", "al")
          + f'<circle class="banner" cx="{LD[0]}" cy="{LD[1]}" r="16"/>'
          + ftext(LD[0], LD[1] - 26, "Alliance of Lordaeron") + ftext(372, 400, "%%swRefugees%%", "ft dim", "end") + '</g>')
    push = [(470, 172), (482, 260), (470, 330), (482, 420), (510, 490), (532, 532)]
    l4 = ('<g class="ly" data-ly="4">' + route(push, "al wide", "al")
          + route([IF, (482, 408), (500, 446)], "al")
          + f'<circle class="banner gold" cx="{DP[0]}" cy="{DP[1]}" r="16"/>'
          + ftext(DP[0], DP[1] + 32, "%%toPortal%%") + ftext(498, 262, "%%allianceOffensive%%", "ft dim", "start") + '</g>')
    west = [(392, 300), (340, 300), (286, 300)]
    l5 = ('<g class="ly" data-ly="5">'
          f'<circle class="tox-ring" cx="{GN[0]}" cy="{GN[1]}" r="22"/>'
          + ftext(GN[0] - 6, GN[1] + 34, "%%gnCrisis%%")
          + route(west, "mute dash", "mute")
          + ftext(286, 286, "Kalimdor · Mount Hyjal", "ft dim", "start")
          + f'<circle class="scourge" cx="{LD[0]}" cy="{LD[1]}" r="16"/>'
          + ftext(LD[0], LD[1] + 32, "Scourge") + '</g>')

    pins = (pin(*QT, "Quel'Thalas", "r") + pin(*LD, "Lordaeron", "r") + pin(*IF, "Ironforge", "r", "pin-if") +
            pin(*GN, "Gnomeregan", "l", "pin-gn") + pin(*SW, "Stormwind", "l", "pin-sw") +
            pin(*DP, "Dark Portal", "r", "pin-dp"))
    cams = {1: [355, 305, 200, 150], 2: [370, 430, 240, 180], 3: [330, 20, 340, 560], 4: [330, 70, 340, 560],
            5: [250, 30, 440, 620]}
    c1 = " ".join(str(n) for n in cams[1])
    return (f'<svg id="ek" class="map" viewBox="{c1}" data-cams=\'{json.dumps(cams, separators=(",", ":"))}\' role="img" '
            f'aria-label="%%ekAria%%">{EK_IMG}{l1}{l2}{l3}{l4}{l5}{pins}</svg>')


# ---------- Dun Morogh ----------
def dm_svg():
    """The Dun Morogh game map with the exile and Operation Gnomeregan routes drawn on top."""
    GN, NT, KH, IF, CV = (225, 240), (250, 302), (448, 345), (445, 215), (282, 470)
    exile = [GN, (262, 268), (338, 292), (410, 318), KH, (474, 300), (452, 250), (447, 224)]
    back = [(452, 226), (470, 290), (430, 362), (350, 360), (290, 330), (258, 310)]
    ex_d, bk_d = smooth_open(exile), smooth_open(back)
    defs = (f'<defs><mask id="mEx" maskUnits="userSpaceOnUse" x="0" y="0" width="1002" height="668">'
            f'<path d="{ex_d}" pathLength="1" stroke="#fff" stroke-width="18" fill="none" stroke-dasharray="1 1" stroke-dashoffset="0" data-r="0.05,0.5"/></mask>'
            f'<mask id="mBk" maskUnits="userSpaceOnUse" x="0" y="0" width="1002" height="668">'
            f'<path d="{bk_d}" pathLength="1" stroke="#fff" stroke-width="18" fill="none" stroke-dasharray="1 1" stroke-dashoffset="0" data-r="0.55,0.95"/></mask>'
            f'<radialGradient id="tox"><stop offset="0" stop-color="#7bdc5c" stop-opacity=".6"/>'
            f'<stop offset=".6" stop-color="#3f8a3a" stop-opacity=".28"/><stop offset="1" stop-color="#3f8a3a" stop-opacity="0"/></radialGradient></defs>')
    routes = (f'<path class="rt rage dashed" d="{ex_d}" mask="url(#mEx)"/>'
              f'<path class="rt gold dashed" d="{bk_d}" mask="url(#mBk)"/>')
    heads = (f'<g data-show="0.5">{head(*exile[-1], end_angle(exile), "rage")}</g>'
             f'<g data-show="0.95">{head(*back[-1], end_angle(back), "gold")}</g>')
    pins = (pin(*GN, "Gnomeregan", "t", "", 1) +
            f'<g data-show="0.93">{pin(*NT, "New Tinkertown", "b", "", 2)}</g>' +
            pin(*KH, "Kharanos", "b", "", 3) +
            f'<g data-show="0.48">{pin(*IF, "Ironforge · Tinker Town", "t", "", 4)}</g>' +
            pin(*CV, "Coldridge Valley", "b", "", 5))
    labels = (ftext(330, 262, "%%exile%%", "ft rage") + ftext(380, 392, "Operation Gnomeregan", "ft goldt"))
    return (f'<svg class="map numbered" viewBox="90 120 820 420" role="img" aria-label="%%dmAria%%">{defs}{DM_IMG}'
            f'<circle class="toxzone" cx="{GN[0]}" cy="{GN[1]}" r="48" fill="url(#tox)"/>'
            f'<circle class="ttown" cx="{IF[0]}" cy="{IF[1]}" r="18"/>'
            f'{routes}{labels}{heads}{pins}</svg>')


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
