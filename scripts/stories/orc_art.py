#!/usr/bin/env python3
"""Generates src/lib/stories/orc-art.ts: the drawings and maps of the Orc story.

Run from the repo root:  python3 scripts/stories/orc_art.py   (helpers in art_lib.py)
"""
from art_lib import *  # noqa: F401,F403

EK_IMG = '<image class="map-img" href="%%base%%maps/eastern-kingdoms.webp" width="1002" height="668"/>'
WORLD_IMG = '<image class="map-img" href="%%base%%maps/azeroth.webp" width="1002" height="668"/>'
DUROTAR_IMG = '<image class="map-img" href="%%base%%maps/durotar.webp" width="1002" height="668"/>'
SUN, EMBER, DUSK = "#ffc27a", "#e0602a", "#5a1d12"

# places on the Eastern Kingdoms map (the same reading as the Human story's)
SW, LD, DP, BR, GB = (437, 455), (468, 155), (543, 556), (505, 438), (572, 322)


def route(pts, cls, headcls=None):
    s = f'<path class="rt {cls} draw" pathLength="1" d="{smooth_open(pts)}"/>'
    if headcls:
        s += head(*pts[-1], end_angle(pts), headcls)
    return s


def revealed(prefix, paths, w=1002, h=668):
    """Masked dashed routes that draw themselves as the figure scrolls by (data-routes)."""
    masks = "".join(
        f'<mask id="{prefix}{k}" maskUnits="userSpaceOnUse" x="0" y="0" width="{w}" height="{h}">'
        f'<path d="{smooth_open(pts)}" pathLength="1" stroke="#fff" stroke-width="18" fill="none" stroke-dasharray="1 1" '
        f'stroke-dashoffset="0" data-r="{rg}"/></mask>' for k, (pts, _c, rg) in paths.items())
    lines = "".join(f'<path class="rt {c} dashed" d="{smooth_open(pts)}" mask="url(#{prefix}{k})"/>'
                    for k, (pts, c, _rg) in paths.items())
    heads = "".join(f'<g data-show="{rg.split(",")[1]}">{head(*pts[-1], end_angle(pts), c)}</g>'
                    for k, (pts, c, rg) in paths.items())
    return masks, lines, heads


def az(x, y):
    """Eastern Kingdoms map coordinates -> the Azeroth map (as in the Human story)."""
    return (round(374 + x * .78, 1), round(69 + y * .744, 1))


# ---------- Hero: sunset over Durotar's red crags and the spiked walls of Orgrimmar ----------
def ridge(r, x0, x1, base, lo, hi, step=(40, 90), spire=.25):
    """A skyline of flat-topped mesas and thin rock spires between x0 and x1, closed at `base`."""
    pts = [(x0, base)]
    x = x0
    while x < x1:
        w = r.uniform(*step)
        top = r.uniform(lo, hi)
        if r.random() < spire:
            pts += [(x, base - (base - top) * .35), (x + w * .42, top - r.uniform(30, 90)), (x + w * .58, top - r.uniform(20, 70)),
                    (x + w, base - (base - top) * .3)]
        else:
            pts += [(x + w * .12, top + r.uniform(0, 8)), (x + w * .88, top + r.uniform(0, 8)), (x + w, base - (base - top) * r.uniform(.2, .6))]
        x += w
    pts.append((x1, base))
    return "M" + "L".join(P(*p) for p in pts) + "Z"


