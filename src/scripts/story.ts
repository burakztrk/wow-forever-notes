// Scroll-driven effects of a race story page (src/pages/[lang]/stories/).
// Everything starts from a complete, readable page: these only animate it.
// - [data-p="start,end"] elements get --p (0..1) as their anchor (a point partway down
//   the element) crosses start → end (fractions of the viewport height) and run their handler.
// - Chapter III's map follows the step nearest the reading line and moves its
//   "camera" (viewBox); labels keep their screen size through --k.
// - Hero particles (canvas#snow, data-fx): "snow" is a blizzard whose wind turns left, right
//   and calm; "embers" are forge sparks drifting up.
// prefers-reduced-motion: no camera moves, gears or snow; drawings shown complete.

const lore = document.getElementById('lore');
if (lore) init(lore);

function init(root: HTMLElement) {
  root.classList.add('js-on');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const narrow = matchMedia('(max-width: 860px)');
  const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = root) => r.querySelector<T>(s);
  const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = root) => [...r.querySelectorAll<T>(s)];
  const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  // labels in the drawings keep the same on-screen size at any width
  const scaled = $$<SVGSVGElement>('svg.map').filter((s) => s.id !== 'ek');
  const sizeK = (svg: SVGSVGElement) => {
    const w = svg.getBoundingClientRect().width;
    if (w) svg.style.setProperty('--k', clamp(svg.viewBox.baseVal.width / w, 0.1, 2.2).toFixed(3));
  };
  scaled.forEach(sizeK);

  // Chapter III: steps drive the map layers and its camera
  const story = $('#story');
  const ek = $<SVGSVGElement>('#ek');
  const steps = story ? $$('.step', story) : [];
  const layers = ek ? $$<SVGGElement>('.ly', ek) : [];
  const dots = story ? $$('.dots i', story) : [];
  // one camera (viewBox) per step, written into the map by the art generator
  const cams: Record<number, number[]> = JSON.parse(ek?.dataset.cams ?? '{}');
  const pad = (vb: number[]) => {
    const px = vb[2] * (narrow.matches ? 0.1 : 0.05);
    const py = vb[3] * 0.05;
    return [vb[0] - px, vb[1] - py, vb[2] + 2 * px, vb[3] + 2 * py];
  };
  let cam = cams[1] ? pad(cams[1]) : [0, 0, 500, 760];
  let camAnim = 0;
  let step = 0;
  const applyCam = (vb: number[]) => {
    if (!ek) return;
    ek.setAttribute('viewBox', vb.map((n) => n.toFixed(1)).join(' '));
    const r = ek.getBoundingClientRect();
    if (!r.width || !r.height) return;
    ek.style.setProperty('--k', (1 / Math.min(r.width / vb[2], r.height / vb[3])).toFixed(3));
  };
  const camTo = (vb: number[], instant = false) => {
    cancelAnimationFrame(camAnim);
    if (instant || reduce) {
      cam = vb.slice();
      applyCam(cam);
      return;
    }
    const from = cam.slice();
    const t0 = performance.now();
    const tick = (t: number) => {
      const e = ease(clamp((t - t0) / 1100));
      cam = from.map((v, i) => v + (vb[i] - v) * e);
      applyCam(cam);
      if (e < 1) camAnim = requestAnimationFrame(tick);
    };
    camAnim = requestAnimationFrame(tick);
  };
  const capEra = $('#capEra');
  const capTitle = $('#capTitle');
  const setStep = (n: number, instant = false) => {
    if (n === step || !story) return;
    step = n;
    story.dataset.step = String(n);
    steps.forEach((s, i) => s.classList.toggle('active', i + 1 === n));
    layers.forEach((l) => l.classList.toggle('on', (l.dataset.ly ?? '').split(' ').includes(String(n))));
    dots.forEach((d, i) => d.classList.toggle('on', i < n));
    if (capEra) capEra.textContent = steps[n - 1]?.dataset.era ?? '';
    if (capTitle) capTitle.textContent = steps[n - 1]?.dataset.title ?? '';
    if (cams[n]) camTo(pad(cams[n]), instant);
  };
  setStep(1, true);

  // [data-p] handlers
  type Handler = (p: number, el: HTMLElement) => void;
  const handlers: Record<string, Handler> = {};
  const routeUpdate: Handler = (p, el) => {
    $$<SVGElement>('[data-r]', el).forEach((m) => {
      const [a, b] = (m.dataset.r ?? '0,1').split(',').map(Number);
      m.style.strokeDashoffset = (1 - clamp((p - a) / (b - a))).toFixed(4);
    });
    $$<SVGElement>('[data-show]', el).forEach((n) => n.classList.toggle('pending', p < Number(n.dataset.show)));
  };
  const stages = $$('#evo .stage');
  handlers.evo = (p) => stages.forEach((s, i) => s.classList.toggle('lit', p >= i / 3 - 0.02));
  const scene = $('#scene');
  if (scene) {
    const flood = $<SVGGElement>('.flood', scene);
    const risers = $<SVGGElement>('.risers', scene);
    const valve = $<SVGGElement>('.valve', scene);
    const wins = $$<SVGRectElement>('.win', scene);
    handlers.scene = (p) => {
      const gy = 432 - 318 * clamp((p - 0.12) / 0.66);
      flood?.setAttribute('transform', `translate(0,${gy.toFixed(1)})`);
      risers?.setAttribute('transform', `translate(0,${(70 * (1 - ease(clamp(p / 0.3)))).toFixed(1)})`);
      if (valve) valve.style.transform = `rotate(${(p * 540).toFixed(1)}deg)`;
      wins.forEach((w) => w.classList.toggle('off', Number(w.dataset.y) + 6 > gy));
    };
  }
  // [data-moves]: parts drift apart as p grows (data-move="dx,dy,deg" on each part)
  const moveUpdate: Handler = (p, el) => {
    const q = ease(clamp(p / 0.7));
    $$<SVGGElement>('[data-move]', el).forEach((g) => {
      const [dx, dy, deg] = (g.dataset.move ?? '0,0,0').split(',').map(Number);
      g.style.transform = `translate(${(dx * q).toFixed(1)}px,${(dy * q).toFixed(1)}px) rotate(${(deg * q).toFixed(1)}deg)`;
    });
  };
  const tracks = $$('[data-p]').map((el) => {
    const [s, e] = (el.dataset.p ?? '0.9,0.2').split(',').map(Number);
    const fn = handlers[el.id] ?? ('routes' in el.dataset ? routeUpdate : 'moves' in el.dataset ? moveUpdate : undefined);
    return { el, s, e, fn, last: -1 };
  });

  // the gear pair turns with the page; its lighting stays top-left
  const gearFig = $('.gears');
  const gearRot = $$<SVGGElement>('.gears [data-gear]');
  const gearGrad = $$<SVGGradientElement>('.gears [data-gear-grad]');
  const chapLinks = $$<HTMLAnchorElement>('.chapnav a');
  const chaps = chapLinks.map((a) => document.getElementById(a.dataset.ch ?? ''));

  let ticking = false;
  const frame = () => {
    ticking = false;
    const vh = innerHeight;
    const y = scrollY;
    const max = document.documentElement.scrollHeight - vh;
    root.style.setProperty('--pp', max > 0 ? (y / max).toFixed(4) : '0');
    if (!reduce) root.style.setProperty('--s', String(Math.round(y)));
    if (!reduce && gearFig) {
      const gr = gearFig.getBoundingClientRect();
      if (gr.bottom > -100 && gr.top < vh + 100) {
        const ang: Record<string, number> = { big: -15 + y * 0.12, small: 15 - y * 0.18 };
        gearRot.forEach((g) => g.setAttribute('transform', `rotate(${ang[g.dataset.gear ?? 'big'].toFixed(2)})`));
        gearGrad.forEach((g) =>
          g.setAttribute('gradientTransform', `rotate(${(-ang[g.dataset.gearGrad ?? 'big']).toFixed(2)} .5 .5)`),
        );
      }
    }
    for (const t of tracks) {
      const r = t.el.getBoundingClientRect();
      if (r.bottom < -vh * 0.3 || r.top > vh * 1.3) continue;
      // anchor: a point a little below the element's top (at most 35% of the viewport),
      // so a figure finishes animating when it is in front of the reader, not on its way in
      const anchor = r.top + Math.min(r.height, vh * 0.7) * 0.5;
      const p = reduce ? 1 : clamp((t.s * vh - anchor) / ((t.s - t.e) * vh));
      if (Math.abs(p - t.last) < 0.0005) continue;
      t.last = p;
      t.el.style.setProperty('--p', p.toFixed(4));
      t.fn?.(p, t.el);
    }
    if (story) {
      const sr = story.getBoundingClientRect();
      if (sr.bottom > 0 && sr.top < vh) {
        const line = vh * (narrow.matches ? 0.84 : 0.58);
        let n = 1;
        steps.forEach((s, i) => {
          if (s.getBoundingClientRect().top < line) n = i + 1;
        });
        setStep(n);
      }
    }
    let active = -1;
    chaps.forEach((c, i) => {
      if (c && c.getBoundingClientRect().top < vh * 0.35) active = i;
    });
    chapLinks.forEach((l, i) => l.classList.toggle('active', i === active));
  };
  const request = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(frame);
    }
  };
  addEventListener('scroll', request, { passive: true });
  addEventListener('resize', () => {
    scaled.forEach(sizeK);
    applyCam(cam);
    request();
  });
  frame();

  // entrance animations start from a visible state (see .rv.in in stories.css)
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px 6% 0px' },
    );
    $$('.rv').forEach((el) => {
      if (el.getBoundingClientRect().top > innerHeight * 0.96) io.observe(el);
    });
    $$('.count').forEach((el) => {
      const to = Number(el.dataset.to);
      const o = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;
          o.disconnect();
          const t0 = performance.now();
          const tick = (t: number) => {
            const k = clamp((t - t0) / 1400);
            el.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 3))));
            if (k < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        },
        { threshold: 0.6 },
      );
      o.observe(el);
    });
  }

  const fx = $<HTMLCanvasElement>('#snow');
  if (!reduce && fx) (fx.dataset.fx === 'embers' ? embers : blizzard)(fx);
}

