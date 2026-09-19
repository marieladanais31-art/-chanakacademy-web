/**
 * js/regional-pricing.js
 * CATÁLOGO ÚNICO DE PRECIOS — única fuente de verdad del sitio.
 *
 * REGLA DEL PROYECTO: aquí solo entran importes CONFIRMADOS por dirección,
 * documentados en un PDF oficial o en la configuración de pago. Si un importe
 * no está confirmado, su bloque lleva status:'on_request' y la web muestra
 * "Solicitar plan de colegiatura" en lugar de una cifra. Nunca se inventa un precio.
 *
 * Fuentes de los importes publicados:
 *  - ES Dual Diploma ....... Chanak_Dual_Diploma_Espana_2026-27.pdf (pág. 11)
 *  - MX Dual Diploma ....... Chanak_Dual_Diploma_Mexico_2026-27_PROPUESTA.pdf (pág. 8)
 *  - Diagnóstico 50 € ...... landing /diagnostico/ + Stripe
 *  - ES alta Dual Diploma .. assets/site-config.js (evaluación 35 € · matrícula 210 €)
 *  - ES alta Off-Campus ... matrícula 180 € + primera mensualidad (confirmado por
 *                            dirección el 2026-09-18; sustituye al «desde 250 €» de la home)
 *  - UAE / Dubái ........... _private/commercial-pricing.php
 *
 * Pendientes de aprobación de dirección: la mensualidad de Off-Campus en México,
 * Panamá e Internacional (España 70 € y EE. UU. sí están aprobadas),
 * Dual Diploma US / PA / Internacional, y los productos modulares.
 *
 * El enlace al SIS NO se toca desde aquí: buildSisEnrollmentUrl() conserva
 * exactamente los mismos parámetros que ya estaban en producción.
 */

window.SUPPORTED_REGIONS = {
  ES: {
    code: 'ES',
    name: 'España / Europa',
    shortName: 'España',
    flag: '🇪🇸',
    currency: 'EUR',
    symbol: '€',
    locale: 'es-ES',
    phonePrefix: '+34'
  },
  MX: {
    code: 'MX',
    name: 'México',
    shortName: 'México',
    flag: '🇲🇽',
    // currency = lo que se envía al SIS. NO se cambia: el SIS ya espera USD.
    // displayCurrency = lo único que ve la familia. México publica en pesos.
    currency: 'USD',
    displayCurrency: 'MXN',
    symbol: '$',
    locale: 'es-MX',
    phonePrefix: '+52'
  },
  PA: {
    code: 'PA',
    name: 'Panamá',
    shortName: 'Panamá',
    flag: '🇵🇦',
    currency: 'USD',
    symbol: '$',
    locale: 'es-PA',
    phonePrefix: '+507'
  },
  US: {
    code: 'US',
    name: 'Estados Unidos',
    shortName: 'Estados Unidos',
    flag: '🇺🇸',
    currency: 'USD',
    symbol: '$',
    locale: 'en-US',
    phonePrefix: '+1'
  },
  GLOBAL: {
    code: 'GLOBAL',
    name: 'Internacional',
    shortName: 'Internacional',
    flag: '🌐',
    currency: 'USD',
    symbol: '$',
    locale: 'es',
    phonePrefix: '+1'
  }
};

/** Texto único que se muestra cuando un precio no está aprobado todavía. */
window.CHANAK_PRICE_ON_REQUEST = {
  es: 'Plan de colegiatura personalizado',
  en: 'Personalized tuition plan'
};

