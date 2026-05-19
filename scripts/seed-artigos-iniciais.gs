/**
 * Função temporária — Execute UMA VEZ para inserir artigos iniciais premium
 * Depois pode deletar esta função do projeto
 */
function inserirArtigosIniciais() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) throw new Error('Aba "Artigos" não encontrada');
  
  const artigos = [
    {
      data: '12/05/2026 09:00',
      status: 'Publicado',
      titulo: 'A engenharia invisível: os detalhes construtivos que o cliente não vê, mas sente ao longo dos anos',
      subtitulo: 'Por que as decisões técnicas tomadas no canteiro de obras definem o valor patrimonial de um imóvel décadas após a entrega das chaves',
      categoria: 'Engenharia CHR',
      slug: 'engenharia-invisivel-detalhes',
      metaTitle: 'Engenharia Invisível: Detalhes que Valorizam seu Imóvel',
      metaDescription: 'Entenda como as decisões construtivas que você não vê definem o valor do seu imóvel ao longo dos anos. Análise técnica da CHR Engenharia.',
      tags: 'engenharia construtiva, valor patrimonial, qualidade construtiva, BH, alto padrão',
      palavrasChave: 'engenharia construtiva, valor patrimonial, qualidade de obra',
      tempoLeitura: '12 min',
      resumoCard: 'As decisões técnicas tomadas no canteiro de obras definem o valor patrimonial de um imóvel décadas após a entrega. Um mergulho nos processos que separam o comum do excepcional.',
      chamadaSocial: 'O que separa um imóvel que valoriza de um que apenas envelhece? A resposta está nos detalhes que ninguém vê. Nova análise da CHR Engenharia.',
      artigo: `# A engenharia invisível: os detalhes construtivos que o cliente não vê, mas sente ao longo dos anos

*Por que as decisões técnicas tomadas no canteiro de obras definem o valor patrimonial de um imóvel décadas após a entrega das chaves*

---

Existe uma diferença fundamental entre um edifício que envelhece e um que amadurece. Essa diferença não está no acabamento que se vê — está na engenharia que se sente. Nos primeiros anos, qualquer empreendimento novo impressiona. Mas é após a primeira década que a verdade construtiva se revela: infiltrações que nunca aparecem, fachadas que mantêm a integridade, estruturas que permanecem em silêncio absoluto enquanto a cidade pulsa ao redor.

Em Belo Horizonte, onde o mercado imobiliário de alto padrão movimenta bilhões anualmente, essa distinção é cada vez mais determinante para investidores e compradores exigentes. Segundo dados do Secovi-MG, imóveis com histórico comprovado de baixa manutenção estrutural registram prêmio de valorização entre 15% e 25% superior à média da região — um diferencial que não nasce no showroom, mas no canteiro de obras.

## O que se decide antes do primeiro tijolo

Antes de qualquer elemento visível tomar forma, as decisões mais importantes de um empreendimento já foram tomadas. A escolha do tipo de fundação — se estaca hélice contínua, tubulão ou radier — determina como o edifício se comportará diante das particularidades geológicas de cada terreno. Em regiões como Funcionários, Lourdes e Sion, onde o subsolo apresenta variações significativas de composição, essa decisão é ainda mais crítica.

> A qualidade de uma fundação não se mede pelo que ela sustenta hoje, mas pelo que ela impede amanhã.

**[INSIGHT]** A impermeabilização de subsolos é frequentemente subestimada. Em empreendimentos de alto padrão, sistemas como mantas asfálticas de dupla camada com proteção mecânica, associadas a tratamento cristalizante do concreto, criam uma barreira que pode durar mais de 40 anos sem intervenção. O custo adicional? Menos de 2% do valor total da obra. O benefício? Décadas sem infiltrações, sem laudos emergenciais, sem desvalorização.

## A estrutura que fala em silêncio

Um edifício bem projetado estruturalmente é, paradoxalmente, aquele que não se faz notar. Não há trincas nas paredes, não há ruídos de dilatação, não há fissuras nos encontros de alvenaria com estrutura. Essa "invisibilidade" é resultado de cálculos rigorosos e execução disciplinada.

O concreto armado de alta resistência — utilizado em empreendimentos premium como os da zona sul de BH — oferece benefícios que vão além da capacidade de carga. Segundo análises do setor, o fck (resistência característica do concreto) acima de 35 MPa, comum em obras de alto padrão, proporciona menor porosidade, maior resistência a agentes agressivos e vida útil projetada superior a 75 anos, conforme parâmetros da ABNT NBR 6118.

### Juntas de dilatação e detalhes imperceptíveis

Um dos detalhes mais sutis — e mais importantes — da engenharia estrutural são as juntas de dilatação. Todo edifício se movimenta: pela variação térmica, pela ação do vento, pelo recalque natural do solo. As juntas permitem que essa movimentação aconteça de forma controlada, sem que o morador perceba absolutamente nada.

Em empreendimentos mal executados, a ausência ou o dimensionamento inadequado dessas juntas resulta em trincas visíveis, portas que travam e janelas que não fecham corretamente — sintomas que se manifestam anos após a entrega e que depreciam significativamente o valor do imóvel.

## Instalações: a infraestrutura que define o conforto cotidiano

Se a estrutura é o esqueleto do edifício, as instalações são seu sistema nervoso. Hidráulica, elétrica, gás, climatização — cada sistema exige projeto dedicado, materiais de primeira linha e execução criteriosa.

### Tubulações e prevenção

A escolha entre tubulações de PVC convencional e sistemas como PPR (polipropileno) ou PEX (polietileno reticulado) para água quente, por exemplo, impacta diretamente a durabilidade e a segurança do sistema hidráulico. Enquanto o PVC convencional tem vida útil estimada em 25 anos para determinadas aplicações, o PPR ultrapassa 50 anos com manutenção mínima.

**[INSIGHT]** Em empreendimentos onde o shaft (espaço técnico vertical) é dimensionado com folga de 30% além do necessário, futuras manutenções ou upgrades tecnológicos podem ser realizados sem necessidade de quebrar paredes — um detalhe que, isoladamente, pode evitar custos de dezenas de milhares de reais ao longo da vida do edifício.

### Instalações elétricas e automação

A infraestrutura elétrica de um empreendimento premium vai muito além de pontos de tomada bem posicionados. Inclui cabeamento estruturado para dados, dutos preparados para fibra óptica, circuitos independentes por ambiente e quadros de distribuição com capacidade para expansão futura.

> Um empreendimento que não prevê a infraestrutura do amanhã já nasce defasado.

## Acústica: o luxo do silêncio

Em bairros valorizados como Savassi, Serra e Santo Agostinho, onde a vida urbana é intensa, o isolamento acústico é um dos atributos mais valorizados — e mais difíceis de corrigir após a construção. Paredes com tratamento acústico, lajes com manta resiliente, esquadrias com vidro duplo e câmara de ar: são investimentos que transformam a experiência de moradia.

Segundo dados de pesquisas do setor imobiliário, compradores de imóveis acima de R$ 1,5 milhão em Belo Horizonte citam o conforto acústico como o terceiro critério mais importante na decisão de compra, atrás apenas da localização e da planta do apartamento. É um atributo que não aparece em render, mas que define a percepção de qualidade no dia a dia.

## Visão CHR: a engenharia como patrimônio

Na CHR Engenharia, a convicção é de que engenharia de qualidade é, antes de tudo, um compromisso silencioso. Cada empreendimento é tratado como uma peça que precisa funcionar perfeitamente por gerações — não apenas impressionar na entrega.

Isso se traduz em escolhas concretas: controle tecnológico rigoroso do concreto com rastreabilidade de cada caminhão, impermeabilização executada com supervisão direta de engenheiros especialistas, instalações projetadas com redundância e folga para evolução tecnológica, e um programa de qualidade que acompanha cada etapa da obra com checkpoints documentados.

Para a CHR, a excelência construtiva não é um diferencial de marketing — é uma premissa de projeto. É o que permite que cada empreendimento mantenha seu valor, seu conforto e sua integridade ao longo do tempo, mesmo quando o mercado muda e as tendências se renovam.

---

*Para quem busca unir localização, engenharia e visão patrimonial de longo prazo, a CHR desenvolve empreendimentos pensados para atravessar o tempo com valor, qualidade e propósito.*`,
      sugestaoImagens: '[]',
      pautasAlternativas: '',
    },
    {
      data: '05/05/2026 09:00',
      status: 'Publicado',
      titulo: 'Funcionários, Sion, Lourdes: o que os dados revelam sobre a nova geografia de valor em BH',
      subtitulo: 'Uma análise dos indicadores que sustentam a valorização consistente dos bairros mais disputados da zona sul de Belo Horizonte',
      categoria: 'Investimento',
      slug: 'valorizacao-bairros-bh-2026',
      metaTitle: 'Valorização Imobiliária BH: Funcionários, Sion e Lourdes',
      metaDescription: 'Análise dos bairros que mais valorizam em BH em 2026. Dados do Secovi-MG e FipeZap sobre Funcionários, Sion, Lourdes e Santo Agostinho.',
      tags: 'valorização imobiliária, BH, Funcionários, Sion, Lourdes, investimento',
      palavrasChave: 'valorização imobiliária BH, bairros que valorizam, investimento imobiliário BH',
      tempoLeitura: '14 min',
      resumoCard: 'Os dados por trás dos bairros mais disputados de BH: por que Funcionários, Sion e Lourdes continuam no topo da valorização — e o que isso significa para quem investe.',
      chamadaSocial: 'Quais bairros de BH lideram a valorização em 2026? Analisamos os dados que o mercado observa com atenção. Nova análise editorial da CHR.',
      artigo: `# Funcionários, Sion, Lourdes: o que os dados revelam sobre a nova geografia de valor em BH

*Uma análise dos indicadores que sustentam a valorização consistente dos bairros mais disputados da zona sul de Belo Horizonte*

---

Há décadas, o mercado imobiliário de Belo Horizonte gravita em torno de um conjunto seleto de bairros na zona sul da capital. Mas o que antes era uma preferência quase intuitiva — baseada em tradição familiar, proximidade de referências culturais ou simplesmente prestígio social — hoje se sustenta em dados cada vez mais robustos. E esses dados contam uma história que interessa tanto a quem busca moradia quanto a quem pensa em patrimônio.

Segundo o Índice FipeZap, o preço médio do metro quadrado em Belo Horizonte encerrou o primeiro trimestre de 2026 em torno de R$ 8.900. Nos bairros Funcionários, Sion e Lourdes, esse valor ultrapassa consistentemente R$ 13.000 — em alguns empreendimentos novos, chega a R$ 18.000. Mas a métrica mais reveladora não é o preço absoluto: é a consistência da valorização ao longo do tempo.

## O efeito composto da localização

Diferentemente de bairros que experimentam ciclos de alta e correção, os bairros consolidados da zona sul apresentam um padrão de valorização que economistas chamam de "crescimento composto sustentado". Dados históricos do Secovi-MG indicam que imóveis em Funcionários acumularam valorização nominal superior a 180% nos últimos 15 anos — um desempenho que supera amplamente a inflação e se aproxima, em termos reais, dos melhores fundos imobiliários do período.

> A verdadeira valorização imobiliária não se mede em meses — mede-se em ciclos. E bairros como Funcionários demonstram resiliência mesmo nos ciclos mais adversos.

Essa resiliência tem explicação técnica. Bairros consolidados oferecem o que o mercado chama de "tríade de sustentação": infraestrutura urbana completa (transporte, saúde, educação, comércio), escassez de terrenos para novos lançamentos e demanda constante por parte de um público com alta capacidade de compra.

**[INSIGHT]** A escassez de terrenos é possivelmente o fator mais subestimado. Em Funcionários, segundo levantamentos do setor, restam poucos terrenos com viabilidade para empreendimentos de grande porte. Essa limitação física da oferta cria uma dinâmica de mercado onde a demanda reprimida pressiona os preços de forma estrutural — não especulativa.

## Sion: a consolidação silenciosa

Se Funcionários carrega o peso da tradição e Lourdes ostenta a vocação comercial-residencial premium, o Sion emerge como o bairro que mais se transformou nos últimos anos. Com um perfil originalmente mais residencial e discreto, o bairro vem recebendo empreendimentos de alto padrão que redefiniram seu posicionamento no mapa imobiliário da cidade.

O Sion combina três atributos que investidores experientes reconhecem como indicadores de valorização futura:

- **Conectividade estratégica**: acesso rápido tanto ao hipercentro quanto à BR-356 e ao Belvedere
- **Perfil residencial preservado**: diferentemente de bairros com excesso de comércio, o Sion mantém a tranquilidade
- **Renovação do estoque**: os novos empreendimentos estão substituindo construções antigas, elevando o padrão geral da região

### O papel da infraestrutura

A proximidade com o BH Shopping, o Hospital Mater Dei e corredores viários importantes como a Avenida Nossa Senhora do Carmo confere ao Sion uma autossuficiência urbana que poucos bairros conseguem replicar. Para famílias com crianças, a oferta de escolas de referência no entorno imediato — incluindo instituições tradicionais da capital — é um diferencial que impacta diretamente a liquidez dos imóveis.

## Lourdes e Santo Agostinho: dois lados da mesma moeda

Lourdes sempre foi sinônimo de sofisticação em BH. É o bairro onde a Savassi encontra a tradição residencial, onde restaurantes premiados convivem com edifícios históricos e onde o metro quadrado reflete um estilo de vida mais do que uma metragem.

> Em Lourdes, não se compra metros quadrados — compra-se uma forma de viver a cidade.

Santo Agostinho, seu vizinho menos celebrado, apresenta uma dinâmica diferente e igualmente interessante. Com preços do metro quadrado ainda ligeiramente abaixo de Funcionários e Lourdes, o bairro tem atraído empreendimentos que combinam localização privilegiada com plantas mais generosas — uma equação rara no mercado de alto padrão.

**[INSIGHT]** O diferencial de preço entre Santo Agostinho e seus vizinhos mais valorizados tem diminuído consistentemente nos últimos anos, segundo análises do setor. Para investidores, essa convergência representa uma janela de oportunidade que tende a se fechar à medida que novos empreendimentos premium consolidam o reposicionamento do bairro.

## O que sustenta a valorização: fundamentos vs. especulação

É fundamental distinguir valorização sustentável de especulação. Os bairros mencionados se valorizam por razões estruturais — não por bolhas de demanda artificialmente inflada. Entre os fundamentos:

1. **Demanda real e qualificada**: o público comprador nesses bairros é majoritariamente de renda alta, menos sensível a ciclos econômicos
2. **Oferta fisicamente limitada**: não há como "criar" novos terrenos em bairros consolidados
3. **Infraestrutura madura**: hospitais, escolas, transporte e comércio já estão estabelecidos
4. **Liquidez comprovada**: imóveis bem localizados e bem construídos têm giro mais rápido de revenda

Segundo análises do setor imobiliário mineiro, o tempo médio de venda de imóveis usados em Funcionários é significativamente inferior à média da cidade — evidência concreta de liquidez diferenciada.

## Serra e Savassi: a dinâmica dos bairros complementares

Embora não figurem nas mesmas faixas de preço de Funcionários ou Lourdes, os bairros Serra e Savassi desempenham papel importante na ecologia imobiliária da zona sul. A Serra, com sua vocação boêmia e cultural, atrai um perfil jovem-adulto de alta renda que eventualmente migra para Funcionários ou Sion. A Savassi, polo gastronômico e comercial, sustenta o valor de toda a região ao funcionar como centro de convivência e serviços.

Essa interdependência entre bairros é um dos fatores que explica a robustez da valorização na zona sul como um todo: não se trata de bairros isolados competindo entre si, mas de um ecossistema urbano integrado onde cada região cumpre uma função complementar.

## Visão CHR: construir onde o tempo confirma o valor

A CHR Engenharia concentra sua atuação nesses bairros por uma razão precisa: são localizações onde a qualidade construtiva é mais valorizada e onde o patrimônio tende a se apreciar de forma consistente ao longo do tempo.

Para a CHR, escolher o terreno é o primeiro ato de engenharia. Não se trata apenas de viabilidade técnica, mas de leitura urbana — entender como o bairro se desenvolve, quais vetores de crescimento o favorecem e como o empreendimento se integrará ao tecido da cidade por décadas.

Essa abordagem se reflete em cada decisão: da escolha do terreno ao projeto arquitetônico, da especificação de materiais ao cuidado com a vizinhança durante a obra. É uma visão que entende o imóvel não como produto de consumo, mas como ativo patrimonial que atravessa gerações.

---

*Para quem busca unir localização privilegiada, arquitetura autoral e visão patrimonial de longo prazo, a CHR desenvolve empreendimentos nos endereços mais valorizados de Belo Horizonte.*`,
      sugestaoImagens: '[]',
      pautasAlternativas: '',
    },
    {
      data: '28/04/2026 09:00',
      status: 'Publicado',
      titulo: 'Obra por administração: o modelo construtivo que alinha transparência, qualidade e inteligência financeira',
      subtitulo: 'Como o regime de obra por administração oferece ao comprador controle real sobre custos e especificações — e por que construtoras sérias o adotam',
      categoria: 'Mercado',
      slug: 'obra-por-administracao-modelo',
      metaTitle: 'Obra por Administração: Transparência e Qualidade | CHR',
      metaDescription: 'Entenda o modelo de obra por administração: mais transparência, controle de custos e qualidade superior. Saiba como funciona e por que a CHR adota esse modelo.',
      tags: 'obra por administração, modelo construtivo, transparência, custos, incorporação',
      palavrasChave: 'obra por administração, como funciona, vantagens, modelo construtivo BH',
      tempoLeitura: '11 min',
      resumoCard: 'O modelo de obra por administração oferece transparência total e controle de custos ao comprador. Entenda como funciona e por que construtoras de referência o adotam.',
      chamadaSocial: 'Obra por administração: mais transparência, controle real dos custos e liberdade de escolha. Entenda o modelo que muda a relação entre comprador e construtora.',
      artigo: `# Obra por administração: o modelo construtivo que alinha transparência, qualidade e inteligência financeira

*Como o regime de obra por administração oferece ao comprador controle real sobre custos e especificações — e por que construtoras sérias o adotam*

---

No mercado imobiliário brasileiro, a maioria dos compradores adquire imóveis sob o regime de incorporação a preço fechado — o chamado "preço de tabela". Nesse modelo, o valor do apartamento é definido previamente pela construtora, que assume o risco da variação de custos e embute nesse preço uma margem que cobre eventuais imprevistos, flutuações de material e sua margem de lucro.

Existe, porém, um modelo alternativo que vem ganhando espaço entre compradores de alto padrão em Belo Horizonte: a **obra por administração**. Menos conhecido do grande público, esse regime oferece vantagens significativas para quem busca transparência total, controle efetivo sobre custos e liberdade para especificar cada detalhe do seu imóvel.

## Como funciona na prática

Na obra por administração, a construtora não vende o apartamento a preço fechado. Em vez disso, ela é contratada para **administrar a obra**, recebendo uma taxa de administração — geralmente um percentual sobre o custo total da construção. O custo real da obra é rateado entre os compradores de forma proporcional às suas frações ideais.

Na prática, isso significa que:

- Todos os custos são **abertos e auditáveis** pelos condôminos
- Não existe margem oculta embutida no preço
- O comprador paga **exatamente o que a obra custou**, mais a taxa de administração
- Há assembleias periódicas onde os compradores acompanham prestações de contas

> Na obra por administração, o comprador não é apenas consumidor — é participante ativo de um processo construtivo transparente.

## A matemática da transparência

Para entender a vantagem financeira, considere um exemplo simplificado. Em uma incorporação tradicional, se o custo real de construção de um apartamento é R$ 800 mil, a construtora pode vendê-lo por R$ 1,1 milhão — embutindo 37% de margem que cobre riscos, marketing, comercialização e lucro. O comprador paga R$ 1,1 milhão sem saber exatamente quanto foi custo e quanto foi margem.

Na obra por administração, o mesmo apartamento custaria ao comprador os R$ 800 mil de custo real, mais a taxa de administração — tipicamente entre 12% e 18% do custo total. No exemplo, o custo final ficaria entre R$ 896 mil e R$ 944 mil. A economia potencial é significativa.

**[INSIGHT]** É importante ressaltar que essa comparação é simplificada. Na obra por administração, os custos podem variar durante a execução. Porém, a experiência do mercado mineiro mostra que, em obras bem administradas, o custo final tende a ser competitivo — especialmente quando o comprador tem representação ativa nas assembleias e acompanhamento profissional.

## Qualidade sem restrições

Talvez a vantagem mais subestimada da obra por administração seja a liberdade de especificação. Em uma incorporação a preço fechado, a construtora naturalmente busca otimizar custos dentro do orçamento previamente definido. Isso não significa necessariamente qualidade inferior, mas significa que há limites claros para o que pode ser especificado.

Na obra por administração, as decisões de especificação são tomadas coletivamente pelos condôminos, com orientação técnica da construtora. Se o grupo decide investir em um sistema de ar-condicionado central mais sofisticado, em esquadrias de alumínio com ruptura térmica ou em um revestimento de fachada premium, o custo adicional é absorvido de forma transparente e proporcional.

### Personalização durante a obra

Outro diferencial significativo é a possibilidade de personalização durante a fase de obra. Enquanto na incorporação tradicional as modificações em planta são limitadas e frequentemente custosas, na obra por administração o comprador pode, dentro dos limites estruturais, fazer ajustes de layout com mais flexibilidade e menor custo — já que a modificação é incorporada ao fluxo natural da obra.

## Os riscos e como mitigá-los

Seria desonesto apresentar a obra por administração apenas sob a ótica das vantagens. O modelo exige do comprador um nível de envolvimento e compreensão que a incorporação tradicional não demanda.

Os principais riscos incluem:

1. **Variação de custos**: como os preços não são fixos, materiais podem encarecer durante a obra
2. **Necessidade de capital**: os pagamentos acompanham o cronograma da obra, exigindo fluxo de caixa do comprador
3. **Dependência da gestão**: a qualidade da administração pela construtora é determinante
4. **Decisões coletivas**: assembleias podem gerar conflitos entre condôminos com expectativas diferentes

Para mitigar esses riscos, a escolha da construtora é absolutamente crítica. Uma administradora experiente:

- Mantém orçamento executivo detalhado e atualizado mensalmente
- Negocia contratos de fornecimento com proteção contra variações abruptas
- Apresenta prestações de contas claras e auditáveis
- Media conflitos entre condôminos com profissionalismo e transparência
- Possui equipe técnica experiente para antecipar e resolver problemas antes que impactem custos

> A obra por administração não é um modelo para qualquer construtora. Exige competência técnica, transparência radical e reputação que sobreviva ao escrutínio constante dos próprios clientes.

## O perfil do comprador

O modelo atrai um perfil específico: compradores informados, que valorizam transparência, que entendem de investimentos e que preferem ter visibilidade total sobre onde cada real é aplicado. Em geral, são profissionais liberais, empresários e investidores que encaram a aquisição imobiliária com a mesma racionalidade que aplicam em seus negócios.

Segundo análises do setor, a obra por administração tem presença mais forte em empreendimentos de médio e alto padrão, onde o ticket médio justifica o envolvimento ativo do comprador e onde a exigência por qualidade de execução é naturalmente mais elevada.

**[INSIGHT]** Um indicador revelador da maturidade desse mercado em BH: construtoras que operam exclusivamente no modelo de administração frequentemente apresentam índices de satisfação pós-entrega superiores à média do setor — reflexo direto da transparência mantida durante todo o processo.

## Visão CHR: transparência como princípio, não como diferencial

A CHR Engenharia adota o modelo de obra por administração por convicção, não por conveniência. Para a empresa, transparência não é uma estratégia comercial — é um princípio que orienta cada decisão, desde a seleção do terreno até a entrega das chaves.

Na prática, isso significa:

- Prestações de contas mensais detalhadas para todos os condôminos
- Assembleias periódicas com presença da diretoria técnica
- Política de portas abertas no canteiro de obras
- Especificações técnicas decididas com participação ativa dos compradores
- Contratos de fornecimento negociados com foco exclusivo na relação custo-qualidade

Para a CHR, a obra por administração é mais do que um modelo de negócios — é uma expressão de respeito pelo comprador e pelo próprio ofício de construir.

---

*Para quem valoriza transparência, controle e qualidade sem compromissos, a CHR Engenharia oferece empreendimentos sob o regime de obra por administração — onde cada decisão é compartilhada e cada centavo é contabilizado.*`,
      sugestaoImagens: '[]',
      pautasAlternativas: '',
    },
  ];
  
  for (const a of artigos) {
    sheet.appendRow([
      a.data, a.status, a.titulo, a.subtitulo, a.categoria, a.slug,
      a.metaTitle, a.metaDescription, a.tags, a.palavrasChave,
      a.tempoLeitura, a.resumoCard, a.chamadaSocial, a.artigo,
      a.sugestaoImagens, a.pautasAlternativas,
    ]);
  }

  Logger.log('✅ 3 artigos premium inseridos com status "Publicado"');
}

