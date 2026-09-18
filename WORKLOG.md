# WORKLOG — chanakacademy.org: web que vende

Rama de trabajo: `mejoras-venta`. Producción (= rama `main` + auto-deploy Hostinger) no se toca hasta OK final.

## 2026-07-04 — FASE 0: Inventario (solo lectura)

### Fuentes localizadas
- Backup producción antigua: `../hostinger-current/` y `~/Downloads/public_html (2).zip` (referencia intocable).
- Base actual del repo = `recovery-v3` (fases 1-4 previas verificadas) — YA PUBLICADA en producción vía GitHub→Hostinger.
- Landings Off-Campus + Dual Diploma: `../github-sources/chanak-landing` (Next.js, requiere build; ya exportadas e integradas en `/off-campus/` y `/dual-diploma/`).
- Landing Panamá: `../github-sources/chanak-dual-panama` (estática + APIs Vercel descartadas; integrada en `/dual-diploma-panama/`).
- Landing Diagnóstico: `../github-sources/chanak-diagnostico` (estática; integrada en `/diagnostico/`).
- Herramienta evaluación (NO se toca, solo se enlaza): `https://chanak-diagnostico.vercel.app/evaluacion.html`, centralizada en `diagnostico/site-config.js`.
- Video hero v2: poster en `../chanak-hostinger-web-package-v2/assets/video/` (paquete v2 descartado como base, pero el asset es recuperable si se aprueba).

### Diagnóstico de la home actual (confirmado por grep)
- Selector de idiomas duplicado (2 instancias) y sin diccionarios → roto. [Fase 2.10]
- Facebook: enlaza a una FOTO + embed plugin de la foto. [Fase 2.11]
- Sin WhatsApp en ninguna parte. [Fase 2.6]
- Sección Alianzas/Hubs presente en home (25 menciones). [Fase 2.3]
- EducaFe prominente (27 menciones). [Fase 2.3]
- 10 enlaces `href="#"` (legales sin destino; /privacidad/, /cookies/, /aviso-legal/ existen pero la home no las enlaza). [Fase 2.8]
- Sin GA4/Pixel, sin video hero, sin JSON-LD completo. [Fases 2.12 y 4]
- Stripe ya retirado de la home (hecho en recovery). Formularios ya unificados en enviar-formulario.php (base para Fase 3).

### Decisiones
- Se trabaja en rama `mejoras-venta`; publicar = merge a `main` (auto-deploy). Sustituye a la carpeta `chanak-web-final/` del prompt original.
- `_descartados/` se mantiene fuera del repo (en `recovery-v3/_descartados`).

### Preguntas abiertas (esperando respuesta)
1. URL de la PÁGINA de Facebook de Chanak.
2. Buzón para leads de diagnóstico: ¿offcampus@ o propio?
3. ¿Existen ya offcampus@chanakacademy.org y dualdiploma@chanakacademy.org?
4. Portal: ¿sis.chanakacademy.org/login (actual) o portal.chanakacademy.org?
5. Idiomas: propuesta lanzar ES/EN completos; CA/FR en fase posterior.
6. Hero: ¿poster v2 o placeholder neutro hasta foto real?

## 2026-07-04 — FASE 2: Home que vende (rama mejoras-venta)

