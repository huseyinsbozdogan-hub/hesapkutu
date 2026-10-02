import React from 'react';
import { Calculator, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CALCULATORS, CATEGORIES } from '../../data/calculators';

export const Footer: React.FC = () => {
  const { navigate, showAdPreview, toggleAdPreview, user } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => navigate('/')}
              className="flex items-center gap-2 cursor-pointer text-white"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Calculator className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                Hesap<span className="text-blue-400">Kutu</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              HesapKutu, günlük ve ticari hayattaki yüzde, KDV, kâr marjı, metrekare, yakıt ve borsa
              hesaplamalarını saniyeler içinde hatasız yapmanızı sağlayan bağımsız ve ücretsiz hesaplama platformudur.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span>Hızlı</span>
              <span>•</span>
              <span>Güvenilir</span>
              <span>•</span>
              <span>Yapay Zekâ Destekli</span>
            </div>
          </div>

          {/* Popular Tools Column */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Popüler Araçlar
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {CALCULATORS.slice(0, 5).map((tool) => (
                <li key={tool.id}>
                  <button
                    onClick={() => navigate(`/${tool.slug}`)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {tool.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Kategoriler
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <button
                    onClick={() => navigate('/', { kategori: cat.slug })}
                    className="hover:text-white transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Corporate & Legal Column */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Kurumsal & Yasal
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => navigate('/hakkimizda')}
                  className="hover:text-white transition-colors"
                >
                  Hakkımızda
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/gizlilik-politikasi')}
                  className="hover:text-white transition-colors"
                >
                  Gizlilik Politikası
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/kullanim-kosullari')}
                  className="hover:text-white transition-colors"
                >
                  Kullanım Koşulları
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/cerez-politikasi')}
                  className="hover:text-white transition-colors"
                >
                  Çerez Politikası
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/iletisim')}
                  className="hover:text-white transition-colors"
                >
                  İletişim
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/admin')}
                  className="hover:text-purple-400 transition-colors flex items-center gap-1.5 text-xs text-slate-500 pt-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Yönetici Girişi</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Dev Controls */}
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} HesapKutu. Tüm hakları saklıdır.
          </div>

          {/* AdSense Preview Switch */}
          <div className="flex items-center gap-3 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
            <span className="text-slate-400">AdSense Reklam Alanı Simülasyonu:</span>
            <button
              onClick={toggleAdPreview}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                showAdPreview
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              {showAdPreview ? (
                <>
                  <Eye className="w-3 h-3" />
                  <span>Açık (Önizleme)</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3 h-3" />
                  <span>Gizli</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