/**
 * Insere os 3 artigos restantes que aparecem no site mas ainda não estão na planilha:
 *   - Biofilia, automação e materiais de baixo carbono (Tendências)
 *   - Quando a fachada conta uma história (Arquitetura)
 *   - Imóvel na planta ou pronto (Investimento)
 *
 * Execute UMA VEZ a função inserirArtigosFaltantes() no Apps Script editor.
 * Depois pode deletar esta função.
 */
function inserirArtigosFaltantes() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) throw new Error('Aba "Artigos" não encontrada');

  const artigos = [
    {
      data: '08/05/2026 09:00',
      status: 'Publicado',
      titulo: 'Biofilia, automação e materiais de baixo carbono: as tendências que redefinem o alto padrão em 2026',
      subtitulo: 'Como o mercado imobiliário premium está absorvendo inovações de design, tecnologia e sustentabilidade — e o que isso significa para quem compra',
      categoria: 'Tendências',
      slug: 'tendencias-alto-padrao-2026',
      metaTitle: 'Biofilia, Automação e Sustentabilidade no Alto Padrão',
      metaDescription: 'Como biofilia, automação residencial e materiais de baixo carbono estão redefinindo o alto padrão em 2026. Análise da CHR Engenharia.',
      tags: 'biofilia, automação residencial, sustentabilidade, design, alto padrão',
      palavrasChave: 'biofilia residencial, automação, materiais sustentáveis',
      tempoLeitura: '10 min',
      resumoCard: 'Biofilia, automação residencial e materiais sustentáveis estão redefinindo o que significa morar bem. Um panorama das tendências que já moldam os empreendimentos premium em BH.',
      chamadaSocial: 'Biofilia, automação e materiais de baixo carbono: o que define o alto padrão em 2026. Nova análise CHR sobre as tendências que estão redesenhando a moradia premium.',
      artigo: `# Biofilia, automação e materiais de baixo carbono: as tendências que redefinem o alto padrão em 2026

*Como o mercado imobiliário premium está absorvendo inovações de design, tecnologia e sustentabilidade — e o que isso significa para quem compra*

---

O conceito de alto padrão no mercado imobiliário está passando por uma transformação silenciosa, mas profunda. Se até poucos anos atrás o luxo residencial se definia por metragem generosa, acabamentos importados e endereço nobre, hoje os compradores mais exigentes buscam algo mais: espaços que promovam bem-estar, tecnologia que simplifique o cotidiano e construções que respeitem o meio ambiente sem abrir mão da sofisticação.

Em Belo Horizonte, essa mudança já se reflete nos lançamentos mais recentes da zona sul. Empreendimentos em bairros como Funcionários, Sion e Lourdes começam a incorporar elementos que, há cinco anos, eram exclusividade de projetos experimentais europeus.

## Biofilia: quando a natureza entra no projeto

O design biofílico — a integração intencional de elementos naturais ao ambiente construído — deixou de ser tendência para se tornar expectativa. Estudos publicados no *Journal of Environmental Psychology* demonstram que ambientes com presença de vegetação, luz natural abundante e materiais orgânicos reduzem o cortisol (hormônio do estresse) em até 15% e aumentam a produtividade percebida.

Na prática, isso se traduz em:

- **Jardins verticais** integrados às áreas comuns e, em alguns casos, às varandas privativas
- **Iluminação circadiana**: sistemas que ajustam a temperatura de cor da luz ao longo do dia, simulando o ciclo natural do sol
- **Materiais táteis**: madeiras de reflorestamento, pedras naturais e revestimentos cerâmicos com texturas orgânicas

> A biofilia não é decoração — é neurociência aplicada à arquitetura. Espaços que reconectam o morador à natureza geram benefícios mensuráveis em saúde e qualidade de vida.

**[INSIGHT]** Segundo levantamentos do setor, imóveis com projetos biofílicos certificados apresentam prêmio de valorização entre 8% e 12% em relação a empreendimentos convencionais de mesmo padrão construtivo.

## Automação: o luxo do invisível

A automação residencial evoluiu rapidamente de gadget tecnológico para infraestrutura essencial. Em empreendimentos de alto padrão, a questão não é mais se o apartamento terá automação, mas qual o nível de integração oferecido.

Os sistemas mais avançados disponíveis no mercado brasileiro permitem:

- **Controle centralizado** de iluminação, climatização, cortinas e áudio por voz ou aplicativo
- **Cenários automatizados**: um único comando ajusta luzes, temperatura e persianas para o contexto desejado (cinema, jantar, despertar)
- **Segurança integrada**: câmeras, sensores de presença e fechaduras biométricas conectados a uma central inteligente
- **Gestão energética**: monitoramento em tempo real do consumo, com otimização automática

### A infraestrutura importa mais que os dispositivos

Um erro comum em empreendimentos que se dizem "inteligentes" é oferecer dispositivos de automação sem a infraestrutura adequada. Cabeamento estruturado Cat6A, eletrodutos com folga, pontos de rede em todos os ambientes e central de automação dedicada são investimentos que custam menos de 3% do valor da obra, mas viabilizam qualquer evolução tecnológica futura.

## Materiais de baixo carbono: sustentabilidade como sofisticação

A construção civil é responsável por cerca de 37% das emissões globais de CO₂, segundo a ONU. Construtoras de referência estão respondendo com a adoção de materiais que reduzem significativamente a pegada de carbono sem comprometer a qualidade ou a estética.

Entre as inovações já disponíveis no mercado brasileiro:

- **Concreto de alto desempenho com adições pozolânicas**: reduz em até 30% o consumo de cimento Portland
- **Esquadrias de alumínio reciclado** com ruptura térmica: melhor isolamento com menor impacto ambiental
- **Revestimentos cerâmicos nacionais** com certificação ambiental: qualidade comparável a importados, com rastreabilidade completa

> Sustentabilidade no alto padrão não é marketing — é responsabilidade técnica e diferencial competitivo de longo prazo.

## Visão CHR: inovar com propósito

A CHR Engenharia acompanha essas tendências com uma premissa clara: incorporar inovações que agreguem valor real ao morador, não modismos passageiros. Cada tecnologia ou material é avaliado sob critérios rigorosos de durabilidade, manutenibilidade e retorno ao longo da vida útil do empreendimento.

---

*Para quem busca empreendimentos que unem inovação, conforto e responsabilidade construtiva, a CHR desenvolve projetos pensados para o presente e preparados para o futuro.*`,
      sugestaoImagens: '[]',
      pautasAlternativas: '',
    },
    {
      data: '22/04/2026 09:00',
      status: 'Publicado',
      titulo: 'Quando a fachada conta uma história: o valor da arquitetura autoral no mercado imobiliário',
      subtitulo: 'Por que edifícios com identidade arquitetônica própria se valorizam mais e envelhecem melhor do que construções genéricas',
      categoria: 'Arquitetura',
      slug: 'arquitetura-autoral-valor-patrimonial',
      metaTitle: 'Arquitetura Autoral: o que faz um edifício se valorizar',
      metaDescription: 'Edifícios com identidade arquitetônica própria se valorizam mais e envelhecem melhor. Uma análise do impacto da arquitetura autoral em BH.',
      tags: 'arquitetura autoral, fachada, valorização, design, patrimônio',
      palavrasChave: 'arquitetura autoral, fachada, valor imobiliário',
      tempoLeitura: '11 min',
      resumoCard: 'Edifícios com identidade própria se valorizam mais e envelhecem melhor. Uma análise do impacto da arquitetura autoral no mercado premium de Belo Horizonte.',
      chamadaSocial: 'Por que alguns edifícios atravessam décadas como referência e outros viram apenas mais um na paisagem? A diferença está na arquitetura autoral. Nova análise CHR.',
      artigo: `# Quando a fachada conta uma história: o valor da arquitetura autoral no mercado imobiliário

*Por que edifícios com identidade arquitetônica própria se valorizam mais e envelhecem melhor do que construções genéricas*

---

Caminhe por qualquer bairro nobre de Belo Horizonte e você notará dois tipos de edifícios: aqueles que se confundem com o entorno — fachadas genéricas, volumes repetitivos, materiais padronizados — e aqueles que, mesmo décadas após a construção, continuam chamando a atenção pela singularidade do projeto.

Essa diferença não é apenas estética. Ela tem impacto direto e mensurável no valor patrimonial do imóvel.

## O que define uma arquitetura autoral

Arquitetura autoral não é sinônimo de extravagância ou experimentalismo visual. É, antes de tudo, a presença de uma intenção clara de projeto — uma ideia que organiza volumetria, materiais, aberturas e relação com o entorno de forma coerente e original.

Um edifício autoral se reconhece por:

- **Identidade visual própria**: não é uma cópia de tendências genéricas
- **Diálogo com o contexto**: respeita o entorno sem se submeter a ele
- **Materialidade pensada**: cada revestimento, cada recuo, cada proporção tem justificativa projetual
- **Intemporalidade**: envelhece com dignidade, sem parecer datado

> A arquitetura autoral é aquela que, daqui a 30 anos, continuará sendo admirada — não como relíquia, mas como referência.

## O impacto no valor: dados e evidências

Segundo análises do setor imobiliário de Belo Horizonte, edifícios com projetos arquitetônicos assinados por escritórios de referência apresentam valorização consistentemente superior à média da região.

O fenômeno se explica por uma combinação de fatores:

1. **Escassez**: projetos autorais são, por definição, únicos — o que limita a oferta
2. **Desejabilidade**: compradores de alto padrão pagam prêmio por exclusividade
3. **Resiliência estética**: edifícios bem projetados não sofrem o envelhecimento visual que deprecia construções genéricas
4. **Liquidez**: imóveis em edifícios icônicos tendem a ter giro de revenda mais rápido

**[INSIGHT]** Em Funcionários e Lourdes, edifícios com projetos arquitetônicos premiados ou publicados em revistas especializadas registram tempo médio de revenda significativamente inferior à média do bairro — um indicador direto de liquidez premium.

## A fachada como cartão de visitas permanente

A fachada é o elemento mais visível e duradouro de um edifício. Enquanto interiores podem ser reformados e atualizados, a fachada permanece essencialmente a mesma ao longo de toda a vida útil da construção.

Isso significa que decisões de fachada — materiais, cores, proporções, texturas — são decisões de patrimônio de longo prazo.

### Materiais que envelhecem bem

Alguns materiais de fachada ganham caráter com o tempo: o concreto aparente desenvolve uma pátina natural, a pedra natural mantém sua textura, o aço corten adquire sua coloração característica. Outros — como certas pinturas texturizadas ou revestimentos plásticos — perdem o apelo visual em poucos anos.

A escolha entre um e outro é, frequentemente, a diferença entre um edifício que se valoriza e um que se deprecia visualmente.

## O papel do arquiteto no empreendimento premium

Em mercados maduros, o nome do arquiteto agrega valor tangível ao imóvel — assim como a assinatura de um designer agrega valor a um móvel. No Brasil, esse fenômeno está em crescimento, especialmente no segmento de alto padrão.

Para que a arquitetura autoral funcione como diferencial real, porém, é necessário que a construtora dê ao arquiteto a liberdade e o suporte necessários para executar o projeto conforme concebido.

> Não basta contratar um bom arquiteto — é preciso ter a coragem e a competência técnica para construir o que ele projetou.

## Visão CHR: construir identidade

A CHR Engenharia entende que cada empreendimento é uma peça urbana que contribui para a paisagem da cidade. Por isso, investe em projetos que combinam personalidade arquitetônica com excelência construtiva — edifícios que não apenas cumprem função, mas contam uma história.

---

*Para quem busca imóveis com identidade própria e valor patrimonial de longo prazo, a CHR desenvolve empreendimentos onde a arquitetura é protagonista — não cenário.*`,
      sugestaoImagens: '[]',
      pautasAlternativas: '',
    },
    {
      data: '15/04/2026 09:00',
      status: 'Publicado',
      titulo: 'Imóvel na planta ou pronto? A análise que todo investidor deveria fazer antes de decidir',
      subtitulo: 'Uma comparação técnica entre comprar na planta e comprar pronto — com dados, riscos e estratégias para cada perfil de comprador',
      categoria: 'Investimento',
      slug: 'imovel-planta-ou-pronto',
      metaTitle: 'Imóvel na Planta ou Pronto? Como Decidir com Inteligência',
      metaDescription: 'Comprar na planta ou pronto? Análise técnica com dados de valorização, riscos e estratégias para cada perfil de investidor imobiliário em BH.',
      tags: 'investimento imobiliário, imóvel na planta, imóvel pronto, valorização, BH',
      palavrasChave: 'imóvel na planta, imóvel pronto, investimento',
      tempoLeitura: '13 min',
      resumoCard: 'Comprar na planta ou pronto? Uma análise com dados reais sobre valorização, riscos e estratégias para cada perfil de investidor imobiliário em BH.',
      chamadaSocial: 'Imóvel na planta ou pronto: a decisão que mais impacta seu investimento imobiliário. Nova análise CHR com dados, riscos e estratégias para cada perfil.',
      artigo: `# Imóvel na planta ou pronto? A análise que todo investidor deveria fazer antes de decidir

*Uma comparação técnica entre comprar na planta e comprar pronto — com dados, riscos e estratégias para cada perfil de comprador*

---

É uma das perguntas mais recorrentes no mercado imobiliário: vale mais a pena comprar um imóvel na planta ou um já pronto para morar? A resposta, como em qualquer decisão financeira relevante, é: depende. Mas "depende" não significa que a análise seja impossível — significa que ela precisa considerar variáveis que muitos compradores ignoram.

## A matemática da compra na planta

O principal atrativo da compra na planta é financeiro: o imóvel é adquirido em um estágio anterior do ciclo de valorização, teoricamente a preço inferior ao valor de mercado na entrega.

Na prática, a equação funciona assim:

- **Preço de lançamento**: geralmente 15% a 30% abaixo do valor estimado para entrega
- **Condições de pagamento**: entrada parcelada durante a obra (24 a 36 meses) + financiamento na entrega
- **Correção pelo INCC**: o saldo devedor é corrigido mensalmente pelo Índice Nacional de Custo da Construção

**[INSIGHT]** O INCC é frequentemente subestimado por compradores de primeira viagem. Nos últimos 5 anos, o índice acumulou variação significativa — o que pode reduzir substancialmente o "desconto" percebido na compra em planta se o comprador não dimensionar corretamente o impacto da correção sobre o saldo.

> Comprar na planta não é automaticamente mais barato — é mais barato quando a valorização do imóvel supera a correção do saldo devedor e o custo de oportunidade do capital.

## As vantagens reais da compra na planta

Dito isso, para compradores que fazem a análise corretamente, a planta oferece vantagens genuínas:

1. **Personalização**: em muitos empreendimentos, é possível escolher acabamentos, alterar pontos elétricos e até modificar a planta dentro de parâmetros estruturais
2. **Parcelamento da entrada**: ao invés de desembolsar 20-30% de uma só vez, o valor é diluído ao longo da construção
3. **Potencial de valorização**: se o empreendimento está em uma boa localização e é executado por uma construtora confiável, a valorização entre lançamento e entrega pode ser expressiva
4. **Imóvel novo**: sem desgaste, sem reformas necessárias, com garantia construtiva de 5 anos

## As vantagens do imóvel pronto

O imóvel pronto, por sua vez, oferece certezas que a planta não pode garantir:

- **Ver antes de comprar**: não há surpresas — o comprador visita o imóvel exato que vai adquirir
- **Ocupação imediata**: sem espera de 2-3 anos pela construção
- **Sem risco de atraso**: um dos maiores riscos da compra na planta é eliminado
- **Negociação direta**: proprietários motivados podem oferecer descontos significativos

### O fator psicológico

Existe um componente emocional que a análise puramente financeira não captura: a ansiedade da espera. Três anos entre a compra e a entrega é um período longo, durante o qual o comprador acompanha notícias do mercado, variações de índices e eventuais percalços da obra.

## Análise de risco: o que pode dar errado

### Na planta
- Atraso na entrega (gera custos com aluguel e correção adicional do saldo)
- Diferenças entre o material de divulgação e a entrega real
- Risco construtivo: em casos extremos, problemas financeiros da construtora
- Valorização abaixo do esperado em mercados retraídos

### No pronto
- Vícios ocultos em imóveis usados (infiltrações, problemas elétricos)
- Custo de reforma/atualização em imóveis mais antigos
- Menor potencial de valorização a curto prazo (já precificado pelo mercado)

## Como avaliar a construtora

Para quem opta pela compra na planta, a escolha da construtora é possivelmente a decisão mais importante do processo. Indicadores a observar:

1. **Histórico de entregas**: pontualidade, qualidade relatada pelos compradores anteriores
2. **Saúde financeira**: incorporadoras listadas em bolsa divulgam balanços; para as demais, patrimônio de afetação oferece proteção
3. **Transparência**: construtoras que operam por administração oferecem visibilidade total dos custos
4. **Pós-entrega**: como a empresa lida com assistência técnica e garantias

> A melhor forma de prever como será o seu empreendimento é observar como a construtora entregou os anteriores.

## Visão CHR: transparência em qualquer formato

A CHR Engenharia oferece empreendimentos sob o regime de obra por administração, o que significa que o comprador da planta tem uma vantagem adicional: acompanhamento completo dos custos e decisões ao longo de toda a obra. Esse modelo elimina o principal risco da compra na planta — a opacidade — e transforma a espera em participação ativa.

---

*Para quem busca segurança, transparência e participação real no processo construtivo, a CHR Engenharia oferece uma forma diferente de comprar na planta — onde cada centavo é contabilizado e cada decisão é compartilhada.*`,
      sugestaoImagens: '[]',
      pautasAlternativas: '',
    },
  ];

  for (const a of artigos) {
    sheet.appendRow([
      a.data, a.status, a.titulo, a.subtitulo, a.categoria, a.slug,
      a.metaTitle, a.metaDescription, a.tags, a.palavrasChave,
      a.tempoLeitura, a.resumoCard, a.chamadaSocial, a.artigo,
      a.sugestaoImagens, a.pautasAlternativas,
    ]);
  }

  Logger.log('✅ 3 artigos faltantes inseridos com status "Publicado"');
}
