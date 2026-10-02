<?php
/**
 * HesapKutu - PHP Yönetici Paneli
 */
$page_title = 'Yönetici Paneli | HesapKutu';
$page_desc = 'Sistem ayarları ve hesaplama araçları yönetimi.';

$is_admin = !empty($_SESSION['is_admin']);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['password'])) {
    if ($_POST['password'] === ADMIN_PASSWORD) {
        $_SESSION['is_admin'] = true;
        $is_admin = true;
    } else {
        $error = 'Hatalı yönetici şifresi!';
    }
}

if (isset($_GET['logout'])) {
    unset($_SESSION['is_admin']);
    $is_admin = false;
}

require __DIR__ . '/../includes/header.php';
?>

<div class="max-w-4xl mx-auto space-y-6 pb-16">
    <?php if (!$is_admin): ?>
    <div class="max-w-sm mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-xl space-y-4 text-center">
        <h1 class="text-xl font-bold text-slate-900">Yönetici Girişi</h1>
        <p class="text-xs text-slate-500">HesapKutu PHP yönetim paneline erişmek için şifrenizi girin.</p>
        
        <?php if (!empty($error)): ?>
        <div class="p-2 bg-rose-50 text-rose-600 text-xs rounded-lg font-medium"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>

        <form method="POST" class="space-y-3 text-left">
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Şifre</label>
                <input type="password" name="password" placeholder="••••••••" class="w-full p-2.5 text-sm border rounded-xl" required>
                <span class="text-[11px] text-slate-400">Varsayılan: admin123</span>
            </div>
            <button type="submit" class="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs">
                Giriş Yap
            </button>
        </form>
    </div>

    <?php else: ?>
    <div class="bg-purple-900 text-white p-6 rounded-2xl flex justify-between items-center">
        <div>
            <h1 class="text-xl font-bold">HesapKutu PHP Yönetici Paneli</h1>
            <p class="text-xs text-purple-200">12 Hesaplama aracını ve SEO başlıklarını buradan izleyebilirsiniz.</p>
        </div>
        <a href="/admin?logout=1" class="px-3 py-1.5 bg-purple-800 hover:bg-purple-700 text-xs rounded-lg font-semibold">Çıkış</a>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
        <?php foreach ($CALCULATORS as $slug => $c): ?>
        <div class="p-4 flex items-center justify-between text-xs hover:bg-slate-50">
            <div>
                <span class="font-bold text-slate-900 text-sm"><?= htmlspecialchars($c['title']) ?></span>
                <span class="text-slate-400 font-mono ml-2">/<?= $slug ?></span>
                <p class="text-slate-500 mt-0.5 line-clamp-1"><?= htmlspecialchars($c['seo_title']) ?></p>
            </div>
            <div class="flex items-center gap-2">
                <span class="px-2 py-1 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]">Aktif</span>
                <a href="/<?= $slug ?>" target="_blank" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded font-semibold text-slate-700">Görüntüle</a>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
    <?php endif; ?>
</div>

<?php require __DIR__ . '/../includes/footer.php'; ?>
