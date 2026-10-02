import { CalculatorDefinition } from '../types';

export const CALCULATORS: CalculatorDefinition[] = [
  {
    id: 'yuzde',
    slug: 'yuzde-hesaplama',
    title: 'Yüzde Hesaplama',
    seoTitle: 'Yüzde Hesaplama – Pratik ve Hızlı Yüzde Bulma Aracı | HesapKutu',
    metaDescription: 'Bir sayının yüzdesini, bir sayının diğerine oranını ve temel yüzde işlemlerini saniyeler içinde ücretsiz hesaplayın.',
    category: 'Matematik & Temel',
    categorySlug: 'matematik',
    shortDescription: 'Bir sayının belirli bir yüzdesini bulun veya iki sayı arasındaki yüzde oranını kolayca hesaplayın.',
    iconName: 'Percent',
    formula: 'Yüzde Değeri = (Sayı × Yüzde Oranı) ÷ 100',
    howItWorks: [
      'Hesaplamak istediğiniz ana sayıyı (A) girin.',
      'Almak istediğiniz yüzde oranını (B) belirtin.',
      'Sayı ile oran çarpılarak 100\'e bölünür ve net yüzde tutarı anında bulunur.'
    ],
    example: {
      scenario: '5.000 TL tutarındaki bir paranın %18\'i ne kadardır?',
      calculation: '(5.000 × 18) ÷ 100 = 90.000 ÷ 100',
      result: '900 TL'
    },
    faqs: [
      {
        question: 'Yüzde hesaplama formülü nedir?',
        answer: 'Bir A sayısının %B\'sini bulmak için formül: (A × B) / 100 şeklindedir. Örneğin 200 sayısının %15\'i: (200 × 15) / 100 = 30\'dur.'
      },
      {
        question: 'Bir sayının başka bir sayının yüzde kaçı olduğunu nasıl bulurum?',
        answer: 'A sayısı B sayısının yüzde kaçıdır sorusu için formül: (A ÷ B) × 100 formülüdür. Örneğin 25 sayısı 100\'ün %25\'idir.'
      }
    ],
    relatedSlugs: ['yuzde-artis-hesaplama', 'iskonto-hesaplama', 'kdv-hesaplama', 'kar-marji-hesaplama'],
    isPopular: true,
    defaultInputs: {
      mode: 'percent_of',
      baseNumber: 1000,
      percentage: 20,
      partNumber: 250,
      totalNumber: 1000
    }
  },
  {
    id: 'yuzde-artis',
    slug: 'yuzde-artis-hesaplama',
    title: 'Yüzde Artış ve Azalış Hesaplama',
    seoTitle: 'Yüzde Artış ve Azalış Hesaplama – Fark ve Değişim Oranı | HesapKutu',
    metaDescription: 'İki değer arasındaki yüzde artışını veya azalışını hesaplayın. Eski ve yeni fiyat değişim oranlarını tek tıkla görün.',
    category: 'Matematik & Temel',
    categorySlug: 'matematik',
    shortDescription: 'Eski değer ile yeni değer arasındaki artış veya azalış yüzdesini ve net farkı hesaplar.',
    iconName: 'TrendingUp',
    formula: 'Değişim Oranı (%) = [ (Yeni Değer - Eski Değer) ÷ Eski Değer ] × 100',
    howItWorks: [
      'İlk (eski) değeri ve son (yeni) değeri alanlara yazın.',
      'Sonuç pozitif çıkarsa yüzde artış, negatif çıkarsa yüzde azalış (düşüş) olarak raporlanır.',
      'Ayrıca orijinal sayıya doğrudan yüzde ekleme veya çıkarma seçeneği de mevcuttur.'
    ],
    example: {
      scenario: 'Bir ürünün fiyatı 200 TL\'den 260 TL\'ye yükseldiğinde artış oranı nedir?',
      calculation: '((260 - 200) ÷ 200) × 100 = (60 ÷ 200) × 100',
      result: '%30 Artış (+60 TL fark)'
    },
    faqs: [
      {
        question: 'Yüzde artış nasıl hesaplanır?',
        answer: 'Yeni değerden eski değer çıkarılır, fark eski değere bölünür ve 100 ile çarpılır.'
      },
      {
        question: 'Sonuç eksi çıkarsa ne anlama gelir?',
        answer: 'Eksi değer, değerde bir düşüş (azalış ya da indirim) olduğunu gösterir.'
      }
    ],
    relatedSlugs: ['yuzde-hesaplama', 'maas-zam-hesaplama', 'kar-zarar-hesaplama', 'iskonto-hesaplama'],
    isPopular: true,
    defaultInputs: {
      oldValue: 200,
      newValue: 260
    }
  },
  {
    id: 'kar-zarar',
    slug: 'kar-zarar-hesaplama',
    title: 'Kâr Zarar Hesaplama',
    seoTitle: 'Kâr Zarar Hesaplama – Alış, Satış ve Kâr Oranı Hesaplayıcı | HesapKutu',
    metaDescription: 'Alış fiyatı, satış fiyatı ve ek maliyetleri girerek net kâr/zarar tutarınızı ve yüzdesini kolayca hesaplayın.',
    category: 'Para & Finans',
    categorySlug: 'finans',
    shortDescription: 'Ürün alış ve satış fiyatları üzerinden net kazanç, zarar tutarı ve kâr yüzdesini belirleyin.',
    iconName: 'BadgePercent',
    formula: 'Net Kâr = Satış Fiyatı - (Alış Fiyatı + Ek Giderler)',
    howItWorks: [
      'Ürünün alış fiyatını ve varsa kargo, paketleme gibi ek giderlerini girin.',
      'Planlanan satış fiyatını belirtin.',
      'Net kâr tutarı, kârlılık yüzdesi ve maliyete göre kâr oranı anında hesaplanır.'
    ],
    example: {
      scenario: 'Alış fiyatı 400 TL, kargo masrafı 50 TL olan bir ürün 600 TL\'ye satılırsa kâr nedir?',
      calculation: 'Toplam Maliyet: 400 + 50 = 450 TL. Kâr: 600 - 450 = 150 TL. Oran: (150 / 450) × 100',
      result: '150 TL Net Kâr (%33,33 Kâr Oranı)'
    },
    faqs: [
      {
        question: 'Kâr oranı maliyet üzerinden mi satış üzerinden mi hesaplanır?',
        answer: 'Kâr yüzdesi genellikle maliyet üzerinden (Markup) ya da satış fiyatı üzerinden (Brüt Kâr Marjı) ifade edilir. Aracımız her iki metriği de gösterir.'
      }
    ],
    relatedSlugs: ['kar-marji-hesaplama', 'kdv-hesaplama', 'iskonto-hesaplama', 'hisse-maliyet-hesaplama'],
    isPopular: true,
    defaultInputs: {
      buyPrice: 400,
      sellPrice: 600,
      extraCost: 50
    }
  },
  {
    id: 'kar-marji',
    slug: 'kar-marji-hesaplama',
    title: 'Kâr Marjı Hesaplama',
    seoTitle: 'Kâr Marjı Hesaplama – Brüt Kâr Marjı ve Markup Bulma | HesapKutu',
    metaDescription: 'Ürün maliyeti ve hedeflenen kâr marjına göre satış fiyatı belirleyin veya mevcut satıştan kâr marjınızı hesaplayın.',
    category: 'Ticaret & E-Ticaret',
    categorySlug: 'ticaret',
    shortDescription: 'Brüt kâr marjı (profit margin) ve kâr haddi (markup) arasındaki farkı net olarak görün ve fiyatlandırın.',
    iconName: 'Coins',
    formula: 'Kâr Marjı (%) = [ (Satış Fiyatı - Maliyet) ÷ Satış Fiyatı ] × 100',
    howItWorks: [
      'Maliyetinizi ve satış fiyatınızı girin (veya hedef marjınızı belirtin).',
      'Satış fiyatı üzerinden elde edilen brüt marj ile maliyet üzerine eklenen kâr haddi (markup) ayrı ayrı listelenir.'
    ],
    example: {
      scenario: 'Maliyeti 100 TL olan bir ürünü 150 TL\'ye satarsak kâr marjı ve kâr haddi nedir?',
      calculation: 'Kâr: 50 TL. Kâr Marjı: 50 / 150 = %33,33. Kâr Haddi (Markup): 50 / 100 = %50',
      result: '%33,33 Kâr Marjı | %50 Kâr Haddi'
    },
    faqs: [
      {
        question: 'Kâr marjı ile kâr haddi (markup) arasındaki fark nedir?',
        answer: 'Kâr marjı, kârın nihai satış fiyatına oranıdır. Kâr haddi ise kârın maliyet tutarına oranıdır. Marj hiçbir zaman %100\'ü geçemezken markup %100\'ün üzerine çıkabilir.'
      }
    ],
    relatedSlugs: ['kar-zarar-hesaplama', 'kdv-hesaplama', 'iskonto-hesaplama'],
    isPopular: true,
    defaultInputs: {
      cost: 100,
      revenue: 150
    }
  },
  {
    id: 'kdv',
    slug: 'kdv-hesaplama',
    title: 'KDV Hesaplama',
    seoTitle: 'KDV Hesaplama – KDV Dahil ve Hariç Hesaplayıcı | HesapKutu',
    metaDescription: '%1, %10, %20 güncel KDV oranları ile KDV dahil ve KDV hariç tutarları, matrahı ve KDV tutarını anında hesaplayın.',
    category: 'Para & Finans',
    categorySlug: 'finans',
    shortDescription: 'Güncel Türkiye vergi oranlarına (%1, %10, %20) uygun KDV dahil ve hariç matrah ayrıştırma aracı.',
    iconName: 'Receipt',
    formula: 'KDV Dahil = Matrah × (1 + KDV Oranı/100) | KDV Hariç = Tutar ÷ (1 + KDV Oranı/100)',
    howItWorks: [
      'Tutarı girin ve işlem türünü seçin (KDV Hariçten Dahile veya Dahilden Harice).',
      'KDV oranını (%1, %10, %20 veya özel oran) belirleyin.',
      'Sistem matrah tutarını ve ödenecek net KDV tutarını ayrıştırıp sunar.'
    ],
    example: {
      scenario: '10.000 TL KDV hariç faturanın %20 KDV dahil tutarı ve KDV\'si nedir?',
      calculation: 'KDV Tutarı: 10.000 × 0,20 = 2.000 TL. Genel Toplam: 10.000 + 2.000 = 12.000 TL',
      result: 'KDV: 2.000 TL | Toplam: 12.000 TL'
    },
    faqs: [
      {
        question: 'Türkiye\'de güncel genel KDV oranları nelerdir?',
        answer: 'Temel gıda ve bazı tarım ürünlerinde %1, yeme-içme ve tekstil gibi alanlarda %10, genel ürün ve hizmetlerde ise standart oran %20\'dir.'
      },
      {
        question: 'KDV dahil faturadan KDV nasıl çıkarılır?',
        answer: 'Örneğin %20 KDV dahil 1.200 TL olan bir tutarın KDV hariç matrahı: 1.200 ÷ 1,20 = 1.000 TL\'dir. KDV ise 200 TL\'dir.'
      }
    ],
    relatedSlugs: ['iskonto-hesaplama', 'kar-zarar-hesaplama', 'kar-marji-hesaplama'],
    isPopular: true,
    defaultInputs: {
      amount: 10000,
      vatRate: 20,
      mode: 'exclusive_to_inclusive' // exclusive_to_inclusive or inclusive_to_exclusive
    }
  },
  {
    id: 'iskonto',
    slug: 'iskonto-hesaplama',
    title: 'İskonto Hesaplama',
    seoTitle: 'İskonto Hesaplama – İndirim ve Kademeli İskonto Aracı | HesapKutu',
    metaDescription: 'Liste fiyatı üzerinden tekli veya peş peşe kademeli iskonto oranlarını hesaplayın. Net indirimli fiyatı ve kazancınızı görün.',
    category: 'Ticaret & E-Ticaret',
    categorySlug: 'ticaret',
    shortDescription: 'Ürün liste fiyatı üzerinden indirim tutarı ve toptan ticarette kullanılan kademeli iskonto hesaplayıcısı.',
    iconName: 'Tag',
    formula: 'İndirimli Fiyat = Liste Fiyatı × (1 - İskonto1/100) × (1 - İskonto2/100)',
    howItWorks: [
      'Orijinal liste fiyatını yazın.',
      '1. İskonto oranını girin. Varsa toptan ticaretteki 2. kademeli iskonto oranını ekleyin.',
      'Net satış fiyatı, sağlanan toplam indirim tutarı ve efektif indirim oranı hesaplanır.'
    ],
    example: {
      scenario: '1.000 TL liste fiyatı olan ürüne %20 + %10 kademeli iskonto uygulanırsa sonuç ne olur?',
      calculation: '1. İskonto sonrası: 1.000 - 200 = 800 TL. 2. İskonto sonrası: 800 - 80 = 720 TL. Toplam İndirim: 280 TL (%28 efektif iskonto).',
      result: 'Net Fiyat: 720 TL (İndirim: 280 TL)'
    },
    faqs: [
      {
        question: 'Kademeli iskonto doğrudan toplanır mı?',
        answer: 'Hayır, %20 + %10 iskonto %30 yapmaz. İkinci iskonto, birinci indirim yapıldıktan sonra kalan ara tutar üzerinden düşülür.'
      }
    ],
    relatedSlugs: ['kdv-hesaplama', 'kar-zarar-hesaplama', 'yuzde-hesaplama'],
    isPopular: true,
    defaultInputs: {
      price: 1000,
      discount1: 20,
      discount2: 10
    }
  },
  {
    id: 'metrekare',
    slug: 'metrekare-hesaplama',
    title: 'Metrekare (m²) Hesaplama',
    seoTitle: 'Metrekare Hesaplama – Alan, Parke ve Seramik Fire Hesaplayıcı | HesapKutu',
    metaDescription: 'Oda ve alanların metrekare ölçüsünü hesaplayın. Parke, seramik ve boya için fire payı ve gereken paket sayısını bulun.',
    category: 'İnşaat & Üretim',
    categorySlug: 'insaat',
    shortDescription: 'Zemin, duvar veya oda alanlarını m² olarak hesaplayıp malzeme paket ihtiyacını belirleyin.',
    iconName: 'Maximize2',
    formula: 'Alan (m²) = Genişlik (m) × Uzunluk (m) × Adet',
    howItWorks: [
      'Alanın en ve boy ölçülerini metre veya santimetre cinsinden girin.',
      'Zemin kaplaması için önerilen fire payını (%5 - %15) seçin.',
      'Paket/kutu kapsama alanını girerek tam olarak kaç paket malzeme satın almanız gerektiğini görün.'
    ],
    example: {
      scenario: 'Eni 4 metre, boyu 5 metre olan bir salon için %10 fire payı ve 2 m²\'lik parke paketiyle kaç paket gerekir?',
      calculation: 'Net Alan: 4 × 5 = 20 m². Fireli Alan: 20 × 1,10 = 22 m². Paket Sayısı: 22 ÷ 2 = 11 paket.',
      result: '22 m² (11 Paket Parke)'
    },
    faqs: [
      {
        question: 'Parke veya fayans alırken ne kadar fire payı bırakılmalıdır?',
        answer: 'Düz döşemelerde genellikle %10, çapraz veya desenli döşemelerde ise %15 fire payı önerilir.'
      }
    ],
    relatedSlugs: ['etiket-yerlesim-hesaplama', 'yuzde-hesaplama'],
    isPopular: true,
    defaultInputs: {
      width: 4,
      length: 5,
      unit: 'm', // 'm' or 'cm'
      wastePercent: 10,
      packageCoverage: 2
    }
  },
  {
    id: 'etiket-yerlesim',
    slug: 'etiket-yerlesim-hesaplama',
    title: 'Etiket ve Baskı Yerleşim Hesaplama',
    seoTitle: 'Etiket Yerleşim Hesaplama – Tabaka Kâğıt Dizilim ve Fire Hesaplayıcı | HesapKutu',
    metaDescription: 'Baskı ve matbaa işlerinde tabaka kâğıda en uygun etiket dizilimini, maksimum adet ve minimum fire oranını hesaplayın.',
    category: 'İnşaat & Üretim',
    categorySlug: 'uretim',
    shortDescription: 'Matbaa ve ambalaj üreticileri için tabaka ebadına maksimum etiket dizilim optimizasyonu.',
    iconName: 'LayoutGrid',
    formula: 'Adet = (Tabaka Eni ÷ Etiket Eni) × (Tabaka Boyu ÷ Etiket Boyu)',
    howItWorks: [
      'Tabaka kağıt ölçülerini (örneğin 320x450 mm veya 700x1000 mm) girin.',
      'Etiket veya kart ölçülerini ve bıçak/makas payını (örneğin 3 mm) yazın.',
      'Algoritma hem dikey hem yatay yerleşimi karşılaştırarak en az fire veren dizilimi ve tabaka başına adedi bulur.'
    ],
    example: {
      scenario: '320 × 450 mm tabakaya 50 × 90 mm kartvizit (2 mm bıçak payı ile) kaç adet sığar?',
      calculation: 'Etiket + Pay: 54 × 94 mm. Yatay ve dikey kombinasyonlar hesaplanır.',
      result: 'Tabaka Başına: 24 Adet (Fire: %18,5)'
    },
    faqs: [
      {
        question: 'Bıçak payı neden önemlidir?',
        answer: 'Giyotin veya lazer kesimde kâğıt esnemesini ve kesim kaymalarını önlemek için etiketler arasında genelde 2-3 mm boşluk bırakılır.'
      }
    ],
    relatedSlugs: ['metrekare-hesaplama', 'kar-zarar-hesaplama'],
    isPopular: true,
    defaultInputs: {
      sheetWidth: 320,
      sheetHeight: 450,
      itemWidth: 50,
      itemHeight: 90,
      margin: 5,
      gap: 3
    }
  },
  {
    id: 'yakit',
    slug: 'yakit-hesaplama',
    title: 'Yakıt ve Yol Masrafı Hesaplama',
    seoTitle: 'Yakıt Tüketimi ve Yol Masrafı Hesaplama – Km Başı Maliyet | HesapKutu',
    metaDescription: 'Gideceğiniz mesafe, aracınızın 100 km\'deki tüketimi ve akaryakıt fiyatıyla toplam yol masrafını ve kişi başı ücreti hesaplayın.',
    category: 'Otomotiv & Seyahat',
    categorySlug: 'otomotiv',
    shortDescription: 'Gidilecek rota için toplam benzin/motorin/LPG tutarını, km başına maliyeti ve kişi başı bölüşümünü hesaplar.',
    iconName: 'Fuel',
    formula: 'Toplam Tutar = (Mesafe ÷ 100) × 100km Tüketim × Yakıt Fiyatı',
    howItWorks: [
      'Gidilecek toplam yol mesafesini (km) girin.',
      'Aracınızın ortalama 100 km yakıt tüketimini (litre) ve güncel litre fiyatını belirtin.',
      'Yolculuk maliyetini yolcular arasında bölüştürmek için yolcu sayısını belirleyin.'
    ],
    example: {
      scenario: '450 km mesafe için 100 km\'de 6,5 litre yakan bir araçta benzin 44 TL ise masraf nedir?',
      calculation: '(450 ÷ 100) × 6,5 = 29,25 Litre tüketim. 29,25 × 44 TL = 1.287 TL',
      result: '1.287 TL Toplam (Km Başı: 2,86 TL)'
    },
    faqs: [
      {
        question: 'Aracımın 100 km\'deki tüketimini nasıl öğrenebilirim?',
        answer: 'Deponuzu tam doldurup sayacı sıfırlayın. Bir süre sonra tekrar tam doldurarak aldığınız yakıt litresini yapılan kilometreye bölüp 100 ile çarpın.'
      }
    ],
    relatedSlugs: ['yuzde-hesaplama', 'kar-zarar-hesaplama'],
    isPopular: true,
    defaultInputs: {
      distanceKm: 450,
      consumptionPer100: 6.5,
      fuelPrice: 44.5,
      passengers: 1
    }
  },
  {
    id: 'maas-zam',
    slug: 'maas-zam-hesaplama',
    title: 'Maaş Zam Oranı Hesaplama',
    seoTitle: 'Maaş Zam Oranı ve Yeni Maaş Hesaplama – Zam Hesaplayıcı | HesapKutu',
    metaDescription: 'Eski maaş ve zam oranıyla yeni zamlı maaşınızı, net zam farkını veya verilen yeni maaşa göre zam yüzdesini hesaplayın.',
    category: 'Para & Finans',
    categorySlug: 'finans',
    shortDescription: 'Çalışanlar ve işverenler için yeni maaş, net zam tutarı ve yıllık toplam gelir artışını hesaplar.',
    iconName: 'Briefcase',
    formula: 'Yeni Maaş = Eski Maaş × (1 + Zam Oranı / 100)',
    howItWorks: [
      'Mevcut maaşınızı girin.',
      'Zam oranını (%) veya doğrudan zam miktarını yazın.',
      'Aylık net zam farkı, yeni maaş ve 12 aylık kümülatif kazanç anında gösterilir.'
    ],
    example: {
      scenario: '28.000 TL maaşa %35 zam yapılırsa yeni maaş ve artış miktarı ne olur?',
      calculation: 'Zam Tutarı: 28.000 × 0,35 = 9.800 TL. Yeni Maaş: 28.000 + 9.800 = 37.800 TL',
      result: 'Yeni Maaş: 37.800 TL (+9.800 TL/ay)'
    },
    faqs: [
      {
        question: 'Zam oranı brüt mü net maaşa mı uygulanmalıdır?',
        answer: 'İş sözleşmenizin esasına göre brüt veya net üzerinden hesaplanabilir. Genellikle sözleşmedeki baz rakam üzerinden oran işletilir.'
      }
    ],
    relatedSlugs: ['yuzde-artis-hesaplama', 'yuzde-hesaplama', 'bilesik-getiri-hesaplama'],
    isPopular: true,
    defaultInputs: {
      currentSalary: 28000,
      raisePercent: 35
    }
  },
  {
    id: 'hisse-maliyet',
    slug: 'hisse-maliyet-hesaplama',
    title: 'Hisse Maliyet Düşürme Hesaplama',
    seoTitle: 'Hisse Maliyet Düşürme ve Ortalama Lot Hesaplama | HesapKutu',
    metaDescription: 'Borsa ve kripto yatırımlarında kademeli alımlarla yeni ortalama maliyetinizi ve gereken ek lot miktarını hesaplayın.',
    category: 'Yatırım & Borsa',
    categorySlug: 'yatirim',
    shortDescription: 'Farklı fiyatlardan yapılan alımlarla portföyün ağırlıklı ortalama birim maliyetini (Weighted Average Cost) belirleyin.',
    iconName: 'CandlestickChart',
    formula: 'Yeni Ortalama Maliyet = Toplam Harcanan Para ÷ Toplam Lot Sayısı',
    howItWorks: [
      'Mevcut elinizdeki lot miktarını ve alış maliyetinizi girin.',
      'Yeni almayı planladığınız lot adedi ve alım fiyatını ekleyin.',
      'İkinci, üçüncü alımlar sonrası yeni maliyetiniz ve başa baş noktası anında listelenir.'
    ],
    example: {
      scenario: '50 TL\'den 200 lot hisseniz varken, hisse 30 TL\'ye düştüğünde 300 lot daha alırsanız yeni maliyet nedir?',
      calculation: '1. Alım: 200 × 50 = 10.000 TL. 2. Alım: 300 × 30 = 9.000 TL. Toplam: 19.000 TL ÷ 500 Lot = 38 TL',
      result: 'Yeni Ortalama Maliyet: 38,00 TL (Maliyet 12 TL düşürüldü)'
    },
    faqs: [
      {
        question: 'Maliyet düşürmek her zaman mantıklı mıdır?',
        answer: 'Şirketin temel göstergeleri sağlamsa kademeli alım maliyeti aşağı çekerek kâra geçişi hızlandırabilir; ancak düşüş trendindeki kalitesiz varlıklarda risk artabilir.'
      }
    ],
    relatedSlugs: ['bilesik-getiri-hesaplama', 'kar-zarar-hesaplama', 'yuzde-artis-hesaplama'],
    isPopular: true,
    defaultInputs: {
      step1Lot: 200,
      step1Price: 50,
      step2Lot: 300,
      step2Price: 30,
      step3Lot: 0,
      step3Price: 0
    }
  },
  {
    id: 'bilesik-getiri',
    slug: 'bilesik-getiri-hesaplama',
    title: 'Bileşik Getiri ve Faiz Hesaplama',
    seoTitle: 'Bileşik Getiri ve Yatırım Büyüme Hesaplayıcı | HesapKutu',
    metaDescription: 'Düzenli aylık tasarruf ve yıllık bileşik getiri oranıyla gelecekteki servet birikiminizi ve getiri kârını simüle edin.',
    category: 'Yatırım & Borsa',
    categorySlug: 'yatirim',
    shortDescription: 'Albert Einstein\'ın "dünyanın sekizinci harikası" dediği bileşik faiz ile paranın zaman değerini hesaplayın.',
    iconName: 'LineChart',
    formula: 'Gelecek Değer = Anapara × (1 + r/n)^(n×t) + Düzenli Katkı Gelecek Değeri',
    howItWorks: [
      'Başlangıç birikim tutarını (TL) girin.',
      'Her ay düzenli yatırabileceğiniz tasarruf miktarını belirtin.',
      'Beklenen yıllık getiri oranını (%) ve vade süresini (yıl) seçin.',
      'Yatırılan öz sermaye ile bileşik getiriden kazanılan kârın yıllara göre grafiğini görün.'
    ],
    example: {
      scenario: '50.000 TL başlangıç ile ayda 5.000 TL ekleyerek yıllık %30 getiriyle 5 yıl sonunda birikim ne olur?',
      calculation: 'Yatırılan Toplam Öz Sermaye: 350.000 TL. Bileşik Getiri Etkisiyle Toplam:',
      result: 'Tahmini Toplam: ~826.400 TL (Kâr: ~476.400 TL)'
    },
    faqs: [
      {
        question: 'Bileşik getiri ile basit getiri arasındaki fark nedir?',
        answer: 'Basit getiride sadece ilk anapara kâr getirir. Bileşik getiride ise her dönem kazanılan kâr da anaparaya eklenerek kârın da kârı kazanılır.'
      }
    ],
    relatedSlugs: ['hisse-maliyet-hesaplama', 'kar-zarar-hesaplama', 'yuzde-hesaplama'],
    isPopular: true,
    defaultInputs: {
      initialDeposit: 50000,
      monthlyAddition: 5000,
      annualRate: 30,
      years: 5
    }
  }
];

