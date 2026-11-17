# -*- coding: utf-8 -*-
"""Guía original de Chanak: «7 errores que cuestan una Microschool (y cómo evitarlos desde el primer día)». ES, EN, CA, FR."""


def d(es, en, ca, fr):
    return dict(es=es, en=en, ca=ca, fr=fr)


URL = d('/microschools/7-errores/', '/en/microschools/7-mistakes/', '/ca/microschools/7-errors/', '/fr/microschools/7-erreurs/')
TITLE = d('7 errores al abrir una Microschool cristiana · Chanak', '7 Mistakes When Opening a Christian Microschool · Chanak', '7 errors en obrir una Microschool cristiana · Chanak', '7 erreurs à l’ouverture d’une Microschool · Chanak')
DESC = d('Guía para fundadores de una microschool cristiana en España y Latinoamérica: los 7 errores que más cuestan y cómo evitarlos desde el primer día.',
         'A guide for founders of a Christian microschool: the 7 mistakes that cost the most and how to avoid them from day one.',
         'Guia per a fundadors d’una microschool cristiana: els 7 errors que més costen i com evitar-los des del primer dia.',
         'Guide pour les fondateurs d’une microschool chrétienne : les 7 erreurs les plus coûteuses et comment les éviter dès le premier jour.')
H1 = d('7 errores que cuestan una Microschool (y cómo evitarlos desde el primer día)', '7 mistakes that cost a Microschool (and how to avoid them from day one)',
       '7 errors que costen una Microschool (i com evitar-los des del primer dia)', '7 erreurs qui coûtent une Microschool (et comment les éviter dès le premier jour)')
LEAD = d('Abrir una Microschool es un acto de fe y también de responsabilidad. Esta guía reúne lo que más ayuda a que una comunidad pequeña nazca sana y se sostenga, ordenado según los tres pilares de Chanak.',
         'Opening a Microschool is an act of faith and also of responsibility. This guide gathers what most helps a small community start healthy and stay sustainable, organized around Chanak’s three pillars.',
         'Obrir una Microschool és un acte de fe i també de responsabilitat. Aquesta guia recull el que més ajuda que una comunitat petita neixi sana i se sostingui, ordenat segons els tres pilars de Chanak.',
         'Ouvrir une Microschool est un acte de foi, mais aussi de responsabilité. Ce guide rassemble ce qui aide le plus une petite communauté à naître saine et à durer, selon les trois piliers de Chanak.')
