import React, { useState, useEffect } from 'react';
import { CalculatorDefinition } from '../../types';
import { useApp } from '../../context/AppContext';
import { CalculatorActions } from './CalculatorActions';
import {
  TrendingUp,
  Percent,
  Receipt,
  Tag,
  Maximize2,
  LayoutGrid,
  Fuel,
  Briefcase,
  CandlestickChart,
  LineChart,
  Coins,
  BadgePercent,
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';

interface CalculatorEngineProps {
  tool: CalculatorDefinition;
}

export const CalculatorEngine: React.FC<CalculatorEngineProps> = ({ tool }) => {
  const { currentQuery, addToHistory } = useApp();

  // Helper to format currency
  const formatTRY = (val: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      maximumFractionDigits: 2
    }).format(val);
  };

  const formatNumber = (val: number, maxDecimals = 2) => {
    return new Intl.NumberFormat('tr-TR', {
      maximumFractionDigits: maxDecimals
    }).format(val);
  };

  // Switch between calculators
  switch (tool.slug) {
    case 'yuzde-hesaplama':
      return <YuzdeCalculator tool={tool} currentQuery={currentQuery} formatNumber={formatNumber} addToHistory={addToHistory} />;
    case 'yuzde-artis-hesaplama':
      return <YuzdeArtisCalculator tool={tool} currentQuery={currentQuery} formatNumber={formatNumber} addToHistory={addToHistory} />;
    case 'kar-zarar-hesaplama':
      return <KarZararCalculator tool={tool} currentQuery={currentQuery} formatTRY={formatTRY} formatNumber={formatNumber} addToHistory={addToHistory} />;
    case 'kar-marji-hesaplama':
      return <KarMarjiCalculator tool={tool} currentQuery={currentQuery} formatTRY={formatTRY} formatNumber={formatNumber} addToHistory={addToHistory} />;
    case 'kdv-hesaplama':
      return <KdvCalculator tool={tool} currentQuery={currentQuery} formatTRY={formatTRY} formatNumber={formatNumber} addToHistory={addToHistory} />;
    case 'iskonto-hesaplama':
      return <IskontoCalculator tool={tool} currentQuery={currentQuery} formatTRY={formatTRY} formatNumber={formatNumber} addToHistory={addToHistory} />;
    case 'metrekare-hesaplama':
      return <MetrekareCalculator tool={tool} currentQuery={currentQuery} formatNumber={formatNumber} addToHistory={addToHistory} />;
    case 'etiket-yerlesim-hesaplama':
      return <EtiketYerlesimCalculator tool={tool} currentQuery={currentQuery} formatNumber={formatNumber} addToHistory={addToHistory} />;
    case 'yakit-hesaplama':
      return <YakitCalculator tool={tool} currentQuery={currentQuery} formatTRY={formatTRY} formatNumber={formatNumber} addToHistory={addToHistory} />;
    case 'maas-zam-hesaplama':
      return <MaasZamCalculator tool={tool} currentQuery={currentQuery} formatTRY={formatTRY} formatNumber={formatNumber} addToHistory={addToHistory} />;
    case 'hisse-maliyet-hesaplama':
      return <HisseMaliyetCalculator tool={tool} currentQuery={currentQuery} formatTRY={formatTRY} formatNumber={formatNumber} addToHistory={addToHistory} />;
    case 'bilesik-getiri-hesaplama':
      return <BilesikGetiriCalculator tool={tool} currentQuery={currentQuery} formatTRY={formatTRY} formatNumber={formatNumber} addToHistory={addToHistory} />;
    default:
      return <div className="p-4 text-slate-500">Hesaplama motoru yükleniyor...</div>;
  }
};

