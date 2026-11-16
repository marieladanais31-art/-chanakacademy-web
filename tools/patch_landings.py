#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Añade a las landings existentes (sin quitar nada) los bloques nuevos: planes, fotos, DBU,
política de matrícula y pasos para fundadores. Idempotente: cada bloque lleva un marcador <!-- cx:… -->.
Uso: python3 tools/patch_landings.py"""
import os, re, json, sys
sys.path.insert(0, os.path.dirname(__file__))
import core_content
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
V = '20261116'
IMG = '/assets/img/gen/'
CSS = f'<link rel="stylesheet" href="/assets/css/site.css?v={V}">'


def img(name, alt):
    return f'<img src="{IMG}{name}.webp" alt="{alt}" width="1200" height="800" loading="lazy" decoding="async">'


def policy(es):
    return ('La matrícula anual incluye el diagnóstico académico inicial, la elaboración del Plan Educativo Individualizado (PEI) y la inducción de incorporación. Una vez abonada, no se devuelve, salvo los derechos de desistimiento, cancelación, reembolso u otros derechos irrenunciables que establezca la legislación aplicable.'
            if es else 'The annual enrollment fee includes the initial academic assessment, the Individualized Education Plan (IEP/PEI), and student/family onboarding. Once paid, the fee is non-refundable, except where applicable law grants mandatory withdrawal, cancellation, refund, or other non-waivable rights.')


def offcampus(es):
    x = (lambda a, b: a) if es else (lambda a, b: b)
    fees = '/tarifas/' if es else '/en/tuition/'
    A = f'''<!-- cx:planes --><div class="cx"><section class="cx-sec" id="planes"><div class="cx-wrap">
<div class="cx-center"><div class="cx-eyebrow">{x('Dos planes', 'Two plans')}</div><h2>{x('Elige cuánto quieres liderar tú y cuánto quieres que lidere Chanak', 'Choose how much you lead and how much Chanak leads')}</h2>
<p class="cx-lead">{x('Los dos planes están disponibles en todos los países, con el mismo estándar acreditado y atención bilingüe en español e inglés.', 'Both plans are available in every country, with the same accredited standard and bilingual support in English and Spanish.')}</p></div>
<div class="cx-plans">
<div class="cx-plan">{img('hs-mesa-familia', x('Mesa de casa con cuadernos y las manos de un adulto y un estudiante trabajando juntos', 'Home table with workbooks and the hands of an adult and a student working together'))}
<div class="tagline" style="margin-top:18px">{x('La familia lidera', 'The family leads')}</div><h3>{x('Homeschool Guiado', 'Guided Homeschool')}</h3>
<p class="amount">US$80<small style="font-size:1rem">/{x('mes', 'mo')}</small></p><p class="eq">{x('70 €/mes en España · matrícula anual 180 €', '€70/mo in Spain · €180 annual enrollment fee')}</p>
<ul class="cx-list"><li>{x('Tú diriges el día a día; nosotros te damos el plan y la guía', 'You run the day-to-day; we give you the plan and the guidance')}</li><li>{x('Diagnóstico académico y Plan Educativo Individualizado (PEI)', 'Academic diagnostic and Individualized Education Plan')}</li><li>{x('Mentoría familiar mensual', 'Monthly family mentoring')}</li><li>{x('Plataforma, seguimiento e informes', 'Platform, tracking and reports')}</li></ul>
<div class="cx-btns"><a class="cx-btn cx-btn-o" href="/matricula/?utm_source=web&amp;utm_medium=offcampus&amp;plan=guided">{x('Empezar con Homeschool Guiado →', 'Start Guided Homeschool →')}</a></div></div>
<div class="cx-plan feat" id="full-enrollment">{img('hs-mentoria', x('Estudiante en una sesión de mentoría por videollamada con su cuaderno', 'Student in a video mentoring session with a notebook'))}
<div class="tagline" style="margin-top:18px">{x('Matrícula escolar completa', 'Full school enrollment')}</div><h3>Full Enrollment · Guided Virtual School</h3>
<p class="amount">{x('desde', 'from')} US$275<small style="font-size:1rem">/{x('mes', 'mo')}</small></p><p class="eq">{x('K–5 US$275 · 6–8 US$320 · 9–12 US$365 · 10 mensualidades · matrícula anual US$295', 'K–5 US$275 · 6–8 US$320 · 9–12 US$365 · 10 monthly payments · US$295 annual enrollment fee')}</p>
<ul class="cx-list"><li>{x('Chanak es su colegio: matrícula escolar a tiempo completo', 'Chanak is their school: full-time school enrollment')}</li><li>{x('Tres clases en vivo de inglés (ELA) por semana', 'Three live English (ELA) classes per week')}</li><li>{x('Mentoría individual semanal y Life Skills en vivo', 'Weekly one-to-one mentoring and live Life Skills')}</li><li>{x('Evaluación, boletines, expediente y diploma al cumplir los requisitos', 'Assessment, report cards, transcript and diploma once requirements are met')}</li></ul>
<div class="cx-btns"><a class="cx-btn cx-btn-t" href="/matricula/?utm_source=web&amp;utm_medium=offcampus&amp;plan=full">{x('Empezar con Full Enrollment →', 'Start Full Enrollment →')}</a></div></div>
</div>
<p class="cx-note cx-center">{x('En ambos planes eliges currículo bajo el PEI: A.C.E., LIFEPAC, Christian Light o Chanak Flex. Materiales no incluidos.', 'In both plans you choose a curriculum under the individual plan: A.C.E., LIFEPAC, Christian Light or Chanak Flex. Materials not included.')} <a href="{fees}#homeschool">{x('Ver todas las tarifas por país →', 'See all fees by country →')}</a></p>
</div></section></div><!-- /cx:planes -->'''
    B = f'''<!-- cx:obtiene --><div class="cx"><section class="cx-sec cx-soft" id="que-obtiene"><div class="cx-wrap">
<div class="cx-center"><div class="cx-eyebrow">{x('De principio a fin', 'From start to finish')}</div><h2>{x('Lo que tu hijo recibe, paso a paso', 'What your child receives, step by step')}</h2></div>
<div class="cx-grid cx-g3">
<div class="cx-card photo">{img('diagnostico-tablet', x('Manos de un estudiante completando una evaluación en una tableta junto a un informe con gráficas', 'A student’s hands completing an assessment on a tablet next to a report with charts'))}<div><h3>1 · {x('Diagnóstico y plan individual', 'Diagnostic and individual plan')}</h3><p>{x('Medimos el nivel real por materia y lo convertimos en un PEI con metas, ritmo y apoyos.', 'We measure the real level by subject and turn it into an individual plan with goals, pace and supports.')}</p></div></div>
<div class="cx-card photo">{img('hs-materiales', x('Cuadernillos de currículo, lápices y una tableta sobre una mesa', 'Curriculum booklets, pencils and a tablet on a table'))}<div><h3>2 · {x('Currículo y acompañamiento', 'Curriculum and support')}</h3><p>{x('Material impreso o digital según la familia, mentor asignado y objetivos claros cada semana.', 'Printed or digital materials to suit the family, an assigned mentor and clear goals each week.')}</p></div></div>
<div class="cx-card photo">{img('diploma-expediente', x('Diploma enrollado con cinta azul, birrete y carpeta de expediente', 'Rolled diploma with blue ribbon, graduation cap and transcript folder'))}<div><h3>3 · {x('Expediente y diploma', 'Transcript and diploma')}</h3><p>{x('Calificaciones, boletines y transcript emitidos por Chanak, escuela acreditada por MSA-CESS; High School Diploma al completar los requisitos.', 'Grades, report cards and transcript issued by Chanak, a school accredited by MSA-CESS; High School Diploma on completing the requirements.')}</p></div></div>
</div></div></section></div><!-- /cx:obtiene -->'''
    C = f'''<!-- cx:matricula --><div class="cx"><section class="cx-sec" id="matricula-anual"><div class="cx-wrap">
<div class="cx-eyebrow">{x('Antes de matricular', 'Before you enroll')}</div><h2>{x('Matrícula anual (incluye diagnóstico académico, PEI e inducción)', 'Annual Enrollment Fee (includes academic diagnostic assessment, Individualized Education Plan and onboarding/orientation)')}</h2>
<p class="cx-lead">{x('Se cobra una sola vez por estudiante y curso, pagues por mes, por trimestre o por año. Se renueva cada curso y te avisamos antes.', 'It is charged once per student per school year, whether you pay monthly, quarterly or annually. It renews each year and we tell you beforehand.')}</p>
<div class="cx-policy">{policy(es)}</div>
<div class="cx-btns" style="margin-top:22px"><a class="cx-btn cx-btn-n" href="{fees}">{x('Ver tarifas completas →', 'See full tuition →')}</a></div>
</div></section></div><!-- /cx:matricula -->'''
    return A, B, C


def dual(es):
    x = (lambda a, b: a) if es else (lambda a, b: b)
    fees = '/tarifas/#dual' if es else '/en/tuition/#dual'
    A = f'''<!-- cx:semana --><div class="cx"><section class="cx-sec cx-soft" id="semana"><div class="cx-wrap cx-split">
{img('dual-escritorio', x('Estudiante de espaldas en su escritorio por la tarde, con mochila, libros y portátil', 'Student seen from behind at an evening desk with backpack, books and laptop'))}
<div><div class="cx-eyebrow">{x('Una semana real', 'A real week')}</div><h2>{x('Compatible con su colegio y con su vida', 'Compatible with school and with life')}</h2>
<ul class="cx-list"><li>{x('Por la mañana va a su colegio como siempre', 'Mornings at their own school, as usual')}</li><li>{x('De 3 a 5 horas semanales para sus cursos de Chanak, según la ruta', '3 to 5 hours a week for Chanak courses, depending on the route')}</li><li>{x('Una sesión semanal con su mentor para revisar avances', 'One weekly session with their mentor to review progress')}</li><li>{x('Life Skills & Leadership: identidad, finanzas, empleabilidad y proyecto de vida', 'Life Skills & Leadership: identity, finance, employability and life project')}</li></ul>
<p class="cx-note">{x('Las materias de Chanak: Academic English (2–3 créditos), American History (1), U.S. Civics & Economics (1), New Testament Survey (1) y Life Skills & Leadership (1). El diploma requiere 24 créditos; lo ya cursado en su colegio se evalúa en la auditoría individual.', 'Chanak subjects: Academic English (2–3 credits), American History (1), U.S. Civics & Economics (1), New Testament Survey (1) and Life Skills & Leadership (1). The diploma requires 24 credits; coursework from their school is evaluated in the individual audit.')}</p></div>
</div></section></div><!-- /cx:semana -->'''
    B = f'''<!-- cx:pathways --><div class="cx"><section class="cx-sec" id="university-pathways"><div class="cx-wrap">
<div class="cx-split rev"><div><div class="cx-eyebrow">University Pathways</div><h2>{x('Después del diploma: una puerta abierta a la universidad', 'After the diploma: an open door to university')}</h2>
<p>{x('Al graduarse, el estudiante recibe el High School Diploma y el Official Transcript de Chanak, escuela acreditada por MSA-CESS, junto a su titulación local.', 'On graduating, the student receives the High School Diploma and Official Transcript from Chanak, a school accredited by MSA-CESS, alongside their local qualification.')}</p>
<div class="cx-card" style="display:flex;gap:18px;align-items:center;margin:18px 0"><img src="/assets/img/dbu-logo-horizontal.png" alt="Dallas Baptist University" width="150" height="75" loading="lazy" style="width:150px;flex-shrink:0;aspect-ratio:auto;object-fit:contain;box-shadow:none;border-radius:0"><p>{x('<b>Chanak es miembro de la Global Community de Dallas Baptist University</b>, una red de más de 280 escuelas en 50 países.', '<b>Chanak is a member of Dallas Baptist University’s Global Community</b>, a network of 280+ schools in 50 countries.')}</p></div>
<ul class="cx-list"><li>{x('Oportunidades de beca de DBU para estudiantes de escuelas miembro, según cada programa', 'DBU scholarship opportunities for students of member schools, according to each program')}</li><li>{x('Programa intensivo de inglés en el campus de DBU y clases de inglés en vivo', 'Intensive English Program on the DBU campus and live online English classes')}</li><li>{x('Formación de DBU para nuestro equipo docente', 'DBU training for our teaching team')}</li></ul>
<p class="cx-note">{x('DBU no acredita a Chanak. La membresía no garantiza admisión, Dual Enrollment ni becas automáticas: cada universidad aplica sus propios requisitos.', 'DBU does not accredit Chanak. Membership does not guarantee admission, Dual Enrollment or automatic scholarships: each university applies its own requirements.')}</p>
<div class="cx-btns"><a class="cx-btn cx-btn-o" href="/universidad-eeuu/">{x('Guía: universidad en EE. UU. →', 'Guide: U.S. university →')}</a></div></div>
{img('universidad-campus', x('Paseo arbolado de un campus universitario estadounidense', 'Tree-lined walkway on an American university campus'))}</div>
<div class="cx-grid cx-g3">
<div class="cx-card photo">{img('diploma-expediente', x('Diploma enrollado, birrete y carpeta de expediente', 'Rolled diploma, graduation cap and transcript folder'))}<div><h3>High School Diploma</h3><p>{x('Credencial estadounidense al completar los requisitos de graduación.', 'U.S. credential on completing graduation requirements.')}</p></div></div>
<div class="cx-card photo">{img('diagnostico-tablet', x('Evaluación en tableta junto a un informe con gráficas', 'Assessment on a tablet next to a report with charts'))}<div><h3>Official Transcript</h3><p>{x('Cursos, créditos y calificaciones estadounidenses, incluidos los reconocidos de su expediente local.', 'U.S. courses, credits and grades, including those recognized from the local transcript.')}</p></div></div>
<div class="cx-card photo">{img('life-skills-cocina', x('Manos midiendo ingredientes junto a un cuaderno de presupuesto', 'Hands measuring ingredients next to a budget notebook'))}<div><h3>Life Skills & Leadership</h3><p>{x('Portafolio con CV, entrevista simulada, presupuesto personal y proyecto de vida.', 'Portfolio with résumé, mock interview, personal budget and life project.')}</p></div></div>
</div>
<p class="cx-note">{x('Apostilla, traducción y envío de documentos: servicios opcionales que se cotizan aparte según el país de destino.', 'Apostille, translation and document shipping: optional services quoted separately by destination country.')}</p>
</div></section></div><!-- /cx:pathways -->'''
    C = f'''<!-- cx:opciones --><div class="cx"><section class="cx-sec cx-soft" id="opciones-matricula"><div class="cx-wrap">
<div class="cx-eyebrow">{x('Cómo empezar', 'How to start')}</div><h2>{x('Dos formas de dar el primer paso', 'Two ways to take the first step')}</h2>
<div class="cx-grid cx-g2">
<div class="cx-card"><h3>1 · {x('Matrícula + diagnóstico + auditoría de créditos', 'Enrollment + diagnostic + transfer credit evaluation')}</h3><p>{x('La vía habitual. Te matriculas y recibes el Plan de Estudio: créditos reconocidos, cursos pendientes y dedicación semanal.', 'The usual way. You enroll and receive the Study Plan: recognized credits, pending courses and weekly workload.')}</p></div>
<div class="cx-card"><h3>2 · {x('Solo diagnóstico + auditoría de créditos', 'Diagnostic + transfer credit evaluation only')}</h3><p>{x('Para decidir con datos antes de matricular. Servicio independiente: te confirmamos por escrito su alcance y si se descuenta de la matrícula.', 'To decide with data before enrolling. A separate service: we confirm in writing its scope and whether it is credited toward enrollment.')}</p></div>
</div>
<div class="cx-btns" style="margin-top:22px"><a class="cx-btn cx-btn-t" href="/matricula/?utm_source=web&amp;utm_medium=dual">{x('Iniciar matrícula →', 'Start enrollment →')}</a><a class="cx-btn cx-btn-o" href="{fees}">{x('Ver tarifas por país →', 'See fees by country →')}</a></div>
</div></section></div><!-- /cx:opciones -->'''
    return A, B, C


def micro(es):
    x = (lambda a, b: a) if es else (lambda a, b: b)
    A = f'''<!-- cx:puntomedio --><div class="cx"><section class="cx-sec cx-soft" id="punto-medio"><div class="cx-wrap cx-split">
<div><div class="cx-eyebrow">{x('El punto medio', 'The middle ground')}</div><h2>{x('Ni educar solos en casa, ni un colegio grande', 'Neither alone at home nor a large school')}</h2>
<p>{x('Chanak acompaña a cada familia en tres modalidades con el mismo estándar: el homeschool, el colegio local con Dual Diploma y, en el medio, la Microschool: una comunidad pequeña que aprende junta, con estructura y atención personalizada.', 'Chanak comes alongside each family in three approaches with the same standard: homeschool, the local school with Dual Diploma and, in between, the Microschool: a small community learning together, with structure and personal attention.')}</p>
<ul class="cx-list"><li>{x('Tu comunidad pone las familias, el espacio y su identidad', 'Your community brings the families, the space and its identity')}</li><li>{x('Chanak pone el marco académico, la plataforma, la formación y los expedientes', 'Chanak brings the academic framework, platform, training and records')}</li><li>{x('Los socios pueden usar materiales compatibles con su estilo', 'Partners may use materials compatible with their approach')}</li></ul></div>
{img('microschool-sala', x('Sala de aprendizaje con un grupo pequeño alrededor de una mesa y una coordinadora', 'Learning room with a small group around a table and a coordinator'))}
</div></section></div><!-- /cx:puntomedio -->'''
    steps = [
        (x('Reunión inicial', 'First meeting'), x('Conocemos tu comunidad, tu porqué y a las familias que ya confían en ti.', 'We get to know your community, your why and the families who already trust you.')),
        (x('Solicitud y viabilidad', 'Application and feasibility'), x('Revisamos juntos la viabilidad legal y económica en tu país o estado.', 'Together we review legal and financial feasibility in your country or state.')),
        (x('Acuerdo de colaboración', 'Partnership agreement'), x('Firmamos el acuerdo marco y el anexo con los programas autorizados.', 'We sign the framework agreement and the annex of authorized programs.')),
        (x('Formación y certificación', 'Training and certification'), x('Tu coordinador y tus mentores se forman y certifican con Chanak.', 'Your coordinator and mentors train and certify with Chanak.')),
        (x('Diagnóstico y alta de alumnos', 'Diagnostics and student onboarding'), x('Cada estudiante hace su diagnóstico y entra en el sistema académico de Chanak.', 'Each student takes a diagnostic and joins Chanak’s student system.')),
        (x('Apertura y calidad', 'Opening and quality'), x('Abrimos con seguimiento, reuniones periódicas y revisiones de calidad.', 'We open with follow-up, regular meetings and quality reviews.')),
    ]
    st = ''.join(f'<div class="cx-card"><div class="cx-step-n">{i}</div><h3>{a}</h3><p>{b}</p></div>' for i, (a, b) in enumerate(steps, 1))
    keys = [
        (x('Empieza por el porqué', 'Start with why'), x('Antes del currículo y los muebles: ¿qué necesidad de tus familias quieres resolver? Escríbelo en una frase.', 'Before curriculum and furniture: which need of your families do you want to meet? Write it in one sentence.')),
        (x('Define a tu familia ideal', 'Define your ideal family'), x('Un mensaje para todos no le habla a nadie. Describe sus valores, sus metas y lo que hoy no encuentran.', 'A message for everyone speaks to no one. Describe their values, goals and what they cannot find today.')),
        (x('Estructura antes que entusiasmo', 'Structure before enthusiasm'), x('Entidad legal propia, cuenta bancaria separada, seguros y protección de menores antes de cobrar o firmar un alquiler.', 'Your own legal entity, a separate bank account, insurance and child safeguarding before charging fees or signing a lease.')),
        (x('Presupuesto y punto de equilibrio', 'Budget and break-even'), x('Suma tus gastos mensuales y divídelos entre la cuota: sabrás cuántos alumnos necesitas para sostenerte. Revísalo cada mes.', 'Add up monthly costs and divide by tuition: you will know how many students you need to be sustainable. Review it monthly.')),
        (x('Relaciones antes que anuncios', 'Relationships before ads'), x('Encuentros pequeños para conocer al fundador, vídeos cortos con tu porqué y seguimiento ordenado de cada familia interesada.', 'Small meet-the-founder sessions, short videos about your why and organized follow-up with every interested family.')),
    ]
    ks = ''.join(f'<div class="cx-card"><h3>{a}</h3><p>{b}</p></div>' for a, b in keys)
    B = f'''<!-- cx:fundadores --><div class="cx"><section class="cx-sec" id="como-abrir"><div class="cx-wrap">
<div class="cx-center"><div class="cx-eyebrow">{x('Para fundadores', 'For founders')}</div><h2>{x('Cómo se abre una Chanak Microschool', 'How a Chanak Microschool opens')}</h2><p class="cx-lead">{x('Seis pasos acompañados. No tienes que inventar nada desde cero, pero sí liderar con responsabilidad.', 'Six guided steps. You do not have to invent anything from scratch, but you do lead with responsibility.')}</p></div>
<div class="cx-grid cx-g3">{st}</div>
<div class="cx-split" style="margin-top:56px">{img('microschool-espacio', x('Sala polivalente preparada como aula con mesas, sillas y estanterías', 'Multipurpose room set up as a classroom with tables, chairs and shelves'))}
<div><h3>{x('Dos geografías, requisitos distintos', 'Two geographies, different requirements')}</h3>
<p><b>{x('Estados Unidos:', 'United States:')}</b> {x('en los estados donde Chanak es proveedor aprobado, las familias pueden solicitar el uso de sus fondos ESA según las reglas de cada programa.', 'in states where Chanak is an approved provider, families may request the use of their ESA funds under each program’s rules.')}</p>
<p><b>{x('Internacional:', 'International:')}</b> {x('cada país tiene sus requisitos con su autoridad educativa. Tu entidad obtiene las autorizaciones locales y Chanak aporta el marco académico.', 'each country has its own requirements with its education authority. Your entity obtains local authorizations and Chanak provides the academic framework.')}</p>
<p class="cx-note">{x('La firma de un acuerdo no equivale a una autorización gubernamental ni extiende automáticamente la acreditación a un centro: cada implementación se valida y supervisa.', 'Signing an agreement is not a government authorization and does not automatically extend accreditation to a site: each implementation is validated and supervised.')}</p></div></div>
<div class="cx-split rev" style="margin-top:56px"><div><h3>{x('Cinco claves antes de empezar', 'Five keys before you start')}</h3><p>{x('Lo que más ayuda a que una Microschool nazca sana y se sostenga.', 'What most helps a Microschool start healthy and stay sustainable.')}</p></div>{img('alianza-presupuesto', x('Dos personas revisando un presupuesto y un plan sobre una mesa', 'Two people reviewing a budget and a plan at a table'))}</div>
<div class="cx-grid cx-g3">{ks}</div>
</div></section></div><!-- /cx:fundadores -->'''
    return A, B


def core(lang):
    return f'<!-- cx:core --><div class="cx">{core_content.section(lang)}</div><!-- /cx:core -->'


def en_blocks():
    """Las landings EN compiladas reciben el bloque Core a través de assets/js/cx-en-blocks.js."""
    p = os.path.join(ROOT, 'assets/js/cx-en-blocks.js')
    js = open(p, encoding='utf-8').read()
    i = js.index('var B=') + 6
    B, n = json.JSONDecoder().raw_decode(js[i:])
    for k in B:
        B[k] = re.sub(r'<!-- cx:core -->.*?<!-- /cx:core -->', '', B[k], flags=re.S) + core('en')
        B[k] = B[k].replace('<div class="cx-plan feat"><img', '<div class="cx-plan feat" id="full-enrollment"><img')
    open(p, 'w', encoding='utf-8').write(js[:i] + json.dumps(B, ensure_ascii=False) + js[i + n:])
    print('  · assets/js/cx-en-blocks.js (Core EN)')


def insert_before(h, marker, block, tag):
    if f'<!-- cx:{tag} -->' in h:
        h = re.sub(rf'<!-- cx:{tag} -->.*?<!-- /cx:{tag} -->', lambda m: block, h, flags=re.S)
        return h
    i = h.find(marker)
    if i < 0:
        raise SystemExit(f'marcador no encontrado: {marker[:60]}')
    return h[:i] + block + h[i:]


def patch(path, edits, extra=None):
    p = os.path.join(ROOT, path)
    h = open(p, encoding='utf-8').read()
    if 'assets/css/site.css' not in h:
        h = h.replace('</head>', CSS + '</head>', 1)
    for marker, block, tag in edits:
        h = insert_before(h, marker, block, tag)
    if extra:
        h = extra(h)
    open(p, 'w', encoding='utf-8').write(h)
    print('  ·', path, len(h) // 1000, 'KB')


def last(h, s):
    return h[h.rfind(s):h.rfind(s) + len(s) + 40]


if __name__ == '__main__':
    A, B, C = offcampus(True)
    patch('off-campus/index.html', [('<section class="section soft" id="incluye">', A, 'planes'), ('<section class="section" id="inversion">', B, 'obtiene'), ('<section class="final">', C, 'matricula'), ('<section class="section" id="inversion">', core('es'), 'core')])
    A, B, C = dual(True)
    patch('dual-diploma/index.html', [('<section class="section soft">', A, 'semana'), ('<section class="section" id="inversion">', B, 'pathways'), ('<section class="final">', C, 'opciones'), ('<section class="section" id="inversion">', core('es'), 'core')])
    # Las landings EN de off-campus y dual-diploma son bundles React: sus bloques van en assets/js/cx-en-blocks.js
    A, B = micro(True)
    patch('microschools/index.html', [('<section class="content-sec bg-slate" id="como-aprende">', A, 'puntomedio'), ('<section class="content-sec bg-white" id="registro-grupo">', B, 'fundadores')])
    A, B = micro(False)
    patch('microschools/en/index.html', [('<section class="content-sec bg-slate" id="how-it-works">', A, 'puntomedio'), ('<section class="content-sec bg-white" id="register-group">', B, 'fundadores')])
    en_blocks()
