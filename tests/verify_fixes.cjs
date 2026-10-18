const fs = require('fs');
const path = require('path');
const assert = require('assert');

const projectRoot = '/Users/marielaandrade/.gemini/antigravity/scratch/chanakacademy-web';
console.log('=== RUNNING TARGETED VERIFICATION AUDIT ===\n');

// 1. STATE PAGES: Zero visible JS, switchLanguage defined, exactly 6 bullets in service cards
const stateFiles = [
  'utah/index.html', 'scholarships/utah/index.html',
  'wyoming/index.html', 'scholarships/wyoming/index.html',
  'arizona/index.html', 'scholarships/arizona/index.html',
  'alabama/index.html', 'scholarships/alabama/index.html',
  'south-carolina/index.html', 'scholarships/south-carolina/index.html',
  'new-hampshire/index.html', 'scholarships/new-hampshire/index.html'
];

stateFiles.forEach(file => {
  const fullPath = path.join(projectRoot, file);
  const content = fs.readFileSync(fullPath, 'utf8');
  
  // Verify footer closes properly before script
  assert(content.includes('</div>\n  </footer>\n\n  <script>\n    const i18nData ='), `${file}: script boundary is broken!`);
  
  // Verify no const i18nData outside script
  const bodyTextBeforeScript = content.split('<script>')[0];
  assert(!bodyTextBeforeScript.includes('const i18nData'), `${file}: has visible const i18nData!`);
  
  // Verify switchLanguage is present in script
  assert(content.includes('function switchLanguage(lang)'), `${file}: missing switchLanguage function!`);
  
  // Verify pricing cards have exactly 6 list items
  const cardMatches = content.match(/<ul class="pricing-features">([\s\S]*?)<\/ul>/g) || [];
  assert(cardMatches.length >= 3, `${file}: expected at least 3 pricing cards, got ${cardMatches.length}`);
  cardMatches.forEach((card, idx) => {
    const lis = card.match(/<li/g) || [];
    assert.strictEqual(lis.length, 6, `${file} card ${idx}: expected exactly 6 features, found ${lis.length}`);
  });
  
  // Verify CTA links carry service & grade
  assert(content.includes('service=support-k5&grade=K-5') || content.includes('service=support-k5&amp;grade=K-5'), `${file}: missing K-5 specific CTA link params`);
  assert(content.includes('service=support-68&grade=6-8') || content.includes('service=support-68&amp;grade=6-8'), `${file}: missing 6-8 specific CTA link params`);
  assert(content.includes('service=support-912&grade=9-12') || content.includes('service=support-912&amp;grade=9-12'), `${file}: missing 9-12 specific CTA link params`);
  
  // Verify error handling in handleFormSubmit
  assert(content.includes('if (!res.ok || (data && data.success === false))'), `${file}: handleFormSubmit lacks robust status verification`);
  assert(content.includes("errBox.id = 'formErrorBox';"), `${file}: handleFormSubmit lacks recoverable error alert`);
  
  console.log(`  ✓ ${file}: boundaries, switchLanguage, 6-feature cards, and form handling verified`);
});

// 2. MATRICULA FLOW
const matContent = fs.readFileSync(path.join(projectRoot, 'matricula/index.html'), 'utf8');
assert(matContent.includes('function handleServiceChange()'), 'matricula: missing handleServiceChange');
assert(matContent.includes('function handleGradeSync()'), 'matricula: missing handleGradeSync');
assert(matContent.includes('support-k5'), 'matricula: missing support-k5 service mapping');
assert(matContent.includes('if (response.ok && result && (result.ok || result.success))'), 'matricula: submitApplication lacks robust error check');
assert(matContent.includes('matriculaErrorBox'), 'matricula: missing recoverable error alert container');
console.log('  ✓ matricula/index.html: bidirectional grade/service sync, URL param mapping, robust submit verified');

// 3. REGIONAL PRICING (/mes/mes bug)
const offContent = fs.readFileSync(path.join(projectRoot, 'off-campus/index.html'), 'utf8');
const offEnContent = fs.readFileSync(path.join(projectRoot, 'off-campus/en/index.html'), 'utf8');
assert(!offContent.includes('/mes/mes'), 'off-campus/index.html contains /mes/mes');
assert(!offEnContent.includes('/month/month'), 'off-campus/en/index.html contains /month/month');

