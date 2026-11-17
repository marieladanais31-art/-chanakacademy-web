# -*- coding: utf-8 -*-
"""Textos de Microschool (ES, EN, CA, FR): tres pilares, tabla por país, camino del socio, kit del fundador y FAQ.
Los usan tools/build_microschool.py (landings) y tools/build_pages.py (presupuesto, 7 errores)."""

L4 = ('es', 'en', 'ca', 'fr')


def d(es, en, ca, fr):
    return dict(es=es, en=en, ca=ca, fr=fr)


PIL_EYE = d('Los tres pilares', 'The three pillars', 'Els tres pilars', 'Les trois piliers')
PIL_H2 = d('Lo que hace posible una Microschool Chanak', 'What makes a Chanak Microschool possible', 'El que fa possible una Microschool Chanak', 'Ce qui rend possible une Microschool Chanak')
PIL_LEAD = d(
    'Una Microschool es una alianza con una comunidad de familias que ya existe (mínimo de lanzamiento: 10 familias), en Estados Unidos y en otros países. Toda sede se apoya en los mismos tres pilares.',
    'A Microschool is a partnership with a community of families that already exists (launch minimum: 10 families), in the United States and in other countries. Every site rests on the same three pillars.',
    'Una Microschool és una aliança amb una comunitat de famílies que ja existeix (mínim de llançament: 10 famílies), als Estats Units i en altres països. Tota seu es recolza en els mateixos tres pilars.',
    'Une Microschool est un partenariat avec une communauté de familles qui existe déjà (minimum de lancement : 10 familles), aux États-Unis et dans d’autres pays. Chaque site repose sur les mêmes trois piliers.')
PILLARS = [
    (d('A · Plan de estudios americano acreditado por MSA-CESS, proporcionado por Chanak',
       'A · American curriculum accredited by MSA-CESS, provided by Chanak',
       'A · Pla d’estudis americà acreditat per MSA-CESS, proporcionat per Chanak',
       'A · Programme américain accrédité par MSA-CESS, fourni par Chanak'),
     d('Currículo americano K–12 alineado con los estándares B.E.S.T. y la normativa de Florida, bajo la acreditación MSA-CESS de Chanak. Incluye Mastery Learning, el modelo 60/20/20, plataforma, expedientes y diploma. Puedes complementarlo con tu propio currículo, bajo el marco Chanak.',
       'American K–12 curriculum aligned with Florida’s B.E.S.T. standards and rules, under Chanak’s MSA-CESS accreditation. Includes Mastery Learning, the 60/20/20 model, platform, records and diploma. You may complement it with your own curriculum within the Chanak framework.',
       'Currículum americà K–12 alineat amb els estàndards B.E.S.T. i la normativa de Florida, sota l’acreditació MSA-CESS de Chanak. Inclou Mastery Learning, el model 60/20/20, plataforma, expedients i diploma. El pots complementar amb el teu propi currículum, dins el marc Chanak.',
       'Programme américain K–12 aligné sur les standards B.E.S.T. et la réglementation de Floride, sous l’accréditation MSA-CESS de Chanak. Il comprend le Mastery Learning, le modèle 60/20/20, la plateforme, les dossiers et le diplôme. Vous pouvez le compléter par votre propre programme, dans le cadre Chanak.')),
    (d('B · Instalaciones que cumplen los requisitos municipales y estatales',
       'B · Facilities that meet municipal and state requirements',
       'B · Instal·lacions que compleixen els requisits municipals i estatals',
       'B · Des locaux conformes aux exigences municipales et nationales'),
     d('El espacio debe cumplir la normativa municipal, regional o estatal de su país: uso del local, seguridad, accesibilidad, seguros y aforo. El socio es responsable legal de sus instalaciones; Chanak aporta una lista de comprobación y te orienta.',
       'The space must comply with the municipal, regional or national rules of its country: permitted use, safety, accessibility, insurance and capacity. The partner is legally responsible for its facilities; Chanak provides a checklist and guides you.',
       'L’espai ha de complir la normativa municipal, regional o estatal del seu país: ús del local, seguretat, accessibilitat, assegurances i aforament. El soci és responsable legal de les seves instal·lacions; Chanak aporta una llista de comprovació i t’orienta.',
       'Le lieu doit respecter la réglementation municipale, régionale ou nationale de son pays : usage du local, sécurité, accessibilité, assurances et capacité d’accueil. Le partenaire est légalement responsable de ses locaux ; Chanak fournit une liste de contrôle et vous oriente.')),
    (d('C · Personal docente cualificado según las leyes del país y certificado por Chanak',
       'C · Teaching staff qualified under the country’s laws and certified by Chanak',
       'C · Personal docent qualificat segons les lleis del país i certificat per Chanak',
       'C · Un personnel enseignant qualifié selon les lois du pays et certifié par Chanak'),
     d('Tu equipo cumple los requisitos de cualificación y verificación de antecedentes de tu país, y además se certifica con la formación de Chanak (Chanak TrainUp) para aplicar Mastery Learning y el modelo 60/20/20.',
       'Your team meets your country’s qualification and background-check requirements, and is also certified through Chanak’s training (Chanak TrainUp) to apply Mastery Learning and the 60/20/20 model.',
       'El teu equip compleix els requisits de qualificació i verificació d’antecedents del teu país, i a més es certifica amb la formació de Chanak (Chanak TrainUp) per aplicar Mastery Learning i el model 60/20/20.',
       'Votre équipe remplit les exigences de qualification et de vérification des antécédents de votre pays, et se certifie en outre avec la formation de Chanak (Chanak TrainUp) pour appliquer le Mastery Learning et le modèle 60/20/20.')),
]
PIL_LEGAL = d(
    'Chanak orienta y acompaña, pero no sustituye el asesoramiento legal local ni garantiza autorizaciones, códigos de centro ni fondos públicos: cada país tiene sus propios requisitos.',
    'Chanak guides and accompanies you, but does not replace local legal advice and does not guarantee authorizations, school codes or public funds: each country has its own requirements.',
    'Chanak orienta i acompanya, però no substitueix l’assessorament legal local ni garanteix autoritzacions, codis de centre ni fons públics: cada país té els seus propis requisits.',
    'Chanak oriente et accompagne, mais ne remplace pas le conseil juridique local et ne garantit ni autorisations, ni codes d’établissement, ni fonds publics : chaque pays a ses propres exigences.')
