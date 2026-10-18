const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const indexHtmlPath = path.join(ROOT, 'index.html');
const programLandingJsPath = path.join(ROOT, 'assets/js/program-landing.js');

console.log('=== AUDITING COUNTRY TABS, INCLUDES FORMAT & PORTAL INTEGRATION ===');

let errors = 0;

if (!fs.existsSync(indexHtmlPath)) {
  console.error('❌ index.html not found');
  process.exit(1);
}
if (!fs.existsSync(programLandingJsPath)) {
  console.error('❌ assets/js/program-landing.js not found');
  process.exit(1);
}

const html = fs.readFileSync(indexHtmlPath, 'utf8');
const js = fs.readFileSync(programLandingJsPath, 'utf8');

// 1. Check Tabs
const expectedCountries = ['ES', 'MX', 'PA', 'US', 'GLOBAL'];
console.log('\n--- 1. Country Tabs & Panes in index.html ---');
for (const code of expectedCountries) {
  const tabPattern = new RegExp(`data-country-tab=["']${code}["']`);
  const panePattern = new RegExp(`data-country-pane=["']${code}["']`);

  if (!tabPattern.test(html)) {
    console.error(`❌ Tab for ${code} not found in index.html`);
    errors++;
  } else {
    console.log(`✅ Tab for ${code} exists`);
  }

  if (!panePattern.test(html)) {
    console.error(`❌ Pane for ${code} not found in index.html`);
    errors++;
  } else {
    console.log(`✅ Pane for ${code} exists`);
  }
}

// 2. Check Tab Switching Function
if (!html.includes('function switchCountryTarifas(')) {
  console.error('❌ switchCountryTarifas function missing from index.html');
  errors++;
} else {
  console.log('✅ switchCountryTarifas function exists');
}

// 3. Check Off-Campus España has Portal Mockup Preview
console.log('\n--- 2. Off-Campus España Portal Screens ---');
const esPaneMatch = html.match(/data-country-pane="ES"[\s\S]*?(?=data-country-pane="MX")/);
if (!esPaneMatch) {
  console.error('❌ Could not isolate ES pane');
  errors++;
} else {
  const esPane = esPaneMatch[0];
  if (!esPane.includes('Pantallas del Campus Digital')) {
    console.error('❌ ES pane missing "Pantallas del Campus Digital" title');
    errors++;
  } else {
    console.log('✅ ES pane has "Pantallas del Campus Digital" badge');
  }

  if (!esPane.includes('portal-joint.webp') || !esPane.includes('data-portal-preview')) {
    console.error('❌ ES pane missing interactive portal-joint preview trigger');
    errors++;
  } else {
    console.log('✅ ES pane has interactive portal-joint preview card');
  }

  if (!esPane.includes('Portal Familia') || !esPane.includes('Portal Alumno') || !esPane.includes('Expediente')) {
    console.error('❌ ES pane missing quick buttons for specific portals');
    errors++;
  } else {
    console.log('✅ ES pane has portal preview buttons (Familia, Alumno, Expediente)');
  }
}

// 4. Check Materials Breakdown List Formatting (Separation por puntos)
console.log('\n--- 3. Material Costs Formatting (Separation por puntos) ---');
for (const code of expectedCountries) {
  const paneRegex = new RegExp(`<div[^>]*data-country-pane=["']${code}["'][\\s\\S]*?(?=(<div[^>]*data-country-pane=|<\\/details>))`);
  const paneMatch = html.match(paneRegex);
  if (!paneMatch) {
    console.error(`❌ Could not match pane ${code}`);
    errors++;
    continue;
  }
  const paneHtml = paneMatch[0];

  // Must have a <ul> list inside the material box
  if (!paneHtml.includes('📦') || !paneHtml.includes('<ul') || !paneHtml.includes('<li')) {
    console.error(`❌ Pane ${code} missing structured <ul>/<li> material list`);
    errors++;
  } else {
    console.log(`✅ Pane ${code} has structured material list with <ul>/<li> bullets`);
  }
}

// 5. Check program-landing.js splits includes cleanly
console.log('\n--- 4. program-landing.js includes format ---');
if (!js.includes('program-includes-list') || !js.includes('split(')) {
  console.error('❌ program-landing.js does not parse and format includes as an unordered list');
  errors++;
} else {
  console.log('✅ program-landing.js parses and formats includes as <ul class="program-includes-list">');
}

// 6. Check official prices intact
console.log('\n--- 5. Official Prices Integrity ---');
const priceAssertions = [
  { check: html.includes('70 €') && html.includes('180 €') && html.includes('250 €'), label: 'ES Off-Campus 70 € / 180 € / 250 €' },
  { check: html.includes('110 €') && html.includes('129 €') && html.includes('148 €') && html.includes('167 €'), label: 'ES Dual Diploma installments' },
  { check: html.includes('$3,400 MXN') && html.includes('$4,300 MXN'), label: 'MX Dual Diploma & enrollment' },
  { check: html.includes('US$70') && html.includes('US$180') && html.includes('US$250'), label: 'PA Off-Campus US$70 / US$180 / US$250' },
  { check: html.includes('$275 USD') && html.includes('$320 USD') && html.includes('$365 USD'), label: 'US Support breakdown' }
];

for (const a of priceAssertions) {
  if (!a.check) {
    console.error(`❌ Price assertion failed: ${a.label}`);
    errors++;
  } else {
    console.log(`✅ ${a.label} verified intact`);
  }
}

if (errors > 0) {
  console.error(`\n❌ FAILED with ${errors} errors.`);
  process.exit(1);
} else {
  console.log('\n🎉 ALL AUDIT CHECKS PASSED SUCCESSFULLY!');
}
