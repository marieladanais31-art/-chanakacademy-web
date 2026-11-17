/* Presupuesto Microschool por alcance: el núcleo web (assets/js/cx-budget-core.js) debe dar lo mismo que la hoja de cálculo
   (resultados esperados en tests/fixtures/budget_expected.json, generados con tools/test_hoja_presupuesto.py) y cumplir las reglas del encargo. */
const fs = require('fs'), path = require('path'), assert = require('assert');
const ROOT = path.resolve(__dirname, '..');
const B = require(path.join(ROOT, 'assets/js/cx-budget-core.js'));
const P = JSON.parse(fs.readFileSync(path.join(ROOT, 'assets/data/presupuesto-alcance.json'), 'utf8'));
const FX = JSON.parse(fs.readFileSync(path.join(ROOT, 'tests/fixtures/budget_expected.json'), 'utf8'));
let passed = 0;
function test(name, fn) { try { fn(); console.log('  ✓', name); passed++; } catch (e) { console.error('  ✗ FAIL:', name, '\n    ', e.message); process.exitCode = 1; } }
const close = (a, b, m) => assert(Math.abs(Number(a) - Number(b)) < 1e-6, `${m}: web ${a} ≠ hoja ${b}`);
const withParams = (q) => { const X = JSON.parse(JSON.stringify(P)); if (q) { for (const k of ['coste_guia', 'mat_inicial', 'tec_inicial', 'mat_mensual']) if (q[k]) q[k].forEach((v, i) => X.tramos[i][k] = v); if (q.coord !== undefined) X.coordinador.coste = q.coord; } return X; };
const stateOf = (sc) => ({ fee: sc.fee, other: sc.other, grants: sc.grants, students: sc.students, mon: sc.mon, inv: sc.inv });

