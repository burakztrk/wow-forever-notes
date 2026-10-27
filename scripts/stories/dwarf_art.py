#!/usr/bin/env python3
"""Generates src/lib/stories/dwarf-art.ts: the maps and drawings of the Dwarf story.

Run from the repo root:  python3 scripts/stories/dwarf_art.py   (helpers in art_lib.py)
"""
from art_lib import *  # noqa: F401,F403

# clan colours: Bronzebeard gold, Wildhammer storm teal, Dark Iron ember red
CLAN = {"bronze": "#c8a656", "wild": "#4fb3a9", "dark": "#c0392b"}


# ---------- Three hammers (one painted hammer, tinted per clan; they drift apart as the clans split) ----------
def crest_svg():
    cx, cy = 210, 178
    parts = [
        # (tinted image, angle, drift dx, dy, deg)
        ("wild", -34, -86, 14, -16),
        ("dark", 34, 86, 14, 16),
        ("bronze", 0, 0, -18, 0),
    ]
    hammers = ""
    for name, ang, dx, dy, deg in parts:
        hammers += (f'<g data-move="{dx},{dy},{deg}"><g transform="translate({cx},{cy}) rotate({ang})">'
                    f'<image href="%%base%%stories/dwarf/hammer-{name}.webp" x="-52" y="-106" width="104" height="212" '
                    f'filter="url(#hShadow)"/></g></g>')
    defs = """<defs>
<filter id="hShadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="3" dy="5" stdDeviation="4" flood-color="#000" flood-opacity=".55"/></filter>
<radialGradient id="hGlow"><stop offset="0" stop-color="#ff8a3a" stop-opacity=".35"/><stop offset="1" stop-color="#ff8a3a" stop-opacity="0"/></radialGradient>
</defs>"""
    labels = ('<text class="gtxt wild" x="62" y="318" text-anchor="middle">Wildhammer</text>'
              '<text class="gtxt bronze" x="210" y="318" text-anchor="middle">Bronzebeard</text>'
              '<text class="gtxt dark" x="358" y="318" text-anchor="middle">Dark Iron</text>')
    return (f'<svg viewBox="0 0 420 330" role="img" aria-label="%%crestAria%%">{defs}'
            f'<ellipse cx="210" cy="190" rx="170" ry="120" fill="url(#hGlow)"/>{hammers}{labels}</svg>')


# ---------- Maps: the painted game maps (public/stories/dwarf/map-*.webp, 1002x668) with routes drawn on top ----------
EK_IMG = '<image class="map-img" href="%%base%%maps/eastern-kingdoms.webp" width="1002" height="668"/>'
WORLD_IMG = '<image class="map-img" href="%%base%%maps/azeroth.webp" width="1002" height="668"/>'

# places on the Eastern Kingdoms map
IF, GB, TH, BR, AP, TS, DA = (455, 372), (565, 302), (470, 478), (505, 438), (578, 240), (500, 283), (530, 330)


def route(pts, cls, headcls=None):
    s = f'<path class="rt {cls} draw" pathLength="1" d="{smooth_open(pts)}"/>'
    if headcls:
        s += head(*pts[-1], end_angle(pts), headcls)
    return s


def mask_for(mid, d, rng):
    return (f'<mask id="{mid}" maskUnits="userSpaceOnUse" x="0" y="0" width="1002" height="668">'
            f'<path d="{d}" pathLength="1" stroke="#fff" stroke-width="18" fill="none" stroke-dasharray="1 1" '
            f'stroke-dashoffset="0" data-r="{rng}"/></mask>')