// Hero snow: a blizzard whose wind swings right, left or dies down every few seconds.
function blizzard(cv: HTMLCanvasElement | null) {
  const ctx = cv?.getContext('2d');
  if (!cv || !ctx) return;
  type Flake = { x: number; y: number; z: number; r: number; v: number; s: number };
  let w = 0;
  let h = 0;
  let flakes: Flake[] = [];
  let run = false;
  let wind = 0;
  let target = 1.6;
  let nextShift = 0;
  const modes = [3.4, -3.1, 0.15, 2.2, -2.4, 0];
  const size = () => {
    const dpr = Math.min(2, devicePixelRatio || 1);
    w = cv.clientWidth;
    h = cv.clientHeight;
    cv.width = w * dpr;
    cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.max(60, Math.min(240, w / 6)));
    flakes = Array.from({ length: n }, () => {
      const z = Math.random() * 1.2 + 0.4;
      return { x: Math.random() * w, y: Math.random() * h, z, r: z * 1.25, v: 0.55 + Math.random() * 0.6, s: Math.random() * 6.28 };
    });
  };
  size();
  const tick = (t: number) => {
    if (!run) return;
    if (t > nextShift) {
      let m: number;
      do m = modes[Math.floor(Math.random() * modes.length)];
      while (Math.sign(m) === Math.sign(target) && Math.abs(m - target) < 1);
      target = m * (0.8 + Math.random() * 0.4);
      nextShift = t + 3200 + Math.random() * 3800;
    }
    wind += (target - wind) * 0.012;
    const gust = Math.sin(t / 620) * 0.35 * Math.min(1, Math.abs(wind) / 2);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#eef1f8';
    ctx.strokeStyle = '#eef1f8';
    ctx.lineCap = 'round';
    for (const f of flakes) {
      f.s += 0.015;
      const vx = (wind + gust) * f.z * 1.5 + Math.sin(f.s) * 0.35;
      const vy = f.v * f.z * (1 + Math.abs(wind) * 0.14);
      f.x += vx;
      f.y += vy;
      if (f.y > h + 6) {
        f.y = -6;
        f.x = Math.random() * w;
      }
      if (f.x > w + 12) f.x = -12;
      else if (f.x < -12) f.x = w + 12;
      const sp = Math.abs(vx);
      ctx.globalAlpha = (0.2 + f.z * 0.34) * (sp > 1.4 ? 0.7 : 1);
      if (sp > 1.4) {
        const k = Math.min(2.2, sp * 0.6);
        ctx.lineWidth = f.r * 0.95;
        ctx.beginPath();
        ctx.moveTo(f.x, f.y);
        ctx.lineTo(f.x - vx * k, f.y - vy * k);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, 6.283);
        ctx.fill();
      }
    }
    requestAnimationFrame(tick);
  };
  new IntersectionObserver(([e]) => {
    const was = run;
    run = e.isIntersecting;
    if (run && !was) requestAnimationFrame(tick);
  }).observe(cv);
  addEventListener('resize', size);
}

