<?php
/**
 * HesapKutu - PHP Yapılandırma Dosyası
 */

// Hata Raporlama (Geliştirme için E_ALL, Canlıda 0 yapınız)
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Oturum Başlatma
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Site Temel Ayarları
define('SITE_NAME', 'HesapKutu');
define('SITE_URL', (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://" . ($_SERVER['HTTP_HOST'] ?? 'localhost'));

// Gemini API Anahtarı (Doğal dil yapay zeka hesaplaması için)
// Google AI Studio'dan aldığınız API anahtarını buraya girin:
define('GEMINI_API_KEY', getenv('GEMINI_API_KEY') ?: 'YOUR_GEMINI_API_KEY_HERE');

// Google AdSense Yayıncı Kimliği (Örn: ca-pub-1234567890123456)
// Boş bırakılırsa geliştirme placeholder kutuları gösterilir.
define('ADSENSE_PUB_ID', getenv('ADSENSE_PUB_ID') ?: '');

// Google Analytics 4 Ölçüm Kimliği (Örn: G-XXXXXXXXXX)
define('GA_MEASUREMENT_ID', getenv('GA_MEASUREMENT_ID') ?: '');

// Yönetici Şifresi (/admin girişi için)
define('ADMIN_PASSWORD', 'admin123');

// Veritabanı Yolu (SQLite - Kurulum gerektirmeden çalışır)
define('DB_FILE', __DIR__ . '/data/hesapkutu.sqlite');

// Dizin oluşturma
if (!file_exists(__DIR__ . '/data')) {
    @mkdir(__DIR__ . '/data', 0755, true);
}
