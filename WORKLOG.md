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
