#!/usr/bin/env python3
"""Generates src/lib/stories/human-art.ts: the maps and drawings of the Human story.

Run from the repo root:  python3 scripts/stories/human_art.py   (helpers in art_lib.py)
"""
from art_lib import *  # noqa: F401,F403

EK_IMG = '<image class="map-img" href="%%base%%maps/eastern-kingdoms.webp" width="1002" height="668"/>'
WF_IMG = '<image class="map-img" href="%%base%%maps/westfall.webp" width="1002" height="668"/>'
WORLD_IMG = '<image class="map-img" href="%%base%%maps/azeroth.webp" width="1002" height="668"/>'

# places on the Eastern Kingdoms map (approximate, read off the painted map)
SW, LD, DP, KZ, BR = (437, 455), (468, 155), (543, 556), (510, 522), (505, 438)
STROM, DAL, ALT, GIL, KT = (505, 252), (466, 190), (486, 206), (395, 255), (335, 300)
IF, QT, SS = (455, 372), (615, 70), (468, 236)
AND, STRAT = (503, 165), (560, 112)


def route(pts, cls, headcls=None):
    s = f'<path class="rt {cls} draw" pathLength="1" d="{smooth_open(pts)}"/>'
    if headcls:
        s += head(*pts[-1], end_angle(pts), headcls)
    return s


def mask_for(mid, d, rng, w=1002, h=668):
    return (f'<mask id="{mid}" maskUnits="userSpaceOnUse" x="0" y="0" width="{w}" height="{h}">'
            f'<path d="{d}" pathLength="1" stroke="#fff" stroke-width="18" fill="none" stroke-dasharray="1 1" '
            f'stroke-dashoffset="0" data-r="{rng}"/></mask>')


def revealed(prefix, paths):
    """Masked dashed routes that draw themselves as the figure scrolls by (data-routes).

    paths: {key: (points, css class, "start,end")}; returns (mask defs, route lines, arrow heads)."""
    masks = "".join(mask_for(f"{prefix}{k}", smooth_open(pts), rg) for k, (pts, _c, rg) in paths.items())
    lines = "".join(f'<path class="rt {c} dashed" d="{smooth_open(pts)}" mask="url(#{prefix}{k})"/>'
                    for k, (pts, c, _rg) in paths.items())
    heads = "".join(f'<g data-show="{rg.split(",")[1]}">{head(*pts[-1], end_angle(pts), c)}</g>'
                    for k, (pts, c, rg) in paths.items())
    return masks, lines, heads


# ---------- Chapter II: the seven kingdoms that grew out of Arathor ----------
def kingdoms_svg():
    paths = {
        "1": ([STROM, (492, 228), (480, 190), LD], "gold", "0.05,0.3"),
        "2": ([STROM, (488, 230), (474, 205), DAL], "gold", "0.15,0.38"),
        "3": ([STROM, (498, 232), ALT], "gold", "0.2,0.42"),
        "4": ([STROM, (470, 246), (430, 238), GIL], "gold", "0.3,0.55"),
        "5": ([STROM, (470, 268), (400, 286), KT], "gold", "0.4,0.65"),
        "6": ([STROM, (500, 290), (478, 340), (452, 410), SW], "gold", "0.5,0.9"),
    }
    masks, lines, heads = revealed("mKg", paths)
    pins = (pin(*STROM, "Stromgarde", "r", "", 1)
            + f'<g data-show="0.3">{pin(*LD, "Lordaeron", "r", "", 2)}</g>'
            + f'<g data-show="0.38">{pin(*DAL, "Dalaran", "l", "", 3)}</g>'
            + f'<g data-show="0.42">{pin(*ALT, "Alterac", "r", "", 4)}</g>'
            + f'<g data-show="0.55">{pin(*GIL, "Gilneas", "l", "", 5)}</g>'
            + f'<g data-show="0.65">{pin(*KT, "Kul Tiras", "b", "faded", 6)}</g>'
            + f'<g data-show="0.9">{pin(*SW, "Stormwind", "l", "", 7)}</g>')
    kt_ring = f'<circle class="ttown" cx="{KT[0]}" cy="{KT[1]}" r="20"/>'
    label = ftext(STROM[0] + 22, STROM[1] + 26, "Arathor", "ft goldt", "start")
    return (f'<svg class="map numbered" viewBox="290 100 400 420" role="img" aria-label="%%kingdomsAria%%">'
            f'<defs>{masks}</defs>{EK_IMG}{kt_ring}{lines}{label}{heads}{pins}</svg>')


