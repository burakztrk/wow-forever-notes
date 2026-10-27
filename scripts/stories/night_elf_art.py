#!/usr/bin/env python3
"""Generates src/lib/stories/night-elf-art.ts: the drawings and maps of the Night Elf story.

Run from the repo root:  python3 scripts/stories/night_elf_art.py   (helpers in art_lib.py)
"""
from art_lib import *  # noqa: F401,F403

WORLD_IMG = '<image class="map-img" href="%%base%%maps/azeroth.webp" width="1002" height="668"/>'
TELD_IMG = '<image class="map-img" href="%%base%%maps/teldrassil.webp" width="1002" height="668"/>'
MOON, MOON_DIM, LEAF = "#dfe9ff", "#8fa3d6", "#7fd6b5"


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


# ---------- Hero: a crescent moon over the sea and Teldrassil rising from it ----------
def hero_svg():
    r = random.Random(11)
    W, H = 1600, 760
    tx, base = 640, 660  # trunk centre and waterline
    stars = "".join(
        f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r.uniform(.5, 1.7))}"'
        f'{" class=\"tw\"" if r.random() < .35 else ""} style="animation-delay:{f(r.uniform(0, 3.6))}s"/>'
        for x, y in ((r.uniform(0, W), r.uniform(0, base * .8)) for _ in range(220)))
    # crescent: a lit disc with an offset dark disc masked out
    mx, my, mr = 185, 150, 72
    moon = (f'<circle cx="{mx}" cy="{my}" r="{mr * 3}" fill="url(#nMoonGlow)"/>'
            f'<mask id="nCres"><circle cx="{mx}" cy="{my}" r="{mr}" fill="#fff"/>'
            f'<circle cx="{mx + mr * .42}" cy="{my - mr * .22}" r="{mr * .9}" fill="#000"/></mask>'
            f'<circle cx="{mx}" cy="{my}" r="{mr}" fill="{MOON}" mask="url(#nCres)"/>')
    # trunk: wide flared roots at the waterline, tapering into the crown; a few boughs fork out at the top
    top = 300
    trunk = (f'M{tx - 230} {base}C{tx - 120} {base - 16} {tx - 70} {base - 70} {tx - 58} {base - 170}'
             f'C{tx - 46} {base - 260} {tx - 44} {top + 60} {tx - 34} {top}'
             f'L{tx + 34} {top}C{tx + 44} {top + 60} {tx + 46} {base - 260} {tx + 58} {base - 170}'
             f'C{tx + 70} {base - 70} {tx + 120} {base - 16} {tx + 240} {base}Z')
    boughs = "".join(
        f'<path d="M{tx + sx} {top + 30}C{tx + sx * 1.6} {top - 10} {tx + ex * .6} {top - 40} {tx + ex} {top - ey}" '
        f'stroke="#070b12" stroke-width="{w}" fill="none" stroke-linecap="round"/>'
        for sx, ex, ey, w in [(-20, -260, 30, 22), (-14, -150, 80, 18), (0, -40, 120, 16), (12, 120, 90, 18), (20, 270, 40, 22)])
    roots = "".join(
        f'<path d="M{tx + dx * .25} {base - 26}C{tx + dx * .6} {base - 8} {tx + dx} {base} {tx + dx * 1.2} {base + 16}" '
        f'stroke="#060a10" stroke-width="{w}" fill="none" stroke-linecap="round"/>'
        for dx, w in [(-260, 18), (-170, 14), (190, 16), (270, 12), (-330, 9), (340, 9)])
    # crown: a broad dome of leaf masses, lighter on the moon side
    crown, rim = "", ""
    shades = ["#0a141c", "#0c1922", "#0f1f2a", "#112433"]
    for i in range(120):
        a = r.uniform(math.pi * 1.03, math.pi * 1.97)
        k = r.random() ** .6
        cx = tx + math.cos(a) * 360 * k
        cy = top - 30 + math.sin(a) * 190 * k + r.uniform(-12, 30)
        rx, ry = r.uniform(46, 110), r.uniform(22, 46)
        crown += f'<ellipse cx="{f(cx)}" cy="{f(cy)}" rx="{f(rx)}" ry="{f(ry)}" fill="{r.choice(shades)}"/>'
        if cx < tx - 40 and cy < top - 60 and r.random() < .45:
            rim += (f'<ellipse cx="{f(cx - rx * .25)}" cy="{f(cy - ry * .35)}" rx="{f(rx * .7)}" ry="{f(ry * .3)}" '
                    f'fill="{MOON_DIM}" opacity=".13"/>')
    lights = "".join(
        f'<circle cx="{f(tx + r.uniform(-280, 280))}" cy="{f(top - 30 + r.uniform(-120, 30))}" r="{f(r.uniform(1.2, 2.8))}" '
        f'fill="{LEAF}" class="tw" style="animation-delay:{f(r.uniform(0, 3.6))}s"/>' for _ in range(40))
    reflection = "".join(
        f'<path d="M{f(mx - w / 2 + r.uniform(-14, 14))} {f(base + 12 + i * 11)}h{f(w)}" stroke="{MOON}" '
        f'stroke-opacity="{f(.4 - i * .035)}" stroke-width="1.6" stroke-linecap="round"/>'
        for i, w in enumerate([150, 120, 170, 90, 130, 70, 100, 50, 80]))
    sea = f'<rect y="{base - 4}" width="{W}" height="{H - base + 4}" fill="url(#nSea)"/>{reflection}'
    mist = f'<rect y="{base - 150}" width="{W}" height="190" fill="url(#nMist)"/>'
    defs = (f'<defs><linearGradient id="nSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#060a16"/>'
            f'<stop offset=".55" stop-color="#121836"/><stop offset="1" stop-color="#232a52"/></linearGradient>'
            f'<radialGradient id="nMoonGlow"><stop offset="0" stop-color="{MOON}" stop-opacity=".32"/>'
            f'<stop offset=".35" stop-color="{MOON_DIM}" stop-opacity=".12"/><stop offset="1" stop-color="{MOON_DIM}" stop-opacity="0"/></radialGradient>'
            f'<linearGradient id="nSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#151d3a"/><stop offset="1" stop-color="#070a14"/></linearGradient>'
            f'<linearGradient id="nMist" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{MOON_DIM}" stop-opacity="0"/>'
            f'<stop offset=".7" stop-color="{MOON_DIM}" stop-opacity=".18"/><stop offset="1" stop-color="{MOON_DIM}" stop-opacity="0"/></linearGradient></defs>')
    return (f'<svg viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="%%heroAria%%">{defs}'
            f'<rect width="{W}" height="{H}" fill="url(#nSky)"/><g fill="{MOON}">{stars}</g>{moon}'
            f'{sea}{mist}{roots}<path d="{trunk}" fill="#060a10"/>{boughs}<g>{crown}</g>{rim}{lights}</svg>')


