/**
 * Chanak International Academy · State Education Funds & Scholarships Hub
 * AOP-Style Hub: Jump Navigation, Master State Table Filter, Branded Video Modal,
 * Digital Wallets Guide, and 100% Zero-Reload Bilingual Switcher (ES / EN).
 */
(function () {
  "use strict";

  // BILINGUAL DICTIONARY
  var I18N = {
    es: {
      // Topbar & Nav
      topbar_text: "Proveedor Oficial Escolar No Público · Socio Direct Pay en ClassWallet y Odyssey",
      topbar_fldoe: "Código FLDOE: #134620 · Organización Sin Ánimo de Lucro 501(c)(3)",
      nav_sub: "Programas Aprobados en Becas Estatales",
      nav_cta: "Solicitar Orientación / Factura",
      state_select_default: "Seleccionar Estado / Programa:",

      // Hero
      hero_badge: "✦ FONDOS EDUCATIVOS Y ELECCIÓN ESCOLAR · CICLO 2026–2027 ✦",
      hero_h1: "Fondos Educativos Estatales y Educación K–12 en Casa",
      hero_lead: "Chanak International Academy es un colegio privado registrado en el FLDOE (#134620), candidato a acreditación MSA-CESS y proveedor no público aprobado en ClassWallet, Odyssey y Step Up / EMA. Las familias elegibles pueden financiar el 100% de la colegiatura, expedientes acumulativos oficiales y convalidaciones sin pagos de su bolsillo.",
      hero_disclaimer: "* El pago con fondos depende de la elegibilidad del servicio y del saldo disponible en tu cuenta.",
      pill_entity: "Entidad Aprobada: CHANAK TRAINUP EDUCATION INC",
      pill_wallets: "Billeteras Oficiales: ClassWallet, Odyssey y EMA",
      pill_msa: "Acreditación: Candidato Oficial MSA-CESS",
      pill_transcript: "Validez: Official Transcript y Diploma de High School",
      btn_explore_states: "Explorar Estados y Billeteras ↓",
      btn_request_guidance: "Solicitar Orientación Gratuita →",

      // Jump Nav
      jump_label: "Ir a sección:",
      jump_states: "Estados Aprobados",
      jump_wallets: "Billeteras Digitales",
      jump_videos: "Video-Tutoriales",
      jump_guides: "Guías Paso a Paso",
      jump_faq: "Preguntas Frecuentes",
      jump_advisory: "Asesoría Gratuita",

      // Trust bar
      trust_fldoe: "Colegio Privado Registrado en FLDOE #134620",
      trust_msa: "Candidato Oficial a Acreditación MSA-CESS",
      trust_nonprofit: "Nonprofit 501(c)(3): Chanak TrainUp Education Inc.",
      trust_directpay: "100% Pago Directo en Billeteras (Sin Desembolso Personal)",

      // Concepts Section
      concepts_badge: "CONCEPTOS CLAVE DE ELECCIÓN ESCOLAR",
      concepts_title: "¿Cómo Funcionan los Fondos Estatales para Familias?",
      concepts_lead: "Las políticas de elección escolar (School Choice) permiten a las familias destinar los fondos públicos asignados a sus hijos a opciones educativas a distancia y personalizadas.",
      concept1_title: "1. Cuentas de Ahorro para la Educación (ESA / EFA / UFA)",
      concept1_desc: "Fondos estatales que se depositan en una cuenta o billetera digital a nombre de la familia para cubrir colegiatura, cursos calificados y evaluaciones diagnósticas.",
      concept2_title: "2. Vouchers y Becas de Elección Escolar",
      concept2_desc: "Programas creados por leyes estatales (como CHOOSE en Alabama, ESTF en Carolina del Sur o PEP en Florida) para que las familias elijan programas no públicos autorizados.",
      concept3_title: "3. Billeteras Digitales de Pago Directo",
      concept3_desc: "Sistemas como ClassWallet u Odyssey donde buscas a CHANAK TRAINUP EDUCATION INC y autorizas el pago mensual directo sin adelantar dinero de tu tarjeta personal.",

      // Table Section
      table_badge: "DIRECTORIO MAESTRO DE FONDOS",
      table_title: "¿Ofrece mi Estado Fondos para la Educación en Casa?",
      table_lead: "Consulta en la tabla interactiva los programas aprobados, la plataforma digital que utiliza tu estado y la cobertura de los programas de Chanak. Usa el buscador para filtrar tu estado al instante.",
      search_placeholder: "Buscar estado (ej. Arizona, Utah, Wyoming, Florida, Alabama...)",
      table_count_prefix: "Mostrando",
      table_count_suffix: "programas y estados",
      th_state: "Estado",
      th_program: "Programa Oficial de Beca",
      th_wallet: "Billetera Digital",
      th_offcampus: "Chanak Off-Campus (K–12)",
      th_dual: "Chanak Dual Diploma",
      th_action: "Guía del Estado",
      badge_approved: "✓ Aprobado",
      badge_compatible: "✓ Convalidable",
      badge_consult: "Consultar",
      btn_view_state: "Ver Landing →",

      // Digital Wallets Section
      wallets_badge: "BILLETERAS DIGITALES Y DESEMBOLSO",
      wallets_title: "Cómo Pagar a Chanak en Cada Plataforma Digital",
      wallets_lead: "Chanak está registrada formalmente en las plataformas oficiales del estado. Sigue el flujo específico de tu billetera para autorizar tus pagos sin complicaciones.",
      wallet_cw_title: "ClassWallet (Pay Vendor)",
      wallet_cw_states: "AZ · AL · SC · NH",
      wallet_cw_desc: "Utilizado por Arizona ESA, Alabama CHOOSE, Carolina del Sur ESTF y New Hampshire EFA.",
      wallet_cw_s1: "Chanak emite mensualmente la factura oficial en PDF por cada alumno matriculado.",
      wallet_cw_s2: "Ingresas a tu portal familiar en app.classwallet.com y seleccionas 'Pay Vendor'.",
      wallet_cw_s3: "Buscas la entidad legal: CHANAK TRAINUP EDUCATION INC.",
      wallet_cw_s4: "Subes la factura proforma y autorizas el desembolso directo del saldo de tu beca.",

      wallet_ody_title: "Odyssey Marketplace",
      wallet_ody_states: "Wyoming · Utah",
      wallet_ody_desc: "Plataforma oficial para Wyoming ESA y Utah Fits All Scholarship (UFA).",
      wallet_ody_s1: "Accedes con tus credenciales a withodyssey.com en la cuenta asignada a tu familia.",
      wallet_ody_s2: "Localizas a Chanak TrainUp Education Inc. en el catálogo o directorio de proveedores.",
      wallet_ody_s3: "Formalizas la inscripción de tu hijo y vinculas la oferta de servicio aprobada.",
      wallet_ody_s4: "El desembolso se libera tras la prestación efectiva del servicio académico mensual.",

      wallet_ema_title: "Step Up for Students (EMA)",
      wallet_ema_states: "Florida (PEP & FES-UA)",
      wallet_ema_desc: "Portal oficial del estado de Florida para cuentas de educación personalizada.",
      wallet_ema_s1: "Ingresas al portal EMA (Education Market Assistant) de Step Up for Students.",
      wallet_ema_s2: "Buscas a Chanak International Academy dentro de los servicios autorizados K–12.",
      wallet_ema_s3: "Seleccionas los módulos de acompañamiento educativo y materias troncales.",
      wallet_ema_s4: "Autorizas el pago con el saldo de tu beca PEP o FES-UA sin gastos personales.",

      // Video Gallery Section
      videos_badge: "TUTORIALES OFICIALES CHANAK",
      videos_title: "Video-Tutoriales: Cómo Usar tus Fondos Paso a Paso",
      videos_lead: "Aprende de forma visual y guiada cómo ingresar a tu plataforma, buscar a Chanak y autorizar el pago con fondos estatales. Cada video cuenta con la garantía y orientación de Chanak Academy.",
      video_btn_watch: "Ver Video Tutorial ▶",
      video_modal_close: "Cerrar",
      video_modal_hint: "Presiona la tecla ESC o haz clic fuera del reproductor para cerrar.",

      v1_title: "ClassWallet: Cómo buscar a CHANAK TRAINUP EDUCATION INC y pagar mediante Pay Vendor",
      v1_desc: "Tutorial paso a paso para familias con cuenta ClassWallet: cómo localizar nuestra entidad legal, subir tu factura oficial en PDF y autorizar el pago directo.",
      v1_time: "3:30 min",

      v2_title: "Arizona ESA: Uso de fondos en ClassWallet para Chanak K–12 y Dual Diploma",
      v2_desc: "Guía completa para familias de Arizona con beca ESA: cobertura aprobada, emisión mensual de facturas y convalidación de créditos.",
      v2_time: "4:15 min",

      v3_title: "Florida Step Up / EMA: Cómo seleccionar servicios de Chanak en el Marketplace",
      v3_desc: "Paso a paso para familias de Florida con beca PEP o FES-UA: navegación en el portal EMA y solicitud de servicios educativos autorizados.",
      v3_time: "3:50 min",

      v4_title: "Wyoming & Utah Odyssey: Guía de inscripción y liberación de fondos",
      v4_desc: "Aprende cómo funciona el flujo de Odyssey para Wyoming ESA y Utah Fits All: vinculación de oferta y desembolso post-servicio.",
      v4_time: "4:00 min",

      v5_title: "New Hampshire EFA: Mentoría académica y facturación directa en ClassWallet",
      v5_desc: "Instrucciones para familias de New Hampshire gestionadas por CSF NH: clasificación como servicio de mentoría y reporte legal de notas.",
      v5_time: "3:20 min",

      v6_title: "Alabama CHOOSE Act: Facturación mensual por alumno con Pay Vendor",
      v6_desc: "Cómo aplicar los fondos de la ley CHOOSE en Alabama sin trámites de reembolso directo y con evaluación diagnóstica inicial.",
      v6_time: "3:45 min",

      // Guides Section
      guides_badge: "ARTÍCULOS Y DOCUMENTACIÓN OFICIAL",
      guides_title: "Guías Prácticas para Familias con Fondos",
      guides_lead: "Recursos informativos redactados por nuestro equipo legal y académico para que aproveches al máximo los beneficios de tu estado.",
      g1_cat: "FACTURACIÓN Y PAGOS",
      g1_title: "Requisitos de una Factura Aprobada en ClassWallet y Odyssey",
      g1_desc: "Descubre qué datos obligatorios debe incluir tu factura (nombre legal del alumno, código de proveedor, desglose por conceptos) para evitar rechazos.",
      g2_cat: "LEGALIDAD Y CUMPLIMIENTO",
      g2_title: "Cumplimiento Estatal K–12: Evaluaciones Anuales y PEI",
      g2_desc: "Cómo Chanak estructura las pruebas estandarizadas anuales y el Plan Educativo Individualizado requeridos por las leyes de elección escolar.",
      g3_cat: "TITULACIÓN Y HOMOLOGACIÓN",
      g3_title: "Expediente Oficial (Official Transcript) y American High School Diploma",
      g3_desc: "Todo lo que necesitas saber sobre la emisión de expedientes acumulativos oficiales y el diploma de secundaria acreditado por Chanak.",

      // Advisory Form Section
      form_badge: "ASESORÍA PERSONALIZADA SIN COMPROMISO",
      form_title: "Solicita Orientación Gratuita o tu Factura Oficial",
      form_lead: "Indícanos los datos de tu familia y el programa de beca de tu estado. Nuestro equipo de admisiones te contactará en menos de 24 horas laborables para guiarte sin coste alguno.",
      lbl_parent: "Nombre completo del padre, madre o tutor *",
      lbl_student: "Nombre legal del alumno (como figura en la beca) *",
      lbl_email: "Correo electrónico *",
      lbl_phone: "Teléfono / WhatsApp *",
      lbl_state: "Estado de residencia / Beca *",
      lbl_program: "Programa de interés *",
      lbl_privacy: "Acepto la política de privacidad y autorizo a Chanak a contactarme para fines educativos.",
      opt_prog_k12: "Off-Campus K–12 (Escuela completa / Homeschool)",
      opt_prog_dual: "Dual Diploma (Doble titulación High School)",
      opt_prog_info: "Orientación general / Consultar fondos de mi estado",
      btn_submit_form: "Solicitar Asesoría / Factura Proforma →",
      form_success: "✓ Solicitud recibida con éxito. Un asesor de Chanak te contactará con los pasos específicos para tu estado y billetera.",
      form_error: "Por favor, completa todos los campos requeridos y acepta la política de privacidad.",

      // FAQ Section
      faq_badge: "PREGUNTAS FRECUENTES",
      faq_title: "Dudas Habituales sobre Fondos Educativos Estatales",
      faq_lead: "Respuestas claras a las dudas más comunes de familias que utilizan fondos públicos en Chanak International Academy.",
      faq1_q: "1. ¿Tengo que adelantar dinero de mi bolsillo?",
      faq1_a: "No en los estados con pago directo activo (como Arizona, Alabama, Carolina del Sur o New Hampshire en ClassWallet, y Wyoming y Utah en Odyssey). Chanak emite la factura oficial y el estado realiza el desembolso directamente a nuestra entidad registrada.",
      faq2_q: "2. ¿Cómo busca mi familia a Chanak en la plataforma?",
      faq2_a: "Debes buscar exactamente nuestra entidad legal aprobada: CHANAK TRAINUP EDUCATION INC. En ClassWallet nos encuentras en la sección 'Pay Vendor', y en Odyssey en el directorio oficial de proveedores del estado.",
      faq3_q: "3. ¿Qué ocurre si me conceden los fondos a mitad de curso?",
      faq3_a: "Chanak cuenta con matrícula abierta continua. Si recibes la aprobación de tus fondos en cualquier momento del ciclo escolar, adaptamos el calendario de pagos y el plan de estudios al saldo restante asignado por tu estado.",
      faq4_q: "4. ¿Los fondos no utilizados se acumulan o se pueden transferir a otro hermano?",
      faq4_a: "Cada estado tiene su propia normativa. En general, los fondos asignados a un alumno no pueden transferirse a otro hermano, pero muchas cuentas ESA permiten que el saldo remanente se acumule para el siguiente ciclo escolar. Te asesoramos según la ley de tu estado.",
      faq5_q: "5. ¿Incluye Chanak el expediente oficial (transcript) y el diploma?",
      faq5_a: "Sí. Para todos los alumnos matriculados en los programas completos de Chanak en los estados participantes, el servicio incluye la apertura y custodia de expediente oficial, report cards periódicos, official transcript y American High School Diploma de Florida (FLDOE #134620).",
      faq6_q: "6. ¿Es compatible con el homeschooling o con el colegio habitual?",
      faq6_a: "Totalmente. Chanak ofrece dos modalidades: Off-Campus K–12 para educación completa a distancia en casa, y Dual Diploma para alumnos que asisten a su colegio habitual pero cursan la titulación estadounidense oficial en paralelo."
    },

    en: {
      // Topbar & Nav
      topbar_text: "Official Nonpublic School Provider · ClassWallet & Odyssey Approved Partner",
      topbar_fldoe: "FLDOE Private School Code: #134620 · 501(c)(3) Nonprofit",
      nav_sub: "Approved State Scholarship Programs",
      nav_cta: "Request Guidance / Invoice",
      state_select_default: "Select State / Program:",

      // Hero
      hero_badge: "✦ STATE EDUCATION FUNDS & SCHOOL CHOICE · 2026–2027 CYCLE ✦",
      hero_h1: "State Education Funds & K–12 Distance Learning",
      hero_lead: "Chanak International Academy is an FLDOE-registered private school (#134620), MSA-CESS candidate for accreditation, and approved nonpublic provider on ClassWallet, Odyssey, and Step Up / EMA. Eligible families can fund 100% of tuition, official cumulative transcripts, and accreditation without personal out-of-pocket costs.",
      hero_disclaimer: "* Payment with state funds is subject to service eligibility and available account balance.",
      pill_entity: "Approved Entity: CHANAK TRAINUP EDUCATION INC",
      pill_wallets: "Official Wallets: ClassWallet, Odyssey & EMA",
      pill_msa: "Accreditation: MSA-CESS Official Candidate",
      pill_transcript: "Validity: Official Transcript & High School Diploma",
      btn_explore_states: "Explore States & Wallets ↓",
      btn_request_guidance: "Request Free Guidance →",

      // Jump Nav
      jump_label: "Jump to section:",
      jump_states: "Approved States",
      jump_wallets: "Digital Wallets",
      jump_videos: "Video Tutorials",
      jump_guides: "Step-by-Step Guides",
      jump_faq: "Frequently Asked Questions",
      jump_advisory: "Free Consultation",

      // Trust bar
      trust_fldoe: "FLDOE Registered Private School #134620",
      trust_msa: "MSA-CESS Official Candidate for Accreditation",
      trust_nonprofit: "501(c)(3) Nonprofit: Chanak TrainUp Education Inc.",
      trust_directpay: "100% Direct Pay via State Wallets (Zero Out-of-Pocket)",

      // Concepts Section
      concepts_badge: "SCHOOL CHOICE ESSENTIALS",
      concepts_title: "How Do State Education Funds Work for Families?",
      concepts_lead: "School choice policies allow families to apply public education funding toward customized distance-learning programs for their children, including nonpublic options like Chanak.",
      concept1_title: "1. Education Savings Accounts (ESA / EFA / UFA)",
      concept1_desc: "State-funded accounts managed through a digital platform where families spend authorized amounts on qualifying nonpublic tuition, curriculum, and diagnostic benchmarks.",
      concept2_title: "2. State Vouchers & Scholarships",
      concept2_desc: "Legislative school choice programs (such as AL CHOOSE, SC ESTF, or FL PEP) designed to empower parents to choose accredited private school providers.",
      concept3_title: "3. Direct-Pay Digital Wallets",
      concept3_desc: "Approved platforms like ClassWallet or Odyssey where you find CHANAK TRAINUP EDUCATION INC and authorize monthly disbursements directly from your state award.",

      // Table Section
      table_badge: "STATE FUNDING DIRECTORY",
      table_title: "Does My State Offer Funds for Distance Education?",
      table_lead: "Explore approved programs, state digital platforms, and Chanak service coverage in our interactive table. Use the instant search bar to find your state.",
      search_placeholder: "Search state (e.g. Arizona, Utah, Wyoming, Florida, Alabama...)",
      table_count_prefix: "Showing",
      table_count_suffix: "programs and states",
      th_state: "State",
      th_program: "Official Scholarship Program",
      th_wallet: "Digital Wallet",
      th_offcampus: "Chanak Off-Campus (K–12)",
      th_dual: "Chanak Dual Diploma",
      th_action: "State Guide",
      badge_approved: "✓ Approved",
      badge_compatible: "✓ Transferable",
      badge_consult: "Inquire",
      btn_view_state: "View Landing →",

      // Digital Wallets Section
      wallets_badge: "DIGITAL PLATFORMS & DISBURSEMENT",
      wallets_title: "How to Pay Chanak in Each Digital Platform",
      wallets_lead: "Chanak is formally registered as an approved vendor. Follow the specific workflow of your digital wallet to authorize direct state disbursements seamlessly.",
      wallet_cw_title: "ClassWallet (Pay Vendor)",
      wallet_cw_states: "AZ · AL · SC · NH",
      wallet_cw_desc: "Used by Arizona ESA, Alabama CHOOSE, South Carolina ESTF, and New Hampshire EFA.",
      wallet_cw_s1: "Chanak issues an itemized official PDF invoice per enrolled student each month.",
      wallet_cw_s2: "Log in to your parent portal at app.classwallet.com and select 'Pay Vendor'.",
      wallet_cw_s3: "Search for our approved legal entity: CHANAK TRAINUP EDUCATION INC.",
      wallet_cw_s4: "Upload the PDF invoice and submit for 100% direct state fund disbursement.",

      wallet_ody_title: "Odyssey Marketplace",
      wallet_ody_states: "Wyoming · Utah",
      wallet_ody_desc: "Official platform for Wyoming ESA and Utah Fits All Scholarship (UFA).",
      wallet_ody_s1: "Log in with your family credentials to withodyssey.com on your awarded account.",
      wallet_ody_s2: "Locate Chanak TrainUp Education Inc. in the provider directory or marketplace.",
      wallet_ody_s3: "Complete your student's enrollment and link the approved monthly service listing.",
      wallet_ody_s4: "Funds are released directly following monthly delivery of educational services.",

      wallet_ema_title: "Step Up for Students (EMA)",
      wallet_ema_states: "Florida (PEP & FES-UA)",
      wallet_ema_desc: "Florida's official portal for personalized education savings accounts.",
      wallet_ema_s1: "Log in to the EMA (Education Market Assistant) portal at Step Up for Students.",
      wallet_ema_s2: "Search for Chanak International Academy under authorized K–12 service providers.",
      wallet_ema_s3: "Select authorized core academic courses and pedagogical mentoring options.",
      wallet_ema_s4: "Authorize payment using your PEP or FES-UA scholarship balance with zero personal upfront cost.",

      // Video Gallery Section
      videos_badge: "OFFICIAL CHANAK TUTORIALS",
      videos_title: "Video Tutorials: How to Use Your Funds Step-by-Step",
      videos_lead: "Visual walkthroughs explaining how to log in, search for Chanak, and authorize state payments. Every video carries Chanak Academy's official trust and branding.",
      video_btn_watch: "Watch Video Tutorial ▶",
      video_modal_close: "Close",
      video_modal_hint: "Press ESC or click outside the video player to close.",

      v1_title: "ClassWallet: How to search CHANAK TRAINUP EDUCATION INC and pay via Pay Vendor",
      v1_desc: "Step-by-step tutorial for ClassWallet families: finding our legal entity, uploading your official PDF invoice, and authorizing direct disbursement.",
      v1_time: "3:30 min",

      v2_title: "Arizona ESA: Using ClassWallet funds for Chanak K–12 and Dual Diploma",
      v2_desc: "Complete walkthrough for Arizona ESA parents: approved coverage, monthly invoices, and credit convalidation.",
      v2_time: "4:15 min",

      v3_title: "Florida Step Up / EMA: How to select Chanak services on the Marketplace",
      v3_desc: "Step-by-step guide for Florida PEP and FES-UA families navigating the EMA portal and booking authorized educational services.",
      v3_time: "3:50 min",

      v4_title: "Wyoming & Utah Odyssey: Enrollment and fund disbursement guide",
      v4_desc: "Understand the Odyssey workflow for Wyoming ESA and Utah Fits All: linking service listings and post-service disbursement.",
      v4_time: "4:00 min",

      v5_title: "New Hampshire EFA: Academic mentorship and direct invoicing in ClassWallet",
      v5_desc: "Guidance for New Hampshire families with CSF NH accounts: approved mentoring classifications and official grade reporting.",
      v5_time: "3:20 min",

      v6_title: "Alabama CHOOSE Act: Monthly invoicing per student with Pay Vendor",
      v6_desc: "How Alabama parents use CHOOSE Act funds without out-of-pocket reimbursements, including initial diagnostic assessment.",
      v6_time: "3:45 min",

      // Guides Section
      guides_badge: "ARTICLES & OFFICIAL DOCUMENTATION",
      guides_title: "Practical Guides for Scholarship Families",
      guides_lead: "In-depth resources compiled by our admissions and legal compliance team to maximize your state scholarship benefits.",
      g1_cat: "BILLING & DIRECT PAY",
      g1_title: "Requirements for an Approved Invoice in ClassWallet and Odyssey",
      g1_desc: "Key elements required on Chanak's itemized invoices (student legal name, vendor EIN, line-item coding) to ensure instant state approval.",
      g2_cat: "STATE COMPLIANCE",
      g2_title: "K–12 State Accountability: Standardized Testing & IEP",
      g2_desc: "How Chanak fulfills required annual standardized testing and provides Individualized Education Plans (IEP) per school choice mandates.",
      g3_cat: "DIPLOMA & TRANSCRIPTS",
      g3_title: "Official Cumulative Transcripts and American High School Diploma",
      g3_desc: "Everything you need to know about accredited Florida high school transcripts, apostilles, and national graduation credentials.",

      // Advisory Form Section
      form_badge: "NO-OBLIGATION PERSONALIZED GUIDANCE",
      form_title: "Request Free Consultation or Your Official Invoice",
      form_lead: "Provide your family and state scholarship details. Our bilingual admissions team will contact you within 24 business hours to assist you at no cost.",
      lbl_parent: "Parent / Guardian Full Legal Name *",
      lbl_student: "Student Full Legal Name (as on ESA account) *",
      lbl_email: "Email Address *",
      lbl_phone: "Phone / WhatsApp *",
      lbl_state: "State of Residence / Scholarship *",
      lbl_program: "Program of Interest *",
      lbl_privacy: "I accept the privacy policy and authorize Chanak to contact me regarding educational services.",
      opt_prog_k12: "Off-Campus K–12 (Full Distance School / Homeschool)",
      opt_prog_dual: "Dual Diploma (US High School Concurrent Track)",
      opt_prog_info: "General Guidance / Inquire about My State's Funds",
      btn_submit_form: "Request Guidance / Proforma Invoice →",
      form_success: "✓ Request received successfully. A Chanak advisor will contact you with specific guidance for your state and digital wallet.",
      form_error: "Please complete all required fields and accept the privacy policy.",

      // FAQ Section
      faq_badge: "FREQUENTLY ASKED QUESTIONS",
      faq_title: "Common Questions About State Education Funds",
      faq_lead: "Clear answers to the most common questions from families using public school choice funds at Chanak International Academy.",
      faq1_q: "1. Do I need to pay anything out-of-pocket?",
      faq1_a: "No in participating direct-pay states (such as Arizona, Alabama, South Carolina, or New Hampshire on ClassWallet, and Wyoming and Utah on Odyssey). Chanak issues the official invoice and the state disburses payment directly to our registered entity.",
      faq2_q: "2. How does my family locate Chanak in our portal?",
      faq2_a: "Search for our exact approved legal entity: CHANAK TRAINUP EDUCATION INC. In ClassWallet, look under 'Pay Vendor'; in Odyssey, locate our profile in the official state provider directory.",
      faq3_q: "3. What if my child's scholarship is approved mid-year?",
      faq3_a: "Chanak maintains rolling admissions throughout the year. If your state funds are awarded midway through the school year, we adjust your monthly billing schedule and curriculum plan to match your remaining available balance.",
      faq4_q: "4. Do unused funds roll over or transfer to another sibling?",
      faq4_a: "Policies vary by state. Generally, funds awarded to one student cannot be transferred to a sibling, but many state ESAs allow unused balances to roll over into subsequent academic years. Our team provides state-specific rules.",
      faq5_q: "5. Does Chanak include official cumulative transcripts and diploma?",
      faq5_a: "Yes. For all students enrolled in full Chanak programs in participating states, services include opening and custody of cumulative records, regular grade reports, official graduation transcripts, and an accredited American High School Diploma from Florida (FLDOE #134620).",
      faq6_q: "6. Is Chanak compatible with homeschooling or local schooling?",
      faq6_a: "Completely. We offer two distinct tracks: Off-Campus K–12 for complete distance education at home, and Dual Diploma for students attending their regular local school while earning an official U.S. high school diploma in parallel."
    }
  };

  // STATE DIRECTORY DATA FOR MASTER TABLE
  var STATE_ROWS = [
    {
      stateName: { es: "Utah", en: "Utah" },
      flag: "🏔️",
      programName: { es: "Utah Fits All Scholarship (UFA)", en: "Utah Fits All Scholarship (UFA)" },
      programUrl: "https://www.utaheducationfitsall.org/",
      wallet: "Odyssey",
      walletClass: "odyssey",
      offCampus: true,
      dualDiploma: true,
      landingUrl: "/utah/",
      featured: true
    },
    {
      stateName: { es: "Wyoming", en: "Wyoming" },
      flag: "🦬",
      programName: { es: "Wyoming Education Savings Account (ESA)", en: "Wyoming Education Savings Account (ESA)" },
      programUrl: "https://edu.wyoming.gov/parents/education-savings-accounts/",
      wallet: "Odyssey",
      walletClass: "odyssey",
      offCampus: true,
      dualDiploma: true,
      landingUrl: "/wyoming/",
      featured: true
    },
    {
      stateName: { es: "Arizona", en: "Arizona" },
      flag: "🌵",
      programName: { es: "Empowerment Scholarship Account (ESA)", en: "Empowerment Scholarship Account (ESA)" },
      programUrl: "https://www.azed.gov/esa/",
      wallet: "ClassWallet",
      walletClass: "classwallet",
      offCampus: true,
      dualDiploma: true,
      landingUrl: "/arizona/",
      featured: true
    },
    {
      stateName: { es: "Alabama", en: "Alabama" },
      flag: "🌲",
      programName: { es: "The CHOOSE Act of 2024", en: "The CHOOSE Act of 2024" },
      programUrl: "https://classwallet.com/alchoose/",
      wallet: "ClassWallet",
      walletClass: "classwallet",
      offCampus: true,
      dualDiploma: true,
      landingUrl: "/alabama/",
      featured: true
    },
    {
      stateName: { es: "South Carolina", en: "South Carolina" },
      flag: "🌴",
      programName: { es: "Education Scholarship Trust Fund (ESTF)", en: "Education Scholarship Trust Fund (ESTF)" },
      programUrl: "https://sc-estf-program.com/en/",
      wallet: "ClassWallet",
      walletClass: "classwallet",
      offCampus: true,
      dualDiploma: true,
      landingUrl: "/south-carolina/",
      featured: true
    },
    {
      stateName: { es: "New Hampshire", en: "New Hampshire" },
      flag: "🍁",
      programName: { es: "Education Freedom Account (EFA)", en: "Education Freedom Account (EFA)" },
      programUrl: "https://nh.scholarshipfund.org/apply/nh-education-freedom-accounts/",
      wallet: "ClassWallet",
      walletClass: "classwallet",
      offCampus: true,
      dualDiploma: true,
      landingUrl: "/new-hampshire/",
      featured: true
    },
    {
      stateName: { es: "Florida", en: "Florida" },
      flag: "☀️",
      programName: { es: "Step Up for Students (PEP & FES-UA)", en: "Step Up for Students (PEP & FES-UA)" },
      programUrl: "https://www.stepupforstudents.org/",
      wallet: "EMA Marketplace",
      walletClass: "ema",
      offCampus: true,
      dualDiploma: true,
      landingUrl: "/florida-home-education/",
      featured: true
    },
    {
      stateName: { es: "Arkansas", en: "Arkansas" },
      flag: "🏛️",
      programName: { es: "Educational Freedom Account (EFA)", en: "Educational Freedom Account (EFA)" },
      programUrl: "https://dese.ade.arkansas.gov/",
      wallet: "ClassWallet",
      walletClass: "classwallet",
      offCampus: true,
      dualDiploma: true,
      landingUrl: "#asesoria",
      featured: false
    },
    {
      stateName: { es: "Georgia", en: "Georgia" },
      flag: "🍑",
      programName: { es: "Georgia Promise Scholarship", en: "Georgia Promise Scholarship" },
      programUrl: "https://www.georgiapolicy.org/",
      wallet: "Digital Portal",
      walletClass: "other",
      offCampus: true,
      dualDiploma: true,
      landingUrl: "#asesoria",
      featured: false
    },
    {
      stateName: { es: "North Carolina", en: "North Carolina" },
      flag: "🌊",
      programName: { es: "Opportunity Scholarship Program", en: "Opportunity Scholarship Program" },
      programUrl: "https://www.ncseaa.edu/k12/esa/",
      wallet: "ClassWallet",
      walletClass: "classwallet",
      offCampus: true,
      dualDiploma: true,
      landingUrl: "#asesoria",
      featured: false
    },
    {
      stateName: { es: "Oklahoma", en: "Oklahoma" },
      flag: "🦅",
      programName: { es: "Parental Choice Tax Credit", en: "Parental Choice Tax Credit" },
      programUrl: "https://oklahoma.gov/tax.html",
      wallet: "Tax Credit",
      walletClass: "other",
      offCampus: true,
      dualDiploma: true,
      landingUrl: "#asesoria",
      featured: false
    },
    {
      stateName: { es: "West Virginia", en: "West Virginia" },
      flag: "⛰️",
      programName: { es: "Hope Scholarship (ESA)", en: "Hope Scholarship (ESA)" },
      programUrl: "https://www.hopescholarshipwv.com/",
      wallet: "Digital Portal",
      walletClass: "other",
      offCampus: true,
      dualDiploma: true,
      landingUrl: "#asesoria",
      featured: false
    }
  ];

  // VIDEO REPOSITORY & PLACEHOLDER EMBEDS
  var VIDEO_DATABASE = {
    v1: {
      title: {
        es: "ClassWallet: Cómo buscar a CHANAK TRAINUP EDUCATION INC y pagar mediante Pay Vendor",
        en: "ClassWallet: How to search CHANAK TRAINUP EDUCATION INC and pay via Pay Vendor"
      },
      videoUrl: "https://www.youtube-nocookie.com/embed/fYr6kyaQ5V8?rel=0&autoplay=1&modestbranding=1",
      provider: "ClassWallet Official Walkthrough"
    },
    v2: {
      title: {
        es: "Arizona ESA: Uso de fondos en ClassWallet para Chanak K–12 y Dual Diploma",
        en: "Arizona ESA: Using ClassWallet funds for Chanak K–12 and Dual Diploma"
      },
      videoUrl: "https://www.youtube-nocookie.com/embed/W0ehmfxVGa8?rel=0&autoplay=1&modestbranding=1",
      provider: "Arizona ESA · ClassWallet Guide"
    },
    v3: {
      title: {
        es: "Florida Step Up / EMA: Cómo seleccionar servicios de Chanak en el Marketplace",
        en: "Florida Step Up / EMA: How to select Chanak services on the Marketplace"
      },
      videoUrl: "https://www.youtube-nocookie.com/embed/Z_7NG-FQq9g?rel=0&autoplay=1&modestbranding=1",
      provider: "Florida Step Up · EMA Marketplace"
    },
    v4: {
      title: {
        es: "Wyoming & Utah Odyssey: Guía de inscripción y liberación de fondos",
        en: "Wyoming & Utah Odyssey: Enrollment and fund disbursement guide"
      },
      videoUrl: "https://www.youtube-nocookie.com/embed/fYr6kyaQ5V8?rel=0&autoplay=1&modestbranding=1",
      provider: "Odyssey Parent Portal Guide"
    },
    v5: {
      title: {
        es: "New Hampshire EFA: Mentoría académica y facturación directa en ClassWallet",
        en: "New Hampshire EFA: Academic mentorship and direct invoicing in ClassWallet"
      },
      videoUrl: "https://www.youtube-nocookie.com/embed/7IadCPX-uRA?rel=0&autoplay=1&modestbranding=1",
      provider: "New Hampshire EFA Guide"
    },
    v6: {
      title: {
        es: "Alabama CHOOSE Act: Facturación mensual por alumno con Pay Vendor",
        en: "Alabama CHOOSE Act: Monthly invoicing per student with Pay Vendor"
      },
      videoUrl: "https://www.youtube-nocookie.com/embed/fYr6kyaQ5V8?rel=0&autoplay=1&modestbranding=1",
      provider: "Alabama CHOOSE · ClassWallet Guide"
    }
  };

  // CURRENT LANGUAGE STATE
  var currentLang = "es";
  try {
    var savedLang = localStorage.getItem("chanak_lang");
    if (savedLang === "en" || savedLang === "es") {
      currentLang = savedLang;
    }
  } catch (e) {}

  // RENDER MASTER TABLE
  function renderStateTable(filterQuery) {
    var tbody = document.getElementById("stateTableBody");
    var counterEl = document.getElementById("tableFilterCount");
    if (!tbody) return;

    var query = (filterQuery || "").toLowerCase().trim();
    var dict = I18N[currentLang];
    var filtered = STATE_ROWS.filter(function (row) {
      if (!query) return true;
      var sName = row.stateName[currentLang].toLowerCase();
      var pName = row.programName[currentLang].toLowerCase();
      var wName = row.wallet.toLowerCase();
      return sName.indexOf(query) !== -1 || pName.indexOf(query) !== -1 || wName.indexOf(query) !== -1;
    });

    tbody.innerHTML = "";
    filtered.forEach(function (row) {
      var tr = document.createElement("tr");
      if (row.featured) tr.className = "featured-state-row";

      var stateTd = document.createElement("td");
      stateTd.className = "state-name-cell";
      stateTd.innerHTML = "<span>" + row.flag + "</span> <strong>" + row.stateName[currentLang] + "</strong>";

      var progTd = document.createElement("td");
      progTd.innerHTML = '<a href="' + row.programUrl + '" target="_blank" rel="noopener noreferrer" style="color:var(--navy);font-weight:600;text-decoration:underline;text-underline-offset:2px">' + row.programName[currentLang] + ' ↗</a>';

      var walletTd = document.createElement("td");
      walletTd.innerHTML = '<span class="badge-wallet badge-' + row.walletClass + '">💳 ' + row.wallet + '</span>';

      var offCampusTd = document.createElement("td");
      offCampusTd.innerHTML = row.offCampus ? '<span class="badge-check">' + dict.badge_approved + '</span>' : '<span style="color:#94a3b8">--</span>';

      var dualTd = document.createElement("td");
      dualTd.innerHTML = row.dualDiploma ? '<span class="badge-check" style="background:#e0f2fe;color:#0369a1">' + dict.badge_compatible + '</span>' : '<span style="color:#94a3b8">--</span>';

      var actionTd = document.createElement("td");
      var isDirectLanding = row.landingUrl.startsWith("/");
      var btnText = isDirectLanding ? dict.btn_view_state : (currentLang === "es" ? "Consultar →" : "Inquire →");
      actionTd.innerHTML = '<a href="' + row.landingUrl + '" class="btn-table-action">' + btnText + '</a>';

      tr.appendChild(stateTd);
      tr.appendChild(progTd);
      tr.appendChild(walletTd);
      tr.appendChild(offCampusTd);
      tr.appendChild(dualTd);
      tr.appendChild(actionTd);
      tbody.appendChild(tr);
    });

    if (counterEl) {
      counterEl.textContent = dict.table_count_prefix + " " + filtered.length + " " + dict.table_count_suffix;
    }
  }

  // APPLY LANGUAGE TO DOM
  function applyLanguage(lang) {
    currentLang = lang;
    try {
      localStorage.setItem("chanak_lang", lang);
    } catch (e) {}

    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("data-lang", lang);

    var dict = I18N[lang];
    if (!dict) return;

    // Toggle button active states
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    // Replace data-i18n elements
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Replace data-i18n-placeholder elements
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (dict[key]) {
        el.setAttribute("placeholder", dict[key]);
      }
    });

    // Re-render table with new language
    var searchInput = document.getElementById("stateSearchInput");
    var q = searchInput ? searchInput.value : "";
    renderStateTable(q);
  }

  // VIDEO MODAL LOGIC
  function initVideoModal() {
    var modal = document.getElementById("chanakVideoModal");
    var titleEl = document.getElementById("chanakModalTitle");
    var iframe = document.getElementById("chanakModalIframe");
    var closeBtn = document.getElementById("chanakModalClose");

    if (!modal || !iframe) return;

    function openModal(videoKey) {
      var vid = VIDEO_DATABASE[videoKey];
      if (!vid) return;

      var titleText = vid.title[currentLang] || vid.title.es;
      if (titleEl) titleEl.textContent = titleText;
      iframe.setAttribute("src", vid.videoUrl);
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      modal.classList.remove("active");
      iframe.setAttribute("src", "");
      document.body.style.overflow = "";
    }

    // Attach click to video cards
    document.querySelectorAll("[data-video-key]").forEach(function (card) {
      card.addEventListener("click", function (e) {
        e.preventDefault();
        var key = card.getAttribute("data-video-key");
        openModal(key);
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }

    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
      }
    });
  }

  // INITIALIZATION ON DOM READY
  document.addEventListener("DOMContentLoaded", function () {
    // 1. Language Toggle Listeners
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var targetLang = btn.getAttribute("data-lang");
        if (targetLang && targetLang !== currentLang) {
          applyLanguage(targetLang);
        }
      });
    });

    // 2. State Table Search Filter
    var searchInput = document.getElementById("stateSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", function (e) {
        renderStateTable(e.target.value);
      });
    }

    // 3. Form Submission Simulation & Validation
    var form = document.getElementById("advisoryForm");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var alertSuccess = document.getElementById("formAlertSuccess");
        var alertError = document.getElementById("formAlertError");
        var privacyChecked = document.getElementById("fPrivacy") && document.getElementById("fPrivacy").checked;

        if (!privacyChecked) {
          if (alertError) {
            alertError.textContent = I18N[currentLang].form_error;
            alertError.style.display = "block";
          }
          if (alertSuccess) alertSuccess.style.display = "none";
          return;
        }

        if (alertError) alertError.style.display = "none";
        if (alertSuccess) {
          alertSuccess.textContent = I18N[currentLang].form_success;
          alertSuccess.style.display = "block";
        }
        form.reset();
      });
    }

    // 4. Video Lightbox Modal
    initVideoModal();

    // 5. Initial Language Apply
    applyLanguage(currentLang);
  });
})();
