<?php
/**
 * HesapKutu - Google AdSense Reklam Alanları
 */

function is_user_pro() {
    return !empty($_SESSION['user']['is_pro']);
}

function render_ad_banner($slot_id = '1001') {
    if (is_user_pro()) return '';

    if (!empty(ADSENSE_PUB_ID)) {
        return '
        <div class="w-full my-4 flex justify-center overflow-hidden min-h-[90px]">
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="' . htmlspecialchars(ADSENSE_PUB_ID) . '"
                 data-ad-slot="' . htmlspecialchars($slot_id) . '"
                 data-ad-format="horizontal"
                 data-full-width-responsive="true"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>';
    }

    // Geliştirme / Test Placeholder Kutusu
    return '
    <div class="w-full my-4 flex justify-center">
        <div class="w-full max-w-[728px] h-[90px] border border-dashed border-slate-300 bg-slate-100/70 rounded-xl flex flex-col items-center justify-center p-2 text-center text-slate-400 select-none">
            <span class="text-xs font-semibold tracking-wide uppercase text-slate-500">Google AdSense – Banner Alanı (728×90)</span>
            <span class="text-[11px] text-slate-400 mt-0.5">AdSense ID girildiğinde aktifleşir • PRO üyelerde otomatik gizlenir</span>
        </div>
    </div>';
}

function render_ad_rectangle($slot_id = '2001') {
    if (is_user_pro()) return '';

    if (!empty(ADSENSE_PUB_ID)) {
        return '
        <div class="my-6 flex justify-center overflow-hidden min-h-[250px]">
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="' . htmlspecialchars(ADSENSE_PUB_ID) . '"
                 data-ad-slot="' . htmlspecialchars($slot_id) . '"
                 data-ad-format="rectangle"
                 data-full-width-responsive="true"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>';
    }

    return '
    <div class="my-6 flex justify-center">
        <div class="w-full max-w-[336px] h-[250px] border border-dashed border-slate-300 bg-slate-100/70 rounded-xl flex flex-col items-center justify-center p-4 text-center text-slate-400 select-none">
            <span class="text-xs font-semibold tracking-wide uppercase text-slate-500">Google AdSense – Dikdörtgen Alan (336×280)</span>
            <span class="text-[11px] text-slate-400 mt-2">Sonuç ve içerik altı konumu için optimize edilmiştir.</span>
        </div>
    </div>';
}

function render_ad_sidebar($slot_id = '3001') {
    if (is_user_pro()) return '';

    if (!empty(ADSENSE_PUB_ID)) {
        return '
        <div class="w-[300px] overflow-hidden min-h-[600px] sticky top-24">
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="' . htmlspecialchars(ADSENSE_PUB_ID) . '"
                 data-ad-slot="' . htmlspecialchars($slot_id) . '"
                 data-ad-format="vertical"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>';
    }

    return '
    <div class="w-[300px] sticky top-24">
        <div class="w-full h-[600px] border border-dashed border-slate-300 bg-slate-100/70 rounded-2xl flex flex-col items-center justify-center p-4 text-center text-slate-400 select-none">
            <span class="text-xs font-semibold tracking-wide uppercase text-slate-500">Google AdSense – Sidebar (300×600)</span>
            <span class="text-[11px] text-slate-400 mt-2">Masaüstü yan sütun reklam alanı.</span>
        </div>
    </div>';
}