PIL_FAMILIES = d(
    '¿Eres una familia y no lideras una comunidad? Tu puerta de entrada es <a href="{hs}">Homeschool Guiado</a> o <a href="{dd}">Dual Diploma</a>; con gusto te orientamos.',
    'Are you a family and not leading a community? Your way in is <a href="{hs}">Guided Homeschool</a> or <a href="{dd}">Dual Diploma</a>; we will gladly guide you.',
    'Ets una família i no lideres una comunitat? La teva porta d’entrada és <a href="{hs}">Homeschool Guiat</a> o <a href="{dd}">Dual Diploma</a>; t’orientarem amb molt de gust.',
    'Vous êtes une famille et ne dirigez pas de communauté ? Votre porte d’entrée est <a href="{hs}">Homeschool guidé</a> ou <a href="{dd}">Dual Diploma</a> ; nous vous orienterons avec plaisir.')

# ── Cómo funciona según dónde estés ──
GEO_EYE = d('Estados Unidos e internacional', 'United States and international', 'Estats Units i internacional', 'États-Unis et international')
GEO_H2 = d('Cómo funciona según dónde estés', 'How it works depending on where you are', 'Com funciona segons on siguis', 'Comment cela fonctionne selon votre pays')
GEO_TH = d(('Dónde', 'Cómo opera la Microschool'), ('Where', 'How the Microschool operates'), ('On', 'Com opera la Microschool'), ('Où', 'Fonctionnement de la Microschool'))
GEO_ROWS = [
    (d('Microschools USA', 'Microschools USA', 'Microschools USA', 'Microschools USA'),
     d('Alianza contratada directamente con Chanak. La Microschool opera bajo la acreditación y las aprobaciones ESA de Chanak, sin código escolar propio. Los fondos ESA aplican solo en los estados donde Chanak es proveedor aprobado y solo a los servicios aprobados en cada programa; la elegibilidad depende de cada estado. Las instalaciones se verifican antes de abrir. Entrada del estudiante: apoyo homeschool o Programa Completo.',
       'Partnership contracted directly with Chanak. The Microschool operates under Chanak’s accreditation and ESA approvals, without its own school code. ESA funds apply only in states where Chanak is an approved provider and only to the services approved in each program; eligibility depends on each state. Facilities are verified before opening. Student entry: homeschool support or Full Program.',
       'Aliança contractada directament amb Chanak. La Microschool opera sota l’acreditació i les aprovacions ESA de Chanak, sense codi escolar propi. Els fons ESA s’apliquen només als estats on Chanak és proveïdor aprovat i només als serveis aprovats en cada programa; l’elegibilitat depèn de cada estat. Les instal·lacions es verifiquen abans d’obrir. Entrada de l’estudiant: suport homeschool o Programa Complet.',
       'Partenariat contracté directement avec Chanak. La Microschool fonctionne sous l’accréditation et les agréments ESA de Chanak, sans code scolaire propre. Les fonds ESA ne s’appliquent que dans les États où Chanak est prestataire agréé et uniquement aux services approuvés dans chaque programme ; l’éligibilité dépend de chaque État. Les locaux sont vérifiés avant l’ouverture. Entrée de l’élève : soutien homeschool ou Programme complet.')),
    (d('International Microschools · España', 'International Microschools · Spain', 'International Microschools · Espanya', 'International Microschools · Espagne'),
     d('Alianza contratada directamente con Chanak. Centro extranjero reglado (Real Decreto 806/1993): el operador local solicita y obtiene las autorizaciones, asume sus instalaciones y su personal presencial, y fija la cuota de sus familias según su realidad. La autorización depende de cada comunidad autónoma.',
       'Partnership contracted directly with Chanak. A regulated foreign school (Royal Decree 806/1993): the local operator applies for and obtains the authorizations, takes responsibility for its facilities and in-person staff, and sets its families’ tuition according to its own reality. Authorization depends on each autonomous community.',
       'Aliança contractada directament amb Chanak. Centre estranger reglat (Reial decret 806/1993): l’operador local sol·licita i obté les autoritzacions, assumeix les seves instal·lacions i el seu personal presencial, i fixa la quota de les seves famílies segons la seva realitat. L’autorització depèn de cada comunitat autònoma.',
       'Partenariat contracté directement avec Chanak. Établissement étranger réglementé (décret royal 806/1993) : l’opérateur local demande et obtient les autorisations, assume ses locaux et son personnel en présentiel, et fixe la contribution de ses familles selon sa réalité. L’autorisation dépend de chaque communauté autonome.')),
    (d('International Microschools · México, Panamá y otros países', 'International Microschools · Mexico, Panama and other countries', 'International Microschools · Mèxic, Panamà i altres països', 'International Microschools · Mexique, Panama et autres pays'),
     d('Alianza contratada directamente con Chanak. Requiere el código o la autorización de la autoridad educativa local, que obtiene el operador local; los requisitos son propios de cada país. Se evalúa caso por caso.',
       'Partnership contracted directly with Chanak. Requires the code or authorization of the local education authority, which the local operator obtains; requirements are specific to each country. Each case is reviewed individually.',
       'Aliança contractada directament amb Chanak. Requereix el codi o l’autorització de l’autoritat educativa local, que obté l’operador local; els requisits són propis de cada país. S’avalua cas per cas.',
       'Partenariat contracté directement avec Chanak. Nécessite le code ou l’autorisation de l’autorité éducative locale, que l’opérateur local obtient ; les exigences sont propres à chaque pays. Chaque cas est étudié individuellement.')),
]

LEGAL_EYE = d('Referencia', 'Reference', 'Referència', 'Référence')
LEGAL_H2 = d('Marco legal por país', 'Legal framework by country', 'Marc legal per país', 'Cadre légal par pays')
LEGAL_FOOT = d(
    'Información de referencia, no es asesoramiento legal. Los requisitos cambian y varían según la región; verifícalos con la autoridad educativa de tu país. Última revisión: {date}.',
    'Reference information, not legal advice. Requirements change and vary by region; verify them with your country’s education authority. Last reviewed: {date}.',
    'Informació de referència, no és assessorament legal. Els requisits canvien i varien segons la regió; verifica’ls amb l’autoritat educativa del teu país. Darrera revisió: {date}.',
    'Informations de référence, sans valeur de conseil juridique. Les exigences évoluent et varient selon la région ; vérifiez-les auprès de l’autorité éducative de votre pays. Dernière révision : {date}.')
