#!/usr/bin/env python3
"""Generates src/lib/stories/dwarf-art.ts: the maps and drawings of the Dwarf story.

Run from the repo root:  python3 scripts/stories/dwarf_art.py   (helpers in art_lib.py)
"""
from art_lib import *  # noqa: F401,F403

# clan colours: Bronzebeard gold, Wildhammer storm teal, Dark Iron ember red
CLAN = {"bronze": "#c8a656", "wild": "#4fb3a9", "dark": "#c0392b"}


# ---------- Three hammers (painted, they drift apart as the clans split) ----------
def hammer(head_grad, head_ink, rune=None):
    """A war hammer pointing up; local origin at the handle's middle."""
    head = rounded_poly([(-50, -128), (50, -128), (50, -78), (-50, -78)], [9, 9, 9, 9])
    face = rounded_poly([(-58, -122), (-50, -122), (-50, -84), (-58, -84)], [3, 3, 3, 3])
    face2 = rounded_poly([(50, -122), (58, -122), (58, -84), (50, -84)], [3, 3, 3, 3])
    rune_s = ""
    if rune:
        rune_s = (f'<path d="M-14 -112L0 -94L14 -112M0 -94V-86" fill="none" stroke="{rune}" stroke-width="4" '
                  f'stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>')
    return (
        f'<rect x="-7" y="-80" width="14" height="168" rx="5" fill="url(#hHandle)" stroke="#1a0f06" stroke-width="4"/>'
        f'<path d="M-7 40H7M-7 52H7M-7 64H7" stroke="#1a0f06" stroke-width="3"/>'
        f'<circle cy="94" r="11" fill="url(#{head_grad})" stroke="{head_ink}" stroke-width="4"/>'
        f'<path d="{face}" fill="url(#{head_grad})" stroke="{head_ink}" stroke-width="4" stroke-linejoin="round"/>'
        f'<path d="{face2}" fill="url(#{head_grad})" stroke="{head_ink}" stroke-width="4" stroke-linejoin="round"/>'
        f'<path d="{head}" fill="url(#{head_grad})" stroke="{head_ink}" stroke-width="5" stroke-linejoin="round" filter="url(#hGrain)"/>'
        f'<path d="M-42 -120H42" stroke="#fff" stroke-opacity=".35" stroke-width="3" stroke-linecap="round"/>'
        f'<circle cx="-34" cy="-103" r="3.5" fill="{head_ink}"/><circle cx="34" cy="-103" r="3.5" fill="{head_ink}"/>'
        f'{rune_s}'
    )


def crest_svg():
    cx, cy = 210, 178
    parts = [
        # (gradient, ink, rune, angle, drift dx, dy, deg)
        ("hWild", "#0d2624", None, -34, -86, 14, -16),
        ("hDark", "#1a0706", "#ff6a2a", 34, 86, 14, 16),
        ("hBronze", "#2a1606", None, 0, 0, -18, 0),
    ]
    hammers = ""
    for grad, ink, rune, ang, dx, dy, deg in parts:
        hammers += (f'<g data-move="{dx},{dy},{deg}"><g transform="translate({cx},{cy}) rotate({ang})">'
                    f'<g transform="translate(5,8)" opacity=".45" filter="url(#hShadow)">'
                    f'<rect x="-50" y="-128" width="100" height="50" rx="9" fill="#000"/><rect x="-7" y="-80" width="14" height="168" rx="5" fill="#000"/></g>'
                    f'{hammer(grad, ink, rune)}</g></g>')
    defs = """<defs>
<filter id="hShadow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4"/></filter>
<filter id="hGrain" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="11" result="n"/>
  <feColorMatrix in="n" type="saturate" values="0" result="g"/>
  <feComponentTransfer in="g" result="t"><feFuncR type="linear" slope=".4" intercept=".72"/><feFuncG type="linear" slope=".4" intercept=".72"/><feFuncB type="linear" slope=".4" intercept=".72"/><feFuncA type="linear" slope="0" intercept="1"/></feComponentTransfer>
  <feBlend in="SourceGraphic" in2="t" mode="multiply" result="b"/><feComposite in="b" in2="SourceGraphic" operator="in"/>
</filter>
<linearGradient id="hHandle" x1="0" x2="1"><stop offset="0" stop-color="#5a3518"/><stop offset=".45" stop-color="#9a6334"/><stop offset="1" stop-color="#3d220d"/></linearGradient>
<linearGradient id="hBronze" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe2a0"/><stop offset=".45" stop-color="#c8913f"/><stop offset="1" stop-color="#6b3f14"/></linearGradient>
<linearGradient id="hWild" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#bfe9e2"/><stop offset=".45" stop-color="#4f9a92"/><stop offset="1" stop-color="#173c39"/></linearGradient>
<linearGradient id="hDark" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8a8c92"/><stop offset=".45" stop-color="#3a3536"/><stop offset="1" stop-color="#140c0c"/></linearGradient>
<radialGradient id="hGlow"><stop offset="0" stop-color="#ff8a3a" stop-opacity=".35"/><stop offset="1" stop-color="#ff8a3a" stop-opacity="0"/></radialGradient>
</defs>"""
    labels = ('<text class="gtxt wild" x="62" y="318" text-anchor="middle">Wildhammer</text>'
              '<text class="gtxt bronze" x="210" y="318" text-anchor="middle">Bronzebeard</text>'
              '<text class="gtxt dark" x="358" y="318" text-anchor="middle">Dark Iron</text>')
    return (f'<svg viewBox="0 0 420 330" role="img" aria-label="%%crestAria%%">{defs}'
            f'<ellipse cx="210" cy="190" rx="170" ry="120" fill="url(#hGlow)"/>{hammers}{labels}</svg>')


