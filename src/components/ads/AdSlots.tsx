import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

const ADSENSE_PUB_ID = (import.meta as any).env?.VITE_ADSENSE_PUB_ID || '';

interface AdContainerProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'vertical';
  className?: string;
}

export const AdBanner: React.FC<AdContainerProps> = ({ slotId = '1001', className = '' }) => {
  const { isPro, showAdPreview } = useApp();

  if (isPro) return null;

  if (ADSENSE_PUB_ID) {
    return (
      <div className={`w-full my-4 flex justify-center overflow-hidden min-h-[90px] ${className}`}>
        <AdSenseRealScript pubId={ADSENSE_PUB_ID} slotId={slotId} format="horizontal" />
      </div>
    );
  }

  if (showAdPreview) {
    return (
      <div className={`w-full my-4 flex justify-center ${className}`}>
        <div className="w-full max-w-[728px] h-[90px] border border-dashed border-slate-300 bg-slate-100/70 rounded-lg flex flex-col items-center justify-center p-2 text-center text-slate-400 select-none transition-all hover:bg-slate-100">
          <div className="text-xs font-semibold tracking-wide uppercase text-slate-500">
            Google AdSense Altyapısı – Banner Alanı (728×90)
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            AdSense yayıncı kimliği girildiğinde otomatik aktifleşir • PRO üyelerde gizlenir
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export const AdRectangle: React.FC<AdContainerProps> = ({ slotId = '2001', className = '' }) => {
  const { isPro, showAdPreview } = useApp();

  if (isPro) return null;

  if (ADSENSE_PUB_ID) {
    return (
      <div className={`my-6 flex justify-center overflow-hidden min-h-[250px] ${className}`}>
        <AdSenseRealScript pubId={ADSENSE_PUB_ID} slotId={slotId} format="rectangle" />
      </div>
    );
  }

  if (showAdPreview) {
    return (
      <div className={`my-6 flex justify-center ${className}`}>
        <div className="w-full max-w-[336px] h-[250px] border border-dashed border-slate-300 bg-slate-100/70 rounded-lg flex flex-col items-center justify-center p-4 text-center text-slate-400 select-none transition-all hover:bg-slate-100">
          <div className="text-xs font-semibold tracking-wide uppercase text-slate-500">
            Google AdSense – Dikdörtgen Reklam (336×280)
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            Sonuç kartı ve içerik altı konumlandırma için optimize edilmiştir.
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export const AdSidebar: React.FC<AdContainerProps> = ({ slotId = '3001', className = '' }) => {
  const { isPro, showAdPreview } = useApp();

  if (isPro) return null;

  if (ADSENSE_PUB_ID) {
    return (
      <div className={`w-[300px] overflow-hidden min-h-[600px] sticky top-24 ${className}`}>
        <AdSenseRealScript pubId={ADSENSE_PUB_ID} slotId={slotId} format="vertical" />
      </div>
    );
  }

  if (showAdPreview) {
    return (
      <div className={`w-[300px] sticky top-24 ${className}`}>
        <div className="w-full h-[600px] border border-dashed border-slate-300 bg-slate-100/70 rounded-xl flex flex-col items-center justify-center p-4 text-center text-slate-400 select-none transition-all hover:bg-slate-100">
          <div className="text-xs font-semibold tracking-wide uppercase text-slate-500">
            Google AdSense – Sidebar Alanı (300×600)
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            Masaüstü yan panel görünürlük alanı.
          </div>
        </div>
      </div>
    );
  }

  return null;
};

// Component for rendering real Google AdSense tag safely
const AdSenseRealScript: React.FC<{ pubId: string; slotId: string; format: string }> = ({
  pubId,
  slotId,
  format
}) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <div ref={adRef} className="w-full flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={pubId}
        data-ad-slot={slotId}
        data-ad-format={format === 'horizontal' ? 'horizontal' : format === 'vertical' ? 'vertical' : 'auto'}
        data-full-width-responsive="true"
      />
    </div>
  );
};
