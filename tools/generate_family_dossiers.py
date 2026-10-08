"""One family dossier per program, country and language. Prices derive from the site."""
from pathlib import Path
from copy import deepcopy
from urllib.parse import urlencode
from xml.sax.saxutils import escape
import json, subprocess
from reportlab.platypus import PageBreak, Table, TableStyle, Spacer
from reportlab.lib import colors
from reportlab.lib.units import mm
from generate_initial_dossiers import ROOT, OUT, DATA, P, heading, section, credentials, link, build

COUNTRIES = {'ES':('España','Spain'),'MX':('México','Mexico'),'PA':('Panamá','Panama'),'CO':('Colombia','Colombia'),'US':('Estados Unidos','United States'),'GLOBAL':('Internacional','International')}

def table(rows):
    t = Table([[P(escape(str(a))), P(escape(str(b)))] for a,b in rows], colWidths=[78*mm,96*mm])
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),colors.HexColor('#eef7f8')),('LINEBELOW',(0,0),(-1,-1),.4,colors.HexColor('#c7dfe2')),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),10),('RIGHTPADDING',(0,0),(-1,-1),10),('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),5)]))
    return t

def next_steps(d,lang,country,currency):
    en=lang=='en'
    s=section('Your next steps' if en else 'Tus próximos pasos',
        '1. Share the student’s age/grade and prior records.<br/>2. Confirm the individual plan, included services and final quote.<br/>3. Submit the official application, then complete the agreed onboarding.' if en else
        '1. Comparte edad/grado y expediente del estudiante.<br/>2. Confirma el plan individual, servicios incluidos y cotización final.<br/>3. Envía la solicitud oficial y completa la incorporación acordada.')
    url='https://www.chanakacademy.org'+d['page']
    if country in COUNTRIES: url+='?'+urlencode({'country':country})
    s.append(link('Ask your admissions team' if en else 'Hablar con tu equipo de admisiones','mailto:'+d['contact']))
    if d.get('program'):
        params={'program':d['program'],'country':country,'currency':currency,'src':'family-dossier'}
        if d['program']=='off_campus' and country=='US':params['funding']='private'
        if d['program']=='florida-heip':params['funding']='scholarship'
        s.append(link('Continue in the SIS' if en else 'Continuar en el SIS','https://sis.chanakacademy.org/matricula?'+urlencode(params)))
    elif d['page']=='/us/alabama/':
        s.append(link('Choose your approved Alabama service' if en else 'Seleccionar el servicio aprobado de Alabama',url))
    s += [P('An inquiry is not an admission or a payment. Your team confirms the applicable requirements before enrollment.' if en else 'La consulta no confirma admisión ni pago. Tu equipo confirma los requisitos aplicables antes de formalizar la incorporación.','small')]
    return s

def country_pack(key,country,lang,market):
    en=lang=='en';i=int(en);d=deepcopy(DATA[key]); currency=market['currency']
    data=market['diagnostic' if key=='diagnostico' else ('off_campus' if key=='off-campus' else 'dual_diploma')]
    if key=='dual-diploma' and country=='US':
        d.update(title=['Finaliza tu High School - Adultos','Adult High School Completion'],overview=['Revisión individual de créditos previos y una vía acelerada prevista de un año. Duración, asignaturas y precio final dependen del diagnóstico y del expediente.','An individual review of prior credits and a planned accelerated one-year route. Duration, required subjects and final fees depend on assessment and prior records.'],includes=['Revisión de créditos, mentor asignado, plataforma de aprendizaje y diploma de High School al cumplir los requisitos.','Credit review, an assigned mentor, learning platform and a high school diploma after requirements are met.'],method=['Se define qué aprendizajes y créditos están pendientes antes de confirmar el plan. No es una convalidación automática.','Outstanding learning and credits are identified before confirming the plan. Credit recognition is not automatic.'],role=['Entrega tu expediente y confirma disponibilidad para la ruta propuesta con el equipo de admisiones.','Provide prior records and confirm availability for the proposed route with admissions.'],program=None)
    s=heading(d['title'][i],lang,COUNTRIES[country][i]+' | '+currency)
    s+=section('A program for your situation' if en else 'Un programa para tu situación',d['overview'][i])
    s+=section('What is included' if en else 'Qué incluye',d['includes'][i])
    s+=section('How it works' if en else 'Cómo funciona',d['method'][i])
    s+=section('Family support' if en else 'Acompañamiento a la familia',d['role'][i])
    s+=credentials(lang)
    s.append(PageBreak())
    s += [P('Your investment and next steps' if en else 'Tu inversión y próximos pasos','title')]
    rows=[]
    if data.get('status')!='published':rows.append(['Fees' if en else 'Tarifas','Personalized written quote' if en else 'Cotización personalizada por escrito'])
    elif key=='diagnostico':rows.append(['Academic assessment' if en else 'Evaluación académica',data['price']])
    else:
        if data.get('enrollmentFee'):rows.append(['Enrollment' if en else 'Matrícula',data['enrollmentFee']])
        if data.get('assessmentFee'):rows.append(['Assessment' if en else 'Evaluación',data['assessmentFee']])
        for r in data.get('routes',data.get('tiers',[])):
            label=r.get('title','')
            if en:label={'r4':'4-year route','r3':'3-year route','r2':'2-year route','r1':'Intensive route','elementary':'Elementary K-5','middle_high':'Grades 6-12','high':'High School 9-12','from':'According to entry grade','adult_completion':'Adult completion route'}.get(r.get('key'),label)
            if country=='US' and r.get('key')=='middle_high':label='Middle School 6-8'
            amount=r.get('monthly')
            if amount:amount+=' / month' if en else ' / mes'
            else:amount=str(r.get('totalYear',''))
            if en:amount=amount.replace('desde ','from ').replace(' al año',' per year')
            rows.append([label,amount])
        instal=str(data.get('installments',''))
        if instal:
            if en:instal=instal.replace('10 mensualidades','10 monthly installments').replace('mensualidad','monthly').replace('precio único según evaluación diagnóstica','single price after assessment')
            rows.append(['Payment schedule' if en else 'Cuotas',instal])
    s.append(table(rows))
    if key=='off-campus' and country=='PA':s+=section('Initial payment' if en else 'Pago inicial','US$250 = US$180 enrollment + first US$70 monthly payment.' if en else 'US$250 = matrícula US$180 + primera mensualidad US$70.')
    if key=='off-campus' and country=='CO':s+=section('Initial payment' if en else 'Pago inicial','COP 800,000 = COP 575,000 enrollment + first COP 225,000 monthly payment.' if en else 'COP 800.000 = matrícula COP 575.000 + primera mensualidad COP 225.000.')
    if key=='off-campus':s.append(P('Placement and the individual plan are included in enrollment where stated in your country quote. They are not charged twice.' if en else 'El diagnóstico y el PEI están incluidos en la matrícula cuando así lo indica la cotización de tu país; no se cobran dos veces.','small'))
    if key=='dual-diploma':s.append(P('Assessment and enrollment are separate from tuition where listed above. Ten monthly payments do not include those separate charges. Final route and quote are confirmed in writing.' if en else 'Evaluación y matrícula van aparte de la colegiatura cuando aparecen arriba. Las diez mensualidades no incluyen esos cargos separados. Ruta y cotización final se confirman por escrito.','small'))
    if key!='diagnostico':s+=section('Materials and optional services' if en else 'Materiales y servicios opcionales','Curriculum materials are additional unless your written quote includes them. Optional services are agreed separately.' if en else 'Los materiales curriculares van aparte salvo inclusión expresa en tu cotización. Los servicios opcionales se acuerdan por separado.')
    s+=next_steps(d,lang,country,currency)
    return build(Path(f'family/{key}-{country.lower()}-{lang}.pdf'),s)

def support_pack(key,lang):
    en=lang=='en';i=int(en);d=DATA[key]
    s=heading(d['title'][i],lang,d['overview'][i])
    s+=section('What is included' if en else 'Qué incluye',d['includes'][i])
    s+=section('How it works' if en else 'Cómo funciona',d['method'][i])
    s+=section('Family support' if en else 'Acompañamiento a la familia',d['role'][i])
    s+=credentials(lang)
    s.append(PageBreak())
    if key!='florida-heip':s+=section('Your quote' if en else 'Tu cotización','The team confirms the services and applicable written quote. No prices from other programs or countries apply to this inquiry.' if en else 'El equipo confirma servicios y cotización aplicable por escrito. No se aplican precios de otros programas o países a esta consulta.')
    s+=next_steps(d,lang,'US' if key in ('florida-heip','alabama-choose') else 'GLOBAL','USD')
    return build(Path(f'family/{key}-{lang}.pdf'),s)

if __name__=='__main__':
    source=subprocess.check_output(['node','-e',"const fs=require('fs'),vm=require('vm'),c={window:{}};vm.runInNewContext(fs.readFileSync('js/regional-pricing.js','utf8'),c);process.stdout.write(JSON.stringify(c.window.CHANAK_PRICING,null,2));"],cwd=ROOT,text=True)
    prices=json.loads(source)
    paths=[country_pack(k,c,l,prices['markets'][c]) for c in COUNTRIES for k in ('off-campus','dual-diploma','diagnostico') for l in ('es','en')]
    paths += [support_pack(k,l) for k in ('florida-heip','alabama-choose','life-skills','general') for l in ('es','en')]
    routes={}
    for route,key in [('offcampus','off-campus'),('dual','dual-diploma'),('diagnostico','diagnostico')]:
        routes[route]={'countries':{c:{l:f'/assets/dossiers/family/{key}-{c.lower()}-{l}.pdf' for l in ('es','en')} for c in COUNTRIES}}
    for route,key in [('florida_pep_ema','florida-heip'),('alabama_choose','alabama-choose'),('life_skills','life-skills'),('general','general')]:routes[route]={'single':{l:f'/assets/dossiers/family/{key}-{l}.pdf' for l in ('es','en')}}
    (OUT/'catalog.json').write_text(json.dumps({'version':'2026.10.08-single','routes':routes},ensure_ascii=False,indent=2)+'\n')
    for path in paths:print(path.relative_to(ROOT))