LEGAL_NORMS = d('Normas de referencia', 'Reference rules', 'Normes de referència', 'Textes de référence')

TOOLS_H = d('Herramientas para fundadores', 'Tools for founders', 'Eines per a fundadors', 'Outils pour les fondateurs')
TOOLS = [
    (d('Calculadora de presupuesto', 'Budget calculator', 'Calculadora de pressupost', 'Calculateur de budget'),
     d('Inversión inicial, gasto mensual, punto de equilibrio y previo normativo de tu país.', 'Start-up investment, monthly costs, break-even and your country’s regulatory preview.', 'Inversió inicial, despesa mensual, punt d’equilibri i previ normatiu del teu país.', 'Investissement initial, charges mensuelles, seuil de rentabilité et aperçu réglementaire de votre pays.'), 'budget'),
    (d('7 errores al abrir una Microschool', '7 mistakes when opening a Microschool', '7 errors en obrir una Microschool', '7 erreurs à l’ouverture d’une Microschool'),
     d('Una guía breve para evitarlos desde el primer día.', 'A short guide to avoid them from day one.', 'Una guia breu per evitar-los des del primer dia.', 'Un guide bref pour les éviter dès le premier jour.'), 'err7'),
    (d('Abre una Microschool', 'Open a Microschool', 'Obre una Microschool', 'Ouvrir une Microschool'),
     d('El camino del socio, los requisitos y la solicitud como Entidad Colaboradora.', 'The partner journey, requirements and the application as a Partner Organization.', 'El camí del soci, els requisits i la sol·licitud com a Entitat Col·laboradora.', 'Le parcours du partenaire, les exigences et la candidature comme entité partenaire.'), 'open'),
    (d('Mentores y colaboradores', 'Mentors and collaborators', 'Mentors i col·laboradors', 'Mentors et collaborateurs'),
     d('¿Quieres acompañar estudiantes sin abrir una sede? Conoce cómo colaborar.', 'Want to walk with students without opening a site? See how to collaborate.', 'Vols acompanyar estudiants sense obrir una seu? Descobreix com col·laborar.', 'Envie d’accompagner des élèves sans ouvrir de site ? Découvrez comment collaborer.'), 'mentors'),
]

# ── /open-a-microschool/ ──
OPEN_TITLE = d('Cómo abrir una Microschool cristiana · Chanak', 'How to Open a Christian Microschool · Chanak', 'Com obrir una Microschool cristiana · Chanak', 'Comment ouvrir une Microschool chrétienne · Chanak')
OPEN_DESC = d(
    'Abre una Chanak Microschool (Partner Learning Center): tú aportas espacio y comunidad; Chanak, la acreditación MSA-CESS, el currículo y la formación.',
    'Open a Chanak Microschool (Partner Learning Center): you bring space and community; Chanak brings MSA-CESS accreditation, curriculum and training.',
    'Obre una Chanak Microschool (Partner Learning Center): tu aportes espai i comunitat; Chanak, l’acreditació MSA-CESS, el currículum 60/20/20 i la formació.',
    'Ouvrez une Chanak Microschool (Partner Learning Center) : vous apportez lieu et communauté ; Chanak, l’accréditation MSA-CESS et la formation.')
MS_TITLE = d('Microschool cristiana: aprender en comunidad · Chanak', 'Christian Microschool: Learning in Community · Chanak', 'Microschool cristiana: aprendre en comunitat · Chanak', 'Microschool chrétienne : apprendre en communauté · Chanak')
MS_DESC = d(
    'Grupos pequeños y presenciales con plan de estudios americano acreditado por MSA-CESS. Alianza para comunidades de 10 familias o más.',
    'Small in-person groups with an American curriculum accredited by MSA-CESS. A partnership for communities of 10 or more families.',
    'Grups petits i presencials amb pla d’estudis americà acreditat per MSA-CESS. Aliança per a comunitats d’10 famílies o més.',
    'Petits groupes en présentiel avec un programme américain accrédité MSA-CESS. Un partenariat pour des communautés de 10 familles ou plus.')
HERO_H1 = d('Abre una Chanak Microschool <em>(Partner Learning Center)</em> en tu ciudad', 'Open a Chanak Microschool <em>(Partner Learning Center)</em> in your city',
            'Obre una Chanak Microschool <em>(Partner Learning Center)</em> a la teva ciutat', 'Ouvrez une Chanak Microschool <em>(Partner Learning Center)</em> dans votre ville')
HERO_LEAD = d(
    'Tú aportas la visión local, el espacio y la comunidad; Chanak aporta la acreditación MSA-CESS, el currículo 60/20/20, el SIS, la formación de Guías y el acompañamiento en fondos ESA en los estados de EE. UU. donde Chanak es proveedor aprobado y solo para los servicios aprobados en cada programa (se revisa estado por estado).',
    'You bring the local vision, the space and the community; Chanak brings MSA-CESS accreditation, the 60/20/20 curriculum, the SIS, Guide training and support with ESA funds in the U.S. states where Chanak is an approved provider and only for the services approved in each program (reviewed state by state).',
    'Tu aportes la visió local, l’espai i la comunitat; Chanak aporta l’acreditació MSA-CESS, el currículum 60/20/20, el SIS, la formació de Guies i l’acompanyament en fons ESA als estats dels EUA on Chanak és proveïdor aprovat i només per als serveis aprovats en cada programa (es revisa estat per estat).',
    'Vous apportez la vision locale, le lieu et la communauté ; Chanak apporte l’accréditation MSA-CESS, le programme 60/20/20, le SIS, la formation des Guides et l’accompagnement pour les fonds ESA dans les États américains où Chanak est prestataire agréé et uniquement pour les services approuvés dans chaque programme (examiné État par État).')
