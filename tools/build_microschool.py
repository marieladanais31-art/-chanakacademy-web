#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Bloques de Microschool en /microschools/ y /open-a-microschool/ (ES, EN, CA, FR): tres pilares, tabla por país,
marco legal (solo normas verificadas + resumen), camino del socio en 7 pasos, kit del fundador, FAQ y JSON-LD.
Idempotente (marcadores <!-- cx:… -->). Uso: python3 tools/build_microschool.py   (después de patch_landings.py)"""
import html, json, os, re, sys, datetime
sys.path.insert(0, os.path.dirname(__file__))
from build_site import ROOT, BASE, V, ld, faq_ld
from site_i18n import LINKS
import ms_content as C
import build_normativa

MS = {'es': 'microschools/index.html', 'en': 'microschools/en/index.html', 'ca': 'microschools/ca/index.html', 'fr': 'microschools/fr/index.html'}
OPEN = {'es': 'open-a-microschool/index.html', 'en': 'open-a-microschool/en/index.html', 'ca': 'open-a-microschool/ca/index.html', 'fr': 'open-a-microschool/fr/index.html'}
MS_URL = {'es': '/microschools/', 'en': '/microschools/en/', 'ca': '/microschools/ca/', 'fr': '/microschools/fr/'}
OPEN_URL = {'es': '/open-a-microschool/', 'en': '/open-a-microschool/en/', 'ca': '/open-a-microschool/ca/', 'fr': '/open-a-microschool/fr/'}
ROADMAP_ID = {'es': 'ruta-del-socio', 'en': 'partner-roadmap', 'ca': 'ruta-del-soci', 'fr': 'feuille-de-route'}
DATE = {'es': '{d} de {m} de {y}', 'en': '{m} {d}, {y}', 'ca': '{d} de {m} de {y}', 'fr': '{d} {m} {y}'}
MONTHS = {'es': 'enero febrero marzo abril mayo junio julio agosto septiembre octubre noviembre diciembre'.split(),
          'en': 'January February March April May June July August September October November December'.split(),
          'ca': 'gener febrer març abril maig juny juliol agost setembre octubre novembre desembre'.split(),
          'fr': 'janvier février mars avril mai juin juillet août septembre octobre novembre décembre'.split()}


def today(lang):
    t = datetime.date.today()
    return DATE[lang].format(d=t.day, m=MONTHS[lang][t.month - 1], y=t.year)


def wrap(tag, inner):
    return f'<!-- cx:{tag} --><div class="cx">{inner}</div><!-- /cx:{tag} -->'


def pilares(lang, with_why=False):
    L = LINKS[lang]
    cards = ''.join(f'<div class="cx-card cx-pillar"><h3>{t[lang]}</h3><p>{p[lang]}</p></div>' for t, p in C.PILLARS)
    why = f'<p class="cx-lead" style="max-width:900px;margin:18px auto 0">{C.WHY_EXTRA[lang]}</p>' if with_why else ''
    return wrap('pilares', f'''<section class="cx-sec cx-soft" id="pilares"><div class="cx-wrap">
<div class="cx-center"><div class="cx-eyebrow">{C.PIL_EYE[lang]}</div><h2>{C.PIL_H2[lang]}</h2><p class="cx-lead">{C.PIL_LEAD[lang]}</p>{why}</div>
<div class="cx-grid cx-g3">{cards}</div>
<p class="cx-policy">{C.PIL_LEGAL[lang]}</p>
<p class="cx-note cx-center">{C.PIL_FAMILIES[lang].format(hs=L['hs'], dd=L['dd'])}</p>
</div></section>''')


def geo_legal(lang, data):
    th = C.GEO_TH[lang]
    rows = ''.join(f'<tr><td><b>{a[lang]}</b></td><td>{b[lang]}</td></tr>' for a, b in C.GEO_ROWS)
    acc = ''
    for p in data['paises']:
        if p['id'] == 'other':
            continue
        norms = ''.join(f'<li>{html.escape(n)}</li>' for n in p['legal'])
        norms = f'<p class="cx-norm-h">{C.LEGAL_NORMS[lang]}</p><ul class="cx-norms">{norms}</ul>' if norms else f'<p class="cx-norm-note">{html.escape(p["legal_note"][lang])}</p>'
        acc += f'<details><summary>{p["name"][lang]}</summary>{norms}<p>{html.escape(p["resumen"][lang])}</p></details>'
    return wrap('porpais', f'''<section class="cx-sec" id="por-pais"><div class="cx-wrap">
<div class="cx-eyebrow">{C.GEO_EYE[lang]}</div><h2>{C.GEO_H2[lang]}</h2>
<div class="cx-table-w"><table class="cx-table"><thead><tr><th>{th[0]}</th><th>{th[1]}</th></tr></thead><tbody>{rows}</tbody></table></div>
<p class="cx-note">{C.PIL_LEGAL[lang]}</p>
</div></section>
<section class="cx-sec cx-soft" id="marco-legal"><div class="cx-wrap">
<div class="cx-center"><div class="cx-eyebrow">{C.LEGAL_EYE[lang]}</div><h2>{C.LEGAL_H2[lang]}</h2></div>
<div class="cx-faq cx-legal">{acc}</div>
<p class="cx-note cx-center" style="max-width:820px;margin-left:auto;margin-right:auto">{C.LEGAL_FOOT[lang].format(date=today(lang))}</p>
</div></section>''')


def tools(lang, skip=()):
    L = LINKS[lang]
    cards = ''.join(f'<a class="cx-card" href="{L[k]}" style="text-decoration:none"><h3>{t[lang]} →</h3><p>{p[lang]}</p></a>' for t, p, k in C.TOOLS if k not in skip)
    return wrap('herramientas', f'''<section class="cx-sec" id="herramientas"><div class="cx-wrap">
<div class="cx-center"><h2>{C.TOOLS_H[lang]}</h2></div><div class="cx-grid cx-g3">{cards}</div></div></section>''')


def steps(lang):
    li = ''.join(f'<li><span class="cx-step-n">{i}</span><div><h3>{a[lang]}</h3><p>{b[lang]}</p></div></li>' for i, (a, b) in enumerate(C.STEPS, 1))
    return f'''<!-- cx:pasos --><div class="cx"><section class="cx-sec cx-soft" id="{ROADMAP_ID[lang]}"><div class="cx-wrap">
<div class="cx-center"><div class="cx-eyebrow">{C.STEPS_EYE[lang]}</div><h2>{C.STEPS_H2[lang]}</h2><p class="cx-lead">{C.STEPS_LEAD[lang]}</p></div>
<ol class="cx-timeline">{li}</ol>
</div></section></div><!-- /cx:pasos -->'''


def kit(lang):
    L = LINKS[lang]; F = C.KIT_F
    return wrap('kit', f'''<section class="cx-sec cx-navy" id="kit-fundador"><div class="cx-wrap cx-split">
<div><div class="cx-eyebrow">{C.KIT_EYE[lang]}</div><h2>{C.KIT_H2[lang]}</h2><p class="cx-lead">{C.KIT_P[lang]}</p>
<ul class="cx-list" style="margin-top:18px"><li>{C.TOOLS[0][0][lang]}</li><li>{C.TOOLS[1][0][lang]}</li></ul></div>
<div><form class="cx-form" data-cx-form data-lang="{lang}" data-sending="{C.FORM_MSG['sending'][lang]}" data-err="{C.FORM_MSG['err'][lang]}" action="/enviar-formulario.php" method="post" novalidate>
<input type="hidden" name="necesidad" value="microschool"><input type="hidden" name="producto" value="microschool"><input type="hidden" name="origen" value="kit-fundador">
<label class="l" for="kf-o">{F['org'][lang]}</label><input class="cx-inp" id="kf-o" name="organizacion" autocomplete="organization" required>
<div class="cx-f2"><div><label class="l" for="kf-p">{F['country'][lang]}</label><input class="cx-inp" id="kf-p" name="pais" autocomplete="country-name" required></div>
<div><label class="l" for="kf-c">{F['city'][lang]}</label><input class="cx-inp" id="kf-c" name="ciudad" autocomplete="address-level2" required></div></div>
<label class="l" for="kf-n">{F['name'][lang]}</label><input class="cx-inp" id="kf-n" name="nombre" autocomplete="name" required>
<div class="cx-f2"><div><label class="l" for="kf-e">{F['email'][lang]}</label><input class="cx-inp" id="kf-e" name="email" type="email" autocomplete="email" required></div>
<div><label class="l" for="kf-k">{F['cap'][lang]}</label><input class="cx-inp" id="kf-k" name="capacidad_estimada" type="number" min="1" max="500" inputmode="numeric" required></div></div>
<input class="cx-hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
<label class="cx-check"><input type="checkbox" name="consentimiento" required><span>{C.PRIV[lang].format(priv=L['priv'])}</span></label>
<button class="cx-btn cx-btn-t" type="submit">{F['send'][lang]}</button><p class="cx-err" role="alert" hidden></p></form>
<template class="cx-ok-t"><h3>{F['ok_h'][lang]}</h3><p>{F['ok_p'][lang]}</p><p><a class="cx-btn cx-btn-n" href="{L['budget']}">{C.TOOLS[0][0][lang]} →</a></p><p><a class="cx-btn cx-btn-o" href="{L['err7']}">{C.TOOLS[1][0][lang]} →</a></p><p><a href="/assets/descargas/Calculadora-Presupuesto-Microschool-Chanak-ES.xlsx" download>{F['xlsx'][lang]}</a></p></template></div>
</div></section>''') + f'<script defer src="/assets/js/cx-forms.js?v={V}"></script>'


def faq_block(lang):
    items = ''.join(f'<details><summary>{html.escape(q[lang])}</summary><p>{html.escape(a[lang])}</p></details>' for q, a in C.FAQ)
    return wrap('faq', f'<section class="cx-sec" id="faq-socios"><div class="cx-wrap"><div class="cx-center"><h2>{C.FAQ_H2[lang]}</h2></div><div class="cx-faq">{items}</div></div></section>')


def put(h, tag, block, before=None):
    rx = re.compile(rf'<!-- cx:{tag} -->.*?<!-- /cx:{tag} -->(?:<script defer src="/assets/js/cx-forms\.js\?v=\d+"></script>)?', re.S)
    if rx.search(h):
        return rx.sub(lambda m: block, h, count=1)
    i = before(h) if callable(before) else h.find(before)
    if i is None or i < 0:
        raise SystemExit(f'no encuentro dónde insertar {tag}')
    return h[:i] + block + '\n' + h[i:]


def nth_section(n):
    def f(h):
        m = h.find('<main')
        pos = [x.start() for x in re.finditer(r'<section class="content-sec', h) if x.start() > m]
        # si hay un bloque cx justo delante de la sección, insertar antes de ese bloque
        i = pos[n]
        prev = h.rfind('<!-- cx:', 0, i)
        if prev > 0 and h[prev:i].count('<!-- /cx:') == 1 and h[h.find('-->', h.rfind('<!-- /cx:', 0, i)) + 3:i].strip() == '':
            return prev
        return i
    return f


def meta(h, title, desc):
    h = re.sub(r'<title>.*?</title>', f'<title>{title}</title>', h, 1, flags=re.S)
    h = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{html.escape(desc)}">', h, 1)
    h = re.sub(r'<meta property="og:title" content="[^"]*">', f'<meta property="og:title" content="{html.escape(title)}">', h, 1)
    h = re.sub(r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{html.escape(desc)}">', h, 1)
    return h


def head_ld(h, block):
    blk = f'<!-- cx:ld -->{block}<!-- /cx:ld -->'
    if '<!-- cx:ld -->' in h:
        return re.sub(r'<!-- cx:ld -->.*?<!-- /cx:ld -->', lambda m: blk, h, 1, flags=re.S)
    return h.replace('</head>', blk + '\n</head>', 1)


def crumbs(lang, trail):
    return {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": i, "name": n, "item": BASE + u} for i, (n, u) in enumerate([('Chanak', LINKS[lang]['home'])] + trail, 1)]}


def xdefault(h, url_es):
    if 'hreflang="x-default"' not in h:
        h = h.replace('<link rel="alternate" hreflang="es"', f'<link rel="alternate" hreflang="x-default" href="{BASE}{url_es}">\n  <link rel="alternate" hreflang="es"', 1)
    return h


def microschools(lang, data):
    p = os.path.join(ROOT, MS[lang]); h = open(p, encoding='utf-8').read()
    h = meta(h, C.MS_TITLE[lang], C.MS_DESC[lang])
    h = xdefault(h, '/microschools/')
    h = put(h, 'pilares', pilares(lang), nth_section(1))
    last = lambda s: (s.find('<!-- cx:fundadores -->') if '<!-- cx:fundadores -->' in s else [x.start() for x in re.finditer(r'<section class="content-sec', s)][-1])
    h = put(h, 'porpais', geo_legal(lang, data), last)
    h = put(h, 'herramientas', tools(lang), lambda s: [x.start() for x in re.finditer(r'<section class="content-sec', s)][-1])
    h = head_ld(h, ld(crumbs(lang, [(C.CRUMB_MS[lang], MS_URL[lang])])))
    open(p, 'w', encoding='utf-8').write(h); print('  ·', MS[lang])


def open_page(lang, data):
    p = os.path.join(ROOT, OPEN[lang]); h = open(p, encoding='utf-8').read()
    h = meta(h, C.OPEN_TITLE[lang], C.OPEN_DESC[lang])
    h = xdefault(h, '/open-a-microschool/')
    h = re.sub(r'<h1 class="hero-title">.*?</h1>', f'<h1 class="hero-title">{C.HERO_H1[lang]}</h1>', h, 1, flags=re.S)
    h = re.sub(r'<p class="hero-lead">.*?</p>', f'<p class="hero-lead">{C.HERO_LEAD[lang]}</p>', h, 1, flags=re.S)
    h = re.sub(r'(<div class="hero-ctas">).*?(</div>)', lambda m: f'{m.group(1)}\n            <a href="#partner-form" class="btn btn-gold">{C.HERO_CTA[lang]}</a>\n            <a href="#test-socio" class="btn btn-outline-white">{C.HERO_CTA2[lang]}</a>\n          {m.group(2)}', h, 1, flags=re.S)
    # tarjeta ESA: sin «cobro/gestión centralizada»
    h = re.sub(r'<h3 class="card-title">[^<]*ESA[^<]*</h3>\s*<p class="card-desc">.*?</p>', f'<h3 class="card-title">{C.ESA_CARD[0][lang]}</h3>\n            <p class="card-desc">{C.ESA_CARD[1][lang]}</p>', h, 1, flags=re.S)
    for a, b in [(' con validez internacional', ''), ('Un modelo presencial llave en mano', 'Un modelo presencial')]:
        h = h.replace(a, b)
    h = put(h, 'pilares', pilares(lang, True), nth_section(1))
    # camino del socio: sustituye la sección de 6 pasos por la línea de tiempo de 7
    if '<!-- cx:pasos -->' in h:
        h = re.sub(r'<!-- cx:pasos -->.*?<!-- /cx:pasos -->', lambda m: steps(lang), h, 1, flags=re.S)
    else:
        m = re.search(r'<section class="content-sec[^"]*" id="%s">' % ROADMAP_ID[lang], h)
        e = h.index('</section>', m.start()) + len('</section>')
        h = h[:m.start()] + steps(lang) + h[e:]
    h = put(h, 'kit', kit(lang), lambda s: re.search(r'<section class="content-sec[^"]*" id="recursos">', s).start())
    pf = lambda s: re.search(r'<section class="content-sec[^"]*" id="partner-form">', s).start()
    h = put(h, 'porpais', geo_legal(lang, data), pf)
    h = put(h, 'faq', faq_block(lang), pf)
    h = put(h, 'herramientas', tools(lang, skip=('open',)), pf)
    howto = {"@type": "HowTo", "name": C.STEPS_H2[lang], "inLanguage": lang, "step": [{"@type": "HowToStep", "position": i, "name": a[lang], "text": b[lang]} for i, (a, b) in enumerate(C.STEPS, 1)]}
    h = head_ld(h, ld(crumbs(lang, [(C.CRUMB_MS[lang], MS_URL[lang]), (C.CRUMB_OPEN[lang], OPEN_URL[lang])]), howto, faq_ld([(q[lang], a[lang]) for q, a in C.FAQ])))
    open(p, 'w', encoding='utf-8').write(h); print('  ·', OPEN[lang])


if __name__ == '__main__':
    print('Normativa:'); data = build_normativa.build()
    print('Microschool:')
    for l in C.L4:
        microschools(l, data); open_page(l, data)
