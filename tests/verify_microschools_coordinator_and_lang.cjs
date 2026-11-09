const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..');

console.log('=== VERIFYING MICROSCHOOLS TERMINOLOGY & ENGLISH DEFAULT ===\n');

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

// 4. Verify all 8 subpages
const pages = [
  { file: 'microschools/index.html', title: 'Coordinador Certificado Chanak', noWord: 'Guía Certificado' },
  { file: 'microschools/en/index.html', title: 'Chanak-Certified Coordinator', noWord: 'Chanak-Certified Guide' },
  { file: 'microschools/ca/index.html', title: 'Coordinador Certificat Chanak', noWord: 'Guia Certificat' },
  { file: 'microschools/fr/index.html', title: 'Coordinateur Certifié Chanak', noWord: 'Guide Certifié' },
  { file: 'open-a-microschool/index.html', title: 'Certificación del Coordinador', noWord: 'Certificación del Guía' },
  { file: 'open-a-microschool/en/index.html', title: 'Coordinator Certification', noWord: 'Guide Certification' },
  { file: 'open-a-microschool/ca/index.html', title: 'Certificació del Coordinador', noWord: 'Certificació del Guia' },
  { file: 'open-a-microschool/fr/index.html', title: 'Certification du Coordinateur', noWord: 'Certification du Guide' }
];

pages.forEach(p => {
  const content = fs.readFileSync(path.join(ROOT, p.file), 'utf8');
  assert(content.includes(p.title), `${p.file} must include "${p.title}"`);
  assert(!content.includes(p.noWord), `${p.file} must NOT include "${p.noWord}"`);
  console.log(`  ✓ ${p.file}: verified "${p.title}" and absence of "${p.noWord}"`);
});

// 5. Verify language redirect scripts in ES root pages
const msRoot = fs.readFileSync(path.join(ROOT, 'microschools/index.html'), 'utf8');
assert(msRoot.includes("if (!l || l === 'en') { location.replace('/microschools/en/'"), 'microschools/index.html must redirect en by default');

const openMsRoot = fs.readFileSync(path.join(ROOT, 'open-a-microschool/index.html'), 'utf8');
assert(openMsRoot.includes("if (!l || l === 'en') { location.replace('/open-a-microschool/en/'"), 'open-a-microschool/index.html must redirect en by default');
console.log('  ✓ microschools & open-a-microschool root: English default redirect script verified');

console.log('\n🎉 ALL 12 VERIFICATION CHECKS PASSED PERFECTLY!\n');
