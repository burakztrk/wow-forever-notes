#!/usr/bin/env python3
"""Generates src/lib/stories/undead-art.ts: the maps and drawings of the Undead story.

Run from the repo root:  python3 scripts/stories/undead_art.py   (helpers in art_lib.py)
No cover is drawn: the hero art comes from the site owner.
"""
from art_lib import *  # noqa: F401,F403

EK_IMG = '<image class="map-img" href="%%base%%maps/eastern-kingdoms.webp" width="1002" height="668"/>'
TIRISFAL_IMG = '<image class="map-img" href="%%base%%maps/tirisfal-glades.webp" width="1002" height="668"/>'
WORLD_IMG = '<image class="map-img" href="%%base%%maps/azeroth.webp" width="1002" height="668"/>'

# places on the Eastern Kingdoms map (same reading as the Human story's)
LD, AND, STRAT, DAL, QT = (468, 155), (503, 165), (560, 112), (466, 190), (615, 70)
TG, SEP, TM, BW = (442, 138), (420, 192), (478, 218), (488, 156)


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


# ---------- Chapter II: the plague, the fall of Lordaeron and the march on Quel'Thalas ----------
def scourge_svg():
    paths = {
        "1": ([AND, (530, 150), (548, 128), STRAT], "void", "0.04,0.22"),
        "2": ([STRAT, (580, 78), (572, 36), (556, 12)], "rage", "0.22,0.38"),
        "3": ([(520, 12), (498, 64), (480, 118), (470, 146)], "rage", "0.38,0.56"),
        "4": ([LD, (502, 144), (558, 114), (594, 88), (610, 74)], "rage", "0.58,0.8"),
        "5": ([QT, (574, 108), (522, 150), (476, 184)], "void", "0.82,0.97"),
    }
    masks, lines, heads = revealed("mUs", paths)
    pins = (pin(*AND, "Andorhal", "b", "", 1)
            + f'<g data-show="0.22">{pin(*STRAT, "Stratholme", "r", "", 2)}</g>'
            + f'<g data-show="0.56">{pin(*LD, "Lordaeron", "l", "", 3)}</g>'
            + f'<g data-show="0.8">{pin(*QT, "Quel&#8217;Thalas", "r", "", 4)}</g>'
            + f'<g data-show="0.97">{pin(*DAL, "Dalaran", "l", "", 5)}</g>')
    marks = (f'<g data-show="0.22"><circle class="ruin" cx="{STRAT[0]}" cy="{STRAT[1]}" r="14"/></g>'
             f'<g data-show="0.56"><circle class="scourge" cx="{LD[0]}" cy="{LD[1]}" r="16"/></g>'
             f'<g data-show="0.8"><circle class="scourge" cx="{QT[0]}" cy="{QT[1]}" r="15"/></g>'
             f'<g data-show="0.97"><circle class="scourge" cx="{DAL[0]}" cy="{DAL[1]}" r="13"/></g>')
    labels = (ftext(584, 28, "%%toNorthrend%%", "ft rage", "start")
              + f'<g data-show="0.56">{ftext(LD[0] - 16, LD[1] + 22, "Terenas †", "ft", "end")}</g>'
              + f'<g data-show="0.8">{ftext(QT[0] - 14, QT[1] - 16, "Sylvanas †", "ft", "end")}</g>')
    return (f'<svg class="map numbered" viewBox="340 4 320 240" role="img" aria-label="%%scourgeAria%%">'
            f'<defs>{masks}</defs>{EK_IMG}{marks}{lines}{labels}{heads}{pins}</svg>')