export const CATEGORIES: { name: CalculatorDefinition['category']; slug: string; description: string; icon: string }[] = [
  {
    name: 'Para & Finans',
    slug: 'finans',
    description: 'KDV, kâr/zarar, vergi ve maaş gibi finansal operasyon hesaplamaları.',
    icon: 'Wallet'
  },
  {
    name: 'Matematik & Temel',
    slug: 'matematik',
    description: 'Günlük yüzde, artış-azalış ve temel oran-orantı araçları.',
    icon: 'Calculator'
  },
  {
    name: 'Ticaret & E-Ticaret',
    slug: 'ticaret',
    description: 'İskonto, kâr marjı, ürün maliyet ve fiyatlandırma hesaplamaları.',
    icon: 'ShoppingBag'
  },
  {
    name: 'İnşaat & Üretim',
    slug: 'insaat',
    description: 'Oda metrekare, seramik fire payı ve tabaka etiket dizilim optimizasyonu.',
    icon: 'Hammer'
  },
  {
    name: 'Yatırım & Borsa',
    slug: 'yatirim',
    description: 'Hisse senedi ortalama maliyet düşürme ve uzun vadeli bileşik getiri simülatörü.',
    icon: 'TrendingUp'
  },
  {
    name: 'Otomotiv & Seyahat',
    slug: 'otomotiv',
    description: 'Yakıt tüketimi, yol güzergahı masrafı ve km başı maliyet paylaşımı.',
    icon: 'Car'
  }
];
