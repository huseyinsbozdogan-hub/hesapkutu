<?php
/**
 * HesapKutu - 12 Hesaplama Aracının Tanımları ve Verileri
 */

$CALCULATORS = [
    'yuzde-hesaplama' => [
        'id' => 'yuzde',
        'slug' => 'yuzde-hesaplama',
        'title' => 'Yüzde Hesaplama',
        'seo_title' => 'Yüzde Hesaplama – Pratik ve Hızlı Yüzde Bulma Aracı | HesapKutu',
        'meta_description' => 'Bir sayının yüzdesini, bir sayının diğerine oranını ve temel yüzde işlemlerini saniyeler içinde ücretsiz hesaplayın.',
        'category' => 'Matematik & Temel',
        'category_slug' => 'matematik',
        'short_description' => 'Bir sayının belirli bir yüzdesini bulun veya iki sayı arasındaki yüzde oranını kolayca hesaplayın.',
        'formula' => 'Yüzde Değeri = (Sayı × Yüzde Oranı) ÷ 100',
        'how_it_works' => [
            'Hesaplamak istediğiniz ana sayıyı (A) girin.',
            'Almak istediğiniz yüzde oranını (B) belirtin.',
            'Sayı ile oran çarpılarak 100\'e bölünür ve net yüzde tutarı anında bulunur.'
        ],
        'example' => [
            'scenario' => '5.000 TL tutarındaki bir paranın %18\'i ne kadardır?',
            'calculation' => '(5.000 × 18) ÷ 100 = 90.000 ÷ 100',
            'result' => '900 TL'
        ],
        'faqs' => [
            [
                'q' => 'Yüzde hesaplama formülü nedir?',
                'a' => 'Bir A sayısının %B\'sini bulmak için formül: (A × B) / 100 şeklindedir.'
            ],
            [
                'q' => 'A sayısı B sayısının yüzde kaçıdır nasıl hesaplanır?',
                'a' => 'Formül: (A ÷ B) × 100 şeklindedir. Örneğin 25 sayısı 100\'ün %25\'idir.'
            ]
        ],
        'related' => ['yuzde-artis-hesaplama', 'iskonto-hesaplama', 'kdv-hesaplama']
    ],
    'yuzde-artis-hesaplama' => [
        'id' => 'yuzde-artis',
        'slug' => 'yuzde-artis-hesaplama',
        'title' => 'Yüzde Artış ve Azalış Hesaplama',
        'seo_title' => 'Yüzde Artış ve Azalış Hesaplama – Fark ve Değişim Oranı | HesapKutu',
        'meta_description' => 'İki değer arasındaki yüzde artışını veya azalışını hesaplayın. Eski ve yeni fiyat değişim oranlarını tek tıkla görün.',
        'category' => 'Matematik & Temel',
        'category_slug' => 'matematik',
        'short_description' => 'Eski değer ile yeni değer arasındaki artış veya azalış yüzdesini ve net farkı hesaplar.',
        'formula' => 'Değişim Oranı (%) = [ (Yeni Değer - Eski Değer) ÷ Eski Değer ] × 100',
        'how_it_works' => [
            'İlk (eski) değeri ve son (yeni) değeri alanlara yazın.',
            'Sonuç pozitif ise artış, negatif ise düşüş/azalış olarak gösterilir.'
        ],
        'example' => [
            'scenario' => 'Bir ürün 200 TL\'den 260 TL\'ye çıktığında artış oranı nedir?',
            'calculation' => '((260 - 200) ÷ 200) × 100 = %30',
            'result' => '%30 Artış (+60 TL fark)'
        ],
        'faqs' => [
            [
                'q' => 'Yüzde artış nasıl hesaplanır?',
                'a' => 'Yeni değerden eski değer çıkarılır, fark eski değere bölünüp 100 ile çarpılır.'
            ]
        ],
        'related' => ['yuzde-hesaplama', 'maas-zam-hesaplama', 'kar-zarar-hesaplama']
    ],
    'kar-zarar-hesaplama' => [
        'id' => 'kar-zarar',
        'slug' => 'kar-zarar-hesaplama',
        'title' => 'Kâr Zarar Hesaplama',
        'seo_title' => 'Kâr Zarar Hesaplama – Alış, Satış ve Kâr Oranı Hesaplayıcı | HesapKutu',
        'meta_description' => 'Alış fiyatı, satış fiyatı ve ek maliyetleri girerek net kâr/zarar tutarınızı ve yüzdesini kolayca hesaplayın.',
        'category' => 'Para & Finans',
        'category_slug' => 'finans',
        'short_description' => 'Ürün alış ve satış fiyatları üzerinden net kazanç, zarar tutarı ve kâr yüzdesini belirleyin.',
        'formula' => 'Net Kâr = Satış Fiyatı - (Alış Fiyatı + Ek Giderler)',
        'how_it_works' => [
            'Ürünün alış fiyatını ve varsa kargo/paketleme masrafını girin.',
            'Satış fiyatını belirtin.',
            'Net kâr tutarı ve kâr yüzdesi anında hesaplanır.'
        ],
        'example' => [
            'scenario' => 'Alışı 400 TL, kargosu 50 TL olan ürün 600 TL\'ye satılırsa kâr nedir?',
            'calculation' => 'Toplam Maliyet: 450 TL. Kâr: 600 - 450 = 150 TL. (150/450) × 100',
            'result' => '150 TL Net Kâr (%33,33 Kâr Oranı)'
        ],
        'faqs' => [
            [
                'q' => 'Maliyet kârı ile satış kârı arasındaki fark nedir?',
                'a' => 'Maliyet kârı kârın maliyete oranıyken, kâr marjı kârın nihai satış fiyatına oranıdır.'
            ]
        ],
        'related' => ['kar-marji-hesaplama', 'kdv-hesaplama', 'iskonto-hesaplama']
    ],
    'kar-marji-hesaplama' => [
        'id' => 'kar-marji',
        'slug' => 'kar-marji-hesaplama',
        'title' => 'Kâr Marjı Hesaplama',
        'seo_title' => 'Kâr Marjı Hesaplama – Brüt Kâr Marjı ve Markup Bulma | HesapKutu',
        'meta_description' => 'Ürün maliyeti ve hedeflenen kâr marjına göre satış fiyatı belirleyin veya mevcut satıştan kâr marjınızı hesaplayın.',
        'category' => 'Ticaret & E-Ticaret',
        'category_slug' => 'ticaret',
        'short_description' => 'Brüt kâr marjı (profit margin) ve kâr haddi (markup) arasındaki farkı net olarak görün.',
        'formula' => 'Kâr Marjı (%) = [ (Satış Fiyatı - Maliyet) ÷ Satış Fiyatı ] × 100',
        'how_it_works' => [
            'Maliyetinizi ve satış fiyatınızı girin.',
            'Satış fiyatı üzerinden elde edilen brüt marj ve maliyet üzerine eklenen markup hesaplanır.'
        ],
        'example' => [
            'scenario' => 'Maliyeti 100 TL olan ürünü 150 TL\'ye satarsak marj ve markup nedir?',
            'calculation' => 'Kâr: 50 TL. Marj: 50 / 150 = %33,33. Markup: 50 / 100 = %50',
            'result' => '%33,33 Kâr Marjı | %50 Markup'
        ],
        'faqs' => [
            [
                'q' => 'Kâr marjı %100 olabilir mi?',
                'a' => 'Hayır, maliyet sıfır dahi olsa marj %100\'ü geçemez. Markup ise %100\'ün üstüne çıkabilir.'
            ]
        ],
        'related' => ['kar-zarar-hesaplama', 'kdv-hesaplama', 'iskonto-hesaplama']
    ],
    'kdv-hesaplama' => [
        'id' => 'kdv',
        'slug' => 'kdv-hesaplama',
        'title' => 'KDV Hesaplama',
        'seo_title' => 'KDV Hesaplama – KDV Dahil ve Hariç Hesaplayıcı | HesapKutu',
        'meta_description' => '%1, %10, %20 güncel KDV oranları ile KDV dahil ve KDV hariç tutarları, matrahı ve KDV tutarını anında hesaplayın.',
        'category' => 'Para & Finans',
        'category_slug' => 'finans',
        'short_description' => 'Güncel Türkiye vergi oranlarına (%1, %10, %20) uygun KDV dahil ve hariç matrah ayrıştırma aracı.',
        'formula' => 'KDV Dahil = Matrah × (1 + KDV/100) | KDV Hariç = Tutar ÷ (1 + KDV/100)',
        'how_it_works' => [
            'Tutarı girin ve KDV Hariçten Dahile veya Dahilden Harice seçin.',
            'KDV oranını (%1, %10, %20) seçin.',
            'Matrah tutarı ve ödenecek net KDV tutarı ayrıştırılır.'
        ],
        'example' => [
            'scenario' => '10.000 TL KDV hariç tutarın %20 KDV dahil hali nedir?',
            'calculation' => '10.000 × 0,20 = 2.000 TL KDV. Toplam: 12.000 TL',
            'result' => 'KDV: 2.000 TL | Toplam: 12.000 TL'
        ],
        'faqs' => [
            [
                'q' => 'KDV dahil tutardan KDV nasıl ayrıştırılır?',
                'a' => 'Örneğin %20 KDV için tutar 1,20\'ye bölünür. Kalan matrahtır.'
            ]
        ],
        'related' => ['iskonto-hesaplama', 'kar-zarar-hesaplama']
    ],
    'iskonto-hesaplama' => [
        'id' => 'iskonto',
        'slug' => 'iskonto-hesaplama',
        'title' => 'İskonto Hesaplama',
        'seo_title' => 'İskonto Hesaplama – İndirim ve Kademeli İskonto Aracı | HesapKutu',
        'meta_description' => 'Liste fiyatı üzerinden tekli veya peş peşe kademeli iskonto oranlarını hesaplayın. Net indirimli fiyatı ve kazancınızı görün.',
        'category' => 'Ticaret & E-Ticaret',
        'category_slug' => 'ticaret',
        'short_description' => 'Ürün liste fiyatı üzerinden indirim tutarı ve kademeli iskonto hesaplayıcısı.',
        'formula' => 'İndirimli Fiyat = Fiyat × (1 - İskonto1/100) × (1 - İskonto2/100)',
        'how_it_works' => [
            'Liste fiyatını girin.',
            '1. ve varsa 2. kademeli iskonto oranını yazın.',
            'Net satış fiyatı ve toplam tasarruf tutarı hesaplanır.'
        ],
        'example' => [
            'scenario' => '1.000 TL liste fiyatına %20 + %10 kademeli iskonto uygulanırsa ne olur?',
            'calculation' => '1. iskonto: 800 TL. 2. iskonto: 800 - 80 = 720 TL',
            'result' => 'Net Fiyat: 720 TL (İndirim: 280 TL)'
        ],
        'faqs' => [
            [
                'q' => '%20 + %10 iskonto %30 eder mi?',
                'a' => 'Hayır. 2. iskonto indirim yapıldıktan sonra kalan ara tutardan düşülür (%28 efektif indirim).'
            ]
        ],
        'related' => ['kdv-hesaplama', 'kar-zarar-hesaplama']
    ],
    'metrekare-hesaplama' => [
        'id' => 'metrekare',
        'slug' => 'metrekare-hesaplama',
        'title' => 'Metrekare (m²) Hesaplama',
        'seo_title' => 'Metrekare Hesaplama – Alan, Parke ve Seramik Fire Hesaplayıcı | HesapKutu',
        'meta_description' => 'Oda ve alanların metrekare ölçüsünü hesaplayın. Parke, seramik ve boya için fire payı ve gereken paket sayısını bulun.',
        'category' => 'İnşaat & Üretim',
        'category_slug' => 'insaat',
        'short_description' => 'Zemin, duvar veya oda alanlarını m² olarak hesaplayıp malzeme paket ihtiyacını belirleyin.',
        'formula' => 'Alan (m²) = Genişlik (m) × Uzunluk (m) × (1 + Fire/100)',
        'how_it_works' => [
            'Genişlik ve uzunluk ölçülerini girin.',
            'Fire payını (%5 - %15) ve 1 kutunun kapladığı m² alanını belirtin.',
            'Satın alınması gereken toplam m² ve kutu sayısı gösterilir.'
        ],
        'example' => [
            'scenario' => '4m × 5m oda için %10 fire ve 2 m²\'lik parke paketiyle kaç kutu gerekir?',
            'calculation' => 'Net: 20 m². Fireli: 22 m². 22 ÷ 2 = 11 paket',
            'result' => '22 m² (11 Paket Parke)'
        ],
        'faqs' => [
            [
                'q' => 'Fayans ve seramik için ne kadar fire payı bırakılmalıdır?',
                'a' => 'Düz döşemede %10, çapraz döşemede %15 fire payı önerilir.'
            ]
        ],
        'related' => ['etiket-yerlesim-hesaplama', 'yuzde-hesaplama']
    ],
    'etiket-yerlesim-hesaplama' => [
        'id' => 'etiket-yerlesim',
        'slug' => 'etiket-yerlesim-hesaplama',
        'title' => 'Etiket Yerleşim Hesaplama',
        'seo_title' => 'Etiket Yerleşim Hesaplama – Tabaka Kâğıt Dizilim ve Fire Hesaplayıcı | HesapKutu',
        'meta_description' => 'Baskı ve matbaa işlerinde tabaka kâğıda en uygun etiket dizilimini, maksimum adet ve minimum fire oranını hesaplayın.',
        'category' => 'İnşaat & Üretim',
        'category_slug' => 'uretim',
        'short_description' => 'Matbaa ve ambalaj üreticileri için tabaka ebadına maksimum etiket dizilim optimizasyonu.',
        'formula' => 'Adet = (Tabaka Eni ÷ Etiket Eni) × (Tabaka Boyu ÷ Etiket Boyu)',
        'how_it_works' => [
            'Tabaka kâğıt ölçülerini (örneğin 320x450 mm) girin.',
            'Etiket ölçülerini ve bıçak payını (örneğin 3 mm) yazın.',
            'Dikey ve yatay yerleşim kıyaslanarak tabaka başına en yüksek adet ve fire oranı bulunur.'
        ],
        'example' => [
            'scenario' => '320×450 mm tabakaya 50×90 mm kartvizit kaç adet sığar?',
            'calculation' => 'Kenar ve bıçak payları sonrası dizilim',
            'result' => 'Tabaka Başına: 24 Adet (Fire: %18,5)'
        ],
        'faqs' => [
            [
                'q' => 'Bıçak payı neden gereklidir?',
                'a' => 'Giyotin veya lazer kesimde kâğıt esnemesini ve kaymaları önlemek için 2-3 mm ara bırakılır.'
            ]
        ],
        'related' => ['metrekare-hesaplama', 'kar-zarar-hesaplama']
    ],
    'yakit-hesaplama' => [
        'id' => 'yakit',
        'slug' => 'yakit-hesaplama',
        'title' => 'Yakıt ve Yol Masrafı Hesaplama',
        'seo_title' => 'Yakıt Tüketimi ve Yol Masrafı Hesaplama – Km Başı Maliyet | HesapKutu',
        'meta_description' => 'Gideceğiniz mesafe, aracınızın 100 km\'deki tüketimi ve akaryakıt fiyatıyla toplam yol masrafını ve kişi başı ücreti hesaplayın.',
        'category' => 'Otomotiv & Seyahat',
        'category_slug' => 'otomotiv',
        'short_description' => 'Gidilecek rota için toplam yakıt tutarını, km başına maliyeti ve kişi başı bölüşümünü hesaplar.',
        'formula' => 'Toplam Tutar = (Mesafe ÷ 100) × 100km Tüketim × Yakıt Fiyatı',
        'how_it_works' => [
            'Mesafe (km), 100 km\'deki tüketim (litre) ve litre yakıt fiyatını girin.',
            'Yolcu sayısını belirleyin.',
            'Toplam yakıt maliyeti, km başı tüketim ve kişi başı ücret hesaplanır.'
        ],
        'example' => [
            'scenario' => '450 km yol, 6.5 L/100km tüketim ve 44 TL benzin fiyatıyla masraf nedir?',
            'calculation' => '(450 ÷ 100) × 6.5 = 29.25 L. 29.25 × 44 TL = 1.287 TL',
            'result' => '1.287 TL Toplam (Km Başı: 2,86 TL)'
        ],
        'faqs' => [
            [
                'q' => 'Araç yakıt tüketimi nasıl ölçülür?',
                'a' => 'Depoyu doldurup sayacı sıfırlayın. Bir sonraki dolumdaki litreyi yapılan kilometreye bölüp 100 ile çarpın.'
            ]
        ],
        'related' => ['yuzde-hesaplama', 'kar-zarar-hesaplama']
    ],
    'maas-zam-hesaplama' => [
        'id' => 'maas-zam',
        'slug' => 'maas-zam-hesaplama',
        'title' => 'Maaş Zam Oranı Hesaplama',
        'seo_title' => 'Maaş Zam Oranı ve Yeni Maaş Hesaplama – Zam Hesaplayıcı | HesapKutu',
        'meta_description' => 'Eski maaş ve zam oranıyla yeni zamlı maaşınızı, net zam farkını veya verilen yeni maaşa göre zam yüzdesini hesaplayın.',
        'category' => 'Para & Finans',
        'category_slug' => 'finans',
        'short_description' => 'Yeni maaş, net zam tutarı ve yıllık toplam gelir artışını hesaplar.',
        'formula' => 'Yeni Maaş = Eski Maaş × (1 + Zam Oranı / 100)',
        'how_it_works' => [
            'Mevcut maaşınızı ve zam oranını (%) girin.',
            'Yeni maaş ve yıllık kümülatif kazanç anında hesaplanır.'
        ],
        'example' => [
            'scenario' => '28.000 TL maaşa %35 zam yapılırsa yeni maaş ne olur?',
            'calculation' => '28.000 × 0,35 = 9.800 TL zam. Toplam: 37.800 TL',
            'result' => 'Yeni Maaş: 37.800 TL (+9.800 TL/ay)'
        ],
        'faqs' => [
            [
                'q' => 'Zam oranı net mi brüt mü uygulanır?',
                'a' => 'İş sözleşmenizdeki baz rakama (net veya brüt) göre hesaplanmalıdır.'
            ]
        ],
        'related' => ['yuzde-artis-hesaplama', 'bilesik-getiri-hesaplama']
    ],
    'hisse-maliyet-hesaplama' => [
        'id' => 'hisse-maliyet',
        'slug' => 'hisse-maliyet-hesaplama',
        'title' => 'Hisse Maliyet Düşürme Hesaplama',
        'seo_title' => 'Hisse Maliyet Düşürme ve Ortalama Lot Hesaplama | HesapKutu',
        'meta_description' => 'Borsa ve kripto yatırımlarında kademeli alımlarla yeni ortalama maliyetinizi ve gereken ek lot miktarını hesaplayın.',
        'category' => 'Yatırım & Borsa',
        'category_slug' => 'yatirim',
        'short_description' => 'Kademeli alımlarla portföyün ağırlıklı ortalama birim maliyetini belirleyin.',
        'formula' => 'Yeni Ortalama Maliyet = Toplam Harcanan Para ÷ Toplam Lot Sayısı',
        'how_it_works' => [
            'Elinizdeki mevcut lot ve alış fiyatını girin.',
            'Yeni almayı planladığınız lot adedi ve fiyatını ekleyin.',
            'Yeni ortalama birim maliyetiniz ve maliyet düşüş farkı hesaplanır.'
        ],
        'example' => [
            'scenario' => '50 TL\'den 200 lot varken, 30 TL\'den 300 lot daha alınırsa yeni maliyet nedir?',
            'calculation' => '10.000 TL + 9.000 TL = 19.000 TL ÷ 500 Lot = 38 TL',
            'result' => 'Yeni Ortalama Maliyet: 38,00 TL'
        ],
        'faqs' => [
            [
                'q' => 'Ağırlıklı ortalama maliyet nasıl çalışır?',
                'a' => 'Tüm alımlarda harcanan toplam para, elde edilen toplam lot miktarına bölünür.'
            ]
        ],
        'related' => ['bilesik-getiri-hesaplama', 'kar-zarar-hesaplama']
    ],
    'bilesik-getiri-hesaplama' => [
        'id' => 'bilesik-getiri',
        'slug' => 'bilesik-getiri-hesaplama',
        'title' => 'Bileşik Getiri ve Faiz Hesaplama',
        'seo_title' => 'Bileşik Getiri ve Yatırım Büyüme Hesaplayıcı | HesapKutu',
        'meta_description' => 'Düzenli aylık tasarruf ve yıllık bileşik getiri oranıyla gelecekteki servet birikiminizi ve getiri kârını simüle edin.',
        'category' => 'Yatırım & Borsa',
        'category_slug' => 'yatirim',
        'short_description' => 'Bileşik faiz etkisiyle paranın gelecekteki toplam değerini ve kârını hesaplayın.',
        'formula' => 'Gelecek Değer = Anapara × (1 + r/n)^(n×t) + Aylık Katkı Getirisi',
        'how_it_works' => [
            'Başlangıç anaparasını ve aylık ekleme miktarını girin.',
            'Beklenen yıllık getiri oranını (%) ve vade yılını belirtin.',
            'Vade sonundaki tahmini portföy ve kazanılan kâr tutarı listelenir.'
        ],
        'example' => [
            'scenario' => '50.000 TL ile başlayıp ayda 5.000 TL ekleyerek yıllık %30 getiriyle 5 yıl sonunda toplam ne olur?',
            'calculation' => 'Yatırılan: 350.000 TL. Bileşik faiz etkisiyle toplam büyüme',
            'result' => 'Tahmini Toplam: ~826.400 TL (Kâr: ~476.400 TL)'
        ],
        'faqs' => [
            [
                'q' => 'Bileşik getirinin gücü nedir?',
                'a' => 'Her dönem elde edilen kâr da anaparaya eklenerek katlanarak büyümeyi sağlar.'
            ]
        ],
        'related' => ['hisse-maliyet-hesaplama', 'kar-zarar-hesaplama']
    ],
    'pazaryeri-komisyon-hesaplama' => [
        'id' => 'pazaryeri-komisyon',
        'slug' => 'pazaryeri-komisyon-hesaplama',
        'title' => 'Pazaryeri Komisyon ve Net Kâr Hesaplama',
        'seo_title' => 'Trendyol, Hepsiburada Komisyon ve Kâr Hesaplayıcı | HesapKutu',
        'meta_description' => 'Trendyol, Hepsiburada ve pazaryerlerinde komisyon, kargo ve maliyetten sonra net kârınızı hesaplayın.',
        'category' => 'E-Ticaret & Pazaryeri',
        'category_slug' => 'pazaryeri',
        'short_description' => 'Satış komisyonu, kargo ve KDV sonrası elinize geçen net kârı hesaplayın.',
        'formula' => 'Net Kâr = Satış Fiyatı - (Maliyet + Komisyon + Kargo + Hizmet Bedeli)',
        'how_it_works' => ['Satış fiyatını girin.', 'Ürün maliyetini ve kargo tutarını yazın.', 'Pazaryeri komisyon oranını (%) belirtin.'],
        'example' => ['scenario' => '150 TL maliyetli ürün 350 TL\'ye %18 komisyon ve 45 TL kargo ile satılırsa:', 'calculation' => 'Komisyon: 63 TL. Kargo: 45 TL. Net: 350 - 258', 'result' => '92 TL Net Kâr'],
        'faqs' => [['q' => 'Komisyon KDV dahil mi kesilir?', 'a' => 'Evet, pazaryerleri komisyonu son tüketici satış fiyatından alır.']],
        'related' => ['kar-marji-hesaplama', 'kdv-hesaplama']
    ],
    'kidem-ihbar-tazminati-hesaplama' => [
        'id' => 'kidem-ihbar',
        'slug' => 'kidem-ihbar-tazminati-hesaplama',
        'title' => 'Kıdem ve İhbar Tazminatı Hesaplama',
        'seo_title' => 'Kıdem ve İhbar Tazminatı Hesaplama – Net Tazminat Hesaplayıcı | HesapKutu',
        'meta_description' => 'Çalışma süreniz ve brüt maaşınızla alacağınız brüt ve net kıdem tazminatı ile ihbar tazminatı tutarını hesaplayın.',
        'category' => 'Çalışma & İK',
        'category_slug' => 'ik',
        'short_description' => 'İşten ayrılma durumunda hak kazanılan yasal kıdem ve ihbar tazminatı hesaplayıcısı.',
        'formula' => 'Net Kıdem = (Çalışılan Yıl × Giydirilmiş Brüt Maaş) - Damga Vergisi (%0,759)',
        'how_it_works' => ['Çalışılan yıl ve ayı girin.', 'Son brüt maaşınızı yazın.', 'Damga vergisi kesilmiş net tazminat hesaplanır.'],
        'example' => ['scenario' => '3.5 yıl çalışan ve brüt maaşı 30.000 TL olan işçinin kıdemi:', 'calculation' => '3.5 × 30.000 = 105.000 TL brüt', 'result' => '104.203 TL Net Kıdem'],
        'faqs' => [['q' => 'Kıdemden hangi vergi kesilir?', 'a' => 'Sadece binde 7,59 damga vergisi kesilir.']],
        'related' => ['maas-zam-hesaplama']
    ],
    'mevduat-faiz-hesaplama' => [
        'id' => 'mevduat-faiz',
        'slug' => 'mevduat-faiz-hesaplama',
        'title' => 'Mevduat Faizi ve Vadeli Getiri Hesaplama',
        'seo_title' => 'Vadeli Mevduat Faizi Hesaplama – Güncel Net Getiri | HesapKutu',
        'meta_description' => 'Bankaların vadeli mevduat faiz oranlarıyla 32, 46, 92 gün sonundaki net faiz kazancınızı ve stopajı hesaplayın.',
        'category' => 'Para & Finans',
        'category_slug' => 'finans',
        'short_description' => 'Vadeli mevduat faiz oranı ve stopaj kesintisi sonrası net kazancı hesaplar.',
        'formula' => 'Net Faiz = [ Anapara × (Faiz / 100) × (Gün / 365) ] × (1 - Stopaj / 100)',
        'how_it_works' => ['Anapara tutarını girin.', 'Vade gününü (32, 46, 92 gün) seçin.', 'Yıllık faiz oranını belirtin.'],
        'example' => ['scenario' => '100.000 TL %45 faizle 32 günde ne getirir?', 'calculation' => 'Brüt: 3.945 TL. Stopaj: 295 TL.', 'result' => '3.650 TL Net Getiri'],
        'faqs' => [['q' => 'Stopaj oranı nedir?', 'a' => '6 aya kadar vadelerde %7.5 kesinti uygulanır.']],
        'related' => ['bilesik-getiri-hesaplama', 'kredi-taksit-hesaplama']
    ],
    'kredi-taksit-hesaplama' => [
        'id' => 'kredi-taksit',
        'slug' => 'kredi-taksit-hesaplama',
        'title' => 'Kredi Taksit ve Maliyet Hesaplama',
        'seo_title' => 'Kredi Taksit Hesaplama – İhtiyaç, Konut ve Taşıt Kredisi | HesapKutu',
        'meta_description' => 'Kredi tutarı, vade ve faiz oranını girerek aylık taksit tutarını, toplam geri ödemeyi ve faiz maliyetini hesaplayın.',
        'category' => 'Para & Finans',
        'category_slug' => 'finans',
        'short_description' => 'Aylık eşit taksit tutarı ve toplam faiz maliyeti hesaplayıcısı.',
        'formula' => 'Aylık Taksit = Anapara × [ (r × (1+r)^n) ÷ ((1+r)^n - 1) ]',
        'how_it_works' => ['Kredi tutarını yazın.', 'Vade süresi (ay) ve aylık faiz oranını seçin.'],
        'example' => ['scenario' => '100.000 TL 12 ay %3.5 faizle:', 'calculation' => 'Anüite taksit formülü', 'result' => 'Aylık ~11.250 TL'],
        'faqs' => [['q' => 'Konut kredisinde vergi var mı?', 'a' => 'Hayır, konut kredileri KKDF ve BSMV vergisinden muaftır.']],
        'related' => ['mevduat-faiz-hesaplama']
    ],
    'elektrik-tuketim-hesaplama' => [
        'id' => 'elektrik-tuketim',
        'slug' => 'elektrik-tuketim-hesaplama',
        'title' => 'Elektrik Tüketim ve Fatura Hesaplama',
        'seo_title' => 'Elektrik Faturası ve Cihaz Tüketim Hesaplama | HesapKutu',
        'meta_description' => 'Klima, buzdolabı, bilgisayar gibi elektrikli aletlerin Watt gücüne göre aylık elektrik faturasına etkisini hesaplayın.',
        'category' => 'Enerji & Ev',
        'category_slug' => 'enerji',
        'short_description' => 'Elektrikli cihazların günlük/aylık kWh tüketimini ve TL faturasını hesaplar.',
        'formula' => 'Aylık TL = (Güç Watt ÷ 1000) × Günlük Saat × 30 Gün × kWh Fiyatı',
        'how_it_works' => ['Cihazın Watt gücünü girin.', 'Günde kaç saat çalıştığını belirtin.'],
        'example' => ['scenario' => '2000W klima günde 6 saat çalışırsa:', 'calculation' => '2 kW × 6 saat × 30 gün = 360 kWh × 2.60 TL', 'result' => '936 TL / Ay'],
        'faqs' => [['q' => '1 kWh kaç Watt?', 'a' => '1000 Watt gücündeki aletin 1 saat çalışması 1 kWh enerji harcar.']],
        'related' => ['gunes-paneli-hesaplama']
    ],
    'kira-artis-hesaplama' => [
        'id' => 'kira-artis',
        'slug' => 'kira-artis-hesaplama',
        'title' => 'Kira Artış Oranı Hesaplama (TÜFE)',
        'seo_title' => 'Kira Artış Oranı Hesaplama – Güncel TÜFE Kira Zammı | HesapKutu',
        'meta_description' => 'Ev ve iş yeri kiralarında 12 aylık ortalama TÜFE oranına göre yasal kira zam tutarını ve yeni aylık kirayı hesaplayın.',
        'category' => 'Para & Finans',
        'category_slug' => 'finans',
        'short_description' => '12 aylık TÜFE ortalamasına göre yasal tavan kira artış hesaplayıcısı.',
        'formula' => 'Yeni Kira = Mevcut Kira × (1 + TÜFE / 100)',
        'how_it_works' => ['Mevcut kira tutarını girin.', '12 aylık TÜFE oranını (%) yazın.'],
        'example' => ['scenario' => '15.000 TL kira, %62.5 TÜFE ile:', 'calculation' => '15.000 × 1.625', 'result' => '24.375 TL Yeni Kira'],
        'faqs' => [['q' => 'Hangi TÜFE oranı geçerlidir?', 'a' => 'TÜİK 12 aylık ortalamalara göre değişim oranı yasal tavan sınırdır.']],
        'related' => ['maas-zam-hesaplama']
    ],
    'vucut-kitle-indeksi-hesaplama' => [
        'id' => 'vucut-kitle',
        'slug' => 'vucut-kitle-indeksi-hesaplama',
        'title' => 'Vücut Kitle İndeksi (VKİ) ve İdeal Kilo',
        'seo_title' => 'Vücut Kitle İndeksi (VKİ) ve İdeal Kilo Hesaplama | HesapKutu',
        'meta_description' => 'Boy ve kilonuzu girerek Vücut Kitle İndeksinizi (BMI) ve ideal kilonuzu öğrenin.',
        'category' => 'Sağlık & Yaşam',
        'category_slug' => 'saglik',
        'short_description' => 'Boy-kilo oranını, ideal kilo aralığını ve yağ sınıflandırmasını hesaplar.',
        'formula' => 'VKİ = Kilo (kg) ÷ [ Boy (m) × Boy (m) ]',
        'how_it_works' => ['Boyunuzu (cm) ve kilonuzu (kg) girin.', 'VKİ değeriniz ve ideal kilo aralığınız anında gösterilir.'],
        'example' => ['scenario' => '175 cm boy ve 85 kg:', 'calculation' => '85 / (1.75 × 1.75) = 27.75', 'result' => 'VKİ: 27,75 (Fazla Kilolu)'],
        'faqs' => [['q' => 'Normal kilo aralığı nedir?', 'a' => '18.5 - 24.9 arası sağlıklı normal kilo kabul edilir.']],
        'related' => ['yuzde-hesaplama']
    ],
    'gunes-paneli-hesaplama' => [
        'id' => 'gunes-paneli',
        'slug' => 'gunes-paneli-hesaplama',
        'title' => 'Güneş Paneli Güç ve İhtiyaç Hesaplama',
        'seo_title' => 'Güneş Paneli İhtiyaç ve Güç Hesaplama – Güneş Enerjisi | HesapKutu',
        'meta_description' => 'Ev veya karavan için günlük elektrik tüketiminize göre gereken güneş paneli sayısını ve kWp gücünü hesaplayın.',
        'category' => 'Enerji & Ev',
        'category_slug' => 'enerji',
        'short_description' => 'Gereken solar panel gücünü (kWp) ve panel adedini hesaplar.',
        'formula' => 'Gereken Güç = (Günlük Wh ÷ Güneşlenme Saati) × 1,25 Güvenlik Payı',
        'how_it_works' => ['Günlük elektrik tüketiminizi (kWh) girin.', 'Bölgenizin güneşlenme saatini ve panel gücünü seçin.'],
        'example' => ['scenario' => 'Günde 10 kWh tüketim ve 500W panel ile:', 'calculation' => '2500 Watt sistem / 500W', 'result' => '5 Adet Panel (2.5 kWp)'],
        'faqs' => [['q' => 'Türkiye güneşlenme ortalaması nedir?', 'a' => 'Günlük 4.5 ile 5.5 saat arasındadır.']],
        'related' => ['elektrik-tuketim-hesaplama']
    ]
];