# ---------- Chapter IV: the Forsaken rebellion in Lordaeron, one layer and one camera per step ----------
def ek_svg():
    l1 = ('<g class="ly on" data-ly="1">'
          f'<circle class="scourge" cx="{LD[0]}" cy="{LD[1]}" r="16"/>'
          + route([LD, (452, 118), (444, 62)], "rage", "rage")
          + ftext(454, 52, "%%arthasLeaves%%", "ft rage", "start")
          + pin(*TG, "Sylvanas", "l") + '</g>')
    l2 = ('<g class="ly" data-ly="2">'
          + route([TG, (452, 168), (476, 192)], "void", "void")
          + f'<circle class="banner" cx="482" cy="196" r="13"/>'
          + ftext(498, 200, "Varimathras", "ft goldt", "start")
          + pin(*TG, "Tirisfal", "l") + '</g>')
    l3 = ('<g class="ly" data-ly="3">'
          + route([(482, 196), (484, 212), (480, 224)], "void", "void")
          + f'<circle class="ruin" cx="{TM[0]}" cy="{TM[1] + 8}" r="13"/>'
          + ftext(TM[0] - 16, TM[1] + 12, "Detheroc †", "ft", "end")
          + ftext(TM[0] + 16, TM[1] + 12, "Garithos", "ft dim", "start") + '</g>')
    l4 = ('<g class="ly" data-ly="4">'
          + route([TG, (454, 146), (462, 152)], "void", "void")
          + route([(484, 212), (478, 184), (471, 164)], "al", "al")
          + f'<circle class="ruin" cx="{LD[0]}" cy="{LD[1]}" r="16"/>'
          + ftext(LD[0] + 18, LD[1] - 12, "Balnazzar †", "ft", "start")
          + ftext(LD[0] + 18, LD[1] + 6, "Garithos †", "ft", "start") + '</g>')
    l5 = ('<g class="ly" data-ly="5">'
          f'<circle class="banner gold" cx="{LD[0]}" cy="{LD[1]}" r="16"/>'
          + route([LD, (442, 174), SEP], "gold", "gold")
          + route([LD, (474, 190), TM], "gold", "gold")
          + route([LD, BW], "gold", "gold")
          + ftext(LD[0], LD[1] - 22, "Undercity", "ft goldt")
          + pin(*SEP, "The Sepulcher", "l") + pin(*TM, "Tarren Mill", "r") + pin(*BW, "The Bulwark", "r") + '</g>')
    base_pins = pin(*LD, "Lordaeron", "l")
    cams = {1: [370, 35, 200, 155], 2: [380, 110, 190, 125], 3: [390, 130, 190, 130], 4: [390, 115, 180, 125], 5: [375, 110, 195, 140]}
    c1 = " ".join(str(n) for n in cams[1])
    return (f'<svg id="ek" class="map" viewBox="{c1}" data-cams=\'{json.dumps(cams, separators=(",", ":"))}\' '
            f'role="img" aria-label="%%ekAria%%">{EK_IMG}{l1}{l2}{l3}{l4}{l5}{base_pins}</svg>')


# ---------- Chapter V: Tirisfal Glades ----------
def tirisfal_svg():
    UC, DK, BR, AM, SM = (618, 462), (318, 434), (594, 336), (474, 212), (840, 218)
    paths = {
        "1": ([DK, (376, 366), (434, 344), (554, 368), BR, (614, 398), UC], "gold", "0.08,0.85"),
        "2": ([SM, (812, 292), (766, 350), (664, 364)], "rage", "0.4,0.92"),
    }
    masks, lines, heads = revealed("mUt", paths)
    pins = (pin(*UC, "Undercity", "b", "", 1) + pin(*DK, "Deathknell", "b", "", 2)
            + pin(*BR, "Brill", "l", "", 3) + pin(*AM, "Agamand Mills", "b", "", 4)
            + pin(*SM, "Scarlet Monastery", "l", "", 5))
    return (f'<svg class="map numbered" viewBox="190 110 740 490" role="img" aria-label="%%tirisfalAria%%">'
            f'<defs>{masks}</defs>{TIRISFAL_IMG}{lines}{heads}{pins}</svg>')


# ---------- Chapter V: Forsaken holds and zeppelin routes on the Azeroth map ----------
def world_svg():
    UCw, SEPw, TMw, BWw = az(458, 152), az(*SEP), az(*TM), az(500, 156)
    ORG, GG = (300, 286), az(448, 560)
    paths = {
        "1": ([UCw, (580, 186), (420, 216), (308, 280)], "gold", "0.05,0.55"),
        "2": ([UCw, (710, 290), (718, 410), (GG[0], GG[1] - 8)], "gold", "0.45,0.92"),
    }
    masks, lines, heads = revealed("mUw", paths)
    pins = (pin(*UCw, "Undercity", "l", "", 1) + pin(*SEPw, "The Sepulcher", "l", "", 2)
            + pin(*TMw, "Tarren Mill", "r", "", 3) + pin(*BWw, "The Bulwark", "r", "", 4)
            + f'<g data-show="0.55">{pin(*ORG, "Orgrimmar", "l", "", 5)}</g>'
            + f'<g data-show="0.92">{pin(*GG, "Grom&#8217;gol", "r", "", 6)}</g>')
    return (f'<svg class="map numbered" viewBox="200 120 680 420" role="img" aria-label="%%worldAria%%">'
            f'<defs>{masks}</defs>{WORLD_IMG}{lines}{heads}{pins}</svg>')


# ---------- icons (line art: 64 units for the stage strip, 48 for cards; sep 32 and brand 24 are filled) ----------
def mask_crest(cx, cy, s):
    """Forsaken broken mask crest (filled, evenodd)."""
    p = lambda x, y: P(cx + x * s, cy + y * s)
    out = "M" + "L".join(p(x, y) for x, y in [
        (0, -14), (9, -10), (12, -1), (8, 9), (3, 14), (0, 10), (-3, 14), (-8, 9), (-12, -1), (-9, -10)
    ]) + "Z"
    # eye cutouts and jagged jaw slit
    for pts in [[(-7, -4), (-2, -2), (-3, 2), (-8, 0)], [(2, -2), (7, -4), (8, 0), (3, 2)], [(-2, 5), (2, 5), (1, 9), (-1, 9)]]:
        out += "M" + "L".join(p(x, y) for x, y in pts) + "Z"
    return out


