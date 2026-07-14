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

// Strip Arabic diacritics (tashkeel) and tatweel so search is accent-insensitive.
function stripArabicDiacritics(str) {
  return String(str).replace(
    /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED\u08D4-\u08E1\u08E3-\u08FF\u0640]/g,
    ""
  );
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
  const results = [];

  for (const item of searchIndex) {
    const matchesArabic = qArabic.length > 0 && item.arabicNormalized.includes(qArabic);
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

  const results = searchText(raw, 30);
  return res.json({ type: "results", results, query: raw });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Quran reading website running on port ${PORT}`);
});