# ---------- Eastern Kingdoms: the War of the Three Hammers ----------
def ek_svg():
    r = random.Random(5)
    glyphs = []
    tries = 0
    while len(glyphs) < 24 and tries < 4000:
        tries += 1
        x, y = r.uniform(235, 465), r.uniform(425, 552)
        if not in_poly(x, y, KM_PTS):
            continue
        if math.hypot(x - 322, y - 476) < 22 or math.hypot(x - 425, y - 408) < 18:
            continue
        if any(math.hypot(x - gx, y - gy) < 17 for gx, gy in glyphs):
            continue
        glyphs.append((x, y))
    g_mt = "".join(f'<path class="mt" d="{mtn(x, y, r.uniform(.8, 1.2))}"/>' for x, y in glyphs)
    g_mt += "".join(f'<path class="mt" d="{mtn(x, y, .9)}"/>' for x, y in
                    [(250, 318), (268, 330), (232, 334), (420, 300), (436, 286), (404, 312)])

    IF, GB, TH, BR, AP, TS = (322, 476), (425, 408), (350, 572), (348, 566), (440, 290), (300, 350)

    def route(pts, cls, headcls=None):
        s = f'<path class="rt {cls} draw" pathLength="1" d="{smooth_open(pts)}"/>'
        if headcls:
            s += head(*pts[-1], end_angle(pts), headcls)
        return s

    triad = "".join(f'<circle class="clan-dot" cx="{f(IF[0] + dx)}" cy="{f(IF[1] + dy)}" r="4.5" fill="{c}"/>'
                    for (dx, dy), c in zip([(-11, -12), (0, -15), (11, -12)], [CLAN["wild"], CLAN["bronze"], CLAN["dark"]]))
    l1 = ('<g class="ly on" data-ly="1">'
          f'<circle class="pulse-ring" cx="{IF[0]}" cy="{IF[1]}" r="16"/>{triad}'
          + ftext(322, 448, "%%oneThrone%%") + '</g>')
    l2 = ('<g class="ly" data-ly="2">'
          + route([IF, (372, 440), (412, 414)], "wild", "wild")
          + route([IF, (330, 520), (346, 556)], "dark", "dark")
          + ftext(372, 428, "Wildhammer", "ft wildt") + ftext(300, 530, "Dark Iron", "ft darkt", "end")
          + pin(*TH, "Thaurissan", "l") + '</g>')
    l3 = ('<g class="ly" data-ly="3">'
          + route([TH, (338, 528), (326, 490)], "dark wide", "dark")
          + route([TH, (392, 520), (420, 470), (424, 420)], "dark dash", "dark")
          + f'<circle class="banner gold" cx="{IF[0]}" cy="{IF[1]}" r="18"/>'
          + f'<circle class="scourge" cx="{GB[0]}" cy="{GB[1]}" r="16"/>'
          + ftext(286, 470, "Madoran", "ft", "end") + ftext(448, 396, "Modgud †", "ft", "start")
          + pin(*TH, "Thaurissan", "l") + '</g>')
    l4 = ('<g class="ly" data-ly="4">'
          f'<circle class="firezone" cx="{BR[0]}" cy="{BR[1]}" r="46" fill="url(#ekFire)"/>'
          + ftext(352, 528, "SEARING GORGE", "rl") + ftext(380, 610, "BURNING STEPPES", "rl")
          + pin(*BR, "Blackrock Mountain", "l") + '</g>')
    l5 = ('<g class="ly" data-ly="5">'
          + route([GB, (452, 360), (450, 318), (442, 298)], "wild", "wild")
          + f'<circle class="scourge" cx="{GB[0]}" cy="{GB[1]}" r="16"/>'
          + f'<path class="bridge" d="M{TS[0] - 14} {TS[1] + 6}Q{TS[0]} {TS[1] - 8} {TS[0] + 14} {TS[1] + 6}"/>'
          + pin(*AP, "Aerie Peak", "r") + pin(*TS, "Thandol Span", "l") + '</g>')
    base_pins = pin(*IF, "Ironforge", "r") + pin(*GB, "Grim Batol", "r")
    rl = ftext(400, 512, "KHAZ MODAN", "rl") + ftext(330, 400, "WETLANDS", "rl")
    cams = {1: [236, 412, 180, 130], 2: [220, 380, 270, 230], 3: [220, 380, 270, 230], 4: [250, 470, 230, 170],
            5: [190, 262, 300, 290]}
    return (f'<svg id="ek" class="map" viewBox="236 412 180 130" data-cams=\'{json.dumps(cams, separators=(",", ":"))}\' '
            f'role="img" aria-label="%%ekAria%%">'
            f'<defs>{grid_def("gEKd")}<radialGradient id="ekFire"><stop offset="0" stop-color="#ffb36b" stop-opacity=".85"/>'
            f'<stop offset=".45" stop-color="#e0502a" stop-opacity=".45"/><stop offset="1" stop-color="#7a1d0e" stop-opacity="0"/></radialGradient></defs>'
            f'<rect x="-400" y="-400" width="1400" height="1600" fill="url(#gEKd)"/>'
            f'<path class="halo" d="{EK_D}"/><path class="land" d="{EK_D}"/><path class="km" d="{KM_D}"/>'
            f'<g>{g_mt}</g>{rl}{l1}{l2}{l3}{l4}{l5}{base_pins}</svg>')