// ==========================================
// 1. YÜZDE HESAPLAMA
// ==========================================
const YuzdeCalculator = ({ tool, currentQuery, formatNumber, addToHistory }: any) => {
  const [mode, setMode] = useState<'a_of_b' | 'a_is_what_pct_of_b'>(
    (currentQuery.mode as any) || 'a_of_b'
  );
  const [valA, setValA] = useState<number>(Number(currentQuery.a) || 1000);
  const [valB, setValB] = useState<number>(Number(currentQuery.b) || 20);

  const resultVal = mode === 'a_of_b' ? (valA * valB) / 100 : valB !== 0 ? (valA / valB) * 100 : 0;

  useEffect(() => {
    addToHistory({
      toolSlug: tool.slug,
      toolTitle: tool.title,
      title: `${valA} değerinin %${valB}'si`,
      inputs: { mode, a: valA, b: valB },
      results: { primaryValue: formatNumber(resultVal) },
      summary:
        mode === 'a_of_b'
          ? `${formatNumber(valA)} sayısının %${valB}'si = ${formatNumber(resultVal)}`
          : `${formatNumber(valA)} sayısı ${formatNumber(valB)} sayısının %${formatNumber(resultVal)}'idir`
    });
  }, [mode, valA, valB]);

  const summary =
    mode === 'a_of_b'
      ? `${formatNumber(valA)} sayısının %${valB}'si = ${formatNumber(resultVal)}`
      : `${formatNumber(valA)} sayısı, ${formatNumber(valB)} sayısının %${formatNumber(resultVal)}'idir.`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-5 sm:p-7 space-y-6">
      {/* Sub-modes tabs */}
      <div className="flex bg-slate-100 p-1 rounded-xl">
        <button
          onClick={() => setMode('a_of_b')}
          className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
            mode === 'a_of_b' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          A'nın %B'si Kaçtır?
        </button>
        <button
          onClick={() => setMode('a_is_what_pct_of_b')}
          className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
            mode === 'a_is_what_pct_of_b' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          A, B'nin Yüzde Kaçıdır?
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mode === 'a_of_b' ? (
          <>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ana Sayı (A)
              </label>
              <input
                type="number"
                value={valA}
                onChange={(e) => setValA(Number(e.target.value))}
                className="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Yüzde Oranı (% B)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={valB}
                  onChange={(e) => setValB(Number(e.target.value))}
                  className="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none pr-8"
                />
                <span className="absolute right-3.5 top-3.5 text-slate-400 font-bold">%</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Parça Sayı (A)
              </label>
              <input
                type="number"
                value={valA}
                onChange={(e) => setValA(Number(e.target.value))}
                className="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Toplam / Bütün Sayı (B)
              </label>
              <input
                type="number"
                value={valB}
                onChange={(e) => setValB(Number(e.target.value))}
                className="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </>
        )}
      </div>

      {/* Result Card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl p-5 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
            {mode === 'a_of_b' ? 'Hesaplanan Yüzde Tutarı' : 'Yüzdelik Oran'}
          </span>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
            {mode === 'a_of_b' ? formatNumber(resultVal) : `%${formatNumber(resultVal)}`}
          </div>
          <p className="text-xs text-slate-500 mt-1">{summary}</p>
        </div>
      </div>

      <CalculatorActions
        toolSlug={tool.slug}
        toolTitle={tool.title}
        inputs={{ mode, a: valA, b: valB }}
        results={{ primaryValue: resultVal }}
        summaryText={summary}
      />
    </div>
  );
};

// ==========================================
// 2. YÜZDE ARTIŞ VE AZALIŞ
// ==========================================
const YuzdeArtisCalculator = ({ tool, currentQuery, formatNumber, addToHistory }: any) => {
  const [oldVal, setOldVal] = useState<number>(Number(currentQuery.old) || 200);
  const [newVal, setNewVal] = useState<number>(Number(currentQuery.new) || 260);

  const diff = newVal - oldVal;
  const pctChange = oldVal !== 0 ? (diff / oldVal) * 100 : 0;
  const isIncrease = diff >= 0;

  const summary = `${formatNumber(oldVal)} değerinden ${formatNumber(newVal)} değerine değişim: ${
    isIncrease ? '+' : ''
  }%${formatNumber(pctChange)} (${isIncrease ? 'Artış' : 'Azalış'}, Fark: ${formatNumber(diff)})`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-5 sm:p-7 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            İlk / Eski Değer
          </label>
          <input
            type="number"
            value={oldVal}
            onChange={(e) => setOldVal(Number(e.target.value))}
            className="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Son / Yeni Değer
          </label>
          <input
            type="number"
            value={newVal}
            onChange={(e) => setNewVal(Number(e.target.value))}
            className="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Result Card */}
      <div
        className={`rounded-2xl p-5 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          isIncrease ? 'bg-emerald-50/70 border-emerald-200' : 'bg-rose-50/70 border-rose-200'
        }`}
      >
        <div>
          <span
            className={`text-xs font-bold uppercase tracking-wider ${
              isIncrease ? 'text-emerald-800' : 'text-rose-800'
            }`}
          >
            {isIncrease ? 'Yüzde Artış Oranı' : 'Yüzde Düşüş / Azalış Oranı'}
          </span>
          <div
            className={`text-3xl sm:text-4xl font-black mt-1 ${
              isIncrease ? 'text-emerald-700' : 'text-rose-700'
            }`}
          >
            {isIncrease ? `+%${formatNumber(pctChange)}` : `%${formatNumber(pctChange)}`}
          </div>
          <div className="text-xs text-slate-600 mt-1">
            Net Fark: <span className="font-bold">{formatNumber(diff)}</span> | Çarpan Katsayısı:{' '}
            <span className="font-mono font-bold">
              {oldVal ? formatNumber(newVal / oldVal, 4) : 0}x
            </span>
          </div>
        </div>
      </div>

      <CalculatorActions
        toolSlug={tool.slug}
        toolTitle={tool.title}
        inputs={{ old: oldVal, new: newVal }}
        results={{ primaryValue: `%${formatNumber(pctChange)}`, diff }}
        summaryText={summary}
      />
    </div>
  );
};

// ==========================================
// 3. KÂR ZARAR HESAPLAMA
// ==========================================
const KarZararCalculator = ({ tool, currentQuery, formatTRY, formatNumber }: any) => {
  const [buyPrice, setBuyPrice] = useState<number>(Number(currentQuery.buy) || 400);
  const [sellPrice, setSellPrice] = useState<number>(Number(currentQuery.sell) || 600);
  const [extraCost, setExtraCost] = useState<number>(Number(currentQuery.cost) || 50);

  const totalCost = buyPrice + extraCost;
  const netProfit = sellPrice - totalCost;
  const isProfit = netProfit >= 0;
  const profitMarginOnCost = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;
  const profitMarginOnRevenue = sellPrice > 0 ? (netProfit / sellPrice) * 100 : 0;

  const summary = `Maliyet: ${formatTRY(totalCost)}, Satış: ${formatTRY(sellPrice)} -> ${
    isProfit ? 'Net Kâr' : 'Net Zarar'
  }: ${formatTRY(netProfit)} (%${formatNumber(profitMarginOnCost)} maliyet kârı)`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-5 sm:p-7 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Alış Fiyatı (TL)
          </label>
          <input
            type="number"
            value={buyPrice}
            onChange={(e) => setBuyPrice(Number(e.target.value))}
            className="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Ek Giderler (Kargo, Komisyon TL)
          </label>
          <input
            type="number"
            value={extraCost}
            onChange={(e) => setExtraCost(Number(e.target.value))}
            className="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Satış Fiyatı (TL)
          </label>
          <input
            type="number"
            value={sellPrice}
            onChange={(e) => setSellPrice(Number(e.target.value))}
            className="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Result Card */}
      <div
        className={`rounded-2xl p-5 border ${
          isProfit ? 'bg-emerald-50/70 border-emerald-200' : 'bg-rose-50/70 border-rose-200'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                isProfit ? 'text-emerald-800' : 'text-rose-800'
              }`}
            >
              {isProfit ? 'Net Kâr Tutarı' : 'Net Zarar Tutarı'}
            </span>
            <div
              className={`text-3xl sm:text-4xl font-black mt-1 ${
                isProfit ? 'text-emerald-700' : 'text-rose-700'
              }`}
            >
              {formatTRY(netProfit)}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs bg-white/80 p-3 rounded-xl border border-slate-200/60">
            <div>
              <span className="text-slate-500 block">Kâr Oranı (Maliyete Göre):</span>
              <span className="font-bold text-slate-900">% {formatNumber(profitMarginOnCost)}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Brüt Marj (Satışa Göre):</span>
              <span className="font-bold text-slate-900">% {formatNumber(profitMarginOnRevenue)}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Toplam Maliyet:</span>
              <span className="font-bold text-slate-900">{formatTRY(totalCost)}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Başa Baş Satış Fiyatı:</span>
              <span className="font-bold text-slate-900">{formatTRY(totalCost)}</span>
            </div>
          </div>
        </div>
      </div>

      <CalculatorActions
        toolSlug={tool.slug}
        toolTitle={tool.title}
        inputs={{ buy: buyPrice, sell: sellPrice, cost: extraCost }}
        results={{ primaryValue: formatTRY(netProfit), netProfit, isProfit }}
        summaryText={summary}
      />
    </div>
  );
};

