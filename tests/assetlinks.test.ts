import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// Android App Links: the app (com.booapps.forevercampfire) verifies foreverwow.app through this file.
// Without it the Play Console reports "domain could not be verified" and deep links open in the browser.
const file = new URL('../public/.well-known/assetlinks.json', import.meta.url);

describe('assetlinks.json', () => {
  const links = JSON.parse(readFileSync(file, 'utf8')) as {
    relation: string[];
    target: { namespace: string; package_name: string; sha256_cert_fingerprints: string[] };
  }[];

  it('declares the app with handle_all_urls', () => {
    const entry = links.find((l) => l.target.package_name === 'com.booapps.forevercampfire');
    expect(entry).toBeDefined();
    expect(entry!.relation).toContain('delegate_permission/common.handle_all_urls');
    expect(entry!.target.namespace).toBe('android_app');
  });

  it('lists well-formed SHA-256 fingerprints (32 uppercase hex pairs)', () => {
    for (const l of links) {
      expect(l.target.sha256_cert_fingerprints.length).toBeGreaterThan(0);
      for (const fp of l.target.sha256_cert_fingerprints) {
        expect(fp).toMatch(/^([0-9A-F]{2}:){31}[0-9A-F]{2}$/);
      }
    }
  });
});
