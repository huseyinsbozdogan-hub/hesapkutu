<?php
// Ana Sayfa Görünümü
$page_title = 'HesapKutu – Ücretsiz Çevrimiçi Hesaplama Araçları';
$page_desc = 'Yüzde, KDV, kâr marjı, iskonto, metrekare, yakıt, hisse maliyet ve yapay zeka destekli tüm hesaplamalarınızı anında yapın.';

$selected_category = $_GET['kategori'] ?? 'all';
$search_q = trim($_GET['q'] ?? '');

$tools = array_filter($CALCULATORS, function($calc) use ($selected_category, $search_q) {
    if ($selected_category !== 'all' && $calc['category_slug'] !== $selected_category) {
        return false;
    }
    if (!empty($search_q)) {
        return stripos($calc['title'], $search_q) !== false || stripos($calc['short_description'], $search_q) !== false;
    }
    return true;
});

require __DIR__ . '/../includes/header.php';
?>

<div class="space-y-10 pb-16">
    <!-- Hero Banner -->
    <section class="text-center pt-8 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-blue-50/60 to-transparent rounded-3xl border border-slate-200/60 px-4 sm:px-8">
        <div class="max-w-3xl mx-auto space-y-4">
            <span class="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
                Türkiye'nin Pratik Hesaplama Platformu (PHP Sürümü)
            </span>
            <h1 class="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Hesaplamalarınızı <span class="text-blue-600">Saniyeler İçinde</span> Yapın
            </h1>
            <p class="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
                Finans, ticaret, inşaat ve günlük hayat için tasarlanmış bağımsız hesaplama araçları.
            </p>
        </div>
    </section>

    <!-- AdSense Top Leaderboard -->
    <?= render_ad_banner('home-top') ?>

    <!-- Category Filter Tabs -->
    <div class="flex items-center justify-between flex-wrap gap-3">
        <h2 class="text-xl font-bold text-slate-900">Hesaplama Araçları</h2>
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1">
            <a href="/" class="px-3.5 py-1.5 rounded-lg text-xs font-semibold <?= $selected_category === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200' ?>">
                Tümü
            </a>
            <?php foreach ($CATEGORIES as $slug => $cat): ?>
            <a href="/?kategori=<?= $slug ?>" class="px-3.5 py-1.5 rounded-lg text-xs font-semibold <?= $selected_category === $slug ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200' ?>">
                <?= htmlspecialchars($cat['name']) ?>
            </a>
            <?php endforeach; ?>
        </div>
    </div>

    <!-- Calculators Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <?php foreach ($tools as $slug => $tool): ?>
        <a href="/<?= $slug ?>" class="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
                <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    <?= htmlspecialchars($tool['category']) ?>
                </span>
                <h3 class="font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors mt-1">
                    <?= htmlspecialchars($tool['title']) ?>
                </h3>
                <p class="text-xs text-slate-500 mt-1 line-clamp-2">
                    <?= htmlspecialchars($tool['short_description']) ?>
                </p>
            </div>
            <div class="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold">
                <span>Hesapla</span>
                <span>→</span>
            </div>
        </a>
        <?php endforeach; ?>
    </div>

    <!-- AdSense Mid Content -->
    <?= render_ad_rectangle('home-mid') ?>
</div>

<?php require __DIR__ . '/../includes/footer.php'; ?>
