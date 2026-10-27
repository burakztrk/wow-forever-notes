#!/usr/bin/env python3
"""Generates src/lib/stories/skyborne-art.ts: the maps and drawings of the Skyborne story.

Run from the repo root:  python3 scripts/stories/skyborne_art.py   (helpers in art_lib.py)
No cover is drawn: the hero is plain sky and wind; cover art, if any, comes from the site owner.
"""
from art_lib import *  # noqa: F401,F403

FERALAS_IMG = '<image class="map-img" href="%%base%%maps/feralas.webp" width="1002" height="668"/>'
ZEPHRAS_IMG = '<image class="map-img" href="%%base%%maps/zephras-isle.webp" width="1002" height="668"/>'
WORLD_IMG = '<image class="map-img" href="%%base%%maps/azeroth.webp" width="1002" height="668"/>'

# places on the Zephras Isle map (read off the painted map; approximate)
THENDAL, SHENDAR, VALANAAR, FALAATH, BANAETHAL, SHRINE = (430, 152), (452, 304), (606, 526), (500, 376), (586, 172), (656, 332)


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


# ---------- Chapter I: from Eldre'Thalas (Dire Maul) into the west ----------
def feralas_svg():
    DM, COAST = (590, 298), (456, 322)
    paths = {"1": ([DM, (548, 308), (500, 322), (456, 322), (408, 294), (350, 262), (288, 238), (224, 222), (170, 214)],
                   "gold", "0.1,0.9")}
    masks, lines, heads = revealed("mFe", paths)
    pins = (pin(*DM, "", "b", "", 1) + f'<g data-show="0.3">{pin(*COAST, "Eldre&#8217;narr", "t", "", 2)}</g>')
    marks = f'<circle class="scourge" cx="{DM[0]}" cy="{DM[1]}" r="22"/>'
    labels = (ftext(DM[0], DM[1] + 46, "Immol&#8217;thar", "ft")
              + f'<g data-show="0.9">{ftext(176, 196, "%%toWest%%", "ft goldt", "start")}</g>')
    return (f'<svg class="map numbered" viewBox="140 150 540 250" role="img" aria-label="%%feralasAria%%">'
            f'<defs>{masks}</defs>{FERALAS_IMG}{marks}{lines}{labels}{heads}{pins}</svg>')


# ---------- Chapter II: the island rises from the sea into Skywall (data-moves) ----------
def rise_svg():
    r = random.Random(7)
    pts = [(300, 282), (380, 264), (470, 252), (560, 258), (640, 248), (702, 270), (726, 298), (692, 324), (642, 338),
           (602, 374), (556, 424), (520, 456), (490, 424), (450, 374), (400, 342), (342, 328)]
    d = smooth_closed(jitter_closed(pts, 5, r))
    peaks = "".join(f'<path class="mt" d="{mtn(x, y, s)}"/>' for x, y, s in
                    [(370, 270, 1.5), (440, 258, 1.8), (520, 258, 1.4), (590, 262, 1.7), (660, 258, 1.3)])
    towers = "".join(f'<path class="pyl" d="M{x - 4},{y}V{y - 26}L{x},{y - 34}L{x + 4},{y - 26}V{y}Z"/>'
                     for x, y in [(340, 296), (510, 266), (690, 288)])
    spirits = "".join(f'<g class="spirit"><circle cx="{x}" cy="{y}" r="{rr}"/><circle class="sring" cx="{x}" cy="{y}" r="{rr + 6}"/></g>'
                      for x, y, rr in [(312, 372, 5), (372, 420, 4), (436, 470, 6), (584, 468, 5), (648, 408, 4), (706, 352, 6)])
    # drawn below the waterline; the drift lifts it (312 units) into the sky
    isle = (f'<g data-move="0,-312,0"><g transform="translate(0,190)"><path class="halo" d="{d}"/><path class="land" d="{d}"/>{peaks}{towers}{spirits}'
            f'<g class="after">{ftext(514, 302, "Zephras Isle", "ft goldt")}</g></g></g>')
    winds = "".join(f'<path class="windl" d="{p}"/>' for p in [
        "M60,120C160,92 240,150 340,118S520,84 600,120",
        "M520,170C640,146 740,196 860,162S960,150 990,170",
        "M30,230C110,208 190,252 270,232",
        "M780,80C850,62 920,90 980,70",
        "M90,330C170,312 240,344 320,330",
    ])
    sea = ('<rect class="sea" x="0" y="432" width="1000" height="90"/>'
           + "".join(f'<path class="wave" d="M{x},{y}q20,-9 40,0t40,0t40,0"/>' for x, y in
                     [(40, 452), (300, 470), (600, 456), (820, 480), (130, 494), (500, 498)]))
    defs = ('<defs><linearGradient id="rsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd0f0" stop-opacity=".26"/>'
            '<stop offset=".75" stop-color="#8fd0f0" stop-opacity="0"/></linearGradient></defs>')
    labels = (f'<g class="before">{ftext(500, 506, "%%seaLbl%%", "ft dim")}</g>'
              f'<g class="after">{ftext(500, 30, "Skywall", "ft goldt")}{ftext(500, 52, "%%planeLbl%%", "ft dim")}</g>')
    return (f'<svg class="map rise" viewBox="0 0 1000 520" role="img" aria-label="%%riseAria%%">{defs}'
            f'<rect class="after" x="0" y="0" width="1000" height="432" fill="url(#rsky)"/>'
            f'<g class="after">{winds}</g>{isle}{sea}{labels}</svg>')


