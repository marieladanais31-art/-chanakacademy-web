/**
 * Audit test script for Odyssey offerings parity in Utah and Wyoming pages.
 * Validates the 11 offerings loaded in Odyssey, prices, grades, ages, categories,
 * pending banners, i18n parity, and compliance terms.
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..');
const utahHtml = fs.readFileSync(path.join(ROOT, 'utah', 'index.html'), 'utf8');
const scholarshipsUtahHtml = fs.readFileSync(path.join(ROOT, 'scholarships', 'utah', 'index.html'), 'utf8');
const wyomingHtml = fs.readFileSync(path.join(ROOT, 'wyoming', 'index.html'), 'utf8');
const scholarshipsWyomingHtml = fs.readFileSync(path.join(ROOT, 'scholarships', 'wyoming', 'index.html'), 'utf8');

console.log('--- RUNNING ODYSSEY OFFERINGS AUDIT FOR UTAH & WYOMING ---');

let passedTests = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}`);
    console.error(`    ${err.message}`);
    process.exitCode = 1;
  }
}

// 1. Exact file synchronization
test('Utah index.html and scholarships/utah/index.html are 100% identical', () => {
  assert.strictEqual(utahHtml, scholarshipsUtahHtml, 'scholarships/utah/index.html must match utah/index.html');
});

test('Wyoming index.html and scholarships/wyoming/index.html are 100% identical', () => {
  assert.strictEqual(wyomingHtml, scholarshipsWyomingHtml, 'scholarships/wyoming/index.html must match wyoming/index.html');
});

// The 11 Odyssey offerings
const EXPECTED_OFFERINGS = [
  {
    num: 1,
    name: 'Monthly Virtual Academic Support Package - Grades 1-5 (Elementary)',
    price: '$275',
    grades: 'Grades 1-5',
    ages: 'Ages 6-11',
    utahCat: 'Educational Classes',
    wyomingCat: 'Online Classes'
  },
  {
    num: 2,
    name: 'Monthly Virtual Academic Support Package - Grades 6-8 (Middle School)',
    price: '$320',
    grades: 'Grades 6-8',
    ages: 'Ages 11-14',
    utahCat: 'Educational Classes',
    wyomingCat: 'Online Classes'
  },
  {
    num: 3,
    name: 'Monthly Virtual Academic Support Package - Grades 9-12 (High School)',
    price: '$365',
    grades: 'Grades 9-12',
    ages: 'Ages 14-18',
    utahCat: 'Educational Classes',
    wyomingCat: 'Online Classes'
  },
  {
    num: 4,
    name: 'Initial Academic Assessment & Individualized Learning Plan (ILP) Setup',
    price: '$295',
    grades: 'Grades K-12',
    ages: 'Ages 5-18',
    utahCat: 'Educational Classes',
    wyomingCat: 'WY School Fees'
  },
  {
    num: 5,
    name: 'ABC Reading Online Classes - Grades K-1 (Ages 5-6) - Monthly',
    price: '$1,600',
    grades: 'Grades K-1',
    ages: 'Ages 5-6',
    utahCat: 'Educational Classes',
    wyomingCat: 'Online Classes'
  },
  {
    num: 6,
    name: 'Elementary Life Skills, Character & Habits Workshop (1x/week) - Grades K-5',
    price: '$120',
    grades: 'Grades K-5',
    ages: 'Ages 5-11',
    utahCat: 'Educational Classes',
    wyomingCat: 'Study Skills'
  },
  {
    num: 7,
    name: 'Middle School Leadership & Practical Life Skills Workshop (1x/week) - Grades 6-8',
    price: '$120',
    grades: 'Grades 6-8',
    ages: 'Ages 11-14',
    utahCat: 'Educational Classes',
    wyomingCat: 'Study Skills'
  },
  {
    num: 8,
    name: 'High School Leadership, Ethics & Career Readiness Workshop (1x/week) - Grades 9-12',
    price: '$120',
    grades: 'Grades 9-12',
    ages: 'Ages 14-18',
    utahCat: 'Educational Classes',
    wyomingCat: 'Study Skills'
  },
  {
    num: 9,
    name: 'Spanish Language & Literacy Live Classes (2x/week) - Monthly',
    price: '$240',
    grades: 'Grades K-12',
    ages: 'Ages 5-18',
    utahCat: 'Educational Classes',
    wyomingCat: 'Online Classes'
  },
  {
    num: 10,
    name: 'Academic English & Literacy Live Classes (2x/week) - Monthly',
    price: '$240',
    grades: 'Grades K-12',
    ages: 'Ages 5-18',
    utahCat: 'Educational Classes',
    wyomingCat: 'Online Classes'
  },
  {
    num: 11,
    name: 'Live Interactive Classes Bundle: Spanish, English & Life Skills - Monthly',
    price: '$520',
    grades: 'Grades K-12',
    ages: 'Ages 5-18',
    utahCat: 'Educational Classes',
    wyomingCat: 'Online Classes'
  }
];

// 2. All 11 offerings present in Utah
test('All 11 Odyssey offerings correctly present in Utah index.html', () => {
  for (const item of EXPECTED_OFFERINGS) {
    assert(utahHtml.includes(item.name), `Utah page missing offering name: ${item.name}`);
    assert(utahHtml.includes(item.price), `Utah page missing offering price: ${item.price} for ${item.name}`);
    assert(utahHtml.includes(item.utahCat), `Utah page missing category "${item.utahCat}" for ${item.name}`);
  }
});

// 3. All 11 offerings present in Wyoming
test('All 11 Odyssey offerings correctly present in Wyoming index.html', () => {
  for (const item of EXPECTED_OFFERINGS) {
    assert(wyomingHtml.includes(item.name), `Wyoming page missing offering name: ${item.name}`);
    assert(wyomingHtml.includes(item.price), `Wyoming page missing offering price: ${item.price} for ${item.name}`);
    assert(wyomingHtml.includes(item.wyomingCat), `Wyoming page missing category "${item.wyomingCat}" for ${item.name}`);
  }
});

// 4. Pending notices check
test('Pending approval notices in Utah and Wyoming (EN and ES)', () => {
  const pendingEn = 'Payment using scholarship funds is subject to program requirements and offering approval.';
  const pendingEs = 'El pago con fondos de la beca está sujeto a los requisitos del programa y a la aprobación de la oferta.';
  const pillEn = 'Pending approval in Odyssey';
  const pillEs = 'Pendiente de aprobación en Odyssey';

  for (const [name, content] of [['Utah', utahHtml], ['Wyoming', wyomingHtml]]) {
    assert(content.includes(pendingEn), `${name} missing pending EN disclaimer: "${pendingEn}"`);
    assert(content.includes(pendingEs), `${name} missing pending ES disclaimer: "${pendingEs}"`);
    assert(content.includes(pillEn), `${name} missing pending EN pill: "${pillEn}"`);
    assert(content.includes(pillEs), `${name} missing pending ES pill: "${pillEs}"`);
  }
});

// 5. Mentor time standardization
test('Mentor time standardized to 2 hrs/mo per student (about 30 min/week)', () => {
  const mentorEn = 'Two hours per month of mentor time per student (about 30 minutes per week)';
  const mentorEs = 'Dos horas al mes de tiempo de mentoría por estudiante (aproximadamente 30 minutos a la semana)';

  for (const [name, content] of [['Utah', utahHtml], ['Wyoming', wyomingHtml]]) {
    assert(content.includes(mentorEn), `${name} missing standardized mentor time in EN`);
    assert(content.includes(mentorEs), `${name} missing standardized mentor time in ES`);
  }
});

// 6. Prohibited words check
test('Zero occurrences of prohibited words (diagnost, tutoring, etc.)', () => {
  for (const [name, content] of [['Utah', utahHtml], ['Wyoming', wyomingHtml]]) {
    assert(!/diagnost/i.test(content), `${name} contains forbidden word 'diagnost'`);
    assert(!/\btutoring\b/i.test(content), `${name} contains forbidden word 'tutoring'`);
    assert(!/\btutoría\b/i.test(content), `${name} contains forbidden word 'tutoría'`);
    assert(!/\btutoria\b/i.test(content), `${name} contains forbidden word 'tutoria'`);
  }
});

// 7. Accreditation check
test('Accreditation candidate status (candidate for MSA-CESS, never accredited)', () => {
  for (const [name, content] of [['Utah', utahHtml], ['Wyoming', wyomingHtml]]) {
    assert(!/\baccredited school\b/i.test(content), `${name} contains forbidden claim 'accredited school'`);
    assert(!/\bescuela acreditada\b/i.test(content), `${name} contains forbidden claim 'escuela acreditada'`);
    assert(content.includes('MSA-CESS Candidate') || content.includes('candidate for MSA-CESS accreditation'), `${name} missing candidate status`);
  }
});

// 8. i18n parity check for both Utah and Wyoming
function checkI18nParity(pageName, html) {
  test(`${pageName} 100% dictionary key parity between EN and ES`, () => {
    const esMatch = html.match(/es:\s*\{([\s\S]*?)\n\s*\},/);
    const enMatch = html.match(/en:\s*\{([\s\S]*?)\n\s*\}\n\s*\};/);
    assert(esMatch, `${pageName}: i18nData.es must exist`);
    assert(enMatch, `${pageName}: i18nData.en must exist`);

    const extractKeys = (block) => {
      const keys = [];
      const lines = block.split('\n');
      for (const l of lines) {
        const m = l.match(/^\s*([a-zA-Z0-9_]+):/);
        if (m) keys.push(m[1]);
      }
      return keys;
    };

    const esKeys = extractKeys(esMatch[1]);
    const enKeys = extractKeys(enMatch[1]);

    const missingInEn = esKeys.filter(k => !enKeys.includes(k));
    const missingInEs = enKeys.filter(k => !esKeys.includes(k));

    assert.strictEqual(missingInEn.length, 0, `${pageName}: Keys in ES missing in EN: ${missingInEn.join(', ')}`);
    assert.strictEqual(missingInEs.length, 0, `${pageName}: Keys in EN missing in ES: ${missingInEs.join(', ')}`);
    assert(esKeys.length >= 100, `${pageName}: Expected at least 100 keys, found ${esKeys.length}`);
  });
}

checkI18nParity('Utah', utahHtml);
checkI18nParity('Wyoming', wyomingHtml);

console.log(`\nALL ${passedTests} AUDIT TESTS PASSED!`);