HERO_CTA = d('Postular mi organización como Entidad Colaboradora →', 'Apply as a Partner Organization →', 'Postular la meva organització com a Entitat Col·laboradora →', 'Postuler comme entité partenaire →')
HERO_CTA2 = d('Test de compatibilidad (2 min) ↓', 'Compatibility test (2 min) ↓', 'Test de compatibilitat (2 min) ↓', 'Test de compatibilité (2 min) ↓')
ESA_CARD = (
    d('Acompañamiento en fondos ESA (EE. UU.)', 'Support with ESA funds (U.S.)', 'Acompanyament en fons ESA (EUA)', 'Accompagnement pour les fonds ESA (USA)'),
    d('En los estados de EE. UU. donde Chanak es proveedor aprobado, las familias pueden solicitar el uso de sus fondos ESA para los servicios aprobados en cada programa. La elegibilidad y cada autorización las decide el programa de cada estado.',
      'In the U.S. states where Chanak is an approved provider, families may request the use of their ESA funds for the services approved in each program. Eligibility and each authorization are decided by each state’s program.',
      'Als estats dels EUA on Chanak és proveïdor aprovat, les famílies poden sol·licitar l’ús dels seus fons ESA per als serveis aprovats en cada programa. L’elegibilitat i cada autorització les decideix el programa de cada estat.',
      'Dans les États américains où Chanak est prestataire agréé, les familles peuvent demander l’utilisation de leurs fonds ESA pour les services approuvés dans chaque programme. L’éligibilité et chaque autorisation relèvent du programme de chaque État.'))
WHY_EXTRA = d(
    'Trabajas con respaldo institucional MSA-CESS, la plataforma SIS, la certificación obligatoria de Guías y Coordinadores y autonomía local para fijar la cuota de tus familias. Cada sede es un Microschool asociado (Partner Learning Center) bajo la supervisión académica centralizada de Chanak TrainUp Education, Inc. (FLDOE #134620, Acreditada por MSA-CESS).',
    'You work with MSA-CESS institutional backing, the SIS platform, mandatory certification of Guides and Coordinators, and local autonomy to set your families’ tuition. Each site is a partner Microschool (Partner Learning Center) under the centralized academic supervision of Chanak TrainUp Education, Inc. (FLDOE #134620, Accredited by MSA-CESS).',
    'Treballes amb aval institucional MSA-CESS, la plataforma SIS, la certificació obligatòria de Guies i Coordinadors i autonomia local per fixar la quota de les teves famílies. Cada seu és un Microschool associat (Partner Learning Center) sota la supervisió acadèmica centralitzada de Chanak TrainUp Education, Inc. (FLDOE #134620, Acreditada per MSA-CESS).',
    'Vous travaillez avec le soutien institutionnel MSA-CESS, la plateforme SIS, la certification obligatoire des Guides et Coordinateurs et l’autonomie locale pour fixer la contribution de vos familles. Chaque site est une Microschool partenaire (Partner Learning Center) sous la supervision académique centralisée de Chanak TrainUp Education, Inc. (FLDOE #134620, Accréditée par MSA-CESS).')

STEPS_EYE = d('Paso a paso', 'Step by step', 'Pas a pas', 'Étape par étape')
STEPS_H2 = d('El camino del socio en 7 pasos', 'The partner journey in 7 steps', 'El camí del soci en 7 passos', 'Le parcours du partenaire en 7 étapes')
STEPS_LEAD = d('De la primera conversación a la apertura, con acompañamiento en cada etapa.', 'From the first conversation to opening day, with support at every stage.', 'De la primera conversa a l’obertura, amb acompanyament a cada etapa.', 'Du premier échange à l’ouverture, avec un accompagnement à chaque étape.')
STEPS = [
    (d('Filtro inicial', 'Initial screening', 'Filtre inicial', 'Premier filtre'),
     d('Test rápido de compatibilidad y llamada de 20 minutos.', 'A quick compatibility test and a 20-minute call.', 'Test ràpid de compatibilitat i trucada de 20 minuts.', 'Un test rapide de compatibilité et un appel de 20 minutes.')),
    (d('Entrevista y revisión', 'Interview and review', 'Entrevista i revisió', 'Entretien et examen'),
     d('Entrevista, revisión de instalaciones y verificación de antecedentes.', 'Interview, facilities review and background checks.', 'Entrevista, revisió d’instal·lacions i verificació d’antecedents.', 'Entretien, examen des locaux et vérification des antécédents.')),
    (d('Firma legal', 'Legal agreement', 'Signatura legal', 'Signature juridique'),
     d('Acuerdo Marco Internacional y anexos de sede y país.', 'International Framework Agreement and site and country annexes.', 'Acord Marc Internacional i annexos de seu i país.', 'Accord-cadre international et annexes de site et de pays.')),
    (d('Cuota de incorporación de la sede', 'Site onboarding fee', 'Quota d’incorporació de la seu', 'Frais d’intégration du site'),
     d('Se detalla por escrito en tu propuesta de alianza.', 'Detailed in writing in your partnership proposal.', 'Es detalla per escrit a la teva proposta d’aliança.', 'Détaillés par écrit dans votre proposition de partenariat.')),
    (d('Certificación de Guías y Coordinadores', 'Certification of Guides and Coordinators', 'Certificació de Guies i Coordinadors', 'Certification des Guides et Coordinateurs'),
     d('Formación obligatoria en el SIS, Mastery Learning y el modelo 60/20/20.', 'Mandatory training in the SIS, Mastery Learning and the 60/20/20 model.', 'Formació obligatòria en el SIS, Mastery Learning i el model 60/20/20.', 'Formation obligatoire au SIS, au Mastery Learning et au modèle 60/20/20.')),
    (d('Trámites, licencias e inspecciones locales', 'Local procedures, licences and inspections', 'Tràmits, llicències i inspeccions locals', 'Démarches, licences et inspections locales'),
     d('Por ejemplo, la autorización como centro extranjero (RD 806/1993) en España, o los permisos municipales y de seguridad contra incendios en Latinoamérica.', 'For example, authorization as a foreign school (RD 806/1993) in Spain, or municipal and fire-safety permits in Latin America.', 'Per exemple, l’autorització com a centre estranger (RD 806/1993) a Espanya, o els permisos municipals i de seguretat contra incendis a Llatinoamèrica.', 'Par exemple, l’autorisation comme établissement étranger (RD 806/1993) en Espagne, ou les permis municipaux et de sécurité incendie en Amérique latine.')),
    (d('Apertura oficial', 'Official opening', 'Obertura oficial', 'Ouverture officielle'),
     d('Con tu comunidad de familias comprometidas (10 o más) y la visita de validación de Chanak.', 'With your community of committed families (10 or more) and Chanak’s validation visit.', 'Amb la teva comunitat de famílies compromeses (10 o més) i la visita de validació de Chanak.', 'Avec votre communauté de familles engagées (10 ou plus) et la visite de validation de Chanak.')),
]

