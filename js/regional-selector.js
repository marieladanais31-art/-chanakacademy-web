/**
 * js/regional-selector.js
 * Selector dinámico multirregión y actualización reactiva de tarifas / dossiers.
 * Persistencia en cookies (30 días), prevalencia de elección manual del usuario.
 */

(function() {
  var COOKIE_NAME = 'user_country';
  var COOKIE_DAYS = 30;

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

  function detectInitialCountry() {
    var saved = getCookie(COOKIE_NAME);
    if (saved && window.SUPPORTED_REGIONS && window.SUPPORTED_REGIONS[saved]) {
      return saved;
    }
    // Detección por zona horaria o idioma si no hay cookie
    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (tz.indexOf('Madrid') !== -1 || tz.indexOf('Canary') !== -1) return 'ES';
      if (tz.indexOf('Mexico') !== -1 || tz.indexOf('Cancun') !== -1 || tz.indexOf('Monterrey') !== -1) return 'MX';
      if (tz.indexOf('Panama') !== -1) return 'PA';
      if (tz.indexOf('New_York') !== -1 || tz.indexOf('Miami') !== -1 || tz.indexOf('America/') !== -1) return 'US';
    } catch(e) {}
    
    return 'ES'; // Fallback por defecto
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
    document.querySelectorAll('.current-region-currency').forEach(function(el) { el.textContent = '(' + region.currency + ')'; });

    if (!catalog) return;

    // Actualizar tarjetas de tarifas si existen en la página
    var offcampusElem = document.getElementById('price-offcampus-elementary');
    if (offcampusElem && catalog.off_campus && catalog.off_campus.elementary) {
      offcampusElem.innerHTML = '<strong>' + catalog.off_campus.elementary.monthlyFee + '</strong> <span class="text-xs text-slate-400">(' + catalog.off_campus.elementary.installments + ') + ' + catalog.off_campus.elementary.enrollmentFee + ' matrícula</span>';
    }

    var offcampusSec = document.getElementById('price-offcampus-secondary');
    if (offcampusSec && catalog.off_campus && catalog.off_campus.middle_high) {
      offcampusSec.innerHTML = '<strong>' + catalog.off_campus.middle_high.monthlyFee + '</strong> <span class="text-xs text-slate-400">(' + catalog.off_campus.middle_high.installments + ') + ' + catalog.off_campus.middle_high.enrollmentFee + ' matrícula</span>';
    }

    var dualElem = document.getElementById('price-dual-diploma');
    if (dualElem && catalog.dual_diploma && catalog.dual_diploma.standard) {
      dualElem.innerHTML = '<strong>' + catalog.dual_diploma.standard.monthlyFee + '</strong> <span class="text-xs text-slate-400">(' + catalog.dual_diploma.standard.installments + ') + ' + catalog.dual_diploma.standard.enrollmentFee + ' matrícula</span>';
    }

    // Actualizar botones de enlace al SIS
    document.querySelectorAll('[data-sis-program]').forEach(function(btn) {
      var prog = btn.getAttribute('data-sis-program');
      var grade = btn.getAttribute('data-sis-grade') || 'standard';
      btn.setAttribute('href', window.buildSisEnrollmentUrl(prog, grade, countryCode));
    });
  }

  function initSelectors() {
    var country = detectInitialCountry();
    window.__currentCountry = country;

    // Renderizar selector en los contenedores designados
    document.querySelectorAll('.chanak-region-selector-mount').forEach(function(container) {
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
          '<span style="font-family:monospace; font-size:11px; color:#94a3b8;">' + reg.currency + '</span>' +
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
    });

    document.addEventListener('click', function() {
      document.querySelectorAll('.chanak-region-menu').forEach(function(m) { m.style.display = 'none'; });
    });

    updateUIElements(country);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSelectors);
  } else {
    initSelectors();
  }
})();