def hero_svg():
    r = random.Random(5)
    W, H = 1600, 760
    sx, sy, sr = 330, 468, 108  # the sun, low over the far ridge
    gx, base = 470, 640  # Orgrimmar's gate (left of the hero copy) and the foot of its wall
    sky = ('<linearGradient id="oSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#140a0b"/>'
           f'<stop offset=".42" stop-color="{DUSK}"/><stop offset=".72" stop-color="#b8461d"/><stop offset=".86" stop-color="#ef8a3a"/>'
           '<stop offset="1" stop-color="#f6a85a"/></linearGradient>'
           f'<radialGradient id="oSun"><stop offset="0" stop-color="{SUN}" stop-opacity=".55"/>'
           f'<stop offset=".35" stop-color="{EMBER}" stop-opacity=".2"/><stop offset="1" stop-color="{EMBER}" stop-opacity="0"/></radialGradient>'
           '<linearGradient id="oHaze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f08a3c" stop-opacity="0"/>'
           '<stop offset=".6" stop-color="#e06a2c" stop-opacity=".28"/><stop offset="1" stop-color="#e06a2c" stop-opacity="0"/></linearGradient>'
           '<linearGradient id="oGround" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a0f09"/><stop offset="1" stop-color="#0e0605"/></linearGradient>')
    stars = "".join(
        f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r.uniform(.5, 1.4))}"{" class=\"tw\"" if r.random() < .4 else ""} '
        f'style="animation-delay:{f(r.uniform(0, 3.6))}s"/>'
        for x, y in ((r.uniform(0, W), r.uniform(0, 170)) for _ in range(60)))
    sun = (f'<circle cx="{sx}" cy="{sy}" r="{sr * 4}" fill="url(#oSun)"/>'
           f'<circle cx="{sx}" cy="{sy}" r="{sr}" fill="{SUN}"/><circle cx="{sx}" cy="{sy}" r="{sr * .82}" fill="#ffd9a0" opacity=".55"/>')
    far = f'<path d="{ridge(r, -20, W + 20, 600, 470, 540, (50, 110), .18)}" fill="#8a3418" opacity=".62"/>'
    mid = f'<path d="{ridge(r, -20, W + 20, 640, 520, 585, (40, 90), .35)}" fill="#5c1f10"/>'
    haze = f'<rect y="470" width="{W}" height="200" fill="url(#oHaze)"/>'
    # the wall: a palisade of spikes, two gate towers with curved tusks and banners
    wl, wr, wt = 90, 1050, 572
    spikes = "".join(f'L{f(x)} {f(wt - r.uniform(16, 30))}L{f(x + 9)} {wt}' for x in range(wl, wr, 18))
    wall = f'<path d="M{wl} {base}L{wl} {wt}{spikes}L{wr} {wt}L{wr} {base}Z" fill="#2a0f09"/>'
    towers, tusks, banners = "", "", ""
    for tx, side in ((gx - 88, -1), (gx + 88, 1)):
        tw, tt = 34, 452
        towers += (f'<path d="M{tx - tw} {base}L{tx - tw + 6} {tt}L{tx - tw - 10} {tt}L{tx} {tt - 64}L{tx + tw + 10} {tt}'
                   f'L{tx + tw - 6} {tt}L{tx + tw} {base}Z" fill="#200b07"/>')
        # two curved tusks on the outer side of each gate tower
        for dy, k in ((22, 1), (88, .72)):
            x0, y0 = tx + side * (tw - 6), tt + dy
            tusks += (f'<path d="M{x0} {y0}C{f(x0 + side * 44 * k)} {y0 - 4} {f(x0 + side * 74 * k)} {f(y0 - 30 * k)} {f(x0 + side * 80 * k)} {f(y0 - 76 * k)}'
                      f'C{f(x0 + side * 58 * k)} {f(y0 - 36 * k)} {f(x0 + side * 34 * k)} {f(y0 - 4 + 26 * k)} {x0} {f(y0 + 30 * k)}Z" '
                      f'fill="#e8d6b4" opacity=".86"/>')
        pole = tx + 2
        banners += (f'<path d="M{pole} {tt - 60}V{tt - 160}" stroke="#1a0906" stroke-width="5"/>'
                    f'<path class="flag" d="M{pole + 2} {tt - 156}h62l-14 20 14 20h-62Z" fill="#a3241a"/>'
                    f'<path d="M{pole + 18} {tt - 146}l8 10-8 10M{pole + 34} {tt - 146}l-8 10 8 10" stroke="#1a0906" stroke-width="3" fill="none"/>')
    gate = (f'<path d="M{gx - 54} {base}V{base - 70}Q{gx} {base - 132} {gx + 54} {base - 70}V{base}Z" fill="#100504"/>'
            f'<path d="M{gx - 54} {base - 70}Q{gx} {base - 132} {gx + 54} {base - 70}" stroke="#4a1a0e" stroke-width="7" fill="none"/>'
            f'<path d="M{gx - 30} {base}V{base - 84}M{gx} {base}V{base - 98}M{gx + 30} {base}V{base - 84}" stroke="#2a0f09" stroke-width="5"/>')
    fires = "".join(f'<circle cx="{x}" cy="{base - 6}" r="{rr}" fill="{EMBER}" opacity=".85" class="tw" style="animation-delay:{d}s"/>'
                    f'<circle cx="{x}" cy="{base - 6}" r="{rr * 4}" fill="url(#oSun)"/>'
                    for x, rr, d in [(gx - 132, 4, 0), (gx + 132, 4, 1.2), (gx - 330, 3, .6), (gx + 400, 3, 2.1)])
    ground = f'<rect y="{base - 2}" width="{W}" height="{H - base + 2}" fill="url(#oGround)"/>'
    rocks = "".join(
        f'<path d="M{f(x)} {base + 4}L{f(x + w * .3)} {f(base - h)}L{f(x + w * .55)} {f(base - h * .7)}L{f(x + w)} {base + 4}Z" fill="#160806"/>'
        for x, w, h in ((r.uniform(0, W), r.uniform(30, 90), r.uniform(10, 40)) for _ in range(18)))
    near = (f'<path d="M-20 {H}L-20 600C60 560 120 520 150 470C170 520 200 560 240 {base + 20}L300 {H}Z" fill="#120605"/>'
            f'<path d="M{W + 20} {H}L{W + 20} 590C{W - 70} 560 {W - 130} 540 {W - 170} 500C{W - 190} 560 {W - 230} 610 {W - 300} {H}Z" fill="#120605"/>')
    return (f'<svg viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="%%heroAria%%"><defs>{sky}</defs>'
            f'<rect width="{W}" height="{H}" fill="url(#oSky)"/><g fill="#ffe3c0" opacity=".6">{stars}</g>{sun}{far}{haze}{mid}'
            f'{ground}{rocks}{banners}{wall}{towers}{tusks}{gate}{fires}{near}</svg>')


