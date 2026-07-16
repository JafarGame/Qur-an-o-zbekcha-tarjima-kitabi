(function () {
  const params     = new URLSearchParams(window.location.search);
  const number     = Number(params.get("number")) || 1;
  const targetAyah = Number(params.get("ayah"))   || null;
  const headerTitle = document.getElementById("headerTitle");
  const contentEl   = document.getElementById("surahContent");

  // ── Storage keys ─────────────────────────────────────────────────
  const BOOKMARKS_KEY   = "quran_bookmarks";
  const LAST_POS_KEY    = "quran_last_position";
  const ARABIC_SIZE_KEY = "quran_arabic_size";
  const SHOW_TRANS_KEY  = "quran_show_translation";

  const BISMILLAH = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";
  const NO_BISMILLAH_BANNER = new Set([1, 9]);

  // ── Bookmarks ────────────────────────────────────────────────────
  function loadBookmarks() {
    try { return JSON.parse(localStorage.getItem(BOOKMARKS_KEY)) || {}; }
    catch { return {}; }
  }
  function saveBookmarks(bm) {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bm));
  }
  function bookmarkKey(surahNum, ayahNum) { return `${surahNum}:${ayahNum}`; }

  // ── Toast ────────────────────────────────────────────────────────
  const toast = document.createElement("div");
  toast.className = "ayah-copy-toast";
  document.body.appendChild(toast);
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("visible"), 2200);
  }

  // ── Arabic text size ─────────────────────────────────────────────
  const VALID_SIZES = ["small", "medium", "large"];
  const storedSize  = localStorage.getItem(ARABIC_SIZE_KEY);
  let currentSize   = VALID_SIZES.includes(storedSize) ? storedSize : "medium";

  function applySize(size) {
    VALID_SIZES.forEach(s => document.body.classList.remove(`arabic-size-${s}`));
    document.body.classList.add(`arabic-size-${size}`);
    currentSize = size;
    localStorage.setItem(ARABIC_SIZE_KEY, size);
    document.querySelectorAll(".rc-size-btn").forEach(btn => {
      btn.classList.toggle("rc-btn-active", btn.dataset.size === size);
    });
  }
  applySize(currentSize); // apply before paint

  // ── Translation visibility ───────────────────────────────────────
  let showTranslation = localStorage.getItem(SHOW_TRANS_KEY) !== "false";

  function applyTranslation(show) {
    showTranslation = show;
    localStorage.setItem(SHOW_TRANS_KEY, show ? "true" : "false");
    document.body.classList.toggle("translations-hidden", !show);
    const btn = document.getElementById("toggleTranslation");
    if (btn) btn.textContent = show ? "Tarjimani yashirish" : "Tarjimani ko'rsatish";
  }
  applyTranslation(showTranslation); // apply before paint

  // ── Size button wiring (DOM is ready, buttons exist) ─────────────
  document.querySelectorAll(".rc-size-btn").forEach(btn => {
    btn.addEventListener("click", () => applySize(btn.dataset.size));
  });
  document.getElementById("toggleTranslation")?.addEventListener("click", () => {
    applyTranslation(!showTranslation);
  });

  // ── Ayah navigation ──────────────────────────────────────────────
  let ayahEls = [];
  let currentAyahIdx = 0;
  let scrollTimer;

  function getAyahIdxByScroll() {
    if (!ayahEls.length) return 0;
    const mid = window.innerHeight / 2;
    let best = 0, bestDist = Infinity;
    ayahEls.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      const dist = Math.abs((r.top + r.bottom) / 2 - mid);
      if (dist < bestDist) { bestDist = dist; best = i; }
    });
    return best;
  }

  function updateAyahNav() {
    const prevBtn   = document.getElementById("prevAyah");
    const nextBtn   = document.getElementById("nextAyah");
    const indicator = document.getElementById("ayahIndicator");
    if (prevBtn)   prevBtn.disabled   = currentAyahIdx <= 0;
    if (nextBtn)   nextBtn.disabled   = currentAyahIdx >= ayahEls.length - 1;
    if (indicator) indicator.textContent = ayahEls.length
      ? `${currentAyahIdx + 1} / ${ayahEls.length}`
      : "—";
  }

  function scrollToAyahIdx(idx) {
    if (idx < 0 || idx >= ayahEls.length) return;
    currentAyahIdx = idx;
    ayahEls[idx].scrollIntoView({ behavior: "smooth", block: "center" });
    updateAyahNav();
  }

  document.getElementById("prevAyah")?.addEventListener("click", () => {
    currentAyahIdx = getAyahIdxByScroll();
    scrollToAyahIdx(currentAyahIdx - 1);
  });
  document.getElementById("nextAyah")?.addEventListener("click", () => {
    currentAyahIdx = getAyahIdxByScroll();
    scrollToAyahIdx(currentAyahIdx + 1);
  });

  // ── SVG icons ────────────────────────────────────────────────────
  const ICON_COPY = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="5" y="5" width="9" height="9" rx="1.5"/>
    <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2H3.5A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5"/>
  </svg>`;

  const ICON_SHARE = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M8 2v9M5 5l3-3 3 3"/>
    <path d="M3 10v3a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-3"/>
  </svg>`;

  const ICON_BOOKMARK_EMPTY = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M3 2h10a1 1 0 0 1 1 1v11l-6-3-6 3V3a1 1 0 0 1 1-1z"/>
  </svg>`;

  const ICON_BOOKMARK_FILLED = `<svg viewBox="0 0 16 16" fill="currentColor" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M3 2h10a1 1 0 0 1 1 1v11l-6-3-6 3V3a1 1 0 0 1 1-1z"/>
  </svg>`;

  const ICON_AUDIO = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M3 9.5V8a5 5 0 0 1 10 0v1.5"/>
    <rect x="1.5" y="9" width="3" height="4.5" rx="1.2"/>
    <rect x="11.5" y="9" width="3" height="4.5" rx="1.2"/>
  </svg>`;

  function renderSurahNav(current, total) {
    const prev = current > 1       ? current - 1 : null;
    const next = current < total   ? current + 1 : null;
    return `
      <div class="nav-buttons">
        <a class="${prev ? "" : "disabled"}" href="/surah.html?number=${prev || current}">← Oldingi sura</a>
        <a class="${next ? "" : "disabled"}" href="/surah.html?number=${next || current}">Keyingi sura →</a>
      </div>`;
  }

  // ── Fetch & render ───────────────────────────────────────────────
  fetch(`/api/surah/${number}`)
    .then(res => {
      if (!res.ok) throw new Error("not found");
      return res.json();
    })
    .then(surah => {
      document.title = `${surah.number}. ${surah.name} | Qur'oni Karim`;
      headerTitle.textContent = `${surah.number}. ${surah.name}`;

      const bookmarks = loadBookmarks();

      const ayahsHtml = surah.ayahs.map(a => {
        const key   = bookmarkKey(surah.number, a.number);
        const saved = !!bookmarks[key];
        return `
          <div class="ayah-block${a.number === targetAyah ? " ayah-highlight" : ""}" id="ayah-${a.number}">
            <div class="ayah-number-row">
              <div class="ayah-number"><span>${a.number}</span></div>
            </div>
            <div class="ayah-arabic">${a.arabic}</div>
            <div class="ayah-translation">
              <span class="label">Tarjima</span>
              <p>${a.translation}</p>
            </div>
            <div class="ayah-actions">
              <button class="ayah-action-btn" data-action="copy" title="Nusxa olish">
                ${ICON_COPY}<span>Nusxa</span>
              </button>
              <button class="ayah-action-btn" data-action="share" title="Ulashish">
                ${ICON_SHARE}<span>Ulashish</span>
              </button>
              <button class="ayah-action-btn ayah-action-btn--bookmark${saved ? " is-bookmarked" : ""}"
                      data-action="bookmark"
                      data-ayah-num="${a.number}"
                      title="${saved ? "Saqlangandan olib tashlash" : "Saqlash"}">
                ${saved ? ICON_BOOKMARK_FILLED : ICON_BOOKMARK_EMPTY}<span>${saved ? "Saqlangan" : "Saqlash"}</span>
              </button>
              <button class="ayah-action-btn ayah-action-btn--audio" data-action="audio" title="Audio tinglash">
                ${ICON_AUDIO}<span>Audio</span>
              </button>
            </div>
          </div>`;
      }).join("");

      const bismillahHtml = NO_BISMILLAH_BANNER.has(surah.number)
        ? ""
        : `<div class="bismillah">${BISMILLAH}</div>`;

      contentEl.innerHTML = `
        <div class="surah-title-block">
          <div class="sub">${surah.ayahCount} oyat</div>
        </div>
        ${bismillahHtml}
        ${ayahsHtml}
        ${renderSurahNav(surah.number, 114)}
      `;

      // ── Save initial last-reading position ───────────────────────
      localStorage.setItem(LAST_POS_KEY, JSON.stringify({
        surahNum:  surah.number,
        surahName: surah.name,
        ayahNum:   targetAyah || 1,
      }));

      // ── Collect ayah elements & init nav ─────────────────────────
      ayahEls = Array.from(contentEl.querySelectorAll(".ayah-block"));
      if (targetAyah) {
        const idx = ayahEls.findIndex(el => el.id === `ayah-${targetAyah}`);
        if (idx !== -1) currentAyahIdx = idx;
      }
      updateAyahNav();

      // ── Scroll → update position + save ──────────────────────────
      window.addEventListener("scroll", () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          if (!ayahEls.length) return;
          currentAyahIdx = getAyahIdxByScroll();
          updateAyahNav();
          const el = ayahEls[currentAyahIdx];
          if (el) {
            const ayahNum = Number(el.id.replace("ayah-", ""));
            if (!isNaN(ayahNum)) {
              localStorage.setItem(LAST_POS_KEY, JSON.stringify({
                surahNum:  surah.number,
                surahName: surah.name,
                ayahNum,
              }));
            }
          }
        }, 150);
      }, { passive: true });

      // ── Action button delegation ──────────────────────────────────
      contentEl.addEventListener("click", function (e) {
        const btn = e.target.closest(".ayah-action-btn");
        if (!btn) return;

        const block       = btn.closest(".ayah-block");
        const arabic      = block.querySelector(".ayah-arabic").textContent.trim();
        const translation = block.querySelector(".ayah-translation p").textContent.trim();
        const ayahNum     = Number(block.id.replace("ayah-", ""));
        const action      = btn.dataset.action;

        if (action === "copy") {
          const text = `${arabic}\n\n${translation}\n\n— Qur'on Karim, ${surah.name} surasi, ${ayahNum}-oyat`;
          navigator.clipboard.writeText(text)
            .then(() => showToast("✓ Nusxa olindi"))
            .catch(() => showToast("Nusxa olishda xatolik"));
        }

        if (action === "share") {
          const shareData = {
            title: `Qur'on Karim — ${surah.name} ${ayahNum}-oyat`,
            text:  `${arabic}\n\n${translation}\n\n— ${surah.name} surasi, ${ayahNum}-oyat`,
          };
          if (navigator.share) {
            navigator.share(shareData).catch(() => {});
          } else {
            navigator.clipboard.writeText(`${shareData.title}\n\n${shareData.text}`)
              .then(() => showToast("✓ Matn nusxa olindi"))
              .catch(() => showToast("Ulashish qo'llab-quvvatlanmaydi"));
          }
        }

        if (action === "bookmark") {
          const bm     = loadBookmarks();
          const key    = bookmarkKey(surah.number, ayahNum);
          const isSaved = !!bm[key];
          if (isSaved) {
            delete bm[key];
            saveBookmarks(bm);
            btn.classList.remove("is-bookmarked");
            btn.title = "Saqlash";
            btn.innerHTML = `${ICON_BOOKMARK_EMPTY}<span>Saqlash</span>`;
            showToast("Oyat olib tashlandi");
          } else {
            bm[key] = { surahNum: surah.number, surahName: surah.name, ayahNum, arabic, translation, savedAt: Date.now() };
            saveBookmarks(bm);
            btn.classList.add("is-bookmarked");
            btn.title = "Saqlangandan olib tashlash";
            btn.innerHTML = `${ICON_BOOKMARK_FILLED}<span>Saqlangan</span>`;
            showToast("Oyat saqlandi ✓");
          }
        }

        if (action === "audio") {
          showToast("🎧 Audio tez orada qo'shiladi");
        }
      });

      // ── Scroll to target ayah ─────────────────────────────────────
      if (targetAyah) {
        const el = document.getElementById(`ayah-${targetAyah}`);
        if (el) {
          const doScroll = () => el.scrollIntoView({ behavior: "auto", block: "center" });
          if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(doScroll);
          } else {
            setTimeout(doScroll, 400);
          }
          setTimeout(() => el.classList.remove("ayah-highlight"), 4000);
        }
      }
    })
    .catch(() => {
      headerTitle.textContent = "Xatolik";
      contentEl.innerHTML =
        '<div class="state-msg">Sura topilmadi yoki yuklashda xatolik yuz berdi.</div>';
    });
})();
