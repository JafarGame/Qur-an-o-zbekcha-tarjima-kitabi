/**
 * arabic-scoring.js — shared Arabic normalization, scoring, and segment-search
 *
 * Used by:
 *   • web-server.js         (Node require)
 *   • public/js/audio-assistant.js  (browser global window.ArabicScoring)
 *   • tests/test-segment-matching.js (Node require)
 *
 * UMD wrapper: works as CommonJS module (Node) and as a plain <script> tag
 * (browser), where it sets window.ArabicScoring.
 */
/* eslint-disable no-var */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.ArabicScoring = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  // ── Constants ─────────────────────────────────────────────────────────────
  var SEG_WIN  = 5;   // tokens per segment window — must match web-server.js
  var SEG_STEP = 2;   // stride between windows   — must match web-server.js

  // ── Normalization ─────────────────────────────────────────────────────────
  /**
   * Canonical Arabic normalization.
   * Steps (applied in order):
   *  1. Strip tashkeel / harakat / tatweel / combining marks (incl. Extended Arabic)
   *  2. Alif variants  ٱ آ أ إ → ا
   *  3. Alif maqsura  ى        → ي
   *  4. Ta marbuta    ة        → ه
   *  5. Hamza variants ؤ ئ     → ء  then strip standalone hamza
   *  6. Strip medial alif ا between two Arabic letters
   *
   * Mirror of web-server.js stripArabicDiacritics and
   * audio-assistant.js ArabicMatcher.normalize.
   */
  function normalize(text) {
    return String(text)
      .replace(
        /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED\u08D4-\u08E1\u08E3-\u08FF\u0640]/g,
        ''
      )
      .replace(/[\u0622\u0623\u0625\u0671]/g, '\u0627')  // alif variants → ا
      .replace(/\u0649/g, '\u064A')                      // alif maqsura  → ي
      .replace(/\u0629/g, '\u0647')                      // ta marbuta    → ه
      .replace(/[\u0624\u0626]/g, '\u0621')              // hamza variants → ء
      .replace(/\u0621/g, '')                            // strip hamza
      .replace(/(?<=[\u0600-\u06FF])\u0627(?=[\u0600-\u06FF])/g, '') // medial alif
      .replace(/\s+/g, ' ').trim();
  }

  /** Split normalized text into word tokens, filtering single-char noise. */
  function tokenize(text) {
    return normalize(text).split(/\s+/).filter(Boolean);
  }

  // ── Scoring ───────────────────────────────────────────────────────────────

  /**
   * % of query tokens found in the ayah — primary metric.
   * Robust for partial recitation: user says fewer words than the full ayah.
   */
  function scoreCoverage(qToks, ayahArabic) {
    var aSet = new Set(tokenize(ayahArabic));
    var hits = qToks.filter(function (t) { return aSet.has(t); }).length;
    return qToks.length ? hits / qToks.length : 0;
  }

  /**
   * Jaccard similarity |Q∩A| / |Q∪A| — secondary precision metric.
   */
  function scoreJaccard(qToks, ayahArabic) {
    var aSet = new Set(tokenize(ayahArabic));
    var qSet = new Set(qToks);
    var inter = 0;
    qSet.forEach(function (t) { if (aSet.has(t)) inter++; });
    var union = new Set([].concat(Array.from(qSet), Array.from(aSet))).size;
    return union ? inter / union : 0;
  }

  /**
   * Score a query against an ayah using both full-ayah and sliding-window
   * methods, returning the maximum.
   *
   * For short queries (a phrase from the middle of a long ayah) the window
   * score is much higher because Jaccard is not penalised by the unrelated
   * tokens in the rest of the ayah.
   *
   * Window parameters mirror the server-side segment index constants above.
   */
  function scoreWithWindows(qToks, ayahArabic) {
    var fullCov   = scoreCoverage(qToks, ayahArabic);
    var fullJac   = scoreJaccard(qToks, ayahArabic);
    var fullScore = fullCov * 0.8 + fullJac * 0.2;

    var ayahToks = tokenize(ayahArabic);
    // Only slide when the ayah is substantially longer than the query.
    if (ayahToks.length < 6 || qToks.length >= Math.ceil(ayahToks.length * 0.7)) {
      return fullScore;
    }

    // Window is at least as wide as the query so the query always fits inside.
    // Stride=1 guarantees we find the optimal alignment wherever the phrase is.
    var WIN = Math.max(5, qToks.length);
    var bestWinScore = 0;
    for (var i = 0; i + WIN <= ayahToks.length; i++) {
      var win = ayahToks.slice(i, i + WIN).join(' ');
      var cov = scoreCoverage(qToks, win);
      var jac = scoreJaccard(qToks, win);
      var s   = cov * 0.8 + jac * 0.2;
      if (s > bestWinScore) bestWinScore = s;
      if (bestWinScore >= 1.0) break;
    }
    return Math.max(fullScore, bestWinScore);
  }

  // ── Segment index ─────────────────────────────────────────────────────────

  /**
   * Build a segment index from a flat search index.
   *
   * @param {Array<{surah, ayah, arabic, translation, arabicNormalized}>} searchIndex
   * @returns {Array<{surah, ayah, arabic, translation, windowText}>}
   */
  function buildSegmentIndex(searchIndex) {
    var out = [];
    for (var i = 0; i < searchIndex.length; i++) {
      var item   = searchIndex[i];
      var tokens = item.arabicNormalized.split(/\s+/).filter(Boolean);
      if (tokens.length < 6) continue;   // short ayahs are well-served by full match
      for (var j = 0; j + SEG_WIN <= tokens.length; j += SEG_STEP) {
        out.push({
          surah      : item.surah,
          ayah       : item.ayah,
          arabic     : item.arabic,
          translation: item.translation,
          windowText : tokens.slice(j, j + SEG_WIN).join(' '),
        });
      }
    }
    return out;
  }

  /**
   * Search a pre-built segment index for ayahs matching a normalized query.
   * Same 67%-token-coverage rule as searchText in web-server.js.
   * Deduplicates by surah:ayah so each ayah appears at most once.
   *
   * @param {Array}  segmentIndex   — result of buildSegmentIndex()
   * @param {Array}  qNormTokens    — pre-normalized + tokenized query words
   * @param {number} limit
   * @returns {Array<{surah, ayah, arabic, translation}>}
   */
  function searchSegmentsInIndex(segmentIndex, qNormTokens, limit) {
    if (!qNormTokens.length) return [];
    var minMatch = qNormTokens.length <= 2
      ? qNormTokens.length
      : Math.max(2, Math.floor(qNormTokens.length * 0.67));
    var seen    = new Set();
    var results = [];
    for (var i = 0; i < segmentIndex.length; i++) {
      var seg = segmentIndex[i];
      var key = seg.surah + ':' + seg.ayah;
      if (seen.has(key)) continue;
      var hits = 0;
      for (var j = 0; j < qNormTokens.length; j++) {
        if (seg.windowText.includes(qNormTokens[j])) hits++;
        if (hits >= minMatch) break;
      }
      if (hits >= minMatch) {
        seen.add(key);
        results.push({
          surah      : seg.surah,
          ayah       : seg.ayah,
          arabic     : seg.arabic,
          translation: seg.translation,
        });
        if (results.length >= limit) break;
      }
    }
    return results;
  }

  // ── Public API ────────────────────────────────────────────────────────────
  return {
    SEG_WIN              : SEG_WIN,
    SEG_STEP             : SEG_STEP,
    normalize            : normalize,
    stripArabicDiacritics: normalize,   // alias used by web-server.js
    tokenize             : tokenize,
    scoreCoverage        : scoreCoverage,
    scoreJaccard         : scoreJaccard,
    scoreWithWindows     : scoreWithWindows,
    buildSegmentIndex    : buildSegmentIndex,
    searchSegmentsInIndex: searchSegmentsInIndex,
  };
});
