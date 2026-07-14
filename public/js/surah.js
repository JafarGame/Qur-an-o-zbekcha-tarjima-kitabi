(function () {
  const params = new URLSearchParams(window.location.search);
  const number = Number(params.get("number")) || 1;
  const targetAyah = Number(params.get("ayah")) || null;
  const headerTitle = document.getElementById("headerTitle");
  const contentEl = document.getElementById("surahContent");

  const BISMILLAH = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";
  // Surah 1 (Fatiha) and 9 (Tavba) are conventionally shown without a
  // separate leading Bismillah banner (Fatiha's is its own first ayah,
  // Tavba traditionally omits it).
  const NO_BISMILLAH_BANNER = new Set([1, 9]);

  function renderNav(current, total) {
    const prev = current > 1 ? current - 1 : null;
    const next = current < total ? current + 1 : null;
    return `
      <div class="nav-buttons">
        <a class="${prev ? "" : "disabled"}" href="/surah.html?number=${prev || current}">← Oldingi sura</a>
        <a class="${next ? "" : "disabled"}" href="/surah.html?number=${next || current}">Keyingi sura →</a>
      </div>`;
  }

  fetch(`/api/surah/${number}`)
    .then((res) => {
      if (!res.ok) throw new Error("not found");
      return res.json();
    })
    .then((surah) => {
      document.title = `${surah.number}. ${surah.name} | Qur'oni Karim`;
      headerTitle.textContent = `${surah.number}. ${surah.name}`;

      const ayahsHtml = surah.ayahs
        .map(
          (a) => `
        <div class="ayah-block${a.number === targetAyah ? " ayah-highlight" : ""}" id="ayah-${a.number}">
          <div class="ayah-number-row">
            <div class="ayah-number"><span>${a.number}</span></div>
          </div>
          <div class="ayah-arabic">${a.arabic}</div>
          <div class="ayah-translation">
            <span class="label">Tarjima</span>
            <p>${a.translation}</p>
          </div>
        </div>`
        )
        .join("");

      const bismillahHtml = NO_BISMILLAH_BANNER.has(surah.number)
        ? ""
        : `<div class="bismillah">${BISMILLAH}</div>`;

      contentEl.innerHTML = `
        <div class="surah-title-block">
          <div class="sub">${surah.ayahCount} oyat</div>
        </div>
        ${bismillahHtml}
        ${ayahsHtml}
        ${renderNav(surah.number, 114)}
      `;

      if (targetAyah) {
        const el = document.getElementById(`ayah-${targetAyah}`);
        if (el) {
          // Wait for fonts (especially Amiri Quran) to finish loading before
          // scrolling, so cumulative line-height is stable and the scroll
          // position is accurate even for deep ayahs (e.g. 2:255).
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
