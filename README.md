# Chanak Academy — Web principal (chanakacademy.org)

Sitio estático desplegado en Hostinger (`public_html`). Este repositorio ES el contenido
de `public_html`: lo que está en la raíz del repo es lo que se publica.

## Estructura

| Ruta | Contenido |
|------|-----------|
| `/` (`index.html`) | Home institucional |
| `/off-campus/` | Landing Off-Campus (export estático de Next, fuente: `chanak-landing`) |
| `/dual-diploma/` | Landing Dual Diploma (export estático de Next, fuente: `chanak-landing`) |
| `/dual-diploma-panama/` | Landing Panamá (fuente: `chanak-dual-panama`) |
| `/diagnostico/` | Landing comercial de Diagnóstico (fuente: `chanak-diagnostico`) |
| `/privacidad/`, `/cookies/`, `/aviso-legal/` | Páginas legales |
| `enviar-formulario.php` | Receptor único de formularios (PHP en Hostinger) |
| `.htaccess` | Redirecciones, compatibilidad de rutas `/api/*` y bloqueo de docs internas |
| `_next/` | Bundles compilados compartidos por las landings Next |

Documentación interna del proceso: `RECOVERY-LOG.md`, `LINK-AUDIT.md`,
`FORM-AUDIT.md`, `FASE-2-VERIFY.md` (bloqueadas al público vía `.htaccess`).

## Dominios canónicos

- SIS / matrícula: `https://sis.chanakacademy.org` — **no se toca desde este repo**
- Portal (login): `https://sis.chanakacademy.org/login`
- Fundación: `https://foundation.chanakacademy.org`
- EducaFe: `https://www.asociacioneducafe.org`

## Reglas del repositorio

1. **Nunca** subir credenciales, tokens, claves API ni datos personales de alumnos.
2. **Nunca** duplicar aquí el formulario de matrícula del SIS; `/matricula` es solo puente.
3. Los enlaces externos editables se centralizan (ver `diagnostico/site-config.js`).
4. Las landings compiladas de Next (`off-campus/`, `dual-diploma/`, `_next/`) se
   regeneran desde su repo fuente; no editar los bundles a mano salvo emergencia.

## Despliegue en Hostinger (Git nativo)

1. hPanel → **Websites → chanakacademy.org → Manage → Advanced → GIT**.
2. Crear repositorio: URL de este repo, rama `main`, directorio destino vacío
   (equivale a `public_html`).
3. Copiar la **Webhook URL** que da Hostinger y añadirla en
   GitHub → Settings → Webhooks del repo (evento: push).
4. Desde entonces, cada `git push` a `main` publica automáticamente.

Prueba tras cada deploy: `/`, `/off-campus/`, `/dual-diploma/`,
`/dual-diploma-panama/`, `/diagnostico/` y un envío de formulario real
(`enviar-formulario.php` requiere PHP activo — verificar en producción).
