import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

// Body parser for JSON with increased limit for high-res photo uploads
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Ensure data and upload directories exist
const DATA_DIR = path.join(process.cwd(), 'data');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Stored database file
const DB_FILE = path.join(DATA_DIR, 'cloud_db.json');

// Initial seed data
const DEFAULT_COMMUNITY_LOOKS = [
  {
    id: 'look-1',
    title: 'Labios Berry Wine & Piel Dewy',
    author: 'Camila Reyes',
    undertone: 'calido',
    shadeName: 'Teint 02 Warm Sand + Berry Wine',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZG5D5NOAP-Uk5aGlKGRQ7ZWRNrrvHEOjlUF3_4CnF0QyA5lvwEdINh6JgFr3ValcwZo8eJk92EASRpb4p34xDQ2s5iu6fNAa-YzuboWZSUc8NWG8D1x451ukEELoHKVMYYGyvo50JpRvAuAB8Kv5pS9azbe2Y5djWhRkYIVz-N3wgIUeEDXnY-frimJLAlI3fHNvDBPZfFcKpTV0nORWr5Kqu-lmzpDi1Fa2XAqS_iwGqKtk33JI',
    likes: 148,
    createdAt: 'Hace 2 horas',
    comment: 'La combinación del delineado suave con Berry Wine y un toque de bálsamo transparente da un efecto aterciopelado irresistible para las tardes de otoño.',
    productsUsed: ['Rouge Solaire Matte Lip (Berry Wine)', "L'Éclat Teint Sublime (02 Warm Sand)"]
  },
  {
    id: 'look-2',
    title: 'Rubor Natural Toasted Peach',
    author: 'Elena Morales',
    undertone: 'neutro',
    shadeName: 'Aura Bloom (Toasted Peach)',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPzIOmRj3ZjNZSTSCjeF4cBvcB5UaK-dP_kGfpTGEnBpFMFJucUUIANC_uXumxAfe71umPNuqjWCwP5BCZqvuOfV5hSVILMmzuu1uVTKggAaV1DcRtWZqoA2Kytp6ybCwCxe2M__wx9QJSdj58Cea32k1Wl-BaKXWuIrFaRGWd-xw_1T7YjlDw6WtcJtA4XuO_WzRhlKS4CwM65wOiCAG1L_IynRjQxT-yu6AfaSIMIOrMNA2z_70',
    likes: 92,
    createdAt: 'Hace 5 horas',
    comment: 'Dos gotas de Aura Bloom en el puente de la nariz y pómulos dan esa calidez de haber caminado bajo el sol de otoño. 10/10.',
    productsUsed: ['Aura Bloom Liquid Blush (Toasted Peach)']
  },
  {
    id: 'look-3',
    title: 'Glow Minimalista de Mañana',
    author: 'Lucía Santoro',
    undertone: 'frio',
    shadeName: 'Teint 01 Fair Alabaster',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8n443oyBnhuzn6O4Yig__OMUqKzmKhNMQ-df0SWJhR_DONlL4QCplNPXLCFtwDih2wP4eLa9b7tMoqYnoNxm22xtTQWp71M538D86e6oQOSKOdY1W5Cw92uSys-aJTgAcTd5Tg9sGquazKHIKMrUpLaC9SbGtuZGt7U-iAVaC6x9mrYcM5Z-8YJ0achVsFo46LabPhOw_v445EXvXyAYU62RfaFNZUDm8VOYwsjwMhpZ086FA1Tw',
    likes: 215,
    createdAt: 'Ayer',
    comment: 'Después del Camellia Primer, apenas una gota de base en el centro del rostro. Mi piel respira y se ve jugosa todo el día.',
    productsUsed: ['Camellia Glow Prime Elixir', "L'Éclat Teint Sublime (01 Fair Alabaster)"]
  },
  {
    id: 'look-4',
    title: 'Mirada Terracota de Temporada',
    author: 'Andrea Paredes',
    undertone: 'calido',
    shadeName: "Paleta Soleil d'Automne",
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjkU9bkSs4q1dX_sfZyYLUOwld9-EmxnFNdjbPiPa_su93CVwhH4cVZpOP6xyHRGnS0s6s94HF1a96FVHtiIS0I-HtQod01xZA_1XTiUWdv4MGzjH6_8oaOsc-dO8RexBQv-s5UgSTGTzhyXUMM9MY-s5A2SoTIzHepxyNZQsL4Jj_deHr8Gvq0vtWNe8iiF_VGhUB2CU_tjwQLbbfc2rrMTQxgOKDtEPLUnxb5S9EZxNwQ-Brn8M',
    likes: 180,
    createdAt: 'Hace 2 días',
    comment: 'La textura de las sombras minerales es tan fina que se funde como crema con solo la yema del dedo anular.',
    productsUsed: ["Paleta 'Soleil d'Automne' (Terracotta Mirage)", 'Rouge Solaire Matte Lip (Nude Rose)']
  }
];

function readDatabase() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading cloud_db.json:', err);
  }
  const initial = { photos: DEFAULT_COMMUNITY_LOOKS };
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2));
  } catch (e) {
    console.error('Error seeding DB:', e);
  }
  return initial;
}

function writeDatabase(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing cloud_db.json:', err);
  }
}

// Serve uploaded photos statically
app.use('/uploads', express.static(UPLOADS_DIR));

// === API ROUTES ===

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString(), cloudStorage: 'active' });
});

// 2. GET all community photos
app.get('/api/photos', (req, res) => {
  const db = readDatabase();
  res.json({
    success: true,
    count: db.photos.length,
    photos: db.photos
  });
});