# ---------- Chapter III: the First and Second Wars, one layer and one camera per step ----------
def ek_svg():
    l1 = ('<g class="ly on" data-ly="1">'
          f'<circle class="tox-ring" cx="{DP[0]}" cy="{DP[1]}" r="16"/>'
          + route([(556, 640), (550, 604), DP], "horde", "horde")
          + ftext(DP[0] + 20, DP[1] + 34, "%%fromDraenor%%", "ft rage", "start")
          + pin(*KZ, "Karazhan · Medivh", "l") + '</g>')
    horde1 = [DP, (528, 530), (500, 500), (468, 476), SW]
    l2 = ('<g class="ly" data-ly="2">' + route(horde1, "horde", "horde")
          + f'<circle class="ruin" cx="{SW[0]}" cy="{SW[1]}" r="15"/>'
          + ftext(SW[0], SW[1] + 30, "%%swBurns%%") + ftext(SW[0] - 18, SW[1] - 20, "Llane †", "ft", "end")
          + pin(*KZ, "Karazhan · Medivh †", "l") + '</g>')
    sea = [(430, 460), (402, 468), (372, 420), (360, 340), (392, 290), (438, 262), SS]
    l3 = ('<g class="ly" data-ly="3">'
          f'<circle class="ruin" cx="{SW[0]}" cy="{SW[1]}" r="15"/>'
          + route(sea, "al dash", "al") + route([SS, (474, 200), (470, 168)], "al", "al")
          + ftext(352, 384, "%%exodus%%", "ft dim", "end") + pin(*SS, "Southshore", "r") + '</g>')
    allies = [
        [STROM, (494, 214), (474, 170)], [DAL, (466, 172)], [ALT, (480, 180), (472, 168)],
        [GIL, (420, 210), (452, 166)], [KT, (360, 230), (410, 170), (452, 158)],
        [IF, (472, 320), (492, 250), (478, 175)], [QT, (580, 110), (520, 140), (484, 152)],
    ]
    l4 = ('<g class="ly" data-ly="4">' + "".join(route(p, "al", "al") for p in allies)
          + f'<circle class="banner" cx="{LD[0]}" cy="{LD[1]}" r="17"/>'
          + ftext(LD[0], LD[1] - 28, "Alliance of Lordaeron")
          + pin(*STROM, "Stromgarde", "r") + pin(*GIL, "Gilneas", "l") + pin(*KT, "Kul Tiras", "b", "faded")
          + pin(*IF, "Ironforge", "r") + pin(*QT, "Quel'Thalas", "r") + '</g>')
    horde2 = [DP, (528, 500), BR, (524, 360), (500, 292), (480, 246), (512, 186), (566, 128), (600, 90)]
    push = [(470, 172), (496, 230), (508, 300), (500, 380), (506, 424)]
    l5 = ('<g class="ly" data-ly="5">' + route(horde2, "horde", "horde") + route(push, "al wide", "al")
          + route([BR, (528, 480), (540, 536)], "al", "al")
          + f'<circle class="banner gold" cx="{BR[0]}" cy="{BR[1]}" r="17"/>'
          + ftext(BR[0] - 22, BR[1] + 6, "Lothar †", "ft", "end") + ftext(BR[0] + 24, BR[1] - 14, "Blackrock Spire", "ft", "start")
          + ftext(588, 160, "%%hordeNorth%%", "ft rage", "start") + ftext(DP[0] + 20, DP[1] + 30, "%%portalFalls%%", "ft goldt", "start")
          + '</g>')
    base_pins = pin(*SW, "Stormwind", "l") + pin(*LD, "Lordaeron", "r") + pin(*DP, "Dark Portal", "r")
    cams = {1: [400, 430, 220, 160], 2: [380, 420, 230, 165], 3: [300, 130, 270, 400], 4: [300, 50, 360, 380],
            5: [300, 40, 380, 560]}
    c1 = " ".join(str(n) for n in cams[1])
    return (f'<svg id="ek" class="map" viewBox="{c1}" data-cams=\'{json.dumps(cams, separators=(",", ":"))}\' '
            f'role="img" aria-label="%%ekAria%%">{EK_IMG}{l1}{l2}{l3}{l4}{l5}{base_pins}</svg>')


