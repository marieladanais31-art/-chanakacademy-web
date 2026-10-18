const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const REQUIRED_IMAGES = [
  'assets/img/portals/portal-joint.webp',
  'assets/img/portals/portal-family.webp',
  'assets/img/portals/portal-family-records.webp',
  'assets/img/portals/portal-student.webp',
  'assets/img/portals/portal-character-lifeskills.webp'
];

const PAGES = [
  'wyoming/index.html',
  'scholarships/wyoming/index.html',
  'utah/index.html',
  'scholarships/utah/index.html',
  'arizona/index.html',
  'scholarships/arizona/index.html',
  'alabama/index.html',
  'scholarships/alabama/index.html',
  'south-carolina/index.html',
  'scholarships/south-carolina/index.html',
  'new-hampshire/index.html',
  'scholarships/new-hampshire/index.html',
  'florida-home-education/index.html',
  'us/florida/index.html',
  'off-campus/index.html',
  'off-campus/en/index.html',
  'index.html'
];

console.log('=== 1. VERIFYING IMAGE ASSETS ON DISK ===');
let imageErrors = 0;
for (const relPath of REQUIRED_IMAGES) {
  const fullPath = path.join(ROOT, relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ MISSING IMAGE: ${relPath}`);
    imageErrors++;
  } else {
    const stat = fs.statSync(fullPath);
    console.log(`✅ ${relPath} (${stat.size} bytes)`);
  }
}

const logoPath = path.join(ROOT, 'assets/chanak-logo.png');
if (!fs.existsSync(logoPath)) {
  console.error('❌ Official logo missing at assets/chanak-logo.png');
  imageErrors++;
} else {
  console.log(`✅ Official logo intact at assets/chanak-logo.png (${fs.statSync(logoPath).size} bytes)`);
}

if (imageErrors > 0) {
  console.error(`Failed with ${imageErrors} image errors.`);
  process.exit(1);
}

console.log('\n=== 2. AUDITING SHOWCASE INTEGRATION ACROSS ALL PAGES ===');
let pageErrors = 0;

for (const relPage of PAGES) {
  const fullPage = path.join(ROOT, relPage);
  if (!fs.existsSync(fullPage)) {
    console.error(`❌ PAGE NOT FOUND: ${relPage}`);
    pageErrors++;
    continue;
  }

  const html = fs.readFileSync(fullPage, 'utf8');
  const checks = [];

  // 1. CSS link
  if (!html.includes('portal-showcase.css')) checks.push('Missing portal-showcase.css');

  // 2. JS modal
  if (!html.includes('portal-modal.js')) checks.push('Missing portal-modal.js');

  // 3. Section id
  if (!html.includes('id="portales"')) checks.push('Missing id="portales"');

  // 4. All 5 images referenced
  if (!html.includes('portal-joint.webp')) checks.push('Missing portal-joint.webp reference');
  if (!html.includes('portal-family.webp')) checks.push('Missing portal-family.webp reference');
  if (!html.includes('portal-student.webp')) checks.push('Missing portal-student.webp reference');
  if (!html.includes('portal-family-records.webp')) checks.push('Missing portal-family-records.webp reference');
  if (!html.includes('portal-character-lifeskills.webp')) checks.push('Missing portal-character-lifeskills.webp reference');

  // 5. Disclaimer presence
  const hasDisclaimer = html.includes('Features and access vary by enrolled program') ||
                        html.includes('Las funciones y el acceso varían según el programa contratado');
  if (!hasDisclaimer) checks.push('Missing legal disclaimer');

  // 6. data-portal-preview triggers
  if (!html.includes('data-portal-preview')) checks.push('Missing data-portal-preview triggers');

  if (checks.length === 0) {
    console.log(`✅ ${relPage} passed all checks`);
  } else {
    console.error(`❌ ${relPage} FAILED:`);
    checks.forEach(c => console.error(`   - ${c}`));
    pageErrors++;
  }
}

console.log('\n=== 3. AUDITING COMPLIANCE & PRIVACY SAFEGUARDS ===');
let complianceErrors = 0;
for (const relPage of PAGES) {
  const fullPage = path.join(ROOT, relPage);
  const html = fs.readFileSync(fullPage, 'utf8');

  // Check no accidental student full names / leaked session tokens in preview HTML
  if (html.includes('app.chanakacademy.org/session') || html.includes('auth_token=')) {
    console.error(`❌ ${relPage} contains live auth tokens or session links!`);
    complianceErrors++;
  }
}

if (complianceErrors === 0) {
  console.log('✅ No sensitive session tokens or live session links found in previews.');
}

if (pageErrors > 0 || complianceErrors > 0) {
  console.error(`\n❌ Audit finished with ${pageErrors} page errors and ${complianceErrors} compliance errors.`);
  process.exit(1);
} else {
  console.log('\n🎉 ALL 16 PAGES PASSED PORTAL SHOWCASE AUDIT SUCCESSFULLY!');
}
