# -*- coding: utf-8 -*-
"""«Colabora con Chanak»: hub, Mentores y colaboradores, Programa de Embajadores (ES y EN).
Embajadores: portado del diseño «Programa de Embajadores Chanak – Landing» con las correcciones obligatorias
(Acreditada por MSA-CESS; sin marcadores entre corchetes; exclusión de familias con fondos estatales)."""


def d(es, en):
    return dict(es=es, en=en)


URLS = dict(
    hub=d('/unete/', '/en/join/'), mentors=d('/unete/mentores/', '/en/join/mentors/'), amb=d('/unete/embajadores/', '/en/join/ambassadors/'),
    terms=d('/unete/embajadores/terminos/', '/en/join/ambassadors/terms/'), disc=d('/unete/embajadores/divulgacion/', '/en/join/ambassadors/disclosure/'))
ALT_NOTE = d('', '')

# ── Hub ──
HUB = dict(
    title=d('Colabora con Chanak: mentores y embajadores', 'Collaborate with Chanak: Mentors and Ambassadors'),
    desc=d('Dos formas de colaborar con Chanak International Academy: acompañar estudiantes como mentor o colaborador, o compartir Chanak como embajador.',
           'Two ways to collaborate with Chanak International Academy: walk with students as a mentor or collaborator, or share Chanak as an ambassador.'),
    h1=d('Colabora con Chanak', 'Collaborate with Chanak'),
    lead=d('Chanak crece con personas que comparten su misión: instruir a la próxima generación con conocimiento, entendimiento y sabiduría. Hay dos maneras de sumarte.',
           'Chanak grows with people who share its mission: to train up the next generation with knowledge, understanding and wisdom. There are two ways to join.'),
    c1_h=d('Mentores y colaboradores', 'Mentors and collaborators'),
    c1_p=d('Acompaña a estudiantes como mentor, coordinador o voluntario, con formación de Chanak TrainUp y un acuerdo propio.',
           'Walk with students as a mentor, coordinator or volunteer, with Chanak TrainUp training and an agreement of its own.'),
    c1_cta=d('Quiero acompañar estudiantes →', 'I want to walk with students →'),
    c2_h=d('Embajadores', 'Ambassadors'),
    c2_p=d('Comparte Chanak con las familias que ya acompañas. Recibes materiales aprobados, formación y condiciones claras por escrito.',
           'Share Chanak with the families you already serve. You receive approved materials, training and clear terms in writing.'),
    c2_cta=d('Conocer el programa →', 'Explore the program →'),
    c2_note=d('No está abierto a personas o familias que reciban fondos de un programa estatal de educación.', 'Not open to people or families who receive funds from a state education program.'),
    ms=d('¿Lideras una iglesia o una comunidad de 10 familias o más? Conoce las <a href="{u}">alianzas Microschool</a>.',
         'Do you lead a church or a community of 10 or more families? See <a href="{u}">Microschool partnerships</a>.'),
)

