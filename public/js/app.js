(function () {
  const listEl = document.getElementById("surahList");
  const searchInput = document.getElementById("searchInput");

  // ── "Davom ettirish" banner ──────────────────────────────────────
  (function showContinueBanner() {
    try {
      const pos = JSON.parse(localStorage.getItem("quran_last_position"));
      if (!pos || !pos.surahNum) return;
      const banner = document.createElement("div");
      banner.className = "continue-reading-banner";
      banner.innerHTML = `
        <div class="crb-text">
          <span class="crb-label">${Lang.t('oxirgiJoy')}</span>
          <span class="crb-ref">${pos.surahName} · ${pos.ayahNum}-${Lang.t('oyat')}</span>
        </div>
        <a class="crb-btn" href="/surah.html?number=${pos.surahNum}&ayah=${pos.ayahNum}">${Lang.t('davomEttirish')}</a>`;
      listEl.before(banner);
    } catch {}
  })();
  const searchResultsEl = document.getElementById("searchResults");
  let surahs = [];
  let debounceTimer = null;

  function renderSurahs(items) {
    if (!items.length) {
      listEl.innerHTML = `<div class="state-msg">${Lang.t('suraTopilmadi')}</div>`;
      return;
    }
    listEl.innerHTML = items
      .map(
        (s) => `
        <a class="surah-card" href="/surah.html?number=${s.number}">
          <div class="surah-badge">${s.number}</div>
          <div class="surah-info">
            <div class="name">${(window.Lang && Lang.surahName(s.number)) || s.name}</div>
            <div class="meta">${s.ayahCount} ${window.Lang ? Lang.t('oyat') : 'oyat'}</div>
          </div>
        </a>`
      )
      .join("");
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function renderAyahHit(hit, isDirectMatch) {
    const displayName = (window.Lang && Lang.surahName(hit.surah)) || hit.surahName;
    return `
      <a class="ayah-hit${isDirectMatch ? " ayah-hit-direct" : ""}" href="/surah.html?number=${hit.surah}&ayah=${hit.ayah}">
        <div class="ayah-hit-ref">${displayName} ${hit.surah}:${hit.ayah}</div>
        <div class="ayah-hit-arabic">${hit.arabic}</div>
        <div class="ayah-hit-translation">${escapeHtml(hit.translation)}</div>
      </a>`;
  }

  function clearSearchResults() {
    searchResultsEl.innerHTML = "";
    searchResultsEl.classList.remove("visible");
  }

  function showSearchResults(html) {
    searchResultsEl.innerHTML = html;
    searchResultsEl.classList.add("visible");
  }

  function runAyahSearch(query) {
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.type === "ayah") {
          showSearchResults(`
            <div class="search-section-label">${Lang.t('topilganOyat')}</div>
            ${renderAyahHit(
              { surah: data.surah, ayah: data.ayah, surahName: data.surahName, arabic: data.arabic, translation: data.translation },
              true
            )}
          `);
        } else if (data.type === "results" && data.results.length) {
          showSearchResults(`
            <div class="search-section-label">${Lang.t('matnNatijalar')} (${data.results.length})</div>
            ${data.results.map((r) => renderAyahHit(r, false)).join("")}
          `);
        } else if (data.type === "results") {
          showSearchResults(`<div class="state-msg">${Lang.t('hechNarsa')}</div>`);
        } else if (data.type === "not_found") {
          showSearchResults(`<div class="state-msg">${Lang.t('bunday')}</div>`);
        } else {
          clearSearchResults();
        }
      })
      .catch(() => clearSearchResults());
  }

  function applyFilter() {
    const raw = searchInput.value.trim();
    const q = raw.toLowerCase();

    if (!raw) {
      renderSurahs(surahs);
      clearSearchResults();
      return;
    }

    const filtered = surahs.filter(
      (s) => s.name.toLowerCase().includes(q) || String(s.number) === q
    );
    renderSurahs(filtered);

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => runAyahSearch(raw), 250);
  }

  searchInput.addEventListener("input", applyFilter);

  fetch("/api/surahs")
    .then((res) => res.json())
    .then((data) => {
      surahs = data;
      renderSurahs(surahs);
    })
    .catch(() => {
      listEl.innerHTML =
`<div class="state-msg">${Lang.t('yuklashXato')}</div>`;
    });
})();
