# SEO ve AI arama (Google AI Overviews / AI Mode)

Son gözden geçirme: 4 Kasım 2026. Kod: `src/lib/seo.ts`, `src/lib/breadcrumbs.ts`, `src/layouts/BaseLayout.astro`,
testler `tests/seo.test.ts`.

## Temel karar: AI için ayrı bir "hack" yok

Google'ın resmi rehberi (Mayıs 2026, [AI optimization guide][ai-guide]) açık:

- AI Overviews ve AI Mode, normal Search'ün sıralama ve kalite sistemleri üzerine kurulu. **AI için optimize etmek = SEO.**
- Görünmenin tek teknik şartı: sayfa **indekslenmiş ve snippet gösterilebilir** olmalı ([AI features][ai-features]).
- Google'ın "yok say" dediği taktikler: `llms.txt` ve benzeri özel dosyalar/Markdown kopyaları, içeriği küçük
  "chunk"lara bölmek, içeriği LLM için yeniden yazmak, sahte "mention" toplamak, AI için özel schema, AEO/GEO hileleri.
- Ağırlık: **özgün, emtia olmayan (non-commodity), ilk elden bilgi** içeren, okura yararlı içerik.

Bu yüzden `llms.txt` **eklenmedi**. Google kullanmıyor; başka bir motor için gerekirse ayrı karar.
(SEO-AEO-GEO Ultimate gibi topluluk araçları llms.txt + her sayfanın Markdown kopyasını öneriyor; bu Google'ın
resmi tavsiyesiyle çelişiyor, Google için faydası yok.)

## Bu sitenin AI aramada öne çıkma açısı

Bizim "non-commodity" içeriğimiz, başka sitede olmayanlar:

1. **Build başına Türkçe + İngilizce özet**, kaynak linkli, aynı gün. Türkçe WoW Forever içeriği neredeyse yok:
   en güçlü niş.
2. **Her büyü/talent için Forever'da ne değişti** (Classic'e göre yeni / değişti / aynı) ve rank değerleri.
3. Talent hesaplayıcı, Legacy hesaplayıcı, meslek rotaları: araç sayfaları (AI cevapları bunlara link verir, kopyalayamaz).

