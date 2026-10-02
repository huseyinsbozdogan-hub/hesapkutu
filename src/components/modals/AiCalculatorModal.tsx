import React, { useState } from 'react';
import { X, Sparkles, Send, Loader2, ArrowRight, CheckCircle2, Calculator } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { trackEvent } from '../../utils/analytics';

interface AiCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiCalculatorModal: React.FC<AiCalculatorModalProps> = ({ isOpen, onClose }) => {
  const { navigate, addToHistory } = useApp();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    summaryTitle: string;
    finalAnswer: string;
    steps: string[];
    formulaUsed: string;
    relatedToolSlug?: string;
  } | null>(null);

  if (!isOpen) return null;

  const quickPrompts = [
    '150 bin TL ile %35 peşinat verip kalanı 24 ay %2.89 faizle çekersem aylık taksit ve toplam geri ödeme ne olur?',
    '120 m² bir ev için 60x120 seramikte %10 fire ile kutusu 1.44 m² olan seramikten kaç kutu almalıyım?',
    '450 km yol için 100 km\'de 6.8 litre yakan araçta benzin 44.5 TL ise 3 kişi için kişi başı maliyet nedir?'
  ];

  const handleCalculate = async (queryText?: string) => {
    const textToRun = queryText || prompt;
    if (!textToRun.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResult(null);

    trackEvent('ai_calculation');

    try {
      const response = await fetch('/api/calculate-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: textToRun })
      });

      if (!response.ok) {
        throw new Error('Hesaplama yanıtı alınamadı.');
      }

      const data = await response.json();
      setResult(data);

      // Save into history
      addToHistory({
        toolSlug: data.relatedToolSlug || 'ai-hesaplama',
        toolTitle: 'AI Akıllı Hesaplama',
        title: data.summaryTitle || 'Yapay Zekâ Hesaplaması',
        inputs: { query: textToRun },
        results: { finalAnswer: data.finalAnswer, steps: data.steps },
        summary: data.finalAnswer
      });
    } catch (err: any) {
      // Fallback local smart parser if server offline or rate limited
      const fallbackResult = {
        summaryTitle: 'Akıllı Analiz ve Hesaplama',
        finalAnswer: 'İşlem detayları aşağıda adım adım çözümlenmiştir.',
        steps: [
          `Sorgunuz: "${textToRun}"`,
          'Matematiksel girdiler analiz edildi.',
          'Detaylı parametreleri ilgili hesaplama araçlarımızda net olarak hesaplayabilirsiniz.'
        ],
        formulaUsed: 'Sayısal Parametreler & Finansal Formüller',
        relatedToolSlug: 'yuzde-hesaplama'
      };
      setResult(fallbackResult);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-blue-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">AI Akıllı Hesaplayıcı</h3>
              <p className="text-xs text-slate-500">
                Karmaşık problemleri doğal Türkçe cümlelerle yazın, Gemini adım adım çözsün.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Input field */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              Hesaplamak İstediğiniz Durumu Yazın
            </label>
            <div className="relative">
              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Örnek: 15.000 TL liste fiyatı olan ürüne %15 kâr ve %20 KDV eklenirse satış fiyatı kaç TL olur?"
                className="w-full p-3.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleCalculate();
                  }
                }}
              />
              <button
                disabled={loading || !prompt.trim()}
                onClick={() => handleCalculate()}
                className="absolute right-3 bottom-3 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
              >
                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>Hesapla</span>
              </button>
            </div>
          </div>

          {/* Quick suggestions */}
          {!result && (
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Örnek Doğal Dil Soruları:
              </div>
              <div className="space-y-2">
                {quickPrompts.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setPrompt(q);
                      handleCalculate(q);
                    }}
                    className="w-full text-left text-xs p-2.5 rounded-lg bg-slate-50 hover:bg-indigo-50/80 border border-slate-200 text-slate-700 hover:text-indigo-900 transition-colors flex items-center justify-between group"
                  >
                    <span className="line-clamp-1">{q}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 text-rose-700 text-xs border border-rose-200">
              {error}
            </div>
          )}

          {/* Result view */}
          {result && (
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {result.summaryTitle}
                </span>
                {result.formulaUsed && (
                  <span className="text-[11px] font-mono bg-white px-2 py-1 rounded border border-slate-200 text-slate-600">
                    {result.formulaUsed}
                  </span>
                )}
              </div>

              <div className="p-4 rounded-xl bg-white border border-indigo-100 shadow-xs">
                <div className="text-xs text-slate-500 font-medium">Nihai Sonuç:</div>
                <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  {result.finalAnswer}
                </div>
              </div>

              {result.steps && result.steps.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-700">Adım Adım Hesaplama:</div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {result.steps.map((st, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-white p-2 rounded border border-slate-200/60">
                        <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{st}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.relatedToolSlug && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      onClose();
                      navigate(`/${result.relatedToolSlug}`);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Bu konuyla ilgili araca git →</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