# ---------- Chapter II: the Horde's road through the First and Second Wars ----------
def portal_svg():
    paths = {
        "1": ([DP, (522, 528), (484, 494), (452, 468)], "horde", "0.04,0.22"),
        "2": ([BR, (530, 408), (552, 370), (566, 336)], "horde", "0.26,0.44"),
        "3": ([GB, (548, 282), (512, 238), (486, 194), (474, 168)], "horde", "0.46,0.64"),
        "4": ([(470, 186), (432, 214), (392, 240), (346, 256)], "void", "0.66,0.8"),
        "5": ([(482, 162), (506, 222), (530, 296), (526, 372), (512, 424)], "al", "0.82,0.97"),
    }
    masks, lines, heads = revealed("mOp", paths)
    pins = (pin(*DP, "Dark Portal", "r", "", 1)
            + f'<g data-show="0.22">{pin(*SW, "Stormwind", "l", "", 2)}</g>'
            + f'<g data-show="0.26">{pin(*BR, "Blackrock Spire", "l", "", 3)}</g>'
            + f'<g data-show="0.44">{pin(*GB, "Grim Batol", "b", "", 4)}</g>'
            + f'<g data-show="0.64">{pin(*LD, "Lordaeron", "r", "", 5)}</g>')
    marks = (f'<circle class="tox-ring" cx="{DP[0]}" cy="{DP[1]}" r="16"/>'
             f'<g data-show="0.22"><circle class="ruin" cx="{SW[0]}" cy="{SW[1]}" r="15"/></g>'
             f'<g data-show="0.64"><circle class="banner" cx="{LD[0]}" cy="{LD[1]}" r="16"/></g>'
             f'<g data-show="0.97"><circle class="banner gold" cx="{BR[0]}" cy="{BR[1]}" r="16"/></g>')
    labels = (f'<g data-show="0.8">{ftext(342, 276, "%%toTomb%%", "ft rage", "middle")}</g>'
              f'<g data-show="0.97">{ftext(BR[0] + 22, BR[1] + 6, "Lothar †", "ft", "start")}</g>')
    return (f'<svg class="map numbered" viewBox="300 120 340 470" role="img" aria-label="%%portalAria%%">'
            f'<defs>{masks}</defs>{EK_IMG}{marks}{lines}{labels}{heads}{pins}</svg>')


