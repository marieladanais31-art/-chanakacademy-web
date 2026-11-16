#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Pone la cabecera única del sitio (la de tools/build_site.py) en las landings hechas a mano y pasa
sus enlaces internos a una barra secundaria de anclas. Idempotente: usa marcadores <!-- cx:header -->.
Uso: python3 tools/unify_headers.py   (después de build_site.py y patch_landings.py)"""
import json, os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
from build_site import header, V, ROOT
from site_i18n import T

FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
         '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500&amp;family=DM+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet">')
CSS = f'<link rel="stylesheet" href="/assets/css/site.css?v={V}">'
BURGER = ("<script>(function(){document.querySelectorAll('.cx-burger').forEach(function(b){var n=b.parentNode.querySelector('.cx-nav');"
          "if(n&&!b.dataset.cx){b.dataset.cx=1;b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)})}});document.querySelectorAll('.cx-langs a').forEach(function(a){a.addEventListener('click',function(){try{localStorage.setItem('chanak_lang',a.getAttribute('hreflang'))}catch(e){}})});})();</script>")
SUB_LABEL = dict(es='En esta página', en='On this page', ca='En aquesta pàgina', fr='Sur cette page')


def subnav(lang, links, extra=''):
    if not links and not extra:
        return ''
    a = ''.join(f'<a href="{u}">{n}</a>' for n, u in links)
    return f'<nav class="cx-subnav" aria-label="{SUB_LABEL[lang]}"><div class="cx-subnav-in">{a}{extra}</div></nav>'


def block(lang, urls, links=(), extra=''):
    return f'<!-- cx:header --><div class="cx cx-hdr">{header(lang, urls)}{subnav(lang, links, extra)}</div>{BURGER}<!-- /cx:header -->'


def ensure_css(h):
    h = re.sub(r'<link rel="stylesheet" href="/assets/css/site\.css\?v=\d+">', CSS, h)
    if 'assets/css/site.css' not in h:
        h = h.replace('</head>', CSS + '</head>', 1)
    if 'family=Playfair+Display' not in h:
        h = h.replace('</head>', FONTS + '</head>', 1)
    return h


def swap(path, start_rx, end_str, blk):
    p = os.path.join(ROOT, path)
    h = open(p, encoding='utf-8').read()
    if '<!-- cx:header -->' in h:
        h = re.sub(r'<!-- cx:header -->.*?<!-- /cx:header -->', lambda m: blk, h, count=1, flags=re.S)
    else:
        m = re.search(start_rx, h, re.S)
        if not m:
            raise SystemExit(f'{path}: no encuentro la cabecera antigua')
        e = h.index(end_str, m.start()) + len(end_str)
        h = h[:m.start()] + blk + h[e:]
    open(p, 'w', encoding='utf-8').write(ensure_css(h))
    print('  ·', path)


MS = {'es': '/microschools/?lang=es', 'en': '/microschools/en/', 'ca': '/microschools/ca/', 'fr': '/microschools/fr/'}
OPEN = {'es': '/open-a-microschool/?lang=es', 'en': '/open-a-microschool/en/', 'ca': '/open-a-microschool/ca/', 'fr': '/open-a-microschool/fr/'}
MS_SUB = {
    'es': [('Microschools', '/microschools/?lang=es'), ('Abre una Microschool', '/open-a-microschool/?lang=es'), ('Los tres pilares', '#pilares'), ('Según tu país', '#por-pais'), ('Marco legal', '#marco-legal'), ('Presupuesto', '/microschools/presupuesto/'), ('7 errores', '/microschools/7-errores/')],
    'en': [('Microschools', '/microschools/en/'), ('Open a Microschool', '/open-a-microschool/en/'), ('The three pillars', '#pilares'), ('By country', '#por-pais'), ('Legal framework', '#marco-legal'), ('Budget', '/en/microschools/budget/'), ('7 mistakes', '/en/microschools/7-mistakes/')],
    'ca': [('Microschools', '/microschools/ca/'), ('Obre una Microschool', '/open-a-microschool/ca/'), ('Els tres pilars', '#pilares'), ('Segons el teu país', '#por-pais'), ('Marc legal', '#marco-legal'), ('Pressupost', '/ca/microschools/pressupost/'), ('7 errors', '/ca/microschools/7-errors/')],
    'fr': [('Microschools', '/microschools/fr/'), ('Ouvrir une Microschool', '/open-a-microschool/fr/'), ('Les trois piliers', '#pilares'), ('Selon votre pays', '#por-pais'), ('Cadre légal', '#marco-legal'), ('Budget', '/fr/microschools/budget/'), ('7 erreurs', '/fr/microschools/7-erreurs/')],
}
REGION = '<div class="chanak-region-selector-mount region"></div>'


def en_js():
    """Las landings EN de off-campus y dual-diploma son bundles React: la cabecera se inserta tras la hidratación."""
    H = {'off': block('en', {'es': '/off-campus/', 'en': '/off-campus/en/'}, [('Plans', '#planes'), ('What your child receives', '#que-obtiene'), ('Curriculum', '#core'), ('Annual enrollment fee', '#matricula-anual'), ('Tuition', '/en/tuition/#homeschool')]),
         'dual': block('en', {'es': '/dual-diploma/', 'en': '/dual-diploma/en/'}, [('A real week', '#semana'), ('Curriculum', '#core'), ('University pathways', '#university-pathways'), ('How to start', '#opciones-matricula'), ('Tuition', '/en/tuition/#dual')])}
    H = {k: re.sub(r'<script>.*?</script>', '', v, flags=re.S) for k, v in H.items()}
    js = '''/* Cabecera única del sitio para las landings EN compiladas (React). Generado por tools/unify_headers.py */
(function(){var H=%s;var page=location.pathname.indexOf('/dual-diploma')===0?'dual':'off';
function css(){if(!document.querySelector('link[href*="site.css"]')){var l=document.createElement('link');l.rel='stylesheet';l.href='/assets/css/site.css?v=%s';document.head.appendChild(l)}}
function put(){if(document.getElementById('cx-en-header'))return;css();var w=document.createElement('div');w.id='cx-en-header';w.style.display='contents';w.innerHTML=H[page];document.body.insertBefore(w,document.body.firstChild);
var b=w.querySelector('.cx-burger'),n=w.querySelector('.cx-nav');if(b&&n)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
var old=document.querySelector('body nav:not(.cx-nav):not(.cx-subnav):not(.cx-crumbs)');if(old&&!old.closest('#cx-en-header')){old.style.display='none';var p=old.previousElementSibling;if(p&&p.tagName==='DIV'&&!p.hasAttribute('hidden'))p.style.display='none'}}
function start(){setTimeout(put,300);new MutationObserver(function(){if(!document.getElementById('cx-en-header'))put()}).observe(document.body,{childList:true})}
if(document.readyState==='complete')start();else window.addEventListener('load',start)})();
''' % (json.dumps(H, ensure_ascii=False), V)
    open(os.path.join(ROOT, 'assets/js/cx-en-header.js'), 'w', encoding='utf-8').write(js)
    tag = f'<script defer src="/assets/js/cx-en-header.js?v={V}"></script>'
    for path in ('off-campus/en/index.html', 'dual-diploma/en/index.html'):
        p = os.path.join(ROOT, path)
        h = open(p, encoding='utf-8').read()
        h = re.sub(r'<script defer src="/assets/js/cx-en-header\.js\?v=\d+"></script>', '', h)
        h = h.replace('</head>', tag + '</head>', 1)
        open(p, 'w', encoding='utf-8').write(h)
        print('  ·', path, '(cabecera por JS)')


def como_funciona():
    """Una sola página con cuatro idiomas (setLang): se generan las cuatro cabeceras y se muestra la del idioma activo."""
    path = 'como-funciona/index.html'
    p = os.path.join(ROOT, path)
    h = open(p, encoding='utf-8').read()
    urls = {l: f'/como-funciona/?lang={l}' for l in ('es', 'en', 'ca', 'fr')}
    subs = {'es': [('Método', '#modelo'), ('Plan de Estudios Core', '#core'), ('Currículos', '#curriculos'), ('Portales', '#portales'), ('Identidad', '#quien'), ('Preguntas', '#faq'), ('Tarifas', '/tarifas/')],
            'en': [('Method', '#modelo'), ('Core Curriculum', '#core'), ('Curricula', '#curriculos'), ('Portals', '#portales'), ('Who we are', '#quien'), ('FAQ', '#faq'), ('Tuition', '/en/tuition/')],
            'ca': [('Mètode', '#modelo'), ('Pla d’Estudis Core', '#core'), ('Currículums', '#curriculos'), ('Portals', '#portales'), ('Identitat', '#quien'), ('Preguntes', '#faq'), ('Tarifes', '/tarifas/')],
            'fr': [('Méthode', '#modelo'), ('Programme Core', '#core'), ('Programmes', '#curriculos'), ('Portails', '#portales'), ('Identité', '#quien'), ('Questions', '#faq'), ('Tarifs', '/en/tuition/')]}
    parts = ''.join(f'<div class="cx cx-hdr" data-cxl="{l}"{"" if l == "es" else " hidden"}>{header(l, urls)}{subnav(l, subs[l])}</div>' for l in ('es', 'en', 'ca', 'fr'))
    sync = ("<script>(function(){function s(){var l=(document.documentElement.getAttribute('data-lang')||document.documentElement.lang||'es').slice(0,2);"
            "var q=document.querySelectorAll('[data-cxl]'),ok=false;q.forEach(function(e){if(e.dataset.cxl===l)ok=true});if(!ok)l='es';"
            "q.forEach(function(e){e.hidden=e.dataset.cxl!==l})}s();new MutationObserver(s).observe(document.documentElement,{attributes:true,attributeFilter:['lang','data-lang']});"
            "document.addEventListener('click',function(e){var a=e.target.closest('.cx-langs a');if(a&&typeof setLang==='function'){e.preventDefault();setLang(a.getAttribute('hreflang'));history.replaceState(null,'',a.getAttribute('href'))}})})();</script>")
    blk = f'<!-- cx:header -->{parts}{BURGER}{sync}<!-- /cx:header -->'
    if '<!-- cx:header -->' in h:
        h = re.sub(r'<!-- cx:header -->.*?<!-- /cx:header -->', lambda m: blk, h, count=1, flags=re.S)
    else:
        i = h.index('<!-- ANNOUNCEMENT BAR -->')
        j = h.index('<!-- HERO -->', i)
        # La navegación antigua se conserva oculta: el JS de idiomas de la página la referencia.
        h = h[:i] + blk + '<div class="cx-legacy-nav" hidden aria-hidden="true" style="display:none!important">' + h[i:j] + '</div>' + h[j:]
    open(p, 'w', encoding='utf-8').write(ensure_css(h))
    print('  ·', path)


def offcampus_form():
    """Formulario de /off-campus/: etiquetas visibles encima de cada campo (los placeholders se cortaban)."""
    p = os.path.join(ROOT, 'off-campus/index.html')
    h = open(p, encoding='utf-8').read()
    if 'class="cx-fl' in h:
        return
    def lab(m):
        tag = m.group(0)
        ph = re.search(r'placeholder="([^"]*)"', tag)
        if ph:
            text = ph.group(1)
            tag = tag.replace(ph.group(0), '')
        else:
            text = 'Situación actual'
        wide = ' wide' if re.search(r'class="field wide"', tag) else ''
        tag = tag.replace('class="field wide"', 'class="field"').replace('  ', ' ').replace(' >', '>')
        if tag.startswith('<select'):
            return f'<label class="cx-fl{wide}"><span>{text}</span>{tag}'
        return f'<label class="cx-fl{wide}"><span>{text}</span>{tag}</label>'
    i = h.index('<form id="lead-form"'); j = h.index('</form>', i)
    f = h[i:j]
    f = re.sub(r'<input class="field[^>]*>', lab, f)
    f = re.sub(r'<select class="field[^>]*>', lab, f).replace('</select>', '</select></label>', 1)
    f = f.replace('<option value="">Situación actual</option>', '<option value="">— Selecciona —</option>')
    open(p, 'w', encoding='utf-8').write(h[:i] + f + h[j:])
    print('  · off-campus/index.html (formulario con etiquetas)')


if __name__ == '__main__':
    print('Cabecera única:')
    for l in ('es', 'en', 'ca', 'fr'):
        swap(MS[l].split('?')[0].strip('/') + '/index.html', r'(<!-- Header -->\s*)?<header class="site-header">', '</header>', block(l, MS, MS_SUB[l]))
        swap(OPEN[l].split('?')[0].strip('/') + '/index.html', r'(<!-- Header -->\s*)?<header class="site-header">', '</header>', block(l, OPEN, MS_SUB[l]))
    swap('off-campus/index.html', r'<div class="topbar">', '</header>', block('es', {'es': '/off-campus/', 'en': '/off-campus/en/'},
         [('Programa', '#programa'), ('Planes', '#planes'), ('Qué incluye', '#incluye'), ('Currículo y materiales', '#curriculos'), ('Inversión', '#inversion')], REGION))
    swap('dual-diploma/index.html', r'<div class="topbar">', '</header>', block('es', {'es': '/dual-diploma/', 'en': '/dual-diploma/en/'},
         [('Cómo funciona', '#como-funciona'), ('Itinerarios', '#rutas'), ('Currículo', '#core'), ('Precios', '#inversion'), ('University Pathways', '#university-pathways')], REGION))
    como_funciona()
    en_js()
    offcampus_form()
