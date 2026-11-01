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
    summary: 'o design system do dashboard b2b, do figma ao código vue com plugin e gerador feitos por mim.',
    status: 'em andamento',
    tags: ['design system', 'plugin do figma', 'vue'],
    hero: {
      src: '/design-system/figma-v2.png',
      alt: 'Componentes v2 no Figma: botões, seletor de período, inputs, campos de data, select aberto e a barra de filtros montada',
      caption: 'o ciclo de formulários e filtros da v2, direto do Figma.',
    },
    tldr: [
      ['Papel', 'tudo: auditoria, design no Figma, plugin, gerador de código'],
      ['Time', 'desenvolvido por mim, pra ser aplicado pelo time de desenvolvimento'],
      ['Quando', 'set/2026 → em andamento'],
      ['Produto', 'dashboard onde as marcas parceiras (os grandes clientes B2B da Moneri) acompanham vendas, creators e comissões'],
      ['Até aqui', '20 componentes v2 · botão primário de 3,4:1 → 4,66:1 de contraste · badges de 2,2–3,4:1 → 5–7:1 · 11 tamanhos de fonte → 6 · 41 de 45 variantes geradas batendo com o Figma em até 1px'],
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
      { type: 'image', src: '/design-system/inconsistencias.png', alt: 'Quatro recortes da v1: dois inputs de sistemas diferentes, um amarelo com três nomes, link verde e link azul, e badges com texto branco abaixo de 4,5:1', caption: 'quatro jeitos diferentes de resolver a mesma coisa, todos em produção.' },
      {
        type: 'text',
        heading: 'Primeiro o que existe, depois o que deveria existir',
        body: [
          'Ao invés de abrir o Figma e desenhar o sistema ideal, fiz o contrário: a **v1 foi extraída do código em produção**. Cada token saiu dos arquivos SCSS do layout antigo, cada componente de um `.vue` do projeto. Por termos essa abordagem "lean", estamos constantemente buscando oportunidades de "cortar caminho": um novo sistema que nasce do atual é mais simples de implementar e mais objetivo na hora de ser expandido.',
        ],
      },
      {
        type: 'callout',
        body: 'Em uma análise inicial de heurísticas de UX e acessibilidade, o número 4,5 virou prioridade: badges entre 2,2:1 e 3,4:1 e o botão primário em 3,4:1 de contraste. O mínimo pra texto é **4,5:1**. Acessibilidade virou o primeiro item da v2, antes de qualquer mudança estética, e isso já implicava uma decisão difícil: **usar menos o verde original da marca.**',
      },
      {
        type: 'text',
        heading: 'Usar menos a cor da marca (de propósito)',
        body: [
          'O verde da Moneri (`#669933`) com texto branco não passa. Em vez de abandonar o verde, criei uma escala a partir dele e passei os botões pra um tom mais escuro (`#558029`, 4,66:1). Testei um intermediário mais fiel ao original (`#5A872D`), mas ele parava em 4,25:1. Perto, mas ainda assim fora. Já que chegamos até aqui, por que não atingir a marca de uma vez?',
          'O verde original continua como identidade, na sidebar, onde é fundo para a marca e não texto de ação.',
        ],
      },
      { type: 'image', src: '/design-system/verde.png', alt: 'Escala do verde de 50 a 900 com o contraste do texto branco em cada tom, e o mesmo botão em três verdes: 3,40:1, 4,25:1 e 4,66:1', caption: 'a escala do verde e os três botões que testei.' },
      {
        type: 'text',
        heading: 'O Figma manda, o código obedece',
        body: [
          'Na v2 o Figma é a fonte da verdade, e o desafio passou a ser a entrega: como garantir que o que eu ajusto no Figma chegue igualzinho no código, sem eu redesenhar tudo à mão em Vue? Construí um fluxo próprio:',
          {
            list: [
              '**Gerar** (plugin do Figma): cria cada leva de componentes já ligada às variables. Ele só cria; nunca mexe no que eu já ajustei à mão.',
              '**Exportar** (plugin): gera um JSON com variables, estilos e a estrutura de cada componente que marquei como pronto.',
              '**Sync** (script): lê o JSON e gera os componentes em Vue, com `var(--token)` em toda camada ligada a uma variable.',
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
      { type: 'image', src: '/design-system/fluxo.png', alt: 'Fluxo em quatro etapas: Gerar e Exportar no plugin do Figma, Sync no código e os componentes Vue com tokens em CSS', caption: 'do Figma ao .vue, sem redesenhar nada à mão.' },
      {
        type: 'code',
        panels: [
          { file: 'figma-export.json', code: `{
  "name": "Status=Faturado",
  "layout": {
    "mode": "HORIZONTAL",
    "padding": [4, 10, 4, 10],
    "primary": "CENTER"
  },
  "fills": [
    { "color": "#e0f2e0", "var": "feedback/success/bg" }
  ],
  "bound": {
    "paddingTop": "space/4",
    "paddingLeft": "space/10",
    "topLeftRadius": "radius/lg"
  },
  "children": [{
    "type": "TEXT",
    "text": { "characters": "Faturado" },
    "fills": [
      { "color": "#3a571d", "var": "feedback/success/fg" }
    ]
  }]
}` },
          { file: 'StatusBadge.vue', code: `<!-- figma: Status=Faturado -->
<div v-else style="
  display: flex;
  padding: var(--space-4) var(--space-10)
           var(--space-4) var(--space-10);
  justify-content: center;
  align-items: center;
  background-color: var(--feedback-success-bg);
  border-radius: var(--radius-lg)">
  <span class="ts-badge" style="
    color: var(--feedback-success-fg);
    white-space: nowrap">
    Faturado
  </span>
</div>` },
        ],
        caption: 'um badge no json que o plugin exporta e no .vue que o sync gera (recortados e quebrados em linhas pra caber). os tokens marcados são os mesmos dos dois lados.',
      },
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
      { type: 'image', src: '/design-system/kpis.png', alt: 'Antes: cinco cards de KPI soltos em Poppins. Depois: um bloco único em Manrope e Sora com números tabulares', caption: 'os mesmos cinco números, antes e depois.' },
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
    summary: 'um quiz que recomenda destinos a partir do seu momento. design, motor de recomendação e front, no ar.',
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
      { type: 'image', src: '/enjoy-rio/propostas.png', alt: 'À esquerda, o mockup do fluxo aprovado no Figma com quatro telas: respiração com um círculo azul, roda de emoções em pétalas, a primeira pergunta e o resultado. À direita, as mesmas quatro telas no ar: respiração com um sol amarelo, emoções em quatro círculos, a pergunta e o resultado em Arraial do Cabo', caption: 'a proposta que o cliente aprovou e o que foi pro ar.' },
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
      { type: 'image', src: '/enjoy-rio/motor.png', alt: 'Diagrama do motor: emoção e perguntas somam pontos em 7 dimensões, as duas mais fortes definem o perfil, a distância filtra e saem os 3 destinos com maior nota', caption: 'como uma resposta vira um destino.' },
      {
        type: 'text',
        heading: 'Construir, auditar, ajustar',
        body: [
          'Como o motor foi construído com assistência de IA, eu não queria confiar só no "parece que funciona". Antes de colocar na frente de pessoas reais, criei um **agente de auditoria**: ele simulava combinações de respostas e checava se o motor se comportava como a gente esperava.',
          'Ele achou coisas que um teste manual dificilmente pegaria: as primeiras perguntas decidiam quase tudo sozinhas, a emoção pesava demais, e tinha destino que nunca chegava ao topo. Virou um relatório pra stakeholder, e as correções saíram em poucas rodadas: perguntas reordenadas, a emoção com peso menor, perfis de destino revisados (e dois destinos removidos em vez de ajustados artificialmente) e um bônus pelo cenário que a pessoa diz preferir.',
        ],
      },
      { type: 'image', src: '/enjoy-rio/relatorio.png', alt: 'Página do relatório de auditoria do motor, com os três primeiros problemas: a primeira resposta domina, a emoção pesa demais e um destino nunca chega ao primeiro lugar', caption: 'um trecho do relatório que foi pra stakeholder.' },
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
    subtitle: 'reorganizando uma página que cresceu por partes e reduzindo em ~20% os chamados de suporte',
    summary: 'a página reorganizada pelo que o creator veio fazer: ~20% menos chamados de suporte.',
    status: null,
    tags: ['hierarquia de informação', 'mobile', 'white-label'],
    hero: {
      src: '/marcas/hero.png',
      alt: 'Página de marca antes e depois, no primeiro scroll do celular: antes o código é um campo no meio do card; depois ganha um card próprio no topo',
      caption: 'antes e depois, no primeiro scroll. marcas e banners trocados por fictícios.',
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
      { type: 'image', src: '/marcas/lost.png', alt: 'A página antiga desfocada, com só o campo do código em foco', caption: 'tira o foco de todo o resto e sobra isso: o código.', narrow: true },
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
      { type: 'image', src: '/marcas/mapa.png', alt: 'Mapa das páginas antiga e nova, do topo ao fim, com blocos coloridos por tipo de conteúdo: banner, código, grupo e metas, comunidade e materiais, regras', caption: 'a página antiga e a nova, do topo ao fim.' },
      {
        type: 'text',
        heading: 'Um layout, quatro situações',
        body: [
          'A mesma estrutura precisava funcionar pro creator padrão, pro grupo com descrição, pras marcas com várias metas e pro creator que ainda não tem código. Nesse último caso, criar o cupom virou um bloco só (prefixo, campo, termo, botão), em vez de pedaços espalhados no texto.',
          'E tudo isso no tema de cada marca: o destaque vem de superfície e posição, não só de cor, então funciona com o vermelho de uma e o roxo de outra. Tecnicamente, a página se adapta por legibilidade a depender das cores escolhidas pela marca, mudando automaticamente a cor de texto e/ou fundo.',
          'E o conteúdo também é da marca: descrição, metas, grupo e materiais são personalizados por cada uma. Por isso algumas telas mostram informações diferentes, ou deixam de mostrar, em relação às outras. O layout tem que segurar a página cheia e a quase vazia.',
        ],
      },
      { type: 'image', src: '/marcas/states.png', alt: 'Três estados da página nova: creator padrão, grupo com descrição e várias metas, e creator ainda sem código, em temas vermelho e roxo', caption: 'um layout, três situações. marcas fictícias, cada uma com o próprio conteúdo.' },
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
    summary: 'the b2b dashboard design system, from figma to vue code with a plugin and generator I built.',
    status: 'in progress',
    tags: ['design system', 'figma plugin', 'vue'],
    hero: {
      src: '/design-system/figma-v2.png',
      alt: 'v2 components in Figma: buttons, period selector, inputs, date fields, an open select and the assembled filter bar',
      caption: 'the v2 forms and filters cycle, straight from Figma.',
    },
    tldr: [
      ['Role', 'everything: audit, Figma design, plugin, code generator'],
      ['Team', 'built by me, to be rolled out by the development team'],
      ['When', 'sep/2026 → in progress'],
      ['Product', "the dashboard where partner brands (Moneri's big B2B clients) track sales, creators and commissions"],
      ['So far', '20 v2 components · primary button from 3.4:1 → 4.66:1 contrast · badges from 2.2–3.4:1 → 5–7:1 · 11 font sizes → 6 · 41 of 45 generated variants matching Figma within 1px'],
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
      { type: 'image', src: '/design-system/inconsistencias-en.png', alt: 'Four v1 close-ups: two inputs from different systems, one yellow with three names, a green link and a blue link, and white-text badges below 4.5:1', caption: 'four different ways of solving the same thing, all in production.' },
      {
        type: 'text',
        heading: 'What exists first, what should exist later',
        body: [
          "Instead of opening Figma and designing the ideal system, I did the opposite: **v1 was extracted from production code**. Every token came from the old layout's SCSS files, every component from a `.vue` file in the project. Being a lean team, we're always looking for shortcuts: a new system born from the current one is simpler to roll out and more objective to expand.",
        ],
      },
      {
        type: 'callout',
        body: 'A first pass of UX and accessibility heuristics made one number the priority: badges between 2.2:1 and 3.4:1 and the primary button at 3.4:1 contrast. The minimum for text is **4.5:1**. Accessibility became the first item of v2, before any aesthetic change, and that already meant a tough call: **using less of the original brand green.**',
      },
      {
        type: 'text',
        heading: 'Using less of the brand color (on purpose)',
        body: [
          "Moneri's green (`#669933`) with white text doesn't pass. Instead of dropping the green, I built a scale from it and moved buttons to a darker shade (`#558029`, 4.66:1). I tried an in-between closer to the original (`#5A872D`), but it stopped at 4.25:1. Close, but still out. Having come this far, why not clear the bar for good?",
          'The original green stays as identity in the sidebar, where it is a brand background, not action text.',
        ],
      },
      { type: 'image', src: '/design-system/verde-en.png', alt: 'Green scale from 50 to 900 with the white-text contrast on each step, and the same button in three greens: 3.40:1, 4.25:1 and 4.66:1', caption: 'the green scale and the three buttons I tested.' },
      {
        type: 'text',
        heading: 'Figma calls the shots, code follows',
        body: [
          'In v2, Figma is the source of truth, and the challenge became delivery: how do I make sure what I tweak in Figma lands in code exactly the same, without redrawing everything by hand in Vue? I built my own pipeline:',
          {
            list: [
              '**Generate** (Figma plugin): creates each batch of components already bound to variables. It only creates; it never touches what I adjusted by hand.',
              '**Export** (plugin): outputs a JSON with variables, styles and the structure of every component I marked as ready.',
              '**Sync** (script): reads the JSON and generates Vue components, with `var(--token)` on every layer bound to a variable.',
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
      { type: 'image', src: '/design-system/fluxo-en.png', alt: 'Four-step flow: Generate and Export in the Figma plugin, Sync in code, and the Vue components with CSS tokens', caption: 'from Figma to .vue, nothing redrawn by hand.' },
      {
        type: 'code',
        panels: [
          { file: 'figma-export.json', code: `{
  "name": "Status=Faturado",
  "layout": {
    "mode": "HORIZONTAL",
    "padding": [4, 10, 4, 10],
    "primary": "CENTER"
  },
  "fills": [
    { "color": "#e0f2e0", "var": "feedback/success/bg" }
  ],
  "bound": {
    "paddingTop": "space/4",
    "paddingLeft": "space/10",
    "topLeftRadius": "radius/lg"
  },
  "children": [{
    "type": "TEXT",
    "text": { "characters": "Faturado" },
    "fills": [
      { "color": "#3a571d", "var": "feedback/success/fg" }
    ]
  }]
}` },
          { file: 'StatusBadge.vue', code: `<!-- figma: Status=Faturado -->
<div v-else style="
  display: flex;
  padding: var(--space-4) var(--space-10)
           var(--space-4) var(--space-10);
  justify-content: center;
  align-items: center;
  background-color: var(--feedback-success-bg);
  border-radius: var(--radius-lg)">
  <span class="ts-badge" style="
    color: var(--feedback-success-fg);
    white-space: nowrap">
    Faturado
  </span>
</div>` },
        ],
        caption: 'a badge in the json the plugin exports and in the .vue the sync generates (trimmed and wrapped to fit). the highlighted tokens are the same on both sides.',
      },
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
      { type: 'image', src: '/design-system/kpis-en.png', alt: 'Before: five loose KPI cards in Poppins. After: one block in Manrope and Sora with tabular numbers', caption: 'the same five numbers, before and after.' },
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
    summary: 'a quiz that recommends destinations based on how you feel. design, recommendation engine and front end, live.',
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
      { type: 'image', src: '/enjoy-rio/propostas-en.png', alt: 'On the left, the flow mockup approved in Figma with four screens: breathing with a blue circle, a petal emotion wheel, the first question and the result. On the right, the same four screens live: breathing with a yellow sun, emotions as four circles, the question and the result in Arraial do Cabo', caption: 'the proposal the client approved and what went live.' },
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
      { type: 'image', src: '/enjoy-rio/motor-en.png', alt: 'Engine diagram: emotion and questions add points to 7 dimensions, the two strongest pick the profile, distance filters, and the 3 highest-scoring destinations come out', caption: 'how an answer becomes a destination.' },
      {
        type: 'text',
        heading: 'Build, audit, adjust',
        body: [
          'Since the engine was built with AI assistance, I didn\'t want to rely on "looks like it works". Before putting it in front of real people, I created an **audit agent**: it simulated combinations of answers and checked whether the engine behaved the way we expected.',
          "It found things manual testing would hardly catch: the first questions decided almost everything on their own, the emotion weighed too much, and some destinations never made it to the top. That became a report for the stakeholder, and the fixes came in a few rounds: questions reordered, a lighter weight for the emotion, revised destination profiles (two destinations removed instead of artificially tuned) and a bonus for the scenery people say they prefer.",
        ],
      },
      { type: 'image', src: '/enjoy-rio/relatorio.png', alt: 'Page of the engine audit report (in Portuguese) with the first three issues: the first answer dominates, the emotion weighs too much, and one destination never reaches first place', caption: 'part of the report that went to the stakeholder (in Portuguese).' },
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
    subtitle: 'reorganizing a page that grew piece by piece, and cutting support tickets by ~20%',
    summary: 'the page reorganized around what creators came to do: ~20% fewer support tickets.',
    status: null,
    tags: ['information hierarchy', 'mobile', 'white-label'],
    hero: {
      src: '/marcas/hero-en.png',
      alt: 'Brand page before and after, at the first phone scroll: before, the code is a field in the middle of the card; after, it gets its own card at the top',
      caption: 'before and after, at the first scroll. brands and banners swapped for fictional ones.',
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
      { type: 'image', src: '/marcas/lost-en.png', alt: 'The old page blurred, with only the code field in focus', caption: 'take the focus off everything else and this is what is left: the code.', narrow: true },
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
      { type: 'image', src: '/marcas/mapa-en.png', alt: 'Map of the old and new pages, top to bottom, with blocks colored by content type: banner, code, group and goals, community and materials, rules', caption: 'the old page and the new one, top to bottom.' },
      {
        type: 'text',
        heading: 'One layout, four situations',
        body: [
          "The same structure had to work for the standard creator, for groups with a description, for brands with several goals and for creators who don't have a code yet. In that last case, creating the coupon became a single block (prefix, field, terms, button) instead of pieces scattered across the text.",
          "And all of it in each brand's theme: emphasis comes from surface and position, not just color, so it works with one brand's red and another's purple. Under the hood, the page adapts for legibility based on the brand's colors, automatically switching text and/or background color.",
          "The content belongs to the brand too: description, goals, group and materials are customized by each one. That's why some screens show different information, or leave some out, compared to the others. The layout has to hold both the full page and the nearly empty one.",
        ],
      },
      { type: 'image', src: '/marcas/states-en.png', alt: 'Three states of the new page: standard creator, group with a description and several goals, and a creator with no code yet, in red and purple themes', caption: 'one layout, three situations. fictional brands, each with its own content.' },
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

// Language-independent bits: the preview that peeks out of each case's folder
const META = {
  'design-system': { preview: '/design-system/components-v2.jpg' },
  'enjoy-rio': { preview: '/enjoy-rio/welcome.jpg' },
  marcas: { preview: '/marcas/states.png' },
};

const withMeta = list => list.map(c => ({ ...c, ...META[c.slug] }));

export default { pt: withMeta(pt), en: withMeta(en) };
