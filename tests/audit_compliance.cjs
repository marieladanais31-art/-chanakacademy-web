const fs = require('fs');
const path = require('path');
const assert = require('assert');

const projectRoot = '/Users/marielaandrade/.gemini/antigravity/scratch/chanakacademy-web';
console.log('=== RUNNING COMPREHENSIVE COMPLIANCE & EDITORIAL AUDIT ===\n');

let totalTests = 0;
let passedTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}`);
    console.error(`    ${err.message}\n`);
    process.exitCode = 1;
  }
}

const stateSlugs = ['arizona', 'alabama', 'south-carolina', 'new-hampshire', 'utah', 'wyoming'];

// 1. TWIN SYNCHRONIZATION
runTest('Twin pages are 100% byte-for-byte identical', () => {
  for (const slug of stateSlugs) {
    const rootPath = path.join(projectRoot, slug, 'index.html');
    const twinPath = path.join(projectRoot, 'scholarships', slug, 'index.html');
    const rootContent = fs.readFileSync(rootPath, 'utf8');
    const twinContent = fs.readFileSync(twinPath, 'utf8');
    assert.strictEqual(
      rootContent,
      twinContent,
      `Mismatch between ${slug}/index.html and scholarships/${slug}/index.html!`
    );
  }
});

// 2. PROHIBITED TERMS IN STATE PAGES, SCHOLARSHIPS & MATRICULA
runTest('Zero prohibited terms in all state, scholarship and enrollment pages', () => {
  const auditFiles = [
    'arizona/index.html',
    'alabama/index.html',
    'south-carolina/index.html',
    'new-hampshire/index.html',
    'utah/index.html',
    'wyoming/index.html',
    'scholarships/index.html',
    'scholarships/scholarships.js',
    'matricula/index.html',
    'assets/js/chanak-hubs.js'
  ];

  for (const file of auditFiles) {
    const content = fs.readFileSync(path.join(projectRoot, file), 'utf8');

    // No umbrella school in any state / scholarship / enrollment page
    assert(!/umbrella/i.test(content), `${file}: prohibited term 'umbrella' found!`);

    // No tutoring
    assert(!/\btutoring\b/i.test(content), `${file}: prohibited term 'tutoring' found!`);
    assert(!/\btutoría\b/i.test(content), `${file}: prohibited term 'tutoría' found!`);

    // No diagnost*
    assert(!/diagnost/i.test(content), `${file}: prohibited term 'diagnost*' found!`);

    // No accredited without candidate or explicit disclaimer
    const cleanContent = content
      .replace(/candidate for MSA-CESS accreditation/gi, '')
      .replace(/candidata a(?: la)? acreditación MSA-CESS/gi, '')
      .replace(/MSA-CESS Candidate for Accreditation/gi, '')
      .replace(/candidate for accreditation/gi, '')
      .replace(/candidata a acreditación/gi, '')
      .replace(/It is not an accredited school\./gi, '')
      .replace(/No es una escuela acreditada\./gi, '')
      .replace(/Not an accredited school/gi, '');

    assert(!/\baccredited\b/i.test(cleanContent), `${file}: prohibited 'accredited' found outside permissible candidate context!`);
    assert(!/\bacreditad[ao]s?\b/i.test(cleanContent), `${file}: prohibited 'acreditad*' found outside permissible candidate context!`);
  }
});

// 3. MANDATORY ELIGIBILITY PHRASE
runTest('Mandatory eligibility phrase present in EN and ES across all state pages', () => {
  const phraseEn = 'Each program administrator determines which expenses are eligible.';
  const phraseEs = 'Cada administrador del programa determina qué gastos son elegibles.';

  for (const slug of stateSlugs) {
    const content = fs.readFileSync(path.join(projectRoot, slug, 'index.html'), 'utf8');
    assert(content.includes(phraseEn), `${slug}/index.html missing English mandatory phrase`);
    assert(content.includes(phraseEs), `${slug}/index.html missing Spanish mandatory phrase`);
  }

  const hubHtml = fs.readFileSync(path.join(projectRoot, 'scholarships/index.html'), 'utf8');
  const hubJs = fs.readFileSync(path.join(projectRoot, 'scholarships/scholarships.js'), 'utf8');
  assert(hubHtml.includes(phraseEn), 'scholarships/index.html missing English mandatory phrase');
  assert(hubJs.includes(phraseEn), 'scholarships/scholarships.js missing English mandatory phrase');
  assert(hubJs.includes(phraseEs), 'scholarships/scholarships.js missing Spanish mandatory phrase');

  const homeHtml = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
  assert(homeHtml.includes(phraseEn), 'index.html missing English mandatory phrase in state scholarships section');
});

// 4. EXACT STATE APPROVAL STRINGS
runTest('Exact state approval strings in state landing pages', () => {
  const al = fs.readFileSync(path.join(projectRoot, 'alabama/index.html'), 'utf8');
  assert(
    al.includes('Chanak International Academy is an approved Education Service Provider in CHOOSE Act Alabama.'),
    'Alabama missing approved Education Service Provider statement'
  );

  const sc = fs.readFileSync(path.join(projectRoot, 'south-carolina/index.html'), 'utf8');
  assert(
    sc.includes('Chanak International Academy is an approved provider for the South Carolina Education Scholarship Trust Fund.'),
    'South Carolina missing approved provider statement'
  );

  const nh = fs.readFileSync(path.join(projectRoot, 'new-hampshire/index.html'), 'utf8');
  assert(
    nh.includes('Chanak International Academy is an approved provider for New Hampshire Education Freedom Accounts.'),
    'New Hampshire missing approved provider statement'
  );

  const az = fs.readFileSync(path.join(projectRoot, 'arizona/index.html'), 'utf8');
  assert(
    az.includes('Chanak TrainUp Education Inc. is an approved vendor for the Arizona ESA program.'),
    'Arizona missing approved vendor statement'
  );

  const ut = fs.readFileSync(path.join(projectRoot, 'utah/index.html'), 'utf8');
  assert(ut.includes('Odyssey Marketplace') || ut.includes('Utah Fits All'), 'Utah missing Odyssey / UFA info');

  const wy = fs.readFileSync(path.join(projectRoot, 'wyoming/index.html'), 'utf8');
  assert(wy.includes('Odyssey Marketplace') || wy.includes('Wyoming ESA'), 'Wyoming missing Odyssey / WY ESA info');
});

// 5. ARIZONA FULL-TIME ONLINE SCHOOL EXCLUSIVELY
runTest('Arizona Full-Time Online School presented exclusively with quarterly pricing', () => {
  const az = fs.readFileSync(path.join(projectRoot, 'arizona/index.html'), 'utf8');
  assert(az.includes('Tuition and Fees'), 'Arizona must specify ClassWallet category "Tuition and Fees"');
  assert(az.includes('Full-Time Online K–12 Tuition &amp; Academic Support') || az.includes('Full-Time Online K–12 Tuition & Academic Support'), 'Arizona missing Full-Time program title');
  // Quarterly prices as primary
  assert(az.includes('$1,125'), 'Arizona missing $1,125 elementary quarterly installment');
  assert(az.includes('$1,237.50'), 'Arizona missing $1,237.50 middle quarterly installment');
  assert(az.includes('$1,350'), 'Arizona missing $1,350 high quarterly installment');
  // Annual reference
  assert(az.includes('$4,500'), 'Arizona missing $4,500 elementary annual fee reference');
  assert(az.includes('$4,950'), 'Arizona missing $4,950 middle annual fee reference');
  assert(az.includes('$5,400'), 'Arizona missing $5,400 high annual fee reference');
  // Registration fee
  assert(az.includes('$295'), 'Arizona missing $295 registration fee');
  // Zero support packages of $275 / $320 / $365 in Arizona
  assert(!az.includes('$275'), 'Arizona must NOT contain $275 support rate');
  assert(!az.includes('$320'), 'Arizona must NOT contain $320 support rate');
  assert(!az.includes('$365'), 'Arizona must NOT contain $365 support rate');
  assert(!az.includes('from $275/mo'), 'Arizona must NOT contain "from $275/mo"');
  // Exact start policy
  assert(az.includes('Services begin after payment has been received and reconciled in Chanak’s bank account and the schedule has been confirmed with the family.'), 'Arizona missing exact English start policy');
  assert(az.includes('Los servicios comienzan una vez recibido y conciliado el pago en la cuenta bancaria de Chanak y confirmado el horario con la familia.'), 'Arizona missing exact Spanish start policy');
});

// 6. CLASSWALLET STATES TOGGLE (AL, SC, NH)
runTest('ClassWallet states have functional Monthly / Quarterly toggle', () => {
  for (const slug of ['alabama', 'south-carolina', 'new-hampshire']) {
    const content = fs.readFileSync(path.join(projectRoot, slug, 'index.html'), 'utf8');
    assert(content.includes('setSupportFrequency'), `${slug} missing setSupportFrequency function`);
    assert(content.includes('billing-toggle'), `${slug} missing billing-toggle DOM element`);
    assert(content.includes('$275') && content.includes('$825'), `${slug} missing $275/$825 rates`);
    assert(content.includes('$320') && content.includes('$960'), `${slug} missing $320/$960 rates`);
    assert(content.includes('$365') && content.includes('$1,095'), `${slug} missing $365/$1,095 rates`);
  }
});

// 7. UTAH & WYOMING ODYSSEY 11 OFFERINGS & $295 SETUP
runTest('Utah & Wyoming retain 11 Odyssey offerings and $295 setup fee', () => {
  for (const slug of ['utah', 'wyoming']) {
    const content = fs.readFileSync(path.join(projectRoot, slug, 'index.html'), 'utf8');
    assert(
      content.includes('Annual Registration, Educational Assessment &amp; ILP Setup: $295, billed separately.') ||
      content.includes('Annual Registration, Educational Assessment & ILP Setup: $295, billed separately.'),
      `${slug} missing standardized $295 setup fee text`
    );
    assert(/Inscripción anual, evaluación educativa inicial y plan ILP: \$295, facturado por separado\./i.test(content), `${slug} missing Spanish setup text`);
    assert(content.includes('ABC Reading'), `${slug} missing ABC Reading course`);
    assert(content.includes('spanish-live') || content.includes('Clases en Vivo de Español'), `${slug} missing Spanish Live course`);
    assert(content.includes('english-live') || content.includes('Clases en Vivo de Inglés'), `${slug} missing English Live course`);
  }
});

// 8. FORMS ROUTING TO ENVIAR-FORMULARIO.PHP & OFFCAMPUS@CHANAKACADEMY.ORG
runTest('Forms route to /enviar-formulario.php and target offcampus@chanakacademy.org', () => {
  const formScript = fs.readFileSync(path.join(projectRoot, 'enviar-formulario.php'), 'utf8');
  assert(
    formScript.includes('offcampus@chanakacademy.org'),
    'enviar-formulario.php must route to offcampus@chanakacademy.org'
  );

  const matHtml = fs.readFileSync(path.join(projectRoot, 'matricula/index.html'), 'utf8');
  assert(matHtml.includes("fetch('/enviar-formulario.php'"), 'matricula/index.html must post to /enviar-formulario.php');

  for (const slug of stateSlugs) {
    const content = fs.readFileSync(path.join(projectRoot, slug, 'index.html'), 'utf8');
    assert(content.includes("fetch('/enviar-formulario.php'"), `${slug}/index.html must post to /enviar-formulario.php`);
  }
});

// 9. I18N DICTIONARY KEY PARITY IN ALL STATE PAGES
runTest('100% i18n dictionary key parity across all state pages and scholarships hub', () => {
  // Test state pages
  for (const slug of stateSlugs) {
    const content = fs.readFileSync(path.join(projectRoot, slug, 'index.html'), 'utf8');
    const match = content.match(/const i18nData = (\{[\s\S]*?\n\s*\});/);
    assert(match, `${slug}/index.html missing const i18nData`);

    const fn = new Function('return ' + match[1]);
    const i18n = fn();

    assert(i18n.en && i18n.es, `${slug} must have en and es dictionaries`);
    const enKeys = Object.keys(i18n.en).sort();
    const esKeys = Object.keys(i18n.es).sort();
    assert.strictEqual(
      enKeys.length,
      esKeys.length,
      `${slug}: key count mismatch! EN has ${enKeys.length}, ES has ${esKeys.length}`
    );

    const missingInEs = enKeys.filter(k => !esKeys.includes(k));
    const missingInEn = esKeys.filter(k => !enKeys.includes(k));
    assert.deepStrictEqual(missingInEs, [], `${slug}: Keys in EN but missing in ES`);
    assert.deepStrictEqual(missingInEn, [], `${slug}: Keys in ES but missing in EN`);
  }

  // Test scholarships.js
  const jsContent = fs.readFileSync(path.join(projectRoot, 'scholarships/scholarships.js'), 'utf8');
  const match = jsContent.match(/var I18N = (\{[\s\S]*?\n  \});/);
  assert(match, 'scholarships.js missing var I18N');

  const i18nHub = new Function('return ' + match[1])();
  assert(i18nHub.en && i18nHub.es, 'scholarships.js must have en and es');
  const enKeys = Object.keys(i18nHub.en).sort();
  const esKeys = Object.keys(i18nHub.es).sort();
  assert.strictEqual(enKeys.length, esKeys.length, 'scholarships.js key count mismatch');
  const missingInEs = enKeys.filter(k => !esKeys.includes(k));
  const missingInEn = esKeys.filter(k => !enKeys.includes(k));
  assert.deepStrictEqual(missingInEs, [], 'scholarships.js: Keys in EN but missing in ES');
  assert.deepStrictEqual(missingInEn, [], 'scholarships.js: Keys in ES but missing in EN');
});

// 10. HOMEPAGE CHECKS
runTest('Homepage (index.html) state scholarships section updated correctly', () => {
  const home = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
  assert(home.includes('Elementary (Grades 1–5): <strong>$275 USD / mo</strong>'), 'index.html missing Grades 1–5 in state block');
  assert(
    home.includes('Annual Registration, Educational Assessment &amp; ILP Setup: <strong>$295 USD</strong> (billed separately)'),
    'index.html missing updated setup fee in state block'
  );
  assert(home.includes('/arizona/#tuition'), 'index.html missing link to Arizona Full-Time school');
  assert(
    home.includes('Each program administrator determines which expenses are eligible.'),
    'index.html missing mandatory phrase in state notice'
  );
});

console.log(`\n========================================`);
console.log(`COMPLIANCE AUDIT COMPLETE: ${passedTests}/${totalTests} TESTS PASSED`);
console.log(`========================================\n`);

if (passedTests !== totalTests) {
  process.exit(1);
}
