import { MAX_NOTE_LENGTH, noteHtml, splitNote } from '../lib/build-note';
import type { TipPayload } from '../lib/tooltip-render';

// The planner's note field (components/BuildNote.astro): an editor and a view
// that shows the saved text with tooltips and links. saved-builds.ts loads the
// saved build's note into it and reads it back when Save is pressed.

export interface BuildNote {
  value(): string;
  // a saved build's or character's note: opens the view when there is text
  load(note: string): void;
  // after Save: show what was saved
  saved(): void;
}

interface Config {
  terms: Record<string, string>;
  strings: { preview: string; edit: string };
}

export function buildNote(onSave: () => void, saveLabel: string): BuildNote | null {
  const root = document.querySelector<HTMLElement>('[data-note]');
  const configEl = document.getElementById('wf-note');
  if (!root || !configEl?.textContent) return null;
  const config = JSON.parse(configEl.textContent) as Config;
  const input = root.querySelector<HTMLTextAreaElement>('textarea')!;
  const view = root.querySelector<HTMLElement>('[data-note-view]')!;
  const editor = root.querySelector<HTMLElement>('[data-note-editor]')!;
  const toggle = root.querySelector<HTMLButtonElement>('[data-note-toggle]')!;
  const counter = root.querySelector<HTMLElement>('[data-note-count]')!;
  const saveBtn = root.querySelector<HTMLButtonElement>('[data-note-save]')!;
  saveBtn.textContent = saveLabel;

  let tips: TipPayload | null | undefined;
  const loadTips = () => {
    if (tips === undefined) {
      const island = document.getElementById('wf-glossary');
      tips = island?.textContent ? (JSON.parse(island.textContent) as TipPayload) : null;
    }
    return tips;
  };

  let viewing = false;
  function show(viewMode: boolean) {
    const text = input.value.trim();
    viewing = viewMode && !!text;
    if (viewing) {
      const payload = loadTips();
      view.innerHTML = noteHtml(splitNote(text, config.terms), (id) => payload?.entries[id], payload?.iconBase ?? '');
    }
    view.hidden = !viewing;
    editor.hidden = viewing;
    toggle.textContent = viewing ? config.strings.edit : config.strings.preview;
    toggle.disabled = !text;
  }
  function count() {
    const n = input.value.length;
    counter.textContent = `${n} / ${MAX_NOTE_LENGTH}`;
    counter.classList.toggle('full', n >= MAX_NOTE_LENGTH);
    toggle.disabled = !input.value.trim();
  }

  input.addEventListener('input', count);
  toggle.addEventListener('click', () => {
    show(!viewing);
    if (!viewing) input.focus();
  });
  saveBtn.addEventListener('click', onSave);
  count();

  return {
    value: () => input.value.trim().slice(0, MAX_NOTE_LENGTH),
    load(note) {
      input.value = note.slice(0, MAX_NOTE_LENGTH);
      count();
      show(true);
    },
    saved() {
      count();
      show(true);
    },
  };
}
