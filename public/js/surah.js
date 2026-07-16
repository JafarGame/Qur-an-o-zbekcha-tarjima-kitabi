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

  // ── Toast notification ───────────────────────────────────────────
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

  // ── SVG icons ────────────────────────────────────────────────────
  const ICON_COPY = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="5" y="5" width="9" height="9" rx="1.5"/>
    <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2H3.5A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5"/>
  </svg>`;

  const ICON_SHARE = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M8 2v9M5 5l3-3 3 3"/>
    <path d="M3 10v3a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-3"/>
  </svg>`;

  const ICON_AUDIO = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M3 9.5V8a5 5 0 0 1 10 0v1.5"/>
    <rect x="1.5" y="9" width="3" height="4.5" rx="1.2"/>
    <rect x="11.5" y="9" width="3" height="4.5" rx="1.2"/>
  </svg>`;

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
          <div class="ayah-actions">
            <button class="ayah-action-btn" data-action="copy" title="Nusxa olish">
              ${ICON_COPY}<span>Nusxa</span>
            </button>
            <button class="ayah-action-btn" data-action="share" title="Ulashish">
              ${ICON_SHARE}<span>Ulashish</span>
            </button>
            <button class="ayah-action-btn ayah-action-btn--audio" data-action="audio" title="Audio tinglash">
              ${ICON_AUDIO}<span>Audio</span>
            </button>
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

      // ── Action button handlers (event delegation) ────────────────
      contentEl.addEventListener("click", function (e) {
        const btn = e.target.closest(".ayah-action-btn");
        if (!btn) return;

        const block = btn.closest(".ayah-block");
        const arabic = block.querySelector(".ayah-arabic").textContent.trim();
        const translation = block.querySelector(".ayah-translation p").textContent.trim();
        const ayahNum = block.querySelector(".ayah-number span").textContent.trim();
        const action = btn.dataset.action;

        if (action === "copy") {
          const text = `${arabic}\n\n${translation}\n\n— Qur'on Karim, ${surah.name} surasi, ${ayahNum}-oyat`;
          navigator.clipboard.writeText(text)
            .then(() => showToast("✓ Nusxa olindi"))
            .catch(() => showToast("Nusxa olishda xatolik"));
        }

        if (action === "share") {
          const shareData = {
            title: `Qur'on Karim — ${surah.name} ${ayahNum}-oyat`,
            text: `${arabic}\n\n${translation}\n\n— ${surah.name} surasi, ${ayahNum}-oyat`,
          };
          if (navigator.share) {
            navigator.share(shareData).catch(() => {});
          } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(`${shareData.title}\n\n${shareData.text}`)
              .then(() => showToast("✓ Matn nusxa olindi"))
              .catch(() => showToast("Ulashish qo'llab-quvvatlanmaydi"));
          }
        }

        if (action === "audio") {
          showToast("🎧 Audio tez orada qo'shiladi");
        }
      });

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
