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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Quran reading website running on port ${PORT}`);
});
