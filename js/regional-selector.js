/**
 * js/regional-selector.js
 * Selector dinámico multirregión y actualización reactiva de tarifas / dossiers.
 * Persistencia en cookies (365 días), prevalencia de elección manual del usuario.
 */

(function() {
  var COOKIE_NAME = 'user_country';
  var COOKIE_DAYS = 365;  // 2026-09-19: de 30 a 365 días por decisión de dirección

  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  function setCookie(name, value, days) {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/; SameSite=Lax';
  }

  function isKnown(code) {
    return !!(code && window.SUPPORTED_REGIONS && window.SUPPORTED_REGIONS[String(code).toUpperCase()]);
  }

  function detectInitialCountry() {
    // 1. Región fijada por la propia página (landings de país).
    //    Se declara con <html data-chanak-country="MX"> o window.CHANAK_PAGE_COUNTRY.
    //    Tiene prioridad sobre la cookie: una familia que llega a /mx/ debe ver
    //    México aunque en una visita anterior mirase otro país.
    var pageLock = window.CHANAK_PAGE_COUNTRY
      || document.documentElement.getAttribute('data-chanak-country');
    if (isKnown(pageLock)) return String(pageLock).toUpperCase();

    // 2. Parámetro explícito en la URL (?country=MX), útil para campañas.
    try {
      var qs = new URLSearchParams(window.location.search).get('country');
      if (isKnown(qs)) return String(qs).toUpperCase();
    } catch (e) {}

    // 3. Elección previa del usuario.
    var saved = getCookie(COOKIE_NAME);
    if (saved && window.SUPPORTED_REGIONS && window.SUPPORTED_REGIONS[saved]) {
      return saved;
    }

    // 4. Detección por zona horaria o idioma si no hay nada de lo anterior
    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (tz.indexOf('Madrid') !== -1 || tz.indexOf('Canary') !== -1 || tz.indexOf('Ceuta') !== -1) return 'ES';
      if (tz.indexOf('Mexico') !== -1 || tz.indexOf('Cancun') !== -1 || tz.indexOf('Monterrey') !== -1
        || tz.indexOf('Tijuana') !== -1 || tz.indexOf('Merida') !== -1 || tz.indexOf('Chihuahua') !== -1) return 'MX';
      if (tz.indexOf('Panama') !== -1) return 'PA';
      // Solo husos de Estados Unidos. "America/*" a secas capturaba toda
      // Latinoamérica y mostraba tarifas de EE. UU. a familias de Bogotá o Lima.
      if (/America\/(New_York|Detroit|Chicago|Denver|Phoenix|Los_Angeles|Anchorage|Boise|Indiana|Kentucky|North_Dakota|Menominee|Juneau|Sitka|Nome|Adak)/.test(tz)
        || tz.indexOf('Pacific/Honolulu') !== -1) return 'US';
    } catch(e) {}

    return 'GLOBAL'; // Fallback neutro: ninguna región por defecto
  }

  window.getCurrentCountry = function() {
    return window.__currentCountry || detectInitialCountry();
  };

  window.setCurrentCountry = function(countryCode) {
    if (!window.SUPPORTED_REGIONS || !window.SUPPORTED_REGIONS[countryCode]) {
      countryCode = 'GLOBAL';
    }
    window.__currentCountry = countryCode;
    setCookie(COOKIE_NAME, countryCode, COOKIE_DAYS);

    // Actualizar todos los campos ocultos de país en formularios
    document.querySelectorAll('input[name="detected_country"], input[name="pais"], input[name="country"]').forEach(function(input) {
      input.value = countryCode;
    });

    // Actualizar prefijos telefónicos en formularios si aplica
    var region = window.SUPPORTED_REGIONS[countryCode] || window.SUPPORTED_REGIONS.GLOBAL;
    document.querySelectorAll('.phone-prefix-display').forEach(function(el) {
      el.textContent = region.phonePrefix;
    });

    // Disparar evento global para re-renderizar componentes reactivos
    window.dispatchEvent(new CustomEvent('chanak:countryChange', { detail: { country: countryCode, region: region } }));
    updateUIElements(countryCode);
  };

  function updateUIElements(countryCode) {
    var region = window.SUPPORTED_REGIONS[countryCode] || window.SUPPORTED_REGIONS.GLOBAL;
    var catalog = window.REGIONAL_PRICING_CATALOG ? (window.REGIONAL_PRICING_CATALOG[countryCode] || window.REGIONAL_PRICING_CATALOG.GLOBAL) : null;

    // Actualizar etiquetas visuales del selector
    document.querySelectorAll('.current-region-flag').forEach(function(el) { el.textContent = region.flag; });
    document.querySelectorAll('.current-region-name').forEach(function(el) { el.textContent = region.name; });
    document.querySelectorAll('.current-region-currency').forEach(function(el) { el.textContent = '(' + (region.displayCurrency || region.currency) + ')'; });

    if (!catalog) return;

    // Render de una tarifa. Si el precio no está aprobado (onRequest) no se
    // inventa cifra: se muestra el texto de plan personalizado, sin paréntesis
    // vacíos ni "matrícula" colgando.
    function renderPrice(el, item) {
      if (!el || !item) return;
      if (item.onRequest) {
        el.innerHTML = '<strong>' + (item.monthlyFee || '') + '</strong>'
          + (item.enrollmentFee ? ' <span class="text-xs text-slate-400">Matrícula ' + item.enrollmentFee + '</span>' : '');
        return;
      }
      var extra = [];
      if (item.installments) extra.push(item.installments);
      if (item.enrollmentFee) extra.push('matrícula ' + item.enrollmentFee);
      el.innerHTML = '<strong>' + item.monthlyFee + '</strong>'
        + (extra.length ? ' <span class="text-xs text-slate-400">(' + extra.join(') + ') + '</span>' : '');
    }

    if (catalog.off_campus) {
      renderPrice(document.getElementById('price-offcampus-elementary'), catalog.off_campus.elementary);
      renderPrice(document.getElementById('price-offcampus-secondary'), catalog.off_campus.middle_high);
    }
    if (catalog.dual_diploma) {
      renderPrice(document.getElementById('price-dual-diploma'), catalog.dual_diploma.standard);
    }

    // Actualizar botones de enlace al SIS
    document.querySelectorAll('[data-sis-program]').forEach(function(btn) {
      var prog = btn.getAttribute('data-sis-program');
      var grade = btn.getAttribute('data-sis-grade') || 'standard';
      btn.setAttribute('href', window.buildSisEnrollmentUrl(prog, grade, countryCode));
    });
  }

  function injectSelectorStyles() {
    if (document.getElementById('chanak-region-css')) return;
    var st = document.createElement('style');
    st.id = 'chanak-region-css';
    st.textContent = [
      '.chanak-region-selector-mount{max-width:100%;min-width:0}',
      '.chanak-region-dropdown{max-width:100%}',
      '.chanak-region-btn{max-width:100%;min-width:0;overflow:hidden;white-space:nowrap}',
      '.chanak-region-menu{max-width:calc(100vw - 24px)}',
      /* En pantallas estrechas el selector se reduce a bandera + moneda para
         no desbordar la cabecera. El nombre sigue estando en el menu. */
      '@media(max-width:860px){.chanak-region-btn .current-region-name{display:none}}'
    ].join('\n');
    document.head.appendChild(st);
  }

  /* Renderiza el desplegable de país en UN contenedor. Se extrajo de
     initSelectors() (2026-09-19) para poder montar el selector también desde
     fuera de este archivo: /off-campus/ y /dual-diploma/ son landings de
     Next.js exportadas cuyo header/footer no existe en el HTML fuente en el
     momento de carga, así que chanak-overrides.js crea el contenedor por JS
     y llama a esta función directamente en vez de esperar a initSelectors(),
     que solo recorre los .chanak-region-selector-mount presentes al cargar.
     Idempotente: si el contenedor ya está pintado (dataset.chanakRendered)
     no se repinta, para no perder el desplegable abierto ni duplicar los
     listeners de clic cuando algo vuelve a llamarla (p. ej. un keepApplying
     que reinserta el nodo tras la hidratación de React). */
  function renderRegionSelectorInto(container, country) {
    if (!container || container.dataset.chanakRendered === '1') return;
    container.dataset.chanakRendered = '1';
    injectSelectorStyles();
    var isFooter = container.classList.contains('in-footer');
    var current = window.SUPPORTED_REGIONS[country] || window.SUPPORTED_REGIONS.GLOBAL;

    var html = '<div class="chanak-region-dropdown" style="position:relative; display:inline-block; text-align:left;">' +
        '<button type="button" class="chanak-region-btn" style="display:flex; align-items:center; gap:8px; padding:6px 12px; border-radius:8px; border:1px solid rgba(255,255,255,0.15); background:' + (isFooter ? 'rgba(30,41,59,0.9)' : 'rgba(15,23,42,0.85)') + '; color:#e2e8f0; font-size:13px; font-weight:500; cursor:pointer; transition:all 0.2s;">' +
        '<span class="current-region-flag">' + current.flag + '</span>' +
        '<span class="current-region-name">' + current.name + '</span> ' +
        '<span class="current-region-currency" style="color:#fbbf24; font-size:11px; font-weight:bold;">(' + current.currency + ')</span>' +
        '<span style="font-size:10px; opacity:0.7; margin-left:4px;">▼</span>' +
        '</button>' +
        '<div class="chanak-region-menu" style="display:none; position:absolute; right:0; ' + (isFooter ? 'bottom:100%; margin-bottom:8px;' : 'top:100%; margin-top:8px;') + ' z-index:999; width:220px; background:#0f172a; border:1px solid #334155; border-radius:12px; padding:6px; box-shadow:0 10px 25px rgba(0,0,0,0.5);">';

      Object.keys(window.SUPPORTED_REGIONS).forEach(function(code) {
        var reg = window.SUPPORTED_REGIONS[code];
        html += '<button type="button" data-country="' + code + '" style="width:100%; display:flex; align-items:center; justify-content:space-between; padding:8px 10px; border:none; background:transparent; color:#cbd5e1; border-radius:6px; cursor:pointer; text-align:left; font-size:13px; margin-bottom:2px;" onmouseover="this.style.background=\'#1e293b\';this.style.color=\'#fff\';" onmouseout="this.style.background=\'transparent\';this.style.color=\'#cbd5e1\';">' +
          '<div style="display:flex; align-items:center; gap:8px;"><span>' + reg.flag + '</span><span>' + reg.name + '</span></div>' +
          '<span style="font-family:monospace; font-size:11px; color:#94a3b8;">' + (reg.displayCurrency || reg.currency) + '</span>' +
          '</button>';
      });

      html += '</div></div>';
      container.innerHTML = html;

      var btn = container.querySelector('.chanak-region-btn');
      var menu = container.querySelector('.chanak-region-menu');
      if (btn && menu) {
        btn.addEventListener('click', function(e) {
          e.stopPropagation();
          var isOpen = menu.style.display === 'block';
          document.querySelectorAll('.chanak-region-menu').forEach(function(m) { m.style.display = 'none'; });
          menu.style.display = isOpen ? 'none' : 'block';
        });

        menu.querySelectorAll('button[data-country]').forEach(function(itemBtn) {
          itemBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            var targetCode = itemBtn.getAttribute('data-country');
            window.setCurrentCountry(targetCode);
            menu.style.display = 'none';
          });
        });
    }
  }

  var globalClickListenerBound = false;
  function bindGlobalMenuCloser() {
    if (globalClickListenerBound) return;
    globalClickListenerBound = true;
    document.addEventListener('click', function() {
      document.querySelectorAll('.chanak-region-menu').forEach(function(m) { m.style.display = 'none'; });
    });
  }

  function initSelectors() {
    var country = detectInitialCountry();
    window.__currentCountry = country;

    // Renderizar selector en los contenedores designados
    document.querySelectorAll('.chanak-region-selector-mount').forEach(function(container) {
      renderRegionSelectorInto(container, country);
    });

    bindGlobalMenuCloser();
    updateUIElements(country);
  }

  /* Punto de entrada para montar el selector fuera de esta carga inicial
     (landings compiladas de Next que crean su propio contenedor por JS,
     ver assets/js/chanak-overrides*.js). */
  window.renderChanakRegionSelector = function(container) {
    bindGlobalMenuCloser();
    renderRegionSelectorInto(container, window.getCurrentCountry());
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSelectors);
  } else {
    initSelectors();
  }
})();
