#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Barrido de expresiones que no deben aparecer en chanakacademy.org (un solo camino, tres modalidades).
Uso: python3 tools/check_forbidden.py [-v]   → código de salida 1 si hay resultados."""
import os, re, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PHRASES = [
    # ES
    'tres caminos', '3 caminos', 'tres rutas', '3 rutas', r'\buna fe\b', 'diferentes caminos', 'caminos distintos', 'elige tu camino',
    'qu[eé] camino encaja', 'qu[eé] ruta encaja', 'ruta recomendada', 'ver las tres rutas', 'ninguna es mejor que otra', 'plan de ruta',
    # EN
    'three paths', 'three routes', r'\bone faith\b', 'different paths', 'choose your path', 'which path fits', 'recommended route',
    'none is better than another', 'route plan',
    # CA
    'tres camins', 'tres rutes', 'camins diferents', 'quin cam[ií]', 'quina ruta', 'pla de ruta',
    # FR
    'trois voies', 'trois chemins', 'trois parcours', r'\bune foi\b', 'chemins diff[eé]rents', 'quelle voie',
]
RX = re.compile('|'.join(PHRASES), re.I)
EXT = ('.html', '.js', '.py', '.txt', '.md', '.json', '.php', '.xml', '.css', '.csv')
SKIP_DIRS = {'.git', 'node_modules', 'screenshots', '.claude'}
SKIP_FILES = {'tools/check_forbidden.py'}
# Documentos que citan las expresiones precisamente para prohibirlas o registrar el cambio.
QUOTING = set()


def scan():
    hits = []
    for d, dirs, files in os.walk(ROOT):
        dirs[:] = [x for x in dirs if x not in SKIP_DIRS]
        for f in files:
            if not f.endswith(EXT):
                continue
            p = os.path.join(d, f)
            rel = os.path.relpath(p, ROOT)
            if rel in SKIP_FILES or rel in QUOTING:
                continue
            try:
                txt = open(p, encoding='utf-8', errors='replace').read()
            except OSError:
                continue
            for m in RX.finditer(txt):
                line = txt.count('\n', 0, m.start()) + 1
                hits.append((rel, line, m.group(0), txt[max(0, m.start() - 50):m.end() + 50].replace('\n', ' ')))
    return hits


if __name__ == '__main__':
    hits = scan()
    for rel, line, w, ctx in hits:
        print(f'{rel}:{line}: «{w}»' + (f'  …{ctx}…' if '-v' in sys.argv else ''))
    print(f'{len(hits)} resultado(s)')
    sys.exit(1 if hits else 0)
