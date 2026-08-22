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
      /* BRAND RECOLOR: navy + teal. See chanak-overrides.js for why the
         rgb() form (not the original hex) is what actually needs to be
         matched — React re-serializes inline colors that way once it
         re-renders after hydration. */
      [style*="background: rgb(26, 58, 107)"], [style*="background:#1A3A6B"],
      [style*="background: rgb(19, 42, 79)"], [style*="background:#132A4F"],
      [style*="background: rgb(14, 37, 73)"], [style*="background:#0E2549"],
      [style*="background: rgb(14, 58, 92)"], [style*="background:#0E3A5C"] {
        background: #0c2d48 !important;
      }
      [style*="border-color: rgb(26, 58, 107)"], [style*="border-color:#1A3A6B"] { border-color: #0c2d48 !important; }
      [style*="background: rgb(58, 125, 44)"], [style*="background:#3A7D2C"],
      [style*="background: rgb(125, 207, 71)"], [style*="background:#7DCF47"],
      [style*="background: rgb(217, 184, 111)"], [style*="background:#D9B86F"],
      [style*="background: rgb(184, 150, 46)"], [style*="background:#B8962E"] {
        background: #1b9faa !important;
      }
      [style*="color: rgb(58, 125, 44)"], [style*="color:#3A7D2C"],
      [style*="color: rgb(125, 207, 71)"], [style*="color:#7DCF47"],
      [style*="color: rgb(141, 212, 106)"], [style*="color:#8DD46A"],
      [style*="color: rgb(255, 184, 0)"], [style*="color:#FFB800"] {
        color: #1b9faa !important;
      }
      [style*="background: rgb(32, 69, 125)"], [style*="background:#20457D"] {
        background: #1a5f8a !important;
      }
      [style*="color: rgb(255, 209, 102)"], [style*="color:#FFD166"] { color: #6fd9d1 !important; }
      [style*="border-color: rgb(217, 184, 111)"], [style*="border-color:#D9B86F"] { border-color: #1b9faa !important; }
      [style*="rgba(58, 125, 44"], [style*="rgba(58,125,44"] { background: radial-gradient(circle, rgba(27,159,170,.13) 0%, transparent 70%) !important; }
      [style*="rgba(26, 58, 107"], [style*="rgba(26,58,107"] { background: rgba(12,45,72,.3) !important; }
    `;
    document.head.appendChild(style);
  }

  /* See fixLegalText() in chanak-overrides.js for why this runs via JS
     (with keepApplying) instead of editing the exported HTML directly. */
  var LEGAL_TEXT_FIXES = [
    [": structure, support and a recognized diploma.", ": structure, support and an American high school diploma (FLDOE #134620)."],
    ["It guarantees there are no learning gaps.", "We detect the areas that need reinforcement and work on them before moving forward."],
    ["You can review them in the pricing section of this page. The information dossier expands on the admission process and the academic path.", "You can review them in the Off-Campus information dossier, which also expands on the admission process and the academic path."]
  ];
  function fixLegalText() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      for (var i = 0; i < LEGAL_TEXT_FIXES.length; i++) {
        var pair = LEGAL_TEXT_FIXES[i];
        if (node.data.indexOf(pair[0]) > -1) {
          node.data = node.data.replace(pair[0], pair[1]);
        }
      }
    }
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
      + '<a href="' + buildMatricula(program, "sticky-landing") + '" style="background:#1b9faa;color:#fff;text-decoration:none;border-radius:50px;padding:8px 18px;font-weight:700;white-space:nowrap">Start enrollment →</a>';
    document.body.appendChild(bar);
    document.body.style.paddingBottom = "64px";
  }

  function testimonialBadges() {
    document.querySelectorAll("div").forEach(function (div) {
      if (div.textContent === "★★★★★" && div.parentElement && !div.parentElement.dataset.chanakWa) {
        var card = div.parentElement;
        card.dataset.chanakWa = "1";
        var tag = document.createElement("div");
        tag.style.cssText = "font-size:11px;color:#1b9faa;font-weight:600;margin-top:12px;padding-top:10px;border-top:1px dashed #D1D5E8";
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
      + '<a href="' + buildMatricula(program, "cta-final") + '" style="background:#1b9faa;color:#fff;text-decoration:none;border-radius:50px;padding:12px 26px;font-weight:700;font-size:15px">Start enrollment →</a>'
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

  /* EUR/USD pricing note for Dual Diploma. 2026-27 figures (confirmed by
     Mariela 2026-08-22): €35 diagnostic, €210 enrollment, €110/month,
     from €1,310/year in 3rd ESO. USD reference: ECB rate 1 EUR=1.1404,
     rounded up — same method used across the site. Keep in sync with
     the Spanish version in chanak-overrides.js if these figures change. */
  function dualDiplomaPricingNote() {
    if (document.getElementById("chanakPricingNote")) return;
    var heading = null;
    document.querySelectorAll("h2").forEach(function (h) {
      if (plain(h.textContent) === "pricing") heading = h;
    });
    if (!heading || !heading.parentElement) return;
    var note = document.createElement("p");
    note.id = "chanakPricingNote";
    note.style.cssText = "margin-top:14px;font-size:15px;line-height:1.6;color:#2A4262;max-width:900px;background:#f4fbfb;border:1px solid #cdeeee;border-radius:10px;padding:12px 16px";
    note.innerHTML = "<strong>Before enrolling:</strong> academic diagnostic €35 (approx. USD $40) — a separate, prior step, not included in enrollment. "
      + "<strong>Once the path is confirmed:</strong> enrollment fee €210 (approx. USD $240) · monthly from €110/month (approx. USD $126) · "
      + "<strong>from €1,310/year</strong> in 3rd ESO (approx. USD $1,494). "
      + "USD reference for families in Panama and Latin America, ECB rate 1 EUR = 1.1404 USD, rounded up.";
    heading.parentElement.insertBefore(note, heading.nextSibling);
  }

  /* Reinforces "does not have to change schools" as its own body sentence
     (previously it only lived inside the H2), right under the hero subtitle. */
  function dualDiplomaReassurance() {
    if (document.getElementById("chanakReassurance")) return;
    var h2 = document.querySelector("h2");
    if (!h2 || !h2.parentElement) return;
    var p = document.createElement("p");
    p.id = "chanakReassurance";
    p.style.cssText = "margin-top:10px;font-size:16px;font-weight:700;color:#fff";
    p.textContent = "Your child does not have to change schools.";
    h2.parentElement.insertBefore(p, h2.nextSibling);
  }

  /* "What this is NOT" — inserted right after the "What is included" section
     (found via its H2), matching the same card markup already on the page. */
  function dualDiplomaNotList() {
    if (document.getElementById("chanakNotList")) return;
    var heading = null;
    document.querySelectorAll("h2").forEach(function (h) {
      if (plain(h.textContent) === "what is included") heading = h;
    });
    if (!heading) return;
    var section = heading.closest("section");
    if (!section || !section.parentElement) return;
    var box = document.createElement("section");
    box.id = "chanakNotList";
    box.style.cssText = "max-width:1100px;margin:0 auto;padding:24px 5% 64px;font-family:DM Sans,sans-serif";
    box.innerHTML = '<h2 style="font-family:Playfair Display,Georgia,serif;font-size:32px;color:#0c2d48;margin:0 0 14px">What the Dual Diploma is NOT</h2>'
      + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px">'
      + ["Does not replace or change the student's current school",
         'Not a basic English course',
         'Not the same as the Off-Campus program',
         'Does not by itself guarantee admission to any university',
         'Does not imply automatic homologation or equivalency in any country'
        ].map(function (t) { return '<div style="background:#f4f7fa;border-radius:10px;padding:14px 16px;font-size:14px;color:#3a5a7a">✕ ' + t + '</div>'; }).join('')
      + '</div>';
    section.parentElement.insertBefore(box, section.nextSibling);
  }

  /* Hero photo for Dual Diploma / Off-Campus: these compiled landings had
     no real photography (only small logo/badge images). Inserted as a new
     section right after the hero (found via <nav>, always the first
     element), never inside the React-hydrated tree. */
  function heroPhoto(imgSrc, altText) {
    if (document.getElementById("chanakHeroPhoto")) return;
    // off-campus has a <nav> immediately before its (very tall) hero
    // wrapper, so the photo goes between them; dual-diploma has no <nav>
    // at all, so it falls back to inserting right before <main>, which
    // is the first real content on that page.
    var nav = document.querySelector("nav");
    var anchor = nav ? nav.nextElementSibling : document.querySelector("main");
    if (!anchor || !anchor.parentElement) return;
    var section = document.createElement("div");
    section.id = "chanakHeroPhoto";
    section.style.cssText = "max-height:380px;overflow:hidden;line-height:0";
    section.innerHTML = '<img src="' + imgSrc + '" alt="' + altText + '" style="width:100%;height:380px;object-fit:cover;display:block" />';
    anchor.parentElement.insertBefore(section, anchor);
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
        heroPhoto("/assets/img/hero-offcampus.webp", "Homeschool student studying with Off-Campus");
        fixLegalText();
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
        heroPhoto("/assets/img/hero-dualdiploma.webp", "Student following the U.S. Dual Diploma pathway");
        stickyBar("dual-diploma");
        updateDualDiplomaConvalidationCTA();
        dualDiplomaPricingNote();
        dualDiplomaReassurance();
        dualDiplomaNotList();
        ctaFinal("dual-diploma",
          '<p style="margin:18px 0 0;font-size:13.5px;color:#cfdde9">Would you like to review credit recognition? '
          + '<a href="https://wa.me/34624703272?text=Hello,%20I%20would%20like%20guidance%20on%20credit%20recognition" style="color:#6fd9d1;font-weight:700;text-decoration:underline">Book a Credit Recognition Call →</a></p>');
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
