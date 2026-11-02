import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import appConfig from '../src/data/app-config.json';
import { APP_ART } from '../src/lib/app-art';

const root = fileURLToPath(new URL('..', import.meta.url));
const semver = /^\d+\.\d+\.\d+$/;
const cmp = (a: string, b: string) => {
  const [x, y] = [a, b].map((v) => v.split('.').map(Number));
  const i = x.findIndex((n, k) => n !== y[k]);
  return i < 0 ? 0 : x[i] - y[i];
};

describe('app art slots (/data/v1/manifest.json)', () => {
  it('points every slot at a file that exists in public/', () => {
    for (const [key, path] of Object.entries(APP_ART)) {
      expect(existsSync(join(root, 'public', path)), `${key} → ${path}`).toBe(true);
    }
  });

});

describe('app force-update config', () => {
  for (const os of ['android', 'ios'] as const) {
    it(`${os}: versions are x.y.z and minVersion <= latestVersion`, () => {
      const c = appConfig[os];
      expect(c.minVersion).toMatch(semver);
      expect(c.latestVersion).toMatch(semver);
      expect(cmp(c.minVersion, c.latestVersion)).toBeLessThanOrEqual(0);
    });

    it(`${os}: storeUrl is https or null`, () => {
      const url = appConfig[os].storeUrl;
      if (url !== null) expect(url).toMatch(/^https:\/\//);
    });
  }
});
