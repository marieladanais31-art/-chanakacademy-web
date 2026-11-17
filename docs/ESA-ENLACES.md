# Enlaces de solicitud ESA por estado

Inventario generado el 2026-11-17 a partir del repositorio y de su historial Git (rama `claude/web-retoques-finales`). Ningún archivo de estas rutas se ha modificado respecto a `main`.

## 1. Rutas registradas (external_url de solicitudes y marketplaces)

| Estado | Ruta principal | HTTP | En sitemap | Espejo | HTTP espejo |
|---|---|---|---|---|---|
| Florida | `/florida-home-education/` | 200 | sí | — | — |
| Arizona | `/arizona/` | 200 | sí | `/scholarships/arizona/` | 200 |
| Utah | `/utah/` | 200 | sí | `/scholarships/utah/` | 200 |
| Wyoming | `/wyoming/` | 200 | sí | `/scholarships/wyoming/` | 200 |
| Alabama | `/alabama/` | 200 | sí | `/scholarships/alabama/` | 200 |
| South Carolina | `/south-carolina/` | 200 | sí | `/scholarships/south-carolina/` | 200 |
| New Hampshire | `/new-hampshire/` | 200 | sí | `/scholarships/new-hampshire/` | 200 |
| Hub central | `/scholarships/` | 200 | sí | — | — |

Las rutas espejo no están en el sitemap a propósito: su `canonical` apunta a la ruta principal.

## 2. Enlaces de solicitud vigentes en cada página y su origen en Git

Cada enlace lleva a `/matricula/` con `country`, `state`, `hub`, `service` y `grade`; esa página los traslada al flujo del SIS (ver `tests/sis_hub_flows.cjs`). «Origen» es el primer commit en que aparece el enlace exacto.

### Florida · `FL-STEPUP-EMA` · `/florida-home-education/`

| Enlace | Origen (commit · fecha) |
|---|---|
| `https://sis.chanakacademy.org/matricula?program=florida-heip&funding=scholarship&gradeBand=6-8&src=florida-home-education` | 0768791 · 2026-10-08 |
| `https://sis.chanakacademy.org/matricula?program=florida-heip&funding=scholarship&gradeBand=9-12&src=florida-home-education` | 0768791 · 2026-10-08 |
| `https://sis.chanakacademy.org/matricula?program=florida-heip&funding=scholarship&gradeBand=K-5&src=florida-home-education` | 0768791 · 2026-10-08 |

### Arizona · `AZ-ESA-CW` · `/arizona/`

| Enlace | Origen (commit · fecha) |
|---|---|
| `/matricula/?country=US&state=arizona&hub=AZ-ESA-CW&service=fulltime-15&grade=1-5&freq=quarterly` | fe6f85b · 2026-10-20 |
| `/matricula/?country=US&state=arizona&hub=AZ-ESA-CW&service=fulltime-68&grade=6-8&freq=quarterly` | fe6f85b · 2026-10-20 |
| `/matricula/?country=US&state=arizona&hub=AZ-ESA-CW&service=fulltime-912&grade=9-12&freq=quarterly` | fe6f85b · 2026-10-20 |

### Utah · `UT-UFA-ODY` · `/utah/`

| Enlace | Origen (commit · fecha) |
|---|---|
| `/matricula/?country=US&state=utah&hub=UT-UFA-ODY&service=abc-reading&grade=K-1` | d8656cb · 2026-10-19 |
| `/matricula/?country=US&state=utah&hub=UT-UFA-ODY&service=lifeskills-68&grade=6-8` | d8656cb · 2026-10-19 |
| `/matricula/?country=US&state=utah&hub=UT-UFA-ODY&service=lifeskills-912&grade=9-12` | d8656cb · 2026-10-19 |
| `/matricula/?country=US&state=utah&hub=UT-UFA-ODY&service=lifeskills-k5&grade=K-5` | d8656cb · 2026-10-19 |
| `/matricula/?country=US&state=utah&hub=UT-UFA-ODY&service=setup-295` | d8656cb · 2026-10-19 |
| `/matricula/?country=US&state=utah&hub=UT-UFA-ODY&service=support-15&grade=1-5` | d8656cb · 2026-10-19 |
| `/matricula/?country=US&state=utah&hub=UT-UFA-ODY&service=support-68&grade=6-8` | 5d4425c · 2026-10-18 |
| `/matricula/?country=US&state=utah&hub=UT-UFA-ODY&service=support-912&grade=9-12` | 5d4425c · 2026-10-18 |

