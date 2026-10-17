import { browserStore, loadBuilds, removeBuild, saveBuild, type SavedBuild } from '../lib/saved-builds';

// Saved builds UI: the list on the talents page and the save dialog on a
// class's calculator. Config comes from #wf-saved-builds.

interface Config {
  cls?: string; // set on a class page: save dialog + only this class's builds
  talentsBase: string; // "/wow-forever-notes/tr/talents/"
  iconBase: string;
  classIcons: Record<string, string>;
  classNames: Record<string, string>;
  strings: { delete: string; buildSaved: string };
}

const configEl = document.getElementById('wf-saved-builds');
if (configEl?.textContent) init(JSON.parse(configEl.textContent) as Config);

function init(config: Config) {
  const store = browserStore();
  const section = document.querySelector<HTMLElement>('[data-saved-section]');
  const list = document.querySelector<HTMLElement>('[data-saved-list]');
  const esc = (v: unknown) =>
    String(v ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

  const href = (b: SavedBuild) => `${config.talentsBase}${b.cls}/${b.code ? `#b=${b.code}` : ''}`;

  function render(builds: SavedBuild[] = loadBuilds(store)) {
    if (!section || !list) return;
    const shown = config.cls ? builds.filter((b) => b.cls === config.cls) : builds;
    section.hidden = shown.length === 0;
    list.innerHTML = shown
      .map((b) => {
        const icon = config.classIcons[b.cls];
        return `<li class="saved-build" style="--class-color: var(--class-${esc(b.cls)})">
          <a href="${esc(href(b))}">
            ${icon ? `<img src="${esc(config.iconBase + icon)}.jpg" alt="" width="28" height="28" loading="lazy" />` : ''}
            <span class="saved-name">${esc(b.name)}</span>
            <span class="saved-meta">${esc(config.classNames[b.cls] ?? b.cls)} · ${esc(b.code || '—')}</span>
          </a>
          <button type="button" class="saved-delete" data-delete="${esc(b.id)}" aria-label="${esc(config.strings.delete)}: ${esc(b.name)}" title="${esc(config.strings.delete)}">🗑</button>
        </li>`;
      })
      .join('');
  }

  list?.addEventListener('click', (e) => {
    const btn = (e.target as Element).closest<HTMLElement>('[data-delete]');
    if (btn) render(removeBuild(store, btn.dataset.delete!));
  });
  // a save in another tab
  window.addEventListener('storage', () => render());

  // save dialog (class page only)
  const dialog = document.querySelector<HTMLDialogElement>('[data-save-dialog]');
  const nameInput = dialog?.querySelector<HTMLInputElement>('input[name="name"]');
  const note = document.querySelector<HTMLElement>('[data-saved-note]');
  document.querySelector('[data-save-open]')?.addEventListener('click', () => {
    if (!dialog || !nameInput) return;
    nameInput.value = '';
    dialog.showModal();
    nameInput.focus();
  });
  dialog?.querySelector('[data-save-cancel]')?.addEventListener('click', () => dialog.close());
  dialog?.querySelector('form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!config.cls || !nameInput) return;
    const code = location.hash.match(/b=([0-9-]*)/)?.[1] ?? '';
    render(saveBuild(store, config.cls, nameInput.value, code));
    dialog.close();
    if (note) {
      note.textContent = config.strings.buildSaved;
      note.hidden = false;
      setTimeout(() => (note.hidden = true), 2500);
    }
  });

  render();
}
