# Forever Codex — mobil uygulama planı

> **2026-10-17:** Bildirimler (FCM, §4, M5) iptal edildi. `notify.yml`, `scripts/notify.ts` ve uygulamadaki Firebase kodu silindi;
> `FCM_SERVICE_ACCOUNT_JSON` secret'ı artık kullanılmıyor.

Bu doküman ayrı bir oturuma verilmek için yazıldı. Tek başına okunduğunda işe başlamaya yetecek şekilde hazırlandı.

## 0. Bağlam

- **Ürün:** WoW Forever için resmi olmayan yardımcı uygulama. İçeriği TR/EN patch notları ve tooltip'ler, talent planlayıcı, race ve class ekranları, yeni yazı geldiğinde push bildirimi.
- **Kaynak site:** https://foreverwow.app/ (repo `burakztrk/wow-forever-notes`, yerel `~/claudee/wow-forever-notes`). Uygulama bu sitenin ürettiği veriyi okur, ayrı bir backend yok.
- **Marka:** Çalışma adı **Forever Codex** (mağaza çakışması bulunmadı; "Forever Notes" Apple Notes için bilinen bir yöntemle çakışıyor). Paket `com.booapps.forevercodex`. **İkon tasarımı açık iş** (bkz. §7).
- **Wiki:** `wiki/projects/wow-forever-notes.md` ve `wiki/syntheses/wow-forever-mobil-uygulama-arastirmasi.md` (rakipler, mağaza ve IP riskleri). Kanban kartı `#wow-forever`.
- **Hedef tarih:** WoW Forever 2026-11-04'te çıkıyor. Lansman haftasında en az Android'in açık test kanalında olmak.

## 1. Kararlar (bu oturumda verildi)

