#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Construye assets/descargas/Calculadora-Presupuesto-Microschool-Chanak-ES.xlsx con la variante por ALCANCE de la escuela.

· Fuente única de datos: hojas `Parametros_alcance`, `Cuotas_Chanak` y `Normativa_datos`. La web las lee con
  tools/build_presupuesto_json.py → assets/data/presupuesto-alcance.json (no duplica números).
· Versión pública: `Cuotas_Chanak` lleva solo valores sugeridos y editables (afiliación 3.500; fee 40 por alumno).
· Requiere openpyxl:  python3 -m venv .venv && .venv/bin/pip install openpyxl   (solo para regenerar la hoja)
Uso:  .venv/bin/python tools/build_hoja_presupuesto.py"""
import os, sys, zipfile, re
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.utils import get_column_letter as L

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'assets/descargas/Calculadora-Presupuesto-Microschool-Chanak-ES.xlsx')
SRC_NORM = os.path.join(ROOT, 'assets/descargas/_normativa_origen.xlsx')   # copia de la hoja Normativa_datos (ver más abajo)

NAVY = '0C2D48'
INPUT_FILL = PatternFill('solid', fgColor='FFF2CC')
INPUT_FONT = Font(color='0000FF', name='Calibri', size=11)
HEAD_FILL = PatternFill('solid', fgColor=NAVY)
HEAD_FONT = Font(color='FFFFFF', bold=True, name='Calibri', size=11)
EX_FILL = PatternFill('solid', fgColor='F2F2F2')
TITLE = Font(bold=True, size=15, color=NAVY, name='Calibri')
BOLD = Font(bold=True, name='Calibri', size=11)
NOTE = Font(italic=True, color='526F85', name='Calibri', size=10)
thin = Side(style='thin', color='D8E6EE')
BORDER = Border(top=thin, bottom=thin, left=thin, right=thin)
WRAP = Alignment(wrap_text=True, vertical='top')

ALCANCES = [
    ('Kinder y lectura inicial', (1, 0, 0, 0)),
    ('Elementary (K–5)', (1, 1, 0, 0)),
    ('Middle (6–8)', (0, 0, 1, 0)),
    ('High School (9–12)', (0, 0, 0, 1)),
    ('Escuela completa (K–12)', (1, 1, 1, 1)),
]
# nombre del tramo, etapa, ratio alumnos/guía, alumnos por aula, m² por alumno, nota
TRAMOS = [
    ('K–2 · Kinder y lectura inicial', 1, 8, 12, 3, 'Manipulativos y lectoescritura. Alcance «Kinder» = K–2 por defecto: confirmar con dirección.'),
    ('3–5 · Resto de Elementary', 1, 10, 15, 2.5, 'Lectura, matemáticas y proyectos.'),
    ('6–8 · Middle', 2, 12, 18, 2.5, 'Más autonomía guiada.'),
    ('9–12 · High School', 3, 15, 20, 2.5, 'Laboratorio, Dual Diploma y exámenes.'),
]
# id, nombre, pilar, flags por tramo, nota
INV = [
    ('curriculo_propio', 'Currículo complementario propio (si lo mantienes)', 'A · Plan de estudios', (1, 1, 1, 1), 'Opcional: el plan base lo aporta Chanak'),
    ('material_inicial', 'Material didáctico inicial', 'A · Plan de estudios', (1, 1, 1, 1), 'Libros, kits, material de aula'),
    ('formacion_guias', 'Formación y certificación de guías y coordinadores', 'C · Personal docente', (1, 1, 1, 1), 'El importe se detalla en la propuesta de alianza'),
    ('antecedentes', 'Verificación de antecedentes del personal', 'C · Personal docente', (1, 1, 1, 1), 'Según la ley del país'),
    ('adecuacion', 'Adecuación del local (reformas menores, pintura)', 'B · Instalaciones', (1, 1, 1, 1), ''),
    ('mobiliario', 'Mobiliario de aula y almacenaje', 'B · Instalaciones', (1, 1, 1, 1), ''),
    ('incendios', 'Seguridad contra incendios y evacuación', 'B · Instalaciones', (1, 1, 1, 1), 'Extintores, señalización, plan de evacuación'),
    ('accesibilidad', 'Accesibilidad (rampas, baños adaptados)', 'B · Instalaciones', (1, 1, 1, 1), 'Según normativa local'),
    ('licencias', 'Licencias, permisos y trámites locales', 'B · Instalaciones', (1, 1, 1, 1), 'Uso del local, apertura, inspecciones'),
    ('legal', 'Constitución de la entidad legal y asesoría', 'Legal', (1, 1, 1, 1), ''),
    ('seguros', 'Seguros iniciales', 'Legal', (1, 1, 1, 1), 'Responsabilidad civil y local'),
    ('tecnologia', 'Tecnología (equipos y red)', 'Tecnología', (1, 1, 1, 1), 'Portátiles o tabletas, router'),
    ('marketing', 'Marketing de lanzamiento', 'Marketing', (1, 1, 1, 1), 'Web, folletos, reuniones informativas'),
    ('imprevistos', 'Fondo de imprevistos', 'Reserva', (1, 1, 1, 1), 'Se recomienda reservar un margen'),
    ('manipulativos', 'Manipulativos y material de lectoescritura inicial', 'A · Plan de estudios', (1, 0, 0, 0), 'Solo si el alcance incluye K–2'),
    ('mobiliario_infantil', 'Mobiliario y zona de juego para primeros grados', 'B · Instalaciones', (1, 0, 0, 0), 'Solo si el alcance incluye K–2'),
    ('laboratorio', 'Laboratorio y material de ciencias', 'A · Plan de estudios', (0, 0, 1, 1), 'Solo si el alcance incluye Middle o High School'),
    ('dual_examenes', 'Dual Diploma, exámenes y orientación universitaria', 'A · Plan de estudios', (0, 0, 0, 1), 'Solo si el alcance incluye High School'),
] + [(f'otra_{i}', '(otra partida)', '', (1, 1, 1, 1), '') for i in range(1, 7)]
MON = [
    ('alquiler', 'Alquiler o cesión del espacio y suministros', 'B · Instalaciones', 'Compartir o ceder espacio reduce el coste'),
    ('limpieza', 'Limpieza y mantenimiento', 'B · Instalaciones', ''),
    ('docentes_locales', 'Docentes con habilitación local (materias nacionales)', 'C · Personal docente', 'Si tu país lo exige: Lengua, Historia, etc.'),
    ('administracion', 'Administración y gestión interna', 'C · Personal docente', ''),
    ('plataforma', 'Plataforma, SIS y licencias', 'A · Plan de estudios', 'Según propuesta de alianza'),
    ('cuota_alianza', 'Cuota de alianza con Chanak', 'A · Plan de estudios', 'Introduce el importe de tu propuesta de alianza (o usa la hoja Cuotas_Chanak; no ambas)'),
    ('materiales', 'Material y suministros', 'Operación', ''),
    ('seguros_mes', 'Seguros', 'Legal', 'Promedio mensual'),
    ('contabilidad', 'Contabilidad y gestoría', 'Legal', ''),
    ('marketing_mes', 'Marketing y comunidad', 'Marketing', 'Reuniones, redes, folletos'),
    ('reserva_mes', 'Reserva mensual', 'Reserva', ''),
] + [(f'otra_mes_{i}', '(otra partida)', '', '') for i in range(1, 7)]


def style_range(ws, rng, font=None, fill=None, align=None, border=None):
    for row in ws[rng]:
        for c in row:
            if font: c.font = font
            if fill: c.fill = fill
            if align: c.alignment = align
            if border: c.border = border


def head(ws, row, labels, start=1):
    for i, t in enumerate(labels):
        c = ws.cell(row=row, column=start + i, value=t)
        c.font = HEAD_FONT; c.fill = HEAD_FILL; c.alignment = Alignment(wrap_text=True, vertical='center'); c.border = BORDER


def inp(c, number_format=None):
    c.fill = INPUT_FILL; c.font = INPUT_FONT; c.border = BORDER
    if number_format: c.number_format = number_format


def widths(ws, ws_widths):
    for k, v in ws_widths.items(): ws.column_dimensions[k].width = v


def first_clause(text):
    """Primera cláusula separada por «;» fuera de paréntesis."""
    depth = 0
    for i, ch in enumerate(text):
        depth += ch == '('; depth -= ch == ')'
        if ch == ';' and depth == 0:
            return text[:i].strip().rstrip('.')
    return text.strip().rstrip('.')


def read_normativa():
    """Lee la hoja Normativa_datos de la versión anterior de la hoja (si existe) para conservar su contenido."""
    prev = OUT
    wb = openpyxl.load_workbook(prev, data_only=False)
    ws = wb['Normativa_datos']
    rows = [[c.value for c in r] for r in ws.iter_rows(min_row=1, max_row=ws.max_row, max_col=11)]
    return rows


def build():
    norm = read_normativa()
    header_norm = norm[0][:7]
    wb = openpyxl.Workbook()
    # ───────── Inicio ─────────
    ws = wb.active; ws.title = 'Inicio'
    widths(ws, {'A': 3, 'B': 44, 'C': 34, 'D': 14, 'E': 14, 'F': 14})
    ws['A1'] = 'Calculadora de presupuesto para una Microschool Chanak'; ws['A1'].font = TITLE
    ws['A2'] = 'Chanak International Academy · Registrada en Florida (FLDOE #134620) · Acreditada por MSA-CESS'; ws['A2'].font = NOTE
    ws['A4'] = '1. Elige tu país, tu moneda y el alcance de tu escuela'; ws['A4'].font = BOLD
    for r, (lab, val) in enumerate([('País', 'España'), ('Moneda', 'EUR'), ('Alcance de la escuela (obligatorio)', None)], start=5):
        ws.cell(row=r, column=2, value=lab); c = ws.cell(row=r, column=3, value=val); inp(c)
    dv1 = DataValidation(type='list', formula1="=Normativa_datos!$A$2:$A$11", allow_blank=False); ws.add_data_validation(dv1); dv1.add('C5')
    dv2 = DataValidation(type='list', formula1='"EUR,USD,MXN,PAB"', allow_blank=False); ws.add_data_validation(dv2); dv2.add('C6')
    dv3 = DataValidation(type='list', formula1='=Parametros_alcance!$A$6:$A$10', allow_blank=False, showErrorMessage=True,
                         errorTitle='Alcance obligatorio', error='Elige uno de los cinco alcances de la lista.'); ws.add_data_validation(dv3); dv3.add('C7')
    ws['A9'] = '2. Cómo usar la calculadora'; ws['A9'].font = BOLD
    steps = ['1. Elige el alcance de tu escuela (Kinder y lectura inicial, Elementary, Middle, High School o Escuela completa).',
             '2. Rellena las celdas amarillas con letra azul en Ingresos_y_equilibrio (alumnos de cada tramo habilitado), Inversion_inicial y Gasto_mensual. Los tramos fuera del alcance se cuentan como 0.',
             '3. Los supuestos de personal y espacio por tramo están en Parametros_alcance (celdas amarillas, «supuesto editable»): ajústalos a la ley de tu país.',
             '4. Cada partida indica el pilar de Chanak: A Plan de estudios · B Instalaciones · C Personal docente.',
             '5. Consulta Previo_normativo (marco legal de tu país y notas por etapa) y Comparar_alcances (los cinco alcances en paralelo).',
             '6. Prueba rápida: con gastos mensuales de 5.200 y una cuota de 400 por estudiante, el punto de equilibrio es de 13 estudiantes.']
    for i, t in enumerate(steps): ws.cell(row=10 + i, column=2, value=t)
    ws['A17'] = '3. Resultados clave'; ws['A17'].font = BOLD
    res = [('Alcance elegido', '=IF(C7="","Elige el alcance",C7)'), ('Inversión inicial total', '=Inversion_inicial!C2'), ('Gasto mensual total', '=Gasto_mensual!C2'),
           ('Estudiantes para el punto de equilibrio', '=Ingresos_y_equilibrio!B20'), ('Resultado neto mensual', '=Ingresos_y_equilibrio!B19'),
           ('Resultado neto anual', '=Ingresos_y_equilibrio!B21'), ('Meses para recuperar la inversión', '=Ingresos_y_equilibrio!B22'), ('Lectura', '=Ingresos_y_equilibrio!B23')]
    for i, (a, f) in enumerate(res): ws.cell(row=18 + i, column=2, value=a); ws.cell(row=18 + i, column=3, value=f)
    ws['A27'] = 'Aviso importante'; ws['A27'].font = BOLD
    ws['B28'] = ('Esta calculadora es una herramienta de estimación del socio. No es una oferta, un compromiso económico ni asesoramiento legal o fiscal. '
                 'Las condiciones de alianza con Chanak se entregan por escrito en la propuesta de alianza. La información normativa es un resumen de referencia: '
                 'verifícala con la autoridad educativa y con asesoría legal de tu país antes de decidir. Los supuestos por tramo son editables y orientativos.')
    ws['B28'].alignment = WRAP; ws.merge_cells('B28:F28'); ws.row_dimensions[28].height = 78
    ws['B30'] = 'Leyenda: celda amarilla con letra azul = dato o supuesto editable · celda gris = calculado.'; ws['B30'].font = NOTE
    # ───────── Parametros_alcance ─────────
    pa = wb.create_sheet('Parametros_alcance')
    widths(pa, {'A': 40, 'B': 22, 'C': 22, 'D': 22, 'E': 22, 'F': 22, 'G': 22, 'H': 22, 'I': 46, 'J': 10})
    pa['A1'] = 'Parámetros por alcance y por tramo'; pa['A1'].font = TITLE
    pa['A2'] = 'Origen único de datos de la hoja y de la calculadora web. Celdas amarillas con letra azul = SUPUESTO EDITABLE (ajústalo a la ley y a la realidad de tu país). Los importes quedan vacíos.'
    pa['A2'].font = NOTE
    pa['A4'] = '1. Alcances de la escuela (1 = el tramo está incluido)'; pa['A4'].font = BOLD
    head(pa, 5, ['Alcance (aparece en el desplegable de Inicio)', '=A15', '=A16', '=A17', '=A18'])
    for i, (name, flags) in enumerate(ALCANCES):
        r = 6 + i; inp(pa.cell(row=r, column=1, value=name))
        for k, v in enumerate(flags): inp(pa.cell(row=r, column=2 + k, value=v))
    pa['A11'] = 'Tramos habilitados con el alcance elegido →'; pa['A11'].font = BOLD
    for k in range(4):
        col = L(2 + k); c = pa.cell(row=11, column=2 + k, value=f'=IFERROR(INDEX({col}6:{col}10,MATCH(Inicio!$C$7,$A$6:$A$10,0)),0)'); c.fill = EX_FILL; c.border = BORDER
    pa['A13'] = '2. Tramos y supuestos por tramo'; pa['A13'].font = BOLD
    head(pa, 14, ['Tramo', 'Ratio alumnos por guía', 'Alumnos por aula', 'm² por alumno', 'Coste mensual por guía', 'Material inicial por alumno', 'Tecnología inicial por alumno', 'Material mensual por alumno', 'Notas', 'Etapa'])
    for i, (name, etapa, ratio, aula, m2, nota) in enumerate(TRAMOS):
        r = 15 + i; inp(pa.cell(row=r, column=1, value=name))
        for k, v in enumerate([ratio, aula, m2, None, None, None, None]): inp(pa.cell(row=r, column=2 + k, value=v))
        pa.cell(row=r, column=9, value=nota).alignment = WRAP
        inp(pa.cell(row=r, column=10, value=etapa))
    pa['A19'] = 'Etapa: 1 = Elementary (K–2 y 3–5), 2 = Middle, 3 = High. El coordinador académico se añade si hay alumnos en 2 o más etapas.'; pa['A19'].font = NOTE
    pa['A20'] = '3. Otros parámetros'; pa['A20'].font = BOLD
    pa['A21'] = 'Coste mensual del coordinador académico'; inp(pa['B21'])
    pa['A22'] = 'Etapas con alumnos a partir de las cuales hay coordinador'; inp(pa['B22']); pa['B22'] = 2
    pa['A23'] = 'Número de coordinadores académicos'; inp(pa['B23']); pa['B23'] = 1
    pa['A25'] = '4. Partidas de inversión inicial (1 = aplica a ese tramo)'; pa['A25'].font = BOLD
    head(pa, 26, ['Id', 'Partida', 'Pilar o categoría', '=A15', '=A16', '=A17', '=A18', 'Notas'])
    inv_first = 27
    for i, (iid, name, pil, flags, note) in enumerate(INV):
        r = inv_first + i
        pa.cell(row=r, column=1, value=iid)
        inp(pa.cell(row=r, column=2, value=name)); inp(pa.cell(row=r, column=3, value=pil or None))
        for k, v in enumerate(flags): inp(pa.cell(row=r, column=4 + k, value=v))
        pa.cell(row=r, column=8, value=note or None)
    inv_last = inv_first + len(INV) - 1
    mon_hdr = inv_last + 3
    pa.cell(row=mon_hdr - 1, column=1, value='5. Partidas de gasto mensual introducidas por el socio').font = BOLD
    head(pa, mon_hdr, ['Id', 'Partida', 'Pilar o categoría', 'Notas'])
    mon_first = mon_hdr + 1
    for i, (mid, name, pil, note) in enumerate(MON):
        r = mon_first + i
        pa.cell(row=r, column=1, value=mid); inp(pa.cell(row=r, column=2, value=name)); inp(pa.cell(row=r, column=3, value=pil or None)); pa.cell(row=r, column=4, value=note or None)
    mon_last = mon_first + len(MON) - 1
    # ───────── Cuotas_Chanak ─────────
    cq = wb.create_sheet('Cuotas_Chanak')
    widths(cq, {'A': 4, 'B': 58, 'C': 24, 'D': 70})
    cq['A1'] = 'Cuotas Chanak'; cq['A1'].font = TITLE
    cq['A2'] = 'Valores sugeridos del acuerdo macro (editables; confirma los definitivos en tu propuesta): afiliación inicial 3.500 (una sola vez) y fee mensual de 40 por alumno. La cuota fija mensual queda vacía.'; cq['A2'].font = NOTE
    head(cq, 3, ['', 'Concepto', 'Importe', 'Cómo se aplica'], start=1)
    for r, (lab, how) in enumerate([('Afiliación inicial a Chanak (una sola vez) · sugerencia', 'Se suma a la inversión inicial'),
                                    ('Cuota fija mensual de alianza', 'Se suma al gasto mensual'),
                                    ('Fee mensual Chanak por alumno · acuerdo macro', 'Se multiplica por los alumnos de los tramos activos del alcance elegido')], start=4):
        cq.cell(row=r, column=2, value=lab); inp(cq.cell(row=r, column=3)); cq.cell(row=r, column=4, value=how)
    cq['C4'] = 3500; cq['D4'] = 'Se suma a la inversión inicial (sugerencia; ajústala a tu moneda y a tu propuesta)'
    cq['C6'] = 40; cq['D6'] = 'Se multiplica por los alumnos de los tramos activos del alcance elegido (valor del acuerdo macro; editable)'
    # ───────── Inversion_inicial ─────────
    iv = wb.create_sheet('Inversion_inicial')
    widths(iv, {'A': 56, 'B': 26, 'C': 22, 'D': 56, 'E': 14})
    iv['A1'] = 'Inversión inicial (gastos de una sola vez)'; iv['A1'].font = TITLE
    iv['A2'] = 'TOTAL INVERSIÓN INICIAL →'; iv['A2'].font = BOLD
    n_inv = len(INV); i0 = 10; i1 = i0 + n_inv - 1
    iv['C2'] = '=C4+C5+C6'; iv['C2'].font = BOLD
    iv['A3'] = 'Rellena la columna amarilla con tu estimación (en la moneda elegida en Inicio). Solo suman las partidas que aplican al alcance elegido.'; iv['A3'].font = NOTE
    iv['A4'] = 'Partidas introducidas que aplican al alcance'; iv['C4'] = f'=SUMPRODUCT(C{i0}:C{i1},E{i0}:E{i1})'
    iv['A5'] = 'Material y tecnología por alumno (tramos activos)'
    iv['C5'] = ('=SUMPRODUCT(Ingresos_y_equilibrio!C5:C8,Parametros_alcance!F15:F18)+SUMPRODUCT(Ingresos_y_equilibrio!C5:C8,Parametros_alcance!G15:G18)')
    iv['A6'] = 'Afiliación inicial a Chanak (hoja Cuotas_Chanak)'; iv['C6'] = '=N(Cuotas_Chanak!C4)'
    for r in (4, 5, 6): iv.cell(row=r, column=3).fill = EX_FILL
    head(iv, 9, ['Partida', 'Pilar o categoría', '=\"Importe estimado (\"&Inicio!$C$6&\")\"', 'Notas', 'Aplica (1/0)'])
    for i in range(n_inv):
        r = i0 + i; p = inv_first + i
        iv.cell(row=r, column=1, value=f'=Parametros_alcance!B{p}'); iv.cell(row=r, column=2, value=f'=IF(Parametros_alcance!C{p}="","",Parametros_alcance!C{p})')
        inp(iv.cell(row=r, column=3)); iv.cell(row=r, column=4, value=f'=IF(Parametros_alcance!H{p}="","",Parametros_alcance!H{p})')
        c = iv.cell(row=r, column=5, value=f'=IF(SUMPRODUCT(Parametros_alcance!D{p}:G{p},Parametros_alcance!$B$11:$E$11)>0,1,0)'); c.fill = EX_FILL
    # ───────── Gasto_mensual ─────────
    gm = wb.create_sheet('Gasto_mensual')
    widths(gm, {'A': 56, 'B': 22, 'C': 22, 'D': 22, 'E': 14, 'F': 14, 'G': 22, 'H': 40})
    gm['A1'] = 'Gastos mensuales de funcionamiento'; gm['A1'].font = TITLE
    gm['A2'] = 'TOTAL GASTO MENSUAL →'; gm['A2'].font = BOLD; gm['C2'] = '=C4+C5+C6+C7'; gm['C2'].font = BOLD
    gm['A3'] = 'Rellena la columna amarilla con tu estimación (en la moneda elegida en Inicio). Personal y espacio se calculan con Parametros_alcance.'; gm['A3'].font = NOTE
    g0 = 20; g1 = g0 + len(MON) - 1
    gm['A4'] = 'Partidas introducidas'; gm['C4'] = f'=SUM(C{g0}:C{g1})'
    gm['A5'] = 'Personal: guías y coordinación (calculado)'; gm['C5'] = '=D16'
    gm['A6'] = 'Material mensual por alumno (tramos activos)'; gm['C6'] = '=SUM(G11:G14)'
    gm['A7'] = 'Cuotas Chanak mensuales (hoja Cuotas_Chanak)'; gm['C7'] = '=N(Cuotas_Chanak!C5)+N(Cuotas_Chanak!C6)*Ingresos_y_equilibrio!C9'
    for r in (4, 5, 6, 7): gm.cell(row=r, column=3).fill = EX_FILL
    gm['A9'] = 'Personal y espacio por tramo (calculado)'; gm['A9'].font = BOLD
    head(gm, 10, ['Tramo', 'Alumnos efectivos', 'Guías', 'Coste de guías', 'Aulas', 'm² necesarios', 'Material mensual', 'Etapa'])
    for k in range(4):
        r = 11 + k; p = 15 + k
        gm.cell(row=r, column=1, value=f'=Parametros_alcance!A{p}')
        gm.cell(row=r, column=2, value=f'=Ingresos_y_equilibrio!C{5 + k}')
        gm.cell(row=r, column=3, value=f'=IF(B{r}>0,ROUNDUP(B{r}/Parametros_alcance!B{p},0),0)')
        gm.cell(row=r, column=4, value=f'=C{r}*N(Parametros_alcance!E{p})')
        gm.cell(row=r, column=5, value=f'=IF(B{r}>0,ROUNDUP(B{r}/Parametros_alcance!C{p},0),0)')
        gm.cell(row=r, column=6, value=f'=B{r}*Parametros_alcance!D{p}')
        gm.cell(row=r, column=7, value=f'=B{r}*N(Parametros_alcance!H{p})')
        gm.cell(row=r, column=8, value=f'=Parametros_alcance!J{p}')
    gm['A15'] = 'Coordinador académico (si hay alumnos en 2 o más etapas)'
    gm['C15'] = ('=IF(((SUMIF(H11:H14,1,B11:B14)>0)+(SUMIF(H11:H14,2,B11:B14)>0)+(SUMIF(H11:H14,3,B11:B14)>0))>=Parametros_alcance!B22,Parametros_alcance!B23,0)')
    gm['D15'] = '=C15*N(Parametros_alcance!B21)'
    gm['A16'] = 'Total personal'; gm['A16'].font = BOLD; gm['B16'] = '=SUM(B11:B14)'; gm['C16'] = '=SUM(C11:C15)'; gm['D16'] = '=SUM(D11:D15)'
    gm['E16'] = '=SUM(E11:E14)'; gm['F16'] = '=SUM(F11:F14)'
    gm['A17'] = 'Ajusta ratios y costes a la ley del país en Parametros_alcance.'; gm['A17'].font = NOTE
    head(gm, 19, ['Partida', 'Pilar o categoría', '=\"Importe estimado (\"&Inicio!$C$6&\")\"', 'Notas'])
    for i in range(len(MON)):
        r = g0 + i; p = mon_first + i
        gm.cell(row=r, column=1, value=f'=Parametros_alcance!B{p}'); gm.cell(row=r, column=2, value=f'=IF(Parametros_alcance!C{p}="","",Parametros_alcance!C{p})')
        inp(gm.cell(row=r, column=3)); gm.cell(row=r, column=4, value=f'=IF(Parametros_alcance!D{p}="","",Parametros_alcance!D{p})')
    # ───────── Ingresos_y_equilibrio ─────────
    ie = wb.create_sheet('Ingresos_y_equilibrio')
    widths(ie, {'A': 46, 'B': 24, 'C': 18, 'D': 70})
    ie['A1'] = 'Ingresos y punto de equilibrio'; ie['A1'].font = TITLE
    ie['A3'] = 'Introduce tus supuestos (celdas amarillas):'; ie['A3'].font = BOLD
    ie['C3'] = 'Efectivo'; ie['C3'].font = BOLD
    ie['A4'] = 'Cuota mensual por estudiante'; inp(ie['B4']); ie['D4'] = 'Fijada por el socio según su realidad local (misma cuota para todos los tramos)'
    for k in range(4):
        r = 5 + k; p = 15 + k
        ie.cell(row=r, column=1, value=f'="Alumnos · "&Parametros_alcance!A{p}'); inp(ie.cell(row=r, column=2))
        c = ie.cell(row=r, column=3, value=f'=IF(Parametros_alcance!{L(2 + k)}$11=1,N(B{r}),0)'); c.fill = EX_FILL
        ie.cell(row=r, column=4, value=f'=IF(Parametros_alcance!{L(2 + k)}$11=1,"Tramo incluido en el alcance elegido","Fuera del alcance elegido: se cuenta como 0")')
    ie['A9'] = 'Total de alumnos efectivos'; ie['A9'].font = BOLD; ie['C9'] = '=SUM(C5:C8)'; ie['C9'].fill = EX_FILL
    ie['A10'] = 'Otros ingresos mensuales'; inp(ie['B10']); ie['D10'] = 'Donaciones, apoyos locales; fondos ESA solo en EE. UU. y según elegibilidad'
    ie['A11'] = 'Becas y descuentos mensuales (total)'; inp(ie['B11']); ie['D11'] = 'Suma de reducciones de cuota'
    ie['A13'] = 'Resultados'; ie['A13'].font = BOLD
    rows = [('Ingresos por cuotas', '=B4*C9'), ('Ingresos mensuales totales', '=B14+B10-B11'), ('Gasto mensual total', '=Gasto_mensual!C2'),
            ('Resultado neto mensual', '=B15-B16'), ('Estudiantes para el punto de equilibrio', '=IF(B4>0,MAX(0,ROUNDUP((B16-B10+B11)/B4,0)),"N/A")'),
            ('Resultado neto anual (con el objetivo)', '=B17*12'), ('Meses para recuperar la inversión inicial', '=IF(B17>0,ROUNDUP(Inversion_inicial!C2/B17,0),"No se recupera")')]
    # filas 14..: ingresos(14) total(15) gasto(16) neto(17) equilibrio(18) anual(19) meses(20)
    for i, (a, f) in enumerate(rows):
        ie.cell(row=14 + i, column=1, value=a); ie.cell(row=14 + i, column=2, value=f).fill = EX_FILL
    # Inicio apunta a B20 (equilibrio), B19 (neto mensual), B21 (anual), B22 (meses), B23 (lectura): se reubican abajo
    ie['A21'] = 'Lectura'
    ie['B21'] = ('=IF(Inicio!C7="","Elige el alcance de la escuela en Inicio",IF(B4=0,"Introduce la cuota mensual por estudiante",'
                 'IF(C9>=B18,"Con este número de estudiantes cubres los gastos mensuales","Necesitas más estudiantes, una cuota mayor o menos gastos")))')
    ie['A23'] = 'Consejos'; ie['A23'].font = BOLD
    for i, t in enumerate(['• Empieza pequeño: comparte o cede espacio con una iglesia o comunidad y escalona la contratación del personal.',
                           '• Fija la cuota con tu presupuesto en la mano, no por miedo a no llenar la escuela.',
                           '• Actualiza este presupuesto cada mes: un presupuesto que no se revisa deja de servir.',
                           '• Procura un pequeño excedente a partir del tercer mes para crear una reserva.',
                           '• Crece por fases: compara los alcances en la hoja Comparar_alcances.']): ie.cell(row=24 + i, column=1, value=t)
    # referencias de Inicio coherentes con la disposición definitiva
    ws['C21'] = '=Ingresos_y_equilibrio!B18'; ws['C22'] = '=Ingresos_y_equilibrio!B17'; ws['C23'] = '=Ingresos_y_equilibrio!B19'
    ws['C24'] = '=Ingresos_y_equilibrio!B20'; ws['C25'] = '=Ingresos_y_equilibrio!B21'
    # ───────── Previo_normativo ─────────
    pv = wb.create_sheet('Previo_normativo')
    widths(pv, {'A': 34, 'B': 110})
    pv['A1'] = 'Previo normativo para tu Microschool'; pv['A1'].font = TITLE
    pv['A2'] = '="País seleccionado: "&Inicio!$C$5&"   ·   Moneda: "&Inicio!$C$6&"   ·   Alcance: "&IF(Inicio!$C$7="","(sin elegir)",Inicio!$C$7)'
    pv['A3'] = 'Resumen de referencia, no es asesoramiento legal. Verifica la normativa en fuente oficial de tu país. Cambia el país en la hoja Inicio.'; pv['A3'].font = NOTE
    labels = [('Marco legal de referencia', 'B'), ('A. Acreditación y plan de estudios', 'C'), ('B. Instalaciones', 'D'), ('C. Personal docente', 'E'), ('Partidas que conviene presupuestar', 'F'),
              ('Verificaciones pendientes', 'G'), ('Notas por etapa · Infantil', 'H'), ('Notas por etapa · Primaria', 'I'), ('Notas por etapa · Secundaria', 'J'), ('Notas por etapa · Bachillerato', 'K')]
    for i, (lab, col) in enumerate(labels):
        r = 5 + i; pv.cell(row=r, column=1, value=lab).font = BOLD
        c = pv.cell(row=r, column=2, value=f'=INDEX(Normativa_datos!${col}$2:${col}$11,MATCH(Inicio!$C$5,Normativa_datos!$A$2:$A$11,0))'); c.alignment = WRAP
    pv['A16'] = 'Tu presupuesto en resumen'; pv['A16'].font = BOLD
    for i, (a, f) in enumerate([('Inversión inicial', '=Inversion_inicial!C2'), ('Gasto mensual', '=Gasto_mensual!C2'), ('Estudiantes para el equilibrio', '=Ingresos_y_equilibrio!B18'), ('Resultado neto mensual', '=Ingresos_y_equilibrio!B17')]):
        pv.cell(row=17 + i, column=1, value=a); pv.cell(row=17 + i, column=2, value=f)
    pv['A22'] = 'Chanak International Academy orienta y acompaña, pero no sustituye el asesoramiento legal local ni garantiza autorizaciones, códigos de centro ni fondos públicos. Consulta siempre a la autoridad educativa de tu país.'
    pv['A22'].alignment = WRAP; pv.merge_cells('A22:B22'); pv.row_dimensions[22].height = 40
    # ───────── Normativa_datos ─────────
    nd = wb.create_sheet('Normativa_datos')
    widths(nd, {'A': 16, 'B': 38, 'C': 44, 'D': 48, 'E': 44, 'F': 40, 'G': 40, 'H': 40, 'I': 40, 'J': 40, 'K': 40})
    head(nd, 1, header_norm + ['Nota por etapa · Infantil', 'Nota por etapa · Primaria', 'Nota por etapa · Secundaria', 'Nota por etapa · Bachillerato'])
    for r_i, row in enumerate(norm[1:], start=2):
        vals = list(row[:7])
        pais = vals[0]
        marco = first_clause(vals[1] or '')
        verif = 'Requisitos específicos de esta etapa: verificar en fuente oficial con la autoridad educativa de ' + (pais if pais != 'Otro país' else 'tu país') + '.'
        notes = [f'Marco de referencia: {marco}. {verif}' if marco and pais != 'Otro país' else verif] * 4
        for c_i, v in enumerate(vals + notes, start=1):
            c = nd.cell(row=r_i, column=c_i, value=v); c.alignment = WRAP
    # ───────── Comparar_alcances ─────────
    cm = wb.create_sheet('Comparar_alcances')
    widths(cm, {'A': 52, 'B': 24, 'C': 24, 'D': 24, 'E': 24, 'F': 24})
    cm['A1'] = 'Comparar alcances'; cm['A1'].font = TITLE
    cm['A2'] = 'Las mismas entradas (cuota, alumnos por tramo, otros ingresos, becas y partidas) calculadas para los cinco alcances en paralelo. Los alumnos de tramos fuera de cada alcance cuentan como 0.'; cm['A2'].font = NOTE
    head(cm, 3, ['Concepto'] + [f'=Parametros_alcance!A{6 + j}' for j in range(5)])
    cols = [L(2 + j) for j in range(5)]
    ir = {'a1': 4, 'a2': 5, 'a3': 6, 'a4': 7, 'tot': 8, 'g1': 9, 'g2': 10, 'g3': 11, 'g4': 12, 'coord': 13, 'staff': 14, 'mat': 15, 'chanak': 16, 'manual': 17, 'gasto': 18,
          'ingreso': 19, 'neto': 20, 'equil': 21, 'inv_part': 22, 'inv_alumno': 23, 'inv_cuota': 24, 'inv': 25, 'payback': 26}
    lab = {'a1': '="Alumnos · "&Parametros_alcance!A15', 'a2': '="Alumnos · "&Parametros_alcance!A16', 'a3': '="Alumnos · "&Parametros_alcance!A17', 'a4': '="Alumnos · "&Parametros_alcance!A18',
           'tot': 'Total de alumnos', 'g1': '="Guías · "&Parametros_alcance!A15', 'g2': '="Guías · "&Parametros_alcance!A16', 'g3': '="Guías · "&Parametros_alcance!A17', 'g4': '="Guías · "&Parametros_alcance!A18',
           'coord': 'Coordinadores académicos', 'staff': 'Coste de personal', 'mat': 'Material mensual por alumno', 'chanak': 'Cuotas Chanak mensuales (hoja Cuotas_Chanak)',
           'manual': 'Partidas de gasto introducidas', 'gasto': 'Gasto mensual total', 'ingreso': 'Ingresos mensuales totales', 'neto': 'Resultado neto mensual',
           'equil': 'Estudiantes para el punto de equilibrio', 'inv_part': 'Inversión: partidas que aplican al alcance', 'inv_alumno': 'Inversión: material y tecnología por alumno',
           'inv_cuota': 'Inversión: cuota de incorporación (Cuotas_Chanak)', 'inv': 'Inversión inicial total', 'payback': 'Meses para recuperar la inversión'}
    for k, r in ir.items(): cm.cell(row=r, column=1, value=lab[k])
    m0 = 30; m1 = m0 + n_inv - 1
    for j, col in enumerate(cols):
        sr = 6 + j   # fila del alcance en Parametros_alcance
        for k in range(4):
            cm[f'{col}{4 + k}'] = f'=Ingresos_y_equilibrio!$B${5 + k}*Parametros_alcance!{L(2 + k)}${sr}'
            p = 15 + k
            cm[f'{col}{9 + k}'] = f'=IF({col}{4 + k}>0,ROUNDUP({col}{4 + k}/Parametros_alcance!$B${p},0),0)'
        cm[f'{col}8'] = f'=SUM({col}4:{col}7)'
        cm[f'{col}13'] = (f'=IF(((SUMIF(Parametros_alcance!$J$15:$J$18,1,{col}4:{col}7)>0)+(SUMIF(Parametros_alcance!$J$15:$J$18,2,{col}4:{col}7)>0)+(SUMIF(Parametros_alcance!$J$15:$J$18,3,{col}4:{col}7)>0))>=Parametros_alcance!$B$22,Parametros_alcance!$B$23,0)')
        cm[f'{col}14'] = ('=' + '+'.join(f'{col}{9 + k}*N(Parametros_alcance!$E${15 + k})' for k in range(4)) + f'+{col}13*N(Parametros_alcance!$B$21)')
        cm[f'{col}15'] = '=' + '+'.join(f'{col}{4 + k}*N(Parametros_alcance!$H${15 + k})' for k in range(4))
        cm[f'{col}16'] = f'=N(Cuotas_Chanak!$C$5)+N(Cuotas_Chanak!$C$6)*{col}8'
        cm[f'{col}17'] = '=Gasto_mensual!$C$4'
        cm[f'{col}18'] = f'={col}14+{col}15+{col}16+{col}17'
        cm[f'{col}19'] = f'=Ingresos_y_equilibrio!$B$4*{col}8+Ingresos_y_equilibrio!$B$10-Ingresos_y_equilibrio!$B$11'
        cm[f'{col}20'] = f'={col}19-{col}18'
        cm[f'{col}21'] = f'=IF(Ingresos_y_equilibrio!$B$4>0,MAX(0,ROUNDUP(({col}18-Ingresos_y_equilibrio!$B$10+Ingresos_y_equilibrio!$B$11)/Ingresos_y_equilibrio!$B$4,0)),"N/A")'
        cm[f'{col}22'] = f'=SUMPRODUCT(Inversion_inicial!$C${i0}:$C${i1},{col}{m0}:{col}{m1})'
        cm[f'{col}23'] = '=' + '+'.join(f'{col}{4 + k}*(N(Parametros_alcance!$F${15 + k})+N(Parametros_alcance!$G${15 + k}))' for k in range(4))
        cm[f'{col}24'] = '=N(Cuotas_Chanak!$C$4)'
        cm[f'{col}25'] = f'={col}22+{col}23+{col}24'
        cm[f'{col}26'] = f'=IF({col}20>0,ROUNDUP({col}25/{col}20,0),"No se recupera")'
        for r in range(4, 27): cm[f'{col}{r}'].fill = EX_FILL
        for i in range(n_inv):
            pinv = inv_first + i
            cm[f'{col}{m0 + i}'] = f'=IF(SUMPRODUCT(Parametros_alcance!$D{pinv}:$G{pinv},Parametros_alcance!$B${sr}:$E${sr})>0,1,0)'
    cm.cell(row=m0 - 2, column=1, value='Partidas de inversión que aplican a cada alcance (1 = aplica)').font = BOLD
    for i in range(n_inv): cm.cell(row=m0 + i, column=1, value=f'=Parametros_alcance!B{inv_first + i}')
    for r in range(4, 27): cm.cell(row=r, column=1).alignment = WRAP
    # orden de hojas
    wb._sheets = [wb[n] for n in ['Inicio', 'Parametros_alcance', 'Cuotas_Chanak', 'Inversion_inicial', 'Gasto_mensual', 'Ingresos_y_equilibrio', 'Comparar_alcances', 'Previo_normativo', 'Normativa_datos']]
    wb.save(OUT)
    print('  ·', os.path.relpath(OUT, ROOT), '·', len(INV), 'partidas de inversión ·', len(MON), 'de gasto')
    return dict(inv_first=inv_first, inv_last=inv_last, mon_first=mon_first, mon_last=mon_last)


if __name__ == '__main__':
    build()
