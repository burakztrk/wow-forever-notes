#!/usr/bin/env python3
"""Generates src/lib/stories/troll-art.ts: the maps and drawings of the Troll story.

Run from the repo root:  python3 scripts/stories/troll_art.py   (helpers in art_lib.py)
No cover is drawn: the hero art comes from the site owner.
"""
from art_lib import *  # noqa: F401,F403

EK_IMG = '<image class="map-img" href="%%base%%maps/eastern-kingdoms.webp" width="1002" height="668"/>'
STV_IMG = '<image class="map-img" href="%%base%%maps/stranglethorn-vale.webp" width="1002" height="668"/>'
WORLD_IMG = '<image class="map-img" href="%%base%%maps/azeroth.webp" width="1002" height="668"/>'

# places on the Eastern Kingdoms map (read off the painted map; approximate)
QT, ZA, STROM, ALT, JA = (612, 66), (596, 122), (505, 252), (486, 206), (575, 238)


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


# ---------- Chapter II: the Amani empire, the Troll Wars and the Second War ----------
def amani_svg():
    paths = {
        "1": ([ZA, (606, 98), (610, 76)], "rage", "0.04,0.24"),
        "2": ([STROM, (498, 196), (526, 130), (580, 84), (602, 68)], "al", "0.26,0.56"),
        "3": ([JA, (590, 196), (618, 150), (624, 104), (618, 74)], "horde", "0.58,0.84"),
        "4": ([ZA, (582, 170), (572, 214), (JA[0], JA[1] - 8)], "rage", "0.84,0.98"),
    }
    masks, lines, heads = revealed("mAm", paths)
    pins = (pin(*ZA, "Zul&#8217;Aman", "l", "", 1)
            + f'<g data-show="0.24">{pin(*QT, "Quel&#8217;Thalas", "r", "", 2)}</g>'
            + f'<g data-show="0.26">{pin(*STROM, "Strom", "r", "", 3)}</g>'
            + f'<g data-show="0.84">{pin(*JA, "Jintha&#8217;Alor", "r", "", 4)}</g>')
    marks = (f'<circle class="ruin" cx="{ALT[0]}" cy="{ALT[1]}" r="13"/>'
             f'<g data-show="0.56"><circle class="banner" cx="{QT[0]}" cy="{QT[1]}" r="14"/></g>')
    labels = ftext(ALT[0] - 16, ALT[1] + 24, "%%trollWars%%", "ft dim", "end")
    return (f'<svg class="map numbered" viewBox="430 30 230 290" role="img" aria-label="%%amaniAria%%">'
            f'<defs>{masks}</defs>{EK_IMG}{marks}{lines}{labels}{heads}{pins}</svg>')


# ---------- Chapter III: Zul'Gurub, Hakkar and the Darkspear's flight ----------
def gurubashi_svg():
    ZG, ARENA, YOJ, ZK = (610, 118), (305, 323), (205, 150), (247, 75)
    paths = {
        "1": ([ZG, (640, 82), (668, 52)], "void", "0.05,0.35"),
        "2": ([ARENA, (252, 342), (196, 380), (140, 436)], "gold", "0.4,0.95"),
    }
    masks, lines, heads = revealed("mGu", paths)
    pins = (pin(*ZG, "Zul&#8217;Gurub", "l", "", 1) + pin(*ARENA, "Gurubashi Arena", "r", "", 2)
            + pin(*YOJ, "Yojamba Isle", "r", "", 3) + pin(*ZK, "Balia&#8217;mah Ruins", "r", "", 4))
    marks = f'<circle class="scourge" cx="{ZG[0]}" cy="{ZG[1]}" r="18"/>'
    labels = (f'<g data-show="0.35">{ftext(676, 44, "%%toTemple%%", "ft dim", "end")}</g>'
              f'<g data-show="0.95">{ftext(150, 462, "%%toSeas%%", "ft goldt", "start")}</g>')
    return (f'<svg class="map numbered" viewBox="100 10 610 570" role="img" aria-label="%%gurubashiAria%%">'
            f'<defs>{masks}</defs>{STV_IMG}{marks}{lines}{labels}{heads}{pins}</svg>')


# ---------- Chapter IV: the Darkspear from Stranglethorn to Durotar, one layer and one camera per step ----------
STV, ISLE, ECHO, SJV, ORG = (722, 500), (384, 440), (318, 358), (296, 340), (300, 286)


