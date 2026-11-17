# Decisiones institucionales aplicadas · 2026-11-17

Decisiones comunicadas por dirección; se implementan sin pedir nueva confirmación. Lo que sigue pendiente de aprobación está
marcado y **no** se publica como condición oficial.

## Programa de Embajadores (`/unete/embajadores/` y `/en/join/ambassadors/`)

| Condición | Estado | Dónde se ve |
|---|---|---|
| Ventana de atribución: 30 días desde el último clic válido | **Aprobada** | Landing, FAQ y términos (borrador) |
| Liquidación mensual | **Aprobada** | Landing y términos |
| Pago dentro de los 30 días posteriores al cierre del período | **Aprobada** | Landing y términos |
| Correo oficial: administration@chanakacademy.org | **Aprobada** | Pie de la landing; ruta del formulario `embajador` |
| Comisión solo sobre matrículas efectivamente cobradas y no reembolsadas | **Aprobada** | Landing y términos |
| Mínimo de pago US$50 | **Propuesta, pendiente de aprobación** | Solo en los términos (borrador `noindex`) y como comentario HTML; la landing dice «se confirma por escrito» |
| Porcentaje de comisión | **Pendiente de definición** | No se publica ningún porcentaje. El rango «50 a 150 USD por estudiante» procede de la landing original aportada |
| Los embajadores no representan legalmente a Chanak ni garantizan admisiones, becas, acreditaciones o reconocimientos | **Aprobada** | Landing (reglas «No»), términos |

Términos del programa y divulgación de compensación siguen en `noindex` hasta su revisión legal.

**Atribución y privacidad.** Hoy no existe ningún seguimiento de embajadores en el sitio (ni código ni enlace con identificador):
no se ha simulado. Cuando se implemente deberá: guardar solo el identificador de referencia; no rastrear a las familias en otros sitios;
activar cualquier medición opcional solo con consentimiento (clave `chanak_ck` de `consent-tracking.js`); y asociarlo a la matrícula
en el SIS. Los parámetros UTM que ya guarda el sitio viven solo en `sessionStorage`.

## Programa de Mentores (`/unete/mentores/` y `/en/join/mentors/`)

Requisitos publicados: hoja de vida actualizada y referencias; entrevista de evaluación; verificación de antecedentes y protección de
menores según el país; formación institucional obligatoria; conocimiento de Mastery Learning, PEI, SIS, Chanak Flex y seguimiento
académico; evaluación y aprobación antes de atender familias; compromiso con la identidad cristiana y las políticas de Chanak.
La compensación se fija por contrato según los servicios efectivamente prestados (mentoría familiar, sesiones individuales o
coordinación académica). **No se publica ninguna tarifa.** La certificación no garantiza contratación.

## Microschool & Academic Partnerships

| Condición | Estado | Dónde se ve |
|---|---|---|
| Alianzas comerciales y académicas directamente con Chanak International Academy (operada por Chanak TrainUp Education, Inc.), en USA e International | **Aprobada** | `/microschools/` y `/open-a-microschool/` (4 idiomas), bloque «Alianza directa con Chanak» y tabla por país |
| Sin referencias a Asociación EducaFe como titular, intermediaria, promotora u operadora | **Aprobada** | Eliminadas de microschools, open-a-microschool, alianzas, cómo funciona, universidad, pie de página y ruta de formulario `hub` (ahora → administration@) |
| Mínimo de lanzamiento: 10 familias | **Aprobada** | Todas las páginas Microschool, `llms.txt`, `ai.txt` |
| El operador local responde de instalaciones, personal presencial y autorizaciones locales | **Aprobada** | Bloque de condiciones y tabla |
| Chanak proporciona los servicios académicos y tecnológicos del acuerdo | **Aprobada** | Bloque de condiciones |
| Certificación sujeta a completar la formación y superar la evaluación | **Aprobada** | Bloque de condiciones y camino del socio |
| Formación inicial de Guías: 40 horas | **Propuesta, pendiente de aprobación institucional** | **No se publica**; la web dice «la duración se confirma en el acuerdo» |
| Cuota de incorporación exonerada para los primeros socios piloto | **Propuesta; no anunciar como condición oficial** | **No se publica**; la web remite a la propuesta por escrito |
| Condiciones económicas según país, programa y servicios | **Aprobada** | Bloque de condiciones. Sin cánones, porcentajes ni cuotas por estudiante |
| Sin cobertura automática de la acreditación a centros independientes | **Aprobada** | Bloque de condiciones y FAQ |
| Eliminar referencias a cuotas «desde 400 €/mes en España» | **Aplicada** | No aparecen en la web, la tabla ni la documentación |

## Navegación

