<?php
/**
 * HesapKutu - PHP Kurumsal Sayfalar
 */

$titles = [
    'hakkimizda' => ['title' => 'Hakkımızda', 'desc' => 'HesapKutu vizyonumuz ve sunduğumuz araçlar.'],
    'gizlilik-politikasi' => ['title' => 'Gizlilik Politikası', 'desc' => 'Kullanıcı gizliliği ve veri güvenliği ilkelerimiz.'],
    'kullanim-kosullari' => ['title' => 'Kullanım Koşulları', 'desc' => 'Genel kullanım şartları ve yasal bilgilendirme.'],
    'cerez-politikasi' => ['title' => 'Çerez Politikası', 'desc' => 'Çerezlerin kullanım amaçları ve tercihler.'],
    'iletisim' => ['title' => 'İletişim & Destek', 'desc' => 'Öneri ve geri bildirimleriniz için bize ulaşın.']
];

$info = $titles[$route] ?? ['title' => 'Bilgilendirme', 'desc' => ''];
$page_title = $info['title'] . ' | HesapKutu';
$page_desc = $info['desc'];

require __DIR__ . '/../includes/header.php';
?>

<div class="max-w-3xl mx-auto py-8 space-y-6 pb-16">
    <div class="bg-white rounded-2xl border border-slate-200 p-8 space-y-4">
        <h1 class="text-2xl font-black text-slate-900 border-b pb-4"><?= htmlspecialchars($info['title']) ?></h1>
        
        <?php if ($route === 'iletisim'): ?>
        <form class="space-y-4 text-xs" onsubmit="event.preventDefault(); alert('Mesajınız başarıyla iletildi!');">
            <div>
                <label class="block font-semibold mb-1">Adınız Soyadınız</label>
                <input type="text" required class="w-full p-2.5 border rounded-lg">
            </div>
            <div>
                <label class="block font-semibold mb-1">E-Posta Adresiniz</label>
                <input type="email" required class="w-full p-2.5 border rounded-lg">
            </div>
            <div>
                <label class="block font-semibold mb-1">Mesajınız</label>
                <textarea rows="4" required class="w-full p-2.5 border rounded-lg"></textarea>
            </div>
            <button type="submit" class="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-lg">Gönder</button>
        </form>
        <?php else: ?>
        <div class="space-y-3 text-sm text-slate-600 leading-relaxed">
            <p>HesapKutu, karmaşık finansal, ticari ve matematiksel hesaplamaları herkes için sadeleştirmek ve hatasız hale getirmek amacıyla geliştirilmiş çevrimiçi bir platformdur.</p>
            <p>Kullanıcılarımızın girdiği hiçbir sayısal tutar veya hesaplama verisi harici sunucularda saklanmaz; hesaplamalar doğrudan tarayıcınızda istemci taraflı gerçekleşir.</p>
            <p>Sorularınız veya iş birliği talepleriniz için lütfen <a href="/iletisim" class="text-blue-600 underline">iletişim sayfamızı</a> ziyaret ediniz.</p>
        </div>
        <?php endif; ?>
    </div>
</div>

<?php require __DIR__ . '/../includes/footer.php'; ?>