// ==========================================
// 4. KÂR MARJI HESAPLAMA
// ==========================================
const KarMarjiCalculator = ({ tool, currentQuery, formatTRY, formatNumber }: any) => {
  const [cost, setCost] = useState<number>(Number(currentQuery.cost) || 100);
  const [revenue, setRevenue] = useState<number>(Number(currentQuery.rev) || 150);

  const profit = revenue - cost;
  const marginPercent = revenue > 0 ? (profit / revenue) * 100 : 0;
  const markupPercent = cost > 0 ? (profit / cost) * 100 : 0;

  const summary = `Maliyet: ${formatTRY(cost)}, Satış: ${formatTRY(revenue)} -> Brüt Kâr Marjı: %${formatNumber(
    marginPercent
  )}, Kâr Haddi (Markup): %${formatNumber(markupPercent)}`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-5 sm:p-7 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Ürün Birim Maliyeti (TL)
          </label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
            className="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Satış Fiyatı (TL)
          </label>
          <input
            type="number"
            value={revenue}
            onChange={(e) => setRevenue(Number(e.target.value))}
            className="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Visual Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200">
          <span className="text-xs font-semibold text-blue-700 uppercase">Kâr Marjı (Margin)</span>
          <div className="text-2xl font-black text-blue-950 mt-1">
            %{formatNumber(marginPercent)}
          </div>
          <p className="text-[11px] text-blue-600 mt-1">Satış fiyatının yüzde kaçı kârdır</p>
        </div>

        <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200">
          <span className="text-xs font-semibold text-indigo-700 uppercase">Kâr Haddi (Markup)</span>
          <div className="text-2xl font-black text-indigo-950 mt-1">
            %{formatNumber(markupPercent)}
          </div>
          <p className="text-[11px] text-indigo-600 mt-1">Maliyetin üzerine eklenen yüzde</p>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200">
          <span className="text-xs font-semibold text-emerald-700 uppercase">Net Kâr Tutarı</span>
          <div className="text-2xl font-black text-emerald-950 mt-1">
            {formatTRY(profit)}
          </div>
          <p className="text-[11px] text-emerald-600 mt-1">Birim başına kalan kazanç</p>
        </div>
      </div>

      <CalculatorActions
        toolSlug={tool.slug}
        toolTitle={tool.title}
        inputs={{ cost, rev: revenue }}
        results={{ primaryValue: `%${formatNumber(marginPercent)}`, profit }}
        summaryText={summary}
      />
    </div>
  );
};