def icons():
    return {
        # stage strip (64 units)
        "shaman": '<path d="M18 28c0-9 6-16 14-16s14 7 14 16v8c0 9-6 16-14 18-8-2-14-9-14-18Z"/><path d="M18 24C10 20 8 11 12 5c2 7 7 11 11 12M46 24c8-4 10-13 6-19-2 7-7 11-11 12"/><circle cx="26" cy="30" r="2.2"/><circle cx="38" cy="30" r="2.2"/><path d="M26 42h12"/>',
        "throne": '<path d="M32 6 46 26l6 30H12l6-30Z"/><path d="M32 6v50M22 24l10 10 10-10"/><path d="M8 56h48"/>',
        "plague": '<path d="M26 10h12M28 10v10l-12 20a8 8 0 0 0 7 12h18a8 8 0 0 0 7-12L36 20V10"/><path d="M20 40c5-3 9 3 14 0s7-2 10 0"/><circle cx="28" cy="46" r="2"/><circle cx="37" cy="44" r="1.5"/>',
        "scourge": '<path d="M32 12c-11 0-18 7-18 17 0 6 3 10 7 13v8h22v-8c4-3 7-7 7-13 0-10-7-17-18-17Z"/><circle cx="25" cy="30" r="4"/><circle cx="39" cy="30" r="4"/><path d="M32 36l-2.5 5h5Z"/><path d="M26 50v-6M32 50v-6M38 50v-6"/>',
        # chapter II cards (48 units)
        "runeblade": '<path d="M24 4l5 7v22h-10V11Z"/><path d="M14 33h20M24 33v8M21 41h6"/><path d="M22 14l4 3-4 3 4 3-4 3"/>',
        "lich": '<path d="M14 14 20 6l4 5 4-5 6 8v6c0 9-4 15-10 17-6-2-10-8-10-17Z"/><circle cx="20" cy="21" r="2.2"/><circle cx="28" cy="21" r="2.2"/><path d="M16 42l8-5 8 5"/>',
        "bow": '<path d="M16 6c14 6 18 14 18 18s-4 12-18 18"/><path d="M16 6v36"/><path d="M8 24h32m0 0-6-5m6 5-6 5"/>',
        "sunwell": '<circle cx="24" cy="24" r="10"/><path d="M24 4v6M24 38v6M4 24h6M38 24h6M10 10l4 4M34 34l4 4M38 10l-4 4M14 34l-4 4"/>',
        # chapter III cards (48 units)
        "icecrown": '<path d="M24 4 35 20l5 22H8l5-22Z"/><path d="M24 14l-4 10 6 5-4 13"/>',
        "hood": '<path d="M10 40c2-16 7-30 14-32 7 2 12 16 14 32"/><path d="M16 26c0-6 3.5-11 8-11s8 5 8 11v6c0 5-3.5 9-8 9s-8-4-8-9Z"/><circle cx="21" cy="26" r="1.8" fill="currentColor" stroke="none"/><circle cx="27" cy="26" r="1.8" fill="currentColor" stroke="none"/>',
        "scream": '<circle cx="24" cy="22" r="11"/><circle cx="20" cy="19" r="2"/><circle cx="28" cy="19" r="2"/><ellipse cx="24" cy="26" rx="3.5" ry="4.5"/><path d="M8 14c-3 5-3 11 0 16M40 14c3 5 3 11 0 16"/>',
        "brokenchain": '<path d="M16 18H9a6 6 0 0 0 0 12h7M32 18h7a6 6 0 0 1 0 12h-7"/><path d="M22 14l-3 6M26 34l3-6M20 32l-3 5M28 16l3-5"/>',
        # leaders (48 units)
        "arrow": '<path d="M10 38 38 10"/><path d="M26 10h12v12"/><path d="M10 38l4-10 6 6Z"/>',
        "wings": '<path d="M24 16C18 8 10 6 4 10c2 8 6 14 14 16l-6 12 12-6 12 6-6-12c8-2 12-8 14-16-6-4-14-2-20 6Z"/>',
        "flask": '<path d="M19 6h10M21 6v8L11 32a6 6 0 0 0 5 9h16a6 6 0 0 0 5-9L27 14V6"/><path d="M14 29h20"/>',
        "sep": mask_crest(0, 0, 1),
        "brand": mask_crest(12, 12, .75),
    }


def main():
    write_ts(LIB / "undead-art.ts", "UNDEAD_ART", {
        "scourge": scourge_svg(),
        "ek": ek_svg(),
        "tirisfal": tirisfal_svg(),
        "world": world_svg(),
        "icons": icons(),
    })


if __name__ == "__main__":
    main()