# ---------- Chapter II: the single continent breaks apart (data-moves), the Well becomes the Maelstrom ----------
def sundering_svg():
    r = random.Random(21)
    kal = smooth_closed(jitter_closed(KAL_PTS, 9, r))
    nr = smooth_closed(jitter_closed(NR_PTS, 6, r))
    # each piece is drawn where it lay before the Sundering and drifts to today's place (data-move = today - before)
    pieces = (f'<g data-move="-130,0,-4"><g transform="translate(130,0)"><path class="halo" d="{kal}"/><path class="land" d="{kal}"/></g></g>'
              f'<g data-move="0,-70,3"><g transform="translate(0,70)"><path class="halo" d="{nr}"/><path class="land" d="{nr}"/></g></g>'
              f'<g data-move="150,0,5"><g transform="translate(399,90) scale(.54)"><path class="halo big" d="{EK_D}"/><path class="land big" d="{EK_D}"/></g></g>')
    isles = "".join(
        f'<g data-move="{dx},{dy},{dg}"><circle class="land" cx="{cx}" cy="{cy}" r="{rr}"/></g>'
        for cx, cy, rr, dx, dy, dg in [(470, 250, 9, -30, -40, 0), (500, 350, 11, 30, 50, 0), (440, 380, 7, -50, 60, 0), (520, 240, 6, 40, -50, 0)])
    spiral = []
    for i in range(80):
        t = i / 79 * math.pi * 4.2
        rad = 3 + t * 2.6
        spiral.append((480 + math.cos(t) * rad, 300 + math.sin(t) * rad))
    sp = "M" + " L".join(P(*p) for p in spiral)
    well = (f'<circle class="well-glow" cx="480" cy="300" r="70" fill="url(#nWell)"/>'
            f'<circle class="well" cx="480" cy="300" r="22"/>'
            f'<g class="mael after"><path class="maelp" d="{sp}"/></g>')
    labels = (f'<g class="before">{ftext(480, 262, "Well of Eternity", "ft goldt")}{ftext(330, 330, "%%oneLand%%", "rl")}'
              f'{ftext(480, 344, "Zin-Azshari", "ft dim")}</g>'
              f'<g class="after">{world_labels()}</g>')
    defs = ('<defs><radialGradient id="nWell"><stop offset="0" stop-color="#8fe3ff" stop-opacity=".8"/>'
            '<stop offset=".5" stop-color="#4a7bd0" stop-opacity=".3"/><stop offset="1" stop-color="#4a7bd0" stop-opacity="0"/></radialGradient></defs>')
    return (f'<svg class="map sundering" viewBox="0 0 1000 520" role="img" aria-label="%%sunderingAria%%">{defs}'
            f'{pieces}{isles}{well}{labels}</svg>')


