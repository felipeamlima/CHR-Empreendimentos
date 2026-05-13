/**
 * Serviço de dados do Blog CHR
 * Busca artigos publicados via Google Apps Script Web App
 */

// URL do Web App do Google Apps Script
// SUBSTITUA pela URL real após implantar o script como Web App
const BLOG_API_URL = 'https://script.google.com/macros/s/AKfycbzqWF1jb-4h6FDtjBXWGruwBhfsucBExgeM2_YbqanZHGfU5XPU_BYNnju7haqvx1KU0Q/exec';

export type BlogArticle = {
  data: string;
  status: string;
  titulo: string;
  subtitulo: string;
  categoria: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  palavrasChave: string;
  tempoLeitura: string;
  resumoCard: string;
  chamadaSocial: string;
  artigoCompleto: string;
  sugestaoImagens: string;
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
  // Campos extras quando vem da API
  subtitle?: string;
  content?: string;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
};

// Imagens de capa por categoria (Unsplash, alta qualidade)
const CATEGORY_IMAGES: Record<string, string> = {
  'Tendências': 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&q=70',
  'Investimento': 'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1100&q=70',
  'Mercado': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1100&q=70',
  'Arquitetura': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=70',
  'Engenharia CHR': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1100&q=70',
};

function getImageForCategory(category: string): string {
  return CATEGORY_IMAGES[category] || CATEGORY_IMAGES['Mercado'];
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    // Handle "dd/MM/yyyy HH:mm" format
    if (dateStr.includes('/')) {
      const [datePart] = dateStr.split(' ');
      const [day, month, year] = datePart.split('/');
      const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      return `${day} ${months[parseInt(month) - 1]} · ${year}`;
    }
    return dateStr;
  } catch {
    return dateStr;
  }
}

function articleToPost(article: BlogArticle, index: number): BlogPost {
  return {
    id: article.slug || `artigo-${index}`,
    title: article.titulo,
    excerpt: article.resumoCard || article.subtitulo || '',
    image: getImageForCategory(article.categoria),
    category: article.categoria || 'Mercado',
    date: formatDate(article.data),
    readTime: article.tempoLeitura || '8 min',
    featured: index === 0,
    subtitle: article.subtitulo,
    content: article.artigoCompleto,
    metaTitle: article.metaTitle,
    metaDescription: article.metaDescription,
    tags: article.tags,
  };
}

