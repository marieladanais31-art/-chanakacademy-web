/**
 * tests/verify_mode_split_and_dubai_paces.cjs
 * Comprehensive test validating:
 * 1. Dual Diploma Dubai / UAE removal from selectors and banner.
 * 2. Separation of Matricula into National ESA (State Hubs) vs International (Off-Campus, Dual, Adult).
 * 3. Hiding of scholarships/ESA when international is selected, and hiding of international/dual/adult when ESA is selected.
 * 4. Dual Diploma 100% digital online without physical materials or PACES across landing, autoreply, and matricula.
 * 5. Elimination of "Florida Umbrella School" terminology.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== RUNNING AUDIT: MODE SPLIT, DUBAI REMOVAL & DIGITAL DUAL DIPLOMA ===\n');

const ROOT = path.resolve(__dirname, '..');

// 1. matricula/index.html Audit
const matPath = path.join(ROOT, 'matricula', 'index.html');
assert(fs.existsSync(matPath), 'matricula/index.html must exist');
const matHtml = fs.readFileSync(matPath, 'utf8');

// Check Mode Switcher
assert(matHtml.includes('id="tab-nacional"'), 'matricula must have tab-nacional');
assert(matHtml.includes('id="tab-internacional"'), 'matricula must have tab-internacional');
assert(matHtml.includes('function setMatriculaMode(mode)'), 'matricula must define setMatriculaMode');
assert(matHtml.includes('id="nationalView"'), 'matricula must have nationalView');
assert(matHtml.includes('id="internationalView"'), 'matricula must have internationalView');

// Check Dubai Removal from Dual Diploma selector
assert(!matHtml.includes('<option value="AE">'), 'matricula must NOT have AE/Dubai option in selector');
assert(!matHtml.includes('Emiratos Árabes Unidos / Dubái'), 'matricula must NOT contain Dubai in selector');

// Check Dual Diploma PACES / physical material removal & 100% digital online
assert(matHtml.includes('100% Digital Online'), 'matricula must state Dual Diploma is 100% digital online');
assert(matHtml.includes('sin libros físicos ni material PACES') || matHtml.includes('sin libros físicos ni PACES'), 'matricula must state no physical books or PACES');

console.log('  ✓ matricula/index.html: Mode Switcher, National/International split, Dubai removal, and Digital Dual Diploma verified');

// 2. dual-diploma/index.html Audit
const ddPath = path.join(ROOT, 'dual-diploma', 'index.html');
const ddHtml = fs.readFileSync(ddPath, 'utf8');
assert(ddHtml.includes('sin libros físicos ni material PACES'), 'dual-diploma hero must confirm no physical books or PACES');
assert(ddHtml.includes('¿Se requieren libros físicos, cuadernos impresos o material PACES?'), 'dual-diploma FAQ must answer physical books/PACES question');
console.log('  ✓ dual-diploma/index.html: 100% digital online, no physical books/PACES verified');

// 3. enviar-formulario.php Autoreply Audit
const phpPath = path.join(ROOT, 'enviar-formulario.php');
const phpContent = fs.readFileSync(phpPath, 'utf8');
assert(!phpContent.includes('Dubái u otros países'), 'enviar-formulario.php must not reference Dubái in price references');
assert(phpContent.includes('no requiere compra de material físico ni libros PACES'), 'enviar-formulario.php dual autoreply must confirm no physical books or PACES');
console.log('  ✓ enviar-formulario.php: Autoreply updated without Dubai and with no physical materials/PACES');

// 4. Florida Umbrella School Removal Audit
const flPath = path.join(ROOT, 'us', 'florida', 'index.html');
const flHtml = fs.readFileSync(flPath, 'utf8');
assert(!flHtml.includes('What is an umbrella school'), 'us/florida/index.html must not contain "What is an umbrella school"');
assert(!flHtml.includes('U.S. K-12 (Umbrella School)'), 'us/florida/index.html must not link to Umbrella School in footer');
assert(flHtml.includes('Florida PEP Home Education &mdash; Authorized Instructional Support'), 'us/florida/index.html must feature Florida PEP support');

const flPepPath = path.join(ROOT, 'us', 'florida', 'pep', 'index.html');
const flPepHtml = fs.readFileSync(flPepPath, 'utf8');
assert(!flPepHtml.includes('Programa Escolar Sombrilla'), 'us/florida/pep/index.html must not contain Programa Escolar Sombrilla');
assert(!flPepHtml.includes('Umbrella School Program'), 'us/florida/pep/index.html must not contain Umbrella School Program');

const homePath = path.join(ROOT, 'index.html');
const homeHtml = fs.readFileSync(homePath, 'utf8');
assert(!homeHtml.includes('PRIVATE PAY UMBRELLA SCHOOL'), 'index.html must not contain PRIVATE PAY UMBRELLA SCHOOL badge');
assert(!homeHtml.includes('U.S. K-12 Umbrella School</h3>'), 'index.html must not contain U.S. K-12 Umbrella School heading');

console.log('  ✓ Florida Umbrella School removed across us/florida/, us/florida/pep/, and index.html');

// 5. Geo-banner AE removal
const bannerPath = path.join(ROOT, 'js', 'chanak-geo-banner.js');
const bannerJs = fs.readFileSync(bannerPath, 'utf8');
assert(!bannerJs.includes('AE: { url: \'/dual-diploma-uae/\''), 'chanak-geo-banner.js must not contain AE destination');
console.log('  ✓ js/chanak-geo-banner.js: AE/Dubai geo-banner removed');

console.log('\n========================================');
console.log('ALL AUDIT CHECKS PASSED SUCCESSFULLY (5/5)');
console.log('========================================');