KIT_EYE = d('Descarga gratuita', 'Free download', 'Descàrrega gratuïta', 'Téléchargement gratuit')
KIT_H2 = d('Kit del fundador', 'Founder’s kit', 'Kit del fundador', 'Kit du fondateur')
KIT_P = d('Dos herramientas para empezar con buen pie: la calculadora de presupuesto y punto de equilibrio, y la guía «7 errores al abrir una Microschool».',
          'Two tools to start well: the budget and break-even calculator, and the guide “7 mistakes when opening a Microschool”.',
          'Dues eines per començar amb bon peu: la calculadora de pressupost i punt d’equilibri, i la guia «7 errors en obrir una Microschool».',
          'Deux outils pour bien démarrer : le calculateur de budget et de seuil de rentabilité, et le guide « 7 erreurs à l’ouverture d’une Microschool ».')
KIT_F = dict(
    org=d('Nombre de la entidad legal', 'Name of the legal entity', 'Nom de l’entitat legal', 'Nom de l’entité juridique'),
    country=d('País', 'Country', 'País', 'Pays'), city=d('Ciudad', 'City', 'Ciutat', 'Ville'),
    name=d('Nombre del representante', 'Representative’s name', 'Nom del representant', 'Nom du représentant'),
    email=d('Correo electrónico', 'Email', 'Correu electrònic', 'E-mail'),
    cap=d('Capacidad estimada (estudiantes)', 'Estimated capacity (students)', 'Capacitat estimada (estudiants)', 'Capacité estimée (élèves)'),
    send=d('Recibir el kit →', 'Get the kit →', 'Rebre el kit →', 'Recevoir le kit →'),
    ok_h=d('Gracias. Aquí tienes tu kit', 'Thank you. Here is your kit', 'Gràcies. Aquí tens el teu kit', 'Merci. Voici votre kit'),
    ok_p=d('También te escribiremos para ofrecerte una conversación de alianza.', 'We will also write to offer you a partnership conversation.', 'També t’escriurem per oferir-te una conversa d’aliança.', 'Nous vous écrirons aussi pour vous proposer un échange de partenariat.'),
    xlsx=d('Hoja de cálculo (Excel, en español)', 'Spreadsheet (Excel, in Spanish)', 'Full de càlcul (Excel, en castellà)', 'Feuille de calcul (Excel, en espagnol)'),
)

FAQ_H2 = d('Preguntas frecuentes de socios', 'Partner FAQ', 'Preguntes freqüents de socis', 'Questions fréquentes des partenaires')
FAQ = [
    (d('¿Quién puede abrir una Chanak Microschool?', 'Who can open a Chanak Microschool?', 'Qui pot obrir una Chanak Microschool?', 'Qui peut ouvrir une Chanak Microschool ?'),
     d('Iglesias, cooperativas, educadores y organizaciones con entidad legal que ya reúnen a una comunidad de familias (10 o más), en Estados Unidos o en otros países. Las familias individuales entran por Homeschool Guiado o Dual Diploma.',
       'Churches, co-ops, educators and organizations with a legal entity that already gather a community of families (10 or more), in the United States or in other countries. Individual families join through Guided Homeschool or Dual Diploma.',
       'Esglésies, cooperatives, educadors i organitzacions amb entitat legal que ja reuneixen una comunitat de famílies (10 o més), als Estats Units o en altres països. Les famílies individuals entren per Homeschool Guiat o Dual Diploma.',
       'Les églises, coopératives, éducateurs et organisations dotés d’une entité juridique qui réunissent déjà une communauté de familles (10 ou plus), aux États-Unis ou ailleurs. Les familles individuelles passent par Homeschool guidé ou Dual Diploma.')),
    (d('¿La Microschool queda acreditada?', 'Is the Microschool itself accredited?', 'La Microschool queda acreditada?', 'La Microschool est-elle elle-même accréditée ?'),
     d('No de forma independiente. La acreditación MSA-CESS es de Chanak International Academy y respalda los expedientes y diplomas que emite la escuela. Cada sede es un Microschool asociado (Partner Learning Center) que se valida y supervisa.',
       'Not independently. MSA-CESS accreditation belongs to Chanak International Academy and backs the records and diplomas issued by the school. Each site is a partner Microschool (Partner Learning Center) that is validated and supervised.',
       'No de manera independent. L’acreditació MSA-CESS és de Chanak International Academy i avala els expedients i diplomes que emet l’escola. Cada seu és un Microschool associat (Partner Learning Center) que es valida i se supervisa.',
       'Pas de manière indépendante. L’accréditation MSA-CESS appartient à Chanak International Academy et couvre les dossiers et diplômes délivrés par l’école. Chaque site est une Microschool partenaire (Partner Learning Center), validée et supervisée.')),
    (d('¿Cuánto cuesta la alianza?', 'How much does the partnership cost?', 'Quant costa l’aliança?', 'Combien coûte le partenariat ?'),
     d('Las condiciones económicas se entregan por escrito en la propuesta de alianza, según el país, el número de familias y los servicios. La cuota que pagan las familias la fija cada socio. Puedes estimar tu presupuesto con la calculadora.',
       'Financial terms are delivered in writing in the partnership proposal, according to country, number of families and services. The tuition families pay is set by each partner. You can estimate your budget with the calculator.',
       'Les condicions econòmiques es lliuren per escrit a la proposta d’aliança, segons el país, el nombre de famílies i els serveis. La quota que paguen les famílies la fixa cada soci. Pots estimar el teu pressupost amb la calculadora.',
       'Les conditions financières sont remises par écrit dans la proposition de partenariat, selon le pays, le nombre de familles et les services. La contribution des familles est fixée par chaque partenaire. Vous pouvez estimer votre budget avec le calculateur.')),
    (d('¿Se pueden usar fondos ESA?', 'Can ESA funds be used?', 'Es poden fer servir fons ESA?', 'Peut-on utiliser des fonds ESA ?'),
     d('Solo en los estados de EE. UU. donde Chanak es proveedor aprobado y solo para los servicios aprobados en cada programa. La elegibilidad la decide cada estado; fuera de EE. UU. no existen fondos ESA.',
       'Only in the U.S. states where Chanak is an approved provider and only for the services approved in each program. Eligibility is decided by each state; ESA funds do not exist outside the U.S.',
       'Només als estats dels EUA on Chanak és proveïdor aprovat i només per als serveis aprovats en cada programa. L’elegibilitat la decideix cada estat; fora dels EUA no hi ha fons ESA.',
       'Uniquement dans les États américains où Chanak est prestataire agréé et uniquement pour les services approuvés dans chaque programme. L’éligibilité relève de chaque État ; les fonds ESA n’existent pas hors des États-Unis.')),
    (d('¿Chanak tramita las autorizaciones de mi país?', 'Does Chanak handle my country’s authorizations?', 'Chanak tramita les autoritzacions del meu país?', 'Chanak gère-t-elle les autorisations de mon pays ?'),
     d('No. El socio es responsable de sus licencias, instalaciones y personal. Chanak orienta y acompaña, pero no sustituye el asesoramiento legal local ni garantiza autorizaciones, códigos de centro ni fondos públicos.',
       'No. The partner is responsible for its licences, facilities and staff. Chanak guides and accompanies you, but does not replace local legal advice and does not guarantee authorizations, school codes or public funds.',
       'No. El soci és responsable de les seves llicències, instal·lacions i personal. Chanak orienta i acompanya, però no substitueix l’assessorament legal local ni garanteix autoritzacions, codis de centre ni fons públics.',
       'Non. Le partenaire est responsable de ses licences, de ses locaux et de son personnel. Chanak oriente et accompagne, mais ne remplace pas le conseil juridique local et ne garantit ni autorisations, ni codes d’établissement, ni fonds publics.')),
]
PRIV = d('Acepto la <a href="{priv}">política de privacidad</a> y que Chanak me contacte sobre esta solicitud.', 'I accept the <a href="{priv}">privacy policy</a> and agree to be contacted by Chanak about this request.',
         'Accepto la <a href="{priv}">política de privadesa</a> i que Chanak em contacti sobre aquesta sol·licitud.', 'J’accepte la <a href="{priv}">politique de confidentialité</a> et d’être contacté par Chanak au sujet de cette demande.')