def ek_svg():
    l1 = ('<g class="ly on" data-ly="1">'
          + route([STV, (696, 514), (650, 520), (606, 502)], "rage", "rage")
          + ftext(660, 542, "%%exile%%", "ft rage") + '</g>')
    l2 = ('<g class="ly" data-ly="2">' + route([(606, 502), (520, 470), (450, 450), (402, 444)], "rage", "rage")
          + f'<circle class="tox-ring" cx="{ISLE[0]}" cy="{ISLE[1]}" r="14"/>'
          + ftext(ISLE[0], ISLE[1] + 30, "%%vision%%", "ft dim") + pin(*ISLE, "Darkspear", "t") + '</g>')
    l3 = ('<g class="ly" data-ly="3">' + route([(596, 338), (540, 398), (470, 428), (408, 440)], "horde", "horde")
          + f'<circle class="ruin" cx="{ISLE[0]}" cy="{ISLE[1]}" r="14"/>'
          + ftext(ISLE[0] - 2, ISLE[1] + 30, "Sen&#8217;jin †", "ft") + pin(*ISLE, "Darkspear", "t") + '</g>')
    l4 = ('<g class="ly" data-ly="4">' + route([(396, 440), (360, 420), (336, 394), (322, 368)], "horde", "horde")
          + pin(*ECHO, "Echo Isles", "r") + '</g>')
    l5 = ('<g class="ly" data-ly="5">'
          f'<circle class="ruin" cx="{ECHO[0]}" cy="{ECHO[1]}" r="12"/>'
          + ftext(ECHO[0] + 14, ECHO[1] + 16, "%%zalazane%%", "ft rage", "start")
          + route([(ECHO[0] - 4, ECHO[1] - 6), (306, 350), (SJV[0] + 2, SJV[1] + 4)], "gold", "gold")
          + pin(*ECHO, "Echo Isles", "r") + pin(*SJV, "Sen&#8217;jin Village", "l") + pin(*ORG, "Orgrimmar", "r") + '</g>')
    base_pins = pin(*STV, "Stranglethorn Vale", "r")
    cams = {1: [570, 430, 220, 130], 2: [330, 400, 300, 140], 3: [330, 320, 300, 150], 4: [290, 330, 130, 130], 5: [265, 300, 90, 80]}
    c1 = " ".join(str(n) for n in cams[1])
    return (f'<svg id="ek" class="map" viewBox="{c1}" data-cams=\'{json.dumps(cams, separators=(",", ":"))}\' '
            f'role="img" aria-label="%%ekAria%%">{WORLD_IMG}{l1}{l2}{l3}{l4}{l5}{base_pins}</svg>')


# ---------- Chapter V: troll lands on the Azeroth map ----------
def world_svg():
    SJw, ZF, ZGw, YJw, JAw, FM = (296, 340), (268, 498), (762, 492), (697, 492), az(*JA), (705, 340)
    pins = (pin(*SJw, "Sen&#8217;jin Village", "r", "", 1) + pin(*ZF, "Zul&#8217;Farrak", "r", "", 2)
            + pin(*ZGw, "Zul&#8217;Gurub", "r", "", 3) + pin(*YJw, "Yojamba Isle", "l", "", 4)
            + pin(*JAw, "Jintha&#8217;Alor", "l", "", 5) + pin(*FM, "Frostmane", "l", "", 6))
    return (f'<svg class="map numbered" viewBox="170 210 720 400" role="img" aria-label="%%worldAria%%">'
            f'{WORLD_IMG}{pins}</svg>')


# ---------- icons (line art: 64 units for the stage strip, 48 for cards; sep 32 and brand 24 are filled) ----------
def mask_d(cx, cy, s):
    """A tiki mask, filled, with eyes and a mouth cut out (evenodd)."""
    p = lambda x, y: P(cx + x * s, cy + y * s)
    out = "M" + "L".join(p(x, y) for x, y in [(-9, -13), (9, -13), (12, -4), (9, 13), (4, 19), (-4, 19), (-9, 13), (-12, -4)]) + "Z"
    for x0, y0, x1, y1 in [(-7, -6, -2, -2), (2, -6, 7, -2), (-4, 6, 4, 9)]:
        out += f"M{p(x0, y0)}L{p(x1, y0)}L{p(x1, y1)}L{p(x0, y1)}Z"
    return out


