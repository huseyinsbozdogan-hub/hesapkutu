<?php
/**
 * HesapKutu - PHP Genel Header ve SEO
 */
$page_title = $page_title ?? 'HesapKutu – Ücretsiz Çevrimiçi Hesaplama Araçları';
$page_desc = $page_desc ?? 'Yüzde, KDV, kâr marjı, iskonto, metrekare, yakıt ve borsa hesaplamalarınızı anında yapın.';
$canonical_url = SITE_URL . ($_SERVER['REQUEST_URI'] ?? '/');
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($page_title) ?></title>
    <meta name="description" content="<?= htmlspecialchars($page_desc) ?>">
    <link rel="canonical" href="<?= htmlspecialchars($canonical_url) ?>">
    
    <!-- Open Graph & Twitter -->
    <meta property="og:title" content="<?= htmlspecialchars($page_title) ?>">
    <meta property="og:description" content="<?= htmlspecialchars($page_desc) ?>">
    <meta property="og:url" content="<?= htmlspecialchars($canonical_url) ?>">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="HesapKutu">
    <meta name="twitter:card" content="summary_large_image">
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232563eb' stroke-width='2'><rect width='16' height='20' x='4' y='2' rx='2'/><line x1='8' x2='16' y1='6' y2='6'/><line x1='16' x2='16' y1='14' y2='18'/></svg>">

    <?php if (!empty(ADSENSE_PUB_ID)): ?>
    <!-- Google AdSense Script -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=<?= htmlspecialchars(ADSENSE_PUB_ID) ?>" crossorigin="anonymous"></script>
    <?php endif; ?>

    <?php if (!empty(GA_MEASUREMENT_ID)): ?>
    <!-- Google Analytics 4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=<?= htmlspecialchars(GA_MEASUREMENT_ID) ?>"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '<?= htmlspecialchars(GA_MEASUREMENT_ID) ?>', { anonymize_ip: true });
    </script>
    <?php endif; ?>

    <!-- Schema.org JSON-LD Structured Data -->
    <?php if (!empty($schema_json)): ?>
    <script type="application/ld+json">
    <?= json_encode($schema_json, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) ?>
    </script>
    <?php endif; ?>
</head>
<body class="bg-slate-50 text-slate-900 font-sans antialiased min-h-screen flex flex-col">

    <!-- Header Navigation -->
    <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            
            <!-- Logo -->
            <a href="/" class="flex items-center gap-2.5 shrink-0 group select-none">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                </div>
                <div>
                    <span class="font-bold text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                        Hesap<span class="text-blue-600">Kutu</span>
                    </span>
                    <p class="text-[10px] text-slate-400 font-medium hidden sm:block -mt-1">PHP Sürümü</p>
                </div>
            </a>

            <!-- Quick Search Bar -->
            <div class="relative flex-1 max-w-md hidden md:block">
                <form action="/" method="GET" class="relative">
                    <input type="text" name="q" value="<?= htmlspecialchars($_GET['q'] ?? '') ?>" placeholder="Hesaplama ara... (kdv, kâr, yakıt, m²...)" class="w-full bg-slate-100 focus:bg-white text-sm rounded-full pl-10 pr-4 py-2 border border-slate-200 focus:border-blue-500 focus:outline-none">
                    <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </form>
            </div>

            <!-- Action buttons -->
            <div class="flex items-center gap-3">
                <a href="/teklif-olusturucu" class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors">
                    Teklif Oluşturucu (PRO)
                </a>
                <a href="/hesabim" class="flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                    <?= !empty($_SESSION['user']) ? htmlspecialchars($_SESSION['user']['name']) : 'Hesabım' ?>
                </a>
            </div>
        </div>
    </header>

    <!-- Main Body Container -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
