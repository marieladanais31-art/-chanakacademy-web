/**
 * js/chanak-geo-banner.js
 * Sugerencia de región por IP — SIN redirección automática.
 *
 * REGLA INNEGOCIABLE DE ESTE ARCHIVO: nunca se llama a location.replace(),
 * location.href ni a ningún equivalente de forma automática. La IP solo sirve
 * para SUGERIR; el contenido que se entrega es siempre el de la URL pedida.
 *
 * Motivo: Googlebot rastrea casi siempre desde IPs de Estados Unidos. Si la
 * detección por IP redirigiera, Googlebot solo vería la versión estadounidense
 * y las URLs de España, México y Panamá dejarían de indexarse.
 *
 * Comportamiento:
 *   1. No hace nada si es un bot, si la página fija país (data-chanak-country),
 *      si la URL trae ?country= o ?nogeo=1, o si ya hay preferencia guardada.
 *   2. Consulta la IP, y si el país detectado NO coincide con el que la página
 *      está mostrando, enseña un banner discreto abajo con dos salidas:
 *      ir a la versión sugerida, o quedarse donde está.
 *   3. Cualquiera de las dos respuestas (o la X) se guarda 365 días, así que
 *      el banner no vuelve a aparecer.
 */
(function () {
  'use strict';

  var PREF_COOKIE = 'chanak_geo_preference';
  var PREF_DAYS = 365;
  var ENDPOINT = 'https://ipwho.is/';

  /* Destino sugerido por país. Un país sin entrada aquí no genera banner. */
  var DESTINATIONS = {
    ES: { url: '/',               label: 'España',         currency: 'euros' },
    MX: { url: '/mx/',            label: 'México',         currency: 'pesos mexicanos' },
    PA: { url: '/pa/',            label: 'Panamá',         currency: 'dólares' },
    US: { url: '/us/florida/',    label: 'Estados Unidos', currency: 'dólares' },
    CO: { url: '/?country=CO',    label: 'Colombia',       currency: 'pesos colombianos' },
    AE: { url: '/dual-diploma-uae/', label: 'Emiratos',    currency: 'dólares' }
  };

  var BOTS = /bot|crawl|spider|slurp|bingpreview|googlebot|duckduck|baidu|yandex|facebookexternalhit|embedly|quora|pinterest|vkshare|whatsapp|telegram|lighthouse|headlesschrome|gptbot|claudebot|oai-searchbot|perplexity/i;

  function getCookie(name) {
    var m = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return m ? decodeURIComponent(m[2]) : null;
  }

  function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + days * 86400000);
    document.cookie = name + '=' + encodeURIComponent(value)
      + '; expires=' + d.toUTCString() + '; path=/; SameSite=Lax';
  }

  /* País que la página está mostrando ahora mismo. */
  function currentCountry() {
    var locked = window.CHANAK_PAGE_COUNTRY
      || document.documentElement.getAttribute('data-chanak-country');
    if (locked) return String(locked).toUpperCase();
    if (typeof window.getCurrentCountry === 'function') {
      try { return window.getCurrentCountry(); } catch (e) {}
    }
    return 'GLOBAL';
  }

  function shouldSkip() {
    // 1. Bots: nunca. Ni banner, ni petición de red.
    if (BOTS.test(navigator.userAgent || '')) return true;
    // 2. Salida de emergencia y campañas con país explícito.
    try {
      var qs = new URLSearchParams(location.search);
      if (qs.has('nogeo') || qs.has('country')) return true;
    } catch (e) {}
    // 3. El usuario ya decidió alguna vez.
    if (getCookie(PREF_COOKIE)) return true;
    // 4. Respeta también la elección hecha en el selector manual.
    if (getCookie('user_country')) return true;
    return false;
  }

  function remember(value) {
    setCookie(PREF_COOKIE, value, PREF_DAYS);
  }

  function dismiss(el, value) {
    dismissed = true;
    remember(value);
    if (el && el.parentNode) {
      el.style.transform = 'translateY(120%)';
      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 300);
    }
  }

  /* Las landings compiladas de Next (/off-campus/, /dual-diploma/) eliminan
     del body cualquier nodo que no venga en su árbol al hidratar: el banner se
     inserta y React lo borra medio segundo después. Igual que el resto de
     overrides del sitio, se vuelve a colocar durante unos segundos hasta que
     la hidratación termina. Deja de intentarlo en cuanto el usuario responde. */
  var dismissed = false;
  function keepMounted(bar) {
    var tries = 0;
    var timer = setInterval(function () {
      tries++;
      if (dismissed || tries > 24) { clearInterval(timer); return; }
      if (!document.getElementById('chanakGeoBanner') && document.body) {
        document.body.appendChild(bar);
        bar.style.transform = 'translateY(0)';
      }
    }, 500);
  }

  function render(detected, dest) {
    if (document.getElementById('chanakGeoBanner')) return;

    var bar = document.createElement('div');
    bar.id = 'chanakGeoBanner';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Sugerencia de región');
    bar.style.cssText = [
      'position:fixed', 'left:16px', 'right:16px', 'bottom:16px', 'z-index:9998',
      'max-width:720px', 'margin:0 auto', 'background:#ffffff', 'color:#0c2d48',
      'border:1px solid #cdeeee', 'border-radius:14px', 'padding:16px 18px',
      'box-shadow:0 18px 44px rgba(10,30,60,.22)', "font-family:'DM Sans',sans-serif",
      'font-size:14.5px', 'line-height:1.55', 'display:flex', 'gap:14px',
      'align-items:center', 'flex-wrap:wrap',
      'transform:translateY(120%)', 'transition:transform .32s cubic-bezier(.16,1,.3,1)'
    ].join(';');

    var text = document.createElement('div');
    text.style.cssText = 'flex:1 1 300px;min-width:240px';
    text.innerHTML = '<strong>¿Nos visitas desde ' + dest.label + '?</strong> '
      + 'Tenemos una página con los programas y los precios en ' + dest.currency
      + ' para tu país.';

    var actions = document.createElement('div');
    actions.style.cssText = 'display:flex;gap:8px;align-items:center;flex-wrap:wrap';

    var go = document.createElement('a');
    go.href = dest.url;
    go.textContent = 'Ver ' + dest.label;
    go.style.cssText = 'background:#1b9faa;color:#fff;text-decoration:none;border-radius:10px;'
      + 'padding:10px 16px;font-weight:700;white-space:nowrap';
    go.addEventListener('click', function () { dismissed = true; remember(detected); });

    var stay = document.createElement('button');
    stay.type = 'button';
    stay.textContent = 'Continuar aquí';
    stay.style.cssText = 'background:transparent;color:#2A4262;border:1px solid #cbd5e1;'
      + 'border-radius:10px;padding:10px 16px;font-weight:600;cursor:pointer;white-space:nowrap';
    stay.addEventListener('click', function () { dismiss(bar, 'dismissed'); });

    var close = document.createElement('button');
    close.type = 'button';
    close.setAttribute('aria-label', 'Cerrar');
    close.innerHTML = '&times;';
    close.style.cssText = 'background:transparent;border:none;color:#64748b;font-size:22px;'
      + 'line-height:1;cursor:pointer;padding:4px 8px';
    close.addEventListener('click', function () { dismiss(bar, 'dismissed'); });

    actions.appendChild(go);
    actions.appendChild(stay);
    actions.appendChild(close);
    bar.appendChild(text);
    bar.appendChild(actions);
    document.body.appendChild(bar);

    /* La home ya tiene barras fijas abajo (cookies, aviso de matrícula). Se
       calcula el hueco libre para no taparlas ni quedar tapado por ellas. */
    function avoidOverlap() {
      var offset = 16;
      var fixedBars = document.querySelectorAll('.mat-banner, [id*="cookie" i], [class*="cookie" i]');
      for (var i = 0; i < fixedBars.length; i++) {
        var el = fixedBars[i];
        if (el === bar || !el.offsetHeight) continue;
        var cs = window.getComputedStyle(el);
        if (cs.position !== 'fixed' || cs.display === 'none') continue;
        var r = el.getBoundingClientRect();
        if (r.bottom > window.innerHeight - 200) {
          offset = Math.max(offset, window.innerHeight - r.top + 12);
        }
      }
      bar.style.bottom = offset + 'px';
    }
    avoidOverlap();
    window.addEventListener('resize', avoidOverlap);

    requestAnimationFrame(function () { bar.style.transform = 'translateY(0)'; });
    keepMounted(bar);
  }

  function init() {
    if (shouldSkip()) return;

    fetch(ENDPOINT, { cache: 'no-store' })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!data || !data.success) return;
        var detected = String(data.country_code || '').toUpperCase();
        var dest = DESTINATIONS[detected];
        if (!dest) return;                       // país sin página propia: no molestar
        if (detected === currentCountry()) return; // ya está donde le corresponde
        if (location.pathname === dest.url) return;
        render(detected, dest);
      })
      .catch(function () { /* silencio: el banner es opcional, nunca bloquea */ });
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