FORM_MSG = dict(sending=d('Enviando…', 'Sending…', 'Enviant…', 'Envoi…'),
                err=d('No se pudo enviar. Escríbenos a administration@chanakacademy.org.', 'Could not send. Please email administration@chanakacademy.org.', 'No s’ha pogut enviar. Escriu-nos a administration@chanakacademy.org.', 'Envoi impossible. Écrivez-nous à administration@chanakacademy.org.'))
CRUMB_MS = d('Microschools', 'Microschools', 'Microschools', 'Microschools')
CRUMB_OPEN = d('Abre una Microschool', 'Open a Microschool', 'Obre una Microschool', 'Ouvrir une Microschool')


# ── Condiciones de la alianza (decisión institucional: contratación directa con Chanak) ──
COND_EYE = d('Contratación directa', 'Direct contracting', 'Contractació directa', 'Contractualisation directe')
COND_H2 = d('Una alianza directa con Chanak', 'A partnership directly with Chanak', 'Una aliança directa amb Chanak', 'Un partenariat direct avec Chanak')
COND_LEAD = d('Todas las alianzas comerciales y académicas se firman directamente con Chanak International Academy, operada por Chanak TrainUp Education, Inc., tanto en Microschools USA como en International Microschools.',
              'All commercial and academic partnerships are signed directly with Chanak International Academy, operated by Chanak TrainUp Education, Inc., both for Microschools USA and for International Microschools.',
              'Totes les aliances comercials i acadèmiques se signen directament amb Chanak International Academy, operada per Chanak TrainUp Education, Inc., tant a Microschools USA com a International Microschools.',
              'Tous les partenariats commerciaux et académiques sont signés directement avec Chanak International Academy, gérée par Chanak TrainUp Education, Inc., aussi bien pour Microschools USA que pour International Microschools.')
