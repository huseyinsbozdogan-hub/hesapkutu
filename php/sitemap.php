<?php
/**
 * HesapKutu - PHP Otomatik XML Site Haritası (Sitemap)
 */
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/includes/calculators.php';

header('Content-Type: application/xml; charset=utf-8');

$now = date('Y-m-d');
echo '<?xml version="1.0" encoding="UTF-8"?>';
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Ana Sayfa -->
    <url>
        <loc><?= htmlspecialchars(SITE_URL) ?>/</loc>
        <lastmod><?= $now ?></lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>

    <!-- 12 Hesaplama Sayfası -->
    <?php foreach ($CALCULATORS as $slug => $calc): ?>
    <url>
        <loc><?= htmlspecialchars(SITE_URL . '/' . $slug) ?></loc>
        <lastmod><?= $now ?></lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <?php endforeach; ?>

    <!-- Kurumsal Sayfalar -->
    <?php foreach (['hakkimizda', 'gizlilik-politikasi', 'kullanim-kosullari', 'cerez-politikasi', 'iletisim'] as $page): ?>
    <url>
        <loc><?= htmlspecialchars(SITE_URL . '/' . $page) ?></loc>
        <lastmod><?= $now ?></lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
    </url>
    <?php endforeach; ?>
</urlset>
