# -*- coding: utf-8 -*-
"""Textos de la calculadora de presupuesto (ES, EN, CA, FR). Partidas tomadas de la hoja de cálculo original de Chanak."""


def d(es, en, ca, fr):
    return dict(es=es, en=en, ca=ca, fr=fr)


URL = d('/microschools/presupuesto/', '/en/microschools/budget/', '/ca/microschools/pressupost/', '/fr/microschools/budget/')
TITLE = d('Calculadora de presupuesto para Microschool · Chanak', 'Microschool Budget Calculator · Chanak', 'Calculadora de pressupost per a Microschool · Chanak', 'Calculateur de budget pour Microschool · Chanak')
DESC = d('Calcula la inversión inicial, el gasto mensual y el punto de equilibrio de tu Microschool, y descarga el previo normativo de tu país.',
         'Estimate your Microschool’s start-up investment, monthly costs and break-even point, and download your country’s regulatory preview. Free, no sign-up.',
         'Calcula la inversió inicial, la despesa mensual i el punt d’equilibri de la teva Microschool i descarrega el previ normatiu del teu país.',
         'Estimez l’investissement initial, les charges mensuelles et le seuil de rentabilité de votre Microschool, avec l’aperçu réglementaire de votre pays.')
H1 = d('Calculadora de presupuesto para tu Microschool', 'Budget calculator for your Microschool', 'Calculadora de pressupost per a la teva Microschool', 'Calculateur de budget pour votre Microschool')
LEAD = d('Una herramienta original de Chanak para fundadores: inversión inicial, gasto mensual, ingresos y punto de equilibrio. Los campos empiezan vacíos y nada de lo que escribas sale de tu navegador.',
         'An original Chanak tool for founders: start-up investment, monthly costs, income and break-even. Fields start empty and nothing you type leaves your browser.',
         'Una eina original de Chanak per a fundadors: inversió inicial, despesa mensual, ingressos i punt d’equilibri. Els camps comencen buits i res del que escriguis surt del teu navegador.',
         'Un outil original de Chanak pour les fondateurs : investissement initial, charges mensuelles, recettes et seuil de rentabilité. Les champs sont vides au départ et rien de ce que vous saisissez ne quitte votre navigateur.')
NOSCRIPT = d('La calculadora necesita JavaScript. También puedes descargar la hoja de cálculo.', 'The calculator needs JavaScript. You can also download the spreadsheet.', 'La calculadora necessita JavaScript. També pots descarregar el full de càlcul.', 'Le calculateur nécessite JavaScript. Vous pouvez aussi télécharger la feuille de calcul.')
TIPS_H = d('Consejos para presupuestar con cabeza', 'Tips for budgeting wisely', 'Consells per pressupostar amb seny', 'Conseils pour bien budgéter')
TIPS = [
    d('Empieza pequeño: comparte o cede espacio con una iglesia o comunidad.', 'Start small: share or borrow space from a church or community.', 'Comença petit: comparteix o cedeix espai amb una església o comunitat.', 'Commencez petit : partagez un lieu avec une église ou une communauté.'),
    d('Escalona la contratación del personal a medida que crece el grupo.', 'Stagger staff hiring as the group grows.', 'Esglaona la contractació del personal a mesura que creix el grup.', 'Échelonnez les recrutements à mesure que le groupe grandit.'),
    d('Fija la cuota con tu presupuesto en la mano, no por miedo a no llenar la escuela.', 'Set tuition with your budget in hand, not out of fear of empty seats.', 'Fixa la quota amb el pressupost a la mà, no per por de no omplir l’escola.', 'Fixez la contribution budget en main, et non par peur de ne pas remplir l’école.'),
    d('Revisa el presupuesto cada mes: un presupuesto que no se actualiza deja de servir.', 'Review the budget every month: a budget that is not updated stops being useful.', 'Revisa el pressupost cada mes: un pressupost que no s’actualitza deixa de servir.', 'Révisez le budget chaque mois : un budget non mis à jour ne sert plus.'),
    d('Procura un pequeño excedente a partir del tercer mes para crear una reserva.', 'Aim for a small surplus from the third month to build a reserve.', 'Procura un petit excedent a partir del tercer mes per crear una reserva.', 'Visez un petit excédent dès le troisième mois pour constituer une réserve.'),
]
FOOT = d('El resultado es una estimación del socio, no un compromiso de Chanak. No es una oferta ni asesoramiento legal o fiscal. Las condiciones de alianza con Chanak se entregan por escrito en la propuesta de alianza.',
         'The result is the partner’s own estimate, not a commitment by Chanak. It is not an offer or legal or tax advice. Chanak’s partnership terms are delivered in writing in the partnership proposal.',
         'El resultat és una estimació del soci, no un compromís de Chanak. No és una oferta ni assessorament legal o fiscal. Les condicions d’aliança amb Chanak es lliuren per escrit a la proposta d’aliança.',
         'Le résultat est une estimation du partenaire, non un engagement de Chanak. Ce n’est ni une offre ni un conseil juridique ou fiscal. Les conditions de partenariat avec Chanak sont remises par écrit dans la proposition de partenariat.')
