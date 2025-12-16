(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.getElementById("nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Cerrar el menú al hacer click en un link (mobile)
    navLinks.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  }

  const langToggle = document.getElementById("langToggle");
  const supported = ["es", "en"];

  function getSavedLang() {
    const saved = localStorage.getItem("lang");
    if (saved && supported.includes(saved)) return saved;
    return "es";
  }

  function setLang(lang) {
    const dict = window.I18N?.[lang];
    if (!dict) return;

    document.documentElement.lang = lang;

    const nodes = document.querySelectorAll("[data-i18n]");
    nodes.forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (!key) return;
      const val = dict[key];
      if (typeof val === "string") {
        if (val.includes("<")) {
          node.innerHTML = val;
        } else {
          node.textContent = val;
        }
      }
    });

    localStorage.setItem("lang", lang);
  }

  // Initial language
  setLang(getSavedLang());

  if (langToggle) {
    langToggle.addEventListener("click", () => {
      const current = document.documentElement.lang || "es";
      const next = current === "es" ? "en" : "es";
      setLang(next);
    });
  }
})();
