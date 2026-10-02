import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Star,
  ArrowRight,
  TrendingUp,
  Percent,
  Receipt,
  Tag,
  Maximize2,
  LayoutGrid,
  Fuel,
  Briefcase,
  CandlestickChart,
  LineChart,
  Coins,
  BadgePercent,
  CheckCircle2,
  Zap,
  History
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CALCULATORS, CATEGORIES } from '../data/calculators';
import { AdBanner, AdRectangle } from '../components/ads/AdSlots';
import { MetaManager } from '../components/seo/MetaManager';

interface HomePageProps {
  onOpenAiModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenAiModal }) => {
  const {
    navigate,
    currentQuery,
    favorites,
    toggleFavorite,
    isFavorite,
    historyCalculations,
    getCalculatorsSortedByPopularity,
    adminOverrides
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>(
    currentQuery.kategori || 'all'
  );

  // Sync if query param changed
  React.useEffect(() => {
    if (currentQuery.kategori) {
      setActiveCategory(currentQuery.kategori);
    }
  }, [currentQuery.kategori]);

  const popularCalculators = getCalculatorsSortedByPopularity().slice(0, 6);

  // Filter tools by category and search
  const filteredTools = CALCULATORS.filter((tool) => {
    if (adminOverrides.disabledSlugs.includes(tool.slug)) return false;
    if (activeCategory !== 'all' && tool.categorySlug !== activeCategory) {
      return false;
    }
    return true;
  });

  const favoriteTools = CALCULATORS.filter((c) => favorites.includes(c.slug));

  // Map icon name to Lucide Icon component
  const getToolIcon = (iconName: string) => {
    switch (iconName) {
      case 'Percent':
        return <Percent className="w-5 h-5 text-blue-600" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-emerald-600" />;
      case 'BadgePercent':
        return <BadgePercent className="w-5 h-5 text-indigo-600" />;
      case 'Coins':
        return <Coins className="w-5 h-5 text-amber-600" />;
      case 'Receipt':
        return <Receipt className="w-5 h-5 text-purple-600" />;
      case 'Tag':
        return <Tag className="w-5 h-5 text-teal-600" />;
      case 'Maximize2':
        return <Maximize2 className="w-5 h-5 text-orange-600" />;
      case 'LayoutGrid':
        return <LayoutGrid className="w-5 h-5 text-cyan-600" />;
      case 'Fuel':
        return <Fuel className="w-5 h-5 text-red-600" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-blue-600" />;
      case 'CandlestickChart':
        return <CandlestickChart className="w-5 h-5 text-emerald-600" />;
      case 'LineChart':
        return <LineChart className="w-5 h-5 text-violet-600" />;
      default:
        return <Zap className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-10 pb-16">
      <MetaManager
        path="/"
        title="HesapKutu – Ücretsiz Çevrimiçi Hesaplama Araçları"
        description="Yüzde, KDV, kâr marjı, iskonto, metrekare, yakıt, hisse maliyet ve yapay zeka destekli tüm hesaplamalarınızı anında yapın."
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-blue-50/60 via-indigo-50/20 to-transparent rounded-3xl border border-slate-200/60 px-4 sm:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-blue-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Türkiye'nin En Kapsamlı Hesaplama Kutusu</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Hesaplamalarınızı <span className="text-blue-600">Saniyeler İçinde</span> ve Hatasız Yapın
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Finans, ticaret, üretim ve günlük hayat için tasarlanmış bağımsız hesaplama araçları.
            Formüller, adım adım çözümler ve yapay zekâ desteği ile ücretsiz.
          </p>

          {/* Quick AI Trigger button */}
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={onOpenAiModal}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all transform active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Yapay Zekâ ile Doğal Dilde Hesapla</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('tum-hesaplamalar');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-sm transition-colors shadow-2xs"
            >
              Tüm Araçları Keşfet
            </button>
          </div>
        </div>
      </section>

      {/* AdSense Top Leaderboard Banner */}
      <AdBanner slotId="home-top-1" />

      {/* Favorites Quick Access (If any) */}
      {favoriteTools.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <h2 className="text-lg font-bold text-slate-900">Favori Araçlarınız</h2>
            </div>
            <span className="text-xs text-slate-500 font-medium">Hızlı Erişim</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {favoriteTools.map((tool) => (
              <div
                key={tool.id}
                onClick={() => navigate(`/${tool.slug}`)}
                className="p-4 rounded-xl bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-md cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                    {getToolIcon(tool.iconName)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{tool.category}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Popular Calculations (En Çok Kullanılan Hesaplamalar - Requirement 20) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">En Çok Kullanılan Hesaplamalar</h2>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">
            Organik kullanım verilerine göre sıralanır
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularCalculators.map((tool) => (
            <div
              key={tool.id}
              onClick={() => navigate(`/${tool.slug}`)}
              className="relative p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/5 cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-50 group-hover:bg-blue-50 transition-colors">
                    {getToolIcon(tool.iconName)}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(tool.slug);
                    }}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isFavorite(tool.slug)
                        ? 'text-amber-500 hover:bg-amber-50'
                        : 'text-slate-300 hover:text-amber-500 hover:bg-slate-100'
                    }`}
                  >
                    <Star
                      className={`w-4 h-4 ${isFavorite(tool.slug) ? 'fill-amber-500' : ''}`}
                    />
                  </button>
                </div>

                <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider block mb-1">
                  {tool.category}
                </span>

                <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                  {tool.title}
                </h3>

                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {tool.shortDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 group-hover:text-blue-600 font-medium">
                <span>Hesaplamaya Git</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mid-content Rectangle Ad */}
      <AdRectangle slotId="home-middle-rect" />

      {/* All Calculations with Category Filter */}
      <section id="tum-hesaplamalar" className="space-y-6 scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Tüm Hesaplama Araçları</h2>
            <p className="text-xs text-slate-500">İhtiyacınıza uygun kategoriyi seçin</p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tümü ({CALCULATORS.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeCategory === cat.slug
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Tools */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => navigate(`/${tool.slug}`)}
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-blue-50 transition-colors">
                    {getToolIcon(tool.iconName)}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(tool.slug);
                    }}
                    className={`p-1 rounded transition-colors ${
                      isFavorite(tool.slug)
                        ? 'text-amber-500'
                        : 'text-slate-300 hover:text-amber-500'
                    }`}
                  >
                    <Star
                      className={`w-3.5 h-3.5 ${isFavorite(tool.slug) ? 'fill-amber-500' : ''}`}
                    />
                  </button>
                </div>

                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  {tool.category}
                </span>

                <h3 className="font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors mt-0.5">
                  {tool.title}
                </h3>

                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {tool.shortDescription}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-blue-600 font-semibold">
                <span>Aracı Aç</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Highlights / Trust Factors */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start gap-3.5">
          <div className="p-3 rounded-xl bg-blue-50 text-blue-600 shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Kesin ve Doğrulanmış Formüller</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Mevzuata uygun güncel KDV oranları, matematiksel ve ticari standart formüllerle anında hesaplama.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Gemini Yapay Zekâ Motoru</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Karmaşık ya da formülünü bilmediğiniz problemleri doğal Türkçe cümlelerle sorarak çözebilirsiniz.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Geçmiş ve Tekrar Kullanım</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Hesaplamalarınızı isimlendirip kaydedin, WhatsApp'tan veya özel bağlantı ile paylaşın.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
