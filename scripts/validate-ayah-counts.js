#!/usr/bin/env node
/**
 * Validate ArabicMatcher.SURAH_AYAH_COUNT against quran.json.
 *
 * The table is EXTRACTED from the live browser source file
 * (public/js/audio-assistant.js) rather than duplicated here, so any
 * edit to the table — including accidental corruption — is caught.
 *
 * Run:        node scripts/validate-ayah-counts.js
 * Self-test:  node scripts/validate-ayah-counts.js --self-test
 *
 * Exits:  0 — all 114 counts match
 *         1 — one or more mismatches found
 *         2 — unable to parse the source table or quran.json not found
 */

'use strict';

const path = require('path');
const fs   = require('fs');

// ── 1. Parse SURAH_AYAH_COUNT from the live browser source ──────────────────

const sourceFile = path.join(__dirname, '..', 'public', 'js', 'audio-assistant.js');
if (!fs.existsSync(sourceFile)) {
  console.error('ERROR: source file not found:', sourceFile);
  process.exit(2);
}

const source = fs.readFileSync(sourceFile, 'utf8');

// Match everything between "SURAH_AYAH_COUNT: [" and the first standalone "],"
const arrayMatch = source.match(/SURAH_AYAH_COUNT\s*:\s*\[([\s\S]*?)\]/);
if (!arrayMatch) {
  console.error('ERROR: SURAH_AYAH_COUNT array not found in', sourceFile);
  process.exit(2);
}

// Strip JS line comments and parse as JSON array
const rawContent = arrayMatch[1]
  .replace(/\/\/[^\n]*/g, '')  // remove // ... comments
  .replace(/,\s*$/, '')        // remove trailing comma if any
  .trim();

let SURAH_AYAH_COUNT;
try {
  SURAH_AYAH_COUNT = JSON.parse('[' + rawContent + ']');
} catch (e) {
  console.error('ERROR: failed to parse SURAH_AYAH_COUNT:', e.message);
  process.exit(2);
}

if (!Array.isArray(SURAH_AYAH_COUNT) || SURAH_AYAH_COUNT.length !== 115) {
  console.error(
    'ERROR: expected 115 entries in SURAH_AYAH_COUNT (index 0 unused + 114 surahs), got',
    SURAH_AYAH_COUNT.length
  );
  process.exit(2);
}

console.log('Parsed SURAH_AYAH_COUNT from', path.relative(process.cwd(), sourceFile));

// ── 2. Load quran.json ───────────────────────────────────────────────────────

const quranPath = path.join(__dirname, '..', 'quran.json');
if (!fs.existsSync(quranPath)) {
  console.error('ERROR: quran.json not found at', quranPath);
  process.exit(2);
}

const quran = JSON.parse(fs.readFileSync(quranPath, 'utf8'));

// ── 3. Compare all 114 entries ───────────────────────────────────────────────

let mismatches = 0;
for (let s = 1; s <= 114; s++) {
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
    '   Update SURAH_AYAH_COUNT in ' + path.relative(process.cwd(), sourceFile) +
    ' (ArabicMatcher section) to match quran.json.'
  );
  process.exit(1);
} else {
  console.log('\u2714  All 114 surah ayah counts match quran.json');
}

// ── 4. Self-test mode — proves the validator catches a wrong value ────────────
// Run with: node scripts/validate-ayah-counts.js --self-test

if (process.argv.includes('--self-test')) {
  console.log('\n--- Self-test: deliberately injecting a wrong count ---');
  const savedCount = SURAH_AYAH_COUNT[2];
  SURAH_AYAH_COUNT[2] = 999; // Al-Baqara should be 286, not 999

  let selfTestMismatches = 0;
  for (let s = 1; s <= 114; s++) {
    const surahData = quran[s] || quran[String(s)];
    if (!surahData) continue;
    const live     = Object.keys(surahData).length;
    const expected = SURAH_AYAH_COUNT[s];
    if (live !== expected) selfTestMismatches++;
  }

  SURAH_AYAH_COUNT[2] = savedCount; // restore

  if (selfTestMismatches === 1) {
    console.log('\u2714  Self-test passed: validator correctly detected 1 injected mismatch (surah 2)');
    process.exit(0);
  } else {
    console.error('\u2716  Self-test FAILED: expected 1 mismatch, got ' + selfTestMismatches);
    process.exit(1);
  }
}