COND = [
    (d('Mínimo de lanzamiento', 'Launch minimum', 'Mínim de llançament', 'Minimum de lancement'),
     d('10 familias comprometidas.', '10 committed families.', '10 famílies compromeses.', '10 familles engagées.')),
    (d('Contrato de alianza', 'Partnership agreement', 'Contracte d’aliança', 'Contrat de partenariat'),
     d('Por escrito y directamente con Chanak.', 'In writing and directly with Chanak.', 'Per escrit i directament amb Chanak.', 'Par écrit et directement avec Chanak.')),
    (d('Responsabilidad del operador local', 'Local operator’s responsibility', 'Responsabilitat de l’operador local', 'Responsabilité de l’opérateur local'),
     d('Instalaciones, personal presencial y autorizaciones locales.', 'Facilities, in-person staff and local authorizations.', 'Instal·lacions, personal presencial i autoritzacions locals.', 'Locaux, personnel en présentiel et autorisations locales.')),
    (d('Qué aporta Chanak', 'What Chanak provides', 'Què aporta Chanak', 'Ce qu’apporte Chanak'),
     d('Los servicios académicos y tecnológicos establecidos en el acuerdo.', 'The academic and technology services set out in the agreement.', 'Els serveis acadèmics i tecnològics establerts a l’acord.', 'Les services académiques et technologiques prévus dans l’accord.')),
    (d('Certificación de Guías', 'Guide certification', 'Certificació de Guies', 'Certification des Guides'),
     d('Formación inicial obligatoria; la certificación exige completarla y superar la evaluación. La duración se confirma en el acuerdo.', 'Mandatory initial training; certification requires completing it and passing the assessment. Its length is confirmed in the agreement.', 'Formació inicial obligatòria; la certificació exigeix completar-la i superar l’avaluació. La durada es confirma a l’acord.', 'Formation initiale obligatoire ; la certification exige de la suivre et de réussir l’évaluation. Sa durée est confirmée dans l’accord.')),
    (d('Condiciones económicas', 'Financial terms', 'Condicions econòmiques', 'Conditions financières'),
     d('Se determinan según el país, el programa y los servicios contratados, y se entregan por escrito en la propuesta de alianza.', 'They are set according to the country, the program and the services contracted, and delivered in writing in the partnership proposal.', 'Es determinen segons el país, el programa i els serveis contractats, i es lliuren per escrit a la proposta d’aliança.', 'Elles sont fixées selon le pays, le programme et les services contractés, et remises par écrit dans la proposition de partenariat.')),
    (d('Acreditación', 'Accreditation', 'Acreditació', 'Accréditation'),
     d('La acreditación MSA-CESS es de Chanak International Academy y respalda los expedientes y diplomas que emite Chanak. No se extiende automáticamente a centros independientes: cada implementación se valida y supervisa.', 'MSA-CESS accreditation belongs to Chanak International Academy and backs the records and diplomas issued by Chanak. It does not automatically extend to independent centers: each implementation is validated and supervised.', 'L’acreditació MSA-CESS és de Chanak International Academy i avala els expedients i diplomes que emet Chanak. No s’estén automàticament a centres independents: cada implementació es valida i se supervisa.', 'L’accréditation MSA-CESS appartient à Chanak International Academy et couvre les dossiers et diplômes délivrés par Chanak. Elle ne s’étend pas automatiquement aux centres indépendants : chaque mise en œuvre est validée et supervisée.')),
]


# ── Cómo pagan las familias: fondos aprobados (ESA) o pago directo ──
def d5(es, en, ca, fr, pt):
    return dict(es=es, en=en, ca=ca, fr=fr, pt=pt)


PAGO_EYE = d5('Cómo pagan las familias', 'How families pay', 'Com paguen les famílies', 'Comment les familles paient', 'Como as famílias pagam')
PAGO_H2 = d5('Con fondos aprobados o con pago directo', 'With approved funds or by direct payment', 'Amb fons aprovats o amb pagament directe', 'Avec des fonds approuvés ou par paiement direct', 'Com fundos aprovados ou com pagamento direto')
PAGO_LEAD = d5('La forma de pago depende del país y de si tu estado ofrece un programa de elección escolar elegible. Cada familia confirma su caso antes de matricularse.',
               'How you pay depends on the country and on whether your state offers an eligible school-choice program. Each family confirms its case before enrolling.',
               'La forma de pagament depèn del país i de si el teu estat ofereix un programa d’elecció escolar elegible. Cada família confirma el seu cas abans de matricular-se.',
               'Le mode de paiement dépend du pays et de la possibilité, dans votre État, d’un programme de choix scolaire éligible. Chaque famille confirme sa situation avant de s’inscrire.',
               'A forma de pagamento depende do país e de o seu estado oferecer um programa de escolha escolar elegível. Cada família confirma o seu caso antes de se matricular.')
PAGO = [
    (d5('Microschool en EE. UU. con fondos aprobados', 'U.S. Microschool with approved funds', 'Microschool als EUA amb fons aprovats', 'Microschool aux États-Unis avec des fonds approuvés', 'Microschool nos EUA com fundos aprovados'),
     d5('Si tu estado tiene un programa ESA elegible y aprueba el servicio, la familia puede pagar con esos fondos. Chanak es proveedor aprobado en Alabama, Arizona, Florida, New Hampshire, Carolina del Sur, Utah y Wyoming. La familia elige Homeschool Guiado con apoyo presencial o Full Enrollment, y el SIS registra el programa de cada alumno.',
        'If your state has an eligible ESA program and approves the service, the family can pay with those funds. Chanak is an approved provider in Alabama, Arizona, Florida, New Hampshire, South Carolina, Utah and Wyoming. The family chooses Guided Homeschool with in-person support or Full Enrollment, and the SIS records each student’s program.',
        'Si el teu estat té un programa ESA elegible i aprova el servei, la família pot pagar amb aquests fons. Chanak és proveïdor aprovat a Alabama, Arizona, Florida, New Hampshire, Carolina del Sud, Utah i Wyoming. La família tria Homeschool Guiat amb suport presencial o Full Enrollment, i el SIS registra el programa de cada alumne.',
        'Si votre État dispose d’un programme ESA éligible et approuve le service, la famille peut payer avec ces fonds. Chanak est prestataire agréé en Alabama, Arizona, Floride, New Hampshire, Caroline du Sud, Utah et Wyoming. La famille choisit Homeschool guidé avec soutien en présentiel ou Full Enrollment, et le SIS enregistre le programme de chaque élève.',
        'Se o seu estado tem um programa ESA elegível e aprova o serviço, a família pode pagar com esses fundos. A Chanak é provedora aprovada no Alabama, Arizona, Flórida, New Hampshire, Carolina do Sul, Utah e Wyoming. A família escolhe Homeschool Guiado com apoio presencial ou Full Enrollment, e o SIS registra o programa de cada aluno.')),
    (d5('Sin fondos estatales e International Microschools', 'Without state funds, and International Microschools', 'Sense fons estatals i International Microschools', 'Sans fonds d’État et International Microschools', 'Sem fundos estaduais e International Microschools'),
     d5('Las familias que no usan fondos estatales, y todas las de International Microschools, pagan directamente la cuota de la Microschool. La fija el operador local y se confirma por escrito antes de la matrícula.',
        'Families who do not use state funds, and all families in International Microschools, pay the Microschool tuition directly. The local operator sets it and it is confirmed in writing before enrollment.',
        'Les famílies que no fan servir fons estatals, i totes les d’International Microschools, paguen directament la quota de la Microschool. La fixa l’operador local i es confirma per escrit abans de la matrícula.',
        'Les familles qui n’utilisent pas de fonds d’État, et toutes celles des International Microschools, paient directement les frais de la Microschool. L’opérateur local les fixe et ils sont confirmés par écrit avant l’inscription.',
        'As famílias que não usam fundos estaduais, e todas as das International Microschools, pagam diretamente a mensalidade da Microschool. Ela é definida pelo operador local e confirmada por escrito antes da matrícula.')),
    (d5('Qué cubren los fondos y qué no', 'What the funds cover and what they do not', 'Què cobreixen els fons i què no', 'Ce que couvrent les fonds et ce qu’ils ne couvrent pas', 'O que os fundos cobrem e o que não cobrem'),
     d5('Los fondos ESA se aplican solo a los servicios educativos aprobados por el programa del estado: no son un derecho automático. Las instalaciones y las autorizaciones locales siguen siendo responsabilidad del operador. La elegibilidad, el importe y cada compra los decide el programa de cada estado.',
        'ESA funds apply only to educational services approved by the state program; they are not an automatic entitlement. Facilities and local authorizations remain the operator’s responsibility. Eligibility, the amount and each purchase are decided by each state’s program.',
        'Els fons ESA només s’apliquen als serveis educatius aprovats pel programa de l’estat: no són un dret automàtic. Les instal·lacions i les autoritzacions locals continuen sent responsabilitat de l’operador. L’elegibilitat, l’import i cada compra els decideix el programa de cada estat.',
        'Les fonds ESA ne s’appliquent qu’aux services éducatifs approuvés par le programme de l’État : ils ne constituent pas un droit automatique. Les locaux et les autorisations locales restent de la responsabilité de l’opérateur. L’éligibilité, le montant et chaque achat relèvent du programme de chaque État.',
        'Os fundos ESA aplicam-se apenas aos serviços educacionais aprovados pelo programa do estado: não são um direito automático. As instalações e as autorizações locais continuam sob responsabilidade do operador. A elegibilidade, o valor e cada compra são decididos pelo programa de cada estado.')),
]
PAGO_LINK = d5('Ver los fondos ESA por estado →', 'See ESA funds by state →', 'Veure els fons ESA per estat →', 'Voir les fonds ESA par État →', 'Ver os fundos ESA por estado →')