# ---------- Blackrock Mountain cross-section ----------
def scene_svg():
    r = random.Random(23)
    floors = [214, 292]
    plates = "".join(f'<rect x="110" y="{y}" width="510" height="7" rx="2" fill="#3a2422"/>' for y in floors)
    bld, wins = "", ""
    for fy in floors:
        x = 124
        while x < 590:
            w = r.choice([34, 42, 50, 58])
            h = r.choice([30, 36, 42, 48])
            if x + w > 612:
                break
            bx, by = x, fy - h
            bld += f'<path d="M{bx} {fy}V{by + 8}L{bx + w / 2} {by - 4}L{bx + w} {by + 8}V{fy}Z" fill="#241615" stroke="#3d2725"/>'
            for wx in range(bx + 7, bx + w - 6, 11):
                for wy in range(by + 12, fy - 8, 13):
                    wins += f'<rect class="win" data-y="{wy}" x="{wx}" y="{wy}" width="5" height="6" rx="1"/>'
            x += w + r.choice([8, 14, 20])
    # the Spire at the summit
    spire = ('<path d="M150 112V70h16v-14h12v14h22V46h14v24h20V60h12v52Z" fill="#241615" stroke="#3d2725"/>'
             '<path d="M410 112V58h14V40h12v18h16V66h14v46Z" fill="#241615" stroke="#3d2725"/>')
    spire_w = "".join(f'<rect class="win" data-y="{y}" x="{x}" y="{y}" width="4" height="6" rx="1"/>'
                      for x, y in [(158, 84), (172, 76), (204, 64), (220, 84), (232, 92), (418, 74), (432, 60), (446, 86)])
    flames = ""
    for i, x in enumerate((140, 210, 280, 350, 420, 490, 560)):
        s = r.uniform(.8, 1.25)
        flames += (f'<g transform="translate({x},{412 - (i % 2) * 6}) scale({s:.2f})">'
                   f'<path d="M0 0C-12 -8 -10 -22 -2 -34C-4 -22 6 -20 4 -32C14 -20 14 -6 0 0Z" fill="url(#flameG)"/>'
                   f'<path d="M0 -2C-5 -6 -4 -13 0 -18C1 -12 5 -10 3 -6C3 -4 2 -3 0 -2Z" fill="#ffe2a0"/></g>')
    wave = "M0 0" + "".join(f"Q{x + 40} -12 {x + 80} 0T{x + 160} 0" for x in range(0, 1440, 160)) + "V420H0Z"
    rune = "".join(f'<path d="M0 0L{P(math.cos(a) * 16, math.sin(a) * 16)}"/>' for a in [i * math.pi / 4 for i in range(8)])
    labels = "".join(ftext(14, y, t, "slbl", "start") for y, t in
                     ((100, "Spire"), (206, "Depths"), (284, "Shadowforge"), (396, "Molten Core")))
    return f'''<svg class="map lava" viewBox="0 0 640 420" role="img" aria-label="%%sceneAria%%">
<defs><linearGradient id="lavaG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb36b" stop-opacity=".9"/><stop offset=".12" stop-color="#ff6a2a" stop-opacity=".7"/><stop offset="1" stop-color="#7a1d0e" stop-opacity=".75"/></linearGradient>
<linearGradient id="flameG" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#c0392b"/><stop offset=".6" stop-color="#ff7a2a"/><stop offset="1" stop-color="#ffd27a"/></linearGradient>
<clipPath id="caveD"><rect x="0" y="112" width="640" height="308"/></clipPath></defs>
<rect width="640" height="420" fill="#140d0c"/>
<path d="M0 112L70 70L120 86L200 20L260 54L320 8L380 46L450 14L520 60L580 40L640 80V112Z" fill="#1d1312"/>
<g fill="#5a4a46" opacity=".25"><circle cx="320" cy="0" r="18"/><circle cx="340" cy="-10" r="12"/></g>
{spire}
<rect x="0" y="112" width="640" height="4" fill="#3a2422"/>
<g stroke="#21151a" stroke-width="2" fill="none"><path d="M0 160Q160 150 300 166T640 158"/><path d="M0 330Q200 318 380 334T640 324"/></g>
{plates}<g>{bld}</g><g class="wins2">{wins}{spire_w}</g>
<g stroke="#2b1b19" stroke-width="3" fill="none"><path d="M150 420L162 388L150 364L168 336"/><path d="M470 420L486 396L474 372L492 344"/></g>
<g transform="translate(320,372)"><g class="valve"><circle r="22" fill="none" stroke="#ff8a3a" stroke-width="2.5"/><circle r="14" fill="none" stroke="#ff8a3a" stroke-width="1.5" stroke-dasharray="3 3"/><g stroke="#ff8a3a" stroke-width="1.5">{rune}</g></g></g>
<g clip-path="url(#caveD)"><g class="flood" transform="translate(0,330)"><g class="flood-wave"><path d="{wave}" fill="url(#lavaG)"/></g></g>
<g class="risers" transform="translate(0,0)">{flames}</g></g>
{labels}
</svg>'''