# ---------- Chapter IV: the Third War in northern Kalimdor, one layer and one camera per step ----------
# places on the Azeroth map
ASH, FEL, HYJ, DARK, BAR, TELD = (205, 262), (222, 212), (268, 222), (180, 195), (250, 320), (165, 115)


def ek_svg():
    l1 = ('<g class="ly on" data-ly="1">'
          + route([(390, 300), (340, 310), (300, 312)], "horde", "horde")
          + route([(395, 380), (345, 372), (306, 362)], "al", "al")
          + ftext(352, 292, "%%strangers%%", "ft dim", "start")
          + pin(*ASH, "Ashenvale", "l") + '</g>')
    l2 = ('<g class="ly" data-ly="2">' + route([BAR, (232, 300), (214, 276)], "horde", "horde")
          + f'<circle class="ruin" cx="{ASH[0]}" cy="{ASH[1]}" r="12"/>'
          + ftext(ASH[0] - 16, ASH[1] + 22, "Cenarius †", "ft", "end") + pin(*ASH, "Ashenvale", "l")
          + pin(*BAR, "Warsong", "r") + '</g>')
    l3 = ('<g class="ly" data-ly="3">'
          f'<circle class="tox-ring" cx="{FEL[0]}" cy="{FEL[1]}" r="14"/>'
          + pin(*FEL, "Felwood", "l") + ftext(FEL[0] + 18, FEL[1] - 14, "Illidan", "ft rage", "start") + '</g>')
    l4 = ('<g class="ly" data-ly="4">'
          + route([BAR, (262, 290), (266, 240)], "horde", "horde")
          + route([(300, 330), (290, 280), (274, 238)], "al", "al")
          + route([ASH, (232, 250), (258, 230)], "gold", "gold")
          + route([(170, 160), (215, 175), (252, 205)], "void", "void")
          + f'<circle class="banner" cx="{HYJ[0]}" cy="{HYJ[1]}" r="13"/>'
          + ftext(HYJ[0] + 18, HYJ[1] + 30, "%%threeArmies%%", "ft dim", "start")
          + ftext(170, 152, "%%legion%%", "ft rage", "middle") + '</g>')
    l5 = ('<g class="ly" data-ly="5">'
          '<defs><radialGradient id="nTree"><stop offset="0" stop-color="#cff7e6" stop-opacity=".95"/>'
          '<stop offset=".45" stop-color="#7fd6b5" stop-opacity=".45"/><stop offset="1" stop-color="#7fd6b5" stop-opacity="0"/></radialGradient></defs>'
          f'<circle class="firezone" cx="{HYJ[0]}" cy="{HYJ[1]}" r="30" fill="url(#nTree)"/>'
          + ftext(HYJ[0] + 18, HYJ[1] + 24, "Archimonde †", "ft", "start") + ftext(HYJ[0], HYJ[1] - 26, "Nordrassil", "ft goldt") + '</g>')
    base_pins = pin(*HYJ, "Mount Hyjal", "r")
    cams = {1: [180, 220, 240, 170], 2: [150, 210, 190, 135], 3: [150, 160, 190, 135], 4: [150, 140, 240, 200], 5: [200, 170, 140, 100]}
    c1 = " ".join(str(n) for n in cams[1])
    return (f'<svg id="ek" class="map" viewBox="{c1}" data-cams=\'{json.dumps(cams, separators=(",", ":"))}\' '
            f'role="img" aria-label="%%ekAria%%">{WORLD_IMG}{l1}{l2}{l3}{l4}{l5}{base_pins}</svg>')