# ---------- Chapter IV: the plague and the fall of Lordaeron ----------
def plague_svg():
    paths = {
        "1": ([AND, (530, 150), (548, 128), STRAT], "void", "0.05,0.25"),
        "2": ([STRAT, (582, 80), (574, 36), (556, 8)], "rage", "0.25,0.42"),
        "3": ([(522, 8), (500, 60), (480, 118), (470, 146)], "rage", "0.42,0.58"),
        "4": ([AND, (494, 182), (480, 190), (472, 192)], "void", "0.55,0.72"),
        "5": ([(450, 140), (410, 126), (360, 140), (318, 172)], "al", "0.72,0.95"),
    }
    masks, lines, heads = revealed("mPl", paths)
    pins = (pin(*AND, "Andorhal", "b", "", 1)
            + f'<g data-show="0.25">{pin(*STRAT, "Stratholme", "r", "", 2)}</g>'
            + pin(*LD, "Lordaeron", "l", "", 3)
            + f'<g data-show="0.72">{pin(*DAL, "Dalaran", "l", "", 4)}</g>')
    marks = (f'<g data-show="0.25"><circle class="ruin" cx="{STRAT[0]}" cy="{STRAT[1]}" r="15"/></g>'
             f'<g data-show="0.58"><circle class="scourge" cx="{LD[0]}" cy="{LD[1]}" r="16"/></g>'
             f'<g data-show="0.72"><circle class="scourge" cx="{DAL[0]}" cy="{DAL[1]}" r="13"/></g>')
    labels = (ftext(586, 26, "%%toNorthrend%%", "ft rage", "start")
              + f'<g data-show="0.58">{ftext(LD[0] - 16, LD[1] + 20, "Terenas †", "ft", "end")}</g>'
              + ftext(318, 192, "%%toKalimdor%%", "ft dim", "middle"))
    return (f'<svg class="map numbered" viewBox="300 0 340 250" role="img" aria-label="%%plagueAria%%">'
            f'<defs>{masks}</defs>{EK_IMG}{marks}{lines}{labels}{heads}{pins}</svg>')


# ---------- Chapter V: Westfall and the Defias Brotherhood ----------
def westfall_svg():
    SH, MB, SF = (527, 302), (436, 470), (556, 210)
    paths = {"1": ([(700, 22), (640, 92), (596, 150), (566, 236), (520, 340), (470, 420), (446, 456)], "rage", "0.05,0.9")}
    masks, lines, heads = revealed("mWf", paths)
    pins = (pin(*SH, "Sentinel Hill", "r", "", 1)
            + f'<g data-show="0.9">{pin(*MB, "Moonbrook · Deadmines", "r", "", 2)}</g>'
            + pin(*SF, "Saldean&#8217;s Farm", "r", "", 3))
    labels = ftext(712, 40, "Stormwind ↗", "ft dim", "start") + ftext(560, 400, "Defias", "ft rage", "start")
    return (f'<svg class="map numbered" viewBox="240 0 560 520" role="img" aria-label="%%westfallAria%%">'
            f'<defs>{masks}</defs>{WF_IMG}{lines}{labels}{heads}{pins}</svg>')


# ---------- Chapter V: human holds on Azeroth ----------
def az(x, y):
    """Eastern Kingdoms map coordinates -> the Azeroth map (fitted on Lordamere Lake and Loch Modan)."""
    return (round(374 + x * .78, 1), round(69 + y * .744, 1))


def world_svg():
    SWw, SSw, STw = az(*SW), az(*SS), az(*STROM)
    SMw, LHw, TH = az(492, 123), az(612, 160), (308, 390)
    paths = {
        "1": ([SWw, (650, 470), (520, 470), (400, 430), (330, 400), (316, 393)], "gold", "0.05,0.55"),
        "2": ([SWw, (730, 380), (748, 300), (742, 252)], "gold", "0.4,0.9"),
    }
    masks, lines, heads = revealed("mWh", paths)
    pins = (pin(*SWw, "Stormwind", "r", "", 1)
            + f'<g data-show="0.55">{pin(*TH, "Theramore", "b", "", 2)}</g>'
            + f'<g data-show="0.9">{pin(*SSw, "Southshore", "l", "", 3)}</g>'
            + pin(*STw, "Stromgarde", "r", "", 4) + pin(*SMw, "Scarlet Monastery", "l", "", 5)
            + pin(*LHw, "Light&#8217;s Hope Chapel", "r", "", 6))
    return (f'<svg class="map numbered" viewBox="250 90 660 410" role="img" aria-label="%%worldAria%%">'
            f'<defs>{masks}</defs>{WORLD_IMG}{lines}{heads}{pins}</svg>')


