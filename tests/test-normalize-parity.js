'use strict';
/**
 * Normalization parity test — verifies that the client-side normalize
 * (QAA.ArabicMatcher.normalize in audio-assistant.js) and the server-side
 * stripArabicDiacritics (web-server.js) produce byte-for-byte identical
 * output on representative Quranic strings.
 *
 * Both functions must delegate to lib/arabic-scoring.js → normalize().
 * This test catches any future divergence where one side stops using the
 * shared implementation (e.g. someone inlines a different normalization
 * step or forgets to update one side when adding a new Unicode range).
 *
 * Strategy:
 *   1. Require web-server.js (guarded so no server starts) to obtain the
 *      server's own stripArabicDiacritics alias and the ArabicScoring module
 *      it imported.  Assert structural binding: they are the same function.
 *   2. Load public/js/audio-assistant.js in a vm sandbox with a minimal mock
 *      window.  Setting document.readyState = 'loading' defers QAA.init so no
 *      DOM or network access is attempted.  Inject a spy ArabicScoring so we
 *      can detect whether the client actually delegates.
 *   3. Run the representative Quranic corpus through serverNormalize and
 *      clientNormalize and assert identical output for every string.
 *
 * Exit code: 0 = all pass, 1 = one or more failures.
 */

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

// ── 1. Server-side: obtain normalize via web-server.js itself ─────────────────
//
// web-server.js exports { _stripArabicDiacritics, _ArabicScoring } when not
// the main module (see the require.main guard at the bottom of that file).
// This exercises the real binding path so any future replacement of
//   const stripArabicDiacritics = ArabicScoring.normalize
// with a local implementation would cause the structural test below to fail.

const serverExports = require('../web-server');
const serverNormalize  = serverExports._stripArabicDiacritics;
const serverArabicScoring = serverExports._ArabicScoring;

// ── 2. Client-side: load audio-assistant.js in a sandboxed browser env ────────
//
// We build a minimal mock window.  The critical points:
//   • window.ArabicScoring must be a real (or spy-wrapped) ArabicScoring so
//     the delegate call inside QAA.ArabicMatcher.normalize works.
//   • document.readyState = 'loading' makes the IIFE defer QAA.init() via a
//     DOMContentLoaded listener that we never fire — avoiding all DOM/network.
//   • navigator / location / SpeechRecognition etc. are unused for normalize.

// Use the same ArabicScoring module the server loaded (cached by Node).
// This is intentional: if both sides point at the same cached module object,
// our spy injection later becomes a single authoritative check.
const sharedScoring = serverArabicScoring;  // same require cache entry

const mockWindow = {
  QAA           : null,
  ArabicScoring : sharedScoring,
  document      : {
    readyState   : 'loading',   // defers QAA.init() → no DOM access needed
    addEventListener : function () {},
  },
  console,
  window        : null,   // self-reference filled below
};
mockWindow.window = mockWindow;

const sandboxCtx = vm.createContext(mockWindow);
const aaSource   = fs.readFileSync(
  path.join(__dirname, '../public/js/audio-assistant.js'), 'utf8');

// Suppress the verbose init logs during testing.
const originalLog = mockWindow.console.log;
mockWindow.console.log = function () {};
try {
  vm.runInContext(aaSource, sandboxCtx);
} finally {
  mockWindow.console.log = originalLog;
}

if (!mockWindow.QAA || !mockWindow.QAA.ArabicMatcher) {
  console.error('FATAL: audio-assistant.js did not expose QAA.ArabicMatcher in the sandbox.');
  process.exit(1);
}

const clientNormalize = function (text) {
  return mockWindow.QAA.ArabicMatcher.normalize(text);
};

// ── 3. Test corpus ────────────────────────────────────────────────────────────
//
// Strings chosen to exercise every normalization step:
//   Step 1 — tashkeel / harakat / tatweel / combining marks
//   Step 2 — alif variants (آ أ إ ٱ)
//   Step 3 — alif maqsura (ى → ي)
//   Step 4 — ta marbuta (ة → ه)
//   Step 5 — hamza variants (ؤ ئ → ء then stripped)
//   Step 6 — medial alif between two Arabic letters
//   Also: Uthmani-script, full ayahs, empty / ASCII strings.

const quran = require('../quran.json');