FIX = d('Cómo evitarlo', 'How to avoid it', 'Com evitar-ho', 'Comment l’éviter')
ERR = [
    (d('Empezar por el «qué» y no por el «porqué»', 'Starting with the “what” instead of the “why”', 'Començar pel «què» i no pel «perquè»', 'Commencer par le « quoi » plutôt que par le « pourquoi »'),
     d('Es tentador empezar eligiendo mesas, horarios y libros. Pero una comunidad que no sabe para qué existe se dispersa ante la primera dificultad.',
       'It is tempting to begin by choosing tables, schedules and books. But a community that does not know why it exists scatters at the first difficulty.',
       'És temptador començar triant taules, horaris i llibres. Però una comunitat que no sap per a què existeix es dispersa davant la primera dificultat.',
       'Il est tentant de commencer par choisir des tables, des horaires et des livres. Mais une communauté qui ignore pourquoi elle existe se disperse à la première difficulté.'),
     d('Escribe en una frase tu misión y la cosmovisión que la sostiene. Compártela con las primeras familias y deja que guíe cada decisión posterior.',
       'Write your mission and the worldview behind it in one sentence. Share it with your first families and let it guide every later decision.',
       'Escriu en una frase la teva missió i la cosmovisió que la sosté. Comparteix-la amb les primeres famílies i deixa que guiï cada decisió posterior.',
       'Écrivez en une phrase votre mission et la vision du monde qui la porte. Partagez-la avec les premières familles et laissez-la guider chaque décision.')),
    (d('Querer servir a todos', 'Trying to serve everyone', 'Voler servir tothom', 'Vouloir servir tout le monde'),
     d('Un mensaje para todos no le habla a nadie. Sin un perfil claro, cada familia espera algo distinto y el equipo se agota intentando contentarlas.',
       'A message for everyone speaks to no one. Without a clear profile, each family expects something different and the team wears out trying to please them all.',
       'Un missatge per a tothom no parla a ningú. Sense un perfil clar, cada família espera una cosa diferent i l’equip s’esgota intentant acontentar-les.',
       'Un message pour tous ne parle à personne. Sans profil clair, chaque famille attend autre chose et l’équipe s’épuise à vouloir les satisfaire.'),
     d('Describe a tu comunidad: sus valores, sus metas y lo que hoy no encuentra. El mínimo de lanzamiento de una Chanak Microschool es de 10 familias que ya confían en ti.',
       'Describe your community: its values, goals and what it cannot find today. The launch minimum for a Chanak Microschool is 10 families who already trust you.',
       'Descriu la teva comunitat: els seus valors, les seves metes i el que avui no troba. El mínim de llançament d’una Chanak Microschool és de 10 famílies que ja confien en tu.',
       'Décrivez votre communauté : ses valeurs, ses objectifs et ce qu’elle ne trouve pas aujourd’hui. Le minimum de lancement d’une Chanak Microschool est de 10 familles qui vous font déjà confiance.')),
    (d('Dejar el marco legal para el final', 'Leaving the legal framework for last', 'Deixar el marc legal per al final', 'Laisser le cadre légal pour la fin'),
     d('Cada país tiene sus requisitos para abrir un espacio con menores y para reconocer los estudios. Descubrirlos después de firmar o de cobrar sale caro.',
       'Each country has its own requirements for opening a space with minors and for recognizing studies. Discovering them after signing or charging is costly.',
       'Cada país té els seus requisits per obrir un espai amb menors i per reconèixer els estudis. Descobrir-los després de signar o de cobrar surt car.',
       'Chaque pays a ses exigences pour ouvrir un lieu accueillant des mineurs et pour reconnaître les études. Les découvrir après avoir signé ou encaissé coûte cher.'),
     d('Resuelve primero la entidad legal, el registro y la autorización que pida tu país, con asesoría local. No firmes contratos ni cobres cuotas antes.',
       'First settle the legal entity, registration and whatever authorization your country requires, with local counsel. Do not sign contracts or charge tuition before then.',
       'Resol primer l’entitat legal, el registre i l’autorització que demani el teu país, amb assessoria local. No signis contractes ni cobris quotes abans.',
       'Réglez d’abord l’entité juridique, l’enregistrement et l’autorisation exigée par votre pays, avec un conseil local. Ne signez aucun contrat et n’encaissez rien avant.')),
    (d('Descuidar las instalaciones', 'Neglecting the facilities', 'Descuidar les instal·lacions', 'Négliger les locaux'),
     d('Un local bonito no es necesariamente un local apto. El uso permitido, la seguridad, la accesibilidad y los seguros son responsabilidad del socio.',
       'A pleasant space is not necessarily a suitable one. Permitted use, safety, accessibility and insurance are the partner’s responsibility.',
       'Un local bonic no és necessàriament un local apte. L’ús permès, la seguretat, l’accessibilitat i les assegurances són responsabilitat del soci.',
       'Un beau local n’est pas forcément un local conforme. L’usage autorisé, la sécurité, l’accessibilité et les assurances relèvent du partenaire.'),
     d('Antes de comprometerte, revisa la licencia de uso, la seguridad contra incendios, la accesibilidad, el aforo y el seguro de responsabilidad civil (Pilar B).',
       'Before committing, check the permitted use, fire safety, accessibility, capacity and liability insurance (Pillar B).',
       'Abans de comprometre’t, revisa la llicència d’ús, la seguretat contra incendis, l’accessibilitat, l’aforament i l’assegurança de responsabilitat civil (Pilar B).',
       'Avant de vous engager, vérifiez l’usage autorisé, la sécurité incendie, l’accessibilité, la capacité d’accueil et l’assurance responsabilité civile (Pilier B).')),
    (d('Contratar sin certificar', 'Hiring without certifying', 'Contractar sense certificar', 'Recruter sans certifier'),
     d('La buena voluntad no basta para acompañar a un grupo de estudiantes. Sin cualificación ni formación común, cada adulto enseña a su manera.',
       'Goodwill is not enough to walk with a group of students. Without qualifications and shared training, every adult teaches in a different way.',
       'La bona voluntat no n’hi ha prou per acompanyar un grup d’estudiants. Sense qualificació ni formació comuna, cada adult ensenya a la seva manera.',
       'La bonne volonté ne suffit pas pour accompagner un groupe d’élèves. Sans qualification ni formation commune, chaque adulte enseigne à sa façon.'),
     d('Asegura la cualificación y la verificación de antecedentes que exija tu país, y completa la certificación de Chanak antes de la primera clase (Pilar C).',
       'Secure the qualifications and background checks your country requires, and complete Chanak’s certification before the first class (Pillar C).',
       'Assegura la qualificació i la verificació d’antecedents que exigeixi el teu país, i completa la certificació de Chanak abans de la primera classe (Pilar C).',
       'Assurez les qualifications et la vérification des antécédents exigées par votre pays, et achevez la certification Chanak avant le premier cours (Pilier C).')),
    (d('Fijar la cuota por miedo y no actualizar el presupuesto', 'Setting tuition out of fear and never updating the budget', 'Fixar la quota per por i no actualitzar el pressupost', 'Fixer la contribution par peur et ne jamais actualiser le budget'),
     d('Una cuota demasiado baja para «llenar» deja a la escuela sin margen. Y un presupuesto que se hace una vez y se guarda deja de describir la realidad.',
       'Tuition set too low to “fill seats” leaves the school without margin. And a budget made once and filed away stops describing reality.',
       'Una quota massa baixa per «omplir» deixa l’escola sense marge. I un pressupost que es fa una vegada i es desa deixa de descriure la realitat.',
       'Une contribution trop basse pour « remplir » laisse l’école sans marge. Et un budget établi une fois puis rangé ne décrit plus la réalité.'),
     d('Calcula tu punto de equilibrio con la calculadora, fija la cuota con los números delante y revisa el presupuesto cada mes.',
       'Work out your break-even with the calculator, set tuition with the numbers in front of you and review the budget every month.',
       'Calcula el teu punt d’equilibri amb la calculadora, fixa la quota amb els números al davant i revisa el pressupost cada mes.',
       'Calculez votre seuil de rentabilité avec le calculateur, fixez la contribution chiffres en main et révisez le budget chaque mois.')),
    (d('Captar solo con anuncios y sin seguimiento', 'Recruiting only with ads and no follow-up', 'Captar només amb anuncis i sense seguiment', 'Recruter uniquement par la publicité, sans suivi'),
     d('Las familias no confían sus hijos a un anuncio, sino a personas. Sin seguimiento, el interés se enfría en pocos días.',
       'Families do not entrust their children to an ad, but to people. Without follow-up, interest cools within days.',
       'Les famílies no confien els seus fills a un anunci, sinó a persones. Sense seguiment, l’interès es refreda en pocs dies.',
       'Les familles ne confient pas leurs enfants à une publicité, mais à des personnes. Sans suivi, l’intérêt retombe en quelques jours.'),
     d('Pon las relaciones primero: encuentros pequeños, conversaciones reales y un registro sencillo de cada familia en tres pasos, Interés → Conversación → Compromiso.',
       'Put relationships first: small gatherings, real conversations and a simple record of each family in three steps, Interest → Conversation → Commitment.',
       'Posa les relacions primer: trobades petites, converses reals i un registre senzill de cada família en tres passos, Interès → Conversa → Compromís.',
       'Privilégiez la relation : petites rencontres, vraies conversations et un suivi simple de chaque famille en trois étapes, Intérêt → Conversation → Engagement.')),
]
CLOSE_H = d('No tienes que hacerlo solo', 'You do not have to do it alone', 'No ho has de fer sol', 'Vous n’avez pas à le faire seul')
CLOSE_P = d('Chanak aporta el Pilar A (plan de estudios acreditado) y te orienta en los otros dos. Tú aportas la comunidad, el espacio y el equipo.',
            'Chanak provides Pillar A (the accredited curriculum) and guides you on the other two. You bring the community, the space and the team.',
            'Chanak aporta el Pilar A (pla d’estudis acreditat) i t’orienta en els altres dos. Tu aportes la comunitat, l’espai i l’equip.',
            'Chanak apporte le Pilier A (le programme accrédité) et vous oriente pour les deux autres. Vous apportez la communauté, le lieu et l’équipe.')
