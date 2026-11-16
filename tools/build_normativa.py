#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Genera assets/data/normativa-paises.json a partir de la hoja «Normativa_datos» de
assets/descargas/Calculadora-Presupuesto-Microschool-Chanak-ES.xlsx (fuente única de datos).

· El «previo» descargable usa las columnas de la hoja tal cual (A, B, C, partidas y verificaciones).
· La web pública solo muestra `legal` (normas VERIFICADAS en fuente oficial) y `resumen` (1–2 frases).
  Una norma de la hoja que no esté en VERIFIED no se publica: ver docs/AUDITORIA-INCOHERENCIAS.md.
Uso: python3 tools/build_normativa.py"""
import json, os, re, zipfile, datetime
import xml.etree.ElementTree as ET
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
XLSX = os.path.join(ROOT, 'assets/descargas/Calculadora-Presupuesto-Microschool-Chanak-ES.xlsx')
NS = {'m': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}

IDS = {'España': 'es', 'Panamá': 'pa', 'México': 'mx', 'Guatemala': 'gt', 'El Salvador': 'sv', 'Ecuador': 'ec', 'Colombia': 'co', 'Costa Rica': 'cr', 'Estados Unidos': 'us', 'Otro país': 'other'}
NAMES = {'es': ('España', 'Spain', 'Espanya', 'Espagne'), 'pa': ('Panamá', 'Panama', 'Panamà', 'Panama'), 'mx': ('México', 'Mexico', 'Mèxic', 'Mexique'),
         'gt': ('Guatemala', 'Guatemala', 'Guatemala', 'Guatemala'), 'sv': ('El Salvador', 'El Salvador', 'El Salvador', 'Salvador'), 'ec': ('Ecuador', 'Ecuador', 'Equador', 'Équateur'),
         'co': ('Colombia', 'Colombia', 'Colòmbia', 'Colombie'), 'cr': ('Costa Rica', 'Costa Rica', 'Costa Rica', 'Costa Rica'),
         'us': ('Estados Unidos', 'United States', 'Estats Units', 'États-Unis'), 'other': ('Otro país', 'Another country', 'Un altre país', 'Autre pays')}
CURRENCY = {'es': 'EUR', 'pa': 'PAB', 'mx': 'MXN', 'us': 'USD'}

# Normas comprobadas en fuente oficial (título y vigencia). Lo que la hoja cita y no está aquí NO se publica.
VERIFIED = {
    # Verificado 2026-11-16/17 en BOE, DOF/SEP, gob.ec, MEN y TSE (ver docs/AUDITORIA-INCOHERENCIAS.md).
    'es': ['Real Decreto 806/1993, de 28 de mayo, sobre régimen de centros docentes extranjeros en España',
           'Código Técnico de la Edificación (Real Decreto 314/2006): seguridad en caso de incendio (DB-SI) y accesibilidad (DB-SUA)'],
    'pa': [],   # Ley 47 de 1946: no se pudo abrir la fuente oficial → no se publica todavía
    'mx': ['Constitución Política de los Estados Unidos Mexicanos, artículo 3.º', 'Ley General de Educación (DOF 30-09-2019)',
           'Acuerdo número 286 de la SEP sobre revalidación y equivalencia de estudios (DOF 30-10-2000, última reforma DOF 18-04-2017)'],
    'gt': [],   # Decreto Legislativo 12-91: pendiente de verificar en fuente oficial
    'sv': [],   # Decreto Legislativo 917: pendiente de verificar en fuente oficial
    'ec': ['Ley Orgánica de Educación Intercultural (LOEI, Registro Oficial 417 de 31-03-2011) y sus reformas'],
    'co': ['Ley 115 de 1994 (Ley General de Educación)', 'Decreto 1075 de 2015 (Decreto Único Reglamentario del Sector Educación)',
           'Resolución 24302 de 2021 del Ministerio de Educación Nacional (convalidación de estudios de preescolar, básica y media realizados en el exterior)'],
    'cr': ['Ley 7600, de Igualdad de Oportunidades para las Personas con Discapacidad'],   # Ley 2160 y el decreto de equiparación: pendientes
    'us': [],
    'other': [],
}
PENDING = ('Normas de referencia en verificación con la autoridad educativa del país; se confirman en la conversación de alianza.',
           'Reference rules are being verified with the country’s education authority; they are confirmed in the partnership conversation.',
           'Normes de referència en verificació amb l’autoritat educativa del país; es confirmen en la conversa d’aliança.',
           'Textes de référence en cours de vérification auprès de l’autorité éducative du pays ; ils sont confirmés lors de l’échange de partenariat.')
LEGAL_NOTE = {
    'pa': PENDING, 'gt': PENDING, 'sv': PENDING,
    'us': ('Normativa del estado y del municipio de la sede.', 'State and municipal rules where the site is located.', 'Normativa de l’estat i del municipi de la seu.', 'Réglementation de l’État et de la municipalité du site.'),
    'other': ('Por determinar con asesoría legal local.', 'To be determined with local legal counsel.', 'Per determinar amb assessoria legal local.', 'À déterminer avec un conseil juridique local.'),
}
# Resumen público (1–2 frases a partir de la columna A, sin detalle operativo ni promesas).
SUMMARY = {
    'es': ('Un centro que imparte un currículo extranjero necesita autorización como centro docente extranjero ante la administración educativa competente. Para alumnado español se incluyen enseñanzas de Lengua y Cultura Españolas; los requisitos varían según la comunidad autónoma.',
           'A centre that teaches a foreign curriculum needs authorization as a foreign school from the competent education authority. For Spanish students, Spanish Language and Culture teaching is included; requirements vary by autonomous community.',
           'Un centre que imparteix un currículum estranger necessita autorització com a centre docent estranger davant l’administració educativa competent. Per a alumnat espanyol s’hi inclouen ensenyaments de Llengua i Cultura Espanyoles; els requisits varien segons la comunitat autònoma.',
           'Un centre qui enseigne un programme étranger doit être autorisé comme établissement étranger par l’administration éducative compétente. Pour les élèves espagnols, des enseignements de langue et culture espagnoles sont inclus ; les exigences varient selon la communauté autonome.'),
    'pa': ('La apertura de un centro particular se tramita ante el Ministerio de Educación (MEDUCA). El currículo estadounidense se integra con las asignaturas del núcleo nacional que indique la autoridad.',
           'Opening a private centre is processed with the Ministry of Education (MEDUCA). The U.S. curriculum is combined with the national core subjects required by the authority.',
           'L’obertura d’un centre particular es tramita davant el Ministeri d’Educació (MEDUCA). El currículum nord-americà s’integra amb les assignatures del nucli nacional que indiqui l’autoritat.',
           'L’ouverture d’un centre privé se fait auprès du ministère de l’Éducation (MEDUCA). Le programme américain est combiné aux matières du tronc national exigées par l’autorité.'),
    'mx': ('Los estudios estadounidenses pueden presentarse a revalidación o equivalencia ante la SEP con la documentación que la autoridad exija. Esa norma regula el reconocimiento de estudios de cada estudiante y no sustituye la autorización del centro (RVOE): la vía jurídica debe confirmarse con asesoría local antes de abrir.',
           'U.S. studies may be submitted for revalidation or equivalency with the SEP, with the documentation the authority requires. That rule governs recognition of each student’s studies and does not replace the centre’s own authorization (RVOE): the legal pathway must be confirmed with local counsel before opening.',
           'Els estudis nord-americans es poden presentar a revalidació o equivalència davant la SEP amb la documentació que l’autoritat exigeixi. Aquesta norma regula el reconeixement d’estudis de cada estudiant i no substitueix l’autorització del centre (RVOE): la via jurídica s’ha de confirmar amb assessoria local abans d’obrir.',
           'Les études américaines peuvent être présentées en revalidation ou équivalence auprès de la SEP, avec les documents exigés par l’autorité. Le cadre juridique du centre doit être confirmé avec un conseil local avant l’ouverture.'),
    'gt': ('Los estudios cursados en un programa extranjero pueden presentarse a equivalencia ante el Ministerio de Educación (MINEDUC) según el trámite vigente.',
           'Studies completed in a foreign program may be submitted for equivalency with the Ministry of Education (MINEDUC) under the procedure in force.',
           'Els estudis cursats en un programa estranger es poden presentar a equivalència davant el Ministeri d’Educació (MINEDUC) segons el tràmit vigent.',
           'Les études suivies dans un programme étranger peuvent être présentées en équivalence auprès du ministère de l’Éducation (MINEDUC) selon la procédure en vigueur.'),
    'sv': ('El reconocimiento de estudios realizados en el extranjero se gestiona ante el Ministerio de Educación según el procedimiento vigente.',
           'Recognition of studies completed abroad is handled by the Ministry of Education under the procedure in force.',
           'El reconeixement d’estudis fets a l’estranger es gestiona davant el Ministeri d’Educació segons el procediment vigent.',
           'La reconnaissance des études effectuées à l’étranger est gérée par le ministère de l’Éducation selon la procédure en vigueur.'),
    'ec': ('El vínculo de las familias con un programa internacional y las equivalencias de estudios deben confirmarse con el Ministerio de Educación antes de ofrecerlo.',
           'Families’ link to an international program and study equivalencies must be confirmed with the Ministry of Education before it is offered.',
           'El vincle de les famílies amb un programa internacional i les equivalències d’estudis s’han de confirmar amb el Ministeri d’Educació abans d’oferir-lo.',
           'Le lien des familles avec un programme international et les équivalences d’études doivent être confirmés auprès du ministère de l’Éducation avant toute offre.'),
    'co': ('Los estudios realizados en el exterior pueden presentarse a convalidación ante el Ministerio de Educación Nacional conforme al trámite vigente; requisitos y condiciones se verifican caso a caso.',
           'Studies completed abroad may be submitted for validation with the Ministry of National Education under the procedure in force; requirements and conditions are checked case by case.',
           'Els estudis fets a l’exterior es poden presentar a convalidació davant el Ministeri d’Educació Nacional segons el tràmit vigent; requisits i condicions es verifiquen cas per cas.',
           'Les études effectuées à l’étranger peuvent être présentées en validation auprès du ministère de l’Éducation nationale selon la procédure en vigueur ; exigences et conditions sont vérifiées au cas par cas.'),
    'cr': ('El reconocimiento y la equiparación de estudios extranjeros los decide el Ministerio de Educación Pública (MEP), que aplica condiciones restrictivas a los programas extranjeros cursados dentro del país. Se evalúa caso por caso antes de ofrecerlo a las familias.',
           'Recognition and equivalency of foreign studies are decided by the Ministry of Public Education (MEP), which applies restrictive conditions to foreign programs completed inside the country. Each case is reviewed before it is offered to families.',
           'El reconeixement i l’equiparació d’estudis estrangers els decideix el Ministeri d’Educació Pública (MEP), que aplica condicions restrictives als programes estrangers cursats dins del país. S’avalua cas per cas abans d’oferir-lo a les famílies.',
           'La reconnaissance et l’équivalence des études étrangères relèvent du ministère de l’Éducation publique (MEP), qui applique des conditions restrictives aux programmes étrangers suivis dans le pays. Chaque cas est étudié avant toute offre aux familles.'),
    'us': ('La Microschool opera bajo la acreditación MSA-CESS de Chanak y los estándares B.E.S.T. de Florida, sin código escolar propio. Los fondos ESA aplican solo en los estados donde Chanak es proveedor aprobado y solo a los servicios aprobados en cada programa.',
           'The Microschool operates under Chanak’s MSA-CESS accreditation and Florida’s B.E.S.T. standards, without its own school code. ESA funds apply only in states where Chanak is an approved provider and only to the services approved in each program.',
           'La Microschool opera sota l’acreditació MSA-CESS de Chanak i els estàndards B.E.S.T. de Florida, sense codi escolar propi. Els fons ESA s’apliquen només als estats on Chanak és proveïdor aprovat i només als serveis aprovats en cada programa.',
           'La Microschool fonctionne sous l’accréditation MSA-CESS de Chanak et les standards B.E.S.T. de Floride, sans code scolaire propre. Les fonds ESA ne s’appliquent que dans les États où Chanak est prestataire agréé et uniquement aux services approuvés dans chaque programme.'),
    'other': ('Cada país tiene sus propios requisitos de reconocimiento de estudios y de apertura de centros. Chanak evalúa cada caso.',
              'Each country has its own requirements for recognizing studies and opening centres. Chanak reviews each case.',
              'Cada país té els seus propis requisits de reconeixement d’estudis i d’obertura de centres. Chanak avalua cada cas.',
              'Chaque pays a ses propres exigences en matière de reconnaissance des études et d’ouverture de centres. Chanak étudie chaque cas.'),
}
L4 = ('es', 'en', 'ca', 'fr')


def read_sheet(name):
    z = zipfile.ZipFile(XLSX)
    wb = ET.fromstring(z.read('xl/workbook.xml'))
    names = [s.get('name') for s in wb.find('m:sheets', NS)]
    sh = ET.fromstring(z.read(f'xl/worksheets/sheet{names.index(name) + 1}.xml'))
    ss = []
    if 'xl/sharedStrings.xml' in z.namelist():
        for si in ET.fromstring(z.read('xl/sharedStrings.xml')).findall('m:si', NS):
            ss.append(''.join(t.text or '' for t in si.iter('{%s}t' % NS['m'])))
    rows = {}
    for c in sh.iter('{%s}c' % NS['m']):
        ref = c.get('r'); col = re.match(r'[A-Z]+', ref).group(0); row = int(ref[len(col):])
        v = c.find('m:v', NS); is_ = c.find('m:is', NS)
        val = ''.join(t.text or '' for t in is_.iter('{%s}t' % NS['m'])) if is_ is not None else ((ss[int(v.text)] if c.get('t') == 's' else v.text) if v is not None else '')
        rows.setdefault(row, {})[col] = val
    return rows


def build():
    rows = read_sheet('Normativa_datos')
    out = []
    for r in sorted(rows):
        if r == 1:
            continue
        d = rows[r]
        cid = IDS[d['A']]
        legal = VERIFIED[cid]
        out.append({
            'id': cid, 'currency': CURRENCY.get(cid, 'USD'),
            'name': dict(zip(L4, NAMES[cid])),
            'legal': legal,
            'legal_note': dict(zip(L4, LEGAL_NOTE[cid])) if cid in LEGAL_NOTE else None,
            'resumen': dict(zip(L4, SUMMARY[cid])),
            # Solo para el previo descargable (no se muestra en las páginas públicas):
            'previo': {'A': d.get('C', ''), 'B': d.get('D', ''), 'C': d.get('E', ''), 'partidas': d.get('F', ''), 'verificaciones': d.get('G', '')},
        })
    data = {'fuente': 'assets/descargas/Calculadora-Presupuesto-Microschool-Chanak-ES.xlsx · hoja Normativa_datos',
            'revision': datetime.date.today().isoformat(), 'paises': out}
    p = os.path.join(ROOT, 'assets/data/normativa-paises.json')
    json.dump(data, open(p, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('  · assets/data/normativa-paises.json', len(out), 'países')
    return data


if __name__ == '__main__':
    build()