# ---------- Chapter V: Teldrassil ----------
def teldrassil_svg():
    DN, SG, DL, RT = (262, 372), (600, 268), (552, 386), (560, 576)
    paths = {"1": ([RT, (590, 615), (660, 648), (760, 664)], "gold", "0.3,0.9")}
    masks, lines, heads = revealed("mTd", paths)
    pins = (pin(*DN, "Darnassus", "r", "", 1) + pin(*SG, "Shadowglen", "r", "", 2)
            + pin(*DL, "Dolanaar", "l", "", 3) + pin(*RT, "Rut&#8217;theran Village", "r", "", 4))
    return (f'<svg class="map numbered" viewBox="120 90 760 560" role="img" aria-label="%%teldrassilAria%%">'
            f'<defs>{masks}</defs>{TELD_IMG}{lines}{ftext(770, 640, "%%toAuberdine%% ↘", "ft goldt", "start")}{heads}{pins}</svg>')


# ---------- Chapter V: night elf settlements and sea routes on the Azeroth map ----------
def world_svg():
    DN, AU, AS, NH, FM = (160, 112), (178, 205), (200, 262), (226, 160), (118, 445)
    MH = (374 + 488 * .78, 69 + 302 * .744)  # Menethil Harbor, Eastern Kingdoms map coords -> Azeroth
    paths = {
        "1": ([(170, 128), (178, 160), (180, 192)], "gold", "0.05,0.35"),
        "2": ([(186, 205), (300, 190), (480, 200), (640, 260), (f2(MH[0] - 8), f2(MH[1] - 4))], "gold", "0.35,0.9"),
    }
    masks, lines, heads = revealed("mNw", paths)
    pins = (pin(*DN, "Darnassus", "l", "", 1) + pin(*AU, "Auberdine", "l", "", 2) + pin(*AS, "Astranaar", "r", "", 3)
            + pin(*NH, "Nighthaven", "r", "", 4) + pin(*FM, "Feathermoon Stronghold", "r", "", 5)
            + f'<g data-show="0.9">{pin(*MH, "Menethil Harbor", "r", "", 6)}</g>')
    return (f'<svg class="map numbered" viewBox="70 80 700 420" role="img" aria-label="%%worldAria%%">'
            f'<defs>{masks}</defs>{WORLD_IMG}{lines}{heads}{pins}</svg>')


def f2(v):
    return round(v, 1)


# ---------- icons ----------
def crescent(cx, cy, r, k=.78):
    """Filled crescent (evenodd): a disc with an offset disc cut out."""
    o = r * (1 - k) * 2.2
    return (f"M{P(cx + r, cy)}A{f(r)},{f(r)} 0 1 0 {P(cx - r, cy)}A{f(r)},{f(r)} 0 1 0 {P(cx + r, cy)}Z"
            f"M{P(cx + o + r * k, cy - r * .12)}A{f(r * k)},{f(r * k)} 0 1 0 {P(cx + o - r * k, cy - r * .12)}"
            f"A{f(r * k)},{f(r * k)} 0 1 0 {P(cx + o + r * k, cy - r * .12)}Z")