# ---------- Khaz Modan in the Second War ----------
KZ_PTS = [(130, 0), (800, 0), (800, 520), (170, 520), (140, 470), (112, 400), (132, 330), (104, 262), (132, 206),
          (232, 172), (382, 156), (232, 128), (122, 110), (98, 52)]


def kz_svg():
    r = random.Random(31)
    D = smooth_closed(jitter_closed(KZ_PTS, 7, r))
    glyphs = []
    for _ in range(400):
        x, y = r.uniform(120, 790), r.uniform(250, 515)
        if not in_poly(x, y, KZ_PTS):
            continue
        if any(math.hypot(x - px, y - py) < 30 for px, py in [(345, 322), (520, 252), (430, 470), (640, 190)]):
            continue
        if any(math.hypot(x - gx, y - gy) < 24 for gx, gy, _s in glyphs):
            continue
        glyphs.append((x, y, r.uniform(1, 1.5)))
        if len(glyphs) > 46:
            break
    for _ in range(80):
        x, y = r.uniform(420, 790), r.uniform(10, 120)
        if any(math.hypot(x - gx, y - gy) < 26 for gx, gy, _s in glyphs) or math.hypot(x - 600, y - 60) < 28:
            continue
        glyphs.append((x, y, r.uniform(.9, 1.3)))
    g_mt = "".join(f'<path class="mt" d="{mtn(x, y, s)}"/>' for x, y, s in glyphs)

    IF, DA, GB, TS, AP, BR = (345, 322), (520, 252), (640, 190), (262, 152), (600, 60), (430, 470)
    horde = [BR, (468, 408), (510, 330), DA]
    to_gb = [DA, (585, 222), (632, 196)]
    siege = [DA, (455, 285), (378, 318)]
    gry = [AP, (560, 112), (470, 190), (392, 268), (356, 304)]
    paths = {"h1": horde, "h2": to_gb, "h3": siege, "g1": gry}
    ranges = {"h1": "0.05,0.35", "h2": "0.3,0.45", "h3": "0.4,0.6", "g1": "0.6,0.95"}
    masks = "".join(
        f'<mask id="mK{k}" maskUnits="userSpaceOnUse" x="0" y="0" width="800" height="520">'
        f'<path d="{smooth_open(v)}" pathLength="1" stroke="#fff" stroke-width="18" fill="none" stroke-dasharray="1 1" '
        f'stroke-dashoffset="0" data-r="{ranges[k]}"/></mask>' for k, v in paths.items())
    lines = "".join(
        f'<path class="rt {"horde" if k[0] == "h" else "wild"} dashed" d="{smooth_open(v)}" mask="url(#mK{k})"/>'
        for k, v in paths.items())
    heads = (f'<g data-show="0.45">{head(*to_gb[-1], end_angle(to_gb), "horde")}</g>'
             f'<g data-show="0.6">{head(*siege[-1], end_angle(siege), "horde")}</g>'
             f'<g data-show="0.95">{head(*gry[-1], end_angle(gry), "wild")}</g>')
    pins = (f'<g data-show="0.58"><circle class="ruin" cx="{IF[0]}" cy="{IF[1]}" r="30"/></g>'
            + pin(*IF, "Ironforge", "l", "", 1) + pin(*DA, "Dun Algaz", "r", "", 2)
            + f'<g data-show="0.44">{pin(*GB, "Grim Batol", "r", "", 3)}</g>'
            + pin(*TS, "Thandol Span", "t", "", 4) + pin(*AP, "Aerie Peak", "l", "", 5)
            + pin(*BR, "Blackrock Mountain", "r", "", 6))
    labels = (ftext(640, 28, "HINTERLANDS", "rl") + ftext(300, 80, "ARATHI", "rl") + ftext(470, 186, "WETLANDS", "rl")
              + ftext(250, 400, "DUN MOROGH", "rl") + ftext(640, 318, "LOCH MODAN", "rl")
              + ftext(600, 425, "SEARING GORGE", "rl")
              + ftext(424, 296, "%%siege%%", "ft rage") + ftext(520, 128, "%%gryphons%%", "ft wildt"))
    bridge = f'<path class="bridge" d="M{TS[0] - 16} {TS[1] + 18}V{TS[1] - 18}M{TS[0] + 16} {TS[1] + 18}V{TS[1] - 18}"/>'
    return (f'<svg class="map numbered" viewBox="0 0 800 520" role="img" aria-label="%%kzAria%%">'
            f'<defs>{grid_def("gKZ", 40)}{masks}<radialGradient id="kzFire"><stop offset="0" stop-color="#ff8a3a" stop-opacity=".55"/>'
            f'<stop offset="1" stop-color="#c0392b" stop-opacity="0"/></radialGradient></defs>'
            f'<rect width="800" height="520" fill="url(#gKZ)"/>'
            f'<path class="halo" d="{D}"/><path class="land" d="{D}"/>'
            f'<circle class="firezone" cx="{BR[0]}" cy="{BR[1]}" r="58" fill="url(#kzFire)"/>'
            f'<g>{g_mt}</g>{bridge}{lines}{labels}{heads}{pins}</svg>')


