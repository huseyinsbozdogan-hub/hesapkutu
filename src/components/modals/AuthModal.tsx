import React, { useState } from 'react';
import { X, Mail, Crown, Shield, Check, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuthModal: React.FC = () => {
  const {
    showAuthModal,
    closeAuthModal,
    authModalMode,
    loginWithGoogle,
    loginWithEmail,
    upgradeToPro,
    user
  } = useApp();

  const [mode, setMode] = useState<'login' | 'signup' | 'pro'>(authModalMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Sync mode with prop
  React.useEffect(() => {
    setMode(authModalMode);
  }, [authModalMode]);

  if (!showAuthModal) return null;

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    loginWithEmail(email, password, name || email.split('@')[0]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* PRO Modal Mode */}
        {mode === 'pro' ? (
          <div className="p-6 sm:p-8">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-3">
                <Crown className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">HesapKutu PRO</h3>
              <p className="text-sm text-slate-500">
                Profesyonel ticari hesaplamalar ve sınırsız arşivleme için PRO'ya geçin.
              </p>
            </div>

            <div className="mt-6 space-y-3 bg-amber-50/70 p-4 rounded-xl border border-amber-200">
              <div className="flex items-center gap-2.5 text-sm text-slate-800">
                <Check className="w-4 h-4 text-amber-600 shrink-0" />
                <span>%100 Reklamsız kesintisiz deneyim</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-800">
                <Check className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Sınırsız hesaplama geçmişi ve arşivleme</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-800">
                <Check className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Profesyonel Teklif Oluşturucu (Logo & PDF çıktı)</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-800">
                <Check className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Firma bilgilerini ve IBAN kaydetme</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-center mb-4">
                <span className="text-3xl font-extrabold text-slate-900">₺99</span>
                <span className="text-sm text-slate-500 font-medium"> / yıllık (Lansman Özel)</span>
              </div>

              <button
                onClick={upgradeToPro}
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-bold rounded-xl shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-98"
              >
                <Crown className="w-5 h-5" />
                <span>{user ? "PRO Üyeliği Hemen Başlat" : "Giriş Yap & PRO'ya Geç"}</span>
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-2">
                İstediğiniz zaman iptal edebilirsiniz • Güvenli altyapı
              </p>
            </div>
          </div>
        ) : (
          /* Login & Sign Up Mode */
          <div className="p-6 sm:p-8">
            <div className="text-center space-y-1 mb-6">
              <h3 className="text-2xl font-bold text-slate-900">
                {mode === 'signup' ? 'Ücretsiz Hesap Oluştur' : 'Giriş Yap'}
              </h3>
              <p className="text-sm text-slate-500">
                Hesaplama geçmişinizi kaydedin ve tüm cihazlarınızdan erişin.
              </p>
            </div>

            {/* Google Login Button */}
            <button
              onClick={() => loginWithGoogle()}
              className="w-full py-2.5 px-4 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl flex items-center justify-center gap-3 transition-colors shadow-xs"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google ile Devam Et</span>
            </button>

            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <span className="relative bg-white px-3 text-xs uppercase text-slate-400 font-semibold tracking-wider">
                veya E-Posta ile
              </span>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Adınız Soyadınız"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  E-Posta Adresi
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@hesapkutu.com"
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Şifre
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <span>{mode === 'signup' ? 'Kayıt Ol' : 'Giriş Yap'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-5 text-center text-xs text-slate-500">
              {mode === 'signup' ? (
                <p>
                  Zaten bir hesabınız var mı?{' '}
                  <button
                    onClick={() => setMode('login')}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Giriş Yapın
                  </button>
                </p>
              ) : (
                <p>
                  Hesabınız yok mu?{' '}
                  <button
                    onClick={() => setMode('signup')}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Hemen Üye Olun
                  </button>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
