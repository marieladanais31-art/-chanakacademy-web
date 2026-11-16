# Auditoría de incoherencias · chanakacademy.org

Rama `claude/web-retoques-finales` · 2026-11-17. Se corrige solo lo que no requiere una decisión; el resto queda
documentado para Mariela. Comprobaciones reproducibles: `python3 tools/check_forbidden.py` y `python3 tools/check_links.py`.

## 1. Tabla de hallazgos

| Página | Hallazgo | Gravedad | Corregido | Decisión de Mariela |
|---|---|---|---|---|
| Portada ES/EN/CA/FR, `tools/site_i18n.py` | Expresiones de la lista 1.1 del encargo en eyebrow, titular, lead, pasos y formulario | Alta | Sí | — |
| `tools/build_site.py` (JSON-LD) | `slogan` con la fórmula antigua (lista 1.1) | Alta | Sí → «One way, three approaches, one commitment to excellence» | — |
| `/microschools/`, `/microschools/en/` | Frase «Chanak acompaña…» con la fórmula antigua (lista 1.1) | Alta | Sí | — |
| `llms.txt`, `ai.txt` | Título y regla de asignación con la fórmula antigua (lista 1.1) | Alta | Sí | — |
| `/como-funciona/` | Texto y botón de la cabecera con la fórmula antigua; `/#rutas` | Alta | Sí | — |
| 18 páginas (`alianzas`, `student-support`, `open-a-microschool`…) | Enlaces a anclas antiguas `/#rutas` y `/#objetivo` | Media | Sí → `/#modalidades` (la portada además redirige las antiguas) | — |
| Todo el sitio (21 archivos) | Nombre antiguo del plan individual de Dual Diploma (ES/EN) | Media | Sí → «Plan de Estudio» / «Study Plan» / «Pla d’Estudi» / «Plan d’études» | Los PDF de dossier ya generados conservan el nombre antiguo: regenerarlos |
| `_next/static/chunks/31ckrmy3ounpv*.js` (bundle compilado) | Nombre antiguo del plan individual | Media | Sí, sustituyendo la cadena en el bundle | Recompilar las landings EN desde su repo fuente cuando sea posible |
| `/dual-diploma/` | El producto sigue usando «Ruta Standard / Honors» y el ancla `#rutas` | Baja | No (es nombre de producto) | ¿Renombrar a «Itinerario Standard / Honors»? |
| Portada | El encargo pedía «Homeschool K–12» en el menú y «Homeschool Guiado K–12» / «Microschool y alianzas académicas» en las tarjetas; `main` (commit e25075e, posterior) usa «Off Campus K–12» con desplegable y «Microschool & Academic Partnerships» | Media | No: se respeta lo último que hay en `main` | Confirmar qué rótulos prefieres |
| Portada CA (texto recibido) | «el seu propi crit» (crit = grito) | Baja | Sí → «la seva pròpia crida» | — |
| Cabecera | Cuatro cabeceras distintas; inglés en páginas ES; etiquetas partidas | Alta | Sí: cabecera única de 73 px en portada, tarifas, cómo funciona, off-campus, dual-diploma, microschools y open-a-microschool (ES/EN/CA/FR) | `/alianzas/`, `/school-leadership/`, `/student-support/`, páginas de país y ESA conservan la suya |
| Cabecera | El menú desbordaba a 1280 px (y a 1340 px en francés) | Media | Sí: menú hamburguesa por debajo de 1420 px | — |
| Desplegable «Off Campus K–12» | Enlazaba a `#full-enrollment`, que no existía | Media | Sí (id añadido al plan Full Enrollment, ES y EN) | — |
| `/microschools/`, `/open-a-microschool/` (ES) | Redirigen a la versión en inglés si no hay idioma guardado: desde la portada en español se llegaba al inglés | Alta | Parcial: los enlaces desde páginas en español llevan `?lang=es` | ¿Mantener el inglés por defecto o decidir por idioma del navegador? |
| `/off-campus/` | Placeholders cortados en el formulario; selector de moneda recortado | Media | Sí (etiquetas visibles; selector en la barra secundaria) | — |
| Todas | Banner de cookies de 620×160 px tapando el hero | Media | Sí (tarjeta de 360 px; misma clave `chanak_ck`) | — |
| Portada | Doble línea bajo la cabecera al hacer scroll | Baja | Sí | — |
| `assets/img/gen/universidad-campus.webp` | 374 KB | Baja | Sí → 193 KB (1200×800) | — |
| `assets/img/msa-logo-clean.png` | 416 KB para un logo de 160 px | Baja | Sí → versión `.webp` de 16 KB en la portada | — |
| `/open-a-microschool/` (4 idiomas) | «Cobro ESA centralizado… gestionamos la facturación» ; «llave en mano»; «validez internacional» | Alta | Sí (redacción aprobada: solo estados y servicios aprobados) | EN conserva «turnkey» y FR «clé en main» en un párrafo secundario: revisar |
| `/alianzas/en/` | «learning pods» | Media | Sí → «Microschools» | — |
| `/microschools/*` | «Otros estados con fondos ESA: fase de análisis en Utah, Arizona, New Hampshire y Wyoming» | Media | No | Confirmar si puede citarse cada estado mientras la oferta está en revisión |
| Microschool | Tamaño de grupo «5 a 30 estudiantes» y mínimo «unas 10 familias» coherentes en ES/EN/CA/FR; el borrador del paso 7 decía 5 familias | Media | No se publica un número nuevo (se mantiene «unas 10») | **Decidir mínimo: 5 o unas 10** |
| `dossier-iglesias.html` | «pueden comenzar acompañando a 5 familias» | Baja | No | Coherencia con el mínimo anterior |
| `_private/dossier-templates/*uae*`, `*dubai*`, `build_dossier.py` | «Official Candidate for Accreditation», «candidate status does not constitute accreditation», «Chanak Foundation» | Alta | Sí en las plantillas → «Accredited by MSA-CESS · Chanak TrainUp Education, Inc.» | **Regenerar los PDF** `assets/dossiers/Chanak_Dual_Diploma_UAE/Dubai_2026-2027.pdf` (no se han tocado) |
| `dual-diploma-uae/index.php` | Pie: «Chanak Foundation / Nonprofit 501(c)(3)» | Alta | Sí → «Chanak TrainUp Education, Inc.» | — |
| `assets/js/chanak-overrides.js`, `_private/hubs-catalog.json` | Traducciones «Candidato oficial a la acreditación» | Alta | Sí → «Acreditada por MSA-CESS» | — |
| `_next/static/chunks/0d4re92auo5v3*.js` | Referencia a la imagen `msa-candidate.jpg` | Baja | No (solo nombre de archivo) | Renombrar al recompilar |
| `/us/florida/` | «The Chanak Foundation, a 501(c)(3) nonprofit, awards need-based…» | Alta | No (cambia quién concede la ayuda) | **Decidir redacción** (propuesta: «Chanak TrainUp Education, Inc.») |
| `/florida-home-education/` | Tiene `noindex` y a la vez figura en el sitemap; es URL protegida (Parte 6) | Media | No (no se tocan páginas ESA) | ¿Quitar el `noindex`? |
| `/arizona/`, `/scholarships/arizona/`, `/scholarships/`, `scholarships.js`, `/matricula/`, `chanak-hubs.js`, `hubs-catalog.json` | «Arizona Premium / Full-Time Online ($1,125–1,350 por trimestre)» (≈120 apariciones) | Alta | No (en la lista de eliminación; no se quita sin confirmar) | **Confirmar eliminación** |
| `/arizona/` | No muestra US$275 ni US$365 (sí 320 y 295): precios distintos al resto de estados | Media | No | Revisar con el punto anterior |
| `enviar-formulario.php` (autorespuesta Off-Campus de reserva) | «Off-Campus inicia desde €250», «aprox. USD $286», «4 rutas» | Media | No (solo se usa si no hay dossier; no se tocan precios) | Reescribir con 70 €/mes + 180 € |
| `dossier-offcampus.html`, `dossier-offcampus-en.html` | «desde €250», «$286» | Media | No | Igual que el anterior |
| `js/regional-pricing.js` | «Al formalizar se abonan 250 €: matrícula de 180 € más la primera mensualidad de 70 €» | — | Coherente (180 + 70) | — |
| Dual Diploma | 24 créditos, hasta 18 reconocibles (= «hasta 75 %»): coherente; «no se ofrece en EE. UU.» presente en tarifas y `llms.txt` | — | — | — |
| `/scholarships/` | Correo `admisiones@chanakacademy.org` (solo aquí; el resto usa offcampus@, dualdiploma@, scholarships@, administration@) | Baja | No (página ESA) | ¿Existe ese buzón? |
| Páginas ESA de estado | Teléfonos de relleno `+1 (801) 000-0000`, `(602) 000-0000`, etc. | Media | No (páginas ESA) | Sustituir por el número real `+1 (305) 497-2583` o retirar |
| `_private/dossier-routing.php` | `necesidad=microschool` caía en «general» (buzón offcampus@) aunque existía la ruta `microschool` | Media | Sí: rutas `microschool`, `embajador`, `mentor` → administration@ | Confirmar buzón de Embajadores y de Mentores |
| Formularios | El encargo menciona reCAPTCHA: el sitio no tiene reCAPTCHA en ningún formulario (usa campo trampa `website`) | Baja | Los formularios nuevos usan el mismo campo trampa | ¿Añadir reCAPTCHA? |
| `/off-campus/en/`, `/dual-diploma/en/` | Error de consola de React (#418, hidratación) | Baja | No: ya ocurre en `main` | Recompilar desde el repo fuente |
| `sitemap.xml` | `/open-a-microschool` duplicada sin barra final | Baja | Sí | — |
| `/como-funciona/` | Sin `hreflang` (una sola URL con cuatro idiomas por JavaScript) | Baja | No | Valorar páginas separadas por idioma |
| `tests/verify_fixes.cjs`, `verify_microschools_coordinator_and_lang.cjs`, `country_tabs_and_includes_audit.cjs`, `portal_showcase_audit.cjs`, `audit_compliance.cjs` (2 de 10) | Comprueban la portada antigua (`rd_off_title`, pestañas de país, `data-lang="en"`) | Baja | No: **obsoletas**, ya fallaban en `main` | Retirarlas o reescribirlas |
| `tests/information_flow.php` | Añadidos casos para las rutas nuevas | — | Sí | No se pudo ejecutar: PHP no está instalado en este equipo |

## 2. Normativa por país (Parte 3D.3)

Verificación en fuente oficial (BOE, DOF/SEP, gob.ec, MEN, TSE). **La web solo publica lo confirmado.**

| País | Norma del borrador | Resultado | Qué se publica |
|---|---|---|---|
| España | RD 806/1993 | Confirmado (BOE-A-1993-16128) | Sí. Es también la base de «Lengua y Cultura Españolas» |
| España | RD 104/1988 y Orden ECD/3305/2002 como normas de «Lengua y Cultura Españolas» | **Atribución incorrecta**: regulan la homologación y convalidación de estudios extranjeros no universitarios | No en la web. Corregido en la copia del Excel del repo |
| España | CTE DB-SI | Confirmado (RD 314/2006); la accesibilidad es DB-SUA | Sí, con DB-SUA |
| Panamá | Ley 47 de 1946 | No se pudo abrir la fuente oficial | **No publicado** (queda «en verificación») |
| México | Constitución art. 3; Ley General de Educación | Confirmado | Sí |
| México | Art. 9 de la Constitución | Existe, pero no trata de educación | No publicado |
| México | Acuerdo 286 SEP | Confirmado (DOF 30-10-2000; última reforma 18-04-2017). **No permite operar sin RVOE** | Sí, aclarando que no sustituye la autorización del centro |
| Guatemala | Decreto Legislativo 12-91 | No se pudo abrir la fuente oficial | **No publicado** |
| El Salvador | Decreto Legislativo 917 | No se pudo abrir la fuente oficial | **No publicado** |
| Ecuador | LOEI | Confirmado (R.O. 417, 31-03-2011) | Sí, «y sus reformas» |
| Ecuador | Acuerdo ministerial de educación en casa | Número no confirmado (0067-13 o 2023-00063-A) | **No publicado** |
| Colombia | Ley 115 de 1994; Decreto 1075 de 2015 | Confirmado | Sí |
| Colombia | Resolución 10687 de 2019 | **Incorrecta para colegio**: es de educación superior. La de preescolar, básica y media es la Resolución 24302 de 2021 | Publicada la 24302/2021. Corregido en el Excel del repo |
| Costa Rica | Ley 7600 | Confirmado | Sí |
| Costa Rica | Ley 2160 | No se pudo abrir la fuente oficial | **No publicado** |
| Costa Rica | Decreto Ejecutivo 36967-MEP | **No localizado** como decreto de equiparación | No publicado. Corregido en el Excel del repo |

**Aviso importante sobre Costa Rica.** Los lineamientos del MEP sobre reconocimiento de títulos excluyen expresamente los
diplomas extranjeros obtenidos por estudiantes que cursan dentro del país mediante programas «online» o «home school» de
instituciones no acreditadas por el MEP. El resumen público se ha redactado con prudencia; conviene una revisión jurídica
antes de ofrecer la modalidad allí.

Se modificaron tres celdas de la hoja `Normativa_datos` en la copia del repo
(`assets/descargas/Calculadora-Presupuesto-Microschool-Chanak-ES.xlsx`): España, Colombia y Costa Rica. El original de Mariela no se tocó.

## 3. Rutas ESA protegidas (Parte 6)

No se ha modificado ningún archivo de estas rutas (`git diff main` vacío para todas).

| Ruta | Estado | Existe (200) | En sitemap | Observación |
|---|---|---|---|---|
| `/florida-home-education/` | Florida | Sí | Sí | Tiene `noindex` desde antes |
| `/arizona/` | Arizona | Sí | Sí | Precios propios (ver tabla) |
| `/utah/` | Utah | Sí | Sí | 275 / 320 / 365 / 295 presentes |
| `/wyoming/` | Wyoming | Sí | Sí | Ídem |
| `/alabama/` | Alabama | Sí | Sí | Ídem |
| `/south-carolina/` | South Carolina | Sí | Sí | Ídem |
| `/new-hampshire/` | New Hampshire | Sí | Sí | Ídem |
| `/scholarships/` | Hub | Sí | Sí | Enlaza a los siete estados con un clic |
| `/scholarships/<estado>/` (6 espejos) | — | Sí | No (canonical a la ruta principal) | Sin cambios |

## 4. Decisiones pendientes de Mariela

1. Embajadores: días de atribución, mínimo de pago y correo del programa (marcados `PENDIENTE_MARIELA` en comentarios HTML).
2. Embajadores: términos legales y divulgación de compensación (borradores `noindex`).
3. Mentores: requisitos, formación y compensación.
4. Microschool: condiciones económicas de alianza por país; importe de la cuota de incorporación; horas de certificación de Guías.
5. Microschool: mínimo de familias (5 o unas 10).
6. Microschool España: orientación «desde unos 400 €/mes» **[CONFIRMAR]** (no se publicó la cifra) y titularidad por Asociación EducaFe **[CONFIRMAR]**.
7. EE. UU.: «las instalaciones se verifican antes de abrir» **[CONFIRMAR]** el procedimiento exacto en Florida.
8. Normas no publicadas (Panamá, Guatemala, El Salvador, Costa Rica 2160, acuerdo de Ecuador) y revisión de la hoja por un asesor.
9. URL exacta usada como «enlace especial» en las solicitudes ESA.
10. Versión en inglés del previo normativo (hoy el detalle por país se muestra en español en EN/CA/FR).
11. Texto Core en la portada: propuesta (sin aplicar) de sustituir la frase del bloque «Método» por el párrafo síntesis.
12. «Opción 1 (institucional)» del Plan de Estudios Core: no venía en el encargo (`docs/PLAN-DE-ESTUDIOS-CORE.md`).
13. Calculadora: se añadió el campo opcional «matrícula anual», que solo suma al resultado anual; el resto reproduce las fórmulas de la hoja.
14. Arizona Premium / Full-Time Online; redacción de `/us/florida/`; `noindex` de Florida; teléfonos de relleno.
