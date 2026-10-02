import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const APP_URL = process.env.APP_URL || `http://localhost:${PORT}`;

app.use(express.json());

// Initialize Gemini SDK
const ai = new GoogleGenAI();

// 20 high-interest calculation tools list for dynamic sitemap and robots
const CALCULATOR_SLUGS = [
  'yuzde-hesaplama',
  'yuzde-artis-hesaplama',
  'kar-zarar-hesaplama',
  'kar-marji-hesaplama',
  'kdv-hesaplama',
  'iskonto-hesaplama',
  'metrekare-hesaplama',
  'etiket-yerlesim-hesaplama',
  'yakit-hesaplama',
  'maas-zam-hesaplama',
  'hisse-maliyet-hesaplama',
  'bilesik-getiri-hesaplama',
  'pazaryeri-komisyon-hesaplama',
  'kidem-ihbar-tazminati-hesaplama',
  'mevduat-faiz-hesaplama',
  'kredi-taksit-hesaplama',
  'elektrik-tuketim-hesaplama',
  'kira-artis-hesaplama',
  'vucut-kitle-indeksi-hesaplama',
  'gunes-paneli-hesaplama'
];

const STATIC_PAGES = [
  'hakkimizda',
  'gizlilik-politikasi',
  'kullanim-kosullari',
  'cerez-politikasi',
  'iletisim'
];

// ==========================================
// 1. ROBOTS.TXT (Requirement 6)
// ==========================================
app.get('/robots.txt', (_req, res) => {
  res.type('text/plain');
  const robots = `User-agent: *
Disallow: /admin
Disallow: /hesabim
Disallow: /account
Disallow: /history
Disallow: /login

Sitemap: ${APP_URL}/sitemap.xml
`;
  res.send(robots);
});

// ==========================================
// 2. SITEMAP.XML (Requirement 5)
// ==========================================
app.get('/sitemap.xml', (_req, res) => {
  res.type('application/xml');
  const now = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Ana Sayfa -->
  <url>
    <loc>${APP_URL}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

  // Calculator routes
  CALCULATOR_SLUGS.forEach((slug) => {
    xml += `  <url>
    <loc>${APP_URL}/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>\n`;
  });

  // Corporate & Legal routes
  STATIC_PAGES.forEach((page) => {
    xml += `  <url>
    <loc>${APP_URL}/${page}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>\n`;
  });

  xml += `</urlset>`;
  res.send(xml);
});

// ==========================================
// 3. GEMINI AI NATURAL LANGUAGE CALCULATOR (Requirement 15 & 23)
// ==========================================
app.post('/api/calculate-ai', async (req, res) => {
  const { query } = req.body;

  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return res.status(400).json({ error: 'Sorgu metni gereklidir.' });
  }

  try {
    const prompt = `Sen Türkiye'nin en popüler hesaplama platformu HesapKutu'nun uzman yapay zekâ matematik ve finans asistanısın.
Kullanıcının Türkçe doğal dilde sorduğu matematiksel, ticari, finansal, inşaat veya gündelik hesaplama problemini adım adım çöz.

Kullanıcı Sorusu: "${query}"

Mevcut HesapKutu Araçları Listesi:
- yuzde-hesaplama (yüzde bulma)
- yuzde-artis-hesaplama (artış azalış)
- kar-zarar-hesaplama (kâr zarar)
- kar-marji-hesaplama (kâr marjı)
- kdv-hesaplama (KDV dahil/hariç)
- iskonto-hesaplama (indirim/iskonto)
- metrekare-hesaplama (alan ve paket hesabı)
- etiket-yerlesim-hesaplama (tabaka dizilimi)
- yakit-hesaplama (yol ve benzin masrafı)
- maas-zam-hesaplama (maaş zammı)
- hisse-maliyet-hesaplama (lot ortalama maliyet)
- bilesik-getiri-hesaplama (bileşik getiri)

Lütfen yanıtını SADECE geçerli bir JSON formatında döndür (markdown kod bloğu veya başka metin ekleme).
JSON formatı:
{
  "summaryTitle": "Hesaplanan konunun kısa başlığı",
  "finalAnswer": "Nihai net sonuç (sayı ve birim)",
  "steps": ["Adım 1: ...", "Adım 2: ...", "Adım 3: ..."],
  "formulaUsed": "Kullanılan formül",
  "relatedToolSlug": "yukarıdaki slug'lardan en uygun olanı veya boş"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const responseText = response.text || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      // Clean possible fences
      const cleanJson = responseText.replace(/```json|```/g, '').trim();
      parsedData = JSON.parse(cleanJson);
    }

    return res.json(parsedData);
  } catch (error: any) {
    console.error('Gemini calculation error:', error);
    // Provide structured fallback response
    return res.status(500).json({
      error: 'Hesaplama yapılırken bir hata oluştu.',
      details: error.message
    });
  }
});

// ==========================================
// 4. DEV & PROD SERVER LIFECYCLE
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    // Serve static build in production
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));

    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    // Vite middleware in development
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 HesapKutu sunucusu http://0.0.0.0:${PORT} adresinde çalışıyor`);
  });
}

startServer();
