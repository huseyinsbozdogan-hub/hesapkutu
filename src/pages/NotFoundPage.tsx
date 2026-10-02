import React, { useState } from 'react';
import { Search, Home, ArrowRight, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CALCULATORS } from '../data/calculators';
import { MetaManager } from '../components/seo/MetaManager';

export const NotFoundPage: React.FC = () => {
  const { navigate } = useApp();
  const [query, setQuery] = useState('');

  const searchResults = query.trim()
    ? CALCULATORS.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.slug.toLowerCase().includes(query.toLowerCase())
      )
    : CALCULATORS.slice(0, 4);

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-8">
      <MetaManager
        path="/404"
        title="Sayfa Bulunamadı (404) | HesapKutu"
        description="Aradığınız hesaplama aracını bulamadık. Popüler hesaplama araçlarına göz atabilir veya arama yapabilirsiniz."
      />

      <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
        <HelpCircle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-4xl font-black text-slate-300">404</span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Aradığınız hesaplama aracını bulamadık.
        </h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Sayfa taşınmış veya adresi değişmiş olabilir. Aşağıdaki arama kutusunu kullanabilir ya da
          popüler araçlarımıza göz atabilirsiniz.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md mx-auto">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Başka bir hesaplama arayın..."
          className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-2xs"
        />
      </div>

      {/* Suggested / Popular calculations */}
      <div className="space-y-3 text-left bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">
          {query.trim() ? 'Arama Sonuçları' : 'Popüler Hesaplama Araçları'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {searchResults.map((tool) => (
            <div
              key={tool.id}
              onClick={() => navigate(`/${tool.slug}`)}
              className="p-3 rounded-xl border border-slate-200/80 hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer flex items-center justify-between group transition-colors"
            >
              <div>
                <div className="font-semibold text-xs text-slate-800 group-hover:text-blue-600">
                  {tool.title}
                </div>
                <div className="text-[10px] text-slate-400">{tool.category}</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
            </div>
          ))}
        </div>
      </div>

      {/* Home link */}
      <div>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Ana Sayfaya Dön</span>
        </button>
      </div>
    </div>
  );
};
