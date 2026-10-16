# WoW Forever günlük not job'u

Bu dosya, scheduled job'un (Claude schedule) her koşuda izleyeceği talimat.
Amaç: WoW Forever beta'ya gelen resmi notları **Türkçe ve İngilizce** blog yazısı olarak yayınlamak.
Yeni bir şey yoksa **hiçbir şey yapmamak**.

## Ne zaman, nerede

- Günde bir kez çalışır (öneri: 09:00 İstanbul).
- Önerilen yer Mac'teki Desktop scheduled task. Cloud routine'lerde dış domainlere 403 gelebiliyor. Cloud'da çalışacaksan ilk koşuda `npm run check-updates` çıktısının `ERROR` olmadığını doğrula.
- Repo kökünde, güncel `main` üzerinde çalış:

  ```bash
  git checkout main && git pull --ff-only && npm ci
  ```

## Adım 0: Yeni bir şey var mı?

```bash
npm run check-updates
```

| Çıktı | Ne yapılır |
|---|---|
| `NO_UPDATES` | **Dur.** Dosya, commit ve PR yok, bildirim de gönderilmez. Sadece "Realm Maintenance" postu gelen günler de bu sonucu verir. |
| `ERROR …` | Dur ve hatayı job çıktısında bırak (arıza demektir). |
| `UPDATES_FOUND` | Devam et. Ayrıntılar `.cache/updates.json` içinde. |

Karar `src/data/state.json` ile verilir. Bu dosya son yayınlanan build'i ve son Blizzard post zamanını tutar. Bu yüzden atlanan bir gün sonraki koşuda yakalanır ve aynı build iki kez yazılmaz.

## Adım 1: Kaynakları oku

`.cache/updates.json` içindeki alanlar:

- `newPosts[]`: Blizzard'ın resmi postları.
  - `official` alanı postun tam metnidir. **Birincil kaynak budur.**
  - `url` alanı yazının kaynak linkidir.
- `newBuilds[]`: wclbox'un build bazında `classes` / `races` değişiklikleri (`name`, `was`, `now`).
  - Bu metinler Çince istemciden çevrildi. İsimleri ve sayıları resmi metinle karşılaştır.
  - Resmi metinle çelişirse resmi metin geçerlidir.
- `devNotes`: "WoW Forever Beta Development Notes" konusu güncellendiyse başlığı ve linki.

Uyulacak kurallar:

- Kaynakta olmayan bir detayı yazma.
- Kaynak metni kopyalama, özetle ve açıkla.

## Adım 2: Yazıyı hazırla

- Tarih: `TZ=Europe/Istanbul date +%F`.
- **İki dosya** yaz. Eşi olmayan yazı build'i kırar:
  - `src/content/blog/tr/wow-forever-YYYY-MM-DD.md`
  - `src/content/blog/en/wow-forever-YYYY-MM-DD.md`
- Aynı gün için dosya varsa yeni dosya açma, mevcut dosyayı güncelle.
- Frontmatter şeması `src/content.config.ts` içinde. Örnek yazı: `src/content/blog/{tr,en}/wow-forever-2026-10-16.md`.

  ```yaml
  title: "WoW Forever notları: <kısa başlık> (build <son build>)"   # EN: "WoW Forever notes: …"
  date: YYYY-MM-DD
  tags: [wow-forever, patch-notes]
  accent: warning
  excerpt: "<tek cümle özet>"
  draft: false
  build: "<son build id, ör. 1.60.1.70425>"
  sources:
    - <resmi Blizzard post URL'leri>
    - https://wowforever.wclbox.com/en/buding
  ```

- Yazının bölümleri aşağıda. Boş kalan bölümü atla.
  1. Giriş: tarih ve build. Bakım duyurusuna en fazla bir cümle ayır.
  2. `## Karakter & Sınıf değişiklikleri`: her sınıf için bir `### <Sınıf>` alt başlığı.
  3. `## Irk değişiklikleri`
  4. `## Önemli bug fix'ler`
  5. `## Yeni geliştirmeler / sistem değişiklikleri`
  6. `## Bilinen sorunlar`: kısa tut.
- **Kaynaklar bölümü yazma.** Frontmatter'daki `sources` sayfanın sonunda otomatik listelenir.
- Dil kuralları:
  - TR dosyası Türkçe, EN dosyası İngilizce yazılır.
  - Spell, talent, item, race ve class adları iki dilde de İngilizce kalır.
  - Ağaç adlarında resmi isimleri kullan (Arms, Marksmanship, Restoration…). wclbox'un "Weapons", "Shoot", "Renew" çevirilerini kullanma.

## Adım 3: Tooltip'ler

