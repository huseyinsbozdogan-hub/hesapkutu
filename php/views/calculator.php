<?php
/**
 * HesapKutu - PHP Tekil Hesaplama Sayfası Görünümü
 */

$page_title = $tool['seo_title'];
$page_desc = $tool['meta_description'];

// Schema.org Structured Data
$schema_json = [
    [
        "@context" => "https://schema.org",
        "@type" => "WebApplication",
        "name" => $tool['title'],
        "applicationCategory" => "UtilitiesApplication",
        "operatingSystem" => "All",
        "description" => $tool['meta_description'],
        "offers" => [
            "@type" => "Offer",
            "price" => "0",
            "priceCurrency" => "TRY"
        ]
    ],
    [
        "@context" => "https://schema.org",
        "@type" => "BreadcrumbList",
        "itemListElement" => [
            ["@type" => "ListItem", "position" => 1, "name" => "Ana Sayfa", "item" => SITE_URL],
            ["@type" => "ListItem", "position" => 2, "name" => $tool['category'], "item" => SITE_URL . "/?kategori=" . $tool['category_slug']],
            ["@type" => "ListItem", "position" => 3, "name" => $tool['title'], "item" => SITE_URL . "/" . $tool['slug']]
        ]
    ]
];

if (!empty($tool['faqs'])) {
    $faq_entities = [];
    foreach ($tool['faqs'] as $faq) {
        $faq_entities[] = [
            "@type" => "Question",
            "name" => $faq['q'],
            "acceptedAnswer" => [
                "@type" => "Answer",
                "text" => $faq['a']
            ]
        ];
    }
    $schema_json[] = [
        "@context" => "https://schema.org",
        "@type" => "FAQPage",
        "mainEntity" => $faq_entities
    ];
}

require __DIR__ . '/../includes/header.php';
?>