window.CHANAK_PRICING = {
  updated: '2026-09-18',
  cycle: '2026-2027',

  markets: {

    /* ---------------------------------------------------------------- ES */
    ES: {
      currency: 'EUR',
      symbol: '€',

      diagnostic: {
        status: 'published',
        title: 'Diagnóstico Académico',
        price: '50 €',
        description: 'Evaluación completa de nivel (149 preguntas) y propuesta de programa. Servicio independiente para familias que aún no han elegido programa.'
      },

      // Mensualidad 70 € confirmada por dirección el 2026-09-18. La matrícula de
      // 180 € más la primera mensualidad son los 250 € iniciales que ya figuraban
      // en la home: las dos cifras eran correctas y complementarias.
      off_campus: {
        status: 'published',
        title: 'Off-Campus · Escuela completa K-12 a distancia',
        enrollmentFee: '180 €',
        enrollmentIncludes: 'Incluye diagnóstico académico y Plan Educativo Individualizado (PEI).',
        installments: 'mensualidad',
        includes: 'Plataforma SIS (sis.chanakacademy.org) · Portal de seguimiento (portal.chanakacademy.org) · LMS · mentor asignado · grupos virtuales de refuerzo de idioma',
        note: 'Al formalizar se abonan 250 €: matrícula de 180 € más la primera mensualidad. En España, Off-Campus se ofrece a partir de los 16 años o a través de centro extranjero autorizado (RD 806/1993) con iglesia colaboradora.',
        tiers: [
          { key: 'elementary', title: 'Primaria (K-5)', monthly: '70 €', description: 'Currículo estadounidense K-5 con Plan Educativo Individualizado y seguimiento en el SIS.' },
          { key: 'middle_high', title: 'Secundaria y Bachillerato (6-12)', monthly: '70 €', description: 'Currículo estadounidense completo, créditos oficiales y transcript FLDOE #134620.' }
        ],
        footnote: 'Mensualidad única para todos los niveles. La matrícula se abona una sola vez al formalizar. Material y currículo no incluidos; cada familia elige y adquiere el suyo (coste orientativo 480-560 €/año).'
      },

      dual_diploma: {
        status: 'published',
        title: 'Chanak Dual Diploma',
        assessmentFee: '35 €',
        assessmentLabel: 'Examen diagnóstico de inglés',
        enrollmentFee: '210 €',
        installments: '10 mensualidades',
        includes: 'Mentoría semanal · LMS y SIS · evaluaciones · SAT Prep Hub · Test de Dones · transcript oficial',
        routes: [
          { key: 'r4', title: 'Ruta 4 años', level: '3.º ESO · Grade 9', hours: '3-5 h/sem', monthly: '110 €', totalFirstYear: '1.310 €' },
          { key: 'r3', title: 'Ruta 3 años', level: '4.º ESO · Grade 10', hours: '3-5 h/sem', monthly: '129 €', totalFirstYear: '1.500 €' },
          { key: 'r2', title: 'Ruta 2 años', level: '1.º Bach · Grade 11', hours: '3-5 h/sem', monthly: '148 €', totalFirstYear: '1.690 €' },
          { key: 'r1', title: 'Ruta intensiva', level: '2.º Bach · Grade 12', hours: '3-5 h/sem', monthly: '167 €', totalFirstYear: '1.880 €' }
        ],
        footnote: 'La mensualidad se fija al entrar y se mantiene hasta terminar la ruta. El total del primer año incluye matrícula y diez mensualidades; el examen diagnóstico va aparte.'
      }
    },

    /* ---------------------------------------------------------------- MX */
    /* Tarifa publicada en pesos mexicanos por decisión de dirección (2026-09-18).
       Equivale a la propuesta en USD del PDF de México al cambio de referencia
       1 USD ≈ 17,15 MXN (XE y Wise, 18/09/2026), redondeada a cifra limpia.
       Si el cambio se mueve de forma sostenida, hay que revisar esta tabla. */
    MX: {
      currency: 'MXN',
      symbol: '$',

      diagnostic: {
        status: 'published',
        title: 'Evaluación académica',
        price: '$850 MXN',
        description: 'Revisión de expediente y recomendación inicial.'
      },

      // Off-Campus es una sola ruta K-12: la mensualidad no varía por nivel
      // porque el servicio (LMS, SIS, portal de seguimiento, mentor) es el
      // mismo en todos los grados. La matrícula incluye diagnóstico académico
      // y PEI, no se cobran aparte. Aprobado por dirección 2026-09-19.
      // OCULTO 2026-09-19: el precio anterior (matrícula $9,500 + 10
      // mensualidades de $5,600 = "totalYear" $65,500) copiaba por error la
      // lógica de Dual Diploma (plan de pagos hacia un total cerrado). El
      // dossier real de Off-Campus (Programa Off-Campus 2026-27, servicio
      // Chanak) es una cuota de servicio RECURRENTE y modesta —matrícula
      // única 180€ + mensualidad continua 70€, sin "total del año"—, igual
      // en España para cualquier grado. Vuelto a on_request hasta que
      // dirección confirme cifra para México. Propuesta pendiente de
      // aprobar (equivalente a 180€/70€ al cambio de referencia, NO al
      // techo de EE.UU.): matrícula ~$3,500-3,600 MXN, mensualidad
      // ~$1,350-1,400 MXN, sin total ni número de cuotas.
      off_campus: {
        status: 'on_request',
        title: 'Off-Campus · Escuela completa K-12 a distancia',
        enrollmentFee: null,
        tiers: [
          { key: 'elementary', title: 'Primaria (K-5)', description: 'Currículo estadounidense K-5 con acompañamiento bilingüe y seguimiento en el SIS.' },
          { key: 'middle_high', title: 'Secundaria y Preparatoria (6-12)', description: 'Créditos oficiales de High School y transcript emitido por Chanak.' }
        ]
      },

      dual_diploma: {
        status: 'published',
        title: 'Chanak Dual Diploma',
        assessmentFee: '$850 MXN',
        assessmentLabel: 'Evaluación académica',
        enrollmentFee: '$4,300 MXN',
        installments: '10 mensualidades',
        includes: 'Plan de Ruta · SIS · LMS · clases semanales en vivo · mentoría personalizada',
        routes: [
          { key: 'r4', title: 'Ruta 4 años', level: '3.º Secundaria · Grade 9', hours: '3-4 h/sem', monthly: '$2,400 MXN', totalYear: '$24,000 MXN' },
          { key: 'r3', title: 'Ruta 3 años', level: 'Inicio Prepa · Grade 10', hours: '4-5 h/sem', monthly: '$3,100 MXN', totalYear: '$31,000 MXN' },
          { key: 'r2', title: 'Ruta 2 años', level: 'Etapa avanzada · Grade 11', hours: '5-6 h/sem + Summer', monthly: '$3,800 MXN', totalYear: '$38,000 MXN' },
          { key: 'r1', title: 'Ruta acelerada', level: 'Último ciclo · Grade 12', hours: 'Plan modular + Summer', monthly: '$4,500 MXN', totalYear: '$45,000 MXN' }
        ],
        footnote: 'Tarifa México del ciclo 2026-2027. El total anual se calcula a 10 mensualidades; la matrícula y la evaluación académica se abonan aparte. La familia recibe el Plan de Ruta y la inversión correspondiente por escrito antes de formalizar.'
      }
    },

    /* ---------------------------------------------------------------- PA */
    PA: {
      currency: 'USD',
      symbol: '$',

      diagnostic: {
        status: 'published',
        title: 'Evaluación académica',
        price: 'US$50',
        description: 'Revisión de expediente y recomendación inicial.'
      },

      // OCULTO 2026-09-19: mismo error que México (ver nota allí) — el
      // precio anterior copiaba el plan de pagos de Dual Diploma. Vuelto a
      // on_request. Propuesta pendiente de aprobar (equivalente a 180€/70€
      // de referencia, no al techo de EE.UU.): matrícula ~US$200-210,
      // mensualidad continua ~US$80, sin total ni número de cuotas.
      off_campus: {
        status: 'on_request',
        title: 'Off-Campus · Escuela completa K-12 a distancia',
        enrollmentFee: null,
        tiers: [
          { key: 'elementary', title: 'Primaria (K-5)', description: 'Currículo estadounidense K-5 con acompañamiento bilingüe y seguimiento en el SIS.' },
          { key: 'middle_high', title: 'Secundaria y Media (6-12)', description: 'Créditos oficiales de High School y transcript emitido por Chanak.' }
        ]
      },

      // Importes ya publicados en /dual-diploma-panama/. La tabla completa por
      // grado no está publicada: se entrega con el Plan de Ruta, así que aquí
      // solo se declara el "desde" que ya figura en producción.
      dual_diploma: {
        status: 'published',
        title: 'Chanak Dual Diploma',
        assessmentFee: 'US$50',
        assessmentLabel: 'Evaluación académica inicial',
        enrollmentFee: 'US$250',
        installments: '10 mensualidades',
        includes: 'Plan de Ruta · SIS · LMS · mentoría · Life Skills & Leadership',
        routes: [
          { key: 'from', title: 'Según grado de entrada', level: 'Grade 9 a Grade 12', hours: '3-6 h/sem', monthly: null, totalYear: 'desde US$1,400 al año' }
        ],
        footnote: 'Inversión anual desde US$1,400 según el grado de entrada. La tabla completa por ruta se entrega con el Plan de Ruta personalizado, antes de formalizar la matrícula.'
      }
    },

    /* ---------------------------------------------------------------- US */
    /* Tarifa aprobada por dirección el 2026-09-18: se sitúa justo por debajo de
       Forest Trail Academy (3.069 / 3.669 / 4.269 USD + 225 de registro) en los
       tres niveles, incluyendo mentoría semanal que el competidor no ofrece. */
    US: {
      currency: 'USD',
      symbol: '$',

      diagnostic: {
        status: 'published',
        title: 'Academic Diagnostic',
        price: '$58 USD',
        description: 'Full level assessment and personalized program recommendation.'
      },

      off_campus: {
        status: 'published',
        title: 'U.S. K-12 Off-Campus',
        enrollmentFee: '$295 USD',
        enrollmentIncludes: 'Includes academic diagnostic and Individualized Education Plan (PEI).',
        installments: '10 monthly payments',
        includes: 'SIS platform (sis.chanakacademy.org) · Progress portal (portal.chanakacademy.org) · LMS · assigned mentor · virtual language-reinforcement groups',
        tiers: [
          { key: 'elementary',  title: 'Elementary (K-5)',            monthly: '$275 USD', totalYear: '$3,045 USD',
            description: 'FLDOE #134620 registration, individualized learning plan, official transcripts and bilingual family support.' },
          { key: 'middle_high', title: 'Middle School (6-8)', monthly: '$320 USD', totalYear: '$3,495 USD',
            description: 'Full U.S. college-prep curriculum, official credits, transcript issuance and counseling.' },
          { key: 'high',        title: 'High School (9-12)',          monthly: '$365 USD', totalYear: '$3,945 USD',
            description: 'Graduation track with College & Career Readiness, SAT prep and counseling.' }
        ],
        footnote: 'Annual tuition includes enrollment plus ten monthly payments. Tuition fits within state scholarship award amounts where families qualify. Curriculum and materials not included; each family chooses and purchases their own (estimated cost $300-500 USD/year).'
      },

      dual_diploma: {
        status: 'published',
        title: 'Chanak Dual Diploma',
        assessmentFee: '$58 USD',
        assessmentLabel: 'Academic assessment',
        enrollmentFee: '$295 USD',
        installments: '10 monthly payments',
        includes: 'Weekly live classes · assigned mentor · LMS and SIS · SAT Prep Hub · official transcript',
        routes: [
          { key: 'std', title: 'Part-time track', level: 'Grade 9 to Grade 12', hours: '3-6 h/week', monthly: '$250 USD', totalYear: '$2,795 USD' }
        ],
        footnote: 'Part-time program: eligible as an education expense under several state scholarship programs. Eligibility is determined by each scholarship funding organization.'
      }
    },

    /* ------------------------------------------------------------ GLOBAL */
    GLOBAL: {
      currency: 'USD',
      symbol: '$',

      diagnostic: {
        status: 'published',
        title: 'Academic Diagnostic',
        price: 'US$58',
        description: 'Full level assessment and personalized program recommendation.'
      },

      off_campus: {
        status: 'on_request',
        title: 'Off-Campus · Full distance school',
        enrollmentFee: null,
        tiers: [
          { key: 'elementary', title: 'International Primary (K-5)', description: 'U.S. curriculum with individualized learning plan and SIS tracking.' },
          { key: 'middle_high', title: 'International Secondary (6-12)', description: 'Official High School credits and transcript issued by Chanak.' }
        ]
      },

      dual_diploma: {
        status: 'on_request',
        title: 'Chanak Dual Diploma',
        note: 'International tuition pending board approval.',
        routes: []
      }
    }
  },

  /**
   * Mercados con tarifa propia gestionada fuera del selector general.
   * Fuente: _private/commercial-pricing.php (no modificar aquí sin sincronizar).
   */
  specialMarkets: {
    UAE:   { currency: 'AED', monthly: 795,  annual: 8745,  enrollmentFee: 650, label: 'United Arab Emirates' },
    Dubai: { currency: 'AED', monthly: 1035, annual: 11385, enrollmentFee: 845, label: 'Dubai' }
  }
};