def ek_svg():
    triad = "".join(f'<circle class="clan-dot" cx="{f(IF[0] + dx)}" cy="{f(IF[1] + dy)}" r="4.5" fill="{c}"/>'
                    for (dx, dy), c in zip([(-11, -12), (0, -15), (11, -12)], [CLAN["wild"], CLAN["bronze"], CLAN["dark"]]))
    l1 = ('<g class="ly on" data-ly="1">'
          f'<circle class="pulse-ring" cx="{IF[0]}" cy="{IF[1]}" r="16"/>{triad}'
          + ftext(IF[0], IF[1] - 30, "%%oneThrone%%") + '</g>')
    l2 = ('<g class="ly" data-ly="2">'
          + route([IF, (500, 342), (538, 318), GB], "wild", "wild")
          + route([IF, (448, 415), (458, 450), TH], "dark", "dark")
          + ftext(535, 296, "Wildhammer", "ft wildt", "end") + ftext(440, 462, "Dark Iron", "ft darkt", "end")
          + pin(*TH, "Thaurissan", "r") + '</g>')
    l3 = ('<g class="ly" data-ly="3">'
          + route([TH, (462, 440), (452, 400), IF], "dark wide", "dark")
          + route([TH, (520, 455), (566, 390), (572, 335), GB], "dark dash", "dark")
          + f'<circle class="banner gold" cx="{IF[0]}" cy="{IF[1]}" r="18"/>'
          + f'<circle class="scourge" cx="{GB[0]}" cy="{GB[1]}" r="16"/>'
          + ftext(IF[0] - 20, IF[1] + 26, "Madoran", "ft", "end") + ftext(GB[0] + 20, GB[1] - 10, "Modgud †", "ft", "start")
          + pin(*TH, "Thaurissan", "r") + '</g>')
    l4 = ('<g class="ly" data-ly="4">'
          '<defs><radialGradient id="ekFire"><stop offset="0" stop-color="#ffb36b" stop-opacity=".9"/>'
          '<stop offset=".45" stop-color="#e0502a" stop-opacity=".5"/><stop offset="1" stop-color="#7a1d0e" stop-opacity="0"/></radialGradient></defs>'
          f'<circle class="firezone" cx="{BR[0]}" cy="{BR[1]}" r="40" fill="url(#ekFire)"/>'
          + ftext(BR[0] - 38, BR[1] - 14, "SEARING GORGE", "rl", "end") + ftext(BR[0] + 4, BR[1] + 36, "BURNING STEPPES", "rl")
          + pin(*BR, "Blackrock Mountain", "r") + '</g>')
    l5 = ('<g class="ly" data-ly="5">'
          + route([GB, (572, 282), (578, 262), AP], "wild", "wild")
          + f'<circle class="scourge" cx="{GB[0]}" cy="{GB[1]}" r="16"/>'
          + f'<path class="bridge" d="M{TS[0] - 14} {TS[1] + 6}Q{TS[0]} {TS[1] - 8} {TS[0] + 14} {TS[1] + 6}"/>'
          + pin(*AP, "Aerie Peak", "r") + pin(*TS, "Thandol Span", "l") + '</g>')
    base_pins = pin(*IF, "Ironforge", "l") + pin(*GB, "Grim Batol", "r")
    # one camera per step, ~1.5:1 like the stage
    cams = {1: [335, 300, 290, 193], 2: [335, 255, 290, 193], 3: [335, 255, 290, 193], 4: [350, 330, 270, 180],
            5: [335, 195, 290, 193]}
    c1 = " ".join(str(n) for n in cams[1])
    return (f'<svg id="ek" class="map" viewBox="{c1}" data-cams=\'{json.dumps(cams, separators=(",", ":"))}\' '
            f'role="img" aria-label="%%ekAria%%">{EK_IMG}{l1}{l2}{l3}{l4}{l5}{base_pins}</svg>')