NEXT = d(('Lee los 7 errores →', 'Solicitar una conversación de alianza →'), ('Read the 7 mistakes →', 'Request a partnership conversation →'), ('Llegeix els 7 errors →', 'Sol·licitar una conversa d’aliança →'), ('Lire les 7 erreurs →', 'Demander un échange de partenariat →'))
LOCALE = d('es-ES', 'en-US', 'ca-ES', 'fr-FR')

PA = d('A · Plan de estudios', 'A · Curriculum', 'A · Pla d’estudis', 'A · Programme')
PB = d('B · Instalaciones', 'B · Facilities', 'B · Instal·lacions', 'B · Locaux')
PC = d('C · Personal docente', 'C · Teaching staff', 'C · Personal docent', 'C · Personnel enseignant')
LEGAL = d('Legal', 'Legal', 'Legal', 'Juridique')
TECH = d('Tecnología', 'Technology', 'Tecnologia', 'Technologie')
MKT = d('Marketing', 'Marketing', 'Màrqueting', 'Marketing')
RES = d('Reserva', 'Reserve', 'Reserva', 'Réserve')
OPS = d('Operación', 'Operations', 'Operació', 'Fonctionnement')

# (partida, pilar, nota, valor de ejemplo)
_INV_OLD = [
    (d('Currículo complementario propio (si lo mantienes)', 'Your own complementary curriculum (if you keep one)', 'Currículum complementari propi (si el mantens)', 'Votre programme complémentaire (si vous en gardez un)'), PA, d('Opcional: el plan base lo aporta Chanak', 'Optional: Chanak provides the base curriculum', 'Opcional: el pla base l’aporta Chanak', 'Facultatif : Chanak fournit le programme de base'), None),
    (d('Material didáctico inicial', 'Initial teaching materials', 'Material didàctic inicial', 'Matériel pédagogique initial'), PA, d('Libros, kits, material de aula', 'Books, kits, classroom supplies', 'Llibres, kits, material d’aula', 'Livres, kits, fournitures'), 1200),
    (d('Formación y certificación de guías y coordinadores', 'Training and certification of guides and coordinators', 'Formació i certificació de guies i coordinadors', 'Formation et certification des guides et coordinateurs'), PC, d('El importe se detalla en la propuesta de alianza', 'The amount is detailed in the partnership proposal', 'L’import es detalla a la proposta d’aliança', 'Le montant figure dans la proposition de partenariat'), None),
    (d('Verificación de antecedentes del personal', 'Staff background checks', 'Verificació d’antecedents del personal', 'Vérification des antécédents du personnel'), PC, d('Según la ley del país', 'As required by the country’s law', 'Segons la llei del país', 'Selon la loi du pays'), None),
    (d('Adecuación del local (reformas menores, pintura)', 'Fitting out the premises (minor works, painting)', 'Adequació del local (reformes menors, pintura)', 'Aménagement du local (petits travaux, peinture)'), PB, d('', '', '', ''), 2500),
    (d('Mobiliario de aula y almacenaje', 'Classroom furniture and storage', 'Mobiliari d’aula i emmagatzematge', 'Mobilier de classe et rangements'), PB, d('Mesas, sillas y estanterías', 'Tables, chairs and shelving', 'Taules, cadires i prestatgeries', 'Tables, chaises et étagères'), 3200),
    (d('Seguridad contra incendios y evacuación', 'Fire safety and evacuation', 'Seguretat contra incendis i evacuació', 'Sécurité incendie et évacuation'), PB, d('Extintores, señalización, plan de evacuación', 'Extinguishers, signage, evacuation plan', 'Extintors, senyalització, pla d’evacuació', 'Extincteurs, signalétique, plan d’évacuation'), 800),
    (d('Accesibilidad (rampas, baños adaptados)', 'Accessibility (ramps, adapted restrooms)', 'Accessibilitat (rampes, banys adaptats)', 'Accessibilité (rampes, sanitaires adaptés)'), PB, d('Según normativa local', 'As required locally', 'Segons normativa local', 'Selon la réglementation locale'), None),
    (d('Licencias, permisos y trámites locales', 'Licences, permits and local procedures', 'Llicències, permisos i tràmits locals', 'Licences, permis et démarches locales'), PB, d('Uso del local, apertura, inspecciones', 'Permitted use, opening, inspections', 'Ús del local, obertura, inspeccions', 'Usage du local, ouverture, inspections'), 600),
    (d('Constitución de la entidad legal y asesoría', 'Setting up the legal entity and advice', 'Constitució de l’entitat legal i assessoria', 'Création de l’entité juridique et conseil'), LEGAL, d('', '', '', ''), 900),
    (d('Seguros iniciales', 'Initial insurance', 'Assegurances inicials', 'Assurances initiales'), LEGAL, d('Responsabilidad civil y local', 'Liability and premises', 'Responsabilitat civil i local', 'Responsabilité civile et local'), 400),
    (d('Tecnología (equipos y red)', 'Technology (devices and network)', 'Tecnologia (equips i xarxa)', 'Technologie (équipements et réseau)'), TECH, d('Portátiles o tabletas, router', 'Laptops or tablets, router', 'Portàtils o tauletes, router', 'Ordinateurs ou tablettes, routeur'), 2400),
    (d('Marketing de lanzamiento', 'Launch marketing', 'Màrqueting de llançament', 'Marketing de lancement'), MKT, d('Web, folletos, reuniones informativas', 'Website, flyers, information meetings', 'Web, fullets, reunions informatives', 'Site web, dépliants, réunions d’information'), 600),
    (d('Fondo de imprevistos', 'Contingency fund', 'Fons d’imprevistos', 'Fonds pour imprévus'), RES, d('Se recomienda reservar un margen', 'Keeping a margin is recommended', 'Es recomana reservar un marge', 'Prévoir une marge est recommandé'), 1000),
]
_MON_OLD = [
    (d('Alquiler o cesión del espacio y suministros', 'Rent or use of the space and utilities', 'Lloguer o cessió de l’espai i subministraments', 'Loyer ou mise à disposition du lieu et charges'), PB, d('Compartir o ceder espacio reduce el coste', 'Sharing or borrowing space lowers the cost', 'Compartir o cedir espai redueix el cost', 'Partager un lieu réduit le coût'), 900),
    (d('Limpieza y mantenimiento', 'Cleaning and maintenance', 'Neteja i manteniment', 'Nettoyage et entretien'), PB, d('', '', '', ''), 150),
    (d('Personal docente y guías certificados (salarios y cargas)', 'Certified teaching staff and guides (salaries and payroll costs)', 'Personal docent i guies certificats (salaris i càrregues)', 'Personnel enseignant et guides certifiés (salaires et charges)'), PC, d('Según legislación laboral local', 'Under local labour law', 'Segons legislació laboral local', 'Selon le droit du travail local'), 2600),
    (d('Docentes con habilitación local (materias nacionales)', 'Locally licensed teachers (national subjects)', 'Docents amb habilitació local (matèries nacionals)', 'Enseignants habilités localement (matières nationales)'), PC, d('Si tu país lo exige: Lengua, Historia, etc.', 'If your country requires it: language, history, etc.', 'Si el teu país ho exigeix: Llengua, Història, etc.', 'Si votre pays l’exige : langue, histoire, etc.'), None),
    (d('Coordinación y administración', 'Coordination and administration', 'Coordinació i administració', 'Coordination et administration'), PC, d('', '', '', ''), 800),
    (d('Plataforma, SIS y licencias', 'Platform, SIS and licences', 'Plataforma, SIS i llicències', 'Plateforme, SIS et licences'), PA, d('Según propuesta de alianza', 'As per the partnership proposal', 'Segons proposta d’aliança', 'Selon la proposition de partenariat'), None),
    (d('Cuota de alianza con Chanak', 'Chanak partnership fee', 'Quota d’aliança amb Chanak', 'Frais de partenariat avec Chanak'), PA, d('Según propuesta de alianza: introduce el importe de tu propuesta', 'As per the partnership proposal: enter the amount from your proposal', 'Segons proposta d’aliança: introdueix l’import de la teva proposta', 'Selon la proposition de partenariat : saisissez le montant de votre proposition'), None),
    (d('Material y suministros', 'Materials and supplies', 'Material i subministraments', 'Matériel et fournitures'), OPS, d('', '', '', ''), 200),
    (d('Seguros', 'Insurance', 'Assegurances', 'Assurances'), LEGAL, d('Promedio mensual', 'Monthly average', 'Mitjana mensual', 'Moyenne mensuelle'), 150),
    (d('Contabilidad y gestoría', 'Accounting and bookkeeping', 'Comptabilitat i gestoria', 'Comptabilité et gestion'), LEGAL, d('', '', '', ''), 150),
    (d('Marketing y comunidad', 'Marketing and community', 'Màrqueting i comunitat', 'Marketing et communauté'), MKT, d('Reuniones, redes, folletos', 'Meetings, social media, flyers', 'Reunions, xarxes, fullets', 'Réunions, réseaux, dépliants'), 150),
    (d('Reserva mensual', 'Monthly reserve', 'Reserva mensual', 'Réserve mensuelle'), RES, d('', '', '', ''), 100),
]
T = dict(
    title=TITLE,
    country=d('País', 'Country', 'País', 'Pays'), currency=d('Moneda', 'Currency', 'Moneda', 'Devise'),
    example=d('Ver ejemplo', 'See example', 'Veure exemple', 'Voir un exemple'), clear=d('Vaciar', 'Clear', 'Buidar', 'Effacer'),
    example_note=d('Ejemplo ilustrativo, no es una oferta. Sustituye las cifras por las de tu comunidad.', 'Illustrative example, not an offer. Replace the figures with your community’s.', 'Exemple il·lustratiu, no és una oferta. Substitueix les xifres per les de la teva comunitat.', 'Exemple illustratif, ce n’est pas une offre. Remplacez les chiffres par ceux de votre communauté.'),
    item=d('Partida', 'Item', 'Partida', 'Poste'), pillar=d('Pilar o categoría', 'Pillar or category', 'Pilar o categoria', 'Pilier ou catégorie'), amount=d('Importe estimado', 'Estimated amount', 'Import estimat', 'Montant estimé'),
    add=d('Añadir otra partida', 'Add another item', 'Afegir una altra partida', 'Ajouter un poste'), other=d('Otra partida', 'Other item', 'Una altra partida', 'Autre poste'), other_cat=d('Otra', 'Other', 'Altra', 'Autre'),
    s1=d('Inversión inicial (una sola vez)', 'Start-up investment (one time)', 'Inversió inicial (una sola vegada)', 'Investissement initial (une seule fois)'),
    s1_p=d('Lo que necesitas antes de abrir.', 'What you need before opening.', 'El que necessites abans d’obrir.', 'Ce qu’il vous faut avant d’ouvrir.'),
    s2=d('Gasto mensual', 'Monthly costs', 'Despesa mensual', 'Charges mensuelles'),
    s2_p=d('Lo que cuesta funcionar cada mes.', 'What it costs to operate each month.', 'El que costa funcionar cada mes.', 'Ce que coûte le fonctionnement chaque mois.'),
    s3=d('Ingresos', 'Income', 'Ingressos', 'Recettes'),
    s3_p=d('La cuota la fija el socio según su realidad local.', 'Tuition is set by the partner according to its local reality.', 'La quota la fixa el soci segons la seva realitat local.', 'La contribution est fixée par le partenaire selon sa réalité locale.'),
    s4=d('Resultado', 'Result', 'Resultat', 'Résultat'),
    fee=d('Cuota mensual por estudiante', 'Monthly tuition per student', 'Quota mensual per estudiant', 'Contribution mensuelle par élève'), fee_h=d('', '', '', ''),
    students=d('Número de estudiantes', 'Number of students', 'Nombre d’estudiants', 'Nombre d’élèves'), students_h=d('Tu comunidad de familias', 'Your community of families', 'La teva comunitat de famílies', 'Votre communauté de familles'),
    enroll=d('Matrícula anual por estudiante', 'Annual enrollment fee per student', 'Matrícula anual per estudiant', 'Frais d’inscription annuels par élève'), enroll_h=d('Opcional; solo suma al resultado anual', 'Optional; only added to the annual result', 'Opcional; només suma al resultat anual', 'Facultatif ; ajouté au seul résultat annuel'),
    other_inc=d('Otros ingresos mensuales', 'Other monthly income', 'Altres ingressos mensuals', 'Autres recettes mensuelles'),
    other_inc_h=d('Donaciones, becas locales; fondos ESA solo en EE. UU. y según elegibilidad', 'Donations, local grants; ESA funds only in the U.S. and subject to eligibility', 'Donacions, beques locals; fons ESA només als EUA i segons elegibilitat', 'Dons, bourses locales ; fonds ESA uniquement aux États-Unis et selon l’éligibilité'),
    schol=d('Becas y descuentos mensuales (total)', 'Monthly scholarships and discounts (total)', 'Beques i descomptes mensuals (total)', 'Bourses et remises mensuelles (total)'), schol_h=d('Suma de reducciones de cuota', 'Sum of tuition reductions', 'Suma de reduccions de quota', 'Somme des réductions accordées'),
    r_inv=d('Inversión inicial total', 'Total start-up investment', 'Inversió inicial total', 'Investissement initial total'), r_mon=d('Gasto mensual total', 'Total monthly costs', 'Despesa mensual total', 'Charges mensuelles totales'),
    r_inc=d('Ingresos mensuales', 'Monthly income', 'Ingressos mensuals', 'Recettes mensuelles'), r_be=d('Estudiantes para el punto de equilibrio', 'Students needed to break even', 'Estudiants per al punt d’equilibri', 'Élèves pour atteindre l’équilibre'),
    r_net=d('Resultado neto mensual', 'Monthly net result', 'Resultat net mensual', 'Résultat net mensuel'), r_year=d('Resultado neto anual', 'Annual net result', 'Resultat net anual', 'Résultat net annuel'),
    r_pay=d('Meses para recuperar la inversión', 'Months to recover the investment', 'Mesos per recuperar la inversió', 'Mois pour récupérer l’investissement'),
    na=d('N/A', 'N/A', 'N/A', 'N/A'), no_pay=d('No se recupera', 'Not recovered', 'No es recupera', 'Non récupéré'),
    read0=d('Introduce la cuota mensual por estudiante.', 'Enter the monthly tuition per student.', 'Introdueix la quota mensual per estudiant.', 'Saisissez la contribution mensuelle par élève.'),
    read_ok=d('Con este número de estudiantes cubres los gastos mensuales.', 'With this number of students you cover monthly costs.', 'Amb aquest nombre d’estudiants cobreixes les despeses mensuals.', 'Avec ce nombre d’élèves, vous couvrez les charges mensuelles.'),
    read_no=d('Necesitas más estudiantes, una cuota mayor o menos gastos.', 'You need more students, higher tuition or lower costs.', 'Necessites més estudiants, una quota més alta o menys despeses.', 'Il vous faut plus d’élèves, une contribution plus élevée ou moins de charges.'),
    csv=d('Exportar a CSV', 'Export to CSV', 'Exportar a CSV', 'Exporter en CSV'), print=d('Imprimir', 'Print', 'Imprimir', 'Imprimer'),
    previo_h=d('Previo normativo', 'Regulatory preview', 'Previ normatiu', 'Aperçu réglementaire'),
    previo_p=d('Elige tu país arriba y descarga un resumen de lo que te aplica: marco legal, los pilares A, B y C, partidas a presupuestar y verificaciones pendientes.', 'Choose your country above and download a summary of what applies to you: legal framework, pillars A, B and C, items to budget and pending checks.', 'Tria el teu país a dalt i descarrega un resum del que t’aplica: marc legal, els pilars A, B i C, partides a pressupostar i verificacions pendents.', 'Choisissez votre pays ci-dessus et téléchargez un résumé de ce qui vous concerne : cadre légal, piliers A, B et C, postes à budgéter et vérifications en attente.'),
    previo_btn=d('Descargar mi previo (PDF)', 'Download my preview (PDF)', 'Descarregar el meu previ (PDF)', 'Télécharger mon aperçu (PDF)'), previo_csv=d('Previo en CSV', 'Preview as CSV', 'Previ en CSV', 'Aperçu en CSV'),
    xlsx=d('Descargar la hoja de cálculo (Excel)', 'Download the spreadsheet (Excel)', 'Descarregar el full de càlcul (Excel)', 'Télécharger la feuille de calcul (Excel)'),
    pv_legal=d('Marco legal de referencia', 'Reference legal framework', 'Marc legal de referència', 'Cadre légal de référence'),
    pv_a=d('A. Acreditación y plan de estudios', 'A. Accreditation and curriculum', 'A. Acreditació i pla d’estudis', 'A. Accréditation et programme'),
    pv_b=d('B. Instalaciones', 'B. Facilities', 'B. Instal·lacions', 'B. Locaux'), pv_c=d('C. Personal docente', 'C. Teaching staff', 'C. Personal docent', 'C. Personnel enseignant'),
    pv_items=d('Partidas que conviene presupuestar', 'Items worth budgeting', 'Partides que convé pressupostar', 'Postes à prévoir au budget'),
    pv_pending=d('Verificaciones pendientes', 'Pending checks', 'Verificacions pendents', 'Vérifications en attente'),
    pv_summary=d('Tu presupuesto en resumen', 'Your budget at a glance', 'El teu pressupost en resum', 'Votre budget en résumé'),
    pv_es_only=d('', 'The country detail is currently available in Spanish.', 'El detall per país està disponible, de moment, en castellà.', 'Le détail par pays est pour l’instant disponible en espagnol.'),
    pv_legal_note=d('Información de referencia, no es asesoramiento legal. Los requisitos cambian y varían según la región; verifícalos con la autoridad educativa de tu país. Chanak orienta y acompaña, pero no sustituye el asesoramiento legal local ni garantiza autorizaciones, códigos de centro ni fondos públicos.',
                    'Reference information, not legal advice. Requirements change and vary by region; verify them with your country’s education authority. Chanak guides and accompanies you, but does not replace local legal advice and does not guarantee authorizations, school codes or public funds.',
                    'Informació de referència, no és assessorament legal. Els requisits canvien i varien segons la regió; verifica’ls amb l’autoritat educativa del teu país. Chanak orienta i acompanya, però no substitueix l’assessorament legal local ni garanteix autoritzacions, codis de centre ni fons públics.',
                    'Informations de référence, sans valeur de conseil juridique. Les exigences évoluent et varient selon la région ; vérifiez-les auprès de l’autorité éducative de votre pays. Chanak oriente et accompagne, mais ne remplace pas le conseil juridique local et ne garantit ni autorisations, ni codes d’établissement, ni fonds publics.'),
    disclaimer=FOOT,
)


