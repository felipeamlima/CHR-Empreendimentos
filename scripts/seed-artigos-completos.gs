/**
 * Função para popular/atualizar a planilha com TODOS os artigos do blog.
 * Execute UMA VEZ — depois o script semanal adiciona novos automaticamente.
 * 
 * IMPORTANTE: A coluna "Status" controla a visibilidade no site:
 *   - "Publicado" → aparece no site
 *   - "Rascunho"  → não aparece (artigo em revisão)
 *   - "Desativado" → não aparece (artigo arquivado)
 */
function popularPlanilhaCompleta() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  }
  
  // Limpar e criar headers
  sheet.clear();
  const headers = [
    'Data', 'Status', 'Título', 'Subtítulo', 'Categoria', 'Slug',
    'Meta Title', 'Meta Description', 'Tags', 'Palavras-chave',
    'Tempo de Leitura', 'Resumo Card', 'Chamada Social',
    'Artigo Completo', 'Sugestão Imagens', 'Autor'
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Formatar headers
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#1a1a2e');
  headerRange.setFontColor('#ffffff');
  sheet.setFrozenRows(1);
  
  // Artigos
  const artigos = [
    {
      data: '05/05/2026 09:00',
      status: 'Publicado',
      titulo: 'Funcionários, Sion, Lourdes: o que os dados revelam sobre a nova geografia de valor em BH',
      subtitulo: 'Uma análise dos indicadores que sustentam a valorização consistente dos bairros mais disputados da zona sul de Belo Horizonte',
      categoria: 'Investimento',
      slug: 'valorizacao-bairros-bh-2026',
      metaTitle: 'Valorização Imobiliária em BH: Funcionários, Sion e Lourdes em 2026',
      metaDescription: 'Análise completa da valorização imobiliária nos bairros Funcionários, Sion e Lourdes em BH. Dados do mercado e perspectivas de investimento.',
      tags: 'valorização imobiliária, BH, Funcionários, Sion, Lourdes, investimento',
      palavrasChave: 'valorização bairros BH, investimento imobiliário Belo Horizonte',
      tempoLeitura: '14 min',
      resumoCard: 'Os dados por trás dos bairros mais disputados de BH: por que Funcionários, Sion e Lourdes continuam no topo da valorização — e o que isso significa para quem investe.',
      chamadaSocial: '📊 Os números não mentem: Funcionários, Sion e Lourdes seguem no topo da valorização em BH. Nova análise CHR.',
      autor: 'CHR Editorial'
    },
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
      palavrasChave: 'engenharia construtiva alto padrão, qualidade construção BH',
      tempoLeitura: '12 min',
      resumoCard: 'As decisões técnicas tomadas no canteiro de obras definem o valor patrimonial de um imóvel décadas após a entrega. Um mergulho nos processos que separam o comum do excepcional.',
      chamadaSocial: '🏗️ O que separa um edifício que envelhece de um que amadurece? A resposta está na engenharia invisível.',
      autor: 'CHR Editorial'
    },
    {
      data: '28/04/2026 09:00',
      status: 'Publicado',
      titulo: 'Obra por administração: o modelo que alinha transparência, qualidade e inteligência financeira',
      subtitulo: 'Como o regime de obra por administração oferece ao comprador controle real sobre custos e especificações',
      categoria: 'Mercado',
      slug: 'obra-por-administracao-modelo',
      metaTitle: 'Obra por Administração: Transparência e Qualidade na Construção',
      metaDescription: 'Entenda como o modelo de obra por administração oferece transparência total e controle de custos ao comprador. Análise CHR Engenharia.',
      tags: 'obra por administração, modelo construtivo, transparência, custos',
      palavrasChave: 'obra por administração, modelo construtivo transparente BH',
      tempoLeitura: '11 min',
      resumoCard: 'O modelo de obra por administração oferece transparência total e controle de custos ao comprador. Entenda como funciona e por que construtoras de referência o adotam.',
      chamadaSocial: '💡 Transparência total na construção: entenda o modelo de obra por administração e por que ele muda o jogo.',
      autor: 'CHR Editorial'
    },
    {
      data: '08/05/2026 09:00',
      status: 'Publicado',
      titulo: 'Biofilia, automação e materiais de baixo carbono: as tendências que redefinem o alto padrão em 2026',
      subtitulo: 'Como o mercado imobiliário premium está absorvendo inovações de design, tecnologia e sustentabilidade',
      categoria: 'Tendências',
      slug: 'tendencias-alto-padrao-2026',
      metaTitle: 'Tendências Alto Padrão 2026: Biofilia, Automação e Sustentabilidade',
      metaDescription: 'Biofilia, automação residencial e materiais sustentáveis redefinem o alto padrão em 2026. Panorama das tendências em BH.',
      tags: 'biofilia, automação residencial, sustentabilidade, design, alto padrão',
      palavrasChave: 'tendências alto padrão 2026, biofilia construção BH',
      tempoLeitura: '10 min',
      resumoCard: 'Biofilia, automação residencial e materiais sustentáveis estão redefinindo o que significa morar bem. Um panorama das tendências premium em BH.',
      chamadaSocial: '🌿 Biofilia, smart home e materiais sustentáveis: o novo alto padrão já chegou a BH.',
      autor: 'CHR Editorial'
    },
    {
      data: '22/04/2026 09:00',
      status: 'Publicado',
      titulo: 'Quando a fachada conta uma história: o valor da arquitetura autoral no mercado imobiliário',
      subtitulo: 'Por que edifícios com identidade arquitetônica própria se valorizam mais e envelhecem melhor',
      categoria: 'Arquitetura',
      slug: 'arquitetura-autoral-valor-patrimonial',
      metaTitle: 'Arquitetura Autoral: O Impacto no Valor do Imóvel Premium',
      metaDescription: 'Edifícios com identidade própria se valorizam mais. Análise do impacto da arquitetura autoral no mercado premium de BH.',
      tags: 'arquitetura autoral, fachada, valorização, design, patrimônio',
      palavrasChave: 'arquitetura autoral valorização, fachada edifícios BH',
      tempoLeitura: '11 min',
      resumoCard: 'Edifícios com identidade própria se valorizam mais e envelhecem melhor. Uma análise do impacto da arquitetura autoral no mercado premium de BH.',
      chamadaSocial: '🏛️ A fachada é o cartão de visitas permanente do seu patrimônio. Entenda o valor da arquitetura autoral.',
      autor: 'CHR Editorial'
    },
    {
      data: '15/04/2026 09:00',
      status: 'Publicado',
      titulo: 'Imóvel na planta ou pronto? A análise que todo investidor deveria fazer antes de decidir',
      subtitulo: 'Uma comparação técnica entre comprar na planta e comprar pronto — com dados, riscos e estratégias',
      categoria: 'Investimento',
      slug: 'imovel-planta-ou-pronto',
      metaTitle: 'Imóvel na Planta ou Pronto: Qual a Melhor Escolha em 2026?',
      metaDescription: 'Comprar na planta ou pronto? Análise com dados reais sobre valorização, riscos e estratégias para cada perfil de investidor em BH.',
      tags: 'investimento imobiliário, imóvel na planta, imóvel pronto, valorização, BH',
      palavrasChave: 'imóvel planta ou pronto BH, investimento imobiliário 2026',
      tempoLeitura: '13 min',
      resumoCard: 'Comprar na planta ou pronto? Uma análise com dados reais sobre valorização, riscos e estratégias para cada perfil de investidor imobiliário em BH.',
      chamadaSocial: '🏠 Planta ou pronto? A matemática real por trás de cada escolha — sem promessas vazias.',
      autor: 'CHR Editorial'
    }
  ];
  
  // Inserir dados
  const rows = artigos.map(a => [
    a.data, a.status, a.titulo, a.subtitulo, a.categoria, a.slug,
    a.metaTitle, a.metaDescription, a.tags, a.palavrasChave,
    a.tempoLeitura, a.resumoCard, a.chamadaSocial,
    '(conteúdo completo disponível no código-fonte)',
    '', a.autor
  ]);
  
  sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  
  // Formatar
  sheet.autoResizeColumns(1, 6);
  sheet.setColumnWidth(3, 300); // Título
  sheet.setColumnWidth(12, 300); // Resumo
  
  // Colorir status
  for (let i = 0; i < rows.length; i++) {
    const statusCell = sheet.getRange(i + 2, 2);
    if (rows[i][1] === 'Publicado') {
      statusCell.setBackground('#d4edda').setFontColor('#155724');
    } else if (rows[i][1] === 'Rascunho') {
      statusCell.setBackground('#fff3cd').setFontColor('#856404');
    } else {
      statusCell.setBackground('#f8d7da').setFontColor('#721c24');
    }
  }
  
  // Validação de dados para coluna Status
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Publicado', 'Rascunho', 'Desativado'], true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(2, 2, 100, 1).setDataValidation(statusRule);
  
  Logger.log(`✅ ${rows.length} artigos inseridos com sucesso!`);
  Logger.log('Para controlar visibilidade: mude a coluna Status para "Publicado", "Rascunho" ou "Desativado"');
}
