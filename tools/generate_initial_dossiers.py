"""Initial information packs and current English family dossiers. No fee changes."""
from pathlib import Path
import json
import subprocess
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, PageBreak, Table, TableStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/dossiers'
NAVY, TEAL, GOLD = [colors.HexColor(c) for c in ('#0c2d48', '#168b98', '#c38b23')]
pdfmetrics.registerFont(TTFont('ChanakSans', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('ChanakBold', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'))
pdfmetrics.registerFontFamily('ChanakSans', normal='ChanakSans', bold='ChanakBold')
styles = {
 'title': ParagraphStyle('title', fontName='ChanakBold', fontSize=23, leading=28, textColor=NAVY, spaceAfter=12),
 'h': ParagraphStyle('h', fontName='ChanakBold', fontSize=12, leading=16, textColor=TEAL, spaceBefore=10, spaceAfter=5),
 'body': ParagraphStyle('body', fontName='ChanakSans', fontSize=10, leading=14, textColor=colors.HexColor('#34475a'), spaceAfter=8),
 'small': ParagraphStyle('small', fontName='ChanakSans', fontSize=8, leading=11, textColor=colors.HexColor('#536575'), spaceAfter=5),
}
def P(t, style='body'): return Paragraph(t, styles[style])
def section(title, text): return [P(title, 'h'), P(text)]
def link(label, url):
 safe_url = escape(url, {'"': '&quot;'})
 return P(f'<link href="{safe_url}" color="#168b98"><u>{escape(label)}</u></link>')
def footer(c, d):
 c.saveState(); c.setStrokeColor(TEAL); c.line(18*mm, 18*mm, 192*mm, 18*mm)
 c.setFont('Helvetica', 8); c.setFillColor(NAVY)
 c.drawString(18*mm, 12*mm, 'Chanak International Academy | 2026-2027 | v2026.10.08')
 c.drawRightString(192*mm, 12*mm, str(d.page)); c.restoreState()
def heading(title, lang, subtitle=''):
 mark=Image(str(OUT/'brand-logo.png'), width=24*mm, height=24*mm)
 tag=P('FAMILY INFORMATION PACK<br/>2026-2027' if lang=='en' else 'DOSSIER INICIAL PARA FAMILIAS<br/>2026-2027','small')
 brand=Table([[mark,tag]],colWidths=[32*mm,142*mm])
 brand.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'MIDDLE'),('LINEBELOW',(0,0),(-1,-1),1,TEAL),('BOTTOMPADDING',(0,0),(-1,-1),9)]))
 return [brand,Spacer(1,7*mm),P(title,'title'),P(subtitle)]
def build(name, story):
 path=OUT/name;path.parent.mkdir(parents=True,exist_ok=True)
 SimpleDocTemplate(str(path),pagesize=A4,leftMargin=18*mm,rightMargin=18*mm,topMargin=17*mm,bottomMargin=24*mm,title='Chanak - '+name.stem,author='Chanak International Academy').build(story,onFirstPage=footer,onLaterPages=footer)
 return path

