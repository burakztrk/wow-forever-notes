#!/usr/bin/env python3
"""Generates src/lib/stories/curse-art.ts: the drawings of the Curse of Flesh page.

Run from the repo root:  python3 scripts/stories/curse_art.py   (helpers in art_lib.py)
"""
from art_lib import *  # noqa: F401,F403

VOID, VOID_HI, GOLD, GOLD_DIM = "#6b3fa0", "#b28cff", "#c8a656", "#8a7440"


# ---------- Hero emblem: a Titan rune circle with Old God tentacles creeping into it ----------
def tentacle(pts, w0, w1):
    """A tapered tentacle along a smooth centre line: width w0 at the root, w1 at the tip."""
    Q = [pts[0]] + pts + [pts[-1]]
    line = []
    for i in range(1, len(Q) - 2):
        p0, p1, p2, p3 = Q[i - 1], Q[i], Q[i + 1], Q[i + 2]
        for k in range(12):
            t = k / 12
            t2, t3 = t * t, t * t * t
            line.append(tuple(.5 * ((2 * p1[j]) + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2
                                    + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3) for j in (0, 1)))
    line.append(pts[-1])
    n = len(line)
    left, right, dots = [], [], []
    for i, (x, y) in enumerate(line):
        a, b = line[max(i - 1, 0)], line[min(i + 1, n - 1)]
        dx, dy = b[0] - a[0], b[1] - a[1]
        L = math.hypot(dx, dy) or 1
        nx, ny = -dy / L, dx / L
        w = w0 + (w1 - w0) * (i / (n - 1)) ** .8
        left.append((x + nx * w / 2, y + ny * w / 2))
        right.append((x - nx * w / 2, y - ny * w / 2))
        if i % 5 == 2 and i < n - 6:
            dots.append((x - nx * w * .22, y - ny * w * .22, max(1.2, w * .14)))
    d = "M" + " L".join(P(*p) for p in left + right[::-1]) + "Z"
    suckers = "".join(f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r)}"/>' for x, y, r in dots)
    return d, suckers


def emblem_svg():
    cx = cy = 300
    ticks = "".join(
        f'<path d="M{P(cx + 206 * math.cos(a), cy + 206 * math.sin(a))}L{P(cx + (226 if i % 5 == 0 else 216) * math.cos(a), cy + (226 if i % 5 == 0 else 216) * math.sin(a))}"/>'
        for i, a in enumerate(i * math.pi * 2 / 60 for i in range(60)))
    tri = " ".join(P(cx + 150 * math.cos(a), cy + 150 * math.sin(a)) for a in (-math.pi / 2, math.pi / 6, math.pi * 5 / 6))
    runes = "".join(
        f'<g transform="translate({P(cx + 182 * math.cos(a), cy + 182 * math.sin(a))}) rotate({f(math.degrees(a) + 90)})">'
        f'<path d="M-5 -6V6M-5 0L4 -6M-5 0L4 6"/></g>' for a in (i * math.pi * 2 / 12 + .26 for i in range(12)))
    crack = "M300 300L318 262L304 236L330 196L322 168L352 120L346 92"
    crack2 = "M300 300L272 334L286 360L258 398L268 424L240 470"
    arms = [
        ([(40, 600), (90, 520), (150, 470), (205, 420), (238, 360), (262, 318)], 46, 4),
        ([(600, 560), (530, 520), (488, 470), (440, 440), (392, 392), (350, 330)], 42, 4),
        ([(-10, 330), (60, 320), (120, 300), (160, 268), (196, 252)], 34, 3),
        ([(610, 250), (548, 262), (500, 240), (470, 206), (440, 196)], 30, 3),
        ([(250, 610), (262, 540), (240, 500), (262, 452), (292, 430)], 30, 3),
        ([(420, 620), (430, 560), (470, 520), (500, 470)], 26, 3),
    ]
    shapes, suckers = "", ""
    for pts, w0, w1 in arms:
        d, s = tentacle(pts, w0, w1)
        shapes += f'<path d="{d}"/>'
        suckers += s
    eye = (f'<g transform="translate({cx},{cy})">'
           f'<path d="M-58 0C-34 -34 34 -34 58 0C34 34 -34 34 -58 0Z" fill="#120a1e" stroke="{VOID_HI}" stroke-width="2.5"/>'
           '<circle r="24" fill="url(#cIris)"/><path d="M0 -20C6 -8 6 8 0 20C-6 8 -6 -8 0 -20Z" fill="#120a1e"/></g>')
    defs = (f'<defs><radialGradient id="cGlow"><stop offset="0" stop-color="{VOID_HI}" stop-opacity=".55"/>'
            f'<stop offset=".5" stop-color="{VOID}" stop-opacity=".22"/><stop offset="1" stop-color="{VOID}" stop-opacity="0"/></radialGradient>'
            f'<linearGradient id="cArm" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#1c1030"/>'
            f'<stop offset=".6" stop-color="#3f2366"/><stop offset="1" stop-color="{VOID}"/></linearGradient>'
            f'<radialGradient id="cIris"><stop offset="0" stop-color="#f4e27a"/><stop offset=".6" stop-color="#c79a2e"/>'
            f'<stop offset="1" stop-color="#5b3d0e"/></radialGradient></defs>')
    return (f'<svg viewBox="0 0 600 600" class="emblem" aria-hidden="true">{defs}'
            f'<circle cx="{cx}" cy="{cy}" r="290" fill="url(#cGlow)"/>'
            f'<g class="titan" fill="none" stroke="{GOLD}" stroke-linecap="round">'
            f'<circle cx="{cx}" cy="{cy}" r="230" stroke-width="2.5"/><circle cx="{cx}" cy="{cy}" r="200" stroke-width="1.4" stroke-dasharray="3 7"/>'
            f'<g stroke-width="2">{ticks}</g><polygon points="{tri}" stroke-width="2.2"/>'
            f'<circle cx="{cx}" cy="{cy}" r="74" stroke-width="2"/><g stroke-width="2" stroke="{GOLD_DIM}">{runes}</g></g>'
            f'<g fill="none" stroke="{VOID_HI}" stroke-width="3" stroke-linejoin="round" opacity=".8"><path d="{crack}"/><path d="{crack2}"/></g>'
            f'<g class="arms" fill="url(#cArm)" stroke="{VOID_HI}" stroke-opacity=".35" stroke-width="1.2">{shapes}</g>'
            f'<g fill="{VOID_HI}" opacity=".45">{suckers}</g>{eye}</svg>')


