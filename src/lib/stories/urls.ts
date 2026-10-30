// Where a story lives. Race stories: /<lang>/stories/<slug>/. Class stories are the class's own page,
// /<lang>/classes/<class>/; the class's skills, patch notes and stats are /<lang>/stats/<class>/.
import { withBase } from '../../utils/url';
import { STORY_CLASSES } from './classes';

const CLASS_SLUGS = new Set(STORY_CLASSES.map((c) => c.slug).filter(Boolean));

export const isClassStory = (slug: string) => CLASS_SLUGS.has(slug);

export const storyUrl = (lang: string, slug: string) => withBase(`/${lang}/${isClassStory(slug) ? 'classes' : 'stories'}/${slug}/`);

export const statsUrl = (lang: string, classId: string) => withBase(`/${lang}/stats/${classId}/`);
