# AUDIT.md — Inventario pre-sprint (rama sprint-conversion)

Fecha: 2026-07-05 · Auditoría previa al sprint de conversión. Estado ANTES de los cambios.

Nota 2026-07-07: esta auditoría queda como histórico. Los pagos directos de matrícula a Stripe ya fueron retirados/bloqueados; la matrícula oficial pasa por `https://sis.chanakacademy.org/matricula/`.

## Páginas del sitio

| Página | Tipo | Peso | Estado |
|---|---|---|---|
| `/` (index.html) | HTML manual | 180K | OK, con placeholders de testimonios y GA4 comentado |
| `/off-campus/` | Next.js compilado | **1.9MB** | Funcional pero pesadísimo: 11 imágenes base64 (1.93MB), una foto de 346KB incrustada 4 veces |
| `/dual-diploma/` | Next.js compilado | 24K | OK; precios sin cifra visible; sin "doble titulación" en H1/H2 |
| `/dual-diploma-panama/` (+/en, /gracias, /matricula) | Next.js compilado | 12-16K | OK; matrícula multi-paso propia con redirección Stripe |
| `/diagnostico/` | HTML manual | 60K | **ROTO en encoding** (ver abajo); botón muerto; WhatsApp incorrecto |
| `/alianzas/`, `/terminos/`, `/privacidad/`, `/cookies/`, `/aviso-legal/` | HTML | — | OK |
| `/matricula/` | — | — | **NO EXISTE** (los CTAs de matrícula van a landings o Stripe) |
| `/contacto/` | — | — | NO EXISTE (el formulario de orientación está en la home `#contacto`) |
| dossier-*.html (raíz) | HTML puente | — | Redirigen; conservados por compatibilidad |

## Problemas encontrados

### Encoding (causa de los "signos extraños")
- El servidor envía `Content-Type: text/html` **sin charset**.
- `diagnostico/index.html`: `<meta charset>` en el **byte 1230** — fuera de los primeros 1024 bytes que escanea el navegador → acentos rotos según navegador/red.
- `dossier-iglesias.html`: mismo problema (byte 1237).
- Los archivos en sí están en UTF-8 correcto (0 mojibake en repo y en producción).

### CTAs de matrícula (estado ANTES)
| Ubicación | CTA | Destino actual | Problema |
|---|---|---|---|
| Home L912 | "Solicitar matrícula" (Off-Campus) | `/off-campus/` | Manda a otra landing, no a matrícula |
| Home L913 | "Solicitar matrícula" (Dual) | `/dual-diploma/#solicitud` | Manda a formulario de INFORMACIÓN |
| Home L818 | "Matricularme ahora →" | `/dual-diploma/` | Ídem |
| Off-campus | "Ya decidí — matricularme" ×3 | `<button>` React sin navegación clara | Sin destino de matrícula real |
| Dual-diploma | "Matricularme ahora" ×2 | Stripe `buy.stripe.com/28E3cw...` | CORREGIDO 2026-07-07: ahora debe pasar por SIS antes del pago |
| Panamá | matrícula multi-paso propia | form + Stripe | Se conserva solo cuando hay captura de datos previa |
- Estado histórico: no existía formulario de matrícula oficial en la web. La solución actual ya no usa Zapier; la matrícula pasa por el SIS.
- Base del multi-paso: `github-sources/chanak-dual-panama` (campos en `api/send-enrollment.js`).

### Formularios (estado ANTES)
| Formulario | Página | Envía a | Estado |
|---|---|---|---|
| Orientación/dossier (`dossierForm`) | Home `#contacto` | `/enviar-formulario.php` | OK (Brevo + leads.csv, rama actual) |
| Solicitud info (`#solicitud`) | /dual-diploma/ | `/api/send-info-request` → .htaccess → `enviar-formulario.php` | OK |
| Form compilado off-campus | /off-campus/ | `/api/brevo-lead` → `enviar-formulario.php` | OK |
| Matrícula Panamá | /dual-diploma-panama/matricula/ | `/api/send-enrollment` → `enviar-formulario.php` (+Stripe) | OK |
| Matrícula oficial | — | — | CORREGIDO 2026-07-07: ahora pasa por SIS |

### WhatsApp
- Correcto (+34 624 70 32 72 / `wa.me/34624703272`): home y config.
- **Incorrecto**: `/diagnostico/` usa `wa.me/34624702715` (botón L632 y `WHATSAPP_PHONE` L1047).

### Datos institucionales
- "FDOE" (sin L): **3 apariciones en /off-campus/** → deben ser FLDOE.
- FLDOE #134620, EIN 36-5154011, MSA-CESS Candidate: correctos en home.

### Visual
- Emojis estructurales: home (📡×11 🎓×9 🧭×9 🏠 ✝️ 📋 💻 📜 + banderas), diagnostico (🎯🔍📋🏅📐🛡⭐), off-campus (✅📋🔒📄💳🛡).
- Testimonios home = placeholders "[Testimonio real de...]" con avatares emoji 👨‍👩‍👧🎓🔍 (L926-930).
- Testimonios reales existentes SOLO en /off-campus/: Familia Rodríguez (España), Familia Martínez (Panamá), Familia García (Colombia).
- Frase a sustituir en /off-campus/: "Miles de familias ya encontraron su ruta en Chanak."

### Enlaces rotos / muertos
- `/diagnostico/` L633: "Comenzar evaluación" `href="#"` (JS lo apunta a herramienta Vercel) → eliminar según decisión.
- `/assets/video/hero.mp4`: referenciado en home, **no existe** (el poster sí; fallback funciona).
- Dossiers apuntan a Google Drive (dual-diploma L: `drive.google.com/file/d/1ZjT8bnPZ9...`).

### Medición
- GA4 en home: **comentado**, sin ID (`G-XXXXXXXXXX`).
- /dual-diploma/ y off-campus (compilados): gtag `AW-18109980849` + `GT-NSSXS5N6` con consent default denied.
- /diagnostico/: sin analítica.
- Sin eventos de conversión definidos (formulario, Stripe, WhatsApp, dossier).

### SEO
- Schema.org: /dual-diploma/ ya tiene `Course`. Faltan: `EducationalOrganization` (home), `Course` (off-campus), `Product` 50€ (diagnóstico), `FAQPage` (home).
- "doble titulación" no aparece en H1/H2 de /dual-diploma/.
- sitemap.xml: 9 URLs, falta `/matricula/`.

## Restricciones de arquitectura detectadas
- `/off-campus/`, `/dual-diploma/`, `/dual-diploma-panama/` son exports Next.js **hidratados**: editar su HTML visible lo desharía React al hidratar (el contenido vive duplicado en el payload `__next_f`). Los cambios de texto/CTA en esas páginas se aplican vía script de override post-hidratación (`/assets/js/chanak-overrides.js`) y las imágenes base64 se sustituyen por archivo con reemplazo byte-exacto en HTML **y** payload.
