/**
 * CHR Blog Editorial — Gerador Semanal de Artigos Premium
 * Google Apps Script (gratuito, sem servidor, roda na nuvem)
 * 
 * SETUP:
 * 1. Acesse https://script.google.com e crie um novo projeto
 * 2. Cole este código inteiro
 * 3. Configure OPENAI_API_KEY nas propriedades do script:
 *    - Menu: Configurações (engrenagem) → Propriedades do Script
 *    - Adicione: OPENAI_API_KEY = sk-sua-chave-aqui
 * 4. Configure SPREADSHEET_ID (crie a planilha antes — instruções abaixo)
 * 5. Execute setupWeeklyTrigger() uma vez para agendar
 * 
 * PLANILHA:
 * Crie uma planilha no Google Sheets com aba "Artigos" e estas colunas na linha 1:
 * Data | Status | Título | Subtítulo | Categoria | Slug | Meta Title | 
 * Meta Description | Tags | Palavras-chave | Tempo de Leitura | Resumo Card | 
 * Chamada Social | Artigo Completo | Sugestão Imagens | Pautas Alternativas
 */

// ════════════════════════════════════════════════════════════════
// CONFIGURAÇÃO — EDITE AQUI
// ════════════════════════════════════════════════════════════════

const CONFIG = {
  SPREADSHEET_ID: 'COLE_O_ID_DA_SUA_PLANILHA_AQUI',
  SHEET_NAME: 'Artigos',
  NOTIFICATION_EMAIL: 'felipeamlima@gmail.com',
  OPENAI_MODEL: 'gpt-4o',
};

function getApiKey() {
  const key = PropertiesService.getScriptProperties().getProperty('OPENAI_API_KEY');
  if (!key) throw new Error('Configure OPENAI_API_KEY nas Propriedades do Script');
  return key;
}

// ════════════════════════════════════════════════════════════════
// TRIGGER — Execute uma vez para agendar execução semanal
// ════════════════════════════════════════════════════════════════

function setupWeeklyTrigger() {
  // Remove triggers antigos
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));
  // Cria trigger: toda segunda-feira às 9h
  ScriptApp.newTrigger('gerarArtigoSemanal')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY)
    .atHour(9)
    .create();
  Logger.log('✅ Trigger semanal configurado: segunda-feira às 9h');
}

// ════════════════════════════════════════════════════════════════
// FLUXO PRINCIPAL
// ════════════════════════════════════════════════════════════════

function gerarArtigoSemanal() {
  try {
    Logger.log('🚀 Iniciando geração editorial semanal (1 artigo)...');

    // 1. Buscar notícias recentes (gratuito — RSS)
    const noticias = buscarNoticias();
    Logger.log(`📰 ${noticias.length} notícias encontradas (custo: $0)`);

    // 2. Sugerir 3 pautas com IA — usamos só a primeira; as outras 2 ficam
    //    listadas como "pautas alternativas" no email para você escolher
    //    semana que vem se quiser
    const pautasSugeridas = sugerirPautas(noticias);
    Logger.log(`📋 ${pautasSugeridas.length} pautas sugeridas — usando a 1ª`);

    if (!pautasSugeridas.length) {
      Logger.log('⚠️ Nenhuma pauta sugerida — abortando');
      return;
    }

    const todasPautas = pautasSugeridas
      .map((p, i) => `${i + 1}. ${p.titulo} (${p.categoria})`)
      .join('\n');

    const pauta = pautasSugeridas[0];
    Logger.log(`✍️ Gerando artigo: ${pauta.titulo}`);

    const artigo = gerarArtigo(pauta);
    const seo = gerarSEO(artigo);

    // Validação básica antes de salvar — não polui a planilha com lixo
    if (!artigo || artigo.length < 500 || !seo || !seo.slug) {
      throw new Error('Artigo gerado parece incompleto — abortando antes de salvar');
    }

    salvarRascunho(pauta, artigo, seo, todasPautas);
    Logger.log(`✅ Artigo salvo: ${pauta.titulo}`);

    notificarEquipe(pauta, seo, todasPautas);
    Logger.log('📧 Notificação enviada');

    Logger.log(`✅ Geração concluída (~US$0.10)`);

  } catch (error) {
    Logger.log('❌ Erro: ' + error.message);
    MailApp.sendEmail({
      to: CONFIG.NOTIFICATION_EMAIL,
      subject: '❌ Erro no Gerador Editorial CHR',
      htmlBody: `<p>O gerador de artigos encontrou um erro:</p><pre>${error.message}\n${error.stack}</pre>`
    });
  }
}

