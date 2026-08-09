/* Minimal ES | EN switch for the Off-Campus and Dual Diploma landings.
   Injected after hydration into its own node; it touches nothing else on the page. */
(function () {
  "use strict";
  var PAIRS = [
    { es: "/off-campus/", en: "/off-campus/en/" },
    { es: "/dual-diploma/", en: "/dual-diploma/en/" },
    { es: "/privacidad/", en: "/privacidad/en/" },
    { es: "/cookies/", en: "/cookies/en/" },
    { es: "/aviso-legal/", en: "/aviso-legal/en/" },
    { es: "/terminos/", en: "/terminos/en/" }
  ];
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }
  function keepApplying(fn) {
    var tries = 0;
    var timer = setInterval(function () {
      tries += 1;
      try { fn(); } catch (e) {}
      if (tries > 20) clearInterval(timer);
    }, 400);
    try { fn(); } catch (e) {}
  }
  ready(function () { keepApplying(mount); });
  function mount() {
    var path = location.pathname.replace(/\/?$/, "/");
    var pair = null;
    for (var i = 0; i < PAIRS.length; i++) {
      if (path === PAIRS[i].es || path === PAIRS[i].en) { pair = PAIRS[i]; break; }
    }
    if (!pair) return;
    var isEn = path === pair.en;
    // Next.js re-applies the Spanish <html lang> from its payload on hydration.
    if (isEn && document.documentElement.lang !== "en") document.documentElement.lang = "en";
    if (document.getElementById("chanakLangSwitch")) return;
    var box = document.createElement("div");
    box.id = "chanakLangSwitch";
    box.setAttribute("role", "navigation");
    box.setAttribute("aria-label", "Language");
    box.style.cssText = "position:fixed;top:14px;right:16px;z-index:2147483000;display:flex;"
      + "align-items:center;gap:6px;background:rgba(14,37,73,.92);border:1px solid rgba(255,255,255,.28);"
      + "border-radius:50px;padding:5px 12px;font-family:DM Sans,sans-serif;font-size:12px;"
      + "font-weight:700;letter-spacing:.5px;box-shadow:0 6px 18px rgba(8,30,60,.25)";
    function link(label, href, active) {
      return '<a href="' + href + '" hreflang="' + (label === "ES" ? "es" : "en") + '" style="text-decoration:none;'
        + 'color:' + (active ? "#FFD166" : "rgba(255,255,255,.72)") + '">' + label + "</a>";
    }
    box.innerHTML = link("ES", pair.es, !isEn)
      + '<span style="color:rgba(255,255,255,.35)">|</span>'
      + link("EN", pair.en, isEn);
    document.body.appendChild(box);
  }
})();
