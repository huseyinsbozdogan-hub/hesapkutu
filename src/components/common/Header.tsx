import React, { useState, useRef, useEffect } from 'react';
import {
  Calculator,
  Search,
  Sparkles,
  Star,
  User,
  ShieldCheck,
  Crown,
  LogOut,
  ChevronDown,
  Menu,
  X,
  History,
  FileSpreadsheet
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CALCULATORS, CATEGORIES } from '../../data/calculators';

interface HeaderProps {
  onOpenAiModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAiModal }) => {
  const {
    user,
    isPro,
    navigate,
    favorites,
    openAuthModal,
    logout,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close search and dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim()
    ? CALCULATORS.filter(
        (c) =>
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.slug.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 cursor-pointer shrink-0 group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                Hesap<span className="text-blue-600">Kutu</span>
              </span>
              {isPro && (
                <span className="px-1.5 py-0.5 text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800 rounded border border-amber-300">
                  PRO
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-500 font-medium hidden sm:block -mt-1">
              Pratik & Akıllı Hesaplama
            </p>
          </div>
        </div>

        {/* Search bar with instant autocomplete */}
        <div ref={searchRef} className="relative flex-1 max-w-md hidden md:block">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Hesaplama ara... (kdv, kâr, yakıt, m², hisse...)"
              className="w-full bg-slate-100 hover:bg-slate-50 focus:bg-white text-sm text-slate-800 placeholder-slate-400 rounded-full pl-10 pr-4 py-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-slate-400 hover:text-slate-600 text-xs"
              >
                Temizle
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {isSearchOpen && searchQuery.trim() && (
            <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50">
              <div className="p-2 border-b border-slate-100 flex justify-between items-center bg-slate-50 text-xs text-slate-500 font-medium">
                <span>Sonuçlar ({searchResults.length})</span>
                <span className="text-[11px]">ESC ile kapat</span>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {searchResults.length > 0 ? (
                  searchResults.map((tool) => (
                    <div
                      key={tool.id}
                      onClick={() => {
                        navigate(`/${tool.slug}`);
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="p-3 hover:bg-blue-50/70 cursor-pointer flex items-center justify-between group transition-colors"
                    >
                      <div>
                        <div className="font-medium text-sm text-slate-800 group-hover:text-blue-600">
                          {tool.title}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1">
                          {tool.shortDescription}
                        </div>
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700 shrink-0">
                        {tool.category}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-sm text-slate-500">
                    <p>"{searchQuery}" ile eşleşen hesaplama aracı bulunamadı.</p>
                    <p className="text-xs text-blue-600 mt-1 cursor-pointer font-medium" onClick={onOpenAiModal}>
                      Yapay Zekaya Doğal Dilde Sorun →
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Navigation links & actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Categories dropdown */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              onBlur={() => setTimeout(() => setIsCategoryMenuOpen(false), 200)}
              className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <span>Kategoriler</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {isCategoryMenuOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                {CATEGORIES.map((cat) => (
                  <div
                    key={cat.slug}
                    onClick={() => {
                      navigate('/', { kategori: cat.slug });
                      setIsCategoryMenuOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-slate-50 cursor-pointer text-sm text-slate-700 hover:text-blue-600"
                  >
                    <div className="font-medium">{cat.name}</div>
                    <div className="text-xs text-slate-400 line-clamp-1">{cat.description}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Calculator Button */}
          {onOpenAiModal && (
            <button
              onClick={onOpenAiModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 shadow-xs transition-colors"
            >
              <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
              <span>AI Akıllı Hesap</span>
            </button>
          )}

          {/* Favorites shortcut */}
          <button
            onClick={() => navigate('/hesabim', { tab: 'favorites' })}
            title="Favori Araçlar"
            className="p-2 text-slate-600 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors relative"
          >
            <Star className="w-5 h-5" />
            {favorites.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full" />
            )}
          </button>

          {/* Pro Upgrade / Pro Badge */}
          {!isPro ? (
            <button
              onClick={() => openAuthModal('pro')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-amber-900 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 rounded-lg shadow-xs shadow-amber-500/20 transition-all transform active:scale-95"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>PRO'ya Geç</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/teklif-olusturucu')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Teklif Oluşturucu</span>
            </button>
          )}

          {/* User Account / Login */}
          {user ? (
            <div ref={userMenuRef} className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                  {user.name.charAt(0)}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:block" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    {isPro ? (
                      <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        PRO Üyelik Aktif
                      </span>
                    ) : (
                      <span className="inline-block mt-1 text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        Ücretsiz Plan
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      navigate('/hesabim');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>Hesabım ve Profil</span>
                  </button>

                  <button
                    onClick={() => {
                      navigate('/hesabim', { tab: 'history' });
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <History className="w-4 h-4 text-slate-400" />
                    <span>Hesap Geçmişi</span>
                  </button>

                  <button
                    onClick={() => {
                      navigate('/teklif-olusturucu');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-slate-400" />
                    <span>Teklif Oluşturucu (PRO)</span>
                  </button>

                  {user.role === 'admin' && (
                    <button
                      onClick={() => {
                        navigate('/admin');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 flex items-center gap-2 font-medium"
                    >
                      <ShieldCheck className="w-4 h-4 text-purple-600" />
                      <span>Yönetim Paneli</span>
                    </button>
                  )}

                  <div className="border-t border-slate-100 my-1" />

                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>Çıkış Yap</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Giriş Yap</span>
            </button>
          )}

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg lg:hidden"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          {/* Mobile search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Hesaplama ara..."
              className="w-full bg-slate-100 text-sm rounded-lg pl-9 pr-4 py-2 border border-slate-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => {
                navigate('/');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-sm font-medium p-2 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-800"
            >
              Ana Sayfa
            </button>
            <button
              onClick={() => {
                navigate('/hesabim');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-sm font-medium p-2 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-800"
            >
              Hesabım
            </button>
            <button
              onClick={() => {
                navigate('/teklif-olusturucu');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-sm font-medium p-2 rounded-lg bg-emerald-50 text-emerald-800"
            >
              Teklif Oluştur
            </button>
            <button
              onClick={() => {
                navigate('/admin');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-sm font-medium p-2 rounded-lg bg-purple-50 text-purple-800"
            >
              Admin Paneli
            </button>
          </div>

          <div className="border-t border-slate-100 pt-2">
            <div className="text-xs font-semibold uppercase text-slate-400 mb-2">Kategoriler</div>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.slug}
                  onClick={() => {
                    navigate('/', { kategori: cat.slug });
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-sm py-1.5 px-2 rounded hover:bg-slate-100 text-slate-700 cursor-pointer"
                >
                  {cat.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