def icons():
    skull = '<path d="M24 6c-9 0-14 6-14 14 0 5 2 8 5 10v6h18v-6c3-2 5-5 5-10 0-8-5-14-14-14Z"/><circle cx="19" cy="21" r="3"/><circle cx="29" cy="21" r="3"/><path d="M20 36v5M24 36v5M28 36v5"/>'
    return {
        # stage strip (64 units)
        "mask": '<path d="M20 8h24l4 14-4 24-8 10h-8l-8-10-4-24Z"/><path d="M24 24h6M34 24h6"/><path d="M26 38h12M28 45h8"/><path d="M14 6l6 8M50 6l-6 8"/>',
        "serpent": '<path d="M14 54c14 0 26-6 26-14S24 32 27 24s14-8 20-4"/><path d="M47 20l7-2-5 7"/><circle cx="45" cy="21" r="1.6" fill="currentColor" stroke="none"/><path d="M14 54l-4 4"/>',
        "insect": '<ellipse cx="32" cy="38" rx="12" ry="16"/><path d="M32 22v32"/><circle cx="32" cy="15" r="5"/><path d="M20 30 8 24M20 40l-12 2M22 48l-10 8M44 30l12-6M44 40l12 2M42 48l10 8"/>',
        "spears": '<path d="M14 56 46 12M50 56 18 12"/><path d="M46 12l6-8-10 4ZM18 12l-6-8 10 4Z"/><path d="M28 40h8"/>',
        # chapter II cards (48 units)
        "axe": '<path d="M12 44 34 8"/><path d="M27 10c6-6 14-4 17 2-5 4-11 5-16 2Z"/><path d="M23 18c-6-4-14-1-15 6 6 2 12 1 15-3"/>',
        "swords": '<path d="M8 40 36 8M40 40 12 8"/><path d="M4 36l8 8M44 36l-8 8"/><path d="M36 8l4-4M12 8 8 4"/>',
        "skullspear": skull,
        "tusk": '<path d="M14 42C12 22 22 8 38 6c-6 6-8 16-6 26l-8 10Z"/><path d="M8 44h28"/>',
        # chapter III cards (48 units)
        "blood": '<path d="M24 5C16 16 10 24 10 31a14 14 0 0 0 28 0c0-7-6-15-14-26Z"/><path d="M17 32a7 7 0 0 0 7 7"/>',
        "flame": '<path d="M24 42c-9 0-13-7-11-14 2-6 7-8 7-16 6 4 9 9 9 14 2-2 3-4 3-7 4 5 5 10 3 15-2 5-6 8-11 8Z"/>',
        "idol": '<path d="M16 44V12h16v32"/><path d="M12 12h24l-3-6H15Z"/><path d="M20 20h3M26 20h3"/><path d="M20 28c2 2 6 2 8 0"/><path d="M16 36h16"/>',
        "spear": '<path d="M8 42 38 8"/><path d="M38 8l4 12-12-4Z"/><path d="M14 36l-4 4M18 40l-4 4"/>',
        # leaders (48 units)
        "maskc": '<path d="M14 6h20l3 11-3 19-6 8h-8l-6-8-3-19Z"/><path d="M18 18h4M26 18h4"/><path d="M19 28h10M21 34h6"/>',
        "staff": '<path d="M24 46V14"/><path d="M24 14c-6-2-9-6-8-10M24 14c6-2 9-6 8-10"/><circle cx="24" cy="24" r="2.5"/><path d="M24 30l-6 4M24 30l6 4"/>',
        "eye": '<path d="M4 24c6-10 14-14 20-14s14 4 20 14c-6 10-14 14-20 14S10 34 4 24Z"/><circle cx="24" cy="24" r="6"/><circle cx="24" cy="24" r="2" fill="currentColor" stroke="none"/>',
        "sep": mask_d(0, 0, 1),
        "brand": mask_d(12, 12, .58),
    }


def main():
    write_ts(LIB / "troll-art.ts", "TROLL_ART", {
        "amani": amani_svg(),
        "gurubashi": gurubashi_svg(),
        "ek": ek_svg(),
        "world": world_svg(),
        "icons": icons(),
    })


if __name__ == "__main__":
    main()
