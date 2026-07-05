// Configuración central de enlaces y campañas de chanakacademy.org
// Editar aquí en lugar de tocar cada página.
window.CHANAK_CONFIG = Object.freeze({
  whatsappNumber: "+34 624 70 32 72",
  whatsappLink: "https://wa.me/34624703272?text=Hola,%20quiero%20informaci%C3%B3n%20sobre%20la%20matr%C3%ADcula%202026-27",
  instagramUrl: "https://www.instagram.com/chanakinternationalacademy/",
  facebookUrl: "https://www.facebook.com/profile.php?id=61585911365975",
  portalUrl: "https://portal.chanakacademy.org",
  // Matrícula oficial: página propia con formulario multi-paso.
  // Envía a /enviar-formulario.php (email + leads.csv + lista Brevo del programa). Sin Zapier.
  matriculaUrl: "/matricula/",
  // Enlaces de pago Stripe (fuente única de verdad — editar aquí).
  stripe: {
    offCampus: "https://buy.stripe.com/aFa7sMgjLcBvfvW2NQ67S0c",              // pago matrícula Off-Campus
    dualDiploma: "https://buy.stripe.com/28E3cw6Jb0SN1F6dsu67S0d",            // pago matrícula Dual Diploma
    evaluacionDiagnostica: "https://buy.stripe.com/6oU00k5F79pj1F660267S03",  // evaluación diagnóstica 50€ (ES)
    diagnosticoDualDiploma: "https://buy.stripe.com/eVq28sffHfNHgA0coq67S0g"  // evaluación diagnóstica Dual Diploma 35€
  },
  sisUrl: "https://sis.chanakacademy.org",
  foundationUrl: "https://foundation.chanakacademy.org",
  // Fases del banner de matrícula (cambio automático por fecha, hora local del visitante)
  banner: {
    earlyUntil: "2026-07-31", // hasta esta fecha inclusive: matrícula anticipada
    lateUntil: "2026-09-04"   // hasta esta fecha inclusive: últimas plazas
  }
});