# ---------- World: dwarven footprints ----------
def world_svg():
    land = world_base()
    UL, FH, IF, UD, AP, WS, DP = (548, 46), (488, 74), (722, 348), ek_world(440, 535), ek_world(440, 290), (952, 150), (787, 457)
    r1 = [IF, (690, 260), (630, 160), (570, 80), (552, 56)]
    r2 = [AP, (806, 320), DP, (860, 430), (930, 300), (950, 162)]
    r3 = [IF, (760, 360), (782, 374)]
    paths = {"1": (r1, "0.05,0.45"), "2": (r2, "0.4,0.95"), "3": (r3, "0.05,0.2")}
    masks = "".join(
        f'<mask id="mWd{k}" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="520">'
        f'<path d="{smooth_open(v)}" pathLength="1" stroke="#fff" stroke-width="18" fill="none" stroke-dasharray="1 1" '
        f'stroke-dashoffset="0" data-r="{rg}"/></mask>' for k, (v, rg) in paths.items())
    lines = "".join(f'<path class="rt gold dashed" d="{smooth_open(v)}" mask="url(#mWd{k})"/>' for k, (v, _rg) in paths.items())
    pins = (pin(*UL, "Ulduar", "r", "origin", 1) + pin(*FH, "Frosthold", "l", "", 2) + pin(*IF, "Ironforge", "l", "", 3)
            + pin(*UD, "Uldaman", "r", "", 4) + pin(*AP, "Aerie Peak", "r", "", 5)
            + f'<g data-show="0.93">{pin(*WS, "Wildhammer Stronghold", "l", "", 6)}</g>'
            + pin(*DP, "Dark Portal", "l", "faded"))
    heads = (f'<g data-show="0.45">{head(*r1[-1], end_angle(r1), "gold")}</g>'
             f'<g data-show="0.95">{head(*r2[-1], end_angle(r2), "gold")}</g>')
    return (f'<svg class="map numbered" viewBox="0 0 1000 520" role="img" aria-label="%%worldAria%%">'
            f'<defs>{grid_def("gWd", 50)}{masks}</defs><rect width="1000" height="520" fill="url(#gWd)"/>'
            f'{land}{lines}{world_labels((432, 114))}{heads}{pins}</svg>')


