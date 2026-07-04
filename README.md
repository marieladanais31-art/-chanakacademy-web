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

## Formularios y leads (Fase 3)

`enviar-formulario.php` es el receptor único. Por cada envío:

1. **Guarda el lead** en `/_private/leads.csv` (SIEMPRE, antes de enviar nada).
2. Envía el **correo interno** al buzón del producto:
   - Off-Campus → `offcampus@chanakacademy.org`
   - Dual Diploma → `dualdiploma@chanakacademy.org`
   - Diagnóstico → `offcampus@chanakacademy.org` *(pendiente: ¿buzón propio?)*
   - Información general → ambos buzones
3. Envía la **autorespuesta** a la familia (personalizada por producto, con
   WhatsApp y enlace a su landing). Textos editables al inicio del PHP.
4. Si un correo falla, el usuario igual ve éxito (el lead ya está guardado)
   y el fallo queda en `/_private/mail-errors.log`.

`/_private/` está bloqueada al público por `.htaccess` (raíz y propia).
`leads.csv`, logs y claves NUNCA se suben al repo (.gitignore).

### Entregabilidad (importante)

El correo del dominio vive en **Google Workspace** (MX → Google) y los envíos
salen de Hostinger. Dos opciones, en orden de preferencia:

1. **Brevo (recomendado)**: crear una API key en Brevo y subir por File Manager
   un archivo `/_private/brevo-key.php` con:
   `<?php return 'xkeysib-XXXX';`
   El PHP la detecta solo y envía por la API de Brevo (remitente ya validado
   en la cuenta: administration@chanakacademy.org — verificar remitente
   `offcampus@chanakacademy.org` en Brevo o cambiar `from_email` en el PHP).
2. **mail() de Hostinger**: funciona sin configurar nada, pero conviene añadir
   el include de Hostinger al SPF del dominio para no caer en spam:
   `v=spf1 include:_spf.google.com include:_spf.mail.hostinger.com ~all`
   *(actualmente el dominio no publica SPF — arreglarlo también mejora Gmail).* 

**Plan B** documentado en el PHP: Web3Forms (sin backend propio).

### Prueba obligatoria antes de dar por bueno el deploy

- [ ] Enviar el formulario de la home con cada opción (Off-Campus, Dual,
      Diagnóstico, General) y verificar recepción REAL en offcampus@ y
      dualdiploma@ **incluida la carpeta de spam**.
- [ ] Verificar que llega la autorespuesta a la dirección del solicitante.
- [ ] Verificar que `/_private/leads.csv` registra cada envío (File Manager).
- [ ] Probar un formulario de `/diagnostico/` y otro de `/dual-diploma-panama/matricula/`.
- [ ] Comprobar que `https://www.chanakacademy.org/_private/leads.csv` devuelve **403**.
