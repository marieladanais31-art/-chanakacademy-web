const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = '/Users/marielaandrade/.gemini/antigravity/scratch/chanakacademy-web';
console.log('=== COMPREHENSIVE STANDALONE OFFERINGS & CTA FLOW AUDIT ===\n');

let totalTests = 0;
let passedTests = 0;

function test(name, fn) {
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

// 1. UTAH & WYOMING ABC READING $1,110 AUDIT
test('Utah & Wyoming ABC Reading is $1,110/mo (no $1,600) with 20 sessions x 60 min, max 3', () => {
  for (const state of ['utah', 'wyoming']) {
    for (const prefix of ['', 'scholarships/']) {
      const filePath = path.join(ROOT, prefix + state, 'index.html');
      const content = fs.readFileSync(filePath, 'utf8');

      // No $1,600 anywhere except in DM Sans link font-weight range 1,600
      const contentNoFont = content.replace(/1,400&family=Playfair\+Display:ital,wght@0,600;0,700;1,600/g, '');
      assert(!contentNoFont.includes('$1,600'), `${filePath} contains $1,600!`);
      assert(!contentNoFont.includes('1,600/mo'), `${filePath} contains 1,600/mo!`);
      assert(!contentNoFont.includes('1,600/mes'), `${filePath} contains 1,600/mes!`);

      // Must contain $1,110
      assert(content.includes('$1,110'), `${filePath} missing $1,110!`);
      assert(content.includes('opt_serv_abc') && content.includes('$1,110/mo'), `${filePath} missing $1,110/mo in form/i18n`);
      assert(content.includes('$1,110/mes'), `${filePath} missing $1,110/mes in ES i18n`);

      // Must mention 20 sessions and max 3
      assert(content.includes('20 sessions of 60 minutes') || content.includes('20 sesiones de 60 minutos'), `${filePath} missing 20 sessions`);
      assert(content.includes('max 3') || content.includes('máx. 3') || content.includes('máximo 3'), `${filePath} missing max 3 students`);
    }
  }
});

// 2. ARIZONA STANDALONE SECTION & PRESERVATION OF FULL-TIME
test('Arizona contains Standalone Courses section ($1,110, $240, $240, $120) and NO support packages ($275, $320, $365)', () => {
  for (const prefix of ['', 'scholarships/']) {
    const filePath = path.join(ROOT, prefix + 'arizona', 'index.html');
    const content = fs.readFileSync(filePath, 'utf8');

    // Section title
    assert(content.includes('Standalone Courses — No Full-Time Enrollment Required'), `${filePath} missing Standalone section title`);
    assert(content.includes('Cursos Independientes — No Requieren Matrícula Escolar Completa'), `${filePath} missing ES Standalone section title`);

    // 4 standalone offerings
    assert(content.includes('$1,110'), `${filePath} missing ABC Reading $1,110`);
    assert(content.includes('$240'), `${filePath} missing Spanish / English $240`);
    assert(content.includes('$120'), `${filePath} missing Leadership $120`);

    // Indication of duplicate charges notice
    assert(content.includes('Leadership workshops (4 hrs/mo) and Academic Language access are already included in Full-Time enrollment'), `${filePath} missing EN notice about Full-Time inclusions`);
    assert(content.includes('Las sesiones de Liderazgo (4 hrs/mes) y el acceso a Lengua Académica ya están incluidos dentro de la colegiatura Full-Time') ||
           content.includes('Las clases de Liderazgo (4 hrs/mes) y el acceso a Lengua Académica ya están incluidos'), `${filePath} missing ES notice about Full-Time inclusions`);

    // Full-Time quarterly pricing preserved
    assert(content.includes('$1,125'), `${filePath} missing $1,125 quarterly tuition`);
    assert(content.includes('$1,237.50'), `${filePath} missing $1,237.50 quarterly tuition`);
    assert(content.includes('$1,350'), `${filePath} missing $1,350 quarterly tuition`);

    // ZERO support packages ($275, $320, $365) in Arizona
    assert(!content.includes('$275'), `${filePath} contains prohibited $275!`);
    assert(!content.includes('$320'), `${filePath} contains prohibited $320!`);
    assert(!content.includes('$365'), `${filePath} contains prohibited $365!`);

    // Form dropdown in Arizona has both FT and Standalone
    assert(content.includes('opt_serv_ft_15'), `${filePath} missing opt_serv_ft_15`);
    assert(content.includes('opt_serv_abc'), `${filePath} missing opt_serv_abc`);
    assert(content.includes('opt_serv_spanish'), `${filePath} missing opt_serv_spanish`);
    assert(content.includes('opt_serv_english'), `${filePath} missing opt_serv_english`);
    assert(content.includes('opt_serv_ls'), `${filePath} missing opt_serv_ls`);
  }
});

// 3. ALABAMA, SOUTH CAROLINA, NEW HAMPSHIRE SEPARATION OF SPANISH & ENGLISH
test('Alabama, South Carolina, and New Hampshire separate Spanish and English in form selector', () => {
  for (const state of ['alabama', 'south-carolina', 'new-hampshire']) {
    for (const prefix of ['', 'scholarships/']) {
      const filePath = path.join(ROOT, prefix + state, 'index.html');
      const content = fs.readFileSync(filePath, 'utf8');

      // The select element must have separate options
      assert(content.includes('data-i18n="opt_serv_spanish"'), `${filePath} missing opt_serv_spanish in form`);
      assert(content.includes('data-i18n="opt_serv_english"'), `${filePath} missing opt_serv_english in form`);

      // Form must NOT have single combined option in HTML select
      assert(!content.includes('<option value="Spanish or Academic English Live Classes ($240/mo)"'), `${filePath} contains combined language option!`);

      // i18n parity
      assert(content.includes('opt_serv_spanish: "Clases en vivo de Español y Lectoescritura ($240/mes)"'), `${filePath} missing ES spanish`);
      assert(content.includes('opt_serv_english: "Clases en vivo de Inglés Académico y Redacción ($240/mes)"'), `${filePath} missing ES english`);
      assert(content.includes('opt_serv_spanish: "Spanish Language & Literacy Live Classes ($240/mo)"'), `${filePath} missing EN spanish`);
      assert(content.includes('opt_serv_english: "Academic English & Literacy Live Classes ($240/mo)"'), `${filePath} missing EN english`);
    }
  }
});

// 4. MATRICULA PARAMS & SERVICES AUDIT
test('Matricula separates spanish-live and english-live and assigns 1-5 for Full-Time Elementary', () => {
  const matPath = path.join(ROOT, 'matricula', 'index.html');
  const content = fs.readFileSync(matPath, 'utf8');

  // #studentGrade has option 1-5 AND preserves K-5 for Florida
  assert(content.includes('<option value="1-5" selected>Elementary School (Grades 1–5)</option>'), 'matricula missing 1-5 option');
  assert(content.includes('<option value="K-5">Elementary School (Grades K–5 · Florida EMA)</option>'), 'matricula missing K-5 Florida option');

  // Parameter handling: fulltime-15 assigns studentGrade = '1-5'
  assert(content.includes("servParam === 'fulltime-15' || servParam === 'ft-15'"), 'matricula missing ft-15 param check');
  assert(content.includes("document.getElementById('studentGrade').value = '1-5'"), 'matricula missing 1-5 assignment for ft-15');

  // Parameter handling: separates spanish-live and english-live
  assert(content.includes("servParam === 'spanish-live'"), 'matricula missing spanish-live param check');
  assert(content.includes("document.getElementById('serviceSelect').value = 'spanish-live'"), 'matricula missing spanish-live select assignment');
  assert(content.includes("servParam === 'english-live'"), 'matricula missing english-live param check');
  assert(content.includes("document.getElementById('serviceSelect').value = 'english-live'"), 'matricula missing english-live select assignment');

  // Dropdown options include separate spanish-live and english-live
  assert(content.includes('value="spanish-live"'), 'matricula dropdown missing spanish-live');
  assert(content.includes('value="english-live"'), 'matricula dropdown missing english-live');

  // Summary titles and prices include spanish-live and english-live
  assert(content.includes("'spanish-live':"), 'matricula titles missing spanish-live');
  assert(content.includes("'english-live':"), 'matricula titles missing english-live');

  // Receipt screen has recSelectedSummary displaying chosen service, state, grade
  assert(content.includes('id="recSelectedSummary"'), 'matricula missing recSelectedSummary element');
  assert(content.includes('recSummary.innerHTML ='), 'matricula showConfirmation missing recSummary rendering');
  assert(content.includes('formData.append(\'service_name\''), 'matricula submit missing service_name in formData');
});

// 5. SCHOLARSHIPS DIRECTORY STANDALONE OFFERINGS & DISCLAIMER
test('Scholarships directory has the 4 standalone offerings with rates and state links', () => {
  const hubHtmlPath = path.join(ROOT, 'scholarships', 'index.html');
  const hubJsPath = path.join(ROOT, 'scholarships', 'scholarships.js');
  const html = fs.readFileSync(hubHtmlPath, 'utf8');
  const js = fs.readFileSync(hubJsPath, 'utf8');

  // Standalone subsection in HTML
  assert(html.includes('data-i18n="standalone_hub_title"'), 'scholarships/index.html missing standalone_hub_title');
  assert(html.includes('$1,110'), 'scholarships/index.html missing $1,110 ABC rate');
  assert(html.includes('$240'), 'scholarships/index.html missing $240 language rate');
  assert(html.includes('$120'), 'scholarships/index.html missing $120 leadership rate');

  // Links to states
  assert(html.includes('href="/utah/"') && html.includes('href="/wyoming/"') && html.includes('href="/arizona/"'), 'scholarships/index.html missing state links');

  // Disclaimer: No afirmar aprobación sin verificarla
  assert(html.includes('data-i18n="standalone_approval_note_text"'), 'scholarships/index.html missing standalone approval disclaimer');
  assert(js.includes('Offering availability does not guarantee approval under each state\'s program guidelines.'), 'scholarships.js missing EN approval disclaimer');
  assert(js.includes('La disponibilidad de la oferta no garantiza su aprobación automática bajo la normativa de cada programa.'), 'scholarships.js missing ES approval disclaimer');
});

// 6. CARD CTA BUTTONS TO PRESELECTION IN MATRICULA ACROSS 6 STATES
test('Card CTA buttons have valid pre-selection parameters across all 6 ESA state pages', () => {
  const stateFiles = [
    { state: 'arizona', hub: 'AZ-ESA-CW' },
    { state: 'utah', hub: 'UT-UFA-ODY' },
    { state: 'wyoming', hub: 'WY-ESA-ODY' },
    { state: 'alabama', hub: 'AL-CHOOSE-CW' },
    { state: 'south-carolina', hub: 'SC-ESTF-CW' },
    { state: 'new-hampshire', hub: 'NH-EFA-CW' }
  ];

  for (const { state, hub } of stateFiles) {
    const filePath = path.join(ROOT, state, 'index.html');
    const content = fs.readFileSync(filePath, 'utf8');

    // Extract all /matricula/ links
    const matches = content.match(/href="\/matricula\/[^"]+"/g) || [];
    assert(matches.length > 0, `${state} has no /matricula/ CTA links!`);

    for (const m of matches) {
      const url = m.replace('href="', '').replace('"', '').replace(/&amp;/g, '&');
      assert(url.includes('country=US'), `${state} link missing country=US: ${url}`);
      assert(url.includes(`hub=${hub}`), `${state} link missing hub=${hub}: ${url}`);
      assert(url.includes('service='), `${state} link missing service param: ${url}`);
    }
  }
});

console.log(`\n========================================`);
console.log(`AUDIT FINISHED: ${passedTests}/${totalTests} TESTS PASSED`);
console.log(`========================================\n`);

if (passedTests !== totalTests) {
  process.exit(1);
}