# ---------- icons (line art in 48 units; brand 24 and sep 32 units are filled) ----------
def star(n, r1, r2, cx=0, cy=0, hole=0):
    pts = []
    for i in range(n * 2):
        a = -math.pi / 2 + i * math.pi / n
        r = r1 if i % 2 == 0 else r2
        pts.append(P(cx + r * math.cos(a), cy + r * math.sin(a)))
    d = "M" + "L".join(pts) + "Z"
    if hole:
        d += (f"M{P(cx + hole, cy)}A{f(hole)},{f(hole)} 0 1 0 {P(cx - hole, cy)}"
              f"A{f(hole)},{f(hole)} 0 1 0 {P(cx + hole, cy)}Z")
    return d


def icons():
    crown = '<path d="M8 36 5 14l10 9 9-13 9 13 10-9-3 22Z"/><path d="M8 42h32"/>'
    return {
        "crown": crown,
        "smallCrown": '<path d="M13 34 11 20l7 6 6-9 6 9 7-6-2 14Z"/><path d="M13 39h22"/><circle cx="24" cy="10" r="2.5"/>',
        "shield": '<path d="M24 5 40 11v12c0 10-7 17-16 21C15 40 8 33 8 23V11Z"/><path d="M24 14v20M16 22h16"/>',
        "dagger": '<path d="M24 4l4 5v21h-8V9Z"/><path d="M15 30h18M24 30v8"/><circle cx="24" cy="42" r="3"/>',
        "camp": '<path d="M6 40 24 12l18 28Z"/><path d="M19 40l5-9 5 9"/><path d="M4 40h40"/>',
        "cracked": '<path d="M24 5 40 11v12c0 10-7 17-16 21C15 40 8 33 8 23V11Z"/><path d="M24 5l-3 10 5 6-4 7 4 6-2 10"/>',
        "castle": '<path d="M8 42V18h6v5h5v-5h10v5h5v-5h6v24Z"/><path d="M20 42v-8a4 4 0 0 1 8 0v8"/><path d="M24 18V6l8 3-8 3"/>',
        "flame": '<path d="M24 42c-9 0-13-7-11-14 2-6 7-8 7-16 6 4 9 9 9 14 2-2 3-4 3-7 4 5 5 10 3 15-2 5-6 8-11 8Z"/>',
        "runeblade": '<path d="M24 4l5 7v22h-10V11Z"/><path d="M14 33h20M24 33v8M21 41h6"/><path d="M22 14l4 3-4 3 4 3-4 3"/>',
        "brokenCrown": '<path d="M8 36 5 14l10 9 6-9"/><path d="M27 14l6 9 10-9-3 22H8"/><path d="M21 14l3 6 3-6"/>',
        "ship": '<path d="M6 32h36l-6 9H12Z"/><path d="M24 32V6"/><path d="M24 8c8 4 10 12 10 20H24M24 12c-6 3-8 9-8 16h8"/>',
        "sep": star(8, 13, 6, 0, 0, 3.2),
        "brand": (f'M12 1.5 21 5v6.5c0 5.5-3.8 9.3-9 11-5.2-1.7-9-5.5-9-11V5Z'
                  f'M12 4.6 6 7v4.5c0 3.7 2.5 6.4 6 7.8 3.5-1.4 6-4.1 6-7.8V7Z'
                  f'{star(4, 4.5, 1.5, 12, 11.6)}'),
    }


def main():
    write_ts(LIB / "human-art.ts", "HUMAN_ART", {
        "kingdoms": kingdoms_svg(),
        "ek": ek_svg(),
        "plague": plague_svg(),
        "westfall": westfall_svg(),
        "world": world_svg(),
        "icons": icons(),
    })


if __name__ == "__main__":
    main()