# ── Mentores ──
MEN = dict(
    title=d('Mentores y colaboradores · Chanak', 'Mentors and Collaborators · Chanak'),
    desc=d('Acompaña a estudiantes de Chanak como mentor, coordinador o voluntario: seguimiento académico, Life Skills y Mastery Learning, con formación propia.',
           'Walk with Chanak students as a mentor, coordinator or volunteer: academic follow-up, Life Skills and Mastery Learning, with Chanak TrainUp training.'),
    h1=d('Mentores y colaboradores', 'Mentors and collaborators'),
    lead=d('Si te mueve acompañar a un estudiante hasta que de verdad entiende, aquí hay un lugar para ti.', 'If you are moved to walk with a student until they truly understand, there is a place for you here.'),
    does_h=d('Qué hace un mentor', 'What a mentor does'),
    does=[d('Seguimiento académico: revisa avances, metas semanales y dificultades de cada estudiante.', 'Academic follow-up: reviews each student’s progress, weekly goals and difficulties.'),
          d('Life Skills: acompaña el desarrollo del carácter, los hábitos y el proyecto de vida.', 'Life Skills: supports the growth of character, habits and life project.'),
          d('Mastery Learning: ayuda a que el estudiante avance cuando domina cada objetivo, no por calendario.', 'Mastery Learning: helps students move forward when they master each objective, not by calendar.'),
          d('Modelo 60/20/20: integra el núcleo académico americano, la extensión local y la cosmovisión bíblica.', '60/20/20 model: integrates the American academic core, the local extension and the biblical worldview.')],
    req_h=d('Requisitos para ser mentor', 'Requirements to become a mentor'),
    req_p=d('Trabajar con menores exige cuidado. Estos son los requisitos:', 'Working with minors calls for care. These are the requirements:'),
    req=[d('Hoja de vida actualizada y referencias.', 'Up-to-date résumé and references.'),
         d('Entrevista de evaluación.', 'Evaluation interview.'),
         d('Verificación de antecedentes y protección de menores, según el país.', 'Background check and child protection screening, according to the country.'),
         d('Formación institucional obligatoria.', 'Mandatory institutional training.'),
         d('Conocimiento del modelo Mastery Learning, el PEI, el SIS, Chanak Flex y el seguimiento académico.', 'Knowledge of the Mastery Learning model, the IEP/PEI, the SIS, Chanak Flex and academic follow-up.'),
         d('Evaluación y aprobación antes de atender familias.', 'Evaluation and approval before working with families.'),
         d('Compromiso con la identidad cristiana y las políticas institucionales de Chanak.', 'Commitment to Chanak’s Christian identity and institutional policies.')],
    train_h=d('Formación en Chanak TrainUp', 'Training with Chanak TrainUp'),
    train_p=d('Antes de acompañar a estudiantes completas la formación de Chanak para aplicar Mastery Learning, el PEI, el SIS, Chanak Flex y el seguimiento académico. La certificación de mentor no garantiza contratación.',
              'Before walking with students you complete Chanak’s training to apply Mastery Learning, the IEP/PEI, the SIS, Chanak Flex and academic follow-up. Mentor certification does not guarantee hiring.'),
    diff_h=d('Un acuerdo distinto', 'A separate agreement'),
    diff_p=d('Ser mentor o colaborador es un acuerdo distinto al de embajador. La compensación se establece mediante contrato, según los servicios efectivamente prestados (mentoría familiar, sesiones individuales o coordinación académica). No se publican tarifas. No equivale a ser empleado de Chanak salvo contrato expreso.',
             'Being a mentor or collaborator is a separate agreement from being an ambassador. Compensation is set by contract, according to the services actually provided (family mentoring, individual sessions or academic coordination). No rates are published. It is not the same as being a Chanak employee unless there is an express contract.'),
    form_h=d('Cuéntanos de ti', 'Tell us about yourself'),
    role=d('¿Cómo te gustaría colaborar?', 'How would you like to collaborate?'),
    roles=[d('Mentor', 'Mentor'), d('Coordinador', 'Coordinator'), d('Voluntario', 'Volunteer'), d('Aún no lo sé', 'Not sure yet')],
    msg=d('Tu experiencia y por qué quieres acompañar estudiantes', 'Your experience and why you want to walk with students'),
    send=d('Enviar →', 'Send →'),
    ok_h=d('Gracias', 'Thank you'), ok_p=d('Hemos recibido tu mensaje. Te escribiremos para proponerte una primera conversación.', 'We have received your message. We will write to propose a first conversation.'),
)