DATA={
 'off-campus':{
 'title':['Off-Campus - Homeschool Guiado','Off-Campus - Guided Homeschool'],
 'overview':['Educación cristiana estadounidense K-12 desde casa, con estructura y acompañamiento. Chanak es la escuela estadounidense principal del estudiante dentro de este programa; la familia conserva las responsabilidades educativas legales de su país.','Christian U.S. K-12 education from home, with structure and mentoring. Chanak is the student\'s main U.S. school within this program. Families retain the educational responsibilities applicable in their country of residence.'],
 'includes':['Diagnóstico académico y PEI; mentoría; seguimiento por asignatura; registro en el SIS; boletines y expediente. En High School, transcript y diploma cuando se cumplen los requisitos.','Academic placement and an individual learning plan (PEI); mentoring; subject-level follow-up; SIS records; report cards and academic records. At high school level, transcripts and a diploma when graduation requirements are met.'],
 'method':['Mastery Learning: se refuerza lo que todavía no se domina. El umbral de dominio de Chanak es 80 %. El modelo 60/20/20 combina Core USA, Extensión Local y Life Skills. A.C.E. es la vía de referencia; LIFEPAC, Christian Light y Chanak Flex requieren revisión y aprobación en el PEI.','Mastery Learning provides reinforcement before moving on. Chanak uses an 80% mastery threshold. The 60/20/20 model combines U.S. core studies, Local Extension and Life Skills. A.C.E. is the reference pathway; LIFEPAC, Christian Light and Chanak Flex require review and approval in the individual plan.'],
 'role':['La familia organiza la rutina, acompaña el trabajo y comunica dificultades. La mentoría revisa evidencias y orienta el avance. Los materiales se seleccionan después del diagnóstico y su coste se informa por separado.','The family organizes a daily routine, supports study and communicates difficulties. Mentors review evidence and guide progress. Materials are selected after placement, and their costs are disclosed separately.'],
 'contact':'offcampus@chanakacademy.org','page':'/off-campus/','program':'off_campus'},
 'dual-diploma':{
 'title':['Dual Diploma - Ruta estadounidense complementaria','Dual Diploma - A complementary U.S. pathway'],
 'overview':['El estudiante continúa en su colegio y añade una ruta de High School estadounidense. Chanak audita el expediente, define los créditos pendientes y prepara un Plan de Ruta individual.','Students remain at their current school while adding a U.S. high school pathway. Chanak audits prior records, identifies outstanding credits and prepares an individual Route Plan.'],
 'includes':['Revisión académica, diagnóstico según necesidad, Plan de Ruta, mentoría, plataforma de aprendizaje y seguimiento en el SIS. Transcript y diploma estadounidense al completar los requisitos. Los conceptos económicos de evaluación y matrícula se detallan en las tarifas del país.','Academic record review, placement as needed, an individual Route Plan, mentoring, learning platform and SIS follow-up. A U.S. transcript and diploma are issued after requirements are met. Assessment and enrollment charges are detailed in the applicable country fee document.'],
 'method':['Hasta 18 de los 24 créditos pueden proceder del expediente local en perfiles elegibles; el reconocimiento no es automático. La ruta incorpora inglés académico, historia de EE. UU., Government &amp; Economics, Biblia y Life Skills según el plan. La dedicación y duración se confirman individualmente.','For eligible students, up to 18 of the 24 credits may come from prior school records; recognition is never automatic. The pathway includes academic English, U.S. History, Government &amp; Economics, Bible and Life Skills as required by the individual plan. Workload and duration are confirmed individually.'],
 'role':['La familia entrega calificaciones oficiales y ayuda a mantener una rutina compatible con el colegio actual. El alumno completa actividades y evidencias; el coordinador supervisa el plan. No se prometen equivalencias automáticas, admisión universitaria ni becas.','Families provide official school records and support a routine compatible with the current school. Students complete activities and evidence; coordinators supervise the plan. Automatic equivalence, university admission and scholarships are not promised.'],
 'contact':'dualdiploma@chanakacademy.org','page':'/dual-diploma/','program':'dual_diploma'},
 'life-skills':{
 'title':['Life Skills & Leadership','Life Skills & Leadership'],
 'overview':['Formación cristiana para edades de 8 a 17 años: carácter, identidad, vocación, hábitos, finanzas personales, servicio y liderazgo. Puede integrarse en un programa Chanak o cursarse de forma independiente.','Christian development for ages 8-17: character, identity, vocation, habits, personal finance, service and leadership. It may be integrated into a Chanak program or taken independently.'],
 'includes':['Mentoría, retos, reflexiones y proyectos documentados. La participación integrada sigue las condiciones del programa principal; la modalidad independiente se cotiza según país y alcance.','Mentoring, challenges, reflections and documented projects. Integrated participation follows the main program\'s terms; standalone participation is quoted according to country and scope.'],
 'method':['Juniors (8-13), Seedling (14), Explorer (15), Builder (16) y Launch (17). Los grupos de videollamada pueden reunir varias etapas; grupo y nivel no son lo mismo. Se aprende con proyectos aplicados a la vida diaria.','Juniors (8-13), Seedling (14), Explorer (15), Builder (16) and Launch (17). Video-call groups may combine stages; a meeting group is not an academic level. Learning is based on projects applied to everyday life.'],
 'role':['El alumno documenta lo aprendido mediante retos y proyectos. La familia acompaña y el mentor ofrece retroalimentación. Un crédito de Life Skills en Dual Diploma requiere cumplir el plan y sus evidencias; no se obtiene solo por asistir.','Students document learning through challenges and projects. Families support participation and mentors give feedback. A Life Skills credit within Dual Diploma requires the planned work and evidence; attendance alone does not award credit.'],
 'contact':'offcampus@chanakacademy.org','page':'/','program':None},
 'general':{
 'title':['Conoce Chanak - Guía inicial','Discover Chanak - Getting started'],
 'overview':['Una escuela estadounidense de identidad cristiana que acompaña a familias e instituciones. El primer paso es elegir el servicio y el país, para recibir información que corresponda a tu situación.','A U.S. school with a Christian identity serving families and institutions. Start by choosing your service and country so that you receive information relevant to your situation.'],
 'includes':['Homeschool Guiado: educación K-12 desde casa. Dual Diploma: ruta estadounidense paralela al colegio actual. Life Skills: formación integral integrada o independiente. Diagnóstico: evaluación académica para orientar decisiones educativas.','Guided Homeschool: K-12 education from home. Dual Diploma: a U.S. pathway alongside the current school. Life Skills: integrated or standalone personal development. Academic assessment: placement to guide educational decisions.'],
 'method':['Core USA, Extensión Local y Life Skills forman el modelo 60/20/20 de los programas académicos. Las instituciones pueden consultar las vías de colaboración, Dual Diploma institucional, educación en casa/plataforma y Partner Learning Center.','U.S. core studies, Local Extension and Life Skills form the academic 60/20/20 model. Institutions may enquire about academic collaboration, institutional Dual Diploma, home-education/platform support and Partner Learning Centers.'],
 'role':['La oferta, documentación y precio dependen del país y del programa. Florida EMA y Alabama CHOOSE son servicios estatales con alcance propio; deben consultarse en sus páginas específicas.','Services, documentation and pricing depend on the country and program. Florida EMA and Alabama CHOOSE are state services with their own scope; consult their dedicated pages.'],
 'contact':'offcampus@chanakacademy.org','page':'/','program':None},
 'diagnostico':{
 'title':['Diagnóstico Académico - Orientación inicial','Academic Assessment - Initial guidance'],
 'overview':['Evaluación del punto de partida académico para orientar la vía curricular, el refuerzo o el plan del estudiante. El instrumento se elige según el servicio y el nivel; se evita repetir pruebas ya válidas.','Assessment of a student\'s academic starting point to guide curriculum placement, support or planning. The instrument is chosen according to the service and level; valid prior assessments should not be unnecessarily repeated.'],
 'includes':['Resultados académicos, identificación de necesidades de refuerzo y recomendaciones educativas según la evaluación contratada. El alcance y el formato del informe se confirman antes de comenzar.','Academic results, identification of support needs and educational recommendations according to the contracted assessment. Scope and report format are confirmed before starting.'],
 'method':['El diagnóstico puede integrarse en la admisión de un programa o contratarse por separado. No es lo mismo que un examen estandarizado estatal ni una evaluación clínica o psicológica.','Assessment may be part of program admission or contracted separately. It is different from a state-required standardized test or a clinical or psychological evaluation.'],
 'role':['Comparte el grado, idioma, currículo y evaluaciones previas. El equipo confirma la prueba adecuada y si ya está incluida en tu programa para evitar duplicar cargos.','Share the grade, language, curriculum and prior assessments. The team confirms the appropriate test and whether it is already included in your program, avoiding duplicate charges.'],
 'contact':'offcampus@chanakacademy.org','page':'/diagnostico/','program':None},
 'alabama-choose':{
 'title':['Alabama CHOOSE - Servicios educativos','Alabama CHOOSE - Educational services'],
 'overview':['Chanak es proveedor CHOOSE aprobado para Homeschool Guiado, Youth Life &amp; Career Readiness (Life Skills), Diagnóstico Académico y Tutorías. Estos servicios no incluyen Dual Diploma.','Chanak is an approved CHOOSE provider for Guided Homeschool, Youth Life &amp; Career Readiness (Life Skills), Academic Assessment and Tutoring. These services do not include Dual Diploma.'],
 'includes':['El contenido, calendario, documentación y tarifa en USD se confirman por escrito para el servicio elegido. La aprobación del proveedor no confirma los fondos de una familia ni la autorización del pago.','Content, schedule, documentation and USD fees are confirmed in writing for the selected service. Provider approval does not confirm a family\'s funds or payment authorization.'],
 'method':['Homeschool: planificación y seguimiento. Life Skills: habilidades para la vida y preparación vocacional. Diagnóstico: nivel académico e informe educativo. Tutorías: refuerzo individual.','Homeschool: planning and follow-up. Life Skills: life skills and career readiness. Assessment: academic placement and an educational report. Tutoring: individual academic support.'],
 'role':['Selecciona el servicio y comunica la situación de tu cuenta CHOOSE. El equipo revisará alcance, requisitos y pago antes de iniciar. El diagnóstico anunciado es académico, no clínico.','Choose the service and tell us your CHOOSE account status. The team reviews scope, requirements and payment before starting. The advertised assessment is academic, not clinical.'],
 'contact':'offcampus@chanakacademy.org','page':'/us/alabama/','program':None},
 'florida-heip':{
 'title':['Florida EMA - Home Education Instructional Program','Florida EMA - Home Education Instructional Program'],
 'overview':['Apoyo académico para educación en casa dirigida por los padres: sesiones remotas, planificación individual, mentoría, seguimiento y orientación bilingüe. No constituye matrícula escolar de tiempo completo.','Academic support for parent-directed home education: remote sessions, individual planning, mentoring, progress monitoring and bilingual guidance. This is not full-time school enrollment.'],
 'includes':['K-5: EMA 20172869, 275 USD/mes. Grados 6-8: EMA 20169280, 320 USD/mes. Grados 9-12: EMA 20172870, 365 USD/mes. Diez mensualidades. Evaluación inicial y puesta en marcha: 295 USD por separado; materiales aparte.','K-5: EMA 20172869, USD 275/month. Grades 6-8: EMA 20169280, USD 320/month. Grades 9-12: EMA 20172870, USD 365/month. Ten installments. Initial assessment and setup: USD 295 separately; materials are additional.'],
 'method':['Plan académico, trabajo guiado, revisión de actividades y evaluaciones periódicas. La familia dirige su educación en casa. Este servicio no incluye escuela de registro, transcript oficial, créditos ni diploma.','Academic planning, guided work, assignment review and periodic assessment. Families direct home education. This service does not include school-of-record services, official transcripts, credits or a diploma.'],
 'role':['Busca Chanak International Academy en EMA y verifica el servicio correspondiente al grado. El uso de beca está sujeto a fondos y autorización; el cargo separado de 295 USD requiere verificar su aprobación específica.','Search for Chanak International Academy in EMA and confirm the service for the student\'s grade. Scholarship payment depends on funds and authorization; the separate USD 295 item requires specific approval verification.'],
 'contact':'offcampus@chanakacademy.org','page':'/florida-home-education/','program':'florida-heip'},
}

