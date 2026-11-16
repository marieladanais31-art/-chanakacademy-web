# -*- coding: utf-8 -*-
"""Plan de Estudios Core (versión web y familias) en ES, EN, CA y FR. Tres componentes de un mismo currículo.
Redacción ajustada: sin promesas absolutas (ver docs/PLAN-DE-ESTUDIOS-CORE.md)."""

EYE = dict(es='Plan de Estudios Core', en='Core Curriculum', ca='Pla d’Estudis Core', fr='Programme Core')
H2 = dict(es='Nuestro modelo académico Core: rigor, dominio y propósito', en='Core Curriculum Framework: rigor, mastery and purpose',
          ca='El nostre model acadèmic Core: rigor, domini i propòsit', fr='Notre modèle académique Core : rigueur, maîtrise et sens')
SYN = dict(
    es='El currículo Core de Chanak International Academy combina el rigor académico de los Estándares B.E.S.T. de Florida con el Mastery Learning, todo ello enmarcado en una cosmovisión cristiana. Con este modelo integrado buscamos que cada estudiante alcance un dominio profundo de las competencias esenciales a su propio ritmo, mientras desarrolla un carácter íntegro y un pensamiento crítico fundamentado en principios bíblicos.',
    en='Chanak International Academy’s Core Curriculum is built on three integrated elements that support academic rigor, individualized mastery and holistic character formation.',
    ca='El currículum Core de Chanak International Academy combina el rigor acadèmic dels Estàndards B.E.S.T. de Florida amb el Mastery Learning, tot plegat emmarcat en una cosmovisió cristiana. Amb aquest model integrat busquem que cada estudiant assoleixi un domini profund de les competències essencials al seu propi ritme, mentre desenvolupa un caràcter íntegre i un pensament crític fonamentat en principis bíblics.',
    fr='Le programme Core de Chanak International Academy associe la rigueur académique des standards B.E.S.T. de Floride au Mastery Learning, le tout dans une vision chrétienne du monde. Avec ce modèle intégré, nous cherchons à ce que chaque élève atteigne une maîtrise approfondie des compétences essentielles à son propre rythme, tout en développant un caractère intègre et une pensée critique fondée sur des principes bibliques.')
INTRO = dict(
    es='En Chanak International Academy creemos que la excelencia académica y la formación en valores cristianos caminan de la mano. Nuestro currículo Core integra tres elementos esenciales:',
    en='At Chanak International Academy we believe that academic excellence and formation in Christian values go hand in hand. Our Core Curriculum integrates three essential elements:',
    ca='A Chanak International Academy creiem que l’excel·lència acadèmica i la formació en valors cristians van de bracet. El nostre currículum Core integra tres elements essencials:',
    fr='Chez Chanak International Academy, nous croyons que l’excellence académique et la formation aux valeurs chrétiennes vont de pair. Notre programme Core intègre trois éléments essentiels :')
