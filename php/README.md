# HesapKutu - Tam PHP Sürümü Kurulum Kılavuzu

Bu dizindeki dosyalar, HesapKutu uygulamasının standart herhangi bir PHP hosting (cPanel, Plesk, DirectAdmin, Apache, Nginx, LiteSpeed) üzerinde doğrudan çalışması için hazırlanmış bağımsız PHP sürümüdür.

## Özellikler
- **Saf PHP + Tailwind CSS:** Hiçbir derleme (npm build / node) gerektirmez. Dosyaları sunucuya atmanız yeterlidir.
- **Tüm 12 Hesaplama Aracı:** Yüzde, KDV, kâr/zarar, kâr marjı, iskonto, metrekare, etiket yerleşim, yakıt, maaş zammı, hisse maliyet düşürme, bileşik getiri.
- **Otomatik SEO & Schema.org:** Her sayfada dinamik `<title>`, `<meta description>`, `canonical`, `og:title`, ve `WebApplication`, `BreadcrumbList`, `FAQPage` yapısal verisi.
- **Dinamik XML Site Haritası:** `/sitemap.xml` doğrudan Google Search Console için hazırdır.
- **Robots.txt:** İndekslenmesi istenmeyen sayfalar (`/admin`, `/hesabim` vb.) engellenmiştir.
- **Google AdSense Altyapısı:** `config.php` içine `ADSENSE_PUB_ID` girildiğinde reklamlar otomatik yayınlanır.
- **Google Analytics 4:** `GA_MEASUREMENT_ID` tanımlandığında izleme kodu otomatik eklenir.
- **Teklif Oluşturucu:** A4 antetli, KDV ve iskontolu yazdırılabilir teklif çıktısı.
- **Gemini AI Entegrasyonu:** `config.php` içerisine `GEMINI_API_KEY` girildiğinde cURL üzerinden doğrudan çalışır.

---

## Kurulum Adımları (cPanel / Apache)

1. `/php` klasörünün içindeki tüm dosyaları (`.htaccess`, `index.php`, `config.php`, `includes/`, `views/`, vb.) hostinginizin `public_html` (veya sitenizin kök dizinine) yükleyin.
2. `config.php` dosyasını açıp ayarlarınızı düzenleyin:
   - `GEMINI_API_KEY`: Google AI Studio'dan aldığınız API anahtarı.
   - `ADSENSE_PUB_ID`: Google AdSense onayınız varsa yayıncı kimliğiniz (`ca-pub-XXXXXXXXXXXXXXXX`).
   - `GA_MEASUREMENT_ID`: Google Analytics 4 kodunuz (`G-XXXXXXXXXX`).
   - `ADMIN_PASSWORD`: Yönetici paneli şifreniz (varsayılan: `admin123`).
3. Sitenizi tarayıcıdan açın: `https://siteniz.com`

---

## Nginx Sunucu Yapılandırması (Opsiyonel)
Eğer Apache yerine Nginx kullanıyorsanız sunucu bloğunuza şunu ekleyin:

```nginx
location / {
    try_files $uri $uri/ /index.php?$query_string;
}

location = /sitemap.xml {
    rewrite ^ /sitemap.php last;
}
```