def credentials(lang):
 en=lang=='en'
 return section('Institutional standing' if en else 'Respaldo institucional',
 'FLDOE #134620: private-school registration, not accreditation. MSA-CESS: official candidate; accreditation has not yet been granted. IRS 501(c)(3): nonprofit tax status. Candid Gold 2026: transparency recognition, not educational accreditation.' if en else
 'FLDOE #134620: registro de escuela privada, no acreditación. MSA-CESS: candidatura oficial; la acreditación todavía no ha sido concedida. IRS 501(c)(3): condición fiscal nonprofit. Candid Gold 2026: transparencia, no acreditación educativa.')

def final_page(key,lang):
 en=lang=='en';d=DATA[key]
 story=[P('Your next step' if en else 'Tu siguiente paso','title')]
 story+=section('Fees for your country' if en else 'Tarifas de tu país',
 'Use the current country/program fee page. Enrollment, assessment, installments, materials and optional services are distinct items. Your final quote is confirmed in writing; this pack does not create a payment obligation.' if en else
 'Consulta la página vigente de tu país y programa. Matrícula, evaluación, cuotas, materiales y servicios opcionales son conceptos distintos. La cotización final se confirma por escrito; este dossier no crea una obligación de pago.')
 urls=[('Spain' if en else 'España','/tuition/?country=ES'),('Panama' if en else 'Panamá','/pa/'),('Mexico' if en else 'México','/mx/')]
 if key in ('florida-heip','general'):urls.append(('Florida EMA','/florida-home-education/'))
 if key in ('alabama-choose','general'):urls.append(('Alabama CHOOSE','/us/alabama/'))
 story.append(P(' · '.join(f'<link href="https://www.chanakacademy.org{escape(u)}" color="#168b98"><u>{escape(l)}</u></link>' for l,u in urls)))
 story+=section('Ask for guidance first' if en else 'Pide orientación primero',
 'Tell us your country, the student\'s age/grade and the service you need. Information requests and admission applications are separate steps. Submitting a form does not confirm admission, scholarship eligibility or payment.' if en else
 'Indica país, edad/grado del alumno y servicio de interés. Pedir información y solicitar incorporación son pasos distintos. Enviar un formulario no confirma admisión, elegibilidad para beca ni pago.')
 story.append(link('Contact the team' if en else 'Contactar al equipo','mailto:'+d['contact']))
 story.append(link('View the program' if en else 'Ver el programa','https://www.chanakacademy.org'+d['page']))
 if d['program']:story.append(link('Start an application in the SIS' if en else 'Iniciar solicitud en el SIS','https://sis.chanakacademy.org/matricula?program='+d['program']+'&src=initial-dossier'))
 elif key=='alabama-choose':story.append(P('Choose your specific service on the Alabama page before opening the SIS application.' if en else 'Elige el servicio concreto en la página de Alabama antes de abrir la solicitud del SIS.'))
 elif key=='life-skills':story.append(P('Contact the team to confirm the standalone service and the correct registration route.' if en else 'Contacta al equipo para confirmar el servicio independiente y su vía de registro.'))
 story+=section('Documents and recognition' if en else 'Documentos y reconocimiento',
 'Academic records are issued according to the contracted program and completed requirements. An apostille authenticates a document; recognition or equivalence is decided by the receiving authority when required for a specific use.' if en else
 'La documentación depende del programa contratado y de los requisitos cumplidos. Una apostilla autentica el documento; el reconocimiento o equivalencia corresponde a la autoridad receptora cuando se requiere para un uso concreto.')
 return story