// ════════════════════════════════════════════════════════════════
// 1. BUSCAR NOTÍCIAS VIA RSS (Google News)
// ════════════════════════════════════════════════════════════════

function buscarNoticias() {
  const feeds = [
    'https://news.google.com/rss/search?q=mercado+imobili%C3%A1rio+Belo+Horizonte&hl=pt-BR&gl=BR&ceid=BR:pt-419',
    'https://news.google.com/rss/search?q=constru%C3%A7%C3%A3o+civil+arquitetura+Minas+Gerais&hl=pt-BR&gl=BR&ceid=BR:pt-419',
    'https://news.google.com/rss/search?q=valoriza%C3%A7%C3%A3o+imobili%C3%A1ria+BH+2026&hl=pt-BR&gl=BR&ceid=BR:pt-419',
  ];
  
  const headlines = [];
  const seen = new Set();
  
  for (const feedUrl of feeds) {
    try {
      const response = UrlFetchApp.fetch(feedUrl, { muteHttpExceptions: true });
      const xml = response.getContentText();
      const doc = XmlService.parse(xml);
      const root = doc.getRootElement();
      const ns = root.getNamespace();
      const channel = root.getChild('channel', ns);
      if (!channel) continue;
      
      const items = channel.getChildren('item', ns);
      for (let i = 0; i < Math.min(items.length, 10); i++) {
        const item = items[i];
        const title = item.getChildText('title', ns) || '';
        const link = item.getChildText('link', ns) || '';
        const pubDate = item.getChildText('pubDate', ns) || '';
        
        if (title && !seen.has(title)) {
          seen.add(title);
          headlines.push({ titulo: title.trim(), link, data: pubDate });
        }
      }
    } catch (e) {
      Logger.log('⚠️ Erro no feed: ' + e.message);
    }
  }
  
  return headlines.slice(0, 20);
}

// ════════════════════════════════════════════════════════════════
// 2. SUGERIR 3 PAUTAS COM IA
// ════════════════════════════════════════════════════════════════

function sugerirPautas(noticias) {
  const resumo = noticias.map((n, i) => `${i+1}. ${n.titulo}`).join('\n');
  
  const response = chamarOpenAI({
    model: CONFIG.OPENAI_MODEL,
    temperature: 0.7,
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: `Você é o editor-chefe do blog da CHR Engenharia, construtora premium de Belo Horizonte.

Sugira 3 pautas para artigos editoriais premium. Cada pauta deve ter:
- titulo: editorial, premium (estilo revista especializada)
- subtitulo: analítico, complementar ao título
- categoria: uma de (Tendências | Investimento | Mercado | Arquitetura | Engenharia CHR)
- justificativa: por que é relevante agora

Temas prioritários: mercado imobiliário BH, bairros Funcionários/Sion/São Pedro/Lourdes/Savassi/Serra/Santo Agostinho, valorização urbana, arquitetura residencial, engenharia construtiva, obra por administração, investimento imobiliário, tendências de moradia, comprador de alto padrão.

Responda em JSON: {"pautas": [{"titulo", "subtitulo", "categoria", "justificativa"}]}`
      },
      {
        role: 'user',
        content: `Notícias recentes do setor:\n\n${resumo}\n\nData: ${new Date().toLocaleDateString('pt-BR')}\n\nSugira 3 pautas premium baseadas nesse contexto.`
      }
    ]
  });
  
  const parsed = JSON.parse(response);
  return parsed.pautas || [];
}

// ════════════════════════════════════════════════════════════════
// 3. GERAR ARTIGO COMPLETO
// ════════════════════════════════════════════════════════════════

