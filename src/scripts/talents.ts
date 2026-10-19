import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import {
  addBlock,
  canRemove,
  decodeBuild,
  encodeBuild,
  MAX_POINTS,
  requiredLevel,
  totalPoints,
  treePoints,
  type Block,
  type Ranks,
} from '../lib/talent-rules';
import type { TalentPagePayload, TalentView } from '../lib/talents';

// Talent calculator (class trees and the Legacy tree): click adds a point,
// right click / Shift+click / the red − takes one away. The build lives in the
// URL hash (#b=…) so the address bar is always a shareable link.

const island = document.getElementById('wf-talents');
if (island?.textContent) init(JSON.parse(island.textContent) as TalentPagePayload);

function init(data: TalentPagePayload) {
  const { nodes, trees, strings: s } = data;
  const max = data.maxPoints ?? MAX_POINTS;
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const $ = <T extends Element>(sel: string) => document.querySelector<T>(sel);
  const $$ = <T extends Element>(sel: string) => [...document.querySelectorAll<T>(sel)];

  const fromHash = () => {
    const m = location.hash.match(/b=([0-9-]*)/);
    return (m && decodeBuild(nodes, m[1], trees.length, max)) || {};
  };
  let ranks: Ranks = fromHash();

  // ---------- tooltip ----------
  const tip = document.createElement('div');
  tip.id = 'wf-talent-tip';
  tip.setAttribute('role', 'tooltip');
  tip.hidden = true;
  document.body.append(tip);
  let tipFor: HTMLElement | null = null;
  let stopTip: (() => void) | null = null;

  const esc = (v: unknown) =>
    String(v ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
  const fill = (tpl: string, vars: Record<string, string | number>) =>
    tpl.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));

  function blockText(n: TalentView, block: Block | undefined): string {
    if (!block || (ranks[n.id] ?? 0) > 0) return '';
    if (block.kind === 'tier') return fill(s.tierNeed, { tree: trees[n.tree], n: block.need });
    if (block.kind === 'requires') {
      const req = byId.get(block.id);
      return req ? fill(s.requiresTalent, { name: req.name, max: req.maxRank }) : '';
    }
    return '';
  }

  function tipHtml(n: TalentView): string {
    const r = ranks[n.id] ?? 0;
    const current = n.ranks[Math.max(r, 1) - 1];
    const next = r > 0 && r < n.maxRank ? n.ranks[r] : '';
    const req = blockText(n, addBlock(nodes, ranks, n, max));
    const status = n.status
      ? { new: s.statusNew, changed: s.statusChanged, unchanged: s.statusUnchanged, removed: s.statusRemoved }[n.status]
      : '';
    const icon = n.icon ? `<img class="wft-icon" src="${esc(data.iconBase + n.icon)}.jpg" alt="" width="44" height="44">` : '';
    return `
      <div class="wft-head">${icon}
        <div class="wft-title"><div class="wft-name wft-name--talent">${esc(n.name)}</div>
        <div class="wft-sub">${esc(trees[n.tree])}, ${esc(s.row)} ${n.row}${n.meta ? ` · ${esc(n.meta)}` : ''}</div></div>
        <span class="wft-pill">${r}/${n.maxRank}</span>
      </div>
      <p class="wft-desc">${esc(current)}</p>
      ${next ? `<p class="wft-next"><b>${esc(s.nextRank)}:</b> ${esc(next)}</p>` : ''}
      ${req ? `<p class="wft-req">${esc(req)}</p>` : ''}
      ${status ? `<div class="wft-foot"><span class="wft-status wft-status--${esc(n.status)}"><i></i>${esc(status)}</span></div>` : ''}
      ${n.status === 'changed' && n.change ? `<p class="wft-change">${esc(n.change)}</p>` : ''}`;
  }

  function showTip(el: HTMLElement) {
    const n = byId.get(el.dataset.talent ?? '');
    if (!n) return;
    tip.innerHTML = tipHtml(n);
    tip.hidden = false;
    if (tipFor !== el) {
      tipFor = el;
      stopTip?.();
      stopTip = autoUpdate(el, tip, () =>
        computePosition(el, tip, {
          placement: 'right',
          strategy: 'fixed',
          middleware: [offset(10), flip({ fallbackPlacements: ['left', 'top', 'bottom'] }), shift({ padding: 8 })],
        }).then(({ x, y }) => Object.assign(tip.style, { left: `${x}px`, top: `${y}px` })),
      );
    }
  }
  function hideTip() {
    tip.hidden = true;
    tipFor = null;
    stopTip?.();
    stopTip = null;
  }

  // ---------- state → DOM ----------
  function render() {
    for (const n of nodes) {
      const el = $<HTMLElement>(`[data-talent="${n.id}"]`);
      if (!el) continue;
      const r = ranks[n.id] ?? 0;
      const state = r === n.maxRank ? 'max' : r > 0 ? 'partial' : addBlock(nodes, ranks, n, max) ? 'locked' : 'available';
      el.className = `talent ${state}`;
      el.setAttribute('aria-label', `${n.name} ${r}/${n.maxRank}`);
      const minus = $<HTMLButtonElement>(`[data-minus="${n.id}"]`);
      if (minus) {
        minus.hidden = r === 0;
        minus.disabled = r > 0 && !canRemove(nodes, ranks, n, max);
      }
      const badge = $(`[data-rank-of="${n.id}"]`);
      if (badge) badge.textContent = `${r}/${n.maxRank}`;
      const arrow = $(`[data-arrow-to="${n.id}"]`);
      if (arrow && n.requires) {
        const req = byId.get(n.requires);
        arrow.classList.toggle('active', !!req && (ranks[req.id] ?? 0) >= req.maxRank);
      }
    }
    const split = trees.map((_, i) => treePoints(nodes, ranks, i));
    split.forEach((p, i) => {
      const el = $(`[data-tree-points="${i}"]`);
      if (el) el.textContent = String(p);
    });
    const total = totalPoints(ranks);
    $('[data-points-left]')!.textContent = String(max - total);
    const level = $('[data-req-level]');
    if (level) level.textContent = total ? String(requiredLevel(total)) : '–';
    $('[data-split]')!.textContent = split.join(' / ');

    const code = encodeBuild(nodes, ranks, trees.length);
    // keep a plain anchor (#tree) until the first point is spent
    const hash = code ? `#b=${code}` : /b=/.test(location.hash) ? '' : location.hash;
    history.replaceState(null, '', location.pathname + location.search + hash);
    for (const a of $$<HTMLAnchorElement>('.lang-switch a')) a.href = a.href.split('#')[0] + hash;
    if (tipFor && !tip.hidden) showTip(tipFor);
  }

  function add(n: TalentView) {
    if (addBlock(nodes, ranks, n, max)) return;
    ranks = { ...ranks, [n.id]: (ranks[n.id] ?? 0) + 1 };
    render();
  }
  function remove(n: TalentView) {
    if (!canRemove(nodes, ranks, n, max)) return;
    const next = { ...ranks };
    const r = (next[n.id] ?? 0) - 1;
    if (r > 0) next[n.id] = r;
    else delete next[n.id];
    ranks = next;
    render();
  }

  // ---------- events ----------
  const talentFrom = (t: EventTarget | null) => (t instanceof Element ? t.closest<HTMLElement>('[data-talent]') : null);
  const trees$ = $('.trees')!;

  trees$.addEventListener('click', (e) => {
    const minus = e.target instanceof Element ? e.target.closest<HTMLElement>('[data-minus]') : null;
    if (minus) {
      const n = byId.get(minus.dataset.minus!);
      if (n) remove(n);
      const el = $<HTMLElement>(`[data-talent="${minus.dataset.minus}"]`);
      if (el && n && (ranks[n.id] ?? 0) > 0) showTip(el);
      else hideTip();
      return;
    }
    const el = talentFrom(e.target);
    const n = el && byId.get(el.dataset.talent!);
    if (!el || !n) return;
    if (e.shiftKey) remove(n);
    else add(n);
    showTip(el);
  });
  trees$.addEventListener('contextmenu', (e) => {
    const el = talentFrom(e.target);
    const n = el && byId.get(el.dataset.talent!);
    if (!el || !n) return;
    e.preventDefault();
    remove(n);
    showTip(el);
  });
  trees$.addEventListener('keydown', (e) => {
    const el = talentFrom(e.target);
    const n = el && byId.get(el.dataset.talent!);
    if (n && ['Backspace', 'Delete', '-'].includes(e.key)) {
      e.preventDefault();
      remove(n);
    }
  });
  trees$.addEventListener('pointerover', (e) => {
    const el = talentFrom(e.target);
    if (el && e.pointerType === 'mouse') showTip(el);
  });
  trees$.addEventListener('pointerout', (e) => {
    if (e.pointerType === 'mouse' && talentFrom(e.target) && !talentFrom(e.relatedTarget)) hideTip();
  });
  trees$.addEventListener('focusin', (e) => {
    const el = talentFrom(e.target);
    if (el) showTip(el);
  });
  document.addEventListener('click', (e) => {
    const onMinus = e.target instanceof Element && !!e.target.closest('[data-minus]');
    if (!talentFrom(e.target) && !onMinus) hideTip();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideTip();
  });

  $('[data-reset-all]')?.addEventListener('click', () => {
    ranks = {};
    render();
  });
  for (const btn of $$<HTMLElement>('[data-reset-tree]')) {
    btn.addEventListener('click', () => {
      const tree = Number(btn.dataset.resetTree);
      ranks = Object.fromEntries(Object.entries(ranks).filter(([id]) => byId.get(id)?.tree !== tree));
      render();
    });
  }
  $('[data-share]')?.addEventListener('click', async (e) => {
    const btn = e.currentTarget as HTMLElement;
    try {
      await navigator.clipboard.writeText(location.href);
      btn.textContent = s.copied;
    } catch {
      prompt(s.share, location.href);
    }
    setTimeout(() => (btn.textContent = s.share), 1500);
  });
  window.addEventListener('hashchange', () => {
    ranks = fromHash();
    render();
  });

  render();
}
