#!/usr/bin/env node
/**
 * Validate ArabicMatcher.SURAH_AYAH_COUNT against quran.json (the live data source).
 *
 * Run:    node scripts/validate-ayah-counts.js
 * Exits:  0 — all 114 counts match
 *         1 — one or more mismatches found (update SURAH_AYAH_COUNT in audio-assistant.js)
 *         2 — quran.json not found
 */

'use strict';

const path = require('path');
const fs   = require('fs');

// ── Hardcoded table mirrored from public/js/audio-assistant.js
//    (ArabicMatcher.SURAH_AYAH_COUNT)
const SURAH_AYAH_COUNT = [
  0,   // index 0 — unused (surah numbers are 1-based)
    7,286,200,176,120,165,206, 75,129,109,  // 1–10
  123,111, 43, 52, 99,128,111,110, 98,135,  // 11–20
  112, 78,118, 64, 77,227, 93, 88, 69, 60,  // 21–30
   34, 30, 73, 54, 45, 83,182, 88, 75, 85,  // 31–40
   54, 53, 89, 59, 37, 35, 38, 29, 18, 45,  // 41–50
   60, 49, 62, 55, 78, 96, 29, 22, 24, 13,  // 51–60
   14, 11, 11, 18, 12, 12, 30, 52, 52, 44,  // 61–70
   28, 28, 20, 56, 40, 31, 50, 40, 46, 42,  // 71–80
   29, 19, 36, 25, 22, 17, 19, 26, 30, 20,  // 81–90
   15, 21, 11,  8,  8, 19,  5,  8,  8, 11,  // 91–100
   11,  8,  3,  9,  5,  4,  7,  3,  6,  3,  // 101–110
    5,  4,  5,  6,                           // 111–114
];

const quranPath = path.join(__dirname, '..', 'quran.json');
if (!fs.existsSync(quranPath)) {
  console.error('ERROR: quran.json not found at', quranPath);
  process.exit(2);
}

const quran = JSON.parse(fs.readFileSync(quranPath, 'utf8'));

let mismatches = 0;
for (let s = 1; s <= 114; s++) {
  // quran.json keys may be numeric or string depending on JSON parse
  const surahData = quran[s] || quran[String(s)];
  if (!surahData) {
    console.error('  MISSING  surah ' + s + ' — not found in quran.json');
    mismatches++;
    continue;
  }
  const live     = Object.keys(surahData).length;
  const expected = SURAH_AYAH_COUNT[s];
  if (live !== expected) {
    console.error(
      '  MISMATCH surah ' + s + ': SURAH_AYAH_COUNT=' + expected +
      ' but quran.json has ' + live + ' ayahs'
    );
    mismatches++;
  }
}

if (mismatches > 0) {
  console.error(
    '\n\u2716  ' + mismatches + ' mismatch(es) found.\n' +
    '   Update SURAH_AYAH_COUNT in public/js/audio-assistant.js ' +
    '(ArabicMatcher section) to match quran.json.'
  );
  process.exit(1);
} else {
  console.log('\u2714  All 114 surah ayah counts match quran.json');
  process.exit(0);
}