function gerarArtigo(pauta) {
  const response = chamarOpenAI({
    model: CONFIG.OPENAI_MODEL,
    temperature: 0.6,
    max_tokens: 4000,
    messages: [
      {
        role: 'system',
        content: `Você é o editor-chefe do blog da CHR Engenharia, construtora e incorporadora premium de Belo Horizonte. Escreva artigos com qualidade de revista especializada em mercado imobiliário.

TOM: sofisticado, técnico sem ser pesado, institucional, elegante, confiável, analítico, premium, brasileiro, voltado a BH.

ESTRUTURA OBRIGATÓRIA:
1. Título editorial forte (não genérico)
2. Subtítulo analítico
3. Abertura marcante (contexto/insight/provocação — nunca "Neste artigo...")
4. Contexto de mercado atual
5. Dados com fonte real (Secovi, FipeZap, IBGE, Sinduscon, etc.) — NUNCA invente dados ou fontes
6. Citações reais de especialistas com fonte — se não houver, NÃO invente
7. Seção "Visão CHR" obrigatória — posicionamento institucional
8. Profundidade técnica quando aplicável
9. CTA final elegante e discreto

REGRAS:
- 1.200 a 2.000 palavras
- Parágrafos de 3-5 frases
- Subtítulos fortes
- Use > para frases de destaque (pull quotes)
- Use **[INSIGHT]** para observações em destaque
- NUNCA invente dados, fontes ou falas de especialistas
- NUNCA prometa valorização garantida
- NUNCA use frases vazias como "qualidade e inovação" sem explicar o que isso significa concretamente
- Se não tiver dado específico com fonte, diga "segundo análises do setor" — mas nunca invente números
- Formato: Markdown

CTA exemplo: "Para quem busca unir localização, arquitetura e visão patrimonial, a CHR desenvolve empreendimentos pensados para atravessar o tempo com valor, qualidade e propósito."`
      },
      {
        role: 'user',
        content: `Escreva o artigo completo sobre:

Título: ${pauta.titulo}
Subtítulo: ${pauta.subtitulo}
Categoria: ${pauta.categoria}
Contexto: ${pauta.justificativa}

Lembre-se: artigo premium, longform, com profundidade real.`
      }
    ]
  });
  
  return response;
}

// ════════════════════════════════════════════════════════════════
// 4. GERAR SEO METADATA
// ════════════════════════════════════════════════════════════════

function gerarSEO(artigo) {
  const response = chamarOpenAI({
    model: CONFIG.OPENAI_MODEL,
    temperature: 0.4,
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: `Gere metadados SEO para um artigo do blog da CHR Engenharia (construtora premium de BH).

Responda em JSON com:
- metaTitle (max 60 chars, incluir keyword principal)
- metaDescription (max 155 chars)
- slug (url-friendly, sem acentos, max 5 palavras com hifens)
- tags (array 4-6 tags)
- categoria (Tendências|Investimento|Mercado|Arquitetura|Engenharia CHR)
- palavrasChave (array 3-5 keywords)
- tempoLeitura (ex: "12 min")
- resumoCard (max 180 chars para listagem do blog)
- chamadaSocial (max 280 chars para redes sociais)
- sugestaoImagens (array de 3 objetos com: descricao, posicao, legenda, altText, promptGeracao)`
      },
      {
        role: 'user',
        content: `Artigo:\n\n${artigo}`
      }
    ]
  });
  
  return JSON.parse(response);
}

// ════════════════════════════════════════════════════════════════
// 5. SALVAR RASCUNHO NO GOOGLE SHEETS
// ════════════════════════════════════════════════════════════════

function salvarRascunho(pauta, artigo, seo, todasPautas) {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) throw new Error(`Aba "${CONFIG.SHEET_NAME}" não encontrada na planilha`);
  
  const now = new Date();
  const data = Utilities.formatDate(now, 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm');
  
  sheet.appendRow([
    data,
    'Rascunho',
    pauta.titulo,
    pauta.subtitulo,
    seo.categoria || pauta.categoria,
    seo.slug || '',
    seo.metaTitle || '',
    seo.metaDescription || '',
    Array.isArray(seo.tags) ? seo.tags.join(', ') : '',
    Array.isArray(seo.palavrasChave) ? seo.palavrasChave.join(', ') : '',
    seo.tempoLeitura || '',
    seo.resumoCard || '',
    seo.chamadaSocial || '',
    artigo,
    JSON.stringify(seo.sugestaoImagens || [], null, 2),
    todasPautas,
  ]);
}

// ════════════════════════════════════════════════════════════════
// 6. NOTIFICAR EQUIPE POR E-MAIL
// ════════════════════════════════════════════════════════════════