- Skill, talent ve racial adlarını direktifle yaz:
  - `:spell[Aimed Shot]`
  - `:talent[Missile Barrage]`
  - `:racial[Blood Fury]`
  - Türden emin değilsen `:tip[Mana Shield]`.
- Aynı isim birden çok sınıfta varsa `{class=paladin}` ekle. Build hatası bunu ayrıca söyler.
- Direktiflerin build'de doğrulandığını unutma. Glossary'de olmayan bir isim **build'i kırar**. Hata alırsan ismi düzelt, uydurma isimle geçme.
- Yeni bir build geldiyse, yazmaya başlamadan önce glossary'yi yenile. Değişen `src/data/*` ve `public/icons/*` dosyaları aynı PR'a girer:

  ```bash
  npm run sync
  ```

- Sync'ten sonra da glossary'de olmayan yeni bir isim için direktif kullanma, düz metin yaz.
- **Türkçe tooltip metinleri:** Sync çıktısında `TRANSLATE_PENDING <n>` görünürse yeni veya değişen İngilizce açıklamalar var demektir. Yazıya geçmeden önce bunları çevir:
  1. `.cache/translate-pending.json` dosyasını oku.
  2. [docs/translation-style.md](translation-style.md) kurallarına göre `{ "<key>": "<Türkçe>" }` biçiminde bir dosya yaz.
  3. `npm run translate -- --apply <dosya>` çalıştır.
  4. `TRANSLATIONS_COMPLETE` görene kadar tekrarla.

  Sayı kaybeden çeviri reddedilir. Değişen `src/data/i18n/tr.json` dosyası aynı PR'a girer.

## Adım 4: Doğrula ve state'i ilerlet

```bash
npm run build && npm test
npm run check-updates -- --mark-seen    # src/data/state.json güncellenir, aynı PR'a girer
```

## Adım 5: Yayınla

1. Secret taraması yap: `gitleaks detect --no-banner` (kuruluysa). Ayrıca `git diff --cached` çıktısında token, key ya da `.env` olmadığını kontrol et. Repo public.
2. Branch'i aç, commit'le ve PR'ı oluştur:

   ```bash
   git checkout -b blog/wow-forever-YYYY-MM-DD
   git add src/content src/data public/icons   # src/data/i18n/tr.json dahil
   git commit -m "Blog: WoW Forever notları YYYY-MM-DD"
   git push -u origin HEAD
   gh pr create --title "Blog: WoW Forever notları YYYY-MM-DD" --body "<özet + kaynaklar>"
   gh pr merge --auto --squash
   ```

3. `build` check'i geçince PR merge olur. main'e gelen push sonrası GitHub Actions siteyi GitHub Pages'e deploy eder.
4. GitHub erişimi yoksa ya da push/PR başarısız olursa: iki dosyanın tam metnini çıktıya yaz ve hatayı açıkça bildir.

## Test modu

Job'a verilen talimatta **"TEST MODU"** geçiyorsa akış aynıdır, yalnızca şu farklar uygulanır:

| Adım | Normal | Test modu |
|---|---|---|
| 0 | `npm run check-updates` | `npm run check-updates -- --since 1.60.1.70374`: zaten yayınlanmış 15 Ekim güncellemesini yeni gibi gösterir. `state.json`'a dokunmaz. |
| 2 | `wow-forever-YYYY-MM-DD.md`, `draft: false` | `wow-forever-YYYY-MM-DD-test.md`, `draft: true` (canlı sitede görünmez) |
| 4 | `--mark-seen` çalışır | `--mark-seen` **çalıştırılmaz** |
| 5 | Branch `blog/…`, PR, `--auto --squash` | Branch `test/wow-forever-YYYY-MM-DD`, `gh pr create --draft`, auto-merge **yok** |
| Bildirim | Schedule tarafı karar verir | Gönderilmez |

Test bitince PR'ı inceleyip kapat; branch silinebilir.

## Bildirim

- `NO_UPDATES` günlerinde bildirim gönderilmez.
- Diğer durumlarda bildirim kararını schedule tarafı verir.

## Kaynak listesi

| Kaynak | Kullanım |
|---|---|
| `https://wowforever.wclbox.com/en/buding` (JSON: `/_shuju/<release>/en/buding.json`) | Build'ler ve Blizzard postlarının listesi. Atıf: "新手盒子·魔兽世界无限数据库" + sayfa URL'si |
| `https://us.forums.blizzard.com/en/wow/posts/<id>.json` | Resmi post metni |
| `https://us.forums.blizzard.com/en/wow/t/2360696.json` | Development notes konusu (başlık "Updated <tarih>") |
| `https://www.bluetracker.gg/wow/forum/4698-wow-forever-beta-discussion/` | İnsan kaynağı. Otomasyona 403 verebilir, erişilemezse atla |
