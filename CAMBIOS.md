# CAMBIOS.md — Sprint de conversión + corrección SIS

Fecha original: 2026-07-05. Actualizado: 2026-07-07.

## Actualización 2026-07-07 — matrícula oficial por SIS

- La matrícula oficial ya no depende de Zapier ni de pagos directos desde la web principal.
- Los CTAs de matrícula de Off Campus y Dual Diploma se envían a `https://sis.chanakacademy.org/matricula` con el programa preseleccionado.
- Los enlaces directos de matrícula a Stripe se bloquearon/reescribieron en HTML, bundles Next.js exportados, `assets/site-config.js` y `assets/js/chanak-overrides.js`.
- Stripe queda permitido solo para flujos de evaluación/diagnóstico donde primero se capturan datos o el pago corresponde a la evaluación, no a matrícula directa.
- El formulario legacy `/matricula/` de esta web redirige al formulario SIS para evitar duplicidad de datos.

El "antes" está en [AUDIT.md](AUDIT.md).

## 1. Matrícula oficial (SIS) — NUEVO

- **Matrícula oficial**: el formulario principal vive en `https://sis.chanakacademy.org/matricula` para que los datos entren al SIS antes del pago.
- CTAs redirigidos a `https://sis.chanakacademy.org/matricula?programa=...`:
  - Home: 2 botones "Solicitar matrícula" → "Iniciar matrícula" (`?programa=off-campus|dual-diploma&src=home-rutas`), "Matricularme ahora" de la sección Dual (`src=home-dd`), y el CTA del banner sticky (`src=sticky`).
  - Off-Campus: los botones "Ya decidí / matricularme" → SIS con `?programa=off-campus`.
  - Dual Diploma: los botones de matrícula → SIS con `?programa=dual-diploma`.
- URL centralizada en `assets/site-config.js`: `matriculaUrl`.

## 2. Captación → Brevo

- Sin cambios de arquitectura: los formularios de INFORMACIÓN ya alimentan Brevo **directamente por API** vía `enviar-formulario.php` (integración hecha ayer: listas 3/4/5/6 por producto + 7 newsletter, clave en `/_private/brevo-key.php`, log en `/_private/brevo.log`). Envían nombre, email, WhatsApp, país, programa y origen.
- El formulario de la home ya mostraba confirmación + WhatsApp; verificado.
- **Matrícula**: la automatización debe partir del SIS/Brevo, no de Zapier.

## 3. Testimonios

- Home: placeholders eliminados. Se replican los 3 testimonios reales de /off-campus/ (Familia Rodríguez · España, Familia Martínez · Panamá, Familia García · Colombia) con tarjeta limpia: 5 estrellas, avatar con inicial, y sello **icono WhatsApp SVG + "Testimonio recibido por WhatsApp"**. Ningún número visible.
- /off-campus/: mismo sello añadido a sus 3 tarjetas (verificado: 3 badges).

## 4. Imágenes e iconos

- **/off-campus/ pasó de 1.9MB a 48KB** (HTML) y su bundle de 551KB a 41KB: las 3 imágenes base64 (logos MSA/Chanak/FLDOE, una repetida 4×) ahora son archivos optimizados en `assets/img/` (msa-candidate.jpg 52KB, chanak-logo-square.jpg 72KB, fldoe-banner.jpg 15KB). Verificado que cargan.
- 6 fotos nuevas de banco libre (Pexels/Unsplash, sin atribución obligatoria) optimizadas a WebP <200KB en `assets/img/` + `CREDITS.md`: hero-home, hero-offcampus, hero-dualdiploma, hero-diagnostico, quienes-somos, metodologia.
- Integradas: poster del hero (hero-home), tarjetas de rutas de la home (3 fotos reales en vez de renders), sección Quiénes somos.
- **Emojis estructurales → SVG lineales sobrios** (monocromos, paleta del sitio) en home, /diagnostico/ y /off-campus/: ✝️🎯🌟🌍🏠💻🎓📜⚖️📊✨🧒🇺🇸🔍📡🧭📋🛡⭐🏅📐⚠️ etc. Banderas del selector de idioma fuera. Los emojis 💬 SOLO permanecen en botones de WhatsApp. Diccionarios i18n (ES/EN/CA/FR) también limpiados.
- Video hero: `preload="none"` (no descarga nada hasta interacción; ideal móvil/Instagram).

## 5. SEO

- Home: title con "Homeschool"; ya tenía Schema `EducationalOrganization` + `FAQPage`.
- /off-campus/: title ya tenía homeschool; **añadido Schema `Course`**.
- /dual-diploma/: **H2 hero ahora es "Doble titulación: Bachillerato americano sin cambiar de colegio"** (editado en HTML + bundle, verificado tras hidratación); ya tenía Schema `Course`.
- /diagnostico/: title/meta con "evaluación de nivel académico" y "test homeschool"; **añadido Schema `Product` 50€** + canonical.
- `sitemap.xml`: añadida `/matricula/`. `robots.txt` OK.
- Enlazado interno entre landings con anchor de keyword ("Doble titulación: Dual Diploma americano", "Colegio americano online homeschool", "Test de nivel homeschool (50€)") — bloque "También te puede interesar" al pie de off-campus y dual-diploma.

## 6. Coherencia y cierres de venta

