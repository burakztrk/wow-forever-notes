"""Shared helpers for the race story drawings (scripts/stories/*_art.py).

Pure standard library. Shapes are seeded, so the output is stable between runs.
Text inside a drawing is a %%key%% placeholder that src/lib/stories/art.ts fills per
language; %%base%% becomes the site base path.
"""
import json, math, pathlib, random, struct, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
LIB = ROOT / "src" / "lib" / "stories"


def webp_size(path):
    """Width and height of a WebP file (VP8, VP8L or VP8X)."""
    b = path.read_bytes()
    kind = b[12:16]
    if kind == b"VP8X":
        return 1 + int.from_bytes(b[24:27], "little"), 1 + int.from_bytes(b[27:30], "little")
    if kind == b"VP8L":
        bits = int.from_bytes(b[21:25], "little")
        return (bits & 0x3FFF) + 1, ((bits >> 14) & 0x3FFF) + 1
    w, h = struct.unpack("<HH", b[26:30])
    return w & 0x3FFF, h & 0x3FFF


def f(v):
    s = f"{v:.1f}"
    return s[:-2] if s.endswith(".0") else s


def P(x, y):
    return f"{f(x)},{f(y)}"


# ---------- geometry helpers ----------
def jitter_closed(pts, amp, rng):
    out = []
    n = len(pts)
    for i in range(n):
        a, b = pts[i], pts[(i + 1) % n]
        out.append(a)
        mx, my = (a[0] + b[0]) / 2, (a[1] + b[1]) / 2
        dx, dy = b[0] - a[0], b[1] - a[1]
        L = math.hypot(dx, dy) or 1
        j = rng.uniform(-amp, amp)
        out.append((mx - dy / L * j, my + dx / L * j))
    return out


def smooth_closed(pts):
    n = len(pts)
    d = "M" + P(*pts[0])
    for i in range(n):
        p0, p1, p2, p3 = pts[(i - 1) % n], pts[i], pts[(i + 1) % n], pts[(i + 2) % n]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f"C{P(*c1)} {P(*c2)} {P(*p2)}"
    return d + "Z"


def smooth_open(pts):
    Q = [pts[0]] + pts + [pts[-1]]
    d = "M" + P(*pts[0])
    for i in range(1, len(Q) - 2):
        p0, p1, p2, p3 = Q[i - 1], Q[i], Q[i + 1], Q[i + 2]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f"C{P(*c1)} {P(*c2)} {P(*p2)}"
    return d


def end_angle(pts):
    (x1, y1), (x2, y2) = pts[-2], pts[-1]
    return math.degrees(math.atan2(y2 - y1, x2 - x1))


def gear_d(teeth, rr, rt, hole=0, cx=0, cy=0, tip=0.14, base=0.27):
    pitch = 2 * math.pi / teeth
    pt = lambda r, a: P(cx + r * math.cos(a), cy + r * math.sin(a))
    d = ""
    for i in range(teeth):
        a = i * pitch - math.pi / 2
        a0, a1, a2, a3 = a - pitch * base, a - pitch * tip, a + pitch * tip, a + pitch * base
        if i == 0:
            d += "M" + pt(rr, a0)
        d += (f"L{pt(rt, a1)}A{f(rt)},{f(rt)} 0 0 1 {pt(rt, a2)}"
              f"L{pt(rr, a3)}A{f(rr)},{f(rr)} 0 0 1 {pt(rr, a + pitch - pitch * base)}")
    d += "Z"
    if hole:
        d += (f"M{P(cx + hole, cy)}A{f(hole)},{f(hole)} 0 1 0 {P(cx - hole, cy)}"
              f"A{f(hole)},{f(hole)} 0 1 0 {P(cx + hole, cy)}Z")
    return d


def in_poly(x, y, poly):
    inside = False
    n = len(poly)
    for i in range(n):
        x1, y1 = poly[i]
        x2, y2 = poly[(i + 1) % n]
        if (y1 > y) != (y2 > y) and x < (x2 - x1) * (y - y1) / (y2 - y1) + x1:
            inside = not inside
    return inside


