/* Calculadora de presupuesto para una Microschool Chanak (original de Chanak).
   Mismas fórmulas que assets/descargas/Calculadora-Presupuesto-Microschool-Chanak-ES.xlsx:
     ingresos mensuales = cuota × estudiantes + otros ingresos − becas
     punto de equilibrio = ceil((gasto mensual − otros ingresos + becas) ÷ cuota)
     recuperación        = ceil(inversión inicial ÷ resultado neto mensual)
   Todo ocurre en el navegador: no se envía ni se guarda ningún dato. */
(function () {
  'use strict';
  var C = window.CX_BUDGET; if (!C) return;
  var T = C.t, root = document.getElementById('cx-budget'); if (!root) return;
  var state = { cur: C.currency || 'EUR', country: C.country || 'es', norm: null };
  var $ = function (s, r) { return (r || root).querySelector(s); };
  var el = function (tag, attrs, kids) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { if (k === 'text') e.textContent = attrs[k]; else if (k === 'cls') e.className = attrs[k]; else e.setAttribute(k, attrs[k]); });
    (kids || []).forEach(function (c) { e.appendChild(c); });
    return e;
  };
  function num(v) { v = parseFloat(String(v).replace(/\s/g, '').replace(',', '.')); return isFinite(v) && v > 0 ? v : 0; }
  function money(v) {
    try { return new Intl.NumberFormat(C.locale, { style: 'currency', currency: state.cur, maximumFractionDigits: 0 }).format(v); }
    catch (e) { return Math.round(v) + ' ' + state.cur; }
  }

  /* ── Tablas de partidas ── */
  function table(id, rows) {
    var tb = el('tbody');
    function add(r) {
      var name = r.custom ? el('input', { cls: 'cx-inp cx-b-name', type: 'text', placeholder: T.other, 'aria-label': T.item }) : el('span', { text: r.n });
      var tr = el('tr', {}, [
        el('td', {}, [name, r.h ? el('small', { text: r.h }) : el('small')]),
        el('td', {}, [el('span', { cls: 'cx-b-tag', text: r.p || T.other_cat })]),
        el('td', {}, [el('input', { cls: 'cx-inp cx-b-amt', type: 'number', min: '0', step: 'any', inputmode: 'decimal', 'aria-label': (r.n || T.item) + ' · ' + T.amount, 'data-ex': r.ex == null ? '' : r.ex })])
      ]);
      tb.appendChild(tr);
    }
    rows.forEach(add);
    var more = el('button', { type: 'button', cls: 'cx-btn cx-btn-o cx-b-add', text: '+ ' + T.add });
    more.addEventListener('click', function () { add({ custom: true }); });
    var t = el('table', { cls: 'cx-table cx-b-table', id: id }, [
      el('thead', {}, [el('tr', {}, [el('th', { text: T.item }), el('th', { text: T.pillar }), el('th', { cls: 'cx-b-cur', text: T.amount })])]), tb]);
    return el('div', {}, [el('div', { cls: 'cx-table-w' }, [t]), more]);
  }
  function sum(id) { var s = 0; root.querySelectorAll('#' + id + ' .cx-b-amt').forEach(function (i) { s += num(i.value); }); return s; }
  function field(id, label, hint, ex) {
    return el('div', { cls: 'cx-b-field' }, [el('label', { cls: 'l', for: id, text: label }),
      el('input', { cls: 'cx-inp', id: id, type: 'number', min: '0', step: 'any', inputmode: 'decimal', 'data-ex': ex == null ? '' : ex }), el('small', { text: hint || '' })]);
  }

  /* ── Estructura ── */
  var curSel = el('select', { cls: 'cx-inp', id: 'cxb-cur' }, ['EUR', 'USD', 'MXN', 'PAB'].map(function (c) { var o = el('option', { value: c, text: c }); if (c === state.cur) o.selected = true; return o; }));
  var ctySel = el('select', { cls: 'cx-inp', id: 'cxb-cty' });
  var exBtn = el('button', { type: 'button', cls: 'cx-btn cx-btn-o', text: T.example });
  var clrBtn = el('button', { type: 'button', cls: 'cx-btn cx-btn-o', text: T.clear });
  var exNote = el('p', { cls: 'cx-banner', hidden: '', text: T.example_note });
  root.appendChild(el('div', { cls: 'cx-b-top' }, [
    el('div', {}, [el('label', { cls: 'l', for: 'cxb-cty', text: T.country }), ctySel]),
    el('div', {}, [el('label', { cls: 'l', for: 'cxb-cur', text: T.currency }), curSel]),
    el('div', { cls: 'cx-btns' }, [exBtn, clrBtn])]));
  root.appendChild(exNote);

  var steps = [
    [T.s1, T.s1_p, table('cxb-inv', C.inv)],
    [T.s2, T.s2_p, table('cxb-mon', C.mon)],
    [T.s3, T.s3_p, el('div', { cls: 'cx-b-inc' }, [
      field('cxb-fee', T.fee, T.fee_h, 400), field('cxb-n', T.students, T.students_h, 16), field('cxb-enr', T.enroll, T.enroll_h, ''),
      field('cxb-oth', T.other_inc, T.other_inc_h, ''), field('cxb-sch', T.schol, T.schol_h, '')])]
  ];
  steps.forEach(function (s, i) {
    root.appendChild(el('section', { cls: 'cx-b-step' }, [el('h2', {}, [el('span', { cls: 'cx-step-n', text: String(i + 1) }), document.createTextNode(' ' + s[0])]), el('p', { cls: 'cx-lead', text: s[1] }), s[2]]));
  });
  var out = el('div', { cls: 'cx-b-out', 'aria-live': 'polite' });
  var csvBtn = el('button', { type: 'button', cls: 'cx-btn cx-btn-n', text: T.csv });
  var prBtn = el('button', { type: 'button', cls: 'cx-btn cx-btn-o', text: T.print });
  root.appendChild(el('section', { cls: 'cx-b-step cx-b-result' }, [el('h2', {}, [el('span', { cls: 'cx-step-n', text: '4' }), document.createTextNode(' ' + T.s4)]), out, el('div', { cls: 'cx-btns' }, [csvBtn, prBtn])]));

  /* ── Previo normativo (descarga) ── */
  var prevBox = el('div', { cls: 'cx-b-prev', id: 'cx-previo' });
  var prevBtn = el('button', { type: 'button', cls: 'cx-btn cx-btn-t', text: T.previo_btn });
  var prevCsv = el('button', { type: 'button', cls: 'cx-btn cx-btn-o', text: T.previo_csv });
  var xl = el('a', { cls: 'cx-btn cx-btn-o', href: '/assets/descargas/Calculadora-Presupuesto-Microschool-Chanak-ES.xlsx', download: '', text: T.xlsx });
  root.appendChild(el('section', { cls: 'cx-b-step' }, [el('h2', { text: T.previo_h }), el('p', { cls: 'cx-lead', text: T.previo_p }),
    el('div', { cls: 'cx-btns' }, [prevBtn, prevCsv, xl]), prevBox]));

  /* ── Cálculo ── */
  function calc() {
    var inv = sum('cxb-inv'), mon = sum('cxb-mon');
    var fee = num($('#cxb-fee').value), n = num($('#cxb-n').value), enr = num($('#cxb-enr').value), oth = num($('#cxb-oth').value), sch = num($('#cxb-sch').value);
    var income = fee * n + oth - sch, net = income - mon;
    var be = fee > 0 ? Math.max(0, Math.ceil((mon - oth + sch) / fee)) : null;
    var year = net * 12 + enr * n;
    var pay = net > 0 ? Math.ceil(inv / net) : null;
    var read = fee === 0 ? T.read0 : (n >= be ? T.read_ok : T.read_no);
    return { inv: inv, mon: mon, fee: fee, n: n, enr: enr, oth: oth, sch: sch, income: income, net: net, be: be, year: year, pay: pay, read: read };
  }
  function render() {
    root.querySelectorAll('.cx-b-cur').forEach(function (th) { th.textContent = T.amount + ' (' + state.cur + ')'; });
    var r = calc();
    out.replaceChildren(
      card(T.r_inv, money(r.inv)), card(T.r_mon, money(r.mon)), card(T.r_inc, money(r.income)),
      card(T.r_be, r.be == null ? T.na : String(r.be), 'be'), card(T.r_net, money(r.net)), card(T.r_year, money(r.year)),
      card(T.r_pay, r.pay == null ? T.no_pay : String(r.pay)), el('p', { cls: 'cx-b-read', text: r.read }));
    return r;
  }
  function card(label, value, id) { return el('div', { cls: 'cx-card' }, [el('div', { cls: 'cx-b-lab', text: label }), el('div', { cls: 'cx-num', 'data-r': id || '', text: value })]); }

  /* ── Exportar ── */
  function q(v) { v = String(v == null ? '' : v); return /[",;\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }
  function download(name, rows) {
    var csv = '﻿' + rows.map(function (r) { return r.map(q).join(';'); }).join('\r\n');
    var a = el('a', { href: URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })), download: name });
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  function lines(id) {
    var o = [];
    root.querySelectorAll('#' + id + ' tbody tr').forEach(function (tr) {
      var nm = tr.querySelector('.cx-b-name'), v = num(tr.querySelector('.cx-b-amt').value);
      var label = nm ? nm.value : tr.querySelector('td span').textContent;
      if (v > 0) o.push([label || T.other, tr.querySelector('.cx-b-tag').textContent, v]);
    });
    return o;
  }
  function results(r) {
    return [[T.r_inv, r.inv], [T.r_mon, r.mon], [T.fee, r.fee], [T.students, r.n], [T.enroll, r.enr], [T.other_inc, r.oth], [T.schol, r.sch], [T.r_inc, r.income],
      [T.r_be, r.be == null ? T.na : r.be], [T.r_net, r.net], [T.r_year, r.year], [T.r_pay, r.pay == null ? T.no_pay : r.pay]];
  }
  csvBtn.addEventListener('click', function () {
    var r = render(), rows = [[T.title], [T.currency, state.cur], [], [T.s1], [T.item, T.pillar, T.amount]].concat(lines('cxb-inv'), [[], [T.s2], [T.item, T.pillar, T.amount]], lines('cxb-mon'), [[], [T.s4]], results(r), [[], [T.disclaimer]]);
    download('presupuesto-microschool-chanak.csv', rows);
  });
  prBtn.addEventListener('click', function () { document.body.classList.remove('cx-print-previo'); window.print(); });

  function country() { return (state.norm || []).filter(function (p) { return p.id === state.country; })[0]; }
  function previo() {
    var p = country(), r = render(); if (!p) return null;
    var legal = p.legal.length ? p.legal.join('; ') : (p.legal_note ? (p.legal_note[C.lang] || p.legal_note.es) : '');
    var rows = [[T.pv_legal, legal], [T.pv_a, p.previo.A], [T.pv_b, p.previo.B], [T.pv_c, p.previo.C], [T.pv_items, p.previo.partidas], [T.pv_pending, p.previo.verificaciones]];
    return { p: p, r: r, rows: rows };
  }
  function showPrevio() {
    var d = previo(); if (!d) return null;
    var dl = el('dl');
    d.rows.forEach(function (x) { dl.appendChild(el('dt', { text: x[0] })); dl.appendChild(el('dd', { text: x[1] })); });
    var tb = el('tbody'); results(d.r).forEach(function (x) { tb.appendChild(el('tr', {}, [el('td', { text: x[0] }), el('td', { text: typeof x[1] === 'number' && x[0] !== T.students && x[0] !== T.r_be && x[0] !== T.r_pay ? money(x[1]) : String(x[1]) })])); });
    prevBox.replaceChildren(
      el('h3', { text: T.previo_h + ' · ' + (d.p.name[C.lang] || d.p.name.es) }),
      C.lang !== 'es' ? el('p', { cls: 'cx-note', text: T.pv_es_only }) : el('span'),
      dl, el('h4', { text: T.pv_summary }), el('div', { cls: 'cx-table-w' }, [el('table', { cls: 'cx-table' }, [tb])]),
      el('p', { cls: 'cx-policy', text: T.pv_legal_note }), el('p', { cls: 'cx-note', text: T.disclaimer }));
    return d;
  }
  prevBtn.addEventListener('click', function () { if (showPrevio()) { document.body.classList.add('cx-print-previo'); window.print(); } });
  window.addEventListener('afterprint', function () { document.body.classList.remove('cx-print-previo'); });
  prevCsv.addEventListener('click', function () {
    var d = showPrevio(); if (!d) return;
    download('previo-normativo-' + d.p.id + '.csv', [[T.previo_h, d.p.name[C.lang] || d.p.name.es], []].concat(d.rows, [[], [T.pv_summary]], results(d.r), [[], [T.pv_legal_note], [T.disclaimer]]));
  });

  /* ── Eventos ── */
  root.addEventListener('input', render);
  curSel.addEventListener('change', function () { state.cur = curSel.value; render(); });
  ctySel.addEventListener('change', function () { state.country = ctySel.value; var p = country(); if (p && p.currency && !exNote.dataset.touched) { state.cur = p.currency; curSel.value = p.currency; } prevBox.replaceChildren(); render(); });
  curSel.addEventListener('input', function () { exNote.dataset.touched = '1'; });
  exBtn.addEventListener('click', function () { root.querySelectorAll('[data-ex]').forEach(function (i) { i.value = i.dataset.ex; }); exNote.hidden = false; render(); });
  clrBtn.addEventListener('click', function () { root.querySelectorAll('input[type=number],.cx-b-name').forEach(function (i) { i.value = ''; }); exNote.hidden = true; prevBox.replaceChildren(); render(); });

  fetch('/assets/data/normativa-paises.json').then(function (r) { return r.json(); }).then(function (d) {
    state.norm = d.paises;
    d.paises.forEach(function (p) { var o = el('option', { value: p.id, text: p.name[C.lang] || p.name.es }); if (p.id === state.country) o.selected = true; ctySel.appendChild(o); });
  }).catch(function () { ctySel.appendChild(el('option', { value: '', text: '—' })); prevBtn.disabled = true; prevCsv.disabled = true; });
  render();
  window.CX_BUDGET_CALC = calc;
})();
