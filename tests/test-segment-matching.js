'use strict';
/**
 * Segment-matching accuracy test harness — 27 tests
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

// ═══ Group F: scoring constants (5 tests) ══════════════════════════════════

console.log('\n═══ Group F: scoring constants (5 tests) ═══\n');

assert('SEG_WIN === 5',
  scoring.SEG_WIN === 5,
  'got ' + scoring.SEG_WIN);

assert('SEG_STEP === 2',
  scoring.SEG_STEP === 2,
  'got ' + scoring.SEG_STEP);

// When query === ayah, scoreCoverage = 1.0 and scoreJaccard = 1.0.
// scoreWithWindows returns coverageWeight * 1.0 + jaccardWeight * 1.0,
// which equals the sum of the two weights.  If that sum !== 1.0, this fails.
(function () {
  // Use a short ayah (<6 tokens) so the window branch is skipped and only the
  // full-score formula (cov * w1 + jac * w2) is exercised.
  const score = scoring.scoreWithWindows(qToks(ikhlas4), ikhlas4);
  assert('coverage + jaccard weights sum to 1.0 (identical query/ayah → score 1.0)',
    Math.abs(score - 1.0) < 1e-9,
    'got ' + score.toFixed(6));
})();

// Lock the individual 0.8 / 0.2 split, not just their sum.
// Use ikhlas4 as the ayah because it is short after normalization (< 6 tokens),
// which guarantees scoreWithWindows skips the window branch and runs only
// the full-score formula: score = cov * 0.8 + jac * 0.2.
// Query "ولم يكن" (first two words of ikhlas4): coverage = 1.0 (both tokens
// appear in the ayah), jaccard < 1.0 (ayah has more tokens → larger union).
// Expected = cov * 0.8 + jac * 0.2, computed with the HARDCODED weights —
// any weight swap (e.g. 0.5/0.5 or 0.2/0.8) produces a different value.
(function () {
  const ayahToks = scoring.tokenize(ikhlas4);
  // Pre-condition: ikhlas4 must have < 6 tokens so the window branch is skipped.
  if (ayahToks.length >= 6) {
    assert('scoreWithWindows uses 0.8 coverage + 0.2 jaccard (not a different split)',
      false,
      'pre-condition failed: ikhlas4 has ' + ayahToks.length + ' tokens, expected < 6');
    return;
  }
  const q   = qToks('ولم يكن');
  const cov = scoring.scoreCoverage(q, ikhlas4);
  const jac = scoring.scoreJaccard(q, ikhlas4);
  // Pre-condition: coverage and jaccard must differ so weight order matters.
  if (Math.abs(cov - jac) < 0.01) {
    assert('scoreWithWindows uses 0.8 coverage + 0.2 jaccard (not a different split)',
      false,
      'pre-condition failed: cov ≈ jac (' + cov.toFixed(3) + '), cannot distinguish weight splits');
    return;
  }
  // Hardcode the intended weights here — this is exactly what we are locking.
  const expectedWith0_8_0_2 = cov * 0.8 + jac * 0.2;
  const actual = scoring.scoreWithWindows(q, ikhlas4);
  assert('scoreWithWindows uses 0.8 coverage + 0.2 jaccard (not a different split)',
    Math.abs(actual - expectedWith0_8_0_2) < 1e-9,
    'cov=' + cov.toFixed(3) + ' jac=' + jac.toFixed(3) +
    ' expected(0.8/0.2)=' + expectedWith0_8_0_2.toFixed(6) + ' got=' + actual.toFixed(6));
})();

// Lock the 0.8 / 0.2 split inside the sliding-window branch (long ayah path).
// Kursi (2:255) is long; a 3-token query keeps qToks.length well below
// ceil(ayahToks.length * 0.7), so the window loop runs.  WIN = max(5, 3) = 5.
// At the best window where all 3 query tokens fit: cov = 1.0, jac = 3/5 = 0.6.
// Expected with 0.8/0.2 weights = 0.8*1.0 + 0.2*0.6 = 0.92.
// With 0.5/0.5 the same window gives 0.80 — any weight drift is caught.
(function () {
  const q        = scoring.tokenize('وسع كرسيه السماوات');
  const ayahToks = scoring.tokenize(kursi);
  const WIN      = Math.max(5, q.length);

  // Pre-condition: window branch must be taken
  if (ayahToks.length < 6 || q.length >= Math.ceil(ayahToks.length * 0.7)) {
    assert('window-branch: scoreWithWindows uses 0.8 coverage + 0.2 jaccard',
      false, 'pre-condition failed: window branch not taken');
    return;
  }

  // Replicate the scan with HARDCODED 0.8/0.2 to produce the expected value.
  const fullCov   = scoring.scoreCoverage(q, kursi);
  const fullJac   = scoring.scoreJaccard(q, kursi);
  let expected    = fullCov * 0.8 + fullJac * 0.2;   // hardcoded weights
  let bestWinCov  = 0, bestWinJac = 0;
  for (let i = 0; i + WIN <= ayahToks.length; i++) {
    const win = ayahToks.slice(i, i + WIN).join(' ');
    const c   = scoring.scoreCoverage(q, win);
    const j   = scoring.scoreJaccard(q, win);
    const s   = c * 0.8 + j * 0.2;                   // hardcoded weights
    if (s > expected) { expected = s; bestWinCov = c; bestWinJac = j; }
  }

  const actual           = scoring.scoreWithWindows(q, kursi);
  const fullScore        = fullCov * 0.8 + fullJac * 0.2;
  const winDominates     = expected > fullScore + 0.001;
  const covNeqJac        = Math.abs(bestWinCov - bestWinJac) > 0.01;
  assert(
    'window-branch: scoreWithWindows uses 0.8 coverage + 0.2 jaccard (not a different split)',
    Math.abs(actual - expected) < 1e-9 && winDominates && covNeqJac,
    'actual=' + actual.toFixed(6) + ' expected(0.8/0.2)=' + expected.toFixed(6) +
    ' winDominates=' + winDominates + ' covNeqJac=' + covNeqJac
  );
})();

// ═══ Group G: minMatch threshold locked at 67% (3 tests) ══════════════════════

console.log('\n═══ Group G: minMatch threshold locked at 67% (3 tests) ═══\n');

(function () {
  // Build a tiny synthetic segment index with one window of known normalized tokens.
  // We use simple consonants that survive normalization unchanged (no alif, hamza, etc.).
  const fakeWindowToks = scoring.tokenize('ب ت ث ج خ');   // ['ب','ت','ث','ج','خ']
  const fakeSeg = [{
    surah      : 999,
    ayah       : 1,
    arabic     : 'synthetic',
    translation: 'synthetic',
    windowText : fakeWindowToks.join(' '),   // 'ب ت ث ج خ'
  }];

  // ── Test G-1: exactly 4/7 matching tokens → FOUND with 0.67 threshold ──────
  //
  // For a 7-token query (length > 2):
  //   Math.floor(7 * 0.67) = Math.floor(4.69) = 4  → minMatch = 4  (found)
  //   Math.floor(7 * 0.75) = Math.floor(5.25) = 5  → minMatch = 5  (not found)
  //
  // Query tokens ب ت ث ج are in the window; د ذ ر are not → exactly 4 hits.
  const q7hit = scoring.tokenize('ب ت ث ج د ذ ر');   // 4 in window, 3 not
  const found7 = scoring.searchSegmentsInIndex(fakeSeg, q7hit, 10);
  assert(
    'minMatch(67%): 4/7 tokens hit → result returned ' +
      '[Math.floor(7×0.67)=4 pass; Math.floor(7×0.75)=5 would fail]',
    found7.some(r => r.surah === 999 && r.ayah === 1),
    'got: ' + found7.map(r => r.surah + ':' + r.ayah).join(', ')
  );

  // ── Test G-2: only 3/7 matching tokens → NOT FOUND (below 67% floor) ───────
  const q7miss = scoring.tokenize('ب ت ث د ذ ر ز');   // 3 in window, 4 not
  const notFound7 = scoring.searchSegmentsInIndex(fakeSeg, q7miss, 10);
  assert(
    'minMatch(67%): 3/7 tokens hit → no result (below threshold)',
    !notFound7.some(r => r.surah === 999 && r.ayah === 1),
    'expected not found, got: ' + notFound7.map(r => r.surah + ':' + r.ayah).join(', ')
  );

  // ── Test G-3: exactly 4/6 matching tokens → FOUND ───────────────────────────
  //
  // For a 6-token query:
  //   Math.floor(6 * 0.67) = Math.floor(4.02) = 4  → minMatch = 4  (found)
  //   Math.floor(6 * 0.75) = Math.floor(4.50) = 4  → minMatch = 4  (same here)
  // This confirms the absolute minimum-match count for a 6-token query is 4.
  const q6 = scoring.tokenize('ب ت ث ج د ذ');   // 4 in window (ب ت ث ج), 2 not
  const found6 = scoring.searchSegmentsInIndex(fakeSeg, q6, 10);
  assert(
    'minMatch(67%): 4/6 tokens hit → result returned [Math.floor(6×0.67)=4]',
    found6.some(r => r.surah === 999 && r.ayah === 1),
    'got: ' + found6.map(r => r.surah + ':' + r.ayah).join(', ')
  );
})();

// ═══ Group H: end-to-end partial-phrase queries (10 tests) ═══════════════════
//
// Each test feeds a real partial phrase (4–7 tokens from a known long ayah)
// through the full pipeline:  normalize → tokenize → searchSegmentsInIndex
// and asserts the correct surah:ayah is the FIRST result returned.
// This catches regressions where threshold math is correct but normalization
// changes cause tokens to stop matching real windowText entries.

console.log('\n═══ Group H: end-to-end partial-phrase queries (5 tests) ═══\n');

(function () {
  // H-1: Opening into early-middle of Ayat al-Kursi (2:255) — 5 words
  // "الحي القيوم لا تأخذه سنة" — "القيوم" first appears in 2:255 in the index;
  // minMatch = floor(5×0.67) = 3 so at least 3 of these 5 distinctive tokens must
  // hit a window, making it very unlikely any earlier ayah qualifies first.
  var q1 = scoring.tokenize('الحي القيوم لا تأخذه سنة');
  var r1 = scoring.searchSegmentsInIndex(segmentIndex, q1, 10);
  assert(
    'H-1: 5 words "الحي القيوم لا تأخذه سنة" from Ayat al-Kursi → 2:255 is the first result',
    r1.length > 0 && r1[0].surah === 2 && r1[0].ayah === 255,
    'first result: ' + (r1[0] ? r1[0].surah + ':' + r1[0].ayah : 'none') +
      ' | all: ' + r1.map(function (r) { return r.surah + ':' + r.ayah; }).join(', ')
  );
})();

(function () {
  // H-2: Centre-to-end span of Ayat al-Kursi (2:255) — 6 words
  // "وسع كرسيه السماوات والأرض ولا يؤوده" —
  // minMatch = floor(6×0.67) = 4; "كرسيه" and "يؤوده" are unique to 2:255, so any
  // other ayah would need 4 of the 6 tokens from common words alone, which is
  // impossible in a 5-token window — guaranteeing 2:255 is the sole (first) match.
  var q2 = scoring.tokenize('وسع كرسيه السماوات والأرض ولا يؤوده');
  var r2 = scoring.searchSegmentsInIndex(segmentIndex, q2, 10);
  assert(
    'H-2: 6-word span "وسع كرسيه … ولا يؤوده" from Ayat al-Kursi → 2:255 is the first result',
    r2.length > 0 && r2[0].surah === 2 && r2[0].ayah === 255,
    'first result: ' + (r2[0] ? r2[0].surah + ':' + r2[0].ayah : 'none') +
      ' | all: ' + r2.map(function (r) { return r.surah + ':' + r.ayah; }).join(', ')
  );
})();

(function () {
  // H-3: Early-middle of Ayat al-Kursi (2:255) — 5 words
  // "لا تأخذه سنة ولا نوم" — "سنة" in this meaning is unique to this ayah
  var q3 = scoring.tokenize('لا تأخذه سنة ولا نوم');
  var r3 = scoring.searchSegmentsInIndex(segmentIndex, q3, 10);
  assert(
    'H-3: 5 words "لا تأخذه سنة ولا نوم" from Ayat al-Kursi → 2:255 is the first result',
    r3.length > 0 && r3[0].surah === 2 && r3[0].ayah === 255,
    'first result: ' + (r3[0] ? r3[0].surah + ':' + r3[0].ayah : 'none') +
      ' | all: ' + r3.map(function (r) { return r.surah + ':' + r.ayah; }).join(', ')
  );
})();

(function () {
  // H-4: End of Ayat al-Kursi (2:255) — last 5 words
  // "ولا يؤوده حفظهما وهو العلي" — "حفظهما" only appears here
  var q4 = scoring.tokenize('ولا يؤوده حفظهما وهو العلي');
  var r4 = scoring.searchSegmentsInIndex(segmentIndex, q4, 10);
  assert(
    'H-4: last 5 words of Ayat al-Kursi "ولا يؤوده حفظهما وهو العلي" → 2:255 is the first result',
    r4.length > 0 && r4[0].surah === 2 && r4[0].ayah === 255,
    'first result: ' + (r4[0] ? r4[0].surah + ':' + r4[0].ayah : 'none') +
      ' | all: ' + r4.map(function (r) { return r.surah + ':' + r.ayah; }).join(', ')
  );
})();

(function () {
  // H-5: Middle of Al-Baqarah 2:286 — 6 words from a different long ayah
  // "لا يكلف الله نفسا إلا وسعها" — tests a different surah/ayah pair
  var q5 = scoring.tokenize('لا يكلف الله نفسا إلا وسعها');
  var r5 = scoring.searchSegmentsInIndex(segmentIndex, q5, 10);
  assert(
    'H-5: 6 words "لا يكلف الله نفسا إلا وسعها" from 2:286 → 2:286 is the first result',
    r5.length > 0 && r5[0].surah === 2 && r5[0].ayah === 286,
    'first result: ' + (r5[0] ? r5[0].surah + ':' + r5[0].ayah : 'none') +
      ' | all: ' + r5.map(function (r) { return r.surah + ':' + r.ayah; }).join(', ')
  );
})();

(function () {
  // H-6: Middle of Aal-Imran 3:26 — 7 words
  // "مالك الملك تؤتي الملك من تشاء وتنزع" — the verb تؤتي and the pair "تنزع/الملك"
  // are unique to this ayah; minMatch = floor(7×0.67) = 4, and any window of 5
  // consecutive tokens here contains at least 4 of these query tokens.
  var q6 = scoring.tokenize('مالك الملك تؤتي الملك من تشاء وتنزع');
  var r6 = scoring.searchSegmentsInIndex(segmentIndex, q6, 10);
  assert(
    'H-6: 7 words "مالك الملك تؤتي الملك من تشاء وتنزع" from Aal-Imran 3:26 → 3:26 is the first result',
    r6.length > 0 && r6[0].surah === 3 && r6[0].ayah === 26,
    'first result: ' + (r6[0] ? r6[0].surah + ':' + r6[0].ayah : 'none') +
      ' | all: ' + r6.map(function (r) { return r.surah + ':' + r.ayah; }).join(', ')
  );
})();

(function () {
  // H-7: End of Aal-Imran 3:185 — 8 words
  // "من زحزح عن النار وأدخل الجنة فقد فاز" — "زحزح" appears nowhere else;
  // minMatch = floor(8×0.67) = 5; the segment window containing زحزح immediately
  // satisfies that threshold, so 3:185 is the sole match.
  var q7 = scoring.tokenize('من زحزح عن النار وأدخل الجنة فقد فاز');
  var r7 = scoring.searchSegmentsInIndex(segmentIndex, q7, 10);
  assert(
    'H-7: 8 words "من زحزح عن النار وأدخل الجنة فقد فاز" from Aal-Imran 3:185 → 3:185 is the first result',
    r7.length > 0 && r7[0].surah === 3 && r7[0].ayah === 185,
    'first result: ' + (r7[0] ? r7[0].surah + ':' + r7[0].ayah : 'none') +
      ' | all: ' + r7.map(function (r) { return r.surah + ':' + r.ayah; }).join(', ')
  );
})();

(function () {
  // H-8: Opening of An-Nisa 4:11 — 7 words
  // "يوصيكم الله في أولادكم للذكر مثل حظ" — "يوصيكم" is unique to this ayah;
  // minMatch = floor(7×0.67) = 4; the opening segment window matches easily.
  var q8 = scoring.tokenize('يوصيكم الله في أولادكم للذكر مثل حظ');
  var r8 = scoring.searchSegmentsInIndex(segmentIndex, q8, 10);
  assert(
    'H-8: 7 words "يوصيكم الله في أولادكم للذكر مثل حظ" from An-Nisa 4:11 → 4:11 is the first result',
    r8.length > 0 && r8[0].surah === 4 && r8[0].ayah === 11,
    'first result: ' + (r8[0] ? r8[0].surah + ':' + r8[0].ayah : 'none') +
      ' | all: ' + r8.map(function (r) { return r.surah + ':' + r.ayah; }).join(', ')
  );
})();

(function () {
  // H-9: Opening of Al-Kahf 18:18 — 7 words
  // "وتحسبهم أيقاظا وهم رقود ونقلبهم ذات اليمين" — "أيقاظا" and "رقود" together
  // identify this ayah uniquely; minMatch = floor(7×0.67) = 4.
  var q9 = scoring.tokenize('وتحسبهم أيقاظا وهم رقود ونقلبهم ذات اليمين');
  var r9 = scoring.searchSegmentsInIndex(segmentIndex, q9, 10);
  assert(
    'H-9: 7 words "وتحسبهم أيقاظا وهم رقود ونقلبهم ذات اليمين" from Al-Kahf 18:18 → 18:18 is the first result',
    r9.length > 0 && r9[0].surah === 18 && r9[0].ayah === 18,
    'first result: ' + (r9[0] ? r9[0].surah + ':' + r9[0].ayah : 'none') +
      ' | all: ' + r9.map(function (r) { return r.surah + ':' + r.ayah; }).join(', ')
  );
})();

(function () {
  // H-10: Middle of An-Nisa 4:56 — 6 words
  // "كلما نضجت جلودهم بدلناهم جلودا غيرها" — "نضجت" and "بدلناهم" together
  // are unique to this ayah; minMatch = floor(6×0.67) = 4.
  var q10 = scoring.tokenize('كلما نضجت جلودهم بدلناهم جلودا غيرها');
  var r10 = scoring.searchSegmentsInIndex(segmentIndex, q10, 10);
  assert(
    'H-10: 6 words "كلما نضجت جلودهم بدلناهم جلودا غيرها" from An-Nisa 4:56 → 4:56 is the first result',
    r10.length > 0 && r10[0].surah === 4 && r10[0].ayah === 56,
    'first result: ' + (r10[0] ? r10[0].surah + ':' + r10[0].ayah : 'none') +
      ' | all: ' + r10.map(function (r) { return r.surah + ':' + r.ayah; }).join(', ')
  );
})();

// ═══ Group I: 6-token segment-index boundary (2 tests) ════════════════════════
//
// buildSegmentIndex skips ayahs with fewer than 6 normalized tokens (< 6).
// These tests pin the boundary using real ayahs scanned from searchIndex so
// that any normalization change that shifts a short ayah's token count by ±1
// is immediately caught.
//
//   • Exactly-5-token ayah: 2:1  — tokens ["بسم","الله","الرحمن","الرحيم","الم"]
//     → must NOT appear in the segment index (threshold is tokens.length < 6)
//
//   • Exactly-6-token ayah: 2:18 — tokens ["صم","بكم","عمي","فهم","لا","يرجعون"]
//     → must appear in the segment index

console.log('\n═══ Group I: 6-token segment-index boundary (2 tests) ═══\n');

(function () {
  // Verify the pre-condition: 2:1 actually has exactly 5 normalized tokens.
  var norm21 = scoring.normalize(quran[2][1].arabic);
  var toks21 = norm21.split(/\s+/).filter(Boolean);
  if (toks21.length !== 5) {
    assert(
      'I-1 pre-condition: 2:1 has exactly 5 normalized tokens (got ' + toks21.length + ')',
      false,
      'tokens: ' + JSON.stringify(toks21)
    );
  } else {
    var in21 = segmentIndex.some(function (w) { return w.surah === 2 && w.ayah === 1; });
    assert(
      'I-1: exactly-5-token ayah (2:1) is NOT in the segment index (boundary: tokens.length < 6)',
      !in21,
      'unexpectedly found 2:1 in segment index'
    );
  }
})();

(function () {
  // Verify the pre-condition: 2:18 actually has exactly 6 normalized tokens.
  var norm218 = scoring.normalize(quran[2][18].arabic);
  var toks218 = norm218.split(/\s+/).filter(Boolean);
  if (toks218.length !== 6) {
    assert(
      'I-2 pre-condition: 2:18 has exactly 6 normalized tokens (got ' + toks218.length + ')',
      false,
      'tokens: ' + JSON.stringify(toks218)
    );
  } else {
    var in218 = segmentIndex.some(function (w) { return w.surah === 2 && w.ayah === 18; });
    assert(
      'I-2: exactly-6-token ayah (2:18) IS in the segment index (boundary: tokens.length >= 6)',
      in218,
      'expected 2:18 in segment index but it was absent'
    );
  }
})();

// ═══ Group J: token-count parity — bulk drift guard (2 tests) ════════════════
//
// Counts every ayah in the corpus whose normalized token count is exactly 5
// (excluded from the segment index) or exactly 6 (included).  Both counts are
// pinned to their baseline ±5 so a normalization change that silently reshuffles
// a cluster of short ayahs across the 6-token boundary triggers a visible failure
// long before the individual Group-I examples would catch it.
//
//   Baseline (computed 2026-08-03 from current quran.json + arabic-scoring.js):
//     Exactly-5-token ayahs : 437
//     Exactly-6-token ayahs : 373

console.log('\n═══ Group J: token-count parity — bulk drift guard (2 tests) ═══\n');

(function () {
  var BASELINE_5   = 437;
  var BASELINE_6   = 373;
  var TOLERANCE    = 5;
  var count5 = 0;
  var count6 = 0;

  Object.keys(quran)
    .map(Number)
    .sort(function (a, b) { return a - b; })
    .forEach(function (surahNum) {
      Object.keys(quran[surahNum])
        .map(Number)
        .sort(function (a, b) { return a - b; })
        .forEach(function (ayahNum) {
          var n = scoring.tokenize(quran[surahNum][ayahNum].arabic).length;
          if (n === 5) count5++;
          if (n === 6) count6++;
        });
    });

  assert(
    'J-1: exactly-5-token ayah count within ±' + TOLERANCE + ' of baseline ' + BASELINE_5 +
      ' (got ' + count5 + ')',
    Math.abs(count5 - BASELINE_5) <= TOLERANCE,
    'count5=' + count5 + ' baseline=' + BASELINE_5 + ' diff=' + Math.abs(count5 - BASELINE_5)
  );

  assert(
    'J-2: exactly-6-token ayah count within ±' + TOLERANCE + ' of baseline ' + BASELINE_6 +
      ' (got ' + count6 + ')',
    Math.abs(count6 - BASELINE_6) <= TOLERANCE,
    'count6=' + count6 + ' baseline=' + BASELINE_6 + ' diff=' + Math.abs(count6 - BASELINE_6)
  );
})();

// ── Summary ───────────────────────────────────────────────────────────────────

const total = passed + failed;
console.log('\n═══════════════════════════════════════════════════');
console.log('Results: ' + passed + '/' + total + ' passed' + (failed ? ', ' + failed + ' FAILED' : ''));
console.log('═══════════════════════════════════════════════════\n');

if (failed > 0) process.exit(1);