// 3. POST dynamic photo upload
app.post('/api/photos', (req, res) => {
  try {
    const { title, author, undertone, shadeName, imageBase64, comment, productsUsed } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ success: false, error: 'Se requiere una imagen en base64 o archivo' });
    }

    let finalImageUrl = imageBase64;

    // If it's a data URL, save it as a file on disk
    if (typeof imageBase64 === 'string' && imageBase64.startsWith('data:image/')) {
      const matches = imageBase64.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
        const buffer = Buffer.from(matches[2], 'base64');
        const fileName = `look_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
        const filePath = path.join(UPLOADS_DIR, fileName);
        fs.writeFileSync(filePath, buffer);
        finalImageUrl = `/uploads/${fileName}`;
      }
    }

    const newPhoto = {
      id: 'look-' + Date.now(),
      title: title || 'Look de Belleza Otoñal',
      author: author || 'Musa L\'Éclat',
      undertone: undertone || 'calido',
      shadeName: shadeName || 'Ritual Personalizado',
      imageUrl: finalImageUrl,
      likes: 0,
      createdAt: 'Hace un momento',
      comment: comment || 'Formulado con cosméticos botánicos L\'Éclat.',
      productsUsed: Array.isArray(productsUsed) && productsUsed.length > 0 ? productsUsed : ['L\'Éclat Teint Sublime']
    };

    const db = readDatabase();
    db.photos.unshift(newPhoto);
    writeDatabase(db);

    return res.status(201).json({
      success: true,
      message: 'Foto cargada exitosamente en la nube',
      photo: newPhoto
    });
  } catch (error: any) {
    console.error('Error saving photo:', error);
    return res.status(500).json({ success: false, error: error.message || 'Error interno del servidor' });
  }
});

// 4. Like / toggle like
app.post('/api/photos/:id/like', (req, res) => {
  const { id } = req.params;
  const db = readDatabase();
  const photo = db.photos.find((p: any) => p.id === id);

  if (!photo) {
    return res.status(404).json({ success: false, error: 'Foto no encontrada' });
  }

  photo.likes = (photo.likes || 0) + 1;
  writeDatabase(db);

  return res.json({ success: true, likes: photo.likes });
});

// 5. DELETE photo
app.delete('/api/photos/:id', (req, res) => {
  const { id } = req.params;
  const db = readDatabase();
  const index = db.photos.findIndex((p: any) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Foto no encontrada' });
  }

  const removed = db.photos.splice(index, 1)[0];
  writeDatabase(db);

  return res.json({ success: true, message: 'Foto eliminada', id: removed.id });
});

// 6. Dynamic skin tone / shade analyzer
app.post('/api/shade-analysis', (req, res) => {
  const { undertoneChoice, averageRgb } = req.body;

  let undertone = undertoneChoice || 'calido';
  let hexDetected = '#DDB596';

  if (averageRgb && typeof averageRgb.r === 'number') {
    const { r, g, b } = averageRgb;
    hexDetected = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    if (r > g + 25 && g > b) {
      undertone = 'calido';
    } else if (b > g - 10) {
      undertone = 'frio';
    } else {
      undertone = 'neutro';
    }
  }

  const recommendations = {
    calido: {
      undertone: 'calido',
      undertoneLabel: 'Cálido / Dorado Radiante',
      depthLabel: 'Tono Medio Luminoso',
      confidence: 99.4,
      hexDetected: hexDetected || '#DDB596',
      recommendedFoundation: {
        productName: "L'Éclat Teint Sublime",
        shadeName: '02 Warm Sand',
        shadeHex: '#DDB596',
        description: 'Neutraliza rojeces leves e infunde un velo dorado sutil con protección SPF 25.'
      },
      recommendedLipstick: {
        productName: 'Rouge Solaire Matte Lip',
        shadeName: 'Toasted Peach',
        shadeHex: '#D4866C'
      },
      lightingAdvice: 'Tu piel florece con iluminación cálida vespertina y joyería de oro pulido.'
    },
    frio: {
      undertone: 'frio',
      undertoneLabel: 'Frío / Rosado Porcelana',
      depthLabel: 'Tono Claro Puro',
      confidence: 98.7,
      hexDetected: hexDetected || '#EED4C2',
      recommendedFoundation: {
        productName: "L'Éclat Teint Sublime",
        shadeName: '01 Fair Alabaster',
        shadeHex: '#EED4C2',
        description: 'Subtono rosado puro que despierta la luminosidad cristalina natural sin oxidarse.'
      },
      recommendedLipstick: {
        productName: 'Rouge Solaire Matte Lip',
        shadeName: 'Berry Wine',
        shadeHex: '#6E2536'
      },
      lightingAdvice: 'Las tonalidades plata y luz blanca difusa resaltan la transparencia de tus facciones.'
    },
    neutro: {
      undertone: 'neutro',
      undertoneLabel: 'Neutro / Balanceado Armónico',
      depthLabel: 'Tono Medio Equilibrado',
      confidence: 99.1,
      hexDetected: hexDetected || '#C98C87',
      recommendedFoundation: {
        productName: "L'Éclat Teint Sublime",
        shadeName: '03 Golden Amber',
        shadeHex: '#C4946C',
        description: 'Equilibrio cromático perfecto entre pigmentos ocres y rosáceos para un acabado segunda piel.'
      },
      recommendedLipstick: {
        productName: 'Rouge Solaire Matte Lip',
        shadeName: 'Velvet Plum No. 04',
        shadeHex: '#8E3B46'
      },
      lightingAdvice: 'Posees versatilidad total: tanto tonos tierra como bayas silvestres complementan tu tez.'
    }
  };

  const result = recommendations[undertone as 'calido' | 'frio' | 'neutro'] || recommendations.calido;
  return res.json({ success: true, result });
});

async function startServer() {
  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`L'Éclat Beauty Server running on http://localhost:${PORT}`);
  });
}

startServer();
