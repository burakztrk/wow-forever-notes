#!/usr/bin/env python3
"""Generates src/lib/stories/tauren-art.ts: the maps and drawings of the Tauren story.

Run from the repo root:  python3 scripts/stories/tauren_art.py   (helpers in art_lib.py)
No cover is drawn: the hero art comes from the site owner.
"""
from art_lib import *  # noqa: F401,F403

DESOLACE_IMG = '<image class="map-img" href="%%base%%maps/desolace.webp" width="1002" height="668"/>'
MULGORE_IMG = '<image class="map-img" href="%%base%%maps/mulgore.webp" width="1002" height="668"/>'
WORLD_IMG = '<image class="map-img" href="%%base%%maps/azeroth.webp" width="1002" height="668"/>'

# places on the Desolace map (read off the painted 1002x668 map)
MAR, KG, SPV, TAF, MC = (332, 374), (508, 386), (242, 466), (552, 272), (526, 514)


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


# ---------- Chapter II: Desolace, Maraudon and the centaur raids ----------
def desolace_svg():
    paths = {
        "1": ([MAR, (410, 378), (492, 384)], "rage", "0.05,0.35"),
        "2": ([KG, (516, 444), (524, 498)], "rage", "0.35,0.62"),
        "3": ([KG, (585, 350), (660, 304), (728, 266)], "gold", "0.62,0.95"),
    }
    masks, lines, heads = revealed("m Td".replace(" ", ""), paths)
    pins = (pin(*MAR, "Maraudon", "l", "", 1)
            + f'<g data-show="0.35">{pin(*KG, "Kodo Graveyard", "t", "", 2)}</g>'
            + pin(*SPV, "Shadowprey Village", "r", "", 3)
            + pin(*TAF, "Thunder Axe Fortress", "r", "", 4)
            + f'<g data-show="0.62">{pin(*MC, "Mannoroc Coven", "r", "", 5)}</g>')
    marks = (f'<circle class="tox-ring" cx="{MAR[0]}" cy="{MAR[1]}" r="16"/>'
             f'<g data-show="0.35"><circle class="ruin" cx="{KG[0]}" cy="{KG[1]}" r="15"/></g>'
             f'<g data-show="0.62"><circle class="ruin" cx="{MC[0]}" cy="{MC[1]}" r="14"/></g>')
    labels = f'<g data-show="0.95">{ftext(736, 254, "%%toBarrens%%", "ft goldt", "end")}</g>'
    return (f'<svg class="map numbered" viewBox="150 180 620 410" role="img" aria-label="%%desolaceAria%%">'
            f'<defs>{masks}</defs>{DESOLACE_IMG}{marks}{lines}{labels}{heads}{pins}</svg>')