# ---------- Chapter III: a chain that breaks as the page scrolls (data-moves) ----------
def chains_svg():
    W, H, cy = 1000, 340, 170
    iron = ('<linearGradient id="oIron" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b7bcc4"/>'
            '<stop offset=".45" stop-color="#6f757f"/><stop offset="1" stop-color="#2c3038"/></linearGradient>'
            '<radialGradient id="oSpark"><stop offset="0" stop-color="#fff2c8"/><stop offset=".4" stop-color="#ffb36b" stop-opacity=".8"/>'
            '<stop offset="1" stop-color="#e0602a" stop-opacity="0"/></radialGradient>')

    def cuff(cx):
        return (f'<circle cx="{cx}" cy="{cy}" r="74" fill="none" stroke="#14161b" stroke-width="34"/>'
                f'<circle cx="{cx}" cy="{cy}" r="74" fill="none" stroke="url(#oIron)" stroke-width="26"/>'
                f'<circle cx="{cx}" cy="{cy}" r="88" fill="none" stroke="#d6dae0" stroke-opacity=".18" stroke-width="2"/>'
                + "".join(f'<circle cx="{f(cx + math.cos(a) * 74)}" cy="{f(cy + math.sin(a) * 74)}" r="4.5" fill="#d6dae0" opacity=".7"/>'
                          for a in [i * math.pi / 4 + math.pi / 8 for i in range(8)]))

    def link(x, flat):
        if flat:
            return (f'<ellipse cx="{x}" cy="{cy}" rx="40" ry="22" fill="none" stroke="#14161b" stroke-width="16"/>'
                    f'<ellipse cx="{x}" cy="{cy}" rx="40" ry="22" fill="none" stroke="url(#oIron)" stroke-width="11"/>')
        return (f'<rect x="{x - 9}" y="{cy - 30}" width="18" height="60" rx="9" fill="none" stroke="#14161b" stroke-width="13"/>'
                f'<rect x="{x - 9}" y="{cy - 30}" width="18" height="60" rx="9" fill="#2c3038" stroke="url(#oIron)" stroke-width="8"/>')

    def half(x, side):
        # the broken middle link: a C open towards the break
        d = (f"M{x + side * 4} {cy - 22}C{x - side * 30} {cy - 24} {x - side * 46} {cy - 12} {x - side * 46} {cy}"
             f"C{x - side * 46} {cy + 12} {x - side * 30} {cy + 24} {x + side * 4} {cy + 22}")
        return (f'<path d="{d}" fill="none" stroke="#14161b" stroke-width="16" stroke-linecap="round"/>'
                f'<path d="{d}" fill="none" stroke="url(#oIron)" stroke-width="11" stroke-linecap="round"/>')

    left = cuff(150) + link(262, False) + link(330, True) + link(398, False) + half(470, -1)
    right = half(530, 1) + link(602, False) + link(670, True) + link(738, False) + cuff(850)
    r = random.Random(9)
    sparks = "".join(f'<circle cx="{f(500 + r.uniform(-70, 70))}" cy="{f(cy + r.uniform(-60, 60))}" r="{f(r.uniform(2, 6))}" fill="url(#oSpark)"/>'
                     for _ in range(22))
    glow = f'<circle class="break-glow" cx="500" cy="{cy}" r="150" fill="url(#oSpark)"/>'
    labels = (f'<g class="before">{ftext(500, H - 26, "%%chained%%", "ft goldt")}</g>'
              f'<g class="after">{ftext(500, H - 26, "%%free%%", "ft goldt")}</g>')
    # the viewBox leaves room for the halves to drift apart (data-move)
    return (f'<svg class="map chains" viewBox="-110 0 {W + 220} {H}" role="img" aria-label="%%chainsAria%%"><defs>{iron}</defs>'
            f'{glow}<g data-move="-100,8,-9">{left}</g><g data-move="100,-8,9">{right}</g>'
            f'<g class="sparks">{sparks}</g>{labels}</svg>')


