# CLAUDE.md

Instruções operacionais para **Claude Code** (e outros agentes de codificação) ao trabalhar neste repositório.

## 1) Como você deve trabalhar aqui

### 1.1 Processo padrão (sempre)
1. **Entender o fluxo existente** antes de propor mudanças (runner → save → result → builder).
2. Propor um **plano curto** e então executar com mudanças mínimas.
3. Implementar com:
   - tipagem forte (sem `any`)
   - componentes pequenos
   - responsivo + dark/light
   - strings relevantes via i18n
4. Finalizar com:
   - testes (Vitest) para mudanças de engine/scoring/builders
   - instruções claras de como validar manualmente

### 1.2 Escopo e disciplina
- Prefira PRs pequenos.
- Não refatore arquivos inteiros só para “melhorar estilo”.
- Não alterar package manager/lockfile.
- Não introduzir novas libs sem necessidade real.

## 2) Arquitetura que você precisa respeitar

### 2.1 Ponto central do produto
- Catálogo de testes: `src/config/tests/index.ts`
- Execução/runner: `src/composables/useLikertTestRunner.ts`
- Persistência: `src/composables/useSaveResult.ts` + `server/api/results.post.ts`
- Resultado: `src/pages/resultados/[sessionId].vue` + `server/api/results/[id].get.ts`
- Builders:
  - genéricos: `server/api/report-builders/assessments.ts`
  - 12 camadas: `server/api/report-builders/twelveLayers.ts`
  - temperamentos: `server/api/report-builders/temperaments.ts`
- PDF (temperamentos): `server/api/results/[id]/pdf.get.ts`

### 2.2 Regras importantes do fluxo de resultados
- O client calcula e salva sessão em `/api/results`.
- O servidor monta o relatório final por slug (builder), e a UI apenas renderiza.

Implica:
- Regras “de verdade” do relatório devem ficar no **servidor** (builder).
- A UI deve ser resiliente e não quebrar com campos ausentes (render defensivo).

## 3) Regras de código (hard rules)

- TypeScript estrito: **sem `any`**.
- Nomeação e código em **inglês**.
- Preferir `type` em vez de `interface`.
- Componentização: preferir componentes pequenos e reutilizáveis.
- Tailwind:
  - manter consistência de spacing e tipografia
  - garantir dark/light
- i18n:
  - não adicionar texto do produto hardcoded onde deveria ser traduzível
- Segurança:
  - não expor PII em logs
  - respeitar token/clientId ao acessar resultados
- Observabilidade:
  - erros relevantes devem ser reportáveis (Bugsnag)

## 4) Playbook por tarefa

### 4.1 “Adicionar um novo teste Likert”
Checklist mínimo:
1. Criar a definição do teste (perguntas, grupos, escala).
2. Registrar no `src/config/tests/index.ts`.
3. Garantir que `useLikertTestRunner`:
   - valida respostas
   - calcula scores corretamente
   - não quebra com dados incompletos
4. Garantir que o builder:
   - gere narrativa (título, resumo, seções)
   - ordene insights de forma clara
5. Adicionar teste Vitest para scoring quando houver lógica nova.

### 4.2 “Adicionar um novo relatório específico (novo builder)”
1. Criar builder dedicado em `server/api/report-builders/<name>.ts`.
2. Conectar no dispatcher em `server/api/results/[id].get.ts`.
3. Criar view correspondente em `/resultados/:sessionId` (ou componente).
4. Adicionar contratos de tipo para `ReportData` / `ReportSection` (ou equivalente).

### 4.3 “Adicionar artigo”
1. Adicionar ao índice `src/data/articles/index.ts`.
2. Garantir página de detalhe renderiza bem em mobile, dark/light.
3. Garantir SEO básico (title/description) se o projeto já usa isso.

## 5) Padrão de entrega (o que você deve retornar)

Ao final de uma implementação, sempre incluir:
- **Resumo** do que mudou (em bullets)
- **Arquivos tocados**
- **Como testar** (passos concretos)
- **Riscos** (ex.: migração de shape de report) e mitigação
- Resultado de testes (quando rodados)

Se a tarefa for “somente análise”, não criar/alterar arquivos.

## 6) Snippets de prompts úteis (copiar/colar)

### 6.1 Prompt para adicionar um teste
> Add a new Likert test called "<slug>" following the existing config pattern in `src/config/tests`. Register it in `src/config/tests/index.ts`. Ensure `useLikertTestRunner` supports it without changes; if changes are needed, keep them minimal and fully typed (no any). Add a Vitest unit test for scoring. Update the report builder so `/resultados/:sessionId` renders a clear narrative section for this test. Keep the UI responsive and dark/light consistent.

### 6.2 Prompt para novo builder
> Create a new report builder in `server/api/report-builders/<name>.ts` with fully typed output. Wire it into `server/api/results/[id].get.ts` builder selection. Add a dedicated view/component for the new report type in `src/pages/resultados/[sessionId].vue` (or extracted component). Include defensive rendering and no hardcoded product strings where i18n is expected.

## 7) “Não faça”
- Não criar endpoints paralelos para salvar resultado fora de `server/api/results.post.ts`.
- Não mover a lógica de interpretação para o client “por conveniência”.
- Não adicionar dependências sem justificar.
- Não alterar estrutura global do app sem pedido explícito.