// Story carousels (stories index, home page). Without JavaScript each carousel is a scroll-snap strip you
// can swipe or scroll; this adds
// - an endless loop: a copy of the last card sits before the first and a copy of the first after the last
//   (aria-hidden, not focusable); when a scroll settles on a copy the strip jumps, unseen, to the real card;
// - the active card (the neighbours peek in from the sides, smaller and dimmer), prev/next buttons, and a
//   click on a peeking card brings it to the middle instead of opening it;
// - Instagram-style progress bars: the active one fills over DURATION ms (CSS animation) and its end moves
//   to the next card. Auto-advance pauses while the pointer is over the carousel, it has focus, a finger is
//   on it, it is off screen or the tab is hidden.
// prefers-reduced-motion: no smooth scrolling and no auto-advance (the bars become plain dots).

const DURATION = 3000;

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll<HTMLElement>('[data-carousel]').forEach(initCarousel);

function initCarousel(root: HTMLElement) {
  const track = root.querySelector<HTMLElement>('.story-track')!;
  const real = [...track.children] as HTMLElement[];
  const n = real.length;
  const prev = root.querySelector<HTMLButtonElement>('[data-dir="-1"]')!;
  const next = root.querySelector<HTMLButtonElement>('[data-dir="1"]')!;
  const dotsBox = root.querySelector<HTMLElement>('.story-dots')!;
  if (n < 2) return;

  // positions 0 .. n+1: [copy of last, ...real, copy of first]
  const copy = (el: HTMLElement) => {
    const c = el.cloneNode(true) as HTMLElement;
    c.setAttribute('aria-hidden', 'true');
    c.querySelectorAll('a').forEach((a) => a.setAttribute('tabindex', '-1'));
    return c;
  };
  const head = copy(real[n - 1]);
  const tail = copy(real[0]);
  track.prepend(head);
  track.append(tail);
  const slides = [head, ...real, tail];

  const dots = real.map((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', `${i + 1} / ${n}`);
    b.addEventListener('click', () => go(i + 1));
    dotsBox.append(b);
    return b;
  });
  prev.hidden = next.hidden = dotsBox.hidden = false;
  root.classList.add('js-on');
  root.style.setProperty('--n', String(n));
  root.style.setProperty('--story-dur', `${DURATION}ms`);
  if (reduce) root.classList.add('static');

  let pos = -1; // position of the card in the middle
  let active = -1; // real card (dot) it stands for
  const center = (el: HTMLElement) => el.offsetLeft + el.offsetWidth / 2;
  const leftFor = (p: number) => center(slides[p]) - track.clientWidth / 2;
  const realPos = (p: number) => (p === 0 ? n : p === n + 1 ? 1 : p);

  function nearest() {
    const mid = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    slides.forEach((el, i) => {
      if (Math.abs(center(el) - mid) < Math.abs(center(slides[best]) - mid)) best = i;
    });
    return best;
  }

  function sync() {
    const p = nearest();
    if (p === pos) return;
    pos = p;
    slides.forEach((el, j) => el.classList.toggle('is-active', j === p));
    const a = realPos(p) - 1;
    if (a === active) return; // a copy and its original: same dot, the bar keeps running
    active = a;
    dots.forEach((d, j) => {
      d.classList.toggle('on', j === a);
      d.classList.toggle('done', j < a);
      d.setAttribute('aria-current', String(j === a));
    });
  }

  function jump(p: number) {
    track.scrollTo({ left: leftFor(p), behavior: 'auto' });
  }

  function go(p: number) {
    track.scrollTo({ left: leftFor(Math.max(0, Math.min(n + 1, p))), behavior: reduce ? 'auto' : 'smooth' });
  }

  // a scroll that has stopped on a copy continues on the original (same picture, so nothing moves)
  let settleTimer = 0;
  let touching = false;
  function settle() {
    clearTimeout(settleTimer);
    settleTimer = window.setTimeout(() => {
      if (touching) return;
      const p = nearest();
      if (p === 0 || p === n + 1) jump(realPos(p));
    }, 120);
  }

  track.addEventListener(
    'scroll',
    () => {
      requestAnimationFrame(sync);
      settle();
    },
    { passive: true },
  );
  prev.addEventListener('click', () => go(pos - 1));
  next.addEventListener('click', () => go(pos + 1));
  slides.forEach((el, i) =>
    el.addEventListener('click', (e) => {
      if (i === pos) return;
      e.preventDefault();
      go(i);
    }),
  );
  // auto-advance: the active bar's animation ends -> next card (after the last one, its copy of the first)
  dotsBox.addEventListener('animationend', (e) => {
    if (e.animationName === 'story-fill') go(pos + 1);
  });
  const holds = new Set<string>();
  const hold = (why: string, on: boolean) => {
    on ? holds.add(why) : holds.delete(why);
    root.classList.toggle('paused', holds.size > 0);
  };
  root.addEventListener('pointerenter', (e) => e.pointerType === 'mouse' && hold('hover', true));
  root.addEventListener('pointerleave', () => hold('hover', false));
  root.addEventListener('focusin', () => hold('focus', true));
  root.addEventListener('focusout', () => hold('focus', false));
  let touchTimer = 0;
  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return;
    touching = true;
    clearTimeout(touchTimer);
    hold('touch', true);
  });
  const release = () => {
    touching = false;
    settle();
    clearTimeout(touchTimer);
    touchTimer = window.setTimeout(() => hold('touch', false), 1500);
  };
  track.addEventListener('pointerup', release);
  track.addEventListener('pointercancel', release);
  new IntersectionObserver(([e]) => hold('offscreen', !e.isIntersecting), { threshold: 0.4 }).observe(root);
  document.addEventListener('visibilitychange', () => hold('hidden', document.hidden));
  addEventListener('resize', () => jump(Math.max(realPos(pos), 1)));

  jump(1); // start on the first real card, the copy of the last one peeks in on its left
  sync();
}
