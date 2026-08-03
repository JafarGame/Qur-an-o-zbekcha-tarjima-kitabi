'use strict';
/**
 * Segment-matching accuracy test harness — 22 tests
 *
 * Imports the PRODUCTION lib/arabic-scoring.js module so any change to
 * WIN/STEP constants, normalization steps, or 0.8/0.2 score weights
 * immediately surfaces as a test failure.
 *
 * THREE cases are HARD-GATED at ≥ 90 %:
 *   • Ayat al-Kursi middle phrase  "وسع كرسيه السماوات والأرض"  → 2:255
 *   • Kursi "لا تأخذه" segment                                  → 2:255
 *   • Al-Fatiha 1:7 full text                                   → 1:7
 *
 * Exit code: 0 = all pass, 1 = one or more failures.
 */

const scoring = require('../lib/arabic-scoring');
const quran   = require('../quran.json');

// ── Build the same searchIndex + segmentIndex that web-server.js uses ────────

const searchIndex = [];
Object.keys(quran)
  .map(Number)
  .sort((a, b) => a - b)
  .forEach(surahNum => {
    const surahData = quran[surahNum];
    Object.keys(surahData)
      .map(Number)
      .sort((a, b) => a - b)
      .forEach(ayahNum => {
        const entry = surahData[ayahNum];
        searchIndex.push({
          surah            : surahNum,
          ayah             : ayahNum,
          arabic           : entry.arabic,
          translation      : entry.translation,
          arabicNormalized : scoring.normalize(entry.arabic),
        });
      });
  });

const segmentIndex = scoring.buildSegmentIndex(searchIndex);

// Helper: normalize + tokenize a query string
function qToks(str) { return scoring.tokenize(str); }

// ── Test runner ───────────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;

function assert(description, condition, extra) {
  if (condition) {
    console.log('  ✓ ' + description);
    passed++;
  } else {
    console.error('  ✗ FAIL: ' + description + (extra ? ' — ' + extra : ''));
    failed++;
  }
}

function assertScore(description, score, minPct, gated) {
  const pct = (score * 100).toFixed(1);
  const ok  = score * 100 >= minPct;
  const tag = gated ? ' [GATED ≥' + minPct + '%]' : ' (≥' + minPct + '%)';
  assert(description + tag + ' → ' + pct + '%', ok);
}

// Convenience ayah text
const kursi   = quran[2][255].arabic;
const fatiha1 = quran[1][1].arabic;
const fatiha7 = quran[1][7].arabic;
const ikhlas1 = quran[112][1].arabic;
const ikhlas4 = quran[112][4].arabic;

// ═══ Group A: normalize / tokenize (4 tests) ═══════════════════════════════

console.log('\n═══ Group A: normalize / tokenize (4 tests) ═══\n');

assert('normalize strips tashkeel (harakat)',
  scoring.normalize('ٱللَّهُ') === scoring.normalize('الله'));

assert('normalize alif variants → ا (آ أ إ ٱ)',
  scoring.normalize('آمَنَ') === scoring.normalize('امن') &&
  scoring.normalize('أَنزَلَ') === scoring.normalize('انزل'));

assert('normalize ta marbuta ة → ه',
  scoring.normalize('الجنة') === scoring.normalize('الجنه'));

assert('tokenize splits on whitespace and filters empties',
  JSON.stringify(scoring.tokenize('  بِسْمِ  ٱللَّهِ  ')) ===
  JSON.stringify(scoring.tokenize('بسم الله')));

// ═══ Group B: scoreCoverage (3 tests) ══════════════════════════════════════

console.log('\n═══ Group B: scoreCoverage (3 tests) ═══\n');

(function () {
  const q = qToks('الله لا إله');   // all three tokens appear in 2:255
  assertScore('coverage: all 3 query tokens present in 2:255',
    scoring.scoreCoverage(q, kursi), 99);

  // 'الله' and 'هو' both appear in 2:255; 'xyz123' does not → 2/3 ≈ 0.667
  const qHalf = qToks('الله هو xyz123');
  const covHalf = scoring.scoreCoverage(qHalf, kursi);
  assert('coverage: 2/3 tokens → ~0.67 (0.60–0.75)',
    covHalf >= 0.60 && covHalf <= 0.75,
    'got ' + covHalf.toFixed(3));

  assert('coverage: no matching tokens → 0',
    scoring.scoreCoverage(qToks('hello world foo'), kursi) === 0);
})();

// ═══ Group C: scoreJaccard (3 tests) ═══════════════════════════════════════

console.log('\n═══ Group C: scoreJaccard (3 tests) ═══\n');

