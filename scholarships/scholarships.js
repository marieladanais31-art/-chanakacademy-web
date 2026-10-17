/**
 * Chanak International Academy · State Education Funds & Scholarships Hub
 * AOP-Style Hub: Jump Navigation, Master State Table Filter, Branded Video Modal,
 * Digital Wallets Guide, and 100% Zero-Reload Bilingual Switcher (EN / ES).
 * English is the primary default language.
 */
(function () {
  "use strict";

  // BILINGUAL DICTIONARY (EN is primary, ES is complete)
  var I18N = {
    en: {
      page_title: "State Education Funds & K–12 Educational Support | Chanak International Academy",
      page_desc: "Chanak International Academy: Virtual guided academic support, mentoring, and Life Skills for families using state school choice funds (ESA, EFA, UFA, PEP, CHOOSE, ESTF).",

      // Topbar & Nav
      topbar_text: "Official Nonpublic Educational Provider · Direct Pay Partner on ClassWallet & Odyssey",
      topbar_fldoe: "FLDOE Private School Code: #134620 · 501(c)(3) Nonprofit (EIN 36-5154011)",
      nav_sub: "Approved State ESA & Choice Programs",
      nav_cta: "Request Guidance / Itemized Invoice",
      state_select_default: "Select State / Program:",

      // Hero
      hero_badge: "✦ STATE EDUCATION FUNDS & SCHOOL CHOICE · 2026–2027 CYCLE ✦",
      hero_h1: "State Education Funds & K–12 Virtual Guided Learning",
      hero_lead: "Chanak International Academy is an FLDOE-registered private school (#134620), MSA-CESS candidate for accreditation, and approved nonpublic educational services provider in ClassWallet, Odyssey, and Step Up / EMA. Eligible families may request payment for authorized educational services using available program funds. Approval depends on the service, student, and applicable program rules.",
      hero_disclaimer: "* This support package does not constitute full school enrollment or independently award graduation credits or a High School diploma.",
      pill_entity: "Approved Entity: CHANAK TRAINUP EDUCATION INC",
      pill_wallets: "Official Platforms: ClassWallet, Odyssey & EMA",
      pill_msa: "Accreditation: MSA-CESS Official Candidate",
      pill_transcript: "Deliverables: Academic progress records & monthly reports",
      btn_explore_states: "Explore States & Platforms ↓",
      btn_request_guidance: "Request Free Guidance →",

      // Jump Nav
      jump_label: "Jump to section:",
      jump_states: "Approved States",
      jump_wallets: "Digital Platforms",
      jump_videos: "Video Tutorials",
      jump_guides: "Step-by-Step Guides",
      jump_faq: "Frequently Asked Questions",
      jump_advisory: "Free Consultation",

      // Trust bar
      trust_fldoe: "FLDOE Registered Private School #134620",
      trust_msa: "MSA-CESS Official Candidate for Accreditation",
      trust_nonprofit: "501(c)(3) Nonprofit: Chanak TrainUp Education Inc.",
      trust_directpay: "Official State Wallet Payment Processing",

      // Concepts Section
      concepts_badge: "SCHOOL CHOICE ESSENTIALS",
      concepts_title: "How Do State Education Funds Work for Families?",
      concepts_lead: "School choice policies allow families to apply state-allocated public education funding toward authorized customized distance-learning support services for their children.",
      concept1_title: "1. Education Savings Accounts (ESA / EFA / UFA)",
      concept1_desc: "State-funded accounts managed through a digital platform where families spend authorized amounts on qualifying educational services, curriculum, and diagnostic benchmarks.",
      concept2_title: "2. State ESA & School Choice Funds",
      concept2_desc: "Legislative school choice programs (such as AL CHOOSE, SC ESTF, or FL PEP) designed to empower parents to contract approved educational providers.",
      concept3_title: "3. Direct-Pay Digital Platforms",
      concept3_desc: "Approved platforms like ClassWallet or Odyssey where you find CHANAK TRAINUP EDUCATION INC and request payment authorization with your available program funds.",
      curric_cost_title: "Curriculum Material Costs & Official Publisher Catalogs",
      curric_cost_lead: "In the United States, curriculum books and worktexts are purchased directly by families from official publishers according to the student's Individualized Learning Plan (ILP). You can verify current prices directly with publishers:",
      curric_cost_footer: "* Chanak Life Skills & Leadership materials are included in the monthly support package at no extra charge.",

      // Table Section
      table_badge: "STATE FUNDING DIRECTORY",
      table_title: "Approved States, Platforms & Service Status",
      table_lead: "Explore approved programs, management platforms, provider status, and authorized Chanak support services. Use the instant search bar to find your state.",
      search_placeholder: "Search state (e.g. Arizona, Utah, Wyoming, Florida, Alabama, South Carolina, New Hampshire...)",
      table_count_prefix: "Showing",
      table_count_suffix: "programs and states",
      th_state: "State",
      th_program: "State Program",
      th_wallet: "Platform",
      th_approval: "Provider Status",
      th_service: "Authorized Service",
      th_offering: "Published Offering",
      th_payment: "Payment Modality",
      th_action: "State Guide",
      badge_approved: "Approved Vendor",
      badge_directory: "State Directory Listed",
      badge_ema: "Authorized Provider",
      badge_direct_pay: "Direct Pay (Pay Vendor)",
      badge_odyssey_pay: "Direct Invoicing (Odyssey)",
      badge_ema_pay: "Direct Payment (EMA)",
      btn_view_state: "View State Guide →",

      // Digital Wallets Section
      wallets_badge: "DIGITAL PLATFORMS & INVOICING",
      wallets_title: "How Payment is Managed in Each Platform",
      wallets_lead: "Chanak is formally registered under its legal non-profit entity: CHANAK TRAINUP EDUCATION INC. Follow the workflow of your state platform to request payment authorizations smoothly.",
      wallet_cw_title: "ClassWallet (Pay Vendor)",
      wallet_cw_states: "AZ · AL · SC · NH",
      wallet_cw_desc: "Used by Arizona ESA, Alabama CHOOSE, South Carolina ESTF, and New Hampshire EFA.",
      wallet_cw_s1: "Chanak issues an itemized official PDF quote or invoice per student for the authorized service.",
      wallet_cw_s2: "Log in to your parent portal at app.classwallet.com and select 'Pay Vendor'.",
      wallet_cw_s3: "Search for our approved legal entity: CHANAK TRAINUP EDUCATION INC.",
      wallet_cw_s4: "Upload the invoice and submit for payment authorization using your available state funds.",

      wallet_ody_title: "Odyssey Marketplace",
      wallet_ody_states: "Wyoming · Utah",
      wallet_ody_desc: "Official platform for Wyoming ESA and Utah Fits All Scholarship (UFA).",
      wallet_ody_s1: "Log in with your family credentials to withodyssey.com on your awarded account.",
      wallet_ody_s2: "Locate Chanak TrainUp Education Inc. in the official state provider directory.",
      wallet_ody_s3: "Select the authorized academic support package for your student's grade level.",
      wallet_ody_s4: "Disbursement is authorized and released following monthly educational service delivery.",

      wallet_ema_title: "Step Up for Students (EMA)",
      wallet_ema_states: "Florida (PEP & FES-UA)",
      wallet_ema_desc: "Florida's official portal for personalized education savings accounts.",
      wallet_ema_s1: "Log in to the EMA portal at Step Up for Students.",
      wallet_ema_s2: "Search for Chanak International Academy under authorized instructional service providers.",
      wallet_ema_s3: "Select authorized Florida Home Education Instructional Program (HEIP) services.",
      wallet_ema_s4: "Authorize payment using your PEP or FES-UA account balance in accordance with EMA rules.",

      // Video Gallery Section
      videos_badge: "OFFICIAL CHANAK TUTORIALS",
      videos_title: "Video Tutorials: How to Use Your Funds Step-by-Step",
      videos_lead: "Visual walkthroughs explaining how to log in, locate CHANAK TRAINUP EDUCATION INC, and submit invoices for state payment authorization.",
      video_btn_watch: "Watch Video Tutorial ▶",
      video_modal_close: "Close",
      video_modal_hint: "Press ESC or click outside the video player to close.",

      v1_title: "ClassWallet: How to search CHANAK TRAINUP EDUCATION INC and pay via Pay Vendor",
      v1_desc: "Step-by-step tutorial for ClassWallet families: finding our legal entity, uploading your official PDF invoice, and submitting for payment authorization.",
      v1_time: "3:30 min",

      v2_title: "Arizona ESA: Using ClassWallet funds for Chanak K–12 Academic Support",
      v2_desc: "Complete walkthrough for Arizona ESA parents: service coverage, monthly billing, and academic mentoring tracking in ClassWallet.",
      v2_time: "4:15 min",

      v3_title: "Florida Step Up / EMA: How to select Chanak services on the Marketplace",
      v3_desc: "Step-by-step guide for Florida PEP and FES-UA families navigating the EMA portal and booking authorized HEIP educational services.",
      v3_time: "3:50 min",

      v4_title: "Wyoming & Utah Odyssey: Enrollment and fund disbursement guide",
      v4_desc: "Understand the Odyssey workflow for Wyoming ESA and Utah Fits All: linking service listings and post-service disbursement.",
      v4_time: "4:00 min",

      v5_title: "New Hampshire EFA: Academic mentorship and direct invoicing in ClassWallet",
      v5_desc: "Guidance for New Hampshire families with CSF NH accounts: approved mentoring classifications and monthly reporting.",
      v5_time: "3:20 min",

      v6_title: "Alabama CHOOSE Act: Monthly invoicing per student with Pay Vendor",
      v6_desc: "How Alabama parents use CHOOSE Act funds via Pay Vendor with itemized monthly invoices and initial diagnostic assessment.",
      v6_time: "3:45 min",

      // Guides Section
      guides_badge: "ARTICLES & OFFICIAL DOCUMENTATION",
      guides_title: "Practical Guides for ESA & State Choice Families",
      guides_lead: "In-depth resources compiled by our admissions and compliance team to maximize your state ESA benefits within program rules.",
      g1_cat: "BILLING & DIRECT PAY",
      g1_title: "Requirements for an Approved Invoice in ClassWallet and Odyssey",
      g1_desc: "Key elements required on Chanak's itemized invoices (student legal name, vendor EIN, line-item service coding) to ensure compliant state processing.",
      g2_cat: "STATE COMPLIANCE",
      g2_title: "K–12 State Accountability: Standardized Testing & ILP",
      g2_desc: "How Chanak structures annual standardized testing options and Individualized Learning Plans (ILP) aligned with school choice accountability requirements.",
      g3_cat: "ACADEMIC PROGRESS",
      g3_title: "Academic Progress Records & Monthly Service Reports",
      g3_desc: "How Chanak documents student milestones, reviews learning mastery, and issues monthly progress reports for the contracted support services.",

      // Advisory Form Section
      form_badge: "INITIAL INQUIRY & GUIDANCE",
      form_title: "Request Information on State ESA Services",
      form_lead: "Submit your details below and our bilingual academic advisory team will follow up to assist you with state-specific guidelines and invoice requirements.",
      lbl_parent: "Parent / Guardian Name *",
      ph_parent: "e.g. Maria Perez",
      lbl_email: "Email Address *",
      ph_email: "name@example.com",
      lbl_phone: "Phone / WhatsApp (Optional)",
      ph_phone: "+1 (555) 000-0000",
      lbl_state: "State of Residence *",
      lbl_program_name: "ESA / State Program (Optional)",
      ph_program_name: "e.g. Arizona ESA, Utah Fits All, PEP...",
      lbl_grade: "Student Grade Band (Optional)",
      opt_select_grade: "-- Select Grade / Age Band --",
      opt_grade_k5: "Elementary School (Grades K–5 / Ages 5–11)",
      opt_grade_68: "Middle School (Grades 6–8 / Ages 11–14)",
      opt_grade_912: "High School (Grades 9–12 / Ages 14–18)",
      lbl_service: "Service of Interest (Optional)",
      opt_serv_support: "Virtual Guided Learning Support (Monthly Mentoring + Life Skills)",
      opt_serv_eval: "Initial Academic Assessment and Learning Plan Setup ($295)",
      opt_serv_ls: "Standalone Life Skills & Leadership ($120/mo, subject to confirmation)",
      opt_serv_info: "General State ESA Information",
      lbl_schedule: "Preferred Contact Window & Time Zone (Optional)",
      opt_sched_any: "Any time / Flexible",
      opt_sched_m_et: "Morning (Eastern Time - ET)",
      opt_sched_a_et: "Afternoon (Eastern Time - ET)",
      opt_sched_m_ct: "Morning (Central Time - CT)",
      opt_sched_a_ct: "Afternoon (Central Time - CT)",
      opt_sched_m_mt: "Morning (Mountain Time - MT)",
      opt_sched_a_mt: "Afternoon (Mountain Time - MT)",
      opt_sched_m_pt: "Morning (Pacific Time - PT)",
      opt_sched_a_pt: "Afternoon (Pacific Time - PT)",
      lbl_privacy: "I agree to be contacted by Chanak regarding this inquiry in accordance with the <a href=\"/privacidad/en/\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--navy);font-weight:600;text-decoration:underline\">Privacy Policy</a>. *",
      lbl_newsletter: "Keep me updated with educational resources and school choice updates (optional).",
      btn_submit_form: "Send Inquiry / Request Information →",
      btn_submitting: "Sending Inquiry…",
      form_success: "✓ Thank you! Your inquiry has been received. Our admissions team will review your state details and reach out within 24 business hours.",
      form_error: "Please enter your name, a valid email address, state, and accept the response consent to proceed.",

      // FAQ Section
      faq_badge: "FREQUENTLY ASKED QUESTIONS",
      faq_title: "Common Questions About State Education Funds",
      faq_lead: "Clear answers to the most common questions from families using public school choice funds at Chanak International Academy.",
      faq1_q: "1. How does payment work with state ESA / choice funds?",
      faq1_a: "Eligible families may request payment for authorized services using available program funds. Approval depends on the service, student, and applicable program rules. In direct-pay states (such as Arizona, Alabama, South Carolina, or New Hampshire on ClassWallet, and Utah and Wyoming on Odyssey), Chanak provides the itemized quote or invoice for the family to submit directly through their platform.",
      faq2_q: "2. How does my family locate Chanak in our portal?",
      faq2_a: "Search for our exact approved legal entity: CHANAK TRAINUP EDUCATION INC. In ClassWallet, look under 'Pay Vendor'; in Odyssey, locate our profile in the official state provider directory.",
      faq3_q: "3. What if my child's ESA / funding is approved mid-year?",
      faq3_a: "Chanak maintains rolling admissions throughout the academic year. If your state funds are awarded midway through the year, we establish an individualized service plan and payment schedule aligned with your remaining available balance.",
      faq4_q: "4. Do unused funds roll over or transfer to another sibling?",
      faq4_a: "Policies vary by state. Generally, funds awarded to one student cannot be transferred to a sibling, but many state ESAs allow unused balances to roll over into subsequent academic years. Our team provides state-specific rules.",
      faq5_q: "5. Does this support package include official cumulative transcripts and diploma?",
      faq5_a: "This support package provides academic progress records, monthly progress reports, and pedagogical tracking of the contracted services. It does not constitute full school enrollment or independently award graduation credits or a High School diploma. Different full-enrollment academic pathways require their own contract, prerequisites, and program eligibility.",
      faq6_q: "6. How are state ESA services distinguished from private academic programs?",
      faq6_a: "State ESA funds are applied to contract specific authorized educational services (virtual guided support, academic mentoring, Life Skills cohorts, diagnostic assessment). Formal full-enrollment academic programs (such as private K-12 umbrella schooling or international dual diploma programs) operate under independent private contractual tracks.",
    },

    es: {
      page_title: "Fondos Educativos Estatales y Apoyo Educativo K–12 | Chanak International Academy",
      page_desc: "Chanak International Academy: Apoyo pedagógico guiado, mentoría y Life Skills para familias con fondos ESA y programas de elección escolar (ESA, EFA, UFA, PEP, CHOOSE, ESTF).",

      // Topbar & Nav
      topbar_text: "Proveedor Oficial Escolar No Público · Socio Direct Pay en ClassWallet y Odyssey",
      topbar_fldoe: "Código FLDOE: #134620 · Organización Sin Ánimo de Lucro 501(c)(3) (EIN 36-5154011)",
      nav_sub: "Programas y Servicios Aprobados con Fondos ESA",
      nav_cta: "Solicitar Orientación / Factura Proforma",
      state_select_default: "Seleccionar Estado / Programa:",

      // Hero
      hero_badge: "✦ FONDOS EDUCATIVOS Y ELECCIÓN ESCOLAR · CICLO 2026–2027 ✦",
      hero_h1: "Fondos Educativos Estatales y Apoyo Virtual Guiado K–12",
      hero_lead: "Chanak International Academy es un colegio privado registrado en el FLDOE (#134620), candidato a acreditación MSA-CESS y proveedor no público de servicios educativos en ClassWallet, Odyssey y Step Up / EMA. Las familias elegibles pueden solicitar el pago de servicios autorizados con los fondos disponibles de su programa. La aprobación depende del servicio, del estudiante y de las reglas aplicables.",
      hero_disclaimer: "* Este paquete de apoyo no constituye una matrícula escolar completa ni confiere de forma independiente créditos de graduación o un diploma de High School.",
      pill_entity: "Entidad Aprobada: CHANAK TRAINUP EDUCATION INC",
      pill_wallets: "Plataformas Oficiales: ClassWallet, Odyssey y EMA",
      pill_msa: "Acreditación: Candidato Oficial MSA-CESS",
      pill_transcript: "Entregables: Registro pedagógico e informes mensuales de avance",
      btn_explore_states: "Explorar Estados y Plataformas ↓",
      btn_request_guidance: "Solicitar Orientación Gratuita →",

      // Jump Nav
      jump_label: "Ir a sección:",
      jump_states: "Estados Aprobados",
      jump_wallets: "Plataformas Digitales",
      jump_videos: "Video-Tutoriales",
      jump_guides: "Guías Paso a Paso",
      jump_faq: "Preguntas Frecuentes",
      jump_advisory: "Consulta Gratuita",

      // Trust bar
      trust_fldoe: "Colegio Privado Registrado en FLDOE #134620",
      trust_msa: "Candidato Oficial a Acreditación MSA-CESS",
      trust_nonprofit: "Nonprofit 501(c)(3): Chanak TrainUp Education Inc.",
      trust_directpay: "Gestión de Pago en Plataformas Estatales",

      // Concepts Section
      concepts_badge: "CONCEPTOS CLAVE DE ELECCIÓN ESCOLAR",
      concepts_title: "¿Cómo Funcionan los Fondos Estatales para Familias?",
      concepts_lead: "Las políticas de elección escolar (School Choice) permiten a las familias destinar los fondos públicos asignados a sus hijos a contratar servicios educativos personalizados de apoyo.",
      concept1_title: "1. Cuentas de Ahorro para la Educación (ESA / EFA / UFA)",
      concept1_desc: "Fondos estatales gestionados en una plataforma digital donde las familias autorizan pagos para servicios calificados de apoyo pedagógico, currículo y evaluaciones diagnósticas.",
      concept2_title: "2. Fondos ESA y Programas de Elección Escolar",
      concept2_desc: "Programas creados por leyes estatales (como CHOOSE en Alabama, ESTF en Carolina del Sur o PEP en Florida) para que las familias elijan proveedores autorizados.",
      concept3_title: "3. Plataformas Digitales de Pago Directo",
      concept3_desc: "Sistemas como ClassWallet u Odyssey donde buscas a CHANAK TRAINUP EDUCATION INC y solicitas la autorización de pago mensual con tus fondos disponibles según las reglas del programa.",
      curric_cost_title: "Costes de Materiales Curriculares y Catálogos Oficiales",
      curric_cost_lead: "En Estados Unidos, los libros y cuadernillos curriculares son adquiridos directamente por la familia a las editoriales oficiales según el Plan de Aprendizaje Individualizado (ILP). Puedes consultar los catálogos vigentes de las editoriales:",
      curric_cost_footer: "* Los materiales del programa Life Skills & Leadership de Chanak están incluidos en el paquete mensual sin coste adicional.",

      // Table Section
      table_badge: "DIRECTORIO MAESTRO DE FONDOS",
      table_title: "Estados Aprobados, Plataformas y Estatus del Servicio",
      table_lead: "Consulta los programas aprobados, la plataforma de gestión que utiliza cada estado, el estatus del proveedor y los servicios autorizados de Chanak. Usa el buscador para filtrar al instante.",
      search_placeholder: "Buscar estado (ej. Arizona, Utah, Wyoming, Florida, Alabama, South Carolina, New Hampshire...)",
      table_count_prefix: "Mostrando",
      table_count_suffix: "programas y estados",
      th_state: "Estado",
      th_program: "Programa Estatal",
      th_wallet: "Plataforma",
      th_approval: "Estatus Proveedor",
      th_service: "Servicio Autorizado",
      th_offering: "Oferta Publicada",
      th_payment: "Modalidad de Pago",
      th_action: "Guía del Estado",
      badge_approved: "Proveedor Aprobado",
      badge_directory: "Listado en Directorio Estatal",
      badge_ema: "Proveedor Autorizado",
      badge_direct_pay: "Direct Pay (Pay Vendor)",
      badge_odyssey_pay: "Facturación Directa (Odyssey)",
      badge_ema_pay: "Pago Directo (EMA)",
      btn_view_state: "Ver Guía Estatal →",

      // Digital Wallets Section
      wallets_badge: "PLATAFORMAS DIGITALES Y FACTURACIÓN",
      wallets_title: "Cómo Gestionar el Pago a Chanak en Cada Plataforma",
      wallets_lead: "Chanak está registrada formalmente bajo su entidad legal sin fines de lucro: CHANAK TRAINUP EDUCATION INC. Sigue el flujo específico de tu plataforma para autorizar tus pagos con orden.",
      wallet_cw_title: "ClassWallet (Pay Vendor)",
      wallet_cw_states: "AZ · AL · SC · NH",
      wallet_cw_desc: "Utilizado por Arizona ESA, Alabama CHOOSE, Carolina del Sur ESTF y New Hampshire EFA.",
      wallet_cw_s1: "Chanak emite mensualmente la cotización o factura oficial en PDF por cada alumno para el servicio autorizado.",
      wallet_cw_s2: "Ingresas a tu portal familiar en app.classwallet.com y seleccionas 'Pay Vendor'.",
      wallet_cw_s3: "Buscas la entidad legal aprobada: CHANAK TRAINUP EDUCATION INC.",
      wallet_cw_s4: "Subes la factura y solicitas la autorización del pago con el saldo disponible de tus fondos ESA.",

      wallet_ody_title: "Odyssey Marketplace",
      wallet_ody_states: "Wyoming · Utah",
      wallet_ody_desc: "Plataforma oficial para Wyoming ESA y Utah Fits All Scholarship (UFA).",
      wallet_ody_s1: "Accedes con tus credenciales a withodyssey.com en la cuenta asignada a tu familia.",
      wallet_ody_s2: "Localizas a Chanak TrainUp Education Inc. en el catálogo o directorio oficial de proveedores.",
      wallet_ody_s3: "Seleccionas el paquete de apoyo educativo autorizado correspondiente al nivel de tu hijo.",
      wallet_ody_s4: "El desembolso se autoriza y libera tras la prestación efectiva del servicio académico mensual.",

      wallet_ema_title: "Step Up for Students (EMA)",
      wallet_ema_states: "Florida (PEP & FES-UA)",
      wallet_ema_desc: "Portal oficial del estado de Florida para cuentas de educación personalizada.",
      wallet_ema_s1: "Ingresas al portal EMA (Education Market Assistant) de Step Up for Students.",
      wallet_ema_s2: "Buscas a Chanak International Academy dentro de los servicios autorizados de instrucción en el hogar.",
      wallet_ema_s3: "Seleccionas los módulos autorizados del programa Florida Home Education Instructional Program (HEIP).",
      wallet_ema_s4: "Autorizas el pago con el saldo de tus fondos PEP o FES-UA conforme a las reglas de EMA.",

      // Video Gallery Section
      videos_badge: "TUTORIALES OFICIALES CHANAK",
      videos_title: "Video-Tutoriales: Cómo Usar tus Fondos Paso a Paso",
      videos_lead: "Aprende de forma visual y guiada cómo ingresar a tu plataforma, buscar a CHANAK TRAINUP EDUCATION INC y enviar tu orden de servicio.",
      video_btn_watch: "Ver Video Tutorial ▶",
      video_modal_close: "Cerrar",
      video_modal_hint: "Presiona la tecla ESC o haz clic fuera del reproductor para cerrar.",

      v1_title: "ClassWallet: Cómo buscar a CHANAK TRAINUP EDUCATION INC y pagar mediante Pay Vendor",
      v1_desc: "Tutorial paso a paso para familias con ClassWallet: localización de la entidad legal, carga de factura proforma y solicitud de pago.",
      v1_time: "3:30 min",

      v2_title: "Arizona ESA: Uso de fondos en ClassWallet para Servicios de Apoyo K–12",
      v2_desc: "Guía para familias de Arizona con fondos ESA: cobertura del servicio de apoyo, facturación mensual y registro académico en ClassWallet.",
      v2_time: "4:15 min",

      v3_title: "Florida Step Up / EMA: Cómo seleccionar servicios de Chanak en el Marketplace",
      v3_desc: "Paso a paso para familias de Florida con fondos PEP o FES-UA: navegación en el portal EMA y solicitud de servicios educativos autorizados.",
      v3_time: "3:50 min",

      v4_title: "Wyoming & Utah Odyssey: Guía de inscripción y liberación de fondos",
      v4_desc: "Aprende cómo funciona el flujo de Odyssey para Wyoming ESA y Utah Fits All: vinculación de oferta y desembolso post-servicio.",
      v4_time: "4:00 min",

      v5_title: "New Hampshire EFA: Mentoría académica y facturación directa en ClassWallet",
      v5_desc: "Instrucciones para familias de New Hampshire gestionadas por CSF NH: clasificación como servicio de mentoría y reporte mensual.",
      v5_time: "3:20 min",

      v6_title: "Alabama CHOOSE Act: Facturación mensual por alumno con Pay Vendor",
      v6_desc: "Cómo aplicar los fondos de la ley CHOOSE en Alabama mediante Pay Vendor con factura desglosada y evaluación inicial.",
      v6_time: "3:45 min",

      // Guides Section
      guides_badge: "ARTÍCULOS Y DOCUMENTACIÓN OFICIAL",
      guides_title: "Guías Prácticas para Familias con Fondos",
      guides_lead: "Recursos informativos redactados por nuestro equipo legal y académico para orientar la gestión de servicios educativos estatales.",
      g1_cat: "FACTURACIÓN Y PAGOS",
      g1_title: "Requisitos de una Factura Aprobada en ClassWallet y Odyssey",
      g1_desc: "Descubre qué datos obligatorios incluye la factura de Chanak (nombre legal del alumno, código de proveedor EIN, desglose por conceptos) para evitar observaciones.",
      g2_cat: "LEGALIDAD Y CUMPLIMIENTO",
      g2_title: "Cumplimiento Estatal K–12: Evaluaciones Anuales y Plan ILP",
      g2_desc: "Cómo Chanak estructura las opciones de evaluación periódica y los Planes de Aprendizaje Individualizados (ILP) alineados con los requisitos de elección escolar.",
      g3_cat: "REGISTROS ACADÉMICOS",
      g3_title: "Registro de Progreso Académico e Informes Mensuales del Servicio",
      g3_desc: "Cómo Chanak documenta los logros del estudiante, revisa el dominio de conceptos y emite los informes mensuales de avance del servicio contratado.",

      // Advisory Form Section
      form_badge: "CONSULTA INICIAL Y ORIENTACIÓN",
      form_title: "Solicita Información sobre Servicios con Fondos Estatales",
      form_lead: "Completa el siguiente formulario para que nuestro equipo de admisiones y orientación te contacte y te asesore sobre los requisitos y procedimientos de tu estado.",
      lbl_parent: "Nombre completo del padre, madre o tutor *",
      ph_parent: "Ej. María Pérez",
      lbl_email: "Correo electrónico *",
      ph_email: "correo@ejemplo.com",
      lbl_phone: "Teléfono / WhatsApp (Opcional)",
      ph_phone: "+1 (555) 000-0000",
      lbl_state: "Estado de residencia *",
      lbl_program_name: "Programa o fondo estatal (Opcional)",
      ph_program_name: "Ej. Arizona ESA, Utah Fits All, PEP...",
      lbl_grade: "Grado o etapa escolar (Opcional)",
      opt_select_grade: "-- Seleccionar Grado / Edad --",
      opt_grade_k5: "Primaria / Elementary (Grados K–5 / 5–11 años)",
      opt_grade_68: "Secundaria / Middle School (Grados 6–8 / 11–14 años)",
      opt_grade_912: "Bachillerato / High School (Grados 9–12 / 14–18 años)",
      lbl_service: "Servicio de interés (Opcional)",
      opt_serv_support: "Apoyo Virtual Guiado (Mentoría mensual + Life Skills)",
      opt_serv_eval: "Evaluación Diagnóstica y Plan ILP ($295)",
      opt_serv_ls: "Clases de Life Skills y Liderazgo ($120/mes, sujeto a confirmación)",
      opt_serv_info: "Orientación general sobre fondos de mi estado",
      lbl_schedule: "Preferencia horaria y zona horaria (Opcional)",
      opt_sched_any: "Cualquier horario / Flexible",
      opt_sched_m_et: "Mañana (Zona Este - ET)",
      opt_sched_a_et: "Tarde (Zona Este - ET)",
      opt_sched_m_ct: "Mañana (Zona Central - CT)",
      opt_sched_a_ct: "Tarde (Zona Central - CT)",
      opt_sched_m_mt: "Mañana (Zona Montaña - MT)",
      opt_sched_a_mt: "Tarde (Zona Montaña - MT)",
      opt_sched_m_pt: "Mañana (Zona Pacífico - PT)",
      opt_sched_a_pt: "Tarde (Zona Pacífico - PT)",
      lbl_privacy: "Acepto que Chanak me contacte para responder a esta consulta según la <a href=\"/privacidad/\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--navy);font-weight:600;text-decoration:underline\">Política de Privacidad</a>. *",
      lbl_newsletter: "Deseo recibir novedades y recursos educativos sobre elección escolar (opcional).",
      btn_submit_form: "Enviar Consulta / Solicitar Información →",
      btn_submitting: "Enviando Consulta…",
      form_success: "✓ ¡Gracias! Tu consulta ha sido recibida con éxito. Nuestro equipo revisará la información de tu estado y te contactará en un plazo máximo de 24 horas laborables.",
      form_error: "Por favor, indica tu nombre, un correo válido, tu estado de residencia y acepta la casilla de respuesta a la consulta para continuar.",

      // FAQ Section
      faq_badge: "PREGUNTAS FRECUENTES",
      faq_title: "Dudas Habituales sobre Fondos Educativos Estatales",
      faq_lead: "Respuestas claras a las dudas más comunes de familias que utilizan fondos públicos en Chanak International Academy.",
      faq1_q: "1. ¿Cómo funciona el pago con mis fondos ESA / fondos estatales?",
      faq1_a: "Las familias elegibles pueden solicitar el pago de servicios autorizados con los fondos disponibles de su programa. La aprobación depende del servicio, del estudiante y de las reglas aplicables. En estados con pago directo activo (como Arizona, Alabama, Carolina del Sur o New Hampshire en ClassWallet, y Wyoming y Utah en Odyssey), Chanak emite la cotización o factura oficial para que la familia la tramite directamente a través de su plataforma.",
      faq2_q: "2. ¿Cómo busca mi familia a Chanak en la plataforma?",
      faq2_a: "Debes buscar exactamente nuestra entidad legal aprobada: CHANAK TRAINUP EDUCATION INC. En ClassWallet nos encuentras en la sección 'Pay Vendor', y en Odyssey en el directorio oficial de proveedores del estado.",
      faq3_q: "3. ¿Qué ocurre si me conceden los fondos a mitad de curso?",
      faq3_a: "Chanak cuenta con admisiones continuas a lo largo de todo el ciclo escolar. Si recibes la aprobación de tus fondos en cualquier momento del año, establecemos un plan de servicio individualizado y un calendario de pagos adaptado al saldo restante asignado por tu estado.",
      faq4_q: "4. ¿Los fondos no utilizados se acumulan o se pueden transferir a otro hermano?",
      faq4_a: "Cada estado tiene su propia normativa. En general, los fondos asignados a un alumno no pueden transferirse a otro hermano, pero muchas cuentas ESA permiten que el saldo remanente se acumule para el siguiente ciclo escolar. Te asesoramos según la ley de tu estado.",
      faq5_q: "5. ¿Este paquete de apoyo incluye expediente oficial y diploma de High School?",
      faq5_a: "Este paquete de apoyo proporciona un registro pedagógico de avance, informes mensuales de progreso y seguimiento pedagógico del servicio contratado. No constituye una matrícula escolar formal completa ni confiere de forma independiente créditos de graduación o un diploma de High School. Las diferentes modalidades de escolarización completa requieren contrato, requisitos y elegibilidad propios.",
      faq6_q: "6. ¿Qué diferencia hay entre los servicios con fondos ESA y los programas académicos privados?",
      faq6_a: "Con los fondos ESA y programas estatales de elección escolar, las familias contratan servicios educativos autorizados específicos (apoyo pedagógico guiado, mentoría quincenal, clases grupales de Life Skills, diagnóstico de nivel). Los programas académicos de matriculación escolar completa (como la Umbrella School privada K–12 o el Dual Diploma internacional) operan bajo vías contractuales privadas independientes.",
    }
  };

  // VERIFIED STATE DIRECTORY DATA FOR MASTER TABLE
  // Separating: State Program, Platform, Provider Approval, Authorized Service, Published Offering, Payment Modality
  var STATE_ROWS = [
    {
      stateName: { en: "Utah", es: "Utah" },
      flag: "🏔️",
      programName: { en: "Utah Fits All Scholarship (UFA)", es: "Utah Fits All Scholarship (UFA)" },
      programUrl: "https://www.utaheducationfitsall.org/",
      wallet: "Odyssey",
      walletClass: "odyssey",
      approval: { en: "State Directory Listed", es: "Listado en Directorio Estatal" },
      service: { en: "Academic Support & Mentoring", es: "Apoyo Académico y Mentoría" },
      offering: { en: "Grades K–12 Monthly Support", es: "Acompañamiento Mensual K–12" },
      payment: { en: "Direct Invoicing via Odyssey", es: "Facturación Directa vía Odyssey" },
      landingUrl: "/utah/",
      featured: true
    },
    {
      stateName: { en: "Wyoming", es: "Wyoming" },
      flag: "🦬",
      programName: { en: "Wyoming Education Savings Account (ESA)", es: "Wyoming Education Savings Account (ESA)" },
      programUrl: "https://edu.wyoming.gov/parents/education-savings-accounts/",
      wallet: "Odyssey",
      walletClass: "odyssey",
      approval: { en: "State Directory Listed", es: "Listado en Directorio Estatal" },
      service: { en: "Academic Support & Mentoring", es: "Apoyo Académico y Mentoría" },
      offering: { en: "Grades K–12 Monthly Support", es: "Acompañamiento Mensual K–12" },
      payment: { en: "Direct Invoicing via Odyssey", es: "Facturación Directa vía Odyssey" },
      landingUrl: "/wyoming/",
      featured: true
    },
    {
      stateName: { en: "Arizona", es: "Arizona" },
      flag: "🌵",
      programName: { en: "Empowerment Scholarship Account (ESA)", es: "Empowerment Scholarship Account (ESA)" },
      programUrl: "https://www.azed.gov/esa/",
      wallet: "ClassWallet",
      walletClass: "classwallet",
      approval: { en: "Approved Vendor", es: "Proveedor Aprobado" },
      service: { en: "Academic Support & Mentoring", es: "Apoyo Académico y Mentoría" },
      offering: { en: "Grades K–12 Monthly Support", es: "Acompañamiento Mensual K–12" },
      payment: { en: "Direct Pay via Pay Vendor", es: "Direct Pay vía Pay Vendor" },
      landingUrl: "/arizona/",
      featured: true
    },
    {
      stateName: { en: "Alabama", es: "Alabama" },
      flag: "🌲",
      programName: { en: "The CHOOSE Act of 2024", es: "The CHOOSE Act of 2024" },
      programUrl: "https://classwallet.com/alchoose/",
      wallet: "ClassWallet",
      walletClass: "classwallet",
      approval: { en: "Approved Vendor", es: "Proveedor Aprobado" },
      service: { en: "Academic Support & Mentoring", es: "Apoyo Académico y Mentoría" },
      offering: { en: "Grades K–12 Monthly Support", es: "Acompañamiento Mensual K–12" },
      payment: { en: "Direct Pay via Pay Vendor", es: "Direct Pay vía Pay Vendor" },
      landingUrl: "/alabama/",
      featured: true
    },
    {
      stateName: { en: "South Carolina", es: "Carolina del Sur" },
      flag: "🌴",
      programName: { en: "Education Scholarship Trust Fund (ESTF)", es: "Education Scholarship Trust Fund (ESTF)" },
      programUrl: "https://sc-estf-program.com/en/",
      wallet: "ClassWallet",
      walletClass: "classwallet",
      approval: { en: "Approved Vendor", es: "Proveedor Aprobado" },
      service: { en: "Academic Support & Mentoring", es: "Apoyo Académico y Mentoría" },
      offering: { en: "Grades K–12 Monthly Support", es: "Acompañamiento Mensual K–12" },
      payment: { en: "Direct Pay via Pay Vendor", es: "Direct Pay vía Pay Vendor" },
      landingUrl: "/south-carolina/",
      featured: true
    },
    {
      stateName: { en: "New Hampshire", es: "New Hampshire" },
      flag: "🍁",
      programName: { en: "Education Freedom Account (EFA)", es: "Education Freedom Account (EFA)" },
      programUrl: "https://nh.scholarshipfund.org/apply/nh-education-freedom-accounts/",
      wallet: "ClassWallet",
      walletClass: "classwallet",
      approval: { en: "Approved Vendor", es: "Proveedor Aprobado" },
      service: { en: "Academic Support & Mentoring", es: "Apoyo Académico y Mentoría" },
      offering: { en: "Grades K–12 Monthly Support", es: "Acompañamiento Mensual K–12" },
      payment: { en: "Direct Pay via Pay Vendor", es: "Direct Pay vía Pay Vendor" },
      landingUrl: "/new-hampshire/",
      featured: true
    },
    {
      stateName: { en: "Florida", es: "Florida" },
      flag: "☀️",
      programName: { en: "Step Up for Students (PEP & FES-UA)", es: "Step Up for Students (PEP & FES-UA)" },
      programUrl: "https://www.stepupforstudents.org/",
      wallet: "EMA Marketplace",
      walletClass: "ema",
      approval: { en: "Authorized Provider (HEIP)", es: "Proveedor Autorizado (HEIP)" },
      service: { en: "Home Education Instructional Program", es: "Programa de Instrucción en el Hogar" },
      offering: { en: "Service IDs: 20172869 / 20169280 / 20172870", es: "IDs de Servicio: 20172869 / 20169280 / 20172870" },
      payment: { en: "Direct Payment via EMA", es: "Pago Directo vía EMA" },
      landingUrl: "/florida-home-education/",
      featured: true
    }
  ];

  // VIDEO REPOSITORY & PLACEHOLDER EMBEDS
  var VIDEO_DATABASE = {
    v1: {
      title: {
        en: "ClassWallet: How to search CHANAK TRAINUP EDUCATION INC and pay via Pay Vendor",
        es: "ClassWallet: Cómo buscar a CHANAK TRAINUP EDUCATION INC y pagar mediante Pay Vendor"
      },
      videoUrl: "https://www.youtube-nocookie.com/embed/fYr6kyaQ5V8?rel=0&autoplay=1&modestbranding=1",
      provider: "ClassWallet Vendor Guide"
    },
    v2: {
      title: {
        en: "Arizona ESA: Using ClassWallet funds for Chanak K–12 Academic Support",
        es: "Arizona ESA: Uso de fondos en ClassWallet para Servicios de Apoyo K–12"
      },
      videoUrl: "https://www.youtube-nocookie.com/embed/g2qJgW98Z7s?rel=0&autoplay=1&modestbranding=1",
      provider: "Arizona ESA Support Guide"
    },
    v3: {
      title: {
        en: "Florida Step Up / EMA: How to select Chanak services on the Marketplace",
        es: "Florida Step Up / EMA: Cómo seleccionar servicios de Chanak en el Marketplace"
      },
      videoUrl: "https://www.youtube-nocookie.com/embed/rX3_pA2wI5A?rel=0&autoplay=1&modestbranding=1",
      provider: "Florida Step Up · EMA Guide"
    },
    v4: {
      title: {
        en: "Wyoming & Utah Odyssey: Enrollment and fund disbursement guide",
        es: "Wyoming & Utah Odyssey: Guía de inscripción y liberación de fondos"
      },
      videoUrl: "https://www.youtube-nocookie.com/embed/Vp4iRkE3_0c?rel=0&autoplay=1&modestbranding=1",
      provider: "Odyssey Parent Portal"
    },
    v5: {
      title: {
        en: "New Hampshire EFA: Academic mentorship and direct invoicing in ClassWallet",
        es: "New Hampshire EFA: Mentoría académica y facturación directa en ClassWallet"
      },
      videoUrl: "https://www.youtube-nocookie.com/embed/7IadCPX-uRA?rel=0&autoplay=1&modestbranding=1",
      provider: "New Hampshire EFA Guide"
    },
    v6: {
      title: {
        en: "Alabama CHOOSE Act: Monthly invoicing per student with Pay Vendor",
        es: "Alabama CHOOSE Act: Facturación mensual por alumno con Pay Vendor"
      },
      videoUrl: "https://www.youtube-nocookie.com/embed/fYr6kyaQ5V8?rel=0&autoplay=1&modestbranding=1",
      provider: "Alabama CHOOSE · ClassWallet Guide"
    }
  };

  // CURRENT LANGUAGE STATE: English is primary by default
  var currentLang = "en";
  try {
    var urlParams = new URLSearchParams(window.location.search);
    var urlLang = urlParams.get("lang");
    var savedLang = localStorage.getItem("chanak_lang");
    if (urlLang === "es" || urlLang === "en") {
      currentLang = urlLang;
    } else if (savedLang === "es" || savedLang === "en") {
      currentLang = savedLang;
    }
  } catch (e) {}

  // RENDER MASTER TABLE WITH SEPARATE FIELDS
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
      var sService = row.service[currentLang].toLowerCase();
      return sName.indexOf(query) !== -1 || pName.indexOf(query) !== -1 || wName.indexOf(query) !== -1 || sService.indexOf(query) !== -1;
    });

    tbody.innerHTML = "";
    filtered.forEach(function (row) {
      var tr = document.createElement("tr");
      if (row.featured) tr.className = "featured-state-row";

      // 1. State
      var stateTd = document.createElement("td");
      stateTd.className = "state-name-cell";
      stateTd.innerHTML = "<span>" + row.flag + "</span> <strong>" + row.stateName[currentLang] + "</strong>";

      // 2. Program
      var progTd = document.createElement("td");
      progTd.innerHTML = '<a href="' + row.programUrl + '" target="_blank" rel="noopener noreferrer" style="color:var(--navy);font-weight:600;text-decoration:underline;text-underline-offset:2px">' + row.programName[currentLang] + ' ↗</a>';

      // 3. Platform
      var walletTd = document.createElement("td");
      walletTd.innerHTML = '<span class="badge-wallet badge-' + row.walletClass + '">💳 ' + row.wallet + '</span>';

      // 4. Provider Approval Status
      var approvalTd = document.createElement("td");
      approvalTd.innerHTML = '<span class="badge-check">' + row.approval[currentLang] + '</span>';

      // 5. Authorized Service & Offering
      var serviceTd = document.createElement("td");
      serviceTd.innerHTML = '<div style="font-weight:600;color:var(--navy);font-size:13.5px">' + row.service[currentLang] + '</div>' +
                            '<div style="font-size:11.5px;color:var(--text-muted);margin-top:2px">' + row.offering[currentLang] + '</div>';

      // 6. Payment Modality
      var paymentTd = document.createElement("td");
      paymentTd.innerHTML = '<span style="font-size:12.5px;color:#047857;font-weight:600">✓ ' + row.payment[currentLang] + '</span>';

      // 7. Action
      var actionTd = document.createElement("td");
      var isDirectLanding = row.landingUrl.startsWith("/");
      var btnText = isDirectLanding ? dict.btn_view_state : (currentLang === "en" ? "Inquire →" : "Consultar →");
      actionTd.innerHTML = '<a href="' + row.landingUrl + '" class="btn-table-action">' + btnText + '</a>';

      tr.appendChild(stateTd);
      tr.appendChild(progTd);
      tr.appendChild(walletTd);
      tr.appendChild(approvalTd);
      tr.appendChild(serviceTd);
      tr.appendChild(paymentTd);
      tr.appendChild(actionTd);
      tbody.appendChild(tr);
    });

    if (counterEl) {
      counterEl.textContent = dict.table_count_prefix + " " + filtered.length + " " + dict.table_count_suffix;
    }
  }

  // APPLY LANGUAGE TO DOM (Zero reload, preserves form values)
  function applyLanguage(lang) {
    currentLang = lang;
    try {
      localStorage.setItem("chanak_lang", lang);
    } catch (e) {}

    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("data-lang", lang);

    var dict = I18N[lang];
    if (!dict) return;

    // Update document title and meta description
    if (dict.page_title) document.title = dict.page_title;
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && dict.page_desc) metaDesc.setAttribute("content", dict.page_desc);

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

      var titleText = vid.title[currentLang] || vid.title.en || vid.title.es;
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
      btn.addEventListener("click", function (e) {
        e.preventDefault();
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

    // 3. Real Backend Integration with /enviar-formulario.php
    var form = document.getElementById("advisoryForm");
    if (form) {
      form.addEventListener("submit", async function (e) {
        e.preventDefault();
        var alertSuccess = document.getElementById("formAlertSuccess");
        var alertError = document.getElementById("formAlertError");
        var submitBtn = document.getElementById("fSubmitBtn") || form.querySelector('button[type="submit"]');
        var dict = I18N[currentLang];

        var parentName = (document.getElementById("fParent") && document.getElementById("fParent").value) || "";
        var email = (document.getElementById("fEmail") && document.getElementById("fEmail").value) || "";
        var state = (document.getElementById("fState") && document.getElementById("fState").value) || "";
        var privacyChecked = document.getElementById("fPrivacy") && document.getElementById("fPrivacy").checked;

        // Validation of minimal required fields for initial inquiry
        if (!parentName.trim() || !email.trim() || !state || !privacyChecked) {
          if (alertError) {
            alertError.textContent = dict.form_error;
            alertError.style.display = "block";
          }
          if (alertSuccess) alertSuccess.style.display = "none";
          return;
        }

        if (alertError) alertError.style.display = "none";
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = dict.btn_submitting;
        }

        try {
          var formData = new FormData();
          formData.set("nombre", parentName.trim());
          formData.set("email", email.trim());

          var phoneVal = (document.getElementById("fPhone") && document.getElementById("fPhone").value) || "";
          if (phoneVal.trim()) formData.set("whatsapp", phoneVal.trim());

          formData.set("state", state);
          formData.set("pais", "Estados Unidos");
          formData.set("country_code", "US");

          var progNameVal = (document.getElementById("fProgName") && document.getElementById("fProgName").value) || "";
          if (progNameVal.trim()) formData.set("programa_estatal", progNameVal.trim());

          var gradeVal = (document.getElementById("fGrade") && document.getElementById("fGrade").value) || "";
          if (gradeVal) formData.set("etapa_educativa", gradeVal);

          var serviceVal = (document.getElementById("fProgram") && document.getElementById("fProgram").value) || "";
          if (serviceVal) formData.set("servicio", serviceVal);

          var scheduleVal = (document.getElementById("fSchedule") && document.getElementById("fSchedule").value) || "";
          if (scheduleVal) formData.set("preferencia_horaria", scheduleVal);

          var newsCheck = document.getElementById("fNewsletter") && document.getElementById("fNewsletter").checked;
          if (newsCheck) formData.set("newsletter_opt_in", "si");

          formData.set("consentimiento_consulta", "si");
          formData.set("necesidad", "classwallet");
          formData.set("origen", "Scholarships Hub (/scholarships/)");
          formData.set("language", currentLang);

          var params = new URLSearchParams(window.location.search);
          ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach(function (k) {
            if (params.has(k)) formData.set(k, params.get(k));
          });

          var response = await fetch("/enviar-formulario.php", {
            method: "POST",
            body: formData
          });

          var result = await response.json().catch(function () { return {}; });

          if (!response.ok || result.success !== true) {
            throw new Error(result.message || "Submission failed");
          }

          if (alertSuccess) {
            alertSuccess.textContent = dict.form_success;
            if (result.dossier) {
              var dLink = document.createElement("div");
              dLink.style.marginTop = "10px";
              dLink.innerHTML = '<a href="' + result.dossier + '" target="_blank" rel="noopener" style="color:#047857;font-weight:700;text-decoration:underline">📄 ' + (currentLang === "en" ? "Download information pack (PDF)" : "Descargar dossier informativo (PDF)") + '</a>';
              alertSuccess.appendChild(dLink);
            }
            alertSuccess.style.display = "block";
          }
          form.reset();
        } catch (err) {
          if (alertError) {
            alertError.textContent = currentLang === "en"
              ? "We could not record your submission. Please retry or email offcampus@chanakacademy.org directly."
              : "No pudimos registrar tu solicitud. Por favor intenta de nuevo o escríbenos a offcampus@chanakacademy.org.";
            alertError.style.display = "block";
          }
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = dict.btn_submit_form;
          }
        }
      });
    }

    // 4. Video Lightbox Modal
    initVideoModal();

    // 5. Initial Language Apply (English by default)
    applyLanguage(currentLang);
  });
})();
