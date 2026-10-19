/**
 * Static analysis and unit test for server-side validation in enviar-formulario.php
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const phpPath = path.resolve(__dirname, '..', 'enviar-formulario.php');
const phpCode = fs.readFileSync(phpPath, 'utf8');

console.log('--- AUDITING SERVER-SIDE VALIDATION IN ENVIAR-FORMULARIO.PHP ---');

// 1. Check scholarships hub detection
assert(phpCode.includes("$isScholarshipsHub = ("), 'Must identify scholarships hub submission');
assert(phpCode.includes("first_value($data, ['necesidad']) === 'classwallet'"), 'Must check necesidad === classwallet');
assert(phpCode.includes("stripos(first_value($data, ['origen', 'origin']), 'scholarships') !== false"), 'Must check origin for scholarships');
console.log('  ✓ Scholarships Hub detection logic verified');

// 2. Check required field validation for scholarships
assert(phpCode.includes("if ($isScholarshipsHub) {"), 'Must have isolated scholarships validation block');
assert(phpCode.includes("if (trim($name) === '')"), 'Must check empty name');
assert(phpCode.includes("Por favor indica tu nombre completo"), 'Must return error message for missing name');

assert(phpCode.includes("$stateVal = first_value($data, ['state', 'estado', 'residence_state']);"), 'Must check state parameter');
assert(phpCode.includes("if (trim($stateVal) === '')"), 'Must check empty state');
assert(phpCode.includes("Por favor selecciona tu estado de residencia"), 'Must return error message for missing state');

assert(phpCode.includes("$consentVal = strtolower(first_value($data, ['consentimiento_consulta', 'privacy', 'fPrivacy', 'consent']));"), 'Must check consent parameter');
assert(phpCode.includes("Por favor acepta la casilla de consentimiento para continuar"), 'Must return error message for missing consent');
console.log('  ✓ Required field validation (name, state, consent) verified');

// 3. Check Brevo attribute IDIOMA_PREFERIDO
assert(phpCode.includes("$preferredLang = first_value($data, ['preferred_language', 'idioma_atencion']);"), 'Must extract preferred language');
assert(phpCode.includes("$brevoExtraAttributes['IDIOMA_PREFERIDO'] = $preferredLang;"), 'Must set IDIOMA_PREFERIDO in Brevo extra attributes');
console.log('  ✓ Brevo IDIOMA_PREFERIDO attribute verified');

console.log('--- PHP SERVER-SIDE VALIDATION AUDIT PASSED ---');