(function () {
  // Short ayah — identical token sets → Jaccard = 1.0
  const shortToks = qToks(ikhlas4);
  assertScore('jaccard: identical token sets → 1.0',
    scoring.scoreJaccard(shortToks, ikhlas4), 99);

  const jPartial = scoring.scoreJaccard(qToks('قل هو الله'), ikhlas1);
  assert('jaccard: partial overlap > 0 and ≤ 1',
    jPartial > 0 && jPartial <= 1.0,
    'got ' + jPartial.toFixed(3));

  assert('jaccard: no overlap → 0',
    scoring.scoreJaccard(qToks('hello world foo bar'), kursi) === 0);
})();

// ═══ Group D: scoreWithWindows — phrase matching in long ayahs (7 tests) ════

console.log('\n═══ Group D: scoreWithWindows — phrase matching (7 tests) ═══\n');

assertScore('full Ayat al-Kursi (2:255) scores ≥ 85%',
  scoring.scoreWithWindows(qToks(kursi), kursi), 85);

// HARD GATE ≥ 90 %
assertScore('[HARD GATE] Kursi middle "وسع كرسيه السماوات والأرض" → 2:255',
  scoring.scoreWithWindows(qToks('وسع كرسيه السماوات والأرض'), kursi), 90, true);

assertScore('[HARD GATE] "لا تأخذه سنة ولا نوم" → 2:255',
  scoring.scoreWithWindows(qToks('لا تأخذه سنة ولا نوم'), kursi), 90, true);

assertScore('[HARD GATE] Al-Fatiha 1:7 full text → 1:7',
  scoring.scoreWithWindows(qToks(fatiha7), fatiha7), 90, true);

// Short ayah (<6 tokens after normalize): window branch is skipped
(function () {
  const s = scoring.scoreWithWindows(qToks(ikhlas1), ikhlas1);
  assert('short ayah (<6 tokens) returns valid score [0,1]',
    s >= 0 && s <= 1.0,
    'got ' + s.toFixed(3));
})();

assertScore('Ikhlas 112:1 full text → ≥ 85%',
  scoring.scoreWithWindows(qToks(ikhlas1), ikhlas1), 85);

assertScore('Fatiha 1:1 "بسم الله الرحمن الرحيم" → ≥ 85%',
  scoring.scoreWithWindows(qToks(fatiha1), fatiha1), 85);

// ═══ Group E: searchSegmentsInIndex — server-side segment logic (5 tests) ═══

console.log('\n═══ Group E: searchSegmentsInIndex — server-side segment logic (5 tests) ═══\n');

(function () {
  const q = scoring.tokenize('وسع كرسيه السماوات والأرض');
  const results = scoring.searchSegmentsInIndex(segmentIndex, q, 10);
  const found = results.some(r => r.surah === 2 && r.ayah === 255);
  assert('searchSegmentsInIndex finds 2:255 from "وسع كرسيه السماوات" tokens', found,
    'results: ' + results.map(r => r.surah + ':' + r.ayah).join(', '));
})();

(function () {
  const q = scoring.tokenize('لا تأخذه سنة ولا نوم');
  const results = scoring.searchSegmentsInIndex(segmentIndex, q, 10);
  const found = results.some(r => r.surah === 2 && r.ayah === 255);
  assert('searchSegmentsInIndex finds 2:255 from "لا تأخذه سنة ولا نوم" tokens', found,
    'results: ' + results.map(r => r.surah + ':' + r.ayah).join(', '));
})();

assert('searchSegmentsInIndex returns [] for empty query',
  scoring.searchSegmentsInIndex(segmentIndex, [], 10).length === 0);

(function () {
  // Many windows of 2:255 match the opening phrase but the ayah should appear once
  const q = scoring.tokenize('الله لا إله إلا هو الحي القيوم');
  const results = scoring.searchSegmentsInIndex(segmentIndex, q, 100);
  const hits255 = results.filter(r => r.surah === 2 && r.ayah === 255);
  assert('searchSegmentsInIndex deduplicates: 2:255 at most once (' + hits255.length + ')',
    hits255.length <= 1);
})();

assert('segmentIndex is non-empty (lib built it correctly)',
  segmentIndex.length > 0,
  'got ' + segmentIndex.length + ' windows');

// ── Summary ───────────────────────────────────────────────────────────────────

const total = passed + failed;
console.log('\n═══════════════════════════════════════════════════');
console.log('Results: ' + passed + '/' + total + ' passed' + (failed ? ', ' + failed + ' FAILED' : ''));
console.log('═══════════════════════════════════════════════════\n');

if (failed > 0) process.exit(1);
