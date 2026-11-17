#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Páginas nuevas con la cabecera y el pie del sitio:
  · Calculadora de presupuesto de Microschool (ES, EN, CA, FR)
  · «7 errores que cuestan una Microschool» (ES, EN, CA, FR)
  · Colabora con Chanak: hub, mentores, embajadores y borradores legales (ES, EN)
Uso: python3 tools/build_pages.py"""
import html, json, os, sys, datetime
sys.path.insert(0, os.path.dirname(__file__))
from build_site import head, header, footer, write, ld, faq_ld, ORG_LD, BASE, V
LANGS = ['es', 'en', 'ca', 'fr']   # páginas de /unete/ (sin portugués)
PT_LANGS = LANGS + ['pt']          # presupuesto y 7 errores también en portugués (tools/pt_budget.py)


def lg(d, lang):
    """Texto de otro módulo (ms_content…) en el idioma; si aún no tiene pt, cae al español."""
    return d[lang] if lang in d else d['es']
from site_i18n import LINKS
import budget_content as B
import errores_content as E
import unete_content as U
import ms_content as C

TODAY = datetime.date.today().isoformat()
FORMS = f'<script defer src="/assets/js/cx-forms.js?v={V}"></script>'
COUNTRIES = ['España', 'México', 'Panamá', 'Colombia', 'Estados Unidos', 'Guatemala', 'El Salvador', 'Ecuador', 'Costa Rica', 'Argentina', 'Chile', 'Perú', 'Venezuela']


def crumbs(lang, trail):
    return {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": i, "name": n, "item": BASE + u} for i, (n, u) in enumerate([('Chanak', LINKS[lang]['home'])] + trail, 1)]}


def crumb_html(lang, trail):
    parts = [f'<a href="{LINKS[lang]["home"]}">Chanak</a>'] + [f'<a href="{u}">{n}</a>' for n, u in trail[:-1]] + [trail[-1][0]]
    return '<nav class="cx-crumbs" aria-label="Breadcrumb">' + ' › '.join(parts) + '</nav>'


def alts(urls, default='es'):
    return [(l, urls[l]) for l in urls] + [('x-default', urls[default])]


def page(lang, urls, title, desc, body, extra_ld, noindex=False, scripts=''):
    out = head(lang, title, desc, urls[lang], alts(urls), extra_ld)
    if noindex:
        out = out.replace('<link rel="canonical"', '<meta name="robots" content="noindex,nofollow">\n<link rel="canonical"', 1)
    out += header(lang, urls) + f'<main id="main">{body}</main>\n' + footer(lang) + scripts + '</body></html>'
    write(urls[lang].strip('/') + '/index.html', out)


def form_attrs(lang):
    return f'data-cx-form data-lang="{lang}" data-sending="{lg(C.FORM_MSG["sending"], lang)}" data-err="{lg(C.FORM_MSG["err"], lang)}" action="/enviar-formulario.php" method="post" novalidate'


def hp():
    return '<input class="cx-hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">'


# ───────────── Presupuesto ─────────────
def budget(lang):
    L = LINKS[lang]
    i18n = dict(inv={k: dict(n=v[0][lang], h=v[1][lang]) for k, v in B.INV_I18N.items()}, mon={k: dict(n=v[0][lang], h=v[1][lang]) for k, v in B.MON_I18N.items()},
                alcance={k: v[lang] for k, v in B.ALCANCE_I18N.items()}, tramo={k: v[lang] for k, v in B.TRAMO_I18N.items()}, pilar={k: v[lang] for k, v in B.PILAR_I18N.items()})
    cfg = dict(lang=lang, locale=B.LOCALE[lang], currency='EUR', country='es', i18n=i18n, ex=B.EX, t={k: v[lang] for k, v in B.T.items()})
    tips = ''.join(f'<li>{t[lang]}</li>' for t in B.TIPS)
    trail = [(lg(C.CRUMB_MS, lang), L['ms']), (B.T['previo_h'][lang] if False else B.H1[lang].split(' para ')[0].split(' for ')[0].split(' per ')[0].split(' pour ')[0], B.URL[lang])]
    body = f'''
<section class="cx-navy cx-phead"><div class="cx-wrap">{crumb_html(lang, trail)}
<h1>{B.H1[lang]}</h1><p class="cx-lead">{B.LEAD[lang]}</p></div></section>
<section class="cx-sec"><div class="cx-wrap">
<div id="cx-budget" class="cx-budget"><noscript><p class="cx-banner">{B.NOSCRIPT[lang]} <a href="/assets/descargas/Calculadora-Presupuesto-Microschool-Chanak-ES.xlsx" download>Excel</a></p></noscript></div>
<p class="cx-policy cx-b-foot">{B.FOOT[lang]}</p>
</div></section>
<section class="cx-sec cx-soft cx-noprint"><div class="cx-wrap cx-split">
<div><h2>{B.TIPS_H[lang]}</h2><ul class="cx-list">{tips}</ul>
<div class="cx-btns"><a class="cx-btn cx-btn-n" href="{L['err7']}">{B.NEXT[lang][0]}</a><a class="cx-btn cx-btn-o" href="{L['open']}#partner-form">{B.NEXT[lang][1]}</a></div></div>
<img src="/assets/img/gen/alianza-presupuesto.webp" alt="{html.escape(dict(es='Dos personas revisando un presupuesto y un plan sobre una mesa', en='Two people reviewing a budget and a plan at a table', ca='Dues persones revisant un pressupost i un pla sobre una taula', fr='Deux personnes examinant un budget et un plan sur une table', pt='Duas pessoas revisando um orçamento e um plano sobre uma mesa')[lang])}" width="1200" height="800" loading="lazy" decoding="async">
</div></section>'''
    app = {"@type": "WebApplication", "name": B.H1[lang], "url": BASE + B.URL[lang], "applicationCategory": "FinanceApplication", "operatingSystem": "Any", "inLanguage": lang,
           "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}, "provider": {"@id": BASE + "/#school"}}
    scripts = f'<script>window.CX_BUDGET={json.dumps(cfg, ensure_ascii=False)};</script><script src="/assets/js/cx-budget-core.js?v={V}"></script><script src="/assets/js/cx-budget.js?v={V}"></script>'
    page(lang, B.URL, B.TITLE[lang], B.DESC[lang], body, ld(ORG_LD, crumbs(lang, trail), app), scripts=scripts)


# ───────────── 7 errores ─────────────
def errores(lang):
    L = LINKS[lang]
    trail = [(lg(C.CRUMB_MS, lang), L['ms']), (E.CRUMB[lang], E.URL[lang])]
    arts = ''.join(f'<article class="cx-err7"><div class="cx-step-n">{i}</div><div><h2>{t[lang]}</h2><p>{p[lang]}</p><p class="cx-fix"><b>{E.FIX[lang]}:</b> {f[lang]}</p></div></article>' for i, (t, p, f) in enumerate(E.ERR, 1))
    pill = ''.join(f'<li>{lg(t, lang)}</li>' for t, _ in C.PILLARS)
    opts = ''.join(f'<option>{c}</option>' for c in COUNTRIES)
    F = E.F
    body = f'''
<section class="cx-navy cx-phead"><div class="cx-wrap">{crumb_html(lang, trail)}
<h1>{E.H1[lang]}</h1><p class="cx-lead">{E.LEAD[lang]}</p>
<div class="cx-btns cx-noprint" style="margin-top:22px"><button type="button" class="cx-btn cx-btn-w" onclick="window.print()">{E.PRINT[lang]}</button></div></div></section>
<section class="cx-sec"><div class="cx-wrap cx-article">{arts}
<div class="cx-card cx-pillar" style="margin-top:36px"><h2>{E.CLOSE_H[lang]}</h2><p>{E.CLOSE_P[lang]}</p><ul class="cx-list" style="margin-top:14px">{pill}</ul>
<p class="cx-note">{lg(C.PIL_LEGAL, lang)}</p>
<div class="cx-btns cx-noprint" style="margin-top:18px"><a class="cx-btn cx-btn-t" href="{L['budget']}">{E.CTA[lang][0]}</a><a class="cx-btn cx-btn-o" href="{L['open']}#partner-form">{E.CTA[lang][1]}</a></div></div>
</div></section>
<section class="cx-sec cx-navy cx-noprint" id="guia"><div class="cx-wrap cx-split">
<div><h2>{E.FORM_H[lang]}</h2><p class="cx-lead">{E.FORM_P[lang]}</p></div>
<div><form class="cx-form" {form_attrs(lang)}>
<input type="hidden" name="necesidad" value="microschool"><input type="hidden" name="producto" value="microschool"><input type="hidden" name="origen" value="7errores">
<label class="l" for="e7-e">{F['email'][lang]}</label><input class="cx-inp" id="e7-e" name="email" type="email" autocomplete="email" required>
<label class="l" for="e7-p">{F['country'][lang]}</label><select class="cx-inp" id="e7-p" name="pais" required><option value="">—</option>{opts}<option>Other / Otro</option></select>
<label class="l" for="e7-s">{F['size'][lang]}</label><input class="cx-inp" id="e7-s" name="num_familias" type="number" min="1" max="1000" inputmode="numeric" required>
{hp()}<label class="cx-check"><input type="checkbox" name="consentimiento" required><span>{lg(C.PRIV, lang).format(priv=L['priv'])}</span></label>
<button class="cx-btn cx-btn-t" type="submit">{F['send'][lang]}</button><p class="cx-err" role="alert" hidden></p></form>
<template class="cx-ok-t"><h3>{F['ok_h'][lang]}</h3><p>{F['ok_p'][lang]}</p><p><a class="cx-btn cx-btn-n" href="{L['budget']}">{E.CTA[lang][0]}</a></p></template></div>
</div></section>'''
    art = {"@type": "Article", "headline": E.H1[lang], "description": E.DESC[lang], "inLanguage": lang, "datePublished": "2026-11-17", "dateModified": TODAY,
           "mainEntityOfPage": BASE + E.URL[lang], "image": BASE + "/assets/img/gen/microschool-sala.webp",
           "author": {"@id": BASE + "/#school"}, "publisher": {"@id": BASE + "/#school"}}
    page(lang, E.URL, E.TITLE[lang], E.DESC[lang], body, ld(ORG_LD, crumbs(lang, trail), art), scripts=FORMS)


# ───────────── Colabora con Chanak ─────────────
def hub(lang):
    L = LINKS[lang]; H = U.HUB; urls = U.URLS['hub']
    trail = [(H['h1'][lang], urls[lang])]
    body = f'''
<section class="cx-navy cx-phead"><div class="cx-wrap">{crumb_html(lang, trail)}<h1>{H['h1'][lang]}</h1><p class="cx-lead">{H['lead'][lang]}</p></div></section>
<section class="cx-sec"><div class="cx-wrap"><div class="cx-plans">
<div class="cx-plan"><h2 style="font-size:1.5rem">{H['c1_h'][lang]}</h2><p>{H['c1_p'][lang]}</p><div class="cx-btns"><a class="cx-btn cx-btn-n" href="{U.URLS['mentors'][lang]}">{H['c1_cta'][lang]}</a></div></div>
<div class="cx-plan"><h2 style="font-size:1.5rem">{H['c2_h'][lang]}</h2><p>{H['c2_p'][lang]}</p><p class="cx-note">{H['c2_note'][lang]}</p><div class="cx-btns"><a class="cx-btn cx-btn-n" href="{U.URLS['amb'][lang]}">{H['c2_cta'][lang]}</a></div></div>
</div><p class="cx-note cx-center" style="margin-top:28px">{H['ms'][lang].format(u=L['open'])}</p></div></section>'''
    page(lang, urls, H['title'][lang], H['desc'][lang], body, ld(ORG_LD, crumbs(lang, trail)))


def mentors(lang):
    L = LINKS[lang]; M = U.MEN; urls = U.URLS['mentors']
    trail = [(U.HUB['h1'][lang], U.URLS['hub'][lang]), (M['h1'][lang], urls[lang])]
    does = ''.join(f'<li>{x[lang]}</li>' for x in M['does'])
    roles = ''.join(f'<option>{x[lang]}</option>' for x in M['roles'])
    A = U.AMB
    body = f'''
<section class="cx-navy cx-phead"><div class="cx-wrap">{crumb_html(lang, trail)}<h1>{M['h1'][lang]}</h1><p class="cx-lead">{M['lead'][lang]}</p></div></section>
<section class="cx-sec"><div class="cx-wrap cx-split"><div><h2>{M['does_h'][lang]}</h2><ul class="cx-list">{does}</ul></div>
<img src="/assets/img/gen/hs-mentoria.webp" alt="{html.escape(dict(es='Sesión de mentoría por videollamada vista desde atrás, con un cuaderno abierto', en='Video mentoring session seen from behind, with an open notebook')[lang])}" width="1200" height="800" decoding="async"></div></section>
<section class="cx-sec cx-soft"><div class="cx-wrap"><div class="cx-grid cx-g3" style="margin-top:0">
<div class="cx-card"><h3>{M['req_h'][lang]}</h3><p>{M['req_p'][lang]}</p><ul class="cx-list">{''.join('<li>'+x[lang]+'</li>' for x in M['req'])}</ul></div>
<div class="cx-card"><h3>{M['train_h'][lang]}</h3><p>{M['train_p'][lang]} <a href="https://training.chanakacademy.org" target="_blank" rel="noopener">Chanak TrainUp ↗</a></p></div>
<div class="cx-card"><h3>{M['diff_h'][lang]}</h3><p>{M['diff_p'][lang]}</p></div></div></div></section>
<section class="cx-sec cx-navy" id="formulario"><div class="cx-wrap cx-split"><div><h2>{M['form_h'][lang]}</h2><p class="cx-lead">{M['train_p'][lang].split('. ')[-1]}</p></div>
<div><form class="cx-form" {form_attrs(lang)}>
<input type="hidden" name="necesidad" value="mentor"><input type="hidden" name="origen" value="unete-mentores">
<div class="cx-f2"><div><label class="l" for="mt-n">{A['f_name'][lang]}</label><input class="cx-inp" id="mt-n" name="nombre" autocomplete="name" required></div>
<div><label class="l" for="mt-e">{A['f_email'][lang]}</label><input class="cx-inp" id="mt-e" name="email" type="email" autocomplete="email" required></div></div>
<div class="cx-f2"><div><label class="l" for="mt-p">{A['f_country'][lang]}</label><input class="cx-inp" id="mt-p" name="pais" autocomplete="country-name" required></div>
<div><label class="l" for="mt-r">{M['role'][lang]}</label><select class="cx-inp" id="mt-r" name="rol_interes" required><option value="">—</option>{roles}</select></div></div>
<label class="l" for="mt-m">{M['msg'][lang]}</label><textarea class="cx-inp" id="mt-m" name="mensaje" rows="4" required></textarea>
{hp()}<label class="cx-check"><input type="checkbox" name="consentimiento" required><span>{lg(C.PRIV, lang).format(priv=L['priv'])}</span></label>
<button class="cx-btn cx-btn-t" type="submit">{M['send'][lang]}</button><p class="cx-err" role="alert" hidden></p></form>
<template class="cx-ok-t"><h3>{M['ok_h'][lang]}</h3><p>{M['ok_p'][lang]}</p></template></div></div></section>'''
    page(lang, urls, M['title'][lang], M['desc'][lang], body, ld(ORG_LD, crumbs(lang, trail)), scripts=FORMS)


def ambassadors(lang):
    L = LINKS[lang]; A = U.AMB; urls = U.URLS['amb']
    trail = [(U.HUB['h1'][lang], U.URLS['hub'][lang]), (U.HUB['c2_h'][lang], urls[lang])]
    stats = ''.join(f'<div><div class="cx-num">{a[lang]}</div><p>{b[lang]}</p></div>' for a, b in A['stats'])
    who = ''.join(f'<div class="cx-card"><h3>{a[lang]}</h3><p>{b[lang]}</p></div>' for a, b in A['who'])
    how = ''.join(f'<div class="cx-card"><div class="cx-step-n">{i}</div><h3>{a[lang]}</h3><p>{b[lang]}</p></div>' for i, (a, b) in enumerate(A['how'], 1))
    get = ''.join(f'<li>{x[lang]}</li>' for x in A['get'])
    terms = ''.join(f'<li><b>{a[lang]}:</b> {b[lang]}</li>' for a, b in A['terms'])
    yes = ''.join(f'<li>{x[lang]}</li>' for x in A['yes']); no = ''.join(f'<li>{x[lang]}</li>' for x in A['no'])
    faq = [(q[lang], a[lang]) for q, a in A['faq']]
    faq_html = ''.join(f'<details><summary>{html.escape(q)}</summary><p>{html.escape(a)}</p></details>' for q, a in faq)
    types = ''.join(f'<option>{x[lang]}</option>' for x in A['types'])
    T_, D_ = U.URLS['terms'][lang], U.URLS['disc'][lang]
    body = f'''
<section class="cx-navy cx-phead"><div class="cx-wrap">{crumb_html(lang, trail)}<div class="cx-eyebrow">{A['eyebrow'][lang]}</div>
<h1>{A['h1'][lang]}</h1><p class="cx-lead">{A['lead'][lang]}</p>
<div class="cx-btns" style="margin-top:22px"><a class="cx-btn cx-btn-t" href="#aplicar">{A['cta'][lang]}</a><a class="cx-btn cx-btn-w" href="#como">{A['cta2'][lang]}</a></div>
<div class="cx-grid cx-g3 cx-amb-stats">{stats}</div>
<blockquote class="cx-quote">{A['quote'][lang]}<cite>{A['cite'][lang]}</cite></blockquote>
<p class="cx-banner" style="margin-top:18px">{A['excl'][lang]}</p></div></section>
<section class="cx-sec"><div class="cx-wrap"><div class="cx-center"><h2>{A['who_h'][lang]}</h2><p class="cx-lead">{A['who_p'][lang]}</p></div><div class="cx-grid cx-g4">{who}</div></div></section>
<section class="cx-sec cx-soft" id="como"><div class="cx-wrap"><div class="cx-center"><h2>{A['how_h'][lang]}</h2></div><div class="cx-grid cx-g3">{how}</div></div></section>
<section class="cx-sec"><div class="cx-wrap cx-split" style="align-items:start"><div><h2>{A['get_h'][lang]}</h2><ul class="cx-list">{get}</ul></div>
<div><h2>{A['terms_h'][lang]}</h2><p>{A['terms_p'][lang]}</p><ul class="cx-terms">{terms}</ul></div></div></section>
<section class="cx-sec cx-soft" id="reglas"><div class="cx-wrap"><div class="cx-center"><h2>{A['rules_h'][lang]}</h2><p class="cx-lead">{A['rules_p'][lang]}</p></div>
<div class="cx-grid cx-g2"><div class="cx-card cx-yes"><h3>{A['yes_h'][lang]}</h3><ul class="cx-list">{yes}</ul></div><div class="cx-card cx-no"><h3>{A['no_h'][lang]}</h3><ul class="cx-list cx-list-no">{no}</ul></div></div></div></section>
<section class="cx-sec" id="preguntas"><div class="cx-wrap"><div class="cx-center"><h2>{A['faq_h'][lang]}</h2></div><div class="cx-faq">{faq_html}</div></div></section>
<section class="cx-sec cx-navy" id="aplicar"><div class="cx-wrap cx-split" style="align-items:start"><div><h2>{A['form_h'][lang]}</h2><p class="cx-lead">{A['form_p'][lang]}</p><p class="cx-banner" style="margin-top:18px">{A['excl'][lang]}</p><p class="cx-note">{A['f_note'][lang]}</p></div>
<div><form class="cx-form" {form_attrs(lang)}>
<input type="hidden" name="necesidad" value="embajador"><input type="hidden" name="origen" value="unete-embajadores">
<div class="cx-f2"><div><label class="l" for="am-n">{A['f_name'][lang]}</label><input class="cx-inp" id="am-n" name="nombre" autocomplete="name" required></div>
<div><label class="l" for="am-e">{A['f_email'][lang]}</label><input class="cx-inp" id="am-e" name="email" type="email" autocomplete="email" required></div></div>
<div class="cx-f2"><div><label class="l" for="am-p">{A['f_country'][lang]}</label><input class="cx-inp" id="am-p" name="pais" autocomplete="country-name" required></div>
<div><label class="l" for="am-t">{A['f_type'][lang]}</label><select class="cx-inp" id="am-t" name="tipo_embajador" required><option value="">—</option>{types}</select></div></div>
<label class="l" for="am-o">{A['f_org'][lang]}</label><input class="cx-inp" id="am-o" name="organizacion" autocomplete="organization">
<label class="l" for="am-w">{A['f_web'][lang]}</label><input class="cx-inp" id="am-w" name="sitio_web">
<label class="l" for="am-m">{A['f_msg'][lang]}</label><textarea class="cx-inp" id="am-m" name="mensaje" rows="4" required></textarea>
{hp()}
<label class="cx-check"><input type="checkbox" name="declara_sin_fondos_estatales" required><span>{A['c1'][lang]}</span></label>
<label class="cx-check"><input type="checkbox" name="acepta_terminos_y_divulgacion" required><span>{A['c2'][lang].format(terms=T_, disc=D_)}</span></label>
<label class="cx-check"><input type="checkbox" name="consentimiento" required><span>{A['c3'][lang].format(priv=L['priv'])}</span></label>
<button class="cx-btn cx-btn-t" type="submit">{A['send'][lang]}</button><p class="cx-err" role="alert" hidden></p></form>
<template class="cx-ok-t"><h3>{A['ok_h'][lang]}</h3><p>{A['ok_p'][lang]}</p></template></div></div></section>
<section class="cx-sec cx-soft" style="padding:32px 0"><div class="cx-wrap"><p class="cx-note" style="margin:0">{A['foot'][lang]}</p>
<p class="cx-note"><a href="{T_}">{A['l_terms'][lang]}</a> · <a href="{L['priv']}">{A['l_priv'][lang]}</a> · <a href="{D_}">{A['l_disc'][lang]}</a></p></div></section>'''
    page(lang, urls, A['title'][lang], A['desc'][lang], body, ld(ORG_LD, crumbs(lang, trail), faq_ld(faq)), scripts=FORMS)


def draft(lang, key, doc):
    urls = U.URLS[key]
    trail = [(U.HUB['h1'][lang], U.URLS['hub'][lang]), (U.HUB['c2_h'][lang], U.URLS['amb'][lang]), (doc['title'][lang], urls[lang])]
    secs = ''.join(f'<h2 style="font-size:1.3rem;margin-top:1.6em">{a[lang]}</h2><p>{b[lang]}</p>' for a, b in doc['body'])
    body = f'''<section class="cx-navy cx-phead"><div class="cx-wrap">{crumb_html(lang, trail)}<h1>{doc['title'][lang]}</h1></div></section>
<section class="cx-sec"><div class="cx-wrap cx-article"><p class="cx-banner"><strong>{U.DRAFT[lang]}</strong></p><!-- PENDIENTE_MARIELA: revisión legal antes de indexar -->{secs}
<p class="cx-note">Chanak TrainUp Education, Inc. · FLDOE #134620 · {dict(es='Acreditada por MSA-CESS', en='Accredited by MSA-CESS')[lang]}</p>
<p><a href="{U.URLS['amb'][lang]}">← {U.AMB['title'][lang]}</a></p></div></section>'''
    page(lang, urls, doc['title'][lang] + ' · Chanak', U.DRAFT[lang], body, '', noindex=True)


if __name__ == '__main__':
    print('Presupuesto y 7 errores:')
    for l in PT_LANGS:
        budget(l); errores(l)
    print('Colabora con Chanak:')
    for l in ('es', 'en'):
        hub(l); mentors(l); ambassadors(l); draft(l, 'terms', U.TERMS); draft(l, 'disc', U.DISC)
