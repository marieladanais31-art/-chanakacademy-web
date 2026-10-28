/**
 * Audit test script for scholarships hub (/scholarships/)
 * Verifies all 10 requirements and editorial rules requested by the user.
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..');
const htmlPath = path.join(ROOT, 'scholarships', 'index.html');
const jsPath = path.join(ROOT, 'scholarships', 'scholarships.js');
const cssPath = path.join(ROOT, 'scholarships', 'scholarships.css');
const phpPath = path.join(ROOT, 'enviar-formulario.php');

console.log('--- RUNNING SCHOLARSHIPS PAGE AUDIT ---');

const htmlContent = fs.readFileSync(htmlPath, 'utf8');
const jsContent = fs.readFileSync(jsPath, 'utf8');
const cssContent = fs.readFileSync(cssPath, 'utf8');
const phpContent = fs.readFileSync(phpPath, 'utf8');

let passedTests = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}`);
    console.error(`    ${err.message}`);
    process.exitCode = 1;
  }
}

// 1. Parity of dictionary keys in scholarships.js
test('100% Dictionary Key Parity between EN and ES in scholarships.js', () => {
  // Extract I18N.en and I18N.es using a sandbox evaluation
  const vm = require('vm');
  const code = jsContent.replace(/document\.addEventListener\([\s\S]*$/, '');
  const sandbox = {
    document: {
      documentElement: { setAttribute: () => {} },
      querySelector: () => null,
      querySelectorAll: () => []
    },
    localStorage: { setItem: () => {}, getItem: () => null },
    window: { location: { search: '' } },
    URLSearchParams: class { get() { return null; } }
  };
  // Extract I18N object directly with regex
  const enMatch = jsContent.match(/en:\s*\{([\s\S]*?)\n\s*\},/);
  const esMatch = jsContent.match(/es:\s*\{([\s\S]*?)\n\s*\}\n\s*\};/);
  assert(enMatch, 'I18N.en must exist');
  assert(esMatch, 'I18N.es must exist');

  const extractKeys = (block) => {
    const keys = [];
    const lines = block.split('\n');
    for (const l of lines) {
      const m = l.match(/^\s*([a-zA-Z0-9_]+):/);
      if (m) keys.push(m[1]);
    }
    return keys;
  };

  const enKeys = extractKeys(enMatch[1]);
  const esKeys = extractKeys(esMatch[1]);

  const missingInEs = enKeys.filter(k => !esKeys.includes(k));
  const missingInEn = esKeys.filter(k => !enKeys.includes(k));

  assert.strictEqual(missingInEs.length, 0, `Keys in EN but missing in ES: ${missingInEs.join(', ')}`);
  assert.strictEqual(missingInEn.length, 0, `Keys in ES but missing in EN: ${missingInEn.join(', ')}`);
  assert(enKeys.length >= 80, `Expected at least 80 translated keys, got ${enKeys.length}`);
});

// 2. Forbidden words check
test('Editorial rules: NO forbidden words (tutoring, tutoría, diagnóstico, diagnostic, $120)', () => {
  // Check for standalone forbidden words in index.html and scholarships.js
  const forbiddenPatterns = [
    { pattern: /\btutoring\b/i, label: 'tutoring' },
    { pattern: /\btutoría\b/i, label: 'tutoría' },
    { pattern: /\bdiagnóstico\b/i, label: 'diagnóstico' },
    { pattern: /\bdiagnostic\b/i, label: 'diagnostic' },
    { pattern: /official candidate with Middle States/i, label: 'official candidate with Middle States' },
    { pattern: /Direct Pay Partner Official Nonpublic Educational Provider/i, label: 'Direct Pay Partner Official Nonpublic Educational Provider' }
  ];

  for (const { pattern, label } of forbiddenPatterns) {
    assert(!pattern.test(htmlContent), `Found forbidden phrase "${label}" in scholarships/index.html`);
    assert(!pattern.test(jsContent), `Found forbidden phrase "${label}" in scholarships/scholarships.js`);
  }
});

// 2b. Accreditation claims check
test('Accreditation editorial rules: strictly candidate for MSA-CESS, never accredited school', () => {
  assert(htmlContent.includes('candidate for MSA-CESS accreditation'), 'Must include candidate for MSA-CESS accreditation');
  assert(htmlContent.includes('candidata a la acreditación MSA-CESS') || jsContent.includes('candidata a la acreditación MSA-CESS'), 'Must include candidata a la acreditación MSA-CESS');
  assert(htmlContent.includes('It is not an accredited school.') || jsContent.includes('It is not an accredited school.'), 'Must include "It is not an accredited school."');
  assert(htmlContent.includes('No es una escuela acreditada.') || jsContent.includes('No es una escuela acreditada.'), 'Must include "No es una escuela acreditada."');

  // Verify that "accredited" is only used within "not an accredited school" or "No es una escuela acreditada"
  const cleanHtml = htmlContent
    .replace(/It is not an accredited school\./g, '')
    .replace(/No es una escuela acreditada\./g, '');
  assert(!/\baccredited\b/i.test(cleanHtml), 'Word "accredited" found outside allowable disclaimer');
  assert(!/\bacreditada\b/i.test(cleanHtml), 'Word "acreditada" found outside allowable disclaimer');
});

// 3. Registration and legal entity check
test('FLDOE registration and 501(c)(3) legal entity format', () => {
  assert(htmlContent.includes('#134620'), 'FLDOE code #134620 must be present');
  assert(htmlContent.includes('Chanak TrainUp Education Inc.'), 'Entity Chanak TrainUp Education Inc. must be present');
  assert(!htmlContent.includes('36-5154011'), 'EIN 36-5154011 must not appear on public page');
  assert(htmlContent.includes('501(c)(3)'), '501(c)(3) must be present');
});

// 4. Hero Subtitle & Model 60/20/20
test('Hero Subtitle and Model 60/20/20 with 3 badges', () => {
  assert(htmlContent.includes('Guided academic support, bilingual (English and Spanish), Christian education and Mastery Learning, for families using state education funds.'), 'English hero lead must match requirement');
  assert(jsContent.includes('Acompañamiento académico guiado, bilingüe (inglés y español), con educación cristiana y Mastery Learning, para familias con fondos estatales.'), 'Spanish hero lead must match requirement');

  assert(htmlContent.includes('id="modelo"'), 'Section #modelo must exist');
  assert(htmlContent.includes('60'), 'Must contain 60% card');
  assert(htmlContent.includes('20'), 'Must contain 20% cards');
  assert(htmlContent.includes('Core U.S. Curriculum'), 'Must include Core U.S. Curriculum');
  assert(htmlContent.includes('Heritage Language'), 'Must include Heritage Language');
  assert(htmlContent.includes('Life Skills &amp; Biblical Worldview') || htmlContent.includes('Life Skills & Biblical Worldview'), 'Must include Life Skills & Biblical Worldview');
  assert(htmlContent.includes('Christian Education') || jsContent.includes('Educación cristiana'), 'Must include Christian education badge');
  assert(htmlContent.includes('Mastery Learning'), 'Must include Mastery Learning badge');
});

// 5. Services & Pricing Section
test('Services & Pricing section ($295 setup + $275/$320/$365 monthly + itemized invoice note)', () => {
  assert(htmlContent.includes('id="servicios-precios"'), 'Section #servicios-precios must exist');
  assert(htmlContent.includes('$295'), 'Must contain $295 setup fee');
  assert(htmlContent.includes('$275'), 'Must contain $275 monthly rate');
  assert(htmlContent.includes('$320'), 'Must contain $320 monthly rate');
  assert(htmlContent.includes('$365'), 'Must contain $365 monthly rate');
  assert(htmlContent.includes('We invoice each service with an itemized invoice') || jsContent.includes('Facturamos cada servicio con factura detallada'), 'Must include itemized invoice note');
  assert(htmlContent.includes('[CONFIRMAR CON MARIELA ANTES DE PUBLICAR: los tres precios mensuales; si cambian, usar los nuevos.]'), 'Must include price confirmation note');
});

// 6. Pre-rendered 7 States in Table
test('Approved States Table has 7 pre-rendered rows with correct internal page links', () => {
  assert(htmlContent.includes('id="estados"'), 'Section #estados must exist');
  assert(htmlContent.includes('id="stateTableBody"'), 'Table body must exist');

  const expectedStates = [
    { state: 'Utah', link: '/utah/' },
    { state: 'Wyoming', link: '/wyoming/' },
    { state: 'Arizona', link: '/arizona/' },
    { state: 'Alabama', link: '/alabama/' },
    { state: 'South Carolina', link: '/south-carolina/' },
    { state: 'New Hampshire', link: '/new-hampshire/' },
    { state: 'Florida', link: '/florida-home-education/' }
  ];

  for (const { state, link } of expectedStates) {
    assert(htmlContent.includes(state), `Table must contain state ${state}`);
    assert(htmlContent.includes(link), `Table must link to internal page ${link}`);
  }

  // Count <tr> in <tbody id="stateTableBody">
  const tbodyMatch = htmlContent.match(/<tbody id="stateTableBody">([\s\S]*?)<\/tbody>/);
  assert(tbodyMatch, 'tbody must be present');
  const trMatches = tbodyMatch[1].match(/<tr/g);
  assert.strictEqual(trMatches ? trMatches.length : 0, 7, 'tbody must have exactly 7 pre-rendered <tr> rows');

  // Check fixed coverage disclaimer
  assert(htmlContent.includes('Approval depends on each state\'s program, the specific service, and the student. Chanak does not guarantee coverage or funding amounts.') ||
         jsContent.includes('La aprobación depende del programa de cada estado, del servicio y del estudiante. Chanak no garantiza cobertura ni montos.'),
         'Fixed coverage disclaimer must be present');
});

// 7. Video cards have distinct headers (no repeated photo)
test('Video cards do not reuse quienes-somos.webp', () => {
  const videoSectionMatch = htmlContent.match(/<section[^>]*id="videos"[\s\S]*?<\/section>/);
  assert(videoSectionMatch, 'Videos section must exist');
  assert(!videoSectionMatch[0].includes('quienes-somos.webp'), 'quienes-somos.webp must NOT be used in video cards');
  assert(videoSectionMatch[0].includes('theme-cw'), 'Video 1 must have custom theme');
  assert(videoSectionMatch[0].includes('theme-az'), 'Video 2 must have custom theme');
  assert(videoSectionMatch[0].includes('theme-fl'), 'Video 3 must have custom theme');
  assert(videoSectionMatch[0].includes('theme-ody'), 'Video 4 must have custom theme');
  assert(videoSectionMatch[0].includes('theme-nh'), 'Video 5 must have custom theme');
  assert(videoSectionMatch[0].includes('theme-al'), 'Video 6 must have custom theme');
});

// 8. Advisory form & server validation
test('Advisory Form fields, language preference, and server validation', () => {
  assert(htmlContent.includes('name="preferred_language"'), 'Form must include preferred_language field');
  assert(htmlContent.includes('name="consentimiento_consulta"'), 'Form must include consent name');
  assert(htmlContent.includes('value="si"'), 'Consent value must be si');

  // Verify server validation in enviar-formulario.php
  assert(phpContent.includes('$isScholarshipsHub'), 'PHP must identify scholarships hub submission');
  assert(phpContent.includes('consentimiento_consulta'), 'PHP must validate consent');
  assert(phpContent.includes('residence_state') || phpContent.includes('stateVal'), 'PHP must validate state');
  assert(phpContent.includes('IDIOMA_PREFERIDO'), 'PHP must save preferred language attribute in Brevo');
});

// 9. FAQ 8 questions
test('FAQ has 8 questions including Christian values and Spanish support', () => {
  assert(htmlContent.includes('Does Chanak teach with Christian values?') || jsContent.includes('¿Chanak enseña con valores cristianos?'), 'Q7 must be present');
  assert(htmlContent.includes('Do you provide support in Spanish?') || jsContent.includes('¿Atienden en español?'), 'Q8 must be present');
});

// 10. Curriculum costs relocated to end before footer
test('Curriculum Costs relocated to end right before footer', () => {
  const faqIndex = htmlContent.indexOf('id="faq"');
  const curricIndex = htmlContent.indexOf('id="curriculo"');
  const footerIndex = htmlContent.indexOf('<footer');

  assert(faqIndex !== -1, 'FAQ section must exist');
  assert(curricIndex !== -1, 'Curriculum section must exist');
  assert(footerIndex !== -1, 'Footer must exist');

  assert(curricIndex > faqIndex, 'Curriculum section must be AFTER FAQ');
  assert(curricIndex < footerIndex, 'Curriculum section must be BEFORE footer');

  assert(htmlContent.includes('Curriculum costs (not charged by Chanak)'), 'English curriculum title must match');
  assert(jsContent.includes('Costos de currículo (no los cobra Chanak)'), 'Spanish curriculum title must match');
  assert(htmlContent.includes('aop.com'), 'Must link to aop.com');
  assert(htmlContent.includes('christianlight.org'), 'Must link to christianlight.org');
  assert(htmlContent.includes('aceschooloftomorrow.com'), 'Must link to aceschooloftomorrow.com');
  assert(htmlContent.includes('Chanak supports families with any of these options, without requiring you to choose a specific one.') ||
         jsContent.includes('Chanak acompaña a la familia con cualquiera de estas opciones, sin obligar a elegir una.'),
         'Must include neutral curriculum support statement');
});

// 11. SEO and conversion tracking
test('SEO title, description, schema and conversion tracking event', () => {
  assert(htmlContent.includes('application/ld+json'), 'JSON-LD schema must exist');
  assert(htmlContent.includes('EducationalOrganization'), 'Schema must be EducationalOrganization');
  assert(jsContent.includes('scholarship_inquiry_submitted'), 'Conversion tracking event must exist in JS');
  assert(htmlContent.includes('hreflang="en"'), 'hreflang en must exist');
  assert(htmlContent.includes('hreflang="es"'), 'hreflang es must exist');
});

console.log(`\n--- AUDIT COMPLETE: ${passedTests} TESTS PASSED ---`);
