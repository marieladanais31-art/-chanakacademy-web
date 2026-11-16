# Rediseño noviembre 2026 — portada de tres modalidades, tarifas únicas, landings completas y SEO/IA

Rama: `claude/web-3-rutas` · **No está en producción.** `main` publica solo en Hostinger: revisar antes de fusionar.

## Qué cambia

| Zona | Antes | Ahora |
|---|---|---|
| Portada `/` | 480 KB, 21 secciones, precios de todos los países, idiomas por JavaScript, error JS «Maximum call stack size exceeded» | 33 KB, HTML estático: hero (vídeo intacto), credenciales, tres modalidades, convicción, respaldo, 4 pasos, método, ESA, servicios, FAQ y formulario |
| Idiomas de la portada | Un solo URL; Google y las IA solo leían el español | URLs reales: `/`, `/en/`, `/ca/`, `/fr/` con `hreflang` |
| Tarifas | Repartidas en portada, `/tuition/` (render por JS) y landings | `/tarifas/` y `/en/tuition/` en HTML estático; `/tuition/` redirige (301) |
| Contenido de la portada antigua | — | Conservado en `/como-funciona/` (método, currículos, portales, identidad, FAQ, formulario) |
| `/off-campus/` | 6 imágenes, un solo plan | + bloque «Dos planes» (Homeschool Guiado / Full Enrollment), «Lo que tu hijo recibe» y política de matrícula anual |
| `/dual-diploma/` | 1 imagen | + «Una semana real», «University Pathways» con DBU, dos opciones de matrícula |
| `/microschools/` (ES, EN) | 2 imágenes | + «El punto medio», «Cómo se abre una Chanak Microschool» (6 pasos) y 5 claves para fundadores |
| Landings EN compiladas | Mostraban «MSA Official Candidate» | Corregido a «Accredited by MSA-CESS» en los bundles; bloques nuevos por `assets/js/cx-en-blocks.js` |
| IA y buscadores | `llms.txt` sin Microschools, DBU ni precios | `llms.txt`, `ai.txt`, `sitemap.xml` y datos estructurados (School, FAQPage, OfferCatalog, BreadcrumbList) actualizados |
| «Foundation» | Aparecía en pies y menús | Quitada de los pies y menús (quedan 2 frases de contenido, ver pendientes) |

## Matriz de precios aplicada (decisión de dirección, 16-nov-2026)

- Full Enrollment · Guided Virtual School (USD, todos los países): K–5 275 · 6–8 320 · 9–12 365 al mes × 10; trimestral 687,50 · 800 · 912,50 × 4; matrícula anual 295; total 3.045 · 3.495 · 3.945.
- Homeschool Guiado: España US$80 = 70 €/mes, matrícula anual 180 €. Resto de países: se mantienen las cifras ya publicadas.
- Dual Diploma: sin cambios.
- Fuentes: `js/regional-pricing.js` (`CHANAK_FULL_ENROLLMENT`, `CHANAK_ENROLLMENT_POLICY`) y `PRICING` en `tools/build_site.py`. **Deben coincidir.**

## Cómo regenerar

```
python3 tools/build_site.py        # portada ×4 idiomas + tarifas ES/EN (textos en tools/site_i18n.py)
python3 tools/patch_landings.py    # bloques nuevos de las landings (idempotente)
```
`tools/build_como_funciona.py` ya se ejecutó una vez; `/como-funciona/index.html` se edita a mano desde ahora.

## Imágenes

`assets/img/gen/*.webp`: **Las 12 imágenes originales en alta resolución (1600 px)** fueron descargadas directamente desde los diseños de Canva y optimizadas en formato WebP (< 200 KB) con calidad 80-85%. Se añadió además el logotipo oficial de **Chanak Trainup Education - Nonprofit Section 501(c)(3)** en `assets/img/chanak-trainup-logo.png`.

