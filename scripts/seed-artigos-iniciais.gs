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
