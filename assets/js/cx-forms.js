/* Formularios nuevos (kit del fundador, 7 errores, embajadores, mentores): envío JSON a /enviar-formulario.php.
   No guarda nada en el navegador. Honeypot `website`; sin datos bancarios ni documentos de identidad. */
(function () {
  'use strict';
  function utm() {
    var u = {};
    try {
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (k) { u[k] = sessionStorage.getItem('chanak_' + k) || ''; });
      u.utm_landing = sessionStorage.getItem('chanak_utm_landing') || '';
    } catch (e) {}
    return u;
  }
  document.querySelectorAll('form[data-cx-form]').forEach(function (f) {
    f.addEventListener('submit', async function (ev) {
      ev.preventDefault();
      if (!f.checkValidity()) { f.reportValidity(); return; }
      var b = f.querySelector('button[type=submit]'), o = b.textContent, er = f.querySelector('.cx-err');
      var data = {};
      new FormData(f).forEach(function (v, k) { data[k] = (k in data) ? data[k] + ', ' + v : v; });
      f.querySelectorAll('input[type=checkbox]').forEach(function (c) { if (c.name) data[c.name] = c.checked ? 'si' : 'no'; });
      data.privacidad = true;
      data.language = f.dataset.lang || document.documentElement.lang || 'es';
      b.disabled = true; b.textContent = f.dataset.sending || '…'; if (er) er.hidden = true;
      try {
        var r = await fetch(f.getAttribute('action') || '/enviar-formulario.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.assign(data, utm())) });
        var j = await r.json().catch(function () { return {}; });
        if (!r.ok || j.success !== true) throw 0;
        if (window.ChanakTracking) window.ChanakTracking.lead(data.necesidad || 'general');
        var ok = f.parentNode.querySelector('template.cx-ok-t');
        var box = document.createElement('div'); box.className = 'cx-ok';
        if (ok) box.appendChild(ok.content.cloneNode(true)); else box.textContent = 'OK';
        f.replaceWith(box); box.setAttribute('tabindex', '-1'); box.focus();
      } catch (e) {
        b.disabled = false; b.textContent = o;
        if (er) { er.textContent = f.dataset.err || 'Error'; er.hidden = false; }
      }
    });
  });
})();
