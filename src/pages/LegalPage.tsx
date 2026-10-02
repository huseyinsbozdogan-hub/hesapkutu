import React from 'react';
import { Shield, FileText, Cookie, Mail, Info, Send, Check } from 'lucide-react';
import { MetaManager } from '../components/seo/MetaManager';

interface LegalPageProps {
  type: 'gizlilik' | 'kullanim' | 'cerez' | 'iletisim' | 'hakkimizda';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const [formSent, setFormSent] = React.useState(false);

  const renderContent = () => {
    switch (type) {
      case 'gizlilik':
        return {
          title: 'Gizlilik Politikası',
          seoTitle: 'Gizlilik Politikası | HesapKutu',
          desc: 'HesapKutu kullanıcı gizliliği ve kişisel verilerin korunması ilkeleri.',
          icon: <Shield className="w-6 h-6 text-blue-600" />,
          body: (
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                HesapKutu olarak, ziyaretçilerimizin ve kayıtlı kullanıcılarımızın kişisel
                verilerinin korunmasına ve gizliliğine azami önem göstermekteyiz. Bu Gizlilik
                Politikası, sitemizi ziyaret ettiğinizde veya sunduğumuz hesaplama hizmetlerini
                kullandığınızda verilerinizin nasıl işlendiğini açıklar.
              </p>
              <h3 className="font-bold text-base text-slate-800 pt-2">
                1. Toplanan Bilgiler ve Hesaplama Verileri
              </h3>
              <p>
                Hesap makinelerimize girdiğiniz sayısal değerler (tutarlar, oranlar, ölçüler vb.)
                doğrudan tarayıcınızda istemci taraflı (client-side) olarak hesaplanır ve sunucularımıza
                kişisel veri olarak kaydedilmez. Kaydetmeyi tercih ettiğiniz hesaplamalar yalnızca
                kullanıcı profilinizle ilişkilendirilerek şifreli depolanır.
              </p>
              <h3 className="font-bold text-base text-slate-800 pt-2">2. Çerezler ve Analitik</h3>
              <p>
                Kullanıcı deneyimini iyileştirmek, popüler hesaplama araçlarını belirlemek ve Google
                AdSense reklamlarını yayınlamak amacıyla çerezlerden faydalanılmaktadır. Çerez
                tercihlerinizi dilediğiniz an Çerez Politikası üzerinden değiştirebilirsiniz.
              </p>
              <h3 className="font-bold text-base text-slate-800 pt-2">3. İletişim</h3>
              <p>
                Gizlilik politikamız ile ilgili her türlü soru ve geri bildirim için İletişim
                sayfamız üzerinden bizimle irtibat kurabilirsiniz.
              </p>
            </div>
          )
        };

      case 'kullanim':
        return {
          title: 'Kullanım Koşulları',
          seoTitle: 'Kullanım Koşulları | HesapKutu',
          desc: 'HesapKutu hesaplama platformunun genel kullanım ve sorumluluk şartları.',
          icon: <FileText className="w-6 h-6 text-indigo-600" />,
          body: (
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                HesapKutu web sitesine erişerek ve hesaplama araçlarını kullanarak aşağıdaki kullanım
                koşullarını kabul etmiş sayılırsınız.
              </p>
              <h3 className="font-bold text-base text-slate-800 pt-2">
                1. Bilgilendirme Amacı ve Sorumluluk Sınırı
              </h3>
              <p>
                HesapKutu platformundaki tüm hesaplama araçları, formüller ve yapay zekâ yanıtları
                bilgilendirme ve pratik analiz amacıyla sunulmaktadır. Sitede yer alan sonuçlar yasal,
                vergesel veya kesin finansal taahhüt niteliği taşımaz. Önemli ticari ve resmi
                işlemlerinizde uzman mali müşavir veya hukuk danışmanınıza başvurmanız tavsiye edilir.
              </p>
              <h3 className="font-bold text-base text-slate-800 pt-2">2. Fikri Mülkiyet</h3>
              <p>
                HesapKutu logosu, arayüz tasarımları, hesaplama algoritmaları ve metin içerikleri
                koruma altındadır. İzinsiz kopyalanamaz ve kaynak gösterilmeden ticari olarak
                çoğaltılamaz.
              </p>
            </div>
          )
        };

      case 'cerez':
        return {
          title: 'Çerez (Cookie) Politikası',
          seoTitle: 'Çerez Politikası ve Yönetimi | HesapKutu',
          desc: 'HesapKutu çerez türleri, kullanım amaçları ve tercihler.',
          icon: <Cookie className="w-6 h-6 text-amber-600" />,
          body: (
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                Web sitemizde gezinirken ve hesaplama araçlarını kullanırken en iyi performansı elde
                etmeniz için çerezler (cookies) kullanılmaktadır.
              </p>
              <h3 className="font-bold text-base text-slate-800 pt-2">Kullandığımız Çerez Türleri</h3>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Zorunlu Çerezler:</strong> Oturum açma, güvenlik ve temel sayfa gezintisi
                  için gereklidir.
                </li>
                <li>
                  <strong>Performans ve Analiz Çerezleri (GA4):</strong> Hangi hesaplama araçlarının
                  daha sık kullanıldığını analiz etmemizi sağlar.
                </li>
                <li>
                  <strong>Reklam Çerezleri (AdSense):</strong> İlginizi çekebilecek reklamları sunmak
                  amacıyla Google tarafından yerleştirilir.
                </li>
              </ul>
            </div>
          )
        };

      case 'hakkimizda':
        return {
          title: 'Hakkımızda',
          seoTitle: 'Hakkımızda – HesapKutu Kimdir? | HesapKutu',
          desc: 'HesapKutu hakkında bilgi, vizyonumuz ve sunduğumuz hesaplama çözümleri.',
          icon: <Info className="w-6 h-6 text-emerald-600" />,
          body: (
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                HesapKutu, karmaşık finansal, ticari ve matematiksel hesaplamaları herkes için
                kolaylaştırmak, hızlandırmak ve hatasız hale getirmek vizyonuyla kurulmuştur.
              </p>
              <p>
                Yüzde, KDV, kâr marjı, metrekare, akaryakıt maliyeti ve borsa maliyet düşürme gibi
                onlarca farklı aracı sade ve modern bir kullanıcı arayüzü ile buluşturuyoruz. Ayrıca
                Gemini yapay zekâ entegrasyonumuz sayesinde, formülünü bilmediğiniz gündelik hayat
                sorularınızı doğal dilde sorup adım adım çözümler alabilirsiniz.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                <div className="p-4 rounded-xl bg-blue-50 text-center">
                  <div className="text-2xl font-black text-blue-700">12+</div>
                  <div className="text-xs text-blue-600 font-semibold mt-1">Özel Hesaplama Aracı</div>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50 text-center">
                  <div className="text-2xl font-black text-emerald-700">%100</div>
                  <div className="text-xs text-emerald-600 font-semibold mt-1">Ücretsiz & Hızlı</div>
                </div>
                <div className="p-4 rounded-xl bg-purple-50 text-center">
                  <div className="text-2xl font-black text-purple-700">AI</div>
                  <div className="text-xs text-purple-600 font-semibold mt-1">Yapay Zekâ Motoru</div>
                </div>
              </div>
            </div>
          )
        };

      case 'iletisim':
        return {
          title: 'İletişim & Geri Bildirim',
          seoTitle: 'İletişim ve Destek | HesapKutu',
          desc: 'HesapKutu ekibine soru, öneri ve hesaplama aracı taleplerinizi iletin.',
          icon: <Mail className="w-6 h-6 text-blue-600" />,
          body: (
            <div className="space-y-6 text-sm text-slate-600">
              <p>
                Yeni bir hesaplama aracı öneriniz, hata bildirimi veya iş birliği talepleriniz için
                aşağıdaki formu doldurabilir ya da doğrudan bize e-posta gönderebilirsiniz.
              </p>
              {formSent ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-slate-900 text-base">Mesajınız Alındı!</h4>
                  <p className="text-xs text-slate-600">
                    Geri bildiriminiz için teşekkür ederiz. Ekibimiz en kısa sürede inceleyecektir.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSent(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Adınız Soyadınız
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      placeholder="Adınız Soyadınız"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      E-Posta Adresiniz
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      placeholder="ornek@hesapkutu.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Konu / Talep
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      placeholder="Yeni araç önerisi, hata bildirimi veya iş ortaklığı"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mesajınız
                    </label>
                    <textarea
                      rows={4}
                      required
                      className="w-full p-3.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Mesajınızı buraya yazın..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs flex items-center gap-2 shadow-xs transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Mesajı Gönder</span>
                  </button>
                </form>
              )}
            </div>
          )
        };
    }
  };

  const content = renderContent();

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6 pb-16">
      <MetaManager
        path={`/${type === 'gizlilik' ? 'gizlilik-politikasi' : type === 'kullanim' ? 'kullanim-kosullari' : type === 'cerez' ? 'cerez-politikasi' : type}`}
        title={content.seoTitle}
        description={content.desc}
      />

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-2xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-3 rounded-xl bg-slate-50">{content.icon}</div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">{content.title}</h1>
            <p className="text-xs text-slate-400 mt-0.5">Son güncelleme: Ekim 2026</p>
          </div>
        </div>

        {content.body}
      </div>
    </div>
  );
};