/**
 * Compatibilidad hacia atrás: js/regional-selector.js y las páginas ya
 * publicadas leen REGIONAL_PRICING_CATALOG[pais].off_campus.elementary.monthlyFee.
 * Se deriva del catálogo único para que no existan dos listas de precios.
 */
(function buildLegacyCatalog() {
  var out = {};
  var onRequest = window.CHANAK_PRICE_ON_REQUEST.es;

  Object.keys(window.CHANAK_PRICING.markets).forEach(function (code) {
    var m = window.CHANAK_PRICING.markets[code];
    var oc = m.off_campus || {};
    var dd = m.dual_diploma || {};

    function tier(key) {
      var t = (oc.tiers || []).filter(function (x) { return x.key === key; })[0] || {};
      var published = oc.status === 'published';
      return {
        title: t.title || '',
        description: t.description || '',
        enrollmentFee: published ? (oc.enrollmentFee || '') : (oc.enrollmentFee || ''),
        monthlyFee: published ? (t.monthly || onRequest) : onRequest,
        installments: published ? (oc.installments || '') : '',
        totalYear: published ? (t.totalYear || '') : '',
        onRequest: !published
      };
    }

    var firstRoute = (dd.routes || [])[0] || {};
    var ddPublished = dd.status === 'published';

    out[code] = {
      currency: m.currency,
      symbol: m.symbol,
      off_campus: {
        elementary: tier('elementary'),
        middle_high: tier('middle_high')
      },
      dual_diploma: {
        standard: {
          title: dd.title || '',
          description: dd.footnote || dd.note || '',
          enrollmentFee: ddPublished ? (dd.enrollmentFee || '') : '',
          monthlyFee: ddPublished
            ? (firstRoute.monthly ? ('desde ' + firstRoute.monthly + '/mes') : (firstRoute.totalYear || firstRoute.totalFirstYear || onRequest))
            : onRequest,
          installments: ddPublished ? (dd.installments || '') : '',
          totalYear: ddPublished ? (firstRoute.totalFirstYear || firstRoute.totalYear || '') : '',
          onRequest: !ddPublished
        }
      }
    };
  });

  window.REGIONAL_PRICING_CATALOG = out;
})();

