import { u as useI18n, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, computed, mergeProps, withCtx, unref, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

const articles = [{ "slug": "temperamento-colerico-tracos-virtudes-riscos", "title": "Temperamento colerico: tracos, virtudes e riscos", "description": "Entenda o colerico: pontos fortes, desafios e como equilibrar impulsividade.", "category": "temperamentos", "tags": ["temperamentos", "colerico", "autoconhecimento"], "publishedAt": "2026-01-01", "updatedAt": "2026-01-03", "relatedTestSlugs": ["temperamentos-classicos"], "access": "free", "file": "temperamento-colerico-tracos-virtudes-riscos.json" }, { "slug": "temperamento-melancolico-forcas-sensibilidade-equilibrio", "title": "Temperamento melancolico: forcas, sensibilidade e equilibrio", "description": "Como o melancolico percebe o mundo e o que ajuda a manter o equilibrio.", "category": "temperamentos", "tags": ["temperamentos", "melancolico", "sensibilidade"], "publishedAt": "2026-01-02", "updatedAt": "2026-01-04", "relatedTestSlugs": ["temperamentos-classicos"], "access": "free", "file": "temperamento-melancolico-forcas-sensibilidade-equilibrio.json" }, { "slug": "12-camadas-mapa-de-autoconhecimento", "title": "12 camadas: um mapa pratico de autoconhecimento", "description": "Veja como as camadas se conectam e por que elas ajudam a organizar sua jornada.", "category": "personalidade", "tags": ["personalidade", "12-camadas", "autoconhecimento"], "publishedAt": "2026-01-05", "updatedAt": "2026-01-06", "relatedTestSlugs": ["12-camadas"], "access": "free", "file": "12-camadas-mapa-de-autoconhecimento.json" }, { "slug": "tracos-de-personalidade-observar-sem-rotulos", "title": "Tracos de personalidade: observar sem rotulos", "description": "Um guia curto para observar tracos sem cair em rotulos rigidos.", "category": "personalidade", "tags": ["personalidade", "tracos", "autoobservacao"], "publishedAt": "2026-01-07", "updatedAt": "2026-01-07", "relatedTestSlugs": ["12-camadas"], "access": "free", "file": "tracos-de-personalidade-observar-sem-rotulos.json" }, { "slug": "habitos-diarios-para-mais-clareza-mental", "title": "Habitos diarios para mais clareza mental", "description": "Micro rotinas que ajudam a ter foco, calma e constancia.", "category": "virtudes-habitos", "tags": ["habitos", "clareza", "foco"], "publishedAt": "2026-01-08", "updatedAt": "2026-01-09", "relatedTestSlugs": [], "access": "free", "file": "habitos-diarios-para-mais-clareza-mental.json" }, { "slug": "virtudes-praticas-para-equilibrio-emocional", "title": "Virtudes praticas para equilibrio emocional", "description": "Pequenas virtudes aplicadas ao cotidiano para lidar melhor com conflitos.", "category": "virtudes-habitos", "tags": ["virtudes", "emocao", "equilibrio"], "publishedAt": "2026-01-09", "updatedAt": "2026-01-10", "relatedTestSlugs": [], "access": "free", "file": "virtudes-praticas-para-equilibrio-emocional.json" }, { "slug": "linguagens-do-amor-como-identificar-no-dia-a-dia", "title": "Linguagens do amor: como identificar no dia a dia", "description": "Sinais simples para reconhecer como voce e o outro demonstram afeto.", "category": "relacionamentos", "tags": ["relacionamentos", "linguagens-do-amor", "comunicacao"], "publishedAt": "2026-01-10", "updatedAt": "2026-01-11", "relatedTestSlugs": [], "access": "free", "file": "linguagens-do-amor-como-identificar-no-dia-a-dia.json" }, { "slug": "conversas-dificeis-com-empatia-e-limites", "title": "Conversas dificeis com empatia e limites", "description": "Um roteiro simples para dialogos delicados sem perder a firmeza.", "category": "relacionamentos", "tags": ["relacionamentos", "empatia", "dialogo"], "publishedAt": "2026-01-11", "updatedAt": "2026-01-12", "relatedTestSlugs": [], "access": "free", "file": "conversas-dificeis-com-empatia-e-limites.json" }, { "slug": "temperamento-sanguineo-energia-social-virtudes-excessos", "title": "Temperamento sanguineo: energia social, virtudes e excessos", "description": "O que torna o sanguineo leve e carismatico, e como evitar dispersao e exageros.", "category": "temperamentos", "tags": ["temperamentos", "sanguineo", "socializacao"], "publishedAt": "2026-01-13", "updatedAt": "2026-01-13", "relatedTestSlugs": ["temperamentos-classicos"], "access": "free", "file": "temperamento-sanguineo-energia-social-virtudes-excessos.json" }, { "slug": "temperamento-fleumatico-constancia-paz-inercia", "title": "Temperamento fleumatico: constancia, paz e armadilhas da inercia", "description": "Entenda o fleumatico: estabilidade, lealdade e como superar procrastinacao.", "category": "temperamentos", "tags": ["temperamentos", "fleumatico", "constancia"], "publishedAt": "2026-01-14", "updatedAt": "2026-01-14", "relatedTestSlugs": ["temperamentos-classicos"], "access": "free", "file": "temperamento-fleumatico-constancia-paz-inercia.json" }, { "slug": "combinacoes-de-temperamentos-interpretacao-inicial", "title": "Combinacoes de temperamentos: como ler o primeiro e o segundo juntos", "description": "Um guia pratico para interpretar o temperamento predominante e o secundario com clareza.", "category": "temperamentos", "tags": ["temperamentos", "combinacoes", "autoanalise"], "publishedAt": "2026-01-15", "updatedAt": "2026-01-15", "relatedTestSlugs": ["temperamentos-classicos"], "access": "free", "file": "combinacoes-de-temperamentos-interpretacao-inicial.json" }, { "slug": "12-camadas-o-que-cada-camada-significa-e-o-que-nao-significa", "title": "As 12 camadas: o que cada camada significa (e o que nao significa)", "description": "Entenda o papel de cada camada e evite interpretacoes erradas e rotulos rigidos.", "category": "personalidade", "tags": ["12-camadas", "personalidade", "metodo"], "publishedAt": "2026-01-16", "updatedAt": "2026-01-16", "relatedTestSlugs": ["12-camadas"], "access": "free", "file": "12-camadas-o-que-cada-camada-significa-e-o-que-nao-significa.json" }, { "slug": "12-camadas-como-interpretar-resultados-sem-rotulos", "title": "Como interpretar seu resultado das 12 camadas sem cair em rotulos", "description": "Um roteiro simples para transformar o resultado em observacao e acao pratica.", "category": "personalidade", "tags": ["12-camadas", "interpretacao", "autoconhecimento"], "publishedAt": "2026-01-17", "updatedAt": "2026-01-17", "relatedTestSlugs": ["12-camadas"], "access": "free", "file": "12-camadas-como-interpretar-resultados-sem-rotulos.json" }];
const manifestData = {
  articles
};
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  articles,
  default: manifestData
}, Symbol.toStringTag, { value: "Module" }));
const manifest = parseManifest(manifestData);
const manifestEntries = manifest.articles;
const articleMeta = manifestEntries.map(({ file, ...meta }) => meta);
const sortedArticles = [...articleMeta].sort(
  (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
);
const articleLoaders = /* @__PURE__ */ Object.assign({ "./articles/12-camadas-como-interpretar-resultados-sem-rotulos.json": () => import('./12-camadas-como-interpretar-resultados-sem-rotulos-B7uGmaqh.mjs').then((m) => m["default"]), "./articles/12-camadas-mapa-de-autoconhecimento.json": () => import('./12-camadas-mapa-de-autoconhecimento--cHGg21B.mjs').then((m) => m["default"]), "./articles/12-camadas-o-que-cada-camada-significa-e-o-que-nao-significa.json": () => import('./12-camadas-o-que-cada-camada-significa-e-o-que-nao-significa-eoP0AU3v.mjs').then((m) => m["default"]), "./articles/combinacoes-de-temperamentos-interpretacao-inicial.json": () => import('./combinacoes-de-temperamentos-interpretacao-inicial-CLYkJVsW.mjs').then((m) => m["default"]), "./articles/conversas-dificeis-com-empatia-e-limites.json": () => import('./conversas-dificeis-com-empatia-e-limites-CjmJ2jtB.mjs').then((m) => m["default"]), "./articles/habitos-diarios-para-mais-clareza-mental.json": () => import('./habitos-diarios-para-mais-clareza-mental-CHggQwBX.mjs').then((m) => m["default"]), "./articles/index.json": () => Promise.resolve().then(() => index).then((m) => m["default"]), "./articles/linguagens-do-amor-como-identificar-no-dia-a-dia.json": () => import('./linguagens-do-amor-como-identificar-no-dia-a-dia-DZC_ws0R.mjs').then((m) => m["default"]), "./articles/temperamento-colerico-tracos-virtudes-riscos.json": () => import('./temperamento-colerico-tracos-virtudes-riscos-B_24vtud.mjs').then((m) => m["default"]), "./articles/temperamento-fleumatico-constancia-paz-inercia.json": () => import('./temperamento-fleumatico-constancia-paz-inercia-BtZhE8xH.mjs').then((m) => m["default"]), "./articles/temperamento-melancolico-forcas-sensibilidade-equilibrio.json": () => import('./temperamento-melancolico-forcas-sensibilidade-equilibrio-DRSilU6U.mjs').then((m) => m["default"]), "./articles/temperamento-sanguineo-energia-social-virtudes-excessos.json": () => import('./temperamento-sanguineo-energia-social-virtudes-excessos-B5wBQEU1.mjs').then((m) => m["default"]), "./articles/tracos-de-personalidade-observar-sem-rotulos.json": () => import('./tracos-de-personalidade-observar-sem-rotulos-DFDpbMHh.mjs').then((m) => m["default"]), "./articles/virtudes-praticas-para-equilibrio-emocional.json": () => import('./virtudes-praticas-para-equilibrio-emocional-BlLQQZq9.mjs').then((m) => m["default"]) });
const entryBySlug = new Map(manifestEntries.map((entry) => [entry.slug, entry]));
const CATEGORY_LABELS = {
  temperamentos: "Temperamentos",
  personalidade: "Personalidade",
  "virtudes-habitos": "Virtudes e habitos",
  relacionamentos: "Relacionamentos"
};
function getAllArticles() {
  return sortedArticles;
}
async function getArticleBySlug(slug) {
  const entry = entryBySlug.get(slug);
  if (!entry) return null;
  const modulePath = `./articles/${entry.file}`;
  const loader = articleLoaders[modulePath];
  if (!loader) {
    throw new Error(`Article file not found: ${entry.file}`);
  }
  const loaded = await loader();
  const record = parseArticleRecord(loaded);
  const wordCount = countWords(extractBodyText(record.body));
  const readingMinutes = Math.max(1, Math.ceil(wordCount / 200));
  return {
    ...record,
    wordCount,
    readingMinutes
  };
}
function getArticleCategories() {
  return Array.from(new Set(sortedArticles.map((article) => article.category))).sort();
}
function getArticleTags() {
  const allTags = sortedArticles.flatMap((article) => article.tags);
  return Array.from(new Set(allTags)).sort();
}
function getCategoryLabel(category) {
  return CATEGORY_LABELS[category] ?? category;
}
function getRelatedArticles(article, limit = 3) {
  const tagSet = new Set(article.tags);
  const scored = sortedArticles.filter((candidate) => candidate.slug !== article.slug).map((candidate) => {
    const tagScore = candidate.tags.reduce(
      (total, tag) => total + (tagSet.has(tag) ? 1 : 0),
      0
    );
    const categoryScore = candidate.category === article.category ? 2 : 0;
    return {
      article: candidate,
      score: tagScore + categoryScore
    };
  }).filter((item) => item.score > 0).sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(b.article.updatedAt).getTime() - new Date(a.article.updatedAt).getTime();
  }).slice(0, limit).map((item) => item.article);
  return scored;
}
function parseManifest(value) {
  if (!isArticleManifest(value)) {
    throw new Error("Invalid articles manifest format.");
  }
  return value;
}
function parseArticleRecord(value) {
  if (!isArticleRecord(value)) {
    throw new Error("Invalid article record format.");
  }
  return value;
}
function isArticleManifest(value) {
  if (!isRecord(value)) return false;
  return Array.isArray(value.articles) && value.articles.every(isArticleManifestEntry);
}
function isArticleManifestEntry(value) {
  if (!isArticleMeta(value)) return false;
  return typeof value.file === "string";
}
function isArticleRecord(value) {
  if (!isArticleMeta(value)) return false;
  return Array.isArray(value.body) && value.body.every(isArticleBodyBlock);
}
function isArticleMeta(value) {
  if (!isRecord(value)) return false;
  return typeof value.slug === "string" && typeof value.title === "string" && typeof value.description === "string" && typeof value.category === "string" && Array.isArray(value.tags) && value.tags.every((tag) => typeof tag === "string") && typeof value.publishedAt === "string" && typeof value.updatedAt === "string" && Array.isArray(value.relatedTestSlugs) && value.relatedTestSlugs.every((slug) => typeof slug === "string") && (value.coverImage === void 0 || typeof value.coverImage === "string");
}
function isArticleBodyBlock(value) {
  if (!isRecord(value)) return false;
  const type = value.type;
  if (typeof type !== "string") return false;
  switch (type) {
    case "p":
    case "h2":
    case "h3":
      return typeof value.text === "string";
    case "quote":
      return typeof value.text === "string" && (value.cite === void 0 || typeof value.cite === "string");
    case "ul":
    case "ol":
      return Array.isArray(value.items) && value.items.every((item) => typeof item === "string");
    default:
      return false;
  }
}
function isRecord(value) {
  return typeof value === "object" && value !== null;
}
function extractBodyText(blocks) {
  return blocks.map((block) => blockToText(block)).join(" ");
}
function blockToText(block) {
  switch (block.type) {
    case "p":
    case "h2":
    case "h3":
      return block.text;
    case "quote":
      return block.cite ? `${block.text} ${block.cite}` : block.text;
    case "ul":
    case "ol":
      return block.items.join(" ");
    default:
      return "";
  }
}
function countWords(text) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return 0;
  return normalized.split(" ").length;
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ArticleCard",
  __ssrInlineRender: true,
  props: {
    article: {}
  },
  setup(__props) {
    const props = __props;
    const { t } = useI18n();
    const categoryLabel = computed(() => getCategoryLabel(props.article.category));
    const formattedDate = computed(() => formatDate(props.article.updatedAt));
    function formatDate(value) {
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return value;
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: `/artigos/${__props.article.slug}`,
        class: "group flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-3"${_scopeId}><div class="flex flex-wrap items-center justify-between gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400"${_scopeId}><span${_scopeId}>${ssrInterpolate(categoryLabel.value)}</span><span class="text-slate-400"${_scopeId}>${ssrInterpolate(formattedDate.value)}</span></div><h3 class="text-lg font-semibold text-slate-900 transition group-hover:text-indigo-700 dark:text-slate-50 dark:group-hover:text-amber-300"${_scopeId}>${ssrInterpolate(__props.article.title)}</h3><p class="text-sm text-slate-600 dark:text-slate-300"${_scopeId}>${ssrInterpolate(__props.article.description)}</p></div><span class="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-amber-300"${_scopeId}>${ssrInterpolate(unref(t)("common.actions.readArticle"))}</span>`);
          } else {
            return [
              createVNode("div", { class: "space-y-3" }, [
                createVNode("div", { class: "flex flex-wrap items-center justify-between gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400" }, [
                  createVNode("span", null, toDisplayString(categoryLabel.value), 1),
                  createVNode("span", { class: "text-slate-400" }, toDisplayString(formattedDate.value), 1)
                ]),
                createVNode("h3", { class: "text-lg font-semibold text-slate-900 transition group-hover:text-indigo-700 dark:text-slate-50 dark:group-hover:text-amber-300" }, toDisplayString(__props.article.title), 1),
                createVNode("p", { class: "text-sm text-slate-600 dark:text-slate-300" }, toDisplayString(__props.article.description), 1)
              ]),
              createVNode("span", { class: "mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-amber-300" }, toDisplayString(unref(t)("common.actions.readArticle")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/articles/ArticleCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ArticleCard = Object.assign(_sfc_main, { __name: "ArticlesArticleCard" });

export { ArticleCard as A, getArticleTags as a, getAllArticles as b, getCategoryLabel as c, getArticleBySlug as d, getRelatedArticles as e, getArticleCategories as g };
//# sourceMappingURL=ArticleCard-5A0TYOxQ.mjs.map
