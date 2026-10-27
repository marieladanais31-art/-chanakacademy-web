/**
 * tests/florida_ema_audit.cjs
 * Comprehensive Automated Audit for Florida EMA Presentation Compliance
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..');

let totalChecks = 0;
let passedChecks = 0;

function check(desc, fn) {
  totalChecks++;
  try {
    fn();
    console.log(`  ✓ ${desc}`);
    passedChecks++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${desc}`);
    console.error(`    ${err.message}`);
  }
}

console.log('=== RUNNING FLORIDA EMA PRESENTATION AUDIT ===\n');

// 1. florida-home-education/index.html Audit
const flHtmlPath = path.join(ROOT, 'florida-home-education', 'index.html');
const flHtml = fs.readFileSync(flHtmlPath, 'utf8');

check('florida-home-education/index.html exists and is readable', () => {
  assert(flHtml.length > 0);
});

check('Service Category is strictly "Home Education Instructional Program" and "Programa de instrucción para educación en el hogar"', () => {
  assert(flHtml.includes('Service Category: Home Education Instructional Program'), 'Must include exact Service Category in EN');
  assert(flHtml.includes('Programa de instrucción para educación en el hogar'), 'Must include exact Service Category in ES');
  assert(!flHtml.includes('Homeschool Instructional Program'), 'Must not substitute with Homeschool Instructional Program');
  assert(!flHtml.includes('Private School Tuition'), 'Must not substitute with Private School Tuition');
  assert(!flHtml.includes('Full-Time School Enrollment'), 'Must not substitute with Full-Time School Enrollment');
});

check('Service Type is "Tuition" / "Monthly Tuition" and in ES "Cuota mensual del servicio"', () => {
  assert(flHtml.includes('Service Type: Tuition'), 'Must include Service Type: Tuition');
  assert(flHtml.includes('Monthly Tuition — $275/month'), 'Must include Monthly Tuition — $275/month');
  assert(flHtml.includes('Monthly Tuition — $320/month'), 'Must include Monthly Tuition — $320/month');
  assert(flHtml.includes('Monthly Tuition — $365/month'), 'Must include Monthly Tuition — $365/month');
  assert(flHtml.includes('Cuota mensual del servicio — $275/mes'), 'Must include Cuota mensual del servicio — $275/mes');
  assert(flHtml.includes('Cuota mensual del servicio — $320/mes'), 'Must include Cuota mensual del servicio — $320/mes');
  assert(flHtml.includes('Cuota mensual del servicio — $365/mes'), 'Must include Cuota mensual del servicio — $365/mes');
});

check('Approved & Active Services have exact EMA Catalog Item IDs and rates', () => {
  assert(flHtml.includes('20172869'), 'Must include Elementary K-5 ID 20172869');
  assert(flHtml.includes('20169280'), 'Must include Middle Grades 6-8 ID 20169280');
  assert(flHtml.includes('20172870'), 'Must include High School 9-12 ID 20172870');
});

check('$295 fee is NOT bundled into annual tuition totals ($3,045, $3,495, $3,945 eliminated)', () => {
  assert(!flHtml.includes('3,045'), 'Annual total $3,045 must be removed');
  assert(!flHtml.includes('3,495'), 'Annual total $3,495 must be removed');
  assert(!flHtml.includes('3,945'), 'Annual total $3,945 must be removed');
  assert(!flHtml.includes('+ $295 setup fee'), '+ $295 setup fee bundle in card must be removed');
});

check('$295 fee is presented separately with Item ID 20174498 and exact mandatory bilingual review notice', () => {
  assert(flHtml.includes('20174498'), 'Must include Item ID 20174498 for $295 fee');
  assert(flHtml.includes('Other Fees'), 'Must list Service Type: Other Fees');
  assert(flHtml.includes('In Review'), 'Must list Status: In Review');
  assert(flHtml.includes('Additional annual fee: $295 — currently under EMA review and not available for EMA payment unless approved.'), 'Must include exact mandatory EN notice');
  assert(flHtml.includes('Cuota anual adicional: $295 — actualmente en revisión en EMA y no disponible para pago mediante EMA hasta su aprobación.'), 'Must include exact mandatory ES notice');
});

check('Legal disclaimers of non-diploma / non-enrollment remain fully preserved', () => {
  assert(flHtml.includes('These instructional offerings do not constitute full-time enrollment in Chanak International Academy and do not provide school-of-record services, official school transcripts, credits, or a diploma.'), 'EN legal disclaimer preserved');
  assert(flHtml.includes('Estos servicios educativos no constituyen una matrícula de tiempo completo (full-time enrollment) en Chanak International Academy y no incluyen servicios de escuela de registro (school-of-record), transcripciones escolares oficiales (transcripts), créditos ni diploma.'), 'ES legal disclaimer preserved');
});

// 2. scholarships/scholarships.js Audit
const scholJsPath = path.join(ROOT, 'scholarships', 'scholarships.js');
const scholJs = fs.readFileSync(scholJsPath, 'utf8');

check('scholarships/scholarships.js defines Florida row with exact Category, Type, and IDs', () => {
  assert(scholJs.includes('service: { en: "Home Education Instructional Program", es: "Programa de instrucción para educación en el hogar" }'), 'Exact bilingual Service Category in scholarships.js');
  assert(scholJs.includes('Monthly Tuition · EMA Catalog Item IDs: 20172869 (K–5), 20169280 (6–8), 20172870 (9–12)'), 'Exact EN offering in scholarships.js');
  assert(scholJs.includes('Cuota mensual del servicio · IDs del servicio en EMA: 20172869 (K–5), 20169280 (6–8), 20172870 (9–12)'), 'Exact ES offering in scholarships.js');
});

// 3. matricula/index.html Audit
const matHtmlPath = path.join(ROOT, 'matricula', 'index.html');
const matHtml = fs.readFileSync(matHtmlPath, 'utf8');

check('matricula/index.html has Florida EMA specific options and mandatory $295 disclosure', () => {
  assert(matHtml.includes('Home Education Instructional Program · Grades K–5 · $275/mo (EMA ID: 20172869)'), 'Must include K-5 EMA ID in matricula');
  assert(matHtml.includes('Home Education Instructional Program · Grades 6–8 · $320/mo (EMA ID: 20169280)'), 'Must include 6-8 EMA ID in matricula');
  assert(matHtml.includes('Home Education Instructional Program · Grades 9–12 · $365/mo (EMA ID: 20172870)'), 'Must include 9-12 EMA ID in matricula');
  assert(matHtml.includes('Additional annual fee: $295 — currently under EMA review and not available for EMA payment unless approved.'), 'Must include mandatory EN notice in matricula');
  assert(matHtml.includes('Cuota anual adicional: $295 — actualmente en revisión en EMA y no disponible para pago mediante EMA hasta su aprobación.'), 'Must include mandatory ES notice in matricula');
});

// 4. Isolation Audit: The other 6 states and private Florida school must remain intact
const otherStateFiles = [
  'alabama/index.html',
  'arizona/index.html',
  'utah/index.html',
  'wyoming/index.html',
  'new-hampshire/index.html',
  'south-carolina/index.html',
  'scholarships/alabama/index.html',
  'scholarships/arizona/index.html',
  'scholarships/utah/index.html',
  'scholarships/wyoming/index.html',
  'scholarships/new-hampshire/index.html',
  'scholarships/south-carolina/index.html'
];

check('The other 6 states remain strictly untouched and Florida landing offers PEP', () => {
  const { execSync } = require('child_process');
  for (const relPath of otherStateFiles) {
    const fullPath = path.join(ROOT, relPath);
    assert(fs.existsSync(fullPath), `File ${relPath} must exist`);
  }
  const usFlHtml = fs.readFileSync(path.join(ROOT, 'us/florida/index.html'), 'utf8');
  assert(usFlHtml.includes('20172869') && usFlHtml.includes('florida_pep_ema'), 'us/florida/index.html must offer Florida PEP');
  // Check git diff on other states to ensure 0 changes
  const diffOutput = execSync(`GIT_CONFIG_GLOBAL=/dev/null git status --porcelain ${otherStateFiles.join(' ')}`, { cwd: ROOT, encoding: 'utf8' }).trim();
  assert.strictEqual(diffOutput, '', `Other state pages must have 0 git changes, but found:\n${diffOutput}`);
});

console.log(`\nAudit finished: ${passedChecks}/${totalChecks} checks passed.`);
if (passedChecks === totalChecks) {
  console.log('🎉 ALL FLORIDA EMA COMPLIANCE CHECKS PASSED PERFECTLY!\n');
  process.exit(0);
} else {
  console.error('❌ SOME CHECKS FAILED!\n');
  process.exit(1);
}
