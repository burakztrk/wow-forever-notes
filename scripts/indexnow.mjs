// IndexNow: tells Bing (and the other IndexNow engines: Yandex, Seznam, Naver…)
// which URLs changed, right after a deploy, instead of waiting for their crawl.
// ChatGPT Search and Copilot answer from Bing's index. Google does not use IndexNow.
//
// The key is not a secret: IndexNow checks ownership by fetching
// https://foreverwow.app/<KEY>.txt (public/<KEY>.txt), which must contain the key.
//
//   node scripts/indexnow.mjs --changed <file> [<file>…]   # files changed in a push (the deploy workflow)
//   node scripts/indexnow.mjs --all                        # every URL in the live sitemap (once, by hand)
//   add --dry-run to print the URLs without sending them
//
// Plain Node 22 (global fetch), no dependencies, so the workflow needs no npm ci.

export const SITE = 'https://foreverwow.app';
export const KEY = '2e09a73b7be8aa65ccd1442c1ef24940';
export const LANGS = ['tr', 'en'];
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const MAX_URLS = 10000; // IndexNow's limit per request

/**
 * URLs to announce for the files a push changed. A new or edited patch note
 * changes its own page and the pages that list it (home, notes, RSS); any other
 * change to the site's pages, data or styles is announced as those list pages
 * only, since we cannot tell from a file name which of the 160 pages it touched.
 */
export function urlsForChangedFiles(files) {
  const urls = new Set();
  let siteChanged = false;
  for (const file of files) {
    const post = file.match(/^src\/content\/blog\/(tr|en)\/([^/]+)\.md$/);
    if (post) {
      urls.add(`${SITE}/${post[1]}/blog/${post[2]}/`);
      siteChanged = true;
    } else if (/^(src|public)\//.test(file) || file === 'astro.config.mjs') {
      siteChanged = true;
    }
  }
  if (siteChanged) {
    for (const lang of LANGS) {
      urls.add(`${SITE}/${lang}/`);
      urls.add(`${SITE}/${lang}/notes/`);
      urls.add(`${SITE}/${lang}/rss.xml`);
    }
  }
  return [...urls];
}

/** <loc> entries of a sitemap or sitemap index. */
export function sitemapLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function allSitemapUrls() {
  const index = await (await fetch(`${SITE}/sitemap-index.xml`)).text();
  const urls = [];
  for (const sitemap of sitemapLocs(index)) urls.push(...sitemapLocs(await (await fetch(sitemap)).text()));
  return urls;
}

export async function submit(urls) {
  const body = { host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls.slice(0, MAX_URLS) };
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  return { status: res.status, text: await res.text() };
}

async function main(argv) {
  const dryRun = argv.includes('--dry-run');
  const args = argv.filter((a) => a !== '--dry-run');
  let urls;
  if (args[0] === '--all') urls = await allSitemapUrls();
  else if (args[0] === '--changed') urls = urlsForChangedFiles(args.slice(1));
  else {
    console.error('usage: node scripts/indexnow.mjs --changed <files…> | --all [--dry-run]');
    return 2;
  }
  if (!urls.length) {
    console.log('indexnow: nothing to announce');
    return 0;
  }
  console.log(`indexnow: ${urls.length} URL(s)\n${urls.join('\n')}`);
  if (dryRun) return 0;
  const { status, text } = await submit(urls);
  // 200 = accepted, 202 = accepted, key check pending; anything else is an error
  console.log(`indexnow: HTTP ${status}${text ? ` ${text}` : ''}`);
  return status === 200 || status === 202 ? 0 : 1;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(await main(process.argv.slice(2)));
}
