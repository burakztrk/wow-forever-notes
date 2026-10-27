// Scroll-driven effects of a race story page (src/pages/[lang]/stories/).
// Everything starts from a complete, readable page: these only animate it.
// - [data-p="start,end"] elements get --p (0..1) as their anchor (a point partway down
//   the element) crosses start → end (fractions of the viewport height) and run their handler.
// - Chapter III's map follows the step nearest the reading line and moves its
//   "camera" (viewBox); labels keep their screen size through --k. Its routes wait
//   (.idle) until the map is in view, so the first step's arrows are not drawn ahead of the reader.
// - Hero particles (canvas#snow, data-fx): "snow" is a blizzard whose wind turns left, right
//   and calm; "embers" are forge sparks drifting up; "void", "wisps", "voodoo", "plague" and "sun" are the same
//   motes in violet, pale green, jungle green, blight green and prairie gold; "cinders" are tiny red flames that fall, turn grey ash and shrink;
//   "gale" is pale blue wind lines streaming across the sky.
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

  // labels in the drawings keep the same on-screen size at any width (also when a
  // max-height letterboxes the drawing, so it is scaled by its height)
  // the race strip scrolls sideways: show the chip of this story
  const strip = $('.races');
  const sel = strip && $('.chip.sel', strip);
  if (strip && sel) {
    strip.scrollLeft += sel.getBoundingClientRect().left - strip.getBoundingClientRect().left - (strip.clientWidth - sel.offsetWidth) / 2;
  }

  const scaled = $$<SVGSVGElement>('svg.map').filter((s) => s.id !== 'ek');
  const sizeK = (svg: SVGSVGElement) => {
    const r = svg.getBoundingClientRect();
    const vb = svg.viewBox.baseVal;
    if (!r.width || !r.height) return;
    const k = 1 / Math.min(r.width / vb.width, r.height / vb.height);
    svg.style.setProperty('--k', clamp(k, 0.1, 2.2).toFixed(3));
  };
  scaled.forEach(sizeK);

  // Chapter III: steps drive the map layers and its camera
  const story = $('#story');
  const ek = $<SVGSVGElement>('#ek');
  const steps = story ? $$('.step', story) : [];
  const layers = ek ? $$<SVGGElement>('.ly', ek) : [];
  const dots = story ? $$('.dots i', story) : [];
  const stageMap = story ? $('.stage-map', story) : null;
  let idle = !reduce && !!stageMap;
  if (idle) story?.classList.add('idle');
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
  const tracks = $$('[data-p]')
    .filter((el) => !('routes' in el.dataset))
    .map((el) => {
      const [s, e] = (el.dataset.p ?? '0.9,0.2').split(',').map(Number);
      const fn = handlers[el.id] ?? ('moves' in el.dataset ? moveUpdate : undefined);
      return { el, s, e, fn, last: -1 };
    });

  // [data-routes]: automatic path animation with play/pause button in top-right corner.
  // When entering the screen, animation plays automatically for 3 cycles, then rests at 100%.
  // Clicking the button toggles between play/pause/replay.
  // Re-entering the screen after scrolling away restarts the 3 cycles.
  // Excludes narrative stage-maps like Skyborne Chapter IV (Kriz).
  const routeMaps = $$<HTMLElement>('[data-routes]', root).filter(
    (el) => !el.closest('.story') && !el.classList.contains('stage-map') && !el.querySelector('#ek'),
  );
  if (routeMaps.length > 0) {
    const isTr = (document.documentElement.lang || 'tr').startsWith('tr');
    const LABELS = {
      play: isTr ? 'Animasyonu oynat' : 'Play animation',
      pause: isTr ? 'Animasyonu duraklat' : 'Pause animation',
      replay: isTr ? 'Tekrar oynat' : 'Replay animation',
    };

    const ICONS = {
      pause:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1.5"/><rect x="14" y="4" width="4" height="16" rx="1.5"/></svg>',
      play:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86a1 1 0 0 0-1.5.86z"/></svg>',
      replay:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>',
    };

    const DURATION = 2400; // ms per draw cycle
    const HOLD_DURATION = 900; // ms to pause at 100% between cycles
    const MAX_CYCLES = 3; // 3 cycles then stop

    type MapAnim = {
      el: HTMLElement;
      btn: HTMLButtonElement;
      playing: boolean;
      cycle: number;
      progress: number;
      phase: 'draw' | 'hold';
      lastTime: number;
      holdElapsed: number;
      inView: boolean;
      manuallyPaused: boolean;
    };

    const anims: MapAnim[] = [];

    const setButtonState = (anim: MapAnim, state: 'play' | 'pause' | 'replay') => {
      anim.btn.innerHTML = ICONS[state];
      anim.btn.setAttribute('aria-label', LABELS[state]);
      anim.btn.title = LABELS[state];
    };

    let rafId = 0;
    let running = false;

    const tick = (now: number) => {
      let anyActive = false;

      for (const anim of anims) {
        if (!anim.playing || !anim.inView) continue;
        anyActive = true;

        const dt = anim.lastTime > 0 ? Math.min(now - anim.lastTime, 100) : 16;
        anim.lastTime = now;

        if (anim.phase === 'draw') {
          anim.progress = clamp(anim.progress + dt / DURATION);
          routeUpdate(anim.progress, anim.el);
          anim.el.style.setProperty('--p', anim.progress.toFixed(4));

          if (anim.progress >= 1) {
            anim.phase = 'hold';
            anim.holdElapsed = 0;
          }
        } else if (anim.phase === 'hold') {
          anim.holdElapsed += dt;
          if (anim.holdElapsed >= HOLD_DURATION) {
            anim.cycle += 1;
            if (anim.cycle >= MAX_CYCLES) {
              // 3 cycles finished: stop and keep at 100%
              anim.playing = false;
              anim.progress = 1;
              routeUpdate(1, anim.el);
              anim.el.style.setProperty('--p', '1');
              setButtonState(anim, 'replay');
            } else {
              // Start next cycle
              anim.phase = 'draw';
              anim.progress = 0;
              anim.holdElapsed = 0;
              routeUpdate(0, anim.el);
              anim.el.style.setProperty('--p', '0');
            }
          }
        }
      }

      if (anyActive) {
        rafId = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const requestTick = () => {
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    routeMaps.forEach((el) => {
      // Initial state: reset to p=0
      routeUpdate(0, el);
      el.style.setProperty('--p', '0');

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'map-ctl';
      el.appendChild(btn);

      const anim: MapAnim = {
        el,
        btn,
        playing: false,
        cycle: 0,
        progress: 0,
        phase: 'draw',
        lastTime: 0,
        holdElapsed: 0,
        inView: false,
        manuallyPaused: false,
      };

      setButtonState(anim, 'pause');

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (anim.playing) {
          // Pause at current position
          anim.playing = false;
          anim.manuallyPaused = true;
          setButtonState(anim, 'play');
        } else {
          // Play / Resume / Replay
          anim.manuallyPaused = false;
          anim.playing = true;
          setButtonState(anim, 'pause');
          if (anim.cycle >= MAX_CYCLES) {
            // Replay from start
            anim.cycle = 0;
            anim.progress = 0;
            anim.phase = 'draw';
            anim.holdElapsed = 0;
            routeUpdate(0, el);
            el.style.setProperty('--p', '0');
          }
          anim.lastTime = performance.now();
          requestTick();
        }
      });

      if (reduce) {
        anim.progress = 1;
        anim.playing = false;
        routeUpdate(1, el);
        el.style.setProperty('--p', '1');
        setButtonState(anim, 'replay');
      }

      anims.push(anim);
    });

    if (!reduce && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const anim = anims.find((a) => a.el === entry.target);
            if (!anim) return;

            if (entry.isIntersecting && entry.intersectionRatio >= 0.12) {
              // Entered into viewport (at least 12% visible)
              if (!anim.inView) {
                anim.inView = true;
                if (!anim.manuallyPaused) {
                  anim.cycle = 0;
                  anim.progress = 0;
                  anim.phase = 'draw';
                  anim.holdElapsed = 0;
                  anim.playing = true;
                  anim.lastTime = performance.now();
                  routeUpdate(0, anim.el);
                  anim.el.style.setProperty('--p', '0');
                  setButtonState(anim, 'pause');
                  requestTick();
                }
              }
            } else if (!entry.isIntersecting || entry.intersectionRatio === 0) {
              // Exited viewport completely
              if (anim.inView) {
                anim.inView = false;
                anim.playing = false;
                anim.cycle = 0;
                anim.progress = 0;
                anim.phase = 'draw';
                anim.holdElapsed = 0;
                anim.manuallyPaused = false;
                routeUpdate(0, anim.el);
                anim.el.style.setProperty('--p', '0');
                setButtonState(anim, 'pause');
              }
            }
          });
        },
        { threshold: [0, 0.12] },
      );

      anims.forEach((a) => io.observe(a.el));
    }
  }

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
      // so a figure finishes animating when it is in front of the reader, not on its way in;
      // when a figure is sticky in a two-column .split.top, follow the row's top while it stays pinned
      const top =
        !narrow.matches && t.el.parentElement?.classList.contains('top')
          ? t.el.parentElement.getBoundingClientRect().top
          : r.top;
      const anchor = top + Math.min(r.height, vh * 0.7) * 0.5;
      const p = reduce ? 1 : clamp((t.s * vh - anchor) / ((t.s - t.e) * vh));
      if (Math.abs(p - t.last) < 0.0005) continue;
      t.last = p;
      t.el.style.setProperty('--p', p.toFixed(4));
      t.fn?.(p, t.el);
    }
    if (story) {
      const sr = story.getBoundingClientRect();
      if (sr.bottom > 0 && sr.top < vh) {
        if (idle && stageMap && stageMap.getBoundingClientRect().top < vh * 0.3) {
          idle = false;
          story.classList.remove('idle');
        }
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
            el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))).toLocaleString(document.documentElement.lang || undefined);
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
  if (!reduce && fx) {
    if (fx.dataset.fx === 'embers') embers(fx);
    else if (fx.dataset.fx === 'void') embers(fx, ['#d2b8ff', '#9b6fe0']);
    else if (fx.dataset.fx === 'wisps') embers(fx, ['#effff8', '#8fe3c8']);
    else if (fx.dataset.fx === 'cinders') cinders(fx);
    else if (fx.dataset.fx === 'voodoo') embers(fx, ['#e6ffd0', '#6fcf5a']);
    else if (fx.dataset.fx === 'plague') embers(fx, ['#d8ffbe', '#8bd46a']);
    else if (fx.dataset.fx === 'sun') embers(fx, ['#fff3c4', '#e8a848']);
    else if (fx.dataset.fx === 'gale') gale(fx);
    else blizzard(fx);
  }
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

