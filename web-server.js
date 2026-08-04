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

// Arabic normalization and scoring are provided by lib/arabic-scoring.js so
// that web-server.js, audio-assistant.js, and the test harness all exercise
// exactly the same implementation — preventing silent scoring regressions.
const ArabicScoring = require("./lib/arabic-scoring");
const stripArabicDiacritics = ArabicScoring.normalize;

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
// Built by the shared lib so the same constants (SEG_WIN/SEG_STEP) and logic
// are exercised by both the server and the test harness.
const { SEG_WIN, SEG_STEP } = ArabicScoring;
const segmentIndex = ArabicScoring.buildSegmentIndex(searchIndex);
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

// Segment search: delegates matching to the shared lib, then enriches results
// with surahName for the client.
function searchSegments(qNormTokens, limit) {
  const raw = ArabicScoring.searchSegmentsInIndex(segmentIndex, qNormTokens, limit);
  return raw.map(r => ({
    surah      : r.surah,
    ayah       : r.ayah,
    surahName  : surahNames[r.surah - 1] || `Surah ${r.surah}`,
    arabic     : r.arabic,
    translation: r.translation,
  }));
}

// Dashboard is the main landing page; surah list remains at /index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// Serve lib/ under /lib so the browser can load shared modules (e.g. arabic-scoring.js)
app.use("/lib", express.static(path.join(__dirname, "lib")));
app.use(express.static(path.join(__dirname, "public")));

// Serve the latest debug APK as a direct download.
app.get('/download/quran-karim.apk', (req, res) => {
  const apkPath = path.join(__dirname, 'android/app/build/outputs/apk/debug/app-debug.apk');
  if (!require('fs').existsSync(apkPath)) {
    return res.status(404).send('APK not found — run ./gradlew assembleDebug first.');
  }
  res.download(apkPath, 'quran-karim.apk');
});

// Serve quran.json at /data/quran.json for the client-side QuranData module.
// This avoids duplicating the 2.5 MB file inside public/ — the single source
// of truth stays at the project root.
app.get('/data/quran.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'quran.json'));
});

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

// When run directly (`node web-server.js`) start the HTTP server.
// When required by a test harness, export test helpers instead so the
// server doesn't bind a port and tests can verify the server's own
// stripArabicDiacritics binding.
if (require.main === module) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Quran reading website running on port ${PORT}`);
  });
} else {
  module.exports = {
    // The server's own normalize alias — used to verify it still delegates
    // to ArabicScoring.normalize and has not been replaced with a local copy.
    _stripArabicDiacritics : stripArabicDiacritics,
    // The ArabicScoring module the server required — used to assert reference
    // equality: stripArabicDiacritics === ArabicScoring.normalize.
    _ArabicScoring         : ArabicScoring,
  };
}
