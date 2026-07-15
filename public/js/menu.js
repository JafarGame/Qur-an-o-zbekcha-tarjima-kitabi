(function () {
  // Apply saved dark mode before first paint
  if (localStorage.getItem("darkMode") === "true") {
    document.documentElement.classList.add("dark");
  }

  document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("menuToggle");
    const closeBtn  = document.getElementById("menuClose");
    const overlay   = document.getElementById("menuOverlay");
    const drawer    = document.getElementById("menuDrawer");
    const darkBtn   = document.getElementById("darkModeToggle");

    if (!toggleBtn || !drawer) return;

    function openMenu() {
      drawer.classList.add("open");
      overlay.classList.add("open");
      document.body.classList.add("menu-open");
    }

    function closeMenu() {
      drawer.classList.remove("open");
      overlay.classList.remove("open");
      document.body.classList.remove("menu-open");
    }

    toggleBtn.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    function syncDarkLabel() {
      const isDark = document.documentElement.classList.contains("dark");
      if (darkBtn) {
        darkBtn.querySelector(".menu-item-label").textContent =
          isDark ? "Kunduzgi rejim" : "Tungi rejim";
        darkBtn.querySelector(".menu-item-icon").textContent =
          isDark ? "☀️" : "🌙";
      }
    }

    if (darkBtn) {
      darkBtn.addEventListener("click", function () {
        const isDark = document.documentElement.classList.toggle("dark");
        localStorage.setItem("darkMode", isDark);
        syncDarkLabel();
      });
    }

    syncDarkLabel();
  });
})();
