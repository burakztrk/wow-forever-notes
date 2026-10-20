import { browserStore } from '../lib/saved-builds';
import { loadCharacters, removeCharacter, type SavedCharacter } from '../lib/saved-characters';

// "My characters" list. Config comes from #wf-saved-characters; the creator
// fires `wf-characters` on window after it saves one.

interface Named {
  name: string;
  icon: string;
}

interface Config {
  talentsBase: string;
  iconBase: string;
  races: Record<string, Named>;
  classes: Record<string, Named>;
  strings: { delete: string; noBuildYet: string };
}

const configEl = document.getElementById('wf-saved-characters');
if (configEl?.textContent) init(JSON.parse(configEl.textContent) as Config);

function init(config: Config) {
  const store = browserStore();
  const section = document.querySelector<HTMLElement>('[data-characters-section]');
  const list = document.querySelector<HTMLElement>('[data-characters-list]');
  if (!section || !list) return;
  const esc = (v: unknown) =>
    String(v ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
  const img = (icon: string | undefined, cls: string, size: number) =>
    icon ? `<img class="${cls}" src="${esc(config.iconBase + icon)}.jpg" alt="" width="${size}" height="${size}" loading="lazy" />` : '';

  // ?character=<id> tells the calculator which character it edits, so Save writes into it.
  const href = (c: SavedCharacter) =>
    `${config.talentsBase}${c.cls}/?character=${encodeURIComponent(c.id)}${c.code ? `#b=${c.code}` : ''}`;

  function render(characters: SavedCharacter[] = loadCharacters(store)) {
    section!.hidden = characters.length === 0;
    list!.innerHTML = characters
      .map((c) => {
        const race = config.races[c.race];
        const cls = config.classes[c.cls];
        return `<li class="character-row" style="--class-color: var(--class-${esc(c.cls)})">
          <a href="${esc(href(c))}">
            <span class="character-portrait">${img(race?.icon, 'race', 40)}${img(cls?.icon, 'cls', 20)}</span>
            <span class="character-text">
              <span class="character-name">${esc(c.name)}</span>
              <span class="character-meta">${esc(race?.name ?? c.race)} <b>${esc(cls?.name ?? c.cls)}</b> · ${esc(c.code || config.strings.noBuildYet)}</span>
            </span>
          </a>
          <button type="button" class="character-delete" data-delete="${esc(c.id)}" aria-label="${esc(config.strings.delete)}: ${esc(c.name)}" title="${esc(config.strings.delete)}">🗑</button>
        </li>`;
      })
      .join('');
  }

  list.addEventListener('click', (e) => {
    const btn = (e.target as Element).closest<HTMLElement>('[data-delete]');
    if (btn) render(removeCharacter(store, btn.dataset.delete!));
  });
  // a save on this page (the creator) or in another tab
  window.addEventListener('wf-characters', () => render());
  window.addEventListener('storage', () => render());

  render();
}
