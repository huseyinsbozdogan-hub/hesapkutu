    </main>

    <!-- Footer -->
    <footer class="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div class="space-y-3">
                    <span class="font-bold text-xl text-white">Hesap<span class="text-blue-400">Kutu</span></span>
                    <p class="text-xs text-slate-400 leading-relaxed">
                        Yüzde, KDV, kâr marjı, metrekare, yakıt ve borsa hesaplamalarınızı hatasız ve anında yapan ücretsiz platform.
                    </p>
                </div>
                <div>
                    <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-3">Popüler Araçlar</h4>
                    <ul class="space-y-1.5 text-xs text-slate-400">
                        <li><a href="/yuzde-hesaplama" class="hover:text-white">Yüzde Hesaplama</a></li>
                        <li><a href="/kdv-hesaplama" class="hover:text-white">KDV Hesaplama</a></li>
                        <li><a href="/kar-zarar-hesaplama" class="hover:text-white">Kâr Zarar Hesaplama</a></li>
                        <li><a href="/yakit-hesaplama" class="hover:text-white">Yakıt Hesaplama</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-3">Kurumsal</h4>
                    <ul class="space-y-1.5 text-xs text-slate-400">
                        <li><a href="/hakkimizda" class="hover:text-white">Hakkımızda</a></li>
                        <li><a href="/gizlilik-politikasi" class="hover:text-white">Gizlilik Politikası</a></li>
                        <li><a href="/kullanim-kosullari" class="hover:text-white">Kullanım Koşulları</a></li>
                        <li><a href="/cerez-politikasi" class="hover:text-white">Çerez Politikası</a></li>
                        <li><a href="/iletisim" class="hover:text-white">İletişim</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-3">Yönetim</h4>
                    <ul class="space-y-1.5 text-xs text-slate-400">
                        <li><a href="/admin" class="hover:text-purple-400">Admin Girişi</a></li>
                        <li><a href="/sitemap.xml" target="_blank" class="hover:text-blue-400">XML Site Haritası</a></li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-slate-800 mt-8 pt-6 text-center text-xs text-slate-500">
                © <?= date('Y') ?> HesapKutu (PHP Sürümü). Tüm hakları saklıdır.
            </div>
        </div>
    </footer>

    <!-- Cookie Consent Banner -->
    <div id="cookie-banner" class="hidden fixed bottom-4 right-4 max-w-sm bg-white border border-slate-200 rounded-2xl shadow-xl p-4 text-xs z-50">
        <p class="text-slate-600 mb-3">Deneyiminizi geliştirmek ve reklamları optimize etmek için çerezler kullanıyoruz.</p>
        <div class="flex justify-end gap-2">
            <button onclick="acceptCookies()" class="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-semibold">Kabul Et</button>
        </div>
    </div>
    <script>
        if (!localStorage.getItem('cookies_accepted')) {
            document.getElementById('cookie-banner').classList.remove('hidden');
        }
        function acceptCookies() {
            localStorage.setItem('cookies_accepted', '1');
            document.getElementById('cookie-banner').classList.add('hidden');
        }
    </script>
</body>
</html>
