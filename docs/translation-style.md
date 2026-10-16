# Tooltip çeviri rehberi (EN → TR)

`npm run sync` ve `npm run translate` çevrilmemiş metinleri `.cache/translate-pending.json` dosyasına yazar.
Her kayıtta `key`, `en`, ve bağlam için `name`, `kind`, `class` alanları bulunur.

## Çeviri akışı

1. Çevirileri `{ "<key>": "<Türkçe metin>", … }` biçiminde bir JSON dosyasına yaz.
2. Dosyayı uygula:

   ```bash
   npm run translate -- --apply <dosya.json>
   ```

3. Çıktı `TRANSLATIONS_COMPLETE` olana kadar devam et.

Script her çeviride İngilizce metindeki **tüm sayıların** Türkçe metinde de bulunduğunu kontrol eder. Sayı kaybeden çeviri reddedilir. Sayıları değiştirme, yuvarlama ya da birleştirme.

## Kurallar

- **İngilizce kalanlar:** spell, talent, racial, item, NPC, class ve race adları. Örnekler: Arcane Missiles, Frostbolt, Mage, Night Elf.
- **İngilizce kalan stat adları:** Intellect, Spirit, Stamina, Strength, Agility, Attack Power, Spell Power, Spell Damage, Haste.
- **Büyü okulları:** İngilizce sıfat ve Türkçe isim birlikte kullanılır: "Arcane hasarı", "Frost hasarı", "Holy hasar".
- **Kaynaklar:** Mana → Mana, Rage → Öfke, Energy → Enerji, Health → can.
- **Terimler:**

  | İngilizce | Türkçe |
  |---|---|
  | critical strike | kritik vuruş |
  | cooldown | bekleme süresi |
  | threat | tehdit |
  | stack | birikim ("en fazla 5 kez birikir") |
  | proc / trigger | tetiklenir |
  | channel | kanal / kanallamak |
  | cast | cast (fiil: "cast etmek") |
  | interrupt | kesinti |
  | absorb | emer |
  | heal | iyileştirir |

  "buff" ve "debuff" olduğu gibi kalır.

- **Birimler ve ondalık:** "seconds" → saniye, "minutes" → dakika, "yards" → yard. Ondalık ayırıcı virgüldür: 1,5 saniye.
- **Üslup:** Tooltip tarzında, geniş zamanla yaz: "… hasar verir.", "… %20 azaltır." Kısa ve net ol, açıklama ekleme. Kaynakta olmayan bilgi yazma.
- **Bozuk kaynak metin:** Kaynaktaki İngilizce bozuk görünüyorsa (makine çevirisi) anlamı koruyarak düzgün Türkçe yaz. Yeni bilgi ekleme.
- **`change` metinleri:** Değişiklik notlarında ("Rank 8:Value: 209 (Classic Era: 230)") yapıyı Türkçeleştir: "Rank 8: Değer 209 (Classic Era: 230)".
