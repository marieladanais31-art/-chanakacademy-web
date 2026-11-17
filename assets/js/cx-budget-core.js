/* Núcleo de cálculo del presupuesto de Microschool por ALCANCE (sin DOM; funciona en el navegador y en Node).
   Reproduce las fórmulas de assets/descargas/Calculadora-Presupuesto-Microschool-Chanak-ES.xlsx.
   Los parámetros (P) vienen de assets/data/presupuesto-alcance.json, generado desde la hoja Parametros_alcance:
   la web no duplica ningún número. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(); else root.CXB = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  function n(v) {
    if (v === null || v === undefined || v === '') return 0;
    v = parseFloat(String(v).replace(/\s/g, '').replace(',', '.'));
    return isFinite(v) && v > 0 ? v : 0;
  }
  function ru(x) { return Math.ceil(Math.round(x * 1e9) / 1e9); }   // ROUNDUP(x,0) para x ≥ 0, sin ruido de coma flotante
  function dot(a, b) { var s = 0; for (var i = 0; i < a.length; i++) s += (a[i] || 0) * (b[i] || 0); return s; }
  function scopeOf(P, id) { for (var i = 0; i < P.alcances.length; i++) if (P.alcances[i].id === id) return P.alcances[i]; return null; }

  /* S = { fee, other, grants, students:[4], inv:{id:amount}, mon:{id:amount}, extraInv:[amounts], extraMon:[amounts] } */
  function compute(P, S, scopeId) {
    var sc = scopeOf(P, scopeId), flags = sc ? sc.flags : [0, 0, 0, 0], ch = P.cuotas_chanak || {};
    var fee = n(S.fee), other = n(S.other), grants = n(S.grants);
    var students = P.tramos.map(function (t, k) { return flags[k] ? n(S.students[k]) : 0; });
    var total = students.reduce(function (a, b) { return a + b; }, 0);
    var guias = students.map(function (a, k) { return a > 0 ? ru(a / P.tramos[k].ratio) : 0; });
    var aulas = students.map(function (a, k) { return a > 0 ? ru(a / P.tramos[k].aula) : 0; });
    var m2 = students.map(function (a, k) { return a * n(P.tramos[k].m2); });
    var etapas = {}; students.forEach(function (a, k) { if (a > 0) etapas[P.tramos[k].etapa] = 1; });
    var nEtapas = Object.keys(etapas).length;
    var coord = nEtapas >= P.coordinador.min_etapas ? P.coordinador.numero : 0;
    var staff = 0; guias.forEach(function (g, k) { staff += g * n(P.tramos[k].coste_guia); }); staff += coord * n(P.coordinador.coste);
    var mat = 0; students.forEach(function (a, k) { mat += a * n(P.tramos[k].mat_mensual); });
    var chanak = n(ch.fija_mensual) + n(ch.por_alumno) * total;
    var manual = 0; P.gasto.forEach(function (it) { if (!it.custom) manual += n((S.mon || {})[it.id]); });
    (S.extraMon || []).forEach(function (v) { manual += n(v); });
    var gasto = staff + mat + chanak + manual;
    var ingresos = fee * total + other - grants, neto = ingresos - gasto;
    var equil = fee > 0 ? Math.max(0, ru((gasto - other + grants) / fee)) : null;
    var invPart = 0, applies = {};
    P.inversion.forEach(function (it) {
      if (it.custom) return;
      var ok = dot(it.flags, flags) > 0; applies[it.id] = ok;
      if (ok) invPart += n((S.inv || {})[it.id]);
    });
    (S.extraInv || []).forEach(function (v) { invPart += n(v); });
    var invAlumno = 0; students.forEach(function (a, k) { invAlumno += a * (n(P.tramos[k].mat_inicial) + n(P.tramos[k].tec_inicial)); });
    var invCuota = n(ch.incorporacion), inv = invPart + invAlumno + invCuota;
    return { scope: scopeId, flags: flags, students: students, total: total, guias: guias, aulas: aulas, m2: m2, etapas: nEtapas, coord: coord, staff: staff, mat: mat,
             chanak: chanak, manual: manual, gasto: gasto, ingresos: ingresos, neto: neto, equil: equil, anual: neto * 12, invPart: invPart, invAlumno: invAlumno, invCuota: invCuota,
             inv: inv, payback: neto > 0 ? ru(inv / neto) : null, applies: applies };
  }
  function compare(P, S) { return P.alcances.map(function (a) { return compute(P, S, a.id); }); }
  return { n: n, ru: ru, compute: compute, compare: compare, scopeOf: scopeOf };
});