# ---------- Chapter IV: the exodus to Kalimdor, one layer and one camera per step ----------
LDW = az(*LD)
ISLE, BAR, MUL, ASH, DFC = (384, 440), (262, 330), (215, 350), (226, 262), (262, 248)


def ek_svg():
    l1 = ('<g class="ly on" data-ly="1">'
          + route([LDW, (712, 214), (668, 262), (622, 312), (596, 338)], "horde", "horde")
          + f'<circle class="banner gold" cx="{LDW[0]}" cy="{LDW[1]}" r="13"/>'
          + ftext(LDW[0] + 18, LDW[1] - 16, "Medivh", "ft goldt", "start") + '</g>')
    l2 = ('<g class="ly" data-ly="2">' + route([(596, 338), (540, 398), (470, 428), (406, 440)], "horde", "horde")
          + f'<circle class="tox-ring" cx="{ISLE[0]}" cy="{ISLE[1]}" r="14"/>'
          + ftext(ISLE[0], ISLE[1] + 30, "%%stormIsle%%", "ft dim") + pin(*ISLE, "Darkspear", "t") + '</g>')
    l3 = ('<g class="ly" data-ly="3">' + route([ISLE, (346, 410), (310, 360), (278, 336)], "horde", "horde")
          + route([BAR, (240, 342), (222, 348)], "gold", "gold")
          + ftext(250, 372, "%%centaurs%%", "ft rage", "middle")
          + pin(*MUL, "Mulgore · Cairne", "b") + '</g>')
    l4 = ('<g class="ly" data-ly="4">' + route([BAR, (252, 300), (240, 276)], "horde", "horde")
          + f'<circle class="ruin" cx="{ASH[0]}" cy="{ASH[1]}" r="11"/>'
          + ftext(ASH[0] - 14, ASH[1] + 20, "Cenarius †", "ft", "end") + ftext(DFC[0] + 2, DFC[1] - 22, "Mannoroth", "ft rage") + '</g>')
    l5 = ('<g class="ly" data-ly="5">'
          + route([(250, 288), (256, 270), (260, 256)], "horde", "horde")
          + route([(292, 268), (276, 258), (268, 252)], "al", "al")
          + f'<circle class="banner gold" cx="{DFC[0]}" cy="{DFC[1]}" r="12"/>'
          + ftext(DFC[0] + 16, DFC[1] - 12, "Mannoroth †", "ft", "start") + ftext(DFC[0] - 16, DFC[1] - 12, "Grom †", "ft", "end")
          + pin(*DFC, "Demon Fall Canyon", "b") + '</g>')
    base_pins = pin(*LDW, "Lordaeron", "r") + pin(*BAR, "The Barrens", "r") + pin(*ASH, "Ashenvale", "l")
    cams = {1: [560, 150, 240, 200], 2: [360, 250, 310, 230], 3: [180, 280, 240, 190], 4: [170, 210, 160, 130], 5: [200, 205, 120, 92]}
    c1 = " ".join(str(n) for n in cams[1])
    return (f'<svg id="ek" class="map" viewBox="{c1}" data-cams=\'{json.dumps(cams, separators=(",", ":"))}\' '
            f'role="img" aria-label="%%ekAria%%">{WORLD_IMG}{l1}{l2}{l3}{l4}{l5}{base_pins}</svg>')


