import React, { useState } from 'react';
import { Copy, Share2, BookmarkPlus, Check, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { trackEvent } from '../../utils/analytics';

interface CalculatorActionsProps {
  toolSlug: string;
  toolTitle: string;
  inputs: Record<string, any>;
  results: Record<string, any>;
  summaryText: string;
}

export const CalculatorActions: React.FC<CalculatorActionsProps> = ({
  toolSlug,
  toolTitle,
  inputs,
  results,
  summaryText
}) => {
  const { saveCalculation, openAuthModal } = useApp();
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [customTitle, setCustomTitle] = useState('');

  // Default suggested title e.g. "KDV Hesabı - 12.000 TL"
  const defaultTitle = `${toolTitle} – ${
    results.primaryValue ? String(results.primaryValue) : new Date().toLocaleDateString('tr-TR')
  }`;

  const handleCopyResult = () => {
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    trackEvent('calculator_shared', { method: 'copy_text', tool: toolSlug });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareLink = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const params = new URLSearchParams();
    Object.entries(inputs).forEach(([k, v]) => {
      if (v !== undefined && v !== null) params.set(k, String(v));
    });
    const shareableUrl = `${origin}/${toolSlug}?${params.toString()}`;

    navigator.clipboard.writeText(shareableUrl);
    setLinkCopied(true);
    trackEvent('calculator_shared', { method: 'copy_link', tool: toolSlug });
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const params = new URLSearchParams();
    Object.entries(inputs).forEach(([k, v]) => {
      if (v !== undefined && v !== null) params.set(k, String(v));
    });
    const shareableUrl = `${origin}/${toolSlug}?${params.toString()}`;

    const text = `${toolTitle} Sonucu:\n${summaryText}\n\nDetaylı hesaplama için: ${shareableUrl}`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    trackEvent('calculator_shared', { method: 'whatsapp', tool: toolSlug });
    window.open(waUrl, '_blank');
  };

  const handleSave = () => {
    saveCalculation({
      toolSlug,
      toolTitle,
      title: customTitle.trim() || defaultTitle,
      inputs,
      results,
      summary: summaryText
    });
    setSaveModalOpen(false);
    setCustomTitle('');
  };

  return (
    <div className="mt-4 pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2">
      <button
        onClick={() => {
          setCustomTitle(defaultTitle);
          setSaveModalOpen(true);
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs transition-colors"
      >
        <BookmarkPlus className="w-3.5 h-3.5 text-blue-600" />
        <span>Hesaplamayı Kaydet</span>
      </button>

      <div className="flex items-center gap-1.5">
        <button
          onClick={handleCopyResult}
          title="Sonucu Metin Olarak Kopyala"
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
        </button>

        <button
          onClick={handleWhatsApp}
          title="WhatsApp ile Paylaş"
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg shadow-2xs transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </button>

        <button
          onClick={handleShareLink}
          title="Bu Hesaplamanın Bağlantısını Kopyala"
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs transition-colors"
        >
          {linkCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
          <span>{linkCopied ? 'Link Kopyalandı' : 'Linki Paylaş'}</span>
        </button>
      </div>

      {/* Save Modal */}
      {saveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-2xs">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-5 space-y-4">
            <h4 className="font-bold text-base text-slate-900">Hesaplamayı Kaydet</h4>
            <p className="text-xs text-slate-500">
              Bu hesaplamaya profilinizden veya son hesaplananlardan kolayca erişebilmek için bir başlık verin.
            </p>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kayıt Başlığı
              </label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder={defaultTitle}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSaveModalOpen(false)}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Vazgeç
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