# ---------- icons (line art, 48 or 40 units) ----------
def icons():
    hammer_line = 'M14 10h20v10H14Z M24 20v22'
    return {
        "bronzebeard": f'<path d="{hammer_line}"/><path d="M8 40h32l-4-6H12Z"/>',
        "wildhammer": f'<path d="{hammer_line}"/><path d="M34 26c6-2 10 2 10 8-4-2-7-1-10 2 1-4 0-7 0-10Z"/><path d="M14 26c-6-2-10 2-10 8 4-2 7-1 10 2-1-4 0-7 0-10Z"/>',
        "darkiron": f'<path d="{hammer_line}"/><path d="M24 4c-3 3-2 5 0 6 2-1 3-3 0-6Z" fill="currentColor" stroke="none"/><path d="M17 33c-2 4 1 9 7 9s9-5 7-9c-2 3-4 3-5 1-1 3-3 3-4 0-1 2-3 2-5-1Z"/>',
        "gate": '<path d="M8 42V16h6v4h6v-4h8v4h6v-4h6v26Z"/><path d="M18 42v-9a6 6 0 0 1 12 0v9"/>',
        "wing": '<path d="M6 36C10 20 22 10 42 8c-4 6-8 9-14 11 5 0 8 1 11 3-6 3-11 4-16 4 3 2 5 4 6 7-8 1-15 1-23 3Z"/>',
        "dragon": '<path d="M6 30C12 18 22 12 40 10c-2 4-3 7-3 11-4-3-7-3-10-1 0 4-2 7-5 9-1-3-3-5-6-5-2 3-5 5-10 6Z"/><path d="M28 34l6 6M22 36l2 6"/>',
        "sword": '<path d="M24 4l4 6v20h-8V10Z"/><path d="M16 30h16M24 30v12M21 42h6"/>',
        "volcano": '<path d="M4 40l12-20h16l12 20Z"/><path d="M18 20c0-6 4-8 6-14 2 6 6 8 6 14"/>',
        "flame": '<path d="M24 42c-9 0-13-7-11-14 2-6 7-8 7-16 6 4 9 9 9 14 2-2 3-4 3-7 4 5 5 10 3 15-2 5-6 8-11 8Z"/>',
        "steppe": '<path d="M4 34c8-6 14-6 20 0s12 6 20 0"/><path d="M4 42c8-6 14-6 20 0s12 6 20 0"/><path d="M16 22c0-5 3-7 4-12 2 5 4 7 4 12"/>',
        "sepCog": gear_d(10, 9, 13, 4),
        "brandCog": gear_d(10, 7, 10, 3.2, 12, 12),
    }


def main():
    write_ts(LIB / "dwarf-art.ts", "DWARF_ART", {
        "crest": crest_svg(),
        "ek": ek_svg(),
        "scene": scene_svg(),
        "kz": kz_svg(),
        "world": world_svg(),
        "icons": icons(),
    })


if __name__ == "__main__":
    main()