def initial(key,lang):
 d=DATA[key];i=lang=='en';n=int(i)
 story=heading(d['title'][n],lang,d['overview'][n])
 story+=section('What is included' if i else 'Qué incluye',d['includes'][n])
 story+=section('How learning works' if i else 'Cómo se aprende',d['method'][n])
 story+=section('The family and the team' if i else 'La familia y el equipo',d['role'][n])
 story+=credentials(lang)
 story+=[PageBreak()]
 story+=section('From information to a plan' if i else 'De la información al plan',
 '1. Request guidance and share your situation.<br/>2. Confirm the service and country fees.<br/>3. Submit the appropriate application.<br/>4. Complete record review or placement as needed.<br/>5. Confirm the individual plan, documentation and payment arrangements.<br/>6. Begin with the agreed support.' if i else
 '1. Solicita orientación y comparte tu situación.<br/>2. Confirma servicio y tarifas del país.<br/>3. Envía la solicitud correspondiente.<br/>4. Completa la revisión académica o diagnóstico necesario.<br/>5. Confirma plan, documentación y forma de pago.<br/>6. Comienza con el acompañamiento acordado.')
 story+=section('Platforms with distinct roles' if i else 'Plataformas con funciones distintas',
 'The learning environment supports resources, activities and evidence. The SIS holds official records for enrolled academic programs. Access and the services included depend on the individual program; independent platforms may require a separate account.' if i else
 'El entorno de aprendizaje organiza recursos, actividades y evidencias. El SIS custodia el registro oficial de los programas académicos matriculados. Los accesos y servicios dependen del programa; las plataformas independientes pueden requerir otra cuenta.')
 story+=final_page(key,lang)
 return build(Path('initial')/f'{key}-{lang}.pdf',story)