| Konu | Karar |
|---|---|
| Teknoloji | Kotlin + Compose Multiplatform (Android + iOS tek kod tabanı) |
| Repo | Yeni repo `burakztrk/forever-codex`, yerel `~/claudee/forever-codex` (public olması şart değil) |
| Sıra | Önce Android (kapalı test, sonra açık test), ardından iOS |
| Backend | Yok. Statik JSON (GitHub Pages) + FCM topic bildirimleri |
| Ücret | İlk sürüm ücretsiz ve reklamsız (Blizzard'ın tolere ettiği ticari olmayan alan) |
| Ad | Forever Codex (çalışma adı). Adda "WoW/Warcraft" yok; mağaza metninde "unofficial" uyarısı var |
| İkon | Henüz yok; özgün tasarım olacak (Blizzard logosu/görseli yok). Geçici olarak düz renk + "FC" monogram kullanılabilir |

## 2. Veri sözleşmesi (`/data/v1/`)

Taban adres: `https://foreverwow.app/data/v1/`. Tüm dosyalar `schema: 1` taşır. Alan **eklemek** geriye uyumludur; alan silinirse ya da anlamı değişirse `v2` yayınlanır.

| Dosya | İçerik |
|---|---|
| `manifest.json` | `schema`, `generatedAt`, `gameBuild`, `assetBase`, `iconUrl` (`…/icons/{icon}.jpg`), `files{}`, `counts{}`, `latestPost{slug,date,build}` |
| `glossary.json` | `entries[]`: `id`, `kind` (spell/talent/racial), `name`, `icon`, `class`, `races`, `school`, `tree`, `row`, `col`, `tier`, `maxRank`, `learnedAt`, `cost`, `costType`, `cast`, `range`, `cooldown`, `desc`, `descTr`, `status`, `change`, `changeTr`, `ranks[]`, `ranksTr[]`, `requires`, `tierPoints`, `sourceUrl` |
| `classes.json` | `classes[]`: `id`, `name`, `icon`, `trees[]`, `treeIcons[]`, `spells[]`, `talents[]` (glossary id'leri) |
| `races.json` | `races[]`: `id`, `name`, `faction`, `icon`, `classes[]`, `racials[]` |
| `posts.json` | `posts[]`: `id`, `lang`, `slug`, `title`, `date`, `build`, `excerpt`, `tags`, `sources`, `url`, `html`, `glossaryIds[]` |

**Kullanım kuralları:**

- **Önbellek:** Açılışta `manifest.json` okunur. `generatedAt` değişmemişse diğer dosyalar diskteki kopyadan kullanılır (offline-first). Pages ETag desteklediği için `If-None-Match` de kullanılabilir.
- **Yazı HTML'i:** İzin verilen etiketler `h2`, `h3`, `p`, `ul`, `li`, `strong`, `em`, `a`, `blockquote`, `code`, `img`.
  - Tooltip'ler `<span class="wf-tip wf-tip--spell" data-tip="<glossary id>">` biçimindedir; içinde 18px ikon ve metin bulunur.
  - Göreli `src` ve `href` değerleri `assetBase` ile çözülür.
  - Öneri: HTML'i küçük bir ayrıştırıcıyla Compose `AnnotatedString` + blok listesine çevir. WebView kullanma.
- **Dil seçimi:**
  - Yazılar `lang` alanına göre filtrelenir.
  - Tooltip açıklaması TR'de `descTr` varsa onu, yoksa `desc` alanını kullanır.
  - Rank metni TR'de `ranksTr[i]` boş değilse onu, yoksa `ranks[i]` alanını kullanır.
  - Oyun adları her iki dilde de İngilizce kalır.
- **Talent kuralları:** `src/lib/talent-rules.ts` dosyası Kotlin'e birebir taşınır. Kurallar:
  1. Bir talent'ın açılması için aynı ağacın alt satırlarında `tierPoints` kadar puan gerekir.
  2. `requires` alanı varsa ön koşul talent'ın tam doldurulmuş olması gerekir.
  3. Toplam puan sınırı 51; gereken seviye `9 + puan` formülüyle hesaplanır.
  4. Kuralı bozacak puan çıkarma işlemine izin verilmez.
- **Paylaşım kodu:** Web ile aynı format (`#b=<ağaç1>-<ağaç2>-<ağaç3>`). Her talent için tek hane; sıralama ağaç, satır, sütun; sondaki sıfırlar atılır. Test vektörleri `tests/talent-rules.test.ts` dosyasında; aynı vektörleri Kotlin testlerine kopyala.

## 3. Özellikler (MVP)

1. **Notlar:** Akış (tarih, build, özet), detay ekranı, tooltip'e dokununca bottom sheet (ikon, chip'ler, açıklama, durum rozeti, kaynak linki). Dil, cihaz dilinden gelir ve ayarlardan değiştirilebilir.
2. **Talent planlayıcı:**
   - Class listesi web'deki kartlar gibi olur (ikon, talent ve yeni sayıları).
   - Ekranda 3 ağaç bulunur; mobilde yatay pager ya da sekmeler.
   - Dokunma puan ekler, kırmızı − puan çıkarır, uzun basma tooltip açar.
   - Paylaş butonu web linki üretir.
   - **App Links:** `https://foreverwow.app/*/talents/*` uygulamada açılır. Pages'e `.well-known/assetlinks.json` eklemek gerekir (site reposunda küçük bir iş).
3. **Irklar:** Faction'a göre ırk listesi. Irk seçilince racial'ları ve seçilebilecek class'ları gösterir (WoW karakter yaratma ekranı hissi).
4. **Class'lar:** Ağaca (`school`) göre gruplanmış spell listesi ve tooltip'ler; talent planlayıcıya kısayol.
5. **Ayarlar:** Dil; bildirim konuları (genel patch notları ve isteğe bağlı class bazlı); veri kaynakları ve "unofficial" uyarısı; gizlilik politikası linki.

## 4. Bildirimler

- **Firebase projesi:** `forever-codex`. Android uygulaması `com.booapps.forevercodex`. iOS için APNs anahtarı gerekir (Apple Developer hesabı).
- **Konular:** `notes-tr` ve `notes-en`. Opsiyonel olarak `notes-<lang>-<class>`.
- **Tetikleyici:** Site reposuna yeni bir GitHub Action eklenir. `main`'e gelen push'ta `src/content/blog/**` altında yeni bir dosya varsa FCM HTTP v1 ile topic mesajı gönderir (başlık, özet, derin link).
  - `NO_UPDATES` günlerinde yazı ve push olmadığı için bildirim de gitmez; bu kullanıcı kuralıyla uyumlu.
- **Secret:** `gha:FCM_SERVICE_ACCOUNT_JSON` (yalnızca adı; değeri kullanıcı GitHub → Settings → Secrets and variables → Actions altına kendisi ekler, sohbete yazılmaz).
- **Uygulama tarafı:** İlk açılışta bildirim izni istenir (Android 13+ ve iOS). Topic aboneliği ayarlardan yönetilir. Hesap yok; gizlilik formunda yalnızca FCM token beyan edilir.

## 5. Mimari

```
shared/
  data/      Ktor client, kotlinx.serialization DTO'ları, disk önbelleği (Okio), repository'ler
  domain/    TalentRules (talent-rules.ts'in Kotlin karşılığı), BuildCode, Glossary lookup
  ui/        Compose ekranları, tema (sitenin renkleri: zemin #0e1015, panel #161922, altın #c8a656, metin #e8e2d0), tooltip bottom sheet
androidApp/  FCM, App Links, uygulama ikonu (adaptive icon; tasarım açık iş)
iosApp/      APNs/FCM, uygulama ikonu (1024×1024)
```

- **Kütüphaneler:** Ktor, kotlinx.serialization, Coil 3 (ikonlar), Navigation Compose, Koin (veya elle DI), Okio.
- **Testler:**
  - `TalentRules` ve `BuildCode` için web'deki test vektörleri.
  - HTML → blok dönüştürücü için `posts.json`'dan alınmış bir örnek fixture.
  - Repository için önbellek ve manifest senaryoları.

## 6. Fazlar ve tahmini süreler

| # | Faz | Bitti kriteri | Süre |
|---|---|---|---|
| M1 | Repo iskeleti, tema, geçici ikon, veri katmanı ve önbellek | Uygulama `manifest`'i okuyor, offline açılıyor | ~0,5 gün |
| M2 | Notlar akışı, detay, tooltip bottom sheet, TR/EN | 15 Ekim yazısı tooltip'leriyle okunuyor | ~1 gün |
| M3 | Talent planlayıcı, paylaşım kodu, App Links | Web'deki bir build linki uygulamada aynı build'i açıyor | ~1,5 gün |
| M4 | Irk ve class ekranları | Human → racial'lar ve seçilebilen class'lar görünüyor | ~0,5 gün |
| M5 | FCM, site reposuna Action, ayarlar | Yeni yazı merge'ünde test cihazına push düşüyor | ~0,5 gün + kullanıcı adımları |
| M6 | Play mağaza kaydı, gizlilik sayfası, kapalı ve açık test | Play'de açık test linki var | ~0,5 gün + inceleme süresi |
| M7 | iOS: APNs, TestFlight, App Store | TestFlight build'i hazır | ~1 gün + inceleme süresi |

## 7. Kullanıcıdan gerekenler

1. Firebase projesi oluşturmak ve service account JSON'unu GitHub Actions secret'ı olarak eklemek (değer sohbete yazılmaz).
2. Google Play Console'da yeni uygulama kaydı (mevcut geliştirici hesabı).
3. iOS için Apple Developer hesabı (yıllık 99 $) ve APNs anahtarı.
4. **Uygulama ikonu:** özgün tasarım (1024×1024 App Store, 512×512 Play, Android adaptive foreground 66dp güvenli alan içinde). Kullanıcı karar verecek; M6'dan önce hazır olmalı.
5. **Skill ikonları kararı:** MVP'de ikonlar siteden yüklenecek (Blizzard varlıkları; risk orta-yüksek). Alternatif, okul rengine göre sade ikonlar. Mağaza ekran görüntülerinde Blizzard ikonu kullanılmaz.

## 8. Mağaza uyumluluğu kontrol listesi

- [ ] Adda ve ikonda "WoW", "Warcraft", Blizzard logosu ya da Blizzard görseli yok.
- [ ] Açıklamanın sonunda "Unofficial fan-made companion. Not affiliated with or endorsed by Blizzard Entertainment…" uyarısı var.
- [ ] Veri kaynakları atfı var: wclbox ("新手盒子·魔兽世界无限数据库" + link), WoW Forever Tools, Blizzard Forums.
- [ ] Gizlilik politikası sayfası var (site reposuna `/privacy/` olarak eklenecek: hesap yok, yalnızca FCM token).
- [ ] Data safety / App Privacy formu yalnızca cihaz tanımlayıcısını (FCM) beyan ediyor.
- [ ] Reklam ve uygulama içi satın alma yok (v1).

## 9. Site reposunda yapılacak küçük işler

Mobil oturum bu işleri ayrı PR'larla site reposunda (`~/claudee/wow-forever-notes`) yapabilir:

- `public/.well-known/assetlinks.json` (App Links; Play imza SHA-256 değeri gerekir).
- `/tr/privacy/` ve `/en/privacy/` sayfaları.
- `.github/workflows/notify.yml` (FCM topic push).
