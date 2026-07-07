/* Runtime safety layer for exported Next.js landings on Hostinger. */
(function () {
  "use strict";

  var cfg = window.CHANAK_CONFIG || {};
  var MATRICULA = cfg.matriculaUrl || "https://sis.chanakacademy.org/matricula";
  var path = location.pathname;

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

  function keepApplying(fn) {
    var tries = 0;
    var timer = setInterval(function () {
      tries += 1;
      try { fn(); } catch (error) {}
      if (tries > 16) clearInterval(timer);
    }, 500);
    try { fn(); } catch (error) {}
  }

  function inferProgram(element, href) {
    var text = plain([path, href || "", element ? element.textContent : ""].join(" "));
    if (text.indexOf("dual") > -1) return "dual-diploma";
    if (text.indexOf("off-campus") > -1 || text.indexOf("off campus") > -1 || text.indexOf("homeschool") > -1) return "off-campus";
    return "general";
  }

  function buildMatricula(program, src, href) {
    var target = new URL(MATRICULA);
    if (href) {
      try {
        var source = new URL(href, location.origin);
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
    var text = plain([path, href || "", anchor ? anchor.textContent : ""].join(" "));
    return text.indexOf("diagnostico") > -1
      || text.indexOf("diagnostic") > -1
      || text.indexOf("evaluacion") > -1
      || text.indexOf("evaluation") > -1
      || text.indexOf("test de nivel") > -1;
  }

  function isEnrollmentStripe(anchor, href) {
    return href.indexOf("https://buy.stripe.com/") === 0 && !isDiagnosticPayment(anchor, href);
  }

  function cleanAnchor(anchor) {
    anchor.removeAttribute("target");
    anchor.removeAttribute("rel");
  }

  function rewriteEnrollmentLinks() {
    document.querySelectorAll("a[href]").forEach(function (anchor) {
      var raw = anchor.getAttribute("href") || "";
      var href = anchor.href || raw;
      var text = plain(anchor.textContent);

      if (isEnrollmentStripe(anchor, href)) {
        var program = inferProgram(anchor, href);
        anchor.href = buildMatricula(program, "stripe-guard", href);
        cleanAnchor(anchor);
        anchor.dataset.chanakFlow = "sis-before-payment";
        if (text.indexOf("pagar") > -1 || text.indexOf("matric") > -1 || text.indexOf("checkout") > -1) {
          anchor.textContent = "Completar datos y pagar";
        }
        return;
      }

      if (/^\/matricula\/?/i.test(raw) || /^https:\/\/www\.chanakacademy\.org\/matricula\/?/i.test(href)) {
        anchor.href = buildMatricula(inferProgram(anchor, raw), "landing-link", raw);
        cleanAnchor(anchor);
        anchor.dataset.chanakFlow = "sis-enrollment";
        return;
      }

      if ((href.indexOf("/assets/dossiers/") > -1 || href.indexOf("drive.google.com") > -1)
        && (text.indexOf("recibir dossier") > -1 || text.indexOf("solicitar informacion") > -1)) {
        anchor.href = "#solicitud";
        cleanAnchor(anchor);
        anchor.dataset.chanakFlow = "lead-before-dossier";
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
      || text.indexOf("iniciar matricula") > -1;
  }

  document.addEventListener("click", function (event) {
    var button = event.target.closest && event.target.closest("button");
    if (!button || !isEnrollmentButton(button)) return;
    event.preventDefault();
    event.stopPropagation();
    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
    location.href = buildMatricula(inferProgram(button, ""), "button-guard");
  }, true);

  function stickyBar(program) {
    if (document.getElementById("chanakSticky")) return;
    var bar = document.createElement("div");
    bar.id = "chanakSticky";
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", "Matricula 2026-27");
    bar.style.cssText = "position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#0c2d48;color:#fff;display:flex;align-items:center;justify-content:center;gap:14px;padding:10px 14px;font-family:DM Sans,sans-serif;font-size:14px;box-shadow:0 -6px 24px rgba(0,0,0,.25);flex-wrap:wrap;text-align:center";
    bar.innerHTML = '<span style="font-weight:600">Matricula 2026-27 abierta · folio SIS antes del pago</span>'
      + '<a href="' + buildMatricula(program, "sticky-landing") + '" style="background:#e8a020;color:#fff;text-decoration:none;border-radius:50px;padding:8px 18px;font-weight:700;white-space:nowrap">Iniciar matricula →</a>';
    document.body.appendChild(bar);
    document.body.style.paddingBottom = "64px";
  }

  function testimonialBadges() {
    document.querySelectorAll("div").forEach(function (div) {
      if (div.textContent === "★★★★★" && div.parentElement && !div.parentElement.dataset.chanakWa) {
        var card = div.parentElement;
        card.dataset.chanakWa = "1";
        var tag = document.createElement("div");
        tag.style.cssText = "font-size:11px;color:#1f9e4f;font-weight:600;margin-top:12px;padding-top:10px;border-top:1px dashed #D1D5E8";
        tag.textContent = "Testimonio recibido por WhatsApp";
        card.appendChild(tag);
      }
    });
  }

  function ctaFinal(program, extraHtml) {
    if (document.getElementById("chanakCtaFinal")) return;
    var box = document.createElement("section");
    box.id = "chanakCtaFinal";
    box.style.cssText = "background:linear-gradient(155deg,#0c2d48,#1a5f8a);color:#fff;text-align:center;padding:48px 5%;font-family:DM Sans,sans-serif";
    box.innerHTML =
      '<h2 style="font-family:Playfair Display,Georgia,serif;font-size:clamp(24px,4vw,34px);margin:0 0 10px">Listos para comenzar?</h2>'
      + '<p style="color:#cfdde9;font-size:15px;max-width:640px;margin:0 auto 22px;line-height:1.6">Matricula 2026-27 abierta · datos y folio SIS antes del pago · FLDOE #134620</p>'
      + '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">'
      + '<button type="button" id="chanakCtaOrienta" style="background:transparent;color:#fff;border:2px solid rgba(255,255,255,.5);border-radius:50px;padding:12px 26px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit">Solicitar orientacion</button>'
      + '<a href="' + buildMatricula(program, "cta-final") + '" style="background:#e8a020;color:#fff;text-decoration:none;border-radius:50px;padding:12px 26px;font-weight:700;font-size:15px">Iniciar matricula →</a>'
      + "</div>" + (extraHtml || "");
    document.body.appendChild(box);
    var button = document.getElementById("chanakCtaOrienta");
    if (button) {
      button.addEventListener("click", function () {
        var form = document.querySelector("form");
        if (form) form.scrollIntoView({ behavior: "smooth", block: "center" });
        else location.href = "/#dossier";
      });
    }
  }

  function internalLinks(items) {
    if (document.getElementById("chanakXlinks")) return;
    var box = document.createElement("div");
    box.id = "chanakXlinks";
    box.style.cssText = "background:#f4f8fb;border-top:1px solid #d8e6ee;padding:18px 5% 84px;font-family:DM Sans,sans-serif;font-size:13px;color:#5b7a91;text-align:center";
    box.innerHTML = "Tambien te puede interesar: " + items.map(function (item) {
      return '<a href="' + item[0] + '" style="color:#1a5f8a;font-weight:600;text-decoration:underline">' + item[1] + "</a>";
    }).join(" · ");
    document.body.appendChild(box);
  }

  document.addEventListener("click", function (event) {
    var anchor = event.target.closest("a");
    if (!anchor || typeof window.gtag !== "function") return;
    var href = anchor.href || "";
    if (href.indexOf("wa.me") > -1) window.gtag("event", "whatsapp_click", { event_category: "contact", event_label: location.pathname });
    else if (href.indexOf("sis.chanakacademy.org/matricula") > -1) window.gtag("event", "matricula_click", { event_category: "enrollment", event_label: location.pathname });
    else if (href.indexOf("/assets/dossiers/") > -1) window.gtag("event", "dossier_download", { event_category: "content", event_label: location.pathname });
  }, true);

  ready(function () {
    if (path.indexOf("/dual-diploma-panama") === 0) {
      keepApplying(function () {
        rewriteEnrollmentLinks();
        stickyBar("dual-diploma-panama");
      });
      return;
    }

    if (path.indexOf("/off-campus") === 0) {
      keepApplying(function () {
        rewriteEnrollmentLinks();
        stickyBar("off-campus");
        testimonialBadges();
        ctaFinal("off-campus");
        internalLinks([
          ["/dual-diploma/", "Doble titulacion: Dual Diploma americano"],
          ["/diagnostico/", "Test de nivel homeschool"]
        ]);
      });
    } else if (path.indexOf("/dual-diploma") === 0) {
      keepApplying(function () {
        rewriteEnrollmentLinks();
        stickyBar("dual-diploma");
        ctaFinal("dual-diploma",
          '<p style="margin:18px 0 0;font-size:13.5px;color:#cfdde9">Quieres empezar con diagnostico? '
          + '<a href="/diagnostico/?programa=dual-diploma&src=dd-landing" style="color:#e8a020;font-weight:700;text-decoration:underline">Abrir evaluacion diagnostica →</a></p>');
        internalLinks([
          ["/off-campus/", "Colegio americano online homeschool"],
          ["/diagnostico/", "Evaluacion de nivel academico"]
        ]);
      });
    } else {
      keepApplying(rewriteEnrollmentLinks);
    }
  });
})();
