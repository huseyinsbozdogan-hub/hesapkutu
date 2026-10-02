import React, { useState } from 'react';
import { CalculatorDefinition } from '../types';
import { useApp } from '../context/AppContext';
import { CALCULATORS } from '../data/calculators';
import { MetaManager } from '../components/seo/MetaManager';
import { CalculatorEngine } from '../components/calculators/CalculatorEngine';
import { AdBanner, AdRectangle, AdSidebar } from '../components/ads/AdSlots';
import {
  ChevronRight,
  Star,
  HelpCircle,
  BookOpen,
  Calculator,
  Crown,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface CalculatorPageProps {
  tool: CalculatorDefinition;
  onOpenAiModal: () => void;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({ tool, onOpenAiModal }) => {
  const { navigate, isFavorite, toggleFavorite, openAuthModal, isPro } = useApp();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const relatedTools = CALCULATORS.filter((c) => tool.relatedSlugs?.includes(c.slug));

  return (
    <div className="space-y-8 pb-16">
      {/* Dynamic SEO Meta and Schema.org injection */}
      <MetaManager
        path={`/${tool.slug}`}
        calculator={tool}
      />

      {/* Breadcrumb Navigation (Requirement 8) */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto">
        <button
          onClick={() => navigate('/')}
          className="hover:text-blue-600 transition-colors whitespace-nowrap"
        >
          Ana Sayfa
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <button
          onClick={() => navigate('/', { kategori: tool.categorySlug })}
          className="hover:text-blue-600 transition-colors whitespace-nowrap font-medium"
        >
          {tool.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="text-slate-800 font-semibold truncate">{tool.title}</span>
      </nav>

      {/* Tool Header (H1 & Description) */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-2">
        <div className="space-y-1.5 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            <span>{tool.category}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            {tool.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {tool.shortDescription}
          </p>
        </div>

        {/* Favorite & AI quick buttons */}
        <div className="flex items-center gap-2 self-start">
          <button
            onClick={() => toggleFavorite(tool.slug)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              isFavorite(tool.slug)
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Star
              className={`w-4 h-4 ${
                isFavorite(tool.slug) ? 'text-amber-500 fill-amber-500' : 'text-slate-400'
              }`}
            />
            <span>{isFavorite(tool.slug) ? 'Favorilerimde' : 'Favoriye Ekle'}</span>
          </button>
        </div>
      </div>

      {/* Top Leaderboard Ad */}
      <AdBanner slotId={`ad-calc-top-${tool.id}`} />

      {/* Main Grid: Calculator + Content + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Interactive Calculator Component */}
          <section aria-label="Hesaplama Aracı">
            <CalculatorEngine tool={tool} />
          </section>

          {/* Under-result Ad Placement (Requirement 10) */}
          <AdRectangle slotId={`ad-calc-res-${tool.id}`} />

          {/* "Nasıl Hesaplanır?" Section (Requirement 3) */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2.5 text-slate-900 border-b border-slate-100 pb-3">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold">{tool.title} Nasıl Hesaplanır?</h2>
            </div>
            <ul className="space-y-2.5 text-sm text-slate-600">
              {tool.howItWorks.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Mathematical Formula Box (Requirement 3) */}
          <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-md space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
              <Calculator className="w-4 h-4" />
              <span>Matematiksel Formül</span>
            </div>
            <div className="p-4 bg-slate-950/70 rounded-xl font-mono text-sm sm:text-base font-semibold text-emerald-300 border border-slate-700/80 overflow-x-auto">
              {tool.formula}
            </div>
          </section>

          {/* Numerical Concrete Example (Requirement 3) */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2.5 text-slate-900 border-b border-slate-100 pb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold">Örnek Hesaplama</h2>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2 text-sm">
              <div className="font-semibold text-slate-800">Senaryo:</div>
              <p className="text-slate-600">{tool.example.scenario}</p>
              <div className="font-semibold text-slate-800 pt-1">İşlem Adımı:</div>
              <p className="font-mono text-xs bg-white p-2 rounded border border-slate-200 text-slate-700">
                {tool.example.calculation}
              </p>
              <div className="flex items-center gap-2 pt-1 font-semibold text-emerald-700">
                <span>Sonuç:</span>
                <span className="text-base font-black text-slate-900 bg-emerald-100/70 px-2.5 py-0.5 rounded">
                  {tool.example.result}
                </span>
              </div>
            </div>
          </section>

          {/* Sık Sorulan Sorular FAQ (Requirement 3 & 4) */}
          {tool.faqs && tool.faqs.length > 0 && (
            <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 space-y-4 shadow-2xs">
              <div className="flex items-center gap-2.5 text-slate-900 border-b border-slate-100 pb-3">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold">Sık Sorulan Sorular</h2>
              </div>
              <div className="space-y-3">
                {tool.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-semibold text-sm text-slate-800">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                          openFaqIndex === idx ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </button>
                    {openFaqIndex === idx && (
                      <div className="p-4 bg-white text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Internal Linking: Related Tools (Requirement 7) */}
          {relatedTools.length > 0 && (
            <section className="space-y-3">
              <h3 className="font-bold text-base text-slate-900">
                Benzer ve İlgili Hesaplamalar
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedTools.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => navigate(`/${rel.slug}`)}
                    className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-semibold text-xs text-slate-900 group-hover:text-blue-600">
                        {rel.title}
                      </div>
                      <div className="text-[11px] text-slate-400">{rel.category}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* AI Assistance Promo Card */}
          <div className="bg-gradient-to-br from-indigo-900 to-blue-900 text-white rounded-2xl p-5 shadow-md space-y-3">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Yapay Zekâya Sorun</span>
            </div>
            <h3 className="font-bold text-base text-white">
              Doğal Türkçe Sorularınızı Gemini Çözsün
            </h3>
            <p className="text-xs text-indigo-200 leading-relaxed">
              Örnek: "120 m² eve 60x120 fayans döşersem kaç paket almalıyım?" gibi soruları hemen hesaplatın.
            </p>
            <button
              onClick={onOpenAiModal}
              className="w-full py-2.5 px-4 bg-white hover:bg-slate-100 text-indigo-900 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>AI Hesaplayıcıyı Aç</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* PRO Membership Banner */}
          {!isPro && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
                <Crown className="w-4 h-4 text-amber-600" />
                <span>HesapKutu PRO</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900">
                Reklamsız Deneyim ve Teklif Oluşturucu
              </h3>
              <p className="text-xs text-slate-600">
                Sınırsız hesaplama geçmişi, antetli teklif hazırlama ve PDF çıktı özellikleri için PRO'ya geçin.
              </p>
              <button
                onClick={() => openAuthModal('pro')}
                className="w-full py-2 px-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-colors shadow-2xs"
              >
                PRO Paketini İncele
              </button>
            </div>
          )}

          {/* Desktop Sidebar Ad (AdSense 300x600) */}
          <AdSidebar slotId={`ad-calc-side-${tool.id}`} />
        </div>
      </div>
    </div>
  );
};
