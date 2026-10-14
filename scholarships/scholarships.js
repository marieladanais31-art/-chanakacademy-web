/**
 * Chanak International Academy · Scholarships & ClassWallet Direct Pay Module
 * Multi-state support: Arizona ESA, Alabama CHOOSE, South Carolina ESTF, New Hampshire EFA
 * Bilingual dynamic switcher (EN / ES) & Interactive 3-Step Enrollment / Quote Calculator
 */
(function () {
  "use strict";

  // I18N DICTIONARY
  var I18N = {
    en: {
      // Topbar & Nav
      topbar_text: "Official Nonpublic School Provider · ClassWallet Direct Pay Partner",
      topbar_fldoe: "FLDOE Private School Code: #134620 · 501(c)(3) Nonprofit",
      nav_sub: "ClassWallet Approved Programs",
      nav_select_state: "Change State / Program:",
      nav_cta: "Request Invoice",
      
      // Trust Bar
      trust_fldoe: "FLDOE Registered Private School #134620",
      trust_msa: "MSA-CESS Official Candidate for Accreditation",
      trust_nonprofit: "501(c)(3) Nonprofit: Chanak TrainUp Education Inc.",
      trust_directpay: "100% Direct Pay via ClassWallet (No Out-of-Pocket)",

      // 4-Step Direct Pay Guide
      guide_title: "How to Pay via ClassWallet Direct Pay in 4 Steps",
      guide_badge: "Zero Out-of-Pocket Process",
      guide_lead: "As an approved ClassWallet vendor, Chanak allows eligible families to fund tuition and educational services directly with state scholarship funds without personal upfront payments.",
      step1_title: "1. Request Official Invoice",
      step1_desc: "Complete our step-by-step enrollment form below with the student's legal name as it appears in your ESA account and select your courses.",
      step2_title: "2. Log In to ClassWallet",
      step2_desc: "Access your state parent portal (Arizona ESA, Alabama CHOOSE, SC ESTF, or NH EFA) with your family credentials.",
      step3_title: "3. Select 'Pay Vendor'",
      step3_desc: "Navigate to the 'Pay Vendor' section and search for our registered legal entity:",
      step3_vendor: "CHANAK TRAINUP EDUCATION INC",
      step4_title: "4. Upload PDF & Submit",
      step4_desc: "Attach the official itemized invoice sent by Chanak and submit the total amount for 100% direct state disbursement.",

      // Video Section
      video_title: "Watch: How to Submit an Invoice in ClassWallet",
      video_lead: "Follow this step-by-step official tutorial on using the 'Pay Vendor' feature in your ClassWallet portal.",
      video_caption: "Official ClassWallet Tutorial: Submitting vendor invoices for direct payment.",

      // Catalog & Fees
      catalog_badge: "Approved Line Items & Rates",
      catalog_title: "Academic Catalog & Official Fee Schedule",
      catalog_lead: "Unified, state-audited line items for 2026–2027. All tuition packages include digital resources, LMS platform, and annual standardized testing.",
      
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
      alert_title: "⚠️ ATTENTION CLASSWALLET SCHOLARSHIP FAMILIES (ARIZONA, ALABAMA, SC, NH):",
      alert_body: "Do not pay out-of-pocket with personal credit/debit cards if you are using your state ESA funds. Upon submitting this form, our administration will issue and email your OFFICIAL ITEMIZED PDF INVOICE compliant with state regulations. You will then upload this invoice directly to your ClassWallet portal under 'Pay Vendor' by selecting 'CHANAK TRAINUP EDUCATION INC' for direct state disbursement.",

      // Form Steps
      form_title: "Enrollment & Official Invoice Request",
      form_lead: "Fill out student details, select desired services, and receive your itemized PDF invoice for ClassWallet Direct Pay.",
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

      calc_title: "Estimated Tuition & Fee Breakdown",
      calc_onetime: "One-Time Initial Fees (Registration & Diagnostics):",
      calc_monthly: "Monthly Tuition & Electives (10 installments):",
      calc_annual: "Total Estimated School Year Commitment:",
      calc_state_coverage: "Eligible for 100% Direct Disbursement via ClassWallet Direct Pay",

      pay_opt_cw_title: "State Scholarship Funds (ClassWallet Direct Pay)",
      pay_opt_cw_desc: "Zero upfront family payment. We send an itemized PDF invoice for you to upload under 'Pay Vendor' -> CHANAK TRAINUP EDUCATION INC.",
      pay_opt_priv_title: "Private Payment (Credit Card / Stripe / Bank Wire)",
      pay_opt_priv_desc: "Direct family payment if you are paying out-of-pocket or seeking standard private enrollment.",

      btn_next: "Next Step →",
      btn_prev: "← Previous",
      btn_submit_cw: "Request Invoice for ClassWallet Direct Pay",
      btn_submit_priv: "Proceed with Private Enrollment",
      btn_submitting: "Processing Request...",

      success_title: "Official Invoice Request Received!",
      success_p1: "Thank you for enrolling with Chanak International Academy (operated by CHANAK TRAINUP EDUCATION INC).",
      success_p2: "Our admissions department is reviewing your student's details and generating your compliant, itemized PDF invoice.",
      success_steps_title: "Next Steps to Finalize Direct Pay in ClassWallet:",
      success_s1: "Check your email for the official PDF invoice within 24 business hours.",
      success_s2: "Log in to your state ClassWallet parent portal.",
      success_s3: "Go to 'Pay Vendor' and search for CHANAK TRAINUP EDUCATION INC.",
      success_s4: "Upload the PDF invoice and submit the total amount for direct disbursement.",

      err_required: "Please complete all required fields correctly before continuing."
    },
    es: {
      // Topbar & Nav
      topbar_text: "Proveedor Oficial Escolar No Público · Socio Direct Pay en ClassWallet",
      topbar_fldoe: "Código Escolar FLDOE: #134620 · Organización Sin Ánimo de Lucro 501(c)(3)",
      nav_sub: "Programas Aprobados en ClassWallet",
      nav_select_state: "Cambiar Estado / Programa:",
      nav_cta: "Solicitar Factura",
      
      // Trust Bar
      trust_fldoe: "Colegio Privado Registrado FLDOE #134620",
      trust_msa: "Candidato Oficial a Acreditación MSA-CESS",
      trust_nonprofit: "Entidad 501(c)(3): Chanak TrainUp Education Inc.",
      trust_directpay: "100% Pago Directo en ClassWallet (Sin Gastos Propios)",

      // 4-Step Direct Pay Guide
      guide_title: "Cómo Pagar con ClassWallet Direct Pay en 4 Pasos",
      guide_badge: "Proceso Sin Desembolso Personal",
      guide_lead: "Como proveedor registrado en ClassWallet, Chanak permite a las familias con becas estatales financiar la colegiatura y los servicios educativos directamente con los fondos del estado, sin adelantos personales.",
      step1_title: "1. Solicitar Factura Oficial",
      step1_desc: "Completa el formulario inferior con el nombre legal del alumno (tal como figura en tu cuenta ESA) y selecciona los cursos deseados.",
      step2_title: "2. Ingresar a ClassWallet",
      step2_desc: "Accede al portal de tu estado (Arizona ESA, Alabama CHOOSE, SC ESTF o NH EFA) con las credenciales de tu familia.",
      step3_title: "3. Seleccionar 'Pay Vendor'",
      step3_desc: "Dirígete a la sección 'Pay Vendor' y busca a nuestro proveedor registrado oficial:",
      step3_vendor: "CHANAK TRAINUP EDUCATION INC",
      step4_title: "4. Adjuntar PDF y Enviar",
      step4_desc: "Sube la factura oficial en PDF emitida por Chanak e ingresa el monto total para el desembolso directo del 100% por parte del estado.",

      // Video Section
      video_title: "Video: Cómo Usar 'Pay Vendor' en ClassWallet",
      video_lead: "Mira este tutorial paso a paso sobre cómo cargar y pagar facturas de proveedores registrados en tu cuenta de ClassWallet.",
      video_caption: "Tutorial oficial de ClassWallet: Cómo enviar facturas de proveedores para pago directo.",

      // Catalog & Fees
      catalog_badge: "Conceptos Oficiales y Tarifas",
      catalog_title: "Catálogo Académico y Tarifas Unificadas",
      catalog_lead: "Líneas de servicio oficiales aprobadas y auditadas para el ciclo 2026–2027. Todos los paquetes incluyen materiales digitales, plataforma LMS y prueba estandarizada anual.",
      
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
      cat_tuit_elem: "Elementary (Grados K–5): $275 / mes ($2,750 / año)",
      cat_tuit_mid: "Middle School (Grados 6–8): $320 / mes ($3,200 / año)",
      cat_tuit_high: "High School (Grados 9–12): $365 / mes ($3,650 / año)",
      cat_tuit_desc: "Programa escolar completo online que une el rigor curricular estadounidense con la identidad cultural y formación de carácter.",
      cat_tuit_c1: "60% Currículo Núcleo de EE. UU. (Inglés, Matemáticas, Ciencias, Estudios Sociales con Mastery Learning)",
      cat_tuit_c2: "20% Extensión de Estudios Locales (Historia y Geografía del país de origen: España/LOMLOE, México, Colombia, Panamá o USA General)",
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
      alert_title: "⚠️ AVISO PARA FAMILIAS CON BECAS ESTATALES EN CLASSWALLET (ARIZONA, ALABAMA, SC, NH):",
      alert_body: "No realice pagos con tarjeta personal ni fondos propios si va a utilizar su beca estatal. Al completar este formulario, nuestro equipo de admisiones generará su FACTURA OFICIAL EN PDF con la codificación requerida por su estado. Podrá cargar dicha factura directamente en su portal de ClassWallet seleccionando 'Pay Vendor' y buscando a 'CHANAK TRAINUP EDUCATION INC' para desembolso directo del estado.",

      // Form Steps
      form_title: "Inscripción y Solicitud de Factura Oficial",
      form_lead: "Ingresa los datos del estudiante, selecciona los servicios y recibe tu factura en PDF codificada para ClassWallet Direct Pay.",
      form_step1: "1. Estudiante y Familia",
      form_step2: "2. Servicios y Cotización",
      form_step3: "3. Pago y Envío",

      lbl_student_name: "Nombre Legal Completo del Alumno (como en la cuenta ESA) *",
      lbl_student_dob: "Fecha de Nacimiento del Alumno *",
      lbl_student_grade: "Grado Escolar 2026–2027 *",
      lbl_guardian_name: "Nombre Completo del Padre, Madre o Tutor *",
      lbl_guardian_email: "Correo Electrónico (donde enviaremos la factura) *",
      lbl_guardian_phone: "Teléfono de Contacto *",
      lbl_program_state: "Beca Estatal / Programa *",

      lbl_local_studies: "Extensión de Estudios Locales: Seleccione País/Región para Historia y Geografía *",
      opt_select_country: "-- Selecciona el currículo de origen --",
      opt_us_general: "Estados Unidos (Historia y Educación Cívica General de EE. UU.)",
      opt_spain: "España (LOMLOE Geografía e Historia)",
      opt_mexico: "México (Historia y Geografía Nacional)",
      opt_colombia: "Colombia (Ciencias Sociales y Geografía)",
      opt_panama: "Panamá (Historia, Geografía y Cívica)",
      opt_other_latam: "Otro País Hispanoamericano / Internacional",

      lbl_track_lang: "Modalidad de Idioma para Life Skills *",
      opt_track_en: "English Track (En Inglés)",
      opt_track_es: "Modalidad en Español / Spanish Track",

      calc_title: "Desglose Estimado de Colegiatura y Tarifas",
      calc_onetime: "Tarifas Iniciales de Pago Único (Matrícula y Diagnóstico):",
      calc_monthly: "Colegiatura y Electivas Mensuales (10 cuotas):",
      calc_annual: "Total Anual Estimado del Ciclo Escolar:",
      calc_state_coverage: "Elegible para 100% de desembolso directo mediante ClassWallet Direct Pay",

      pay_opt_cw_title: "Fondos de Beca Estatal (ClassWallet Direct Pay)",
      pay_opt_cw_desc: "Sin adelanto de dinero personal. Emitimos la factura oficial en PDF para subirla en 'Pay Vendor' -> CHANAK TRAINUP EDUCATION INC.",
      pay_opt_priv_title: "Pago Privado (Tarjeta de Crédito / Stripe / Transferencia)",
      pay_opt_priv_desc: "Pago directo familiar si no utiliza becas estatales o desea matrícula privada estándar.",

      btn_next: "Paso Siguiente →",
      btn_prev: "← Anterior",
      btn_submit_cw: "Solicitar Factura para ClassWallet Direct Pay",
      btn_submit_priv: "Continuar con Matrícula Privada",
      btn_submitting: "Procesando Solicitud...",

      success_title: "¡Solicitud de Factura Recibida!",
      success_p1: "Gracias por inscribir a su hijo/a en Chanak International Academy (operado por CHANAK TRAINUP EDUCATION INC).",
      success_p2: "Nuestro equipo de admisiones está revisando la información y preparando su factura oficial en PDF itemizada y codificada.",
      success_steps_title: "Siguientes Pasos en ClassWallet:",
      success_s1: "En menos de 24h laborables recibirá su factura en PDF por correo electrónico.",
      success_s2: "Ingrese a su portal de familia en ClassWallet de su estado.",
      success_s3: "Haga clic en 'Pay Vendor' y busque a CHANAK TRAINUP EDUCATION INC.",
      success_s4: "Adjunte la factura en PDF e ingrese el monto total para desembolso directo por el estado.",

      err_required: "Por favor complete todos los campos obligatorios antes de continuar."
    }
  };

  var currentLang = "en";
  var currentStep = 1;

  // INITIALIZE
  function init() {
    // 1. Language detection
    var savedLang = localStorage.getItem("chanak_scholarship_lang");
    var docLang = document.documentElement.getAttribute("lang") || "en";
    currentLang = savedLang || (docLang.indexOf("es") > -1 ? "es" : "en");
    applyLanguage(currentLang);

    // 2. Setup language buttons
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

    // 3. Setup form steps
    setupForm();

    // 4. Setup calculator listeners
    setupCalculator();

    // 5. Initial calculation
    calculateTotals();
  }

  // APPLY LANGUAGE TO DOM
  function applyLanguage(lang) {
    document.documentElement.setAttribute("lang", lang);
    var dict = I18N[lang] || I18N.en;

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.placeholder = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // Update submit button text based on payment method
    updateSubmitButtonText();
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

    // Radio change for payment methods
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

    // Grade selection synchronizer
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

    // Toggle fieldsets
    document.querySelectorAll(".form-step-section").forEach(function (sec) {
      var s = parseInt(sec.getAttribute("data-step"), 10);
      sec.style.display = s === currentStep ? "block" : "none";
    });

    // Update step indicators
    document.querySelectorAll(".form-step-item").forEach(function (ind) {
      var s = parseInt(ind.getAttribute("data-step"), 10);
      ind.classList.toggle("active", s === currentStep);
      ind.classList.toggle("done", s < currentStep);
    });

    // Update nav buttons
    var btnNext = document.getElementById("btnStepNext");
    var btnPrev = document.getElementById("btnStepPrev");
    var btnSubmit = document.getElementById("btnSubmitInvoice");

    if (btnPrev) {
      btnPrev.style.display = currentStep > 1 ? "inline-flex" : "none";
    }
    if (btnNext) {
      btnNext.style.display = currentStep < 3 ? "inline-flex" : "none";
    }
    if (btnSubmit) {
      btnSubmit.style.display = currentStep === 3 ? "inline-flex" : "none";
    }

    // Scroll to form top smoothly
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
      errorEl.textContent = (I18N[currentLang] || I18N.en).err_required;
      errorEl.style.display = "block";
    }

    return valid;
  }

  function updateSubmitButtonText() {
    var btnSubmit = document.getElementById("btnSubmitInvoice");
    if (!btnSubmit) return;

    var dict = I18N[currentLang] || I18N.en;
    var isPrivate = document.getElementById("pay_private") && document.getElementById("pay_private").checked;

    btnSubmit.textContent = isPrivate ? dict.btn_submit_priv : dict.btn_submit_cw;
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
          // If tuition checkbox changed, show/hide local studies
          if (id === "srv_tuition") {
            var localBox = document.getElementById("localStudiesBox");
            if (localBox) localBox.style.display = el.checked ? "block" : "none";
            var card = el.closest(".service-check-card");
            if (card) card.classList.toggle("selected", el.checked);
          }
          // If lifeskills changed, toggle selection
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
    // 1. One-time fees
    var regFee = 295; // Mandatory registration
    var diagFee = (document.getElementById("srv_diagnostic") && document.getElementById("srv_diagnostic").checked) ? 200 : 0;
    var oneTimeTotal = regFee + diagFee;

    // 2. Monthly recurring
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

    // 3. Annual commitment (One-time + 10 monthly payments)
    var annualTotal = oneTimeTotal + (monthlyTotal * 10);

    // Update DOM
    var elOneTime = document.getElementById("calcValOneTime");
    var elMonthly = document.getElementById("calcValMonthly");
    var elAnnual = document.getElementById("calcValAnnual");

    if (elOneTime) elOneTime.textContent = "$" + oneTimeTotal.toLocaleString("en-US");
    if (elMonthly) elMonthly.textContent = "$" + monthlyTotal.toLocaleString("en-US") + " / mo (x10)";
    if (elAnnual) elAnnual.textContent = "$" + annualTotal.toLocaleString("en-US");

    // Hidden input for submission payload
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

    if (alertError) alertError.style.display = "none";
    if (btnSubmit) {
      btnSubmit.disabled = true;
      btnSubmit.textContent = (I18N[currentLang] || I18N.en).btn_submitting;
    }

    try {
      var formData = new FormData(form);
      var response = await fetch(form.action || "/enviar-formulario.php", {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      });

      var result = await response.json();
      if (response.ok && (result.ok || result.success)) {
        // Show success container
        var formContent = document.getElementById("formDynamicContent");
        var successContent = document.getElementById("formSuccessView");
        if (formContent) formContent.style.display = "none";
        if (successContent) successContent.style.display = "block";

        var formBox = document.getElementById("enrollmentSection");
        if (formBox) formBox.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (err) {
      console.error("Submission error:", err);
      if (alertError) {
        alertError.textContent = err.message || "There was an error submitting your request. Please try again or email offcampus@chanakacademy.org";
        alertError.style.display = "block";
      }
      if (btnSubmit) {
        btnSubmit.disabled = false;
        updateSubmitButtonText();
      }
    }
  }

  // DOM READY
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
