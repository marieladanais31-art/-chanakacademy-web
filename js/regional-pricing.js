/**
 * js/regional-pricing.js
 * Catálogo centralizado de precios multirregión y utilidades de enlace al SIS para Chanak Academy.
 * Zero-Breakage: Conexión con el SIS únicamente mediante query parameters limpios.
 */

window.SUPPORTED_REGIONS = {
  ES: {
    code: 'ES',
    name: 'España / Europa',
    flag: '🇪🇸',
    currency: 'EUR',
    symbol: '€',
    locale: 'es-ES',
    phonePrefix: '+34'
  },
  MX: {
    code: 'MX',
    name: 'México',
    flag: '🇲🇽',
    currency: 'USD',
    currencyAlt: 'MXN',
    symbol: '$',
    locale: 'es-MX',
    phonePrefix: '+52'
  },
  PA: {
    code: 'PA',
    name: 'Panamá',
    flag: '🇵🇦',
    currency: 'USD',
    symbol: '$',
    locale: 'es-PA',
    phonePrefix: '+507'
  },
  US: {
    code: 'US',
    name: 'Florida / USA',
    flag: '🇺🇸',
    currency: 'USD',
    symbol: '$',
    locale: 'en-US',
    phonePrefix: '+1'
  },
  GLOBAL: {
    code: 'GLOBAL',
    name: 'Internacional',
    flag: '🌐',
    currency: 'USD',
    symbol: '$',
    locale: 'es',
    phonePrefix: '+1'
  }
};

