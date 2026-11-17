# -*- coding: utf-8 -*-
"""Português (pt-BR neutro, «você») da calculadora de orçamento e da guia dos 7 erros.
Overlay: associa cada texto em espanhol (chave) ao seu equivalente em português. `apply(*modules)` percorre os
módulos budget_content / errores_content e preenche o campo 'pt' sem tocar nos textos es/en/ca/fr."""

URL_BUDGET = '/pt/microschools/orcamento/'
URL_ERROS = '/pt/microschools/7-erros/'

TR = {
 '/microschools/presupuesto/': URL_BUDGET,
 '/microschools/7-errores/': URL_ERROS,
 'Calculadora de presupuesto para Microschool · Chanak': 'Calculadora de orçamento para Microschool · Chanak',
 'Calcula la inversión inicial, el gasto mensual y el punto de equilibrio de tu Microschool, y descarga el previo normativo de tu país.':
   'Calcule o investimento inicial, a despesa mensal e o ponto de equilíbrio da sua Microschool e baixe o resumo normativo do seu país.',
 'Calculadora de presupuesto para tu Microschool': 'Calculadora de orçamento para a sua Microschool',
 'Una herramienta original de Chanak para fundadores: inversión inicial, gasto mensual, ingresos y punto de equilibrio. Los campos empiezan vacíos y nada de lo que escribas sale de tu navegador.':
   'Uma ferramenta original da Chanak para fundadores: investimento inicial, despesa mensal, receitas e ponto de equilíbrio. Os campos começam vazios e nada do que você digitar sai do seu navegador.',
 'La calculadora necesita JavaScript. También puedes descargar la hoja de cálculo.': 'A calculadora precisa de JavaScript. Você também pode baixar a planilha.',
 'Consejos para presupuestar con cabeza': 'Dicas para orçar com cabeça',
 'Empieza pequeño: comparte o cede espacio con una iglesia o comunidad.': 'Comece pequeno: compartilhe ou ceda espaço com uma igreja ou comunidade.',
 'Escalona la contratación del personal a medida que crece el grupo.': 'Escalone a contratação da equipe conforme o grupo cresce.',
 'Fija la cuota con tu presupuesto en la mano, no por miedo a no llenar la escuela.': 'Defina a mensalidade com o orçamento na mão, não por medo de não encher a escola.',
 'Revisa el presupuesto cada mes: un presupuesto que no se actualiza deja de servir.': 'Revise o orçamento todo mês: um orçamento que não é atualizado deixa de servir.',
 'Procura un pequeño excedente a partir del tercer mes para crear una reserva.': 'Busque um pequeno excedente a partir do terceiro mês para formar uma reserva.',
 'El resultado es una estimación del socio, no un compromiso de Chanak. No es una oferta ni asesoramiento legal o fiscal. Las condiciones de alianza con Chanak se entregan por escrito en la propuesta de alianza.':
   'O resultado é uma estimativa do parceiro, não um compromisso da Chanak. Não é uma oferta nem assessoria jurídica ou fiscal. As condições de parceria com a Chanak são entregues por escrito na proposta de parceria.',
 'es-ES': 'pt-BR',
 'A · Plan de estudios': 'A · Plano de estudos', 'B · Instalaciones': 'B · Instalações', 'C · Personal docente': 'C · Corpo docente',
 'Legal': 'Jurídico', 'Tecnología': 'Tecnologia', 'Marketing': 'Marketing', 'Reserva': 'Reserva', 'Operación': 'Operação',
 'Currículo complementario propio (si lo mantienes)': 'Currículo complementar próprio (se você o mantiver)',
 'Opcional: el plan base lo aporta Chanak': 'Opcional: o plano-base é fornecido pela Chanak',
 'Material didáctico inicial': 'Material didático inicial', 'Libros, kits, material de aula': 'Livros, kits, material de sala de aula',
 'Formación y certificación de guías y coordinadores': 'Formação e certificação de guias e coordenadores',
 'El importe se detalla en la propuesta de alianza': 'O valor é detalhado na proposta de parceria',
 'Verificación de antecedentes del personal': 'Verificação de antecedentes da equipe', 'Según la ley del país': 'Conforme a lei do país',
 'Adecuación del local (reformas menores, pintura)': 'Adequação do local (pequenas reformas, pintura)', '': '',
 'Mobiliario de aula y almacenaje': 'Mobiliário de sala de aula e armazenamento', 'Mesas, sillas y estanterías': 'Mesas, cadeiras e estantes',
 'Seguridad contra incendios y evacuación': 'Segurança contra incêndio e evacuação',
 'Extintores, señalización, plan de evacuación': 'Extintores, sinalização, plano de evacuação',
 'Accesibilidad (rampas, baños adaptados)': 'Acessibilidade (rampas, banheiros adaptados)', 'Según normativa local': 'Conforme a norma local',
 'Licencias, permisos y trámites locales': 'Licenças, alvarás e trâmites locais', 'Uso del local, apertura, inspecciones': 'Uso do local, abertura, inspeções',
 'Constitución de la entidad legal y asesoría': 'Constituição da entidade jurídica e assessoria', 'Seguros iniciales': 'Seguros iniciais',
 'Responsabilidad civil y local': 'Responsabilidade civil e do local', 'Tecnología (equipos y red)': 'Tecnologia (equipamentos e rede)',
 'Portátiles o tabletas, router': 'Notebooks ou tablets, roteador', 'Marketing de lanzamiento': 'Marketing de lançamento',
 'Web, folletos, reuniones informativas': 'Site, folhetos, reuniões informativas', 'Fondo de imprevistos': 'Fundo para imprevistos',
 'Se recomienda reservar un margen': 'Recomenda-se reservar uma margem',
 'Alquiler o cesión del espacio y suministros': 'Aluguel ou cessão do espaço e consumos', 'Compartir o ceder espacio reduce el coste': 'Compartilhar ou ceder espaço reduz o custo',
 'Limpieza y mantenimiento': 'Limpeza e manutenção',
 'Personal docente y guías certificados (salarios y cargas)': 'Corpo docente e guias certificados (salários e encargos)',
 'Según legislación laboral local': 'Conforme a legislação trabalhista local',
 'Docentes con habilitación local (materias nacionales)': 'Docentes com habilitação local (disciplinas nacionais)',
 'Si tu país lo exige: Lengua, Historia, etc.': 'Se o seu país exigir: Língua, História etc.',
 'Coordinación y administración': 'Coordenação e administração', 'Plataforma, SIS y licencias': 'Plataforma, SIS e licenças',
 'Según propuesta de alianza': 'Conforme a proposta de parceria', 'Cuota de alianza con Chanak': 'Taxa de parceria com a Chanak',
 'Según propuesta de alianza: introduce el importe de tu propuesta': 'Conforme a proposta de parceria: informe o valor da sua proposta',
 'Material y suministros': 'Material e insumos', 'Seguros': 'Seguros', 'Promedio mensual': 'Média mensal',
 'Contabilidad y gestoría': 'Contabilidade e assessoria contábil', 'Marketing y comunidad': 'Marketing e comunidade',
 'Reuniones, redes, folletos': 'Reuniões, redes sociais, folhetos', 'Reserva mensual': 'Reserva mensal',
 'País': 'País', 'Moneda': 'Moeda', 'Ver ejemplo': 'Ver exemplo', 'Vaciar': 'Limpar',
 'Ejemplo ilustrativo, no es una oferta. Sustituye las cifras por las de tu comunidad.': 'Exemplo ilustrativo, não é uma oferta. Substitua os números pelos da sua comunidade.',
 'Partida': 'Item', 'Pilar o categoría': 'Pilar ou categoria', 'Importe estimado': 'Valor estimado', 'Añadir otra partida': 'Adicionar outro item',
 'Otra partida': 'Outro item', 'Otra': 'Outra',
 'Inversión inicial (una sola vez)': 'Investimento inicial (uma única vez)', 'Lo que necesitas antes de abrir.': 'O que você precisa antes de abrir.',
 'Gasto mensual': 'Despesa mensal', 'Lo que cuesta funcionar cada mes.': 'O que custa funcionar a cada mês.',
 'Ingresos': 'Receitas', 'La cuota la fija el socio según su realidad local.': 'A mensalidade é definida pelo parceiro conforme a sua realidade local.',
 'Resultado': 'Resultado', 'Cuota mensual por estudiante': 'Mensalidade por estudante', 'Alumnos': 'Alunos', 'Tu comunidad de familias': 'Sua comunidade de famílias',
 'Matrícula anual por estudiante': 'Matrícula anual por estudante', 'Opcional; solo suma al resultado anual': 'Opcional; só soma ao resultado anual',
 'Otros ingresos mensuales': 'Outras receitas mensais',
 'Donaciones, becas locales; fondos ESA solo en EE. UU. y según elegibilidad': 'Doações, bolsas locais; fundos ESA somente nos EUA e conforme a elegibilidade',
 'Becas y descuentos mensuales (total)': 'Bolsas e descontos mensais (total)', 'Suma de reducciones de cuota': 'Soma das reduções de mensalidade',
 'Inversión inicial total': 'Investimento inicial total', 'Gasto mensual total': 'Despesa mensal total', 'Ingresos mensuales': 'Receitas mensais',
 'Estudiantes para el punto de equilibrio': 'Estudantes para o ponto de equilíbrio', 'Resultado neto mensual': 'Resultado líquido mensal',
 'Resultado neto anual': 'Resultado líquido anual', 'Meses para recuperar la inversión': 'Meses para recuperar o investimento',
 'N/A': 'N/D', 'No se recupera': 'Não se recupera', 'Introduce la cuota mensual por estudiante.': 'Informe a mensalidade por estudante.',
 'Con este número de estudiantes cubres los gastos mensuales.': 'Com esse número de estudantes você cobre as despesas mensais.',
 'Necesitas más estudiantes, una cuota mayor o menos gastos.': 'Você precisa de mais estudantes, de uma mensalidade maior ou de menos despesas.',
 'Exportar a CSV': 'Exportar para CSV', 'Imprimir': 'Imprimir', 'Previo normativo': 'Resumo normativo prévio',
 'Elige tu país arriba y descarga un resumen de lo que te aplica: marco legal, los pilares A, B y C, partidas a presupuestar y verificaciones pendientes.':
   'Escolha o seu país acima e baixe um resumo do que se aplica a você: marco legal, os pilares A, B e C, itens a orçar e verificações pendentes.',
 'Descargar mi previo (PDF)': 'Baixar meu resumo (PDF)', 'Previo en CSV': 'Resumo em CSV', 'Descargar la hoja de cálculo (Excel)': 'Baixar a planilha (Excel)',
 'Marco legal de referencia': 'Marco legal de referência', 'A. Acreditación y plan de estudios': 'A. Credenciamento e plano de estudos',
 'B. Instalaciones': 'B. Instalações', 'C. Personal docente': 'C. Corpo docente', 'Partidas que conviene presupuestar': 'Itens que convém orçar',
 'Verificaciones pendientes': 'Verificações pendentes', 'Tu presupuesto en resumen': 'Seu orçamento em resumo',
 'Información de referencia, no es asesoramiento legal. Los requisitos cambian y varían según la región; verifícalos con la autoridad educativa de tu país. Chanak orienta y acompaña, pero no sustituye el asesoramiento legal local ni garantiza autorizaciones, códigos de centro ni fondos públicos.':
   'Informação de referência, não é assessoria jurídica. Os requisitos mudam e variam conforme a região; verifique-os com a autoridade educacional do seu país. A Chanak orienta e acompanha, mas não substitui a assessoria jurídica local nem garante autorizações, códigos de escola ou fundos públicos.',
 'La inversión inicial incluye la afiliación inicial a Chanak: {x} (una sola vez, sugerencia editable).': 'O investimento inicial inclui a afiliação inicial à Chanak: {x} (uma única vez, sugestão editável).',
 'Afiliación inicial a Chanak (sugerencia)': 'Afiliação inicial à Chanak (sugestão)',
 'Pago único, en US$ (acuerdo macro). Valor sugerido, editable: confírmalo en tu propuesta.': 'Pagamento único, em US$ (acordo-macro). Valor sugerido, editável: confirme-o na sua proposta.',
 'Fee mensual Chanak por estudiante (acuerdo macro)': 'Fee mensal Chanak por estudante (acordo-macro)',
 'Valor del acuerdo macro, en US$ al mes por estudiante activo. Editable: confírmalo en tu propuesta.': 'Valor do acordo-macro, em US$ por mês por aluno ativo. Editável: confirme-o na sua proposta.',
 'Alcance de la escuela': 'Abrangência da escola', '— Elige el alcance —': '— Escolha a abrangência —',
 'Elige el alcance de tu escuela (obligatorio) para calcular el resultado.': 'Escolha a abrangência da sua escola (obrigatório) para calcular o resultado.',
 'Alumnos por tramo': 'Alunos por faixa', 'Tramo incluido en el alcance elegido': 'Faixa incluída na abrangência escolhida',
 'Fuera del alcance elegido: cuenta como 0': 'Fora da abrangência escolhida: conta como 0',
 'Supuestos por tramo (editables)': 'Premissas por faixa (editáveis)',
 'Supuesto editable. Los ratios, las aulas y el espacio son valores de partida: ajústalos a la ley y a la realidad de tu país. Los importes quedan vacíos.':
   'Premissa editável. As proporções, as salas e o espaço são valores iniciais: ajuste-os à lei e à realidade do seu país. Os valores monetários ficam vazios.',
 'Tramo': 'Faixa', 'Alumnos por guía': 'Alunos por guia', 'Alumnos por aula': 'Alunos por sala', 'm² por alumno': 'm² por aluno',
 'Coste mensual por guía': 'Custo mensal por guia', 'Material inicial por alumno': 'Material inicial por aluno',
 'Tecnología inicial por alumno': 'Tecnologia inicial por aluno', 'Material mensual por alumno': 'Material mensal por aluno',
 'Coste mensual del coordinador académico': 'Custo mensal do coordenador acadêmico',
 'Se añade si hay alumnos en 2 o más etapas (Elementary, Middle, High).': 'É adicionado se houver alunos em 2 ou mais etapas (Elementary, Middle, High).',
 'Personal y espacio (calculado)': 'Equipe e espaço (calculado)', 'Guías': 'Guias', 'Aulas': 'Salas', 'm² necesarios': 'm² necessários',
 'Coordinador académico': 'Coordenador acadêmico',
 'Introduce alumnos en algún tramo del alcance para ver guías, aulas y espacio.': 'Informe alunos em alguma faixa da abrangência para ver guias, salas e espaço.',
 'Ajustar a la ley del país.': 'Ajustar à lei do país.', 'Comparar alcances': 'Comparar abrangências',
 'Las mismas entradas calculadas para los cinco alcances en paralelo: útil para decidir por dónde empezar o cómo crecer por fases.':
   'Os mesmos dados calculados para as cinco abrangências em paralelo: útil para decidir por onde começar ou como crescer por fases.',
 'Coste de personal': 'Custo de pessoal', 'Infantil': 'Educação infantil', 'Primaria': 'Ensino fundamental I', 'Secundaria': 'Ensino fundamental II', 'Bachillerato': 'Ensino médio',
 'Notas por etapa': 'Notas por etapa',
 'No se pudieron cargar los parámetros. Descarga la hoja de cálculo.': 'Não foi possível carregar os parâmetros. Baixe a planilha.',
 'Manipulativos y material de lectoescritura inicial': 'Materiais manipulativos e de alfabetização inicial', 'Solo si el alcance incluye K–2': 'Somente se a abrangência incluir K–2',
 'Mobiliario y zona de juego para primeros grados': 'Mobiliário e área de brincadeiras para as primeiras séries',
 'Laboratorio y material de ciencias': 'Laboratório e material de ciências', 'Solo si el alcance incluye Middle o High School': 'Somente se a abrangência incluir Middle ou High School',
 'Dual Diploma, exámenes y orientación universitaria': 'Dual Diploma, exames e orientação universitária', 'Solo si el alcance incluye High School': 'Somente se a abrangência incluir High School',
 'Administración y gestión interna': 'Administração e gestão interna',
 'Kinder y lectura inicial': 'Kinder e leitura inicial', 'Elementary (K–5)': 'Elementary (K–5)', 'Middle (6–8)': 'Middle (6–8)', 'High School (9–12)': 'High School (9–12)',
 'Escuela completa (K–12)': 'Escola completa (K–12)',
 'K–2 · Kinder y lectura inicial': 'K–2 · Kinder e leitura inicial', '3–5 · Resto de Elementary': '3–5 · Restante do Elementary', '6–8 · Middle': '6–8 · Middle', '9–12 · High School': '9–12 · High School',
 # ── 7 erros ──
 '7 errores al abrir una Microschool cristiana · Chanak': '7 erros ao abrir uma Microschool cristã · Chanak',
 'Guía para fundadores de una microschool cristiana en España y Latinoamérica: los 7 errores que más cuestan y cómo evitarlos desde el primer día.':
   'Guia para fundadores de uma microschool cristã: os 7 erros que mais custam e como evitá-los desde o primeiro dia.',
 '7 errores que cuestan una Microschool (y cómo evitarlos desde el primer día)': '7 erros que custam uma Microschool (e como evitá-los desde o primeiro dia)',
 'Abrir una Microschool es un acto de fe y también de responsabilidad. Esta guía reúne lo que más ayuda a que una comunidad pequeña nazca sana y se sostenga, ordenado según los tres pilares de Chanak.':
   'Abrir uma Microschool é um ato de fé e também de responsabilidade. Esta guia reúne o que mais ajuda uma comunidade pequena a nascer saudável e a se sustentar, organizado segundo os três pilares da Chanak.',
 'Cómo evitarlo': 'Como evitar',
 'Empezar por el «qué» y no por el «porqué»': 'Começar pelo «o quê» e não pelo «porquê»',
 'Es tentador empezar eligiendo mesas, horarios y libros. Pero una comunidad que no sabe para qué existe se dispersa ante la primera dificultad.':
   'É tentador começar escolhendo mesas, horários e livros. Mas uma comunidade que não sabe para que existe se dispersa diante da primeira dificuldade.',
 'Escribe en una frase tu misión y la cosmovisión que la sostiene. Compártela con las primeras familias y deja que guíe cada decisión posterior.':
   'Escreva em uma frase a sua missão e a cosmovisão que a sustenta. Compartilhe-a com as primeiras famílias e deixe que ela guie cada decisão posterior.',
 'Querer servir a todos': 'Querer servir a todos',
 'Un mensaje para todos no le habla a nadie. Sin un perfil claro, cada familia espera algo distinto y el equipo se agota intentando contentarlas.':
   'Uma mensagem para todos não fala com ninguém. Sem um perfil claro, cada família espera algo diferente e a equipe se esgota tentando agradar a todas.',
 'Describe a tu comunidad: sus valores, sus metas y lo que hoy no encuentra. El mínimo de lanzamiento de una Chanak Microschool es de 10 familias que ya confían en ti.':
   'Descreva a sua comunidade: seus valores, suas metas e o que hoje ela não encontra. O mínimo de lançamento de uma Chanak Microschool é de 10 famílias que já confiam em você.',
 'Dejar el marco legal para el final': 'Deixar o marco legal para o final',
 'Cada país tiene sus requisitos para abrir un espacio con menores y para reconocer los estudios. Descubrirlos después de firmar o de cobrar sale caro.':
   'Cada país tem seus requisitos para abrir um espaço com menores e para reconhecer os estudos. Descobri-los depois de assinar ou de cobrar sai caro.',
 'Resuelve primero la entidad legal, el registro y la autorización que pida tu país, con asesoría local. No firmes contratos ni cobres cuotas antes.':
   'Resolva primeiro a entidade jurídica, o registro e a autorização que o seu país exigir, com assessoria local. Não assine contratos nem cobre mensalidades antes.',
 'Descuidar las instalaciones': 'Descuidar as instalações',
 'Un local bonito no es necesariamente un local apto. El uso permitido, la seguridad, la accesibilidad y los seguros son responsabilidad del socio.':
   'Um local bonito não é necessariamente um local adequado. O uso permitido, a segurança, a acessibilidade e os seguros são responsabilidade do parceiro.',
 'Antes de comprometerte, revisa la licencia de uso, la seguridad contra incendios, la accesibilidad, el aforo y el seguro de responsabilidad civil (Pilar B).':
   'Antes de se comprometer, revise a licença de uso, a segurança contra incêndio, a acessibilidade, a lotação e o seguro de responsabilidade civil (Pilar B).',
 'Contratar sin certificar': 'Contratar sem certificar',
 'La buena voluntad no basta para acompañar a un grupo de estudiantes. Sin cualificación ni formación común, cada adulto enseña a su manera.':
   'A boa vontade não basta para acompanhar um grupo de estudantes. Sem qualificação nem formação comum, cada adulto ensina à sua maneira.',
 'Asegura la cualificación y la verificación de antecedentes que exija tu país, y completa la certificación de Chanak antes de la primera clase (Pilar C).':
   'Garanta a qualificação e a verificação de antecedentes que o seu país exigir e conclua a certificação da Chanak antes da primeira aula (Pilar C).',
 'Fijar la cuota por miedo y no actualizar el presupuesto': 'Definir a mensalidade por medo e não atualizar o orçamento',
 'Una cuota demasiado baja para «llenar» deja a la escuela sin margen. Y un presupuesto que se hace una vez y se guarda deja de describir la realidad.':
   'Uma mensalidade baixa demais para «encher» a escola deixa-a sem margem. E um orçamento feito uma vez e guardado deixa de descrever a realidade.',
 'Calcula tu punto de equilibrio con la calculadora, fija la cuota con los números delante y revisa el presupuesto cada mes.':
   'Calcule o seu ponto de equilíbrio com a calculadora, defina a mensalidade com os números à frente e revise o orçamento todo mês.',
 'Captar solo con anuncios y sin seguimiento': 'Captar só com anúncios e sem acompanhamento',
 'Las familias no confían sus hijos a un anuncio, sino a personas. Sin seguimiento, el interés se enfría en pocos días.':
   'As famílias não confiam seus filhos a um anúncio, e sim a pessoas. Sem acompanhamento, o interesse esfria em poucos dias.',
 'Pon las relaciones primero: encuentros pequeños, conversaciones reales y un registro sencillo de cada familia en tres pasos, Interés → Conversación → Compromiso.':
   'Coloque as relações em primeiro lugar: encontros pequenos, conversas reais e um registro simples de cada família em três passos, Interesse → Conversa → Compromisso.',
 'No tienes que hacerlo solo': 'Você não precisa fazer isso sozinho',
 'Chanak aporta el Pilar A (plan de estudios acreditado) y te orienta en los otros dos. Tú aportas la comunidad, el espacio y el equipo.':
   'A Chanak fornece o Pilar A (plano de estudos credenciado) e orienta você nos outros dois. Você traz a comunidade, o espaço e a equipe.',
 'Imprimir o guardar en PDF': 'Imprimir ou salvar em PDF',
 'Recibe la guía y hablemos de tu comunidad': 'Receba o guia e vamos conversar sobre a sua comunidade',
 'Déjanos tu correo y te escribiremos para ofrecerte una conversación de alianza, sin compromiso.':
   'Deixe o seu e-mail e escreveremos para oferecer uma conversa sobre parceria, sem compromisso.',
 'Correo electrónico': 'E-mail', 'Tamaño estimado de tu comunidad (familias)': 'Tamanho estimado da sua comunidade (famílias)',
 'Enviar →': 'Enviar →', 'Gracias': 'Obrigado', 'Hemos recibido tus datos. Te escribiremos pronto.': 'Recebemos os seus dados. Escreveremos em breve.',
 '7 errores': '7 erros',
 # tuplas (NEXT / CTA)
 'Lee los 7 errores →': 'Leia os 7 erros →', 'Solicitar una conversación de alianza →': 'Solicitar uma conversa sobre parceria →',
 'Usa la calculadora de presupuesto →': 'Use a calculadora de orçamento →', 'Solicita una conversación de alianza →': 'Solicite uma conversa sobre parceria →',
}

PV_ES_ONLY = 'O detalhe por país está, por enquanto, disponível em espanhol.'


def apply(*modules):
    """Preenche o campo 'pt' de todos os dicts com chave 'es'. Levanta erro se faltar alguma tradução."""
    missing = set()

    def tr(v):
        if isinstance(v, (tuple, list)):
            return type(v)(tr(x) for x in v)
        if v not in TR:
            missing.add(v)
            return v
        return TR[v]

    def walk(o):
        if isinstance(o, dict):
            if 'es' in o and isinstance(o['es'], (str, tuple, list)):
                o['pt'] = tr(o['es'])
            else:
                for x in o.values():
                    walk(x)
        elif isinstance(o, (list, tuple)):
            for x in o:
                walk(x)

    for m in modules:
        for k, v in vars(m).items():
            if not k.startswith('__'):
                walk(v)
    if 'pv_es_only' in getattr(modules[0], 'T', {}):
        modules[0].T['pv_es_only']['pt'] = PV_ES_ONLY
    if missing:
        raise KeyError('Faltam traduções pt: ' + '; '.join(sorted(map(str, missing))))
