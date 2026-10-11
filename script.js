(function () {
  "use strict";

  var STAGE_W = 1600;
  var STAGE_H = 900;

  var root = document.documentElement;
  var stage = document.getElementById("stage");
  var slides = Array.prototype.slice.call(document.querySelectorAll(".slide"));
  var total = slides.length;

  var footerPart = document.getElementById("footer-part");
  var footerCount = document.getElementById("footer-count");
  var progressBar = document.getElementById("progress-bar");
  var prevBtn = document.getElementById("tb-prev");
  var nextBtn = document.getElementById("tb-next");
  var countEl = document.getElementById("tb-count");
  var menuBtn = document.getElementById("tb-menu");
  var themeBtn = document.getElementById("tb-theme");
  var fullBtn = document.getElementById("tb-full");
  var panel = document.getElementById("toc");
  var panelBackdrop = document.getElementById("toc-backdrop");
  var panelBody = document.getElementById("toc-body");
  var panelClose = document.getElementById("toc-close");
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = lightbox.querySelector("img");

  var index = 0;
  var docMode = false;

  // ---------- Parts: every divider starts a part; labs get their own colour ----------

  var parts = [];
  (function assignParts() {
    var current = null;
    slides.forEach(function (s, i) {
      if (s.classList.contains("divider")) {
        current = {
          label: s.getAttribute("data-part") || "",
          lab: s.classList.contains("lab-divider"),
          start: i,
        };
        parts.push(current);
      }
      s._part = current;
      if (current && current.lab) s.classList.add("is-lab");
    });
  })();

  function slideTitle(s) {
    if (s.hasAttribute("data-title")) return s.getAttribute("data-title");
    var h = s.querySelector("h1, h2");
    return h ? h.textContent.replace(/\s+/g, " ").trim() : "Slide";
  }

  // ---------- Showing slides ----------

  function clamp(i) { return Math.max(0, Math.min(total - 1, i)); }

  function show(i, opts) {
    i = clamp(i);
    slides[index].classList.remove("is-active");
    slides[i].classList.add("is-active");
    index = i;

    var s = slides[i];
    var part = s._part;
    footerPart.textContent = part ? part.label : "";
    footerCount.textContent = (i + 1) + " / " + total;
    progressBar.style.width = ((i + 1) / total * 100) + "%";
    stage.classList.toggle("is-lab", !!(part && part.lab));
    stage.classList.toggle("on-cover", s.classList.contains("cover"));
    prevBtn.disabled = i === 0;
    nextBtn.disabled = i === total - 1;
    renderCounter();
    markToc();

    // Reset any scrolled code blocks so a revisited slide starts at the top.
    s.querySelectorAll(".code pre").forEach(function (p) { p.scrollTop = 0; });

    if (!(opts && opts.keepHash) && window.history && window.history.replaceState) {
      window.history.replaceState(null, "", "#" + (i + 1));
    }
  }

  function indexFromHash() {
    var h = decodeURIComponent((window.location.hash || "").slice(1));
    if (!h) return 0;
    if (/^\d+$/.test(h)) return clamp(parseInt(h, 10) - 1);
    var el = document.getElementById(h);
    var s = el && el.closest(".slide");
    return s ? slides.indexOf(s) : 0;
  }

  // ---------- Scaling & document mode ----------

  var narrow = window.matchMedia("(max-width: 820px)");

  function layout() {
    docMode = narrow.matches;
    document.body.classList.toggle("is-doc", docMode);
    if (docMode) {
      stage.style.removeProperty("--scale");
      return;
    }
    var scale = Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H);
    stage.style.setProperty("--scale", scale.toFixed(4));
  }
  window.addEventListener("resize", layout);
  if (narrow.addEventListener) narrow.addEventListener("change", layout);

  // ---------- Counter (click to jump) ----------

  function renderCounter() {
    if (countEl.classList.contains("is-editing")) return;
    countEl.textContent = (index + 1) + " / " + total;
  }

  function editCounter() {
    if (countEl.classList.contains("is-editing")) return;
    countEl.classList.add("is-editing");
    var input = document.createElement("input");
    input.type = "number";
    input.min = "1";
    input.max = String(total);
    input.value = String(index + 1);
    input.setAttribute("aria-label", "Go to slide number");
    var rest = document.createElement("span");
    rest.textContent = "/ " + total;
    countEl.replaceChildren(input, rest);
    input.focus();
    input.select();

    var done = false;
    function finish(commit) {
      if (done) return;
      done = true;
      var n = commit ? parseInt(input.value, 10) : NaN;
      countEl.classList.remove("is-editing");
      if (!isNaN(n)) show(n - 1); else renderCounter();
    }
    input.addEventListener("keydown", function (e) {
      e.stopPropagation();
      if (e.key === "Enter") { e.preventDefault(); finish(true); }
      else if (e.key === "Escape") { e.preventDefault(); finish(false); }
    });
    input.addEventListener("blur", function () { finish(true); });
  }
  countEl.addEventListener("click", editCounter);

  // ---------- Slide menu ----------

  var tocButtons = [];
  (function buildToc() {
    var frag = document.createDocumentFragment();
    var lastPart;
    slides.forEach(function (s, i) {
      if (s._part !== lastPart && s._part) {
        var h = document.createElement("p");
        h.className = "toc-part" + (s._part.lab ? " lab" : "");
        h.textContent = s._part.label;
        frag.appendChild(h);
        lastPart = s._part;
      }
      var b = document.createElement("button");
      b.type = "button";
      b.className = "toc-item";
      var n = document.createElement("span");
      n.className = "i";
      n.textContent = String(i + 1);
      var t = document.createElement("span");
      t.textContent = slideTitle(s);
      b.append(n, t);
      b.addEventListener("click", function () { show(i); setMenu(false); });
      tocButtons.push(b);
      frag.appendChild(b);
    });
    panelBody.appendChild(frag);
  })();

  function markToc() {
    tocButtons.forEach(function (b, i) { b.classList.toggle("is-current", i === index); });
  }

  function setMenu(open) {
    panel.hidden = !open;
    panelBackdrop.hidden = !open;
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      var cur = tocButtons[index];
      if (cur) { cur.scrollIntoView({ block: "center" }); cur.focus({ preventScroll: true }); }
    }
  }
  menuBtn.addEventListener("click", function () { setMenu(panel.hidden); });
  panelClose.addEventListener("click", function () { setMenu(false); });
  panelBackdrop.addEventListener("click", function () { setMenu(false); });

  // ---------- Theme ----------

  function setTheme(t) {
    root.setAttribute("data-theme", t);
    try { localStorage.setItem("theme", t); } catch (e) {}
    themeBtn.setAttribute("aria-label", t === "light" ? "Switch to dark theme" : "Switch to light theme");
  }
  function toggleTheme() { setTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light"); }
  themeBtn.addEventListener("click", toggleTheme);
  setTheme(root.getAttribute("data-theme") || "dark");

  // ---------- Fullscreen ----------

  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (root.requestFullscreen) root.requestFullscreen();
  }
  fullBtn.addEventListener("click", toggleFullscreen);

  // ---------- Toolbar: show on mouse movement, hide when idle ----------

  var idleTimer = null;
  function wake() {
    document.body.classList.add("show-chrome");
    document.body.classList.remove("idle");
    clearTimeout(idleTimer);
    idleTimer = setTimeout(function () {
      document.body.classList.remove("show-chrome");
      if (document.fullscreenElement) document.body.classList.add("idle");
    }, 2500);
  }
  document.addEventListener("mousemove", wake);

  // ---------- Code blocks: header with filename + copy button ----------

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy") ? resolve() : reject(); } catch (e) { reject(e); }
      ta.remove();
    });
  }

  document.querySelectorAll(".code").forEach(function (block) {
    var code = block.querySelector("code");
    if (!code) return;
    var lang = (/language-(\w+)/.exec(code.className) || [])[1] || "";
    var head = document.createElement("div");
    head.className = "code-head";
    var label = document.createElement("span");
    if (block.dataset.file) {
      label.className = "file";
      label.textContent = block.dataset.file;
    } else {
      label.className = "lang";
      label.textContent = lang === "diff" ? "diff" : lang;
    }
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy-btn";
    btn.textContent = "Copy";
    btn.addEventListener("click", function () {
      copyText(code.textContent).then(function () {
        btn.textContent = "Copied ✓";
        btn.classList.add("is-done");
      }, function () {
        btn.textContent = "Copy failed";
      }).then(function () {
        setTimeout(function () { btn.textContent = "Copy"; btn.classList.remove("is-done"); }, 1800);
      });
    });
    head.append(label, btn);
    block.insertBefore(head, block.firstChild);
  });

  // ---------- Images: aspect ratio for CSS sizing, click to zoom ----------

  document.querySelectorAll(".shot img").forEach(function (img) {
    function setSize(w, h) {
      if (!w || !h) return;
      img.style.setProperty("--ar", (w / h).toFixed(4));
      img.style.setProperty("--nw", w + "px");
    }
    var w = parseInt(img.getAttribute("width"), 10);
    var h = parseInt(img.getAttribute("height"), 10);
    if (w && h) setSize(w, h);
    else if (img.complete) setSize(img.naturalWidth, img.naturalHeight);
    else img.addEventListener("load", function () { setSize(img.naturalWidth, img.naturalHeight); });

    img.addEventListener("click", function () {
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt;
      lightbox.hidden = false;
    });
  });
  lightbox.addEventListener("click", function () { lightbox.hidden = true; });

  // ---------- Keyboard (also covers presentation clickers: PageUp/PageDown) ----------

  document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;

    if (e.key === "Escape") {
      if (!lightbox.hidden) { lightbox.hidden = true; return; }
      if (!panel.hidden) { setMenu(false); menuBtn.focus(); return; }
    }
    if (!lightbox.hidden) { lightbox.hidden = true; }

    switch (e.key) {
      case "t": case "T": toggleTheme(); return;
      case "m": case "M": case "o": case "O": setMenu(panel.hidden); return;
    }
    if (docMode) return;

    switch (e.key) {
      case "f": case "F": toggleFullscreen(); return;
      case "g": case "G": e.preventDefault(); wake(); editCounter(); return;
    }
    if (!panel.hidden) return; // let the menu keep arrow keys / Enter for itself

    switch (e.key) {
      case "ArrowRight": case "ArrowDown": case "PageDown": case "n": case "N": case "l": case "j":
        e.preventDefault(); show(index + 1); break;
      case " ":
        e.preventDefault(); show(index + (e.shiftKey ? -1 : 1)); break;
      case "ArrowLeft": case "ArrowUp": case "PageUp": case "p": case "P": case "h": case "k": case "Backspace":
        e.preventDefault(); show(index - 1); break;
      case "Home": e.preventDefault(); show(0); break;
      case "End": e.preventDefault(); show(total - 1); break;
    }
  });

  prevBtn.addEventListener("click", function () { show(index - 1); });
  nextBtn.addEventListener("click", function () { show(index + 1); });

  // ---------- Touch: swipe left/right ----------

  var touchX = null, touchY = null;
  document.addEventListener("touchstart", function (e) {
    if (e.touches.length !== 1) { touchX = null; return; }
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;
  }, { passive: true });
  document.addEventListener("touchend", function (e) {
    if (touchX === null || docMode) return;
    var dx = e.changedTouches[0].clientX - touchX;
    var dy = e.changedTouches[0].clientY - touchY;
    touchX = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) show(index + (dx < 0 ? 1 : -1));
  });

  // ---------- Deep links (#12 or #section-id) ----------

  window.addEventListener("hashchange", function () {
    if (docMode) return;
    show(indexFromHash());
  });

  // ---------- Bootstrap ----------

  layout();
  slides.forEach(function (s) { s.classList.remove("is-active"); });
  if (docMode) {
    // Document mode keeps the visitor's hash and scrolls to the slide it names.
    show(indexFromHash(), { keepHash: true });
    if (/^#\d+$/.test(window.location.hash)) slides[index].scrollIntoView();
  } else {
    show(indexFromHash());
  }
})();
