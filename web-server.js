// Standalone Quran reading website.
// This is completely separate from index.js (the Telegram bot) and does not
// touch it, its process, or its dependencies. It only reads quran.json.
const express = require("express");
const path = require("path");
const quran = require("./quran.json");

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
  const results = searchText(raw, isArabic ? 200 : 40);
  return res.json({ type: "results", results, query: raw });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Quran reading website running on port ${PORT}`);
});
