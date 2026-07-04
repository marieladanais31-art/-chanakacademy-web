# Recovery log

## 2026-07-04 - Fase 1

- Creada carpeta `recovery-v3/`.
- Extraida la base limpia desde `/Users/marielaandrade/Downloads/public_html (2).zip`.
- No se modifico produccion.
- No se modificaron los paquetes contaminados `hostinger-web-package/` ni `chanak-hostinger-web-package-v2/`.
- No se integraron landings todavia.
- Verificada estructura base: `index.html`, `css/`, `js/`, `assets/` y dossiers.
- Verificado que la base no contiene el bloque roto del hero con "Accesos directos", "Landing Off-Campus", "Landing Dual Diploma", "Landing Panama" ni "Formulario general".
- Detectados enlaces antiguos a Vercel en la base limpia; quedan pendientes para fase posterior.

## 2026-07-04 - Fase 2

- Fuente Off-Campus/Dual Diploma: `github-sources/chanak-landing` commit `35856fa`.
- Se creo una copia temporal fuera del paquete final para ejecutar `npm ci` y `npm run build`.
- Se exporto Next como HTML estatico; no se reescribieron componentes, textos ni precios.
- Copiado build compartido a `recovery-v3/_next/`.
- Copiada landing Off-Campus a `recovery-v3/off-campus/` desde la salida compilada de `/`.
- Copiada landing Dual Diploma a `recovery-v3/dual-diploma/` desde la salida compilada de `/dual-diploma/`.
- Copiadas paginas legales del build Next a `recovery-v3/privacidad/`, `recovery-v3/cookies/` y `recovery-v3/aviso-legal/`, porque las landings compiladas enlazan esas rutas.
- No se copio ni adapto el API `app/api/brevo-lead/route.js`; los formularios Next quedan pendientes para Fase 4.
- Fuente Dual Diploma Panama: `github-sources/chanak-dual-panama` commit `ef5fd0d`.
- Copiada landing estatica Panama a `recovery-v3/dual-diploma-panama/`, excluyendo la carpeta `api/` porque contiene funciones Vercel/Resend que no corren en Hostinger estatico.
- Adaptadas rutas internas de Panama para funcionar bajo `/dual-diploma-panama/`.
- Movidos archivos tecnicos no publicables de Panama a `recovery-v3/_descartados/dual-diploma-panama/`: `README.md`, `package.json`, `vercel.json`.
- Fuente Diagnostico: `github-sources/chanak-diagnostico` commit `835d7bc`.
- Copiada landing comercial de Diagnostico a `recovery-v3/diagnostico/`: `index.html`, `3.png`, `logo-chanak.png`.
- No se copio `evaluacion.html`, de acuerdo con la regla de no mover la herramienta en esta fase.
- Creado `recovery-v3/diagnostico/site-config.js` con la URL verificada de la herramienta diagnostica.
- Anadido boton "Comenzar evaluacion" en la landing de Diagnostico, usando la URL centralizada en `site-config.js`.
- Creado `recovery-v3/FASE-2-VERIFY.md` con comparacion por contenido clave y verificacion local.
- Verificadas rutas locales con respuesta `200`: `/`, `/off-campus/`, `/dual-diploma/`, `/dual-diploma-panama/`, `/dual-diploma-panama/matricula/`, `/diagnostico/`, `/privacidad/`, `/cookies/`, `/aviso-legal/`.
- Verificado que dentro de las landings integradas la unica referencia a dominios de despliegue temporal es la URL de herramienta diagnostica centralizada en `diagnostico/site-config.js`.
- Pendiente para Fase 4: formularios de Off-Campus/Dual (`/api/brevo-lead`), Panama (`/api/send-enrollment`, `/api/send-info-request`) y Diagnostico.
- La prueba con navegador automatizado no se completo porque Playwright no tiene navegador instalado y Chrome del sistema aborto en modo headless.

## 2026-07-04 - Fase 3

- Reconexion de enlaces hecha solo dentro de `recovery-v3/`.
- No se modifico produccion.
- No se modificaron los paquetes contaminados `hostinger-web-package/` ni `chanak-hostinger-web-package-v2/`.
- El enlace de Portal en `index.html` ahora apunta a `https://sis.chanakacademy.org/login`.
- Los botones principales del hero ahora apuntan a `/off-campus/` y `/dual-diploma/`.
- Las tarjetas y enlaces de programa de la home ahora apuntan a las landings integradas:
  - Off-Campus: `/off-campus/`
  - Dual Diploma: `/dual-diploma/`
  - Dual Diploma Panama: `/dual-diploma-panama/`
  - Diagnostico Academico: `/diagnostico/`
- Se retiro de la home el acceso directo de pago Stripe para Dual Diploma; ahora la home lleva primero a la landing `/dual-diploma/`.
- Se conservaron los enlaces de pago que ya pertenecian a landings originales: Dual Diploma dentro de `/dual-diploma/` y Diagnostico dentro de `/diagnostico/`.
- `dossier-offcampus.html` redirige a `/off-campus/`.
- `dossier-dualdiploma.html` redirige a `/dual-diploma/`.
- Se actualizo el enlace de Diagnostico en footer y en textos traducibles de la home.
- La landing Dual Diploma tiene ancla `#solicitud`; por eso el boton de solicitud puede apuntar a `/dual-diploma/#solicitud`.
- La landing Off-Campus exportada no tiene ancla `#solicitud`; por eso sus botones apuntan a `/off-campus/` sin ancla, para no generar enlaces rotos.
- Generado `LINK-AUDIT.md` con auditoria de enlaces internos y externos del paquete.
- Movido a `_descartados/dual-diploma-panama/en/landing.html` un archivo no activo de Panama que mantenia enlaces placeholder rotos.
- Verificado que `LINK-AUDIT.md` no contiene `MISSING` ni `MISSING ANCHOR`.
- Verificado que no quedan referencias a `chanak-landing.vercel` ni `chanak-lms-portal`.
- Verificado que la unica referencia `vercel.app` restante es `diagnostico/site-config.js`, permitida para abrir la herramienta diagnostica externa.
- Pendiente para Fase 4: corregir formularios reales en Hostinger/PHP sin tocar SIS, Supabase, webhooks ni APIs externas no aprobadas.

## 2026-07-04 - Fase 4

- Formularios corregidos solo dentro de `recovery-v3/`.
- No se modifico produccion.
- No se modificaron los paquetes contaminados `hostinger-web-package/` ni `chanak-hostinger-web-package-v2/`.
- Creado `enviar-formulario.php` como receptor unico para formularios en Hostinger.
- Creado `.htaccess` para redirigir rutas antiguas de formularios al receptor PHP.
- La home dejo de abrir `mailto:` y ahora envia por `enviar-formulario.php`.
- El formulario de Diagnostico ahora envia la solicitud por `enviar-formulario.php` y conserva precio, pago Stripe y acceso a herramienta diagnostica externa.
- El formulario de Matricula Dual Diploma Panama ahora envia por `enviar-formulario.php` y conserva la redireccion posterior al pago de evaluacion de USD 50.
- El formulario ingles de Dual Diploma Panama ahora envia por `enviar-formulario.php`.
- Los bundles compilados de Off-Campus y Dual Diploma fueron ajustados para enviar por `enviar-formulario.php`.
- Creado `FORM-AUDIT.md` con mapa de formularios y destinatarios.
- Verificado que no quedan referencias activas a rutas antiguas de formularios ni a dominios Vercel no permitidos.
- No se pudo ejecutar `php -l` ni un envio real local porque PHP no esta instalado en este Mac; la prueba real debe hacerse en Hostinger despues de subir.
