import React, { useState } from 'react';
import { Cookie, Shield, Check, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CookieConsent: React.FC = () => {
  const { cookieConsent, setCookieConsentState, navigate } = useApp();
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(true);
  const [adsAllowed, setAdsAllowed] = useState(true);

  if (cookieConsent !== null) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom duration-300">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 text-slate-800">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 shrink-0">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-sm text-slate-900">Çerez ve Gizlilik Tercihleri</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              HesapKutu olarak deneyiminizi iyileştirmek, hesaplama araçlarını optimize etmek ve
              reklamları kişiselleştirmek için çerezler kullanıyoruz.{' '}
              <button
                onClick={() => navigate('/cerez-politikasi')}
                className="text-blue-600 underline font-medium hover:text-blue-700"
              >
                Çerez Politikamızı
              </button>{' '}
              inceleyebilirsiniz.
            </p>
          </div>
        </div>

        {showSettings && (
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span className="font-medium text-slate-700">Zorunlu Çerezler (Sistem)</span>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Daima Aktif
              </span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <div>
                <span className="font-medium text-slate-700">Analitik Çerezleri (GA4)</span>
                <p className="text-[10px] text-slate-500">Kullanım istatistikleri ve popüler araç tespiti</p>
              </div>
              <input
                type="checkbox"
                checked={analyticsAllowed}
                onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <div>
                <span className="font-medium text-slate-700">Pazarlama & Reklam (AdSense)</span>
                <p className="text-[10px] text-slate-500">Google AdSense reklam gösterimi</p>
              </div>
              <input
                type="checkbox"
                checked={adsAllowed}
                onChange={(e) => setAdsAllowed(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
              />
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
          {!showSettings ? (
            <button
              onClick={() => setShowSettings(true)}
              className="text-xs text-slate-500 hover:text-slate-700 font-medium px-2 py-1.5"
            >
              Tercihleri Yönet
            </button>
          ) : (
            <button
              onClick={() => setCookieConsentState('accepted')}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-1.5"
            >
              Kaydet
            </button>
          )}

          <button
            onClick={() => setCookieConsentState('rejected')}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Yalnızca Zorunlular
          </button>
          <button
            onClick={() => setCookieConsentState('accepted')}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white shadow-xs transition-colors"
          >
            Tümünü Kabul Et
          </button>
        </div>
      </div>
    </div>
  );
};
