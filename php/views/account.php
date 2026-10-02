<?php
/**
 * HesapKutu - PHP Kullanıcı Paneli
 */
$page_title = 'Hesabım | HesapKutu';
$page_desc = 'Kullanıcı profili ve kaydedilmiş hesaplamalar.';

require __DIR__ . '/../includes/header.php';
?>

<div class="max-w-4xl mx-auto space-y-6 pb-16">
    <div class="bg-white rounded-2xl border border-slate-200 p-6 flex justify-between items-center">
        <div>
            <h1 class="text-xl font-bold text-slate-900">Kullanıcı Paneli</h1>
            <p class="text-xs text-slate-500">Hesaplama geçmişiniz tarayıcınızda ve oturumunuzda saklanır.</p>
        </div>
        <span class="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg">Standart Üye</span>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <h2 class="text-sm font-bold text-slate-800">Firma / Fatura Bilgileri</h2>
        <form method="POST" action="/hesabim" class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
                <label class="block font-semibold text-slate-700 mb-1">Firma Adı</label>
                <input type="text" name="company" placeholder="Örnek Ltd. Şti." class="w-full p-2.5 border rounded-lg">
            </div>
            <div>
                <label class="block font-semibold text-slate-700 mb-1">Vergi Numarası</label>
                <input type="text" name="tax_no" placeholder="1234567890" class="w-full p-2.5 border rounded-lg">
            </div>
            <div class="sm:col-span-2">
                <button type="submit" class="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg">Kaydet</button>
            </div>
        </form>
    </div>
</div>

<?php require __DIR__ . '/../includes/footer.php'; ?>