def mtn(x, y, s=1.0):
    return f"M{P(x - 6 * s, y + 4 * s)}L{P(x, y - 5 * s)}L{P(x + 6 * s, y + 4 * s)}"


def pin(x, y, label, pos="r", cls="", num=None, extra=""):
    if pos == "r":
        tx, ty, anc = 12, 4.5, "start"
    elif pos == "l":
        tx, ty, anc = -12, 4.5, "end"
    elif pos == "t":
        tx, ty, anc = 0, -14, "middle"
    else:
        tx, ty, anc = 0, 22, "middle"
    if num is not None:
        if pos == "r":
            tx = 15
        if pos == "l":
            tx = -15
        if pos == "t":
            ty = -16
        if pos == "b":
            ty = 25
        dot = (f'<circle class="ph" r="11"/><circle class="pn" r="9"/>'
               f'<text class="pnum" y="3.8">{num}</text>')
    else:
        dot = '<circle class="ph" r="9"/><circle class="pd" r="4.5"/>'
    return (f'<g class="pin {cls}" transform="translate({f(x)},{f(y)})"{extra}><g class="sc">{dot}'
            f'<text class="lbl" x="{tx}" y="{ty}" text-anchor="{anc}">{label}</text></g></g>')


def ftext(x, y, txt, cls="ft", anchor="middle"):
    return f'<text class="{cls}" x="{f(x)}" y="{f(y)}" text-anchor="{anchor}">{txt}</text>'


def head(x, y, ang, cls):
    return (f'<g transform="translate({f(x)},{f(y)}) rotate({f(ang)})">'
            f'<path class="head {cls} sc" d="M-9,-6.5L3,0L-9,6.5Z"/></g>')


def grid_def(gid, size=50):
    return (f'<pattern id="{gid}" width="{size}" height="{size}" patternUnits="userSpaceOnUse">'
            f'<path d="M{size} 0H0V{size}" fill="none" stroke="#2a2f3d" stroke-width=".7"/></pattern>')


# ---------- Eastern Kingdoms ----------
EK_PTS = [(330, 18), (372, 40), (400, 78), (430, 120), (452, 170), (448, 222), (470, 262), (458, 306),
          (440, 340), (452, 382), (470, 420), (462, 470), (470, 520), (452, 566), (440, 612), (468, 650),
          (448, 700), (400, 704), (360, 676), (320, 692), (300, 730), (272, 748), (248, 725), (238, 682),
          (214, 640), (196, 598), (206, 556), (230, 528), (206, 494), (214, 452), (236, 412), (220, 376),
          (196, 346), (160, 318), (148, 270), (150, 222), (132, 178), (150, 130), (196, 96), (250, 80),
          (290, 50)]
KM_PTS = [(230, 452), (270, 430), (330, 432), (400, 420), (462, 430), (466, 500), (448, 548), (380, 556),
          (320, 540), (270, 516), (232, 498)]

rng = random.Random(3)
EK_D = smooth_closed(jitter_closed(EK_PTS, 6, rng))
KM_D = smooth_closed(jitter_closed(KM_PTS, 3, rng))


# ---------- Gear pair (painted game-icon style) ----------
def rounded_poly(pts, radii):
    n = len(pts)
    segs = []
    for i in range(n):
        A, Pt, B = pts[i - 1], pts[i], pts[(i + 1) % n]
        r = radii[i]
        la = math.hypot(A[0] - Pt[0], A[1] - Pt[1])
        lb = math.hypot(B[0] - Pt[0], B[1] - Pt[1])
        d1, d2 = min(r, la / 2), min(r, lb / 2)
        p1 = (Pt[0] + (A[0] - Pt[0]) / la * d1, Pt[1] + (A[1] - Pt[1]) / la * d1)
        p2 = (Pt[0] + (B[0] - Pt[0]) / lb * d2, Pt[1] + (B[1] - Pt[1]) / lb * d2)
        segs.append((p1, Pt, p2))
    d = "M" + P(*segs[0][2])
    for i in range(1, n + 1):
        p1, Pt, p2 = segs[i % n]
        d += f"L{P(*p1)}Q{P(*Pt)} {P(*p2)}"
    return d + "Z"