### Wyoming · `WY-ESA-ODY` · `/wyoming/`

| Enlace | Origen (commit · fecha) |
|---|---|
| `/matricula/?country=US&state=wyoming&hub=WY-ESA-ODY&service=abc-reading&grade=K-1` | d8656cb · 2026-10-19 |
| `/matricula/?country=US&state=wyoming&hub=WY-ESA-ODY&service=lifeskills-68&grade=6-8` | d8656cb · 2026-10-19 |
| `/matricula/?country=US&state=wyoming&hub=WY-ESA-ODY&service=lifeskills-912&grade=9-12` | d8656cb · 2026-10-19 |
| `/matricula/?country=US&state=wyoming&hub=WY-ESA-ODY&service=lifeskills-k5&grade=K-5` | d8656cb · 2026-10-19 |
| `/matricula/?country=US&state=wyoming&hub=WY-ESA-ODY&service=setup-295` | d8656cb · 2026-10-19 |
| `/matricula/?country=US&state=wyoming&hub=WY-ESA-ODY&service=support-15&grade=1-5` | d8656cb · 2026-10-19 |
| `/matricula/?country=US&state=wyoming&hub=WY-ESA-ODY&service=support-68&grade=6-8` | 5d4425c · 2026-10-18 |
| `/matricula/?country=US&state=wyoming&hub=WY-ESA-ODY&service=support-912&grade=9-12` | 5d4425c · 2026-10-18 |

### Alabama · `AL-CHOOSE-CW` · `/alabama/`

| Enlace | Origen (commit · fecha) |
|---|---|
| `/matricula/?country=US&state=alabama&hub=AL-CHOOSE-CW&service=support-15&grade=1-5` | 247d26a · 2026-10-20 |
| `/matricula/?country=US&state=alabama&hub=AL-CHOOSE-CW&service=support-68&grade=6-8` | 5d4425c · 2026-10-18 |
| `/matricula/?country=US&state=alabama&hub=AL-CHOOSE-CW&service=support-912&grade=9-12` | 5d4425c · 2026-10-18 |

### South Carolina · `SC-ESTF-CW` · `/south-carolina/`

| Enlace | Origen (commit · fecha) |
|---|---|
| `/matricula/?country=US&state=south-carolina&hub=SC-ESTF-CW&service=support-15&grade=1-5` | 247d26a · 2026-10-20 |
| `/matricula/?country=US&state=south-carolina&hub=SC-ESTF-CW&service=support-68&grade=6-8` | 5d4425c · 2026-10-18 |
| `/matricula/?country=US&state=south-carolina&hub=SC-ESTF-CW&service=support-912&grade=9-12` | 5d4425c · 2026-10-18 |

### New Hampshire · `NH-EFA-CW` · `/new-hampshire/`

| Enlace | Origen (commit · fecha) |
|---|---|
| `/matricula/?country=US&state=new-hampshire&hub=NH-EFA-CW&service=support-15&grade=1-5` | 247d26a · 2026-10-20 |
| `/matricula/?country=US&state=new-hampshire&hub=NH-EFA-CW&service=support-68&grade=6-8` | 5d4425c · 2026-10-18 |
| `/matricula/?country=US&state=new-hampshire&hub=NH-EFA-CW&service=support-912&grade=9-12` | 5d4425c · 2026-10-18 |

## 3. Enlaces históricos que ya no están y por qué no se restauran

Se comparó cada URL de las páginas ESA, del hub `/scholarships/`, de `chanak-hubs.js`, de `hubs-catalog.json` y de `/matricula/` en
los 40 commits que las tocaron frente a la versión actual. Resultado: **no hay ningún enlace de solicitud o pago comprobable que se haya perdido por error**; las diferencias son cambios de producto deliberados, salvo un caso abierto (las tres clases en vivo de Utah y Wyoming, abajo).

