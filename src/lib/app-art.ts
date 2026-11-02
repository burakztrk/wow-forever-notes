// Site-owned art slots of the mobile app. The app has no image paths of its own: it asks
// /data/v1/manifest.json (`art`) for the file behind each key, so swapping a picture here
// reaches installed apps on the next data refresh, without an app release.
// To change a picture: replace the file under public/, or point the key at another file.
// New slot: add the key here and to the app's `ArtSlot` list (shared/.../data/ArtSlots.kt);
// the app keeps the previous path as an offline fallback only.

export const APP_ART = {
  'feature.talents': '/stories/night-elf/hyjal.webp',
  'feature.notes': '/stories/undead/undercity.webp',
  'feature.races': '/stories/tauren/thunder-bluff.webp',
  'feature.classes': '/stories/dwarf/council-hall.webp',
  'feature.professions': '/stories/dwarf/ironforge-forge.webp',
  'feature.legacy': '/stories/human/lothar-statue.webp',
  'feature.stories': '/stories/night-elf/well-of-eternity.webp',
  // wide banner (1024 × 339): stories index card and the home tile
  'timeline.banner': '/stories/timeline-banner.webp',
  // taller slide (1024 × 506) for the home carousel
  'timeline.slide': '/stories/timeline-slide.webp',
  // planner banner on the class screen (1800 × 686)
  'planner.banner': '/stories/talent-tree.webp',
} as const satisfies Record<string, `/${string}`>;