# ───────────── Variante por alcance: textos por id (los números viven en la hoja → JSON) ─────────────
_PIL = {'A · Plan de estudios': PA, 'B · Instalaciones': PB, 'C · Personal docente': PC, 'Legal': LEGAL, 'Tecnología': TECH, 'Marketing': MKT, 'Reserva': RES, 'Operación': OPS}
PILAR_I18N = _PIL
_OLD_INV_IDS = ['curriculo_propio', 'material_inicial', 'formacion_guias', 'antecedentes', 'adecuacion', 'mobiliario', 'incendios', 'accesibilidad', 'licencias', 'legal', 'seguros', 'tecnologia', 'marketing', 'imprevistos']
_OLD_MON_IDS = ['alquiler', 'limpieza', None, 'docentes_locales', 'administracion', 'plataforma', 'cuota_alianza', 'materiales', 'seguros_mes', 'contabilidad', 'marketing_mes', 'reserva_mes']
INV_I18N = {i: (n, h) for i, (n, _p, h, _ex) in zip(_OLD_INV_IDS, _INV_OLD)}
MON_I18N = {i: (n, h) for i, (n, _p, h, _ex) in zip(_OLD_MON_IDS, _MON_OLD) if i}
INV_I18N.update({
    'manipulativos': (d('Manipulativos y material de lectoescritura inicial', 'Manipulatives and early literacy materials', 'Manipulatius i material de lectoescriptura inicial', 'Matériel de manipulation et de lecture-écriture initiale'),
                      d('Solo si el alcance incluye K–2', 'Only if the scope includes K–2', 'Només si l’abast inclou K–2', 'Seulement si le périmètre inclut K–2')),
    'mobiliario_infantil': (d('Mobiliario y zona de juego para primeros grados', 'Furniture and play area for early grades', 'Mobiliari i zona de joc per als primers cursos', 'Mobilier et espace de jeu pour les premières classes'),
                            d('Solo si el alcance incluye K–2', 'Only if the scope includes K–2', 'Només si l’abast inclou K–2', 'Seulement si le périmètre inclut K–2')),
    'laboratorio': (d('Laboratorio y material de ciencias', 'Science lab and materials', 'Laboratori i material de ciències', 'Laboratoire et matériel de sciences'),
                    d('Solo si el alcance incluye Middle o High School', 'Only if the scope includes Middle or High School', 'Només si l’abast inclou Middle o High School', 'Seulement si le périmètre inclut Middle ou High School')),
    'dual_examenes': (d('Dual Diploma, exámenes y orientación universitaria', 'Dual Diploma, exams and university guidance', 'Dual Diploma, exàmens i orientació universitària', 'Dual Diploma, examens et orientation universitaire'),
                      d('Solo si el alcance incluye High School', 'Only if the scope includes High School', 'Només si l’abast inclou High School', 'Seulement si le périmètre inclut High School')),
})
MON_I18N['administracion'] = (d('Administración y gestión interna', 'Administration and internal management', 'Administració i gestió interna', 'Administration et gestion interne'), d('', '', '', ''))
ALCANCE_I18N = {
    'alcance1': d('Kinder y lectura inicial', 'Kindergarten and early literacy', 'Kinder i lectura inicial', 'Maternelle et lecture initiale'),
    'alcance2': d('Elementary (K–5)', 'Elementary (K–5)', 'Elementary (K–5)', 'Elementary (K–5)'),
    'alcance3': d('Middle (6–8)', 'Middle (6–8)', 'Middle (6–8)', 'Middle (6–8)'),
    'alcance4': d('High School (9–12)', 'High School (9–12)', 'High School (9–12)', 'High School (9–12)'),
    'alcance5': d('Escuela completa (K–12)', 'Full school (K–12)', 'Escola completa (K–12)', 'École complète (K–12)'),
}
TRAMO_I18N = {
    'tramo1': d('K–2 · Kinder y lectura inicial', 'K–2 · Kindergarten and early literacy', 'K–2 · Kinder i lectura inicial', 'K–2 · Maternelle et lecture initiale'),
    'tramo2': d('3–5 · Resto de Elementary', '3–5 · Rest of Elementary', '3–5 · Resta d’Elementary', '3–5 · Reste d’Elementary'),
    'tramo3': d('6–8 · Middle', '6–8 · Middle', '6–8 · Middle', '6–8 · Middle'),
    'tramo4': d('9–12 · High School', '9–12 · High School', '9–12 · High School', '9–12 · High School'),
}
EX = dict(fee=400, students=16,
          inv={'material_inicial': 1200, 'mobiliario': 3200, 'adecuacion': 2500, 'incendios': 800, 'licencias': 600, 'legal': 900, 'seguros': 400, 'tecnologia': 2400, 'marketing': 600, 'imprevistos': 1000},
          mon={'alquiler': 900, 'limpieza': 150, 'docentes_locales': 2600, 'administracion': 800, 'materiales': 200, 'seguros_mes': 150, 'contabilidad': 150, 'marketing_mes': 150, 'reserva_mes': 100})
