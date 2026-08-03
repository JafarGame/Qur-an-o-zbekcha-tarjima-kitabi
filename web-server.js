// Standalone Quran reading website.
// This is completely separate from index.js (the Telegram bot) and does not
// touch it, its process, or its dependencies. It only reads quran.json.
const express  = require("express");
const path     = require("path");
const multer   = require("multer");
const FormData = require("form-data");
const axios    = require("axios");
const quran    = require("./quran.json");

const app = express();
const PORT = process.env.WEB_PORT || 5000;

// Uzbek transliterated surah names, in Quran order (1-114).
const surahNames = [
  "Fotiha", "Baqara", "Ali Imron", "Niso", "Moida", "An'om", "A'rof", "Anfol", "Tavba", "Yunus",
  "Hud", "Yusuf", "Ra'd", "Ibrohim", "Hijr", "Nahl", "Isro", "Kahf", "Maryam", "Toha",
  "Anbiyo", "Haj", "Mu'minun", "Nur", "Furqon", "Shuaro", "Naml", "Qasas", "Ankabut", "Rum",
  "Luqmon", "Sajda", "Ahzob", "Saba", "Fotir", "Yosin", "Saffot", "Sod", "Zumar", "G'ofir",
  "Fussilat", "Shuro", "Zuxruf", "Duxon", "Josiya", "Ahqof", "Muhammad", "Fath", "Hujurot", "Qof",
  "Zoriyot", "Tur", "Najm", "Qamar", "Rahmon", "Voqia", "Hadid", "Mujodala", "Hashr", "Mumtahana",
  "Saff", "Jumu'a", "Munofiqun", "Tag'obun", "Taloq", "Tahrim", "Mulk", "Qalam", "Haqqa", "Maorij",
  "Nuh", "Jin", "Muzzammil", "Muddassir", "Qiyomat", "Inson", "Mursalot", "Naba", "Nozi'ot", "Abasa",
  "Takvir", "Infitor", "Mutaffifin", "Inshiqoq", "Buruj", "Toriq", "A'lo", "G'oshiya", "Fajr", "Balad",
  "Shams", "Layl", "Zuho", "Sharh", "Tin", "Alaq", "Qadr", "Bayyina", "Zalzala", "Odiyot",
  "Qori'a", "Takosur", "Asr", "Humaza", "Fil", "Quraysh", "Mo'un", "Kavsar", "Kofirun", "Nasr",
  "Masad", "Ixlos", "Falaq", "Nos"
];

function buildSurahList() {
  return Object.keys(quran)
    .map(Number)
    .sort((a, b) => a - b)
    .map((num) => ({
      number: num,
      name: surahNames[num - 1] || `Surah ${num}`,
      ayahCount: Object.keys(quran[num]).length,
    }));
}

const surahList = buildSurahList();

