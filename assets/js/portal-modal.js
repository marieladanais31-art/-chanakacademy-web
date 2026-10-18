/**
 * Chanak International Academy · Accessible Portal Lightbox Modal
 * Opens full preview of portal compositions with discrete disclaimer and keyboard/ARIA accessibility.
 */
(function() {
  'use strict';

  var modal = null;
  var modalImg = null;
  var modalTitle = null;
  var modalCaption = null;
  var modalDisclaimer = null;
  var lastFocusedEl = null;

  var DISCLAIMERS = {
    es: 'Vista ilustrativa del portal. Las funciones y el acceso varían según el programa contratado.',
    en: 'Portal preview. Features and access vary by enrolled program.'
  };

  function getLang() {
    var htmlLang = (document.documentElement.getAttribute('data-lang') || document.documentElement.lang || 'en').toLowerCase();
    return htmlLang.indexOf('es') === 0 ? 'es' : 'en';
  }

  function initModal() {
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = 'portal-lightbox-modal';
    modal.className = 'portal-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'portal-lightbox-title');
    modal.setAttribute('aria-hidden', 'true');

    modal.innerHTML = [
      '<div class="portal-modal-backdrop" data-modal-close></div>',
      '<div class="portal-modal-dialog">',
      '  <div class="portal-modal-header">',
      '    <h3 id="portal-lightbox-title" class="portal-modal-title"></h3>',
      '    <button type="button" class="portal-modal-close" data-modal-close aria-label="Close preview">&times;</button>',
      '  </div>',
      '  <div class="portal-modal-body">',
      '    <img class="portal-modal-img" src="" alt="" />',
      '  </div>',
      '  <div class="portal-modal-footer">',
      '    <span class="portal-modal-caption"></span>',
      '    <span class="portal-modal-disclaimer"></span>',
      '  </div>',
      '</div>'
    ].join('\n');

    document.body.appendChild(modal);

    modalImg = modal.querySelector('.portal-modal-img');
    modalTitle = modal.querySelector('.portal-modal-title');
    modalCaption = modal.querySelector('.portal-modal-caption');
    modalDisclaimer = modal.querySelector('.portal-modal-disclaimer');

    modal.addEventListener('click', function(e) {
      if (e.target && e.target.hasAttribute('data-modal-close')) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function(e) {
      if (modal.classList.contains('active')) {
        if (e.key === 'Escape' || e.keyCode === 27) {
          e.preventDefault();
          closeModal();
        } else if (e.key === 'Tab' || e.keyCode === 9) {
          trapFocus(e);
        }
      }
    });

    return modal;
  }

  function trapFocus(e) {
    if (!modal) return;
    var focusables = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusables.length) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        last.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  }

  function openModal(trigger) {
    initModal();
    lastFocusedEl = trigger;

    var lang = trigger.getAttribute('data-portal-lang') || getLang();
    var src = trigger.getAttribute('data-portal-src') || (trigger.querySelector('img') ? trigger.querySelector('img').currentSrc || trigger.querySelector('img').src : '');
    
    var title = (lang === 'es' ? trigger.getAttribute('data-portal-title-es') : trigger.getAttribute('data-portal-title-en')) || 
                trigger.getAttribute('data-portal-title') || 
                (trigger.querySelector('img') ? trigger.querySelector('img').alt : 'Chanak Portal Preview');
                
    var caption = (lang === 'es' ? trigger.getAttribute('data-portal-caption-es') : trigger.getAttribute('data-portal-caption-en')) || 
                  trigger.getAttribute('data-portal-caption') || '';

    modalImg.src = src;
    modalImg.alt = title;
    modalTitle.textContent = title;
    modalCaption.textContent = caption;
    modalDisclaimer.textContent = DISCLAIMERS[lang] || DISCLAIMERS.en;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    var closeBtn = modal.querySelector('.portal-modal-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    if (!modal || !modal.classList.contains('active')) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (modalImg) modalImg.src = '';
    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
      lastFocusedEl.focus();
    }
  }

  function attachListeners() {
    document.addEventListener('click', function(e) {
      var trigger = e.target.closest('[data-portal-preview]');
      if (trigger) {
        e.preventDefault();
        openModal(trigger);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachListeners);
  } else {
    attachListeners();
  }
})();
