import React, { useState } from 'react';
import {
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
  Edit,
  Save,
  Check,
  Eye,
  Crown,
  BarChart3,
  Layers,
  Search,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CALCULATORS, CATEGORIES } from '../data/calculators';
import { MetaManager } from '../components/seo/MetaManager';

export const AdminPage: React.FC = () => {
  const {
    user,
    adminOverrides,
    updateAdminOverrides,
    usageCounts,
    navigate
  } = useApp();

  const [adminAuthenticated, setAdminAuthenticated] = useState(
    user?.role === 'admin'
  );
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState(false);

  const [activeTab, setActiveTab] = useState<'tools' | 'seo' | 'analytics' | 'php'>('tools');

  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [tempTitle, setTempTitle] = useState('');
  const [tempDesc, setTempDesc] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin123' || passcode === 'hesapkutu2026') {
      setAdminAuthenticated(true);
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  const toggleToolActive = (slug: string) => {
    const disabled = adminOverrides.disabledSlugs.includes(slug);
    const updated = disabled
      ? adminOverrides.disabledSlugs.filter((s) => s !== slug)
      : [...adminOverrides.disabledSlugs, slug];

    updateAdminOverrides({ disabledSlugs: updated });
  };

  const startEditSeo = (tool: any) => {
    setEditingSlug(tool.slug);
    setTempTitle(adminOverrides.customTitles[tool.slug] || tool.seoTitle);
    setTempDesc(adminOverrides.customDescriptions[tool.slug] || tool.metaDescription);
  };

  const saveSeo = (slug: string) => {
    updateAdminOverrides({
      customTitles: {
        ...adminOverrides.customTitles,
        [slug]: tempTitle
      },
      customDescriptions: {
        ...adminOverrides.customDescriptions,
        [slug]: tempDesc
      }
    });
    setEditingSlug(null);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  if (!adminAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-16 px-4">
        <MetaManager
          path="/admin"
          title="Yönetici Girişi | HesapKutu"
          description="HesapKutu sistem ve içerik yönetim paneli."
        />
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xl space-y-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Yönetici Paneli</h1>
            <p className="text-xs text-slate-500 mt-1">
              Bu alan yetkili HesapKutu yöneticileri içindir.
            </p>
          </div>

          <form onSubmit={handleAdminAuth} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Yönetici Şifresi
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Şifrenizi girin..."
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
              <p className="text-[11px] text-slate-400 mt-1">Demo Şifre: admin123</p>
            </div>

            {passError && (
              <p className="text-xs text-rose-600 font-medium">Hatalı yönetici şifresi!</p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Panele Giriş Yap</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      <MetaManager
        path="/admin"
        title="Admin Yönetim Paneli | HesapKutu"
        description="Araç durumları, SEO meta yönetimi ve analitik göstergeler."
      />

      {/* Admin Header */}
      <div className="bg-purple-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-purple-700 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold">HesapKutu Yönetici Paneli</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-purple-500 text-purple-100">
                ADMIN
              </span>
            </div>
            <p className="text-xs text-purple-200">
              Araçları aktif/pasif yapın, SEO başlıklarını canlı değiştirin ve analitikleri inceleyin.
            </p>
          </div>
        </div>

        <button
          onClick={() => setAdminAuthenticated(false)}
          className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-purple-800 hover:bg-purple-700 border border-purple-600 self-start sm:self-center transition-colors"
        >
          Güvenli Çıkış
        </button>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('tools')}
          className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'tools'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Hesaplama Araçları ({CALCULATORS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('seo')}
          className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'seo'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Edit className="w-4 h-4" />
          <span>SEO & Metadata Canlı Düzenleme</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'analytics'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Kullanım İstatistikleri & Popülerlik</span>
        </button>

        <button
          onClick={() => setActiveTab('php')}
          className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'php'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <span className="font-bold font-mono text-emerald-600">&lt;?php&gt;</span>
          <span>PHP Sürümü & Hosting Kurulumu</span>
        </button>
      </div>

      {saveToast && (
        <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4" />
          <span>Değişiklikler başarıyla kaydedildi!</span>
        </div>
      )}

      {/* Tab 1: Tools Management */}
      {activeTab === 'tools' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">Araç Listesi ve Durumları</h3>
            <span className="text-xs text-slate-500">
              Pasif yapılan araçlar ana sayfada gizlenir.
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {CALCULATORS.map((tool) => {
              const isDisabled = adminOverrides.disabledSlugs.includes(tool.slug);
              const count = usageCounts[tool.slug] || 0;

              return (
                <div
                  key={tool.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-900">{tool.title}</span>
                      <span className="text-xs font-mono text-slate-400">/{tool.slug}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                        {tool.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{tool.shortDescription}</p>
                    <span className="text-[11px] text-purple-700 font-semibold inline-block">
                      Kullanım Sayısı: {count} kez
                    </span>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <button
                      onClick={() => navigate(`/${tool.slug}`)}
                      className="text-xs text-slate-600 hover:text-blue-600 flex items-center gap-1 font-medium px-2 py-1 rounded bg-slate-100"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Görüntüle</span>
                    </button>

                    <button
                      onClick={() => toggleToolActive(tool.slug)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        !isDisabled
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {!isDisabled ? (
                        <>
                          <ToggleRight className="w-4 h-4 text-emerald-600" />
                          <span>Yayında (Aktif)</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-4 h-4 text-rose-600" />
                          <span>Gizli (Pasif)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Live SEO Editing (Requirement 21) */}
      {activeTab === 'seo' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-2xs">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-base text-slate-900">Canlı SEO & Metadata Yönetimi</h3>
            <p className="text-xs text-slate-500">
              Her hesaplama sayfası için arama motorlarında görünecek title ve meta description alanlarını güncelleyin.
            </p>
          </div>

          <div className="space-y-4">
            {CALCULATORS.map((tool) => {
              const isEditing = editingSlug === tool.slug;
              const currentT = adminOverrides.customTitles[tool.slug] || tool.seoTitle;
              const currentD =
                adminOverrides.customDescriptions[tool.slug] || tool.metaDescription;

              return (
                <div
                  key={tool.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-sm text-slate-900">{tool.title}</span>
                      <span className="text-xs text-slate-400 font-mono ml-2">/{tool.slug}</span>
                    </div>

                    {!isEditing ? (
                      <button
                        onClick={() => startEditSeo(tool)}
                        className="px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg flex items-center gap-1 border border-purple-200"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Düzenle</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => saveSeo(tool.slug)}
                        className="px-3 py-1 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center gap-1 shadow-2xs"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Kaydet</span>
                      </button>
                    )}
                  </div>

                  {!isEditing ? (
                    <div className="space-y-1 text-xs text-slate-600">
                      <div>
                        <span className="font-semibold text-slate-700">Başlık (Title): </span>
                        <span>{currentT}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700">Açıklama (Meta Description): </span>
                        <span>{currentD}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Sayfa Başlığı (&lt;title&gt;)
                        </label>
                        <input
                          type="text"
                          value={tempTitle}
                          onChange={(e) => setTempTitle(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Meta Açıklama (&lt;meta name="description"&gt;)
                        </label>
                        <textarea
                          rows={2}
                          value={tempDesc}
                          onChange={(e) => setTempDesc(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 resize-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Usage Analytics */}
      {activeTab === 'analytics' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-2xs">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-base text-slate-900">
              Araç Kullanım Sayaçları & Sıralama
            </h3>
            <p className="text-xs text-slate-500">
              Kullanıcıların site genelinde en çok çalıştırdığı hesaplayıcılar.
            </p>
          </div>

          <div className="space-y-3">
            {[...CALCULATORS]
              .sort((a, b) => (usageCounts[b.slug] || 0) - (usageCounts[a.slug] || 0))
              .map((tool, idx) => {
                const count = usageCounts[tool.slug] || 0;
                const max = Math.max(...Object.values(usageCounts), 1);
                const percent = Math.min(100, Math.round((count / max) * 100));

                return (
                  <div key={tool.id} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-800">
                        {idx + 1}. {tool.title} ({tool.category})
                      </span>
                      <span className="text-purple-700 font-mono">{count} işlem</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${percent}%` }}
                        className="h-full bg-purple-600 rounded-full transition-all duration-500"
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Tab 4: PHP Sürümü & Hosting */}
      {activeTab === 'php' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-2xs">
          <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <span className="text-emerald-600 font-mono font-bold">&lt;?php&gt;</span>
                <span>HesapKutu PHP Sürümü Hazır</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Standart cPanel, Plesk, Apache veya Nginx hosting sunucunuzda çalıştırmak için hazır dosyalar oluşturuldu.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 self-start">
              /php Dizininde Hazır
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">📁 Oluşturulan PHP Dosyaları</h4>
              <ul className="space-y-1 font-mono text-[11px] text-slate-700">
                <li>• <strong>.htaccess</strong> (SEO temiz URL yönlendirmeleri)</li>
                <li>• <strong>index.php</strong> (Ana yönlendirici / router)</li>
                <li>• <strong>config.php</strong> (AdSense, Gemini ve site ayarları)</li>
                <li>• <strong>sitemap.php</strong> (Canlı XML site haritası)</li>
                <li>• <strong>robots.txt</strong> (Arama motoru kuralları)</li>
                <li>• <strong>api/calculate-ai.php</strong> (cURL ile Gemini AI)</li>
                <li>• <strong>includes/</strong> (header, footer, ads, calculators)</li>
                <li>• <strong>views/</strong> (home, calculator, quote, admin, legal)</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">🚀 cPanel / Hosting Kurulum Adımları</h4>
              <ol className="list-decimal pl-4 space-y-1.5 text-slate-600">
                <li>Projedeki <strong>/php</strong> klasörünün içindekileri hostinginizin <code>public_html</code> dizinine yükleyin.</li>
                <li><code>config.php</code> dosyasını açıp <code>GEMINI_API_KEY</code> ve varsa <code>ADSENSE_PUB_ID</code> bilginizi girin.</li>
                <li>Sitenizi tarayıcıda açın: <code>https://siteniz.com</code></li>
                <li>Sitemap linkinizi Google Search Console'a ekleyin: <code>https://siteniz.com/sitemap.xml</code></li>
              </ol>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs space-y-1 overflow-x-auto">
            <div className="text-emerald-400 font-bold mb-1">// config.php Örnek Ayarları:</div>
            <div>define('SITE_NAME', 'HesapKutu');</div>
            <div>define('GEMINI_API_KEY', 'AI_STUDIO_API_KEY');</div>
            <div>define('ADSENSE_PUB_ID', 'ca-pub-XXXXXXXXXXXXXXXX');</div>
            <div>define('GA_MEASUREMENT_ID', 'G-XXXXXXXXXX');</div>
            <div>define('ADMIN_PASSWORD', 'admin123');</div>
          </div>
        </div>
      )}
    </div>
  );
};