// Forge sparks: small hot embers that rise, sway and flicker out (colours: large, small).
function embers(cv: HTMLCanvasElement, [hot, warm] = ['#ffb36b', '#ff8a3a']) {
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
      ctx.fillStyle = p.r > 1.4 ? hot : warm;
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

// Cinders: tiny flame-shaped sparks that start red, cool to grey ash as they drift down and shrink away.
function cinders(cv: HTMLCanvasElement) {
  const ctx = cv.getContext('2d');
  if (!ctx) return;
  type Cinder = { x: number; y: number; r: number; v: number; s: number; life: number; age: number };
  let w = 0;
  let h = 0;
  let list: Cinder[] = [];
  let run = false;
  const spawn = (anywhere: boolean): Cinder => ({
    x: Math.random() * w,
    y: anywhere ? Math.random() * h : -8,
    r: Math.random() * 2.2 + 2.2,
    v: 0.4 + Math.random() * 0.8,
    s: Math.random() * 6.28,
    life: 520 + Math.random() * 400,
    age: anywhere ? Math.random() * 500 : 0,
  });
  const size = () => {
    const dpr = Math.min(2, devicePixelRatio || 1);
    w = cv.clientWidth;
    h = cv.clientHeight;
    cv.width = w * dpr;
    cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    list = Array.from({ length: Math.round(Math.max(36, Math.min(110, w / 12))) }, () => spawn(true));
  };
  size();
  const mix = (a: number[], b: number[], k: number) => a.map((v, i) => Math.round(v + (b[i] - v) * k));
  const RED = [255, 70, 40];
  const EMBER = [255, 120, 50];
  const ASH = [170, 170, 178];
  const tick = (t: number) => {
    if (!run) return;
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < list.length; i++) {
      const p = list[i];
      p.age += 1;
      p.s += 0.03;
      p.y += p.v;
      p.x += Math.sin(p.s + t / 1100) * 0.4 + 0.25;
      const k = p.age / p.life;
      if (k >= 1 || p.y > h + 10) {
        list[i] = spawn(false);
        continue;
      }
      // red flame first, then cooling to grey; the size grows a little, then shrinks
      const heat = Math.max(0, 1 - k / 0.4);
      const c = k < 0.4 ? mix(EMBER, RED, heat) : mix(RED, ASH, Math.min(1, (k - 0.4) / 0.2));
      const r = p.r * (k < 0.15 ? 0.7 + k * 2 : 1 - ((k - 0.15) / 0.85) * 0.85);
      const flicker = 0.8 + Math.sin(t / 80 + p.s * 7) * 0.2;
      ctx.globalAlpha = Math.min(1, k * 8) * (1 - Math.max(0, k - 0.7) / 0.3) * (heat > 0 ? flicker : 0.9);
      ctx.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`;
      const lean = Math.sin(p.s + t / 1100) * 0.4;
      ctx.beginPath();
      if (heat > 0) {
        // a small flame: round belly, pointed tip leaning with the draught
        ctx.moveTo(p.x + lean * r * 2, p.y - r * 2.6);
        ctx.quadraticCurveTo(p.x + r * 1.5, p.y - r * 0.4, p.x, p.y + r);
        ctx.quadraticCurveTo(p.x - r * 1.5, p.y - r * 0.4, p.x + lean * r * 2, p.y - r * 2.6);
      } else {
        ctx.arc(p.x, p.y, r * 0.6, 0, 6.283);
      }
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  };
  new IntersectionObserver(([e]) => {
    const was = run;
    run = e.isIntersecting;
    if (run && !was) requestAnimationFrame(tick);
  }).observe(cv);
  addEventListener('resize', size);
}

// Gale: pale blue wind lines that stream across the sky, swaying and fading in and out along their length.
function gale(cv: HTMLCanvasElement) {
  const ctx = cv.getContext('2d');
  if (!ctx) return;
  type Gust = { x: number; y: number; len: number; v: number; s: number; w: number; a: number; hue: number };
  let w = 0;
  let h = 0;
  let gusts: Gust[] = [];
  let run = false;
  const spawn = (anywhere: boolean): Gust => {
    const len = 90 + Math.random() * 190;
    return {
      x: anywhere ? Math.random() * (w + len) - len : -len - Math.random() * 120,
      y: Math.random() * h,
      len,
      v: 1.2 + Math.random() * 2.4,
      s: Math.random() * 6.28,
      w: 0.7 + Math.random() * 1.2,
      a: 0.22 + Math.random() * 0.4,
      hue: Math.random() < 0.65 ? 0 : 1,
    };
  };
  const size = () => {
    const dpr = Math.min(2, devicePixelRatio || 1);
    w = cv.clientWidth;
    h = cv.clientHeight;
    cv.width = w * dpr;
    cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    gusts = Array.from({ length: Math.round(Math.max(26, Math.min(80, w / 16))) }, () => spawn(true));
  };
  size();
  const SEG = 14;
  const tick = (t: number) => {
    if (!run) return;
    ctx.clearRect(0, 0, w, h);
    ctx.lineCap = 'round';
    for (let i = 0; i < gusts.length; i++) {
      const g = gusts[i];
      g.x += g.v;
      g.s += 0.012;
      if (g.x > w + 10) {
        gusts[i] = spawn(false);
        continue;
      }
      ctx.strokeStyle = g.hue ? '#8fd0f0' : '#e6f6ff';
      ctx.lineWidth = g.w;
      let px = g.x;
      let py = g.y + Math.sin(g.s + t / 1300) * 5;
      for (let k = 1; k <= SEG; k++) {
        const f = k / SEG;
        const x = g.x + g.len * f;
        const y = g.y + Math.sin(g.s + t / 1300 + f * 3.2) * 5 * (0.4 + f);
        ctx.globalAlpha = g.a * Math.sin(Math.PI * (f - 0.5 / SEG));
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.stroke();
        px = x;
        py = y;
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  };
  new IntersectionObserver(([e]) => {
    const was = run;
    run = e.isIntersecting;
    if (run && !was) requestAnimationFrame(tick);
  }).observe(cv);
  addEventListener('resize', size);
}