# ---------- Chapter V: Durotar ----------
def durotar_svg():
    ORG, VOT, RH, SJ, EI, TK = (456, 68), (454, 376), (546, 280), (558, 490), (677, 554), (586, 382)
    paths = {"1": ([VOT, (476, 344), (522, 304), (540, 274), (528, 206), (512, 140), (476, 92)], "gold", "0.1,0.9")}
    masks, lines, heads = revealed("mOd", paths)
    pins = (pin(*ORG, "Orgrimmar", "r", "", 1) + pin(*VOT, "Valley of Trials", "l", "", 2) + pin(*RH, "Razor Hill", "r", "", 3)
            + pin(*SJ, "Sen&#8217;jin Village", "l", "", 4) + pin(*EI, "Echo Isles", "r", "", 5) + pin(*TK, "Tiragarde Keep", "r", "", 6))
    return (f'<svg class="map numbered" viewBox="300 20 520 600" role="img" aria-label="%%durotarAria%%">'
            f'<defs>{masks}</defs>{DUROTAR_IMG}{lines}{heads}{pins}</svg>')


# ---------- Chapter V: Horde outposts and zeppelin routes on the Azeroth map ----------
def world_svg():
    ORG, XR, SPL = (300, 286), (262, 318), (250, 262)
    GG, STN, HF, UC = az(448, 560), az(548, 505), az(560, 236), az(445, 160)
    paths = {
        "1": ([(308, 294), (400, 382), (560, 466), (GG[0] - 8, GG[1] - 2)], "gold", "0.05,0.5"),
        "2": ([(308, 280), (420, 216), (580, 186), (UC[0] - 8, UC[1])], "gold", "0.45,0.9"),
    }
    masks, lines, heads = revealed("mOw", paths)
    pins = (pin(*ORG, "Orgrimmar", "r", "", 1) + pin(*XR, "Crossroads", "l", "", 2) + pin(*SPL, "Splintertree Post", "l", "", 3)
            + f'<g data-show="0.5">{pin(*GG, "Grom&#8217;gol", "r", "", 4)}</g>'
            + pin(*STN, "Stonard", "r", "", 5) + pin(*HF, "Hammerfall", "r", "", 6))
    labels = f'<g data-show="0.9">{ftext(UC[0] + 4, UC[1] - 14, "Undercity", "ft goldt")}</g>'
    return (f'<svg class="map numbered" viewBox="160 150 720 380" role="img" aria-label="%%worldAria%%">'
            f'<defs>{masks}</defs>{WORLD_IMG}{lines}{labels}{heads}{pins}</svg>')


# ---------- icons (line art: 64 units for the stage strip, 48 for cards; sep 32 and brand 24 are filled) ----------
def tusks(cx, cy, s):
    """Two curved tusks, filled (the page separator and the header brand)."""
    def tusk(side):
        p = lambda x, y: P(cx + side * x * s, cy + y * s)
        return f"M{p(2, 12)}C{p(12, 6)} {p(13, -6)} {p(6, -13)}C{p(8, -4)} {p(6, 4)} {p(2, 8)}Z"
    return tusk(-1) + tusk(1) + f"M{P(cx, cy - 4 * s)}L{P(cx + 2.4 * s, cy + 1 * s)}L{P(cx, cy + 6 * s)}L{P(cx - 2.4 * s, cy + 1 * s)}Z"