# ---------- Khaz Modan in the Second War ----------
def kz_svg():
    horde = [BR, (522, 405), (515, 365), (525, 340), DA]
    to_gb = [DA, (548, 318), GB]
    siege = [DA, (498, 342), (472, 358), (460, 368)]
    gry = [AP, (562, 276), (522, 326), (488, 352), (463, 365)]
    paths = {"h1": horde, "h2": to_gb, "h3": siege, "g1": gry}
    ranges = {"h1": "0.05,0.35", "h2": "0.3,0.45", "h3": "0.4,0.6", "g1": "0.6,0.95"}
    masks = "".join(mask_for(f"mK{k}", smooth_open(v), ranges[k]) for k, v in paths.items())
    lines = "".join(
        f'<path class="rt {"horde" if k[0] == "h" else "wild"} dashed" d="{smooth_open(v)}" mask="url(#mK{k})"/>'
        for k, v in paths.items())
    heads = (f'<g data-show="0.45">{head(*to_gb[-1], end_angle(to_gb), "horde")}</g>'
             f'<g data-show="0.6">{head(*siege[-1], end_angle(siege), "horde")}</g>'
             f'<g data-show="0.95">{head(*gry[-1], end_angle(gry), "wild")}</g>')
    pins = (f'<g data-show="0.58"><circle class="ruin" cx="{IF[0]}" cy="{IF[1]}" r="24"/></g>'
            + pin(*IF, "Ironforge", "l", "", 1) + pin(*DA, "Dun Algaz", "r", "", 2)
            + f'<g data-show="0.44">{pin(*GB, "Grim Batol", "r", "", 3)}</g>'
            + pin(*TS, "Thandol Span", "l", "", 4) + pin(*AP, "Aerie Peak", "r", "", 5)
            + pin(*BR, "Blackrock Mountain", "r", "", 6))
    labels = ftext(488, 396, "%%siege%%", "ft rage", "end") + ftext(545, 262, "%%gryphons%%", "ft wildt", "start")
    bridge = f'<path class="bridge" d="M{TS[0] - 12} {TS[1] + 12}V{TS[1] - 12}M{TS[0] + 12} {TS[1] + 12}V{TS[1] - 12}"/>'
    return (f'<svg class="map numbered" viewBox="260 205 440 262" role="img" aria-label="%%kzAria%%">'
            f'<defs>{masks}<radialGradient id="kzFire"><stop offset="0" stop-color="#ff8a3a" stop-opacity=".6"/>'
            f'<stop offset="1" stop-color="#c0392b" stop-opacity="0"/></radialGradient></defs>'
            f'{EK_IMG}<circle class="firezone" cx="{BR[0]}" cy="{BR[1]}" r="34" fill="url(#kzFire)"/>'
            f'{bridge}{lines}{labels}{heads}{pins}</svg>')


# ---------- World: dwarven footprints on Azeroth ----------
def wx(x, y):
    """Eastern Kingdoms map coordinates -> the world map."""
    return (round(665 + (x - 380) * .78, 1), round(50 + (y - 20) * .806, 1))


def world_svg():
    IFw, APw, UDw, DPw = wx(*IF), wx(*AP), wx(552, 418), wx(470, 600)
    r2 = [IFw, (IFw[0] + 28, IFw[1] - 40), (APw[0] - 10, APw[1] + 40), APw]
    r3 = [IFw, wx(500, 400), UDw]
    paths = {"1": (r2, "0.05,0.5"), "2": (r3, "0.4,0.9")}
    masks = "".join(mask_for(f"mWd{k}", smooth_open(v), rg) for k, (v, rg) in paths.items())
    lines = "".join(f'<path class="rt gold dashed" d="{smooth_open(v)}" mask="url(#mWd{k})"/>' for k, (v, _rg) in paths.items())
    pins = (pin(*IFw, "Ironforge", "l", "", 1) + pin(*UDw, "Uldaman", "r", "", 2) + pin(*APw, "Aerie Peak", "l", "", 3)
            + pin(*DPw, "Dark Portal", "l", "faded"))
    heads = (f'<g data-show="0.5">{head(*r2[-1], end_angle(r2), "gold")}</g>'
             f'<g data-show="0.9">{head(*r3[-1], end_angle(r3), "gold")}</g>')
    return (f'<svg class="map numbered" viewBox="0 0 1002 668" role="img" aria-label="%%worldAria%%">'
            f'<defs>{masks}</defs>{WORLD_IMG}{lines}{heads}{pins}</svg>')


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
        "kz": kz_svg(),
        "world": world_svg(),
        "icons": icons(),
    })


if __name__ == "__main__":
    main()
