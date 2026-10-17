import { createVerify, generateKeyPairSync } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import {
  addedPosts,
  buildMessage,
  newestPerLang,
  oauthAssertion,
  parseServiceAccount,
  readFrontmatter,
} from '../scripts/lib/notify';

describe('addedPosts', () => {
  it('keeps only TR/EN blog markdown files', () => {
    expect(
      addedPosts([
        'src/content/blog/tr/wow-forever-2026-10-16.md',
        'src/content/blog/en/wow-forever-2026-10-16.md',
        'src/content/blog/de/x.md',
        'src/content/blog/tr/img/a.md',
        'src/data/glossary.json',
        '',
      ]),
    ).toEqual([
      { lang: 'tr', slug: 'wow-forever-2026-10-16' },
      { lang: 'en', slug: 'wow-forever-2026-10-16' },
    ]);
  });
});

describe('newestPerLang', () => {
  it('keeps the newest post of each language, TR first', () => {
    expect(
      newestPerLang([
        { lang: 'en', slug: 'wow-forever-2026-10-01' },
        { lang: 'en', slug: 'wow-forever-2026-10-08' },
        { lang: 'tr', slug: 'wow-forever-2026-10-08' },
        { lang: 'tr', slug: 'wow-forever-2026-10-01' },
      ]),
    ).toEqual([
      { lang: 'tr', slug: 'wow-forever-2026-10-08' },
      { lang: 'en', slug: 'wow-forever-2026-10-08' },
    ]);
  });
});

describe('readFrontmatter', () => {
  it('reads quoted and plain values', () => {
    const md = [
      '---',
      'title: "WoW Forever notları: 15 Ekim güncellemesi (build 70425)"',
      'date: 2026-10-16',
      'tags: [wow-forever, patch-notes]',
      "excerpt: 'Irk yeteneklerinde ''geniş'' düzenleme.'",
      'draft: false',
      'build: "1.60.1.70425"',
      'sources:',
      '  - https://example.com',
      '---',
      '',
      'Body',
    ].join('\n');
    expect(readFrontmatter(md)).toEqual({
      title: 'WoW Forever notları: 15 Ekim güncellemesi (build 70425)',
      excerpt: "Irk yeteneklerinde 'geniş' düzenleme.",
      build: '1.60.1.70425',
      draft: false,
    });
    expect(readFrontmatter('---\ndraft: true\n---\n').draft).toBe(true);
    expect(readFrontmatter('no frontmatter')).toEqual({});
  });
});

describe('buildMessage', () => {
  it('targets the language topic and links the post', () => {
    const msg = buildMessage({ lang: 'tr', slug: 'wow-forever-2026-10-16' }, { title: 'T', excerpt: 'E' }).message;
    expect(msg.topic).toBe('notes-tr');
    expect(msg.notification).toEqual({ title: 'T', body: 'E' });
    expect(msg.data).toEqual({
      type: 'post',
      lang: 'tr',
      slug: 'wow-forever-2026-10-16',
      url: 'https://foreverwow.app/tr/blog/wow-forever-2026-10-16/',
    });
  });

  it('falls back to the slug and clips long excerpts', () => {
    const msg = buildMessage({ lang: 'en', slug: 's' }, { excerpt: 'x'.repeat(400) }).message;
    expect(msg.notification.title).toBe('s');
    expect(msg.notification.body.length).toBe(230);
    expect(msg.notification.body.endsWith('…')).toBe(true);
  });
});

describe('oauthAssertion', () => {
  it('is an RS256 JWT for the FCM scope, signed by the service account key', () => {
    const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
    const sa = parseServiceAccount(
      JSON.stringify({
        project_id: 'p',
        client_email: 'bot@p.iam.gserviceaccount.com',
        private_key: privateKey.export({ type: 'pkcs8', format: 'pem' }).toString(),
      }),
    );
    const jwt = oauthAssertion(sa, 1_000);
    const [header, claims, signature] = jwt.split('.');
    expect(JSON.parse(Buffer.from(header, 'base64url').toString())).toEqual({ alg: 'RS256', typ: 'JWT' });
    expect(JSON.parse(Buffer.from(claims, 'base64url').toString())).toEqual({
      iss: 'bot@p.iam.gserviceaccount.com',
      scope: 'https://www.googleapis.com/auth/firebase.messaging',
      aud: 'https://oauth2.googleapis.com/token',
      iat: 1_000,
      exp: 4_600,
    });
    const verify = createVerify('RSA-SHA256');
    verify.update(`${header}.${claims}`);
    expect(verify.verify(publicKey, Buffer.from(signature, 'base64url'))).toBe(true);
  });

  it('rejects incomplete service accounts', () => {
    expect(() => parseServiceAccount('{"project_id":"p"}')).toThrow(/client_email/);
  });
});
