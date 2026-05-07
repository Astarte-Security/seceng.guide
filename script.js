(function () {
  "use strict";

  const slides = Array.from(document.querySelectorAll(".slide"));
  const total = slides.length;
  const counter = document.getElementById("slide-counter");
  const nav = document.getElementById("deck-nav");
  const prevBtn = document.getElementById("nav-prev");
  const nextBtn = document.getElementById("nav-next");

  let index = 0;

  function renderCounter() {
    counter.innerHTML =
      '<span class="num">' + (index + 1) + '</span>' +
      '<span class="sep">/</span>' +
      '<span class="num">' + total + '</span>';
  }

  function show(i) {
    if (i < 0) i = 0;
    if (i > total - 1) i = total - 1;
    slides[index].classList.remove("is-active");
    slides[i].classList.add("is-active");
    index = i;
    renderCounter();
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === total - 1;
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, "", "#" + (i + 1));
    }
  }

  function initialIndex() {
    const m = /^#(\d+)$/.exec(window.location.hash || "");
    if (!m) return 0;
    const n = parseInt(m[1], 10);
    if (isNaN(n)) return 0;
    return Math.max(0, Math.min(total - 1, n - 1));
  }

  // Keyboard navigation.
  document.addEventListener("keydown", function (e) {
    if (counter.classList.contains("is-editing")) return;
    switch (e.key) {
      case "ArrowRight":
      case "PageDown":
      case " ":
        e.preventDefault();
        show(index + 1);
        break;
      case "ArrowLeft":
      case "PageUp":
        e.preventDefault();
        show(index - 1);
        break;
      case "Home":
        e.preventDefault();
        show(0);
        break;
      case "End":
        e.preventDefault();
        show(total - 1);
        break;
    }
  });

  // Click counter -> inline input to jump to a slide.
  counter.addEventListener("click", function () {
    if (counter.classList.contains("is-editing")) return;
    counter.classList.add("is-editing");

    const input = document.createElement("input");
    input.type = "number";
    input.min = "1";
    input.max = String(total);
    input.value = String(index + 1);
    input.setAttribute("aria-label", "Slide number");

    const sep = document.createElement("span");
    sep.className = "sep";
    sep.textContent = "/";
    const totalSpan = document.createElement("span");
    totalSpan.className = "num";
    totalSpan.textContent = String(total);

    counter.replaceChildren(input, sep, totalSpan);
    input.focus();
    input.select();

    let done = false;
    function finish(commit) {
      if (done) return;
      done = true;
      const n = commit ? parseInt(input.value, 10) : NaN;
      counter.classList.remove("is-editing");
      if (!isNaN(n)) {
        show(n - 1);
      } else {
        renderCounter();
      }
    }

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        finish(true);
      } else if (e.key === "Escape") {
        e.preventDefault();
        finish(false);
      }
      e.stopPropagation();
    });
    input.addEventListener("blur", function () { finish(true); });
  });

  // Click-arrow navigation.
  prevBtn.addEventListener("click", function () { show(index - 1); });
  nextBtn.addEventListener("click", function () { show(index + 1); });

  // Reveal arrows when the user hovers the nav cluster; hide 3s after leaving.
  let hideTimer = null;
  nav.addEventListener("mouseenter", function () {
    if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
    nav.classList.add("is-revealed");
  });
  nav.addEventListener("mouseleave", function () {
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      nav.classList.remove("is-revealed");
      hideTimer = null;
    }, 3000);
  });
  // Keyboard focus also reveals (so tab-users can find the buttons).
  nav.addEventListener("focusin", function () {
    if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
    nav.classList.add("is-revealed");
  });

  // Hash navigation (e.g. user pastes #3).
  window.addEventListener("hashchange", function () {
    if (counter.classList.contains("is-editing")) return;
    show(initialIndex());
  });

  // Theme toggle: top-left hover-revealed sun/moon icon.
  // Sun = "switch to light" (shown while in dark mode).
  // Moon = "switch to dark" (shown while in light mode).
  const SUN  = "☼";  // ☼
  const MOON = "⏾";  // ⏾

  const themeZone = document.getElementById("theme-zone");
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  function renderThemeIcon() {
    const isLight = document.body.classList.contains("light-mode");
    themeIcon.textContent = isLight ? MOON : SUN;
    themeToggle.setAttribute(
      "aria-label",
      isLight ? "Switch to dark mode" : "Switch to light mode"
    );
  }

  try {
    if (localStorage.getItem("theme") === "light") {
      document.body.classList.add("light-mode");
    }
  } catch (e) { /* localStorage unavailable */ }
  renderThemeIcon();

  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    try { localStorage.setItem("theme", isLight ? "light" : "dark"); } catch (e) {}
    renderThemeIcon();
  });

  let themeHideTimer = null;
  themeZone.addEventListener("mouseenter", function () {
    if (themeHideTimer) { clearTimeout(themeHideTimer); themeHideTimer = null; }
    themeZone.classList.add("is-revealed");
  });
  themeZone.addEventListener("mouseleave", function () {
    if (themeHideTimer) clearTimeout(themeHideTimer);
    themeHideTimer = setTimeout(function () {
      themeZone.classList.remove("is-revealed");
      themeHideTimer = null;
    }, 3000);
  });
  themeZone.addEventListener("focusin", function () {
    if (themeHideTimer) { clearTimeout(themeHideTimer); themeHideTimer = null; }
    themeZone.classList.add("is-revealed");
  });

  // Render today's date on the title slide.
  const dateEl = document.getElementById("title-date");
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // Bootstrap.
  slides.forEach(function (s) { s.classList.remove("is-active"); });
  show(initialIndex());
})();
