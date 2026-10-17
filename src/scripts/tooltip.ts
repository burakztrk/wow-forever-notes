import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { renderTooltip, renderTreeTooltip, type TipPayload } from '../lib/tooltip-render';

// One shared tooltip element driven by event delegation, so it keeps working
// whatever content is on the page. Mouse: hover. Touch: tap to toggle.
// Keyboard: focus shows, Escape hides.

const TIP_SELECTOR = '.wf-tip';
let payload: TipPayload | null = null;
let current: HTMLElement | null = null;
let stopAutoUpdate: (() => void) | null = null;
let hideTimer: number | undefined;
let lastPointerType = 'mouse';

const tooltip = document.createElement('div');
tooltip.id = 'wf-tooltip';
tooltip.setAttribute('role', 'tooltip');
tooltip.hidden = true;
document.body.append(tooltip);

function getPayload(): TipPayload | null {
  // a page may add the island later (search), so only a found payload is cached
  if (!payload) {
    const island = document.getElementById('wf-glossary');
    payload = island?.textContent ? (JSON.parse(island.textContent) as TipPayload) : null;
  }
  return payload;
}

function position(target: HTMLElement) {
  computePosition(target, tooltip, {
    placement: 'top',
    strategy: 'fixed',
    middleware: [offset(8), flip({ fallbackPlacements: ['bottom'] }), shift({ padding: 8 })],
  }).then(({ x, y }) => {
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
  });
}

function show(target: HTMLElement) {
  window.clearTimeout(hideTimer);
  if (current === target) return;
  const data = getPayload();
  const id = target.dataset.tip ?? '';
  const entry = data?.entries[id];
  const tree = data?.trees?.[id];
  if (!data || !(entry || tree)) return;
  current?.removeAttribute('aria-describedby');
  current = target;
  tooltip.innerHTML = tree ? renderTreeTooltip(tree, data) : renderTooltip(entry!, data);
  tooltip.hidden = false;
  target.setAttribute('aria-describedby', tooltip.id);
  stopAutoUpdate?.();
  stopAutoUpdate = autoUpdate(target, tooltip, () => position(target));
}

function hide(immediately = false) {
  const run = () => {
    tooltip.hidden = true;
    current?.removeAttribute('aria-describedby');
    current = null;
    stopAutoUpdate?.();
    stopAutoUpdate = null;
  };
  window.clearTimeout(hideTimer);
  if (immediately) run();
  else hideTimer = window.setTimeout(run, 150);
}

const tipFrom = (t: EventTarget | null) => (t instanceof Element ? t.closest<HTMLElement>(TIP_SELECTOR) : null);
const inTooltip = (t: EventTarget | null) => t instanceof Element && !!t.closest('#wf-tooltip');

document.addEventListener('pointerdown', (e) => {
  lastPointerType = e.pointerType;
});

document.addEventListener('pointerover', (e) => {
  if (e.pointerType !== 'mouse') return;
  const tip = tipFrom(e.target);
  if (tip) show(tip);
  else if (inTooltip(e.target)) window.clearTimeout(hideTimer);
});

document.addEventListener('pointerout', (e) => {
  if (e.pointerType !== 'mouse') return;
  const leaving = tipFrom(e.target) || inTooltip(e.target);
  const entering = tipFrom(e.relatedTarget) || inTooltip(e.relatedTarget);
  if (leaving && !entering) hide();
});

document.addEventListener('focusin', (e) => {
  const tip = tipFrom(e.target);
  if (tip) show(tip);
});

document.addEventListener('focusout', (e) => {
  if (tipFrom(e.target) && !inTooltip(e.relatedTarget)) hide();
});

document.addEventListener('click', (e) => {
  const tip = tipFrom(e.target);
  if (tip) {
    // touch: tap toggles; mouse: hover already shows it
    if (lastPointerType !== 'mouse' && current === tip) hide(true);
    else show(tip);
    return;
  }
  if (!inTooltip(e.target)) hide(true);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') hide(true);
});