CTA = d(('Usa la calculadora de presupuesto →', 'Solicita una conversación de alianza →'), ('Use the budget calculator →', 'Request a partnership conversation →'),
        ('Fes servir la calculadora de pressupost →', 'Sol·licita una conversa d’aliança →'), ('Utiliser le calculateur de budget →', 'Demander un échange de partenariat →'))
PRINT = d('Imprimir o guardar en PDF', 'Print or save as PDF', 'Imprimir o desar en PDF', 'Imprimer ou enregistrer en PDF')
FORM_H = d('Recibe la guía y hablemos de tu comunidad', 'Get the guide and let’s talk about your community', 'Rep la guia i parlem de la teva comunitat', 'Recevez le guide et parlons de votre communauté')
FORM_P = d('Déjanos tu correo y te escribiremos para ofrecerte una conversación de alianza, sin compromiso.', 'Leave your email and we will write to offer you a partnership conversation, with no commitment.',
           'Deixa’ns el teu correu i t’escriurem per oferir-te una conversa d’aliança, sense compromís.', 'Laissez-nous votre e-mail et nous vous écrirons pour vous proposer un échange de partenariat, sans engagement.')
F = dict(email=d('Correo electrónico', 'Email', 'Correu electrònic', 'E-mail'), country=d('País', 'Country', 'País', 'Pays'),
         size=d('Tamaño estimado de tu comunidad (familias)', 'Estimated size of your community (families)', 'Mida estimada de la teva comunitat (famílies)', 'Taille estimée de votre communauté (familles)'),
         send=d('Enviar →', 'Send →', 'Enviar →', 'Envoyer →'), ok_h=d('Gracias', 'Thank you', 'Gràcies', 'Merci'),
         ok_p=d('Hemos recibido tus datos. Te escribiremos pronto.', 'We have received your details. We will write soon.', 'Hem rebut les teves dades. T’escriurem aviat.', 'Nous avons bien reçu vos informations. Nous vous écrirons bientôt.'))
CRUMB = d('7 errores', '7 mistakes', '7 errors', '7 erreurs')
