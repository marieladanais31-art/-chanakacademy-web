// Central config and enrollment safety guards for chanakacademy.org (EN pages).
// Identical logic to site-config.js; text matchers also accept English wording.
(function () {
  "use strict";

  var SIS_MATRICULA_URL = "https://sis.chanakacademy.org/matricula";

  window.CHANAK_CONFIG = Object.freeze({
    whatsappNumber: "",
    whatsappLink: "",
    instagramUrl: "https://www.instagram.com/chanakinternationalacademy/",
    facebookUrl: "https://www.facebook.com/profile.php?id=61585911365975",
    portalUrl: "https://portal.chanakacademy.org",
    matriculaUrl: SIS_MATRICULA_URL,
    sisUrl: "https://sis.chanakacademy.org",
    foundationUrl: "https://foundation.chanakacademy.org",
    stripe: {
      mexico: "https://buy.stripe.com/3cIcN6c3v8lfcjK60267S0k",
      colombia: "https://buy.stripe.com/aFa5kE1oR1WRgA060267S0l",
      usa: "https://buy.stripe.com/aFa7sMgjLcBvfvW2NQ67S0c",
      panama: "https://buy.stripe.com/aFa7sMgjLcBvfvW2NQ67S0c",
      offCampus: "https://buy.stripe.com/aFa7sMgjLcBvfvW2NQ67S0c",
      diagnosticoDualDiploma: "https://buy.stripe.com/eVq28sffHfNHgA0coq67S0g", // 35€
      dualDiploma: "https://buy.stripe.com/aFa4gA5F7fNH6Zqbkm67S07", // 210€
      evaluacionDiagnostica: "https://buy.stripe.com/6oU00k5F79pj1F660267S03" // 50€
    },
    stripeDualDiploma: {
      evaluacionDiagnostica: "https://buy.stripe.com/eVq28sffHfNHgA0coq67S0g", // 35€ · step 1
      matricula: "https://buy.stripe.com/aFa4gA5F7fNH6Zqbkm67S07"              // 210€ · step 2
    },
    banner: {
      earlyUntil: "2026-07-31",
      lateUntil: "2026-09-04"
    }
  });

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  function plain(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function inferProgram(element, href) {
    var haystack = plain([
      location.pathname,
      href || "",
      element ? element.textContent : ""
    ].join(" "));

    if (haystack.indexOf("dual") > -1) return "dual-diploma";
    if (haystack.indexOf("off-campus") > -1 || haystack.indexOf("off campus") > -1 || haystack.indexOf("homeschool") > -1) return "off-campus";
    return "general";
  }

  function buildSisUrl(program, src, sourceHref) {
    var target = new URL(SIS_MATRICULA_URL);
    if (sourceHref) {
      try {
        var source = new URL(sourceHref, location.origin);
        source.searchParams.forEach(function (value, key) {
          target.searchParams.set(key, value);
        });
      } catch (error) {}
    }
    if (program && !target.searchParams.has("programa")) target.searchParams.set("programa", program);
    if (src && !target.searchParams.has("src")) target.searchParams.set("src", src);
    return target.toString();
  }

  function isDiagnosticPayment(anchor, href) {
    var text = plain([
      location.pathname,
      href || "",
      anchor ? anchor.textContent : ""
    ].join(" "));

    return text.indexOf("diagnostico") > -1
      || text.indexOf("diagnostic") > -1
      || text.indexOf("evaluacion") > -1
      || text.indexOf("evaluation") > -1
      || text.indexOf("test de nivel") > -1;
  }

  function isEnrollmentStripe(anchor, href) {
    return href.indexOf("https://buy.stripe.com/") === 0 && !isDiagnosticPayment(anchor, href);
  }

  function cleanTarget(anchor) {
    anchor.removeAttribute("target");
    anchor.removeAttribute("rel");
  }

  function rewriteAnchor(anchor) {
    var rawHref = anchor.getAttribute("href") || "";
    var href = anchor.href || rawHref;
    var text = plain(anchor.textContent);

    if (!rawHref) return;

    if (isEnrollmentStripe(anchor, href)) {
      anchor.href = buildSisUrl(inferProgram(anchor, href), "stripe-guard", href);
      cleanTarget(anchor);
      anchor.dataset.chanakFlow = "sis-before-payment";
      if (text.indexOf("pagar") > -1 || text.indexOf("matric") > -1 || text.indexOf("checkout") > -1
        || text.indexOf("pay") > -1 || text.indexOf("enroll") > -1) {
        anchor.textContent = "Complete your details and pay";
      }
      return;
    }

    if (/^\/matricula\/?/i.test(rawHref) || /^https:\/\/www\.chanakacademy\.org\/matricula\/?/i.test(href)) {
      anchor.href = buildSisUrl(inferProgram(anchor, rawHref), "web-link", rawHref);
      cleanTarget(anchor);
      anchor.dataset.chanakFlow = "sis-enrollment";
      return;
    }

    if ((href.indexOf("/assets/dossiers/") > -1 || href.indexOf("drive.google.com") > -1)
      && (text.indexOf("recibir dossier") > -1 || text.indexOf("solicitar informacion") > -1
        || text.indexOf("receive information dossier") > -1 || text.indexOf("request information") > -1)) {
      anchor.href = "#solicitud";
      cleanTarget(anchor);
      anchor.dataset.chanakFlow = "lead-before-dossier";
    }
  }

  function rewriteButtons() {
    document.querySelectorAll("button").forEach(function (button) {
      var text = plain(button.textContent);
      if (text.indexOf("matricularme ahora") > -1 || text.indexOf("ya decidi") > -1
        || text.indexOf("enroll now") > -1 || text.indexOf("i have decided") > -1) {
        button.dataset.chanakFlow = "open-form-before-payment";
      }
    });
  }

  function isEnrollmentButton(button) {
    var text = plain(button ? button.textContent : "");
    if (!text) return false;
    return text.indexOf("ya decidi") > -1
      || text.indexOf("matricularme") > -1
      || text.indexOf("matricularme y pagar") > -1
      || text.indexOf("datos y pago") > -1
      || text.indexOf("iniciar matricula") > -1
      || text.indexOf("i have decided") > -1
      || text.indexOf("enroll and pay") > -1
      || text.indexOf("enroll now") > -1
      || text.indexOf("start off campus enrollment") > -1
      || text.indexOf("start dual diploma enrollment") > -1
      || text.indexOf("start enrollment") > -1;
  }

  document.addEventListener("click", function (event) {
    var button = event.target.closest && event.target.closest("button");
    if (!button || !isEnrollmentButton(button)) return;
    event.preventDefault();
    event.stopPropagation();
    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
    location.href = buildSisUrl(inferProgram(button, ""), "button-guard");
  }, true);


  /* -------------------------------------------------------------------------
   * Retirada de teléfonos y WhatsApp (2026-09-18, por indicación de dirección).
   * Se ejecuta en bucle junto a los guardas de matrícula porque las landings
   * compiladas de Next rehidratan y vuelven a pintar nodos tras la carga.
   * ---------------------------------------------------------------------- */
  var PHONE_RE = /(\+?\s?34[\s.\-]?6\s?24[\s.\-]?70[\s.\-]?32[\s.\-]?72)|(\+34[\s.\-]?\d[\d\s.\-]{7,})/g;

  function isWhatsappNode(el) {
    var href = (el.getAttribute && (el.getAttribute('href') || '')) || '';
    if (/wa\.me|api\.whatsapp\.com|web\.whatsapp\.com|whatsapp:/i.test(href)) return true;
    if (el.getAttribute && el.getAttribute('data-config-href') === 'whatsappLink') return true;
    return false;
  }

  function purgeContacts(root) {
    var scope = root || document;

    // 1. Enlaces y botones de WhatsApp: se eliminan del DOM.
    scope.querySelectorAll('a[href],[data-config-href]').forEach(function (el) {
      if (!isWhatsappNode(el)) return;
      var box = el.closest('.wa,.whatsapp,.whatsapp-float,.btn-whatsapp,[class*="whatsapp"]') || el;
      if (box && box.parentNode) box.parentNode.removeChild(box);
    });

    // 2. Enlaces telefónicos.
    scope.querySelectorAll('a[href^="tel:"]').forEach(function (el) {
      if (el.parentNode) el.parentNode.removeChild(el);
    });

    // 3. Números sueltos que hayan quedado en texto.
    var walker = document.createTreeWalker(scope.body || scope, NodeFilter.SHOW_TEXT, null);
    var node, dead = [];
    while ((node = walker.nextNode())) {
      if (node.nodeValue && PHONE_RE.test(node.nodeValue)) {
        PHONE_RE.lastIndex = 0;
        node.nodeValue = node.nodeValue.replace(PHONE_RE, '').replace(/\s{2,}/g, ' ').trim();
        if (!node.nodeValue) dead.push(node);
      }
      PHONE_RE.lastIndex = 0;
    }
    dead.forEach(function (n) { if (n.parentNode) n.parentNode.removeChild(n); });
  }

  window.chanakPurgeContacts = purgeContacts;


  /* Guarda de desbordamiento horizontal en móvil (2026-09-18). Se aplica desde
     aquí porque site-config.js lo cargan todas las páginas del sitio. */
  function overflowGuard() {
    if (document.getElementById('chanak-overflow-guard')) return;
    var st = document.createElement('style');
    st.id = 'chanak-overflow-guard';
    st.textContent = [
      'html,body{max-width:100%;overflow-x:hidden}',
      'img,svg,video,iframe{max-width:100%}',
      '@media(max-width:640px){table{display:block;overflow-x:auto;-webkit-overflow-scrolling:touch}}'
    ].join('\n');
    (document.head || document.documentElement).appendChild(st);
  }

  function applyFlowGuards() {
    document.querySelectorAll("a[href]").forEach(rewriteAnchor);
    rewriteButtons();
    purgeContacts();
    overflowGuard();
  }

  if (location.hostname === "www.chanakacademy.org" && /^\/matricula\/?$/i.test(location.pathname)) {
    location.replace(buildSisUrl("general", "legacy-matricula", location.href));
    return;
  }

  ready(function () {
    var tries = 0;
    applyFlowGuards();
    var timer = setInterval(function () {
      tries += 1;
      applyFlowGuards();
      if (tries >= 16) clearInterval(timer);
    }, 500);
  });
})();
