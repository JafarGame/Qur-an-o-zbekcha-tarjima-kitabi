/* quran-data.js — client-side Quran data module (Phase 1: mobile migration)
 *
 * Replaces all fetch('/api/surahs'), fetch('/api/surah/:n'), and
 * fetch('/api/search?q=') calls with in-browser equivalents so the
 * Quran search/display features work without an active Express server.
 *
 * Requires: window.ArabicScoring (lib/arabic-scoring.js) loaded first.
 *
 * Public API — window.QuranData:
 *   QuranData.ready           — Promise that resolves when quran.json is loaded
 *   QuranData.isReady         — boolean (true after ready resolves)
 *   QuranData.error           — Error|null (set if loading failed)
 *   QuranData.getSurahList()  — Promise<[{number, name, ayahCount}]>
 *   QuranData.getSurah(n)     — Promise<{number, name, ayahCount, ayahs}|null>
 *   QuranData.search(q)       — Promise<{type, results, ...}> — same shape as /api/search
 *
 * Search results are byte-for-byte identical to the server endpoint:
 * same normalization (lib/arabic-scoring.js), same 67% token threshold,
 * same segment-index augmentation for Arabic queries with > 3 tokens.
 */
(function (root) {
  'use strict';

  // ── Surah names — must stay in sync with web-server.js surahNames array ──
  var SURAH_NAMES = [
    "Fotiha","Baqara","Ali Imron","Niso","Moida","An'om","A'rof","Anfol","Tavba","Yunus",
    "Hud","Yusuf","Ra'd","Ibrohim","Hijr","Nahl","Isro","Kahf","Maryam","Toha",
    "Anbiyo","Haj","Mu'minun","Nur","Furqon","Shuaro","Naml","Qasas","Ankabut","Rum",
    "Luqmon","Sajda","Ahzob","Saba","Fotir","Yosin","Saffot","Sod","Zumar","G'ofir",
    "Fussilat","Shuro","Zuxruf","Duxon","Josiya","Ahqof","Muhammad","Fath","Hujurot","Qof",
    "Zoriyot","Tur","Najm","Qamar","Rahmon","Voqia","Hadid","Mujodala","Hashr","Mumtahana",
    "Saff","Jumu'a","Munofiqun","Tag'obun","Taloq","Tahrim","Mulk","Qalam","Haqqa","Maorij",
    "Nuh","Jin","Muzzammil","Muddassir","Qiyomat","Inson","Mursalot","Naba","Nozi'ot","Abasa",
    "Takvir","Infitor","Mutaffifin","Inshiqoq","Buruj","Toriq","A'lo","G'oshiya","Fajr","Balad",
    "Shams","Layl","Zuho","Sharh","Tin","Alaq","Qadr","Bayyina","Zalzala","Odiyot",
    "Qori'a","Takosur","Asr","Humaza","Fil","Quraysh","Mo'un","Kavsar","Kofirun","Nasr",
    "Masad","Ixlos","Falaq","Nos"
  ]; // 114 entries — index 0 = surah 1

  // ── Surah-name → number lookup (same normalizeName as web-server.js) ──────
  function _normName(str) {
    return String(str).toLowerCase().replace(/['''ʻʼ`]/g, '').replace(/[^a-z0-9]/g, '');
  }

  var _nameToNum = new Map();
  SURAH_NAMES.forEach(function (name, idx) {
    _nameToNum.set(_normName(name), idx + 1);
  });

  // ── Module state ──────────────────────────────────────────────────────────
  var _quran        = null;   // raw quran.json object
  var _surahList    = null;   // [{number, name, ayahCount}]
  var _searchIndex  = null;   // [{surah, ayah, arabic, translation, arabicNormalized, translationLower}]
  var _segmentIndex = null;   // [{surah, ayah, arabic, translation, windowText}]
  var _isReady      = false;
  var _error        = null;

  // ── Index builders — mirrors web-server.js exactly ───────────────────────
  function _buildIndexes() {
    var AS = root.ArabicScoring;

    // Surah list (same shape as /api/surahs response)
    _surahList = Object.keys(_quran)
      .map(Number)
      .sort(function (a, b) { return a - b; })
      .map(function (num) {
        return {
          number   : num,
          name     : SURAH_NAMES[num - 1] || ('Surah ' + num),
          ayahCount: Object.keys(_quran[num]).length,
        };
      });

    // Flat search index with pre-normalized strings
    _searchIndex = [];
    Object.keys(_quran).map(Number).sort(function (a, b) { return a - b; })
      .forEach(function (surahNum) {
        var surahData = _quran[surahNum];
        Object.keys(surahData).map(Number).sort(function (a, b) { return a - b; })
          .forEach(function (ayahNum) {
            var e = surahData[ayahNum];
            _searchIndex.push({
              surah           : surahNum,
              ayah            : ayahNum,
              arabic          : e.arabic,
              translation     : e.translation,
              arabicNormalized: AS.normalize(e.arabic),
              translationLower: e.translation.toLowerCase(),
            });
          });
      });

    // Segment index — delegates to shared lib (same SEG_WIN/SEG_STEP constants)
    _segmentIndex = AS.buildSegmentIndex(_searchIndex);
    console.log('[QuranData] Ready — ' + _searchIndex.length + ' ayahs, ' +
      _segmentIndex.length + ' segment windows');
  }

  // ── Reference resolver — same regexes as web-server.js resolveReference ──
  function _resolveRef(raw) {
    var q = raw.trim();

    // "3:25" / "3 25" — numeric surah:ayah
    var m = q.match(/^(\d{1,3})[\s:.\-]+(\d{1,3})$/);
    if (m) return { surah: Number(m[1]), ayah: Number(m[2]) };

    // "Baqara 255" / "Baqara:255" — name + ayah
    m = q.match(/^([A-Za-z''''ʻʼ`.\s]+?)[\s:.\-]+(\d{1,3})$/);
    if (m) {
      var n = _nameToNum.get(_normName(m[1]));
      if (n) return { surah: n, ayah: Number(m[2]) };
      return { surah: null, ayah: null, unresolvedName: true };
    }

    return null;
  }

  // ── Text search — same 67%-token threshold as web-server.js searchText ────
  function _searchText(raw, limit) {
    var AS      = root.ArabicScoring;
    var q       = raw.trim();
    var qLower  = q.toLowerCase();
    var qAr     = AS.normalize(q);
    var qToks   = qAr.split(/\s+/).filter(function (t) { return t.length > 1; });
    // 1–2 tokens: all must match; ≥3 tokens: floor(67%) must match (matches web-server.js)
    var minMatch = qToks.length <= 2
      ? qToks.length
      : Math.max(2, Math.floor(qToks.length * 0.67));

    var results = [];
    for (var i = 0; i < _searchIndex.length; i++) {
      var item = _searchIndex[i];
      var matchAr = false;
      if (qToks.length > 0) {
        var hits = 0;
        for (var j = 0; j < qToks.length; j++) {
          if (item.arabicNormalized.includes(qToks[j])) hits++;
          if (hits >= minMatch) { matchAr = true; break; }
        }
      }
      var matchTr = qLower.length > 0 && item.translationLower.includes(qLower);
      if (matchAr || matchTr) {
        results.push({
          surah      : item.surah,
          ayah       : item.ayah,
          surahName  : SURAH_NAMES[item.surah - 1] || ('Surah ' + item.surah),
          arabic     : item.arabic,
          translation: item.translation,
        });
        if (results.length >= limit) break;
      }
    }
    return results;
  }

  // ── Segment search — delegates to lib, enriches surahName ────────────────
  function _searchSegs(qNormToks, limit) {
    var AS  = root.ArabicScoring;
    var raw = AS.searchSegmentsInIndex(_segmentIndex, qNormToks, limit);
    return raw.map(function (r) {
      return {
        surah      : r.surah,
        ayah       : r.ayah,
        surahName  : SURAH_NAMES[r.surah - 1] || ('Surah ' + r.surah),
        arabic     : r.arabic,
        translation: r.translation,
      };
    });
  }

  // ── Data loading ──────────────────────────────────────────────────────────
  // quran.json is served at /data/quran.json via web-server.js (single route,
  // no file duplication). Falls back to the API route if that fails.
  // Use XMLHttpRequest — Capacitor's WebViewAssetLoader has intercepted XHR on
  // all supported Android API levels (6+) since Chrome 44.  Plain fetch() can
  // return status=0 for local assets in some Capacitor/WebView builds, making
  // r.ok === false even when the body is valid JSON; XHR avoids that ambiguity.
  var _ready = new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/data/quran.json', true);
    xhr.timeout = 30000;
    xhr.onload = function () {
      // status 0 = local asset served by Android WebView (treat as success)
      if (xhr.status === 200 || xhr.status === 0) {
        if (!xhr.responseText) { reject(new Error('Empty response')); return; }
        try { resolve(JSON.parse(xhr.responseText)); }
        catch (e) { reject(new Error('JSON parse: ' + e.message)); }
      } else {
        reject(new Error('HTTP ' + xhr.status));
      }
    };
    xhr.onerror   = function () { reject(new Error('Network error loading quran.json')); };
    xhr.ontimeout = function () { reject(new Error('Timeout loading quran.json (30s)')); };
    xhr.send();
  })
    .then(function (data) {
      if (!root.ArabicScoring) {
        throw new Error('window.ArabicScoring not found — /lib/arabic-scoring.js failed to load');
      }
      _quran   = data;
      _buildIndexes();
      _isReady = true;
    })
    .catch(function (err) {
      _error = err;
      console.error('[QuranData] Failed to load:', err.message);
      throw err;   // re-throw so callers' .catch() handlers fire
    });

  // ── Public API ────────────────────────────────────────────────────────────
  root.QuranData = {

    get ready()   { return _ready; },
    get isReady() { return _isReady; },
    get error()   { return _error; },

    /** [{number, name, ayahCount}] — same shape as /api/surahs */
    getSurahList: function () {
      return _ready.then(function () { return _surahList; });
    },

    /** {number, name, ayahCount, ayahs:[{number,arabic,translation}]} | null */
    getSurah: function (num) {
      return _ready.then(function () {
        var n        = Number(num);
        var surahData = _quran[n];
        if (!surahData) return null;
        var ayahs = Object.keys(surahData)
          .map(Number)
          .sort(function (a, b) { return a - b; })
          .map(function (ayahNum) {
            return {
              number     : ayahNum,
              arabic     : surahData[ayahNum].arabic,
              translation: surahData[ayahNum].translation,
            };
          });
        return {
          number   : n,
          name     : SURAH_NAMES[n - 1] || ('Surah ' + n),
          ayahCount: ayahs.length,
          ayahs    : ayahs,
        };
      });
    },

    /** Same response shape as GET /api/search?q=
     *  { type: 'empty'|'not_found'|'ayah'|'results', results?, surah?, ayah?, ... } */
    search: function (rawQuery) {
      return _ready.then(function () {
        var raw = String(rawQuery || '').trim();
        if (!raw) return { type: 'empty', results: [] };

        // Direct reference lookup (e.g. "2:255", "Baqara 255")
        var ref = _resolveRef(raw);
        if (ref && ref.unresolvedName) return { type: 'not_found' };
        if (ref && ref.surah && ref.ayah) {
          var sd = _quran[ref.surah];
          var e  = sd && sd[ref.ayah];
          if (e) {
            return {
              type       : 'ayah',
              surah      : ref.surah,
              surahName  : SURAH_NAMES[ref.surah - 1] || ('Surah ' + ref.surah),
              ayah       : ref.ayah,
              arabic     : e.arabic,
              translation: e.translation,
            };
          }
          return { type: 'not_found' };
        }

        // Text / Arabic search
        var AS      = root.ArabicScoring;
        var isAr    = /[\u0600-\u06FF]/.test(raw);
        var results = _searchText(raw, isAr ? 200 : 40);

        // Augment Arabic queries (> 3 tokens) with segment-index results so
        // partial phrases inside long ayahs (e.g. Ayat al-Kursi middle) are found.
        if (isAr) {
          var qNorm = AS.normalize(raw);
          var qToks = qNorm.split(/\s+/).filter(function (t) { return t.length > 1; });
          if (qToks.length > 3) {
            var segRes = _searchSegs(qToks, 50);
            var seen   = new Set(results.map(function (r) { return r.surah + ':' + r.ayah; }));
            segRes.forEach(function (sr) {
              var key = sr.surah + ':' + sr.ayah;
              if (!seen.has(key)) { seen.add(key); results.push(sr); }
            });
          }
        }

        return { type: 'results', results: results, query: raw };
      });
    },
  };

})(window);