# ── Embajadores ──
AMB = dict(
    title=d('Programa de Embajadores Chanak', 'Chanak Ambassador Program'),
    desc=d('Comparte Chanak con las familias que ya acompañas: código propio, materiales aprobados y condiciones claras. No aplica a familias con fondos estatales.',
           'Share Chanak with the families you already serve: your own code, approved materials and clear terms. Not open to families with state funds.'),
    eyebrow=d('Programa de Embajadores Chanak', 'Chanak Ambassador Program'),
    h1=d('Ayuda a familias a encontrar una educación cristiana que forme a toda la persona.', 'Help families find a Christian education that forms the whole person.'),
    lead=d('Chanak International Academy acompaña a estudiantes con Off-Campus (Homeschool Guiado), Dual Diploma y Life Skills. Como embajador, compartes lo que ya conoces con las familias que lo necesitan. Nosotros te damos materiales, formación y condiciones claras por escrito.',
           'Chanak International Academy supports students through Off-Campus (Guided Homeschool), Dual Diploma and Life Skills. As an ambassador, you share what you already know with the families who need it. We give you materials, training and clear terms in writing.'),
    cta=d('Aplicar al programa', 'Apply to the program'), cta2=d('Ver cómo funciona', 'See how it works'),
    stats=[(d('50 a 150 USD', '$50 to $150'), d('por estudiante matriculado', 'per enrolled student')), (d('Pago por PayPal', 'Paid by PayPal'), d('en dólares', 'in US dollars')), (d('Código de embajador', 'Your own'), d('propio', 'ambassador code'))],
    quote=d('«Generación a generación celebrará tus obras, y anunciarán tus poderosos hechos.»', '“One generation shall praise thy works to another, and shall declare thy mighty acts.”'), cite=d('Salmos 145:4', 'Psalm 145:4'),
    who_h=d('¿Quién puede ser embajador?', 'Who can be an ambassador?'),
    who_p=d('No necesitas una gran audiencia. Buscamos personas y comunidades que ya acompañan a familias y que comparten nuestra misión.', 'You do not need a large audience. We look for people and communities who already walk with families and share our mission.'),
    who=[(d('Iglesias y comunidades', 'Churches and communities'), d('Pastores y líderes que quieren dar a sus familias una opción educativa fiel a su fe.', 'Pastors and leaders who want to offer their families an educational option faithful to their faith.')),
         (d('Cooperativas y grupos homeschool', 'Co-ops and homeschool groups'), d('Líderes que conocen de cerca lo que las familias buscan y necesitan.', 'Leaders who know first-hand what families are looking for and need.')),
         (d('Educadores y creadores', 'Educators and creators'), d('Mentores, maestros y creadores de contenido que explican bien lo que usan.', 'Mentors, teachers and content creators who explain well what they use.')),
         (d('Familias de Chanak', 'Chanak families'), d('Padres que ya viven el programa y quieren compartir su experiencia real. No aplica a familias que reciban fondos de un programa estatal de educación.', 'Parents who already live the program and want to share their real experience. Not open to families who receive funds from a state education program.'))],
    how_h=d('Cómo funciona', 'How it works'),
    how=[(d('Aplica', 'Apply'), d('Cuéntanos quién eres, a quién sirves y cómo piensas compartir Chanak.', 'Tell us who you are, who you serve and how you plan to share Chanak.')),
         (d('Recibe aprobación y tu código', 'Get approved and receive your code'), d('Revisamos cada solicitud. Si te aprobamos, recibes tu código de embajador, tu enlace propio, textos y recursos aprobados y un webinar de arranque.', 'We review every application. If approved, you receive your ambassador code, your own link, approved texts and resources, and a kickoff webinar.')),
         (d('Comparte con integridad', 'Share with integrity'), d('Acompañas a las familias hasta el primer paso. La admisión y la matrícula las gestiona siempre el equipo de Chanak.', 'You guide families to their first step. Admissions and enrollment are always handled by the Chanak team.'))],
    get_h=d('Qué recibes', 'What you receive'),
    get=[d('Un código de embajador y un enlace propios para que cada matrícula quede registrada a tu nombre.', 'An ambassador code and your own link, so every enrollment is registered in your name.'),
         d('Un kit de textos, imágenes y guías aprobados, en español e inglés.', 'A kit of approved texts, images and guides, in English and Spanish.'),
         d('Un webinar de arranque sobre Off-Campus, Dual Diploma y Life Skills.', 'A kickoff webinar on Off-Campus, Dual Diploma and Life Skills.'),
         d('Un contacto del equipo para resolver tus dudas.', 'A team contact to answer your questions.'),
         d('Entre 50 y 150 USD por cada estudiante matriculado, según el programa, pagados en dólares por PayPal (pago único por estudiante).', 'Between $50 and $150 for each enrolled student, depending on the program, paid in US dollars by PayPal (one payment per student).')],
    terms_h=d('Condiciones claras', 'Clear terms'),
    terms_p=d('Las condiciones completas se entregan por escrito a cada embajador aprobado.', 'The full terms are given in writing to each approved ambassador.'),
    terms=[(d('Qué cuenta', 'What counts'), d('solo las matrículas efectivamente cobradas y no reembolsadas, no un simple registro.', 'only enrollments that have actually been collected and not refunded, not just a sign-up.')),
           (d('Tu papel', 'Your role'), d('promueves y recomiendas los programas de Chanak, pero no representas legalmente a la institución ni puedes garantizar admisiones, becas, acreditaciones o reconocimientos académicos.', 'you promote and recommend Chanak’s programs, but you do not legally represent the institution and cannot guarantee admissions, scholarships, accreditations or academic recognition.')),
           (d('Cuánto', 'How much'), d('entre 50 y 150 USD por estudiante, según el programa. Se paga una sola vez por estudiante.', 'between $50 and $150 per student, depending on the program. Paid once per student.')),
           (d('Atribución', 'Attribution'), d('30 días desde el último clic válido en tu enlace o con tu código.', '30 days from the last valid click on your link or use of your code.')),
           (d('Liquidación y pago', 'Settlement and payment'), d('la liquidación es mensual y el pago se realiza dentro de los 30 días posteriores al cierre del período correspondiente, en dólares (USD) por PayPal. El mínimo de pago se confirma por escrito antes de empezar.<!-- PENDIENTE_APROBACION: mínimo de pago propuesto US$50; comisión (%) por definir -->', 'settlement is monthly and payment is made within 30 days after the close of the corresponding period, in US dollars (USD) by PayPal. The minimum payout is confirmed in writing before you start.<!-- PENDIENTE_APROBACION: proposed minimum payout US$50; commission (%) to be defined -->')),
           (d('Programas estatales', 'State programs'), d('la compensación por estudiantes financiados con un programa estatal depende de las normas de cada programa y se confirma por escrito antes de empezar.', 'compensation for students funded by a state program depends on each program’s rules and is confirmed in writing before you start.')),
           (d('Quién no puede participar', 'Who cannot participate'), d('las personas o familias que reciban fondos de un programa estatal de educación, en cualquier estado, no pueden participar en el programa.', 'people or families who receive funds from a state education program, in any state, cannot participate in the program.'))],
    rules_h=d('Cómo hablamos de Chanak', 'How we speak about Chanak'),
    rules_p=d('Las familias confían en lo que les decimos. Por eso todos los embajadores siguen las mismas reglas.', 'Families trust what we tell them. That is why every ambassador follows the same guidelines.'),
    yes_h=d('Sí', 'Do'), no_h=d('No', 'Do not'),
    yes=[d('Usar solo los textos y materiales aprobados.', 'Use only approved texts and materials.'),
         d('Decir con claridad que recibes una compensación cuando corresponda.', 'Say clearly that you receive compensation when it applies.'),
         d('Explicar bien qué son Off-Campus, Dual Diploma y Life Skills.', 'Explain accurately what Off-Campus, Dual Diploma and Life Skills are.'),
         d('Usar solo la fórmula oficial: «Acreditada por MSA-CESS».', 'Use only the official wording: “Accredited by MSA-CESS”.'),
         d('Dirigir a las familias a la página oficial y al equipo de admisiones.', 'Send families to the official website and the admissions team.')],
    no=[d('Prometer ayudas, becas, financiación o aprobaciones de programas estatales.', 'Promise aid, scholarships, funding or state program approvals.'),
        d('Afirmar que Dallas Baptist University acredita a Chanak, o prometer admisión, doble matrícula o becas.', 'State that Dallas Baptist University accredits Chanak, or promise admission, dual enrollment or scholarships.'),
        d('Firmar, negociar o hablar en nombre de la entidad, o presentarte como su representante legal.', 'Sign, negotiate or speak on behalf of the organization, or present yourself as its legal representative.'),
        d('Garantizar admisiones, acreditaciones o reconocimientos académicos de títulos.', 'Guarantee admissions, accreditations or academic recognition of qualifications.'),
        d('Recoger, guardar o publicar datos de estudiantes o familias.', 'Collect, store or publish student or family data.')],
    faq_h=d('Preguntas frecuentes', 'Frequently asked questions'),
    faq=[(d('¿Es un empleo o un voluntariado?', 'Is this a job or volunteering?'), d('Ninguno de los dos. Es una colaboración independiente y no crea una relación laboral. Si quieres acompañar estudiantes como mentor o voluntario, existe otra vía con formación y un acuerdo distinto.', 'Neither. It is an independent collaboration and does not create an employment relationship. If you want to work with students as a mentor or volunteer, there is a separate option with its own training and agreement.')),
         (d('¿Necesito una audiencia grande?', 'Do I need a large audience?'), d('No. Revisamos cada solicitud según tu misión, a quién sirves y cómo piensas compartir Chanak.', 'No. We review each application based on your mission, who you serve and how you plan to share Chanak.')),
         (d('¿Cuánto se reconoce por cada matrícula y cómo se paga?', 'How much is recognized for each enrollment, and how is it paid?'), d('Entre 50 y 150 USD por estudiante matriculado, según el programa, una sola vez y solo sobre matrículas efectivamente cobradas y no reembolsadas. La liquidación es mensual y el pago se hace dentro de los 30 días posteriores al cierre del período, en dólares por PayPal. Las condiciones completas se entregan por escrito antes de empezar.', 'Between $50 and $150 per enrolled student, depending on the program, paid once and only on enrollments that have actually been collected and not refunded. Settlement is monthly and payment is made within 30 days after the close of the period, in US dollars by PayPal. The full terms are given in writing before you begin.')),
         (d('¿Cómo se registra que una familia viene de mi enlace?', 'How is it recorded that a family came through my link?'), d('Con tu código o enlace propio, durante 30 días desde el último clic válido. Solo se registra el identificador de referencia asociado a la matrícula; no se rastrea a las familias en otros sitios y las mediciones opcionales solo se activan con el consentimiento de la familia.', 'With your own code or link, for 30 days from the last valid click. Only the referral identifier tied to the enrollment is recorded; families are not tracked on other sites, and optional measurement is only activated with the family’s consent.')),
         (d('¿Puedo participar si mi familia recibe fondos de un programa estatal de educación?', 'Can I participate if my family receives funds from a state education program?'), d('No. Las personas y familias que reciben fondos de un programa estatal de educación, en cualquier estado, no pueden participar en el programa de embajadores.', 'No. People and families who receive funds from a state education program, in any state, cannot participate in the ambassador program.')),
         (d('¿Qué pasa con los datos de las familias?', 'What happens with families’ data?'), d('Las familias se registran directamente con Chanak. Los embajadores no recogen ni guardan sus datos.', 'Families register directly with Chanak. Ambassadors do not collect or store their data.')),
         (d('¿Puedo compartir desde cualquier país?', 'Can I share from any country?'), d('Indícanos tu país al aplicar. Los impuestos y las normas pueden cambiar según dónde vivas, y lo revisamos contigo antes del acuerdo.', 'Tell us your country when you apply. Taxes and rules can differ depending on where you live, and we review them with you before the agreement.'))],
    form_h=d('Aplicar al programa', 'Apply to the program'),
    form_p=d('Responde estas preguntas. Te contestaremos por correo con la decisión.', 'Answer these questions. We will reply by email with our decision.'),
    excl=d('<strong>Importante:</strong> las personas o familias que reciban fondos de un programa estatal de educación, en cualquier estado, no pueden participar en el programa.', '<strong>Important:</strong> people or families who receive funds from a state education program, in any state, cannot participate in the program.'),
    f_name=d('Nombre completo', 'Full name'), f_email=d('Correo electrónico', 'Email address'), f_country=d('País de residencia', 'Country of residence'), f_type=d('Tipo de embajador', 'Type of ambassador'),
    types=[d('Iglesia o comunidad', 'Church or community'), d('Cooperativa o grupo homeschool', 'Co-op or homeschool group'), d('Educador, mentor o creador de contenido', 'Educator, mentor or content creator'), d('Familia de Chanak', 'Chanak family'), d('Otro', 'Other')],
    f_org=d('Organización o ministerio (opcional)', 'Organization or ministry (optional)'), f_web=d('Sitio web o redes sociales (opcional)', 'Website or social media (optional)'),
    f_msg=d('¿A quién sirves y cómo piensas compartir Chanak?', 'Who do you serve and how do you plan to share Chanak?'),
    c1=d('Declaro que ni yo ni mi familia recibimos fondos de ningún programa estatal de educación.', 'I declare that neither I nor my family receive funds from any state education program.'),
    c2=d('Acepto los <a href="{terms}">términos del programa</a> y la <a href="{disc}">divulgación de compensación</a>, y entiendo que debo declarar cuando recibo una compensación.', 'I accept the <a href="{terms}">program terms</a> and the <a href="{disc}">compensation disclosure</a>, and understand that I must disclose when I receive compensation.'),
    c3=d('Acepto la <a href="{priv}">política de privacidad</a>.', 'I accept the <a href="{priv}">privacy policy</a>.'),
    send=d('Enviar solicitud', 'Submit application'),
    f_note=d('En este paso no pedimos datos bancarios ni documentos de identidad. Si te aprobamos, te pediremos tu correo de PayPal y el formulario fiscal que corresponda.', 'At this step we do not ask for bank details or identity documents. If you are approved, we will ask for your PayPal email and the tax form that applies.'),
    ok_h=d('Solicitud recibida', 'Application received'), ok_p=d('Gracias. Revisamos cada solicitud y te contestaremos por correo con la decisión.', 'Thank you. We review every application and will reply by email with our decision.'),
    foot=d('Chanak International Academy · Operada por Chanak TrainUp Education, Inc. · Escuela privada registrada en Florida (FLDOE #134620) · Acreditada por MSA-CESS. El registro en Florida y la acreditación no equivalen a la autorización de programas estatales. Contacto del programa: <a href="mailto:administration@chanakacademy.org">administration@chanakacademy.org</a>.',
           'Chanak International Academy · Operated by Chanak TrainUp Education, Inc. · Private school registered in Florida (FLDOE #134620) · Accredited by MSA-CESS. Florida registration and accreditation do not equal authorization to participate in state programs. Program contact: <a href="mailto:administration@chanakacademy.org">administration@chanakacademy.org</a>.'),
    l_terms=d('Términos del programa', 'Program terms'), l_disc=d('Divulgación de compensación', 'Compensation disclosure'), l_priv=d('Política de privacidad', 'Privacy policy'),
)

