/* Runtime safety layer for the English landings (/off-campus/en/, /dual-diploma/en/).
   Identical logic to chanak-overrides.js; matchers accept English wording and the
   injected UI is in English. */
(function () {
  "use strict";

  var cfg = window.CHANAK_CONFIG || {};
  var MATRICULA = cfg.matriculaUrl || "https://sis.chanakacademy.org/matricula";
  var path = location.pathname;

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  function inject3dStyles() {
    if (document.getElementById("chanak3dStyles")) return;
    var style = document.createElement("style");
    style.id = "chanak3dStyles";
    style.textContent = `
      /* 3D GLASSMORPHISM & CARD ELEVATION OVERRIDES */
      form, .aud-card, .tcard, .pc, article, div[style*="border-radius:18px"], div[style*="border-radius:16px"], div[style*="border-radius:14px"] {
        transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease !important;
      }
      form {
        background: rgba(255, 255, 255, 0.95) !important;
        backdrop-filter: blur(20px) !important;
        border: 1.5px solid rgba(255, 255, 255, 0.8) !important;
        box-shadow: 0 24px 64px rgba(12, 45, 72, 0.22), 0 0 0 1px rgba(27, 159, 170, 0.15) !important;
      }
      input[type="text"], input[type="tel"], input[type="email"], select {
        transition: all 0.25s ease !important;
        border-radius: 12px !important;
      }
      input[type="text"]:focus, input[type="tel"]:focus, input[type="email"]:focus, select:focus {
        border-color: #1b9faa !important;
        box-shadow: 0 0 16px rgba(27, 159, 170, 0.3), 0 4px 12px rgba(12, 45, 72, 0.08) !important;
        transform: translateY(-1px) !important;
      }
      button[type="submit"], .btn-t, .btn-gold {
        position: relative !important;
        overflow: hidden !important;
        box-shadow: 0 8px 24px rgba(27, 159, 170, 0.25) !important;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
      }
      button[type="submit"]:hover, .btn-t:hover, .btn-gold:hover {
        transform: translateY(-3px) scale(1.02) !important;
        box-shadow: 0 14px 36px rgba(27, 159, 170, 0.4) !important;
      }
      /* HEADER CLIPPING & OVERLAP FIXES */
      .logo-sub {
        white-space: nowrap !important;
      }
      @media (max-width: 1280px) {
        .logo-sub { display: none !important; }
      }
      /* ACCORDION & SCROLL ANIMATIONS */
      .faq-item, details {
        transition: all 0.3s ease !important;
        border-radius: 12px !important;
      }
      .faq-item:hover, details:hover {
        border-color: #1b9faa !important;
        box-shadow: 0 8px 24px rgba(12, 45, 72, 0.08) !important;
      }
      .fi {
        transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) !important;
      }
      .fi.v {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
  }

  function init3dTilt() {
    var cards = document.querySelectorAll(".aud-card, .tcard, .pc, article, div[style*='border-radius:18px']");
    cards.forEach(function (card) {
      if (card.dataset.tiltInit) return;
      card.dataset.tiltInit = "1";
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = ((y - centerY) / centerY) * -4;
        var rotateY = ((x - centerX) / centerX) * 4;
        card.style.transform = "perspective(1000px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) translateY(-4px)";
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
      });
    });
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
        if (text.indexOf("pagar") > -1 || text.indexOf("matric") > -1 || text.indexOf("checkout") > -1
          || text.indexOf("pay") > -1 || text.indexOf("enroll") > -1) {
          anchor.textContent = "Complete your details and pay";
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
        && (text.indexOf("recibir dossier") > -1 || text.indexOf("solicitar informacion") > -1
          || text.indexOf("receive information dossier") > -1 || text.indexOf("request information") > -1)) {
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
    location.href = buildMatricula(inferProgram(button, ""), "button-guard");
  }, true);

  function stickyBar(program) {
    if (document.getElementById("chanakSticky")) return;
    var bar = document.createElement("div");
    bar.id = "chanakSticky";
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", "Enrollment 2026-27");
    bar.style.cssText = "position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#0c2d48;color:#fff;display:flex;align-items:center;justify-content:center;gap:14px;padding:10px 14px;font-family:DM Sans,sans-serif;font-size:14px;box-shadow:0 -6px 24px rgba(0,0,0,.25);flex-wrap:wrap;text-align:center";
    bar.innerHTML = '<span style="font-weight:600">Enrollment 2026-27 open · SIS reference before payment</span>'
      + '<a href="' + buildMatricula(program, "sticky-landing") + '" style="background:#e8a020;color:#fff;text-decoration:none;border-radius:50px;padding:8px 18px;font-weight:700;white-space:nowrap">Start enrollment →</a>';
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
        tag.textContent = "Testimonial received via WhatsApp";
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
      '<h2 style="font-family:Playfair Display,Georgia,serif;font-size:clamp(24px,4vw,34px);margin:0 0 10px">Ready to begin?</h2>'
      + '<p style="color:#cfdde9;font-size:15px;max-width:640px;margin:0 auto 22px;line-height:1.6">Enrollment 2026-27 open · details and SIS reference before payment · FLDOE #134620</p>'
      + '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">'
      + '<button type="button" id="chanakCtaOrienta" style="background:transparent;color:#fff;border:2px solid rgba(255,255,255,.5);border-radius:50px;padding:12px 26px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit">Request guidance</button>'
      + '<a href="' + buildMatricula(program, "cta-final") + '" style="background:#e8a020;color:#fff;text-decoration:none;border-radius:50px;padding:12px 26px;font-weight:700;font-size:15px">Start enrollment →</a>'
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
    box.innerHTML = "You may also be interested in: " + items.map(function (item) {
      return '<a href="' + item[0] + '" style="color:#1a5f8a;font-weight:600;text-decoration:underline">' + item[1] + "</a>";
    }).join(" · ");
    document.body.appendChild(box);
  }

  document.addEventListener("click", function (event) {
    var anchor = event.target.closest ? event.target.closest("a") : null;
    if (!anchor) return;
    var href = anchor.href || "";
    if (href.indexOf("wa.me") > -1) {
      if (typeof window.gtag === "function") window.gtag("event", "whatsapp_click", { event_category: "contact", event_label: location.pathname });
      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead", { content_name: "WhatsApp Click", content_category: location.pathname });
        window.fbq("track", "Schedule", { content_name: "WhatsApp Schedule", content_category: location.pathname });
      }
    }
    else if (href.indexOf("sis.chanakacademy.org/matricula") > -1) {
      if (typeof window.gtag === "function") window.gtag("event", "matricula_click", { event_category: "enrollment", event_label: location.pathname });
      if (typeof window.fbq === "function") window.fbq("track", "InitiateCheckout", { content_name: "Matricula Click" });
    }
    else if (href.indexOf("/assets/dossiers/") > -1) {
      if (typeof window.gtag === "function") window.gtag("event", "dossier_download", { event_category: "content", event_label: location.pathname });
      if (typeof window.fbq === "function") window.fbq("track", "Lead", { content_name: "Dossier Download" });
    }
  }, true);

  function removeOffCampusPricingSection() {
    var titles = document.querySelectorAll("h2, p, span, div, section, a");
    titles.forEach(function (el) {
      if (!el || !el.textContent) return;
      var txt = el.textContent;
      if (txt.indexOf("INVERSIÓN OFF-CAMPUS") > -1 || txt.indexOf("Precios claros para planificar el año") > -1 || txt.indexOf("PLAN DE PAGO 2026-27") > -1 || txt.indexOf("¿Cuánto cuesta exactamente?") > -1
        || txt.indexOf("OFF-CAMPUS INVESTMENT") > -1 || txt.indexOf("Clear prices to plan the year") > -1 || txt.indexOf("PAYMENT PLAN 2026-27") > -1 || txt.indexOf("How much does it cost exactly?") > -1) {
        var section = el.closest ? (el.closest("section") || el.closest("div[style*='padding']") || el.closest(".pricing-card") || el.parentElement) : null;
        if (section && section.tagName !== "BODY") {
          section.style.display = "none";
          section.style.visibility = "hidden";
          section.style.height = "0px";
          section.style.overflow = "hidden";
        }
      }
    });
  }

  function updateDualDiplomaConvalidationCTA() {
    var anchors = document.querySelectorAll("a, button");
    anchors.forEach(function (a) {
      var text = plain(a.textContent || "");
      if (text.indexOf("35") > -1 || text.indexOf("evaluacion") > -1 || text.indexOf("diagnostica") > -1 || text.indexOf("hacer el diagnostico") > -1
        || text.indexOf("evaluation") > -1 || text.indexOf("diagnostic") > -1 || text.indexOf("take the diagnostic") > -1) {
        a.textContent = "Book a Free Orientation Call 📲";
        a.href = "https://wa.me/34624703272?text=Hello,%20I%20would%20like%20to%20book%20an%20orientation%20call%20for%20the%20Dual%20Diploma";
        a.style.background = "linear-gradient(135deg, #1b9faa, #1a5f8a)";
        a.style.color = "#ffffff";
        a.style.fontWeight = "800";
        a.style.boxShadow = "0 10px 30px rgba(27, 159, 170, 0.35)";
      }
    });
  }

  ready(function () {
    inject3dStyles();
    init3dTilt();
    setInterval(init3dTilt, 1500);

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
        removeOffCampusPricingSection();
        internalLinks([
          ["/dual-diploma/en/", "Dual qualification: American Dual Diploma"],
          ["/diagnostico/", "Homeschool level test"]
        ]);
      });
    } else if (path.indexOf("/dual-diploma") === 0) {
      keepApplying(function () {
        rewriteEnrollmentLinks();
        stickyBar("dual-diploma");
        updateDualDiplomaConvalidationCTA();
        ctaFinal("dual-diploma",
          '<p style="margin:18px 0 0;font-size:13.5px;color:#cfdde9">Would you like to review credit recognition? '
          + '<a href="https://wa.me/34624703272?text=Hello,%20I%20would%20like%20guidance%20on%20credit%20recognition" style="color:#e8a020;font-weight:700;text-decoration:underline">Book a Credit Recognition Call →</a></p>');
        internalLinks([
          ["/off-campus/en/", "American online homeschool"],
          ["/diagnostico/", "Academic level assessment"]
        ]);
      });
    } else {
      keepApplying(rewriteEnrollmentLinks);
    }
  });
})();
