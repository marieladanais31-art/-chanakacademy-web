/* Ajustes post-hidratación para las landings compiladas (Next.js export).
   Estas páginas se rehidratan desde sus chunks JS, por lo que los elementos
   NUEVOS (no presentes en el bundle) se añaden aquí, después de la hidratación.
   Los cambios de TEXTO ya están aplicados directamente en HTML + chunk. */
(function () {
  'use strict';
  var path = location.pathname;
  var MATRICULA = '/matricula/';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  /* Reintenta durante ~6s: la hidratación puede re-renderizar y borrar nodos añadidos. */
  function keepApplying(fn) {
    var tries = 0;
    var timer = setInterval(function () {
      tries++;
      try { fn(); } catch (e) {}
      if (tries > 12) clearInterval(timer);
    }, 500);
    try { fn(); } catch (e) {}
  }

  var WA_SVG = '<svg viewBox="0 0 32 32" aria-hidden="true" style="width:14px;height:14px;flex-shrink:0"><path fill="#25D366" d="M16.04 4C9.42 4 4.05 9.37 4.05 15.99c0 2.11.55 4.17 1.6 5.99L4 28l6.17-1.61a12 12 0 0 0 5.86 1.5h.01c6.62 0 11.99-5.37 11.99-11.99C28.03 9.37 22.66 4 16.04 4zm0 21.9h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.66.96.98-3.57-.24-.37a9.92 9.92 0 0 1-1.52-5.29c0-5.5 4.47-9.97 9.97-9.97a9.9 9.9 0 0 1 7.05 2.92 9.9 9.9 0 0 1 2.92 7.05c0 5.5-4.48 9.86-9.98 9.86zm5.47-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"/></svg>';

  /* Barra sticky inferior de matrícula (todas las landings). Fuera del root de React. */
  function stickyBar(programa) {
    if (document.getElementById('chanakSticky')) return;
    var bar = document.createElement('div');
    bar.id = 'chanakSticky';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Matrícula 2026-27');
    bar.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#0c2d48;color:#fff;display:flex;align-items:center;justify-content:center;gap:14px;padding:10px 14px;font-family:DM Sans,sans-serif;font-size:14px;box-shadow:0 -6px 24px rgba(0,0,0,.25);flex-wrap:wrap;text-align:center';
    bar.innerHTML = '<span style="font-weight:600">Matrícula 2026-27 abierta · Respuesta en 24h</span>' +
      '<a href="' + MATRICULA + '?programa=' + programa + '&src=sticky-landing" style="background:#e8a020;color:#fff;text-decoration:none;border-radius:50px;padding:8px 18px;font-weight:700;white-space:nowrap">Iniciar matrícula →</a>';
    document.body.appendChild(bar);
    document.body.style.paddingBottom = '64px';
  }

  /* Dual Diploma: botón "Formalizar matrícula" junto a cada botón de Stripe. */
  function dualDiplomaButtons() {
    document.querySelectorAll('a[href*="buy.stripe.com"]').forEach(function (a) {
      if (a.dataset.chanakMat) return;
      a.dataset.chanakMat = '1';
      var b = document.createElement('a');
      b.href = MATRICULA + '?programa=dual-diploma&src=dd-landing';
      b.textContent = 'Formalizar matrícula';
      b.style.cssText = 'background:#3A7D2C;color:#fff;text-decoration:none;border-radius:10px;padding:14px 20px;font-weight:700;display:inline-block';
      a.insertAdjacentElement('afterend', b);
    });
  }

  /* Off-Campus: sello "Testimonio recibido por WhatsApp" en las tarjetas con estrellas. */
  function testimonialBadges() {
    document.querySelectorAll('div').forEach(function (d) {
      if (d.textContent === '★★★★★' && d.parentElement && !d.parentElement.dataset.chanakWa) {
        var card = d.parentElement;
        card.dataset.chanakWa = '1';
        var tag = document.createElement('div');
        tag.style.cssText = 'display:flex;align-items:center;gap:6px;font-size:11px;color:#1f9e4f;font-weight:600;margin-top:12px;padding-top:10px;border-top:1px dashed #D1D5E8';
        tag.innerHTML = WA_SVG + '<span>Testimonio recibido por WhatsApp</span>';
        card.appendChild(tag);
      }
    });
  }

  /* Enlazado interno SEO entre landings (footer ligero, fuera del root). */
  function internalLinks(items) {
    if (document.getElementById('chanakXlinks')) return;
    var box = document.createElement('div');
    box.id = 'chanakXlinks';
    box.style.cssText = 'background:#f4f8fb;border-top:1px solid #d8e6ee;padding:18px 5% 84px;font-family:DM Sans,sans-serif;font-size:13px;color:#5b7a91;text-align:center';
    box.innerHTML = 'También te puede interesar: ' + items.map(function (i) {
      return '<a href="' + i[0] + '" style="color:#1a5f8a;font-weight:600;text-decoration:underline">' + i[1] + '</a>';
    }).join(' · ');
    document.body.appendChild(box);
  }

  ready(function () {
    /* Todo va dentro de keepApplying: la hidratación de React puede eliminar
       nodos añadidos al body; las funciones son idempotentes y se re-aplican. */
    if (path.indexOf('/dual-diploma-panama') === 0) {
      keepApplying(function () { stickyBar('dual-diploma-panama'); });
      return;
    }
    if (path.indexOf('/off-campus') === 0) {
      keepApplying(function () {
        stickyBar('off-campus');
        testimonialBadges();
        internalLinks([
          ['/dual-diploma/', 'Doble titulación: Dual Diploma americano'],
          ['/diagnostico/', 'Test de nivel homeschool (50€)']
        ]);
      });
    } else if (path.indexOf('/dual-diploma') === 0) {
      keepApplying(function () {
        stickyBar('dual-diploma');
        dualDiplomaButtons();
        internalLinks([
          ['/off-campus/', 'Colegio americano online homeschool'],
          ['/diagnostico/', 'Evaluación de nivel académico (50€)']
        ]);
      });
    }
  });
})();
