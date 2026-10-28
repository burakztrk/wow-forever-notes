// Story timeline page (src/pages/[lang]/stories/timeline.astro). The page starts complete without
// JavaScript (timeline cards link to the listed events); this turns it into one event at a time:
// - a card on the timeline, a pin on the map, the prev/next buttons or ←/→ on the timeline select an event;
// - the map's camera (viewBox) moves to the event's place and its routes, labels keep their screen size via --k;
// - the key's topics and the story chips filter the timeline, the pins and prev/next (one filter at a time);
// - the timeline scrolls sideways: buttons at its ends, mouse drag, and the selected card is brought into view;
// - the state lives in the hash: #e=<event>&s=<story slug> or &c=<topic> (#e-<event>, the no-JS anchor, works too).
// prefers-reduced-motion: no camera animation or smooth scrolling.

interface Data {
  places: Record<string, [number, number]>;
  events: { id: string; place: string; from: string[]; to: string[]; s: string[]; c: string[] }[];
}

const root = document.getElementById('tl');
const raw = document.getElementById('tl-data')?.textContent;
if (root && raw) initTimeline(root, JSON.parse(raw) as Data);

function initTimeline(root: HTMLElement, data: Data) {
  root.classList.add('js-on');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = root) => r.querySelector<T>(s);
  const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = root) => [...r.querySelectorAll<T>(s)];
  const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  const svg = $<SVGSVGElement>('#tlmap')!;
  const routes = $<SVGGElement>('.tl-routes', svg)!;
  const pins = new Map($$<SVGGElement>('.tp', svg).map((g) => [g.dataset.place!, g]));
  const cols = new Map($$('.pz-ev').map((li) => [li.dataset.ev!, li]));
  const cards = new Map($$<HTMLAnchorElement>('.pz-card').map((a) => [a.dataset.ev!, a]));
  const items = new Map($$('.tl-ev').map((li) => [li.dataset.ev!, li]));
  const eraCols = $$('.pz-era');
  const poster = $('.poster')!;
  const chips = $$<HTMLButtonElement>('.tl-filter .chip');
  const topicBtns = $$<HTMLButtonElement>('.tl-topics .topic');
  const scrollBtns = $$<HTMLButtonElement>('.pz-scroll');
  const count = $('.tl-count');
  const zoomBtn = $<HTMLButtonElement>('.tl-zoom');
  $('.tl-nav')?.removeAttribute('hidden');
  zoomBtn?.removeAttribute('hidden');
  scrollBtns.forEach((b) => b.removeAttribute('hidden'));

  const W = 1002;
  const H = 668;
  const byId = new Map(data.events.map((e, i) => [e.id, { ...e, i }]));
  let filter: { kind: 's' | 'c'; id: string } | null = null;
  let shown = data.events;
  let cur = data.events[0].id;
  let zoomed = true;

  // ---------- camera ----------
  let cam = [0, 0, W, H];
  let camAnim = 0;
  const applyCam = (vb: number[]) => {
    svg.setAttribute('viewBox', vb.map((n) => n.toFixed(1)).join(' '));
    const r = svg.getBoundingClientRect();
    if (r.width) svg.style.setProperty('--k', clamp(vb[2] / r.width, 0.2, 2.4).toFixed(3));
  };
  const camTo = (vb: number[], instant = false) => {
    cancelAnimationFrame(camAnim);
    if (instant || reduce) {
      cam = vb;
      applyCam(cam);
      return;
    }
    const from = cam.slice();
    const t0 = performance.now();
    const tick = (t: number) => {
      const e = ease(clamp((t - t0) / 900, 0, 1));
      cam = from.map((v, i) => v + (vb[i] - v) * e);
      applyCam(cam);
      if (e < 1) camAnim = requestAnimationFrame(tick);
    };
    camAnim = requestAnimationFrame(tick);
  };
  /** A 3:2 box around the event's place and the ends of its routes. */
  const frame = (id: string) => {
    if (!zoomed) return [0, 0, W, H];
    const e = byId.get(id)!;
    const pts = [e.place, ...e.from, ...e.to].map((p) => data.places[p]);
    const xs = pts.map((p) => p[0]);
    const ys = pts.map((p) => p[1]);
    const narrow = svg.getBoundingClientRect().width < 560;
    const pad = narrow ? 60 : 90;
    let w = Math.max(Math.max(...xs) - Math.min(...xs) + 2 * pad, narrow ? 380 : 460);
    let h = Math.max(Math.max(...ys) - Math.min(...ys) + 2 * pad, w / 1.5);
    w = Math.min(W, Math.max(w, h * 1.5));
    h = Math.min(H, w / 1.5);
    const cx = (Math.max(...xs) + Math.min(...xs)) / 2;
    const cy = (Math.max(...ys) + Math.min(...ys)) / 2;
    return [clamp(cx - w / 2, 0, W - w), clamp(cy - h / 2, 0, H - h), w, h];
  };

  // ---------- routes ----------
  const NS = 'http://www.w3.org/2000/svg';
  const curve = (a: [number, number], b: [number, number]) => {
    const [mx, my] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const [dx, dy] = [b[0] - a[0], b[1] - a[1]];
    // bend to one side by a fifth of the length; stop short of the pins
    const [qx, qy] = [mx - dy * 0.2, my + dx * 0.2];
    const len = Math.hypot(b[0] - qx, b[1] - qy) || 1;
    const end = [b[0] - ((b[0] - qx) / len) * 12, b[1] - ((b[1] - qy) / len) * 12];
    const len0 = Math.hypot(qx - a[0], qy - a[1]) || 1;
    const start = [a[0] + ((qx - a[0]) / len0) * 8, a[1] + ((qy - a[1]) / len0) * 8];
    return `M${start[0].toFixed(1)},${start[1].toFixed(1)}Q${qx.toFixed(1)},${qy.toFixed(1)} ${end[0].toFixed(1)},${end[1].toFixed(1)}`;
  };
  const drawRoutes = (id: string) => {
    const e = byId.get(id)!;
    const here = data.places[e.place];
    routes.replaceChildren();
    const lines = [...e.from.map((p) => [data.places[p], here]), ...e.to.map((p) => [here, data.places[p]])];
    lines.forEach(([a, b], i) => {
      const path = document.createElementNS(NS, 'path');
      path.setAttribute('d', curve(a, b));
      path.setAttribute('class', 'tl-rt');
      path.setAttribute('marker-end', 'url(#tl-arrow)');
      path.setAttribute('pathLength', '1');
      path.style.animationDelay = `${0.25 + i * 0.15}s`;
      routes.append(path);
    });
  };

  // ---------- the timeline's sideways scroll ----------
  const behavior = (smooth: boolean): ScrollBehavior => (smooth && !reduce ? 'smooth' : 'auto');
  const bringIntoView = (id: string, smooth: boolean) => {
    const card = cards.get(id)!;
    const r = card.getBoundingClientRect();
    const pr = poster.getBoundingClientRect();
    if (r.left >= pr.left + 40 && r.right <= pr.right - 40) return;
    poster.scrollTo({ left: poster.scrollLeft + r.left - pr.left - (pr.width - r.width) / 2, behavior: behavior(smooth) });
  };
  const syncScrollBtns = () => {
    const max = poster.scrollWidth - poster.clientWidth;
    scrollBtns.forEach((b) => {
      b.disabled = Number(b.dataset.dir) < 0 ? poster.scrollLeft <= 2 : poster.scrollLeft >= max - 2;
    });
  };
  scrollBtns.forEach((b) =>
    b.addEventListener('click', () =>
      poster.scrollBy({ left: Number(b.dataset.dir) * poster.clientWidth * 0.8, behavior: behavior(true) }),
    ),
  );
  poster.addEventListener('scroll', syncScrollBtns, { passive: true });
  // drag with the mouse; a drag does not count as a click on the card under it
  let drag: { x: number; left: number; moved: boolean } | null = null;
  poster.addEventListener('pointerdown', (ev) => {
    if (ev.pointerType !== 'mouse' || ev.button !== 0) return;
    drag = { x: ev.clientX, left: poster.scrollLeft, moved: false };
  });
  addEventListener('pointermove', (ev) => {
    if (!drag) return;
    const dx = ev.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) > 5) {
      drag.moved = true;
      poster.classList.add('dragging');
    }
    if (drag.moved) poster.scrollLeft = drag.left - dx;
  });
  addEventListener('pointerup', () => {
    if (drag?.moved) setTimeout(() => poster.classList.remove('dragging'));
    else poster.classList.remove('dragging');
    setTimeout(() => (drag = null));
  });
  poster.addEventListener(
    'click',
    (ev) => {
      if (drag?.moved) {
        ev.preventDefault();
        ev.stopPropagation();
      }
    },
    true,
  );

  // ---------- selection ----------
  const writeHash = () => {
    const h = `#e=${cur}${filter ? `&${filter.kind}=${filter.id}` : ''}`;
    if (location.hash !== h) history.replaceState(null, '', h);
  };
  const select = (id: string, opts: { instant?: boolean; focus?: boolean } = {}) => {
    const e = byId.get(id);
    if (!e) return;
    cur = id;
    cols.forEach((li, k) => li.classList.toggle('cur', k === id));
    cards.forEach((a, k) => {
      if (k === id) a.setAttribute('aria-current', 'step');
      else a.removeAttribute('aria-current');
    });
    items.forEach((li, k) => li.classList.toggle('cur', k === id));
    const via = new Set([...e.from, ...e.to]);
    pins.forEach((g, k) => {
      g.classList.toggle('on', k === e.place);
      g.classList.toggle('via', via.has(k));
    });
    // the current pin draws above the rest
    const pin = pins.get(e.place);
    if (pin) pin.parentNode?.append(pin);
    drawRoutes(id);
    camTo(frame(id), opts.instant);
    const n = shown.findIndex((x) => x.id === id);
    if (count) count.textContent = (count.dataset.fmt ?? '{n} / {total}').replace('{n}', String(n + 1)).replace('{total}', String(shown.length));
    $$<HTMLButtonElement>('.tl-btn').forEach((b) => {
      const to = n + Number(b.dataset.go);
      b.disabled = to < 0 || to >= shown.length;
    });
    bringIntoView(id, !opts.instant);
    if (opts.focus) cards.get(id)!.focus({ preventScroll: true });
    writeHash();
  };
  const step = (d: number, focus = false) => {
    const n = shown.findIndex((x) => x.id === cur);
    const next = shown[clamp(n + d, 0, shown.length - 1)];
    if (next && next.id !== cur) select(next.id, { focus });
  };

  // ---------- filter: one story or one topic ----------
  const setFilter = (f: { kind: 's' | 'c'; id: string } | null) => {
    const match = (e: Data['events'][number]) => (f ? (f.kind === 's' ? e.s : e.c).includes(f.id) : true);
    filter = f && data.events.some(match) ? f : null;
    shown = data.events.filter((e) => (filter ? match(e) : true));
    const ids = new Set(shown.map((e) => e.id));
    chips.forEach((c) => {
      const id = c.dataset.s ?? '';
      const on = filter ? filter.kind === 's' && filter.id === id : id === '';
      c.classList.toggle('sel', on);
      c.setAttribute('aria-pressed', String(on));
    });
    topicBtns.forEach((b) => {
      const on = filter?.kind === 'c' && filter.id === b.dataset.c;
      b.classList.toggle('sel', on);
      b.setAttribute('aria-pressed', String(on));
    });
    // the visible cards alternate above and below the line again
    let n = 0;
    cols.forEach((li, id) => {
      li.hidden = !ids.has(id);
      if (li.hidden) return;
      li.classList.toggle('up', n % 2 === 0);
      li.classList.toggle('dn', n % 2 === 1);
      n++;
    });
    eraCols.forEach((li) => {
      li.hidden = !shown.some((e) => eraOf.get(e.id) === li);
    });
    const live = new Set(shown.flatMap((e) => [e.place, ...e.from, ...e.to]));
    pins.forEach((g, k) => g.classList.toggle('mute', !live.has(k)));
    if (!ids.has(cur)) cur = shown[0].id;
    poster.scrollLeft = 0;
    syncScrollBtns();
  };
  // the era marker each event follows
  const eraOf = new Map<string, HTMLElement>();
  let lastEra: HTMLElement | undefined;
  $$('.pz-track > li').forEach((li) => {
    if (li.classList.contains('pz-era')) lastEra = li;
    else if (lastEra) eraOf.set(li.dataset.ev!, lastEra);
  });

  // ---------- events ----------
  chips.forEach((c) =>
    c.addEventListener('click', () => {
      setFilter(c.dataset.s ? { kind: 's', id: c.dataset.s } : null);
      select(cur, { instant: true });
    }),
  );
  topicBtns.forEach((b) =>
    b.addEventListener('click', () => {
      const id = b.dataset.c!;
      setFilter(filter?.kind === 'c' && filter.id === id ? null : { kind: 'c', id });
      select(cur, { instant: true });
    }),
  );
  cards.forEach((a, id) =>
    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      select(id);
    }),
  );
  poster.addEventListener('keydown', (ev) => {
    if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') {
      ev.preventDefault();
      step(ev.key === 'ArrowRight' ? 1 : -1, true);
    } else if (ev.key === 'Home' || ev.key === 'End') {
      ev.preventDefault();
      select((ev.key === 'Home' ? shown[0] : shown[shown.length - 1]).id, { focus: true });
    }
  });
  $$<HTMLButtonElement>('.tl-btn').forEach((b) => b.addEventListener('click', () => step(Number(b.dataset.go))));
  // a pin selects the next event (in the filter) that happens there
  pins.forEach((g, place) =>
    g.addEventListener('click', () => {
      if (g.classList.contains('mute')) return;
      const n = shown.findIndex((x) => x.id === cur);
      const order = [...shown.slice(n + 1), ...shown.slice(0, n + 1)];
      const hit = order.find((e) => e.place === place) ?? order.find((e) => e.from.includes(place) || e.to.includes(place));
      if (hit) select(hit.id);
    }),
  );
  zoomBtn?.addEventListener('click', () => {
    zoomed = !zoomed;
    zoomBtn.classList.toggle('out', !zoomed);
    const label = (zoomed ? zoomBtn.dataset.out : zoomBtn.dataset.in) ?? '';
    zoomBtn.setAttribute('aria-label', label);
    zoomBtn.title = label;
    camTo(frame(cur));
  });

  const readHash = () => {
    const h = decodeURIComponent(location.hash.slice(1));
    if (h.startsWith('e-')) return { e: h.slice(2), f: null };
    const q = new URLSearchParams(h);
    const f = q.get('s') ? { kind: 's' as const, id: q.get('s')! } : q.get('c') ? { kind: 'c' as const, id: q.get('c')! } : null;
    return { e: q.get('e') ?? '', f };
  };
  const fromHash = (instant: boolean) => {
    const { e, f } = readHash();
    setFilter(f);
    const ok = byId.has(e) && shown.some((x) => x.id === e);
    select(ok ? e : shown[0].id, { instant });
  };
  // only hashes that name an event (#e=… or #e-…) change the state; the jump to the map does not
  addEventListener('hashchange', () => {
    if (/^#e[=-]/.test(location.hash)) fromHash(false);
  });
  $<HTMLAnchorElement>('.tl-down')?.addEventListener('click', (ev) => {
    ev.preventDefault();
    $('#tl-stage')?.scrollIntoView({ behavior: behavior(true), block: 'start' });
  });
  let resizeT = 0;
  addEventListener('resize', () => {
    clearTimeout(resizeT);
    resizeT = window.setTimeout(() => {
      camTo(frame(cur), true);
      syncScrollBtns();
    }, 120);
  });
  fromHash(true);
}
