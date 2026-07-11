# Diretrizes SEO — Blog CHR Engenharia

## Formato de Saída SEO

Para cada artigo gerado, produzir os seguintes campos em formato JSON:

```json
{
  "metaTitle": "string (max 60 caracteres, incluir palavra-chave principal)",
  "metaDescription": "string (max 155 caracteres, resumo atrativo com CTA implícito)",
  "slug": "string (url-friendly, lowercase, hifens, sem acentos, max 5 palavras)",
  "tags": ["array de 4-6 tags relevantes"],
  "categoria": "string (uma das categorias: Tendências | Investimento | Mercado | Arquitetura | Engenharia CHR)",
  "palavrasChave": ["array de 3-5 keywords para SEO"],
  "tempoLeitura": "string (ex: '12 min')",
  "resumoCard": "string (max 180 caracteres, para card de listagem no blog)",
  "chamadaSocial": "string (max 280 caracteres, texto pronto para redes sociais)"
}
```

## Regras SEO

### Meta Title
- Incluir palavra-chave principal nos primeiros 30 caracteres
- Separar com " — " ou " | " quando necessário
- Incluir "BH" ou "Belo Horizonte" quando relevante
- Exemplo: "Valorização imobiliária em BH: bairros que lideram em 2026"

### Meta Description
- Resumir o valor do artigo em uma frase atrativa
- Incluir palavra-chave principal
- Terminar com indicação de valor (ex: "Análise completa.")
- Nunca usar "Clique aqui" ou CTAs agressivos

### Slug
- Máximo 5 palavras significativas
- Sem artigos, preposições ou conjunções
- Exemplos: `valorizacao-bairros-bh-2026`, `engenharia-construtiva-durabilidade`

### Tags
- 4-6 tags por artigo
- Misturar tags gerais e específicas
- Tags recorrentes: "mercado imobiliário", "belo horizonte", "alto padrão", "investimento", "arquitetura", "engenharia", "valorização"
- Tags específicas conforme o tema

### Palavras-chave
- 1 keyword principal (long-tail preferida)
- 2-4 keywords secundárias
- Foco em intenção de busca informacional e transacional
- Contexto BH sempre que possível

### Resumo para Card
- Máximo 180 caracteres
- Deve funcionar como preview atrativa na listagem do blog
- Tom analítico, não promocional

### Chamada para Redes Sociais
- Máximo 280 caracteres (compatível com Twitter/X)
- Tom mais direto e envolvente
- Pode incluir emoji (máximo 1-2, sofisticados)
- Exemplo: "🏗️ Os detalhes construtivos que o comprador não vê — mas sente por décadas. Nova análise no blog CHR."