function notificarEquipe(pauta, seo, todasPautas) {
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${CONFIG.SPREADSHEET_ID}/edit`;
  
  const html = `
  <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 640px; margin: 0 auto;">
    <div style="background: #1a1a1a; padding: 28px 36px; border-radius: 8px 8px 0 0;">
      <h2 style="color: #c8b87a; margin: 0; font-size: 16px; letter-spacing: 3px; text-transform: uppercase;">CHR Editorial</h2>
      <p style="color: #666; margin: 6px 0 0; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase;">Novo rascunho semanal — revisão necessária</p>
    </div>
    <div style="background: #fff; padding: 36px; border-radius: 0 0 8px 8px; border: 1px solid #eee; border-top: 0;">
      <h3 style="color: #1a1a1a; margin: 0 0 8px; font-size: 22px; line-height: 1.3;">${pauta.titulo}</h3>
      <p style="color: #666; margin: 0 0 24px; font-size: 14px; font-style: italic;">${pauta.subtitulo}</p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="border-bottom: 1px solid #f0f0f0;">
          <td style="padding: 10px 0; color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; width: 120px;">Categoria</td>
          <td style="padding: 10px 0; color: #1a1a1a; font-weight: 600;">${seo.categoria || pauta.categoria}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f0f0f0;">
          <td style="padding: 10px 0; color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Leitura</td>
          <td style="padding: 10px 0; color: #1a1a1a;">${seo.tempoLeitura || '-'}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Tags</td>
          <td style="padding: 10px 0; color: #1a1a1a;">${Array.isArray(seo.tags) ? seo.tags.join(', ') : '-'}</td>
        </tr>
      </table>
      <div style="margin-top: 24px; padding: 16px; background: #f8f7f4; border-left: 3px solid #c8b87a; border-radius: 4px;">
        <p style="margin: 0 0 4px; font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Resumo</p>
        <p style="margin: 0; font-size: 14px; color: #333; line-height: 1.6;">${seo.resumoCard || '-'}</p>
      </div>
      <div style="margin-top: 24px; text-align: center;">
        <a href="${sheetUrl}" style="display: inline-block; background: #1a1a1a; color: #c8b87a; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 700; font-size: 13px; letter-spacing: 1px; text-transform: uppercase;">Revisar na Planilha →</a>
      </div>
      <div style="margin-top: 24px; padding: 16px; background: #fff8e7; border-radius: 6px; text-align: center;">
        <p style="margin: 0; font-size: 13px; color: #8b7a3a;">⚠️ <strong>Revisão necessária</strong> antes de publicar.</p>
      </div>
      <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 6px;">
        <p style="margin: 0 0 4px; font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Pautas alternativas</p>
        <p style="margin: 0; font-size: 12px; color: #666; white-space: pre-line;">${todasPautas}</p>
      </div>
    </div>
  </div>`;
  
  MailApp.sendEmail({
    to: CONFIG.NOTIFICATION_EMAIL,
    subject: `📝 Novo Rascunho Editorial CHR — ${pauta.titulo}`,
    htmlBody: html,
  });
}

// ════════════════════════════════════════════════════════════════
// UTILITÁRIO — Chamada OpenAI
// ════════════════════════════════════════════════════════════════

function chamarOpenAI(payload) {
  const apiKey = getApiKey();
  
  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: { 'Authorization': 'Bearer ' + apiKey },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  };
  
  const response = UrlFetchApp.fetch('https://api.openai.com/v1/chat/completions', options);
  const code = response.getResponseCode();
  const body = JSON.parse(response.getContentText());
  
  if (code !== 200) {
    throw new Error(`OpenAI API error (${code}): ${body.error?.message || JSON.stringify(body)}`);
  }
  
  return body.choices[0].message.content;
}

// ════════════════════════════════════════════════════════════════
// TESTE MANUAL — Execute para testar sem esperar o trigger
// ════════════════════════════════════════════════════════════════

function notificarEquipe3Artigos(artigosGerados, todasPautas) {
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${CONFIG.SPREADSHEET_ID}/edit`;
  
  const artigosHtml = artigosGerados.map((a, i) => `
    <div style="padding: 20px; background: ${i % 2 === 0 ? '#f9f9f9' : '#fff'}; border-radius: 6px; margin-bottom: 12px;">
      <h4 style="color: #1a1a1a; margin: 0 0 6px; font-size: 16px;">${i+1}. ${a.pauta.titulo}</h4>
      <p style="color: #666; margin: 0 0 8px; font-size: 13px; font-style: italic;">${a.pauta.subtitulo}</p>
      <span style="display: inline-block; background: #1a1a1a; color: #c8b87a; padding: 3px 10px; border-radius: 3px; font-size: 10px; letter-spacing: 1px; text-transform: uppercase;">${a.seo.categoria || a.pauta.categoria}</span>
      <span style="margin-left: 8px; color: #999; font-size: 11px;">${a.seo.tempoLeitura || ''}</span>
    </div>
  `).join('');
  
  const html = `
  <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 640px; margin: 0 auto;">
    <div style="background: #1a1a1a; padding: 28px 36px; border-radius: 8px 8px 0 0;">
      <h2 style="color: #c8b87a; margin: 0; font-size: 16px; letter-spacing: 3px; text-transform: uppercase;">CHR Editorial</h2>
      <p style="color: #666; margin: 6px 0 0; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase;">${artigosGerados.length} novos rascunhos — revisão necessária</p>
    </div>
    <div style="background: #fff; padding: 36px; border-radius: 0 0 8px 8px; border: 1px solid #eee; border-top: 0;">
      ${artigosHtml}
      <div style="margin-top: 24px; text-align: center;">
        <a href="${sheetUrl}" style="display: inline-block; background: #1a1a1a; color: #c8b87a; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 700; font-size: 13px; letter-spacing: 1px; text-transform: uppercase;">Revisar na Planilha →</a>
      </div>
      <div style="margin-top: 24px; padding: 16px; background: #fff8e7; border-radius: 6px; text-align: center;">
        <p style="margin: 0; font-size: 13px; color: #8b7a3a;">⚠️ <strong>Revisão necessária</strong> antes de publicar.</p>
      </div>
    </div>
  </div>`;
  
  MailApp.sendEmail({
    to: CONFIG.NOTIFICATION_EMAIL,
    subject: `📝 ${artigosGerados.length} Novos Rascunhos CHR — Revisão Semanal`,
    htmlBody: html,
  });
}