def chunky_gear(teeth, rr, rt, base=.30, tip=.19, r_tip=7, r_root=6):
    pitch = 2 * math.pi / teeth
    pts, radii = [], []
    pc = lambda r, a: (r * math.cos(a), r * math.sin(a))
    for i in range(teeth):
        a = i * pitch - math.pi / 2
        a0, a1, a2, a3 = a - pitch * base, a - pitch * tip, a + pitch * tip, a + pitch * base
        nxt = a + pitch - pitch * base
        pts += [pc(rr, a0), pc(rt, a1), pc(rt, a2), pc(rr, a3)]
        radii += [r_root, r_tip, r_tip, r_root]
        for k in (1, 2):
            pts.append(pc(rr, a3 + (nxt - a3) * k / 3))
            radii.append(1)
    return rounded_poly(pts, radii)



# ---------- World ----------
KAL_PTS = [(190, 110), (250, 120), (300, 150), (322, 200), (302, 250), (332, 300), (322, 360), (292, 410),
           (302, 460), (250, 500), (190, 490), (150, 452), (110, 400), (80, 330), (92, 262), (70, 200),
           (112, 150)]
NR_PTS = [(338, 92), (368, 52), (430, 30), (500, 20), (570, 26), (630, 46), (662, 80), (642, 120),
          (590, 132), (540, 116), (500, 136), (450, 126), (400, 136), (360, 126)]


def world_base():
    """Kalimdor, Northrend, the Eastern Kingdoms, the Maelstrom and Outland (shared by every story's world map)."""
    r = random.Random(21)
    kal = smooth_closed(jitter_closed(KAL_PTS, 9, r))
    nr = smooth_closed(jitter_closed(NR_PTS, 6, r))
    frags = []
    for (fx, fy, rad) in [(898, 96, 22), (946, 112, 18), (912, 146, 16), (952, 78, 12), (884, 136, 10)]:
        pts = [(fx + math.cos(a) * rad * r.uniform(.7, 1.15), fy + math.sin(a) * rad * r.uniform(.7, 1.15))
               for a in [i * math.pi * 2 / 7 for i in range(7)]]
        frags.append(f'<path class="land out" d="{smooth_closed(pts)}"/>')
    spiral = []
    for i in range(80):
        t = i / 79 * math.pi * 4.2
        rad = 3 + t * 2.6
        spiral.append((480 + math.cos(t) * rad, 300 + math.sin(t) * rad))
    sp = "M" + " L".join(P(*p) for p in spiral)

    return (f'<path class="halo" d="{kal}"/><path class="land" d="{kal}"/>'
            f'<path class="halo" d="{nr}"/><path class="land" d="{nr}"/>'
            f'<g transform="translate(549,90) scale(.54)"><path class="halo big" d="{EK_D}"/><path class="land big" d="{EK_D}"/></g>'
            f'<g class="mael"><path class="maelp" d="{sp}"/></g>'
            f'<circle class="outland" cx="925" cy="118" r="64"/>{"".join(frags)}')


def world_labels(northrend=(470, 84)):
    return (ftext(196, 330, "KALIMDOR", "rl") + ftext(712, 236, "EASTERN KINGDOMS", "rl") +
            ftext(*northrend, "NORTHREND", "rl") + ftext(925, 214, "OUTLAND", "rl") +
            ftext(480, 344, "Maelstrom", "ft dim"))


def ek_world(x, y):
    """Eastern Kingdoms map coordinates → world map coordinates."""
    return (549 + x * .54, 90 + y * .54)


def write_ts(out, const, art):
    body = json.dumps(art, ensure_ascii=False, indent=2)
    out.write_text(
        f"// Generated by scripts/stories/{pathlib.Path(sys.argv[0]).name}; do not edit by hand.\n"
        "// %%key%% placeholders are filled per language by fillArt() in ./art.ts.\n"
        f"export const {const} = {body} as const;\n",
        encoding="utf-8",
    )
    print(out.relative_to(ROOT), out.stat().st_size // 1024, "KB")
