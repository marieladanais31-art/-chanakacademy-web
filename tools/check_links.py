#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Comprueba enlaces internos, anclas e imágenes de las páginas principales, y que el JSON-LD sea válido.
Uso: python3 tools/check_links.py"""
import glob, json, os, re, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES = ['index.html', 'en/index.html', 'ca/index.html', 'fr/index.html', 'tarifas/index.html', 'en/tuition/index.html', 'como-funciona/index.html',
         'off-campus/index.html', 'dual-diploma/index.html', 'scholarships/index.html']
for pat in ('microschools/**/index.html', 'open-a-microschool/**/index.html', 'unete/**/index.html', 'en/join/**/index.html', 'en/microschools/**/index.html', 'ca/microschools/**/index.html', 'fr/microschools/**/index.html'):
    PAGES += sorted(os.path.relpath(p, ROOT) for p in glob.glob(os.path.join(ROOT, pat), recursive=True))
JS_IDS = {'off-campus/en/index.html': {'planes', 'full-enrollment', 'que-obtiene', 'core', 'matricula-anual', 'portales'}, 'dual-diploma/en/index.html': {'semana', 'core', 'university-pathways', 'opciones-matricula', 'solicitud'}}
cache = {}


def load(rel):
    if rel not in cache:
        p = os.path.join(ROOT, rel)
        cache[rel] = open(p, encoding='utf-8', errors='replace').read() if os.path.isfile(p) else None
    return cache[rel]


def resolve(path):
    path = path.split('?')[0]
    rel = path.lstrip('/')
    if rel == '' or rel.endswith('/'):
        return rel + 'index.html'
    if os.path.isdir(os.path.join(ROOT, rel)):
        return rel + '/index.html'
    return rel


def ids(rel):
    h = load(rel) or ''
    return set(re.findall(r'\bid=["\']([^"\']+)["\']', h)) | JS_IDS.get(rel, set())


errors = []
for page in PAGES:
    h = load(page)
    if h is None:
        errors.append(f'{page}: no existe'); continue
    body = re.sub(r'<div class="cx-legacy-nav".*?<!-- HERO -->', '', h, flags=re.S)
    for m in re.finditer(r'(?:href|src)="([^"]+)"', body):
        u = m.group(1).replace('&amp;', '&')
        if u.startswith(('http', 'mailto:', 'tel:', 'data:', 'javascript:', '//', '{', '$')) or 'enviar-formulario.php' in u:
            continue
        path, _, frag = u.partition('#')
        if path == '':
            target = page
        elif path.startswith('/'):
            target = resolve(path)
        else:
            target = os.path.normpath(os.path.join(os.path.dirname(page), path.split('?')[0]))
            if os.path.isdir(os.path.join(ROOT, target)):
                target += '/index.html'
        if load(target) is None and not os.path.exists(os.path.join(ROOT, target)):
            errors.append(f'{page}: enlace roto → {u}'); continue
        if frag and target.endswith('.html') and frag not in ids(target) and not frag.startswith(':~'):
            errors.append(f'{page}: ancla huérfana → {u}')
    for m in re.finditer(r'<script type="application/ld\+json">(.*?)</script>', h, re.S):
        try:
            json.loads(m.group(1))
        except Exception as e:
            errors.append(f'{page}: JSON-LD inválido ({e})')
for e in sorted(set(errors)):
    print(e)
print(f'{len(PAGES)} páginas revisadas · {len(set(errors))} incidencia(s)')
sys.exit(1 if errors else 0)
