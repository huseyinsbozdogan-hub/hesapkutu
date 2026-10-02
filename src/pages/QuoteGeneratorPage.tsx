import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Plus,
  Trash2,
  Printer,
  Crown,
  Building,
  User,
  Calendar,
  Save,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { QuoteItem, Quote } from '../types';
import { MetaManager } from '../components/seo/MetaManager';

export const QuoteGeneratorPage: React.FC = () => {
  const { user, isPro, openAuthModal, quotes, saveQuote } = useApp();

  const [companyName, setCompanyName] = useState(
    user?.companyProfile?.companyName || 'HesapKutu Bilişim & Ticaret'
  );
  const [taxDetails, setTaxDetails] = useState(
    user?.companyProfile?.taxOffice
      ? `${user.companyProfile.taxOffice} - ${user.companyProfile.taxNumber}`
      : 'Kadıköy VD - 1234567890'
  );
  const [iban, setIban] = useState(
    user?.companyProfile?.iban || 'TR00 0000 0000 0000 0000 0000 00'
  );
  const [phone, setPhone] = useState(user?.companyProfile?.phone || '+90 (555) 000 0000');

  const [clientName, setClientName] = useState('Sayın Müşteri / Firma Yetkilisi');
  const [clientCompany, setClientCompany] = useState('Hedef İşletme A.Ş.');
  const [quoteNumber, setQuoteNumber] = useState(
    `TKF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
  );
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [validUntil, setValidUntil] = useState(
    new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [notes, setNotes] = useState(
    '1. Teklifimiz 15 gün süreyle geçerlidir.\n2. Fiyatlarımıza belirtilen KDV oranları dahildir.\n3. Teslimat süresi sipariş onayından itibaren 5 iş günüdür.'
  );

  const [items, setItems] = useState<QuoteItem[]>([
    {
      id: '1',
      description: 'Web & Mobil Arayüz Tasarımı ve Entegrasyonu',
      quantity: 1,
      unitPrice: 15000,
      discountPercent: 10,
      taxPercent: 20
    },
    {
      id: '2',
      description: 'Hesaplama Motoru Algoritma Geliştirme (Paket)',
      quantity: 2,
      unitPrice: 6000,
      discountPercent: 0,
      taxPercent: 20
    }
  ]);

  const [savedNotice, setSavedNotice] = useState(false);

  // Calculations
  const calculateTotals = () => {
    let subtotal = 0;
    let totalDiscount = 0;
    let totalTax = 0;

    items.forEach((item) => {
      const gross = item.quantity * item.unitPrice;
      const discount = (gross * item.discountPercent) / 100;
      const taxable = gross - discount;
      const tax = (taxable * item.taxPercent) / 100;

      subtotal += gross;
      totalDiscount += discount;
      totalTax += tax;
    });

    const grandTotal = subtotal - totalDiscount + totalTax;
    return { subtotal, totalDiscount, totalTax, grandTotal };
  };

  const { subtotal, totalDiscount, totalTax, grandTotal } = calculateTotals();

  const addItem = () => {
    const newItem: QuoteItem = {
      id: String(Date.now()),
      description: 'Yeni Ürün / Hizmet Kalemi',
      quantity: 1,
      unitPrice: 1000,
      discountPercent: 0,
      taxPercent: 20
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length <= 1) return;
    setItems(items.filter((it) => it.id !== id));
  };

  const updateItem = (id: string, field: keyof QuoteItem, val: any) => {
    setItems(
      items.map((it) => (it.id === id ? { ...it, [field]: val } : it))
    );
  };

  const formatTRY = (val: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      maximumFractionDigits: 2
    }).format(val);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveQuote = () => {
    const newQuote: Quote = {
      id: 'qt_' + Date.now(),
      quoteNumber,
      clientName,
      clientCompany,
      date,
      validUntil,
      notes,
      items,
      subtotal,
      totalDiscount,
      totalTax,
      grandTotal
    };
    saveQuote(newQuote);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      <MetaManager
        path="/teklif-olusturucu"
        title="Fiyat Teklifi Oluşturucu (PDF & Baskı) | HesapKutu PRO"
        description="Ürün ve hizmetleriniz için iskonto ve KDV hesaplamalı profesyonel fiyat teklifleri hazırlayın, yazdırın ve PDF olarak kaydedin."
      />

      {/* Top Banner & PRO Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">Kurumsal Teklif Oluşturucu</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-900 border border-amber-300">
                PRO Özellik
              </span>
            </div>
            <p className="text-xs text-slate-500">
              KDV, iskonto ve ara toplamları anlık hesaplanan antetli teklif sayfası oluşturun.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={handleSaveQuote}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            {savedNotice ? <Check className="w-4 h-4 text-emerald-600" /> : <Save className="w-4 h-4" />}
            <span>{savedNotice ? 'Kaydedildi' : 'Kaydet'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Yazdır / PDF Olarak Kaydet</span>
          </button>
        </div>
      </div>

      {!isPro && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between gap-3 text-xs text-amber-900 print:hidden">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Şu anda Teklif Oluşturucu önizleme modundasınız. Tekliflerinizi filigransız ve sınırsız
              kaydetmek için PRO pakete geçebilirsiniz.
            </span>
          </div>
          <button
            onClick={() => openAuthModal('pro')}
            className="font-bold underline text-amber-950 shrink-0"
          >
            PRO'ya Yükselt
          </button>
        </div>
      )}

      {/* A4 Printable Document Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-12 max-w-4xl mx-auto space-y-8 print:shadow-none print:border-none print:p-0">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-slate-200 pb-6">
          <div className="space-y-1">
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="text-2xl font-black text-slate-900 border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none w-full"
            />
            <input
              type="text"
              value={taxDetails}
              onChange={(e) => setTaxDetails(e.target.value)}
              className="text-xs text-slate-500 border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none w-full"
            />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="text-xs text-slate-500 border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none w-full"
            />
          </div>

          <div className="text-right sm:self-start space-y-1">
            <div className="text-xl font-bold uppercase tracking-wider text-blue-600">
              Fiyat Teklifi
            </div>
            <div className="flex items-center justify-end gap-2 text-xs text-slate-600">
              <span className="font-semibold">Teklif No:</span>
              <input
                type="text"
                value={quoteNumber}
                onChange={(e) => setQuoteNumber(e.target.value)}
                className="font-mono font-bold text-right border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none w-28"
              />
            </div>
            <div className="flex items-center justify-end gap-2 text-xs text-slate-600">
              <span className="font-semibold">Tarih:</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="text-right border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-end gap-2 text-xs text-slate-600">
              <span className="font-semibold">Geçerlilik:</span>
              <input
                type="date"
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
                className="text-right border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Client Details */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1 text-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Sayın Müşteri / Kurum
          </div>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full font-bold text-sm text-slate-800 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none"
          />
          <input
            type="text"
            value={clientCompany}
            onChange={(e) => setClientCompany(e.target.value)}
            className="w-full text-slate-600 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Item Rows Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b-2 border-slate-300 text-slate-700 uppercase font-bold tracking-wider">
                <th className="py-2.5 px-2">Ürün / Hizmet Açıklaması</th>
                <th className="py-2.5 px-2 w-16 text-center">Adet</th>
                <th className="py-2.5 px-2 w-28 text-right">Birim Fiyat</th>
                <th className="py-2.5 px-2 w-20 text-center">İskonto %</th>
                <th className="py-2.5 px-2 w-20 text-center">KDV %</th>
                <th className="py-2.5 px-2 w-28 text-right">Toplam</th>
                <th className="py-2.5 px-2 w-10 text-center print:hidden"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => {
                const gross = item.quantity * item.unitPrice;
                const disc = (gross * item.discountPercent) / 100;
                const taxable = gross - disc;
                const tax = (taxable * item.taxPercent) / 100;
                const rowTotal = taxable + tax;

                return (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="py-2 px-2">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        className="w-full font-medium text-slate-800 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none"
                      />
                    </td>
                    <td className="py-2 px-2 text-center">
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                        className="w-12 text-center font-semibold bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none"
                      />
                    </td>
                    <td className="py-2 px-2 text-right">
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(item.id, 'unitPrice', Number(e.target.value))}
                        className="w-24 text-right font-semibold bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none"
                      />
                    </td>
                    <td className="py-2 px-2 text-center">
                      <input
                        type="number"
                        value={item.discountPercent}
                        onChange={(e) =>
                          updateItem(item.id, 'discountPercent', Number(e.target.value))
                        }
                        className="w-12 text-center text-slate-600 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none"
                      />
                    </td>
                    <td className="py-2 px-2 text-center">
                      <input
                        type="number"
                        value={item.taxPercent}
                        onChange={(e) => updateItem(item.id, 'taxPercent', Number(e.target.value))}
                        className="w-12 text-center text-slate-600 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none"
                      />
                    </td>
                    <td className="py-2 px-2 text-right font-bold text-slate-900">
                      {formatTRY(rowTotal)}
                    </td>
                    <td className="py-2 px-2 text-center print:hidden">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-slate-300 hover:text-rose-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Add Row Button */}
        <div className="print:hidden">
          <button
            onClick={addItem}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Yeni Kalem Ekle</span>
          </button>
        </div>

        {/* Totals & Bank details */}
        <div className="flex flex-col sm:flex-row justify-between gap-6 pt-4 border-t border-slate-200">
          <div className="space-y-3 flex-1 text-xs">
            <div>
              <span className="font-bold text-slate-700 block mb-1">Teklif Notları & Koşullar:</span>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg text-slate-600 bg-slate-50/50 resize-none text-[11px]"
              />
            </div>
            <div>
              <span className="font-bold text-slate-700 block mb-1">Banka & IBAN Bilgisi:</span>
              <input
                type="text"
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                className="w-full p-1.5 font-mono text-xs border border-slate-200 rounded bg-slate-50/50"
              />
            </div>
          </div>

          <div className="w-full sm:w-72 space-y-2 text-xs">
            <div className="flex justify-between py-1 text-slate-600">
              <span>Ara Toplam (Brüt):</span>
              <span className="font-semibold text-slate-800">{formatTRY(subtotal)}</span>
            </div>
            {totalDiscount > 0 && (
              <div className="flex justify-between py-1 text-emerald-600 font-semibold">
                <span>Toplam İskonto:</span>
                <span>-{formatTRY(totalDiscount)}</span>
              </div>
            )}
            <div className="flex justify-between py-1 text-slate-600">
              <span>Toplam KDV:</span>
              <span className="font-semibold text-slate-800">{formatTRY(totalTax)}</span>
            </div>
            <div className="flex justify-between py-2 border-t-2 border-slate-900 text-sm font-black text-slate-900">
              <span>Genel Toplam:</span>
              <span className="text-base text-blue-600">{formatTRY(grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Document Footer Signature */}
        <div className="pt-10 flex justify-between text-xs text-slate-500 border-t border-slate-100">
          <div>
            <p className="font-semibold text-slate-700">Teklifi Veren</p>
            <p className="mt-8 text-slate-400">İmza & Kaşe</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-slate-700">Müşteri Onayı</p>
            <p className="mt-8 text-slate-400">İmza & Tarih</p>
          </div>
        </div>
      </div>
    </div>
  );
};
