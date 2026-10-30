// Where a story lives. Race stories: /<lang>/races/<slug>/ and class stories /<lang>/classes/<class>/ (each is the
// page of that race or class). The skills, patch notes and stats page of a class (`stats/[cls].astro`) or race
// (`stats/[race].astro`) is /<lang>/stats/<class or race id>/.
import { withBase } from '../../utils/url';
import { STORY_CLASSES } from './classes';

const CLASS_SLUGS = new Set(STORY_CLASSES.map((c) => c.slug).filter(Boolean));

export const isClassStory = (slug: string) => CLASS_SLUGS.has(slug);

export const storyUrl = (lang: string, slug: string) => withBase(`/${lang}/${isClassStory(slug) ? 'classes' : 'races'}/${slug}/`);

/** Stats page of a class (`warrior`) or a race (`alliance-human`). */
export const statsUrl = (lang: string, id: string) => withBase(`/${lang}/stats/${id}/`);
