// Central config and enrollment safety guards for chanakacademy.org (EN pages).
// Identical logic to site-config.js; text matchers also accept English wording.
(function () {
  "use strict";

  var SIS_MATRICULA_URL = "https://sis.chanakacademy.org/matricula";

  window.CHANAK_CONFIG = Object.freeze({
    whatsappNumber: "+34 624 70 32 72",
    whatsappLink: "https://wa.me/34624703272?text=Hola,%20quiero%20informaci%C3%B3n%20sobre%20la%20matr%C3%ADcula%202026-27",
    instagramUrl: "https://www.instagram.com/chanakinternationalacademy/",
    facebookUrl: "https://www.facebook.com/profile.php?id=61585911365975",
    portalUrl: "https://portal.chanakacademy.org",
    matriculaUrl: SIS_MATRICULA_URL,
    sisUrl: "https://sis.chanakacademy.org",
    foundationUrl: "https://foundation.chanakacademy.org",
    // Pagos Stripe del Dual Diploma. Flujo obligatorio: 1) evaluación 35€ → 2) matrícula 210€.
    // La matrícula NO se ofrece como pago directo de entrada (se reserva para el paso 2,
    // posterior a la evaluación, conforme al flujo SIS-primero).
    stripeDualDiploma: {
      evaluacionDiagnostica: "https://buy.stripe.com/eVq28sffHfNHgA0coq67S0g", // 35€ · paso 1
      matricula: "https://buy.stripe.com/aFa4gA5F7fNH6Zqbkm67S07"              // 210€ · paso 2
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

  function applyFlowGuards() {
    document.querySelectorAll("a[href]").forEach(rewriteAnchor);
    rewriteButtons();
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