FULL={
 'off-campus':[
 ('Who this program serves','Families already educating at home; internationally mobile families; students needing an individual pace; athletes and artists; and families seeking Christian education with structured academic follow-up.'),
 ('Placement and the individual plan','Placement follows the curriculum pathway: A.C.E., LIFEPAC, Christian Light or Chanak Flex. Valid prior assessment is considered to avoid unnecessary duplication. The PEI records the starting point, curriculum, materials, subject goals, workload and support needs.'),
 ('Core USA, Local Extension and Life Skills','Core USA includes English, mathematics, science and social studies as required by the individual plan. Local Extension maintains the student\'s language, history, geography and cultural connection. Life Skills develops character, responsibility, leadership and practical skills.'),
 ('A routine based on mastery','Set realistic daily goals, work through units, check understanding, correct errors and submit evidence. Chanak\'s mastery threshold is 80%; reinforcement and reassessment follow when necessary. Scores are individual records, not automatic credit conversions.'),
 ('Parent and mentor responsibilities','Parents organize a suitable study space and routine, supervise honest work, maintain communication and provide evidence. Mentors guide the plan, review progress and evaluate learning. The school maintains the academic record and required documentation.'),
 ('Age and stage','Elementary builds foundations and routines. Middle grades strengthen independence and subject mastery. High school uses a reviewed credit plan with graduation guidance. Workload is individualized rather than defined by a single schedule for every student.'),
 ('Records and documents','Report cards summarize registered period grades. The high school transcript records courses, credits and grades. A diploma is issued once Chanak\'s graduation requirements are met. Apostille or translation can be arranged where needed; recognition rests with the receiving authority.'),
 ],
 'dual-diploma':[
 ('Keep your school, add a U.S. route','Students continue their current school or local pathway. Chanak reviews official records and identifies the U.S. requirements still to be completed. The student\'s grade, English level, available time and goals determine the individual Route Plan.'),
 ('Transfer by documented evidence','For eligible profiles, up to 18 of 24 credits may come from prior records. Recognition requires an individual audit of subjects, grades, content and workload. Neither a percentage nor a completion date is guaranteed before review.'),
 ('Academic English','Academic English develops comprehension, writing, argument, vocabulary and communication for academic work. The family dossier describes a 2-3-credit pathway adjusted to level. The exact English courses and any recognized credits are determined in the individual audit.'),
 ('U.S. History and civic understanding','American History develops understanding of the United States through evidence and historical reasoning. U.S. Government and Economics address civic institutions, rights, responsibilities and economic decision-making. The individual plan specifies required courses and credit allocation.'),
 ('Bible, character and service','The pathway includes Bible according to the plan, with New Testament study and optional Old Testament study where applicable. Biblical worldview is applied to learning, character and decisions. Life Skills &amp; Leadership contributes one credit when planned outcomes and evidence are completed.'),
 ('Life Skills stages','Juniors (8-13), Seedling (14), Explorer (15), Builder (16) and Launch (17) organize age-appropriate challenges. The high-school pathway integrates habits, vocation, service, leadership, finance and a life project as applicable.'),
 ('Learning platform and SIS','The learning platform organizes courses, materials, tasks and evidence. The SIS records approved academic progress, credits and school documents. Coordinators guide the complete plan; teacher access follows assigned areas. Separate systems may require distinct accounts.'),
 ('Admission and workload','Start with orientation, submit official school records, complete placement and audit, confirm the Route Plan and formalize admission. Weekly workload and a 2-, 3- or 4-year route depend on the entry point and outstanding credits; individual feasibility is reviewed.'),
 ('Your documents and next destination','The local school issues its own qualification. Chanak issues the U.S. transcript and diploma after graduation requirements are fulfilled. Apostille and translation are optional when required. Participation does not require automatic local equivalence; specific uses may require a receiving authority\'s decision.'),
 ],
 'life-skills':[
 ('The purpose','Life Skills &amp; Leadership develops character, self-discipline, financial stewardship, healthy relationships and service leadership through projects, challenges and reflection. Integrated participation is part of the main program; standalone terms depend on the country.'),
 ('Nine areas of development','Identity and strengths; communication; leadership and teamwork; decisions and organization; personal finance; employability; entrepreneurship; digital citizenship; and vocation/life planning. Activities are adapted to age and stage.'),
 ('Juniors: learning by doing','Ages 8-13 use home-based practical challenges: science and faith, cooking and costs, autonomy and order, nature and patience, service and gratitude, saving and goals. Junior 1 is ages 8-9; Junior 2 ages 10-11; Junior 3 ages 12-13.'),
 ('Seedling to Launch','Seedling (14): study habits, order, discipline and responsibility. Explorer (15): gifts, talents and vocational discovery. Builder (16): service leadership, relationships and finance. Launch (17): life project, entrepreneurship and preparation for the next stage.'),
 ('Mentoring, projects and evidence','Mentoring provides group guidance and feedback. Students complete documented challenges, reflections and real projects. Meeting groups may combine stages. ChanakCoins may recognize effort and completed challenges; they are not a substitute for assessed evidence or academic credit.'),
 ('Integrated or standalone','Integrated Life Skills follows the conditions of Off-Campus or Dual Diploma; the Dual pathway awards its planned credit after required evidence is completed. Standalone delivery can serve families, churches, communities and schools. Scope, schedule, platform access and fees are confirmed individually.'),
 ]}