# ---------- The one map: from the Titans' works to today's homelands ----------
def world_svg():
    land = world_base()
    UL, UT, UD, KM, LD, AQ = (548, 46), (618, 112), (764, 368), (722, 348), (711, 176), (196, 452)
    paths = {
        "1": ([UL, (590, 140), (660, 250), (700, 318), (716, 338)], "gold", "0.05,0.5"),
        "2": ([UT, (652, 128), (690, 150), (706, 168)], "gold", "0.3,0.65"),
        "3": ([UD, (748, 356), (730, 350)], "gold", "0.55,0.85"),
    }
    masks = "".join(
        f'<mask id="mCu{k}" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="520">'
        f'<path d="{smooth_open(pts)}" pathLength="1" stroke="#fff" stroke-width="18" fill="none" stroke-dasharray="1 1" '
        f'stroke-dashoffset="0" data-r="{rg}"/></mask>' for k, (pts, _c, rg) in paths.items())
    lines = "".join(f'<path class="rt {c} dashed" d="{smooth_open(pts)}" mask="url(#mCu{k})"/>' for k, (pts, c, _rg) in paths.items())
    heads = "".join(f'<g data-show="{rg.split(",")[1]}">{head(*pts[-1], end_angle(pts), c)}</g>' for k, (pts, c, rg) in paths.items())
    prisons = (f'<circle class="scourge" cx="{UL[0]}" cy="{UL[1]}" r="17"/><circle class="scourge" cx="{AQ[0]}" cy="{AQ[1]}" r="17"/>')
    pins = (pin(*UL, "Ulduar", "r", "origin", 1) + pin(*UT, "Utgarde", "r", "origin", 2) + pin(*UD, "Uldaman", "r", "origin", 3)
            + f'<g data-show="0.5">{pin(*KM, "Khaz Modan", "l", "", 4)}</g>'
            + f'<g data-show="0.65">{pin(*LD, "Lordaeron", "l", "", 5)}</g>'
            + pin(*AQ, "Ahn&#8217;Qiraj", "r", "faded", 6))
    return (f'<svg class="map numbered" viewBox="0 0 1000 520" role="img" aria-label="%%worldAria%%">'
            f'<defs>{grid_def("gC", 50)}{masks}</defs><rect width="1000" height="520" fill="url(#gC)"/>'
            f'{land}{world_labels()}{prisons}{lines}{heads}{pins}</svg>')