window.REGIONAL_PRICING_CATALOG = {
  ES: {
    currency: 'EUR',
    symbol: '€',
    off_campus: {
      elementary: {
        title: 'Primaria (K-5)',
        enrollmentFee: '250 €',
        monthlyFee: '165 €/mes',
        installments: '10 cuotas',
        totalYear: '1.900 € / año',
        description: 'Programa K-5 con Plan Educativo Individualizado (PEI) y respaldo FLDOE #134620.'
      },
      middle_high: {
        title: 'Secundaria y Bachillerato (6-12)',
        enrollmentFee: '290 €',
        monthlyFee: '195 €/mes',
        installments: '10 cuotas',
        totalYear: '2.240 € / año',
        description: 'Currículo U.S. completo, créditos oficiales y preparación para convalidación.'
      }
    },
    dual_diploma: {
      standard: {
        title: 'U.S. Dual Diploma (3º ESO - Bachillerato)',
        enrollmentFee: '210 €',
        monthlyFee: '135 €/mes',
        installments: '10 cuotas',
        totalYear: '1.560 € / año',
        description: 'Convalidación de hasta 75% de créditos locales y obtención del U.S. High School Diploma.'
      }
    }
  },
  MX: {
    currency: 'USD',
    symbol: '$',
    off_campus: {
      elementary: {
        title: 'Primaria (K-5)',
        enrollmentFee: '$200 USD',
        monthlyFee: '$140 USD/mes',
        installments: '10 cuotas',
        totalYear: '$1,600 USD / año',
        description: 'Currículo bilingüe K-5, seguimiento personalizado y validez con Apostilla de La Haya.'
      },
      middle_high: {
        title: 'Secundaria y Preparatoria (6-12)',
        enrollmentFee: '$250 USD',
        monthlyFee: '$175 USD/mes',
        installments: '10 cuotas',
        totalYear: '$2,000 USD / año',
        description: 'Créditos oficiales High School, mentoría y expedientes para convalidación SEP.'
      }
    },
    dual_diploma: {
      standard: {
        title: 'Bachillerato Dual Internacional',
        enrollmentFee: '$180 USD',
        monthlyFee: '$125 USD/mes',
        installments: '10 cuotas',
        totalYear: '$1,430 USD / año',
        description: 'Doble titulación EE.UU. + México 100% online compatible con el colegio local.'
      }
    }
  },
  PA: {
    currency: 'USD',
    symbol: '$',
    off_campus: {
      elementary: {
        title: 'Primaria (K-5)',
        enrollmentFee: '$220 USD',
        monthlyFee: '$150 USD/mes',
        installments: '10 cuotas',
        totalYear: '$1,720 USD / año',
        description: 'Educación flexible K-5 con certificación de colegio privado estadounidense.'
      },
      middle_high: {
        title: 'Secundaria y Media (6-12)',
        enrollmentFee: '$260 USD',
        monthlyFee: '$180 USD/mes',
        installments: '10 cuotas',
        totalYear: '$2,060 USD / año',
        description: 'Créditos U.S. de High School y diploma oficial convalidable ante MEDUCA.'
      }
    },
    dual_diploma: {
      standard: {
        title: 'Doble Titulación Panamá - EE.UU.',
        enrollmentFee: '$180 USD',
        monthlyFee: '$130 USD/mes',
        installments: '10 cuotas',
        totalYear: '$1,480 USD / año',
        description: 'High School Diploma de Florida para estudiantes de colegios en Panamá.'
      }
    }
  },
  US: {
    currency: 'USD',
    symbol: '$',
    off_campus: {
      elementary: {
        title: 'Elementary (K-5 Umbrella Program)',
        enrollmentFee: '$250 USD',
        monthlyFee: '$180 USD/month',
        installments: '10 payments',
        totalYear: '$2,050 USD / year',
        description: 'FLDOE #134620 umbrella registration, official transcripts & Christian curriculum.'
      },
      middle_high: {
        title: 'Middle & High School (6-12)',
        enrollmentFee: '$300 USD',
        monthlyFee: '$220 USD/month',
        installments: '10 payments',
        totalYear: '$2,500 USD / year',
        description: 'Full college-prep U.S. diploma, transcript issuance & counseling.'
      }
    },
    dual_diploma: {
      standard: {
        title: 'Credit Acceleration / Dual Enrollment',
        enrollmentFee: '$200 USD',
        monthlyFee: '$150 USD/month',
        installments: '10 payments',
        totalYear: '$1,700 USD / year',
        description: 'Individual credit recovery, honors courses & mastery learning.'
      }
    }
  },
  GLOBAL: {
    currency: 'USD',
    symbol: '$',
    off_campus: {
      elementary: {
        title: 'International Primary (K-5)',
        enrollmentFee: '$250 USD',
        monthlyFee: '$160 USD/month',
        installments: '10 payments',
        totalYear: '$1,850 USD / year',
        description: 'Global Christian Curriculum, FLDOE #134620 backing and Apostille available.'
      },
      middle_high: {
        title: 'International Secondary (6-12)',
        enrollmentFee: '$290 USD',
        monthlyFee: '$195 USD/month',
        installments: '10 payments',
        totalYear: '$2,240 USD / year',
        description: 'Official U.S. High School Diploma with full international recognition.'
      }
    },
    dual_diploma: {
      standard: {
        title: 'Global Dual Diploma Program',
        enrollmentFee: '$190 USD',
        monthlyFee: '$135 USD/month',
        installments: '10 payments',
        totalYear: '$1,540 USD / year',
        description: 'Simultaneous graduation with local diploma and U.S. High School Diploma.'
      }
    }
  }
};

/**
 * Generador limpio de URL hacia la pasarela del SIS
 */
window.buildSisEnrollmentUrl = function(program, grade, countryCode) {
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
 * Resolver de Dossiers informativos
 */
window.getDossierUrl = function(program, countryCode) {
  var country = (countryCode || window.getCurrentCountry() || 'ES').toLowerCase();
  var prog = (program === 'dual' || program === 'dual_diploma') ? 'dual-diploma' : 'off-campus';
  if (country === 'es') {
    return '/assets/dossiers/dossier-' + prog + '.pdf?v=202609';
  }
  return '/assets/dossiers/dossier-' + prog + '-' + country + '.pdf?v=202609';
};