// Forge sparks: small hot embers that rise, sway and flicker out.
function embers(cv: HTMLCanvasElement) {
  const ctx = cv.getContext('2d');
  if (!ctx) return;
  type Spark = { x: number; y: number; r: number; v: number; s: number; life: number; age: number };
  let w = 0;
  let h = 0;
  let sparks: Spark[] = [];
  let run = false;
  const spawn = (anywhere: boolean): Spark => ({
    x: Math.random() * w,
    y: anywhere ? Math.random() * h : h + 6,
    r: Math.random() * 1.6 + 0.5,
    v: 0.35 + Math.random() * 0.9,
    s: Math.random() * 6.28,
    life: 260 + Math.random() * 420,
    age: anywhere ? Math.random() * 300 : 0,
  });
  const size = () => {
    const dpr = Math.min(2, devicePixelRatio || 1);
    w = cv.clientWidth;
    h = cv.clientHeight;
    cv.width = w * dpr;
    cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    sparks = Array.from({ length: Math.round(Math.max(40, Math.min(150, w / 10))) }, () => spawn(true));
  };
  size();
  const tick = (t: number) => {
    if (!run) return;
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < sparks.length; i++) {
      const p = sparks[i];
      p.age += 1;
      p.s += 0.03;
      p.y -= p.v;
      p.x += Math.sin(p.s + t / 900) * 0.45 + 0.12;
      const k = p.age / p.life;
      if (k >= 1 || p.y < -8) {
        sparks[i] = spawn(false);
        continue;
      }
      const flicker = 0.75 + Math.sin(t / 70 + p.s * 7) * 0.25;
      ctx.globalAlpha = Math.sin(Math.PI * k) * flicker * 0.9;
      ctx.fillStyle = p.r > 1.4 ? '#ffb36b' : '#ff8a3a';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 6.283);
      ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(tick);
  };
  new IntersectionObserver(([e]) => {
    const was = run;
    run = e.isIntersecting;
    if (run && !was) requestAnimationFrame(tick);
  }).observe(cv);
  addEventListener('resize', size);
}
