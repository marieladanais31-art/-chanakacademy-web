
const MODALS = {
  plan:{lbl:'Plan Académico Completo',title:'Diploma FLDOE K-12',desc:'El colegio completo. Dos modalidades para adaptarse a tu familia.',
    body:`<div style="background:rgba(27,159,170,.06);border:1px solid rgba(27,159,170,.18);border-radius:10px;padding:1.25rem;margin-bottom:1.75rem;font-size:.9rem;color:#0c2d48"><strong>¿Para quién es?</strong> Para familias que quieren que Chanak sea el colegio principal de sus hijos, con diploma K-12 completo.</div>
    <div class="mm2"><div class="mmode"><div class="mmode-t">🏠 Off-Campus · Distancia</div><p class="mmode-d">Educación en casa. Chanak provee currículo, mentoría y diploma oficial.</p></div><div class="mmode"><div class="mmode-t">🏛️ Hub Presencial</div><p class="mmode-d">En una iglesia o comunidad con Hub aprobado. Asistencia presencial con el mismo diploma FLDOE.</p></div></div>
    <ul class="mf"><li>Diploma FLDOE #134620 reconocido internacionalmente</li><li>Currículo K-12 con Aprendizaje por Dominio</li><li>Cosmovisión bíblica en cada asignatura</li><li>Acceso al SIS en tiempo real</li><li>Life Skills incluido (20%)</li><li>Transcripts y diplomas oficiales apostillados</li></ul>
    <a href="#dossier" onclick="document.getElementById('modal').classList.remove('op');document.getElementById('dossier').scrollIntoView({behavior:'smooth'})" class="btn btn-p" style="width:100%;justify-content:center">Recibir dossier informativo →</a>`},

  offcampus:{lbl:'Plan Completo · Modalidad 1',title:'Off-Campus · Distancia',desc:'Educación cristiana desde casa, con diploma americano oficial.',
    body:`<div class="mm2"><div class="mmode"><div class="mmode-t">📍 Desde tu hogar</div><p class="mmode-d">Tu familia supervisa. Chanak es la escuela oficial registrada.</p></div><div class="mmode"><div class="mmode-t">💻 Mentoría online</div><p class="mmode-d">Videollamadas con mentora certificada y seguimiento en el SIS.</p></div></div>
    <ul class="mf"><li>Diploma FLDOE #134620</li><li>Currículo K-12 individualizado por nivel, no por edad</li><li>Aprendizaje por Dominio — avanza cuando domina</li><li>Cosmovisión bíblica en todas las asignaturas</li><li>SIS para padres y alumnos</li><li>Life Skills incluido</li><li>Transcripts y diplomas oficiales apostillados</li></ul>
    <a href="#dossier" onclick="document.getElementById('modal').classList.remove('op');document.getElementById('dossier').scrollIntoView({behavior:'smooth'})" class="btn btn-p" style="width:100%;justify-content:center">Recibir dossier informativo →</a>`},

  hub:{lbl:'Plan Completo · Modalidad 2',title:'Hub Presencial',desc:'Comunidad cristiana real. Diploma FLDOE en espacio presencial de fe.',
    body:`<div style="background:rgba(232,160,32,.07);border:1px solid rgba(232,160,32,.25);border-radius:10px;padding:1.25rem;margin-bottom:1.75rem;font-size:.9rem;color:#0c2d48"><strong>¿Hay un Hub cerca?</strong> Esta modalidad está disponible en comunidades donde Chanak ya cuenta con un Hub aprobado. Si no hay uno en tu zona, puedes solicitar información sobre cómo abrir uno, o acceder al programa Off-Campus mientras tanto.</div>
    <div class="mm2"><div class="mmode"><div class="mmode-t">🏛️ Asistencia presencial</div><p class="mmode-d">El alumno asiste al Hub de su comunidad, con mentoras Chanak certificadas en el espacio.</p></div><div class="mmode"><div class="mmode-t">🤝 Comunidad de fe</div><p class="mmode-d">Comparte el proceso educativo con otras familias de fe en un entorno presencial real.</p></div></div>
    <ul class="mf"><li>Mismo diploma FLDOE que la modalidad Off-Campus</li><li>Mentoras certificadas presentes en el Hub</li><li>Comunidad de familias con los mismos valores</li><li>Integración con la iglesia o asociación anfitriona</li><li>Transcripts y diplomas oficiales apostillados</li></ul>
    <div style="display:flex;gap:.875rem;flex-wrap:wrap">
      <a href="#dossier" onclick="document.getElementById('modal').classList.remove('op');document.getElementById('dossier').scrollIntoView({behavior:'smooth'})" class="btn btn-p">Consultar disponibilidad →</a>
      <a href="#hubs" onclick="document.getElementById('modal').classList.remove('op');document.getElementById('hubs').scrollIntoView({behavior:'smooth'})" class="btn" style="background:var(--off);color:var(--navy);border:1.5px solid var(--border)">Ver red de Hubs</a>
    </div>`},

  dual:{lbl:'Enriquecimiento · Modelo 75/25',title:'Dual Diploma',desc:'Tu hijo sigue en su colegio y añade el diploma americano FLDOE.',
    body:`<div style="background:rgba(27,159,170,.06);border:1px solid rgba(27,159,170,.18);border-radius:10px;padding:1.25rem;margin-bottom:1.75rem;font-size:.9rem"><strong>Ideal para:</strong> Alumnos de 14–18 años que quieren ampliar su perfil sin cambiar de colegio.</div>
    <div class="mm2"><div class="mmode"><div class="mmode-t">📡 Distancia</div><p class="mmode-d">Programas complementarios online. 6–10h semanales con mentoría certificada.</p></div><div class="mmode"><div class="mmode-t">🏛️ Hub Extraescolar</div><p class="mmode-d">En horario extraescolar en el Hub local, donde esté disponible.</p></div></div>
    <ul class="mf"><li>Diploma FLDOE #134620 + diploma local = dos títulos</li><li>Compatible con cualquier colegio español, latinoamericano o europeo</li><li>Solo 6–10 horas semanales adicionales</li><li>Transcripts y diplomas oficiales apostillados</li><li>Mentoría mensual personalizada</li></ul>
    <a href="#dossier" onclick="document.getElementById('modal').classList.remove('op');document.getElementById('dossier').scrollIntoView({behavior:'smooth'})" class="btn btn-p" style="width:100%;justify-content:center">Recibir dossier Dual Diploma →</a>`},

  lifeskills:{lbl:'Enriquecimiento Educativo',title:'Life Skills · Formación Integral con Perfil de Liderazgo',desc:'No es una asignatura más. Es un proceso de transformación personal y aplicación real.',
    body:`<div style="background:rgba(106,176,76,.07);border:1px solid rgba(106,176,76,.2);border-radius:10px;padding:1.25rem;margin-bottom:1.75rem;font-size:.9rem;color:#0c2d48"><strong>¿Qué es Life Skills?</strong> Un programa de formación integral que va más allá del aula: preparamos a los alumnos para diseñar, ejecutar y presentar proyectos reales desde cero.</div>
    <div class="mm2"><div class="mmode"><div class="mmode-t">📡 Distancia</div><p class="mmode-d">Programas complementarios online con talleres en directo y seguimiento de proyecto.</p></div><div class="mmode"><div class="mmode-t">🏛️ Hub Presencial</div><p class="mmode-d">Talleres presenciales, trabajo en equipo y presentación de proyectos en comunidad.</p></div></div>
    <ul class="mf">
      <li><strong>Liderazgo con propósito:</strong> principios bíblicos de liderazgo servicial aplicados a situaciones reales</li>
      <li><strong>Del concepto a la ejecución:</strong> aprenden el proceso completo de un proyecto — diagnóstico, planificación, ejecución y evaluación</li>
      <li><strong>Áreas de aplicación elegidas por el alumno:</strong> artes, finanzas personales, sostenibilidad, trabajo comunitario, emprendimiento, oratoria</li>
      <li><strong>Herramientas prácticas:</strong> pitch, presupuesto, comunicación pública, gestión del tiempo</li>
      <li><strong>Portafolio de carácter:</strong> cada alumno construye y presenta evidencia real de su desarrollo</li>
      <li>Incluido en el Plan Completo (20%). Disponible como programa independiente.</li>
    </ul>
    <a href="#dossier" onclick="document.getElementById('modal').classList.remove('op');document.getElementById('dossier').scrollIntoView({behavior:'smooth'})" class="btn btn-p" style="width:100%;justify-content:center">Recibir dossier Life Skills →</a>`},

  kinder:{lbl:'Enriquecimiento Educativo',title:'ABC Kindergarten',desc:'Base sólida desde los primeros años.',
    body:`<div class="mm2"><div class="mmode"><div class="mmode-t">📡 Distancia domiciliaria</div><p class="mmode-d">Material físico a domicilio. La familia supervisa con apoyo de mentora.</p></div><div class="mmode"><div class="mmode-t">🏛️ Hub Presencial</div><p class="mmode-d">En el Hub local donde esté disponible.</p></div></div>
    <ul class="mf"><li>Inglés desde los 4 años</li><li>Aprendizaje lúdico e individualizado</li><li>Biblia y valores desde la base</li><li>Material físico de alta calidad</li><li>Para niños de 4–6 años</li></ul>
    <a href="#dossier" onclick="document.getElementById('modal').classList.remove('op');document.getElementById('dossier').scrollIntoView({behavior:'smooth'})" class="btn btn-p" style="width:100%;justify-content:center">Recibir dossier →</a>`},

  ingles:{lbl:'Enriquecimiento Educativo',title:'Refuerzo de Inglés',desc:'Inglés académico con metodología de dominio y perspectiva cristiana.',
    body:`<div class="mm2"><div class="mmode"><div class="mmode-t">📡 Distancia</div><p class="mmode-d">Clases online. Avance por dominio real.</p></div><div class="mmode"><div class="mmode-t">🏛️ Hub</div><p class="mmode-d">Clases presenciales donde esté disponible.</p></div></div>
    <ul class="mf"><li>Inglés académico y conversacional</li><li>Preparación para exámenes internacionales</li><li>Perspectiva cristiana en los materiales</li><li>Para todas las edades y niveles</li></ul>
    <a href="#dossier" onclick="document.getElementById('modal').classList.remove('op');document.getElementById('dossier').scrollIntoView({behavior:'smooth'})" class="btn btn-p" style="width:100%;justify-content:center">Recibir dossier →</a>`},

  diagnostico:{lbl:'Enriquecimiento Educativo',title:'Diagnóstico y Nivelación Académica',desc:'El punto de partida correcto para cada alumno, sin suposiciones.',
    body:`<div style="background:rgba(27,159,170,.06);border:1px solid rgba(27,159,170,.18);border-radius:10px;padding:1.25rem;margin-bottom:1.75rem;font-size:.9rem;color:#0c2d48"><strong>¿Por qué es necesario?</strong> Muchos alumnos llegan con lagunas acumuladas que nadie detectó. El diagnóstico permite saber exactamente dónde está cada estudiante para trazar su camino real de nivelación.</div>
    <div class="mm2"><div class="mmode"><div class="mmode-t">🔍 Evaluación completa</div><p class="mmode-d">Diagnóstico individualizado en Matemáticas, Inglés y comprensión lectora para determinar el nivel real del alumno.</p></div><div class="mmode"><div class="mmode-t">📋 Plan de nivelación</div><p class="mmode-d">Con los resultados, se diseña un plan personalizado para cerrar brechas antes de iniciar cualquier programa.</p></div></div>
    <ul class="mf">
      <li>Evaluación de nivel real, no por edad ni grado escolar</li>
      <li>Identificación de brechas específicas por asignatura</li>
      <li>Plan de nivelación personalizado con Aprendizaje por Dominio</li>
      <li>Disponible para alumnos nuevos y como servicio independiente</li>
      <li>Resultado: el alumno entra al programa en el nivel correcto</li>
    </ul>
    <a href="#dossier" onclick="document.getElementById('modal').classList.remove('op');document.getElementById('dossier').scrollIntoView({behavior:'smooth'})" class="btn btn-p" style="width:100%;justify-content:center">Solicitar diagnóstico →</a>`}
};