# ---------- Chapter III: the Great Totem of Thunder Bluff rises as you scroll (data-moves) ----------
def totem_svg():
    W, H, cx, cy = 1000, 340, 500, 175
    defs = ('<linearGradient id="tWood" x1="0" y1="0" x2="1" y2="0">'
            '<stop offset="0" stop-color="#3d2718"/><stop offset=".5" stop-color="#6b4428"/><stop offset="1" stop-color="#2e1d12"/></linearGradient>'
            '<linearGradient id="tWing" x1="0" y1="0" x2="0" y2="1">'
            '<stop offset="0" stop-color="#d89b48"/><stop offset=".55" stop-color="#9c5a25"/><stop offset="1" stop-color="#472814"/></linearGradient>'
            '<radialGradient id="tSun"><stop offset="0" stop-color="#fff4cc"/><stop offset=".4" stop-color="#f0b654" stop-opacity=".85"/>'
            '<stop offset="1" stop-color="#c86428" stop-opacity="0"/></radialGradient>')

    def wing(side):
        # carved thunderbird wing + feathered runespear half that unfolds outward as --p grows
        p = lambda dx, dy: P(cx + side * dx, cy + dy)
        feathers = "".join(
            f'<path d="M{p(38, -28 + i * 16)}L{p(188 - i * 18, -56 + i * 22)}L{p(172 - i * 18, -32 + i * 22)}L{p(38, -14 + i * 16)}Z" '
            f'fill="url(#tWing)" stroke="#1a110b" stroke-width="2.5"/>'
            for i in range(4)
        )
        spear = (f'<path d="M{p(20, 44)}L{p(215, -36)}" stroke="#8a5a32" stroke-width="7" stroke-linecap="round"/>'
                 f'<path d="M{p(215, -36)}L{p(250, -56)}L{p(232, -28)}L{p(256, -32)}L{p(215, -36)}Z" fill="#d8b46a" stroke="#1a110b" stroke-width="2"/>')
        return spear + feathers

    # central carved totem trunk
    trunk = (f'<rect x="{cx - 42}" y="68" width="84" height="214" rx="10" fill="url(#tWood)" stroke="#1a110b" stroke-width="3.5"/>'
             f'<path d="M{cx - 42} 126C{cx - 92} 118 {cx - 108} 76 {cx - 88} 44C{cx - 74} 74 {cx - 58} 94 {cx - 42} 100Z" fill="#d6ccb8" stroke="#1a110b" stroke-width="3"/>'
             f'<path d="M{cx + 42} 126C{cx + 92} 118 {cx + 108} 76 {cx + 88} 44C{cx + 74} 74 {cx + 58} 94 {cx + 42} 100Z" fill="#d6ccb8" stroke="#1a110b" stroke-width="3"/>'
             f'<path d="M{cx - 28} 138L{cx - 10} 146L{cx - 28} 152ZM{cx + 28} 138L{cx + 10} 146L{cx + 28} 152Z" fill="#ffd98a"/>'
             f'<path d="M{cx - 32} 182L{cx} 204L{cx + 32} 182M{cx - 32} 212L{cx} 234L{cx + 32} 212M{cx - 32} 242L{cx} 264L{cx + 32} 242" '
             f'fill="none" stroke="#d89b48" stroke-width="4" stroke-linecap="round"/>')

    # sun and crescent crest (An'she & Mu'sha) rising above the horns
    crest = (f'<circle cx="{cx}" cy="66" r="24" fill="#f0b654" stroke="#1a110b" stroke-width="2.5"/>'
             f'<path d="M{cx + 6} 48A16 16 0 1 0 {cx + 6} 84A13 13 0 1 1 {cx + 6} 48Z" fill="#dce8ff"/>')

    r = random.Random(31)
    sparks = "".join(
        f'<circle cx="{f(cx + r.uniform(-160, 160))}" cy="{f(cy + r.uniform(-95, 75))}" r="{f(r.uniform(2.2, 6.2))}" fill="url(#tSun)"/>'
        for _ in range(26)
    )
    glow = f'<circle class="break-glow" cx="{cx}" cy="{cy - 10}" r="185" fill="url(#tSun)"/>'
    labels = (f'<g class="before">{ftext(cx, H - 20, "%%nomads%%", "ft goldt")}</g>'
              f'<g class="after">{ftext(cx, H - 20, "%%bluff%%", "ft goldt")}</g>')
    return (f'<svg class="map chains" viewBox="-110 0 {W + 220} {H}" role="img" aria-label="%%totemAria%%"><defs>{defs}</defs>'
            f'{glow}<g data-move="-85,-14,-9">{wing(-1)}</g><g data-move="85,-14,9">{wing(1)}</g>'
            f'<g data-move="0,-24,0">{crest}</g>{trunk}<g class="sparks">{sparks}</g>{labels}</svg>')


# ---------- Chapter IV: from the Barrens to Mount Hyjal, one layer and one camera per step ----------
BAR, MUL, STM, HYJ, TN = (262, 330), (215, 350), (202, 292), (268, 222), (256, 428)


def ek_svg():
    l1 = ('<g class="ly on" data-ly="1">'
          + route([(312, 346), (288, 338), (270, 332)], "horde", "horde")
          + f'<circle class="tox-ring" cx="{BAR[0]}" cy="{BAR[1]}" r="12"/>'
          + ftext(BAR[0] + 16, BAR[1] + 22, "%%centaurs%%", "ft rage", "start")
          + pin(*BAR, "The Barrens", "r") + '</g>')
    l2 = ('<g class="ly" data-ly="2">'
          + route([BAR, (240, 342), (222, 348)], "gold", "gold")
          + f'<circle class="banner gold" cx="{MUL[0]}" cy="{MUL[1]}" r="13"/>'
          + pin(*MUL, "Mulgore · Thunder Bluff", "l") + '</g>')
    l3 = ('<g class="ly" data-ly="3">'
          + route([MUL, (208, 322), (204, 300)], "gold", "gold")
          + f'<circle class="banner" cx="{STM[0]}" cy="{STM[1]}" r="12"/>'
          + ftext(STM[0] - 14, STM[1] - 14, "Medivh", "ft goldt", "end")
          + pin(*STM, "Stonetalon Peak", "l") + '</g>')
    l4 = ('<g class="ly" data-ly="4">'
          + route([STM, (226, 260), (258, 228)], "horde", "horde")
          + route([(295, 290), (282, 256), (272, 232)], "al", "al")
          + f'<circle class="banner gold" cx="{HYJ[0]}" cy="{HYJ[1]}" r="14"/>'
          + ftext(HYJ[0] + 16, HYJ[1] + 22, "Archimonde †", "ft", "start")
          + pin(*HYJ, "Mount Hyjal", "r") + '</g>')
    l5 = ('<g class="ly" data-ly="5">'
          + route([MUL, (232, 388), (250, 420)], "rage", "rage")
          + f'<circle class="ruin" cx="{TN[0]}" cy="{TN[1]}" r="12"/>'
          + ftext(TN[0] + 16, TN[1] - 12, "Grimtotem", "ft rage", "start")
          + pin(*TN, "Thousand Needles", "r") + '</g>')
    base_pins = pin(*MUL, "Mulgore", "l") + pin(*BAR, "The Barrens", "r")
    cams = {
        1: [185, 275, 195, 145],
        2: [155, 285, 180, 135],
        3: [145, 240, 175, 140],
        4: [155, 175, 200, 165],
        5: [160, 310, 185, 155],
    }
    c1 = " ".join(str(n) for n in cams[1])
    return (f'<svg id="ek" class="map" viewBox="{c1}" data-cams=\'{json.dumps(cams, separators=(",", ":"))}\' '
            f'role="img" aria-label="%%ekAria%%">{WORLD_IMG}{l1}{l2}{l3}{l4}{l5}{base_pins}</svg>')