ITEMS = [
    (dict(es='Estándares B.E.S.T. de Florida', en='Florida B.E.S.T. Standards', ca='Estàndards B.E.S.T. de Florida', fr='Standards B.E.S.T. de Floride'),
     dict(es='el qué', en='the what', ca='el què', fr='le quoi'),
     dict(es='Usamos los estándares académicos del estado de Florida como guía de rigor y calidad, para que nuestros alumnos dominen las habilidades clave en lenguaje, matemáticas, ciencias y estudios sociales necesarias para afrontar con solidez estudios universitarios internacionales.',
          en='Our academic benchmarks are aligned with Florida’s Benchmarks for Excellent Student Thinking (B.E.S.T.) and State Academic Standards, supporting strong competencies in literacy, mathematical reasoning, scientific inquiry and civic literacy, credit transfer and college readiness.',
          ca='Fem servir els estàndards acadèmics de l’estat de Florida com a guia de rigor i qualitat, perquè els nostres alumnes dominin les habilitats clau en llenguatge, matemàtiques, ciències i estudis socials necessàries per afrontar amb solidesa estudis universitaris internacionals.',
          fr='Nous utilisons les standards académiques de l’État de Floride comme repère de rigueur et de qualité, afin que nos élèves maîtrisent les compétences clés en langue, mathématiques, sciences et sciences sociales nécessaires pour aborder avec solidité des études universitaires internationales.')),
    (dict(es='Aprendizaje por dominio, Mastery Learning', en='Mastery Learning', ca='Aprenentatge per domini, Mastery Learning', fr='Apprentissage par la maîtrise, Mastery Learning'),
     dict(es='el cómo', en='the how', ca='el com', fr='le comment'),
     dict(es='Cada estudiante avanza a su propio ritmo, pero con un estándar alto: no pasamos al siguiente tema hasta asegurarnos de que el concepto actual ha sido realmente comprendido y dominado.',
          en='Rather than advancing students by calendar alone, students demonstrate thorough understanding of each foundational concept before moving on, reducing learning gaps and building deep academic confidence.',
          ca='Cada estudiant avança al seu propi ritme, però amb un estàndard alt: no passem al tema següent fins que ens assegurem que el concepte actual ha estat realment comprès i dominat.',
          fr='Chaque élève avance à son propre rythme, mais avec un niveau d’exigence élevé : nous ne passons au thème suivant qu’après nous être assurés que la notion en cours est réellement comprise et maîtrisée.')),
    (dict(es='Cosmovisión cristiana', en='Biblical Christian worldview', ca='Cosmovisió cristiana', fr='Vision chrétienne du monde'),
     dict(es='el para qué', en='the why', ca='el per què', fr='le pourquoi'),
     dict(es='Educamos la mente y el corazón. Integramos los principios bíblicos de manera transversal para cultivar el carácter, la ética y el pensamiento crítico, preparando a nuestros jóvenes no solo para aprobar exámenes, sino para vivir con propósito.',
          en='Faith, ethics and character formation are woven across all disciplines. We cultivate critical thinking and academic excellence within a Christ-centered framework, equipping students to engage the world with wisdom, integrity and purpose.',
          ca='Eduquem la ment i el cor. Integrem els principis bíblics de manera transversal per cultivar el caràcter, l’ètica i el pensament crític, preparant els nostres joves no només per aprovar exàmens, sinó per viure amb propòsit.',
          fr='Nous éduquons l’esprit et le cœur. Nous intégrons les principes bibliques de manière transversale pour cultiver le caractère, l’éthique et la pensée critique, en préparant nos jeunes non seulement à réussir des examens, mais à vivre avec un but.')),
]
CTX = dict(
    es='Dentro del modelo 60/20/20: 60 % núcleo académico americano (Core), 20 % extensión local y 20 % Life Skills y cosmovisión bíblica.',
    en='Within the 60/20/20 model: 60% American academic core (Core), 20% local extension and 20% Life Skills and biblical worldview.',
    ca='Dins del model 60/20/20: 60 % nucli acadèmic americà (Core), 20 % extensió local i 20 % Life Skills i cosmovisió bíblica.',
    fr='Dans le modèle 60/20/20 : 60 % de tronc académique américain (Core), 20 % d’extension locale et 20 % de Life Skills et de vision biblique du monde.')


def section(lang, soft=True):
    cards = ''.join(f'<div class="cx-card"><div class="cx-eyebrow">{k[lang]}</div><h3>{t[lang]}</h3><p>{p[lang]}</p></div>' for t, k, p in ITEMS)
    return f'''<section class="cx-sec{' cx-soft' if soft else ''}" id="core"><div class="cx-wrap">
<div class="cx-center"><div class="cx-eyebrow">{EYE[lang]}</div><h2>{H2[lang]}</h2><p class="cx-lead" style="max-width:860px">{SYN[lang]}</p></div>
<p style="max-width:860px;margin:22px auto 0;text-align:center">{INTRO[lang]}</p>
<div class="cx-grid cx-g3">{cards}</div>
<p class="cx-note cx-center">{CTX[lang]}</p>
</div></section>'''
