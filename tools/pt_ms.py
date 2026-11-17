# -*- coding: utf-8 -*-
"""Português (pt-BR neutro, «você») de las páginas de Microschools y Open a Microschool.
· apply(C): añade la clave 'pt' a los textos de tools/ms_content.py (patrón overlay; no se tocan las llamadas d(es,en,ca,fr)).
· NORM_PT: nombre, resumen y nota legal por país para tools/build_microschool.py (solo en memoria; no altera normativa-paises.json).
· TEXT: texto de la base de las landings (equivale a la base francesa) FR → PT; lo usa translate_base().
Traducción fiel; sin datos nuevos. Revisión por un hablante nativo recomendada antes de campañas."""
import html, re

TEXT = {
 'Oui, nous disposons de locaux adaptés': 'Sim, temos instalações adequadas',
 'En recherche ou aménagement': 'Procurando ou adaptando instalações',
 'Homeschool avec soutien présentiel': 'Homeschool com apoio presencial',
 'Programme Complet avec diplôme Chanak': 'Programa Completo com diploma Chanak',
 'Partenariat institutionnel complet': 'Parceria institucional completa',
 'Microschool chrétienne : apprendre en communauté · Chanak': 'Microschool cristã: aprender em comunidade · Chanak',
 'Avis aux familles :': 'Aviso para as famílias:',
 "Microschool s'adresse aux groupes qui disposent déjà d'une communauté de familles (par exemple, 10 ou plus). Êtes-vous une famille individuelle ? Découvrez le": 'A Microschool é voltada a grupos que já contam com uma comunidade de famílias (por exemplo, 10 ou mais). Você é uma família individual? Conheça o',
 'Homeschool guidé': 'Homeschool Guiado',
 'et le': 'e o',
 'COMMUNAUTÉ · PRÉSENTIEL · MODÈLE 60/20/20': 'COMUNIDADE · PRESENCIAL · MODELO 60/20/20',
 'Chanak Microschools :': 'Chanak Microschools:',
 'Apprentissage présentiel en petits groupes': 'Aprendizagem presencial em pequenos grupos',
 "Partenariat pour les groupes disposant déjà d'une communauté : petits groupes en présentiel, encadrés par un Coordinateur certifié par Chanak, Mastery Learning et modèle 60/20/20.": 'Parceria para grupos que já têm uma comunidade: pequenos grupos presenciais, acompanhados por um Coordenador certificado pela Chanak, com Mastery Learning e o modelo 60/20/20.',
 'Inscrivez votre groupe ↓': 'Inscreva o seu grupo ↓',
 'Comment apprend votre enfant →': 'Como o seu filho aprende →',
 'Élèves en classe présentielle de microschool avec leur enseignant': 'Estudantes em uma sala de aula presencial de microschool com o professor',
 'Communauté et Mentorat': 'Comunidade e Mentoria',
 '· Groupes en présentiel guidés par des éducateurs certifiés.': '· Grupos presenciais guiados por educadores certificados.',
 'MODÈLE ÉDUCATIF': 'MODELO EDUCACIONAL',
 "Qu'est-ce qu'une Chanak Microschool ?": 'O que é uma Chanak Microschool?',
 "Une Chanak Microschool est une communauté d'apprentissage présentiel en effectif restreint (généralement 5 à 30 élèves) conjuguant la bienveillance, la flexibilité et la socialisation d'un cadre communautaire avec le soutien académique et l'exigence d'une école américaine accréditée par MSA-CESS.": 'Uma Chanak Microschool é uma comunidade de aprendizagem presencial com poucos estudantes (geralmente de 5 a 30) que reúne o acolhimento, a flexibilidade e a socialização de um ambiente comunitário com o apoio acadêmico e a exigência de uma escola americana credenciada pela MSA-CESS.',
 'Pour qui est-ce conçu ?': 'Para quem é pensada?',
 'Écoles, églises, organisations et collectifs de familles organisés (par exemple, 10 familles ou plus) souhaitant un programme présentiel avec diplôme américain.': 'Escolas, igrejas, organizações e coletivos de famílias organizados (por exemplo, 10 famílias ou mais) que desejam um programa presencial com diploma americano.',
 'Effectifs Réduits': 'Turmas pequenas',
 "Accompagnement individualisé où chaque élève est valorisé dans son rythme d'apprentissage et ses talents, loin de la massification de la classe classique.": 'Acompanhamento individualizado, em que cada estudante é valorizado em seu ritmo de aprendizagem e em seus talentos, longe da massificação da sala de aula tradicional.',
 'Accréditation Institutionnelle': 'Credenciamento institucional',
 "Programme soutenu par Chanak International Academy (FLDOE #134620), accréditée par MSA-CESS, délivrant des relevés officiels et un diplôme américain d'études secondaires.": 'Programa respaldado pela Chanak International Academy (FLDOE #134620), credenciada pela MSA-CESS, que emite históricos oficiais e um diploma americano de ensino médio.',
 'Socialisation & Cadre': 'Socialização e rotina',
 'Cadre journalier structuré comprenant travaux collaboratifs, échanges stimulants, formation morale et amitiés saines dans un environnement sécurisant.': 'Rotina diária estruturada, com trabalhos colaborativos, trocas estimulantes, formação moral e amizades saudáveis em um ambiente seguro.',
 'PÉDAGOGIE GLOBALE': 'PEDAGOGIA GLOBAL',
 'Comment apprend votre enfant': 'Como o seu filho aprende',
 "Notre démarche pédagogique place l'élève au cœur de son parcours à travers quatre piliers conçus pour favoriser la maîtrise académique et la formation du caractère.": 'Nossa abordagem pedagógica coloca o estudante no centro de sua trajetória por meio de quatro pilares pensados para favorecer o domínio acadêmico e a formação do caráter.',
 "L'élève progresse uniquement après avoir démontré une maîtrise solide des prérequis. Les lacunes sont éliminées à la source, chacun avançant à son tempo naturel.": 'O estudante só avança depois de demonstrar domínio sólido dos pré-requisitos. As lacunas são eliminadas na origem, e cada um avança em seu ritmo natural.',
 'Le Modèle 60/20/20': 'O modelo 60/20/20',
 'Une architecture curriculaire équilibrée :': 'Uma arquitetura curricular equilibrada:',
 '60% Core Curriculum': '60% Core Curriculum',
 'américain accrédité,': 'americano credenciado,',
 '20% Extension Locale': '20% Extensão Local',
 '(langue, histoire et repères culturels du pays) et': '(língua, história e referências culturais do país) e',
 '20% Life Skills': '20% Life Skills',
 ', valeurs et discernement.': ', valores e discernimento.',
 'Coordinateur Certifié Chanak': 'Coordenador certificado pela Chanak',
 "Chaque cohorte est animée en présentiel par un Coordinateur sélectionné et formé par Chanak, qualifié en écoute active, régulation du rythme et climat d'apprentissage.": 'Cada turma é conduzida presencialmente por um Coordenador selecionado e formado pela Chanak, qualificado em escuta ativa, regulação do ritmo e clima de aprendizagem.',
 'Plateforme SIS Intégrée': 'Plataforma SIS integrada',
 'Le Student Information System (SIS) de Chanak regroupe le plan éducatif individualisé (PEI), la planification hebdomadaire, les évaluations et le dossier scolaire officiel dans un portail unifié.': 'O Student Information System (SIS) da Chanak reúne o plano educacional individualizado (PEI), o planejamento semanal, as avaliações e o histórico escolar oficial em um portal unificado.',
 'FINANCEMENT ET SCOLARITÉ': 'FINANCIAMENTO E MENSALIDADES',
 'Comment le programme est-il financé ?': 'Como o programa é financiado?',
 "Les modalités de financement s'adaptent selon le pays d'accueil et le dispositif choisi par la famille.": 'As formas de financiamento se adaptam ao país de acolhimento e ao dispositivo escolhido pela família.',
 "🇺🇸 États-Unis : Fonds d'État (ESA / EFA)": '🇺🇸 Estados Unidos: fundos estaduais (ESA / EFA)',
 "Dans les États où Chanak intervient comme prestataire agréé (ex. Floride Step Up PEP/FES-UA, Utah Fits All, Arizona ClassWallet, New Hampshire EFA), les familles peuvent solliciter la prise en charge des services éligibles via leurs comptes d'aide d'État.": 'Nos estados em que a Chanak atua como provedora aprovada (por exemplo, Flórida Step Up PEP/FES-UA, Utah Fits All, Arizona ClassWallet, New Hampshire EFA), as famílias podem solicitar a cobertura dos serviços elegíveis por meio de suas contas de auxílio estadual.',
 'Avis Réglementaire Important :': 'Aviso regulatório importante:',
 "Service présentiel en cours d'approbation dans chaque programme. L'éligibilité et l'utilisation des fonds dépendent des directives de chaque organisme d'État gestionnaire.": 'Serviço presencial em processo de aprovação em cada programa. A elegibilidade e o uso dos fundos dependem das diretrizes de cada órgão estadual gestor.',
 '🌐 International : Règlement au Centre Local': '🌐 Internacional: pagamento no centro local',
 "En Espagne, au Mexique, au Panama et dans les autres pays, la famille règle directement la scolarité auprès du centre ou de l'institution partenaire locale assurant les locaux et le personnel présentiel. Chanak fournit le cadre curriculaire accrédité, la plateforme et les relevés officiels.": 'Na Espanha, no México, no Panamá e nos demais países, a família paga a mensalidade diretamente ao centro ou à instituição parceira local que fornece as instalações e o pessoal presencial. A Chanak fornece o marco curricular credenciado, a plataforma e os históricos oficiais.',
 "Pour consulter les tarifs d'inscription directe et les frais de scolarité à distance de nos cursus 100% en ligne, consultez la section": 'Para consultar as tarifas de matrícula direta e as mensalidades dos nossos cursos 100% online, veja a seção',
 "tarifs sur la page d'accueil": 'tarifas na página inicial',
 '.': '.',
 'SITES ET DÉVELOPPEMENT': 'LOCAIS E DESENVOLVIMENTO',
 'Sites en Préparation': 'Locais em preparação',
 'Nous préparons les premiers groupes en présentiel avec des familles, des enseignants et des structures associées.': 'Estamos preparando os primeiros grupos presenciais com famílias, professores e estruturas parceiras.',
 'Floride (États-Unis)': 'Flórida (Estados Unidos)',
 'Premières implantations en préparation dans plusieurs zones de Floride. Destinées aux familles en instruction à domicile sous le programme PEP (Step Up For Students) ou inscription privée.': 'Primeiras implantações em preparação em várias áreas da Flórida. Destinadas a famílias em educação domiciliar sob o programa PEP (Step Up For Students) ou matrícula privada.',
 'Statut : Partenariats ouverts pour communautés scolaires, églises et programmes ESA.': 'Situação: parcerias abertas para comunidades escolares, igrejas e programas ESA.',
 'Autres États avec Programmes ESA': 'Outros estados com programas ESA',
 "Phase d'évaluation et de montage de projets en Utah, Arizona, New Hampshire et Wyoming pour les communautés bénéficiant de fonds éducatifs individualisés (ESA).": 'Fase de avaliação e montagem de projetos em Utah, Arizona, New Hampshire e Wyoming para comunidades que contam com fundos educacionais individualizados (ESA).',
 "Statut : Évaluation de la demande locale et des partenaires d'accueil.": 'Situação: avaliação da demanda local e dos parceiros anfitriões.',
 'Espagne, Mexique et Panama': 'Espanha, México e Panamá',
 'Mise en place de centres partenaires sous autorisations officielles de chaque pays, associant le cursus américain aux calendriers et exigences locales.': 'Implantação de centros parceiros sob as autorizações oficiais de cada país, combinando o currículo americano com os calendários e as exigências locais.',
 'Statut : Ouvert aux partenaires : écoles, églises et organisations.': 'Situação: aberto a parceiros: escolas, igrejas e organizações.',
 'DOCUMENTATION & RESSOURCES': 'DOCUMENTAÇÃO E RECURSOS',
 'Ressources & Contexte du Secteur': 'Recursos e contexto do setor',
 "Documents de référence sur le modèle des microschools et l'accès à l'université.": 'Documentos de referência sobre o modelo das microschools e o acesso à universidade.',
 "Accès à l'Université": 'Acesso à universidade',
 "Guide institutionnel sur la reconnaissance des crédits, les relevés de notes officiels et l'accès aux universités avec le diplôme Chanak.": 'Guia institucional sobre o reconhecimento de créditos, os históricos oficiais e o acesso às universidades com o diploma Chanak.',
 'Voir le guide universitaire →': 'Ver o guia universitário →',
 'Analyse du Secteur des Microschools': 'Análise do setor de microschools',
 'Pour comprendre le secteur : American Microschools: A Sector Analysis (National Microschooling Center, 2025). PDF en anglais.': 'Para entender o setor: American Microschools: A Sector Analysis (National Microschooling Center, 2025). PDF em inglês.',
 'Source externe indépendante de Chanak. Fournie à titre de contexte sectoriel.': 'Fonte externa independente da Chanak. Oferecida como contexto setorial.',
 'PARTENARIATS ET COMMUNAUTÉS': 'PARCERIAS E COMUNIDADES',
 'Inscrivez votre groupe ou communauté de familles': 'Inscreva o seu grupo ou comunidade de famílias',
 'Indiquez les détails de votre organisation ou communauté de familles (par exemple, 10 ou plus). Notre direction des partenariats vous contactera.': 'Informe os dados da sua organização ou comunidade de famílias (por exemplo, 10 ou mais). Nossa direção de parcerias entrará em contato com você.',
 'Avis aux familles individuelles :': 'Aviso para famílias individuais:',
 'Si vous recherchez une inscription directe pour votre famille, découvrez le': 'Se você procura uma matrícula direta para a sua família, conheça o',
 'ou le': 'ou o',
 "Nom de l'organisation ou communauté *": 'Nome da organização ou comunidade *',
 'École, église, association ou groupe de familles': 'Escola, igreja, associação ou grupo de famílias',
 'Personne de contact *': 'Pessoa de contato *',
 'Prénom et nom': 'Nome e sobrenome',
 'Adresse e-mail *': 'Endereço de e-mail *',
 'contact@exemple.com': 'contato@exemplo.com',
 'Téléphone / WhatsApp (optionnel)': 'Telefone / WhatsApp (opcional)',
 '+33 ou +1 ...': '+55, +351 ou +1 ...',
 'Pays et Région / État *': 'País e Região / Estado *',
 'Ex. France, Suisse, États-Unis (Floride)...': 'Ex. Brasil, Portugal, Estados Unidos (Flórida)...',
 'Ville ou Métropole *': 'Cidade ou região metropolitana *',
 'Ex. Paris, Lyon, Genève, Montréal...': 'Ex. São Paulo, Lisboa, Porto, Miami...',
 'Nombre approximatif de familles *': 'Número aproximado de famílias *',
 'Sélectionnez une option...': 'Selecione uma opção...',
 'Moins de 10 familles': 'Menos de 10 famílias',
 '10 à 25 familles': '10 a 25 famílias',
 '26 à 50 familles': '26 a 50 famílias',
 'Plus de 50 familles': 'Mais de 50 famílias',
 'Disposez-vous de locaux physiques ? *': 'Vocês dispõem de instalações físicas? *',
 'Non, conseils nécessaires': 'Não, precisamos de orientação',
 'Cycles scolaires souhaités *': 'Etapas escolares desejadas *',
 'K–5 Primaire': 'K–5 Elementary',
 '6–8 Collège': '6–8 Middle School',
 '9–12 Lycée (High School)': '9–12 High School',
 'Parcours envisagé *': 'Caminho de interesse *',
 'Informations sur les fonds ESA aux États-Unis': 'Informações sobre os fundos ESA nos Estados Unidos',
 'Détails sur votre communauté ou questions': 'Detalhes sobre a sua comunidade ou perguntas',
 'Parlez-nous de votre communauté, objectifs, calendrier prévisionnel...': 'Conte-nos sobre a sua comunidade, os objetivos e o calendário previsto...',
 "J'ai lu et j'accepte la": 'Li e aceito a',
 'politique de confidentialité': 'política de privacidade',
 ". Les données seront traitées uniquement pour organiser l'initiative de microschool.": '. Os dados serão tratados apenas para organizar a iniciativa de microschool.',
 'Inscrire le groupe →': 'Inscrever o grupo →',
 'Inscription de groupe reçue !': 'Inscrição do grupo recebida!',
 'Nous avons bien reçu vos informations. Notre équipe de développement des partenariats vous contactera pour analyser votre projet et organiser les prochaines étapes.': 'Recebemos as suas informações. Nossa equipe de desenvolvimento de parcerias entrará em contato para analisar o seu projeto e organizar os próximos passos.',
 "Retour à l'accueil": 'Voltar ao início',
 'Politique de Confidentialité': 'Política de Privacidade',
 'Familles': 'Famílias',
 'Partenaires': 'Parceiros',
 'Contact': 'Contato',
 'Avis Institutionnel et Légal :': 'Aviso Institucional e Legal:',
 "Chanak International Academy est une école privée enregistrée auprès du Florida Department of Education (FLDOE #134620) accréditée par MSA-CESS. Les microschools locales opèrent comme des initiatives collaboratives et ne disposent pas d'accréditation indépendante ; l'accréditation de Chanak International Academy soutient les dossiers scolaires et diplômes délivrés par l'école en Floride, sans que la microschool ne soit accréditée ni ne constitue un site accrédité indépendant.": 'A Chanak International Academy é uma escola privada registrada no Florida Department of Education (FLDOE #134620) e credenciada pela MSA-CESS. As microschools locais operam como iniciativas colaborativas e não dispõem de credenciamento independente; o credenciamento da Chanak International Academy respalda os históricos e diplomas emitidos pela escola na Flórida, sem que a microschool seja credenciada nem constitua um local credenciado independente.',
 'Comment ouvrir une Microschool chrétienne · Chanak': 'Como abrir uma Microschool cristã · Chanak',
 'PARTENARIATS POUR ÉCOLES · ÉGLISES · ASSOCIATIONS': 'PARCERIAS PARA ESCOLAS · IGREJAS · ASSOCIAÇÕES',
 'Ouvrez une Chanak Microschool': 'Abra uma Chanak Microschool',
 'dans votre ville': 'na sua cidade',
 'Vous apportez la vision locale, le lieu et la communauté ; Chanak apporte l’accréditation MSA-CESS, le programme 60/20/20, le SIS, la formation des Guides et l’accompagnement pour les fonds ESA dans les États américains où Chanak est prestataire agréé et uniquement pour les services approuvés dans chaque programme (examiné État par État).': 'Você traz a visão local, o espaço e a comunidade; a Chanak traz o credenciamento MSA-CESS, o currículo 60/20/20, o SIS, a formação de Guias e o acompanhamento nos fundos ESA nos estados americanos em que a Chanak é provedora aprovada e somente para os serviços aprovados em cada programa (revisado estado por estado).',
 'Postuler comme entité partenaire →': 'Candidatar minha organização como Entidade Parceira →',
 'Test de compatibilité (2 min) ↓': 'Teste de compatibilidade (2 min) ↓',
 'Salle de classe de microschool en présentiel avec enseignant et élèves': 'Sala de aula presencial de microschool com professor e estudantes',
 "Alliances d'Avenir": 'Alianças de futuro',
 '· Infrastructure académique et soutien institutionnel de Chanak pour les cohortes locales.': '· Infraestrutura acadêmica e apoio institucional da Chanak para as turmas locais.',
 'AVANTAGES ET ACCOMPAGNEMENT': 'VANTAGENS E ACOMPANHAMENTO',
 'Pourquoi ouvrir votre Microschool avec Chanak ?': 'Por que abrir a sua Microschool com a Chanak?',
 "Créer un établissement indépendant exige des années de démarches, d'homologations et de mise en place technique. Un partenariat avec Chanak vous permet d'ouvrir une microschool accréditée d'excellence dès le premier jour.": 'Criar um estabelecimento independente exige anos de trâmites, homologações e implantação técnica. Uma parceria com a Chanak permite abrir uma microschool credenciada e de excelência desde o primeiro dia.',
 'Accréditation MSA-CESS': 'Credenciamento MSA-CESS',
 "Chanak International Academy est une école privée enregistrée (FLDOE #134620) accréditée par MSA-CESS. Vos élèves reçoivent des relevés officiels et un diplôme américain d'études secondaires reconnu internationalement.": 'A Chanak International Academy é uma escola privada registrada (FLDOE #134620) e credenciada pela MSA-CESS. Seus estudantes recebem históricos oficiais e um diploma americano de ensino médio.',
 'Accompagnement pour les fonds ESA (USA)': 'Acompanhamento nos fundos ESA (EUA)',
 'Dans les États américains où Chanak est prestataire agréé, les familles peuvent demander l’utilisation de leurs fonds ESA pour les services approuvés dans chaque programme. L’éligibilité et chaque autorisation relèvent du programme de chaque État.': 'Nos estados americanos em que a Chanak é provedora aprovada, as famílias podem solicitar o uso de seus fundos ESA para os serviços aprovados em cada programa. A elegibilidade e cada autorização cabem ao programa de cada estado.',
 'Curriculum & Mastery Learning': 'Currículo e Mastery Learning',
 'Programmes fondés sur le modèle 60/20/20 (60% fondamentaux américains, 20% ancrage culturel local, 20% Life Skills et développement personnel), conçus pour une progression par maîtrise avérée des compétences.': 'Programas baseados no modelo 60/20/20 (60% fundamentos americanos, 20% ancoragem cultural local, 20% Life Skills e desenvolvimento pessoal), pensados para uma progressão por domínio comprovado das competências.',
 'Plateforme SIS Intégrale': 'Plataforma SIS completa',
 'Student Information System unifié pour la gestion des admissions, des plans individuels (PEI), des présences, des évaluations hebdomadaires et des communications avec les familles.': 'Student Information System unificado para a gestão de admissões, planos individuais (PEI), frequência, avaliações semanais e comunicação com as famílias.',
 'Formation & Certification des Coordinateurs': 'Formação e certificação de Coordenadores',
 'Nous formons, évaluons et certifions les Coordinateurs pédagogiques encadrant les cohortes quotidiennes, avec un suivi méthodologique continu et un soutien à la gestion de classe.': 'Formamos, avaliamos e certificamos os Coordenadores pedagógicos que conduzem as turmas no dia a dia, com acompanhamento metodológico contínuo e apoio à gestão de sala de aula.',
 'Notoriété & Confiance': 'Reputação e confiança',
 "Votre initiative s'appuie sur la réputation d'une académie internationale reconnue pour sa rigueur académique, son suivi individualisé et son écoute des familles dans de multiples pays.": 'Sua iniciativa se apoia na reputação de uma academia internacional reconhecida pelo rigor acadêmico, pelo acompanhamento individualizado e pela escuta das famílias em vários países.',
 'RÉPARTITION DES RÔLES': 'DIVISÃO DE PAPÉIS',
 'Ce que fournit la structure partenaire': 'O que a estrutura parceira fornece',
 "Le succès d'une Chanak Microschool repose sur une répartition claire des responsabilités où chaque acteur apporte son expertise propre.": 'O sucesso de uma Chanak Microschool depende de uma divisão clara de responsabilidades, em que cada agente contribui com a sua própria especialidade.',
 'Entité Juridique Propre': 'Entidade jurídica própria',
 'Structure légalement constituée (école privée, église, fondation, association ou société éducative) habilitée à conclure des conventions institutionnelles et à gérer les contrats locaux.': 'Estrutura legalmente constituída (escola privada, igreja, fundação, associação ou empresa educacional) habilitada a firmar convênios institucionais e a gerir contratos locais.',
 'Locaux & Infrastructures': 'Instalações e infraestrutura',
 "Espace d'apprentissage sécurisé, lumineux, aéré et adapté aux petits effectifs, équipé d'une connexion internet haut débit et d'espaces de détente adéquats.": 'Espaço de aprendizagem seguro, iluminado, arejado e adequado a turmas pequenas, equipado com conexão de internet de alta velocidade e áreas de descanso adequadas.',
 'Personnel & Coordinateur Local': 'Pessoal e Coordenador local',
 "Sélection de l'éducateur ou du médiateur présentiel qui suivra avec succès la certification Coordinateur de Chanak pour animer la cohorte au quotidien.": 'Seleção do educador ou mediador presencial que concluirá com êxito a certificação de Coordenador da Chanak para conduzir a turma no dia a dia.',
 'Communauté de Familles': 'Comunidade de famílias',
 'Lien de confiance avec les familles locales, mobilisation communautaire et bienveillance quotidienne auprès des apprenants.': 'Vínculo de confiança com as famílias locais, mobilização comunitária e cuidado diário com os estudantes.',
 'NORMES DE SÉCURITÉ ET QUALITÉ': 'NORMAS DE SEGURANÇA E QUALIDADE',
 'Exigences Opérationnelles et Locaux': 'Requisitos operacionais e instalações',
 'Afin de préserver la protection des élèves et la conformité académique, toute organisation partenaire doit satisfaire aux critères suivants :': 'Para preservar a proteção dos estudantes e a conformidade acadêmica, toda organização parceira deve atender aos seguintes critérios:',
 '1. Vérification des Antécédents': '1. Verificação de antecedentes',
 "Contrôle officiel des antécédents judiciaires (bulletin n°3 / background check) pour l'ensemble du personnel et des intervenants en contact avec les mineurs.": 'Verificação oficial de antecedentes criminais (background check) de todo o pessoal e dos colaboradores em contato com menores.',
 '2. Assurance Responsabilité Civile': '2. Seguro de responsabilidade civil',
 "Police d'assurance responsabilité civile professionnelle et exploitation valide couvrant les locaux physiques et les activités accueillies.": 'Apólice de seguro de responsabilidade civil profissional e de operação válida, que cubra as instalações físicas e as atividades realizadas.',
 '3. Certification du Coordinateur': '3. Certificação do Coordenador',
 "Validation obligatoire du cycle de formation pédagogique Chanak par le Coordinateur responsable avant l'ouverture de la cohorte.": 'Validação obrigatória do ciclo de formação pedagógica da Chanak pelo Coordenador responsável antes da abertura da turma.',
 '4. Conformité Réglementaire': '4. Conformidade regulatória',
 'Respect des normes ERP/sécurité incendie et des obligations administratives et municipales locales applicables au bâtiment.': 'Cumprimento das normas de segurança contra incêndio e das obrigações administrativas e municipais locais aplicáveis ao imóvel.',
 '5. Exigence Internationale (Hors USA)': '5. Exigência internacional (fora dos EUA)',
 'Pour les implantations en': 'Para implantações na',
 'Espagne, au Mexique, au Panama': 'Espanha, no México, no Panamá',
 'et dans les autres pays, la structure partenaire doit détenir': 'e nos demais países, a estrutura parceira deve possuir',
 "l'autorisation officielle et le cadre légal requis dans son pays d'accueil": 'a autorização oficial e o marco legal exigidos em seu país de acolhimento',
 "pour l'encadrement présentiel de mineurs.": 'para o acompanhamento presencial de menores.',
 'ÉVALUATION INITIALE RAPIDE': 'AVALIAÇÃO INICIAL RÁPIDA',
 "Test d'Adéquation Partenaire": 'Teste de adequação do parceiro',
 'Vérifiez en moins de deux minutes si votre structure réunit les fondations indispensables pour ouvrir une Chanak Microschool.': 'Verifique em menos de dois minutos se a sua estrutura reúne as bases indispensáveis para abrir uma Chanak Microschool.',
 "Disposez-vous d'une personnalité morale propre (école privée, église, fondation, association déclarée ou entreprise) légalement enregistrée ?": 'Vocês têm personalidade jurídica própria (escola privada, igreja, fundação, associação registrada ou empresa) legalmente registrada?',
 'Oui, structure établie': 'Sim, estrutura estabelecida',
 'En cours de constitution / Pas encore': 'Em constituição / Ainda não',
 "Avez-vous accès à un local adapté (ou en cours d'aménagement) avec connexion internet haut débit, sécurité et capacité pour 5 à 30 élèves ?": 'Vocês têm acesso a um local adequado (ou em adequação), com internet de alta velocidade, segurança e capacidade para 5 a 30 estudantes?',
 'Oui, locaux adaptés disponibles': 'Sim, instalações adequadas disponíveis',
 'Recherche de locaux en cours': 'Procurando instalações',
 'Avez-vous identifié un éducateur ou enseignant motivé prêt à suivre la formation et obtenir la certification officielle de Coordinateur Chanak ?': 'Vocês identificaram um educador ou professor motivado, disposto a fazer a formação e obter a certificação oficial de Coordenador Chanak?',
 'Oui, candidat(s) pressenti(s)': 'Sim, já temos pessoas em vista',
 "Besoin d'accompagnement au recrutement": 'Precisamos de apoio no recrutamento',
 "Disposez-vous d'une communauté de familles intéressées (par exemple, 10 ou plus) pour les cycles K–5, 6–8 ou 9–12 ?": 'Vocês têm uma comunidade de famílias interessadas (por exemplo, 10 ou mais) para as etapas K–5, 6–8 ou 9–12?',
 "Oui, nous disposons d'une communauté ou de familles intéressées": 'Sim, temos uma comunidade ou famílias interessadas',
 'Nous débutons la sensibilisation communautaire': 'Estamos começando a sensibilização da comunidade',
 'Êtes-vous résolu à appliquer les normes de protection des mineurs (vérification des casiers, assurances et autorisations requises localement) ?': 'Vocês estão decididos a aplicar as normas de proteção de menores (verificação de antecedentes, seguros e autorizações exigidas localmente)?',
 'Oui, plein engagement': 'Sim, compromisso total',
 "Souhait d'examiner les détails": 'Quero analisar os detalhes',
 'Guide institutionnel sur la reconnaissance des crédits, relevés officiels et accès aux universités avec le diplôme Chanak.': 'Guia institucional sobre o reconhecimento de créditos, históricos oficiais e acesso às universidades com o diploma Chanak.',
 'DEMANDE DE PARTENARIAT': 'SOLICITAÇÃO DE PARCERIA',
 'Solliciter un Échange Institutionnel': 'Solicite uma conversa institucional',
 'Renseignez les détails de votre structure afin que notre pôle partenariats examine votre projet et planifie un entretien initial.': 'Preencha os dados da sua estrutura para que nosso setor de parcerias analise o seu projeto e agende uma entrevista inicial.',
 'Transparence Institutionnelle :': 'Transparência institucional:',
 "Les conditions économiques sont envoyées dans le dossier après l'appel. Nous adaptons la convention selon l'effectif prévisionnel, les locaux et le cadre réglementaire local.": 'As condições econômicas são enviadas no dossiê após a ligação. Adaptamos o convênio conforme o número previsto de estudantes, as instalações e o marco regulatório local.',
 'Nom et prénom du responsable *': 'Nome e sobrenome do responsável *',
 'Vos nom et prénom': 'Seu nome e sobrenome',
 "Fonction au sein de l'organisme *": 'Cargo na organização *',
 'Directeur, Pasteur, Président, Fondateur...': 'Diretor, Pastor, Presidente, Fundador...',
 "Nom de l'organisation ou de l'établissement *": 'Nome da organização ou do estabelecimento *',
 'Raison sociale ou dénomination officielle': 'Razão social ou denominação oficial',
 'Forme juridique *': 'Forma jurídica *',
 "Sélectionnez le type d'entité...": 'Selecione o tipo de entidade...',
 'École privée existante': 'Escola privada existente',
 'Église ou communauté cultuelle': 'Igreja ou comunidade religiosa',
 'Fondation ou association éducative': 'Fundação ou associação educacional',
 'Coopérative familiale / Collectif de parents': 'Cooperativa familiar / Coletivo de pais',
 "Entreprise éducative / Hub d'apprentissage": 'Empresa educacional / Hub de aprendizagem',
 "Autre type d'organisation": 'Outro tipo de organização',
 'Courriel professionnel *': 'E-mail profissional *',
 'direction@structure.org': 'direcao@organizacao.org',
 'Téléphone / WhatsApp *': 'Telefone / WhatsApp *',
 'Pays et Région / Département *': 'País e Região / Estado *',
 'Ex. France (Île-de-France), USA (Floride)...': 'Ex. Brasil (São Paulo), EUA (Flórida)...',
 'Ex. Paris, Lyon, Bordeaux, Genève...': 'Ex. São Paulo, Lisboa, Porto, Miami...',
 'Capacité estimée ou effectif projeté': 'Capacidade estimada ou número previsto de estudantes',
 'Ex. 6–10 élèves pour la cohorte initiale': 'Ex. 6–10 estudantes na primeira turma',
 'Présentation du projet ou précisions *': 'Apresentação do projeto ou esclarecimentos *',
 'Décrivez succinctement les locaux disponibles, la communauté ciblée et le calendrier envisagé...': 'Descreva brevemente as instalações disponíveis, a comunidade-alvo e o calendário previsto...',
 ". Les informations seront utilisées exclusivement pour l'évaluation institutionnelle du partenariat.": '. As informações serão usadas exclusivamente para a avaliação institucional da parceria.',
 "Demander le dossier et l'entretien initial →": 'Solicitar o dossiê e a entrevista inicial →',
 'Demande institutionnelle enregistrée !': 'Solicitação institucional registrada!',
 "Nous vous remercions pour l'intérêt porté au réseau Chanak Microschools. Notre équipe de développement institutionnel examinera votre proposition et reprendra contact avec vous afin de fixer un rendez-vous et de vous transmettre le dossier complet.": 'Agradecemos o interesse pela rede Chanak Microschools. Nossa equipe de desenvolvimento institucional analisará a sua proposta e retomará o contato para marcar uma conversa e enviar o dossiê completo.',
 'Alliances': 'Alianças',
}

