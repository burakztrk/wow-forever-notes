import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Polite HTTP client for the source sites: identifies itself, stays at or
// below 2 requests/second, retries transient failures and can cache bodies on
// disk so re-running a sync does not hit the sites again.

const USER_AGENT = 'wow-forever-notes-sync/0.1 (+https://github.com/burakztrk/wow-forever-notes)';
const MIN_INTERVAL_MS = 500;

let lastRequestAt = 0;

async function throttle(): Promise<void> {
  const wait = lastRequestAt + MIN_INTERVAL_MS - Date.now();
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastRequestAt = Date.now();
}

export interface FetchOptions {
  cacheDir?: string;
  retries?: number;
}

async function request(url: string, retries: number): Promise<Response> {
  for (let attempt = 1; ; attempt++) {
    await throttle();
    let res: Response | undefined;
    try {
      res = await fetch(url, { headers: { 'user-agent': USER_AGENT } });
    } catch (err) {
      if (attempt >= retries) throw new Error(`GET ${url} failed: ${(err as Error).message}`);
    }
    if (res?.ok) return res;
    if (res && (res.status === 404 || res.status === 403 || attempt >= retries)) {
      throw new Error(`GET ${url} → HTTP ${res.status}`);
    }
    await new Promise((r) => setTimeout(r, 1000 * attempt));
  }
}

export async function fetchText(url: string, opts: FetchOptions = {}): Promise<string> {
  const cacheFile = opts.cacheDir
    ? path.join(opts.cacheDir, createHash('sha1').update(url).digest('hex') + '.txt')
    : undefined;
  if (cacheFile) {
    try {
      return await readFile(cacheFile, 'utf8');
    } catch {
      // not cached yet
    }
  }
  const text = await (await request(url, opts.retries ?? 3)).text();
  if (cacheFile) {
    await mkdir(path.dirname(cacheFile), { recursive: true });
    await writeFile(cacheFile, text);
  }
  return text;
}

export async function fetchJson<T>(url: string, opts: FetchOptions = {}): Promise<T> {
  return JSON.parse(await fetchText(url, opts)) as T;
}

export async function fetchBinary(url: string): Promise<Buffer> {
  return Buffer.from(await (await request(url, 3)).arrayBuffer());
}