| Archivo | Original en Canva |
|---|---|
| hs-mesa-familia.webp | https://www.canva.com/M/MAHbFIfIPgo |
| hs-mentoria.webp | https://www.canva.com/M/MAHbFNjMUJI |
| hs-materiales.webp | https://www.canva.com/M/MAHbFLLp4-s |
| diploma-expediente.webp | https://www.canva.com/M/MAHbFLQMLAQ |
| dual-escritorio.webp | https://www.canva.com/M/MAHbFDo5u_E |
| universidad-campus.webp | https://www.canva.com/M/MAHbFN8_e-Y |
| microschool-sala.webp | https://www.canva.com/M/MAHbFOdPEy8 |
| microschool-espacio.webp | https://www.canva.com/M/MAHbFNc1HNo |
| alianza-presupuesto.webp | https://www.canva.com/M/MAHbFAq9vz4 |
| life-skills-cocina.webp | https://www.canva.com/M/MAHbFAKrrcI |
| diagnostico-tablet.webp | https://www.canva.com/M/MAHbFJN1YuA |
| fe-aprendizaje.webp | https://www.canva.com/M/MAHbFNZiphI |

Son imágenes generadas con IA (sin personas reales). El pie de la web indica «Imágenes ilustrativas».

## Pendientes (no tocados a propósito)

1. **Arizona «Full-Time Online School» ($1.125–1.350/trimestre)** sigue en `/arizona/`, `/scholarships/`, `/matricula/`, `assets/js/chanak-hubs.js` y `_private/hubs-catalog.json`. Quitarlo afecta a los productos del SIS y a lo declarado en ClassWallet Arizona.
2. **Homeschool Guiado fuera de España**: Resuelto (Opción A aprobada por dirección el 16-nov-2026): unificado a US$80/mes en Panamá e Internacional (España se mantiene en US$80 = 70 €/mes).
3. **Full Enrollment en `/matricula/` y en el SIS**: la web ya lo ofrece en todos los países; el formulario de matrícula y el cobro aún no.
4. **Equivalencias en moneda local** de Full Enrollment (EUR, MXN, COP): no publicadas hasta que se aprueben.
5. **Landings EN de Off-Campus y Dual Diploma**: son bundles React con error de hidratación previo; recompilar desde `chanak-landing` con los bloques nuevos y borrar `cx-en-blocks.js`.
6. **Dossiers privados de UAE/Dubái** (`_private/dossier-templates/`) aún dicen «candidate status»; y los PDF de `assets/dossiers/` son de octubre.
7. **Dos frases con «Chanak Foundation»** (ayuda financiera) en `/mx/` o `/pa/` y `/us/florida/`: son contenido, decidir redacción.
8. **Uso de logotipos**: DBU (añadido por indicación de dirección) y MSA: confirmar normas de marca de cada entidad.
9. `tests/*.cjs` auditan la portada antigua: actualizar selectores.
10. Fase siguiente de FLABE: About Us, Get Involved (mentores, embajadores), Academy Services, apostilla en checkout, CA/FR de landings y tarifas.

## Pruebas hechas

Enlaces internos y anclas de las 11 páginas tocadas, JSON-LD válido, sin errores JS en portada/tarifas/como-funciona/landings ES, sin desbordamiento horizontal a 360, 390, 1250, 1280 y 1366 px. **No probado**: envío real del formulario (necesita PHP de Hostinger).

## Retoques finales (rama `claude/web-retoques-finales`, 2026-11-17)

Orden de reconstrucción (todos idempotentes):

```bash
python3 tools/build_site.py          # portada (4 idiomas) y tarifas
python3 tools/patch_landings.py      # bloques de off-campus, dual-diploma y microschools + bloque Core
python3 tools/build_microschool.py   # normativa (JSON), pilares, tabla por país, marco legal, 7 pasos, kit, FAQ
python3 tools/build_pages.py         # presupuesto, 7 errores, colabora (mentores, embajadores)
python3 tools/unify_headers.py       # cabecera única + barra secundaria en las landings hechas a mano
python3 tools/check_forbidden.py     # debe dar 0 resultados
python3 tools/check_links.py         # enlaces, anclas y JSON-LD
```

- Mensaje: un solo camino, tres modalidades. `#rutas` pasa a ser `#modalidades`.
- Textos: `tools/site_i18n.py` (portada), `tools/ms_content.py` (Microschool), `tools/core_content.py` (Plan de Estudios Core),
  `tools/budget_content.py`, `tools/errores_content.py`, `tools/unete_content.py`.
- Normativa por país: `tools/build_normativa.py` lee la hoja `Normativa_datos` del Excel y solo publica las normas de `VERIFIED`.
- Hallazgos y decisiones pendientes: `docs/AUDITORIA-INCOHERENCIAS.md`.
