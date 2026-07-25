/* ═══════════════════════════════════════════════════════════════
   QUR'AN KARIM — Language utility  (window.Lang)
   Keys: 'latin' (default) | 'kiril'
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var LANG_KEY = 'quran_lang';

  /* ── UI string table ──────────────────────────────────────────── */
  var STRINGS = {
    latin: {
      arabMatni:          "Arab matni:",
      tarjima:            "Tarjima",
      tarjimaniYashirish: "Tarjimani yashirish",
      tarjimaniKorsatish: "Tarjimani ko\u02bcrsatish",
      nusxa:              "Nusxa",
      ulashish:           "Ulashish",
      saqlash:            "Saqlash",
      saqlangan:          "Saqlangan",
      saqlashTitle:       "Saqlash",
      saqlanganganTitle:  "Saqlangandan olib tashlash",
      audio:              "Audio",
      kichik:             "Kichik",
      orta:               "O\u02bcrta",
      katta:              "Katta",
      oldingiSura:        "Oldingi sura",
      keyingiSura:        "Keyingi sura",
      oyat:               "oyat",
      oldingiOyat:        "Oldingi oyat",
      keyingiOyat:        "Keyingi oyat",
      nusxaOlindi:        "\u2713 Nusxa olindi",
      nusxaXatolik:       "Nusxa olishda xatolik",
      matnNusxa:          "\u2713 Matn nusxa olindi",
      ulashishXato:       "Ulashish qo\u02bcllab-quvvatlanmaydi",
      oyatOlib:           "Oyat olib tashlandi",
      oyatSaqlandi:       "Oyat saqlandi \u2713",
      audioKeladi:        "\uD83C\uDFA7 Audio tez orada qo\u02bcshiladi",
      surahXato:          "Sura topilmadi yoki yuklashda xatolik yuz berdi.",
      oxirgiJoy:          "Oxirgi o\u02bcqish joyi",
      davomEttirish:      "Davom ettirish \u2192",
      suraTopilmadi:      "Sura topilmadi.",
      yuklashXato:        "Suralarni yuklashda xatolik yuz berdi.",
      topilganOyat:       "Topilgan oyat",
      matnNatijalar:      "Matn bo\u02bcyicha natijalar",
      hechNarsa:          "Matn bo\u02bcyicha hech narsa topilmadi.",
      bunday:             "Bunday oyat topilmadi. Manzilni tekshiring (masalan: 2:255).",
      suralar:            "Suralar",
      sozlamalar:         "Sozlamalar",
      boshSahifa:         "Bosh sahifa",
      korinish:           "Ko\u02bcrinish",
      tungiRejim:         "Tungi rejim",
      qorongi:            "Qorong\u02bci fon",
      kunduzgi:           "Kunduzgi rejim",
      yorug:              "Yorug\u02bc fon",
      til:                "Til"
    },

    kiril: {
      /* All values are Unicode-escaped to avoid any Latin/Cyrillic lookalike
         confusion in source. Verified against quran-translations-kiril.json output.
         Key Cyrillic chars used:
           \u0410=А \u0430=а \u0411=Б \u0431=б \u0414=Д \u0434=д \u0415=Е \u0435=е
           \u0416=Ж \u0436=ж \u0417=З \u0437=з \u0418=И \u0438=и \u041a=К \u043a=к
           \u041b=Л \u043b=л \u041c=М \u043c=м \u041d=Н \u043d=н \u041e=О \u043e=о
           \u041f=П \u043f=п \u0420=Р \u0440=р \u0421=С \u0441=с \u0422=Т \u0442=т
           \u0423=У \u0443=у \u0424=Ф \u0444=ф \u0425=Х \u0445=х \u0427=Ч \u0447=ч
           \u0428=Ш \u0448=ш \u042e=Ю \u044e=ю \u042f=Я \u044f=я
           \u0401=Ё \u0451=ё  \u040e=Ў \u045e=ў
           \u049a=Қ \u049b=қ  \u0492=Ғ \u0493=ғ  \u04b2=Ҳ \u04b3=ҳ           */
      arabMatni:          "\u0410\u0440\u0430\u0431 \u043c\u0430\u0442\u043d\u0438:",
      tarjima:            "\u0422\u0430\u0440\u0436\u0438\u043c\u0430",
      tarjimaniYashirish: "\u0422\u0430\u0440\u0436\u0438\u043c\u0430\u043d\u0438 \u044f\u0448\u0438\u0440\u0438\u0448",
      tarjimaniKorsatish: "\u0422\u0430\u0440\u0436\u0438\u043c\u0430\u043d\u0438 \u043a\u045e\u0440\u0441\u0430\u0442\u0438\u0448",
      nusxa:              "\u041d\u0443\u0441\u0445\u0430",
      ulashish:           "\u0423\u043b\u0430\u0448\u0438\u0448",
      saqlash:            "\u0421\u0430\u049b\u043b\u0430\u0448",
      saqlangan:          "\u0421\u0430\u049b\u043b\u0430\u043d\u0433\u0430\u043d",
      saqlashTitle:       "\u0421\u0430\u049b\u043b\u0430\u0448",
      saqlanganganTitle:  "\u0421\u0430\u049b\u043b\u0430\u043d\u0433\u0430\u043d\u0434\u0430\u043d \u043e\u043b\u0438\u0431 \u0442\u0430\u0448\u043b\u0430\u0448",
      audio:              "\u0410\u0443\u0434\u0438\u043e",
      kichik:             "\u041a\u0438\u0447\u0438\u043a",
      orta:               "\u040e\u0440\u0442\u0430",
      katta:              "\u041a\u0430\u0442\u0442\u0430",
      oldingiSura:        "\u041e\u043b\u0434\u0438\u043d\u0433\u0438 \u0441\u0443\u0440\u0430",
      keyingiSura:        "\u041a\u0435\u0439\u0438\u043d\u0433\u0438 \u0441\u0443\u0440\u0430",
      oyat:               "\u043e\u044f\u0442",
      oldingiOyat:        "\u041e\u043b\u0434\u0438\u043d\u0433\u0438 \u043e\u044f\u0442",
      keyingiOyat:        "\u041a\u0435\u0439\u0438\u043d\u0433\u0438 \u043e\u044f\u0442",
      nusxaOlindi:        "\u2713 \u041d\u0443\u0441\u0445\u0430 \u043e\u043b\u0438\u043d\u0434\u0438",
      nusxaXatolik:       "\u041d\u0443\u0441\u0445\u0430 \u043e\u043b\u0438\u0448\u0434\u0430 \u0445\u0430\u0442\u043e\u043b\u0438\u043a",
      matnNusxa:          "\u2713 \u041c\u0430\u0442\u043d \u043d\u0443\u0441\u0445\u0430 \u043e\u043b\u0438\u043d\u0434\u0438",
      ulashishXato:       "\u0423\u043b\u0430\u0448\u0438\u0448 \u049b\u045e\u043b\u043b\u0430\u0431-\u049b\u0443\u0432\u0432\u0430\u0442\u043b\u0430\u043d\u043c\u0430\u0439\u0434\u0438",
      oyatOlib:           "\u041e\u044f\u0442 \u043e\u043b\u0438\u0431 \u0442\u0430\u0448\u043b\u0430\u043d\u0434\u0438",
      oyatSaqlandi:       "\u041e\u044f\u0442 \u0441\u0430\u049b\u043b\u0430\u043d\u0434\u0438 \u2713",
      audioKeladi:        "\uD83C\uDFA7 \u0410\u0443\u0434\u0438\u043e \u0442\u0435\u0437 \u043e\u0440\u0430\u0434\u0430 \u049b\u045e\u0448\u0438\u043b\u0430\u0434\u0438",
      surahXato:          "\u0421\u0443\u0440\u0430 \u0442\u043e\u043f\u0438\u043b\u043c\u0430\u0434\u0438 \u0451\u043a\u0438 \u044e\u043a\u043b\u0430\u0448\u0434\u0430 \u0445\u0430\u0442\u043e\u043b\u0438\u043a \u044e\u0437 \u0431\u0435\u0440\u0434\u0438.",
      oxirgiJoy:          "\u041e\u0445\u0438\u0440\u0433\u0438 \u045e\u049b\u0438\u0448 \u0436\u043e\u0439\u0438",
      davomEttirish:      "\u0414\u0430\u0432\u043e\u043c \u044d\u0442\u0442\u0438\u0440\u0438\u0448 \u2192",
      suraTopilmadi:      "\u0421\u0443\u0440\u0430 \u0442\u043e\u043f\u0438\u043b\u043c\u0430\u0434\u0438.",
      yuklashXato:        "\u0421\u0443\u0440\u0430\u043b\u0430\u0440\u043d\u0438 \u044e\u043a\u043b\u0430\u0448\u0434\u0430 \u0445\u0430\u0442\u043e\u043b\u0438\u043a \u044e\u0437 \u0431\u0435\u0440\u0434\u0438.",
      topilganOyat:       "\u0422\u043e\u043f\u0438\u043b\u0433\u0430\u043d \u043e\u044f\u0442",
      matnNatijalar:      "\u041c\u0430\u0442\u043d \u0431\u045e\u0439\u0438\u0447\u0430 \u043d\u0430\u0442\u0438\u0436\u0430\u043b\u0430\u0440",
      hechNarsa:          "\u041c\u0430\u0442\u043d \u0431\u045e\u0439\u0438\u0447\u0430 \u04b3\u0435\u0447 \u043d\u0430\u0440\u0441\u0430 \u0442\u043e\u043f\u0438\u043b\u043c\u0430\u0434\u0438.",
      bunday:             "\u0411\u0443\u043d\u0434\u0430\u0439 \u043e\u044f\u0442 \u0442\u043e\u043f\u0438\u043b\u043c\u0430\u0434\u0438. \u041c\u0430\u043d\u0437\u0438\u043b\u043d\u0438 \u0442\u0435\u043a\u0448\u0438\u0440\u0438\u043d\u0433 (\u043c\u0430\u0441\u0430\u043b\u0430\u043d: 2:255).",
      suralar:            "\u0421\u0443\u0440\u0430\u043b\u0430\u0440",
      sozlamalar:         "\u0421\u043e\u0437\u043b\u0430\u043c\u0430\u043b\u0430\u0440",
      boshSahifa:         "\u0411\u043e\u0448 \u0441\u0430\u04b3\u0438\u0444\u0430",
      korinish:           "\u041a\u045e\u0440\u0438\u043d\u0438\u0448",
      tungiRejim:         "\u0422\u0443\u043d\u0433\u0438 \u0440\u0435\u0436\u0438\u043c",
      qorongi:            "\u049a\u043e\u0440\u043e\u043d\u0493\u0438 \u0444\u043e\u043d",
      kunduzgi:           "\u041a\u0443\u043d\u0434\u0443\u0437\u0433\u0438 \u0440\u0435\u0436\u0438\u043c",
      yorug:              "\u0415\u0440\u0443\u0493 \u0444\u043e\u043d",
      til:                "\u0422\u0438\u043b"
    }
  };

  /* Per-page-session cache for Cyrillic translation JSON */
  var _kirilCache = null;

  var Lang = {
    /** Active language key */
    get: function () {
      return localStorage.getItem(LANG_KEY) || 'latin';
    },
    /** Persist choice and reload so all strings update */
    set: function (lang) {
      localStorage.setItem(LANG_KEY, lang);
      location.reload();
    },
    /** Translate a UI key for the active language */
    t: function (key) {
      var lang = this.get();
      var map  = STRINGS[lang] || STRINGS.latin;
      return Object.prototype.hasOwnProperty.call(map, key)
        ? map[key]
        : (STRINGS.latin[key] || key);
    },
    /** True when Cyrillic mode is active */
    isKiril: function () {
      return this.get() === 'kiril';
    },
    /**
     * Fetch Cyrillic ayah translations for one surah.
     * Returns a Promise that resolves to {ayahNum: translation} or {} on error.
     * Result is cached in memory for the page lifetime.
     */
    loadKirilTrans: async function (surahNum) {
      if (!this.isKiril()) return {};
      if (!_kirilCache) {
        try {
          var resp = await fetch('/quran-translations-kiril.json');
          _kirilCache = await resp.json();
        } catch (e) {
          _kirilCache = {};
        }
      }
      return _kirilCache[String(surahNum)] || {};
    },
    /**
     * Translate all elements carrying a data-i18n="key" attribute.
     * No-op in Latin mode (page is already in Latin by default).
     */
    applyDOM: function () {
      if (!this.isKiril()) return;
      var self = this;
      document.querySelectorAll('[data-i18n]').forEach(function (el) {
        el.textContent = self.t(el.getAttribute('data-i18n'));
      });
    }
  };

  window.Lang = Lang;

  /* Auto-translate data-i18n elements once DOM is ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { Lang.applyDOM(); });
  } else {
    Lang.applyDOM();
  }
})();
