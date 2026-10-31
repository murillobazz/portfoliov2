// Case studies, one entry per language.
// Inline text supports **bold**, `code` and [links](https://...).
// Section types: text, image, callout, stats. An image without `src` is a
// visual still in production: it shows as a placeholder in dev only.

const QUIZ_URL = 'https://quiz-enjoy-rio.vercel.app/?utm_source=murillobazz.com&utm_medium=portfolio';

const pt = [
  {
    slug: 'design-system',
    name: 'moneri design system',
    title: 'Um design system que começa no código em produção e volta para ele',
    subtitle: 'design system do dashboard b2b da moneri: do legado ao figma e de volta pro código',
    status: 'em andamento',
    tags: ['design system', 'plugin do figma', 'vue'],
    hero: {
      todo: 'componentes v2 no Figma (variables + variantes), exportados em alta do arquivo do DS',
    },
    tldr: [
      ['Papel', 'tudo: auditoria, design no Figma, plugin, gerador de código'],
      ['Time', 'só eu'],
      ['Quando', 'set/2026 → em andamento'],
      ['Produto', 'dashboard onde as marcas parceiras (os grandes clientes B2B da Moneri) acompanham vendas, creators e comissões'],
      ['Até aqui', '20 componentes v2 · botão primário de 3,3:1 → 4,66:1 de contraste · badges de ~2,4:1 → 5–7:1 · 11 tamanhos de fonte → 6 · 41 de 45 variantes geradas batendo com o Figma em até 1px'],
    ],
    sections: [
      {
        type: 'text',
        heading: 'Um time pequeno que entrega rápido',
        body: [
          'O time de dev da Moneri é enxuto e entrega muito rápido. Rápido demais pra parar e discutir como cada página ou função nova deveria ser.',
          'Sem um sistema, cada pessoa resolvia do seu jeito, e o dashboard foi acumulando os jeitos de todo mundo: dois sistemas de input re-estilizados pra parecerem um só, links verdes num lugar e azuis em outro, nomes de cor herdados de um produto antigo, três nomes diferentes pro mesmo amarelo.',
          'O objetivo do DS é dar autonomia: qualquer pessoa do time pode desenvolver uma feature nova e ela já sai coesa com o resto.',
        ],
      },
      { type: 'image', todo: 'recortes ampliados das inconsistências: dois inputs "iguais", link verde × link azul, badges' },
      {
        type: 'text',
        heading: 'Primeiro o que existe, depois o que deveria existir',
        body: [
          'Ao invés de abrir o Figma e desenhar o sistema ideal, fiz o contrário: a **v1 foi extraída do código em produção**. Cada token saiu dos arquivos SCSS do layout antigo, cada componente de um `.vue` do projeto. Por termos essa abordagem "lean", estamos constantemente buscando oportunidades de "cortar caminho": um novo sistema que nasce do atual é mais simples de implementar e mais objetivo na hora de ser expandido.',
        ],
      },
      {
        type: 'callout',
        body: 'Em uma análise inicial de heurísticas de UX e acessibilidade, o número 4,5 virou prioridade: badges em 2,5:1 e o botão primário em 3,3:1 de contraste. O mínimo pra texto é **4,5:1**. Acessibilidade virou o primeiro item da v2, antes de qualquer mudança estética, e isso já implicava uma decisão difícil: **usar menos o verde original da marca.**',
      },
      {
        type: 'text',
        heading: 'Usar menos a cor da marca (de propósito)',
        body: [
          'O verde da Moneri (`#669933`) com texto branco não passa. Em vez de abandonar o verde, criei uma escala a partir dele e passei os botões pra um tom mais escuro (`#558029`, 4,66:1). Testei um intermediário mais fiel ao original (`#5A872D`), mas ele parava em 4,25:1. Perto, mas ainda assim fora. Já que chegamos até aqui, por que não atingir a marca de uma vez?',
          'O verde original continua como identidade, na sidebar, onde é fundo para a marca e não texto de ação.',
        ],
      },
      { type: 'image', todo: 'escala do verde com a razão de contraste de cada tom; o botão antes/depois com o número em destaque' },
      {
        type: 'text',
        heading: 'O Figma manda, o código obedece',
        body: [
          'Na v2 o Figma é a fonte da verdade, e o desafio passou a ser a entrega: como garantir que o que eu ajusto no Figma chegue igualzinho no código, sem eu redesenhar tudo à mão em Vue? Construí um fluxo próprio:',
          {
            list: [
              '**Gerar** (plugin do Figma): cria cada leva de componentes já ligada às variables. Ele só cria; nunca mexe no que eu já ajustei à mão.',
              '**Exportar** (plugin): gera um JSON com variables, estilos e a estrutura de cada componente que marquei como pronto.',
              '**Sync** (script): lê o JSON e gera os componentes em Vue 2, com `var(--token)` em toda camada ligada a uma variable.',
            ],
          },
        ],
      },
      {
        type: 'image',
        src: '/design-system/components-v2.jpg',
        alt: 'Preview dos componentes v2 gerados pelo sync: status badges, botão primário em três estados, barra de filtros, grupo de KPIs e paginação',
        caption: 'componentes v2 renderizados direto do código que o sync gerou.',
      },
      { type: 'image', todo: 'diagrama: Figma → Gerar/Exportar → JSON → sync → .vue + tokens; gif marcando uma section como pronta até o componente aparecer no preview' },
      {
        type: 'text',
        heading: 'Decisões que o código não toma sozinho',
        body: [
          'O fluxo automatiza *como* as coisas chegam ao código; *o que* chega continua sendo decisão de design:',
          {
            list: [
              '**Tipografia: de 11 tamanhos pra 6.** Manrope nos títulos (pra casar com a landing), Sora no resto, com números tabulares nos KPIs e tabelas, pros valores não "dançarem" quando mudam.',
              '**Cards unidos.** KPIs em linha viram um bloco só (borda por fora, divisória de 1px), em vez de cinco cards soltos competindo por atenção. Sobra espaço vertical e a visão geral cabe antes do primeiro scroll.',
            ],
          },
        ],
      },
      { type: 'image', todo: 'recortes antes/depois da tipografia e dos KPIs unidos' },
      {
        type: 'stats',
        heading: 'Como sei que está funcionando (por enquanto)',
        items: [
          { value: '41/45', label: 'variantes geradas batem com o Figma em até 1px. A diferença que sobra é intencional (os números tabulares).' },
          { value: '100%', label: 'das cores e textos dos componentes prontos ligados a tokens. Antes, 15 de 25 componentes tinham cor fixa no código.' },
          { value: '≥ 4,5:1', label: 'em todo par texto/fundo dos componentes, menos a sidebar (decisão consciente de marca).' },
        ],
      },
      {
        type: 'text',
        heading: 'O que vem a seguir',
        body: ['A tela-exemplo completa, o onboarding novo e a migração v1 → v2 de uma vez só.'],
      },
    ],
  },
  {
    slug: 'enjoy-rio',
    name: 'enjoy rio',
    title: 'Transformando "como você se sente" em "para onde viajar"',
    subtitle: 'um quiz pra enjoy rio que recomenda destinos no estado do rio a partir do seu momento',
    status: null,
    tags: ['quiz', 'motor de recomendação', 'react'],
    link: { label: 'fazer o quiz', href: QUIZ_URL },
    hero: {
      images: [
        { src: '/enjoy-rio/welcome.jpg', alt: 'Tela de boas-vindas do quiz, explicando o objetivo da jornada' },
        { src: '/enjoy-rio/question.jpg', alt: 'Pergunta 1 de 7: como você está se sentindo no momento?, com cinco respostas' },
        { src: '/enjoy-rio/result.jpg', alt: 'Resultado: destino recomendado, texto sobre o momento da pessoa e botão para planejar a viagem no WhatsApp' },
      ],
      caption: 'boas-vindas, uma das sete perguntas e o resultado.',
    },
    tldr: [
      ['Cliente', '[Enjoy Rio](https://www.enjoyrio.travel/pt/), roteiros e experiências no estado do Rio de Janeiro'],
      ['Papel', 'design e desenvolvimento de ponta a ponta: propostas no Figma, fluxo, interações, motor de recomendação, front-end'],
      ['Time', 'eu + uma stakeholder do cliente com expertise em neurolinguística (curadoria das perguntas e emoções)'],
      ['Quando', 'abr–jun/2026'],
      ['Stack', 'React + TypeScript + Vite, desenvolvimento spec-driven assistido por IA'],
      ['Resultado', 'quiz no ar · 7 dimensões emocionais, 6 perfis de viagem, 16 destinos · a pessoa sai com até 3 destinos e um atalho pra falar com a agência no WhatsApp'],
    ],
    sections: [
      {
        type: 'text',
        heading: 'Quero viajar, mas não sei pra onde',
        body: [
          'A Enjoy Rio queria um diferencial no digital: gerar leads a partir de uma experiência personalizada, com o toque pessoal de quem conhece os destinos.',
          'A aposta de design: quem está indeciso não decide por filtro ("praia, até 2h, até R$ X"), decide pelo que está sentindo. Então o quiz não pergunta sobre destinos, pergunta sobre o seu momento.',
        ],
      },
      {
        type: 'text',
        heading: 'Do Figma à proposta aprovada',
        body: [
          'O projeto começou no Figma, com algumas telas-proposta pro cliente. Depois de aprovadas, elas viraram a base de tudo: especificação, princípios de UX e performance do projeto (uma "constituição" que orienta a IA) e só então o código.',
          'Esse caminho me deixou gastar o tempo onde a IA não decide: o ritmo da respiração, o texto de cada resposta, como o resultado é apresentado, tudo em contato direto com os stakeholders da empresa.',
        ],
      },
      { type: 'image', todo: 'telas-proposta do Figma × telas finais' },
      {
        type: 'text',
        heading: 'Desacelerando antes de perguntar',
        body: [
          'Antes da primeira pergunta tem uma **respiração guiada**: um círculo que expande e contrai (inspire, segure, expire), e o continuar só libera no fim do ciclo.',
          'Um quiz emocional respondido no automático gera respostas genéricas. Uns segundos de pausa mudam o jeito de ler as perguntas, e o produto vira "uma breve jornada", não "um formulário".',
        ],
      },
      { type: 'image', src: '/enjoy-rio/breathing.jpg', alt: 'Tela de respiração guiada do quiz, com um círculo que expande e contrai', caption: 'a respiração guiada.', narrow: true },
      {
        type: 'text',
        heading: 'A roda de emoções',
        body: [
          'A primeira escolha é uma emoção, numa roda com rostinhos ilustrados. A referência é a roda de emoções de Plutchik, uma sugestão da curadoria da stakeholder. Limitar a quatro emoções (intenso, alegre, equilibrado, frustrado) também veio da leitura dela em neurolinguística: menos opções, escolha mais honesta.',
        ],
      },
      { type: 'image', src: '/enjoy-rio/emotions.jpg', alt: 'Roda de emoções do quiz com quatro opções ilustradas', caption: 'quatro emoções, escolha mais honesta.', narrow: true },
      {
        type: 'text',
        heading: 'A recomendação também é design',
        body: [
          'Por trás das telas, cada resposta soma pontos em **7 dimensões** (calmaria, natureza, conexão, vínculo, encantamento, vitalidade, significado). As duas mais fortes definem um de **6 perfis de viagem**, e cada destino tem uma afinidade com cada dimensão.',
          'Ou seja: os pesos *são* a experiência. Sem dúvida, esta foi a parte mais trabalhosa do projeto: um design visual satisfatório não seria nada sem um motor consistente por trás.',
        ],
      },
      { type: 'image', todo: 'diagrama simples: emoção + perguntas → dimensões → perfil → distância → top 3' },
      {
        type: 'text',
        heading: 'Construir, auditar, ajustar',
        body: [
          'Como o motor foi construído com assistência de IA, eu não queria confiar só no "parece que funciona". Antes de colocar na frente de pessoas reais, criei um **agente de auditoria**: ele simulava combinações de respostas e checava se o motor se comportava como a gente esperava.',
          'Ele achou coisas que um teste manual dificilmente pegaria: as primeiras perguntas decidiam quase tudo sozinhas, a emoção pesava demais, e tinha destino que nunca chegava ao topo. Virou um relatório pra stakeholder, e as correções saíram em poucas rodadas: perguntas reordenadas, a emoção com peso menor, perfis de destino revisados (e dois destinos removidos em vez de ajustados artificialmente) e um bônus pelo cenário que a pessoa diz preferir.',
        ],
      },
      { type: 'image', todo: 'uma página do relatório de auditoria + antes/depois da tela de resultado' },
      {
        type: 'text',
        heading: 'E depois',
        body: ['O próximo passo natural é ajustar o algoritmo com base no uso real e testar com viajantes se a recomendação faz sentido pra eles.'],
      },
    ],
  },
  {
    slug: 'marcas',
    name: 'página de marcas',
    title: 'Colocando o código do creator em primeiro lugar',
    subtitle: 'reorganizando uma página que cresceu por partes sem olhar para o todo',
    status: null,
    tags: ['hierarquia de informação', 'mobile', 'white-label'],
    hero: {
      todo: 'antes/depois lado a lado, recortado no primeiro "scroll" do celular (anonimizado)',
    },
    tldr: [
      ['Produto', 'plataforma de creators da Moneri (mais de 100 mil usuários): cada marca tem uma página onde o creator pega o código que divulga'],
      ['Papel', 'design (hierarquia, layout) + implementação'],
      ['Quando', 'jul/2026'],
      ['Problema', 'features novas foram entrando sem lugar definido; a página ficou longa e o creator tinha dificuldade pra gerar seu código e encontrar informações'],
      ['Resultado', '**~20% menos chamados de "problemas de uso da plataforma"**, justamente os que esse redesign mirava'],
    ],
    sections: [
      {
        type: 'text',
        heading: 'Dívida de UX se acumula em silêncio',
        body: [
          'Ninguém desenhou essa página pra ser confusa, mas ela ficou anos sem atualização de design enquanto a plataforma recebia novas funcionalidades que a página teve que comportar. Cada lançamento colocou sua peça onde cabia: metas aqui, aviso de grupo ali, mais um botão de materiais acolá. Depois de algumas rodadas, a coisa mais importante da página, **o código que o creator compartilha pra ganhar comissão**, era um botão que se perdia no meio de tudo.',
          'No Clarity dava pra ver: os creators demoravam muito pra emitir o código na página da marca.',
        ],
      },
      { type: 'image', todo: 'tela antiga com o código marcado, mostrando o quanto ele "some" + print anonimizado do Clarity' },
      {
        type: 'text',
        heading: 'O que o creator veio fazer aqui?',
        body: [
          'Reorganizei a página pela frequência de uso e pensando em indicar "o que fazer em seguida", não pela ordem em que as features nasceram:',
          {
            ordered: true,
            list: [
              '**Pegar o código** → card principal, com o código e o botão de copiar ganhando destaque por hierarquia e espaçamento.',
              '**Entender o grupo** → bloco próprio, com a descrição recolhida quando é longa.',
              '**Acompanhar metas** → bloco próprio; com mais de uma meta, vira carrossel em vez de lista infinita.',
              '**Materiais e comunidade** → os CTAs repetidos (Telegram, WhatsApp, materiais) num lugar só.',
              '**Regras e boas práticas** → no fim, como referência.',
            ],
          },
        ],
      },
      { type: 'image', todo: '"mapa" da página antiga × nova, com blocos coloridos por tipo de conteúdo' },
      {
        type: 'text',
        heading: 'Um layout, quatro situações',
        body: [
          'A mesma estrutura precisava funcionar pro creator padrão, pro grupo com descrição, pras marcas com várias metas e pro creator que ainda não tem código. Nesse último caso, criar o cupom virou um bloco só (prefixo, campo, termo, botão), em vez de pedaços espalhados no texto.',
          'E tudo isso no tema de cada marca: o destaque vem de superfície e posição, não só de cor, então funciona com o vermelho de uma e o roxo de outra. Tecnicamente, a página se adapta por legibilidade a depender das cores escolhidas pela marca, mudando automaticamente a cor de texto e/ou fundo.',
        ],
      },
      { type: 'image', todo: 'grade 2×2 com o topo dos quatro estados, em temas de marca fictícios' },
      {
        type: 'text',
        heading: 'Tratamos do urgente para navegar com calma para o definitivo',
        body: [
          'Esse redesign foi feito sob demanda urgente: resolver o problema sem parar o resto. A versão definitiva vem quando a plataforma de creators ganhar seu próprio design system, como o dashboard B2B está ganhando agora. Até lá, a lição que fica é definir antes onde cada *tipo* de informação mora, pra próxima feature já nascer no lugar certo.',
        ],
      },
    ],
  },
];