| Enlace histórico | Dónde y cuándo | Por qué no se restaura |
|---|---|---|
| `service=support`, `service=lifeskills` (sin grado), `service=support-k5&grade=K-5` | Alabama, Carolina del Sur, New Hampshire, Utah, Wyoming (commits f6a407c a 5d4425c, 18-20 oct) | Formatos superados. `matricula/index.html` sigue interpretando `support-k5` y los traduce a `support-15` fuera de Florida; los enlaces actuales usan el servicio por tramo de grado |
| Life Skills independiente (US$120/mes) con enlace directo de matrícula en Alabama, Carolina del Sur y New Hampshire | Existió del 18 al 20 de oct. | El commit 247d26a («surgical update… compliance») lo sustituyó a propósito por «Request Schedule → #formulario» y por el texto «Use 'Request Schedule / Confirm Availability' to secure placement». El catálogo del SIS conserva `AL/SC/NH-LS-120`, pero no hay un flujo web que lo exija; en Utah y Wyoming el enlace directo sigue activo |
| `bundle-live`, `english-live`, `spanish-live` en Utah y Wyoming (clases en vivo: US$520, US$240 y US$240 al mes) | Tarjetas con enlace directo desde d8656cb (19 oct) hasta 434a48d («parent-first», 25 oct) | **Caso abierto.** Hoy las tres ofertas siguen como opciones del formulario de contacto, pero sin tarjeta ni enlace de matrícula. `/matricula/` sí reconoce los tres servicios (19 referencias), pero el catálogo del SIS (`UT-UFA-ODY`, `WY-ESA-ODY`) solo lista 5 servicios y no incluye ninguno de ellos. `tests/odyssey_offerings_audit.cjs` espera las 11 ofertas y ya falla en `main`. No se restauran sin saber cuáles de las 11 están aprobadas hoy en Odyssey |
| Servicios sueltos de Arizona (`abc-reading`, `classes-bundle`, `english-live`, `spanish-live`, `lifeskills`, `support*`) | Hasta 247d26a / fe6f85b (20 oct) | Arizona pasó a presentar solo la escuela a tiempo completo con precio trimestral. **Arizona Premium / Full-Time Online está fuera del alcance de este encargo** |
| `sis.chanakacademy.org/matricula?program=alabama-homeschool` y `?program=ar-interest` en Florida | Commits 1a8fdf0 y 0768791 | Programas que no existen hoy (no hay página de Arkansas) |
| `https://www.chanakacademy.org/hogar/` | Enlaces de pie de varias páginas | La carpeta `hogar/` nunca existió en el repositorio; el commit 0184b47 corrigió esos enlaces hacia la página de cada estado |
| `foundation.chanakacademy.org` en `/us/` | Fuera del alcance (referencia a Chanak Foundation en `/us/florida/`) | No se toca |

## 4. Integración con admisiones, facturación y SIS

- Los enlaces de solicitud apuntan a `/matricula/`, que preselecciona estado, hub (`FL-STEPUP-EMA`, `AZ-ESA-CW`, `UT-UFA-ODY`,
  `WY-ESA-ODY`, `AL-CHOOSE-CW`, `SC-ESTF-CW`, `NH-EFA-CW`), servicio y grado, y envía el lead a `/enviar-formulario.php`
  (ruta `esa` / `classwallet` / `florida_pep_ema` / `alabama_choose`, buzón `scholarships@`).
- Florida usa los enlaces directos de `sis.chanakacademy.org/matricula?program=florida-heip…` (origen 0768791).
- Pruebas ejecutadas: `sis_hub_flows` (8/8), `scholarships_form_validation`, `florida_ema_audit` y `scholarships_page_audit` pasan.
  `odyssey_offerings_audit` marca 3 fallos que ya existen en `main`.
- No se ha simulado ninguna integración: la facturación por ClassWallet, Odyssey y Step Up ocurre en esas plataformas, y el SIS
  recibe los datos solo por el flujo de `/matricula/` descrito arriba.

## 5. Ramas revisadas

Además de la rama de trabajo se revisaron las puntas de las 17 ramas con enlaces SIS/ESA que `main` no tiene (`codex/*-20261008`,
`feat/regional-sis-enrollment`, `feat/chanak-flex-scholarships-primary-20261023`, `feat/enrollment-ctas-state-programs-20261023`,
`scholarship-state-pages-update`, entre otras). Todas contienen versiones anteriores de los mismos enlaces (programas `ar-interest`,
`az-interest`, `alabama-homeschool` de Florida; servicios en vivo de Utah y Wyoming); ninguna aporta un enlace de solicitud nuevo.
También se integró `origin/main` del 17 de nov. (acreditación oficial MSA ONOA y dossiers 2026–27) en esta rama.
