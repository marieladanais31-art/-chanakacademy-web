#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Evalúa las fórmulas de la hoja de presupuesto con varios escenarios y guarda los resultados esperados en
tests/fixtures/budget_expected.json; tests/budget_scope.cjs comprueba que el calculador web da lo mismo.
Requiere:  python3 -m venv .venv && .venv/bin/pip install openpyxl formulas
Uso:  .venv/bin/python tools/test_hoja_presupuesto.py"""
import json, os, sys, tempfile
import openpyxl, formulas
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
XLSX = os.path.join(ROOT, 'assets/descargas/Calculadora-Presupuesto-Microschool-Chanak-ES.xlsx')
P = json.load(open(os.path.join(ROOT, 'assets/data/presupuesto-alcance.json'), encoding='utf-8'))
INV_ROW = {it['id']: 10 + i for i, it in enumerate(P['inversion'])}
MON_ROW = {it['id']: 20 + i for i, it in enumerate(P['gasto'])}
SCOPES = [a['name'] for a in P['alcances']]
REF_MON = {'alquiler': 900, 'limpieza': 150, 'docentes_locales': 2600, 'administracion': 800, 'materiales': 200, 'seguros_mes': 150, 'contabilidad': 150, 'marketing_mes': 150, 'reserva_mes': 100}
SCENARIOS = {
    'referencia': dict(fee=400, students=[10, 0, 0, 0], other=0, grants=0, mon=REF_MON, inv={}, params={}),
    'multitramo': dict(fee=450, students=[12, 15, 20, 25], other=300, grants=150, mon={'alquiler': 2000, 'plataforma': 300, 'seguros_mes': 120},
                       inv={'manipulativos': 800, 'laboratorio': 3000, 'dual_examenes': 1500, 'mobiliario': 2000, 'tecnologia': 2400, 'mobiliario_infantil': 600},
                       params={'coste_guia': [1800, 1700, 1900, 2200], 'coord': 2500, 'mat_inicial': [100, 50, 60, 200], 'tec_inicial': [30, 30, 40, 60], 'mat_mensual': [10, 8, 8, 12]}),
    'primaria_media': dict(fee=380, students=[8, 14, 18, 0], other=0, grants=0, mon={'alquiler': 1500}, inv={'adecuacion': 1000, 'laboratorio': 500},
                           params={'coste_guia': [1500, 1500, 1600, 1800], 'coord': 2000, 'mat_inicial': [0, 0, 0, 0], 'tec_inicial': [0, 0, 0, 0], 'mat_mensual': [0, 0, 0, 0]}),
}


def evaluate(sc, scope):
    wb = openpyxl.load_workbook(XLSX)
    wb['Inicio']['C5'] = 'España'; wb['Inicio']['C6'] = 'EUR'; wb['Inicio']['C7'] = scope
    ie = wb['Ingresos_y_equilibrio']; ie['B4'] = sc['fee']; ie['B10'] = sc['other']; ie['B11'] = sc['grants']
    for k, v in enumerate(sc['students']): ie.cell(row=5 + k, column=2, value=v)
    for i, v in sc['mon'].items(): wb['Gasto_mensual'].cell(row=MON_ROW[i], column=3, value=v)
    for i, v in sc['inv'].items(): wb['Inversion_inicial'].cell(row=INV_ROW[i], column=3, value=v)
    pa = wb['Parametros_alcance']; q = sc['params']
    for k in range(4):
        for key, col in (('coste_guia', 5), ('mat_inicial', 6), ('tec_inicial', 7), ('mat_mensual', 8)):
            if key in q: pa.cell(row=15 + k, column=col, value=q[key][k])
    if 'coord' in q: pa['B21'] = q['coord']
    tmp = os.path.join(tempfile.mkdtemp(), 'h.xlsx'); wb.save(tmp)
    sol = formulas.ExcelModel().loads(tmp).finish().calculate()
    def g(sheet, addr):
        v = sol.get("'[h.xlsx]%s'!%s" % (sheet.upper(), addr))
        x = v.value[0, 0] if v is not None else None
        return x.item() if hasattr(x, 'item') else x
    return g


def main():
    out = {}
    ok = True
    for name, sc in SCENARIOS.items():
        res = {}
        for j, scope in enumerate(SCOPES):
            g = evaluate(sc, scope); col = 'BCDEF'[j]
            comp = {k: g('Comparar_alcances', f'{col}{r}') for k, r in dict(total=8, guias=9, coord=13, staff=14, mat=15, gasto=18, ingresos=19, neto=20, equil=21, inv=25, payback=26).items()}
            comp['guias'] = [g('Comparar_alcances', f'{col}{9 + k}') for k in range(4)]
            sel = dict(total=g('Ingresos_y_equilibrio', 'C9'), gasto=g('Gasto_mensual', 'C2'), neto=g('Ingresos_y_equilibrio', 'B17'), equil=g('Ingresos_y_equilibrio', 'B18'), inv=g('Inversion_inicial', 'C2'))
            for k in ('total', 'gasto', 'neto', 'inv'):
                if abs(float(sel[k]) - float(comp[{'neto': 'neto', 'total': 'total', 'gasto': 'gasto', 'inv': 'inv'}[k]])) > 1e-6: ok = False; print('DISCREPANCIA hoja seleccionada vs comparar', name, scope, k, sel[k], comp[k])
            res[scope] = dict(compare=comp, selected=sel)
        out[name] = dict(input=sc, expected=res)
    json.dump(out, open(os.path.join(ROOT, 'tests/fixtures/budget_expected.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1, default=float)
    print('  · tests/fixtures/budget_expected.json', len(out), 'escenarios ×', len(SCOPES), 'alcances', '· coherente' if ok else '· CON DISCREPANCIAS')
    ref = out['referencia']['expected']['Escuela completa (K–12)']['compare']
    print('referencia Escuela completa: equilibrio', ref['equil'], '| gasto', ref['gasto'])
    sys.exit(0 if ok else 1)


if __name__ == '__main__':
    main()
