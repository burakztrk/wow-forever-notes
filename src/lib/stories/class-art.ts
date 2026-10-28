// Brand SVG icons and visual symbols for class stories.

export const CLASS_ART = {
  icons: {
    // Mage: Kirin Tor Eye / Arcane Star
    mageBrand:
      'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3 0 1.31-.84 2.41-2 2.83V15h-2v-4.17c-1.16-.42-2-1.52-2-2.83 0-1.66 1.34-3 3-3zm0 14c-3.86 0-7-3.14-7-7 0-1.28.35-2.48.96-3.52l1.46 1.46c-.26.63-.42 1.32-.42 2.06 0 2.76 2.24 5 5 5s5-2.24 5-5c0-.74-.16-1.43-.42-2.06l1.46-1.46c.61 1.04.96 2.24.96 3.52 0 3.86-3.14 7-7 7z',
    // Hunter: Crossed Arrows & Bow
    hunterBrand:
      'M12 2L10.59 3.41 18.17 11H2v2h16.17l-7.58 7.59L12 22l10-10L12 2z',
    // Paladin: Silver Hand Hammer / Holy Sun
    paladinBrand:
      'M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3-4.8-2.5-4.8 2.5.9-5.3-3.8-3.7 5.3-.8L12 2zm-1 9h2v8h-2v-8zm-3 2h8v2H8v-2z',
    // Warrior: Crossed Broadswords
    warriorBrand:
      'M19.7 2.3c-.4-.4-1-.4-1.4 0l-5.6 5.6 1.4 1.4 5.6-5.6c.4-.4.4-1 0-1.4zM4.3 21.7c.4.4 1 .4 1.4 0l5.6-5.6-1.4-1.4-5.6 5.6c-.4.4-.4 1 0 1.4zm15.4-8L18.3 12.3 12 18.6V22h3.4l6.3-6.3-2-2zM2 12l2-2 6.3 6.3-1.4 1.4L2 12z',
    // Rogue: Twin Daggers
    rogueBrand:
      'M12 2L4 10l3 3 5-5v14h2V8l5 5 3-3-10-8zm-6 9.4L4.6 10 12 2.6 19.4 10 18 11.4 12 5.4 6 11.4z',
    // Priest: Sun & Moon Duality / Ankh
    priestBrand:
      'M12 2C8.69 2 6 4.69 6 8c0 2.5 1.54 4.64 3.73 5.53L8 22h8l-1.73-8.47C16.46 12.64 18 10.5 18 8c0-3.31-2.69-6-6-6zm0 2c2.21 0 4 1.79 4 4 0 1.85-1.28 3.41-3 3.86V6h-2v5.86C9.28 11.41 8 9.85 8 8c0-2.21 1.79-4 4-4z',
    // Shaman: Elemental Totem
    shamanBrand:
      'M12 2L8 6h3v6H7V9L3 13l4 4v-3h4v6H8l4 4 4-4h-3v-6h4v3l4-4-4-4v3h-4V6h3l-4-4z',
    // Warlock: Demonic Horned Skull
    warlockBrand:
      'M12 2C6.48 2 2 6.48 2 12c0 3.5 1.8 6.58 4.54 8.4l1.46-1.46C5.7 17.5 4 14.95 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 2.95-1.7 5.5-4 6.94l1.46 1.46C20.2 18.58 22 15.5 22 12c0-5.52-4.48-10-10-10zm-1 9h2v4h-2v-4zm-4 0h2v4H7v-4zm8 0h2v4h-2v-4z',
    // Druid: Crescent Antlers & Paw
    druidBrand:
      'M12 3c-4.97 0-9 4.03-9 9 0 3.63 2.16 6.74 5.28 8.15l1.08-1.87C6.88 17.18 5 14.81 5 12c0-3.87 3.13-7 7-7s7 3.13 7 7c0 2.81-1.88 5.18-4.36 6.28l1.08 1.87C18.84 18.74 21 15.63 21 12c0-4.97-4.03-9-9-9zm0 5a4 4 0 100 8 4 4 0 000-8z',
    // Separator
    sep: 'M-12 0 L0 -6 L12 0 L0 6 Z',
  },
  // Reusable stage icons (64x64)
  stages: {
    flame: '<path d="M32 8c-4 10-14 16-14 26 0 9.94 8.06 18 18 18s18-8.06 18-18c0-8-6-15-10-20-2 6-6 8-8 8s-4-6-4-14z" fill="none" stroke="currentColor" stroke-width="3"/>',
    frost: '<path d="M32 6v52M6 32h52M14 14l36 36M14 50L50 14" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="32" cy="32" r="6" fill="currentColor"/>',
    arcane: '<polygon points="32,6 56,48 8,48" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="32" cy="34" r="8" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="32" cy="34" r="3" fill="currentColor"/>',
    book: '<path d="M12 12h16c4 0 4 4 4 4s0-4 4-4h16v38H36c-4 0-4 4-4 4s0-4-4-4H12V12z" fill="none" stroke="currentColor" stroke-width="3"/><line x1="32" y1="16" x2="32" y2="52" stroke="currentColor" stroke-width="3"/>',
    eye: '<path d="M8 32s10-16 24-16 24 16 24 16-10 16-24 16S8 32 8 32z" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="32" cy="32" r="8" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="32" cy="32" r="3" fill="currentColor"/>',
    shield: '<path d="M32 8l20 6v16c0 14-20 26-20 26S12 44 12 30V14l20-6z" fill="none" stroke="currentColor" stroke-width="3"/>',
    hammer: '<path d="M22 14h20v12H22zM28 26v26h8V26" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>',
    sun: '<circle cx="32" cy="32" r="12" fill="none" stroke="currentColor" stroke-width="3"/><path d="M32 8v6M32 50v6M8 32h6M50 32h6M15 15l4 4M45 45l4 4M15 49l4-4M45 19l4-4" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>',
    sword: '<line x1="16" y1="48" x2="48" y2="16" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><line x1="22" y1="36" x2="28" y2="42" stroke="currentColor" stroke-width="4"/><circle cx="14" cy="50" r="3" fill="currentColor"/>',
    bow: '<path d="M16 12c12 8 12 32 0 40M16 12v40M16 32h32" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>',
    paw: '<circle cx="20" cy="20" r="4" fill="currentColor"/><circle cx="32" cy="16" r="4" fill="currentColor"/><circle cx="44" cy="20" r="4" fill="currentColor"/><path d="M32 26c-8 0-14 6-14 14 0 6 6 10 14 10s14-4 14-10c0-8-6-14-14-14z" fill="none" stroke="currentColor" stroke-width="3"/>',
    totem: '<path d="M20 12h24v40H20zM12 20h40v8H12z" fill="none" stroke="currentColor" stroke-width="3"/>',
    skull: '<path d="M18 28c0-8 6-14 14-14s14 6 14 14c0 6-4 10-6 12v6H24v-6c-2-2-6-6-6-12z" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="26" cy="28" r="3" fill="currentColor"/><circle cx="38" cy="28" r="3" fill="currentColor"/>',
    dagger: '<path d="M32 10l8 12-6 20-2 10-2-10-6-20z" fill="none" stroke="currentColor" stroke-width="3"/><line x1="20" y1="24" x2="44" y2="24" stroke="currentColor" stroke-width="3"/>',
  },
};