const progLandingJs = fs.readFileSync(path.join(projectRoot, 'assets/js/program-landing.js'), 'utf8');
assert(progLandingJs.includes('/(mes|mo|month)/i'), 'assets/js/program-landing.js lacks guard against duplicate suffix');

const regPricingJs = fs.readFileSync(path.join(projectRoot, 'js/regional-pricing.js'), 'utf8');
assert(regPricingJs.includes('/(mes|mo|month)/i'), 'js/regional-pricing.js lacks guard against duplicate suffix');
console.log('  ✓ off-campus pricing: duplicate /mes/mes bug fixed cleanly with regex guards');

// 4. HOMEPAGE ENGLISH VERSION & PRIVACY LINKS
const indexContent = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
assert(indexContent.includes('data-i18n="rd_off_title"'), 'index.html missing rd_off_title');
assert(indexContent.includes('data-i18n="rd_state_note"'), 'index.html missing rd_state_note');
assert(indexContent.includes('data-i18n-ph="f_wapp_ph"'), 'index.html missing f_wapp_ph');
assert(indexContent.includes('data-i18n-ph="f_age_ph"'), 'index.html missing f_age_ph');
assert(indexContent.includes('data-i18n-ph="f_msg_ph"'), 'index.html missing f_msg_ph');
assert(indexContent.includes('data-i18n="f_sit_lbl"'), 'index.html missing f_sit_lbl');
assert(indexContent.includes('data-i18n="f_etapa_lbl"'), 'index.html missing f_etapa_lbl');
assert(indexContent.includes('"rd_off_title":"Guided Homeschooling"'), 'index.html missing Guided Homeschooling translation');
assert(indexContent.includes('f_wapp:"Contact phone number"'), 'index.html missing Contact phone number translation in EN');
assert(indexContent.includes('"Student\'s current educational situation"'), 'index.html missing EN translation for situation label');
assert(indexContent.includes('"Current educational stage"'), 'index.html missing EN translation for stage label');
assert(indexContent.includes('FORM_SELECT_OPTIONS'), 'index.html missing FORM_SELECT_OPTIONS');
assert(indexContent.includes('data-i18n-ph'), 'index.html setLang lacks placeholder translation');
assert(!indexContent.includes("showLegal('privacidad')"), 'index.html contains invalid privacy href=#');
assert(indexContent.includes("href='/privacidad/'"), 'index.html missing real /privacidad/ link in ES');
assert(indexContent.includes("href='/privacidad/en/'"), 'index.html missing real /privacidad/en/ link in EN');
assert(indexContent.includes('if(!response.ok||result.success!==true)'), 'index.html sendEmail lacks response.ok check');
assert(indexContent.includes("errorBox.textContent=document.documentElement.lang==='en'"), 'index.html sendEmail lacks localized error box');
console.log('  ✓ index.html: English translations, placeholders, select options, privacy links, and error handling verified');

// 5. ACADEMIC CLARITY (FAQ fq1_a)
assert(indexContent.includes('Al matricularse formalmente en el colegio privado registrado de Chanak Academy'), 'index.html missing academic clarification in ES');
assert(indexContent.includes("When formally enrolled in Chanak Academy's registered private school"), 'index.html missing academic clarification in EN');
assert(indexContent.includes('candidato oficial a la acreditación con MSA-CESS (la candidatura es una fase formal y no equivale todavía a acreditación completa)'), 'index.html missing exact MSA-CESS candidate disclaimer in ES');
assert(indexContent.includes('official candidate for accreditation with MSA-CESS (candidacy is a formal preliminary stage and does not yet constitute full accreditation)'), 'index.html missing exact MSA-CESS candidate disclaimer in EN');
console.log('  ✓ Homepage FAQ: diploma clarity and MSA-CESS candidacy preserved accurately');

console.log('\n🎉 ALL TARGETED AUDIT VERIFICATION CHECKS PASSED PERFECTLY!');
