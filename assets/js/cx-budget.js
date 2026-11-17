/* Calculadora de presupuesto para una Microschool Chanak, con variante por ALCANCE (original de Chanak).
   Parámetros desde assets/data/presupuesto-alcance.json (generado desde la hoja Parametros_alcance) y normativa desde
   assets/data/normativa-paises.json: la web no duplica números. Cálculo en assets/js/cx-budget-core.js.
   Todo ocurre en el navegador: no se envía ni se guarda ningún dato. */
(function () {
  'use strict';
  var C = window.CX_BUDGET, B = window.CXB; if (!C || !B) return;
  var T = C.t, root = document.getElementById('cx-budget'); if (!root) return;
  var P = null, N = null;
  var st = { cur: C.currency || 'EUR', country: C.country || 'es', scope: '', fee: '', other: '', grants: '', students: ['', '', '', ''], inv: {}, mon: {}, extraInv: [], extraMon: [] };
  var STAGES = [['infantil', ['K2']], ['primaria', ['K2', 'E35']], ['secundaria', ['M68']], ['bachillerato', ['H912']]];
  var BANDKEY = ['K2', 'E35', 'M68', 'H912'];
  var el = function (tag, attrs, kids) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { if (k === 'text') e.textContent = attrs[k]; else if (k === 'cls') e.className = attrs[k]; else e.setAttribute(k, attrs[k]); });
    (kids || []).forEach(function (c) { e.appendChild(c); });
    return e;
  };
  var num = B.n;
  function money(v) { try { return new Intl.NumberFormat(C.locale, { style: 'currency', currency: st.cur, maximumFractionDigits: 0 }).format(v); } catch (e) { return Math.round(v) + ' ' + st.cur; } }
  function fmt(v) { return new Intl.NumberFormat(C.locale, { maximumFractionDigits: 1 }).format(v); }
  function nameOf(map, id, fallback) { return (map[id] && map[id].n) || fallback; }
  function scopeName(a) { return C.i18n.alcance[a.id] || a.name; }
  function bandName(t) { return C.i18n.tramo[t.id] || t.name; }
  function pilar(es) { return es ? (C.i18n.pilar[es] || es) : T.other_cat; }
  function S() { return { fee: st.fee, other: st.other, grants: st.grants, students: st.students, inv: st.inv, mon: st.mon, extraInv: st.extraInv, extraMon: st.extraMon }; }
  function activeScope() { return st.scope || 'alcance5'; }   // sin alcance elegido se muestran todas las partidas, pero no hay resultados

  var out = el('div', { cls: 'cx-b-out', 'aria-live': 'polite' }), cmpBox = el('div', { cls: 'cx-b-cmp' });
  var warn = el('p', { cls: 'cx-banner cx-b-warn', role: 'alert', text: T.scope_req });
  var exNote = el('p', { cls: 'cx-banner', hidden: '', text: T.example_note });
  var invBody = el('tbody'), monBody = el('tbody'), bandBox = el('div', { cls: 'cx-b-bands' }), assumeBox = el('div'), staffBox = el('div');

  function select(id, opts, value, ph) {
    var s = el('select', { cls: 'cx-inp', id: id });
    if (ph) s.appendChild(el('option', { value: '', text: ph }));
    opts.forEach(function (o) { var op = el('option', { value: o[0], text: o[1] }); if (o[0] === value) op.selected = true; s.appendChild(op); });
    return s;
  }
  function numInput(k, extra, aria) {
    var a = { cls: 'cx-inp', type: 'number', min: '0', step: 'any', inputmode: 'decimal', 'data-k': k, 'aria-label': aria || k };
    Object.keys(extra || {}).forEach(function (x) { a[x] = extra[x]; });
    return el('input', a);
  }
  function field(label, k, hint) { return el('div', { cls: 'cx-b-field' }, [el('label', { cls: 'l', text: label }), numInput(k, {}, label), el('small', { text: hint || '' })]); }

  /* ── Controles superiores ── */
  var scopeSel = select('cxb-scope', [], '', T.scope_ph), ctySel = el('select', { cls: 'cx-inp', id: 'cxb-cty' }), curSel = select('cxb-cur', ['EUR', 'USD', 'MXN', 'PAB'].map(function (c) { return [c, c]; }), st.cur);
  var exBtn = el('button', { type: 'button', cls: 'cx-btn cx-btn-o', text: T.example }), clrBtn = el('button', { type: 'button', cls: 'cx-btn cx-btn-o', text: T.clear });
  root.appendChild(el('div', { cls: 'cx-b-top' }, [
    el('div', {}, [el('label', { cls: 'l', for: 'cxb-scope', text: T.scope + ' *' }), scopeSel]),
    el('div', {}, [el('label', { cls: 'l', for: 'cxb-cty', text: T.country }), ctySel]),
    el('div', {}, [el('label', { cls: 'l', for: 'cxb-cur', text: T.currency }), curSel]),
    el('div', { cls: 'cx-btns' }, [exBtn, clrBtn])]));
  root.appendChild(warn); root.appendChild(exNote);

  /* ── Pasos ── */
  function step(i, title, lead, body) { return el('section', { cls: 'cx-b-step' }, [el('h2', {}, [el('span', { cls: 'cx-step-n', text: String(i) }), document.createTextNode(' ' + title)]), el('p', { cls: 'cx-lead', text: lead })].concat(body)); }
  function table(body) { return el('div', { cls: 'cx-table-w' }, [el('table', { cls: 'cx-table cx-b-table' }, [el('thead', {}, [el('tr', {}, [el('th', { text: T.item }), el('th', { text: T.pillar }), el('th', { cls: 'cx-b-cur', text: T.amount })])]), body])]); }
  var addInv = el('button', { type: 'button', cls: 'cx-btn cx-btn-o cx-b-add', text: '+ ' + T.add }), addMon = el('button', { type: 'button', cls: 'cx-btn cx-btn-o cx-b-add', text: '+ ' + T.add });
  root.appendChild(step(1, T.s1, T.s1_p, [table(invBody), addInv]));
  root.appendChild(step(2, T.s2, T.s2_p, [table(monBody), addMon]));
  root.appendChild(step(3, T.s3, T.s3_p, [el('div', { cls: 'cx-b-inc' }, [field(T.fee, 'fee', T.fee_h), field(T.other_inc, 'other', T.other_inc_h), field(T.schol, 'grants', T.schol_h)]), el('h3', { text: T.students_h2 }), bandBox, staffBox,
    el('details', { cls: 'cx-b-assume' }, [el('summary', { text: T.assume_h }), el('p', { cls: 'cx-note', text: T.assume_p }), assumeBox])]));
  var csvBtn = el('button', { type: 'button', cls: 'cx-btn cx-btn-n', text: T.csv }), prBtn = el('button', { type: 'button', cls: 'cx-btn cx-btn-o', text: T.print });
  root.appendChild(el('section', { cls: 'cx-b-step cx-b-result' }, [el('h2', {}, [el('span', { cls: 'cx-step-n', text: '4' }), document.createTextNode(' ' + T.s4)]), out,
    el('div', { cls: 'cx-btns' }, [csvBtn, prBtn]), el('h3', { text: T.cmp_h }), el('p', { cls: 'cx-lead', text: T.cmp_p }), cmpBox]));
  var prevBox = el('div', { cls: 'cx-b-prev', id: 'cx-previo' }), prevBtn = el('button', { type: 'button', cls: 'cx-btn cx-btn-t', text: T.previo_btn }), prevCsv = el('button', { type: 'button', cls: 'cx-btn cx-btn-o', text: T.previo_csv });
  var xl = el('a', { cls: 'cx-btn cx-btn-o', href: '/assets/descargas/Calculadora-Presupuesto-Microschool-Chanak-ES.xlsx', download: '', text: T.xlsx });
  root.appendChild(el('section', { cls: 'cx-b-step' }, [el('h2', { text: T.previo_h }), el('p', { cls: 'cx-lead', text: T.previo_p }), el('div', { cls: 'cx-btns' }, [prevBtn, prevCsv, xl]), prevBox]));

  /* ── Render ── */
  function amountRow(it, group) {
    var name = el('span', { text: nameOf(C.i18n[group], it.id, it.name_es) }), hint = (C.i18n[group][it.id] || {}).h || '';
    var inp = numInput('amt', { 'data-g': group, 'data-id': it.id, 'aria-label': nameOf(C.i18n[group], it.id, it.name_es) + ' · ' + T.amount });
    if (st[group === 'inv' ? 'inv' : 'mon'][it.id] !== undefined) inp.value = st[group === 'inv' ? 'inv' : 'mon'][it.id];
    return el('tr', {}, [el('td', {}, [name, el('small', { text: hint })]), el('td', {}, [el('span', { cls: 'cx-b-tag', text: pilar(it.pilar_es) })]), el('td', {}, [inp])]);
  }
  function extraRow(group, idx) {
    var key = group === 'inv' ? 'extraInv' : 'extraMon';
    var nm = el('input', { cls: 'cx-inp cx-b-name', type: 'text', placeholder: T.other, 'aria-label': T.item, 'data-k': 'xname', 'data-g': group, 'data-i': String(idx) });
    var inp = numInput('xamt', { 'data-g': group, 'data-i': String(idx), 'aria-label': T.other + ' · ' + T.amount }); if (st[key][idx] !== undefined && st[key][idx] !== '') inp.value = st[key][idx];
    return el('tr', {}, [el('td', {}, [nm]), el('td', {}, [el('span', { cls: 'cx-b-tag', text: T.other_cat })]), el('td', {}, [inp])]);
  }
  function renderItems() {
    var sc = B.scopeOf(P, activeScope()), fl = sc.flags;
    invBody.replaceChildren(); monBody.replaceChildren();
    P.inversion.forEach(function (it) { if (!it.custom && it.flags.reduce(function (a, f, k) { return a + f * fl[k]; }, 0) > 0) invBody.appendChild(amountRow(it, 'inv')); });
    st.extraInv.forEach(function (_, i) { invBody.appendChild(extraRow('inv', i)); });
    P.gasto.forEach(function (it) { if (!it.custom) monBody.appendChild(amountRow(it, 'mon')); });
    st.extraMon.forEach(function (_, i) { monBody.appendChild(extraRow('mon', i)); });
  }
  function renderBands() {
    var sc = B.scopeOf(P, activeScope()), fl = sc.flags; bandBox.replaceChildren();
    P.tramos.forEach(function (t, k) {
      var on = !!fl[k] && !!st.scope, inp = numInput('stu', { 'data-i': String(k), 'aria-label': T.students + ' · ' + bandName(t) });
      if (!on) { inp.disabled = true; inp.value = '0'; } else if (st.students[k] !== '') inp.value = st.students[k];
      bandBox.appendChild(el('div', { cls: 'cx-b-field' }, [el('label', { cls: 'l', text: T.students + ' · ' + bandName(t) }), inp, el('small', { text: on ? T.band_in : T.band_out })]));
    });
  }
  function renderAssume() {
    assumeBox.replaceChildren();
    var rows = P.tramos.map(function (t, k) {
      function cell(f, step) { var i = numInput('tp', { 'data-i': String(k), 'data-f': f, step: step || 'any', 'aria-label': bandName(t) + ' · ' + f }); if (t[f] !== null && t[f] !== undefined) i.value = t[f]; return el('td', {}, [i]); }
      return el('tr', {}, [el('td', { text: bandName(t) }), cell('ratio'), cell('aula'), cell('m2'), cell('coste_guia'), cell('mat_inicial'), cell('tec_inicial'), cell('mat_mensual')]);
    });
    var ci = numInput('coord', { 'aria-label': T.coord_cost }); if (P.coordinador.coste !== null) ci.value = P.coordinador.coste;
    assumeBox.appendChild(el('div', { cls: 'cx-table-w' }, [el('table', { cls: 'cx-table cx-b-table' }, [el('thead', {}, [el('tr', {}, [el('th', { text: T.th_band }), el('th', { text: T.th_ratio }), el('th', { text: T.th_aula }), el('th', { text: T.th_m2 }),
      el('th', { text: T.th_cost }), el('th', { text: T.th_mi }), el('th', { text: T.th_ti }), el('th', { text: T.th_mm })])]), el('tbody', {}, rows)])]));
    assumeBox.appendChild(el('div', { cls: 'cx-b-field', style: 'max-width:360px;margin-top:12px' }, [el('label', { cls: 'l', text: T.coord_cost }), ci, el('small', { text: T.coord_h })]));
  }
  function card(label, value, id) { return el('div', { cls: 'cx-card' }, [el('div', { cls: 'cx-b-lab', text: label }), el('div', { cls: 'cx-num', 'data-r': id || '', text: value })]); }
  function render() {
    root.querySelectorAll('.cx-b-cur').forEach(function (th) { th.textContent = T.amount + ' (' + st.cur + ')'; });
    warn.hidden = !!st.scope;
    var r = B.compute(P, S(), activeScope());
    // personal y espacio
    var rows = P.tramos.map(function (t, k) { return r.students[k] > 0 ? el('tr', {}, [el('td', { text: bandName(t) }), el('td', { text: String(r.students[k]) }), el('td', { text: String(r.guias[k]) }), el('td', { text: String(r.aulas[k]) }), el('td', { text: fmt(r.m2[k]) })]) : null; }).filter(Boolean);
    if (r.coord) rows.push(el('tr', {}, [el('td', { text: T.coord_lbl }), el('td'), el('td', { text: String(r.coord) }), el('td'), el('td')]));
    staffBox.replaceChildren(el('h3', { text: T.staff_h }), rows.length ? el('div', { cls: 'cx-table-w' }, [el('table', { cls: 'cx-table' }, [el('thead', {}, [el('tr', {}, [el('th', { text: T.th_band }), el('th', { text: T.th_students }), el('th', { text: T.th_guides }), el('th', { text: T.th_rooms }), el('th', { text: T.th_sqm })])]), el('tbody', {}, rows)])]) : el('p', { cls: 'cx-note', text: T.staff_empty }), el('p', { cls: 'cx-note', text: T.law_note }));
    if (!st.scope) { out.replaceChildren(el('p', { cls: 'cx-b-read', text: T.scope_req })); cmpBox.replaceChildren(); return r; }
    out.replaceChildren(
      card(T.r_students, String(r.total)), card(T.r_inv, money(r.inv)), card(T.r_mon, money(r.gasto)), card(T.r_inc, money(r.ingresos)),
      card(T.r_be, r.equil === null ? T.na : String(r.equil), 'be'), card(T.r_net, money(r.neto)), card(T.r_year, money(r.anual)), card(T.r_pay, r.payback === null ? T.no_pay : String(r.payback)),
      el('p', { cls: 'cx-b-read', text: num(st.fee) === 0 ? T.read0 : (r.equil !== null && r.total >= r.equil ? T.read_ok : T.read_no) }));
    renderCompare();
    return r;
  }
  function renderCompare() {
    var all = B.compare(P, S()), head = el('tr', {}, [el('th', { text: '' })].concat(P.alcances.map(function (a) { return el('th', { text: scopeName(a), cls: a.id === st.scope ? 'cx-b-sel' : '' }); })));
    var defs = [[T.r_students, function (r) { return String(r.total); }], [T.r_staff, function (r) { return money(r.staff); }], [T.r_mon, function (r) { return money(r.gasto); }], [T.r_inc, function (r) { return money(r.ingresos); }],
      [T.r_net, function (r) { return money(r.neto); }], [T.r_be, function (r) { return r.equil === null ? T.na : String(r.equil); }], [T.r_inv, function (r) { return money(r.inv); }], [T.r_pay, function (r) { return r.payback === null ? T.no_pay : String(r.payback); }]];
    var body = defs.map(function (d) { return el('tr', {}, [el('td', { text: d[0] })].concat(all.map(function (r) { return el('td', { text: d[1](r) }); }))); });
    cmpBox.replaceChildren(el('div', { cls: 'cx-table-w' }, [el('table', { cls: 'cx-table' }, [el('thead', {}, [head]), el('tbody', {}, body)])]));
  }

  /* ── Exportar e imprimir ── */
  function q(v) { v = String(v == null ? '' : v); return /[",;\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }
  function download(name, rows) {
    var csv = '﻿' + rows.map(function (r) { return r.map(q).join(';'); }).join('\r\n');
    var a = el('a', { href: URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })), download: name });
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  function itemLines(group) {
    var out2 = [], r = B.compute(P, S(), activeScope());
    (group === 'inv' ? P.inversion : P.gasto).forEach(function (it) {
      if (it.custom) return; var v = num((group === 'inv' ? st.inv : st.mon)[it.id]);
      if (v > 0 && (group !== 'inv' || r.applies[it.id])) out2.push([nameOf(C.i18n[group], it.id, it.name_es), pilar(it.pilar_es), v]);
    });
    document.querySelectorAll('#cx-budget input[data-k=xname][data-g=' + group + ']').forEach(function (i) { var v = num((group === 'inv' ? st.extraInv : st.extraMon)[+i.dataset.i]); if (v > 0) out2.push([i.value || T.other, T.other_cat, v]); });
    return out2;
  }
  function results(r) {
    return [[T.scope, st.scope ? scopeName(B.scopeOf(P, st.scope)) : ''], [T.r_students, r.total], [T.r_inv, r.inv], [T.r_mon, r.gasto], [T.fee, num(st.fee)], [T.other_inc, num(st.other)], [T.schol, num(st.grants)], [T.r_inc, r.ingresos],
      [T.r_be, r.equil === null ? T.na : r.equil], [T.r_net, r.neto], [T.r_year, r.anual], [T.r_pay, r.payback === null ? T.no_pay : r.payback]];
  }
  csvBtn.addEventListener('click', function () {
    if (!st.scope) { warn.hidden = false; return; }
    var r = render(), rows = [[T.title], [T.currency, st.cur], [T.scope, scopeName(B.scopeOf(P, st.scope))], [], [T.s1], [T.item, T.pillar, T.amount]].concat(itemLines('inv'), [[], [T.s2], [T.item, T.pillar, T.amount]], itemLines('mon'), [[], [T.s4]], results(r), [[], [T.disclaimer]]);
    download('presupuesto-microschool-chanak.csv', rows);
  });
  prBtn.addEventListener('click', function () { document.body.classList.remove('cx-print-previo'); window.print(); });
  function country() { return (N || []).filter(function (p) { return p.id === st.country; })[0]; }
  function previo() {
    var p = country(); if (!p) return null; var r = render();
    var legal = p.legal.length ? p.legal.join('; ') : (p.legal_note ? (p.legal_note[C.lang] || p.legal_note.es) : '');
    var sc = B.scopeOf(P, activeScope()), used = {}; BANDKEY.forEach(function (b, k) { if (sc.flags[k] && st.scope) STAGES.forEach(function (s) { if (s[1].indexOf(b) > -1) used[s[0]] = 1; }); });
    var rows = [[T.pv_legal, legal], [T.pv_a, p.previo.A], [T.pv_b, p.previo.B], [T.pv_c, p.previo.C], [T.pv_items, p.previo.partidas], [T.pv_pending, p.previo.verificaciones]];
    STAGES.forEach(function (s) { if (used[s[0]]) rows.push([T.pv_stage + ' · ' + T['st_' + s[0]], p.previo.etapas[s[0]]]); });
    return { p: p, r: r, rows: rows };
  }
  function showPrevio() {
    var d = previo(); if (!d) return null; var dl = el('dl');
    d.rows.forEach(function (x) { dl.appendChild(el('dt', { text: x[0] })); dl.appendChild(el('dd', { text: x[1] })); });
    var tb = el('tbody'); results(d.r).forEach(function (x) { tb.appendChild(el('tr', {}, [el('td', { text: x[0] }), el('td', { text: typeof x[1] === 'number' && [T.r_students, T.r_be, T.r_pay].indexOf(x[0]) < 0 ? money(x[1]) : String(x[1]) })])); });
    prevBox.replaceChildren(el('h3', { text: T.previo_h + ' · ' + (d.p.name[C.lang] || d.p.name.es) }), C.lang !== 'es' ? el('p', { cls: 'cx-note', text: T.pv_es_only }) : el('span'),
      dl, el('h4', { text: T.pv_summary }), el('div', { cls: 'cx-table-w' }, [el('table', { cls: 'cx-table' }, [tb])]), el('p', { cls: 'cx-policy', text: T.pv_legal_note }), el('p', { cls: 'cx-note', text: T.disclaimer }));
    return d;
  }
  prevBtn.addEventListener('click', function () { if (showPrevio()) { document.body.classList.add('cx-print-previo'); window.print(); } });
  window.addEventListener('afterprint', function () { document.body.classList.remove('cx-print-previo'); });
  prevCsv.addEventListener('click', function () { var d = showPrevio(); if (!d) return; download('previo-normativo-' + d.p.id + '.csv', [[T.previo_h, d.p.name[C.lang] || d.p.name.es], []].concat(d.rows, [[], [T.pv_summary]], results(d.r), [[], [T.pv_legal_note], [T.disclaimer]])); });

  /* ── Eventos ── */
  root.addEventListener('input', function (e) {
    var t = e.target, k = t.dataset.k; if (!k) return;
    if (k === 'fee' || k === 'other' || k === 'grants') st[k] = t.value;
    else if (k === 'stu') st.students[+t.dataset.i] = t.value;
    else if (k === 'amt') st[t.dataset.g === 'inv' ? 'inv' : 'mon'][t.dataset.id] = t.value;
    else if (k === 'xamt') st[t.dataset.g === 'inv' ? 'extraInv' : 'extraMon'][+t.dataset.i] = t.value;
    else if (k === 'tp') P.tramos[+t.dataset.i][t.dataset.f] = t.value === '' ? null : num(t.value) || null;
    else if (k === 'coord') P.coordinador.coste = t.value === '' ? null : num(t.value) || null;
    render();
  });
  scopeSel.addEventListener('change', function () { st.scope = scopeSel.value; renderItems(); renderBands(); render(); });
  curSel.addEventListener('change', function () { st.cur = curSel.value; render(); });
  ctySel.addEventListener('change', function () { st.country = ctySel.value; prevBox.replaceChildren(); render(); });
  addInv.addEventListener('click', function () { st.extraInv.push(''); renderItems(); });
  addMon.addEventListener('click', function () { st.extraMon.push(''); renderItems(); });
  function setAll() { root.querySelectorAll('input[data-k=fee]').forEach(function (i) { i.value = st.fee; }); }
  exBtn.addEventListener('click', function () {
    if (!st.scope) { st.scope = 'alcance2'; scopeSel.value = st.scope; }
    var sc = B.scopeOf(P, st.scope), first = sc.flags.indexOf(1);
    st.fee = C.ex.fee; st.other = ''; st.grants = ''; st.students = ['', '', '', '']; st.students[first] = C.ex.students; st.inv = {}; st.mon = {};
    Object.keys(C.ex.inv).forEach(function (k) { st.inv[k] = C.ex.inv[k]; }); Object.keys(C.ex.mon).forEach(function (k) { st.mon[k] = C.ex.mon[k]; });
    exNote.hidden = false; renderItems(); renderBands(); root.querySelectorAll('input[data-k=fee]').forEach(function (i) { i.value = st.fee; }); root.querySelectorAll('input[data-k=other],input[data-k=grants]').forEach(function (i) { i.value = ''; }); render();
  });
  clrBtn.addEventListener('click', function () {
    st.fee = st.other = st.grants = ''; st.students = ['', '', '', '']; st.inv = {}; st.mon = {}; st.extraInv = []; st.extraMon = []; exNote.hidden = true; prevBox.replaceChildren();
    root.querySelectorAll('input[data-k=fee],input[data-k=other],input[data-k=grants]').forEach(function (i) { i.value = ''; }); renderItems(); renderBands(); render();
  });

  Promise.all([fetch('/assets/data/presupuesto-alcance.json').then(function (r) { return r.json(); }), fetch('/assets/data/normativa-paises.json').then(function (r) { return r.json(); })]).then(function (a) {
    P = a[0]; N = a[1].paises;
    P.alcances.forEach(function (al) { scopeSel.appendChild(el('option', { value: al.id, text: scopeName(al) })); });
    N.forEach(function (p) { var o = el('option', { value: p.id, text: p.name[C.lang] || p.name.es }); if (p.id === st.country) o.selected = true; ctySel.appendChild(o); });
    renderItems(); renderBands(); renderAssume(); render();
    window.CX_BUDGET_STATE = function () { return { P: P, S: S(), scope: st.scope }; };
    window.CX_BUDGET_CALC = function () { return B.compute(P, S(), activeScope()); };
  }).catch(function () { root.insertBefore(el('p', { cls: 'cx-banner', text: T.load_err }), root.firstChild); });
})();