def icons():
    return {
        # stage strip (64 units)
        "totem": '<path d="M24 58V14h16v44"/><path d="M20 14h24l-4-8H24Z"/><path d="M28 24h2M34 24h2"/><path d="M28 31c2 2 6 2 8 0"/><path d="M24 40h16M24 49h16"/><path d="M24 20 10 14l4 10h10M40 20l14-6-4 10H40"/>',
        "horned": '<path d="M20 26C10 20 8 10 12 4c2 8 8 12 13 14M44 26c10-6 12-16 8-22-2 8-8 12-13 14"/><path d="M20 30c0-9 5-15 12-15s12 6 12 15v8c0 10-5 16-12 18-7-2-12-8-12-18Z"/><path d="M25 34l5 3M39 34l-5 3"/><path d="M27 46c3 2 7 2 10 0"/>',
        "felskull": '<path d="M32 18c-10 0-17 7-17 17 0 6 3 10 6 12v7h22v-7c3-2 6-6 6-12 0-10-7-17-17-17Z"/><circle cx="25" cy="35" r="4"/><circle cx="39" cy="35" r="4"/><path d="M32 41l-2 4h4Z"/><path d="M27 54v-5M32 54v-5M37 54v-5"/><path d="M32 16c-5-4-3-9 1-12 0 4 4 5 3 10M24 18c-3-2-3-5-1-7M40 18c3-2 3-5 1-7"/>',
        "axes": '<path d="M14 56 44 16M50 56 20 16"/><path d="M38 10c8 0 14 6 14 14-6-1-10-4-14-8Z"/><path d="M26 10c-8 0-14 6-14 14 6-1 10-4 14-8Z"/><path d="M28 44h8"/>',
        # chapter II cards (48 units)
        "fist": '<path d="M14 26V16a3 3 0 0 1 6 0v8M20 22V12a3 3 0 0 1 6 0v10M26 22V13a3 3 0 0 1 6 0v11M32 24v-6a3 3 0 0 1 6 0v10c0 9-6 14-13 14h-1c-6 0-10-4-11-9l-3-7a3 3 0 0 1 5-3l3 4"/>',
        "hammer": '<path d="M24 46V20"/><rect x="9" y="8" width="30" height="12" rx="2"/><path d="M15 8V4M33 8V4"/><path d="M20 32h8M20 38h8"/>',
        "skull": '<path d="M24 6c-9 0-14 6-14 14 0 5 2 8 5 10v6h18v-6c3-2 5-5 5-10 0-8-5-14-14-14Z"/><circle cx="19" cy="21" r="3"/><circle cx="29" cy="21" r="3"/><path d="M24 26l-2 3h4Z"/><path d="M20 36v5M24 36v5M28 36v5"/>',
        "dragon": '<path d="M6 32c4-10 12-16 22-17l7-8-1 9c4 2 7 6 8 10l-11 3-7 7H12Z"/><path d="M28 21h2"/><path d="M16 32l3 7M22 32l3 6"/><path d="M34 16l6-3"/>',
        # chapter III cards (48 units)
        "keep": '<path d="M8 42V18h6v5h5v-5h10v5h5v-5h6v24Z"/><path d="M20 42v-8a4 4 0 0 1 8 0v8"/><path d="M24 18V6l8 3-8 3"/>',
        "letter": '<rect x="6" y="12" width="36" height="26" rx="2"/><path d="M6 14l18 13 18-13"/><path d="M6 38l13-12M42 38 29 26"/>',
        "axe": '<path d="M12 44 34 8"/><path d="M27 10c6-6 14-4 17 2-5 4-11 5-16 2Z"/><path d="M23 18c-6-4-14-1-15 6 6 2 12 1 15-3"/>',
        "helm": '<path d="M12 32c0-11 5-20 12-20s12 9 12 20v8H12Z"/><path d="M12 26C6 24 4 16 6 10c2 6 5 9 8 10M36 26c6-2 8-10 6-16-2 6-5 9-8 10"/><path d="M18 30h12M24 30v10"/>',
        # leaders (48 units)
        "bolt": '<path d="M28 4 12 28h11l-4 16 17-25H25Z"/>',
        "shield": '<path d="M24 5 40 11v12c0 10-7 17-16 21C15 40 8 33 8 23V11Z"/><path d="M17 18l14 12M31 18 17 30"/>',
        "wolf": '<path d="M12 6l5 12M36 6l-5 12"/><path d="M17 18c2-3 4-4 7-4s5 1 7 4l5 10-7 13H19l-7-13Z"/><path d="M19 27h3M26 27h3"/><path d="M21 36l3 3 3-3"/>',
        "sep": tusks(0, 0, 1),
        "brand": tusks(12, 12, .8),
    }


def main():
    write_ts(LIB / "orc-art.ts", "ORC_ART", {
        "hero": hero_svg(),
        "portal": portal_svg(),
        "chains": chains_svg(),
        "ek": ek_svg(),
        "durotar": durotar_svg(),
        "world": world_svg(),
        "icons": icons(),
    })


if __name__ == "__main__":
    main()
