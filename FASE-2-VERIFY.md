# Fase 2 - Verificacion

Nota 2026-07-07: esta verificacion es historica. Los CTAs de matricula se actualizaron despues para llevar al SIS antes del pago.

## Comparacion con fuentes reales

| Landing | Fuente real | Integrada en | Resultado |
|---|---|---|---|
| Off-Campus | despliegue original y `github-sources/chanak-landing` | `/off-campus/` | Coinciden textos/precios clave: Off Campus, Homeschool, `180€ unico`, `480€ pago unico al inicio`, `730€`, `430€`. |
| Dual Diploma | despliegue original y `github-sources/chanak-landing` | `/dual-diploma/` | Coinciden textos/CTA clave: Dual Diploma, Bachillerato estadounidense, Solicitar informacion, Ver precios en el dossier, Matricularme ahora. |
| Dual Diploma Panama | despliegue original y `github-sources/chanak-dual-panama` | `/dual-diploma-panama/` | Coinciden textos/CTA clave: Dual Diploma para familias en Panama, Iniciar matricula directa, Solicita informacion personalizada, Descargar dossier PDF, Ver precios y ruta academica. |
| Diagnostico | despliegue original y `github-sources/chanak-diagnostico` | `/diagnostico/` | Coinciden textos/precios clave: Evaluacion Diagnostica Academica, Oferta de lanzamiento `50 €`, Precio regular `80 €`, Pagar evaluacion por `50 €`, Solicitar evaluacion por `50 €`. |

## Verificacion tecnica

- Rutas locales con respuesta `200`: `/`, `/off-campus/`, `/dual-diploma/`, `/dual-diploma-panama/`, `/dual-diploma-panama/matricula/`, `/diagnostico/`, `/privacidad/`, `/cookies/`, `/aviso-legal/`.
- Assets clave con respuesta `200`: `/_next/static/chunks/1ee4c-6fpawm5.js`, `/dual-diploma-panama/style-shared.css`, `/diagnostico/site-config.js`.
- No se copio `evaluacion.html` dentro de `/diagnostico/`.
- Unica referencia a dominios de despliegue temporal dentro de las landings integradas: `/diagnostico/site-config.js`, con la URL de la herramienta diagnostica.

## Nota Fase 4

- Fase 2 dejo los formularios pendientes por alcance.
- Fase 4 unifico los formularios en `enviar-formulario.php`.
- Las rutas antiguas de formularios ya no quedan como dependencia activa del paquete final.
- Diagnostico conserva su flujo comercial, precio y pago; su solicitud ahora tambien se envia por `enviar-formulario.php`.

## Nota de navegador

- La prueba con Playwright no pudo completarse porque el navegador automatizado no esta instalado en este entorno y Chrome del sistema aborto en modo headless.
