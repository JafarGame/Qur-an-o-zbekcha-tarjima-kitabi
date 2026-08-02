/* ═══════════════════════════════════════════════════════════════════════
 * QURAN AI AUDIO ASSISTANT — Module v1.0
 * ───────────────────────────────────────────────────────────────────────
 * Architecture : Modular · Zero external dependencies · GitHub-ready
 * API contract : /api/surah/:n  /api/search?q=
 * Namespace    : window.QAA
 * ═══════════════════════════════════════════════════════════════════════ */

(function (global) {
  'use strict';

  const QAA = {};

  /* ──────────────────────────────────────────────────────────────────────
   * § 1  SURAH NAME INDEX   alias (lowercase) → surah number
   * ────────────────────────────────────────────────────────────────────── */
  QAA.SURAH_INDEX = {
    // 1
    'fotiha':1,'fatiha':1,'al-fotiha':1,'al-fatiha':1,'alfotiha':1,
    // 2
    'baqara':2,'baqarah':2,'al-baqara':2,'albaqara':2,'bakara':2,
    // 3
    'imron':3,'ol imron':3,'al imron':3,'al-imron':3,'ali imran':3,
    // 4
    'niso':4,'an-niso':4,'nisa':4,'an-nisa':4,
    // 5
    'moida':5,'al-moida':5,'maida':5,'al-maida':5,
    // 6
    'anom':6,'al-anom':6,"an'am":6,'anam':6,
    // 7
    'arof':7,'al-arof':7,'araf':7,'al-araf':7,
    // 8
    'anfol':8,'al-anfal':8,'anfal':8,
    // 9
    'tavba':9,'tawba':9,'at-tavba':9,'at-tawba':9,"bara'a":9,
    // 10
    'yunus':10,'yonus':10,
    // 11
    'hud':11,
    // 12
    'yusuf':12,
    // 13
    'rod':13,'ar-rod':13,'rad':13,'ar-rad':13,
    // 14
    'ibrohim':14,'ibrahim':14,
    // 15
    'hijr':15,'al-hijr':15,
    // 16
    'nahl':16,'an-nahl':16,
    // 17
    'isro':17,'al-isro':17,'isra':17,'al-isra':17,
    // 18
    'kahf':18,'al-kahf':18,
    // 19
    'maryam':19,
    // 20
    'toha':20,'taha':20,
    // 21
    'anbiyo':21,'anbiya':21,
    // 22
    'hajj':22,'al-hajj':22,
    // 23
    'muminun':23,'al-muminun':23,
    // 24
    'nur':24,'an-nur':24,
    // 25
    'furqon':25,'furqan':25,'al-furqan':25,
    // 26
    'shuaro':26,"shu'ara":26,
    // 27
    'naml':27,'an-naml':27,
    // 28
    'qasas':28,'al-qasas':28,
    // 29
    'ankabut':29,'al-ankabut':29,
    // 30
    'rum':30,'ar-rum':30,
    // 31
    'luqmon':31,'luqman':31,
    // 32
    'sajda':32,'as-sajda':32,
    // 33
    'ahzob':33,'ahzab':33,'al-ahzab':33,
    // 34
    'saba':34,
    // 35
    'fotir':35,'fatir':35,
    // 36
    'yosin':36,'yasin':36,'ya-sin':36,'ya sin':36,
    // 37
    'soffot':37,'saffat':37,
    // 38
    'sod':38,'sad':38,
    // 39
    'zumar':39,'az-zumar':39,
    // 40
    'gofir':40,'ghafir':40,'momin':40,'mumin':40,
    // 41
    'fussilat':41,
    // 42
    'shuro':42,'shura':42,
    // 43
    'zuxruf':43,'zukhruf':43,
    // 44
    'duxon':44,'dukhan':44,
    // 45
    'josiya':45,'jasiya':45,'jathiya':45,
    // 46
    'ahqof':46,'ahqaf':46,
    // 47
    'muhammad':47,
    // 48
    'fath':48,'al-fath':48,
    // 49
    'hujurot':49,'hujurat':49,
    // 50
    'qof':50,'qaf':50,
    // 51
    'zariyot':51,'zariyat':51,
    // 52
    'tur':52,'at-tur':52,
    // 53
    'najm':53,'an-najm':53,
    // 54
    'qamar':54,'al-qamar':54,
    // 55
    'rahman':55,'ar-rahman':55,
    // 56
    'vaqia':56,'waqia':56,'al-waqia':56,
    // 57
    'hadid':57,'al-hadid':57,
    // 58
    'mujodala':58,'mujadila':58,
    // 59
    'hashr':59,'al-hashr':59,
    // 60
    'mumtahana':60,
    // 61
    'saff':61,'as-saff':61,
    // 62
    'jumuah':62,"jum'a":62,
    // 63
    'munofiqun':63,'munafiqun':63,
    // 64
    'tagobun':64,'taghabun':64,
    // 65
    'talok':65,'talaq':65,
    // 66
    'tahrim':66,
    // 67
    'mulk':67,'al-mulk':67,'tabarak':67,
    // 68
    'qalam':68,'al-qalam':68,
    // 69
    'haqqa':69,
    // 70
    'maarij':70,
    // 71
    'nuh':71,
    // 72
    'jinn':72,'al-jinn':72,
    // 73
    'muzzammil':73,
    // 74
    'muddaththir':74,'muddassir':74,
    // 75
    'qiyoma':75,'qiyama':75,
    // 76
    'inson':76,'insan':76,'dahr':76,
    // 77
    'mursalot':77,'mursalat':77,
    // 78
    'naba':78,
    // 79
    'naziot':79,'naziat':79,
    // 80
    'abasa':80,
    // 81
    'takwir':81,
    // 82
    'infitor':82,'infitar':82,
    // 83
    'mutaffifin':83,
    // 84
    'inshiqoq':84,'inshiqaq':84,
    // 85
    'buruj':85,'al-buruj':85,
    // 86
    'toriq':86,'tariq':86,
    // 87
    'alo':87,"a'la":87,
    // 88
    'ghoshiya':88,'ghashiya':88,
    // 89
    'fajr':89,'al-fajr':89,
    // 90
    'balad':90,'al-balad':90,
    // 91
    'shams':91,'ash-shams':91,
    // 92
    'layl':92,'al-layl':92,
    // 93
    'zuho':93,'duha':93,
    // 94
    'sharh':94,'inshirah':94,
    // 95
    'tin':95,'at-tin':95,
    // 96
    'alaq':96,'iqra':96,
    // 97
    'qadr':97,'al-qadr':97,
    // 98
    'bayyina':98,
    // 99
    'zilzol':99,'zalzala':99,
    // 100
    'odiyot':100,'adiyat':100,
    // 101
    'qoria':101,'qaria':101,
    // 102
    'takosur':102,'takathur':102,
    // 103
    'asr':103,'al-asr':103,
    // 104
    'humaza':104,
    // 105
    'fil':105,'al-fil':105,
    // 106
    'quraysh':106,'qurays':106,
    // 107
    'maun':107,
    // 108
    'kavsar':108,'kawthar':108,
    // 109
    'kofirun':109,'kafirun':109,
    // 110
    'nasr':110,'an-nasr':110,
    // 111
    'masad':111,'lahab':111,
    // 112
    'ikhlos':112,'ikhlas':112,'al-ikhlas':112,
    // 113
    'falaq':113,'al-falaq':113,
    // 114
    'nos':114,'nas':114,'an-nas':114,
  };

  /* ──────────────────────────────────────────────────────────────────────
   * § 2  SPEECH INPUT   (Web Speech API)
   *
   * KEY DESIGN NOTES:
   *  • A SpeechRecognition object can only be .start()-ed ONCE.
   *    After .onend fires the same instance throws InvalidStateError.
   *    Fix: create a fresh instance on every attempt.
   *  • Language fallback chain: uz-UZ → ar-SA → en-US.
   *    If the browser reports language-not-supported we move to the next.
   *  • gotResult flag lets onend detect a silent timeout (no-speech)
   *    even when the browser skips firing onerror('no-speech').
   * ────────────────────────────────────────────────────────────────────── */
  QAA.SpeechInput = {
    _SR         : null,
    _active     : null,          // current SpeechRecognition instance
    _cbs        : {},            // callbacks for the active session
    _langIdx    : 0,
    _LANGS      : ['uz-UZ', 'ar-SA', 'en-US'],
    supported   : false,
    isListening : false,

    init() {
      /* ── Diagnostics ── */
      const proto      = global.location ? global.location.protocol : 'unknown';
      const isSecure   = !!global.isSecureContext;
      const hasMedia   = !!(global.navigator && global.navigator.mediaDevices);
      const SR         = global.SpeechRecognition || global.webkitSpeechRecognition;

      console.log('[QAA] SECURE CONTEXT:', isSecure);
      console.log('[QAA] PROTOCOL:', proto);
      console.log('[QAA] MEDIA DEVICES:', hasMedia);
      console.log('[QAA] SPEECH RECOGNITION:', SR ? (SR.name || 'webkitSpeechRecognition') : 'NOT AVAILABLE');

      /* ── Platform / browser detection ── */
      const ua     = (global.navigator && global.navigator.userAgent) || '';
      const isIOS  = /iP(hone|ad|od)/.test(ua);
      const isSafari = isIOS || (/^((?!chrome|android).)*safari/i.test(ua));
      // Telegram in-app browser exposes no SpeechRecognition and blocks mic
      const isTelegram = /Telegram/i.test(ua);

      console.log('[QAA] PLATFORM — iOS:', isIOS, '| Safari:', isSafari, '| Telegram:', isTelegram);

      if (!SR || isTelegram) {
        this.supported = false;
        if (isTelegram) console.log('[QAA] Telegram browser detected — voice disabled, text input available');
        return false;
      }

      this._SR           = SR;
      this._isSecure     = isSecure;
      this._isIOS        = isIOS;
      this._isSafari     = isSafari;
      this.supported     = true;
      return true;
    },

    /* Public: begin a session. Callbacks: onInterim(text), onFinal(text), onError(code). */
    start(cbs = {}) {
      if (!this.supported) { if (cbs.onError) cbs.onError('not-supported'); return; }

      /* Pre-flight security check.
         Chrome allows r.start() on HTTP but immediately fires service-not-allowed.
         Catch it here so we can give a meaningful message before wasting a round-trip. */
      if (!this._isSecure) {
        console.log('[QAA] INSECURE CONTEXT — bailing before start');
        if (cbs.onError) cbs.onError('insecure-context');
        return;
      }

      this.stop();
      this._cbs     = cbs;
      this._langIdx = 0;
      this._attempt(this._LANGS[0]);
    },

    /* Internal: create a fresh instance for `lang` and try to start it. */
    _attempt(lang) {
      console.log('[QAA] MIC ATTEMPT lang=' + lang);
      const r = new this._SR();
      r.lang           = lang;
      r.continuous     = false;
      // iOS Safari crashes / misbehaves with interimResults=true — disable it
      r.interimResults = !this._isIOS;
      r.maxAlternatives = 3;
      this._active = r;

      let gotResult = false;

      r.onsoundstart = () => console.log('[QAA] SOUND START (mic picking up audio)');

      r.onspeechstart = () => console.log('[QAA] SPEECH START (voice detected)');

      // NOTE: do NOT call r.stop() here.
      // Calling stop() inside onspeechend causes Chrome to fire onerror('aborted')
      // BEFORE the final onresult, which swallows the transcript entirely.
      // Let the browser finalize recognition naturally.
      r.onspeechend = () => console.log('[QAA] SPEECH END (waiting for final result...)');

      r.onresult = (e) => {
        let interim = '', final = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const t = e.results[i][0].transcript;
          e.results[i].isFinal ? (final += t) : (interim += t);
        }
        if (interim) {
          console.log('[QAA] VOICE INTERIM: "' + interim + '"');
          if (this._cbs.onInterim) this._cbs.onInterim(interim);
        }
        if (final) {
          console.log('[QAA] VOICE RECEIVED: "' + final + '" (lang=' + lang + ')');
          gotResult = true;
          if (this._cbs.onFinal) this._cbs.onFinal(final);
        }
      };

      r.onerror = (e) => {
        const err = e.error;
        console.log('[QAA] VOICE ERROR: ' + err);
        gotResult = true; // suppress the silent-timeout path in onend
        this.isListening = false;

        // Language not available in this browser — try next in chain
        if (err === 'language-not-supported' || err === 'language-unavailable') {
          console.log('[QAA] LANG NOT SUPPORTED: ' + lang + ' → trying next');
          this._langIdx++;
          if (this._langIdx < this._LANGS.length) {
            this._attempt(this._LANGS[this._langIdx]);
            return;
          }
        }
        if (this._cbs.onError) this._cbs.onError(err);
      };

      r.onend = () => {
        console.log('[QAA] RECOGNITION END (gotResult=' + gotResult + ')');
        this.isListening = false;
        // Some browsers end silently without firing onerror('no-speech')
        if (!gotResult && this._cbs.onError) this._cbs.onError('no-speech');
      };

      try {
        r.start();
        this.isListening = true;
        console.log('[QAA] MIC STARTED (lang=' + lang + ')');
      } catch (ex) {
        this.isListening = false;
        console.log('[QAA] MIC START EXCEPTION: ' + (ex && ex.name) + ' — ' + ex);
        // InvalidStateError or SecurityError before we even started
        const code = (ex && ex.name === 'SecurityError') ? 'not-allowed' : 'start-failed';
        if (this._cbs.onError) this._cbs.onError(code);
      }
    },

    stop() {
      if (this._active) {
        try { this._active.stop(); } catch (_) {}
        // Detach handlers so stale onend/onerror don't fire after we move on
        this._active.onresult  = null;
        this._active.onerror   = null;
        this._active.onend     = null;
        this._active.onspeechend = null;
        this._active = null;
      }
      this.isListening = false;
    },
  };

  /* ──────────────────────────────────────────────────────────────────────
   * § 3  QUERY PARSER
   *   Handles: "2:255" · "Yosin 82" · "baqara" · "36" · "2-255"
   * ────────────────────────────────────────────────────────────────────── */
  QAA.QueryParser = {
    parse(raw) {
      if (!raw || !raw.trim()) return null;
      const text = raw.trim().toLowerCase().replace(/\s+/g, ' ');

      // "2:255"  "2-255"  "2 255" (two numbers only)
      const twoNums = text.match(/^(\d{1,3})[:\-\s](\d{1,3})$/);
      if (twoNums) return { surahNum: +twoNums[1], ayahNum: +twoNums[2], raw };

      // "Yosin 82"  "baqara:255"  "al-kahf 18"
      const nameNum = text.match(/^([\w\s\-\']+?)[:\s]+(\d+)$/);
      if (nameNum) {
        const sn = this._lookup(nameNum[1].trim());
        if (sn) return { surahNum: sn, ayahNum: +nameNum[2], raw };
      }

      // Just a surah name → first ayah
      const sn = this._lookup(text);
      if (sn) return { surahNum: sn, ayahNum: 1, raw };

      // Just a surah number
      const solo = text.match(/^(\d{1,3})$/);
      if (solo && +solo[1] >= 1 && +solo[1] <= 114)
        return { surahNum: +solo[1], ayahNum: 1, raw };

      return null;
    },

    _lookup(name) {
      const n = name.toLowerCase().trim();
      if (QAA.SURAH_INDEX[n]) return QAA.SURAH_INDEX[n];

      // Strip common Arabic article prefixes and retry
      const bare = n.replace(/^(al-?|an-?|as-?|at-?|az-?|ar-?|ad-?)/, '').trim();
      for (const [alias, num] of Object.entries(QAA.SURAH_INDEX)) {
        if (alias === bare) return num;
        const ab = alias.replace(/^(al-?|an-?|as-?|at-?|az-?|ar-?|ad-?)/, '').trim();
        if (ab === bare) return num;
        // prefix match (min 3 chars)
        if (bare.length >= 3 && (ab.startsWith(bare) || bare.startsWith(ab.slice(0, 4))))
          return num;
      }
      return null;
    },
  };

  /* ──────────────────────────────────────────────────────────────────────
   * § 4  QURAN SEARCH   (API bridge)
   * ────────────────────────────────────────────────────────────────────── */
  QAA.QuranSearch = {
    _cache: new Map(),

    async findAyah(surahNum, ayahNum) {
      surahNum = Number(surahNum);
      ayahNum  = Number(ayahNum);
      if (!surahNum || surahNum < 1 || surahNum > 114)
        throw new Error('Invalid surah: ' + surahNum);

      const key = 's' + surahNum;
      let surah;
      if (this._cache.has(key)) {
        surah = this._cache.get(key);
      } else {
        const res = await fetch('/api/surah/' + surahNum);
        if (!res.ok) throw new Error('Surah ' + surahNum + ' not found');
        surah = await res.json();
        this._cache.set(key, surah);
      }

      // Note: surah.ayahs[i].number is a string (Object.keys from server)
      let ayahData = surah.ayahs.find(a => Number(a.number) === ayahNum);
      if (!ayahData) throw new Error('Ayah ' + ayahNum + ' not found');

      // Overlay Cyrillic translation when language is set to kiril
      if (global.Lang && Lang.isKiril()) {
        try {
          const kiril = await Lang.loadKirilTrans(surahNum);
          const t = kiril[String(ayahNum)];
          if (t) ayahData = Object.assign({}, ayahData, { translation: t });
        } catch (_) { /* fall back to Latin */ }
      }

      return { surah, ayah: ayahData };
    },

    async textSearch(query) {
      const res = await fetch('/api/search?q=' + encodeURIComponent(query));
      if (!res.ok) throw new Error('Search failed');
      return res.json(); // { type, results: [{surah, ayah, surahName, arabic, translation}] }
    },
  };

  /* ──────────────────────────────────────────────────────────────────────
   * § 5  AUDIO ENGINE PLACEHOLDER  v1.0
   * ──────────────────────────────────────────────────────────────────────
   *
   *  CONTRACT for AudioEngine v2.0:
   *  ┌────────────────────────────────────────────────────────────────┐
   *  │  • Keep the same public interface (recite / stop / pause)      │
   *  │  • Set isReady = true after successful initialisation          │
   *  │  • Emit events via the on/off/_emit system below               │
   *  │  • PLANNED_RECITERS list drives the UI reciter selector         │
   *  └────────────────────────────────────────────────────────────────┘
   *
   *  Integration options for v2.0 (pick one):
   *    A. EveryAyah.com REST API    — mp3 per-ayah, 150+ reciters
   *    B. alquran.cloud v3 API      — streaming audio, free
   *    C. Custom AI TTS             — Hafs an Asim phoneme model
   * ────────────────────────────────────────────────────────────────── */
  QAA.AudioEngine = {
    version       : '1.0-placeholder',
    isReady       : false,
    isPlaying     : false,
    activeReciter : null,

    PLANNED_RECITERS: [
      { id: 'hafs-mishary', name: 'Mishary Rashid al-Afasy', style: 'Hafs an Asim' },
      { id: 'hafs-sudais',  name: 'Abdul Rahman as-Sudais',  style: 'Hafs an Asim' },
      { id: 'hafs-shuraim', name: 'Saud ash-Shuraim',        style: 'Hafs an Asim' },
    ],

    // TODO v2.0: initialise Web Audio API context & load reciter manifest
    async init()          { return false; },

    // TODO v2.0: select reciter and preload voice data or API endpoint
    async loadReciter(id) { throw new Error('AudioEngine v2.0: loadReciter not implemented'); },

    // TODO v2.0: stream / play ayah audio
    //   surahNum  {number}  1-114
    //   ayahNum   {number}
    //   arabic    {string}  raw Arabic text (available for offline TTS)
    async recite(surahNum, ayahNum, arabic) {
      throw new Error('AudioEngine v2.0: recite not implemented');
    },

    stop()   { /* TODO v2.0 */ },
    pause()  { /* TODO v2.0 */ },
    resume() { /* TODO v2.0 */ },

    // TODO v2.0: fetch reciter list from API
    async getAvailableReciters() { return []; },

    // Minimal event bus — v2.0 should emit: playstart · playend · error · progress
    _listeners: {},
    on(event, handler)  { (this._listeners[event] = this._listeners[event] || []).push(handler); },
    off(event, handler) {
      if (this._listeners[event])
        this._listeners[event] = this._listeners[event].filter(h => h !== handler);
    },
    _emit(event, data)  { (this._listeners[event] || []).forEach(h => h(data)); },
  };

  /* ──────────────────────────────────────────────────────────────────────
   * § 6  PARTICLE SYSTEM   (canvas)
   * ────────────────────────────────────────────────────────────────────── */
  QAA.Particles = {
    canvas: null,
    ctx   : null,
    list  : [],
    raf   : null,
    W: 0, H: 0,

    init(canvasEl) {
      this.canvas = canvasEl;
      this.ctx    = canvasEl.getContext('2d');
      this._resize();
      this._create();
      this._loop();
      global.addEventListener('resize', () => {
        this._resize();
        this._create();
      }, { passive: true });
    },

    _resize() {
      this.W = this.canvas.width  = global.innerWidth;
      this.H = this.canvas.height = global.innerHeight;
    },

    _rnd(a, b) { return a + Math.random() * (b - a); },

    _create() {
      const n = Math.min(58, Math.floor(this.W * this.H / 16000));
      this.list = Array.from({ length: n }, (_, i) => ({
        x  : this._rnd(0, this.W),
        y  : this._rnd(0, this.H),
        vx : this._rnd(-0.14, 0.14),
        vy : this._rnd(-0.40, -0.06),
        r  : this._rnd(0.7, i < 50 ? 2.0 : 4.5),
        op : this._rnd(0.06, 0.35),
        dop: this._rnd(0.002, 0.006) * (Math.random() < 0.5 ? 1 : -1),
        gold: Math.random() < 0.68,
      }));
    },

    _loop() {
      this.raf = requestAnimationFrame(() => this._loop());
      const { ctx, W, H, list } = this;
      ctx.clearRect(0, 0, W, H);
      for (const p of list) {
        p.x  += p.vx;  p.y += p.vy;
        p.op += p.dop;
        if (p.op > 0.36 || p.op < 0.04) p.dop *= -1;
        if (p.x < -6)  p.x = W + 6;
        if (p.x > W+6) p.x = -6;
        if (p.y < -6)  { p.x = this._rnd(0, W); p.y = H + 6; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? `rgba(201,162,39,${p.op})`
          : `rgba(210,240,220,${(p.op * 0.65).toFixed(3)})`;
        ctx.fill();
      }
    },

    destroy() { if (this.raf) cancelAnimationFrame(this.raf); },
  };

  /* ──────────────────────────────────────────────────────────────────────
   * § 7  UI CONTROLLER   (state machine)
   *   States: idle → listening → processing → result | error
   * ────────────────────────────────────────────────────────────────────── */
  QAA.UI = {
    state          : 'idle',
    _toastTimer    : null,
    _currentResult : null,
    els            : {},

    /* ── Collect DOM refs ── */
    _bind() {
      const $ = id  => document.getElementById(id);
      const q = sel => document.querySelectorAll(sel);
      this.els = {
        micBtn        : $('aa-mic-btn'),
        statusText    : $('aa-status-text'),
        transcript    : $('aa-transcript'),
        textInput     : $('aa-text-input'),
        searchBtn     : $('aa-search-btn'),
        results       : $('aa-results'),
        resultRef     : $('aa-result-ref'),
        resultArabic  : $('aa-result-arabic'),
        resultTransl  : $('aa-result-transl'),
        resultActions : $('aa-result-actions'),
        aepStatus     : $('aa-aep-status'),
        toast         : $('aa-toast'),
        chips         : q('.aa-chip'),
      };
    },

    /* ── Apply visual state ── */
    setState(s) {
      this.state = s;
      const cls = ['aa-idle','aa-listening','aa-processing','aa-error','aa-result'];
      cls.forEach(c => document.body.classList.remove(c));
      document.body.classList.add('aa-' + s);

      const MAP = {
        idle       : 'Bosing va ovoz bering yoki yozing',
        listening  : 'Tinglamoqda...',
        processing : 'Qidirmoqda...',
        result     : 'Natija topildi',
        error      : 'Qayta urinib ko\'ring',
      };
      if (this.els.statusText) this.els.statusText.textContent = MAP[s] || '';
    },

    setTranscript(t) {
      const el = this.els.transcript;
      if (!el) return;
      el.textContent = t;
      el.classList.toggle('aa-transcript-visible', !!t);
    },

    showResult({ surah, ayah }) {
      this._currentResult = { surah, ayah };
      const name = (global.Lang && Lang.surahName(surah.number)) || surah.name;
      this.els.resultRef.textContent    = name + ' · ' + surah.number + ':' + Number(ayah.number);
      this.els.resultArabic.textContent = ayah.arabic;
      this.els.resultTransl.textContent = ayah.translation;
      this.els.results.classList.add('aa-results-open');
      this.setState('result');
    },

    hideResult() {
      this.els.results.classList.remove('aa-results-open');
      this.setState('idle');
      this._currentResult = null;
    },

    showToast(msg) {
      const el = this.els.toast;
      if (!el) return;
      el.textContent = msg;
      el.classList.add('aa-toast-on');
      clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(() => el.classList.remove('aa-toast-on'), 2000);
    },

    showError(msg) {
      this.setState('error');
      if (this.els.statusText) this.els.statusText.textContent = msg || 'Topilmadi';
      setTimeout(() => this.setState('idle'), 2800);
    },

    /* ── Wire all events ── */
    bindEvents() {
      this._bind();
      const { micBtn, searchBtn, textInput, chips, resultActions, results } = this.els;

      // Mic button
      if (micBtn) micBtn.addEventListener('click', () => {
        if (this.state === 'listening') {
          QAA.SpeechInput.stop();
          this.setState('idle');
        } else if (this.state !== 'processing') {
          this._startVoice();
        }
      });

      // Text search
      const doSearch = () => {
        const q = textInput ? textInput.value.trim() : '';
        if (q) this._doSearch(q);
      };
      if (searchBtn) searchBtn.addEventListener('click', doSearch);
      if (textInput) textInput.addEventListener('keydown', e => e.key === 'Enter' && doSearch());

      // Chips
      chips.forEach(chip => chip.addEventListener('click', () => {
        const q = chip.dataset.query;
        if (textInput) textInput.value = q;
        this._doSearch(q);
      }));

      // Result panel actions (delegated)
      if (resultActions) resultActions.addEventListener('click', e => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        this._handleAction(btn.dataset.action);
      });

      // Close handle
      const handleRow = results ? results.querySelector('.aa-results-handle-row') : null;
      if (handleRow) handleRow.addEventListener('click', () => this.hideResult());
    },

    _handleAction(action) {
      const r = this._currentResult;
      if (!r) return;
      const { surah, ayah } = r;
      const name = (global.Lang && Lang.surahName(surah.number)) || surah.name;
      const num  = Number(ayah.number);

      if (action === 'copy') {
        const text = ayah.arabic
          + '\n\n' + ayah.translation
          + '\n\n— Qur\'on Karim, ' + name + ' ' + surah.number + ':' + num;
        navigator.clipboard.writeText(text)
          .then(()  => this.showToast('Nusxa olindi ✓'))
          .catch(()  => this.showToast('Xatolik'));
      }

      if (action === 'share') {
        const shareData = {
          title : 'Qur\'on Karim — ' + name + ' ' + surah.number + ':' + num,
          text  : ayah.arabic + '\n\n' + ayah.translation,
        };
        if (navigator.share) navigator.share(shareData).catch(() => {});
        else navigator.clipboard.writeText(shareData.title + '\n\n' + shareData.text)
          .then(()  => this.showToast('Matn nusxa olindi ✓'))
          .catch(() => this.showToast('Xatolik'));
      }

      if (action === 'recite') this.showToast('🎵 AI Recitation — tez orada (v2.0)');
      if (action === 'close')  this.hideResult();
    },

    _startVoice() {
      if (!QAA.SpeechInput.supported) {
        document.body.classList.add('aa-no-voice');
        this.showError('Brauzer ovozni qo\'llab-quvvatlamaydi');
        return;
      }
      console.log('[QAA] MIC BUTTON CLICKED — starting voice session');
      this.setState('listening');
      this.setTranscript('');
      QAA.SpeechInput.start({
        onInterim : t => { console.log('[QAA] INTERIM TRANSCRIPT: "' + t + '"'); this.setTranscript(t); },
        onFinal   : t => {
          console.log('[QAA] FINAL TRANSCRIPT → handing to search: "' + t + '"');
          this.setTranscript(t);
          this._doSearch(t);
        },
        onError   : err => {
          console.log('[QAA] VOICE ERROR in UI handler:', err,
            '| isSecure:', QAA.SpeechInput._isSecure,
            '| inIframe:', (global.self !== global.top));

          // service-not-allowed has three distinct causes — distinguish them
          let svcMsg = 'Ovoz xizmati ishlamayapti — qayta urinib ko\'ring';
          if (err === 'service-not-allowed') {
            if (!QAA.SpeechInput._isSecure) {
              svcMsg = 'Ovoz xizmati bloklangan — HTTPS kerak';
            } else if (global.self !== global.top) {
              svcMsg = 'Ovoz iframe ichida ishlamaydi — sahifani to\'g\'ridan oching';
            } else {
              svcMsg = 'Ovoz xizmati mavjud emas — Chrome yoki Edge ishlating';
            }
          }

          const MSG = {
            'insecure-context'       : 'Ovoz xizmati bloklangan — HTTPS kerak',
            'not-allowed'            : 'Mikrofon ruxsati rad etildi — brauzer sozlamalarini tekshiring',
            'permission-denied'      : 'Mikrofon ruxsati rad etildi — brauzer sozlamalarini tekshiring',
            'service-not-allowed'    : svcMsg,
            'audio-capture'          : 'Mikrofon topilmadi yoki ishlamayapti',
            'network'                : 'Tarmoq xatosi — qayta urinib ko\'ring',
            'no-speech'              : 'Ovoz aniqlanmadi — qayta bosing',
            'not-supported'          : 'Brauzer ovozni qo\'llab-quvvatlamaydi',
            'aborted'                : null,   // user-initiated, no message needed
            'start-failed'           : 'Mikrofon ishga tushmadi — qayta bosing',
          };
          const msg = MSG[err];
          if (msg === null) { this.setState('idle'); return; }   // silent abort
          if (['not-allowed','permission-denied','not-supported',
               'insecure-context','service-not-allowed'].includes(err)) {
            document.body.classList.add('aa-no-voice');
          }
          this.showError(msg || 'Mikrofon xatosi — qayta bosing');
        },
      });
    },

    async _doSearch(query) {
      console.log('[QAA] SEARCH QUERY: "' + query + '"');
      const parsed = QAA.QueryParser.parse(query);
      console.log('[QAA] QUERY PARSED:', parsed
        ? ('surah=' + parsed.surahNum + ' ayah=' + parsed.ayahNum)
        : 'no structured match → text search fallback');
      this.setState('processing');
      this.setTranscript(query);

      if (parsed) {
        try {
          const res = await QAA.QuranSearch.findAyah(parsed.surahNum, parsed.ayahNum);
          console.log('[QAA] RESULT FOUND: surah=' + res.surah.number + ' ayah=' + Number(res.ayah.number));
          this.showResult(res);
        } catch (e) {
          console.log('[QAA] FIND AYAH ERROR:', e && e.message);
          this.showError('Topilmadi: ' + query);
        }
        return;
      }

      // Text search fallback
      try {
        console.log('[QAA] TEXT SEARCH: "' + query + '"');
        const data = await QAA.QuranSearch.textSearch(query);
        const hits = (data.results || []);
        console.log('[QAA] TEXT SEARCH HITS: ' + hits.length);
        if (!hits.length) { this.showError('Natija topilmadi'); return; }
        const h = hits[0];
        console.log('[QAA] BEST HIT: surah=' + h.surah + ' ayah=' + h.ayah + ' name=' + h.surahName);
        const res = await QAA.QuranSearch.findAyah(h.surah, h.ayah);
        console.log('[QAA] RESULT FOUND: surah=' + res.surah.number + ' ayah=' + Number(res.ayah.number));
        this.showResult(res);
      } catch (e) {
        console.log('[QAA] TEXT SEARCH ERROR:', e && e.message);
        this.showError('Qidiruv xatosi');
      }
    },
  };

  /* ──────────────────────────────────────────────────────────────────────
   * § 8  BOOTSTRAP
   * ────────────────────────────────────────────────────────────────────── */
  QAA.init = function () {
    // Particle system
    const canvas = document.getElementById('aa-canvas');
    if (canvas) QAA.Particles.init(canvas);

    // Speech support check
    QAA.SpeechInput.init();
    if (!QAA.SpeechInput.supported)
      document.body.classList.add('aa-no-voice');

    // UI
    QAA.UI.bindEvents();
    QAA.UI.setState('idle');

    // Populate audio engine status line
    const aepEl = document.getElementById('aa-aep-status');
    if (aepEl) {
      aepEl.textContent =
        QAA.AudioEngine.version +
        ' · ' + QAA.AudioEngine.PLANNED_RECITERS.length + ' qori rejada';
    }
  };

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', QAA.init);
  else
    QAA.init();

  global.QAA = QAA;

})(window);
