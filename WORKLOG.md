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
