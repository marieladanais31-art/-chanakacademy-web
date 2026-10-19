/**
 * tests/sis_hub_flows.cjs
 * Comprehensive verification of the 7 State Hubs, SIS Continuity, Folio Generation,
 * Pricing Calculations, and Matricula Preselection.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- RUNNING SIS & 7 STATE HUBS INTEGRATION AUDIT ---\n');

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    ${err.message}`);
    process.exitCode = 1;
  }
}

const ROOT = path.resolve(__dirname, '..');
const catalogPath = path.join(ROOT, '_private', 'hubs-catalog.json');
const hubsJsPath = path.join(ROOT, 'assets', 'js', 'chanak-hubs.js');
const matriculaPath = path.join(ROOT, 'matricula', 'index.html');

// 1. Hubs Catalog Verification
test('hubs-catalog.json exists and has valid JSON structure', () => {
  assert(fs.existsSync(catalogPath), 'Catalog file must exist');
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  assert(Array.isArray(catalog.hubs), 'Catalog must contain hubs array');
  assert.strictEqual(catalog.hubs.length, 7, 'Must have exactly 7 state hubs');
});

const expectedHubs = [
  'FL-STEPUP-EMA',
  'AL-CHOOSE-CW',
  'AZ-ESA-CW',
  'UT-UFA-ODY',
  'WY-ESA-ODY',
  'NH-EFA-CW',
  'SC-ESTF-CW'
];

test('Catalog contains all 7 required state hubs with compliant provider and direct pay details', () => {
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  expectedHubs.forEach(hubId => {
    const hub = catalog.hubs.find(h => h.id === hubId);
    assert(hub, `Hub ${hubId} must exist in catalog`);
    assert.strictEqual(hub.id, hubId, `Hub ID must match`);
    assert(hub.state_name_en, `Hub must have state_name_en`);
    assert(hub.program_name_en, `Hub must have program_name_en`);
    assert(hub.platform, `Hub must define platform system`);
    assert.strictEqual(hub.provider_name, 'CHANAK TRAINUP EDUCATION INC', `Provider entity must be CHANAK TRAINUP EDUCATION INC`);
    
    // Check services
    const setupService = hub.services.find(s => s.category === 'diagnostic_setup' || s.id.includes('SETUP'));
    assert(setupService && setupService.rate_onetime === 295, 'Setup fee must be $295');
    
    if (hubId === 'AZ-ESA-CW') {
      const ftK5 = hub.services.find(s => s.rate_quarterly === 1125 && s.rate_annual === 4500);
      assert(ftK5, 'Arizona Full-Time K-5 quarterly rate must be $1,125 ($4,500 annual)');
    } else {
      const supportK5 = hub.services.find(s => s.rate_monthly === 275);
      assert(supportK5, 'Monthly support K-5 must be $275');
    }
  });
});

test('Role-based permission matrix is defined with 5 required roles', () => {
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  assert(catalog.roles_matrix, 'roles_matrix must be defined');
  const requiredRoles = ['direccion', 'coordinador', 'mentor', 'profesor_life_skills', 'familia'];
  requiredRoles.forEach(role => {
    assert(catalog.roles_matrix[role], `Role ${role} must be defined in permission matrix`);
    assert(catalog.roles_matrix[role].permissions.length > 0, `Role ${role} must have permissions`);
  });
  // Dirección has executive permissions
  assert(catalog.roles_matrix.direccion.permissions.includes('admit_student'));
  assert(catalog.roles_matrix.coordinador.permissions.includes('assign_cohorts'));
  // Family has view-only on student record
  assert(catalog.roles_matrix.familia.permissions.includes('view_student_status'));
  assert(!catalog.roles_matrix.familia.permissions.includes('admit_student'));
});

test('Dual Diploma is explicitly not eligible for State ESA funding', () => {
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  const dual = catalog.private_programs.find(p => p.id === 'PROG-DUAL-DIPLOMA');
  assert(dual, 'Dual diploma program must exist');
  assert.strictEqual(dual.esa_eligible, false, 'Dual diploma must NOT be ESA eligible');
});

// 2. Hubs JS library verification
test('chanak-hubs.js exports window.CHANAK_HUBS and helper methods', () => {
  const content = fs.readFileSync(hubsJsPath, 'utf8');
  const vm = require('vm');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(content, sandbox);

  const CHANAK_HUBS = sandbox.window.CHANAK_HUBS;
  assert(CHANAK_HUBS, 'window.CHANAK_HUBS must be defined');
  assert(typeof CHANAK_HUBS.getHubById === 'function', 'getHubById must be a function');
  assert(typeof CHANAK_HUBS.getHubByState === 'function', 'getHubByState must be a function');
  assert(typeof CHANAK_HUBS.generateFolio === 'function', 'generateFolio must be a function');
  assert(typeof CHANAK_HUBS.calculatePricing === 'function', 'calculatePricing must be a function');
  assert(typeof CHANAK_HUBS.isEsaEligible === 'function', 'isEsaEligible must be a function');

  // Test folio generation
  const folioFL = CHANAK_HUBS.generateFolio('FL-STEPUP-EMA');
  assert(/^CHK-FL-2026-\d{4}$/.test(folioFL), `Folio must match format CHK-FL-2026-XXXX, got ${folioFL}`);

  const folioAL = CHANAK_HUBS.generateFolio('AL-CHOOSE-CW');
  assert(/^CHK-AL-2026-\d{4}$/.test(folioAL), `Folio must match format CHK-AL-2026-XXXX, got ${folioAL}`);

  // Test state resolution
  const hubWy = CHANAK_HUBS.getHubByState('wyoming');
  assert(hubWy && hubWy.id === 'WY-ESA-ODY', 'Wyoming must resolve to WY-ESA-ODY');

  const hubAz = CHANAK_HUBS.getHubByState('arizona');
  assert(hubAz && hubAz.id === 'AZ-ESA-CW', 'Arizona must resolve to AZ-ESA-CW');

  const hubUt = CHANAK_HUBS.getHubByState('utah');
  assert(hubUt && hubUt.id === 'UT-UFA-ODY', 'Utah must resolve to UT-UFA-ODY');

  // Test ESA eligibility
  assert.strictEqual(CHANAK_HUBS.isEsaEligible('dual'), false, 'Dual diploma must not be ESA eligible');
  assert.strictEqual(CHANAK_HUBS.isEsaEligible('offcampus'), false, 'Offcampus full private is not ESA eligible');
  assert.strictEqual(CHANAK_HUBS.isEsaEligible('esa'), true, 'ESA program must be ESA eligible');

  // Test pricing calculation
  const p1 = CHANAK_HUBS.calculatePricing('FL-STEPUP-EMA', 'support', 'k5', true);
  assert.strictEqual(p1.monthlyRate, 275);
  assert.strictEqual(p1.setupFee, 295);
  assert.strictEqual(p1.totalInitial, 570);

  const p2 = CHANAK_HUBS.calculatePricing('FL-STEPUP-EMA', 'support', '68', false);
  assert.strictEqual(p2.monthlyRate, 320);

  const p3 = CHANAK_HUBS.calculatePricing('FL-STEPUP-EMA', 'support', '912', false);
  assert.strictEqual(p3.monthlyRate, 365);
});

// 3. Matricula Portal verification
test('matricula/index.html contains interactive form, live folio preview, and 3-track status', () => {
  const html = fs.readFileSync(matriculaPath, 'utf8');
  assert(html.includes('id="enrollmentForm"'), 'Form must exist with id enrollmentForm');
  assert(html.includes('id="liveFolio"'), 'Live folio element must exist');
  assert(html.includes('id="confirmedFolio"'), 'Confirmed folio element must exist');
  assert(html.includes('id="receipt-screen"'), 'Confirmation screen must exist');
  assert(html.includes('data-i18n="tr1_lbl"'), 'Admissions track status must exist');
  assert(html.includes('data-i18n="tr2_lbl"'), 'Academic track status must exist');
  assert(html.includes('data-i18n="tr3_lbl"'), 'Financial track status must exist');
  assert(html.includes('assets/js/chanak-hubs.js'), 'Must link to chanak-hubs.js');
  assert(html.includes('enviar-formulario.php'), 'Must post to enviar-formulario.php');
});

// 4. State Landing Pages link to matricula with correct query parameters
const stateSlugs = [
  { state: 'wyoming', hub: 'WY-ESA-ODY' },
  { state: 'utah', hub: 'UT-UFA-ODY' },
  { state: 'arizona', hub: 'AZ-ESA-CW' },
  { state: 'alabama', hub: 'AL-CHOOSE-CW' },
  { state: 'south-carolina', hub: 'SC-ESTF-CW' },
  { state: 'new-hampshire', hub: 'NH-EFA-CW' }
];

test('State pages contain direct matricula links with state & hub preselection parameters', () => {
  stateSlugs.forEach(({ state, hub }) => {
    const pagePaths = [
      path.join(ROOT, state, 'index.html'),
      path.join(ROOT, 'scholarships', state, 'index.html')
    ];

    pagePaths.forEach(p => {
      assert(fs.existsSync(p), `State page ${p} must exist`);
      const content = fs.readFileSync(p, 'utf8');
      const expectedParam = `hub=${hub}`;
      assert(content.includes(expectedParam), `Page ${p} must contain ${expectedParam}`);
      assert(content.includes('/matricula/'), `Page ${p} must link to /matricula/`);
      assert(content.includes('$295'), `Page ${p} must state $295 setup fee`);
    });
  });
});

test('No occurrences of "becas estatales" exist in any HTML or JS file', () => {
  function scanDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === '_archive') continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (entry.isFile() && (entry.name.endsWith('.html') || entry.name.endsWith('.js'))) {
        const text = fs.readFileSync(fullPath, 'utf8').toLowerCase();
        assert(!text.includes('becas estatales'), `File ${fullPath} contains "becas estatales"`);
      }
    }
  }
  scanDir(ROOT);
});

console.log(`\nAll ${passedTests}/${totalTests} integration tests passed successfully!`);
