#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Crea /como-funciona/ a partir de la portada anterior (git: 8df310e:index.html) para conservar
todo su contenido (método, currículos, portales, identidad, FAQ) fuera de la portada nueva.
Se ejecuta UNA vez; después /como-funciona/index.html se edita directamente."""
import re, subprocess, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = subprocess.run(['git', 'show', '8df310e:index.html'], cwd=ROOT, capture_output=True, text=True).stdout
L = src.split('\n')
def cut(start_pat, end_pat, repl=''):
    global L
    s = next(i for i, l in enumerate(L) if start_pat in l)
    e = next(i for i in range(s, len(L)) if end_pat in L[i])
    return s, e
# 1) Hero → cabecera de página
s = next(i for i, l in enumerate(L) if '<section class="hero" id="inicio">' in l)
e = next(i for i in range(s, len(L)) if L[i].strip() == "</section>")
L[s:e + 1] = ['''<section id="inicio" style="background:linear-gradient(160deg,#072238,#0c2d48 60%,#1a5f8a);color:#fff;padding:64px 0 48px"><div class="wrap">
<p style="font-size:.82rem;color:#b9d0df;margin-bottom:12px"><a href="/" style="color:#fff;text-decoration:underline">Chanak</a> › <span data-i18n="cf_crumb">Cómo funciona</span></p>
<h1 style="font-family:'Playfair Display',serif;font-size:clamp(2rem,4.4vw,3rem);line-height:1.2;margin-bottom:.6rem" data-i18n="cf_h1">Cómo funciona Chanak</h1>
<p style="max-width:720px;color:#c8dcea;font-size:1.05rem" data-i18n="cf_lead">Método, currículos, plataforma, admisión, identidad institucional y preguntas frecuentes. Para elegir programa, vuelve a las modalidades.</p>
<p style="margin-top:20px;display:flex;gap:12px;flex-wrap:wrap"><a class="btn btn-t" href="/#modalidades" data-i18n="cf_routes">Ver las modalidades →</a><a class="btn btn-out" href="/tarifas/" style="color:#fff;border-color:rgba(255,255,255,.7)" data-i18n="cf_fees">Ver tarifas →</a></p>
</div></section>''']
# 2) Bloque "Elige el camino" (ahora vive en la portada)
s = next(i for i, l in enumerate(L) if '<section class="home-section" id="objetivo">' in l)
e = next(i for i, l in enumerate(L) if 'id="modelo"' in l)
tail = L[e][L[e].index('<section class="home-model'):]
L[s:e + 1] = [tail]
# 3) Tarifas por país → página única /tarifas/
s = next(i for i, l in enumerate(L) if 'data-i18n="rd_prices"' in l)
e = next(i for i, l in enumerate(L) if '</section></details><section class="doss-sec" id="dossier">' in l)
L[s:e + 1] = ['''<section id="tarifas" style="padding:56px 0;background:var(--off)"><div class="wrap" style="text-align:center"><div class="lbl" data-i18n="cf_fees_lbl">Tarifas 2026–2027</div><h2 class="ttl" data-i18n="cf_fees_h">Todas las tarifas, en una sola página</h2><p class="sub" style="margin:0 auto 1.2rem" data-i18n="cf_fees_p">Homeschool Guiado, Full Enrollment y Dual Diploma por país, con la matrícula anual y lo que incluye.</p><a class="btn btn-t" href="/tarifas/" data-i18n="cf_fees">Ver tarifas →</a></div></section><section class="doss-sec" id="dossier">''']
h = '\n'.join(L)
# 4) Cabecera SEO
h = re.sub(r'<title>.*?</title>', '<title>Cómo funciona Chanak: método, currículos, plataforma y preguntas frecuentes</title>', h, 1)
h = re.sub(r'<meta content="[^"]*" name="description"/>', '<meta content="Cómo funciona Chanak International Academy: Mastery Learning, modelo 60/20/20, currículos (A.C.E., LIFEPAC, Christian Light, Chanak Flex), portales de familia y estudiante, admisión y preguntas frecuentes." name="description"/>', h, 1)
h = re.sub(r'<link href="[^"]*" rel="canonical"/>', '<link href="https://www.chanakacademy.org/como-funciona/" rel="canonical"/>', h, 1)
h = re.sub(r'<link href="[^"]*" hreflang="[^"]*" rel="alternate"/>\s*', '', h)
h = h.replace('<meta content="https://www.chanakacademy.org/" property="og:url"/>', '<meta content="https://www.chanakacademy.org/como-funciona/" property="og:url"/>')
h = h.replace('<html data-lang="en" lang="en">', '<html data-lang="es" lang="es">')
# El JSON-LD de organización vive en la portada; aquí queda solo el de preguntas frecuentes.
h = re.sub(r'<script type="application/ld\+json">\s*\{\s*"@context": "https://schema.org",\s*"@type": "EducationalOrganization".*?</script>', '', h, 1, flags=re.S)
# 5) Rutas relativas y enlaces a anclas que ya no están aquí
h = re.sub(r'(src|href|poster)="assets/', r'\1="/assets/', h)
h = h.replace("url(assets/", "url(/assets/").replace("url('assets/", "url('/assets/")
for a, b in [('href="#homeschool"', 'href="/#hs"'), ('href="#dual-diploma"', 'href="/#dd"'), ('href="#objetivo"', 'href="/#modalidades"'),
             ('href="/?country=ES#tarifas"', 'href="/tarifas/"'), ('href="/?country=CO#tarifas"', 'href="/tarifas/"'), ('href="/?country=US#tarifas"', 'href="/tarifas/"'),
             ('href="/?country=GLOBAL#tarifas"', 'href="/tarifas/"'), ('href="#tarifas"', 'href="/tarifas/"'), ('href="#inicio"', 'href="/"'), ('href="/tuition/"', 'href="/tarifas/"')]:
    h = h.replace(a, b)
# 6) "Foundation" no aparece en chanakacademy.org
h = h.replace('<br/>Chanak Foundation Inc. · IRS 501(c)(3) Nonprofit', '<br/>Entidad 501(c)(3)')
h = h.replace('<a href="https://foundation.chanakacademy.org" target="_blank">Chanak Foundation ↗</a>\n', '')
h = re.sub(r'Chanak Foundation Inc\. · IRS 501\(c\)\(3\) Nonprofit', 'Entidad 501(c)(3)', h)
# 7) ?lang=en|ca|fr abre la página en ese idioma
h = h.replace('</body>', '<script>try{var cl=new URLSearchParams(location.search).get("lang");if(cl&&typeof setLang==="function")setLang(cl)}catch(e){}</script>\n</body>')
os.makedirs(os.path.join(ROOT, 'como-funciona'), exist_ok=True)
open(os.path.join(ROOT, 'como-funciona/index.html'), 'w', encoding='utf-8').write(h)
print('como-funciona/index.html', len(h) // 1000, 'KB · Foundation:', h.count('Foundation'), '· tarifas refs:', h.count('#tarifas'))