def complete(key):
 d=DATA[key];story=heading(d['title'][1],'en',d['overview'][1])
 story+=section('Program overview',d['includes'][1])+credentials('en')
 for a in range(0,len(FULL[key]),4):
  story.append(PageBreak());story.append(P('Your family\'s pathway','title'))
  for title,body in FULL[key][a:a+4]:story+=section(title,body)
 story.append(PageBreak());story+=final_page(key,'en')
 return build(Path('complete')/f'{key}-en.pdf',story)

def country_fees(key,code,lang,market):
 en=lang=='en';country={'ES':('España','Spain'),'MX':('México','Mexico'),'PA':('Panamá','Panama')}[code][int(en)]
 data=market['off_campus' if key=='off-campus' else 'dual_diploma']
 story=heading(DATA[key]['title'][int(en)],lang,country+' | '+market['currency'])
 story+=section('Current country fees' if en else 'Tarifas vigentes del país',
 'These amounts follow the current website catalog. The final route and quote are confirmed in writing before payment.' if en else 'Estos importes siguen el catálogo vigente de la web. La ruta y la cotización final se confirman por escrito antes del pago.')
 rows=[]
 if data.get('status')!='published':
  rows.append(['Tuition plan' if en else 'Plan de colegiatura','Personalized quote' if en else 'Cotización personalizada'])
 else:
  rows.append(['Enrollment' if en else 'Matrícula',str(data.get('enrollmentFee') or ('See quote' if en else 'Según cotización'))])
  if data.get('assessmentFee'):rows.append(['Assessment' if en else 'Evaluación',data['assessmentFee']])
  for r in data.get('routes',data.get('tiers',[])):
   label=r.get('title','')
   if en:label={'r4':'4-year route','r3':'3-year route','r2':'2-year route','r1':'Intensive route','elementary':'Elementary K-5','middle_high':'Grades 6-12','from':'According to entry grade'}.get(r.get('key'),label)
   amount=r.get('monthly')
   if en and not amount:r=dict(r,totalYear=str(r.get('totalYear','')).replace('desde ','from ').replace(' al año',' per year'))
   rows.append([label, amount+(' / month' if en else ' / mes') if amount else r.get('totalYear',('See quote' if en else 'Según cotización'))])
  rows.append(['Installments' if en else 'Cuotas',('10 monthly installments' if en and str(data.get('installments','')).startswith('10') else ('monthly' if en and data.get('installments')=='mensualidad' else str(data.get('installments', 'See quote' if en else 'Según cotización'))))])
 cells=[[P(escape(a)),P(escape(b))] for a,b in rows]
 table=Table(cells,colWidths=[77*mm,97*mm],hAlign='LEFT')
 table.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),colors.HexColor('#eef7f8')),('LINEBELOW',(0,0),(-1,-1),0.4,colors.HexColor('#c7dfe2')),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),10),('RIGHTPADDING',(0,0),(-1,-1),10),('TOPPADDING',(0,0),(-1,-1),9),('BOTTOMPADDING',(0,0),(-1,-1),6)]))
 story += [table]
 story+=section('What is included' if en else 'Qué incluye',DATA[key]['includes'][int(en)])
 story+=section('Materials and optional services' if en else 'Materiales y servicios opcionales',
 'Curriculum materials are additional unless explicitly included in your written quote. Apostille, translation and other optional services are confirmed separately. The same assessment is not charged twice if it is already included.' if en else 'Los materiales curriculares van aparte salvo inclusión expresa en la cotización. Apostilla, traducción y otros servicios opcionales se confirman por separado. No se cobra dos veces la misma evaluación si ya está incluida.')
 story.append(PageBreak())
 story+=final_page(key,lang)
 story+=credentials(lang)
 suffix=code.lower()+('-en' if en else '')
 return build(Path(f'dossier-{key}-{suffix}.pdf'),story)

if __name__=='__main__':
 paths=[initial(k,lang) for k in DATA for lang in ('es','en')]
 paths += [complete(k) for k in FULL]
 source = subprocess.check_output(['node','-e',"const fs=require('fs'),vm=require('vm'),c={window:{}};vm.runInNewContext(fs.readFileSync('js/regional-pricing.js','utf8'),c);process.stdout.write(JSON.stringify(c.window.CHANAK_PRICING,null,2));"],cwd=ROOT,text=True)
 (OUT/'fee-catalog.json').write_text(source+'\n')
 fees=json.loads(source)
 paths += [country_fees(k,c,l,fees['markets'][c]) for c in ('ES','MX','PA') for k in ('off-campus','dual-diploma') for l in ('es','en')]
 for p in paths:print(p.relative_to(ROOT))