/**
 * Generador de URL hacia la pasarela del SIS.
 * SIN CAMBIOS respecto a producción: mismos parámetros, mismo destino.
 */
window.buildSisEnrollmentUrl = function (program, grade, countryCode) {
  var country = (countryCode || window.getCurrentCountry() || 'GLOBAL').toUpperCase();
  var region = window.SUPPORTED_REGIONS[country] || window.SUPPORTED_REGIONS.GLOBAL;
  var currency = region.currency;

  var params = new URLSearchParams({
    country: country,
    program: program || 'off_campus',
    grade: grade || 'standard',
    currency: currency,
    status: 'pending_review',
    source: 'web_main'
  });
  return 'https://sis.chanakacademy.org/matricula?' + params.toString();
};

/**
 * Resolver de dossiers informativos. Sin cambios.
 */
window.getDossierUrl = function (program, countryCode) {
  var country = (countryCode || window.getCurrentCountry() || 'ES').toLowerCase();
  var prog = (program === 'dual' || program === 'dual_diploma') ? 'dual-diploma' : 'off-campus';
  if (country === 'es') {
    return '/assets/dossiers/dossier-' + prog + '.pdf?v=202609';
  }
  return '/assets/dossiers/dossier-' + prog + '-' + country + '.pdf?v=202609';
};
