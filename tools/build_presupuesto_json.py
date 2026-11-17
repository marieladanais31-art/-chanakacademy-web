#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Genera assets/data/presupuesto-alcance.json desde las hojas `Parametros_alcance` y `Cuotas_Chanak` de
assets/descargas/Calculadora-Presupuesto-Microschool-Chanak-ES.xlsx (fuente única de datos de la hoja y de la web).
Los importes vacíos se publican como null: la web no inventa valores. Uso: python3 tools/build_presupuesto_json.py"""
import json, os, sys, datetime
sys.path.insert(0, os.path.dirname(__file__))
import build_normativa as bn
ROOT = bn.ROOT


def num(v):
    if v in (None, ''): return None
    try:
        f = float(v); return int(f) if f == int(f) else f
    except ValueError:
        return None


def build():
    pa = bn.read_sheet('Parametros_alcance'); cq = bn.read_sheet('Cuotas_Chanak')
    # Alcances (filas 6–10; banderas B–E)
    alc = [{'id': f'alcance{r - 5}', 'name': pa[r]['A'], 'flags': [int(num(pa[r].get(c)) or 0) for c in 'BCDE']} for r in range(6, 11)]
    tr = []
    for r in range(15, 19):
        d = pa[r]
        tr.append({'id': f'tramo{r - 14}', 'name': d['A'], 'ratio': num(d.get('B')), 'aula': num(d.get('C')), 'm2': num(d.get('D')), 'coste_guia': num(d.get('E')),
                   'mat_inicial': num(d.get('F')), 'tec_inicial': num(d.get('G')), 'mat_mensual': num(d.get('H')), 'nota': d.get('I', ''), 'etapa': int(num(d.get('J')) or 1)})
    coord = {'coste': num(pa[21].get('B')), 'min_etapas': int(num(pa[22].get('B')) or 2), 'numero': int(num(pa[23].get('B')) or 1)}
    inv, mon, r = [], [], 27
    while pa.get(r, {}).get('A'):
        d = pa[r]; inv.append({'id': d['A'], 'name_es': d.get('B', ''), 'pilar_es': d.get('C', ''), 'flags': [int(num(d.get(c)) or 0) for c in 'DEFG'], 'custom': d['A'].startswith('otra_')}); r += 1
    r += 3
    while pa.get(r, {}).get('A'):
        d = pa[r]; mon.append({'id': d['A'], 'name_es': d.get('B', ''), 'pilar_es': d.get('C', ''), 'custom': d['A'].startswith('otra_')}); r += 1
    cuotas = {'incorporacion': num(cq.get(4, {}).get('C')), 'fija_mensual': num(cq.get(5, {}).get('C')), 'por_alumno': num(cq.get(6, {}).get('C'))}
    data = {'fuente': 'assets/descargas/Calculadora-Presupuesto-Microschool-Chanak-ES.xlsx · hojas Parametros_alcance y Cuotas_Chanak', 'revision': datetime.date.today().isoformat(),
            'alcances': alc, 'tramos': tr, 'coordinador': coord, 'inversion': inv, 'gasto': mon, 'cuotas_chanak': cuotas}
    p = os.path.join(ROOT, 'assets/data/presupuesto-alcance.json')
    json.dump(data, open(p, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('  · assets/data/presupuesto-alcance.json', len(alc), 'alcances ·', len(tr), 'tramos ·', len(inv), 'partidas de inversión ·', len(mon), 'de gasto · cuotas Chanak:', 'vacías' if all(v is None for v in cuotas.values()) else 'con valores')
    return data


if __name__ == '__main__':
    build()
