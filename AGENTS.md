# AGENTS.md

Guia para agentes (humanos ou IA) contribuírem no **Speculum Animae** com segurança, consistência e alta qualidade.

## 1) Objetivo do projeto

App **Nuxt 4 + Vue 3 + TypeScript** para **testes de autoconhecimento** (principalmente **Likert**), com:

- Execução de testes (runner)
- Cálculo local de scores
- Persistência em `/api/results`
- Página de resultado `/resultados/:sessionId` com **builder** no servidor
- Histórico do usuário
- Artigos (catálogo + página)
- Planos/checkout/portal
- PDF (apenas temperamentos)

Hoje: **27 testes** configurados e **13 artigos**.

## 2) Fluxo principal (alto nível)

1. Catálogo de testes: `src/config/tests/index.ts`
2. Listagem (home e /testes): `src/pages/index.vue`, `src/pages/testes/index.vue`
3. Execução em `/testes/:slug`: `src/pages/testes/[slug].vue`
4. Runner (embaralha, valida, calcula): `src/composables/useLikertTestRunner.ts`
5. Salva resultado: `src/composables/useSaveResult.ts` → `server/api/results.post.ts`
6. Resultado: `src/pages/resultados/[sessionId].vue` → `server/api/results/[id].get.ts`
7. Builder escolhido por slug: `server/api/report-builders/*`
8. PDF temperamentos: `server/api/results/[id]/pdf.get.ts`

## 3) Stack e integrações

- UI: Nuxt/Vue + Tailwind (`nuxt.config.ts`, `tailwind.config.ts`)
- i18n: `@nuxtjs/i18n` (pt-BR default)
- Auth/DB: Supabase (`@nuxtjs/supabase`)
- Backend: Nitro (`server/api/**`)
- Observabilidade: Bugsnag (client + server)
- PDF: pdfkit (temperamentos)
- Testes unitários: Vitest (engine/scoring)

## 4) Regras de contribuição (obrigatórias)

### 4.1 TypeScript e qualidade
- **Sem `any`**. Tipagem obrigatória e explícita quando necessário.
- Evitar `as unknown as ...`. Prefira validação/parse e tipos corretos.
- Código em **inglês** (nomes de variáveis, funções, arquivos, comentários técnicos).
- Preferir `type` ao invés de `interface` quando possível.

### 4.2 UI/UX e acessibilidade
- Layout **responsivo** (mobile-first).
- Suporte consistente a **dark/light mode**.
- Componentes pequenos, reutilizáveis e com responsabilidade clara.
- Inputs e interações acessíveis (labels, focus states, navegação por teclado).

### 4.3 Segurança e privacidade
- Nunca expor dados sensíveis no client quando a lógica é do servidor.
- Resultados:
  - Acesso deve respeitar token (logado) ou `clientId` (anônimo), sem vazamento entre usuários.
- Supabase:
  - Presumir **RLS-first** para tabelas do app.
  - Evitar decisões de autorização só no client.

### 4.4 Observabilidade
- Erros relevantes devem ser capturados com Bugsnag (quando aplicável).
- Não logar PII em console/logs de servidor.

### 4.5 Performance
- Evitar computações caras em watchers reativos.
- Pré-computar e memoizar quando fizer sentido (especialmente em runners grandes).
- Preferir renderização incremental e componentes leves.

## 5) Convenções do repositório

### 5.1 Estrutura (principais)
- `src/config/tests/*` → definição de testes (catálogo)
- `src/components/tests/*` → views/runner UI
- `src/composables/*` → core logic (runner, auth, save)
- `src/pages/*` → rotas
- `server/api/*` → endpoints Nitro
- `server/api/report-builders/*` → builders de relatório
- `src/data/articles/*` → catálogo de artigos e conteúdo
- `src/server/engine/scoring/*` → engine e testes Vitest

### 5.2 i18n
- pt-BR é default. Qualquer texto novo deve considerar i18n.
- Evite strings “hardcoded” em componentes de página quando forem textos do produto.

### 5.3 Tailwind
- Não duplicar classes complexas repetidas: extrair para componente/utility.
- Garantir compatibilidade com dark mode.

## 6) Como adicionar coisas (checklists)

### 6.1 Adicionar um novo teste (Likert/Rank/Pairwise/Choice)
1. Criar/editar definição em `src/config/tests/*`.
2. Registrar no catálogo em `src/config/tests/index.ts`.
3. Garantir que o runner suporta o tipo (se for novo ou variante):
   - `src/composables/useLikertTestRunner.ts`
4. Adicionar/ajustar builder do relatório:
   - Se for genérico: `server/api/report-builders/assessments.ts`
   - Se for específico (ex.: 12 camadas/temperamentos): builder dedicado
5. Testes:
   - Cobrir scoring/transformações em `src/server/engine/scoring/__tests__/*`.

Critérios de pronto:
- Runner valida entradas e não quebra com perguntas faltando resposta.
- Resultado aparece corretamente em `/resultados/:sessionId`.
- Tipagem completa (sem `any`).
- Testes Vitest passando.

### 6.2 Adicionar um novo tipo de relatório (builder)
1. Criar builder em `server/api/report-builders/<new>.ts` com tipos claros.
2. Conectar seleção no dispatcher em `server/api/results/[id].get.ts`.
3. Criar UI no resultado:
   - `src/pages/resultados/[sessionId].vue` (view por tipo)
4. (Opcional) PDF se fizer sentido:
   - manter pdfkit isolado e somente onde necessário.

Critérios de pronto:
- Builder determinístico (mesma entrada → mesma saída).
- Sem dependência de client para regras de interpretação.
- Tratamento de erros com mensagens úteis.

### 6.3 Adicionar artigo
1. Registrar no catálogo em `src/data/articles/index.ts`.
2. Criar conteúdo/estrutura que o detalhe consome em `src/pages/artigos/[slug].vue`.
3. Garantir:
   - slug único
   - título/descrição para SEO
   - consistência visual (dark/light)

## 7) Testes e comandos

Use o **package manager existente** do repositório (não trocar).
- Se existir `pnpm-lock.yaml`, use `pnpm`.
- Se existir `package-lock.json`, use `npm`.
- Se existir `yarn.lock`, use `yarn`.

Comandos típicos:
- Dev: `<pm> run dev`
- Build: `<pm> run build`
- Testes: `<pm> run test` (Vitest)
- Lint: `<pm> run lint` (se existir)

Regra: mudanças de lógica (runner/scoring/builders) exigem testes unitários.

## 8) Padrão de PR/entrega (para agentes)

Sempre entregar:
- Objetivo e escopo (o que mudou)
- Arquivos tocados
- Riscos e mitigação
- Como testar (passo a passo)
- Evidência: saída de testes/lint/build quando aplicável

Evitar:
- Refactors amplos sem necessidade
- Mudanças de formatação em massa
- Alterar lockfile sem necessidade

## 9) Domínio Speculum Animae (direção do produto)

O produto cobre múltiplos eixos (exemplos):
- 12 camadas (modelo próprio)
- 4 temperamentos
- Virtudes e vícios/hábitos
- Linguagens do amor
- Outros assessments genéricos

Regra de ouro: o resultado deve ser **compreensível**, **determinístico** e **honesto**:
- explicar “o que significa”
- sugerir próximos passos
- evitar afirmações clínicas/diagnósticas