DRAFT = d('Borrador pendiente de revisión legal. No es un documento definitivo ni vinculante.', 'Draft pending legal review. This is not a final or binding document.')
TERMS = dict(
    title=d('Términos del Programa de Embajadores (borrador)', 'Ambassador Program Terms (draft)'),
    body=[
        (d('Naturaleza de la colaboración', 'Nature of the collaboration'), d('El embajador colabora de forma independiente. El programa no crea relación laboral, societaria ni de representación con Chanak TrainUp Education, Inc. El embajador no puede firmar, negociar ni hablar en nombre de la entidad.', 'The ambassador collaborates independently. The program does not create an employment, partnership or agency relationship with Chanak TrainUp Education, Inc. The ambassador may not sign, negotiate or speak on behalf of the organization.')),
        (d('Quién puede participar', 'Who may participate'), d('Personas y organizaciones aprobadas por Chanak tras revisar su solicitud. No pueden participar las personas o familias que reciban fondos de un programa estatal de educación, en cualquier estado.', 'People and organizations approved by Chanak after reviewing their application. People or families who receive funds from a state education program, in any state, may not participate.')),
        (d('Compensación', 'Compensation'), d('Entre 50 y 150 USD por estudiante matriculado, según el programa, una sola vez por estudiante, y únicamente sobre matrículas efectivamente cobradas y no reembolsadas. Si una matrícula se reembolsa, la compensación asociada no se devenga o se compensa en la siguiente liquidación. El porcentaje de comisión, si llegara a aplicarse, está pendiente de definición.', 'Between $50 and $150 per enrolled student, depending on the program, once per student, and only on enrollments that have actually been collected and not refunded. If an enrollment is refunded, the associated compensation is not earned or is offset in the next settlement. A commission percentage, if one ever applies, is still to be defined.')),
        (d('Atribución', 'Attribution'), d('Ventana de atribución de 30 días desde el último clic válido en el enlace del embajador (o el uso de su código). La atribución respeta la privacidad y el consentimiento aplicables: solo se registra el identificador de referencia, sin seguimiento de las familias en otros sitios, y las mediciones opcionales requieren su consentimiento.', 'Attribution window of 30 days from the last valid click on the ambassador’s link (or use of their code). Attribution respects applicable privacy and consent requirements: only the referral identifier is recorded, with no tracking of families on other sites, and optional measurement requires their consent.')),
        (d('Liquidación y pago', 'Settlement and payment'), d('Liquidación mensual. Pago dentro de los 30 días posteriores al cierre del período correspondiente, en dólares por PayPal. Mínimo de pago propuesto: US$50, pendiente de aprobación.', 'Monthly settlement. Payment within 30 days after the close of the corresponding period, in US dollars by PayPal. Proposed minimum payout: US$50, pending approval.')),
        (d('Representación', 'Representation'), d('Los embajadores promocionan y recomiendan los programas de Chanak, pero no representan legalmente a la institución ni pueden garantizar admisiones, becas, acreditaciones o reconocimientos académicos.', 'Ambassadors promote and recommend Chanak’s programs, but do not legally represent the institution and cannot guarantee admissions, scholarships, accreditations or academic recognition.')),
        (d('Cómo se habla de Chanak', 'How Chanak is described'), d('Solo con textos y materiales aprobados. Fórmula oficial: «Acreditada por MSA-CESS» y «Escuela privada registrada en Florida (FLDOE #134620)». No se afirma que Dallas Baptist University acredite a Chanak ni se prometen admisiones, doble matrícula, becas, ayudas ni aprobaciones de programas estatales.', 'Only with approved texts and materials. Official wording: “Accredited by MSA-CESS” and “Private school registered in Florida (FLDOE #134620)”. Do not state that Dallas Baptist University accredits Chanak, and do not promise admissions, dual enrollment, scholarships, aid or state program approvals.')),
        (d('Datos personales', 'Personal data'), d('Las familias se registran directamente con Chanak. El embajador no recoge, guarda ni publica datos de estudiantes o familias.', 'Families register directly with Chanak. The ambassador does not collect, store or publish student or family data.')),
        (d('Impuestos y normas locales', 'Taxes and local rules'), d('Cada embajador es responsable de sus obligaciones fiscales. Se revisan con cada persona antes del acuerdo según su país de residencia.', 'Each ambassador is responsible for their own tax obligations. They are reviewed with each person before the agreement according to their country of residence.')),
        (d('Baja y cambios', 'Termination and changes'), d('Chanak puede retirar la aprobación si se incumplen estas reglas. Los términos definitivos se entregan por escrito a cada embajador aprobado.', 'Chanak may withdraw approval if these rules are not followed. Final terms are given in writing to each approved ambassador.'))])
DISC = dict(
    title=d('Divulgación de compensación (borrador)', 'Compensation disclosure (draft)'),
    body=[
        (d('Qué es', 'What it is'), d('Los embajadores de Chanak pueden recibir una compensación económica cuando una familia a la que han orientado formaliza una matrícula. Esta página lo hace público.', 'Chanak ambassadors may receive financial compensation when a family they have guided completes an enrollment. This page makes that public.')),
        (d('Cuándo debe decirlo el embajador', 'When the ambassador must say so'), d('Siempre que recomiende Chanak en una conversación, publicación, vídeo o mensaje en el que pueda recibir una compensación, de forma clara y visible. Por ejemplo: «Soy embajador de Chanak y puedo recibir una compensación si te matriculas con mi código».', 'Whenever they recommend Chanak in a conversation, post, video or message where they may receive compensation, clearly and visibly. For example: “I am a Chanak ambassador and may receive compensation if you enroll with my code.”')),
        (d('Qué no cambia', 'What does not change'), d('La compensación no modifica el precio que paga la familia ni las condiciones de admisión. La admisión y la matrícula las gestiona siempre el equipo de Chanak.', 'Compensation does not change the price the family pays or the admission conditions. Admissions and enrollment are always handled by the Chanak team.'))])