const en = [
  {
    slug: 'design-system',
    name: 'moneri design system',
    title: 'A design system that starts from production code and syncs back into it',
    subtitle: "moneri's b2b dashboard design system: from legacy code to figma and back into code",
    status: 'in progress',
    tags: ['design system', 'figma plugin', 'vue'],
    hero: {
      todo: 'v2 components in Figma (variables + variants), high-res export from the DS file',
    },
    tldr: [
      ['Role', 'everything: audit, Figma design, plugin, code generator'],
      ['Team', 'just me'],
      ['When', 'sep/2026 → in progress'],
      ['Product', "the dashboard where partner brands (Moneri's big B2B clients) track sales, creators and commissions"],
      ['So far', '20 v2 components · primary button from 3.3:1 → 4.66:1 contrast · badges from ~2.4:1 → 5–7:1 · 11 font sizes → 6 · 41 of 45 generated variants matching Figma within 1px'],
    ],
    sections: [
      {
        type: 'text',
        heading: 'A small team that ships fast',
        body: [
          "Moneri's dev team is lean and ships really fast. Too fast to stop and discuss how every new page or feature should look.",
          "Without a system, everyone solved things their own way, and the dashboard piled up everyone's ways: two input systems restyled to pass as one, green links here and blue links there, color names inherited from an old product, three different names for the same yellow.",
          'The goal of the DS is autonomy: anyone on the team can build a new feature and it already comes out consistent with the rest.',
        ],
      },
      { type: 'image', todo: 'close-ups of the inconsistencies: two "identical" inputs, green vs blue link, badges' },
      {
        type: 'text',
        heading: 'What exists first, what should exist later',
        body: [
          "Instead of opening Figma and designing the ideal system, I did the opposite: **v1 was extracted from production code**. Every token came from the old layout's SCSS files, every component from a `.vue` file in the project. Being a lean team, we're always looking for shortcuts: a new system born from the current one is simpler to roll out and more objective to expand.",
        ],
      },
      {
        type: 'callout',
        body: 'A first pass of UX and accessibility heuristics made one number the priority: badges at 2.5:1 and the primary button at 3.3:1 contrast. The minimum for text is **4.5:1**. Accessibility became the first item of v2, before any aesthetic change, and that already meant a tough call: **using less of the original brand green.**',
      },
      {
        type: 'text',
        heading: 'Using less of the brand color (on purpose)',
        body: [
          "Moneri's green (`#669933`) with white text doesn't pass. Instead of dropping the green, I built a scale from it and moved buttons to a darker shade (`#558029`, 4.66:1). I tried an in-between closer to the original (`#5A872D`), but it stopped at 4.25:1. Close, but still out. Having come this far, why not clear the bar for good?",
          'The original green stays as identity in the sidebar, where it is a brand background, not action text.',
        ],
      },
      { type: 'image', todo: 'the green scale with each shade’s contrast ratio; the button before/after with the number highlighted' },
      {
        type: 'text',
        heading: 'Figma calls the shots, code follows',
        body: [
          'In v2, Figma is the source of truth, and the challenge became delivery: how do I make sure what I tweak in Figma lands in code exactly the same, without redrawing everything by hand in Vue? I built my own pipeline:',
          {
            list: [
              '**Generate** (Figma plugin): creates each batch of components already bound to variables. It only creates; it never touches what I adjusted by hand.',
              '**Export** (plugin): outputs a JSON with variables, styles and the structure of every component I marked as ready.',
              '**Sync** (script): reads the JSON and generates Vue 2 components, with `var(--token)` on every layer bound to a variable.',
            ],
          },
        ],
      },
      {
        type: 'image',
        src: '/design-system/components-v2.jpg',
        alt: 'Preview of the v2 components generated by the sync: status badges, primary button in three states, filter bar, KPI group and pagination',
        caption: 'v2 components rendered straight from the code the sync generated.',
      },
      { type: 'image', todo: 'diagram: Figma → Generate/Export → JSON → sync → .vue + tokens; gif from marking a section as ready to the component showing up in the preview' },
      {
        type: 'text',
        heading: "Decisions code doesn't make on its own",
        body: [
          'The pipeline automates *how* things reach the code; *what* reaches it is still a design decision:',
          {
            list: [
              '**Typography: from 11 sizes to 6.** Manrope for headings (to match the landing page), Sora for the rest, with tabular numbers in KPIs and tables so values don\'t "dance" when they change.',
              '**Joined cards.** KPIs in a row become a single block (outer border, 1px dividers) instead of five loose cards competing for attention. That frees vertical space, and the overview fits above the first scroll.',
            ],
          },
        ],
      },
      { type: 'image', todo: 'before/after close-ups of the typography and the joined KPIs' },
      {
        type: 'stats',
        heading: "How I know it's working (so far)",
        items: [
          { value: '41/45', label: 'generated variants match Figma within 1px. The remaining difference is intentional (tabular numbers).' },
          { value: '100%', label: 'of colors and text in finished components bound to tokens. Before, 15 of 25 components had hardcoded colors.' },
          { value: '≥ 4.5:1', label: 'on every text/background pair in the components, except the sidebar (a deliberate brand call).' },
        ],
      },
      {
        type: 'text',
        heading: "What's next",
        body: ['The full example screen, the new onboarding and the v1 → v2 migration in one go.'],
      },
    ],
  },
  {
    slug: 'enjoy-rio',
    name: 'enjoy rio',
    title: 'Turning how you feel into where to travel',
    subtitle: 'a quiz for enjoy rio that recommends destinations in rio de janeiro state based on how you feel right now',
    status: null,
    tags: ['quiz', 'recommendation engine', 'react'],
    link: { label: 'take the quiz (in portuguese)', href: QUIZ_URL },
    hero: {
      images: [
        { src: '/enjoy-rio/welcome.jpg', alt: 'Quiz welcome screen explaining the goal of the journey' },
        { src: '/enjoy-rio/question.jpg', alt: 'Question 1 of 7: how are you feeling right now?, with five answers' },
        { src: '/enjoy-rio/result.jpg', alt: 'Result: recommended destination, a note about the person’s moment and a button to plan the trip on WhatsApp' },
      ],
      caption: 'welcome, one of the seven questions, and the result.',
    },
    tldr: [
      ['Client', '[Enjoy Rio](https://www.enjoyrio.travel/pt/), trips and experiences in the state of Rio de Janeiro'],
      ['Role', 'end-to-end design and development: Figma proposals, flow, interactions, recommendation engine, front-end'],
      ['Team', 'me + a client stakeholder with neurolinguistics expertise (curating questions and emotions)'],
      ['When', 'apr–jun/2026'],
      ['Stack', 'React + TypeScript + Vite, AI-assisted spec-driven development'],
      ['Result', 'live quiz · 7 emotional dimensions, 6 travel profiles, 16 destinations · you leave with up to 3 destinations and a shortcut to talk to the agency on WhatsApp'],
    ],
    sections: [
      {
        type: 'text',
        heading: "I want to travel, I just don't know where",
        body: [
          'Enjoy Rio wanted a digital edge: generating leads through a personalized experience, with the personal touch of people who know the destinations.',
          "The design bet: undecided people don't decide by filters (\"beach, under 2h, under $X\"), they decide by how they feel. So the quiz doesn't ask about destinations, it asks about where you are right now.",
        ],
      },
      {
        type: 'text',
        heading: 'From Figma to an approved proposal',
        body: [
          'The project started in Figma, with a few proposal screens for the client. Once approved, they became the base for everything: the spec, the UX and performance principles (a "constitution" that guides the AI) and only then the code.',
          "That path let me spend my time where AI doesn't decide: the pace of the breathing, the copy of each answer, how the result is presented, all in direct contact with the company's stakeholders.",
        ],
      },
      { type: 'image', todo: 'Figma proposal screens vs final screens' },
      {
        type: 'text',
        heading: 'Slowing down before asking',
        body: [
          'Before the first question there is a **guided breathing** step: a circle that expands and contracts (breathe in, hold, breathe out), and continue only unlocks at the end of the cycle.',
          'An emotional quiz answered on autopilot gets generic answers. A few seconds of pause change how people read the questions, and the product becomes "a short journey", not "a form".',
        ],
      },
      { type: 'image', src: '/enjoy-rio/breathing.jpg', alt: 'Guided breathing screen with a circle that expands and contracts', caption: 'the guided breathing.', narrow: true },
      {
        type: 'text',
        heading: 'The emotion wheel',
        body: [
          "The first choice is an emotion, on a wheel with little illustrated faces. The reference is Plutchik's wheel of emotions, suggested by the stakeholder. Limiting it to four emotions (intense, joyful, balanced, frustrated) also came from her neurolinguistics background: fewer options, more honest choices.",
        ],
      },
      { type: 'image', src: '/enjoy-rio/emotions.jpg', alt: 'Emotion wheel with four illustrated options', caption: 'four emotions, more honest choices.', narrow: true },
      {
        type: 'text',
        heading: 'The recommendation is design too',
        body: [
          'Behind the screens, every answer adds points across **7 dimensions** (calm, nature, connection, bonding, wonder, vitality, meaning). The two strongest define one of **6 travel profiles**, and every destination has an affinity with each dimension.',
          'In other words: the weights *are* the experience. This was easily the hardest part of the project: a pleasing visual design would be nothing without a consistent engine behind it.',
        ],
      },
      { type: 'image', todo: 'simple diagram: emotion + questions → dimensions → profile → distance → top 3' },
      {
        type: 'text',
        heading: 'Build, audit, adjust',
        body: [
          'Since the engine was built with AI assistance, I didn\'t want to rely on "looks like it works". Before putting it in front of real people, I created an **audit agent**: it simulated combinations of answers and checked whether the engine behaved the way we expected.',
          "It found things manual testing would hardly catch: the first questions decided almost everything on their own, the emotion weighed too much, and some destinations never made it to the top. That became a report for the stakeholder, and the fixes came in a few rounds: questions reordered, a lighter weight for the emotion, revised destination profiles (two destinations removed instead of artificially tuned) and a bonus for the scenery people say they prefer.",
        ],
      },
      { type: 'image', todo: 'a page of the audit report + before/after of the result screen' },
      {
        type: 'text',
        heading: 'What comes next',
        body: ['The natural next step is tuning the algorithm with real usage and testing with travelers whether the recommendations make sense to them.'],
      },
    ],
  },
  {
    slug: 'marcas',
    name: 'brand page',
    title: "Putting the creator's code first",
    subtitle: 'reorganizing a page that grew piece by piece without looking at the whole',
    status: null,
    tags: ['information hierarchy', 'mobile', 'white-label'],
    hero: {
      todo: 'before/after side by side, cropped at the first phone "scroll" (anonymized)',
    },
    tldr: [
      ['Product', "Moneri's creators platform (100k+ users): every brand has a page where creators get the code they promote"],
      ['Role', 'design (hierarchy, layout) + implementation'],
      ['When', 'jul/2026'],
      ['Problem', 'new features kept landing without a defined place; the page got long and creators struggled to generate their code and find information'],
      ['Result', '**~20% fewer "platform usage problems" support tickets**, exactly the ones this redesign targeted'],
    ],
    sections: [
      {
        type: 'text',
        heading: 'UX debt piles up quietly',
        body: [
          "Nobody designed this page to be confusing, but it went years without a design update while the platform kept shipping features the page had to hold. Each launch put its piece wherever it fit: goals here, a group notice there, one more materials button over there. A few rounds later, the most important thing on the page, **the code creators share to earn commission**, was a button lost in the middle of everything.",
          'Clarity made it visible: creators took a long time to generate their code on the brand page.',
        ],
      },
      { type: 'image', todo: 'old screen with the code highlighted, showing how much it "disappears" + anonymized Clarity print' },
      {
        type: 'text',
        heading: 'What did the creator come here to do?',
        body: [
          'I reorganized the page by frequency of use and around "what to do next", not by the order in which features were born:',
          {
            ordered: true,
            list: [
              '**Get the code** → main card, with the code and the copy button standing out through hierarchy and spacing.',
              '**Understand the group** → its own block, with long descriptions collapsed.',
              '**Track goals** → its own block; with more than one goal, it becomes a carousel instead of an endless list.',
              '**Materials and community** → the repeated CTAs (Telegram, WhatsApp, materials) in one place.',
              '**Rules and best practices** → at the end, as reference.',
            ],
          },
        ],
      },
      { type: 'image', todo: '"map" of the old vs new page, with blocks colored by content type' },
      {
        type: 'text',
        heading: 'One layout, four situations',
        body: [
          "The same structure had to work for the standard creator, for groups with a description, for brands with several goals and for creators who don't have a code yet. In that last case, creating the coupon became a single block (prefix, field, terms, button) instead of pieces scattered across the text.",
          "And all of it in each brand's theme: emphasis comes from surface and position, not just color, so it works with one brand's red and another's purple. Under the hood, the page adapts for legibility based on the brand's colors, automatically switching text and/or background color.",
        ],
      },
      { type: 'image', todo: '2×2 grid with the top of the four states, in fictional brand themes' },
      {
        type: 'text',
        heading: 'Urgent now, definitive later',
        body: [
          'This redesign was an urgent request: fix the problem without stopping everything else. The definitive version comes when the creators platform gets its own design system, like the B2B dashboard is getting now. Until then, the lesson is to decide upfront where each *type* of information lives, so the next feature is born in the right place.',
        ],
      },
    ],
  },
];

// Language-independent bits: the symbol on each case's folder and the
// preview that peeks out of it on the work page
const META = {
  'design-system': { symbol: 'components', preview: '/design-system/components-v2.jpg' },
  'enjoy-rio': { symbol: 'emotion', preview: '/enjoy-rio/welcome.jpg' },
  marcas: { symbol: 'coupon', preview: null },
};

const withMeta = list => list.map(c => ({ ...c, ...META[c.slug] }));

export default { pt: withMeta(pt), en: withMeta(en) };
