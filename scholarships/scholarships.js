/**
 * Chanak International Academy · Scholarships, ClassWallet & Odyssey Direct Pay Module
 * Multi-state support: Utah UFA, Wyoming ESA, Arizona ESA, Alabama CHOOSE, SC ESTF, NH EFA
 * Bilingual dynamic switcher (EN / ES) & Interactive 3-Step Enrollment / Quote Calculator
 */
(function () {
  "use strict";

  // I18N DICTIONARIES
  var I18N = {
    en: {
      // Topbar & Nav
      topbar_text: "Official Nonpublic School Provider · ClassWallet & Odyssey Approved Partner",
      topbar_fldoe: "FLDOE Private School Code: #134620 · 501(c)(3) Nonprofit",
      nav_sub: "Approved State Scholarship Programs",
      nav_select_state: "Change State / Program:",
      nav_cta: "Request Quote / Invoice",
      
      // Hero Badges & Pills
      pill_approved_vendor: "Approved Entity:",
      pill_platform: "Platform / Method:",
      pill_funding: "Funding Coverage:",
      pill_legal_status: "Legal Status:",
      btn_hero_cta: "Request Official Invoice",
      btn_hero_guide: "How Direct Pay Works",

      // Trust Bar
      trust_fldoe: "FLDOE Registered Private School #134620",
      trust_msa: "MSA-CESS Official Candidate for Accreditation",
      trust_nonprofit: "501(c)(3) Nonprofit: Chanak TrainUp Education Inc.",
      trust_directpay: "100% Direct Pay via ClassWallet & Odyssey (No Out-of-Pocket)",

      // 4-Step Direct Pay Guide
      guide_title: "How to Pay via Direct Pay in 4 Steps",
      guide_badge: "Zero Out-of-Pocket Process",
      guide_lead: "As an approved nonpublic school provider, Chanak allows eligible families to fund tuition and educational services directly with state scholarship funds without personal upfront payments.",
      step1_title: "1. Request Official Invoice",
      step1_desc: "Complete our step-by-step enrollment form below with the student's legal name and select your courses.",
      step2_title: "2. Log In to State Parent Portal",
      step2_desc: "Access your state parent portal in ClassWallet or Odyssey with your family credentials.",
      step3_title: "3. Search for Chanak in Provider Directory",
      step3_desc: "In the marketplace or 'Pay Vendor' section, search for our registered legal entity:",
      step3_vendor: "CHANAK TRAINUP EDUCATION INC",
      step4_title: "4. Authorize Direct Disbursement",
      step4_desc: "Attach the official itemized invoice sent by Chanak and submit the total amount for 100% direct state disbursement.",

      // Video Section
      video_badge: "Step-by-Step Tutorial",
      video_title: "Watch: How to Submit an Invoice in ClassWallet",
      video_lead: "Follow this step-by-step official tutorial on using the 'Pay Vendor' feature in your ClassWallet portal.",
      video_caption: "Official ClassWallet Tutorial: Submitting vendor invoices for direct payment.",

      // Catalog Badges & Fees
      catalog_badge: "Approved Line Items & Rates",
      catalog_title: "Academic Catalog & Official Fee Schedule",
      catalog_lead: "Unified, state-audited line items for 2026–2027. All tuition packages include digital resources, LMS platform, and annual standardized testing.",
      
      badge_mandatory_line: "Mandatory Annual Line Item",
      badge_core_prog: "Core Academic Program",
      badge_tuit_line: "K–12 Monthly Tuition",
      badge_diag_line: "Assessment Line Item",
      badge_elect_line: "Electives & Mentorship",
      badge_spec_inst: "Approved Specialized Instruction",

      cat_reg_title: "Annual Registration & Enrollment Fee",
      cat_reg_tech: "Annual Nonpublic School Registration & Enrollment Fee",
      cat_reg_price: "$295",
      cat_reg_period: "one-time / school year",
      cat_reg_desc: "Mandatory annual fee to establish and maintain the official cumulative student record, state compliance verification, grade reporting, and official transcripts.",
      cat_reg_f1: "Opening & legal custody of official student record",
      cat_reg_f2: "Official semester report cards & graduation transcripts",
      cat_reg_f3: "Annual state scholarship reporting & compliance verification",
      cat_reg_f4: "Dedicated school counselor assignment",

      cat_tuit_title: "Online K–12 School Tuition",
      cat_tuit_tech: "Nonpublic Online K-12 School Tuition",
      cat_tuit_period: "/ month (10 installments)",
      cat_tuit_elem: "Elementary (Grades K–5): $275 / month ($2,750 / year)",
      cat_tuit_mid: "Middle School (Grades 6–8): $320 / month ($3,200 / year)",
      cat_tuit_high: "High School (Grades 9–12): $365 / month ($3,650 / year)",
      cat_tuit_desc: "Comprehensive accredited online education blending core academics with cultural identity and character development.",
      cat_tuit_c1: "60% Core US Curriculum (English, Math, Science, Social Studies under Mastery Learning)",
      cat_tuit_c2: "20% Local Studies Extension (History & Geography of student's heritage: Spain/LOMLOE, Mexico, Colombia, Panama, or US General)",
      cat_tuit_c3: "20% Life Skills & Leadership (Character, financial literacy, productivity)",
      cat_tuit_f1: "Annual Standardized Testing INCLUDED (meets state ESA accountability rules)",
      cat_tuit_f2: "Digital learning resources & LMS access 100% INCLUDED ($0 extra)",
      cat_tuit_f3: "Continuous progress tracking with certified teachers",

      cat_diag_title: "Diagnostic Placement Evaluation",
      cat_diag_tech: "Diagnostic Academic Placement & Learning Evaluation",
      cat_diag_price: "$200",
      cat_diag_period: "one-time evaluation",
      cat_diag_desc: "Comprehensive diagnostic assessment across reading, writing, and mathematics to detect learning gaps and tailor an Individualized Education Plan (IEP).",
      cat_diag_f1: "Multi-subject standardized diagnostic benchmark",
      cat_diag_f2: "Learning gap detection and remediation plan",
      cat_diag_f3: "Individualized Education Plan (IEP / PEI) blueprint",

      cat_elect_title: "Single Elective Courses",
      cat_elect_desc: "Independent credit courses for standalone enrichment or courseware expansion.",
      cat_span_tech: "World Language Elective Course: Spanish Language Instruction",
      cat_span_price: "$120 / month",
      cat_span_desc: "Grammar, literature, writing, and Hispanic cultural heritage for native and non-native learners.",
      cat_life_tech: "Applied Life Skills & Leadership Development Course",
      cat_life_price: "$85 / month",
      cat_life_desc: "Available in English Track or Spanish Track. 5 core pillars: 1) Character & ethics; 2) Goal setting & productivity; 3) Practical financial stewardship; 4) Servant leadership; 5) Real-world decision making.",
      
      cat_ment_title: "Academic Mentorship & Support",
      cat_ment_tech: "Individualized Academic Mentorship & Learning Support Service",
      cat_ment_price: "$150 / month",
      cat_ment_desc: "One-on-one pedagogical mentoring, weekly accountability check-ins, study habit coaching, and specialized academic support.",

      // Callout Alert
      alert_title: "⚠️ ATTENTION STATE SCHOLARSHIP FAMILIES (ODYSSEY & CLASSWALLET):",
      alert_body: "Do not pay out-of-pocket with personal credit/debit cards if you are using your state ESA funds. Upon submitting this form, our administration will issue and email your OFFICIAL ITEMIZED PDF INVOICE compliant with state regulations. You will then upload this invoice directly to your portal under 'Pay Vendor' by selecting 'CHANAK TRAINUP EDUCATION INC' for direct state disbursement.",

      // Form Steps
      form_title: "Enrollment & Official Invoice Request",
      form_lead: "Fill out student details, select desired services, and receive your itemized PDF invoice for Direct Pay.",
      form_step1: "1. Student & Family",
      form_step2: "2. Services & Live Quote",
      form_step3: "3. Payment & Submit",

      lbl_student_name: "Student Full Legal Name (as on ESA account) *",
      lbl_student_dob: "Student Date of Birth *",
      lbl_student_grade: "Grade Level for 2026–2027 *",
      lbl_guardian_name: "Parent / Guardian Legal Name *",
      lbl_guardian_email: "Parent Email (where invoice will be sent) *",
      lbl_guardian_phone: "Parent Phone Number *",
      lbl_program_state: "State Scholarship / Program *",

      cat_select_title: "Select Academic Program & Courses:",
      srv_reg_badge: "$295 (One-time mandatory)",
      srv_tuit_badge: "10 Monthly Installments",
      srv_grade_lbl: "Select Tuition Level:",
      srv_elem_opt: "Elementary (Grades K–5): $275 / month",
      srv_mid_opt: "Middle School (Grades 6–8): $320 / month",
      srv_high_opt: "High School (Grades 9–12): $365 / month",
      srv_diag_badge: "+$200 (One-time)",
      srv_span_badge: "+$120 / month",
      srv_life_badge: "+$85 / month",
      srv_ment_badge: "+$150 / month",

      lbl_local_studies: "Local Studies Extension: Select Country/Region for History & Geography *",
      opt_select_country: "-- Select Heritage Curriculum --",
      opt_us_general: "United States (General US History & Civics)",
      opt_spain: "Spain / España (LOMLOE Geografía e Historia)",
      opt_mexico: "Mexico (Historia y Geografía Nacional)",
      opt_colombia: "Colombia (Ciencias Sociales y Geografía)",
      opt_panama: "Panama (Historia, Geografía y Cívica)",
      opt_other_latam: "Other Latin American Country / International",

      lbl_track_lang: "Applied Life Skills Language Track *",
      opt_track_en: "English Track",
      opt_track_es: "Modalidad en Español / Spanish Track",

      calc_title: "Estimated Tuition & Fee Breakdown (USD)",
      calc_onetime: "One-Time Initial Fees (Registration & Diagnostics):",
      calc_monthly: "Monthly Tuition & Electives (10 installments):",
      calc_annual: "Total Estimated School Year Commitment:",
      calc_state_coverage: "Eligible for 100% Direct Disbursement via State Scholarship Funds",

      pay_opt_cw_title: "State Scholarship Funds (Direct Pay)",
      pay_opt_cw_desc: "Zero upfront family payment. We send an itemized PDF invoice for you to upload under 'Pay Vendor' -> CHANAK TRAINUP EDUCATION INC.",
      pay_opt_priv_title: "Private Payment (Credit Card / Stripe / Bank Wire)",
      pay_opt_priv_desc: "Direct family payment if you are paying out-of-pocket or seeking standard private enrollment.",

      btn_next: "Next Step →",
      btn_prev: "← Previous",
      btn_submit_cw: "Request Official Invoice for Direct Pay",
      btn_submit_priv: "Proceed with Private Enrollment",
      btn_submitting: "Processing Request...",

      // FAQ
      faq_title: "Frequently Asked Questions",
      faq_lead: "Common questions regarding state scholarship coverage, direct payment, and accreditation.",
      faq_q1: "Is Chanak International Academy an approved official provider?",
      faq_a1: "<strong>Yes.</strong> Chanak International Academy is operated by <strong>CHANAK TRAINUP EDUCATION INC</strong>, a 501(c)(3) nonprofit private school entity (Florida DOE Code: #134620, MSA-CESS Candidate for Accreditation) approved in state scholarship marketplaces for qualified nonpublic educational services.",
      faq_q2: "What educational expenses are covered by the scholarship at Chanak?",
      faq_a2: "State scholarship funds can cover 100% of the Annual Mandatory Registration ($295), full K–12 monthly tuition (Elementary $275/mo, Middle $320/mo, High School $365/mo), the Diagnostic Placement Evaluation ($200), single elective courses (Spanish $120/mo, Life Skills $85/mo), and individualized academic mentorship ($150/mo). All learning materials, LMS digital access, and required annual testing are fully included.",
      faq_q3: "Do families have to pay upfront out-of-pocket?",
      faq_a3: "<strong>No.</strong> Participating scholarship families should <strong>NOT</strong> pay with personal credit/debit cards. Our admissions team prepares compliant documentation and guides you to authorize direct state disbursement to <strong>CHANAK TRAINUP EDUCATION INC</strong>.",
      faq_q4: "How is the American High School diploma accredited and recognized?",
      faq_a4: "Chanak is a registered private school with the Florida Department of Education (FLDOE #134620) and an official Candidate for Accreditation with the Middle States Association Commissions on Elementary and Secondary Schools (MSA-CESS). Graduating students earn an official U.S. High School Diploma and transcripts eligible for apostille under the Hague Convention, accepted by universities across the U.S. and worldwide.",

      // Footer
      footer_desc: "A comprehensive K–12 nonpublic online learning academy operated by CHANAK TRAINUP EDUCATION INC, a 501(c)(3) nonprofit educational organization.",
      footer_fldoe: "Florida Department of Education Code: <strong>#134620</strong><br/>MSA-CESS Official Candidate for Accreditation",
      footer_programs_title: "State Scholarships & Platforms",
      footer_contact_title: "Contact & Admissions",
      footer_admissions_lbl: "Admissions & State Scholarship Office:",
      footer_billing_lbl: "Official Billing Entity:",
      footer_legal_text: "© 2026 Chanak International Academy · CHANAK TRAINUP EDUCATION INC. All rights reserved. State scholarship programs are administered through their official platforms. Chanak International Academy is an approved nonpublic online school education service provider. Program approval does not guarantee student eligibility or state funding availability.",

      success_title: "Official Invoice Request Received!",
      success_p1: "Thank you for enrolling with Chanak International Academy (operated by CHANAK TRAINUP EDUCATION INC).",
      success_p2: "Our admissions department is reviewing your student's details and generating your compliant, itemized PDF invoice.",
      success_steps_title: "Next Steps to Finalize Direct Pay:",
      success_s1: "Check your email for the official PDF invoice within 24 business hours.",
      success_s2: "Log in to your state parent portal.",
      success_s3: "Go to 'Pay Vendor' or Marketplace and search for CHANAK TRAINUP EDUCATION INC.",
      success_s4: "Upload the PDF invoice and submit the total amount for direct disbursement.",

      err_required: "Please complete all required fields correctly before continuing."
    },
    es: {
      // Topbar & Nav
      topbar_text: "Proveedor Oficial Escolar No Público · Socio Direct Pay en ClassWallet y Odyssey",
      topbar_fldoe: "Código Escolar FLDOE: #134620 · Organización Sin Ánimo de Lucro 501(c)(3)",
      nav_sub: "Programas Aprobados en Becas Estatales",
      nav_select_state: "Cambiar Estado / Programa:",
      nav_cta: "Solicitar Presupuesto",
      
      // Hero Badges & Pills
      pill_approved_vendor: "Entidad Aprobada:",
      pill_platform: "Plataforma / Modalidad:",
      pill_funding: "Cobertura de Fondos:",
      pill_legal_status: "Estatus Legal:",
      btn_hero_cta: "Solicitar Presupuesto Oficial",
      btn_hero_guide: "Ver Cómo Funciona",

      // Trust Bar
      trust_fldoe: "Colegio Privado Registrado FLDOE #134620",
      trust_msa: "Candidato Oficial a Acreditación MSA-CESS",
      trust_nonprofit: "Entidad 501(c)(3): Chanak TrainUp Education Inc.",
      trust_directpay: "100% Pago Directo en ClassWallet y Odyssey (Sin Gastos Propios)",

      // 4-Step Direct Pay Guide
      guide_title: "Cómo Pagar con Desembolso Directo en 4 Pasos",
      guide_badge: "Proceso Sin Desembolso Personal",
      guide_lead: "Como proveedor escolar no público registrado, Chanak permite a las familias financiar la colegiatura y los servicios educativos directamente con los fondos de la beca estatal, sin adelantos personales.",
      step1_title: "1. Solicitar Factura Oficial / Presupuesto",
      step1_desc: "Completa el formulario inferior con el nombre legal del alumno y selecciona los cursos o nivel deseados.",
      step2_title: "2. Ingresar al Portal de Familia",
      step2_desc: "Accede al portal oficial de tu estado (ClassWallet u Odyssey) con tus credenciales de familia.",
      step3_title: "3. Buscar a Chanak en el Directorio",
      step3_desc: "En el Marketplace o directorio de proveedores ('Pay Vendor'), busca a nuestra entidad registrada:",
      step3_vendor: "CHANAK TRAINUP EDUCATION INC",
      step4_title: "4. Autorizar Desembolso Directo",
      step4_desc: "Adjunta la factura proforma en PDF enviada por Chanak y confirma el desembolso directo sin pagar nada de tu bolsillo.",

      // Video Section
      video_badge: "Tutorial Paso a Paso",
      video_title: "Tutorial en Video: Cómo Utilizar ClassWallet Direct Pay",
      video_lead: "Sigue este tutorial oficial sobre cómo utilizar la función 'Pay Vendor' en tu portal de ClassWallet para autorizar el pago a proveedores escolares aprobados.",
      video_caption: "Guía oficial para familias: Envío de facturas para pago directo en ClassWallet.",

      // Catalog Badges & Fees
      catalog_badge: "Conceptos Oficiales y Tarifas",
      catalog_title: "Catálogo Académico y Tarifas Unificadas",
      catalog_lead: "Líneas de servicio oficiales aprobadas y auditadas para el ciclo 2026–2027. Todos los paquetes incluyen materiales digitales, plataforma LMS y prueba estandarizada anual.",
      
      badge_mandatory_line: "Línea Anual Obligatoria",
      badge_core_prog: "Programa Académico Principal",
      badge_tuit_line: "Colegiatura Mensual K–12",
      badge_diag_line: "Evaluación Inicial",
      badge_elect_line: "Electivas y Acompañamiento",
      badge_spec_inst: "Instrucción Especializada Aprobada",

      cat_reg_title: "Matrícula Anual Oficial",
      cat_reg_tech: "Annual Nonpublic School Registration & Enrollment Fee",
      cat_reg_price: "$295",
      cat_reg_period: "pago único / ciclo escolar",
      cat_reg_desc: "Apertura y custodia de expediente oficial acumulativo, verificación de cumplimiento legal del estado, report cards y transcripts oficiales.",
      cat_reg_f1: "Apertura y custodia legal de expediente oficial",
      cat_reg_f2: "Boletines oficiales de notas y transcripts de graduación",
      cat_reg_f3: "Verificación y reportes de cumplimiento para becas estatales",
      cat_reg_f4: "Asignación de tutor y orientador académico",

      cat_tuit_title: "Colegiatura Mensual K-12 (10 cuotas)",
      cat_tuit_tech: "Nonpublic Online K-12 School Tuition",
      cat_tuit_period: "/ mes (10 mensualidades)",
      cat_tuit_elem: "Primaria (Grados K–5): $275 / mes ($2,750 / año)",
      cat_tuit_mid: "Secundaria (Grados 6–8): $320 / mes ($3,200 / año)",
      cat_tuit_high: "Bachillerato (Grados 9–12): $365 / mes ($3,650 / año)",
      cat_tuit_desc: "Programa escolar completo online que une el rigor curricular estadounidense con la identidad cultural y formación de carácter.",
      cat_tuit_c1: "60% Currículo Núcleo de EE. UU. (Inglés, Matemáticas, Ciencias, Estudios Sociales con Mastery Learning)",
      cat_tuit_c2: "20% Extensión de Estudios Locales (Historia y Geografía del país de origen: España, México, Colombia, Panamá o EE. UU.)",
      cat_tuit_c3: "20% Life Skills & Leadership (Carácter, finanzas prácticas, liderazgo de servicio)",
      cat_tuit_f1: "Prueba Estandarizada Anual INCLUIDA (cumple requisitos de becas estatales)",
      cat_tuit_f2: "Plataforma digital LMS y recursos 100% INCLUIDOS ($0 adicional)",
      cat_tuit_f3: "Monitoreo continuo de progreso con profesores certificados",

      cat_diag_title: "Evaluación Diagnóstica Inicial",
      cat_diag_tech: "Diagnostic Academic Placement & Learning Evaluation",
      cat_diag_price: "$200",
      cat_diag_period: "pago único de evaluación",
      cat_diag_desc: "Evaluación exhaustiva en lectura, comprensión, matemáticas y redacción para detectar lagunas de aprendizaje y elaborar el Plan Educativo Individualizado (PEI).",
      cat_diag_f1: "Evaluación diagnóstica estandarizada en materias clave",
      cat_diag_f2: "Detección de lagunas curriculares y plan de nivelación",
      cat_diag_f3: "Elaboración de Plan Educativo Individualizado (PEI)",

      cat_elect_title: "Cursos Electivos Independientes",
      cat_elect_desc: "Materias optativas acreditables independientes para enriquecimiento curricular.",
      cat_span_tech: "World Language Elective Course: Spanish Language Instruction",
      cat_span_price: "$120 / mes",
      cat_span_desc: "Gramática, literatura, lectoescritura y cultura hispana para hablantes nativos o estudiantes de lengua extranjera.",
      cat_life_tech: "Applied Life Skills & Leadership Development Course",
      cat_life_price: "$85 / mes",
      cat_life_desc: "Disponible en English Track o Modalidad en Español. 5 ejes: 1) Carácter y ética; 2) Metas y productividad; 3) Educación financiera práctica; 4) Liderazgo de servicio; 5) Toma de decisiones para la vida diaria.",
      
      cat_ment_title: "Mentoría y Soporte Académico",
      cat_ment_tech: "Individualized Academic Mentorship & Learning Support Service",
      cat_ment_price: "$150 / mes",
      cat_ment_desc: "Acompañamiento pedagógico individualizado, reuniones semanales de seguimiento, hábitos de estudio y apoyo académico continuo.",

      // Callout Alert
      alert_title: "⚠️ AVISO PARA FAMILIAS CON BECAS ESTATALES:",
      alert_body: "No realice pagos con tarjeta personal ni fondos propios si va a utilizar su beca estatal. Al completar este formulario, nuestro equipo de admisiones generará su FACTURA OFICIAL EN PDF con la codificación requerida por su estado. Podrá autorizar el desembolso directo a favor de 'CHANAK TRAINUP EDUCATION INC' sin ningún adelanto de su bolsillo.",

      // Form Steps
      form_title: "Solicitud de Matrícula y Factura Proforma Oficial",
      form_lead: "Ingresa los datos del estudiante, selecciona los servicios y recibe tu presupuesto oficial desglosado para aprobación estatal.",
      form_step1: "1. Estudiante y Familia",
      form_step2: "2. Servicios y Cotizador",
      form_step3: "3. Vía de Pago y Confirmación",

      lbl_student_name: "Nombre Legal Completo del Alumno (como en la cuenta de beca) *",
      lbl_student_dob: "Fecha de Nacimiento del Alumno *",
      lbl_student_grade: "Grado Escolar 2026–2027 *",
      lbl_guardian_name: "Nombre Completo del Padre, Madre o Tutor Legal *",
      lbl_guardian_email: "Correo Electrónico (donde enviaremos la factura) *",
      lbl_guardian_phone: "Teléfono de Contacto (con código de área) *",
      lbl_program_state: "Programa de Beca Estatal *",

      cat_select_title: "Selecciona el programa académico y servicios:",
      srv_reg_badge: "$295 (Pago único obligatorio)",
      srv_tuit_badge: "10 mensualidades escolares",
      srv_grade_lbl: "Selecciona el nivel escolar:",
      srv_elem_opt: "Primaria (Elementary, Grados K–5): $275 / mes",
      srv_mid_opt: "Secundaria (Middle School, Grados 6–8): $320 / mes",
      srv_high_opt: "Bachillerato (High School, Grados 9–12): $365 / mes",
      srv_diag_badge: "+$200 (Pago único)",
      srv_span_badge: "+$120 / mes",
      srv_life_badge: "+$85 / mes",
      srv_ment_badge: "+$150 / mes",

      lbl_local_studies: "Extensión Curricular de Estudios Locales: Selecciona País/Región *",
      opt_select_country: "-- Seleccionar Currículo de Origen --",
      opt_us_general: "Estados Unidos (Historia de EE. UU. General y Cívica)",
      opt_spain: "España (LOMLOE Geografía e Historia)",
      opt_mexico: "México (Historia y Geografía Nacional)",
      opt_colombia: "Colombia (Ciencias Sociales y Geografía)",
      opt_panama: "Panamá (Historia, Geografía y Cívica)",
      opt_other_latam: "Otro País Latinoamericano / Internacional",

      lbl_track_lang: "Modalidad de Idioma para Life Skills *",
      opt_track_en: "English Track (en Inglés)",
      opt_track_es: "Modalidad en Español / Spanish Track",

      calc_title: "Presupuesto Desglosado en Tiempo Real (USD)",
      calc_onetime: "Cargos Únicos Iniciales (Matrícula + Diagnóstico):",
      calc_monthly: "Colegiatura Mensual y Electivas (10 cuotas):",
      calc_annual: "Compromiso Total Estimado del Año Escolar:",
      calc_state_coverage: "Elegible para 100% de desembolso directo mediante Beca Estatal",

      pay_opt_cw_title: "Fondos de Beca Estatal (Direct Pay)",
      pay_opt_cw_desc: "Sin desembolso personal de su bolsillo. Emitimos la factura oficial proforma y le guiamos para autorizar el pago a nombre de CHANAK TRAINUP EDUCATION INC.",
      pay_opt_priv_title: "Pago Privado / Familiar",
      pay_opt_priv_desc: "Pago independiente mediante transferencia ACH o tarjeta bancaria si no dispone de fondos de beca estatal.",

      btn_next: "Continuar al Paso 2 →",
      btn_prev: "← Volver al Paso Anterior",
      btn_submit_cw: "Solicitar Factura para Beca Estatal",
      btn_submit_priv: "Continuar con Matrícula Privada",
      btn_submitting: "Procesando Solicitud...",

      // FAQ
      faq_title: "Preguntas Frecuentes sobre la Beca y Servicios",
      faq_lead: "Respuestas claras sobre aprobación oficial, cobertura de fondos, facturación y validez académica.",
      faq_q1: "¿Está Chanak International Academy aprobada como proveedor oficial?",
      faq_a1: "<strong>Sí.</strong> Chanak International Academy está operada por <strong>CHANAK TRAINUP EDUCATION INC</strong>, una entidad escolar privada sin fines de lucro 501(c)(3) (Código FLDOE: #134620, Candidato Oficial a Acreditación MSA-CESS) aprobada en las plataformas estatales de becas como proveedor educativo no público.",
      faq_q2: "¿Qué gastos educativos cubre la beca en Chanak?",
      faq_a2: "Los fondos de la beca estatal pueden cubrir el 100% de la Matrícula Anual Obligatoria ($295), la colegiatura mensual completa en Primaria ($275/mes), Secundaria ($320/mes) o Bachillerato ($365/mes), la Evaluación Diagnóstica Inicial ($200), materias electivas (Español $120/mes, Life Skills $85/mes), mentoría académica individual ($150/mes) y las pruebas estandarizadas anuales incluidas.",
      faq_q3: "¿Deben las familias pagar por adelantado de su propio bolsillo?",
      faq_a3: "<strong>No.</strong> Las familias participantes con beca <strong>NO</strong> deben realizar pagos con tarjeta personal. Nuestro equipo de admisiones gestiona la orden y factura oficial para que el desembolso sea 100% directo desde sus fondos a favor de <strong>CHANAK TRAINUP EDUCATION INC</strong>.",
      faq_q4: "¿Cómo está acreditado y reconocido el diploma americano de High School?",
      faq_a4: "Chanak es un colegio privado registrado en el Departamento de Educación de Florida (FLDOE #134620) y Candidato Oficial a la Acreditación con la Middle States Association Commissions on Elementary and Secondary Schools (MSA-CESS). Los estudiantes graduados reciben el diploma oficial de High School de EE. UU. y certificados de notas apostillables bajo el Convenio de La Haya, aceptados por universidades en EE. UU. e internacionales.",

      // Footer
      footer_desc: "Academia integral online K–12 no pública operada por CHANAK TRAINUP EDUCATION INC, organización educativa sin fines de lucro 501(c)(3).",
      footer_fldoe: "Código del Departamento de Educación de Florida: <strong>#134620</strong><br/>Candidato Oficial a Acreditación MSA-CESS",
      footer_programs_title: "Becas Estatales y Plataformas",
      footer_contact_title: "Contacto y Admisiones",
      footer_admissions_lbl: "Oficina de Admisiones y Becas Estatales:",
      footer_billing_lbl: "Entidad de Facturación Oficial:",
      footer_legal_text: "© 2026 Chanak International Academy · CHANAK TRAINUP EDUCATION INC. Todos los derechos reservados. Los programas de becas estatales son administrados mediante sus plataformas oficiales. Chanak International Academy es un proveedor educativo escolar no público aprobado. La aprobación del programa no garantiza la elegibilidad del estudiante ni la disponibilidad de fondos estatales.",

      success_title: "¡Solicitud de Factura Oficial Recibida!",
      success_p1: "Gracias por registrar a su estudiante en Chanak International Academy (operado por CHANAK TRAINUP EDUCATION INC).",
      success_p2: "Nuestro departamento de admisiones está revisando la información y preparando la factura proforma desglosada en PDF conforme a las normas de su estado.",
      success_steps_title: "Próximos Pasos para Finalizar:",
      success_s1: "En menos de 24h laborables recibirá su factura oficial en PDF en su correo electrónico.",
      success_s2: "Inicie sesión en el portal de padres de su estado.",
      success_s3: "En el directorio o 'Pay Vendor', busque a CHANAK TRAINUP EDUCATION INC.",
      success_s4: "Suba la factura en PDF para autorizar el desembolso estatal directo sin adelantar dinero propio.",

      err_required: "Por favor complete todos los campos obligatorios antes de continuar."
    }
  };

  var currentLang = "es";
  var currentStep = 1;

  // INITIALIZE
  function init() {
    var urlParams = new URLSearchParams(window.location.search);
    var urlLang = urlParams.get("lang");
    if (urlLang === "en") {
      currentLang = "en";
    } else if (urlLang === "es") {
      currentLang = "es";
    } else {
      var savedLang = localStorage.getItem("chanak_scholarship_lang");
      currentLang = (savedLang === "en" && urlParams.has("lang")) ? "en" : "es";
    }
    applyLanguage(currentLang);

    // Setup language buttons
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var lang = this.getAttribute("data-lang");
        if (lang) {
          currentLang = lang;
          localStorage.setItem("chanak_scholarship_lang", lang);
          applyLanguage(lang);
        }
      });
    });

    setupForm();
    setupCalculator();
    calculateTotals();
  }

  // APPLY LANGUAGE TO DOM
  function applyLanguage(lang) {
    document.documentElement.setAttribute("lang", lang);
    currentLang = lang;
    var baseDict = I18N[lang] || I18N.es;
    var dict = Object.assign({}, baseDict);

    var isOdyssey = document.body.getAttribute("data-platform") === "odyssey";
    var stateSlug = document.body.getAttribute("data-state") || "";

    if (isOdyssey) {
      if (lang === "es") {
        dict.topbar_text = "Proveedor Oficial Escolar No Público · Proveedor Aprobado en Odyssey";
        dict.nav_sub = "Programas Aprobados en Odyssey";
        dict.trust_directpay = "100% Pago Directo en Odyssey (Sin Gastos Propios)";
        dict.guide_title = "Cómo Pagar o Inscribirse mediante Odyssey en 4 Pasos";
        dict.guide_badge = "Proceso 100% Desembolso Estatal";
        dict.guide_lead = "Como proveedor aprobado en Odyssey, Chanak permite a familias elegibles financiar colegiatura y servicios educativos directamente con fondos de beca sin adelantar dinero personal.";
        dict.step1_title = "1. Solicitar Factura Oficial / Presupuesto";
        dict.step1_desc = "Completa el formulario inferior con el nombre legal del alumno y selecciona los cursos deseados.";
        dict.step2_title = "2. Ingresar a Odyssey";
        dict.step2_desc = "Accede a tu portal de familia en Odyssey (withodyssey.com) con tus credenciales.";
        dict.step3_title = "3. Buscar a Chanak en el Directorio";
        dict.step3_desc = "En el Marketplace o Directorio de Proveedores, busca a nuestra entidad aprobada:";
        dict.step3_vendor = "CHANAK TRAINUP EDUCATION INC";
        dict.step4_title = "4. Autorizar Desembolso Directo";
        dict.step4_desc = "Selecciona el servicio correspondiente o sube tu factura oficial para autorizar el desembolso directo desde tu saldo de beca sin pagar nada de tu bolsillo.";
        dict.calc_state_coverage = "Elegible para 100% de desembolso directo mediante el Marketplace de Odyssey";
        dict.pay_opt_cw_title = "Fondos de Beca Estatal (Odyssey Direct Pay)";
        dict.pay_opt_cw_desc = "Sin adelanto de dinero personal. Emitimos la confirmación oficial y le guiamos para autorizar el pago en Odyssey a nombre de CHANAK TRAINUP EDUCATION INC.";
        dict.btn_submit_cw = "Inscribirse con Fondos de Odyssey";
        dict.btn_hero_cta = "Inscribirse con Fondos de Odyssey";
        dict.btn_hero_guide = "Ver Cómo Funciona Odyssey";
      } else {
        dict.topbar_text = "Official Nonpublic School Provider · Odyssey Approved Partner";
        dict.nav_sub = "Odyssey Approved Programs";
        dict.trust_directpay = "100% Direct Pay via Odyssey (No Out-of-Pocket)";
        dict.guide_title = "How to Pay via Odyssey in 4 Steps";
        dict.guide_badge = "100% State Disbursement Process";
        dict.guide_lead = "As an approved Odyssey provider, Chanak allows eligible families to fund tuition and educational services directly with state scholarship funds without personal upfront payments.";
        dict.step1_title = "1. Request Official Invoice / Placement";
        dict.step1_desc = "Complete our step-by-step enrollment form below with the student's legal name and select your courses.";
        dict.step2_title = "2. Log In to Odyssey";
        dict.step2_desc = "Access your state parent portal in Odyssey (withodyssey.com) with your family credentials.";
        dict.step3_title = "3. Search for Chanak in Provider Directory";
        dict.step3_desc = "In the Marketplace / Provider Directory, search for our approved entity:";
        dict.step3_vendor = "CHANAK TRAINUP EDUCATION INC";
        dict.step4_title = "4. Authorize Direct Disbursement";
        dict.step4_desc = "Select the corresponding service or upload your official invoice to approve direct disbursement from your scholarship balance with zero out-of-pocket expense.";
        dict.calc_state_coverage = "Eligible for 100% Direct Disbursement via Odyssey Marketplace";
        dict.pay_opt_cw_title = "State Scholarship Funds (Odyssey Direct Pay)";
        dict.pay_opt_cw_desc = "Zero personal upfront cost. We emit the official itemized invoice and assist you in approving direct payment in Odyssey to CHANAK TRAINUP EDUCATION INC.";
        dict.btn_submit_cw = "Enroll with Odyssey Funds";
        dict.btn_hero_cta = "Enroll with Odyssey Funds";
        dict.btn_hero_guide = "How Odyssey Works";
      }
    } else {
      if (lang === "es") {
        dict.btn_hero_cta = "Solicitar Factura para ClassWallet";
        dict.btn_hero_guide = "Ver Guía de ClassWallet";
      } else {
        dict.btn_hero_cta = "Request Invoice for ClassWallet";
        dict.btn_hero_guide = "How ClassWallet Works";
      }
    }

    // State specific dynamic titles
    if (stateSlug === "utah") {
      dict.hero_title = lang === "en" ? "Approved Nonpublic Online K–12 School & Tuition for Utah Families (UFA)" : "Educación Privada Online K–12 Aprobada con Fondos Utah Fits All";
      dict.hero_lead = lang === "en" ? "Fund up to $8,000 of your student's accredited private school education, comprehensive curriculum, and diagnostic evaluations through Utah Fits All using the Odyssey portal with zero personal out-of-pocket expenses." : "Financia hasta $8,000 de la colegiatura, currículo integral y evaluaciones diagnósticas de tu estudiante mediante la beca Utah Fits All en la plataforma Odyssey sin desembolsos personales.";
    } else if (stateSlug === "wyoming") {
      dict.hero_title = lang === "en" ? "Approved Nonpublic K–12 Tuition & Distance Learning for Wyoming Families (ESA)" : "Educación Escolar No Pública K–12 para Familias de Wyoming (ESA)";
      dict.hero_lead = lang === "en" ? "Utilize up to $7,000 in state education funds to cover 100% of your student's remote tuition, elective courseware, and standardized testing via the Wyoming ESA Odyssey marketplace." : "Financia hasta $7,000 de la colegiatura online, cursos electivos y evaluaciones estandarizadas de tu estudiante mediante Wyoming ESA en Odyssey sin desembolsos personales.";
    } else if (stateSlug === "arizona") {
      dict.hero_title = lang === "en" ? "Approved Nonpublic Online K–12 School & Tuition for Arizona Families (ESA)" : "Colegio Privado Online Aprobado K–12 para Familias de Arizona (ESA)";
      dict.hero_lead = lang === "en" ? "Fund 100% of your student's tuition, curriculum, and diagnostic evaluations through your Arizona ESA account using ClassWallet Direct Pay with zero personal out-of-pocket expenses." : "Financia el 100% de la colegiatura, currículo y evaluaciones diagnósticas de tu estudiante mediante tu cuenta de Arizona ESA a través de ClassWallet Direct Pay sin pagos de tu bolsillo.";
    } else if (stateSlug === "alabama") {
      dict.hero_title = lang === "en" ? "Approved Nonpublic Online K–12 School for Alabama Families (CHOOSE Act)" : "Colegio Privado Online Aprobado K–12 para Familias de Alabama (CHOOSE Act)";
      dict.hero_lead = lang === "en" ? "Fund 100% of your student's tuition and approved academic services through the CHOOSE Act program via ClassWallet Direct Pay with zero personal upfront payments." : "Financia el 100% de la colegiatura y servicios académicos aprobados mediante la beca CHOOSE Act a través de ClassWallet Direct Pay sin pagos personales por adelantado.";
    } else if (stateSlug === "south-carolina") {
      dict.hero_title = lang === "en" ? "Approved Nonpublic Online K–12 School for South Carolina Families (ESTF)" : "Colegio Privado Online Aprobado K–12 para Familias de South Carolina (ESTF)";
      dict.hero_lead = lang === "en" ? "Utilize your ESTF account funds in ClassWallet Direct Pay to cover 100% of nonpublic tuition, curriculum, and diagnostic evaluations with zero out-of-pocket costs." : "Utiliza los fondos de tu cuenta ESTF en ClassWallet Direct Pay para financiar el 100% de la colegiatura no pública, currículo y evaluaciones diagnósticas de tu estudiante.";
    } else if (stateSlug === "new-hampshire") {
      dict.hero_title = lang === "en" ? "Approved Nonpublic Online K–12 School for New Hampshire Families (EFA)" : "Colegio Privado Online Aprobado K–12 para Familias de New Hampshire (EFA)";
      dict.hero_lead = lang === "en" ? "Fund 100% of your student's accredited online K–12 tuition, language electives, and standardized diagnostics using your EFA grant via ClassWallet Direct Pay." : "Cubre el 100% de la colegiatura online K–12, electivas de idiomas y evaluaciones diagnósticas mediante tus fondos EFA en ClassWallet Direct Pay sin desembolsos personales.";
    }

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.placeholder = dict[key];
        } else {
          el.innerHTML = dict[key];
        }
      }
    });

    updateSubmitButtonText();
    calculateTotals();
  }

  // FORM CONTROLLER
  function setupForm() {
    var form = document.getElementById("enrollmentForm");
    if (!form) return;

    var btnNext = document.getElementById("btnStepNext");
    var btnPrev = document.getElementById("btnStepPrev");

    if (btnNext) {
      btnNext.addEventListener("click", function () {
        if (validateStep(currentStep)) {
          goToStep(currentStep + 1);
        }
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener("click", function () {
        goToStep(currentStep - 1);
      });
    }

    form.addEventListener("submit", handleFormSubmit);

    document.querySelectorAll("input[name='payment_method']").forEach(function (radio) {
      radio.addEventListener("change", function () {
        document.querySelectorAll(".payment-opt-card").forEach(function (c) {
          c.classList.remove("selected");
        });
        var card = this.closest(".payment-opt-card");
        if (card) card.classList.add("selected");
        updateSubmitButtonText();
      });
    });

    var gradeSelect = document.getElementById("f_grade");
    if (gradeSelect) {
      gradeSelect.addEventListener("change", function () {
        var tuitionGrade = document.getElementById("f_tuition_grade");
        if (tuitionGrade) {
          tuitionGrade.value = this.value;
          calculateTotals();
        }
      });
    }
  }

  function goToStep(step) {
    if (step < 1 || step > 3) return;
    currentStep = step;

    document.querySelectorAll(".form-step-section").forEach(function (sec) {
      var s = parseInt(sec.getAttribute("data-step"), 10);
      sec.style.display = s === currentStep ? "block" : "none";
    });

    document.querySelectorAll(".form-step-item").forEach(function (ind) {
      var s = parseInt(ind.getAttribute("data-step"), 10);
      ind.classList.toggle("active", s === currentStep);
      ind.classList.toggle("done", s < currentStep);
    });

    var btnNext = document.getElementById("btnStepNext");
    var btnPrev = document.getElementById("btnStepPrev");
    var btnSubmit = document.getElementById("btnSubmitInvoice");

    if (btnPrev) btnPrev.style.display = currentStep > 1 ? "inline-flex" : "none";
    if (btnNext) btnNext.style.display = currentStep < 3 ? "inline-flex" : "none";
    if (btnSubmit) btnSubmit.style.display = currentStep === 3 ? "inline-flex" : "none";

    var formBox = document.getElementById("enrollmentSection");
    if (formBox) {
      formBox.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function validateStep(step) {
    var errorEl = document.getElementById("formAlertError");
    if (errorEl) errorEl.style.display = "none";

    var currentSec = document.querySelector(".form-step-section[data-step='" + step + "']");
    if (!currentSec) return true;

    var inputs = currentSec.querySelectorAll("input[required], select[required]");
    var valid = true;

    inputs.forEach(function (input) {
      if (!input.checkValidity()) {
        valid = false;
        input.reportValidity();
      }
    });

    if (!valid && errorEl) {
      errorEl.textContent = (I18N[currentLang] || I18N.es).err_required;
      errorEl.style.display = "block";
    }

    return valid;
  }

  function updateSubmitButtonText() {
    var btnSubmit = document.getElementById("btnSubmitInvoice");
    if (!btnSubmit) return;

    var dict = I18N[currentLang] || I18N.es;
    var isPrivate = document.getElementById("pay_private") && document.getElementById("pay_private").checked;
    var isOdyssey = document.body.getAttribute("data-platform") === "odyssey";

    if (isPrivate) {
      btnSubmit.textContent = dict.btn_submit_priv;
    } else {
      btnSubmit.textContent = isOdyssey
        ? (currentLang === "es" ? "Inscribirse con Fondos de Odyssey" : "Enroll with Odyssey Funds")
        : dict.btn_submit_cw;
    }
  }

  // CALCULATOR LOGIC
  function setupCalculator() {
    var triggers = [
      "srv_tuition",
      "f_tuition_grade",
      "srv_diagnostic",
      "srv_spanish",
      "srv_lifeskills",
      "srv_mentorship"
    ];

    triggers.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        el.addEventListener("change", function () {
          if (id === "srv_tuition") {
            var localBox = document.getElementById("localStudiesBox");
            if (localBox) localBox.style.display = el.checked ? "block" : "none";
            var card = el.closest(".service-check-card");
            if (card) card.classList.toggle("selected", el.checked);
          }
          if (id === "srv_lifeskills") {
            var card = el.closest(".service-check-card");
            if (card) card.classList.toggle("selected", el.checked);
            var trackBox = document.getElementById("lifeSkillsTrackBox");
            if (trackBox) trackBox.style.display = el.checked ? "block" : "none";
          }
          if (id === "srv_diagnostic" || id === "srv_spanish" || id === "srv_mentorship") {
            var card = el.closest(".service-check-card");
            if (card) card.classList.toggle("selected", el.checked);
          }
          calculateTotals();
        });
      }
    });
  }

  function calculateTotals() {
    var regFee = 295;
    var diagFee = (document.getElementById("srv_diagnostic") && document.getElementById("srv_diagnostic").checked) ? 200 : 0;
    var oneTimeTotal = regFee + diagFee;

    var monthlyTotal = 0;
    var tuitionCheck = document.getElementById("srv_tuition");
    var gradeVal = (document.getElementById("f_tuition_grade") && document.getElementById("f_tuition_grade").value) || "K-5";

    if (tuitionCheck && tuitionCheck.checked) {
      if (gradeVal === "K-5") monthlyTotal += 275;
      else if (gradeVal === "6-8") monthlyTotal += 320;
      else if (gradeVal === "9-12") monthlyTotal += 365;
    }

    if (document.getElementById("srv_spanish") && document.getElementById("srv_spanish").checked) {
      monthlyTotal += 120;
    }

    if (document.getElementById("srv_lifeskills") && document.getElementById("srv_lifeskills").checked) {
      monthlyTotal += 85;
    }

    if (document.getElementById("srv_mentorship") && document.getElementById("srv_mentorship").checked) {
      monthlyTotal += 150;
    }

    var annualTotal = oneTimeTotal + (monthlyTotal * 10);

    var elOneTime = document.getElementById("calcValOneTime");
    var elMonthly = document.getElementById("calcValMonthly");
    var elAnnual = document.getElementById("calcValAnnual");

    if (elOneTime) elOneTime.textContent = "$" + oneTimeTotal.toLocaleString("en-US");
    if (elMonthly) elMonthly.textContent = "$" + monthlyTotal.toLocaleString("en-US") + (currentLang === "es" ? " / mes (x10)" : " / mo (x10)");
    if (elAnnual) elAnnual.textContent = "$" + annualTotal.toLocaleString("en-US");

    var hiddenTotal = document.getElementById("f_total_annual_estimate");
    if (hiddenTotal) hiddenTotal.value = "$" + annualTotal + " ($" + oneTimeTotal + " initial + $" + monthlyTotal + "/mo x 10)";
  }

  // FORM SUBMISSION AJAX
  async function handleFormSubmit(e) {
    e.preventDefault();
    if (!validateStep(3)) return;

    var form = e.target;
    var btnSubmit = document.getElementById("btnSubmitInvoice");
    var alertSuccess = document.getElementById("formAlertSuccess");
    var alertError = document.getElementById("formAlertError");

    var dict = I18N[currentLang] || I18N.es;

    if (btnSubmit) {
      btnSubmit.disabled = true;
      btnSubmit.textContent = dict.btn_submitting;
    }
    if (alertError) alertError.style.display = "none";
    if (alertSuccess) alertSuccess.style.display = "none";

    try {
      var formData = new FormData(form);
      formData.append("lang", currentLang);

      var resp = await fetch("/enviar-formulario.php", {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      });

      var data = {};
      try {
        data = await resp.json();
      } catch (jsonErr) {
        data = { success: resp.ok };
      }

      if (resp.ok && data.success !== false) {
        if (alertSuccess) {
          alertSuccess.innerHTML =
            "<h3>" + dict.success_title + "</h3>" +
            "<p>" + dict.success_p1 + "</p>" +
            "<p>" + dict.success_p2 + "</p>" +
            "<div class='success-steps'>" +
              "<h4>" + dict.success_steps_title + "</h4>" +
              "<ol>" +
                "<li>" + dict.success_s1 + "</li>" +
                "<li>" + dict.success_s2 + "</li>" +
                "<li>" + dict.success_s3 + "</li>" +
                "<li>" + dict.success_s4 + "</li>" +
              "</ol>" +
            "</div>";
          alertSuccess.style.display = "block";
          alertSuccess.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        form.reset();
        goToStep(1);
      } else {
        throw new Error(data.error || "Submission failed");
      }
    } catch (err) {
      if (alertError) {
        alertError.textContent = (currentLang === "es")
          ? "Error al procesar la solicitud. Por favor verifique su conexión o contáctenos directamente a offcampus@chanakacademy.org."
          : "Error processing your request. Please verify your connection or email us directly at offcampus@chanakacademy.org.";
        alertError.style.display = "block";
      }
    } finally {
      if (btnSubmit) {
        btnSubmit.disabled = false;
        updateSubmitButtonText();
      }
    }
  }

  // BOOTSTRAP
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