def icons():
    return {
        # stage strip (64 units)
        "troll": '<path d="M18 30c0-11 6-18 14-18s14 7 14 18v6c0 10-6 17-14 19-8-2-14-9-14-19Z"/><path d="M18 24 6 18l12 12M46 24l12-6-12 12"/><circle cx="26" cy="33" r="2" fill="currentColor" stroke="none"/><circle cx="38" cy="33" r="2" fill="currentColor" stroke="none"/><path d="M26 44l-2 6M38 44l2 6M27 44h10"/>',
        "well": '<ellipse cx="32" cy="40" rx="22" ry="9"/><path d="M14 40c4-3 8-3 12 0s8 3 12 0 8-3 12 0"/><path d="M32 31V8M32 8l-6 6M32 8l6 6"/><circle cx="20" cy="22" r="1.6" fill="currentColor" stroke="none"/><circle cx="45" cy="18" r="1.6" fill="currentColor" stroke="none"/><circle cx="40" cy="26" r="1.1" fill="currentColor" stroke="none"/>',
        "elune": f'<path d="{crescent(32, 30, 20)}" fill="currentColor" stroke="none" fill-rule="evenodd"/><path d="M8 54h48"/><path d="M16 60h32"/>',
        "kaldorei": '<path d="M22 30c0-10 5-16 10-16s10 6 10 16v6c0 9-5 15-10 17-5-2-10-8-10-17Z"/><path d="M22 30 6 20l16 16M42 30l16-10-16 16"/><path d="M26 33h4M34 33h4"/><path d="M29 44c2 1.4 4 1.4 6 0"/><path d="M32 14c-4-6-10-8-14-6"/>',
        # chapter II cards (48 units)
        "crown": '<path d="M8 36 5 14l10 9 9-13 9 13 10-9-3 22Z"/><path d="M8 42h32"/>',
        "demon": '<path d="M14 18C8 12 8 6 10 3c2 6 7 8 10 9M34 18c6-6 6-12 4-15-2 6-7 8-10 9"/><path d="M14 22c0-7 4-11 10-11s10 4 10 11v6c0 8-4 13-10 15-6-2-10-7-10-15Z"/><path d="M19 27l4 2M29 27l-4 2"/><path d="M20 36c3 2 5 2 8 0"/>',
        "antlers": '<path d="M24 44V22"/><path d="M24 22c-6-2-10-8-10-16M14 14l-6-4M14 18l-8 2"/><path d="M24 22c6-2 10-8 10-16M34 14l6-4M34 18l8 2"/><path d="M18 34c-4 0-8 3-10 6M30 34c4 0 8 3 10 6"/>',
        "vial": '<path d="M19 6h10M21 6v12L12 34a6 6 0 0 0 5 9h14a6 6 0 0 0 5-9L27 18V6"/><path d="M15 30h18"/><circle cx="22" cy="36" r="1.5" fill="currentColor" stroke="none"/><circle cx="27" cy="34" r="1" fill="currentColor" stroke="none"/>',
        # chapter III places (48 units)
        "tree": '<path d="M24 44V26"/><path d="M24 30l-8-6M24 34l9-7"/><path d="M24 26c-11 0-17-6-15-13 2-6 8-8 12-6 1-4 5-6 9-4 4-3 10 0 10 5 5 1 7 7 3 11-3 4-9 7-19 7Z"/><path d="M14 44h20"/>',
        "glade": f'<path d="{crescent(24, 16, 9)}" fill="currentColor" stroke="none" fill-rule="evenodd"/><path d="M6 42c4-8 10-12 18-12s14 4 18 12"/><path d="M14 42c2-4 6-6 10-6s8 2 10 6"/>',
        "scarab": '<ellipse cx="24" cy="27" rx="10" ry="13"/><path d="M24 14v26"/><circle cx="24" cy="10" r="4"/><path d="M14 22 6 18M14 30l-8 2M15 37l-6 5M34 22l8-4M34 30l8 2M33 37l6 5"/>',
        # leaders (48 units)
        "moon": f'<path d="{crescent(24, 22, 15)}" fill="currentColor" stroke="none" fill-rule="evenodd"/><path d="M10 44h28"/>',
        "staff": '<path d="M24 46V14"/><path d="M24 14c-7-1-11-6-10-12M24 14c7-1 11-6 10-12"/><path d="M24 22l-7-4M24 26l7-4"/><circle cx="24" cy="12" r="2.4" fill="currentColor" stroke="none"/>',
        "dream": '<path d="M8 32c6 6 26 6 32 0"/><path d="M12 26c0-8 5-14 12-14s12 6 12 14"/><path d="M18 24h4M26 24h4"/><path d="M32 8h6l-6 6h6M38 2h4l-4 4h4"/>',
        "sep": crescent(0, 0, 13, .8),
        "brand": crescent(12, 12, 10, .8),
    }


def main():
    write_ts(LIB / "night-elf-art.ts", "NIGHT_ELF_ART", {
        "hero": hero_svg(),
        "sundering": sundering_svg(),
        "ek": ek_svg(),
        "teldrassil": teldrassil_svg(),
        "world": world_svg(),
        "icons": icons(),
    })


if __name__ == "__main__":
    main()
