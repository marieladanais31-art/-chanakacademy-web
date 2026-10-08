(function () {
  'use strict';
  var state = { analytics: false, marketing: false };
  var googleLoaded = false, metaLoaded = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    if (arguments[0] === 'event' && !state.analytics && !state.marketing) return;
    window.dataLayer.push(arguments);
  };
  function script(src) {
    var el = document.createElement('script'); el.async = true; el.src = src;
    document.head.appendChild(el);
  }
  function setConsent(analytics, marketing) {
    state.analytics = !!analytics; state.marketing = !!marketing;
    window.gtag('consent', googleLoaded ? 'update' : 'default', {
      analytics_storage: analytics ? 'granted' : 'denied',
      ad_storage: marketing ? 'granted' : 'denied',
      ad_user_data: marketing ? 'granted' : 'denied',
      ad_personalization: marketing ? 'granted' : 'denied'
    });
    if ((analytics || marketing) && !googleLoaded) {
      googleLoaded = true;
      window.gtag('js', new Date());
      var page = { page_location: location.origin + location.pathname, page_referrer: '' };
      window.gtag('config', 'AW-18109980849', page);
      window.gtag('config', 'GT-NSSXS5N6', page);
      script('https://www.googletagmanager.com/gtag/js?id=AW-18109980849');
    }
    if (marketing && !metaLoaded) {
      metaLoaded = true;
      var fb = window.fbq = function () { fb.callMethod ? fb.callMethod.apply(fb, arguments) : fb.queue.push(arguments); };
      fb.queue = []; fb.loaded = true; fb.version = '2.0'; window._fbq = fb;
      fb('consent', 'grant'); fb('init', '1697477548238291', {}, { autoConfig: false });
      fb('set', 'autoConfig', false, '1697477548238291');
      fb('track', 'PageView');
      script('https://connect.facebook.net/en_US/fbevents.js');
    } else if (window.fbq) window.fbq('consent', marketing ? 'grant' : 'revoke');
  }
  function remember(value) {
    try { localStorage.setItem('chanak_ck', value); } catch (_) {}
    setConsent(value === 'all', value === 'all');
    var box = document.getElementById('chanak-tracking-consent'); if (box) box.remove();
  }
  function lead(program) {
    window.gtag('event', 'generate_lead', { event_category: 'form', event_label: program });
    if (state.marketing && window.fbq) window.fbq('track', 'Lead', { content_name: program });
  }
  window.ChanakTracking = { setConsent: setConsent, lead: lead };
  var saved = '';
  try {
    saved = localStorage.getItem('chanak_ck') || '';
    var prefs = JSON.parse(localStorage.getItem('chanak_ck_prefs') || '{}');
    setConsent(saved === 'all' || (saved === 'custom' && !!prefs.a), saved === 'all' || (saved === 'custom' && !!prefs.m));
  } catch (_) { setConsent(false, false); }
  document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('ckBanner')) return;
    var en = document.documentElement.lang.indexOf('en') === 0;
    var control = document.createElement('button'); control.type = 'button';
    control.textContent = en ? 'Cookie settings' : 'Preferencias de cookies';
    control.style.cssText = 'position:fixed;bottom:5px;left:8px;z-index:1001;font:12px sans-serif;padding:6px;background:#fff;color:#0c2d48;border:1px solid #d8e6ee;border-radius:8px;cursor:pointer';
    function show() {
      if (document.getElementById('chanak-tracking-consent')) return;
      var box = document.createElement('div'); box.id = 'chanak-tracking-consent'; box.setAttribute('role', 'region');
      box.setAttribute('aria-label', en ? 'Cookie preferences' : 'Preferencias de cookies');
      box.style.cssText = 'position:fixed;bottom:40px;left:16px;right:16px;max-width:620px;z-index:2000;background:#fff;color:#0c2d48;border:1px solid #d8e6ee;border-radius:12px;padding:20px;box-shadow:0 4px 24px #0002;font:15px/1.5 sans-serif';
      var text = document.createElement('p'); text.textContent = en ? 'With your permission, Google and Meta help us measure inquiries and advertising. You can decline and still use the website and enrollment form.' : 'Con tu permiso, Google y Meta nos ayudan a medir consultas y publicidad. Puedes rechazarlas y seguir usando la web y la matrícula.';
      box.appendChild(text);
      ['none', 'all'].forEach(function (value) {
        var btn = document.createElement('button'); btn.type = 'button';
        btn.textContent = value === 'all' ? (en ? 'Accept' : 'Aceptar') : (en ? 'Reject' : 'Rechazar');
        btn.style.cssText = 'margin:10px 10px 0 0;padding:10px 18px;border:1px solid #0c2d48;border-radius:8px;background:#fff;color:#0c2d48;font:inherit;cursor:pointer';
        btn.addEventListener('click', function () { remember(value); }); box.appendChild(btn);
      });
      var policy = document.createElement('a'); policy.href = '/cookies/'; policy.textContent = en ? 'Cookie policy' : 'Política de cookies'; box.appendChild(policy);
      document.body.appendChild(box);
    }
    control.addEventListener('click', show); document.body.appendChild(control); if (!saved) show();
  });
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a'); if (!a) return;
    var url; try { url = new URL(a.href, location.href); } catch (_) { return; }
    if (/\/(matricula|enrollment)\/?$/.test(url.pathname)) {
      window.gtag('event', 'matricula_click', { event_category: 'enrollment', event_label: document.body.dataset.program || url.searchParams.get('program') || 'general' });
      if (state.marketing && window.fbq) window.fbq('track', 'InitiateCheckout', { content_name: document.body.dataset.program || 'enrollment' });
    }
  }, true);
})();
