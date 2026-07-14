(function () {
  const listEl = document.getElementById("surahList");
  const searchInput = document.getElementById("searchInput");
  let surahs = [];

  function render(items) {
    if (!items.length) {
      listEl.innerHTML = '<div class="state-msg">Hech narsa topilmadi.</div>';
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

  function applyFilter() {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) {
      render(surahs);
      return;
    }
    const filtered = surahs.filter(
      (s) => s.name.toLowerCase().includes(q) || String(s.number) === q
    );
    render(filtered);
  }

  searchInput.addEventListener("input", applyFilter);

  fetch("/api/surahs")
    .then((res) => res.json())
    .then((data) => {
      surahs = data;
      render(surahs);
    })
    .catch(() => {
      listEl.innerHTML =
        '<div class="state-msg">Suralarni yuklashda xatolik yuz berdi.</div>';
    });
})();
