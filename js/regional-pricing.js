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
  CO: {
    code: 'CO',
    name: 'Colombia',
    shortName: 'Colombia',
    flag: '🇨🇴',
    currency: 'COP',
    symbol: '$',
    locale: 'es-CO',
    phonePrefix: '+57'
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

/**
 * Enlace Chanak por país (dado por dirección 2026-09-19). Es el punto de
 * contacto que se muestra en Off-Campus y Dual Diploma; NO es "representante
 * legal" de ninguna entidad — las únicas entidades legales del proyecto son
 * Chanak Academy (Florida, FLDOE #134620) y Asociación EducaFe (España, NIF
 * G19357789). Un país sin entrada aquí simplemente no muestra el bloque.
 */
window.CHANAK_CONTACTS = {
  US: { name: 'Karen Pujols' },
  MX: { name: 'Karen Vidal' },
  ES: { name: 'Elias Vidal' },
  PA: { name: 'Mariela Andrade' }
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

      // Off-Campus en España: plan personalizado sin importes fijos públicos (on_request)
      off_campus: {
        status: 'on_request',
        title: 'Off-Campus · Escuela completa K-12 a distancia',
        enrollmentFee: null,
        enrollmentIncludes: 'Incluye diagnóstico académico y Plan Educativo Individualizado (PEI).',
        installments: 'plan personalizado',
        includes: 'Plataforma SIS (sis.chanakacademy.org) · Portal de seguimiento (portal.chanakacademy.org) · LMS · mentor asignado · grupos virtuales de refuerzo de idioma',
        note: 'El alumno queda registrado en una escuela privada americana bajo supervisión central desde Florida; la familia conserva la responsabilidad legal educativa local según su país de residencia.',
        tiers: [
          { key: 'elementary', title: 'Primaria (K-5)', description: 'Currículo estadounidense K-5 con Plan Educativo Individualizado y seguimiento en el SIS.' },
          { key: 'middle_high', title: 'Secundaria y Bachillerato (6-12)', description: 'Currículo estadounidense completo, créditos oficiales y transcript FLDOE #134620.' }
        ],
        footnote: 'Plan de colegiatura adaptado a las necesidades de cada estudiante y familia. Material y currículo no incluidos.'
      },

      dual_diploma: {
        status: 'published',
        title: 'Chanak Dual Diploma · Bachillerato y FP',
        assessmentFee: '35 €',
        assessmentLabel: 'Examen diagnóstico de inglés',
        enrollmentFee: '210 €',
        installments: '10 mensualidades',
        includes: 'Compatible con Bachillerato y Formación Profesional (FP) · Mentoría semanal · LMS y SIS · evaluaciones · SAT Prep Hub · Test de Dones · transcript oficial',
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
       Actualizada con tarifas aprobadas de Dual Diploma y Homeschool. */
    MX: {
      currency: 'MXN',
      symbol: '$',

      diagnostic: {
        status: 'published',
        title: 'Evaluación académica',
        price: '$850 MXN',
        description: 'Revisión de expediente y recomendación inicial.'
      },

      off_campus: {
        status: 'on_request',
        title: 'Off-Campus · Escuela completa K-12 a distancia',
        enrollmentFee: null,
        enrollmentIncludes: 'Incluye diagnóstico académico y Plan Educativo Individualizado (PEI).',
        installments: 'plan personalizado',
        includes: 'Plataforma SIS (sis.chanakacademy.org) · Portal de seguimiento (portal.chanakacademy.org) · LMS · mentor asignado · grupos virtuales de refuerzo de idioma',
        note: 'La familia recibe una propuesta personalizada según el grado y expediente del estudiante.',
        tiers: [
          { key: 'elementary', title: 'Primaria (K-5)', description: 'Currículo estadounidense K-5 con acompañamiento bilingüe y seguimiento en el SIS.' },
          { key: 'middle_high', title: 'Secundaria y Preparatoria (6-12)', description: 'Créditos oficiales de High School y transcript emitido por Chanak.' }
        ],
        footnote: 'Plan de colegiatura adaptado a las necesidades de cada estudiante y familia. Material y currículo no incluidos.'
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
          { key: 'r4', title: 'Ruta 4 años', level: '3.º Secundaria · Grade 9', hours: '3-4 h/sem', monthly: '$3,400 MXN', totalYear: '$34,000 MXN' },
          { key: 'r3', title: 'Ruta 3 años', level: 'Inicio Prepa · Grade 10', hours: '4-5 h/sem', monthly: '$4,100 MXN', totalYear: '$41,000 MXN' },
          { key: 'r2', title: 'Ruta 2 años', level: 'Etapa avanzada · Grade 11', hours: '5-6 h/sem + Summer', monthly: '$5,800 MXN', totalYear: '$58,000 MXN' },
          { key: 'r1', title: 'Ruta acelerada', level: 'Último ciclo · Grade 12', hours: 'Plan modular + Summer', monthly: '$6,500 MXN', totalYear: '$65,000 MXN' }
        ],
        footnote: 'Tarifa México del ciclo 2026-2027 en pesos mexicanos. El total anual se calcula a 10 mensualidades; la matrícula y la evaluación académica se abonan aparte. La familia recibe el Plan de Ruta y la inversión correspondiente por escrito antes de formalizar.'
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

      off_campus: {
        status: 'published',
        title: 'Off-Campus · Escuela completa K-12 a distancia',
        enrollmentFee: 'US$180',
        enrollmentIncludes: 'Incluye diagnóstico académico y Plan Educativo Individualizado (PEI).',
        installments: 'mensualidad',
        includes: 'Plataforma SIS (sis.chanakacademy.org) · Portal de seguimiento (portal.chanakacademy.org) · LMS · mentor asignado · grupos virtuales de refuerzo de idioma',
        note: 'Al formalizar se abonan US$250: matrícula de US$180 más la primera mensualidad de US$70.',
        tiers: [
          { key: 'elementary', title: 'Primaria (K-5)', monthly: 'US$70', description: 'Currículo estadounidense K-5 con acompañamiento bilingüe y seguimiento en el SIS.' },
          { key: 'middle_high', title: 'Secundaria y Media (6-12)', monthly: 'US$70', description: 'Créditos oficiales de High School y transcript emitido por Chanak.' }
        ],
        footnote: 'Mensualidad única para todos los niveles. Material y currículo no incluidos; cada familia elige y adquiere el suyo (coste orientativo US$550-650/año, equivalente al de España).'
      },

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

    /* ---------------------------------------------------------------- CO */
    CO: {
      currency: 'COP',
      symbol: '$',

      diagnostic: {
        status: 'on_request',
        title: 'Evaluación académica',
        description: 'Revisión de expediente y recomendación inicial.'
      },

      off_campus: {
        status: 'published',
        title: 'Off-Campus · Escuela completa K-12 a distancia',
        enrollmentFee: '$575.000 COP',
        enrollmentIncludes: 'Incluye diagnóstico académico y Plan Educativo Individualizado (PEI).',
        installments: 'mensualidad',
        includes: 'Plataforma SIS (sis.chanakacademy.org) · Portal de seguimiento (portal.chanakacademy.org) · LMS · mentor asignado · grupos virtuales de refuerzo de idioma',
        note: 'Al formalizar se abonan $800.000 COP: matrícula de $575.000 COP más la primera mensualidad de $225.000 COP.',
        tiers: [
          { key: 'elementary', title: 'Primaria (K-5)', monthly: '$225.000 COP', description: 'Currículo estadounidense K-5 con acompañamiento bilingüe y seguimiento en el SIS.' },
          { key: 'middle_high', title: 'Secundaria y Media (6-12)', monthly: '$225.000 COP', description: 'Créditos oficiales de High School y transcript emitido por Chanak.' }
        ],
        footnote: 'Mensualidad única para todos los niveles. Material y currículo no incluidos; cada familia elige y adquiere el suyo (coste orientativo $1.800.000-2.050.000 COP/año, equivalente al de España).'
      },

      dual_diploma: {
        status: 'on_request',
        title: 'Chanak Dual Diploma',
        routes: []
      }
    },

    /* ---------------------------------------------------------------- US */
    /* Programa Principal: U.S. K-12 Off-Campus.
       Programa Secundario: Finaliza tu High School / Adult High School Completion (desde $2,500 USD). */
    US: {
      currency: 'USD',
      symbol: '$',

      diagnostic: {
        status: 'published',
        title: 'Academic Diagnostic',
        price: '$58 USD',
        description: 'Full level assessment and personalized program recommendation.'
      },

      // PROGRAMA PRINCIPAL EN EE. UU.
      off_campus: {
        status: 'published',
        title: 'U.S. K-12 Off-Campus · Private Umbrella School',
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

      // PROGRAMA SECUNDARIO: Adult High School Completion (desde $2,500 USD)
      dual_diploma: {
        status: 'published',
        title: 'Finaliza tu High School · Adult High School Completion',
        assessmentFee: '$58 USD',
        assessmentLabel: 'Evaluación diagnóstica y revisión de expediente',
        enrollmentFee: null,
        installments: 'precio único según evaluación diagnóstica',
        includes: 'Revisión individual de créditos previos · vía acelerada de un año · mentor asignado · plataforma 24/7 · diploma de High School emitido por Chanak',
        routes: [
          { key: 'adult_completion', title: 'Vía Acelerada para Adultos', level: 'Adult High School Completion', hours: '1 año · según evaluación diagnóstica', monthly: null, totalYear: 'desde $2,500 USD' }
        ],
        footnote: 'Un solo programa desde $2,500 USD, diseñado para completarse mediante una vía acelerada de un año. La duración, asignaturas requeridas y precio final dependen de la evaluación diagnóstica y la revisión del expediente previo.'
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