Rótulo **Off Campus K–12** (sin sustituirlo por «Homeschool K–12»), con las modalidades **Homeschool Guiado** y
**Full Enrollment · Guided Virtual School** en el desplegable. Microschools y Dual Diploma siguen como ofertas separadas.

## Fuera de este encargo (no se ha tocado)

Arizona Premium / Full-Time Online; la referencia a Chanak Foundation en `/us/florida/`; el `noindex` de `/florida-home-education/`;
la normativa de educación en casa de Ecuador (no se publica ningún número de acuerdo).

## Pendiente de aprobación o de revisión legal

Mínimo de pago de embajadores (US$50) y porcentaje de comisión; términos y divulgación de embajadores; formación de Guías (40 h);
cuota de incorporación; condiciones económicas de alianza; aviso «International Education and Regulatory Notice» (texto en inglés,
marcado `PENDIENTE_REVISION_LEGAL` en el HTML).


## Acreditación MSA-CESS (carta ONOA verificada)

Datos publicados, comprobados contra la carta ONOA: decisión del 6 de noviembre de 2026 (Commissions on Elementary and Secondary Schools de
Middle States); alcance Kindergarten–Grade 12; vigencia 7 años, hasta el 1 de enero de 2034; código institucional MSA FL175; carta firmada por
Christian Talbot, President; Mid-Term Report el 1 de diciembre de 2030; visita del equipo en primavera de 2033. No se publica nada más.

- Páginas `/acreditacion/`, `/en/accreditation/`, `/ca/acreditacio/`, `/fr/accreditation/` (`tools/build_acreditacion.py`), con la sección «Qué significa la
  acreditación MSA-CESS» y JSON-LD (credencial con fecha de decisión, vigencia y código).
- **No se publica:** el informe final del equipo (se retiró su enlace de la página), el portal de miembros, el paquete de celebración ni ningún enlace awstrack.
  La carta ONOA sigue enlazada porque ya estaba publicada en `main` y responde sin iniciar sesión; **confirmar con dirección si puede enlazarse públicamente**
  (idealmente alojando el PDF en el sitio).
- Eliminados «candidate/candidata/candidato» y la insignia `msa-candidate.jpg`; las plantillas y generadores de dossiers (`_private/dossier-templates/`,
  `tools/generate_*_dossiers.py`) usan la fórmula acreditada. **No se regeneró ningún PDF.**
- **Logo MSA:** se usa el `msa-logo-clean.png` de `main`. Hay que confirmar las normas de uso del sello para miembros acreditados; si hubiera dudas, dejar solo texto.

## Presupuesto de Microschool por alcance

- Desplegable obligatorio «Alcance de la escuela» (5 opciones) en la hoja (`Inicio!C7`) y en la web. «Kinder y lectura inicial» = tramo K–2 por defecto
  (**confirmar con dirección**). Los alcances se componen de 4 tramos (K–2, 3–5, 6–8, 9–12); Escuela completa = suma de los tramos.
- Origen único de datos: hojas `Parametros_alcance` (alcances, ratios, aulas, m², costes, partidas condicionadas) y `Normativa_datos`, en
  `assets/descargas/Calculadora-Presupuesto-Microschool-Chanak-ES.xlsx`. La web lee `assets/data/presupuesto-alcance.json` y `normativa-paises.json`,
  generados con `tools/build_presupuesto_json.py` y `tools/build_normativa.py`.
- Supuestos iniciales (editables, marcados «supuesto editable»): ratios alumnos/guía 8 · 10 · 12 · 15, alumnos por aula 12 · 15 · 18 · 20, m² por alumno 3 · 2,5 · 2,5 · 2,5.
  **Son valores de partida, no datos oficiales.** Los importes (coste por guía, materiales, tecnología, coordinador) quedan vacíos.
- `Cuotas_Chanak`: vacía en la versión pública. Si se precarga (versión de propuesta), la cuota por alumno se aplica solo a los alumnos de los tramos activos; con la tabla vacía no aparece ningún importe de Chanak.
- Hoja `Comparar_alcances`: los cinco alcances en paralelo. Previo normativo: país + notas por etapa. **Las notas por etapa son genéricas** («verificar en fuente oficial»):
  no se han inventado requisitos por etapa; pendiente de verificación legal.
- Pruebas: `node tests/budget_scope.cjs` compara el cálculo web con la hoja (fórmulas evaluadas con `tools/test_hoja_presupuesto.py`) en 3 escenarios × 5 alcances.

## Pendiente de decisión (no rellenado)

Alcance exacto de «Kinder y lectura inicial»; ratios y partidas por tramo; si la ONOA puede enlazarse públicamente y cómo usar el logo MSA; verificación legal de la normativa por país y por etapa.
**Mínimo de familias:** se mantiene 10 (decisión institucional del 17 nov.); el prompt de rescate lo lista otra vez como abierto: confirmar.