function testeManual() {
  gerarArtigoSemanal();
}

// ════════════════════════════════════════════════════════════════
// API PÚBLICA — Serve artigos publicados para o site
// Implante como Web App: Implantar → Nova implantação → App da Web
// Acesso: "Qualquer pessoa" | Executar como: "Eu"
// ════════════════════════════════════════════════════════════════

function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || 'list';
  const slug = (e && e.parameter && e.parameter.slug) || '';
  
  try {
    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    if (!sheet) throw new Error('Aba não encontrada');
    
    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) return jsonResponse({ artigos: [] });
    
    const headers = data[0];
    const artigos = [];
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const status = String(row[1] || '').trim();

      // Só retorna artigos com status "Publicado"
      if (status !== 'Publicado') continue;

      const titulo = String(row[2] || '').trim();
      const slug = String(row[5] || '').trim();
      const artigoCompleto = String(row[13] || '').trim();

      // Validação: linha tem que ter título, slug E conteúdo mínimo.
      // Isso evita servir rascunhos vazios ou linhas corrompidas que
      // poderiam sobrescrever o conteúdo bom no site.
      if (!titulo || titulo.length < 6) continue;
      if (!slug || slug.length < 3) continue;
      if (!artigoCompleto || artigoCompleto.length < 400) continue;

      artigos.push({
        data: row[0],
        status: row[1],
        titulo: titulo,
        subtitulo: row[3],
        categoria: row[4],
        slug: slug,
        metaTitle: row[6],
        metaDescription: row[7],
        tags: row[8] ? String(row[8]).split(',').map(t => t.trim()) : [],
        palavrasChave: row[9],
        tempoLeitura: row[10],
        resumoCard: row[11],
        chamadaSocial: row[12],
        artigoCompleto: artigoCompleto,
        sugestaoImagens: row[14],
        pautasAlternativas: row[15],
      });
    }
    
    // Se pediu um artigo específico por slug
    if (action === 'get' && slug) {
      const found = artigos.find(a => a.slug === slug);
      if (!found) return jsonResponse({ error: 'Artigo não encontrado' }, 404);
      return jsonResponse({ artigo: found });
    }
    
    // Lista todos (mais recentes primeiro)
    artigos.reverse();
    return jsonResponse({ artigos, total: artigos.length });
    
  } catch (error) {
    return jsonResponse({ error: error.message }, 500);
  }
}

function jsonResponse(data, code) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
