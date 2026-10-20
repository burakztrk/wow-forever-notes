// Home page race/class screen: picks a race and a class, shows the matching
// panels. All panels are rendered at build time, this only toggles them.
// State lives in the URL hash (#race=horde-undead&class=warlock) so a combo
// can be linked. "Create a character" saves the pair under a name, like the
// app's creator.

import { browserStore } from '../lib/saved-builds';
import { addCharacter } from '../lib/saved-characters';

const root = document.querySelector<HTMLElement>('[data-combo]');

if (root) {
  const raceBtns = [...root.querySelectorAll<HTMLButtonElement>('.race-btn')];
  const classBtns = [...root.querySelectorAll<HTMLButtonElement>('.class-btn')];
  const q = <T extends HTMLElement>(sel: string) => root.querySelector<T>(sel);
  const stage = {
    raceIcon: q<HTMLImageElement>('[data-stage-race-icon]')!,
    classIcon: q<HTMLImageElement>('[data-stage-class-icon]')!,
    faction: q('[data-stage-faction]')!,
    race: q('[data-stage-race]')!,
    cls: q('[data-stage-class]')!,
    sub: q('[data-stage-sub]')!,
  };
  const plannerLink = q<HTMLAnchorElement>('[data-planner-link]')!;
  const plannerBase = plannerLink.getAttribute('href') ?? '';
  const playableTpl = root.dataset.playableTpl ?? '{n}';
  const unavailableText = root.dataset.unavailableText ?? '';

  const raceBtn = (id: string | null | undefined) => raceBtns.find((b) => b.dataset.race === id);
  const classBtn = (id: string | null | undefined) => classBtns.find((b) => b.dataset.class === id);
  const playable = (race: HTMLButtonElement) => (race.dataset.classes ?? '').split(',');

  let race = raceBtn(root.dataset.defaultRace) ?? raceBtns[0];
  let cls = classBtn(playable(race)[0]) ?? classBtns[0];
  let notice = '';

  function render() {
    const classes = playable(race);
    const faction = race.dataset.faction ?? '';
    root!.dataset.faction = faction;

    for (const b of raceBtns) b.setAttribute('aria-pressed', String(b === race));
    for (const b of classBtns) {
      const ok = classes.includes(b.dataset.class ?? '');
      b.setAttribute('aria-pressed', String(b === cls));
      b.classList.toggle('is-unavailable', !ok);
      b.setAttribute('aria-disabled', String(!ok));
    }

    for (const el of root!.querySelectorAll<HTMLElement>('[data-faction-panel]')) el.hidden = el.dataset.factionPanel !== faction;
    for (const el of root!.querySelectorAll<HTMLElement>('[data-race-panel]')) el.hidden = el.dataset.racePanel !== race.dataset.race;
    for (const el of root!.querySelectorAll<HTMLElement>('[data-class-panel]')) el.hidden = el.dataset.classPanel !== cls.dataset.class;

    const raceImg = race.querySelector('img');
    stage.raceIcon.hidden = !raceImg;
    if (raceImg) stage.raceIcon.src = raceImg.src;
    stage.classIcon.src = cls.querySelector('img')?.src ?? '';
    stage.faction.textContent = root!.querySelector(`[data-faction-panel="${faction}"] h2`)?.textContent ?? '';
    stage.race.textContent = race.dataset.raceName ?? '';
    stage.cls.textContent = cls.dataset.className ?? '';
    stage.cls.style.color = getComputedStyle(cls).getPropertyValue('--class-color');
    stage.sub.textContent = notice || playableTpl.replace('{n}', String(classes.length));
    plannerLink.href = `${plannerBase}${cls.dataset.class}/`;

    history.replaceState(null, '', `#race=${race.dataset.race}&class=${cls.dataset.class}`);
  }

  function pick(nextRace: HTMLButtonElement, nextClass: HTMLButtonElement | undefined) {
    race = nextRace;
    const classes = playable(race);
    // keep the class when the new race can play it, otherwise the first one it can
    const wanted = nextClass ?? cls;
    cls = classes.includes(wanted.dataset.class ?? '') ? wanted : (classBtn(classes[0]) ?? wanted);
    notice = '';
    render();
  }

  for (const b of raceBtns) b.addEventListener('click', () => pick(b, undefined));
  for (const b of classBtns) {
    b.addEventListener('click', () => {
      if (!playable(race).includes(b.dataset.class ?? '')) {
        notice = unavailableText;
        render();
        return;
      }
      pick(race, b);
    });
  }

  const params = new URLSearchParams(location.hash.slice(1));
  const fromHash = raceBtn(params.get('race'));
  pick(fromHash ?? race, classBtn(params.get('class')) ?? cls);

  // ---------- save as a character ----------
  const dialog = q<HTMLDialogElement>('[data-character-dialog]');
  const nameInput = dialog?.querySelector<HTMLInputElement>('input[name="name"]');
  const dialogCombo = q('[data-character-title]');

  q('[data-character-open]')?.addEventListener('click', () => {
    if (!dialog || !nameInput) return;
    if (dialogCombo) dialogCombo.textContent = `${race.dataset.raceName ?? ''} ${cls.dataset.className ?? ''}`;
    nameInput.value = '';
    dialog.showModal();
    nameInput.focus();
  });
  dialog?.querySelector('[data-character-cancel]')?.addEventListener('click', () => dialog.close());
  dialog?.querySelector('form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const [character] = addCharacter(browserStore(), nameInput?.value ?? '', race.dataset.race ?? '', cls.dataset.class ?? '');
    // straight on to the character's talent trees; Save there writes into it
    location.href = `${plannerBase}${character.cls}/?character=${encodeURIComponent(character.id)}`;
  });
}
