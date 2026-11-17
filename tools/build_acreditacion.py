#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Páginas de acreditación MSA-CESS en 4 idiomas, con los datos de la carta ONOA publicada en `main`
(decisión 6 nov 2026 · vigencia hasta 1 ene 2034 · K–12 · código FL175 · firma de Christian Talbot, President).
NO se publican: informe final del equipo, portal de miembros, paquete de celebración ni enlaces awstrack.
Uso: python3 tools/build_acreditacion.py"""
import html, json, os, sys
sys.path.insert(0, os.path.dirname(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = 'https://www.chanakacademy.org'
URL = {'es': '/acreditacion/', 'en': '/en/accreditation/', 'ca': '/ca/acreditacio/', 'fr': '/fr/accreditation/', 'pt': '/pt/acreditacao/'}
HOME = {'es': '/', 'en': '/en/', 'ca': '/ca/', 'fr': '/fr/', 'pt': '/pt/'}
STYLE = ('<style>:root{--navy:#123450;--green:#237f50;--paper:#f5f8f9;--border:#d7e4e7}*{box-sizing:border-box}body{margin:0;background:var(--paper);font:16px/1.6 system-ui,Arial,sans-serif;color:var(--navy)}'
         'a{color:#0a6c79}header{background:linear-gradient(120deg,#092f50,#176960);color:white;padding:48px 22px}header>div,main{max-width:1080px;margin:0 auto}h1{font-size:clamp(30px,5vw,48px);line-height:1.12;margin:12px 0}'
         'header p{max-width:770px;color:#e5f1f1}header a{color:white}main{padding:30px 18px 70px}.card{padding:27px;background:white;border:1px solid var(--border);border-radius:18px;margin:0 0 20px}'
         '.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px}.detail{border:1px solid var(--border);border-radius:12px;padding:18px}.detail small{display:block;color:#678;font-size:12px}.detail b{font-size:23px}'
         '.callout{border-left:4px solid #bb903b;background:#fff9ea;padding:18px;margin-top:25px;border-radius:9px}.buttons{display:flex;flex-wrap:wrap;gap:10px;margin:18px 0}.buttons a{padding:11px 15px;background:#176d73;color:white;text-decoration:none;border-radius:9px;font-weight:750}'
         '.logo{display:block;max-width:460px;width:100%;max-height:125px;object-fit:contain;background:white;padding:12px;margin:20px 0;border-radius:12px}.small{font-size:14px;color:#567}footer{text-align:center;padding:27px;color:#678}'
         '.cert{display:block;width:100%;height:auto;margin:14px 0;border:1px solid #d6dee3;border-radius:8px}.langs{margin-top:14px;font-size:14px}.langs a{margin-right:12px}.means ul{padding-left:1.2rem;margin:.4rem 0 0}.means li{margin:.45rem 0}</style>')


def d(es, en, ca, fr):
    return dict(es=es, en=en, ca=ca, fr=fr)


T = dict(
    title=d('Acreditación oficial MSA-CESS K–12 · Chanak International Academy', 'Official MSA-CESS K–12 Accreditation · Chanak International Academy',
            'Acreditació oficial MSA-CESS K–12 · Chanak International Academy', 'Accréditation officielle MSA-CESS K–12 · Chanak International Academy'),
    desc=d('Chanak International Academy: acreditación oficial MSA-CESS K–12 otorgada el 6 de noviembre de 2026; vigencia hasta el 1 de enero de 2034. Código FL175.',
           'Chanak International Academy: official MSA-CESS K–12 accreditation granted on November 6, 2026; valid through January 1, 2034. Code FL175.',
           'Chanak International Academy: acreditació oficial MSA-CESS K–12 atorgada el 6 de novembre de 2026; vigència fins l’1 de gener de 2034. Codi FL175.',
           'Chanak International Academy : accréditation officielle MSA-CESS K–12 accordée le 6 novembre 2026 ; valable jusqu’au 1er janvier 2034. Code FL175.'),
    back=d('← Chanak International Academy', '← Chanak International Academy', '← Chanak International Academy', '← Chanak International Academy'),
    h1=d('Acreditación oficial MSA-CESS', 'Official MSA-CESS accreditation', 'Acreditació oficial MSA-CESS', 'Accréditation officielle MSA-CESS'),
    lead=d('Chanak International Academy está acreditada para Kindergarten–Grade 12 por las Commissions on Elementary and Secondary Schools de la Middle States Association of Colleges and Schools.',
           'Chanak International Academy is accredited for Kindergarten–Grade 12 by the Commissions on Elementary and Secondary Schools of the Middle States Association of Colleges and Schools.',
           'Chanak International Academy està acreditada per a Kindergarten–Grade 12 per les Commissions on Elementary and Secondary Schools de la Middle States Association of Colleges and Schools.',
           'Chanak International Academy est accréditée pour Kindergarten–Grade 12 par les Commissions on Elementary and Secondary Schools de la Middle States Association of Colleges and Schools.'),
    f1=d('Decisión oficial', 'Official decision', 'Decisió oficial', 'Décision officielle'), v1=d('6 nov. 2026', 'Nov 6, 2026', '6 nov. 2026', '6 nov. 2026'),
    f2=d('Vigencia hasta', 'Valid through', 'Vigència fins', 'Valable jusqu’au'), v2=d('1 ene. 2034', 'Jan 1, 2034', '1 gen. 2034', '1er janv. 2034'),
    f3=d('Alcance acreditado', 'Accredited scope', 'Abast acreditat', 'Périmètre accrédité'), v3=d('Kindergarten–Grade 12', 'Kindergarten–Grade 12', 'Kindergarten–Grade 12', 'Kindergarten–Grade 12'),
    f4=d('Código institucional MSA', 'MSA institution code', 'Codi institucional MSA', 'Code institutionnel MSA'), v4=d('FL175', 'FL175', 'FL175', 'FL175'),
    logo_alt=d('Middle States Association · marca oficial de la institución acreditadora', 'Middle States Association · official mark of the accrediting institution',
               'Middle States Association · marca oficial de la institució acreditadora', 'Middle States Association · marque officielle de l’institution accréditrice'),
    small=d('La comunicación oficial de MSA-CESS confirma una acreditación institucional por siete años y el cumplimiento de los estándares de MSA. No constituye garantía de homologación, admisión universitaria ni acreditación independiente de socios.',
            'The official MSA-CESS communication confirms an institutional accreditation for seven years and compliance with MSA standards. It is not a guarantee of recognition, university admission or independent accreditation of partners.',
            'La comunicació oficial de MSA-CESS confirma una acreditació institucional per set anys i el compliment dels estàndards de MSA. No constitueix garantia d’homologació, admissió universitària ni acreditació independent de socis.',
            'La communication officielle de MSA-CESS confirme une accréditation institutionnelle de sept ans et le respect des standards de MSA. Elle ne constitue ni une garantie de reconnaissance, ni d’admission universitaire, ni une accréditation indépendante des partenaires.'),
    means_h=d('Qué significa la acreditación MSA-CESS', 'What MSA-CESS accreditation means', 'Què significa l’acreditació MSA-CESS', 'Ce que signifie l’accréditation MSA-CESS'),
    means=[
        d('Es una acreditación institucional de una asociación de escuelas de EE. UU., basada en la revisión por pares y en un plan de mejora continua.',
          'It is an institutional accreditation from a U.S. association of schools, based on peer review and a plan for continuous improvement.',
          'És una acreditació institucional d’una associació d’escoles dels EUA, basada en la revisió per parells i en un pla de millora contínua.',
          'C’est une accréditation institutionnelle délivrée par une association d’écoles américaines, fondée sur l’évaluation par les pairs et un plan d’amélioration continue.'),
        d('Cubre a Chanak International Academy (K–12) como institución. El cumplimiento de la normativa escolar de cada país corresponde a cada familia, centro y autoridad local: la acreditación no sustituye autorizaciones locales ni garantiza admisión o convalidación en ningún sistema educativo.',
          'It covers Chanak International Academy (K–12) as an institution. Compliance with each country’s school regulations is the responsibility of each family, center and local authority: accreditation does not replace local authorizations and does not guarantee admission or recognition in any education system.',
          'Cobreix Chanak International Academy (K–12) com a institució. El compliment de la normativa escolar de cada país correspon a cada família, centre i autoritat local: l’acreditació no substitueix autoritzacions locals ni garanteix admissió o convalidació en cap sistema educatiu.',
          'Elle couvre Chanak International Academy (K–12) en tant qu’institution. Le respect de la réglementation scolaire de chaque pays incombe à chaque famille, centre et autorité locale : l’accréditation ne remplace pas les autorisations locales et ne garantit ni admission ni reconnaissance dans aucun système éducatif.'),
        d('Qué aporta a las familias: estándares de calidad externos, rendición de cuentas, mejora continua y un expediente académico reconocible. No incluye promesas de equivalencias.',
          'What it brings to families: external quality standards, accountability, continuous improvement and a recognizable academic record. It makes no promises of equivalencies.',
          'Què aporta a les famílies: estàndards de qualitat externs, rendició de comptes, millora contínua i un expedient acadèmic reconeixible. No inclou promeses d’equivalències.',
          'Ce qu’elle apporte aux familles : des standards de qualité externes, la redevabilité, l’amélioration continue et un dossier scolaire reconnaissable. Elle ne promet aucune équivalence.'),
    ],
    docs_h=d('Certificado de acreditación', 'Certificate of Accreditation', 'Certificat d’acreditació', 'Certificat d’accréditation'),
    docs_p=d('Certificado de acreditación emitido por Middle States Association Commissions on Elementary and Secondary Schools a favor de Chanak International Academy, de Kindergarten a Grade 12, para el periodo del 6 de noviembre de 2026 al 1 de enero de 2034.',
             'Certificate of Accreditation issued by the Middle States Association Commissions on Elementary and Secondary Schools to Chanak International Academy, Kindergarten through Grade 12, for the period November 6, 2026 to January 1, 2034.',
             'Certificat d’acreditació emès per la Middle States Association Commissions on Elementary and Secondary Schools a favor de Chanak International Academy, de Kindergarten a Grade 12, per al període del 6 de novembre de 2026 a l’1 de gener de 2034.',
             'Certificat d’accréditation délivré par la Middle States Association Commissions on Elementary and Secondary Schools à Chanak International Academy, de la maternelle (Kindergarten) à Grade 12, pour la période du 6 novembre 2026 au 1er janvier 2034.'),
    b_onoa=d('Ver el certificado completo', 'View the full certificate', 'Veure el certificat complet', 'Voir le certificat complet'),
    cert_alt=d('Certificate of Accreditation de MSA-CESS para Chanak International Academy, Kindergarten a Grade 12, del 6 de noviembre de 2026 al 1 de enero de 2034',
               'MSA-CESS Certificate of Accreditation for Chanak International Academy, Kindergarten to Grade 12, November 6, 2026 to January 1, 2034',
               'Certificate of Accreditation de MSA-CESS per a Chanak International Academy, Kindergarten a Grade 12, del 6 de novembre de 2026 a l’1 de gener de 2034',
               'Certificate of Accreditation de MSA-CESS pour Chanak International Academy, Kindergarten à Grade 12, du 6 novembre 2026 au 1er janvier 2034'),
    b_dos=d('Dossiers de programas · ES/EN', 'Program dossiers · ES/EN', 'Dossiers de programes · ES/EN', 'Dossiers des programmes · ES/EN'),
    imp_h=d('Compromiso con la mejora continua', 'Commitment to continuous improvement', 'Compromís amb la millora contínua', 'Engagement d’amélioration continue'),
    imp_p=d('El proceso continúa después de la concesión: Chanak debe aplicar su Plan for Growth and Improvement, presentar el Mid-Term Report el <strong>1 de diciembre de 2030</strong> y prepararse para la siguiente visita del equipo en <strong>primavera de 2033</strong>.',
            'The process continues after the award: Chanak must implement its Plan for Growth and Improvement, submit the Mid-Term Report on <strong>December 1, 2030</strong> and prepare for the next team visit in <strong>spring 2033</strong>.',
            'El procés continua després de la concessió: Chanak ha d’aplicar el seu Plan for Growth and Improvement, presentar el Mid-Term Report l’<strong>1 de desembre de 2030</strong> i preparar-se per a la propera visita de l’equip a la <strong>primavera de 2033</strong>.',
            'Le processus se poursuit après l’attribution : Chanak doit appliquer son Plan for Growth and Improvement, remettre le Mid-Term Report le <strong>1er décembre 2030</strong> et se préparer à la prochaine visite de l’équipe au <strong>printemps 2033</strong>.'),
    call=d('<strong>Alcance de las alianzas:</strong> una Microschool o Partner Learning Center puede operar programas autorizados bajo acuerdo con Chanak; este convenio no le concede automáticamente la acreditación independiente de MSA. Los documentos escolares son emitidos por Chanak únicamente conforme al programa y expediente autorizado.',
           '<strong>Scope of partnerships:</strong> a Microschool or Partner Learning Center may operate authorized programs under an agreement with Chanak; this agreement does not automatically grant it independent MSA accreditation. School documents are issued by Chanak only according to the authorized program and record.',
           '<strong>Abast de les aliances:</strong> una Microschool o Partner Learning Center pot operar programes autoritzats sota acord amb Chanak; aquest conveni no li concedeix automàticament l’acreditació independent de MSA. Els documents escolars els emet Chanak únicament segons el programa i l’expedient autoritzat.',
           '<strong>Portée des partenariats :</strong> une Microschool ou un Partner Learning Center peut proposer des programmes autorisés dans le cadre d’un accord avec Chanak ; cet accord ne lui confère pas automatiquement l’accréditation indépendante de MSA. Les documents scolaires sont délivrés par Chanak uniquement selon le programme et le dossier autorisés.'),
    reg_h=d('Registro escolar y comunidad universitaria', 'School registration and university community', 'Registre escolar i comunitat universitària', 'Enregistrement scolaire et communauté universitaire'),
    reg1=d('<strong>Florida Department of Education · #134620:</strong> registro de Chanak como escuela privada de Florida, distinto de la acreditación MSA-CESS.',
           '<strong>Florida Department of Education · #134620:</strong> Chanak’s registration as a Florida private school, distinct from MSA-CESS accreditation.',
           '<strong>Florida Department of Education · #134620:</strong> registre de Chanak com a escola privada de Florida, diferent de l’acreditació MSA-CESS.',
           '<strong>Florida Department of Education · #134620 :</strong> enregistrement de Chanak comme école privée de Floride, distinct de l’accréditation MSA-CESS.'),
    reg2=d('<strong>Dallas Baptist University Global Community:</strong> membresía institucional de Chanak, diferente de la acreditación escolar. No garantiza admisión, becas o créditos universitarios sin cumplir los requisitos de cada programa.',
           '<strong>Dallas Baptist University Global Community:</strong> Chanak’s institutional membership, different from school accreditation. It does not guarantee admission, scholarships or university credits without meeting each program’s requirements.',
           '<strong>Dallas Baptist University Global Community:</strong> membresia institucional de Chanak, diferent de l’acreditació escolar. No garanteix admissió, beques ni crèdits universitaris sense complir els requisits de cada programa.',
           '<strong>Dallas Baptist University Global Community :</strong> adhésion institutionnelle de Chanak, différente de l’accréditation scolaire. Elle ne garantit ni admission, ni bourses, ni crédits universitaires sans remplir les conditions de chaque programme.'),
    foot=d('Chanak International Academy · Acreditada por MSA-CESS · FL175 · FLDOE #134620', 'Chanak International Academy · Accredited by MSA-CESS · FL175 · FLDOE #134620',
           'Chanak International Academy · Acreditada per MSA-CESS · FL175 · FLDOE #134620', 'Chanak International Academy · Accréditée par MSA-CESS · FL175 · FLDOE #134620'),
)
LANG_NAMES = {'es': 'ES', 'en': 'EN', 'ca': 'CA', 'fr': 'FR', 'pt': 'PT'}


PT = dict(
    title='Credenciamento oficial MSA-CESS K–12 · Chanak International Academy',
    desc='Chanak International Academy: credenciamento oficial MSA-CESS K–12 concedido em 6 de novembro de 2026; vigência até 1º de janeiro de 2034. Código FL175.',
    back='← Chanak International Academy', h1='Credenciamento oficial MSA-CESS',
    lead='A Chanak International Academy é credenciada para Kindergarten–Grade 12 pelas Commissions on Elementary and Secondary Schools da Middle States Association of Colleges and Schools.',
    f1='Decisão oficial', v1='6 nov. 2026', f2='Vigência até', v2='1º jan. 2034', f3='Abrangência credenciada', v3='Kindergarten–Grade 12', f4='Código institucional MSA', v4='FL175',
    logo_alt='Middle States Association · marca oficial da instituição credenciadora',
    small='A comunicação oficial da MSA-CESS confirma um credenciamento institucional por sete anos e o cumprimento dos padrões da MSA. Não constitui garantia de homologação, admissão universitária nem credenciamento independente de parceiros.',
    means_h='O que significa o credenciamento MSA-CESS',
    means=['É um credenciamento institucional de uma associação de escolas dos EUA, baseado em revisão por pares e em um plano de melhoria contínua.',
           'Abrange a Chanak International Academy (K–12) como instituição. O cumprimento da norma escolar de cada país cabe a cada família, centro e autoridade local: o credenciamento não substitui autorizações locais nem garante admissão ou convalidação em nenhum sistema educacional.',
           'O que oferece às famílias: padrões de qualidade externos, prestação de contas, melhoria contínua e um histórico acadêmico reconhecível. Não inclui promessas de equivalências.'],
    docs_h='Certificado de credenciamento',
    docs_p='Certificado de credenciamento emitido pela Middle States Association Commissions on Elementary and Secondary Schools em favor da Chanak International Academy, de Kindergarten a Grade 12, para o período de 6 de novembro de 2026 a 1º de janeiro de 2034.',
    b_onoa='Ver o certificado completo',
    cert_alt='Certificate of Accreditation da MSA-CESS para a Chanak International Academy, Kindergarten a Grade 12, de 6 de novembro de 2026 a 1º de janeiro de 2034',
    b_dos='Dossiês de programas · ES/EN',
    imp_h='Compromisso com a melhoria contínua',
    imp_p='O processo continua após a concessão: a Chanak deve aplicar seu Plan for Growth and Improvement, apresentar o Mid-Term Report em <strong>1º de dezembro de 2030</strong> e preparar-se para a próxima visita da equipe na <strong>primavera de 2033</strong>.',
    call='<strong>Alcance das alianças:</strong> uma Microschool ou Partner Learning Center pode operar programas autorizados sob acordo com a Chanak; esse acordo não lhe concede automaticamente o credenciamento independente da MSA. Os documentos escolares são emitidos pela Chanak unicamente conforme o programa e o histórico autorizados.',
    reg_h='Registro escolar e comunidade universitária',
    reg1='<strong>Florida Department of Education · #134620:</strong> registro da Chanak como escola privada da Flórida, distinto do credenciamento MSA-CESS.',
    reg2='<strong>Dallas Baptist University Global Community:</strong> participação institucional da Chanak, diferente do credenciamento escolar. Não garante admissão, bolsas ou créditos universitários sem cumprir os requisitos de cada programa.',
    foot='Chanak International Academy · Credenciada pela MSA-CESS · FL175 · FLDOE #134620',
)
for _k, _v in T.items():
    if _k == 'means':
        for _i, _x in enumerate(_v): _x['pt'] = PT['means'][_i]
    else:
        _v['pt'] = PT[_k]


def page(lang):
    g = lambda k: T[k][lang]
    alts = ''.join(f'<link rel="alternate" hreflang="{l}" href="{BASE}{u}">' for l, u in URL.items()) + f'<link rel="alternate" hreflang="x-default" href="{BASE}{URL["es"]}">'
    langs = ''.join(f'<a href="{URL[l]}" hreflang="{l}" lang="{l}"' + (' aria-current="true"' if l == lang else '') + f'>{LANG_NAMES[l]}</a>' for l in URL)
    means = ''.join(f'<li>{x[lang]}</li>' for x in T['means'])
    ld = {"@context": "https://schema.org", "@graph": [
        {"@type": "EducationalOrganization", "@id": BASE + "/#school", "name": "Chanak International Academy", "url": BASE + "/", "legalName": "Chanak TrainUp Education, Inc.",
         "hasCredential": {"@type": "EducationalOccupationalCredential", "credentialCategory": "Accreditation", "name": "MSA-CESS Accreditation, Kindergarten–Grade 12",
                           "identifier": "FL175", "url": BASE + URL[lang], "image": BASE + "/assets/img/msa-certificate-chanak-2026.jpg", "dateCreated": "2026-11-06", "expires": "2034-01-01",
                           "recognizedBy": {"@type": "Organization", "name": "Middle States Association Commissions on Elementary and Secondary Schools (MSA-CESS)", "url": "https://www.msa-cess.org/"}}},
        {"@type": "WebPage", "@id": BASE + URL[lang], "url": BASE + URL[lang], "name": g('title'), "inLanguage": lang, "about": {"@id": BASE + "/#school"}},
        {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Chanak", "item": BASE + HOME[lang]}, {"@type": "ListItem", "position": 2, "name": g('h1'), "item": BASE + URL[lang]}]}]}
    return f'''<!doctype html><html lang="{lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="{html.escape(g('desc'))}"><link rel="canonical" href="{BASE}{URL[lang]}">{alts}<title>{html.escape(g('title'))}</title><link rel="icon" href="/assets/img/chanak-logo-square.jpg">{STYLE}<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
</head><body>
<header><div><a href="{HOME[lang]}">{g('back')}</a><h1>{g('h1')}</h1><p>{g('lead')}</p><p class="langs">{langs}</p></div></header>
<main><section class="card"><div class="grid"><div class="detail"><small>{g('f1')}</small><b>{g('v1')}</b></div><div class="detail"><small>{g('f2')}</small><b>{g('v2')}</b></div><div class="detail"><small>{g('f3')}</small><b>{g('v3')}</b></div><div class="detail"><small>{g('f4')}</small><b>{g('v4')}</b></div></div><img class="logo" alt="{html.escape(g('logo_alt'))}" src="/assets/img/msa-logo-clean.png" width="460" height="116"><p class="small">{g('small')}</p></section>
<section class="card means"><h2>{g('means_h')}</h2><ul>{means}</ul></section>
<section class="card"><h2>{g('docs_h')}</h2><p>{g('docs_p')}</p><a href="/assets/img/msa-certificate-chanak-2026.jpg" target="_blank" rel="noopener"><img class="cert" src="/assets/img/msa-certificate-chanak-2026-1200.jpg" alt="{html.escape(g('cert_alt'))}" width="1200" height="762" loading="lazy" decoding="async"></a><div class="buttons"><a href="/assets/img/msa-certificate-chanak-2026.jpg" target="_blank" rel="noopener">{g('b_onoa')}</a><a href="/dossiers/">{g('b_dos')}</a></div></section>
<section class="card"><h2>{g('imp_h')}</h2><p>{g('imp_p')}</p><div class="callout">{g('call')}</div></section>
<section class="card"><h2>{g('reg_h')}</h2><p>{g('reg1')}</p><p>{g('reg2')}</p></section></main><footer>{g('foot')}</footer></body></html>'''


if __name__ == '__main__':
    for l, u in URL.items():
        p = os.path.join(ROOT, u.strip('/'), 'index.html')
        os.makedirs(os.path.dirname(p), exist_ok=True)
        open(p, 'w', encoding='utf-8').write(page(l))
        print('  ·', u)
