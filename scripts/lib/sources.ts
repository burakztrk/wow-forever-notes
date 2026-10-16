import { fetchJson } from './http';

// Source endpoints. wclbox (新手盒子·魔兽世界无限数据库) asks to be credited by
// name with the page URL; robots.txt allows these paths. Its JSON lives under a
// release-specific prefix announced in /site-version.json.

export const WCLBOX = 'https://wowforever.wclbox.com';
// Official English client text for spells and talents (robots.txt: Allow /).
export const WOWFOREVERTOOLS = 'https://wowforevertools.com';
export const BLIZZARD_FORUM = 'https://us.forums.blizzard.com/en/wow';
// "WoW Forever Beta Development Notes – Updated <date>" (title changes, id does not)
export const DEV_NOTES_TOPIC_ID = 2360696;

// Never cached: the release id is what tells us the site's data changed.
export async function wclboxRelease(): Promise<string> {
  const { release } = await fetchJson<{ release: string }>(`${WCLBOX}/site-version.json`);
  if (!/^r-\d+$/.test(release)) throw new Error(`Unexpected wclbox release id: ${release}`);
  return release;
}

export async function wclboxDataBase(release?: string): Promise<string> {
  return `${WCLBOX}/_shuju/${release ?? (await wclboxRelease())}/en/`;
}

export const wclboxPage = (path: string) => `${WCLBOX}/en/${path.replace(/^\//, '')}`;
export const wclboxIcon = (icon: string) => `${WCLBOX}/tubiao/${icon}.jpg`;
export const forumPostJson = (postId: number) => `${BLIZZARD_FORUM}/posts/${postId}.json`;
export const forumTopicJson = (topicId: number) => `${BLIZZARD_FORUM}/t/${topicId}.json`;
