#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Genera HTML estático (sin JS para el contenido) de la portada en 4 idiomas y de la página de tarifas.
Uso:  python3 tools/build_site.py      (desde la raíz del repo)
Textos: tools/site_i18n.py · Precios: PRICING (abajo) — mantener igual que js/regional-pricing.js
"""
import json, os, sys, html
sys.path.insert(0, os.path.dirname(__file__))
from site_i18n import T, LINKS, FAQ

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = 'https://www.chanakacademy.org'
V = '20261116'
LANGS = ['es', 'en', 'ca', 'fr']
STATES = [('Florida', '/florida-home-education/'), ('Arizona', '/arizona/'), ('Utah', '/utah/'), ('Wyoming', '/wyoming/'),
          ('Alabama', '/alabama/'), ('South Carolina', '/south-carolina/'), ('New Hampshire', '/new-hampshire/')]
IMG = '/assets/img/gen/'


def t(k, lang, **kw):
    s = T[k][lang]
    return s.format(**kw) if kw else s


def write(path, content):
    full = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, 'w', encoding='utf-8') as f:
        f.write(content)
    print('  ·', path, f'{len(content)//1000} KB')


ORG_LD = {
    "@type": ["School", "EducationalOrganization"],
    "@id": BASE + "/#school",
    "name": "Chanak International Academy",
    "alternateName": ["Chanak Academy", "Chanak"],
    "legalName": "Chanak TrainUp Education, Inc.",
    "url": BASE + "/",
    "logo": BASE + "/assets/chanak-logo.png",
    "image": BASE + "/assets/og-image.jpg",
    "description": "Christian American K-12 school, accredited by MSA-CESS and registered in Florida (FLDOE #134620), offering Guided Homeschool and Full Enrollment (Off-Campus K-12), U.S. Dual Diploma and Microschool partnerships for families in the United States, Spain, Mexico, Panama and internationally.",
    "slogan": "One faith, different paths, one commitment to excellence",
    "nonprofitStatus": "https://schema.org/Nonprofit501c3",
    "identifier": [{"@type": "PropertyValue", "propertyID": "FLDOE School Number", "value": "134620"}],
    "address": {"@type": "PostalAddress", "streetAddress": "7901 4th St N Ste 300", "addressLocality": "St. Petersburg", "addressRegion": "FL", "postalCode": "33702", "addressCountry": "US"},
    "areaServed": ["US", "ES", "MX", "PA", "CO", "AE", "Worldwide"],
    "knowsLanguage": ["en", "es", "ca", "fr"],
    "hasCredential": {"@type": "EducationalOccupationalCredential", "credentialCategory": "Accreditation", "name": "MSA-CESS Accreditation",
                      "recognizedBy": {"@type": "Organization", "name": "Middle States Association Commissions on Elementary and Secondary Schools (MSA-CESS)", "url": "https://www.msa-cess.org/"}},
    "memberOf": {"@type": "Organization", "name": "Dallas Baptist University Global Community", "url": "https://www.dbu.edu/international/global-community/"},
    "contactPoint": [
        {"@type": "ContactPoint", "contactType": "admissions", "email": "offcampus@chanakacademy.org", "availableLanguage": ["es", "en"]},
        {"@type": "ContactPoint", "contactType": "Dual Diploma admissions", "email": "dualdiploma@chanakacademy.org", "availableLanguage": ["es", "en"]}],
    "sameAs": ["https://www.instagram.com/chanakinternationalacademy/", "https://www.facebook.com/profile.php?id=61585911365975", "https://www.youtube.com/@ChanakAcademy", "https://www.tiktok.com/@chanakacademy7"],
    "hasOfferCatalog": {"@type": "OfferCatalog", "name": "Programs", "itemListElement": [
        {"@type": "Offer", "itemOffered": {"@type": "EducationalOccupationalProgram", "name": "Off-Campus K-12 (Guided Homeschool / Full Enrollment)", "url": BASE + "/off-campus/"}},
        {"@type": "Offer", "itemOffered": {"@type": "EducationalOccupationalProgram", "name": "U.S. Dual Diploma (grades 9-12)", "url": BASE + "/dual-diploma/"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Microschool & Academic Partnerships", "url": BASE + "/microschools/"}}]},
}


def ld(*objs):
    return '<script type="application/ld+json">' + json.dumps({"@context": "https://schema.org", "@graph": list(objs)}, ensure_ascii=False) + '</script>'


def faq_ld(items):
    return {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in items]}


def head(lang, title, desc, canonical, alternates, extra_ld=''):
    alt = ''.join(f'<link rel="alternate" hreflang="{h}" href="{BASE}{u}">\n' for h, u in alternates)
    return f'''<!DOCTYPE html>
<html lang="{T['html_lang'][lang]}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
<meta name="description" content="{html.escape(desc)}">
<link rel="canonical" href="{BASE}{canonical}">
{alt}<meta property="og:type" content="website">
<meta property="og:site_name" content="Chanak International Academy">
<meta property="og:title" content="{html.escape(title)}">
<meta property="og:description" content="{html.escape(desc)}">
<meta property="og:url" content="{BASE}{canonical}">
<meta property="og:image" content="{BASE}/assets/og-image.jpg">
<meta property="og:locale" content="{T['og_locale'][lang]}">
<meta name="twitter:card" content="summary_large_image">
<meta name="p:domain_verify" content="01bc28852997182b55f043dcab4f375f">
<link rel="icon" href="/assets/img/chanak-logo-square.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500&amp;family=DM+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/site.css?v={V}">
<script src="/assets/js/consent-tracking.js?v=20261008audit1"></script>
{extra_ld}
</head>
<body class="cx cx-page">
<a class="cx-skip" href="#main">{t('skip', lang)}</a>
'''


def header(lang, lang_urls):
    L = LINKS[lang]
    langs = ''.join(f'<a href="{lang_urls[l]}" hreflang="{l}" lang="{l}"' + (' aria-current="true"' if l == lang else '') + f'>{l.upper()}</a>' for l in LANGS if l in lang_urls)
    return f'''<div class="cx-top">{t('top', lang)} <a href="https://sis.chanakacademy.org/login" rel="noopener">{t('n_portal', lang)} →</a></div>
<header class="cx-head"><div class="cx-wrap cx-head-in">
<a class="cx-brand" href="{L['home']}"><img src="/assets/chanak-logo.png" alt="Chanak International Academy" width="74" height="48"><span><b>Chanak International Academy</b><small>{t('brand_sub', lang)}</small></span></a>
<button class="cx-burger" type="button" aria-expanded="false" aria-controls="cx-nav">☰ {t('menu', lang)}</button>
<nav class="cx-nav" id="cx-nav" aria-label="{t('menu', lang)}">
<a href="{L['hs']}">{t('n_hs', lang)}</a>
<a href="{L['dd']}">{t('n_dd', lang)}</a>
<a href="{L['ms']}">{t('n_ms', lang)}</a>
<a href="{L['fees']}">{t('n_fees', lang)}</a>
<a href="{L['how']}">{t('n_how', lang)}</a>
<a href="/scholarships/">{t('n_esa', lang)}</a>
<span class="cx-langs" aria-label="Language">{langs}</span>
<a class="cx-btn cx-btn-t" href="/matricula/?utm_source=web&amp;utm_medium=nav&amp;src=nav-{lang}">{t('enroll', lang)}</a>
</nav></div></header>
'''


def footer(lang):
    L = LINKS[lang]
    return f'''<footer class="cx-foot"><div class="cx-wrap">
<div class="cx-foot-g">
<div><img src="/assets/chanak-logo.png" alt="Chanak" width="65" height="42" loading="lazy" decoding="async" style="background:#fff;border-radius:8px;padding:4px">
<div class="brand">Chanak International Academy</div>
<p>{t('ft_op', lang)}<br>FLDOE #134620 · MSA-CESS<br>7901 4th St N Ste 300, St. Petersburg, FL 33702</p>
<p><a href="https://www.instagram.com/chanakinternationalacademy/" rel="noopener" style="display:inline">Instagram</a> · <a href="https://www.facebook.com/profile.php?id=61585911365975" rel="noopener" style="display:inline">Facebook</a> · <a href="https://www.youtube.com/@ChanakAcademy" rel="noopener" style="display:inline">YouTube</a> · <a href="https://www.tiktok.com/@chanakacademy7" rel="noopener" style="display:inline">TikTok</a></p></div>
<div><h4>{t('ft_prog', lang)}</h4>
<a href="{L['hs']}">{t('n_hs', lang)}</a><a href="{L['dd']}">{t('n_dd', lang)}</a><a href="{L['ms']}">{t('n_ms', lang)}</a><a href="{L['open']}">{t('ms_cta', lang).replace(' →', '')}</a><a href="{L['diag']}">{t('sv1_h', lang)}</a><a href="{L['uni']}">{t('sv2_h', lang)}</a><a href="{L['fees']}">{t('n_fees', lang)}</a></div>
<div><h4>{t('ft_inst', lang)}</h4>
<a href="{L['how']}">{t('n_how', lang)}</a><a href="/school-leadership/">{t('ft_lead', lang)}</a><a href="/student-support/">{t('ft_support', lang)}</a><a href="/alianzas/">{t('ft_ally', lang)}</a><a href="/scholarships/">{t('n_esa', lang)}</a><a href="https://www.asociacioneducafe.org" rel="noopener">Asociación EducaFe ↗</a></div>
<div><h4>{t('ft_legal', lang)}</h4>
<a href="{L['priv']}">{t('ft_priv', lang)}</a><a href="{L['cook']}">{t('ft_cook', lang)}</a><a href="{L['legal']}">{t('ft_aviso', lang)}</a><a href="{L['terms']}">{t('ft_terms', lang)}</a><a href="mailto:offcampus@chanakacademy.org">offcampus@chanakacademy.org</a><a href="mailto:dualdiploma@chanakacademy.org">dualdiploma@chanakacademy.org</a></div>
</div>
<div class="discl"><p>{t('ft_d1', lang)}</p><p>{t('ft_d2', lang)} {t('img_note', lang)}</p></div>
<div class="bot"><span>{t('ft_copy', lang)}</span><span><a href="{L['priv']}">{t('ft_priv', lang)}</a><a href="{L['legal']}">{t('ft_aviso', lang)}</a><a href="{L['cook']}">{t('ft_cook', lang)}</a></span></div>
</div></footer>
<script>
(function(){{var b=document.querySelector('.cx-burger'),n=document.getElementById('cx-nav');if(b&&n)b.addEventListener('click',function(){{var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)}});
try{{var q=new URLSearchParams(location.search);['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(function(k){{if(q.get(k))sessionStorage.setItem('chanak_'+k,q.get(k))}});if(!sessionStorage.getItem('chanak_utm_landing'))sessionStorage.setItem('chanak_utm_landing',location.pathname)}}catch(e){{}}
}})();
</script>
'''


def form(lang, origin='Home Chanak'):
    L = LINKS[lang]
    countries = ['España', 'México', 'Panamá', 'Colombia', 'Estados Unidos', 'Argentina', 'Chile', 'Ecuador', 'Perú', 'Venezuela', 'United Arab Emirates']
    opts = ''.join(f'<option>{c}</option>' for c in countries)
    msgs = json.dumps({k: t(k, lang) for k in ('fm_sending', 'fm_ok_h', 'fm_ok_p', 'fm_err')}, ensure_ascii=False)
    return f'''<form class="cx-form" id="cxForm" novalidate>
<fieldset><legend>{t('fm_need', lang)}</legend><div class="cx-choice">
<label><input type="radio" name="necesidad" value="offcampus" required><span>{t('fm_o1', lang)}</span></label>
<label><input type="radio" name="necesidad" value="dual"><span>{t('fm_o2', lang)}</span></label>
<label><input type="radio" name="necesidad" value="esa"><span>{t('fm_o3', lang)}</span></label>
<label><input type="radio" name="necesidad" value="info"><span>{t('fm_o4', lang)}</span></label>
</div></fieldset>
<div class="cx-f2"><div><label class="l" for="cx-n">{t('fm_name', lang)}</label><input class="cx-inp" id="cx-n" name="nombre" autocomplete="name" required></div>
<div><label class="l" for="cx-e">{t('fm_email', lang)}</label><input class="cx-inp" id="cx-e" name="email" type="email" autocomplete="email" required></div></div>
<div class="cx-f2"><div><label class="l" for="cx-w">{t('fm_phone', lang)}</label><input class="cx-inp" id="cx-w" name="whatsapp" type="tel" autocomplete="tel"></div>
<div><label class="l" for="cx-p">{t('fm_country', lang)}</label><select class="cx-inp" id="cx-p" name="pais" required><option value="">{t('select', lang)}</option>{opts}<option>{t('other', lang)}</option></select></div></div>
<label class="l" for="cx-a">{t('fm_age', lang)}</label><input class="cx-inp" id="cx-a" name="edad">
<label class="l" for="cx-m">{t('fm_msg', lang)}</label><textarea class="cx-inp" id="cx-m" name="mensaje" rows="3"></textarea>
<input class="cx-hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
<label class="cx-check"><input type="checkbox" name="privacidad" required><span>{t('fm_priv', lang, priv=L['priv'])}</span></label>
<button class="cx-btn cx-btn-t" type="submit">{t('fm_send', lang)}</button>
<p class="cx-err" role="alert" hidden></p>
</form>
<script>
(function(){{var f=document.getElementById('cxForm');if(!f)return;var M={msgs};var P={{offcampus:'Off-Campus',dual:'Dual Diploma',esa:'Fondos ESA',info:'Informacion general'}};
f.addEventListener('submit',async function(ev){{ev.preventDefault();if(!f.checkValidity()){{f.reportValidity();return}}
var d=new FormData(f),b=f.querySelector('button'),o=b.textContent,er=f.querySelector('.cx-err');b.disabled=true;b.textContent=M.fm_sending;er.hidden=true;
var u={{}};try{{['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(function(k){{u[k]=sessionStorage.getItem('chanak_'+k)||''}});u.utm_landing=sessionStorage.getItem('chanak_utm_landing')||''}}catch(e){{}}
try{{var r=await fetch('/enviar-formulario.php',{{method:'POST',headers:{{'Content-Type':'application/json'}},body:JSON.stringify(Object.assign({{origen:'{origin}',programa:P[d.get('necesidad')]||'Solicitud general',necesidad:d.get('necesidad'),nombre:d.get('nombre'),email:d.get('email'),whatsapp:d.get('whatsapp'),pais:d.get('pais'),language:'{lang}',edad_grado:d.get('edad'),mensaje:d.get('mensaje'),website:d.get('website'),privacidad:true}},u))}});
var j=await r.json().catch(function(){{return{{}}}});if(!r.ok||j.success!==true)throw 0;
if(window.ChanakTracking)window.ChanakTracking.lead(P[d.get('necesidad')]||'general');
var ok=document.createElement('div');ok.className='cx-ok';var h=document.createElement('h3');h.textContent=M.fm_ok_h+', '+d.get('nombre');var p=document.createElement('p');p.textContent=M.fm_ok_p;ok.append(h,p);f.replaceChildren(ok)}}
catch(e){{b.disabled=false;b.textContent=o;er.textContent=M.fm_err;er.hidden=false}}}})}})();
</script>'''


def home(lang):
    L = LINKS[lang]
    faq = FAQ[lang]
    alternates = [('es', '/'), ('en', '/en/'), ('ca', '/ca/'), ('fr', '/fr/'), ('x-default', '/')]
    site_ld = {"@type": "WebSite", "@id": BASE + "/#website", "url": BASE + "/", "name": "Chanak International Academy", "inLanguage": LANGS, "publisher": {"@id": BASE + "/#school"}}
    out = head(lang, t('title', lang), t('desc', lang), L['home'], alternates, ld(ORG_LD, site_ld, faq_ld(faq)))
    out += header(lang, {l: LINKS[l]['home'] for l in LANGS})
    pills = ''.join(f'<a href="{u}">{n}</a>' for n, u in STATES)
    faq_html = ''.join(f'<details><summary>{html.escape(q)}</summary><p>{html.escape(a)}</p></details>' for q, a in faq)
    def route(key, img, url, url2=None, cta2=None):
        b2 = f'<a class="cx-btn cx-btn-o" href="{url2}">{cta2}</a>' if url2 else ''
        return f'''<article class="cx-route" id="{key}"><img src="{IMG}{img}.webp" alt="{html.escape(t(key + '_alt', lang))}" width="1200" height="800" loading="lazy" decoding="async">
<div class="cx-route-b"><div class="who">{t(key + '_who', lang)}</div><h3>{t(key + '_h3', lang)}</h3><p>{t(key + '_p', lang)}</p>
<ul><li>{t(key + '_l1', lang)}</li><li>{t(key + '_l2', lang)}</li><li>{t(key + '_l3', lang)}</li></ul>
<div class="cx-price">{t(key + '_price', lang)}</div>
<div class="cx-btns"><a class="cx-btn cx-btn-n" href="{url}">{t(key + '_cta', lang)}</a>{b2}</div></div></article>'''
    out += f'''<main id="main">
<section class="cx-hero" id="inicio">
<div class="cx-hero-bg"><video class="hero-vid" autoplay muted loop playsinline preload="auto" poster="/assets/video/hero-poster.jpg" aria-label="Chanak Academy"><source src="/assets/video/universidad-hero.mp4" type="video/mp4"></video></div>
<div class="cx-wrap" style="width:100%"><div class="cx-hero-in">
<h1>{t('h1', lang)}</h1>
<p class="tag">{t('h_tag', lang)}</p>
<p class="sub">{t('h_sub', lang)}</p>
<div class="cx-btns"><a class="cx-btn cx-btn-t" href="/matricula/?utm_source=web&amp;utm_medium=hero&amp;utm_campaign=conversion_2026&amp;src=home-hero">{t('enroll', lang)}</a><a class="cx-btn cx-btn-w" href="#orientacion">{t('guide', lang)}</a></div>
<div class="cx-hero-routes"><a href="#hs">{t('n_hs', lang)} ↓</a><a href="#dd">{t('n_dd', lang)} ↓</a><a href="#ms">{t('n_ms', lang)} ↓</a></div>
</div></div></section>

<div class="cx-trust" aria-label="Credentials"><div class="cx-wrap cx-trust-in">
<div class="cx-trust-it"><img src="/assets/fldoe-logo.png" alt="Florida Department of Education" width="128" height="42" loading="lazy" decoding="async"><div><b>FLDOE #134620</b><span>{t('t_fl', lang)}</span></div></div>
<div class="cx-trust-it"><img src="/assets/msa-light.png" alt="Middle States Association (MSA-CESS)" width="136" height="44" loading="lazy" decoding="async"><div><b>MSA-CESS</b><span>{t('t_msa', lang)}</span></div></div>
<div class="cx-trust-it"><img src="/assets/img/dbu-logo-horizontal.png" alt="Dallas Baptist University" width="120" height="60" loading="lazy" decoding="async"><div><b>DBU</b><span>{t('t_dbu', lang)}</span></div></div>
<div class="cx-trust-it"><img src="/assets/img/chanak-trainup-logo.png" alt="Chanak Trainup Education - Nonprofit Section 501(c)(3)" width="130" height="55" loading="lazy" decoding="async" style="max-height:44px;width:auto;object-fit:contain"><div><b>501(c)(3)</b><span>{t('t_irs', lang)}</span></div></div>
</div></div>

<section class="cx-sec" id="rutas"><div class="cx-wrap">
<div class="cx-center"><div class="cx-eyebrow">{t('r_eye', lang)}</div><h2>{t('r_h2', lang)}</h2><p class="cx-lead">{t('r_lead', lang)}</p></div>
<div class="cx-routes">
{route('hs', 'hs-mesa-familia', L['hs'])}
{route('dd', 'dual-escritorio', L['dd'])}
{route('ms', 'microschool-sala', L['open'], L['ms'], t('more', lang))}
</div></div></section>

<section class="cx-sec cx-navy"><div class="cx-wrap cx-split">
<div><div class="cx-eyebrow">{t('m_eye', lang)}</div><h2>{t('m_h2', lang)}</h2><p>{t('m_p1', lang)}</p>
<blockquote class="cx-quote">{t('m_q', lang)}<cite>{t('m_cite', lang)}</cite></blockquote></div>
<img src="{IMG}fe-aprendizaje.webp" alt="{html.escape(t('m_alt', lang))}" width="1200" height="800" loading="lazy" decoding="async">
</div></section>

<section class="cx-sec" id="respaldo"><div class="cx-wrap">
<div class="cx-split rev"><img src="{IMG}diploma-expediente.webp" alt="{html.escape(t('tr_alt', lang))}" width="1200" height="800" loading="lazy" decoding="async">
<div><div class="cx-eyebrow">{t('tr_eye', lang)}</div><h2>{t('tr_h2', lang)}</h2>
<h3>{t('tr1_h', lang)}</h3><p>{t('tr1_p', lang)}</p>
<h3>{t('tr2_h', lang)}</h3><p>{t('tr2_p', lang)}</p></div></div>
<div class="cx-grid cx-g2"><div class="cx-card"><img src="/assets/img/dbu-logo-horizontal.png" alt="Dallas Baptist University" width="130" height="65" loading="lazy" style="max-height:38px;width:auto;margin-bottom:12px;object-fit:contain"><h3>{t('tr3_h', lang)}</h3><p>{t('tr3_p', lang)}</p></div><div class="cx-card"><img src="/assets/img/chanak-trainup-logo.png" alt="Chanak Trainup Education" width="140" height="60" loading="lazy" style="max-height:38px;width:auto;margin-bottom:12px;object-fit:contain"><h3>{t('tr4_h', lang)}</h3><p>{t('tr4_p', lang)}</p></div></div>
</div></section>

<section class="cx-sec cx-soft" id="como"><div class="cx-wrap">
<div class="cx-center"><div class="cx-eyebrow">{t('s_eye', lang)}</div><h2>{t('s_h2', lang)}</h2><p class="cx-lead">{t('s_lead', lang)}</p></div>
<div class="cx-grid cx-g4">
<div class="cx-card"><div class="cx-step-n">1</div><h3>{t('s1_h', lang)}</h3><p>{t('s1_p', lang)}</p></div>
<div class="cx-card"><div class="cx-step-n">2</div><h3>{t('s2_h', lang)}</h3><p>{t('s2_p', lang)}</p></div>
<div class="cx-card"><div class="cx-step-n">3</div><h3>{t('s3_h', lang)}</h3><p>{t('s3_p', lang)}</p></div>
<div class="cx-card"><div class="cx-step-n">4</div><h3>{t('s4_h', lang)}</h3><p>{t('s4_p', lang)}</p></div>
</div>
<div class="cx-btns" style="justify-content:center;margin-top:28px"><a class="cx-btn cx-btn-t" href="#orientacion">{t('guide', lang)}</a><a class="cx-btn cx-btn-o" href="{L['how']}">{t('s_more', lang)}</a></div>
</div></section>

<section class="cx-sec" id="modelo"><div class="cx-wrap cx-split">
<div><div class="cx-eyebrow">{t('md_eye', lang)}</div><h2>{t('md_h2', lang)}</h2><p class="cx-lead">{t('md_lead', lang)}</p>
<div class="cx-grid cx-g3" style="margin-top:20px"><div><div class="cx-num">60%</div><p>{t('md1', lang)}</p></div><div><div class="cx-num">20%</div><p>{t('md2', lang)}</p></div><div><div class="cx-num">20%</div><p>{t('md3', lang)}</p></div></div></div>
<img src="{IMG}life-skills-cocina.webp" alt="{html.escape(t('md_alt', lang))}" width="1200" height="800" loading="lazy" decoding="async">
</div></section>

<section class="cx-sec cx-soft" id="fondos-esa"><div class="cx-wrap">
<div class="cx-eyebrow">{t('us_eye', lang)}</div><h2>{t('us_h2', lang)}</h2><p class="cx-lead">{t('us_p', lang)}</p>
<div class="cx-pills">{pills}</div><a class="cx-btn cx-btn-n" href="/scholarships/">{t('us_all', lang)}</a>
</div></section>

<section class="cx-sec" id="servicios"><div class="cx-wrap">
<div class="cx-center"><div class="cx-eyebrow">{t('sv_eye', lang)}</div><h2>{t('sv_h2', lang)}</h2></div>
<div class="cx-grid cx-g4">
<a class="cx-card photo" href="{L['diag']}" style="text-decoration:none"><img src="{IMG}diagnostico-tablet.webp" alt="" width="1200" height="800" loading="lazy" decoding="async"><div><h3>{t('sv1_h', lang)}</h3><p>{t('sv1_p', lang)}</p></div></a>
<a class="cx-card photo" href="{L['uni']}" style="text-decoration:none"><img src="{IMG}universidad-campus.webp" alt="" width="1200" height="800" loading="lazy" decoding="async"><div><h3>{t('sv2_h', lang)}</h3><p>{t('sv2_p', lang)}</p></div></a>
<a class="cx-card photo" href="{L['how']}#enriquecimiento" style="text-decoration:none"><img src="{IMG}life-skills-cocina.webp" alt="" width="1200" height="800" loading="lazy" decoding="async"><div><h3>{t('sv3_h', lang)}</h3><p>{t('sv3_p', lang)}</p></div></a>
<a class="cx-card photo" href="https://sis.chanakacademy.org/matricula?program=adult_high_school&amp;country=US&amp;currency=USD" style="text-decoration:none"><img src="{IMG}hs-mentoria.webp" alt="" width="1200" height="800" loading="lazy" decoding="async"><div><h3>{t('sv4_h', lang)}</h3><p>{t('sv4_p', lang)}</p></div></a>
</div></div></section>

<section class="cx-sec cx-soft" id="faq"><div class="cx-wrap">
<div class="cx-center"><div class="cx-eyebrow">{t('f_eye', lang)}</div><h2>{t('f_h2', lang)}</h2></div>
<div class="cx-faq">{faq_html}</div>
</div></section>

<section class="cx-sec cx-navy" id="orientacion"><div class="cx-wrap cx-split">
<div><div class="cx-eyebrow">{t('c_eye', lang)}</div><h2>{t('c_h2', lang)}</h2><p class="cx-lead">{t('c_p', lang)}</p>
<ul class="cx-list" style="margin-top:18px"><li>{t('c_b1', lang)}</li><li>{t('c_b2', lang)}</li><li>{t('c_b3', lang)}</li></ul>
<p class="cx-note">{t('c_ms', lang, ms=L['ms'])}</p></div>
<div id="dossier">{form(lang)}</div>
</div></section>
</main>
'''
    out += footer(lang)
    # Los enlaces antiguos a anclas de la portada (#tarifas, #curriculos…) siguen funcionando.
    out += '''<script>(function(){var m={tarifas:'%s',curriculos:'%s',portales:'%s',quien:'%s',enriquecimiento:'%s','student-support':'/student-support/',microschool:'#ms',homeschool:'#hs','dual-diploma':'#dd',solicitud:'#orientacion'};var h=location.hash.replace('#','');if(new URLSearchParams(location.search).get('country')&&h==='tarifas'){location.replace('%s'+location.search);return}if(m[h]){if(m[h].charAt(0)==='#'){var e=document.querySelector(m[h]);if(e)e.scrollIntoView()}else location.replace(m[h])}})();</script>
</body></html>''' % (L['fees'], '/como-funciona/#curriculos', '/como-funciona/#portales', '/como-funciona/#quien', '/como-funciona/#enriquecimiento', L['fees'])
    path = 'index.html' if lang == 'es' else f'{lang}/index.html'
    write(path, out)


# ───────────────────────── TARIFAS ─────────────────────────
PRICING = {
    'cycle': '2026-2027',
    'full_enrollment': [  # USD, igual en todos los países
        dict(g='K–5', fee=295, m=275, q=687.50, y=3045),
        dict(g='6–8', fee=295, m=320, q=800, y=3495),
        dict(g='9–12', fee=295, m=365, q=912.50, y=3945)],
    'guided': [  # (país es, país en, mensualidad, matrícula anual)
        ('España', 'Spain', 'US$80/mes · <b>70 €/mes</b>', 'US$80/mo · <b>€70/mo</b>', '180 €', 'es'),
        ('México', 'Mexico', '$3,500 MXN/mes', 'MXN 3,500/mo', '$4,500 MXN', 'mx'),
        ('Panamá', 'Panama', 'US$80/mes', 'US$80/mo', 'US$180', 'pa'),
        ('Colombia', 'Colombia', '$225.000 COP/mes', 'COP 225,000/mo', '$575.000 COP', 'co'),
        ('Internacional', 'International', 'US$80/mes', 'US$80/mo', 'US$180', 'global')],
    'dual': [
        ('España', 'Spain', '110 € · 129 € · 148 € · 167 €/mes <small>rutas de 4, 3 y 2 años e intensiva</small>', '€110 · €129 · €148 · €167/mo <small>4-, 3-, 2-year and intensive routes</small>', '210 €', '35 €'),
        ('México', 'Mexico', 'desde $3,400 MXN/mes <small>$4,100 · $5,800 · $6,500 según la ruta</small>', 'from MXN 3,400/mo <small>3,400 · 4,100 · 5,800 · 6,500 by route</small>', '$4,300 MXN', '$850 MXN'),
        ('Panamá e Internacional', 'Panama & International', 'desde US$140/mes', 'from US$140/mo', 'US$250', 'US$50'),
        ('Colombia', 'Colombia', 'Cotización individual', 'Individual quote', '—', '—')],
}


def money(v):
    return f'{v:,.2f}'.rstrip('0').rstrip('.') if v % 1 else f'{int(v):,}'


def tarifas(lang):
    es = lang == 'es'
    L = LINKS[lang]
    url = L['fees']
    tx = (lambda a, b: a) if es else (lambda a, b: b)
    title = tx('Tarifas 2026–2027: Homeschool, Full Enrollment y Dual Diploma · Chanak', 'Tuition 2026–2027: Homeschool, Full Enrollment & Dual Diploma · Chanak')
    desc = tx('Precios de Chanak International Academy por programa y país: Homeschool Guiado, Full Enrollment K-12 y Dual Diploma. Matrícula anual, mensualidades y qué incluye.',
              'Chanak International Academy fees by program and country: Guided Homeschool, K-12 Full Enrollment and Dual Diploma. Annual enrollment fee, monthly payments and what is included.')
    policy = tx('La matrícula anual incluye el diagnóstico académico inicial, la elaboración del Plan Educativo Individualizado (PEI) y la inducción de incorporación. Una vez abonada, no se devuelve, salvo los derechos de desistimiento, cancelación, reembolso u otros derechos irrenunciables que establezca la legislación aplicable.',
                'The annual enrollment fee includes the initial academic assessment, the Individualized Education Plan (IEP/PEI), and student/family onboarding. Once paid, the fee is non-refundable, except where applicable law grants mandatory withdrawal, cancellation, refund, or other non-waivable rights.')
    fe_rows = ''.join(f"<tr><td><b>{tx('Grados', 'Grades')} {r['g']}</b></td><td>US${money(r['m'])}<small>{tx('10 mensualidades', '10 monthly payments')}</small></td><td>US${money(r['q'])}<small>{tx('4 cuotas trimestrales', '4 quarterly payments')}</small></td><td>US${money(r['y'] - r['fee'])}<small>{tx('pago único de colegiatura', 'single tuition payment')}</small></td><td>US${r['fee']}</td><td><b>US${money(r['y'])}</b></td></tr>" for r in PRICING['full_enrollment'])
    g_rows = ''.join(f"<tr><td><b>{tx(a, b)}</b></td><td>{tx(c, d)}</td><td>{e}</td></tr>" for a, b, c, d, e, _ in PRICING['guided'])
    d_rows = ''.join(f"<tr><td><b>{tx(a, b)}</b></td><td>{tx(c, d)}</td><td>{e}</td><td>{f}</td></tr>" for a, b, c, d, e, f in PRICING['dual'])
    faq = [
        (tx('¿La matrícula anual se paga una sola vez?', 'Is the annual enrollment fee paid only once?'), tx('Sí. Es una cuota por estudiante y por curso académico, independiente de que elijas pago mensual, trimestral o anual. Se renueva al empezar cada nuevo curso y te lo comunicamos antes.', 'Yes. It is one fee per student per academic year, regardless of whether you pay monthly, quarterly or annually. It renews at the start of each new academic year and we tell you beforehand.')),
        (tx('¿Qué incluye la matrícula anual?', 'What does the annual enrollment fee include?'), tx('El diagnóstico académico inicial, la elaboración del Plan Educativo Individualizado (PEI) y la inducción de incorporación del estudiante y la familia.', 'The initial academic diagnostic, the Individualized Education Plan (IEP/PEI) and student and family onboarding.')),
        (tx('¿Los materiales están incluidos?', 'Are materials included?'), tx('Depende del plan y del currículo elegido (A.C.E., LIFEPAC, Christian Light o Chanak Flex). Te indicamos por escrito qué materiales necesitas y su coste antes de formalizar.', 'It depends on the plan and curriculum chosen (A.C.E., LIFEPAC, Christian Light or Chanak Flex). We tell you in writing which materials you need and their cost before you enroll.')),
        (tx('¿Puedo pagar con fondos ESA en Estados Unidos?', 'Can I pay with ESA funds in the United States?'), tx('En los estados donde Chanak es proveedor aprobado puedes solicitar el pago con tus fondos estatales. La elegibilidad y cada autorización las decide el programa de tu estado.', 'In states where Chanak is an approved provider you can request payment with your state funds. Eligibility and each authorization are decided by your state’s program.')),
    ]
    alternates = [('es', '/tarifas/'), ('en', '/en/tuition/'), ('x-default', '/tarifas/')]
    crumbs = {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Chanak", "item": BASE + L['home']}, {"@type": "ListItem", "position": 2, "name": tx('Tarifas', 'Tuition'), "item": BASE + url}]}
    offers = {"@type": "OfferCatalog", "name": title, "url": BASE + url, "itemListElement": [
        {"@type": "Offer", "name": f"Full Enrollment · Grades {r['g']}", "price": str(r['m']), "priceCurrency": "USD", "description": "Monthly tuition, 10 payments per academic year; US$295 annual enrollment fee", "seller": {"@id": BASE + "/#school"}} for r in PRICING['full_enrollment']] + [
        {"@type": "Offer", "name": "Guided Homeschool · Spain", "price": "70", "priceCurrency": "EUR", "description": "Monthly fee; €180 annual enrollment fee", "seller": {"@id": BASE + "/#school"}},
        {"@type": "Offer", "name": "Dual Diploma · Spain (4-year route)", "price": "110", "priceCurrency": "EUR", "description": "Monthly fee, 10 payments; €210 enrollment", "seller": {"@id": BASE + "/#school"}}]}
    out = head(lang, title, desc, url, alternates, ld(ORG_LD, crumbs, offers, faq_ld(faq)))
    out += header(lang, {'es': '/tarifas/', 'en': '/en/tuition/'})
    faq_html = ''.join(f'<details><summary>{html.escape(q)}</summary><p>{html.escape(a)}</p></details>' for q, a in faq)
    out += f'''<main id="main">
<section class="cx-navy cx-phead"><div class="cx-wrap">
<nav class="cx-crumbs" aria-label="Breadcrumb"><a href="{L['home']}">Chanak</a> › {tx('Tarifas', 'Tuition')}</nav>
<h1>{tx('Tarifas del curso 2026–2027', 'Tuition for the 2026–2027 school year')}</h1>
<p class="cx-lead">{tx('Precios claros por programa y país. Recibes el importe exacto por escrito antes de pagar.', 'Clear fees by program and country. You receive the exact amount in writing before you pay.')}</p>
<div class="cx-tabs"><a href="#homeschool">Homeschool K–12</a><a href="#dual">Dual Diploma</a><a href="#microschool">Microschools</a><a href="#matricula">{tx('Matrícula anual', 'Annual enrollment fee')}</a></div>
</div></section>

<section class="cx-sec" id="homeschool"><div class="cx-wrap">
<div class="cx-eyebrow">Off-Campus K–12</div><h2>{tx('Homeschool: dos planes, disponibles en todos los países', 'Homeschool: two plans, available in every country')}</h2>
<div class="cx-plans">
<div class="cx-plan"><div class="tagline">{tx('La familia lidera', 'The family leads')}</div><h3>{tx('Homeschool Guiado', 'Guided Homeschool')}</h3>
<p class="amount">US$80<small style="font-size:1rem">/{tx('mes', 'mo')}</small></p><p class="eq">{tx('70 €/mes en España · matrícula anual 180 €', '€70/mo in Spain · €180 annual enrollment fee')}</p>
<ul class="cx-list"><li>{tx('Diagnóstico académico y PEI', 'Academic diagnostic and individual plan')}</li><li>{tx('Mentoría familiar mensual', 'Monthly family mentoring')}</li><li>{tx('Plataforma, seguimiento e informes', 'Platform, tracking and reports')}</li><li>{tx('Currículo a elegir: A.C.E., LIFEPAC, Christian Light o Chanak Flex', 'Choice of curriculum: A.C.E., LIFEPAC, Christian Light or Chanak Flex')}</li></ul>
<div class="cx-btns"><a class="cx-btn cx-btn-o" href="{L['hs']}">{tx('Ver el plan →', 'See the plan →')}</a></div></div>
<div class="cx-plan feat"><div class="tagline">{tx('Matrícula escolar completa', 'Full school enrollment')}</div><h3>Full Enrollment · Guided Virtual School</h3>
<p class="amount">{tx('desde', 'from')} US$275<small style="font-size:1rem">/{tx('mes', 'mo')}</small></p><p class="eq">{tx('10 mensualidades · matrícula anual US$295 · mismo precio en USD en todos los países', '10 monthly payments · US$295 annual enrollment fee · same USD price in every country')}</p>
<ul class="cx-list"><li>{tx('Tres clases en vivo de inglés (ELA) por semana', 'Three live English (ELA) classes per week')}</li><li>{tx('Mentoría individual semanal y Life Skills en vivo', 'Weekly one-to-one mentoring and live Life Skills')}</li><li>{tx('Currículo, plataformas, evaluación y boletines', 'Curriculum, platforms, assessment and report cards')}</li><li>{tx('Expediente y diploma al cumplir los requisitos', 'Transcript and diploma once requirements are met')}</li></ul>
<div class="cx-btns"><a class="cx-btn cx-btn-t" href="{L['hs']}">{tx('Ver el plan →', 'See the plan →')}</a></div></div>
</div>

<h3 style="margin-top:44px">Full Enrollment · {tx('mensual, trimestral o anual', 'monthly, quarterly or annual')}</h3>
<div class="cx-table-w"><table class="cx-table"><thead><tr><th>{tx('Etapa', 'Level')}</th><th>{tx('Mensual', 'Monthly')}</th><th>{tx('Trimestral', 'Quarterly')}</th><th>{tx('Anual', 'Annual')}</th><th>{tx('Matrícula anual', 'Annual enrollment fee')}</th><th>{tx('Total del curso', 'Total per year')}</th></tr></thead><tbody>{fe_rows}</tbody></table></div>
<p class="cx-note">{tx('La matrícula anual se cobra una sola vez por estudiante y curso, sea cual sea la forma de pago. Importes en dólares estadounidenses; si pagas en tu moneda local, te confirmamos el total exacto antes de formalizar. Impuestos o comisiones, si aplican, se muestran antes del pago.', 'The annual enrollment fee is charged once per student per school year, whichever payment schedule you choose. Amounts in U.S. dollars; if you pay in your local currency we confirm the exact total before you enroll. Any taxes or fees are shown before payment.')}</p>

<h3 style="margin-top:44px">{tx('Homeschool Guiado · por país', 'Guided Homeschool · by country')}</h3>
<div class="cx-table-w"><table class="cx-table"><thead><tr><th>{tx('País', 'Country')}</th><th>{tx('Mensualidad', 'Monthly fee')}</th><th>{tx('Matrícula anual', 'Annual enrollment fee')}</th></tr></thead><tbody>{g_rows}<tr><td><b>{tx('Estados Unidos', 'United States')}</b></td><td colspan="2">{tx('Con fondos ESA o pago privado según tu estado.', 'With ESA funds or private pay depending on your state.')} <a href="/scholarships/">{tx('Ver estados →', 'See states →')}</a></td></tr></tbody></table></div>
<p class="cx-note">{tx('La equivalencia en euros es una tarifa comercial fija, no un tipo de cambio. Materiales curriculares no incluidos.', 'The euro equivalent is a fixed commercial rate, not a live exchange rate. Curriculum materials not included.')}</p>
</div></section>

<section class="cx-sec cx-soft" id="dual"><div class="cx-wrap">
<div class="cx-eyebrow">{tx('Grados 9–12', 'Grades 9–12')}</div><h2>Dual Diploma</h2>
<p class="cx-lead">{tx('La mensualidad depende del curso en que empieza el estudiante: cuanto antes, más repartida. No se ofrece en Estados Unidos.', 'The monthly fee depends on the grade in which the student starts: the earlier, the more spread out. Not offered in the United States.')}</p>
<div class="cx-table-w"><table class="cx-table"><thead><tr><th>{tx('País', 'Country')}</th><th>{tx('Mensualidad (10 al año)', 'Monthly fee (10 per year)')}</th><th>{tx('Matrícula', 'Enrollment')}</th><th>{tx('Diagnóstico y auditoría de créditos', 'Diagnostic and credit audit')}</th></tr></thead><tbody>{d_rows}</tbody></table></div>
<div class="cx-grid cx-g2">
<div class="cx-card"><h3>1 · {tx('Matrícula + diagnóstico + auditoría de créditos', 'Enrollment + diagnostic + transfer credit evaluation')}</h3><p>{tx('La vía habitual: te matriculas y recibes el Plan de Ruta con los créditos reconocidos y los pendientes.', 'The usual route: you enroll and receive the Route Plan with recognized and pending credits.')}</p></div>
<div class="cx-card"><h3>2 · {tx('Solo diagnóstico + auditoría de créditos', 'Diagnostic + transfer credit evaluation only')}</h3><p>{tx('Para decidir con datos antes de matricularte. Es un servicio independiente; te confirmamos por escrito su alcance y si se descuenta de la matrícula.', 'To decide with data before enrolling. It is a separate service; we confirm in writing its scope and whether it is credited toward enrollment.')}</p></div>
</div>
<div class="cx-btns" style="margin-top:24px"><a class="cx-btn cx-btn-n" href="{L['dd']}">{tx('Conocer Dual Diploma →', 'Explore Dual Diploma →')}</a></div>
</div></section>

<section class="cx-sec" id="microschool"><div class="cx-wrap">
<div class="cx-eyebrow">{tx('Alianzas', 'Partnerships')}</div><h2>Microschools</h2>
<p class="cx-lead">{tx('Microschool es una alianza institucional, no una matrícula individual. Las condiciones se acuerdan con cada comunidad según el número de familias, el país y los servicios. La cuota de las familias la fija cada Microschool.', 'Microschool is an institutional partnership, not an individual enrollment. Terms are agreed with each community according to the number of families, country and services. Family tuition is set by each Microschool.')}</p>
<div class="cx-btns"><a class="cx-btn cx-btn-n" href="{L['open']}">{tx('Abrir una Microschool →', 'Open a Microschool →')}</a></div>
</div></section>

<section class="cx-sec cx-soft" id="matricula"><div class="cx-wrap">
<div class="cx-eyebrow">{tx('Condiciones', 'Terms')}</div><h2>{tx('Matrícula anual (incluye diagnóstico académico, PEI e inducción)', 'Annual Enrollment Fee (includes academic diagnostic assessment, Individualized Education Plan and onboarding/orientation)')}</h2>
<div class="cx-policy">{policy}</div>
<div class="cx-faq" style="margin-left:0">{faq_html}</div>
<div class="cx-btns" style="margin-top:24px"><a class="cx-btn cx-btn-t" href="/matricula/?utm_source=web&amp;utm_medium=tarifas">{t('enroll', lang)}</a><a class="cx-btn cx-btn-o" href="{L['home']}#orientacion">{t('guide', lang)}</a></div>
</div></section>
</main>
'''
    out += footer(lang) + '</body></html>'
    write('tarifas/index.html' if es else 'en/tuition/index.html', out)


if __name__ == '__main__':
    print('Portada:')
    for l in LANGS:
        home(l)
    print('Tarifas:')
    tarifas('es'); tarifas('en')