$CATEGORIES = [
    'pazaryeri' => ['name' => 'E-Ticaret & Pazaryeri', 'desc' => 'Trendyol, Hepsiburada komisyon ve net kâr.'],
    'finans' => ['name' => 'Para & Finans', 'desc' => 'KDV, kâr/zarar, mevduat ve kredi taksit.'],
    'ik' => ['name' => 'Çalışma & İK', 'desc' => 'Kıdem/ihbar tazminatı ve maaş zammı.'],
    'enerji' => ['name' => 'Enerji & Ev', 'desc' => 'Elektrik faturası ve güneş paneli hesabı.'],
    'saglik' => ['name' => 'Sağlık & Yaşam', 'desc' => 'Vücut kitle indeksi (VKİ) ve ideal kilo.'],
    'matematik' => ['name' => 'Matematik & Temel', 'desc' => 'Yüzde ve artış-azalış araçları.'],
    'ticaret' => ['name' => 'Ticaret & E-Ticaret', 'desc' => 'İskonto ve kâr marjı hesaplamaları.'],
    'insaat' => ['name' => 'İnşaat & Üretim', 'desc' => 'Metrekare, fire ve paket hesaplayıcı.'],
    'uretim' => ['name' => 'Baskı & Matbaa', 'desc' => 'Tabaka kağıt etiket dizilim optimizasyonu.'],
    'yatirim' => ['name' => 'Yatırım & Borsa', 'desc' => 'Hisse maliyet düşürme ve bileşik getiri.'],
    'otomotiv' => ['name' => 'Otomotiv & Seyahat', 'desc' => 'Yakıt tüketimi ve km başı maliyet.']
];
