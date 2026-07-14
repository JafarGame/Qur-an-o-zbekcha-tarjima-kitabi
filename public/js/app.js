(function () {
  const listEl = document.getElementById("surahList");
  const searchInput = document.getElementById("searchInput");
  const searchResultsEl = document.getElementById("searchResults");
  let surahs = [];
  let debounceTimer = null;

  function renderSurahs(items) {
    if (!items.length) {
      listEl.innerHTML = '<div class="state-msg">Sura topilmadi.</div>';
      return;
    }
    listEl.innerHTML = items
      .map(
        (s) => `
        <a class="surah-card" href="/surah.html?number=${s.number}">
          <div class="surah-badge">${s.number}</div>
          <div class="surah-info">
            <div class="name">${s.name}</div>
            <div class="meta">${s.ayahCount} oyat</div>
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
    return `
      <a class="ayah-hit${isDirectMatch ? " ayah-hit-direct" : ""}" href="/surah.html?number=${hit.surah}&ayah=${hit.ayah}">
        <div class="ayah-hit-ref">${hit.surahName} ${hit.surah}:${hit.ayah}</div>
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
            <div class="search-section-label">Topilgan oyat</div>
            ${renderAyahHit(
              { surah: data.surah, ayah: data.ayah, surahName: data.surahName, arabic: data.arabic, translation: data.translation },
              true
            )}
          `);
        } else if (data.type === "results" && data.results.length) {
          showSearchResults(`
            <div class="search-section-label">Matn bo'yicha natijalar (${data.results.length})</div>
            ${data.results.map((r) => renderAyahHit(r, false)).join("")}
          `);
        } else if (data.type === "results") {
          showSearchResults('<div class="state-msg">Matn bo\'yicha hech narsa topilmadi.</div>');
        } else if (data.type === "not_found") {
          showSearchResults('<div class="state-msg">Bunday oyat topilmadi. Manzilni tekshiring (masalan: 2:255).</div>');
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
        '<div class="state-msg">Suralarni yuklashda xatolik yuz berdi.</div>';
    });
})();