### Hecho en index.html
- "Elige tu ruta" → 3 tarjetas: Off-Campus (70€/mes → /off-campus/), Dual Diploma (110€/mes → /dual-diploma/), Diagnóstico 50€ para indecisos (→ /diagnostico/, borde dorado). Antes abrían modales.
- Banda CTA intermedia del Diagnóstico tras la sección de servicios, dirigida al indeciso.
- Sección Hubs/Alianzas ELIMINADA de la home → nueva página /alianzas/ (enlace solo en footer). El modal antiguo "hub" ahora enlaza /alianzas/.
- Tarjeta EducaFe eliminada de la sección institucional y de la barra de acreditaciones (EducaFe solo footer).
- Banner de matrícula: barra fija inferior, 3 fases automáticas por fecha (site-config.js: hasta 31/7 anticipada; 1/8–4/9 últimas plazas; después incorporación todo el año). Cerrable, estado en sessionStorage. Sin "matrícula gratis".
- FAQ: 10 preguntas en acordeón accesible (aria-expanded), redacción prudente en legalidad/acreditación. PENDIENTE revisión de Mariela.
- Testimonios: 3 tarjetas placeholder marcadas <!-- REEMPLAZAR: testimonio real -->.
- WhatsApp: botón flotante verde (aparece a los 3s), tarjeta en sección comunidad, enlace en footer y en mensaje de éxito del formulario. Número +34 624 70 32 72 centralizado en assets/site-config.js (data-config-href).
- Formulario: opciones = Off-Campus / Dual Diploma / Diagnóstico Académico / Información general (fuera "Alianzas 2027" y token dossier-iglesias). Fila de confianza compacta bajo el botón (FLDOE #134620, 501c3, MSA candidate + "verificable públicamente"). Checkbox RGPD enlaza /privacidad/ real.
- Éxito del formulario: botón WhatsApp + apertura de landing solo si el producto la tiene.
- Footer: legales → páginas reales (/privacidad/, /cookies/, /aviso-legal/, /terminos/ nueva); Portal añadido; WhatsApp añadido; Facebook → página oficial.
- Facebook: eliminado embed de la foto; botones → https://www.facebook.com/profile.php?id=61585911365975.
- Portal: nav y footer → https://portal.chanakacademy.org (verificado que el subdominio existe).
- Video hero: <video> con poster /assets/video/hero-poster.jpg (traído del paquete v2), autoplay muted loop playsinline preload=metadata; si no hay hero.mp4 se ve el poster. PENDIENTE: video real y valoración de foto natural definitiva.
- Idiomas: ?lang= tiene prioridad (hreflang añadidos en head); diccionarios ES y EN completos con todo el contenido nuevo (banner, FAQ, tarjetas, formulario). CA/FR: actualizadas solo las claves de tarjetas y formulario — resto de claves nuevas caen a español. <!-- REVISAR TRADUCCIÓN nativa CA/FR -->.
- og-image.jpg copiada del paquete v2 a assets/ (se usará en Fase 4).

### Verificación
- node --check del JS inline: OK.
- Servidor local: 11 rutas clave responden 200 (incluidas /alianzas/ y /terminos/ nuevas).
- Sin referencias a la foto de Facebook, sin Vercel en la home, sin enlaces #hubs rotos.

### Decisiones técnicas (desvíos justificados del prompt)
- El selector de idiomas NO estaba duplicado (falso diagnóstico): se conservó el sistema inline existente en vez de reescribirlo a archivos externos. Se añadió ?lang= + hreflang.
- Se mantiene localStorage para recordar idioma (ya declarado en la política de cookies como preferencia); ?lang= tiene prioridad.
- Banner implementado como barra fija inferior para no chocar con el nav sticky.

## 2026-07-04 — Ajuste FAQ (feedback Mariela)

- fq1: reformulada — sin "¿es legal...en España?"; ahora "¿Qué obtiene mi hijo?": diploma High School Americano con certificado apostillado.
- fq2: sin UNED/UNEDasiss ni España; requisitos y homologación se consultan localmente en cada país.
- fq3: "sistema educativo de su país" en vez de español; consulta local + acompañamiento documental.
- Sincronizado en HTML + diccionarios ES y EN.

## 2026-07-04 — FASE 3: Formularios, autorespuesta y registro de leads

### enviar-formulario.php (reescrito sobre la base existente)
- GARANTÍA NO-PÉRDIDA: lead → /_private/leads.csv (con lock) ANTES de enviar correos; si mail falla, éxito al usuario + registro en /_private/mail-errors.log.
- Enrutamiento CONFIRMADO por campo `necesidad` (offcampus/dual/diagnostico/info→general) con fallback por texto para las landings compiladas:
  off-campus→offcampus@; dual→dualdiploma@; diagnostico→offcampus@ (PENDIENTE buzón propio); general→AMBOS; hub (legado)→rededucativa@educafe.
- Asunto interno: "Solicitud web [PROGRAMA] — nombre (país)". Reply-To = email de la familia.
- Autorespuesta por producto (textos editables al inicio del PHP): confirmación, qué pasa en 24h, WhatsApp +34 624 70 32 72, enlace a su landing, línea FLDOE #134620 verificable + High School apostillado. General y Diagnóstico invitan al Diagnóstico 50€.
- Envío: API Brevo si existe /_private/brevo-key.php (subir por File Manager, NUNCA al repo), si no mail() de Hostinger. Plan B Web3Forms documentado en comentario.
- Buzones destino = Google Workspace (MX verificado → Google). Dominio SIN SPF publicado: recomendación en README (include Google + Hostinger).

### Protecciones
- /_private/ bloqueada: .htaccess propio (Require all denied) + regla [F] en .htaccess raíz + el PHP la autocrea si no existe.
- .gitignore: leads.csv, mail-errors.log, brevo-key.php jamás al repo.
- Honeypot: campo oculto `website` en el formulario de la home (el PHP ya lo filtraba); las landings ya pasaban por el mismo endpoint.

### Verificación
- JS de la home: node --check OK.
- PHP: no hay binario php en este Mac — `php -l` y envío real DEBEN probarse en Hostinger (checklist en README). PHP usa arrow fn (requiere PHP ≥7.4; Hostinger usa 8.x).

### Pendiente de Mariela
- Revisar textos de autorespuesta (inicio de enviar-formulario.php).
- ¿Buzón propio para diagnóstico?
- Crear API key de Brevo y subir /_private/brevo-key.php (o pedirme instrucciones).
- Añadir SPF al DNS del dominio.

## 2026-07-04 — FASE 4: SEO y medición

- Diagnóstico confirmado → offcampus@ (anotado en el PHP).
- Home: title/description orientados a búsqueda ("colegio americano online en español"), OG + Twitter Cards (og-image redimensionada a 1200×630 con sips), JSON-LD EducationalOrganization (dirección Florida + sameAs IG/FB) y FAQPage con las 10 preguntas aprobadas.
- Off-Campus: title/desc propios + canonical + OG + JSON-LD Course. Dual Diploma: ídem (antes compartían title genérico y Dual no tenía description).
- Diagnóstico: canonical + OG + JSON-LD Product 50€. OJO: esa landing ya traía Google Ads AW-18109980849 y Meta Pixel 1697477548238291 activos — NO tocados.
- Panamá: description + canonical + OG añadidos. Legales: canonical añadido a privacidad/cookies/aviso-legal.
- sitemap.xml (9 URLs) + robots.txt (bloquea /_private/ y el endpoint PHP; declara sitemap).
- .htaccess: forzado https+www (301), 301 dossier-offcampus.html→/off-campus/ y dossier-dualdiploma.html→/dual-diploma/, gzip (mod_deflate), caché de assets (mod_expires, HTML sin caché).
- Medición: bloques GA4 y Meta Pixel COMENTADOS en el head de la home (el Pixel con el ID real de diagnóstico anotado; activar idealmente con consentimiento). gtag('event','generate_lead') + fbq('track','Lead') en el éxito del formulario, protegidos con typeof.
- Rendimiento: loading="lazy" decoding="async" en 6 imágenes bajo el pliegue; hero video con preload="metadata"; peso home ≈1,46MB sin video (<1,5MB objetivo).
- README: 3 pasos post-lanzamiento (GA4, Search Console + sitemap, Google Business Profile).

### Verificación Fase 4
- node --check JS home: OK. JSON-LD parseados como JSON válido en las 4 páginas (5 bloques).
- Pendiente Mariela: TXT SPF en DNS (en curso), crear GA4 y descomentar bloques.

## 2026-09-18 — Entrada a mercados: precios reales, claims y móvil (rama `mercados-2026-27`)

### Precios: catálogo único
- `js/regional-pricing.js` reescrito como **única fuente de verdad**. Regla: solo
  entran importes confirmados en un PDF oficial o en la configuración de pago; lo
  no aprobado lleva `status:'on_request'` y la web muestra "Plan de colegiatura
  personalizado" en vez de una cifra.
- Retiradas las tarifas que no constan en ningún documento aprobado (Off-Campus
  165/195 €, Dual 135 €, y los importes de MX/PA/US/GLOBAL inventados).
- Publicados los importes reales: ES Dual Diploma 110/129/148/167 € + matrícula
  210 € + diagnóstico 35 € (PDF España pág. 11); MX 140/180/220/260 USD +
  matrícula 250 USD + evaluación 50 USD (PDF México pág. 8); PA evaluación 50 USD,
  matrícula 250 USD, anual desde 1.400 USD (ya publicado en /dual-diploma-panama/);
  diagnóstico 50 €. UAE/Dubái siguen en `_private/commercial-pricing.php`.
- `REGIONAL_PRICING_CATALOG` se deriva del catálogo único: no hay dos listas.
- **SIS intacto**: `buildSisEnrollmentUrl()` conserva los mismos parámetros y destino.

### Claims legales
- Fuera "convalidable ante la SEP" (/mx/) y "convalidable ante MEDUCA" (/pa/).
- "Convalidación de hasta 75%" sin matiz → redacción de los PDF: hasta 18 de 24
  créditos pueden proceder del expediente local, **sujeto a evaluación individual;
  el reconocimiento no es automático**. Corregido en HTML y en los diccionarios
  i18n de la home (ES y EN), no solo en el HTML visible.
- Añadido en todas las páginas nuevas el estado real de MSA: candidata, visita
  completada, resolución noviembre 2026, "no acreditada por MSA todavía".

### Selector de país
- Prioridad nueva: bloqueo de página (`<html data-chanak-country="MX">`) > `?country=`
  > cookie > zona horaria. `/mx/` ya no arranca en "España / Europa (EUR)".
- Corregida la detección por huso: `America/*` a secas mandaba a Bogotá, Lima y
  Buenos Aires a la tarifa de EE. UU. Ahora solo husos reales de EE. UU.
- Fallback neutro `GLOBAL` en vez de `ES`.
- CSS responsivo inyectado por el propio script; en móvil el selector se reduce
  a bandera + moneda.

### Páginas
- `/mx/` reescrita: rutas y tarifa del PDF, créditos, proceso de admisión, FAQ,
  WhatsApp, CTA fijo en móvil. Es la página de la reunión de México.
- `/pa/` reescrita con los importes ya publicados de Panamá.
- `/tuition/` renderiza desde el catálogo: cambia el país y cambian las tarjetas.
  Botones "Iniciar matrícula" (SIS) + "Solicitar información" en cada tarjeta.
- `/programs/` y `/us/florida/`: claims y móvil.
- Home: nueva columna de pie **Por país** → /us/florida/, /mx/, /pa/, /tuition/,
  /programs/. Antes eran páginas huérfanas: en el sitemap pero sin un solo enlace
  interno desde la portada.

### Móvil
- Scroll horizontal eliminado en / (709 px de contenido en 390), /mx/, /pa/,
  /tuition/, /programs/, /us/florida/ y, vía `chanak-overrides.js`, en
  /off-campus/ (830 px) y /dual-diploma/.

### Verificación
- Chromium 1440 px y 390 px en las 9 rutas: sin scroll horizontal, sin errores JS
  nuevos, enlaces del SIS intactos y con sus parámetros.
- Detección por huso probada en Madrid, Ciudad de México, Panamá, Nueva York,
  Bogotá, Dubái y Buenos Aires.
- `node --check` en los 3 JS tocados y en los 5 bloques inline de la home.

### Pendiente de dirección
1. Tarifa de Off-Campus (todas las regiones) y Dual Diploma US/Internacional:
   hoy muestran "Plan de colegiatura personalizado".
2. Incoherencia en la home: un mismo párrafo dice "Para matricularse: €180 +
   primera mensualidad" y "matrícula €210". Hay que decidir cuál es.
3. Teléfonos propios de EE. UU. y México (hoy todo el sitio usa el +34).
4. Errores de hidratación React (#418) preexistentes en /off-campus/ y
   /dual-diploma/: no introducidos aquí, requieren rebuild desde `chanak-landing`.

## 2026-09-18 (tarde) — Retirada de teléfonos y WhatsApp + matrícula Off-Campus

### Contacto
- Decisión de dirección: fuera todos los teléfonos **y también WhatsApp**. La
  captación queda por formulario y correo hasta tener números de EE. UU. y México.
- `assets/site-config.js` y `-en.js`: `whatsappNumber` y `whatsappLink` vacíos +
  rutina `purgeContacts()` que elimina en tiempo de ejecución cualquier enlace
  `wa.me`, `api/web.whatsapp`, `whatsapp:`, `tel:` y el número suelto en texto.
  Se ejecuta en el mismo bucle que los guardas de matrícula, así que también
  alcanza lo que React repinta al hidratar en las landings compiladas.
- Limpieza en origen de HTML, PHP y bundles `_next`. Los CTA que eran de WhatsApp
  apuntan ahora al formulario (`/#solicitud`).
- `enviar-formulario.php`: fuera la línea "¿Prefieres hablar ya? WhatsApp…" de
  las 7 autorespuestas (ES y EN). Los campos internos `whatsapp` y el atributo
  `WHATSAPP` de Brevo se conservan: son fontanería de datos, no texto visible.

### Incidencias introducidas y corregidas en el mismo paso
- La sustitución global de la palabra "WhatsApp" alcanzó atributos y rompió
  `name="whatsapp"` en 4 formularios y `id`/`for` en 3 páginas. Restaurados; los
  campos que lee el PHP vuelven a existir con su nombre original.
- La sustitución de URLs rompió dos plantillas de JavaScript en `/diagnostico/`,
  una de ellas la del botón de pago de Stripe. Reparadas y verificadas.
- Verificación: `node --check` sobre los 44 scripts inline de las 14 páginas
  tocadas y sobre los bundles; `php -l` sobre el receptor de formularios.

### Precios
- Confirmado por dirección: **matrícula Off-Campus 180 € + primera mensualidad**
  y **matrícula Dual Diploma 210 €**. El catálogo pasa a 180 € y se retira el
  "desde 250 €" que circulaba en la home.
- Reescrito el párrafo de la home que se contradecía a sí mismo (decía 180 € y
  250 € en la misma frase).
- Sigue pendiente la **mensualidad** de Off-Campus en todas las regiones.

### Móvil
- La guarda de desbordamiento se mueve a `site-config.js`, que sí cargan todas
  las páginas. Corrige además `/universidad-eeuu/` y `/diagnostico/`.

### Verificación final (Chromium, 1440 y 390 px, 12 rutas)
- 0 enlaces de WhatsApp, 0 enlaces `tel:`, 0 apariciones del número, 0 menciones
  de la palabra WhatsApp.
- 0 scroll horizontal en las 12 rutas.
- Enlaces del SIS intactos y con sus parámetros; los 2 enlaces de Stripe de
  `/diagnostico/` intactos.
- Los errores de hidratación React #418 de `/off-campus/` y `/dual-diploma/` son
  anteriores a este trabajo y siguen ahí: requieren rebuild desde `chanak-landing`.