# ---------- Chapter V: Mulgore ----------
def mulgore_svg():
    TB, CN, BV, RR, BR = (395, 362), (442, 518), (500, 426), (582, 210), (626, 534)
    paths = {
        "1": ([CN, (418, 480), (464, 450), (492, 432), (434, 404), (402, 372)], "gold", "0.08,0.62"),
        "2": ([BR, (578, 496), (532, 456)], "rage", "0.58,0.95"),
    }
    masks, lines, heads = revealed("mMg", paths)
    pins = (pin(*TB, "Thunder Bluff", "l", "", 1)
            + pin(*CN, "Camp Narache", "b", "", 2)
            + pin(*BV, "Bloodhoof Village", "r", "", 3)
            + pin(*RR, "Red Rocks", "r", "", 4)
            + pin(*BR, "Brambleblade Ravine", "r", "", 5))
    marks = f'<circle class="ruin" cx="{RR[0]}" cy="{RR[1]}" r="13"/><circle class="ruin" cx="{BR[0]}" cy="{BR[1]}" r="13"/>'
    return (f'<svg class="map numbered" viewBox="210 90 560 520" role="img" aria-label="%%mulgoreAria%%">'
            f'<defs>{masks}</defs>{MULGORE_IMG}{marks}{lines}{heads}{pins}</svg>')


# ---------- Chapter V: Tauren outposts and druid paths across Kalimdor ----------
def world_svg():
    TB, CT, SRR, FP, CM, NH = (215, 350), (254, 374), (198, 296), (262, 432), (188, 424), (226, 160)
    paths = {
        "1": ([TB, (238, 362), (250, 372), (258, 404), (262, 424)], "gold", "0.05,0.4"),
        "2": ([TB, (206, 324), (200, 304)], "gold", "0.35,0.65"),
        "3": ([TB, (198, 390), (190, 416)], "gold", "0.5,0.78"),
        "4": ([SRR, (208, 240), (222, 172)], "gold", "0.65,0.95"),
    }
    masks, lines, heads = revealed("mTw", paths)
    pins = (pin(*TB, "Thunder Bluff", "l", "", 1)
            + pin(*CT, "Camp Taurajo", "r", "", 2)
            + pin(*SRR, "Sun Rock Retreat", "l", "", 3)
            + f'<g data-show="0.4">{pin(*FP, "Freewind Post", "r", "", 4)}</g>'
            + f'<g data-show="0.78">{pin(*CM, "Camp Mojache", "l", "", 5)}</g>'
            + f'<g data-show="0.95">{pin(*NH, "Nighthaven", "r", "", 6)}</g>')
    return (f'<svg class="map numbered" viewBox="100 115 290 370" role="img" aria-label="%%worldAria%%">'
            f'<defs>{masks}</defs>{WORLD_IMG}{lines}{heads}{pins}</svg>')


# ---------- icons (line art: 64 units for the stage strip, 48 for cards; sep 32 and brand 24 are filled) ----------
def horns_d(cx, cy, s):
    """Tauren bull horns embracing the sun disc of the Earth Mother, filled (sep and header brand)."""
    p = lambda x, y: P(cx + x * s, cy + y * s)
    r = 4.6 * s
    sun = f"M{P(cx + r, cy - 2 * s)}A{f(r)},{f(r)} 0 1 0 {P(cx - r, cy - 2 * s)}A{f(r)},{f(r)} 0 1 0 {P(cx + r, cy - 2 * s)}Z"
    left = f"M{p(-2, 6)}C{p(-11, 5)} {p(-15, -3)} {p(-12, -12)}C{p(-9, -4)} {p(-6, 1)} {p(-2, 2)}Z"
    right = f"M{p(2, 6)}C{p(11, 5)} {p(15, -3)} {p(12, -12)}C{p(9, -4)} {p(6, 1)} {p(2, 2)}Z"
    totem = f"M{p(-3.2, 5)}L{p(3.2, 5)}L{p(2.2, 13)}L{p(-2.2, 13)}Z"
    return sun + left + right + totem


