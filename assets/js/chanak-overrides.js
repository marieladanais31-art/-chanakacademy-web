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
      /* BRAND RECOLOR: navy + teal. React re-renders these Next-exported
         pages after hydration and restores their ORIGINAL inline colors
         — and re-serializes them as "rgb(r, g, b)" (the DOM's canonical
         form), NOT the original hex string, so a hex-based override or a
         one-time HTML edit both get silently ignored/reverted. Matching
         the rgb() form here is what actually survives. Keep in sync with
         the hex→rgb map in the repo's recolor commit if the palette
         changes again: #1A3A6B=rgb(26,58,107) #132A4F=rgb(19,42,79)
         #0E2549=rgb(14,37,73) #0E3A5C=rgb(14,58,92) #3A7D2C=rgb(58,125,44)
         #7DCF47=rgb(125,207,71) #D9B86F=rgb(217,184,111)
         #B8962E=rgb(184,150,46) #FFB800=rgb(255,184,0)
         #FFD166=rgb(255,209,102). */
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

  /* Sustituye frases con lenguaje de reconocimiento no matizado por la
     versión revisada legalmente. React revierte ediciones directas del
     HTML exportado tras la hidratación, así que este reemplazo se aplica
     por JS y se repite (keepApplying) para sobrevivir a esos repintados. */
  var LEGAL_TEXT_FIXES = [
    [": estructura, acompañamiento y diploma reconocido.", ": estructura, acompañamiento y diploma de High School americano (FLDOE #134620)."],
    ["Garantiza que no haya lagunas de aprendizaje.", "Detectamos las áreas que necesitan refuerzo y trabajamos sobre ellas antes de avanzar."]
    /* La entrada que redirigía "sección de precios de esta página" al dossier
       se retiró el 2026-09-19: offCampusPricingSection() ya pone una sección
       de precios real en la página, así que la frase original vuelve a ser
       cierta y no hace falta parchearla. */
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
      + '<a href="' + buildMatricula(program, "sticky-landing") + '" style="background:#1b9faa;color:#fff;text-decoration:none;border-radius:50px;padding:8px 18px;font-weight:700;white-space:nowrap">Iniciar matricula →</a>';
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
        tag.textContent = "Testimonio recibido ";
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
      + '<a href="' + buildMatricula(program, "cta-final") + '" style="background:#1b9faa;color:#fff;text-decoration:none;border-radius:50px;padding:12px 26px;font-weight:700;font-size:15px">Iniciar matricula →</a>'
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

  /* Nota de precio EUR/USD para Dual Diploma. Cifras 2026-27 (confirmadas
     por Mariela 2026-08-22): 35€ diagnóstico, 210€ matrícula, 110€/mes,
     desde 1.310€/año en 3.º ESO. Referencia USD: cambio BCE 1 EUR=1.1404,
     redondeado al alza — mismo método que el resto del sitio. No duplicar
     estas cifras en otro sitio del código sin actualizar aquí también. */
  /* H1 de Dual Diploma (2026-09-19). El HTML estático ya trae la promesa,
     pero React la pisa al hidratar y deja solo "Dual Diploma", que no dice
     nada ni a la familia ni a Google. Se vuelve a aplicar con keepApplying,
     igual que el resto de textos de estas landings compiladas. */
  function dualDiplomaHeadline() {
    var h1 = document.querySelector("h1");
    if (!h1) return;
    var txt = plain(h1.textContent || "");
    if (txt === "dual diploma") {
      h1.textContent = "Bachillerato americano sin cambiar de colegio";
    }
  }

  function dualDiplomaPricingNote() {
    if (document.getElementById("chanakPricingNote")) return;
    var heading = null;
    document.querySelectorAll("h2").forEach(function (h) {
      if (plain(h.textContent) === "precios") heading = h;
    });
    if (!heading || !heading.parentElement) return;
    var note = document.createElement("p");
    note.id = "chanakPricingNote";
    note.style.cssText = "margin-top:14px;font-size:15px;line-height:1.6;color:#2A4262;max-width:900px;background:#f4fbfb;border:1px solid #cdeeee;border-radius:10px;padding:12px 16px";
    note.innerHTML = "<strong>Antes de matricularte:</strong> el diagnóstico académico es un paso previo e independiente, no incluido en la matrícula. "
      + "Una vez confirmada la ruta se define el plan económico (matrícula y mensualidad). "
      + "Consulta los precios exactos en el dossier informativo.";
    heading.parentElement.insertBefore(note, heading.nextSibling);
  }

  /* Refuerza "no cambia de colegio" como frase propia del cuerpo (antes solo
     vivía dentro del H2), justo debajo del subtítulo del hero. */
  function dualDiplomaReassurance() {
    if (document.getElementById("chanakReassurance")) return;
    var h2 = document.querySelector("h2");
    if (!h2 || !h2.parentElement) return;
    var p = document.createElement("p");
    p.id = "chanakReassurance";
    p.style.cssText = "margin-top:10px;font-size:16px;font-weight:700;color:#fff";
    p.textContent = "Tu hijo no tiene que cambiar de colegio.";
    h2.parentElement.insertBefore(p, h2.nextSibling);
  }

  /* "Lo que NO es" — la landing ya tenía "Qué incluye" pero nada que acote
     expectativas. Se inserta después de esa sección (buscada por su H2). */
  function dualDiplomaNotList() {
    if (document.getElementById("chanakNotList")) return;
    var heading = null;
    document.querySelectorAll("h2").forEach(function (h) {
      if (plain(h.textContent) === "que incluye") heading = h;
    });
    if (!heading) return;
    var section = heading.closest("section");
    if (!section || !section.parentElement) return;
    var box = document.createElement("section");
    box.id = "chanakNotList";
    box.style.cssText = "max-width:1100px;margin:0 auto;padding:24px 5% 64px;font-family:DM Sans,sans-serif";
    box.innerHTML = '<h2 style="font-family:Playfair Display,Georgia,serif;font-size:32px;color:#0c2d48;margin:0 0 14px">Lo que el Dual Diploma NO es</h2>'
      + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px">'
      + ['No sustituye ni cambia el colegio actual del estudiante',
         'No es un curso de inglés básico',
         'No es lo mismo que el programa Off-Campus',
         'No garantiza por sí mismo la admisión a ninguna universidad',
         'No implica homologación o equivalencia automática en ningún país'
        ].map(function (t) { return '<div style="background:#f4f7fa;border-radius:10px;padding:14px 16px;font-size:14px;color:#3a5a7a">✕ ' + t + '</div>'; }).join('')
      + '</div>';
    section.parentElement.insertBefore(box, section.nextSibling);
  }

  /* Foto de cabecera para Dual Diploma / Off-Campus: estas landings
     compiladas no tenían ninguna fotografía real (solo logos/badges
     pequeños). Se inserta como sección nueva justo después del hero
     (localizado vía <nav>, que es único y siempre el primer elemento),
     nunca dentro del árbol que hidrata React. */
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
    box.innerHTML = "Tambien te puede interesar: " + items.map(function (item) {
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
        window.fbq("track", "Lead", { content_name: "Admisiones Click", content_category: location.pathname });
        window.fbq("track", "Schedule", { content_name: "Admisiones Schedule", content_category: location.pathname });
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
      if (txt.indexOf("INVERSIÓN OFF-CAMPUS") > -1 || txt.indexOf("Precios claros para planificar el año") > -1 || txt.indexOf("PLAN DE PAGO 2026-27") > -1 || txt.indexOf("¿Cuánto cuesta exactamente?") > -1) {
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

  /* Sección de precio real de Off-Campus (2026-09-19). La landing traía una
     sección de precios con cifras equivocadas que removeOffCampusPricingSection()
     oculta; esta función pone en su lugar la tarifa aprobada, leída en vivo de
     window.CHANAK_PRICING según el país detectado por regional-selector.js.
     Off-Campus es una sola ruta K-12: la mensualidad es igual en todos los
     niveles porque el servicio (SIS, LMS, portal, mentor) es el mismo. */
  function offCampusPricingSection() {
    if (!window.CHANAK_PRICING || !window.getCurrentCountry) return;
    var isEn = path.indexOf("/off-campus/en") === 0;
    var country = window.getCurrentCountry();
    var market = window.CHANAK_PRICING.markets[country] || window.CHANAK_PRICING.markets.GLOBAL;
    var oc = market && market.off_campus;
    if (!oc || oc.status !== "published") {
      /* Si veníamos de un país con precio publicado (p. ej. España) y la
         familia cambia a uno en revisión (México/Panamá), hay que ocultar
         la sección anterior: nunca debe verse el precio de otro país. */
      var stale = document.getElementById("chanakOffCampusPricing");
      if (stale) stale.style.display = "none";
      return;
    }

    var mount = document.getElementById("chanakOffCampusPricing");
    if (mount) mount.style.display = "";
    if (!mount) {
      mount = document.createElement("section");
      mount.id = "chanakOffCampusPricing";
      mount.style.cssText = "max-width:900px;margin:36px auto;padding:28px 24px;background:#f4fbfb;border:1px solid #cdeeee;border-radius:16px;font-family:'DM Sans',sans-serif;color:#0c2d48";
      document.body.appendChild(mount);
    }
    var tiers = oc.tiers || [];
    var flat = tiers.length > 0 && tiers.every(function (t) { return t.monthly === tiers[0].monthly; });
    var title = isEn ? "Tuition" : "Matrícula y mensualidad";
    var enrollLabel = isEn ? "Enrollment (one-time)" : "Matrícula (única)";
    var perMonth = isEn ? "/month" : "/mes";
    var installLabel = oc.installments || "";
    var monthlyBlock;
    if (flat) {
      monthlyBlock = '<p style="font-size:2rem;font-weight:800;margin:0 0 4px">' + tiers[0].monthly + '<span style="font-size:1rem;font-weight:600">' + perMonth + '</span></p>';
    } else {
      monthlyBlock = '<div style="display:grid;gap:8px;margin:0 0 4px">' + tiers.map(function (t) {
        return '<div style="display:flex;justify-content:space-between;gap:12px;padding:8px 0;border-bottom:1px solid #cdeeee">'
          + '<span style="font-weight:600">' + t.title + '</span>'
          + '<span style="font-weight:800">' + t.monthly + perMonth + '</span></div>';
      }).join('') + '</div>';
    }
    mount.innerHTML =
      '<h2 style="font-family:\'Playfair Display\',Georgia,serif;font-size:1.4rem;margin:0 0 14px">' + title + '</h2>'
      + '<p style="font-size:1.6rem;font-weight:800;margin:0 0 4px">' + (oc.enrollmentFee || "") + ' <span style="font-size:1rem;font-weight:600;color:#2A4262">' + enrollLabel + '</span></p>'
      + (oc.enrollmentIncludes ? '<p style="font-size:14px;color:#2A4262;margin:0 0 14px">' + oc.enrollmentIncludes + '</p>' : "")
      + monthlyBlock
      + (installLabel ? '<p style="font-size:14px;color:#2A4262;margin:0 0 14px">' + installLabel + '</p>' : "")
      + (oc.includes ? '<p style="font-size:14px;line-height:1.7;margin:0 0 10px"><strong>' + (isEn ? "Included: " : "Incluye: ") + '</strong>' + oc.includes + '</p>' : "")
      + (oc.footnote ? '<p style="font-size:13px;color:#5A7060;line-height:1.6;margin:0">' + oc.footnote + '</p>' : "");

    if (!mount.dataset.countryListener) {
      mount.dataset.countryListener = "1";
      window.addEventListener("chanak:countryChange", offCampusPricingSection);
    }
  }

  /* Enlace Chanak por país (2026-09-19). No es "representante legal": es el
     punto de contacto humano para esa región. Se oculta solo si no hay
     enlace para el país actual (evita el mismo tipo de fuga entre países
     que offCampusPricingSection ya corrige). */
  function chanakLocalContact() {
    if (!window.CHANAK_CONTACTS || !window.getCurrentCountry || !window.SUPPORTED_REGIONS) return;
    var country = window.getCurrentCountry();
    var contact = window.CHANAK_CONTACTS[country];
    var mount = document.getElementById("chanakLocalContact");

    if (!contact) {
      if (mount) mount.style.display = "none";
      return;
    }

    var region = window.SUPPORTED_REGIONS[country] || {};
    if (!mount) {
      mount = document.createElement("div");
      mount.id = "chanakLocalContact";
      mount.style.cssText = "max-width:900px;margin:0 auto 28px;padding:14px 20px;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;font-family:'DM Sans',sans-serif;color:#2A4262;font-size:14px;text-align:center";
      var anchor = document.getElementById("chanakOffCampusPricing");
      if (anchor && anchor.parentNode) {
        anchor.parentNode.insertBefore(mount, anchor.nextSibling);
      } else {
        document.body.appendChild(mount);
      }
    }
    mount.style.display = "";
    mount.innerHTML = '<strong>Enlace Chanak · ' + (region.shortName || '') + ':</strong> ' + contact.name;

    if (!mount.dataset.countryListener) {
      mount.dataset.countryListener = "1";
      window.addEventListener("chanak:countryChange", chanakLocalContact);
    }
  }

  /* Selector manual de país en header y pie (cierre del hueco 4, 2026-09-19).
     /off-campus/ y /dual-diploma/ son URLs compartidas por todos los países;
     el banner de geo-sugerencia (chanak-geo-banner.js) solo sugiere, nunca
     redirige, así que hace falta un control manual siempre visible para
     quien detectamos mal o llega desde un país sin banner (VPN, IP de
     oficina, etc.). Reutiliza el mismo desplegable de la portada/mx/pa vía
     window.renderChanakRegionSelector, expuesto por regional-selector.js,
     para no mantener dos implementaciones del mismo control.
     Off-campus trae su propio <nav> (logo + FLDOE/MSA); dual-diploma no
     tiene ninguno, así que ahí se crea una barra fina fija arriba. En
     ambos casos el <nav> se vuelve a localizar en cada pasada de
     keepApplying (nunca se guarda la referencia) porque React puede
     sustituir el nodo al hidratar. */
  function chanakCountrySelector() {
    if (!window.SUPPORTED_REGIONS || typeof window.renderChanakRegionSelector !== "function") return;

    var headerMount = document.getElementById("chanakHeaderSelector");
    if (!headerMount || !headerMount.isConnected) {
      var nav = document.querySelector("nav");
      if (nav) {
        headerMount = document.getElementById("chanakHeaderSelector") || document.createElement("div");
        headerMount.id = "chanakHeaderSelector";
        headerMount.className = "chanak-region-selector-mount";
        headerMount.style.cssText = "margin-left:auto";
        nav.appendChild(headerMount);
      } else {
        var topBar = document.getElementById("chanakTopBar");
        if (!topBar || !topBar.isConnected) {
          topBar = document.getElementById("chanakTopBar") || document.createElement("div");
          topBar.id = "chanakTopBar";
          topBar.style.cssText = "position:sticky;top:0;left:0;right:0;z-index:9997;background:#0c2d48;padding:8px 5%;display:flex;justify-content:flex-end;border-bottom:3px solid #1b9faa";
          if (document.body.firstChild) document.body.insertBefore(topBar, document.body.firstChild);
          else document.body.appendChild(topBar);
        }
        headerMount = document.getElementById("chanakHeaderSelector") || document.createElement("div");
        headerMount.id = "chanakHeaderSelector";
        headerMount.className = "chanak-region-selector-mount";
        topBar.appendChild(headerMount);
      }
    }
    window.renderChanakRegionSelector(headerMount);

    var footerMount = document.getElementById("chanakFooterSelector");
    if (!footerMount || !footerMount.isConnected) {
      var footerBox = document.getElementById("chanakFooterSelectorBox");
      if (!footerBox) {
        footerBox = document.createElement("div");
        footerBox.id = "chanakFooterSelectorBox";
        footerBox.style.cssText = "max-width:900px;margin:0 auto 28px;padding:14px 20px;text-align:center;font-family:'DM Sans',sans-serif";
        var label = document.createElement("div");
        label.style.cssText = "font-size:13px;color:#5A7060;margin-bottom:8px";
        label.textContent = isEnglishPath() ? "Visiting from another country?" : "¿Nos visitas desde otro país?";
        footerBox.appendChild(label);
        document.body.appendChild(footerBox);
      }
      footerMount = document.getElementById("chanakFooterSelector") || document.createElement("div");
      footerMount.id = "chanakFooterSelector";
      footerMount.className = "chanak-region-selector-mount in-footer";
      footerBox.appendChild(footerMount);
    }
    window.renderChanakRegionSelector(footerMount);
  }

  function isEnglishPath() {
    return path.indexOf("/en") > -1;
  }

  function updateDualDiplomaConvalidationCTA() {
    var anchors = document.querySelectorAll("a, button");
    anchors.forEach(function (a) {
      var text = plain(a.textContent || "");
      if (text.indexOf("35") > -1 || text.indexOf("evaluacion") > -1 || text.indexOf("diagnostica") > -1 || text.indexOf("hacer el diagnostico") > -1) {
        a.textContent = "Agendar Cita / Orientación Gratuita 📲";
        a.href = "/#solicitud";
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
        chanakLocalContact();
      });
      return;
    }

    if (path.indexOf("/off-campus") === 0) {
      keepApplying(function () {
        offCampusPricingSection();
        chanakLocalContact();
        chanakCountrySelector();
        rewriteEnrollmentLinks();
        heroPhoto("/assets/img/hero-offcampus.webp", "Estudiante Off-Campus estudiando en casa");
        fixLegalText();
        stickyBar("off-campus");
        testimonialBadges();
        removeOffCampusPricingSection();
        ctaFinal("off-campus");
        internalLinks([
          ["/dual-diploma/", "Doble titulacion: Dual Diploma americano"],
          ["/diagnostico/", "Test de nivel homeschool"]
        ]);
      });
    } else if (path.indexOf("/dual-diploma") === 0) {
      keepApplying(function () {
        rewriteEnrollmentLinks();
        heroPhoto("/assets/img/hero-dualdiploma.webp", "Estudiante siguiendo el programa Dual Diploma");
        stickyBar("dual-diploma");
        dualDiplomaHeadline();
        updateDualDiplomaConvalidationCTA();
        chanakLocalContact();
        chanakCountrySelector();
        dualDiplomaPricingNote();
        dualDiplomaReassurance();
        dualDiplomaNotList();
        ctaFinal("dual-diploma",
          '<p style="margin:18px 0 0;font-size:13.5px;color:#cfdde9">¿Quieres revisar convalidaciones? '
          + '<a href="/#solicitud" style="color:#6fd9d1;font-weight:700;text-decoration:underline">Solicitar orientación →</a></p>');
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

/* ---------------------------------------------------------------------------
 * Guarda de desbordamiento horizontal en móvil (2026-09-18).
 * Las landings compiladas de Next (/off-campus/, /dual-diploma/) desbordaban
 * el viewport a 390 px: el contenido medía hasta 830 px y la página se movía
 * en horizontal. Se corrige solo con CSS, sin tocar los bundles hidratados.
 * ------------------------------------------------------------------------ */
(function () {
  "use strict";
  function addGuard() {
    if (document.getElementById('chanak-overflow-guard')) return;
    var st = document.createElement('style');
    st.id = 'chanak-overflow-guard';
    st.textContent = [
      'html,body{max-width:100%;overflow-x:hidden}',
      'img,svg,video,iframe{max-width:100%;height:auto}',
      '@media(max-width:640px){table{display:block;overflow-x:auto;-webkit-overflow-scrolling:touch}}'
    ].join('\n');
    (document.head || document.documentElement).appendChild(st);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addGuard);
  else addGuard();
})();
