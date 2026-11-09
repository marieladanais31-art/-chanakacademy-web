const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..');

console.log('=== VERIFYING MICROSCHOOLS ECOSYSTEM, PARTNERSHIPS & RESOURCES ===\n');

// 1. Verify index.html default language
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
assert(indexHtml.includes('<html data-lang="en" lang="en">'), 'index.html must have <html data-lang="en" lang="en">');
assert(indexHtml.includes('<button class="lang-b" id="langBtn" onclick="toggleLang()">EN ▾</button>'), 'index.html langBtn must display EN ▾');
assert(indexHtml.includes('<div class="lang-opt act" onclick="setLang(\'en\')">English</div>'), 'index.html lang-opt act must be English');
assert(indexHtml.includes('<span class="mob-lang act" onclick="setLang(\'en\')">EN</span>'), 'index.html mob-lang act must be EN');
assert(indexHtml.includes('let CL=\'en\';'), 'index.html CL must default to en');
console.log('  ✓ index.html: English default tags, selectors, and JS variable verified');

// 2. Verify navigation links with data-microschools-path and data-open-microschool-path
assert(indexHtml.includes('data-microschools-path="/microschools/"'), 'index.html must have data-microschools-path');
assert(indexHtml.includes('data-open-microschool-path="/open-a-microschool/"'), 'index.html must have data-open-microschool-path');
assert(indexHtml.includes('document.querySelectorAll(\'[data-microschools-path]\').forEach'), 'setLang must update data-microschools-path');
assert(indexHtml.includes('document.querySelectorAll(\'[data-open-microschool-path]\').forEach'), 'setLang must update data-open-microschool-path');
console.log('  ✓ index.html: dynamic multilingual path routing verified');

// 3. Verify terminology in index.html
assert(indexHtml.includes('Coordinador, sede y modelo académico para organizaciones'), 'index.html nav_open_micro_s must use Coordinador');
assert(indexHtml.includes('Coordinator, location and academic model for organizations'), 'index.html EN nav_open_micro_s must use Coordinator');
assert(indexHtml.includes('Coordinador, seu i model acadèmic per a organitzacions'), 'index.html CA nav_open_micro_s must use Coordinador');
assert(indexHtml.includes('Coordinateur, locaux et modèle académique pour organisations'), 'index.html FR nav_open_micro_s must use Coordinateur');

assert(indexHtml.includes('Grupos pequeños y presenciales con Coordinador certificado'), 'index.html card 03 must use Coordinador certificado');
assert(indexHtml.includes('facilitados por un Coordinador certificado por Chanak'), 'index.html section #microschool must use Coordinador certificado');
console.log('  ✓ index.html: "Coordinador certificado" terminology verified across all 4 languages');

// 4. Verify title and buttons in index.html Card 03 & Section #microschool
assert(indexHtml.includes('Microschool &amp; Academic Partnerships'), 'index.html must feature Microschool & Academic Partnerships');
assert(indexHtml.includes('id="badge-nces-pending"'), 'index.html must have #badge-nces-pending');
assert(indexHtml.includes('¿Eres una familia individual? Conoce <a href="/off-campus/"'), 'index.html section #microschool must have individual family redirect line');
assert(!indexHtml.includes('Currículo físico (PACEs) vs Digital'), 'index.html nav menu must NOT contain (PACEs)');
assert(indexHtml.includes('Currículo físico vs Digital (Chanak Flex)'), 'index.html nav menu must contain clean label without PACEs');
console.log('  ✓ index.html: Card 03, Section #microschool, pending NCES badge, and nav menu verified');

// 5. Verify all 8 subpages for Coordinator terminology
const allSubpages = [
  'microschools/index.html',
  'microschools/en/index.html',
  'microschools/ca/index.html',
  'microschools/fr/index.html',
  'open-a-microschool/index.html',
  'open-a-microschool/en/index.html',
  'open-a-microschool/ca/index.html',
  'open-a-microschool/fr/index.html'
];

allSubpages.forEach(file => {
  const content = fs.readFileSync(path.join(ROOT, file), 'utf8');
  assert(!content.includes('Guía Certificado'), `${file} must NOT contain "Guía Certificado"`);
  assert(!content.includes('Chanak-Certified Guide'), `${file} must NOT contain "Chanak-Certified Guide"`);
  assert(!content.includes('Guia Certificat'), `${file} must NOT contain "Guia Certificat"`);
  assert(!content.includes('Guide Certifié'), `${file} must NOT contain "Guide Certifié"`);
  console.log(`  ✓ ${file}: verified coordinator terminology`);
});

// 6. Verify NMC Sector Report PDF and University Guide across all 8 subpages
const pdfUrl = 'https://microschoolingcenter.org/hubfs/American%20Microschools%202025.pdf?hsLang=en';
allSubpages.forEach(file => {
  const content = fs.readFileSync(path.join(ROOT, file), 'utf8');
  assert(content.includes(pdfUrl), `${file} must include the National Microschooling Center PDF URL`);
  assert(content.includes('target="_blank"'), `${file} NMC link must have target="_blank"`);
  assert(content.includes('rel="noopener noreferrer"'), `${file} NMC link must have rel="noopener noreferrer"`);
  assert(content.includes('PDF · EN'), `${file} must include the "PDF · EN" indicator badge`);
  assert(content.includes('/universidad-eeuu/'), `${file} must include college guide link /universidad-eeuu/`);
  console.log(`  ✓ ${file}: verified Recursos section with NMC PDF report & university guide`);
});

// 7. Verify absence of prohibited waitlist terms in subpages
const prohibitedTerms = [
  'lista de espera',
  'waitlist',
  'llista d\'espera',
  'liste d\'attente',
  'en preparación',
  'in preparation',
  'en preparació'
];

allSubpages.forEach(file => {
  const content = fs.readFileSync(path.join(ROOT, file), 'utf8').toLowerCase();
  prohibitedTerms.forEach(term => {
    assert(!content.includes(term), `${file} must NOT contain prohibited term "${term}"`);
  });
  console.log(`  ✓ ${file}: zero prohibited waitlist terms verified`);
});

// 8. Verify top alert banner on all 4 microschools pages
const msPages = [
  'microschools/index.html',
  'microschools/en/index.html',
  'microschools/ca/index.html',
  'microschools/fr/index.html'
];

msPages.forEach(file => {
  const content = fs.readFileSync(path.join(ROOT, file), 'utf8');
  assert(content.includes('Top Alert Banner'), `${file} must include Top Alert Banner`);
  assert(content.includes('href="/off-campus/"'), `${file} Top Alert Banner must link to /off-campus/`);
  assert(content.includes('href="/dual-diploma/"'), `${file} Top Alert Banner must link to /dual-diploma/`);
  console.log(`  ✓ ${file}: top alert banner verified`);
});

// 9. Verify language redirect scripts in ES root pages
const msRoot = fs.readFileSync(path.join(ROOT, 'microschools/index.html'), 'utf8');
assert(msRoot.includes("if (!l || l === 'en') { location.replace('/microschools/en/'"), 'microschools/index.html must redirect en by default');

const openMsRoot = fs.readFileSync(path.join(ROOT, 'open-a-microschool/index.html'), 'utf8');
assert(openMsRoot.includes("if (!l || l === 'en') { location.replace('/open-a-microschool/en/'"), 'open-a-microschool/index.html must redirect en by default');
console.log('  ✓ microschools & open-a-microschool root: English default redirect script verified');

console.log('\n🎉 ALL COMPREHENSIVE VERIFICATION AUDIT CHECKS PASSED PERFECTLY!\n');