# ---------- icons: 64-unit line art for the before/after cards, filled brand (24) and separator (32) ----------
def icons():
    return {
        "titan": '<circle cx="32" cy="32" r="22"/><path d="M32 14 47.6 41H16.4Z"/><circle cx="32" cy="32" r="3.5" fill="currentColor" stroke="none"/><path d="M32 4v6M32 54v6M4 32h6M54 32h6"/>',
        "forged": '<path d="M22 8h20l5 11-4 11H21l-4-11Z"/><path d="M25 19h5M34 19h5"/><path d="M15 34h34l-5 24H20Z"/><path d="M32 34v24M15 46h34"/>',
        "curse": '<path d="M32 10 19 15l-5 15 5 15 13 9"/><path d="M32 10c10 0 18 8 18 21s-8 21-18 23"/><path d="M32 10l-3 8 4 6-4 7 4 7-3 8 2 8"/><path d="M20 28h6"/><circle cx="40" cy="28" r="2.2" fill="currentColor" stroke="none"/><path d="M37 41c2.5 2 5 2 7 0"/><circle cx="54" cy="16" r="1.6" fill="currentColor" stroke="none"/><circle cx="58" cy="23" r="1.1" fill="currentColor" stroke="none"/><circle cx="49" cy="10" r="1.1" fill="currentColor" stroke="none"/>',
        "peoples": '<circle cx="18" cy="26" r="7"/><path d="M6 54c0-9 5-15 12-15s12 6 12 15"/><circle cx="46" cy="26" r="7"/><path d="M34 54c0-9 5-15 12-15s12 6 12 15"/><circle cx="32" cy="16" r="6"/><path d="M23 36c2-6 5-9 9-9s7 3 9 9"/>',
        "earthen": '<path d="M22 8h20l5 11-4 11H21l-4-11Z"/><path d="M25 19h5M34 19h5"/><path d="M15 34h34l-5 24H20Z"/><path d="M29 8l-2 6 4 4M36 36l-3 8 4 5-2 7"/><path d="M15 34 8 46l5 3M49 34l7 12-5 3"/>',
        "mechagnome": '<rect x="16" y="20" width="32" height="30" rx="7"/><rect x="21" y="28" width="22" height="7" rx="3.5"/><path d="M32 20v-8"/><circle cx="32" cy="9" r="3"/><path d="M16 32h-5v9h5M48 32h5v9h-5"/><path d="M25 44h14M26 41v3M32 41v3M38 41v3"/>',
        "vrykul": '<path d="M17 27c0-10 7-16 15-16s15 6 15 16Z"/><path d="M17 22C10 20 7 13 9 6c2 6 6 9 10 9M47 22c7-2 10-9 8-16-2 6-6 9-10 9"/><path d="M14 27h36"/><circle cx="25" cy="33" r="2" fill="currentColor" stroke="none"/><circle cx="39" cy="33" r="2" fill="currentColor" stroke="none"/><path d="M16 31c0 15 7 26 16 28 9-2 16-13 16-28"/><path d="M25 45c2 5 4 8 7 9 3-1 5-4 7-9"/>',
        "dwarf": '<path d="M16 28c0-10 7-16 16-16s16 6 16 16Z"/><path d="M13 28h38M32 28v7"/><path d="M16 23c-6-1-9-6-7-11 2 4 5 6 9 6M48 23c6-1 9-6 7-11-2 4-5 6-9 6"/><circle cx="25" cy="33" r="2" fill="currentColor" stroke="none"/><circle cx="39" cy="33" r="2" fill="currentColor" stroke="none"/><path d="M17 33c0 13 6 23 15 25 9-2 15-12 15-25"/><path d="M26 43l2 9M38 43l-2 9M32 45v11"/>',
        "gnome": '<circle cx="32" cy="37" r="14"/><path d="M18.6 34 6 26l9.5 14M45.4 34 58 26l-9.5 14"/><circle cx="26" cy="28" r="5"/><circle cx="38" cy="28" r="5"/><path d="M31 28h2"/><path d="M23 23c-2-6 3-10 6.5-8 .5-4 6.5-5 8-1 3.5-2 7.5 1 5 6"/><path d="M30 37.5c1 1.8 3 1.8 4 0"/><path d="M27 44c3 2 7 2 10 0"/>',
        "human": '<path d="M23 17 21 7l6 4 5-6 5 6 6-4-2 10Z"/><circle cx="32" cy="28" r="10"/><path d="M12 58c0-11 9-19 20-19s20 8 20 19"/><path d="M27 46l5 5 5-5"/>',
        # trogg: a lumpy stone head, heavy brow, tusks, long hanging arms
        "trogg": '<path d="M18 30c-2-11 5-19 14-19s16 8 14 19c-1 6-6 10-14 10s-13-4-14-10Z"/><path d="M30 12l-2 5 3 3"/><path d="M20 25c4-3 8-3 11 0M33 25c3-3 7-3 11 0"/><circle cx="26" cy="29" r="1.8" fill="currentColor" stroke="none"/><circle cx="38" cy="29" r="1.8" fill="currentColor" stroke="none"/><path d="M25 36h14M27 36l1-3M37 36l-1-3"/><path d="M16 38c-5 6-7 13-7 20M48 38c5 6 7 13 7 20"/><path d="M22 44c3 3 6 4 10 4s7-1 10-4"/>',
        "sep": ("M0 -14C3 -6 6 -3 14 0C6 3 3 6 0 14C-3 6 -6 3 -14 0C-6 -3 -3 -6 0 -14Z"
                "M3.2 0A3.2 3.2 0 1 0 -3.2 0A3.2 3.2 0 1 0 3.2 0Z"),
        "brand": ("M12 2C16.5 2 21 6.5 21 12S16.5 22 12 22 3 17.5 3 12 7.5 2 12 2Z"
                  "M12 7.5C8.8 7.5 6.6 10 5.5 12c1.1 2 3.3 4.5 6.5 4.5S17.4 14 18.5 12C17.4 10 15.2 7.5 12 7.5Z"
                  "M12 9.2C13 10.4 13 13.6 12 14.8 11 13.6 11 10.4 12 9.2Z"),
    }


def main():
    write_ts(LIB / "curse-art.ts", "CURSE_ART", {
        "emblem": emblem_svg(),
        "world": world_svg(),
        "icons": icons(),
    })


if __name__ == "__main__":
    main()