- **WhatsApp unificado: +34 624 70 32 72 en TODO el sitio.** Corregido el número erróneo (…2715) de /diagnostico/ (botón + variable JS). Mensajes pre-rellenados por programa en /matricula/ y en la confirmación.
- **/diagnostico/ arreglado el encoding**: el `<meta charset>` estaba en el byte 1230 (fuera del rango que escanea el navegador → "signos extraños"); ahora en el byte 46. Igual en `dossier-iglesias.html`. Además `.htaccess` fuerza `AddDefaultCharset UTF-8` a nivel servidor. Verificado en navegador: acentos correctos.
- /diagnostico/: eliminado el botón muerto "Comenzar evaluación" (`href="#"`). CTA único: "Pagar evaluación por 50€" (Stripe) + WhatsApp.
- /dual-diploma/: precios ahora muestran **"Desde 110€/mes*"** (igual que la home) con nota explicativa.
- /off-campus/: "Miles de familias ya encontraron su ruta" → **"Familias en España, Panamá y Latinoamérica ya caminan con Chanak"**. "FDOE" → "FLDOE" (6 apariciones entre HTML y bundle).
- **Barra sticky "Matrícula 2026-27 abierta · Respuesta en 24h" + CTA** en home (banner superior existente, retextado y apuntando a /matricula/) y en las 3 landings compiladas (barra inferior fija añadida por `assets/js/chanak-overrides.js`).
- Dossier Dual Diploma: PDF descargado de Drive y servido desde el dominio (`/assets/dossiers/dossier-dual-diploma.pdf`, 3 enlaces actualizados en HTML + bundle).
- Dossier Off-Campus: el enlace de Drive estaba **muerto (404) también en producción**; los 2 enlaces ahora piden el dossier por WhatsApp (ver PENDIENTES).
- Datos institucionales verificados: FLDOE #134620, IRS 501(c)(3) EIN 36-5154011, MSA-CESS Candidate (nunca "acreditado"), EducaFe CIF G19357789, © Chanak TrainUp Education Inc.

## 7. Medición

- Home y /matricula/: instalado el mismo Google tag de las landings (GT-NSSXS5N6 + AW-18109980849) con **Consent Mode denegado por defecto**; el banner de cookies ahora actualiza el consentimiento real (`acceptCookies`/`saveCkPrefs` → `gtag consent update`), incluida la preferencia recordada de visitas anteriores.
- Eventos de conversión (home + matrícula): `whatsapp_click`, `matricula_click`, `dossier_download`, `matricula_submit`, más el `generate_lead` existente del formulario de orientación.
- Embudo rastreable con parámetro `src=` en cada CTA (home-rutas, home-dd, sticky, offcampus, dd-landing…) — llega al webhook/PHP con cada lead. No se usaron `utm_` internos para no romper la atribución de sesiones de GA4/Google Ads.

## Arquitectura (importante para futuros cambios)

Las landings /off-campus/, /dual-diploma/ y /dual-diploma-panama/ son exports Next.js **hidratados**: su contenido vive en HTML **y** en `_next/static/chunks/*.js`. Los cambios de texto se aplicaron en ambos sitios (verificado con `node --check`); los elementos nuevos se inyectan tras la hidratación con `assets/js/chanak-overrides.js` (re-aplicación idempotente cada 500ms/6s porque React puede borrar nodos del body al hidratar).

## Archivos modificados/creados

`index.html` · `matricula/index.html` (nuevo) · `diagnostico/index.html` · `off-campus/index.html` · `dual-diploma/index.html` · `dual-diploma-panama/index.html` · `dossier-iglesias.html` · `_next/static/chunks/0d4re92auo5v3.js` · `_next/static/chunks/31ckrmy3ounpv.js` · `assets/site-config.js` · `assets/js/chanak-overrides.js` (nuevo) · `assets/img/*` (9 imágenes nuevas + CREDITS.md) · `assets/dossiers/dossier-dual-diploma.pdf` (nuevo) · `.htaccess` · `sitemap.xml` · `AUDIT.md` (nuevo) · `CAMBIOS.md` (nuevo)

## PENDIENTES (acción de Mariela)

1. **Dossier Off-Campus**: el PDF de Drive da 404 (también en la web actual). Súbeme el PDF y lo coloco en `/assets/dossiers/` (mientras tanto, ese botón pide el dossier por WhatsApp).
2. **Automatización de matrícula**: mantener Brevo/SIS como flujo principal; no reactivar Zapier para matrícula.
3. Opcional: propiedad GA4 propia (G-XXXX) — hoy se mide con el contenedor GT-NSSXS5N6/AW existente. Si la creas, se añade en una línea.
4. `dossier-iglesias.html` (página legacy de iglesias) conserva sus emojis: fuera del alcance de venta actual. Si la quieres alineada, se hace en 20 min.
5. Meta Pixel en /diagnostico/ dispara sin consentimiento previo (ya era así). Recomendado moverlo tras el banner de cookies en una siguiente iteración.

## Checklist de verificación manual (5 min) antes de aprobar

1. Abre la preview de la rama y entra en `/` → se ve foto cálida en hero, iconos lineales (cero emojis), testimonios con sello WhatsApp.
2. Clic en "Iniciar matrícula" (banner superior) → `/matricula/` con el programa "general"; recorre los 4 pasos sin rellenar → no deja avanzar (validación).
3. `/matricula/?programa=dual-diploma` → el selector de programa llega preseleccionado.
4. `/diagnostico/` → acentos perfectos, un solo CTA de pago (Stripe 50€), WhatsApp termina en 72.
5. `/dual-diploma/` → H2 "Doble titulación…", "Desde 110€/mes*", botones de matrícula te llevan al SIS antes del pago.
6. `/off-campus/` → carga rápida, logos visibles, botón "Ya decidí — matricularme" te lleva al SIS antes del pago.
7. Si todo OK: merge de `sprint-conversion` a `main` + Deploy en Hostinger + envío de prueba del formulario.