NORM_PT = dict(
    name=dict(es='Espanha', pa='Panamá', mx='México', gt='Guatemala', sv='El Salvador', ec='Equador', co='Colômbia', cr='Costa Rica', us='Estados Unidos', other='Outro país'),
    resumen=dict(
        es='Um centro que ministra um currículo estrangeiro precisa de autorização como centro docente estrangeiro junto à administração educacional competente. Para estudantes espanhóis, incluem-se aulas de Língua e Cultura Espanholas; os requisitos variam conforme a comunidade autônoma.',
        pa='A abertura de um centro particular é tramitada junto ao Ministério da Educação (MEDUCA). O currículo americano é integrado às disciplinas do núcleo nacional indicadas pela autoridade.',
        mx='Os estudos americanos podem ser apresentados para revalidação ou equivalência junto à SEP, com a documentação que a autoridade exigir. Essa norma regula o reconhecimento dos estudos de cada estudante e não substitui a autorização do centro (RVOE): a via jurídica deve ser confirmada com assessoria local antes de abrir.',
        gt='Os estudos cursados em um programa estrangeiro podem ser apresentados para equivalência junto ao Ministério da Educação (MINEDUC), conforme o trâmite vigente.',
        sv='O reconhecimento de estudos realizados no exterior é gerido junto ao Ministério da Educação, conforme o procedimento vigente.',
        ec='A norma ministerial sobre educação domiciliar e modalidades a distância foi reformada várias vezes entre 2023 e 2026. O vínculo das famílias com um programa internacional e as equivalências de estudos devem ser confirmados com o Ministério da Educação antes de oferecê-lo.',
        co='Os estudos realizados no exterior podem ser apresentados para convalidação junto ao Ministério da Educação Nacional, conforme o trâmite vigente; requisitos e condições são verificados caso a caso.',
        cr='O reconhecimento e a equiparação de estudos estrangeiros são decididos pelo Ministério da Educação Pública (MEP), que aplica condições restritivas aos programas estrangeiros cursados dentro do país. Avalia-se caso a caso antes de oferecê-lo às famílias.',
        us='A Microschool opera sob o credenciamento MSA-CESS da Chanak e os padrões B.E.S.T. da Flórida, sem código escolar próprio. Os fundos ESA se aplicam somente nos estados em que a Chanak é provedora aprovada e somente aos serviços aprovados em cada programa.',
        other='Cada país tem seus próprios requisitos de reconhecimento de estudos e de abertura de centros. A Chanak avalia cada caso.'),
    note=dict(us='Normas do estado e do município da sede.', other='A definir com assessoria jurídica local.'),
)


