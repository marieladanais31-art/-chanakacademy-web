/**
 * Chanak International Academy · State Education Funds & Scholarships Hub
 * AOP-Style Hub: Jump Navigation, Master State Table Filter, Branded Video Modal,
 * Digital Wallets Guide, and 100% Zero-Reload Bilingual Switcher (EN / ES).
 * English is the primary default language.
 */
(function () {
  "use strict";

  // BILINGUAL DICTIONARY (EN is primary, ES is complete - 100% key parity)
  var I18N = {
    en: {
      page_title: "ESA State Education Funds, ClassWallet & Odyssey | Bilingual Christian Guided Support | Chanak International Academy",
      page_desc: "State education funds (ESA, EFA, UFA, Step Up) on ClassWallet and Odyssey. Bilingual Christian guided academic support and Mastery Learning for homeschooling families.",

      // Topbar & Nav
      topbar_text: "Approved provider in the programs listed in the states table",
      topbar_fldoe: "Registered with the Florida DOE, code #134620 · 501(c)(3) Nonprofit (EIN 36-5154011)",
      nav_sub: "Approved State ESA & Choice Programs",
      nav_cta: "Request Guidance / Itemized Invoice",
      state_select_default: "Select State / Program:",

      // Jump Nav
      jump_label: "Jump to section:",
      jump_model: "60/20/20 Model",
      jump_pricing: "Services & Pricing",
      jump_states: "Approved States",
      jump_wallets: "Digital Platforms",
      jump_videos: "Video Tutorials",
      jump_guides: "Step-by-Step Guides",
      jump_faq: "Frequently Asked Questions",
      jump_curric: "Curriculum Costs",
      jump_advisory: "Free Consultation",

      // Hero
      hero_badge: "✦ STATE EDUCATION FUNDS & SCHOOL CHOICE · 2026–2027 CYCLE ✦",
      hero_h1: "State Education Funds & K–12 Virtual Guided Learning",
      hero_lead: "Guided academic support, bilingual (English and Spanish), Christian education and Mastery Learning, for families using state education funds.",
      hero_disclaimer: "* This support package does not constitute full school enrollment or independently award graduation credits or a High School diploma.",
      pill_entity: "Entity: Chanak TrainUp Education Inc. d/b/a Chanak International Academy",
      pill_wallets: "Platforms: ClassWallet, Odyssey & Step Up / EMA",
      pill_msa: "Candidate for MSA-CESS accreditation",
      pill_fldoe: "Registered with the Florida DOE, code #134620",
      btn_explore_states: "Explore States & Platforms ↓",
      btn_request_guidance: "Request Free Guidance →",

      // Trust bar
      trust_fldoe: "Registered with the Florida DOE, code #134620",
      trust_msa: "Candidate for MSA-CESS accreditation",
      trust_nonprofit: "501(c)(3) Nonprofit: Chanak TrainUp Education Inc. (EIN 36-5154011)",
      trust_directpay: "Official State Platform Payment Processing",

      // Model 60/20/20 Section
      model_badge: "OUR PEDAGOGICAL MODEL",
      model_title: "How We Teach: The 60/20/20 Model",
      model_lead: "A balanced, mastery-based approach combining American academic rigor, heritage language identity, and character-building leadership.",
      model_card1_title: "Core U.S. Curriculum",
      model_card1_desc: "Mastery Learning: students advance upon demonstrating solid mastery of each learning unit.",
      model_card2_title: "Heritage Language & Culture",
      model_card2_desc: "Spanish and cultural identity: preserving family roots alongside academic English fluency.",
      model_card3_title: "Life Skills & Biblical Worldview",
      model_card3_desc: "Weekly small group cohort class integrating practical life competencies and a biblical Christian worldview.",
      model_seal1: "Bilingual Support English–Spanish",
      model_seal2: "Christian Education",
      model_seal3: "Mastery Learning",

      // Services & Pricing Section
      pricing_badge: "AUTHORIZED SERVICES & PRICING",
      pricing_title: "Services & Pricing",
      pricing_lead: "Identical transparent pricing for scholarship families and direct-pay families. Itemized billing aligned with state guidelines.",
      serv_setup_tag: "Initial Setup & Academic Plan",
      serv_setup_title: "Enrollment, Initial Assessment and ILP Setup",
      serv_setup_desc: "Includes comprehensive initial academic assessment and the individualized learning plan (ILP) setup per student.",
      serv_setup_amount: "$295",
      serv_setup_period: "one-time fee / initial payment",
      serv_monthly_badge: "Monthly Guided Academic Support",
      serv_monthly_lead: "Continuous pedagogical guidance and weekly accountability tailored to each academic stage:",
      grade_k5_title: "Elementary School (Grades K–5)",
      grade_k5_rate: "$275",
      grade_68_title: "Middle School (Grades 6–8)",
      grade_68_rate: "$320",
      grade_912_title: "High School (Grades 9–12)",
      grade_912_rate: "$365",
      rate_month_unit: "/ month",
      feat_mentor: "Assigned academic mentor with weekly progress tracking",
      feat_lifeskills: "One weekly Life Skills class in small cohorts (60 min)",
      feat_coordination: "Academic coordination aligned with the family's chosen curriculum",
      feat_bilingual: "Bilingual support and mentoring in English and Spanish",
      pricing_invoice_note: "We invoice each service with an itemized invoice. If the platform assesses a processing fee, it appears as a separate line item.",

      // Table Section
      table_badge: "STATE FUNDING DIRECTORY",
      table_title: "Approved States, Platforms & Service Status",
      table_lead: "Explore approved programs, management platforms, provider status, and authorized Chanak support services. Use the instant search bar to find your state.",
      table_disclaimer: "Approval depends on each state's program, the specific service, and the student. Chanak does not guarantee coverage or funding amounts.",
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
      badge_registered: "Registered Vendor",
      badge_ema: "Authorized Provider (HEIP)",
      btn_view_state: "View State Guide →",

      // Digital Wallets Section
      wallets_badge: "DIGITAL PLATFORMS & INVOICING",
      wallets_title: "How Payment is Managed in Each Platform",
      wallets_lead: "Chanak is formally registered under its legal non-profit entity: CHANAK TRAINUP EDUCATION INC. Follow the workflow of your state platform to request payment authorizations smoothly.",
      wallets_security_note: "Important security notice: Chanak never asks families for their digital wallet passwords or login credentials (ClassWallet, Odyssey, Step Up / EMA).",
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

      v1_badge: "ClassWallet Guide",
      v1_title: "ClassWallet: How to search CHANAK TRAINUP EDUCATION INC and pay via Pay Vendor",
      v1_desc: "Step-by-step tutorial for ClassWallet families: finding our legal entity, uploading your official PDF invoice, and submitting for payment authorization.",
      v1_time: "3:30 min",

      v2_badge: "Arizona ESA",
      v2_title: "Arizona ESA: Using ClassWallet funds for Chanak K–12 Academic Support",
      v2_desc: "Complete walkthrough for Arizona ESA parents: service coverage, monthly billing, and academic mentoring tracking in ClassWallet.",
      v2_time: "4:15 min",

      v3_badge: "Florida Step Up",
      v3_title: "Florida Step Up / EMA: How to select Chanak services on the Marketplace",
      v3_desc: "Step-by-step guide for Florida PEP and FES-UA families navigating the EMA portal and booking authorized HEIP educational services.",
      v3_time: "3:50 min",

      v4_badge: "Wyoming & Utah",
      v4_title: "Wyoming & Utah Odyssey: Enrollment and fund disbursement guide",
      v4_desc: "Understand the Odyssey workflow for Wyoming ESA and Utah Fits All: linking service listings and post-service disbursement.",
      v4_time: "4:00 min",

      v5_badge: "New Hampshire EFA",
      v5_title: "New Hampshire EFA: Academic mentorship and direct invoicing in ClassWallet",
      v5_desc: "Guidance for New Hampshire families with CSF NH accounts: approved mentoring classifications and monthly reporting.",
      v5_time: "3:20 min",

      v6_badge: "Alabama CHOOSE",
      v6_title: "Alabama CHOOSE Act: Monthly invoicing per student with Pay Vendor",
      v6_desc: "How Alabama parents use CHOOSE Act funds via Pay Vendor with itemized monthly invoices and initial assessment.",
      v6_time: "3:45 min",

      // Guides Section
      guides_badge: "ARTICLES & OFFICIAL DOCUMENTATION",
      guides_title: "Practical Guides for Scholarship Families",
      guides_lead: "In-depth resources compiled by our admissions and compliance team to maximize your state scholarship benefits.",
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
      form_title: "Request Information on State Scholarship Services",
      form_lead: "Submit your details below and our bilingual academic advisory team will follow up to assist you with state-specific guidelines and invoice requirements.",
      lbl_parent: "Parent / Guardian Name *",
      ph_parent: "e.g. Maria Perez",
      lbl_email: "Email Address *",
      ph_email: "name@example.com",
      lbl_phone: "Phone / WhatsApp (Optional)",
      ph_phone: "+1 (555) 000-0000",
      lbl_state: "State of Residence *",
      lbl_program_name: "Scholarship Program (Optional)",
      ph_program_name: "e.g. Arizona ESA, Utah Fits All, PEP...",
      lbl_grade: "Student Grade Band (Optional)",
      opt_select_grade: "-- Select Grade / Age Band --",
      opt_grade_k5: "Elementary School (Grades K–5 / Ages 5–11)",
      opt_grade_68: "Middle School (Grades 6–8 / Ages 11–14)",
      opt_grade_912: "High School (Grades 9–12 / Ages 14–18)",
      lbl_service: "Service of Interest (Optional)",
      opt_serv_support: "Monthly Guided Academic Support ($275–$365/mo)",
      opt_serv_eval: "Enrollment, Initial Assessment and ILP Setup ($295)",
      opt_serv_info: "General State Scholarship Information",
      lbl_pref_lang: "Preferred Communication Language (Optional)",
      opt_lang_es: "Español",
      opt_lang_en: "English",
      opt_lang_both: "Ambos / Both (Bilingual)",
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
      faq1_q: "1. How does payment work with state scholarship funds?",
      faq1_a: "Eligible families may request payment for authorized services using available program funds. Approval depends on each state's program, the specific service, and the student. Chanak does not guarantee coverage or funding amounts. In direct-pay states (such as Arizona, Alabama, South Carolina, or New Hampshire on ClassWallet, and Utah and Wyoming on Odyssey), Chanak provides the itemized quote or invoice for the family to submit directly through their platform.",
      faq2_q: "2. How does my family locate Chanak in our portal?",
      faq2_a: "Search for our exact approved legal entity: CHANAK TRAINUP EDUCATION INC. In ClassWallet, look under 'Pay Vendor'; in Odyssey, locate our profile in the official state provider directory; in Florida EMA, select Chanak International Academy under Home Education Instructional Program.",
      faq3_q: "3. What if my child's scholarship is approved mid-year?",
      faq3_a: "Chanak maintains rolling admissions throughout the academic year. If your state funds are awarded midway through the year, we establish an individualized service plan and payment schedule aligned with your remaining available balance.",
      faq4_q: "4. Do unused funds roll over or transfer to another sibling?",
      faq4_a: "Policies vary by state. Generally, funds awarded to one student cannot be transferred to a sibling, but many state programs allow unused balances to roll over into subsequent academic years. Our team provides state-specific rules.",
      faq5_q: "5. Does this support package include official cumulative transcripts and diploma?",
      faq5_a: "This support package provides academic progress records, monthly progress reports, and pedagogical tracking of the contracted services. It does not constitute full school enrollment or independently award graduation credits or a High School diploma. Formal full-time enrollment programs with diploma operate under separate contractual pathways.",
      faq6_q: "6. How are state scholarship services distinguished from private academic programs?",
      faq6_a: "State scholarship funds are applied to contract specific authorized educational services (virtual guided academic support, weekly mentoring, Life Skills cohorts, initial assessment). Formal full-enrollment academic programs (such as private K-12 umbrella schooling or international dual diploma programs) operate under independent private contractual tracks.",
      faq7_q: "7. Does Chanak teach with Christian values?",
      faq7_a: "Yes: a biblical Christian worldview is integrated into the 20% Life Skills component and mentorship sessions, using materials from Christian publishers chosen by the family (such as LIFEPAC, Christian Light, or A.C.E.).",
      faq8_q: "8. Do you provide support in Spanish?",
      faq8_a: "Yes: all guided academic support, mentoring sessions, parent communications, and advisement are fully offered in both English and Spanish.",

      // Curriculum Costs Section (at end of page)
      curric_cost_title: "Curriculum costs (not charged by Chanak)",
      curric_cost_lead: "These costs belong to the publishers, are paid directly to them, and are independent of Chanak's enrollment and academic support. They are approximate; please verify current prices in each publisher's catalog.",
      curric_cost_disclaimer: "Chanak supports families with any of these options, without requiring you to choose a specific one.",
      curric_cost_footer: "* Chanak Life Skills materials are included in the monthly support package at no extra charge.",
      curric_aop_title: "📘 AOP LIFEPAC",
      curric_aop_catalog: "Catalog ↗",
      curric_aop_desc: "Approx. <strong>~$45 – $50 USD</strong> per subject (10 worktexts + teacher guide).<br>5-subject annual set: approx. <strong>$440 – $485 USD</strong>.<br>Grade 1 Learning to Read: approx. $108 USD.",
      curric_cle_title: "📖 Christian Light (CLE)",
      curric_cle_catalog: "Catalog ↗",
      curric_cle_desc: "Approx. <strong>~$55 USD</strong> per subject (10 LightUnits; $277/yr student worktexts).<br>Complete set with teacher guides: approx. <strong>$390 – $430 USD</strong>.<br>Learning to Read kit: approx. $177 USD.",
      curric_ace_title: "✝️ A.C.E. School of Tomorrow",
      curric_ace_catalog: "Catalog ↗",
      curric_ace_desc: "Middle & High School (5–12): approx. <strong>$320 – $390 USD / year</strong>.<br>Elementary (1–4): approx. <strong>$460 – $530 USD / year</strong>.<br>ABCs with Ace and Christi reading kit: $380 – $440 USD.",

      // Footer
      footer_msa_disclaimer: "Chanak International Academy is a candidate for MSA-CESS accreditation. It is not an accredited school.",
      footer_desc: "American private school registered with the Florida Department of Education (FLDOE #134620). Candidate for accreditation with Middle States Association (MSA-CESS). Operated by Chanak TrainUp Education Inc., a registered 501(c)(3) nonprofit organization (EIN 36-5154011).",
      footer_legal: "Chanak TrainUp Education Inc. (d/b/a Chanak International Academy), Florida nonprofit 501(c)(3), FLDOE #134620, candidate for MSA-CESS accreditation. State education scholarship usage is subject to student eligibility and individual state program guidelines. All rights reserved © 2026–2027."
    },

    es: {
      page_title: "Fondos Educativos Estatales ESA, ClassWallet y Odyssey | Apoyo Bilingüe y Educación Cristiana | Chanak International Academy",
      page_desc: "Fondos educativos estatales (ESA, EFA, UFA, Step Up) en ClassWallet y Odyssey. Acompañamiento académico guiado bilingüe, educación cristiana y Mastery Learning.",

      // Topbar & Nav
      topbar_text: "Proveedor aprobado en los programas indicados en la tabla de estados",
      topbar_fldoe: "Registrada ante el FLDOE, código #134620 · Organización Sin Ánimo de Lucro 501(c)(3) (EIN 36-5154011)",
      nav_sub: "Programas y Servicios Aprobados con Fondos ESA",
      nav_cta: "Solicitar Orientación / Factura Proforma",
      state_select_default: "Seleccionar Estado / Programa:",

      // Jump Nav
      jump_label: "Ir a sección:",
      jump_model: "Modelo 60/20/20",
      jump_pricing: "Servicios y Precios",
      jump_states: "Estados Aprobados",
      jump_wallets: "Plataformas Digitales",
      jump_videos: "Video-Tutoriales",
      jump_guides: "Guías Paso a Paso",
      jump_faq: "Preguntas Frecuentes",
      jump_curric: "Costos de Currículo",
      jump_advisory: "Consulta Gratuita",

      // Hero
      hero_badge: "✦ FONDOS EDUCATIVOS Y ELECCIÓN ESCOLAR · CICLO 2026–2027 ✦",
      hero_h1: "Fondos Educativos Estatales y Apoyo Virtual Guiado K–12",
      hero_lead: "Acompañamiento académico guiado, bilingüe (inglés y español), con educación cristiana y Mastery Learning, para familias con fondos estatales.",
      hero_disclaimer: "* Este paquete de apoyo no constituye una matrícula escolar completa ni confiere de forma independiente créditos de graduación o un diploma de High School.",
      pill_entity: "Entidad: Chanak TrainUp Education Inc. d/b/a Chanak International Academy",
      pill_wallets: "Plataformas: ClassWallet, Odyssey y Step Up / EMA",
      pill_msa: "Candidata a la acreditación MSA-CESS",
      pill_fldoe: "Registrada ante el FLDOE, código #134620",
      btn_explore_states: "Explorar Estados y Plataformas ↓",
      btn_request_guidance: "Solicitar Orientación Gratuita →",

      // Trust bar
      trust_fldoe: "Registrada ante el FLDOE, código #134620",
      trust_msa: "Candidata a la acreditación MSA-CESS",
      trust_nonprofit: "Nonprofit 501(c)(3): Chanak TrainUp Education Inc. (EIN 36-5154011)",
      trust_directpay: "Gestión de Pago en Plataformas Estatales",

      // Model 60/20/20 Section
      model_badge: "NUESTRO MODELO PEDAGÓGICO",
      model_title: "Cómo educamos: modelo 60/20/20",
      model_lead: "Un enfoque equilibrado basado en el dominio progresivo, que une el rigor académico estadounidense, la cultura de herencia y la formación del carácter.",
      model_card1_title: "Currículo central de EE. UU.",
      model_card1_desc: "Mastery Learning: el estudiante avanza al dominar cada unidad formativa con solvencia y comprensión profunda.",
      model_card2_title: "Idioma y cultura de herencia",
      model_card2_desc: "Español e identidad cultural: fortaleciendo las raíces familiares junto con el dominio académico en inglés.",
      model_card3_title: "Life Skills y cosmovisión bíblica",
      model_card3_desc: "Clase semanal en grupo reducido que integra habilidades prácticas para la vida y una sólida cosmovisión bíblica.",
      model_seal1: "Atención bilingüe inglés–español",
      model_seal2: "Educación cristiana",
      model_seal3: "Mastery Learning",

      // Services & Pricing Section
      pricing_badge: "SERVICIOS OFICIALES Y TARIFAS",
      pricing_title: "Servicios y Precios",
      pricing_lead: "Precios idénticos para familias con fondos y familias de pago directo. Facturación desglosada y transparente conforme a las normativas de cada programa.",
      serv_setup_tag: "Matrícula Inicial y Plan Pedagógico",
      serv_setup_title: "Matrícula, evaluación inicial y Plan de Aprendizaje Individual (ILP)",
      serv_setup_desc: "Incluye la evaluación inicial pedagógica y el diseño del Plan de Aprendizaje Individual (ILP) por estudiante.",
      serv_setup_amount: "$295",
      serv_setup_period: "pago único",
      serv_monthly_badge: "Acompañamiento académico guiado mensual",
      serv_monthly_lead: "Acompañamiento pedagógico continuo y seguimiento semanal por etapas escolares:",
      grade_k5_title: "Primaria / Elementary (Grados K–5)",
      grade_k5_rate: "$275",
      grade_68_title: "Secundaria / Middle School (Grados 6–8)",
      grade_68_rate: "$320",
      grade_912_title: "Bachillerato / High School (Grados 9–12)",
      grade_912_rate: "$365",
      rate_month_unit: "/ mes",
      feat_mentor: "Mentora asignada con seguimiento pedagógico semanal",
      feat_lifeskills: "Una clase semanal de Life Skills en grupo reducido (60 min)",
      feat_coordination: "Coordinación académica con el currículo de la familia",
      feat_bilingual: "Atención y acompañamiento bilingüe en inglés y español",
      pricing_invoice_note: "Facturamos cada servicio con factura detallada. Si la plataforma cobra una comisión, aparece como línea separada.",

      // Table Section
      table_badge: "DIRECTORIO MAESTRO DE FONDOS",
      table_title: "Estados Aprobados, Plataformas y Estatus del Servicio",
      table_lead: "Consulta los programas aprobados, la plataforma de gestión que utiliza cada estado, el estatus del proveedor y los servicios autorizados de Chanak. Usa el buscador para filtrar al instante.",
      table_disclaimer: "La aprobación depende del programa de cada estado, del servicio y del estudiante. Chanak no garantiza cobertura ni montos.",
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
      badge_registered: "Proveedor Registrado",
      badge_ema: "Proveedor Autorizado (HEIP)",
      btn_view_state: "Ver Guía Estatal →",

      // Digital Wallets Section
      wallets_badge: "PLATAFORMAS DIGITALES Y FACTURACIÓN",
      wallets_title: "Cómo Gestionar el Pago a Chanak en Cada Plataforma",
      wallets_lead: "Chanak está registrada formalmente bajo su entidad legal sin fines de lucro: CHANAK TRAINUP EDUCATION INC. Sigue el flujo específico de tu plataforma para autorizar tus pagos con orden.",
      wallets_security_note: "Aviso de seguridad importante: Chanak jamás solicita a las familias sus contraseñas ni credenciales de acceso a las plataformas digitales (ClassWallet, Odyssey, Step Up / EMA).",
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

      v1_badge: "Guía ClassWallet",
      v1_title: "ClassWallet: Cómo buscar a CHANAK TRAINUP EDUCATION INC y pagar mediante Pay Vendor",
      v1_desc: "Tutorial paso a paso para familias con ClassWallet: localización de la entidad legal, carga de factura proforma y solicitud de pago.",
      v1_time: "3:30 min",

      v2_badge: "Arizona ESA",
      v2_title: "Arizona ESA: Uso de fondos en ClassWallet para Servicios de Apoyo K–12",
      v2_desc: "Guía para familias de Arizona con fondos ESA: cobertura del servicio de apoyo, facturación mensual y registro académico en ClassWallet.",
      v2_time: "4:15 min",

      v3_badge: "Florida Step Up",
      v3_title: "Florida Step Up / EMA: Cómo seleccionar servicios de Chanak en el Marketplace",
      v3_desc: "Paso a paso para familias de Florida con fondos PEP o FES-UA: navegación en el portal EMA y solicitud de servicios educativos autorizados.",
      v3_time: "3:50 min",

      v4_badge: "Wyoming y Utah",
      v4_title: "Wyoming & Utah Odyssey: Guía de inscripción y liberación de fondos",
      v4_desc: "Aprende cómo funciona el flujo de Odyssey para Wyoming ESA y Utah Fits All: vinculación de oferta y desembolso post-servicio.",
      v4_time: "4:00 min",

      v5_badge: "New Hampshire EFA",
      v5_title: "New Hampshire EFA: Mentoría académica y facturación directa en ClassWallet",
      v5_desc: "Instrucciones para familias de New Hampshire gestionadas por CSF NH: clasificación como servicio de mentoría y reporte mensual.",
      v5_time: "3:20 min",

      v6_badge: "Alabama CHOOSE",
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
      opt_serv_support: "Acompañamiento académico guiado mensual ($275–$365/mes)",
      opt_serv_eval: "Matrícula, evaluación inicial y Plan ILP ($295)",
      opt_serv_info: "Información general sobre fondos de mi estado",
      lbl_pref_lang: "Idioma preferido de atención (Opcional)",
      opt_lang_es: "Español",
      opt_lang_en: "English",
      opt_lang_both: "Ambos / Both (Bilingüe)",
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
      faq1_q: "1. ¿Cómo funciona el pago con fondos estatales de beca?",
      faq1_a: "Las familias elegibles pueden solicitar el pago de servicios autorizados con los fondos disponibles de su programa. La aprobación depende del programa de cada estado, del servicio y del estudiante. Chanak no garantiza cobertura ni montos. En estados con pago directo activo (como Arizona, Alabama, Carolina del Sur o New Hampshire en ClassWallet, y Wyoming y Utah en Odyssey), Chanak emite la cotización o factura oficial para que la familia la tramite directamente a través de su plataforma.",
      faq2_q: "2. ¿Cómo busca mi familia a Chanak en la plataforma?",
      faq2_a: "Debes buscar exactamente nuestra entidad legal: CHANAK TRAINUP EDUCATION INC. En ClassWallet nos encuentras en 'Pay Vendor', en Odyssey en el directorio oficial de proveedores del estado, y en Florida EMA como Chanak International Academy dentro del Home Education Instructional Program.",
      faq3_q: "3. ¿Qué ocurre si me conceden los fondos a mitad de curso?",
      faq3_a: "Chanak cuenta con admisiones continuas a lo largo de todo el ciclo escolar. Si recibes la aprobación de tus fondos en cualquier momento del año, establecemos un plan de servicio individualizado y un calendario de pagos adaptado al saldo restante asignado por tu estado.",
      faq4_q: "4. ¿Los fondos no utilizados se acumulan o se pueden transferir a otro hermano?",
      faq4_a: "Cada estado tiene su propia normativa. En general, los fondos asignados a un alumno no pueden transferirse a otro hermano, pero muchas cuentas estatales permiten que el saldo remanente se acumule para el siguiente ciclo escolar. Te asesoramos según la ley de tu estado.",
      faq5_q: "5. ¿Este paquete de apoyo incluye expediente oficial y diploma de High School?",
      faq5_a: "Este paquete de apoyo proporciona un registro pedagógico de avance, informes mensuales de progreso y seguimiento pedagógico del servicio contratado. No constituye una matrícula escolar formal completa ni confiere de forma independiente créditos de graduación o un diploma de High School. Las modalidades de escolarización formal con diploma operan bajo vías contractuales independientes.",
      faq6_q: "6. ¿Qué diferencia hay entre los servicios con fondos estatales y los programas académicos privados?",
      faq6_a: "Con los fondos estatales de elección escolar, las familias contratan servicios educativos autorizados específicos (acompañamiento académico guiado, mentoría semanal, clases grupales de Life Skills, evaluación inicial). Los programas académicos de matriculación escolar completa (como la Umbrella School privada K–12 o el Dual Diploma internacional) operan bajo vías contractuales privadas independientes.",
      faq7_q: "7. ¿Chanak enseña con valores cristianos?",
      faq7_a: "Sí: cosmovisión bíblica integrada en el 20% de Life Skills y en la mentoría, con materiales de editoriales cristianas que la familia elige (como LIFEPAC, Christian Light o A.C.E.).",
      faq8_q: "8. ¿Atienden en español?",
      faq8_a: "Sí: todo el acompañamiento académico guiado, las sesiones de mentoría, la atención a las familias y la orientación se ofrecen de forma completa tanto en inglés como en español.",

      // Curriculum Costs Section (at end of page)
      curric_cost_title: "Costos de currículo (no los cobra Chanak)",
      curric_cost_lead: "Estos costos son de las editoriales, se pagan directamente a ellas y son independientes de la matrícula y del acompañamiento de Chanak. Son aproximados; verifica el precio vigente en el catálogo de cada editorial.",
      curric_cost_disclaimer: "Chanak acompaña a la familia con cualquiera de estas opciones, sin obligar a elegir una.",
      curric_cost_footer: "* Los materiales de Life Skills de Chanak están incluidos dentro del paquete mensual sin costo adicional.",
      curric_aop_title: "📘 AOP LIFEPAC",
      curric_aop_catalog: "Catálogo ↗",
      curric_aop_desc: "Aprox. <strong>~$45 – $50 USD</strong> por materia (10 cuadernillos + guía docente).<br>Set de 5 materias anuales: aprox. <strong>$440 – $485 USD</strong>.<br>Learning to Read grado 1: aprox. $108 USD.",
      curric_cle_title: "📖 Christian Light (CLE)",
      curric_cle_catalog: "Catálogo ↗",
      curric_cle_desc: "Aprox. <strong>~$55 USD</strong> por materia (10 LightUnits; $277/año cuadernillos del alumno).<br>Set completo con guías docentes: aprox. <strong>$390 – $430 USD</strong>.<br>Kit Learning to Read: aprox. $177 USD.",
      curric_ace_title: "✝️ A.C.E. School of Tomorrow",
      curric_ace_catalog: "Catálogo ↗",
      curric_ace_desc: "Secundaria y Bachillerato (grados 5–12): aprox. <strong>$320 – $390 USD / año</strong>.<br>Primaria (grados 1–4): aprox. <strong>$460 – $530 USD / año</strong>.<br>Kit de lectura ABCs with Ace and Christi: $380 – $440 USD.",

      // Footer
      footer_msa_disclaimer: "Chanak International Academy es candidata a la acreditación MSA-CESS. No es una escuela acreditada.",
      footer_desc: "Colegio privado estadounidense registrado ante el Departamento de Educación de Florida (FLDOE #134620). Candidata a la acreditación con Middle States Association (MSA-CESS). Operado por Chanak TrainUp Education Inc., organización sin fines de lucro 501(c)(3) (EIN 36-5154011).",
      footer_legal: "Chanak TrainUp Education Inc. (d/b/a Chanak International Academy), entidad sin fines de lucro de Florida 501(c)(3), FLDOE #134620, candidata a la acreditación MSA-CESS. El uso de fondos estatales de elección escolar está sujeto a la elegibilidad del estudiante y a las normativas de cada programa. Todos los derechos reservados © 2026–2027."
    }
  };

  // VERIFIED STATE DIRECTORY DATA FOR MASTER TABLE
  // Strictly matched to the state landings' confirmed provider statuses
  var STATE_ROWS = [
    {
      stateName: { en: "Utah", es: "Utah" },
      flag: "🏔️",
      programName: { en: "Utah Fits All Scholarship (UFA)", es: "Utah Fits All Scholarship (UFA)" },
      programUrl: "https://www.utaheducationfitsall.org/",
      wallet: "Odyssey",
      walletClass: "odyssey",
      approval: { en: "Qualified Vendor on Odyssey", es: "Proveedor calificado en Odyssey" },
      service: { en: "Academic Support & Mentoring", es: "Acompañamiento Académico Guiado" },
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
      approval: { en: "Approved Vendor on Odyssey", es: "Proveedor aprobado en Odyssey" },
      service: { en: "Academic Support & Mentoring", es: "Acompañamiento Académico Guiado" },
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
      approval: { en: "Registered Vendor on ClassWallet", es: "Proveedor registrado en ClassWallet" },
      service: { en: "Academic Support & Mentoring", es: "Acompañamiento Académico Guiado" },
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
      approval: { en: "Registered Vendor on ClassWallet", es: "Proveedor registrado en ClassWallet" },
      service: { en: "Academic Support & Mentoring", es: "Acompañamiento Académico Guiado" },
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
      approval: { en: "Registered Vendor on ClassWallet", es: "Proveedor registrado en ClassWallet" },
      service: { en: "Academic Support & Mentoring", es: "Acompañamiento Académico Guiado" },
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
      approval: { en: "Registered Vendor on ClassWallet", es: "Proveedor registrado en ClassWallet" },
      service: { en: "Academic Support & Mentoring", es: "Acompañamiento Académico Guiado" },
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
      approval: { en: "Authorized Provider (HEIP)", es: "Proveedor autorizado (HEIP)" },
      service: { en: "Home Education Instructional Program", es: "Programa de instrucción para educación en el hogar" },
      offering: { en: "Monthly Tuition · EMA Catalog Item IDs: 20172869 (K–5), 20169280 (6–8), 20172870 (9–12)", es: "Cuota mensual del servicio · IDs del servicio en EMA: 20172869 (K–5), 20169280 (6–8), 20172870 (9–12)" },
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
          formData.set("parent_name", parentName.trim());
          formData.set("email", email.trim());

          var phoneVal = (document.getElementById("fPhone") && document.getElementById("fPhone").value) || "";
          if (phoneVal.trim()) {
            formData.set("whatsapp", phoneVal.trim());
            formData.set("phone", phoneVal.trim());
          }

          formData.set("state", state);
          formData.set("pais", "Estados Unidos");
          formData.set("country_code", "US");

          var progNameVal = (document.getElementById("fProgName") && document.getElementById("fProgName").value) || "";
          if (progNameVal.trim()) {
            formData.set("programa_estatal", progNameVal.trim());
          }

          var gradeVal = (document.getElementById("fGrade") && document.getElementById("fGrade").value) || "";
          if (gradeVal) {
            formData.set("etapa_educativa", gradeVal);
            formData.set("student_grade", gradeVal);
          }

          var serviceVal = (document.getElementById("fProgram") && document.getElementById("fProgram").value) || "";
          if (serviceVal) {
            formData.set("servicio", serviceVal);
            formData.set("service_interest", serviceVal);
          }

          var langPrefVal = (document.getElementById("fPrefLang") && document.getElementById("fPrefLang").value) || "";
          if (langPrefVal) {
            formData.set("preferred_language", langPrefVal);
            formData.set("idioma_atencion", langPrefVal);
          }

          var scheduleVal = (document.getElementById("fSchedule") && document.getElementById("fSchedule").value) || "";
          if (scheduleVal) {
            formData.set("preferencia_horaria", scheduleVal);
            formData.set("preferred_schedule", scheduleVal);
          }

          var newsCheck = document.getElementById("fNewsletter") && document.getElementById("fNewsletter").checked;
          if (newsCheck) {
            formData.set("newsletter_opt_in", "si");
            formData.set("newsletter", "si");
          }

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

          // CONVERSION TRACKING EVENT (SEO & Analytics)
          if (window.dataLayer && Array.isArray(window.dataLayer)) {
            window.dataLayer.push({
              event: "scholarship_inquiry_submitted",
              form_name: "advisoryForm",
              language: currentLang
            });
          }
          if (window.ChanakTracking && typeof window.ChanakTracking.lead === "function") {
            window.ChanakTracking.lead("scholarships", { language: currentLang });
          }
          window.dispatchEvent(new CustomEvent("chanak_lead_submitted", {
            detail: { type: "scholarships", lang: currentLang }
          }));

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
