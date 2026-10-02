<?php
/**
 * HesapKutu - PHP Teklif Oluşturucu (A4 Yazdırılabilir / PDF)
 */
$page_title = 'Kurumsal Teklif Oluşturucu | HesapKutu PRO';
$page_desc = 'Müşterileriniz için KDV ve iskontolu profesyonel fiyat teklifleri hazırlayın, yazdırın ve PDF olarak kaydedin.';

require __DIR__ . '/../includes/header.php';
?>

<div class="space-y-6 pb-16">
    <div class="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 print:hidden">
        <div>
            <h1 class="text-xl font-bold text-slate-900">Kurumsal Fiyat Teklifi Oluşturucu</h1>
            <p class="text-xs text-slate-500">Antetli formatta teklif hazırlayın, anında yazdırın veya PDF olarak kaydedin.</p>
        </div>
        <button onclick="window.print()" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs">
            🖨️ Yazdır / PDF Olarak Kaydet
        </button>
    </div>

    <!-- A4 Printable Document -->
    <div class="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 max-w-4xl mx-auto space-y-6 print:border-none print:shadow-none print:p-0">
        <div class="flex justify-between items-start border-b border-slate-200 pb-6">
            <div>
                <input type="text" value="HesapKutu Bilişim ve Ticaret Ltd." class="text-2xl font-black text-slate-900 border-none focus:outline-none w-full">
                <p class="text-xs text-slate-500">Kadıköy VD - 1234567890 | +90 (555) 000 0000</p>
            </div>
            <div class="text-right">
                <span class="text-xl font-bold uppercase text-blue-600">Fiyat Teklifi</span>
                <p class="text-xs text-slate-500">Tarih: <?= date('d.m.Y') ?></p>
            </div>
        </div>

        <div class="bg-slate-50 p-4 rounded-xl text-xs space-y-1">
            <span class="font-bold text-slate-400 uppercase">Sayın Müşteri:</span>
            <input type="text" value="Hedef İşletme A.Ş. / Yetkili Adı" class="w-full font-bold text-slate-800 bg-transparent focus:outline-none">
        </div>

        <table class="w-full text-xs text-left">
            <thead>
                <tr class="border-b-2 border-slate-300 font-bold uppercase text-slate-700">
                    <th class="py-2">Ürün / Hizmet Açıklaması</th>
                    <th class="py-2 text-center">Adet</th>
                    <th class="py-2 text-right">Birim Fiyat</th>
                    <th class="py-2 text-right">Toplam</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                <tr>
                    <td class="py-2.5 font-medium">Web Tabanlı Hesaplama Sistemi ve SEO Altyapısı</td>
                    <td class="py-2.5 text-center">1</td>
                    <td class="py-2.5 text-right">15.000 TL</td>
                    <td class="py-2.5 text-right font-bold">15.000 TL</td>
                </tr>
                <tr>
                    <td class="py-2.5 font-medium">Google AdSense ve Reklam Yerleşim Entegrasyonu</td>
                    <td class="py-2.5 text-center">1</td>
                    <td class="py-2.5 text-right">5.000 TL</td>
                    <td class="py-2.5 text-right font-bold">5.000 TL</td>
                </tr>
            </tbody>
        </table>

        <div class="flex justify-end pt-4 border-t border-slate-200">
            <div class="w-64 space-y-1.5 text-xs text-right">
                <div class="flex justify-between"><span>Ara Toplam:</span><span class="font-bold">20.000 TL</span></div>
                <div class="flex justify-between"><span>KDV (%20):</span><span class="font-bold">4.000 TL</span></div>
                <div class="flex justify-between text-sm font-black border-t pt-1"><span>Genel Toplam:</span><span class="text-blue-600">24.000 TL</span></div>
            </div>
        </div>
    </div>
</div>

<?php require __DIR__ . '/../includes/footer.php'; ?>
