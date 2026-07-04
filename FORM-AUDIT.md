# Fase 4 - Auditoria de formularios

## Endpoint comun

- Archivo: `enviar-formulario.php`
- Metodo esperado: `POST`
- Respuesta esperada: JSON con `ok: true` y `success: true`
- Tecnologia: PHP `mail()` de Hostinger
- No usa Vercel, Supabase, SIS, webhooks ni APIs externas.

## Compatibilidad

- `.htaccess` redirige rutas antiguas de formularios a `enviar-formulario.php`.
- Esto evita que un navegador con archivos en cache falle si intenta llamar una ruta anterior.

## Formularios conectados

| Pagina | Formulario | Destino interno |
|---|---|---|
| `/` | Solicitar orientacion | `offcampus@chanakacademy.org`, `dualdiploma@chanakacademy.org` o `rededucativa@asociacioneducafe.org` segun seleccion |
| `/off-campus/` | Formulario compilado Next | `offcampus@chanakacademy.org` |
| `/dual-diploma/` | Solicitud Dual Diploma | `dualdiploma@chanakacademy.org` |
| `/dual-diploma-panama/matricula/` | Matricula Dual Diploma Panama | `dualdiploma@chanakacademy.org` |
| `/dual-diploma-panama/en/` | English information request | `dualdiploma@chanakacademy.org` |
| `/diagnostico/` | Solicitud de evaluacion | `offcampus@chanakacademy.org` |

## Verificacion local

- Se verifico que no quedan referencias activas a rutas antiguas de Vercel/Next para formularios.
- No se pudo ejecutar `php -l` ni probar envio real en local porque PHP no esta instalado en este Mac.
- La prueba final de envio debe hacerse despues de subir a Hostinger, con un envio real controlado.
