<?php
/**
 * HesapKutu - PHP Ana Router (Entry Point)
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/includes/calculators.php';
require_once __DIR__ . '/includes/ads.php';

// Temiz Rota Ayrıştırma
$request_uri = $_GET['route'] ?? '';
if (empty($request_uri)) {
    $parsed_path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
    $request_uri = trim($parsed_path, '/');
}

$route = trim($request_uri, '/');

// Rota Dağıtımı
if ($route === '' || $route === 'index.php') {
    require __DIR__ . '/views/home.php';
    exit;
}

if ($route === 'sitemap.xml') {
    require __DIR__ . '/sitemap.php';
    exit;
}

if ($route === 'api/calculate-ai') {
    require __DIR__ . '/api/calculate-ai.php';
    exit;
}

if ($route === 'teklif-olusturucu') {
    require __DIR__ . '/views/quote.php';
    exit;
}

if ($route === 'hesabim' || $route === 'account' || $route === 'history') {
    require __DIR__ . '/views/account.php';
    exit;
}

if ($route === 'admin') {
    require __DIR__ . '/views/admin.php';
    exit;
}

if (in_array($route, ['hakkimizda', 'gizlilik-politikasi', 'kullanim-kosullari', 'cerez-politikasi', 'iletisim'])) {
    require __DIR__ . '/views/legal.php';
    exit;
}

// Hesaplama araçları kontrolü
if (isset($CALCULATORS[$route])) {
    $tool = $CALCULATORS[$route];
    require __DIR__ . '/views/calculator.php';
    exit;
}

// Hiçbiri eşleşmezse 404
require __DIR__ . '/views/404.php';