console.log('--- PRESUPUESTO POR ALCANCE: paridad web ↔ hoja ---');
for (const [name, fx] of Object.entries(FX)) {
  test(`escenario «${name}»: los 5 alcances coinciden con la hoja`, () => {
    const X = withParams(fx.input.params);
    P.alcances.forEach((a) => {
      const w = B.compute(X, stateOf(fx.input), a.id), e = fx.expected[a.name].compare;
      close(w.total, e.total, a.name + ' alumnos'); close(w.staff, e.staff, a.name + ' personal'); close(w.gasto, e.gasto, a.name + ' gasto');
      close(w.ingresos, e.ingresos, a.name + ' ingresos'); close(w.neto, e.neto, a.name + ' neto'); close(w.inv, e.inv, a.name + ' inversión');
      close(w.coord, e.coord, a.name + ' coordinadores'); close(w.equil === null ? 0 : w.equil, e.equil, a.name + ' equilibrio');
      e.guias.forEach((g, k) => close(w.guias[k], g, a.name + ' guías tramo ' + (k + 1)));
      if (e.payback === 'No se recupera') assert.strictEqual(w.payback, null, a.name + ' recuperación'); else close(w.payback, e.payback, a.name + ' recuperación');
    });
  });
}
const ref = FX['referencia'].input, S = stateOf(ref);
test('caso de referencia (cuota 400, gasto 5.200, 10 alumnos): 13 para el equilibrio en TODOS los alcances que incluyen el tramo', () => {
  ['alcance1', 'alcance2', 'alcance5'].forEach((id) => assert.strictEqual(B.compute(P, S, id).equil, 13, id));
});
test('Escuela completa con alumnos solo en un tramo = mismo resultado que el alcance equivalente', () => {
  const full = B.compute(P, S, 'alcance5'), kin = B.compute(P, S, 'alcance1');
  ['total', 'gasto', 'ingresos', 'neto', 'equil', 'inv'].forEach((k) => assert.strictEqual(full[k], kin[k], k));
});
test('los tramos fuera del alcance quedan a 0 (aunque se hayan escrito alumnos)', () => {
  const r = B.compute(P, { ...S, students: [10, 10, 10, 10] }, 'alcance3');   // Middle (6–8)
  assert.deepStrictEqual(r.students, [0, 0, 10, 0]);
  const k = B.compute(P, { ...S, students: [10, 10, 10, 10] }, 'alcance1');
  assert.deepStrictEqual(k.students, [10, 0, 0, 0]);
});
test('Escuela completa = suma de los tramos (alumnos, ingresos y guías)', () => {
  const st = { ...S, students: [12, 15, 20, 25], fee: 450 };
  const full = B.compute(P, st, 'alcance5');
  const parts = [0, 1, 2, 3].map((k) => B.compute(P, { ...st, students: st.students.map((v, i) => (i === k ? v : 0)) }, 'alcance5'));
  assert.strictEqual(full.total, parts.reduce((a, r) => a + r.total, 0));
  assert.strictEqual(full.ingresos, parts.reduce((a, r) => a + r.total * 450, 0));
  assert.deepStrictEqual(full.guias, [0, 1, 2, 3].map((k) => parts[k].guias[k]));
});
test('el coordinador académico aparece con alumnos en 2 o más etapas, no con una sola', () => {
  assert.strictEqual(B.compute(P, { ...S, students: [10, 10, 0, 0] }, 'alcance2').coord, 0);   // K–5 = una sola etapa (Elementary)
  assert.strictEqual(B.compute(P, { ...S, students: [10, 0, 10, 0] }, 'alcance5').coord, 1);
  assert.strictEqual(B.compute(P, { ...S, students: [10, 10, 10, 10] }, 'alcance5').coord, 1);
});
test('versión pública: solo la inversión de incorporación (3.500); cuota mensual y por alumno vacías', () => {
  assert.strictEqual(P.cuotas_chanak.incorporacion, 3500); assert.strictEqual(P.cuotas_chanak.fija_mensual, null); assert.strictEqual(P.cuotas_chanak.por_alumno, null);
  const r = B.compute(P, { ...S, students: [10, 10, 10, 10] }, 'alcance5');
  assert.strictEqual(r.chanak, 0); assert.strictEqual(r.invCuota, 3500);
});
test('con cuotas Chanak precargadas (versión de propuesta) se aplican solo a los alumnos de los tramos activos', () => {
  const X = JSON.parse(JSON.stringify(P)); X.cuotas_chanak = { incorporacion: 500, fija_mensual: 100, por_alumno: 10 };
  const r = B.compute(X, { ...S, students: [10, 10, 10, 10] }, 'alcance3');   // Middle: 10 alumnos activos
  assert.strictEqual(r.chanak, 100 + 10 * 10); assert.strictEqual(r.invCuota, 500);
});
test('las partidas de inversión condicionadas al alcance solo suman donde aplican', () => {
  const st = { ...S, inv: { laboratorio: 3000, manipulativos: 800 } };
  assert.strictEqual(B.compute(P, st, 'alcance1').invPart, 800);      // Kinder: manipulativos sí, laboratorio no
  assert.strictEqual(B.compute(P, st, 'alcance3').invPart, 3000);     // Middle: laboratorio sí
  assert.strictEqual(B.compute(P, st, 'alcance5').invPart, 3800);     // completa: ambas
});
test('los supuestos por tramo vienen de la hoja y los importes están vacíos', () => {
  assert.strictEqual(P.alcances.length, 5); assert.strictEqual(P.tramos.length, 4);
  P.tramos.forEach((t) => { assert(t.ratio > 0 && t.aula > 0 && t.m2 > 0); ['coste_guia', 'mat_inicial', 'tec_inicial', 'mat_mensual'].forEach((k) => assert.strictEqual(t[k], null, k)); });
  assert(P.tramos[0].ratio < P.tramos[3].ratio, 'K–2 con ratio más bajo que secundaria');
});
console.log(`\n${passed} comprobaciones superadas`);