# ── Calidad y supervisión continua (del modelo de red: datos de dominio en el SIS, asistencia, encuestas, revisión anual, protección del menor) ──
CAL_EYE = d5('Calidad', 'Quality', 'Qualitat', 'Qualité', 'Qualidade')
CAL_H2 = d5('Supervisión continua de cada sede', 'Ongoing oversight of every site', 'Supervisió contínua de cada seu', 'Suivi continu de chaque site', 'Supervisão contínua de cada unidade')
CAL_LEAD = d5('Cada Microschool opera bajo supervisión de Chanak y rinde cuentas con datos, no solo con visitas.',
              'Every Microschool operates under Chanak’s oversight and is accountable with data, not just visits.',
              'Cada Microschool opera sota la supervisió de Chanak i en rendeix comptes amb dades, no només amb visites.',
              'Chaque Microschool fonctionne sous la supervision de Chanak et rend des comptes par des données, pas seulement par des visites.',
              'Cada Microschool opera sob a supervisão da Chanak e presta contas com dados, não apenas com visitas.')
CAL = [
    (d5('Dominio por objetivo', 'Mastery by objective', 'Domini per objectiu', 'Maîtrise par objectif', 'Domínio por objetivo'),
     d5('Los datos de dominio de cada estudiante se registran en el SIS según su plan individual (umbral del 80 %).', 'Each student’s mastery data is recorded in the SIS against their individual plan (80% threshold).', 'Les dades de domini de cada estudiant es registren al SIS segons el seu pla individual (llindar del 80 %).', 'Les données de maîtrise de chaque élève sont enregistrées dans le SIS selon son plan individuel (seuil de 80 %).', 'Os dados de domínio de cada estudante são registrados no SIS conforme o seu plano individual (limite de 80 %).')),
    (d5('Asistencia y familias', 'Attendance and families', 'Assistència i famílies', 'Assiduité et familles', 'Frequência e famílias'),
     d5('Seguimiento de asistencia y encuesta a las familias para detectar a tiempo lo que hay que mejorar.', 'Attendance tracking and family surveys to spot in time what needs improving.', 'Seguiment d’assistència i enquesta a les famílies per detectar a temps què cal millorar.', 'Suivi de l’assiduité et enquête auprès des familles pour repérer à temps ce qu’il faut améliorer.', 'Acompanhamento da frequência e pesquisa com as famílias para detectar a tempo o que precisa melhorar.')),
    (d5('Revisión anual y mejora', 'Annual review and improvement', 'Revisió anual i millora', 'Revue annuelle et amélioration', 'Revisão anual e melhoria'),
     d5('Revisión anual de cada sede y plan de mejora cuando haga falta; Chanak puede suspender la actividad si no se cumplen los requisitos.', 'Annual review of each site and an improvement plan when needed; Chanak may suspend activity if requirements are not met.', 'Revisió anual de cada seu i pla de millora quan calgui; Chanak pot suspendre l’activitat si no es compleixen els requisits.', 'Revue annuelle de chaque site et plan d’amélioration si nécessaire ; Chanak peut suspendre l’activité si les exigences ne sont pas respectées.', 'Revisão anual de cada unidade e plano de melhoria quando necessário; a Chanak pode suspender a atividade se os requisitos não forem cumpridos.')),
    (d5('Protección del menor', 'Child safeguarding', 'Protecció del menor', 'Protection de l’enfant', 'Proteção da criança'),
     d5('Verificación de antecedentes según la ley de cada país, certificación de Guías y protocolo de protección con responsable designado.', 'Background checks under each country’s law, Guide certification and a safeguarding protocol with a designated lead.', 'Verificació d’antecedents segons la llei de cada país, certificació de Guies i protocol de protecció amb responsable designat.', 'Vérification des antécédents selon la loi de chaque pays, certification des Guides et protocole de protection avec un responsable désigné.', 'Verificação de antecedentes conforme a lei de cada país, certificação de Guias e protocolo de proteção com responsável designado.')),
]


# Português (overlay en tools/pt_ms.py): añade la clave 'pt' a los textos anteriores sin tocar las llamadas d(es,en,ca,fr).
import sys as _sys
import pt_ms as _pt_ms
_pt_ms.apply(_sys.modules[__name__])
