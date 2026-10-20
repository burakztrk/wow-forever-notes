import { browserStore, loadBuilds, removeBuild, saveBuild, updateBuild, type SavedBuild } from '../lib/saved-builds';
import { loadCharacters, updateCharacterBuild, type SavedCharacter } from '../lib/saved-characters';

// Saved builds UI: the list on the talents page and the save dialog on a
// class's calculator. Config comes from #wf-saved-builds. A calculator opened
// from a saved character (?character=<id>) saves into that character instead.

interface Config {
  cls?: string; // set on a class page: save dialog + only this class's builds
  talentsBase: string; // "/wow-forever-notes/tr/talents/"
  iconBase: string;
  classIcons: Record<string, string>;
  classNames: Record<string, string>;
  raceNames: Record<string, string>;
  strings: { delete: string; buildSaved: string; characterSaved: string; saveCharacter: string };
}

const configEl = document.getElementById('wf-saved-builds');
if (configEl?.textContent) init(JSON.parse(configEl.textContent) as Config);

function init(config: Config) {
  const store = browserStore();
  const section = document.querySelector<HTMLElement>('[data-saved-section]');
  const list = document.querySelector<HTMLElement>('[data-saved-list]');
  const esc = (v: unknown) =>
    String(v ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

  // ?saved=<id> tells the calculator which saved build it edits, so Save overwrites it.
  const href = (b: SavedBuild) =>
    `${config.talentsBase}${b.cls}/?saved=${encodeURIComponent(b.id)}${b.code ? `#b=${b.code}` : ''}`;

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
  window.addEventListener('storage', () => {
    render();
    if (current) setCurrent(current.id);
  });

  // save dialog (class page only)
  const dialog = document.querySelector<HTMLDialogElement>('[data-save-dialog]');
  const nameInput = dialog?.querySelector<HTMLInputElement>('input[name="name"]');
  const note = document.querySelector<HTMLElement>('[data-saved-note]');
  const nameEl = document.querySelector<HTMLElement>('[data-saved-name]');
  const currentCode = () => location.hash.match(/b=([0-9-]*)/)?.[1] ?? '';

  // The saved character (from ?character=) or saved build (from ?saved=) this
  // calculator edits, shown under the class name.
  const characterId = config.cls ? new URLSearchParams(location.search).get('character') : null;
  const character = (): SavedCharacter | undefined =>
    characterId ? loadCharacters(store).find((c) => c.id === characterId && c.cls === config.cls) : undefined;
  let current: SavedBuild | undefined;
  function setCurrent(id: string | null) {
    current = id ? loadBuilds(store).find((b) => b.id === id && b.cls === config.cls) : undefined;
    const own = character();
    // a character shows its race too: "Arthas · Human"
    const name = own ? [own.name, config.raceNames[own.race]].filter(Boolean).join(' · ') : current?.name;
    if (nameEl) {
      nameEl.textContent = name ?? '';
      nameEl.hidden = !name;
    }
    const url = new URL(location.href);
    if (current) url.searchParams.set('saved', current.id);
    else url.searchParams.delete('saved');
    if (url.href !== location.href) history.replaceState(history.state, '', url);
  }
  function saved(text = config.strings.buildSaved) {
    if (!note) return;
    note.textContent = text;
    note.hidden = false;
    setTimeout(() => (note.hidden = true), 2500);
  }
  if (config.cls) setCurrent(new URLSearchParams(location.search).get('saved'));
  const saveBtn = document.querySelector<HTMLElement>('[data-save-open]');
  if (saveBtn && character()) saveBtn.textContent = config.strings.saveCharacter;

  saveBtn?.addEventListener('click', () => {
    const own = character();
    if (own) {
      updateCharacterBuild(store, own.id, currentCode());
      saved(config.strings.characterSaved);
      return;
    }
    if (current && config.cls) {
      // already a saved build: overwrite it, no name prompt
      render(updateBuild(store, current.id, currentCode()));
      saved();
      return;
    }
    if (!dialog || !nameInput) return;
    nameInput.value = '';
    dialog.showModal();
    nameInput.focus();
  });
  dialog?.querySelector('[data-save-cancel]')?.addEventListener('click', () => dialog.close());
  dialog?.querySelector('form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!config.cls || !nameInput) return;
    const builds = saveBuild(store, config.cls, nameInput.value, currentCode());
    render(builds);
    dialog.close();
    setCurrent(builds[0].id); // from now on Save overwrites this one
    saved();
  });

  render();
}