// ==========================================
// 5. KDV HESAPLAMA
// ==========================================
const KdvCalculator = ({ tool, currentQuery, formatTRY, formatNumber }: any) => {
  const [amount, setAmount] = useState<number>(Number(currentQuery.amt) || 10000);
  const [vatRate, setVatRate] = useState<number>(Number(currentQuery.rate) || 20);
  const [mode, setMode] = useState<'ex_to_in' | 'in_to_ex'>(
    (currentQuery.mode as any) || 'ex_to_in'
  );

  let netMatrah = 0;
  let vatAmount = 0;
  let grandTotal = 0;

  if (mode === 'ex_to_in') {
    netMatrah = amount;
    vatAmount = (amount * vatRate) / 100;
    grandTotal = netMatrah + vatAmount;
  } else {
    grandTotal = amount;
    netMatrah = amount / (1 + vatRate / 100);
    vatAmount = grandTotal - netMatrah;
  }

  const summary = `${
    mode === 'ex_to_in' ? 'KDV Hariç: ' : 'KDV Dahil: '
  }${formatTRY(amount)} (%${vatRate} KDV) -> Matrah: ${formatTRY(netMatrah)}, KDV: ${formatTRY(
    vatAmount
  )}, Toplam: ${formatTRY(grandTotal)}`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-5 sm:p-7 space-y-6">
      {/* Mode Selector */}
      <div className="flex bg-slate-100 p-1 rounded-xl">
        <button
          onClick={() => setMode('ex_to_in')}
          className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
            mode === 'ex_to_in' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          KDV Hariçten Dahile
        </button>
        <button
          onClick={() => setMode('in_to_ex')}
          className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
            mode === 'in_to_ex' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          KDV Dahilden Harice (KDV Ayrıştırma)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {mode === 'ex_to_in' ? 'KDV Hariç Tutar (TL)' : 'KDV Dahil Toplam Tutar (TL)'}
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">KDV Oranı</label>
          <div className="grid grid-cols-3 gap-2">
            {[1, 10, 20].map((rate) => (
              <button
                key={rate}
                type="button"
                onClick={() => setVatRate(rate)}
                className={`py-3 rounded-xl font-bold text-sm border transition-all ${
                  vatRate === rate
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'
                }`}
              >
                %{rate}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold">
              KDV Tutarı (%{vatRate})
            </span>
            <div className="text-3xl font-black text-white mt-0.5">{formatTRY(vatAmount)}</div>
          </div>
          <div className="text-right">
            <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
              Genel Toplam (KDV Dahil)
            </span>
            <div className="text-3xl font-black text-emerald-400 mt-0.5">
              {formatTRY(grandTotal)}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-slate-400">
          <span>Net Matrah (KDV Hariç Tutar):</span>
          <span className="font-mono font-bold text-white text-sm">{formatTRY(netMatrah)}</span>
        </div>
      </div>

      <CalculatorActions
        toolSlug={tool.slug}
        toolTitle={tool.title}
        inputs={{ amt: amount, rate: vatRate, mode }}
        results={{ primaryValue: formatTRY(grandTotal), vatAmount, netMatrah }}
        summaryText={summary}
      />
    </div>
  );
};

// ==========================================
// 6. İSKONTO HESAPLAMA
// ==========================================
const IskontoCalculator = ({ tool, currentQuery, formatTRY, formatNumber }: any) => {
  const [price, setPrice] = useState<number>(Number(currentQuery.price) || 1000);
  const [disc1, setDisc1] = useState<number>(Number(currentQuery.d1) || 20);
  const [disc2, setDisc2] = useState<number>(Number(currentQuery.d2) || 10);

  const priceAfterDisc1 = price * (1 - disc1 / 100);
  const finalPrice = priceAfterDisc1 * (1 - disc2 / 100);
  const totalDiscount = price - finalPrice;
  const effectiveRate = price > 0 ? (totalDiscount / price) * 100 : 0;

  const summary = `Liste Fiyatı: ${formatTRY(price)}, %${disc1} + %${disc2} iskonto sonrası -> Net: ${formatTRY(
    finalPrice
  )} (Tasarruf: ${formatTRY(totalDiscount)}, Efektif Oran: %${formatNumber(effectiveRate)})`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-5 sm:p-7 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Liste Fiyatı (TL)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            1. İskonto Oranı (%)
          </label>
          <input
            type="number"
            value={disc1}
            onChange={(e) => setDisc1(Number(e.target.value))}
            className="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            2. Kademeli İskonto (%) (Opsiyonel)
          </label>
          <input
            type="number"
            value={disc2}
            onChange={(e) => setDisc2(Number(e.target.value))}
            className="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Result Card */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-700 text-white rounded-2xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-emerald-100 font-semibold">
              Net İndirimli Satış Fiyatı
            </span>
            <div className="text-3xl sm:text-4xl font-black mt-1">{formatTRY(finalPrice)}</div>
          </div>
          <div className="text-right sm:border-l sm:border-emerald-400/40 sm:pl-6 space-y-1">
            <div className="text-xs text-emerald-100">
              Toplam İndirim:{' '}
              <span className="font-bold text-white text-sm">{formatTRY(totalDiscount)}</span>
            </div>
            <div className="text-xs text-emerald-100">
              Efektif İskonto Oranı:{' '}
              <span className="font-bold text-white text-sm">%{formatNumber(effectiveRate)}</span>
            </div>
          </div>
        </div>
      </div>

      <CalculatorActions
        toolSlug={tool.slug}
        toolTitle={tool.title}
        inputs={{ price, d1: disc1, d2: disc2 }}
        results={{ primaryValue: formatTRY(finalPrice), totalDiscount, effectiveRate }}
        summaryText={summary}
      />
    </div>
  );
};

// ==========================================
// 7. METREKARE (m²) HESAPLAMA
// ==========================================
const MetrekareCalculator = ({ tool, currentQuery, formatNumber }: any) => {
  const [width, setWidth] = useState<number>(Number(currentQuery.w) || 4);
  const [length, setLength] = useState<number>(Number(currentQuery.l) || 5);
  const [unit, setUnit] = useState<'m' | 'cm'>((currentQuery.unit as any) || 'm');
  const [waste, setWaste] = useState<number>(Number(currentQuery.waste) || 10);
  const [packageSize, setPackageSize] = useState<number>(Number(currentQuery.pkg) || 2);

  const realW = unit === 'cm' ? width / 100 : width;
  const realL = unit === 'cm' ? length / 100 : length;
  const netArea = realW * realL;
  const totalAreaWithWaste = netArea * (1 + waste / 100);
  const neededBoxes = packageSize > 0 ? Math.ceil(totalAreaWithWaste / packageSize) : 0;

  const summary = `${realW}m × ${realL}m alan = ${formatNumber(netArea)} m² (Fireli: ${formatNumber(
    totalAreaWithWaste
  )} m² -> ${neededBoxes} Paket)`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-5 sm:p-7 space-y-6">
      <div className="flex justify-end gap-2 text-xs">
        <span className="text-slate-500 py-1 font-medium">Birim:</span>
        <button
          onClick={() => setUnit('m')}
          className={`px-3 py-1 rounded-lg font-semibold ${
            unit === 'm' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          Metre (m)
        </button>
        <button
          onClick={() => setUnit('cm')}
          className={`px-3 py-1 rounded-lg font-semibold ${
            unit === 'cm' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          Santimetre (cm)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Genişlik ({unit})
          </label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Uzunluk / Boy ({unit})
          </label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Fire Payı (%)
          </label>
          <select
            value={waste}
            onChange={(e) => setWaste(Number(e.target.value))}
            className="w-full text-sm font-semibold p-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
          >
            <option value={0}>%0 Fire (Tam Ölçü)</option>
            <option value={5}>%5 Fire (Standart)</option>
            <option value={10}>%10 Fire (Parke / Zemin)</option>
            <option value={15}>%15 Fire (Fayans / Seramik Çapraz)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            1 Paket Alanı (m²)
          </label>
          <input
            type="number"
            step="0.1"
            value={packageSize}
            onChange={(e) => setPackageSize(Number(e.target.value))}
            className="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
          <span className="text-xs font-semibold text-blue-700 uppercase">Net Alan</span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {formatNumber(netArea)} m²
          </div>
        </div>
        <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
          <span className="text-xs font-semibold text-indigo-700 uppercase">
            Fire Dahil Sipariş Alanı
          </span>
          <div className="text-2xl font-black text-indigo-900 mt-1">
            {formatNumber(totalAreaWithWaste)} m²
          </div>
        </div>
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
          <span className="text-xs font-semibold text-emerald-700 uppercase">
            Satın Alınacak Paket
          </span>
          <div className="text-2xl font-black text-emerald-900 mt-1">
            {neededBoxes} Kutu / Paket
          </div>
        </div>
      </div>

      <CalculatorActions
        toolSlug={tool.slug}
        toolTitle={tool.title}
        inputs={{ w: width, l: length, unit, waste, pkg: packageSize }}
        results={{ primaryValue: `${formatNumber(totalAreaWithWaste)} m²`, neededBoxes }}
        summaryText={summary}
      />
    </div>
  );
};

// ==========================================
// 8. ETİKET YERLEŞİM HESAPLAMA (With SVG Sheet Preview)
// ==========================================
const EtiketYerlesimCalculator = ({ tool, currentQuery, formatNumber }: any) => {
  const [sheetW, setSheetW] = useState<number>(Number(currentQuery.sw) || 320);
  const [sheetH, setSheetH] = useState<number>(Number(currentQuery.sh) || 450);
  const [itemW, setItemW] = useState<number>(Number(currentQuery.iw) || 50);
  const [itemH, setItemH] = useState<number>(Number(currentQuery.ih) || 90);
  const [margin, setMargin] = useState<number>(Number(currentQuery.m) || 5);
  const [gap, setGap] = useState<number>(Number(currentQuery.g) || 3);

  // Usable area
  const usableW = Math.max(0, sheetW - margin * 2);
  const usableH = Math.max(0, sheetH - margin * 2);

  // Orientation 1: Standard
  const cols1 = Math.floor((usableW + gap) / (itemW + gap));
  const rows1 = Math.floor((usableH + gap) / (itemH + gap));
  const count1 = Math.max(0, cols1 * rows1);

  // Orientation 2: Rotated 90 deg
  const cols2 = Math.floor((usableW + gap) / (itemH + gap));
  const rows2 = Math.floor((usableH + gap) / (itemW + gap));
  const count2 = Math.max(0, cols2 * rows2);

  const bestIsRotated = count2 > count1;
  const bestCount = Math.max(count1, count2);
  const bestCols = bestIsRotated ? cols2 : cols1;
  const bestRows = bestIsRotated ? rows2 : rows1;
  const actualItemW = bestIsRotated ? itemH : itemW;
  const actualItemH = bestIsRotated ? itemW : itemH;

  const sheetArea = sheetW * sheetH;
  const usedArea = bestCount * itemW * itemH;
  const wastePercent = sheetArea > 0 ? ((sheetArea - usedArea) / sheetArea) * 100 : 0;

  const summary = `Tabaka: ${sheetW}×${sheetH} mm, Etiket: ${itemW}×${itemH} mm -> Tabaka Başına: ${bestCount} Adet (${
    bestIsRotated ? 'Yatay Dizilim' : 'Dikey Dizilim'
  }, Fire: %${formatNumber(wastePercent)})`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-5 sm:p-7 space-y-6">
      {/* Quick Preset Buttons */}
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="text-slate-500 py-1 font-medium">Hazır Tabaka:</span>
        <button
          onClick={() => {
            setSheetW(320);
            setSheetH(450);
          }}
          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium"
        >
          SRA3 (320×450)
        </button>
        <button
          onClick={() => {
            setSheetW(350);
            setSheetH(500);
          }}
          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium"
        >
          35×50 cm
        </button>
        <button
          onClick={() => {
            setSheetW(700);
            setSheetH(1000);
          }}
          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium"
        >
          70×100 cm
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Tabaka Eni (mm)
          </label>
          <input
            type="number"
            value={sheetW}
            onChange={(e) => setSheetW(Number(e.target.value))}
            className="w-full text-base font-bold p-2.5 border border-slate-300 rounded-xl"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Tabaka Boyu (mm)
          </label>
          <input
            type="number"
            value={sheetH}
            onChange={(e) => setSheetH(Number(e.target.value))}
            className="w-full text-base font-bold p-2.5 border border-slate-300 rounded-xl"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Kenar Boşluğu (mm)
          </label>
          <input
            type="number"
            value={margin}
            onChange={(e) => setMargin(Number(e.target.value))}
            className="w-full text-base font-bold p-2.5 border border-slate-300 rounded-xl"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Etiket Eni (mm)
          </label>
          <input
            type="number"
            value={itemW}
            onChange={(e) => setItemW(Number(e.target.value))}
            className="w-full text-base font-bold p-2.5 border border-slate-300 rounded-xl"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Etiket Boyu (mm)
          </label>
          <input
            type="number"
            value={itemH}
            onChange={(e) => setItemH(Number(e.target.value))}
            className="w-full text-base font-bold p-2.5 border border-slate-300 rounded-xl"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Bıçak / Ara Payı (mm)
          </label>
          <input
            type="number"
            value={gap}
            onChange={(e) => setGap(Number(e.target.value))}
            className="w-full text-base font-bold p-2.5 border border-slate-300 rounded-xl"
          />
        </div>
      </div>

      {/* Visual Result & SVG Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200">
        <div className="space-y-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Tabaka Başına Maksimum Adet
            </span>
            <div className="text-4xl font-black text-slate-900 mt-1">
              {bestCount} Adet
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Yerleşim Dizilimi: <span className="font-semibold text-slate-800">{bestCols} sütun × {bestRows} satır</span> ({bestIsRotated ? '90° Çevrilerek Yerleştirildi' : 'Düz Yerleşim'})
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2">
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="text-slate-500 block">Kâğıt Fire Oranı:</span>
              <span className="font-bold text-slate-900">%{formatNumber(wastePercent)}</span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="text-slate-500 block">1000 Adet İçin Tabaka:</span>
              <span className="font-bold text-slate-900">
                {bestCount > 0 ? Math.ceil(1000 / bestCount) : 0} Tabaka
              </span>
            </div>
          </div>
        </div>

        {/* SVG Diagram */}
        <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-slate-200 min-h-[180px]">
          <div className="text-[10px] text-slate-400 font-semibold uppercase mb-2">
            Görsel Tabaka Dizilim Şeması ({bestCols}×{bestRows})
          </div>
          <svg
            viewBox={`0 0 ${sheetW} ${sheetH}`}
            className="max-h-44 max-w-full border-2 border-slate-400 bg-slate-100 rounded shadow-xs"
          >
            {/* Margins */}
            <rect
              x={margin}
              y={margin}
              width={usableW}
              height={usableH}
              fill="none"
              stroke="#94a3b8"
              strokeDasharray="4"
            />
            {/* Draw items */}
            {Array.from({ length: bestRows }).map((_, r) =>
              Array.from({ length: bestCols }).map((_, c) => {
                const x = margin + c * (actualItemW + gap);
                const y = margin + r * (actualItemH + gap);
                return (
                  <rect
                    key={`${r}-${c}`}
                    x={x}
                    y={y}
                    width={actualItemW}
                    height={actualItemH}
                    fill="#3b82f6"
                    stroke="#1d4ed8"
                    strokeWidth="1"
                    rx="1"
                    opacity="0.8"
                  />
                );
              })
            )}
          </svg>
        </div>
      </div>

      <CalculatorActions
        toolSlug={tool.slug}
        toolTitle={tool.title}
        inputs={{ sw: sheetW, sh: sheetH, iw: itemW, ih: itemH, m: margin, g: gap }}
        results={{ primaryValue: `${bestCount} Adet`, bestCols, bestRows, wastePercent }}
        summaryText={summary}
      />
    </div>
  );
};

// ==========================================
// 9. YAKIT VE YOL MASRAFI HESAPLAMA
// ==========================================
const YakitCalculator = ({ tool, currentQuery, formatTRY, formatNumber }: any) => {
  const [distance, setDistance] = useState<number>(Number(currentQuery.km) || 450);
  const [consumption, setConsumption] = useState<number>(Number(currentQuery.lt) || 6.5);
  const [fuelPrice, setFuelPrice] = useState<number>(Number(currentQuery.price) || 44.5);
  const [passengers, setPassengers] = useState<number>(Number(currentQuery.pass) || 1);

  const totalLiters = (distance / 100) * consumption;
  const totalCost = totalLiters * fuelPrice;
  const costPerKm = distance > 0 ? totalCost / distance : 0;
  const costPerPerson = passengers > 0 ? totalCost / passengers : totalCost;

  const summary = `${distance} km yol, ${consumption} L/100km tüketim ile -> Toplam Yakıt: ${formatNumber(
    totalLiters
  )} Litre (${formatTRY(totalCost)}), Km Başı: ${formatTRY(costPerKm)}, Kişi Başı (${passengers} kişi): ${formatTRY(
    costPerPerson
  )}`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-5 sm:p-7 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Gidilecek Mesafe (km)
          </label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            100 km'de Tüketim (Litre)
          </label>
          <input
            type="number"
            step="0.1"
            value={consumption}
            onChange={(e) => setConsumption(Number(e.target.value))}
            className="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Yakıt Litre Fiyatı (TL)
          </label>
          <input
            type="number"
            step="0.1"
            value={fuelPrice}
            onChange={(e) => setFuelPrice(Number(e.target.value))}
            className="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Yolcu Sayısı (Kişi Başı Bölüşüm)
          </label>
          <input
            type="number"
            min={1}
            value={passengers}
            onChange={(e) => setPassengers(Math.max(1, Number(e.target.value)))}
            className="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Result Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
              Toplam Yakıt Masrafı
            </span>
            <div className="text-3xl sm:text-4xl font-black text-amber-400 mt-1">
              {formatTRY(totalCost)}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Gereken Toplam Yakıt:{' '}
              <span className="text-white font-bold">{formatNumber(totalLiters)} Litre</span>
            </div>
          </div>
          {passengers > 1 && (
            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-right">
              <span className="text-xs text-slate-400 block">Kişi Başı Tutar ({passengers} Yolcu):</span>
              <span className="text-2xl font-black text-emerald-400">{formatTRY(costPerPerson)}</span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center text-xs text-slate-400 pt-3">
          <span>Kilometre Başına Maliyet:</span>
          <span className="font-mono font-bold text-white text-sm">{formatTRY(costPerKm)} / km</span>
        </div>
      </div>

      <CalculatorActions
        toolSlug={tool.slug}
        toolTitle={tool.title}
        inputs={{ km: distance, lt: consumption, price: fuelPrice, pass: passengers }}
        results={{ primaryValue: formatTRY(totalCost), totalCost, totalLiters, costPerKm }}
        summaryText={summary}
      />
    </div>
  );
};

// ==========================================
// 10. MAAŞ ZAM ORANI HESAPLAMA
// ==========================================
const MaasZamCalculator = ({ tool, currentQuery, formatTRY, formatNumber }: any) => {
  const [currentSalary, setCurrentSalary] = useState<number>(
    Number(currentQuery.salary) || 28000
  );
  const [raisePercent, setRaisePercent] = useState<number>(
    Number(currentQuery.raise) || 35
  );

  const raiseAmount = (currentSalary * raisePercent) / 100;
  const newSalary = currentSalary + raiseAmount;
  const yearlyAddition = raiseAmount * 12;

  const summary = `Mevcut Maaş: ${formatTRY(currentSalary)}, %${raisePercent} zam ile -> Yeni Maaş: ${formatTRY(
    newSalary
  )} (+${formatTRY(raiseAmount)} / ay, Yıllık Ek Gelir: ${formatTRY(yearlyAddition)})`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-5 sm:p-7 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Mevcut Maaş (TL)
          </label>
          <input
            type="number"
            value={currentSalary}
            onChange={(e) => setCurrentSalary(Number(e.target.value))}
            className="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Zam Oranı (%)
          </label>
          <div className="relative">
            <input
              type="number"
              value={raisePercent}
              onChange={(e) => setRaisePercent(Number(e.target.value))}
              className="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none pr-8"
            />
            <span className="absolute right-3.5 top-3.5 text-slate-400 font-bold">%</span>
          </div>
        </div>
      </div>

      {/* Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200">
          <span className="text-xs font-semibold text-blue-700 uppercase">Yeni Zamlı Maaş</span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {formatTRY(newSalary)}
          </div>
          <p className="text-[11px] text-blue-600 mt-1">Aylık ödenecek yeni tutar</p>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200">
          <span className="text-xs font-semibold text-emerald-700 uppercase">Aylık Zam Tutarı</span>
          <div className="text-2xl font-black text-emerald-700 mt-1">
            +{formatTRY(raiseAmount)}
          </div>
          <p className="text-[11px] text-emerald-600 mt-1">Maaşa eklenen net zam</p>
        </div>

        <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200">
          <span className="text-xs font-semibold text-indigo-700 uppercase">Yıllık Toplam Artış</span>
          <div className="text-2xl font-black text-indigo-950 mt-1">
            {formatTRY(yearlyAddition)}
          </div>
          <p className="text-[11px] text-indigo-600 mt-1">12 aylık kümülatif kazanç</p>
        </div>
      </div>

      <CalculatorActions
        toolSlug={tool.slug}
        toolTitle={tool.title}
        inputs={{ salary: currentSalary, raise: raisePercent }}
        results={{ primaryValue: formatTRY(newSalary), raiseAmount, yearlyAddition }}
        summaryText={summary}
      />
    </div>
  );
};

// ==========================================
// 11. HİSSE MALİYET DÜŞÜRME HESAPLAMA
// ==========================================
const HisseMaliyetCalculator = ({ tool, currentQuery, formatTRY, formatNumber }: any) => {
  const [s1Lot, setS1Lot] = useState<number>(Number(currentQuery.l1) || 200);
  const [s1Price, setS1Price] = useState<number>(Number(currentQuery.p1) || 50);

  const [s2Lot, setS2Lot] = useState<number>(Number(currentQuery.l2) || 300);
  const [s2Price, setS2Price] = useState<number>(Number(currentQuery.p2) || 30);

  const [s3Lot, setS3Lot] = useState<number>(Number(currentQuery.l3) || 0);
  const [s3Price, setS3Price] = useState<number>(Number(currentQuery.p3) || 0);

  const totalLot = s1Lot + s2Lot + s3Lot;
  const totalMoney = s1Lot * s1Price + s2Lot * s2Price + s3Lot * s3Price;
  const newAverageCost = totalLot > 0 ? totalMoney / totalLot : 0;
  const costReduction = s1Price - newAverageCost;
  const reductionPercent = s1Price > 0 ? (costReduction / s1Price) * 100 : 0;

  const summary = `1. Alım: ${s1Lot} Lot @ ${s1Price} TL, 2. Alım: ${s2Lot} Lot @ ${s2Price} TL -> Toplam: ${totalLot} Lot, Yeni Ortalama Maliyet: ${formatNumber(
    newAverageCost
  )} TL (Maliyet ${formatNumber(costReduction)} TL düşürüldü)`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-5 sm:p-7 space-y-6">
      <div className="space-y-3">
        {/* Step 1 */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-xs font-bold text-slate-700 uppercase mb-2">
            1. Mevcut Portföy Alımı (Eski Pozisyon)
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-500 font-semibold block mb-1">
                Eldeki Lot Adedi
              </label>
              <input
                type="number"
                value={s1Lot}
                onChange={(e) => setS1Lot(Number(e.target.value))}
                className="w-full text-base font-bold p-2.5 border border-slate-300 rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-500 font-semibold block mb-1">
                İlk Alış Fiyatı (TL)
              </label>
              <input
                type="number"
                step="0.01"
                value={s1Price}
                onChange={(e) => setS1Price(Number(e.target.value))}
                className="w-full text-base font-bold p-2.5 border border-slate-300 rounded-lg bg-white"
              />
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-200">
          <div className="text-xs font-bold text-blue-900 uppercase mb-2">
            2. Yeni Kademe Alımı (Maliyet Düşürme Alımı)
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-500 font-semibold block mb-1">
                Yeni Alınacak Lot
              </label>
              <input
                type="number"
                value={s2Lot}
                onChange={(e) => setS2Lot(Number(e.target.value))}
                className="w-full text-base font-bold p-2.5 border border-slate-300 rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-500 font-semibold block mb-1">
                Yeni Alış Fiyatı (TL)
              </label>
              <input
                type="number"
                step="0.01"
                value={s2Price}
                onChange={(e) => setS2Price(Number(e.target.value))}
                className="w-full text-base font-bold p-2.5 border border-slate-300 rounded-lg bg-white"
              />
            </div>
          </div>
        </div>

        {/* Step 3 (Optional) */}
        <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200">
          <div className="text-xs font-semibold text-slate-600 uppercase mb-2">
            3. Ek Kademe Alımı (Opsiyonel)
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-500 block mb-1">3. Alım Lot</label>
              <input
                type="number"
                value={s3Lot}
                onChange={(e) => setS3Lot(Number(e.target.value))}
                className="w-full text-sm font-semibold p-2 border border-slate-300 rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-500 block mb-1">3. Alış Fiyatı (TL)</label>
              <input
                type="number"
                step="0.01"
                value={s3Price}
                onChange={(e) => setS3Price(Number(e.target.value))}
                className="w-full text-sm font-semibold p-2 border border-slate-300 rounded-lg bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Result Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
              Yeni Ortalama Birim Maliyet
            </span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 mt-1">
              {formatTRY(newAverageCost)}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              İlk maliyete göre düşüş:{' '}
              <span className="text-white font-bold">
                {costReduction > 0 ? `-${formatTRY(costReduction)} (%${formatNumber(reductionPercent)})` : 'Değişmedi'}
              </span>
            </div>
          </div>

          <div className="text-right sm:border-l sm:border-slate-800 sm:pl-6 space-y-1">
            <div className="text-xs text-slate-400">
              Toplam Portföy Lotu:{' '}
              <span className="font-bold text-white text-sm">{formatNumber(totalLot)} Lot</span>
            </div>
            <div className="text-xs text-slate-400">
              Toplam Harcanan Tutar:{' '}
              <span className="font-bold text-white text-sm">{formatTRY(totalMoney)}</span>
            </div>
          </div>
        </div>
      </div>

      <CalculatorActions
        toolSlug={tool.slug}
        toolTitle={tool.title}
        inputs={{ l1: s1Lot, p1: s1Price, l2: s2Lot, p2: s2Price, l3: s3Lot, p3: s3Price }}
        results={{ primaryValue: formatTRY(newAverageCost), totalLot, totalMoney }}
        summaryText={summary}
      />
    </div>
  );
};

// ==========================================
// 12. BİLEŞİK GETİRİ VE FAİZ HESAPLAMA
// ==========================================
const BilesikGetiriCalculator = ({ tool, currentQuery, formatTRY, formatNumber }: any) => {
  const [initial, setInitial] = useState<number>(Number(currentQuery.init) || 50000);
  const [monthly, setMonthly] = useState<number>(Number(currentQuery.mth) || 5000);
  const [annualRate, setAnnualRate] = useState<number>(Number(currentQuery.rate) || 30);
  const [years, setYears] = useState<number>(Number(currentQuery.yrs) || 5);

  const months = years * 12;
  const monthlyRate = annualRate / 100 / 12;

  let currentTotal = initial;
  let totalDeposited = initial;

  for (let i = 0; i < months; i++) {
    currentTotal = currentTotal * (1 + monthlyRate) + monthly;
    totalDeposited += monthly;
  }

  const interestEarned = currentTotal - totalDeposited;
  const gainRatio = totalDeposited > 0 ? (interestEarned / totalDeposited) * 100 : 0;

  const summary = `Başlangıç: ${formatTRY(initial)}, Ayda ${formatTRY(monthly)}, %${annualRate} yıllık getiriyle ${years} yıl sonunda -> Toplam: ${formatTRY(
    currentTotal
  )} (Yatırılan: ${formatTRY(totalDeposited)}, Kâr: ${formatTRY(interestEarned)})`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-5 sm:p-7 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Başlangıç Anaparası (TL)
          </label>
          <input
            type="number"
            value={initial}
            onChange={(e) => setInitial(Number(e.target.value))}
            className="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Aylık Düzenli Katkı (TL)
          </label>
          <input
            type="number"
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))}
            className="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Yıllık Tahmini Getiri (%)
          </label>
          <div className="relative">
            <input
              type="number"
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              className="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none pr-8"
            />
            <span className="absolute right-3.5 top-3.5 text-slate-400 font-bold">%</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Yatırım Süresi (Yıl)
          </label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Math.max(1, Number(e.target.value)))}
            className="w-full text-lg font-bold p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Result Cards & Visual Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
              {years} Yıl Sonunda Tahmini Toplam Portföy
            </span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 mt-1">
              {formatTRY(currentTotal)}
            </div>
          </div>
          <div className="text-right sm:border-l sm:border-slate-800 sm:pl-6 space-y-1">
            <div className="text-xs text-slate-400">
              Kazanılan Bileşik Kâr:{' '}
              <span className="font-bold text-emerald-300 text-sm">+{formatTRY(interestEarned)}</span>
            </div>
            <div className="text-xs text-slate-400">
              Kendi Cebinizden Çıkan Anapara:{' '}
              <span className="font-bold text-white text-sm">{formatTRY(totalDeposited)}</span>
            </div>
          </div>
        </div>

        {/* Visual Progress Ratio */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Anapara (%{formatNumber((totalDeposited / currentTotal) * 100, 1)})</span>
            <span className="text-emerald-400 font-semibold">Bileşik Faiz Getirisi (%{formatNumber(gainRatio, 1)})</span>
          </div>
          <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
            <div
              style={{ width: `${(totalDeposited / currentTotal) * 100}%` }}
              className="bg-blue-600 h-full"
              title="Yatırılan Anapara"
            />
            <div
              style={{ width: `${(interestEarned / currentTotal) * 100}%` }}
              className="bg-emerald-500 h-full"
              title="Bileşik Getiri Kârı"
            />
          </div>
        </div>
      </div>

      <CalculatorActions
        toolSlug={tool.slug}
        toolTitle={tool.title}
        inputs={{ init: initial, mth: monthly, rate: annualRate, yrs: years }}
        results={{ primaryValue: formatTRY(currentTotal), currentTotal, interestEarned }}
        summaryText={summary}
      />
    </div>
  );
};
