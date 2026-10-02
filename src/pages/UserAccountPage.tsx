import React, { useState } from 'react';
import {
  User,
  History,
  BookmarkPlus,
  Star,
  Crown,
  Settings,
  Trash2,
  ExternalLink,
  Building,
  Check,
  LogOut,
  Download,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CALCULATORS } from '../data/calculators';
import { MetaManager } from '../components/seo/MetaManager';

export const UserAccountPage: React.FC = () => {
  const {
    user,
    isPro,
    navigate,
    currentQuery,
    savedCalculations,
    deleteSavedCalculation,
    historyCalculations,
    clearHistory,
    favorites,
    toggleFavorite,
    logout,
    openAuthModal,
    updateCompanyProfile,
    upgradeToPro,
    downgradePro
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'profile' | 'history' | 'saved' | 'favorites' | 'pro' | 'settings'
  >((currentQuery.tab as any) || 'profile');

  // Company profile state for invoices/quotes
  const [companyName, setCompanyName] = useState(user?.companyProfile?.companyName || '');
  const [taxNumber, setTaxNumber] = useState(user?.companyProfile?.taxNumber || '');
  const [taxOffice, setTaxOffice] = useState(user?.companyProfile?.taxOffice || '');
  const [phone, setPhone] = useState(user?.companyProfile?.phone || '');
  const [address, setAddress] = useState(user?.companyProfile?.address || '');
  const [iban, setIban] = useState(user?.companyProfile?.iban || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  React.useEffect(() => {
    if (currentQuery.tab) {
      setActiveTab(currentQuery.tab as any);
    }
  }, [currentQuery.tab]);

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyProfile({
      companyName,
      taxNumber,
      taxOffice,
      phone,
      address,
      iban
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const favoriteTools = CALCULATORS.filter((c) => favorites.includes(c.slug));

  const exportUserData = () => {
    const data = {
      user,
      savedCalculations,
      historyCalculations,
      favorites,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hesapkutu-yedek-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  return (
    <div className="space-y-8 pb-16">
      <MetaManager
        path="/hesabim"
        title="Kullanıcı Paneli ve Hesap Geçmişi | HesapKutu"
        description="Kaydedilen hesaplamalarınız, geçmiş işlemleriniz ve PRO üyelik ayarlarınız."
      />

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xl flex items-center justify-center shadow-md">
            {user ? user.name.charAt(0).toUpperCase() : 'M'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                {user ? user.name : 'Misafir Kullanıcı'}
              </h1>
              {isPro && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold uppercase bg-amber-100 text-amber-900 border border-amber-300">
                  PRO
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              {user ? user.email : 'Hesabınıza giriş yaparak verilerinizi senkronize edebilirsiniz.'}
            </p>
          </div>
        </div>

        <div>
          {user ? (
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Çıkış Yap</span>
            </button>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors"
            >
              Giriş Yap / Üye Ol
            </button>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'profile'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profil</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'history'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Son Hesaplamalar ({historyCalculations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'saved'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <BookmarkPlus className="w-4 h-4" />
          <span>Kaydedilenler ({savedCalculations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'favorites'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Star className="w-4 h-4" />
          <span>Favoriler ({favorites.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('pro')}
          className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'pro'
              ? 'border-amber-500 text-amber-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Crown className="w-4 h-4 text-amber-500" />
          <span>PRO Üyelik</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'settings'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Ayarlar</span>
        </button>
      </div>

      {/* Tab 1: Profile & Company Info */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              <span>Hesap Detayları</span>
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-xs text-slate-400 block font-medium">Ad Soyad</span>
                <span className="font-semibold text-slate-800">{user ? user.name : 'Misafir'}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-xs text-slate-400 block font-medium">E-Posta</span>
                <span className="font-semibold text-slate-800">{user ? user.email : 'Belirtilmedi'}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-xs text-slate-400 block font-medium">Plan</span>
                <span className="font-semibold text-slate-800">
                  {isPro ? 'HesapKutu PRO (Aktif)' : 'Ücretsiz Standart Plan'}
                </span>
              </div>
            </div>
          </div>

          {/* Company details for quotes */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Building className="w-4 h-4 text-blue-600" />
              <span>Firma ve Teklif Bilgileri</span>
            </h3>
            <form onSubmit={handleSaveCompany} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Firma / Unvan
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Şirket veya Şahıs Unvanı"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Vergi Dairesi
                  </label>
                  <input
                    type="text"
                    value={taxOffice}
                    onChange={(e) => setTaxOffice(e.target.value)}
                    placeholder="Kadıköy VD"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Vergi / TC No
                  </label>
                  <input
                    type="text"
                    value={taxNumber}
                    onChange={(e) => setTaxNumber(e.target.value)}
                    placeholder="1234567890"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  IBAN Bilgisi (Teklif Çıktıları İçin)
                </label>
                <input
                  type="text"
                  value={iban}
                  onChange={(e) => setIban(e.target.value)}
                  placeholder="TR00 0000 0000 0000 0000 0000 00"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                {savedSuccess && (
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Bilgiler Kaydedildi
                  </span>
                )}
                <button
                  type="submit"
                  className="ml-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors"
                >
                  Bilgileri Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tab 2: History (Requirement 14 & 16) */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-base text-slate-900">Son Yapılan Hesaplamalar</h3>
              <p className="text-xs text-slate-500">
                Bu tarayıcıda veya hesabınızda yaptığınız son işlemler.
              </p>
            </div>
            {historyCalculations.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-xs text-rose-600 hover:text-rose-700 font-medium"
              >
                Geçmişi Temizle
              </button>
            )}
          </div>

          {historyCalculations.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {historyCalculations.map((item) => (
                <div
                  key={item.id}
                  className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-blue-600">{item.toolTitle}</span>
                      <span className="text-[11px] text-slate-400">
                        {new Date(item.createdAt).toLocaleTimeString('tr-TR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-800 mt-0.5">{item.title}</p>
                    <p className="text-xs text-slate-500 line-clamp-1">{item.summary}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/${item.toolSlug}`, item.inputs)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-lg transition-colors self-start sm:self-center"
                  >
                    <span>Tekrar Aç</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-sm text-slate-400">
              Henüz hesaplama geçmişiniz bulunmuyor.
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Saved Calculations (Requirement 14) */}
      {activeTab === 'saved' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-base text-slate-900">Kaydedilen Özel Hesaplamalar</h3>
            <p className="text-xs text-slate-500">
              Başlık vererek arşivlediğiniz ticari ve şahsi hesaplama kayıtlarınız.
            </p>
          </div>

          {savedCalculations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedCalculations.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 bg-slate-50/50 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-blue-600 uppercase">
                        {item.toolTitle}
                      </span>
                      <button
                        onClick={() => deleteSavedCalculation(item.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Kaydı Sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 mt-1">{item.title}</h4>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">{item.summary}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
                    <span className="text-slate-400">
                      {new Date(item.createdAt).toLocaleDateString('tr-TR')}
                    </span>
                    <button
                      onClick={() => navigate(`/${item.toolSlug}`, item.inputs)}
                      className="font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <span>Araca Aktar & Aç</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-sm text-slate-400">
              Henüz kaydedilmiş bir hesaplama bulunmuyor. Bir aracı kullandıktan sonra "Hesaplamayı
              Kaydet" butonuna basarak buraya ekleyebilirsiniz.
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Favorites (Requirement 15) */}
      {activeTab === 'favorites' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-base text-slate-900">Favori Hesaplama Araçlarınız</h3>
            <p className="text-xs text-slate-500">
              Sık kullandığınız araçları buradan yönetebilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {favoriteTools.map((tool) => (
              <div
                key={tool.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 flex items-center justify-between group"
              >
                <div
                  onClick={() => navigate(`/${tool.slug}`)}
                  className="cursor-pointer flex-1"
                >
                  <h4 className="font-semibold text-sm text-slate-900 group-hover:text-blue-600">
                    {tool.title}
                  </h4>
                  <p className="text-xs text-slate-400">{tool.category}</p>
                </div>
                <button
                  onClick={() => toggleFavorite(tool.slug)}
                  className="text-amber-500 hover:text-slate-300 p-1"
                  title="Favorilerden Çıkar"
                >
                  <Star className="w-4 h-4 fill-amber-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: PRO Üyelik (Requirement 17) */}
      {activeTab === 'pro' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase">
              <Crown className="w-4 h-4 text-amber-600" />
              <span>HesapKutu PRO Avantajları</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              {isPro ? 'PRO Üyeliğiniz Aktif!' : "HesapKutu PRO'ya Geçin"}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              İşletmeler, e-ticaret satıcıları, mühendisler ve profesyoneller için reklamsız, limitsiz
              ve kurumsal teklif çıktılı altyapı.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>%100 Reklamsız Kullanım</span>
              </div>
              <p className="text-xs text-slate-500">
                Sitedeki tüm AdSense banner ve alanları PRO hesaplarda otomatik olarak gizlenir.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Teklif & Fatura Oluşturucu</span>
              </div>
              <p className="text-xs text-slate-500">
                Müşterilerinize logolu, KDV ve iskontolu resmi A4 PDF teklifler oluşturup yazdırın.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Sınırsız Hesaplama Arşivi</span>
              </div>
              <p className="text-xs text-slate-500">
                Tüm girdi değerleriyle birlikte sınırsız sayıda hesaplamayı saklayın.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Firma Bilgilerini Kaydetme</span>
              </div>
              <p className="text-xs text-slate-500">
                Vergi dairesi, vergi numarası ve IBAN bilgilerinizi kaydetme imkânı.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center gap-4">
            {isPro ? (
              <button
                onClick={downgradePro}
                className="px-4 py-2 border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-semibold rounded-lg"
              >
                PRO Üyeliği Sonlandır (Test)
              </button>
            ) : (
              <button
                onClick={upgradeToPro}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-bold text-sm rounded-xl shadow-md transition-all"
              >
                Yıllık ₺99 ile PRO'ya Yükselt
              </button>
            )}
          </div>
        </div>
      )}

      {/* Tab 6: Settings */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-base text-slate-900">Hesap ve Veri Ayarları</h3>
            <p className="text-xs text-slate-500">
              Verilerinizi dışa aktarın veya tercihlerinizi düzenleyin.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <h4 className="font-semibold text-sm text-slate-800">Verilerinizi İndirin (Yedek)</h4>
                <p className="text-xs text-slate-500">
                  Kaydedilmiş hesaplamalarınızı ve ayarlarınızı JSON formatında indirin.
                </p>
              </div>
              <button
                onClick={exportUserData}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700"
              >
                <Download className="w-3.5 h-3.5" />
                <span>JSON İndir</span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <h4 className="font-semibold text-sm text-slate-800">Yönetici Paneli Erişimi</h4>
                <p className="text-xs text-slate-500">Platform içerik ve araç yönetim paneli</p>
              </div>
              <button
                onClick={() => navigate('/admin')}
                className="flex items-center gap-1.5 px-3 py-2 bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 rounded-lg text-xs font-semibold"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Sayfası</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
