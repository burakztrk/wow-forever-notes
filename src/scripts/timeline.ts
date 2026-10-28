// Story timeline page (src/pages/[lang]/stories/timeline.astro). The page starts complete without
// JavaScript (ruler ticks link to the listed events); this turns it into one event at a time:
// - a tick on the ruler, a pin on the map, the prev/next buttons or ←/→ on the ruler select an event;
// - the map's camera (viewBox) moves to the event's place and its routes, labels keep their screen size via --k;
// - the story chips filter the ruler, the pins and prev/next to the events one story tells;
// - the state lives in the hash: #e=<event>&s=<story slug> (#e-<event>, the no-JS anchor, works too).
// prefers-reduced-motion: no camera animation.

interface Data {
  places: Record<string, [number, number]>;
  events: { id: string; place: string; from: string[]; to: string[]; s: string[] }[];
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
  const ticks = new Map($$<HTMLAnchorElement>('.tick').map((a) => [a.dataset.ev!, a]));
  const items = new Map($$('.tl-ev').map((li) => [li.dataset.ev!, li]));
  const bands = $$('.band');
  const ruler = $('.ruler')!;
  const chips = $$<HTMLButtonElement>('.tl-filter .chip');
  const count = $('.tl-count');
  const zoomBtn = $<HTMLButtonElement>('.tl-zoom');
  $('.tl-nav')?.removeAttribute('hidden');
  zoomBtn?.removeAttribute('hidden');

  const W = 1002;
  const H = 668;
  const byId = new Map(data.events.map((e, i) => [e.id, { ...e, i }]));
  let filter = '';
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
    // bend to one side by a fifth of the length; stop short of the pin
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

  // ---------- selection ----------
  const writeHash = () => {
    const h = `#e=${cur}${filter ? `&s=${filter}` : ''}`;
    if (location.hash !== h) history.replaceState(null, '', h);
  };
  const centerTick = (a: HTMLElement, smooth: boolean) => {
    if (ruler.scrollWidth <= ruler.clientWidth) return;
    const r = a.getBoundingClientRect();
    const rr = ruler.getBoundingClientRect();
    const left = ruler.scrollLeft + r.left - rr.left - (rr.width - r.width) / 2;
    ruler.scrollTo({ left, behavior: smooth && !reduce ? 'smooth' : 'auto' });
  };
  const select = (id: string, opts: { instant?: boolean; focus?: boolean } = {}) => {
    const e = byId.get(id);
    if (!e) return;
    cur = id;
    ticks.forEach((a, k) => {
      const on = k === id;
      a.classList.toggle('cur', on);
      if (on) a.setAttribute('aria-current', 'step');
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
    const tick = ticks.get(id)!;
    bands.forEach((b) => b.classList.toggle('cur', b === tick.closest('.band')));
    drawRoutes(id);
    camTo(frame(id), opts.instant);
    const n = shown.findIndex((x) => x.id === id);
    if (count) count.textContent = (count.dataset.fmt ?? '{n} / {total}').replace('{n}', String(n + 1)).replace('{total}', String(shown.length));
    $$<HTMLButtonElement>('.tl-btn').forEach((b) => {
      const to = n + Number(b.dataset.go);
      b.disabled = to < 0 || to >= shown.length;
    });
    centerTick(tick, !opts.instant);
    if (opts.focus) tick.focus({ preventScroll: true });
    writeHash();
  };
  const step = (d: number, focus = false) => {
    const n = shown.findIndex((x) => x.id === cur);
    const next = shown[clamp(n + d, 0, shown.length - 1)];
    if (next && next.id !== cur) select(next.id, { focus });
  };

  // ---------- filter ----------
  const setFilter = (slug: string) => {
    filter = data.events.some((e) => e.s.includes(slug)) ? slug : '';
    shown = filter ? data.events.filter((e) => e.s.includes(filter)) : data.events;
    const ids = new Set(shown.map((e) => e.id));
    chips.forEach((c) => {
      const on = (c.dataset.s ?? '') === filter;
      c.classList.toggle('sel', on);
      c.setAttribute('aria-pressed', String(on));
    });
    ticks.forEach((a, id) => {
      (a.parentElement as HTMLElement).hidden = !ids.has(id);
    });
    bands.forEach((b) => {
      const n = $$('.tick', b).filter((a) => ids.has(a.dataset.ev!)).length;
      b.hidden = n === 0;
      b.style.setProperty('--n', String(n));
    });
    const live = new Set(shown.flatMap((e) => [e.place, ...e.from, ...e.to]));
    pins.forEach((g, k) => g.classList.toggle('mute', !live.has(k)));
    if (!ids.has(cur)) cur = shown[0].id;
  };

  // ---------- events ----------
  chips.forEach((c) =>
    c.addEventListener('click', () => {
      setFilter(c.dataset.s ?? '');
      select(cur);
    }),
  );
  ticks.forEach((a, id) =>
    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      select(id);
    }),
  );
  ruler.addEventListener('keydown', (ev) => {
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
    if (h.startsWith('e-')) return { e: h.slice(2), s: '' };
    const q = new URLSearchParams(h);
    return { e: q.get('e') ?? '', s: q.get('s') ?? '' };
  };
  const fromHash = (instant: boolean) => {
    const { e, s } = readHash();
    setFilter(s);
    const ok = byId.has(e) && shown.some((x) => x.id === e);
    select(ok ? e : shown[0].id, { instant });
  };
  addEventListener('hashchange', () => fromHash(false));
  let resizeT = 0;
  addEventListener('resize', () => {
    clearTimeout(resizeT);
    resizeT = window.setTimeout(() => camTo(frame(cur), true), 120);
  });
  fromHash(true);
}