# ---------- Chapter IV: the crisis on Zephras Isle, one layer and one camera per step ----------
def crisis_svg():
    pylons = [(322, 300), (712, 262), (548, 98), (588, 584)]
    l1 = ('<g class="ly on" data-ly="1">'
          + "".join(f'<circle class="ghost" cx="{x}" cy="{y}" r="12"/>' for x, y in [(256, 168), (760, 214), (262, 430), (770, 470)])
          + ftext(512, 54, "%%spirits%%", "ft dim") + '</g>')
    l2 = ('<g class="ly" data-ly="2">'
          + "".join(f'<circle class="ruin" cx="{x}" cy="{y}" r="13"/>' for x, y in pylons)
          + ftext(pylons[3][0] + 20, pylons[3][1] + 6, "%%pylons%%", "ft rage", "start") + '</g>')
    l3 = ('<g class="ly" data-ly="3">'
          f'<circle class="ruin" cx="{FALAATH[0]}" cy="{FALAATH[1]}" r="18"/>'
          + ftext(FALAATH[0], FALAATH[1] + 36, "Al&#8217;Aketh", "ft rage") + '</g>')
    l4 = ('<g class="ly" data-ly="4">'
          f'<circle class="scourge" cx="{SHRINE[0]}" cy="{SHRINE[1]}" r="24"/>'
          + ftext(SHRINE[0], SHRINE[1] + 44, "Rohash", "ft rage") + ftext(SHRINE[0], SHRINE[1] + 60, "%%truce%%", "ft dim") + '</g>')
    l5 = ('<g class="ly" data-ly="5">'
          + route([(604, 556), (572, 596), (520, 636)], "al", "al")
          + route([(648, 556), (694, 596), (742, 636)], "horde", "horde")
          + ftext(480, 658, "Dalaran", "ft goldt", "start") + ftext(790, 658, "Skywatcher Plateau", "ft goldt", "end") + '</g>')
    cams = {1: [250, 50, 500, 590], 2: [270, 60, 470, 560], 3: [400, 270, 250, 210], 4: [520, 225, 260, 210], 5: [470, 250, 330, 400]}
    c1 = " ".join(str(n) for n in cams[1])
    return (f'<svg id="ek" class="map zmap" viewBox="{c1}" data-cams=\'{json.dumps(cams, separators=(",", ":"))}\' '
            f'role="img" aria-label="%%ekAria%%">{ZEPHRAS_IMG}{l1}{l2}{l3}{l4}{l5}</svg>')


# ---------- Chapter V: the six places of Zephras Isle (numbered) ----------
def zephras_svg():
    pins = "".join(pin(*xy, "", "r", "", n) for n, xy in enumerate([THENDAL, SHENDAR, VALANAAR, FALAATH, BANAETHAL, SHRINE], 1))
    return (f'<svg class="map numbered zmap" viewBox="280 60 470 550" role="img" aria-label="%%zephrasAria%%">{ZEPHRAS_IMG}{pins}</svg>')


