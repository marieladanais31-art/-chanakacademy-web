#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Pone la cabecera única del sitio (la de tools/build_site.py) en las landings hechas a mano y pasa
sus enlaces internos a una barra secundaria de anclas. Idempotente: usa marcadores <!-- cx:header -->.
Uso: python3 tools/unify_headers.py   (después de build_site.py y patch_landings.py)"""
import json, os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
from build_site import header, V, ROOT
from site_i18n import T
import core_content
import notice_content
import pt_como

FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
         '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500&amp;family=DM+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet">')
CSS = f'<link rel="stylesheet" href="/assets/css/site.css?v={V}">'
BURGER = ("<script>(function(){document.querySelectorAll('.cx-burger').forEach(function(b){var n=b.parentNode.querySelector('.cx-nav');"
          "if(n&&!b.dataset.cx){b.dataset.cx=1;b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)})}});document.querySelectorAll('.cx-langs a').forEach(function(a){a.addEventListener('click',function(){try{localStorage.setItem('chanak_lang',a.getAttribute('hreflang'))}catch(e){}})});})();</script>")
SUB_LABEL = dict(es='En esta página', en='On this page', ca='En aquesta pàgina', fr='Sur cette page', pt='Nesta página')


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


MS = {'es': '/microschools/?lang=es', 'en': '/microschools/en/', 'ca': '/microschools/ca/', 'fr': '/microschools/fr/', 'pt': '/microschools/pt/'}
OPEN = {'es': '/open-a-microschool/?lang=es', 'en': '/open-a-microschool/en/', 'ca': '/open-a-microschool/ca/', 'fr': '/open-a-microschool/fr/', 'pt': '/open-a-microschool/pt/'}
MS_SUB = {
    'es': [('Microschools', '/microschools/?lang=es'), ('Abre una Microschool', '/open-a-microschool/?lang=es'), ('Los tres pilares', '#pilares'), ('Según tu país', '#por-pais'), ('Marco legal', '#marco-legal'), ('Presupuesto', '/microschools/presupuesto/'), ('7 errores', '/microschools/7-errores/')],
    'en': [('Microschools', '/microschools/en/'), ('Open a Microschool', '/open-a-microschool/en/'), ('The three pillars', '#pilares'), ('By country', '#por-pais'), ('Legal framework', '#marco-legal'), ('Budget', '/en/microschools/budget/'), ('7 mistakes', '/en/microschools/7-mistakes/')],
    'ca': [('Microschools', '/microschools/ca/'), ('Obre una Microschool', '/open-a-microschool/ca/'), ('Els tres pilars', '#pilares'), ('Segons el teu país', '#por-pais'), ('Marc legal', '#marco-legal'), ('Pressupost', '/ca/microschools/pressupost/'), ('7 errors', '/ca/microschools/7-errors/')],
    'fr': [('Microschools', '/microschools/fr/'), ('Ouvrir une Microschool', '/open-a-microschool/fr/'), ('Les trois piliers', '#pilares'), ('Selon votre pays', '#por-pais'), ('Cadre légal', '#marco-legal'), ('Budget', '/fr/microschools/budget/'), ('7 erreurs', '/fr/microschools/7-erreurs/')],
    'pt': [('Microschools', '/microschools/pt/'), ('Abra uma Microschool', '/open-a-microschool/pt/'), ('Os três pilares', '#pilares'), ('Conforme o seu país', '#por-pais'), ('Marco legal', '#marco-legal'), ('Orçamento', '/pt/microschools/orcamento/'), ('7 erros', '/pt/microschools/7-erros/')],
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


def pt_js(h):
    """Português en el cambio de idioma por JS de /como-funciona/ (?lang=pt). Idempotente."""
    if "T.pt=Object.assign" in h:
        h = re.sub(r"/\* cx:pt \*/.*?/\* /cx:pt \*/", lambda m: _pt_block(), h, count=1, flags=re.S)
        return h
    h = h.replace("['es','en','ca','fr'].indexOf(URL_LANG)", "['es','en','ca','fr','pt'].indexOf(URL_LANG)").replace("['es','en','ca','fr'].indexOf(SAVED_LANG)", "['es','en','ca','fr','pt'].indexOf(SAVED_LANG)")
    h = h.replace("(l==='fr'?'fr/':''))));", "(l==='fr'?'fr/':(l==='pt'?'pt/':'')))));")
    h = h.replace("const N={es:'ES',en:'EN',ca:'CA',fr:'FR'};", "const N={es:'ES',en:'EN',ca:'CA',fr:'FR',pt:'PT'};")
    h = h.replace('<div class="lang-opt" onclick="setLang(\'fr\')">Français</div>', '<div class="lang-opt" onclick="setLang(\'fr\')">Français</div>\n<div class="lang-opt" onclick="setLang(\'pt\')">Português</div>', 1)
    h = h.replace('<span class="mob-lang" onclick="setLang(\'fr\')">FR</span>', '<span class="mob-lang" onclick="setLang(\'fr\')">FR</span>\n<span class="mob-lang" onclick="setLang(\'pt\')">PT</span>', 1)
    h = h.replace("  fr:['--','École à la maison / Homeschool','École publique','École privée','Actuellement non scolarisé','Autre']", "  fr:['--','École à la maison / Homeschool','École publique','École privée','Actuellement non scolarisé','Autre'],\n  pt:" + json.dumps(pt_como.FORM_FSIT, ensure_ascii=False), 1)
    h = h.replace("  fr:['--','Primaire','Collège','Lycée / High School','A terminé ses études','Autre']", "  fr:['--','Primaire','Collège','Lycée / High School','A terminé ses études','Autre'],\n  pt:" + json.dumps(pt_como.FORM_FETAPA, ensure_ascii=False), 1)
    h = h.replace("const FORM_SELECT_OPTIONS={", "/* cx:pt */" + _pt_block() + "/* /cx:pt */\nconst FORM_SELECT_OPTIONS={", 1)
    return h


def _pt_block():
    return ("T.pt=Object.assign({},T.es," + json.dumps(pt_como.TPT, ensure_ascii=False) + ");")


def como_funciona():
    """Una sola página con cuatro idiomas (setLang): se generan las cuatro cabeceras y se muestra la del idioma activo."""
    path = 'como-funciona/index.html'
    p = os.path.join(ROOT, path)
    h = open(p, encoding='utf-8').read()
    urls = {l: f'/como-funciona/?lang={l}' for l in ('es', 'en', 'ca', 'fr', 'pt')}
    subs = {'es': [('Método', '#modelo'), ('Plan de Estudios Core', '#core'), ('Currículos', '#curriculos'), ('Portales', '#portales'), ('Identidad', '#quien'), ('Preguntas', '#faq'), ('Tarifas', '/tarifas/')],
            'en': [('Method', '#modelo'), ('Core Curriculum', '#core'), ('Curricula', '#curriculos'), ('Portals', '#portales'), ('Who we are', '#quien'), ('FAQ', '#faq'), ('Tuition', '/en/tuition/')],
            'ca': [('Mètode', '#modelo'), ('Pla d’Estudis Core', '#core'), ('Currículums', '#curriculos'), ('Portals', '#portales'), ('Identitat', '#quien'), ('Preguntes', '#faq'), ('Tarifes', '/tarifas/')],
            'pt': pt_como.SUBNAV,
            'fr': [('Méthode', '#modelo'), ('Programme Core', '#core'), ('Programmes', '#curriculos'), ('Portails', '#portales'), ('Identité', '#quien'), ('Questions', '#faq'), ('Tarifs', '/en/tuition/')]}
    parts = ''.join(f'<div class="cx cx-hdr" data-cxl="{l}"{"" if l == "es" else " hidden"}>{header(l, urls)}{subnav(l, subs[l])}</div>' for l in ('es', 'en', 'ca', 'fr', 'pt'))
    sync = ("<script>(function(){function s(){var l=(document.documentElement.lang||document.documentElement.getAttribute('data-lang')||'es').slice(0,2);"
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
    from site_i18n import LINKS
    join = lambda l: f'<p class="cx-join">{T["join_line"][l].format(u=LINKS[l]["unete"])}</p>'
    core_html = lambda l: pt_como.core_section() if l == 'pt' else core_content.section(l)
    core = '<!-- cx:core -->' + ''.join(f'<div class="cx" data-cxl="{l}"{"" if l == "es" else " hidden"}>{core_html(l)}{join(l)}</div>' for l in ('es', 'en', 'ca', 'fr', 'pt')) + '<!-- /cx:core -->'
    if '<!-- cx:core -->' in h:
        h = re.sub(r'<!-- cx:core -->.*?<!-- /cx:core -->', lambda m: core, h, count=1, flags=re.S)
    else:
        k = h.index('<section id="tarifas"')
        h = h[:k] + core + h[k:]
    nt = '<!-- cx:aviso -->' + notice_content.section(extra_attr=' data-cxl="en" hidden').replace('<!-- cx:aviso -->', '').replace('<!-- /cx:aviso -->', '') + '<!-- /cx:aviso -->'
    h = re.sub(r'<!-- cx:aviso -->.*?<!-- /cx:aviso -->', '', h, flags=re.S)
    k = h.index('<section id="tarifas"')
    h = h[:k] + nt + h[k:]
    desc = 'Currículo Core de Chanak: Estándares B.E.S.T. de Florida, Mastery Learning y cosmovisión cristiana. Modelo 60/20/20, currículos, portales y preguntas.'
    h = re.sub(r'<meta content="[^"]*" name="description"/>', f'<meta content="{desc}" name="description"/>', h, 1)
    h = re.sub(r'<title>.*?</title>', '<title>Cómo funciona Chanak: método, currículo Core y portales</title>', h, 1)
    h = pt_js(h)
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
    for l in ('es', 'en', 'ca', 'fr', 'pt'):
        if not os.path.exists(os.path.join(ROOT, MS[l].split('?')[0].strip('/') + '/index.html')):
            print('  · (sin página aún)', MS[l]); continue
        swap(MS[l].split('?')[0].strip('/') + '/index.html', r'(<!-- Header -->\s*)?<header class="site-header">', '</header>', block(l, MS, MS_SUB[l]))
        swap(OPEN[l].split('?')[0].strip('/') + '/index.html', r'(<!-- Header -->\s*)?<header class="site-header">', '</header>', block(l, OPEN, MS_SUB[l]))
    swap('off-campus/index.html', r'<div class="topbar">', '</header>', block('es', {'es': '/off-campus/', 'en': '/off-campus/en/'},
         [('Programa', '#programa'), ('Planes', '#planes'), ('Qué incluye', '#incluye'), ('Currículo y materiales', '#curriculos'), ('Inversión', '#inversion')], REGION))
    swap('dual-diploma/index.html', r'<div class="topbar">', '</header>', block('es', {'es': '/dual-diploma/', 'en': '/dual-diploma/en/'},
         [('Cómo funciona', '#como-funciona'), ('Itinerarios', '#rutas'), ('Currículo', '#core'), ('Precios', '#inversion'), ('University Pathways', '#university-pathways')], REGION))
    como_funciona()
    en_js()
    offcampus_form()