def icons():
    return {
        # stage strip (64 units)
        "earthmother": '<circle cx="24" cy="22" r="8"/><path d="M44 14a8 8 0 1 0 0 16 6.5 6.5 0 1 1 0-16Z"/><path d="M8 50c8-10 18-14 28-10 6 2 12 6 20 10"/><path d="M14 56c10-6 26-6 36 0"/>',
        "kodo": '<path d="M12 42v-8c0-8 7-14 18-14h10c6 0 12 4 14 10l-4 8h-6v10h-6v-8H24v8h-6v-6Z"/><path d="M50 28l8-6-2 8"/><path d="M22 20l-4-6M30 20l-2-6"/>',
        "antlers": '<path d="M32 54V28"/><path d="M32 28c-8-2-14-10-14-20M18 16l-8-4M18 22l-10 2"/><path d="M32 28c8-2 14-10 14-20M46 16l8-4M46 22l10 2"/><path d="M22 44c-5 0-10 4-12 8M42 44c5 0 10 4 12 8"/>',
        "totem": '<path d="M24 58V14h16v44"/><path d="M24 22 8 14l4 12h12M40 22l16-8-4 12H40"/><path d="M20 14c-6-2-8-6-6-10 2 4 6 6 10 6h16c4 0 8-2 10-6 2 4 0 8-6 10Z"/><path d="M28 30h8M26 40l6 5 6-5"/>',
        # chapter II cards (48 units)
        "crystal": '<path d="M24 6 14 22l4 20h12l4-20Z"/><path d="M14 22 6 28l4 14h8M34 22l8 6-4 14h-8"/><path d="M24 6v36"/>',
        "grove": '<path d="M24 44V20"/><path d="M24 24c-7-2-12-8-12-16M12 14l-5-3"/><path d="M24 24c7-2 12-8 12-16M36 14l5-3"/><path d="M14 40h20"/>',
        "centaur": '<path d="M10 40 38 10"/><path d="M38 10l4 10-10-4Z"/><path d="M14 12c10 2 18 10 20 20"/><path d="M12 22l22 12"/>',
        "kodobone": '<path d="M14 24c0-7 4-12 10-12s10 5 10 12v8l-6 8h-8l-6-8Z"/><path d="M14 20C7 18 5 12 7 6c2 5 5 8 9 9M34 20c7-2 9-8 7-14-2 5-5 8-9 9"/><circle cx="20" cy="25" r="2"/><circle cx="28" cy="25" r="2"/>',
        # chapter III cards (48 units)
        "halberd": '<path d="M24 44V14"/><path d="M18 16V6l6 6 6-6v10Z"/><path d="M18 22l-6 4M30 22l6 4"/><path d="M20 32h8"/>',
        "totemshield": '<path d="M18 42V12h12v30"/><path d="M18 18 8 13l3 9h7M30 18l10-5-3 9h-7"/><circle cx="24" cy="24" r="3"/><path d="M18 32h12"/>',
        "axes": '<path d="M10 42 36 10M38 42 12 10"/><path d="M31 8c6 0 11 5 11 11-5-1-8-3-11-6Z"/><path d="M17 8C11 8 6 13 6 19c5-1 8-3 11-6Z"/>',
        "mesa": '<path d="M6 42l6-22h10l3 10h6l3-14h8l4 26"/><path d="M22 20h12"/><path d="M14 14h6M34 10h6"/>',
        # leaders (48 units)
        "runespear": '<path d="M10 42 36 12"/><path d="M32 8l10 2-6 10-6-6Z"/><path d="M38 6l4 4"/><path d="M24 26l-6 2M28 22l2 6"/>',
        "sunmoon": '<circle cx="20" cy="18" r="7"/><path d="M32 11a8 8 0 1 0 0 14 6.5 6.5 0 1 1 0-14Z"/><path d="M24 30v14M16 38h16"/>',
        "grimtotem": '<path d="M16 44V12h16v32"/><path d="M12 16l4-6M36 16l-4-6"/><path d="M19 22l4 3M29 22l-4 3"/><path d="M19 32c3-2 7-2 10 0"/>',
        "sep": horns_d(0, 0, 1),
        "brand": horns_d(12, 12, .76),
    }


def main():
    write_ts(LIB / "tauren-art.ts", "TAUREN_ART", {
        "desolace": desolace_svg(),
        "totem": totem_svg(),
        "ek": ek_svg(),
        "mulgore": mulgore_svg(),
        "world": world_svg(),
        "icons": icons(),
    })


if __name__ == "__main__":
    main()