function oModal(id){
  const m=MODALS[id];if(!m)return;
  document.getElementById('mlbl').textContent=m.lbl;
  document.getElementById('mtitle').textContent=m.title;
  document.getElementById('mdesc').textContent=m.desc;
  document.getElementById('mbody').innerHTML=m.body;
  document.getElementById('modal').classList.add('op');
  document.body.style.overflow='hidden';
}
function cModal(){document.getElementById('modal').classList.remove('op');document.body.style.overflow='';}
function cModalOut(e){if(e.target===document.getElementById('modal'))cModal();}
document.addEventListener('keydown',e=>{if(e.key==='Escape')cModal();});

window.addEventListener('scroll',()=>document.getElementById('nav').classList.toggle('sc',scrollY>20));

document.getElementById('hb').addEventListener('click',function(){
  this.classList.toggle('op');
  document.getElementById('mmenu').classList.toggle('op');
});
document.querySelectorAll('.mm a').forEach(a=>a.addEventListener('click',()=>{
  document.getElementById('hb').classList.remove('op');
  document.getElementById('mmenu').classList.remove('op');
}));

function tLang(){document.getElementById('ld').classList.toggle('op');}
function sLang(l){
  const flags={es:'🇪🇸',en:'🇬🇧',fr:'🇫🇷',pt:'🇧🇷'};
  const names={es:'ES',en:'EN',fr:'FR',pt:'PT'};
  document.getElementById('lb').textContent=flags[l]+' '+names[l]+' ▾';
  document.querySelectorAll('.lo').forEach(o=>o.classList.toggle('act',o.textContent.includes(names[l])));
  document.querySelectorAll('.mlo').forEach(o=>o.classList.toggle('act',o.textContent.includes(names[l])));
  document.getElementById('ld').classList.remove('op');
}
document.addEventListener('click',e=>{if(!e.target.closest('.ls'))document.getElementById('ld').classList.remove('op');});

const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('v');}),{threshold:0.08});
document.querySelectorAll('.fi').forEach(el=>obs.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const t=document.querySelector(a.getAttribute('href'));
  if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}
}));

// Dossier form
const dForm = document.getElementById('dossier-form');
if(dForm){
  dForm.addEventListener('submit',e=>{
    e.preventDefault();
    dForm.innerHTML=\`<div style="text-align:center;padding:2rem">
      <div style="font-size:3rem;margin-bottom:1rem">📬</div>
      <h3 style="font-family:'Playfair Display',serif;color:#0c2d48;margin-bottom:.5rem">¡Dossier en camino!</h3>
      <p style="color:#5b7a91;font-size:.9rem">Revisa tu correo en los próximos minutos. Si no lo ves, revisa la carpeta de spam.</p>
    </div>\`;
  });
}