def add_normativa(data):
    """Acrescenta 'pt' (en memoria) a los campos por idioma de los países."""
    for p in data['paises']:
        cid = p['id']
        if cid in NORM_PT['name']:
            p['name']['pt'] = NORM_PT['name'][cid]
        if cid in NORM_PT['resumen']:
            p['resumen']['pt'] = NORM_PT['resumen'][cid]
        if p.get('legal_note') and cid in NORM_PT['note']:
            p['legal_note']['pt'] = NORM_PT['note'][cid]
    return data


def _norm(s):
    return re.sub(r'\s+', ' ', html.unescape(s).strip())


def translate_base(h):
    """Traduce los nodos de texto y los atributos alt/placeholder/aria-label/title de una base HTML francesa.
    No toca <script>, <style>, comentarios ni los bloques <!-- cx:… -->; no cambia los value de formularios."""
    keep = []

    def stash(m):
        keep.append(m.group(0)); return f'\x00{len(keep) - 1}\x00'
    h = re.sub(r'<!-- cx:(\w+) -->.*?<!-- /cx:\1 -->|<style.*?</style>|<script.*?</script>|<!--.*?-->', stash, h, flags=re.S)

    def text(m):
        raw = m.group(1); k = _norm(raw)
        if k in TEXT:
            lead = raw[:len(raw) - len(raw.lstrip())]; trail = raw[len(raw.rstrip()):]
            return '>' + lead + html.escape(TEXT[k], quote=False) + trail + '<'
        return m.group(0)
    h = re.sub(r'>([^<>\x00]+)<', text, h)

    def attr(m):
        name, q, val = m.group(1), m.group(2), m.group(3)
        k = _norm(val)
        return f'{name}={q}{html.escape(TEXT[k], quote=True)}{q}' if k in TEXT else m.group(0)
    h = re.sub(r'\b(alt|placeholder|aria-label|title)=(["\'])(.*?)\2', attr, h, flags=re.S)
    return re.sub(r'\x00(\d+)\x00', lambda m: keep[int(m.group(1))], h)