AI Overviews "query fan-out" ile birçok alt soru arar ("WoW Forever Mage talent değişiklikleri", "Tauren racial
WoW Forever"...). Her alt sorunun cevabı tek bir net sayfada, metin olarak durursa alıntılanma şansı artar.
Bunu sayfa üretmeden (scaled content abuse riski) mevcut class/ırk/istatistik sayfalarıyla karşılıyoruz.

## Yapılanlar (bu PR)

| Alan | Değişiklik |
|---|---|
| Başlıklar | Ana sayfa: "WoW Forever Yama Notları, Talent Hesaplayıcı ve Rehber". Liste, hikaye ve istatistik sayfalarında "WoW Forever" anahtar kelimesi. Site adı yalnızca 60 karaktere sığıyorsa eklenir. |
| Yazı başlıkları | Uzun başlıklı yazılara `seoTitle` (≤ 60). h1 aynı kalır. `check-content` 60'ı aşan başlıkta uyarır. |
| Açıklamalar | Ana sayfa ve liste sayfalarına 70–160 karakterlik açıklamalar; tüm açıklamalar 160'ta cümle/kelime sınırında kesilir. |
| Robots meta | `max-image-preview:large, max-snippet:-1, max-video-preview:-1`: büyük görsel önizleme (Discover) ve snippet uzunluğu sınırsız. |
| JSON-LD | Her sayfada tek `@graph`: `Organization` (sameAs: GitHub, Google Play) + `WebSite` (SearchAction) + sayfa düğümü (`WebPage` / `CollectionPage` / `AboutPage` / `BlogPosting`) + `BreadcrumbList`. Önceden sadece 20 sayfada vardı. |
| Yazılar | `BlogPosting`: `dateModified` (`updated` alanı), `version` (build), `about: VideoGame`. Sayfada "Güncellendi" tarihi ve excerpt lede olarak görünür. |
| Paylaşım görseli | Hikaye sayfaları kendi kapak görselini `og:image` olarak kullanır. |
| Sitemap | Yazılara ve ana/notlar sayfalarına gerçek `lastmod`. Diğer sayfalara sahte tarih verilmez. |
| RSS | `/tr/rss.xml`, `/en/rss.xml` (head'de `alternate`, footer'da link). |
| Güven (E-E-A-T) | `/tr/about/`, `/en/about/`: kim, kaynaklar, notların nasıl yazıldığı (AI yardımı açıkça), hata bildirimi. Footer'da About / Privacy / RSS. |
| Hız | Google Fonts CSS'i ilk boyamayı bloklamıyor (preload + swap). |
| Tazelik | Tagline'dan "beta" kalktı (oyun 4 Kasım'da çıktı). |
| IndexNow | Her deploy'dan sonra değişen yazılar + ana/notlar/RSS sayfaları Bing'e bildirilir (`scripts/indexnow.mjs`, deploy workflow'unun `indexnow` işi). Anahtar `public/<KEY>.txt`, gizli değil. Tüm sitemap'i bir kez göndermek için: Actions → Deploy to GitHub Pages → Run workflow → `indexnow_all`. |
| Görsel linkler | Ana sayfadaki kayan ırk/class ikonlarının alt metni ırk/class adı (sadece görselden oluşan link, Bing uyarısı). |

## Senin yapman gerekenler (elle, ~30 dk)

1. **Google Search Console** ([search.google.com/search-console][gsc]) — Domain property `foreverwow.app`
   (DNS sağlayıcına TXT kaydı; zaten doğruladıysan bu adımı atla). Sonra:
   - Sitemaps → `https://foreverwow.app/sitemap-index.xml` gönder.
   - URL Inspection → ana sayfa + son yazı → "Request indexing".
   - **Generative AI performance raporu**nu takip et (AI Overviews / AI Mode görünürlüğü).
   - Ayarlarda "Search generative AI features" dahil edilmesi açık olsun (rehber bunu öneriyor).
2. **Bing Webmaster Tools** ([bing.com/webmasters][bing]) — "Import from Google Search Console" ile tek tık.
   ChatGPT Search ve Copilot Bing indeksini kullanır.
3. **Rich Results Test** ([search.google.com/test/rich-results][rrt]) — bir yazı ve bir hikaye sayfasını test et
   (Article + Breadcrumb geçerli görünmeli).
4. **Backlink (otantik)**: WoW Forever Reddit/Discord topluluklarında, Blizzard forumunda talent hesaplayıcı ve
   Türkçe notları paylaş. Google "sahte mention"ı yok sayar ama gerçek kullanıcı linkleri sıralama sinyalidir.

## İçerik kuralları (scheduled job + elle yazılanlar)

- Başlık ≤ 60 karakter, ana anahtar kelime başta: "WoW Forever yama notları: <en önemli değişiklik>".
  Uzunsa `seoTitle`.
- Excerpt'in ilk 160 karakteri en önemli 2–3 değişikliği **adlarıyla** söylesin (snippet ve AI özeti buradan beslenir).
- Her bölüm kendi başına anlaşılır olsun: "X artık Y yapıyor (önce Z)". Sayılar metinde dursun (görselde değil).
- Kaynakta olmayanı yazma, kaynak metni kopyalama (mevcut kural). Bu aynı zamanda Google'ın
  [helpful content][helpful] ve [spam][spam] kuralları.
- Bir yazı sonradan düzeltilirse `updated: YYYY-MM-DD` ekle.
- Sorgu varyasyonları için ayrı ince sayfalar **üretme** (scaled content abuse).

## Ölçüm

- Search Console → Performance → Search type: Web (AI Overviews dahil) + Generative AI raporu.
- Cloudflare Web Analytics → referrer: `google.com`, `bing.com`, `chatgpt.com`, `perplexity.ai`.
- Aylık: en çok gösterim alan sorgular → o sorgunun cevabı sayfada net mi? Değilse içeriği güncelle.

## Takip edilecek kaynaklar

Öncelik sırasıyla. Resmi kaynaklar her zaman üçüncü taraf yorumlarından önce gelir.

**Resmi — Google (haftalık bak)**

| Kaynak | Ne için |
|---|---|
| [Google Search Central Blog][blog] | Yeni özellikler, rehberler (AI rehberi buradan duyuruldu) |
| [Search Central dokümantasyon güncellemeleri][updates] | Dokümanlarda neyin değiştiği (structured data, AI features) |
| [Google Search Status Dashboard][status] | Core update / spam update başlangıç-bitiş tarihleri, trafik düşüşlerini açıklar |
| [AI optimization guide][ai-guide] ve [AI features and your website][ai-features] | AI Overviews / AI Mode için tek doğru referans |
| [Creating helpful content][helpful] · [Spam policies][spam] | İçerik kalitesi kuralları |
| [Structured data gallery][sd-gallery] | Hangi rich result tipleri hâlâ destekleniyor |
| [Core Web Vitals][cwv] · [web.dev Vitals][webdev] | Sayfa deneyimi |
| Search Off the Record podcast, Google Search Central YouTube kanalı | Google ekibinden açıklamalar |

**Resmi — diğer motorlar / AI crawler'lar (ayda bir)**

| Kaynak | Ne için |
|---|---|
| [Bing Webmaster Blog][bing-blog] · [IndexNow][indexnow] | Bing / Copilot / ChatGPT Search indeksi |
| [OpenAI crawler'ları][openai-bots] | OAI-SearchBot (ChatGPT Search), GPTBot (eğitim) farkı |
| [Perplexity crawler'ları][pplx-bots] | PerplexityBot |

**Sektör haberleri (haftalık tarama)**

| Kaynak | Ne için |
|---|---|
| [Search Engine Roundtable][ser] | Google güncellemelerinin günlük takibi (Barry Schwartz) |
| [Search Engine Land][sel] · [Search Engine Journal][sej] | Haber + derin analiz |
| Google Search Liaison ve John Mueller'ın sosyal hesapları | Resmi açıklamaların ilk duyulduğu yer |

**Dikkat:** AEO/GEO "garanti" vaat eden araç ve rehberleri Google'ın resmi rehberiyle karşılaştır;
Google bunlara karşı açıkça uyarıyor ([AI optimization guide][ai-guide]).

[ai-guide]: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
[ai-features]: https://developers.google.com/search/docs/appearance/ai-features
[blog]: https://developers.google.com/search/blog
[updates]: https://developers.google.com/search/updates
[status]: https://status.search.google.com/
[helpful]: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
[spam]: https://developers.google.com/search/docs/essentials/spam-policies
[sd-gallery]: https://developers.google.com/search/docs/appearance/structured-data/search-gallery
[cwv]: https://developers.google.com/search/docs/appearance/core-web-vitals
[webdev]: https://web.dev/articles/vitals
[gsc]: https://search.google.com/search-console
[rrt]: https://search.google.com/test/rich-results
[bing]: https://www.bing.com/webmasters
[bing-blog]: https://blogs.bing.com/webmaster
[indexnow]: https://www.bing.com/indexnow
[openai-bots]: https://platform.openai.com/docs/bots
[pplx-bots]: https://docs.perplexity.ai/guides/bots
[ser]: https://www.seroundtable.com
[sel]: https://searchengineland.com
[sej]: https://www.searchenginejournal.com