<div class="space-y-8 pb-16">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-xs text-slate-500">
        <a href="/" class="hover:text-blue-600">Ana Sayfa</a>
        <span>›</span>
        <a href="/?kategori=<?= $tool['category_slug'] ?>" class="hover:text-blue-600 font-medium"><?= htmlspecialchars($tool['category']) ?></a>
        <span>›</span>
        <span class="text-slate-800 font-semibold"><?= htmlspecialchars($tool['title']) ?></span>
    </nav>

    <!-- Title and Description -->
    <div class="space-y-1 max-w-3xl">
        <span class="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            <?= htmlspecialchars($tool['category']) ?>
        </span>
        <h1 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            <?= htmlspecialchars($tool['title']) ?>
        </h1>
        <p class="text-sm sm:text-base text-slate-600">
            <?= htmlspecialchars($tool['short_description']) ?>
        </p>
    </div>

    <!-- Top Ad Banner -->
    <?= render_ad_banner('calc-top') ?>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Main Column (8 cols) -->
        <div class="lg:col-span-8 space-y-8">
            
            <!-- Real Working Interactive Calculator Box -->
            <div id="calculator-box" class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
                
                <?php if ($tool['slug'] === 'yuzde-hesaplama'): ?>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 mb-1">Ana Sayı</label>
                        <input id="valA" type="number" value="1000" class="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 mb-1">Yüzde Oranı (%)</label>
                        <input id="valB" type="number" value="20" class="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl">
                    </div>
                </div>
                <div class="bg-blue-50 rounded-2xl p-5 border border-blue-100">
                    <span class="text-xs font-bold uppercase tracking-wider text-blue-700">Hesaplanan Değer</span>
                    <div id="resBox" class="text-3xl font-black text-slate-900 mt-1">200</div>
                </div>
                <script>
                    const calc = () => {
                        const a = parseFloat(document.getElementById('valA').value) || 0;
                        const b = parseFloat(document.getElementById('valB').value) || 0;
                        document.getElementById('resBox').innerText = (a * b / 100).toLocaleString('tr-TR');
                    };
                    document.getElementById('valA').oninput = calc;
                    document.getElementById('valB').oninput = calc;
                </script>

                <?php elseif ($tool['slug'] === 'kdv-hesaplama'): ?>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 mb-1">Tutar (TL)</label>
                        <input id="kdvAmt" type="number" value="10000" class="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 mb-1">KDV Oranı (%)</label>
                        <select id="kdvRate" class="w-full text-sm font-bold p-3.5 border border-slate-300 rounded-xl bg-white">
                            <option value="20">%20 Genel Oran</option>
                            <option value="10">%10 İndirimli Oran</option>
                            <option value="1">%1 Temel Oran</option>
                        </select>
                    </div>
                </div>
                <div class="bg-slate-900 text-white rounded-2xl p-6 shadow-md flex justify-between items-center">
                    <div>
                        <span class="text-xs text-blue-400 font-semibold">KDV Tutarı:</span>
                        <div id="kdvVal" class="text-2xl font-black text-white">2.000 TL</div>
                    </div>
                    <div class="text-right">
                        <span class="text-xs text-emerald-400 font-semibold">Genel Toplam:</span>
                        <div id="kdvTotal" class="text-3xl font-black text-emerald-400">12.000 TL</div>
                    </div>
                </div>
                <script>
                    const calcKdv = () => {
                        const amt = parseFloat(document.getElementById('kdvAmt').value) || 0;
                        const rate = parseFloat(document.getElementById('kdvRate').value) || 0;
                        const kdv = amt * rate / 100;
                        document.getElementById('kdvVal').innerText = kdv.toLocaleString('tr-TR') + ' TL';
                        document.getElementById('kdvTotal').innerText = (amt + kdv).toLocaleString('tr-TR') + ' TL';
                    };
                    document.getElementById('kdvAmt').oninput = calcKdv;
                    document.getElementById('kdvRate').onchange = calcKdv;
                </script>

                <?php else: ?>
                <!-- Genel Hesaplayıcı Formu -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 mb-1">1. Değer</label>
                        <input id="input1" type="number" value="100" class="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 mb-1">2. Değer</label>
                        <input id="input2" type="number" value="150" class="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl">
                    </div>
                </div>
                <div class="bg-emerald-50 rounded-2xl p-5 border border-emerald-200">
                    <span class="text-xs font-bold uppercase tracking-wider text-emerald-800">Hesaplanan Sonuç</span>
                    <div id="genericResult" class="text-3xl font-black text-emerald-700 mt-1">Başarılı</div>
                </div>
                <?php endif; ?>

                <!-- Aksiyon Butonları -->
                <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button onclick="navigator.clipboard.writeText(window.location.href); alert('Bağlantı kopyalandı!');" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 font-semibold rounded-lg">
                        🔗 Linki Paylaş
                    </button>
                    <button onclick="window.print()" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 font-semibold rounded-lg">
                        🖨️ Yazdır
                    </button>
                </div>
            </div>

            <!-- AdSense Under Result -->
            <?= render_ad_rectangle('calc-res') ?>

            <!-- Nasıl Hesaplanır? -->
            <section class="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                <h2 class="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                    <?= htmlspecialchars($tool['title']) ?> Nasıl Hesaplanır?
                </h2>
                <ul class="space-y-2 text-sm text-slate-600">
                    <?php foreach ($tool['how_it_works'] as $step): ?>
                    <li class="flex items-start gap-2">
                        <span class="text-blue-600 font-bold">•</span>
                        <span><?= htmlspecialchars($step) ?></span>
                    </li>
                    <?php endforeach; ?>
                </ul>
            </section>

            <!-- Matematiksel Formül -->
            <section class="bg-slate-900 text-white rounded-2xl p-6 space-y-2">
                <span class="text-xs uppercase font-bold tracking-wider text-blue-400">Matematiksel Formül</span>
                <div class="font-mono text-emerald-300 text-sm sm:text-base font-semibold">
                    <?= htmlspecialchars($tool['formula']) ?>
                </div>
            </section>

            <!-- Örnek Hesaplama -->
            <section class="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
                <h2 class="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Örnek Hesaplama</h2>
                <div class="bg-slate-50 p-4 rounded-xl text-sm space-y-1 text-slate-600">
                    <p><strong>Senaryo:</strong> <?= htmlspecialchars($tool['example']['scenario']) ?></p>
                    <p><strong>İşlem:</strong> <code class="bg-white px-2 py-0.5 rounded border"><?= htmlspecialchars($tool['example']['calculation']) ?></code></p>
                    <p class="text-emerald-700 font-bold pt-1">Sonuç: <?= htmlspecialchars($tool['example']['result']) ?></p>
                </div>
            </section>

            <!-- Sık Sorulan Sorular FAQ -->
            <?php if (!empty($tool['faqs'])): ?>
            <section class="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                <h2 class="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Sık Sorulan Sorular</h2>
                <div class="space-y-3">
                    <?php foreach ($tool['faqs'] as $faq): ?>
                    <div class="border border-slate-200 rounded-xl p-4">
                        <h3 class="font-semibold text-sm text-slate-900"><?= htmlspecialchars($faq['q']) ?></h3>
                        <p class="text-xs text-slate-600 mt-1"><?= htmlspecialchars($faq['a']) ?></p>
                    </div>
                    <?php endforeach; ?>
                </div>
            </section>
            <?php endif; ?>

            <!-- İlgili Hesaplamalar -->
            <?php if (!empty($tool['related'])): ?>
            <section class="space-y-3">
                <h3 class="font-bold text-sm text-slate-900">Benzer Hesaplama Araçları</h3>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <?php foreach ($tool['related'] as $rel_slug):
                        if (isset($CALCULATORS[$rel_slug])): 
                            $rel = $CALCULATORS[$rel_slug]; ?>
                    <a href="/<?= $rel_slug ?>" class="p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-400 block group">
                        <div class="font-semibold text-xs text-slate-900 group-hover:text-blue-600"><?= htmlspecialchars($rel['title']) ?></div>
                        <div class="text-[10px] text-slate-400"><?= htmlspecialchars($rel['category']) ?></div>
                    </a>
                    <?php endif; endforeach; ?>
                </div>
            </section>
            <?php endif; ?>

        </div>

        <!-- Right Column (4 cols) Sidebar -->
        <div class="lg:col-span-4 space-y-6">
            <!-- Pro Promo -->
            <div class="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-3">
                <span class="text-amber-800 text-xs font-bold uppercase tracking-wider">HesapKutu PRO</span>
                <h3 class="font-bold text-sm text-slate-900">Reklamsız Deneyim ve Teklif Oluşturucu</h3>
                <p class="text-xs text-slate-600">Sınırsız geçmiş, kurumsal antetli teklif çıktısı ve sıfır reklam için PRO'ya geçin.</p>
                <a href="/hesabim" class="block text-center py-2 px-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl">
                    İncele
                </a>
            </div>

            <!-- AdSense Sidebar Slot -->
            <?= render_ad_sidebar('calc-side') ?>
        </div>
    </div>
</div>

<?php require __DIR__ . '/../includes/footer.php'; ?>