def apply(C):
    """Añade 'pt' a los textos de ms_content (C = módulo)."""
    A = lambda name, pt: _put(getattr(C, name), pt)
    A('PIL_EYE', 'Os três pilares')
    A('PIL_H2', 'O que torna possível uma Microschool Chanak')
    A('PIL_LEAD', 'Uma Microschool é uma parceria com uma comunidade de famílias que já existe (mínimo de lançamento: 10 famílias), nos Estados Unidos e em outros países. Toda sede se apoia nos mesmos três pilares.')
    pillars = [
        ('A · Plano de estudos americano credenciado pela MSA-CESS, fornecido pela Chanak',
         'Currículo americano K–12 alinhado aos padrões B.E.S.T. e à norma da Flórida, sob o credenciamento MSA-CESS da Chanak. Inclui Mastery Learning, o modelo 60/20/20, plataforma, históricos e diploma. Você pode complementá-lo com o seu próprio currículo, dentro do marco Chanak.'),
        ('B · Instalações que cumprem os requisitos municipais e estaduais',
         'O espaço deve cumprir a norma municipal, regional ou estadual do seu país: uso do imóvel, segurança, acessibilidade, seguros e lotação. O parceiro é o responsável legal por suas instalações; a Chanak fornece uma lista de verificação e orienta você.'),
        ('C · Equipe docente qualificada segundo as leis do país e certificada pela Chanak',
         'A sua equipe cumpre os requisitos de qualificação e de verificação de antecedentes do seu país e, além disso, é certificada com a formação da Chanak (Chanak TrainUp) para aplicar o Mastery Learning e o modelo 60/20/20.'),
    ]
    for (t, p), (tp, pp) in zip(C.PILLARS, pillars):
        t['pt'] = tp; p['pt'] = pp
    A('PIL_LEGAL', 'A Chanak orienta e acompanha, mas não substitui a assessoria jurídica local nem garante autorizações, códigos de centro ou fundos públicos: cada país tem seus próprios requisitos.')
    A('PIL_FAMILIES', 'Você é uma família e não lidera uma comunidade? A sua porta de entrada é o <a href="{hs}">Homeschool Guiado</a> ou o <a href="{dd}">Dual Diploma</a>; teremos prazer em orientar você.')
    A('GEO_EYE', 'Estados Unidos e internacional')
    A('GEO_H2', 'Como funciona conforme o lugar em que você está')
    C.GEO_TH['pt'] = ('Onde', 'Como a Microschool opera')
    geo = [
        ('Microschools EUA', 'Parceria contratada diretamente com a Chanak. A Microschool opera sob o credenciamento e as aprovações ESA da Chanak, sem código escolar próprio. Os fundos ESA se aplicam somente nos estados em que a Chanak é provedora aprovada e somente aos serviços aprovados em cada programa; a elegibilidade depende de cada estado. As instalações são verificadas antes da abertura. Entrada do estudante: apoio homeschool ou Programa Completo.'),
        ('International Microschools · Espanha', 'Parceria contratada diretamente com a Chanak. Centro estrangeiro regulamentado (Real Decreto 806/1993): o operador local solicita e obtém as autorizações, assume suas instalações e seu pessoal presencial e fixa a mensalidade de suas famílias conforme a sua realidade. A autorização depende de cada comunidade autônoma.'),
        ('International Microschools · México, Panamá e outros países', 'Parceria contratada diretamente com a Chanak. Exige o código ou a autorização da autoridade educacional local, que o operador local obtém; os requisitos são próprios de cada país. Avalia-se caso a caso.'),
    ]
    for (a, b), (pa, pb) in zip(C.GEO_ROWS, geo):
        a['pt'] = pa; b['pt'] = pb
    A('LEGAL_EYE', 'Referência')
    A('LEGAL_H2', 'Marco legal por país')
    A('LEGAL_FOOT', 'Informação de referência, não é assessoria jurídica. Os requisitos mudam e variam conforme a região; verifique-os com a autoridade educacional do seu país. Última revisão: {date}.')
    A('LEGAL_NORMS', 'Normas de referência')
    A('TOOLS_H', 'Ferramentas para fundadores')
    tools = [('Calculadora de orçamento', 'Investimento inicial, gasto mensal, ponto de equilíbrio e prévia normativa do seu país.'),
             ('7 erros ao abrir uma Microschool', 'Um guia breve para evitá-los desde o primeiro dia.'),
             ('Abra uma Microschool', 'O caminho do parceiro, os requisitos e a solicitação como Entidade Parceira.'),
             ('Mentores e colaboradores', 'Quer acompanhar estudantes sem abrir uma sede? Saiba como colaborar.')]
    for (t, p, _k), (tp, pp) in zip(C.TOOLS, tools):
        t['pt'] = tp; p['pt'] = pp
    A('OPEN_TITLE', 'Como abrir uma Microschool cristã · Chanak')
    A('OPEN_DESC', 'Abra uma Chanak Microschool (Partner Learning Center): você traz espaço e comunidade; a Chanak, o credenciamento MSA-CESS, o currículo e a formação.')
    A('MS_TITLE', 'Microschool cristã: aprender em comunidade · Chanak')
    A('MS_DESC', 'Pequenos grupos presenciais com plano de estudos americano credenciado pela MSA-CESS. Parceria para comunidades de 10 famílias ou mais.')
    A('HERO_H1', 'Abra uma Chanak Microschool <em>(Partner Learning Center)</em> na sua cidade')
    A('HERO_LEAD', 'Você traz a visão local, o espaço e a comunidade; a Chanak traz o credenciamento MSA-CESS, o currículo 60/20/20, o SIS, a formação de Guias e o acompanhamento nos fundos ESA nos estados americanos em que a Chanak é provedora aprovada e somente para os serviços aprovados em cada programa (revisado estado por estado).')
    A('HERO_CTA', 'Candidatar minha organização como Entidade Parceira →')
    A('HERO_CTA2', 'Teste de compatibilidade (2 min) ↓')
    _put_seq(C.ESA_CARD, ['Acompanhamento nos fundos ESA (EUA)', 'Nos estados dos EUA em que a Chanak é provedora aprovada, as famílias podem solicitar o uso de seus fundos ESA para os serviços aprovados em cada programa. A elegibilidade e cada autorização são decididas pelo programa de cada estado.'])
    A('WHY_EXTRA', 'Você trabalha com o respaldo institucional da MSA-CESS, a plataforma SIS, a certificação obrigatória de Guias e Coordenadores e a autonomia local para fixar a mensalidade das suas famílias. Cada sede é uma Microschool associada (Partner Learning Center) sob a supervisão acadêmica centralizada da Chanak TrainUp Education, Inc. (FLDOE #134620, Credenciada pela MSA-CESS).')
    A('STEPS_EYE', 'Passo a passo')
    A('STEPS_H2', 'O caminho do parceiro em 7 passos')
    A('STEPS_LEAD', 'Da primeira conversa à abertura, com acompanhamento em cada etapa.')
    steps = [('Filtro inicial', 'Teste rápido de compatibilidade e ligação de 20 minutos.'),
             ('Entrevista e revisão', 'Entrevista, revisão das instalações e verificação de antecedentes.'),
             ('Assinatura legal', 'Acordo-Marco Internacional e anexos de sede e de país.'),
             ('Taxa de incorporação da sede', 'Detalhada por escrito na sua proposta de parceria.'),
             ('Certificação de Guias e Coordenadores', 'Formação obrigatória no SIS, no Mastery Learning e no modelo 60/20/20.'),
             ('Trâmites, licenças e inspeções locais', 'Por exemplo, a autorização como centro estrangeiro (RD 806/1993) na Espanha, ou as licenças municipais e de segurança contra incêndio na América Latina.'),
             ('Abertura oficial', 'Com a sua comunidade de famílias comprometidas (10 ou mais) e a visita de validação da Chanak.')]
    for (a, b), (pa, pb) in zip(C.STEPS, steps):
        a['pt'] = pa; b['pt'] = pb
    A('KIT_EYE', 'Download gratuito')
    A('KIT_H2', 'Kit do fundador')
    A('KIT_P', 'Duas ferramentas para começar com o pé direito: a calculadora de orçamento e ponto de equilíbrio, e o guia «7 erros ao abrir uma Microschool».')
    kf = dict(org='Nome da entidade jurídica', country='País', city='Cidade', name='Nome do representante', email='E-mail', cap='Capacidade estimada (estudantes)',
              send='Receber o kit →', ok_h='Obrigado. Aqui está o seu kit', ok_p='Também escreveremos para você oferecendo uma conversa sobre a parceria.', xlsx='Planilha (Excel, em espanhol)')
    for k, v in kf.items():
        C.KIT_F[k]['pt'] = v
    faq = [('Quem pode abrir uma Chanak Microschool?', 'Igrejas, cooperativas, educadores e organizações com entidade legal que já reúnem uma comunidade de famílias (10 ou mais), nos Estados Unidos ou em outros países. As famílias individuais entram pelo Homeschool Guiado ou pelo Dual Diploma.'),
           ('A Microschool fica credenciada?', 'Não de forma independente. O credenciamento MSA-CESS é da Chanak International Academy e respalda os históricos e diplomas emitidos pela escola. Cada sede é uma Microschool associada (Partner Learning Center) que é validada e supervisionada.'),
           ('Quanto custa a parceria?', 'As condições econômicas são entregues por escrito na proposta de parceria, conforme o país, o número de famílias e os serviços. A mensalidade paga pelas famílias é fixada por cada parceiro. Você pode estimar o seu orçamento com a calculadora.'),
           ('Podem-se usar fundos ESA?', 'Somente nos estados dos EUA em que a Chanak é provedora aprovada e somente para os serviços aprovados em cada programa. A elegibilidade é decidida por cada estado; fora dos EUA não existem fundos ESA.'),
           ('A Chanak tramita as autorizações do meu país?', 'Não. O parceiro é responsável por suas licenças, instalações e pessoal. A Chanak orienta e acompanha, mas não substitui a assessoria jurídica local nem garante autorizações, códigos de centro ou fundos públicos.')]
    for (q, a), (qp, ap) in zip(C.FAQ, faq):
        q['pt'] = qp; a['pt'] = ap
    A('FAQ_H2', 'Perguntas frequentes de parceiros')
    A('PRIV', 'Aceito a <a href="{priv}">política de privacidade</a> e que a Chanak entre em contato comigo sobre esta solicitação.')
    C.FORM_MSG['sending']['pt'] = 'Enviando…'
    C.FORM_MSG['err']['pt'] = 'Não foi possível enviar. Escreva para administration@chanakacademy.org.'
    A('CRUMB_MS', 'Microschools')
    A('CRUMB_OPEN', 'Abra uma Microschool')
    A('COND_EYE', 'Contratação direta')
    A('COND_H2', 'Uma parceria direta com a Chanak')
    A('COND_LEAD', 'Todas as parcerias comerciais e acadêmicas são firmadas diretamente com a Chanak International Academy, operada pela Chanak TrainUp Education, Inc., tanto nas Microschools EUA quanto nas International Microschools.')
    cond = [('Mínimo de lançamento', '10 famílias comprometidas.'),
            ('Contrato de parceria', 'Por escrito e diretamente com a Chanak.'),
            ('Responsabilidade do operador local', 'Instalações, pessoal presencial e autorizações locais.'),
            ('O que a Chanak oferece', 'Os serviços acadêmicos e tecnológicos estabelecidos no acordo.'),
            ('Certificação de Guias', 'Formação inicial obrigatória; a certificação exige concluí-la e ser aprovado na avaliação. A duração é confirmada no acordo.'),
            ('Condições econômicas', 'São determinadas conforme o país, o programa e os serviços contratados, e são entregues por escrito na proposta de parceria.'),
            ('Credenciamento', 'O credenciamento MSA-CESS é da Chanak International Academy e respalda os históricos e diplomas emitidos pela Chanak. Não se estende automaticamente a centros independentes: cada implementação é validada e supervisionada.')]
    for (a, b), (pa, pb) in zip(C.COND, cond):
        a['pt'] = pa; b['pt'] = pb


def _put(d, pt):
    d['pt'] = pt


def _put_seq(seq, pts):
    for d, pt in zip(seq, pts):
        d['pt'] = pt