// Normalize a surah-name query for lookup: lowercase, drop apostrophe
// variants and any non letter/digit characters (so "A'rof", "Arof",
// "a'rof" and "a rof" all resolve to the same key).
function normalizeName(str) {
  return String(str)
    .toLowerCase()
    .replace(/['’‘ʻʼ`]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

const surahNameToNumber = new Map();
surahNames.forEach((name, idx) => {
  surahNameToNumber.set(normalizeName(name), idx + 1);
});

// Normalize Arabic text for search — strip all diacritics, canonicalize
// letter variants so Uthmani script (ٱ, U+0670 superscript alif, etc.)
// matches plain user input or voice-recognition output.
//
// Steps (applied in order):
//  1. Strip tashkeel / harakat / tatweel / other combining marks
//  2. Alif variants  ٱ آ أ إ → ا   (Uthmani alif wasla U+0671 included)
//  3. Alif maqsura  ى        → ي
//  4. Ta marbuta    ة        → ه
//  5. Hamza variants ؤ ئ     → ء  then strip standalone hamza ء
//  6. Strip medial alif — ا between two Arabic letters
//     Uthmani script uses U+0670 (stripped in step 1) for long-vowel alifs
//     that ARE written in standard Arabic (e.g. العالمين → العلمين after step 1
//     but العالمين in user input). Stripping medial alif from both sides makes
//     them equal: العالمين → العلمين = العلمين ✓
function stripArabicDiacritics(str) {
  return String(str)
    .replace(
      /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED\u08D4-\u08E1\u08E3-\u08FF\u0640]/g,
      ""
    )
    .replace(/[\u0622\u0623\u0625\u0671]/g, "\u0627") // alif variants → ا
    .replace(/\u0649/g, "\u064A")                     // alif maqsura  → ي
    .replace(/\u0629/g, "\u0647")                     // ta marbuta    → ه
    .replace(/[\u0624\u0626]/g, "\u0621")             // hamza variants → ء
    .replace(/\u0621/g, "")                           // strip hamza ء
    .replace(/(?<=[\u0600-\u06FF])\u0627(?=[\u0600-\u06FF])/g, ""); // medial alif
}

// Flattened, pre-normalized search index built once from quran.json.
// This does not modify quran.json — it is purely an in-memory index.
const searchIndex = [];
Object.keys(quran)
  .map(Number)
  .sort((a, b) => a - b)
  .forEach((surahNum) => {
    const surahData = quran[surahNum];
    Object.keys(surahData)
      .map(Number)
      .sort((a, b) => a - b)
      .forEach((ayahNum) => {
        const entry = surahData[ayahNum];
        searchIndex.push({
          surah: surahNum,
          ayah: ayahNum,
          arabic: entry.arabic,
          translation: entry.translation,
          arabicNormalized: stripArabicDiacritics(entry.arabic),
          translationLower: entry.translation.toLowerCase(),
        });
      });
  });

// ── Segment index — overlapping 5-token windows for long ayahs ──────────
// Long ayahs (e.g. Ayat al-Kursi at ~50 tokens) are penalised by full-ayah
// Jaccard scoring when a user recites only a short phrase.  Instead we slice
// each long ayah into overlapping 5-token windows (stride 2) so any 4+
// consecutive words can match the correct window at high confidence.
const SEG_WIN  = 5;   // tokens per window
const SEG_STEP = 2;   // stride between windows
const segmentIndex = [];
for (const item of searchIndex) {
  const tokens = item.arabicNormalized.split(/\s+/).filter(Boolean);
  if (tokens.length < 6) continue;   // short ayahs are well-served by full match
  for (let i = 0; i + SEG_WIN <= tokens.length; i += SEG_STEP) {
    segmentIndex.push({
      surah      : item.surah,
      ayah       : item.ayah,
      arabic     : item.arabic,
      translation: item.translation,
      windowText : tokens.slice(i, i + SEG_WIN).join(' '),
    });
  }
}
console.log(
  '[Quran] Segment index: ' + segmentIndex.length + ' windows built from ' +
  searchIndex.filter(it => it.arabicNormalized.split(/\s+/).filter(Boolean).length >= 6).length +
  ' long ayahs'
);

function resolveReference(raw) {
  const q = raw.trim();

  // "3:25" or "3 25" — numeric surah + ayah
  let m = q.match(/^(\d{1,3})[\s:.\-]+(\d{1,3})$/);
  if (m) {
    return { surah: Number(m[1]), ayah: Number(m[2]) };
  }

  // "Baqara 255" or "Baqara:255" — surah name + ayah number
  m = q.match(/^([A-Za-z''’‘ʻʼ`.\s]+?)[\s:.\-]+(\d{1,3})$/);
  if (m) {
    const surahNum = surahNameToNumber.get(normalizeName(m[1]));
    if (surahNum) {
      return { surah: surahNum, ayah: Number(m[2]) };
    }
    return { surah: null, ayah: null, unresolvedName: true };
  }

  return null;
}

function searchText(raw, limit) {
  const q = raw.trim();
  const qLower = q.toLowerCase();
  const qArabic = stripArabicDiacritics(q);

  // Token-level Arabic matching: split the normalized query into words and
  // require ≥ 67 % of them to appear in the ayah.  This tolerates:
  //   • medial-alif differences (العالمين → العلمين in Uthmani after step 6)
  //   • minor recitation/normalization divergences
  //   • partial recitation (user says part of a longer ayah)
  const qArabicTokens = qArabic.split(/\s+/).filter(t => t.length > 1);
  // Threshold: 1–2 tokens → all must match; ≥3 tokens → floor(67%) must match.
  // Math.ceil caused ceil(3 × 0.67) = 3 (100%) for 3-token queries — too strict.
  const minMatch = qArabicTokens.length <= 2
    ? qArabicTokens.length                                    // 0/1/2 tokens: all match
    : Math.max(2, Math.floor(qArabicTokens.length * 0.67));  // ≥3 tokens: ≥67% floor

  const results = [];

  for (const item of searchIndex) {
    let matchesArabic = false;
    if (qArabicTokens.length > 0) {
      let hits = 0;
      for (const tok of qArabicTokens) {
        if (item.arabicNormalized.includes(tok)) hits++;
        if (hits >= minMatch) { matchesArabic = true; break; }
      }
    }

    const matchesTranslation = qLower.length > 0 && item.translationLower.includes(qLower);

    if (matchesArabic || matchesTranslation) {
      results.push({
        surah: item.surah,
        ayah: item.ayah,
        surahName: surahNames[item.surah - 1] || `Surah ${item.surah}`,
        arabic: item.arabic,
        translation: item.translation,
      });
      if (results.length >= limit) break;
    }
  }
  return results;
}

// Segment search: score query tokens against 5-token windows of long ayahs.
// Same 67%-token-coverage rule as searchText; deduplicates by surah+ayah.
// Short queries (≤ 3 tokens) should use full-ayah search only to avoid noise.
function searchSegments(qNormTokens, limit) {
  if (!qNormTokens.length) return [];
  const minMatch = qNormTokens.length <= 2
    ? qNormTokens.length
    : Math.max(2, Math.floor(qNormTokens.length * 0.67));
  const seen = new Set();
  const results = [];
  for (const seg of segmentIndex) {
    const key = seg.surah + ':' + seg.ayah;
    if (seen.has(key)) continue;     // already found via an earlier window
    let hits = 0;
    for (const qt of qNormTokens) {
      if (seg.windowText.includes(qt)) hits++;
      if (hits >= minMatch) break;
    }
    if (hits >= minMatch) {
      seen.add(key);
      results.push({
        surah      : seg.surah,
        ayah       : seg.ayah,
        surahName  : surahNames[seg.surah - 1] || `Surah ${seg.surah}`,
        arabic     : seg.arabic,
        translation: seg.translation,
      });
      if (results.length >= limit) break;
    }
  }
  return results;
}

// Dashboard is the main landing page; surah list remains at /index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/surahs", (req, res) => {
  res.json(surahList);
});

app.get("/api/surah/:number", (req, res) => {
  const num = Number(req.params.number);
  const surahData = quran[num];
  if (!surahData) {
    return res.status(404).json({ error: "Surah not found" });
  }

  const ayahs = Object.keys(surahData)
    .map(Number)
    .sort((a, b) => a - b)
    .map((ayahNum) => ({
      number: ayahNum,
      arabic: surahData[ayahNum].arabic,
      translation: surahData[ayahNum].translation,
    }));

  res.json({
    number: num,
    name: surahNames[num - 1] || `Surah ${num}`,
    ayahCount: ayahs.length,
    ayahs,
  });
});

app.get("/api/search", (req, res) => {
  const raw = String(req.query.q || "").trim();
  if (!raw) {
    return res.json({ type: "empty", results: [] });
  }

  const ref = resolveReference(raw);
  if (ref && ref.unresolvedName) {
    return res.json({ type: "not_found" });
  }
  if (ref && ref.surah && ref.ayah) {
    const surahData = quran[ref.surah];
    const entry = surahData && surahData[ref.ayah];
    if (entry) {
      return res.json({
        type: "ayah",
        surah: ref.surah,
        surahName: surahNames[ref.surah - 1] || `Surah ${ref.surah}`,
        ayah: ref.ayah,
        arabic: entry.arabic,
        translation: entry.translation,
      });
    }
    return res.json({ type: "not_found" });
  }

  // Use a larger candidate pool for Arabic queries so late-surah ayahs
  // (e.g. 55:2 for القرآن) are not cut off by an early limit.
  const isArabic = /[\u0600-\u06FF]/.test(raw);
  const results  = searchText(raw, isArabic ? 200 : 40);

  // For Arabic queries with > 3 tokens, augment with segment search so
  // partial phrases within long ayahs (e.g. Ayat al-Kursi middle) are found.
  if (isArabic) {
    const qNorm = stripArabicDiacritics(raw);
    const qToks = qNorm.split(/\s+/).filter(t => t.length > 1);
    if (qToks.length > 3) {
      const segResults = searchSegments(qToks, 50);
      const seen = new Set(results.map(r => r.surah + ':' + r.ayah));
      for (const sr of segResults) {
        const key = sr.surah + ':' + sr.ayah;
        if (!seen.has(key)) { seen.add(key); results.push(sr); }
      }
    }
  }
  return res.json({ type: "results", results, query: raw });
});

// ── /api/transcribe — AI speech-to-text via OpenAI Whisper ─────────────
// Accepts multipart/form-data POST with an 'audio' field (WebM/Opus blob).
// When WHISPER_API_KEY is configured, proxies to whisper-1 with language=ar
// and returns { transcript, source: "whisper" }.
// When no key is present returns { transcript: null, source: "unavailable" }.
// All audio is handled in-memory — no disk writes.
//
// Security controls:
//   • 25 MB file-size cap (Whisper's own maximum)
//   • MIME-type allowlist — only audio/* and application/octet-stream accepted
//   • 10 requests per minute per IP in-memory rate limit

const AUDIO_MIME_RE = /^(audio\/|application\/octet-stream)/i;
const _upload = multer({
  storage: multer.memoryStorage(),
  limits : { fileSize: 25 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    if (AUDIO_MIME_RE.test(file.mimetype)) return cb(null, true);
    cb(Object.assign(new Error('Unsupported MIME type: ' + file.mimetype), { code: 'INVALID_MIME' }));
  },
});

// Simple in-memory rate limiter — 10 requests per 60 s per IP.
// Not a replacement for a proper gateway limit but prevents runaway cost
// from a single unauthenticated client.
const _transcribeRates = new Map();
const _RL_LIMIT = 10, _RL_WINDOW = 60_000;
function _transcribeAllowed(ip) {
  const now  = Date.now();
  const slot = _transcribeRates.get(ip) || { n: 0, until: now + _RL_WINDOW };
  if (now > slot.until) { slot.n = 0; slot.until = now + _RL_WINDOW; }
  slot.n++;
  _transcribeRates.set(ip, slot);
  return slot.n <= _RL_LIMIT;
}

app.post('/api/transcribe',
  // 1. Rate limiter
  (req, res, next) => {
    const ip = req.ip || (req.socket && req.socket.remoteAddress) || 'unknown';
    if (!_transcribeAllowed(ip)) {
      return res.status(429).json({ transcript: null, source: 'rate-limited' });
    }
    next();
  },
  // 2. File upload (with size + MIME enforcement)
  (req, res, next) => {
    _upload.single('audio')(req, res, err => {
      if (!err) return next();
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ transcript: null, source: 'file-too-large' });
      }
      return res.status(400).json({ transcript: null,
        source: err.code === 'INVALID_MIME' ? 'unsupported-type' : 'upload-error' });
    });
  },
  // 3. Whisper proxy
  async (req, res) => {
    const key = process.env.WHISPER_API_KEY;
    if (!key || !req.file || !req.file.buffer || !req.file.buffer.length) {
      return res.json({ transcript: null, source: 'unavailable' });
    }
    try {
      const fd = new FormData();
      fd.append('file', req.file.buffer, {
        filename   : req.file.originalname || 'audio.webm',
        contentType: req.file.mimetype     || 'audio/webm',
      });
      fd.append('model',           'whisper-1');
      fd.append('language',        'ar');
      fd.append('response_format', 'json');
      const resp = await axios.post(
        'https://api.openai.com/v1/audio/transcriptions',
        fd,
        {
          headers: { ...fd.getHeaders(), Authorization: 'Bearer ' + key },
          maxBodyLength   : Infinity,
          maxContentLength: Infinity,
          timeout         : 15000,
        }
      );
      const transcript = (resp.data && resp.data.text) || null;
      console.log('[Quran] Whisper transcript:', transcript ? transcript.slice(0, 80) : 'null');
      return res.json({ transcript, source: 'whisper' });
    } catch (err) {
      const detail = err.response
        ? err.response.status + ' ' + JSON.stringify(err.response.data).slice(0, 120)
        : err.message;
      console.error('[Quran] Whisper error:', detail);
      return res.json({ transcript: null, source: 'error' });
    }
  }
);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Quran reading website running on port ${PORT}`);
});
