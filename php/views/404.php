<?php
/**
 * HesapKutu - PHP 404 Sayfa Bulunamadı
 */
http_response_code(404);
$page_title = 'Sayfa Bulunamadı (404) | HesapKutu';
$page_desc = 'Aradığınız hesaplama aracını bulamadık.';

require __DIR__ . '/../includes/header.php';
?>

<div class="max-w-xl mx-auto py-16 text-center space-y-6">
    <span class="text-5xl font-black text-slate-300">404</span>
    <h1 class="text-2xl sm:text-3xl font-black text-slate-900">Aradığınız hesaplama aracını bulamadık.</h1>
    <p class="text-sm text-slate-500">Sayfa taşınmış veya adresi değişmiş olabilir.</p>

    <div class="pt-4">
        <a href="/" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs inline-block">
            Ana Sayfaya Dön
        </a>
    </div>
</div>

<?php require __DIR__ . '/../includes/footer.php'; ?>