const CORPUS = [
  // ── Step 1: harakat / tashkeel ─────────────────────────────────────────
  { label: 'Bismi (with full tashkeel)',   text: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ' },
  { label: 'Fatiha 1:1 (Uthmani script)', text: quran[1][1].arabic },
  { label: 'Fatiha 1:2',                  text: quran[1][2].arabic },
  { label: 'Fatiha 1:7',                  text: quran[1][7].arabic },

  // ── Step 2: alif variants ──────────────────────────────────────────────
  { label: 'Alif with madda (آ)',          text: 'آمَنَ' },
  { label: 'Alif with hamza above (أ)',    text: 'أَنزَلَ' },
  { label: 'Alif with hamza below (إ)',    text: 'إِيَّاكَ' },
  { label: 'Alif wasla (ٱ)',               text: 'ٱللَّهُ' },

  // ── Step 3: alif maqsura ──────────────────────────────────────────────
  { label: 'Alif maqsura (ى → ي)',        text: 'هُدًى' },
  { label: 'على / على mix',               text: 'على المستقيم' },

  // ── Step 4: ta marbuta ────────────────────────────────────────────────
  { label: 'Ta marbuta (ة → ه)',          text: 'الجَنَّةَ' },
  { label: 'رحمة',                        text: 'رَّحْمَةً' },

  // ── Step 5: hamza variants ────────────────────────────────────────────
  { label: 'Waw-hamza (ؤ)',               text: 'يُؤْمِنُونَ' },
  { label: 'Ya-hamza (ئ)',                text: 'جِئْتَ' },

  // ── Step 6: medial alif ───────────────────────────────────────────────
  { label: 'Medial alif (العالمين)',       text: 'الْعَالَمِينَ' },
  { label: 'Medial alif in الرحمان',      text: 'الرَّحْمَٰنِ' },

  // ── Full ayahs from various surahs ────────────────────────────────────
  { label: 'Ayat al-Kursi (2:255)',        text: quran[2][255].arabic },
  { label: 'Ikhlas 112:1',                text: quran[112][1].arabic },
  { label: 'Ikhlas 112:4',                text: quran[112][4].arabic },
  { label: 'Al-Nas 114:1',                text: quran[114][1].arabic },
  { label: 'Ya-Sin 36:1',                 text: quran[36][1].arabic },
  { label: 'Al-Baqara 2:1',               text: quran[2][1].arabic },

  // ── Edge cases ────────────────────────────────────────────────────────
  { label: 'Empty string',                text: '' },
  { label: 'ASCII-only',                  text: 'hello world' },
  { label: 'Numbers',                     text: '١٢٣' },
  { label: 'Mixed Arabic + spaces',       text: '  بِسْمِ  ٱللَّهِ  ' },
];

// ── 4. Test runner ────────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;

function assert(label, condition, extra) {
  if (condition) {
    console.log('  ✓ ' + label);
    passed++;
  } else {
    console.error('  ✗ FAIL: ' + label + (extra ? '\n      ' + extra : ''));
    failed++;
  }
}

// ── Group S: Structural binding tests (2 tests) ───────────────────────────────
// These catch the case where one side stops delegating to ArabicScoring.normalize
// and instead uses a local implementation.  They test the binding, not the output.

console.log('\n═══ Group S: structural delegation bindings (2 tests) ═══\n');

// S1: Server — web-server.js must bind stripArabicDiacritics to ArabicScoring.normalize.
//     This is a reference-equality check on the server's own exports.
assert(
  'web-server.js: stripArabicDiacritics === its own ArabicScoring.normalize',
  serverNormalize === serverArabicScoring.normalize,
  'stripArabicDiacritics is not the same function reference as ArabicScoring.normalize — ' +
  'the server may be using a local copy'
);

// S2: Client — QAA.ArabicMatcher.normalize must call window.ArabicScoring.normalize.
//     We inject a spy into the sandbox's ArabicScoring to detect the call.
{
  const originalNormalize = mockWindow.ArabicScoring.normalize;
  let spyCalled = false;
  mockWindow.ArabicScoring.normalize = function (text) {
    spyCalled = true;
    return originalNormalize.call(this, text);
  };
  clientNormalize('الله');
  mockWindow.ArabicScoring.normalize = originalNormalize;   // restore

  assert(
    'audio-assistant.js: QAA.ArabicMatcher.normalize delegates to window.ArabicScoring.normalize',
    spyCalled,
    'normalize() did not call window.ArabicScoring.normalize — it may have been inlined'
  );
}

// ── Group P: Parity corpus (one test per string) ──────────────────────────────
// Run both functions on identical inputs and compare outputs byte-for-byte.
// Any future divergence (e.g. one side adds a new Unicode strip range) fails here.

console.log('\n═══ Group P: client vs server output parity (' + CORPUS.length + ' strings) ═══\n');

for (const { label, text } of CORPUS) {
  const server = serverNormalize(text);
  const client = clientNormalize(text);
  assert(
    label,
    server === client,
    'server: ' + JSON.stringify(server) + '\n      client: ' + JSON.stringify(client)
  );
}

// ── Summary ───────────────────────────────────────────────────────────────────

const total = passed + failed;
console.log('\n═══════════════════════════════════════════════════');
console.log('Results: ' + passed + '/' + total + ' passed' + (failed ? ', ' + failed + ' FAILED' : ''));
console.log('═══════════════════════════════════════════════════\n');

if (failed > 0) process.exit(1);