# ---------- Chapter V: the skyship routes on the Azeroth map ----------
def world_svg():
    ISL, DAL, SKY, DMW = (545, 186), (737, 210), (212, 342), (176, 436)
    paths = {
        "1": ([(566, 190), (640, 196), (704, 204), (726, 208)], "al", "0.05,0.45"),
        "2": ([(528, 186), (450, 204), (362, 252), (276, 304), (224, 336)], "horde", "0.5,0.95"),
    }
    masks, lines, heads = revealed("mSw", paths)
    pins = (pin(*ISL, "Zephras Isle", "t", "", 1) + pin(*DAL, "Dalaran", "r", "", 2)
            + pin(*SKY, "Skywatcher Plateau", "r", "", 3) + pin(*DMW, "Dire Maul", "r", "", 4))
    ring = f'<circle class="skyring" cx="{ISL[0]}" cy="{ISL[1]}" r="20"/>'
    return (f'<svg class="map numbered" viewBox="100 80 760 440" role="img" aria-label="%%worldAria%%">'
            f'<defs>{masks}</defs>{WORLD_IMG}{ring}{lines}{heads}{pins}</svg>')


# ---------- icons (line art: 64 units for the stage strip, 48 for cards; sep 32 and brand 24 are filled) ----------
def feather_d(cx, cy, s):
    """A feather, filled, with its quill cut out (evenodd): the page separator and the header brand."""
    p = lambda x, y: P(cx + x * s, cy + y * s)
    out = (f"M{p(0, -13)}C{p(9, -9)} {p(10, 4)} {p(1, 13)}C{p(-1, 5)} {p(-8, 1)} {p(-9, -6)}C{p(-8, -10)} {p(-4, -12)} {p(0, -13)}Z")
    out += f"M{p(-.8, -9)}L{p(.6, -9)}L{p(.9, 9)}L{p(-.5, 9)}Z"
    return out


def icons():
    return {
        # stage strip (64 units)
        "tower": '<path d="M22 58V22h20v36"/><path d="M18 22h28l-4-10H22Z"/><path d="M28 32h8v8h-8Z"/><path d="M32 4v8"/><path d="M14 58h36"/>',
        "book": '<path d="M16 10h30a4 4 0 0 1 4 4v36a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4Z"/><path d="M16 50a4 4 0 0 1 4-4h30"/><path d="M24 20h18M24 28h18M24 36h10"/>',
        "mask": '<path d="M16 12h32v16c0 14-8 24-16 28-8-4-16-14-16-28Z"/><path d="M22 26h8M34 26h8"/><path d="M28 42h8"/>',
        "wind": '<path d="M8 24h32a8 8 0 1 0-8-8"/><path d="M8 36h40a8 8 0 1 1-8 8"/><path d="M8 48h22"/>',
        # chapter II cards (48 units)
        "spirit": '<path d="M24 6c8 8 12 14 12 22 0 8-5 14-12 14s-12-6-12-14c0-8 4-14 12-22Z"/><path d="M19 26h2M27 26h2"/><path d="M18 42c-2 4-6 6-10 6M30 42c2 4 6 6 10 6"/>',
        "plane": '<path d="M10 30a8 8 0 0 1 8-8 10 10 0 0 1 19-1 7 7 0 0 1 3 14H14a6 6 0 0 1-4-5Z"/><path d="M12 40h24M18 46h18"/>',
        "cyclone": '<path d="M8 10h32M12 18h28M16 26h22M20 34h16M24 42h8"/>',
        "isle": '<path d="M8 22h32l-4 6-6 4-6 12-6-12-6-4Z"/><path d="M14 22l4-6 4 4 4-8 6 10"/>',
        # chapter V cards (48 units)
        "crown": '<path d="M8 36l4-20 8 10 4-14 4 14 8-10 4 20Z"/><path d="M8 42h32"/>',
        "flame": '<path d="M24 42c-9 0-13-7-11-14 2-6 7-8 7-16 6 4 9 9 9 14 2-2 3-4 3-7 4 5 5 10 3 15-2 5-6 8-11 8Z"/>',
        "sep": feather_d(0, 0, 1),
        "brand": feather_d(12, 12, .9),
    }


def main():
    write_ts(LIB / "skyborne-art.ts", "SKYBORNE_ART", {
        "feralas": feralas_svg(),
        "rise": rise_svg(),
        "ek": crisis_svg(),
        "zephras": zephras_svg(),
        "world": world_svg(),
        "icons": icons(),
    })


if __name__ == "__main__":
    main()