T.update(dict(
    chanak_inv=d('La inversión inicial incluye la inversión de incorporación con Chanak: {x} (una sola vez, importe de referencia).', 'The start-up investment includes the Chanak partnership investment: {x} (one-time, reference amount).', 'La inversió inicial inclou la inversió d’incorporació amb Chanak: {x} (una sola vegada, import de referència).', 'L’investissement initial comprend l’investissement d’intégration avec Chanak : {x} (une seule fois, montant de référence).'),
    scope=d('Alcance de la escuela', 'School scope', 'Abast de l’escola', 'Périmètre de l’école'),
    scope_ph=d('— Elige el alcance —', '— Choose the scope —', '— Tria l’abast —', '— Choisissez le périmètre —'),
    scope_req=d('Elige el alcance de tu escuela (obligatorio) para calcular el resultado.', 'Choose your school’s scope (required) to calculate the result.', 'Tria l’abast de la teva escola (obligatori) per calcular el resultat.', 'Choisissez le périmètre de votre école (obligatoire) pour calculer le résultat.'),
    students_h2=d('Alumnos por tramo', 'Students per band', 'Alumnes per tram', 'Élèves par tranche'),
    students=d('Alumnos', 'Students', 'Alumnes', 'Élèves'),
    band_in=d('Tramo incluido en el alcance elegido', 'Band included in the chosen scope', 'Tram inclòs a l’abast triat', 'Tranche incluse dans le périmètre choisi'),
    band_out=d('Fuera del alcance elegido: cuenta como 0', 'Outside the chosen scope: counts as 0', 'Fora de l’abast triat: compta com a 0', 'Hors du périmètre choisi : compte pour 0'),
    assume_h=d('Supuestos por tramo (editables)', 'Assumptions per band (editable)', 'Supòsits per tram (editables)', 'Hypothèses par tranche (modifiables)'),
    assume_p=d('Supuesto editable. Los ratios, las aulas y el espacio son valores de partida: ajústalos a la ley y a la realidad de tu país. Los importes quedan vacíos.',
               'Editable assumption. Ratios, classrooms and space are starting values: adjust them to your country’s law and reality. Amounts are left empty.',
               'Supòsit editable. Els ràtios, les aules i l’espai són valors de partida: ajusta’ls a la llei i a la realitat del teu país. Els imports queden buits.',
               'Hypothèse modifiable. Les ratios, les salles et l’espace sont des valeurs de départ : adaptez-les à la loi et à la réalité de votre pays. Les montants restent vides.'),
    th_band=d('Tramo', 'Band', 'Tram', 'Tranche'), th_ratio=d('Alumnos por guía', 'Students per guide', 'Alumnes per guia', 'Élèves par guide'), th_aula=d('Alumnos por aula', 'Students per classroom', 'Alumnes per aula', 'Élèves par salle'),
    th_m2=d('m² por alumno', 'm² per student', 'm² per alumne', 'm² par élève'), th_cost=d('Coste mensual por guía', 'Monthly cost per guide', 'Cost mensual per guia', 'Coût mensuel par guide'),
    th_mi=d('Material inicial por alumno', 'Initial materials per student', 'Material inicial per alumne', 'Matériel initial par élève'), th_ti=d('Tecnología inicial por alumno', 'Initial technology per student', 'Tecnologia inicial per alumne', 'Technologie initiale par élève'),
    th_mm=d('Material mensual por alumno', 'Monthly materials per student', 'Material mensual per alumne', 'Matériel mensuel par élève'),
    coord_cost=d('Coste mensual del coordinador académico', 'Monthly cost of the academic coordinator', 'Cost mensual del coordinador acadèmic', 'Coût mensuel du coordinateur pédagogique'),
    coord_h=d('Se añade si hay alumnos en 2 o más etapas (Elementary, Middle, High).', 'Added when there are students in 2 or more stages (Elementary, Middle, High).', 'S’afegeix si hi ha alumnes en 2 o més etapes (Elementary, Middle, High).', 'Ajouté s’il y a des élèves dans 2 étapes ou plus (Elementary, Middle, High).'),
    staff_h=d('Personal y espacio (calculado)', 'Staff and space (calculated)', 'Personal i espai (calculat)', 'Personnel et espace (calculé)'),
    th_students=d('Alumnos', 'Students', 'Alumnes', 'Élèves'), th_guides=d('Guías', 'Guides', 'Guies', 'Guides'), th_rooms=d('Aulas', 'Classrooms', 'Aules', 'Salles'), th_sqm=d('m² necesarios', 'm² needed', 'm² necessaris', 'm² nécessaires'),
    coord_lbl=d('Coordinador académico', 'Academic coordinator', 'Coordinador acadèmic', 'Coordinateur pédagogique'),
    staff_empty=d('Introduce alumnos en algún tramo del alcance para ver guías, aulas y espacio.', 'Enter students in a band of the scope to see guides, classrooms and space.', 'Introdueix alumnes en algun tram de l’abast per veure guies, aules i espai.', 'Saisissez des élèves dans une tranche du périmètre pour voir guides, salles et espace.'),
    law_note=d('Ajustar a la ley del país.', 'Adjust to the country’s law.', 'Ajustar a la llei del país.', 'À adapter à la loi du pays.'),
    cmp_h=d('Comparar alcances', 'Compare scopes', 'Comparar abasts', 'Comparer les périmètres'),
    cmp_p=d('Las mismas entradas calculadas para los cinco alcances en paralelo: útil para decidir por dónde empezar o cómo crecer por fases.', 'The same inputs calculated for the five scopes side by side: useful to decide where to start or how to grow in phases.',
            'Les mateixes entrades calculades per als cinc abasts en paral·lel: útil per decidir per on començar o com créixer per fases.', 'Les mêmes données calculées pour les cinq périmètres en parallèle : utile pour décider par où commencer ou comment croître par phases.'),
    r_students=d('Alumnos', 'Students', 'Alumnes', 'Élèves'), r_staff=d('Coste de personal', 'Staff cost', 'Cost de personal', 'Coût du personnel'),
    st_infantil=d('Infantil', 'Early childhood', 'Infantil', 'Maternelle'), st_primaria=d('Primaria', 'Primary', 'Primària', 'Primaire'), st_secundaria=d('Secundaria', 'Secondary', 'Secundària', 'Secondaire'), st_bachillerato=d('Bachillerato', 'Upper secondary', 'Batxillerat', 'Lycée'),
    pv_stage=d('Notas por etapa', 'Notes by stage', 'Notes per etapa', 'Notes par étape'),
    load_err=d('No se pudieron cargar los parámetros. Descarga la hoja de cálculo.', 'The parameters could not be loaded. Download the spreadsheet.', 'No s’han pogut carregar els paràmetres. Descarrega el full de càlcul.', 'Impossible de charger les paramètres. Téléchargez la feuille de calcul.'),
))