// Cache simples para evitar chamadas repetidas
let cachedPosts: BlogPost[] | null = null;
let cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  // Retorna cache se ainda válido
  if (cachedPosts && Date.now() - cacheTime < CACHE_TTL) {
    return cachedPosts;
  }

  try {
    const response = await fetch(BLOG_API_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const data = await response.json();
    const articles: BlogArticle[] = data.artigos || [];
    
    if (articles.length === 0) return getFallbackPosts();
    
    cachedPosts = articles.map((a, i) => articleToPost(a, i));
    cacheTime = Date.now();
    return cachedPosts;
    
  } catch (error) {
    console.warn('Blog API indisponível, usando fallback:', error);
    return getFallbackPosts();
  }
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`${BLOG_API_URL}?action=get&slug=${encodeURIComponent(slug)}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const data = await response.json();
    if (data.artigo) {
      return articleToPost(data.artigo, 0);
    }
    
    // Fallback: buscar na lista
    const posts = await fetchBlogPosts();
    return posts.find(p => p.id === slug) || null;
    
  } catch {
    // Fallback: buscar na lista completa
    const posts = await fetchBlogPosts();
    return posts.find(p => p.id === slug) || null;
  }
}

// Posts de fallback com conteúdo completo (usado quando a API tem CORS em dev ou está indisponível)
function getFallbackPosts(): BlogPost[] {
  return [
    {
      id: 'valorizacao-bairros-bh-2026',
      title: 'Funcionários, Sion, Lourdes: o que os dados revelam sobre a nova geografia de valor em BH',
      subtitle: 'Uma análise dos indicadores que sustentam a valorização consistente dos bairros mais disputados da zona sul de Belo Horizonte',
      excerpt: 'Os dados por trás dos bairros mais disputados de BH: por que Funcionários, Sion e Lourdes continuam no topo da valorização — e o que isso significa para quem investe.',
      image: CATEGORY_IMAGES['Investimento'],
      category: 'Investimento',
      date: '05 Mai · 2026',
      readTime: '14 min',
      featured: true,
      tags: ['valorização imobiliária', 'BH', 'Funcionários', 'Sion', 'Lourdes', 'investimento'],
      content: `# Funcionários, Sion, Lourdes: o que os dados revelam sobre a nova geografia de valor em BH

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

## Visão CHR: construir onde o tempo confirma o valor

A CHR Engenharia concentra sua atuação nesses bairros por uma razão precisa: são localizações onde a qualidade construtiva é mais valorizada e onde o patrimônio tende a se apreciar de forma consistente ao longo do tempo.

Para a CHR, escolher o terreno é o primeiro ato de engenharia. Não se trata apenas de viabilidade técnica, mas de leitura urbana — entender como o bairro se desenvolve, quais vetores de crescimento o favorecem e como o empreendimento se integrará ao tecido da cidade por décadas.

---

*Para quem busca unir localização privilegiada, arquitetura autoral e visão patrimonial de longo prazo, a CHR desenvolve empreendimentos nos endereços mais valorizados de Belo Horizonte.*`,
    },
    {
      id: 'engenharia-invisivel-detalhes',
      title: 'A engenharia invisível: os detalhes construtivos que o cliente não vê, mas sente ao longo dos anos',
      subtitle: 'Por que as decisões técnicas tomadas no canteiro de obras definem o valor patrimonial de um imóvel décadas após a entrega das chaves',
      excerpt: 'As decisões técnicas tomadas no canteiro de obras definem o valor patrimonial de um imóvel décadas após a entrega. Um mergulho nos processos que separam o comum do excepcional.',
      image: CATEGORY_IMAGES['Engenharia CHR'],
      category: 'Engenharia CHR',
      date: '12 Mai · 2026',
      readTime: '12 min',
      tags: ['engenharia construtiva', 'valor patrimonial', 'qualidade construtiva', 'BH', 'alto padrão'],
      content: `# A engenharia invisível: os detalhes construtivos que o cliente não vê, mas sente ao longo dos anos

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

**[INSIGHT]** Em empreendimentos onde o shaft (espaço técnico vertical) é dimensionado com folga de 30% além do necessário, futuras manutenções ou upgrades tecnológicos podem ser realizados sem necessidade de quebrar paredes — um detalhe que, isoladamente, pode evitar custos de dezenas de milhares de reais ao longo da vida do edifício.

> Um empreendimento que não prevê a infraestrutura do amanhã já nasce defasado.

## Acústica: o luxo do silêncio

Em bairros valorizados como Savassi, Serra e Santo Agostinho, onde a vida urbana é intensa, o isolamento acústico é um dos atributos mais valorizados — e mais difíceis de corrigir após a construção. Paredes com tratamento acústico, lajes com manta resiliente, esquadrias com vidro duplo e câmara de ar: são investimentos que transformam a experiência de moradia.

Segundo dados de pesquisas do setor imobiliário, compradores de imóveis acima de R$ 1,5 milhão em Belo Horizonte citam o conforto acústico como o terceiro critério mais importante na decisão de compra, atrás apenas da localização e da planta do apartamento.

## Visão CHR: a engenharia como patrimônio

Na CHR Engenharia, a convicção é de que engenharia de qualidade é, antes de tudo, um compromisso silencioso. Cada empreendimento é tratado como uma peça que precisa funcionar perfeitamente por gerações — não apenas impressionar na entrega.

Para a CHR, a excelência construtiva não é um diferencial de marketing — é uma premissa de projeto. É o que permite que cada empreendimento mantenha seu valor, seu conforto e sua integridade ao longo do tempo, mesmo quando o mercado muda e as tendências se renovam.

---

*Para quem busca unir localização, engenharia e visão patrimonial de longo prazo, a CHR desenvolve empreendimentos pensados para atravessar o tempo com valor, qualidade e propósito.*`,
    },
    {
      id: 'obra-por-administracao-modelo',
      title: 'Obra por administração: o modelo que alinha transparência, qualidade e inteligência financeira',
      subtitle: 'Como o regime de obra por administração oferece ao comprador controle real sobre custos e especificações',
      excerpt: 'O modelo de obra por administração oferece transparência total e controle de custos ao comprador. Entenda como funciona e por que construtoras de referência o adotam.',
      image: CATEGORY_IMAGES['Mercado'],
      category: 'Mercado',
      date: '28 Abr · 2026',
      readTime: '11 min',
      tags: ['obra por administração', 'modelo construtivo', 'transparência', 'custos'],
      content: `# Obra por administração: o modelo que alinha transparência, qualidade e inteligência financeira

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

Para entender a vantagem financeira, considere um exemplo simplificado. Em uma incorporação tradicional, se o custo real de construção de um apartamento é R$ 800 mil, a construtora pode vendê-lo por R$ 1,1 milhão — embutindo 37% de margem. Na obra por administração, o mesmo apartamento custaria os R$ 800 mil de custo real, mais a taxa de administração — tipicamente entre 12% e 18% do custo total.

**[INSIGHT]** A experiência do mercado mineiro mostra que, em obras bem administradas, o custo final tende a ser competitivo — especialmente quando o comprador tem representação ativa nas assembleias e acompanhamento profissional.

## Qualidade sem restrições

Talvez a vantagem mais subestimada da obra por administração seja a liberdade de especificação. Na obra por administração, as decisões de especificação são tomadas coletivamente pelos condôminos, com orientação técnica da construtora. Se o grupo decide investir em um sistema de ar-condicionado central mais sofisticado, em esquadrias de alumínio com ruptura térmica ou em um revestimento de fachada premium, o custo adicional é absorvido de forma transparente e proporcional.

## Os riscos e como mitigá-los

Os principais riscos incluem variação de custos, necessidade de capital e dependência da qualidade da gestão. Para mitigá-los, a escolha da construtora é absolutamente crítica.

> A obra por administração não é um modelo para qualquer construtora. Exige competência técnica, transparência radical e reputação que sobreviva ao escrutínio constante dos próprios clientes.

## Visão CHR: transparência como princípio

A CHR Engenharia adota o modelo de obra por administração por convicção, não por conveniência. Para a empresa, transparência não é uma estratégia comercial — é um princípio que orienta cada decisão, desde a seleção do terreno até a entrega das chaves.

---

*Para quem valoriza transparência, controle e qualidade sem compromissos, a CHR Engenharia oferece empreendimentos sob o regime de obra por administração — onde cada decisão é compartilhada e cada centavo é contabilizado.*`,
    },
  ];
}

