/**
 * Chanak International Academy · SIS State Hubs & Academic Registry Architecture
 * Defines the 7 Administrative State Hubs (FL, AL, AZ, UT, WY, NH, SC),
 * Authorized Services, Rate Schedules, Folio Generator, and Private Division Isolation.
 */
(function(window) {
  'use strict';

  var HUBS_DATA = [
    {
      id: "FL-STEPUP-EMA",
      code: "FL",
      slug: "florida",
      state_name_es: "Florida",
      state_name_en: "Florida",
      program_name_es: "Florida PEP / Step Up for Students",
      program_name_en: "Florida PEP / Step Up for Students",
      platform: "EMA Marketplace",
      url: "/florida-home-education/",
      rates: { k5: 275, g68: 320, g912: 365, setup: 295, lifeskills: 120 },
      services: [
        { id: "support", name_es: "Home Education Instructional Program (K-5: 20172869 · 6-8: 20169280 · 9-12: 20172870)", name_en: "Home Education Instructional Program (K-5: 20172869 · 6-8: 20169280 · 9-12: 20172870)", base_rate: 275 },
        { id: "assessment", name_es: "Cuota anual adicional ($295 · En revisión en EMA · Item: 20174498)", name_en: "Additional annual fee ($295 · In Review in EMA · Item: 20174498)", base_rate: 295 },
        { id: "lifeskills", name_es: "Clases de Life Skills y Liderazgo ($120/mes)", name_en: "Standalone Life Skills & Leadership ($120/mo)", base_rate: 120 }
      ],
      billing_status: "approved_provider_authorized_service_billing_enabled",
      cohort_max: 7
    },
    {
      id: "AL-CHOOSE-CW",
      code: "AL",
      slug: "alabama",
      state_name_es: "Alabama",
      state_name_en: "Alabama",
      program_name_es: "Alabama CHOOSE Act",
      program_name_en: "Alabama CHOOSE Act",
      platform: "ClassWallet (Pay Vendor)",
      url: "/alabama/",
      rates: { k5: 275, g68: 320, g912: 365, setup: 295, lifeskills: 120 },
      services: [
        { id: "support", name_es: "Acompañamiento Virtual Mensual (K-5 / 6-8 / 9-12)", name_en: "Virtual Guided Support (Monthly Mentoring + Life Skills)", base_rate: 275 },
        { id: "assessment", name_es: "Inscripción Anual, Evaluación Inicial y Plan ILP ($295)", name_en: "Annual Registration, Educational Assessment & ILP Setup ($295)", base_rate: 295 },
        { id: "lifeskills", name_es: "Clases de Life Skills y Liderazgo ($120/mes)", name_en: "Standalone Life Skills & Leadership ($120/mo)", base_rate: 120 }
      ],
      billing_status: "approved_provider_authorized_service_billing_enabled",
      cohort_max: 7
    },
    {
      id: "AZ-ESA-CW",
      code: "AZ",
      slug: "arizona",
      state_name_es: "Arizona",
      state_name_en: "Arizona",
      program_name_es: "Arizona ESA",
      program_name_en: "Arizona ESA",
      platform: "ClassWallet (Pay Vendor · Tuition & Fees)",
      url: "/arizona/",
      rates: { setup: 295, ft_15: 4500, ft_68: 4950, ft_912: 5400, qtr_15: 1125, qtr_68: 1237.5, qtr_912: 1350 },
      services: [
        { id: "ft-15", name_es: "Escuela Online Full-Time – Primaria (Grados 1–5 · $1,125/trim · Anual $4,500)", name_en: "Full-Time Online School – Elementary (Grades 1–5 · $1,125/qtr · Annual $4,500)", base_rate: 1125, annual_rate: 4500 },
        { id: "ft-68", name_es: "Escuela Online Full-Time – Secundaria (Grados 6–8 · $1,237.50/trim · Anual $4,950)", name_en: "Full-Time Online School – Middle School (Grades 6–8 · $1,237.50/qtr · Annual $4,950)", base_rate: 1237.5, annual_rate: 4950 },
        { id: "ft-912", name_es: "Escuela Online Full-Time – Preparatoria (Grados 9–12 · $1,350/trim · Anual $5,400)", name_en: "Full-Time Online School – High School (Grades 9–12 · $1,350/qtr · Annual $5,400)", base_rate: 1350, annual_rate: 5400 }
      ],
      billing_status: "approved_provider_authorized_service_billing_enabled",
      cohort_max: 7
    },
    {
      id: "UT-UFA-ODY",
      code: "UT",
      slug: "utah",
      state_name_es: "Utah",
      state_name_en: "Utah",
      program_name_es: "Utah Fits All",
      program_name_en: "Utah Fits All",
      platform: "Odyssey Marketplace",
      url: "/utah/",
      rates: { k5: 275, g68: 320, g912: 365, setup: 295, lifeskills: 120 },
      services: [
        { id: "support", name_es: "Acompañamiento Virtual Mensual (K-5 / 6-8 / 9-12)", name_en: "Virtual Guided Support (Monthly Mentoring + Life Skills)", base_rate: 275 },
        { id: "assessment", name_es: "Inscripción Anual, Evaluación Inicial y Plan ILP ($295)", name_en: "Annual Registration, Educational Assessment & ILP Setup ($295)", base_rate: 295 },
        { id: "lifeskills", name_es: "Clases de Life Skills y Liderazgo ($120/mes)", name_en: "Standalone Life Skills & Leadership ($120/mo)", base_rate: 120 }
      ],
      billing_status: "approved_provider_authorized_service_billing_enabled",
      cohort_max: 7
    },
    {
      id: "WY-ESA-ODY",
      code: "WY",
      slug: "wyoming",
      state_name_es: "Wyoming",
      state_name_en: "Wyoming",
      program_name_es: "Wyoming ESA",
      program_name_en: "Wyoming ESA",
      platform: "Odyssey Marketplace",
      url: "/wyoming/",
      rates: { k5: 275, g68: 320, g912: 365, setup: 295, lifeskills: 120 },
      services: [
        { id: "support", name_es: "Acompañamiento Virtual Mensual (K-5 / 6-8 / 9-12)", name_en: "Virtual Guided Support (Monthly Mentoring + Life Skills)", base_rate: 275 },
        { id: "assessment", name_es: "Inscripción Anual, Evaluación Inicial y Plan ILP ($295)", name_en: "Annual Registration, Educational Assessment & ILP Setup ($295)", base_rate: 295 },
        { id: "lifeskills", name_es: "Clases de Life Skills y Liderazgo ($120/mes)", name_en: "Standalone Life Skills & Leadership ($120/mo)", base_rate: 120 }
      ],
      billing_status: "approved_provider_authorized_service_billing_enabled",
      cohort_max: 7
    },
    {
      id: "NH-EFA-CW",
      code: "NH",
      slug: "new-hampshire",
      state_name_es: "New Hampshire",
      state_name_en: "New Hampshire",
      program_name_es: "New Hampshire EFA (CSF NH)",
      program_name_en: "New Hampshire EFA (CSF NH)",
      platform: "ClassWallet (Pay Vendor)",
      url: "/new-hampshire/",
      rates: { k5: 275, g68: 320, g912: 365, setup: 295, lifeskills: 120 },
      services: [
        { id: "support", name_es: "Acompañamiento Virtual Mensual (K-5 / 6-8 / 9-12)", name_en: "Virtual Guided Support (Monthly Mentoring + Life Skills)", base_rate: 275 },
        { id: "assessment", name_es: "Inscripción Anual, Evaluación Inicial y Plan ILP ($295)", name_en: "Annual Registration, Educational Assessment & ILP Setup ($295)", base_rate: 295 },
        { id: "lifeskills", name_es: "Clases de Life Skills y Liderazgo ($120/mes)", name_en: "Standalone Life Skills & Leadership ($120/mo)", base_rate: 120 }
      ],
      billing_status: "approved_provider_authorized_service_billing_enabled",
      cohort_max: 7
    },
    {
      id: "SC-ESTF-CW",
      code: "SC",
      slug: "south-carolina",
      state_name_es: "South Carolina",
      state_name_en: "South Carolina",
      program_name_es: "South Carolina ESTF",
      program_name_en: "South Carolina ESTF",
      platform: "ClassWallet (Pay Vendor)",
      url: "/south-carolina/",
      rates: { k5: 275, g68: 320, g912: 365, setup: 295, lifeskills: 120 },
      services: [
        { id: "support", name_es: "Acompañamiento Virtual Mensual (K-5 / 6-8 / 9-12)", name_en: "Virtual Guided Support (Monthly Mentoring + Life Skills)", base_rate: 275 },
        { id: "assessment", name_es: "Inscripción Anual, Evaluación Inicial y Plan ILP ($295)", name_en: "Annual Registration, Educational Assessment & ILP Setup ($295)", base_rate: 295 },
        { id: "lifeskills", name_es: "Clases de Life Skills y Liderazgo ($120/mes)", name_en: "Standalone Life Skills & Leadership ($120/mo)", base_rate: 120 }
      ],
      billing_status: "approved_provider_authorized_service_billing_enabled",
      cohort_max: 7
    }
  ];

  var PRIVATE_PROGRAMS = [
    {
      id: "PROG-OFFCAMPUS",
      code: "OC",
      name_es: "Off-Campus K–12 (Colegio Americano Completo)",
      name_en: "Off-Campus K–12 (Full U.S. Private Schooling)",
      division: "private_academic",
      diploma: true,
      esa_eligible: false,
      billing: "private_pay"
    },
    {
      id: "PROG-DUAL-DIPLOMA",
      code: "DD",
      name_es: "Programa Internacional Dual Diploma (High School)",
      name_en: "International Dual Diploma (High School)",
      division: "private_academic",
      diploma: true,
      esa_eligible: false,
      billing: "private_pay"
    }
  ];

  var ChanakHubs = {
    hubs: HUBS_DATA,
    private_programs: PRIVATE_PROGRAMS,

    getHubById: function(hubId) {
      if (!hubId) return null;
      var clean = String(hubId).trim().toUpperCase();
      for (var i = 0; i < HUBS_DATA.length; i++) {
        if (HUBS_DATA[i].id.toUpperCase() === clean) return HUBS_DATA[i];
      }
      return null;
    },

    getHubByState: function(stateIdentifier) {
      if (!stateIdentifier) return null;
      var clean = String(stateIdentifier).trim().toLowerCase();
      for (var i = 0; i < HUBS_DATA.length; i++) {
        var h = HUBS_DATA[i];
        if (h.slug === clean || h.code.toLowerCase() === clean || h.state_name_es.toLowerCase() === clean || h.state_name_en.toLowerCase() === clean) {
          return h;
        }
      }
      return null;
    },

    isEsaEligible: function(programId) {
      if (!programId) return false;
      var p = String(programId).toUpperCase();
      if (p.indexOf("DUAL") !== -1 || p.indexOf("OFFCAMPUS") !== -1 || p === "PROG-DUAL-DIPLOMA") {
        return false;
      }
      return true;
    },

    generateFolio: function(hubId, year, sequenceNumber) {
      var y = year || (new Date()).getFullYear();
      var seq = sequenceNumber || Math.floor(1000 + Math.random() * 9000);
      var prefix = "OC";
      if (hubId) {
        var clean = String(hubId).toUpperCase();
        if (clean.indexOf("FL") !== -1) prefix = "FL";
        else if (clean.indexOf("AL") !== -1) prefix = "AL";
        else if (clean.indexOf("AZ") !== -1) prefix = "AZ";
        else if (clean.indexOf("UT") !== -1) prefix = "UT";
        else if (clean.indexOf("WY") !== -1) prefix = "WY";
        else if (clean.indexOf("NH") !== -1) prefix = "NH";
        else if (clean.indexOf("SC") !== -1) prefix = "SC";
        else if (clean.indexOf("DD") !== -1 || clean.indexOf("DUAL") !== -1) prefix = "DD";
      }
      return "CHK-" + prefix + "-" + y + "-" + ("0000" + seq).slice(-4);
    },

    calculatePricing: function(hubId, serviceType, gradeBand, includeSetup) {
      var hub = this.getHubById(hubId);
      var monthly = 0;
      var setupFee = includeSetup ? 295 : 0;
      var rates = hub ? hub.rates : { k5: 275, g68: 320, g912: 365, setup: 295, lifeskills: 120 };

      if (serviceType === 'lifeskills') {
        monthly = rates.lifeskills;
      } else if (serviceType === 'assessment') {
        monthly = 0;
        setupFee = 295;
      } else {
        // default guided support
        if (gradeBand === 'k5') monthly = rates.k5;
        else if (gradeBand === '68') monthly = rates.g68;
        else if (gradeBand === '912') monthly = rates.g912;
        else monthly = rates.k5;
      }

      return {
        monthlyRate: monthly,
        setupFee: setupFee,
        totalInitial: monthly + setupFee,
        currency: "USD"
      };
    }
  };

  window.CHANAK_HUBS = ChanakHubs;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChanakHubs;
  }
})(typeof window !== 'undefined' ? window : this);
