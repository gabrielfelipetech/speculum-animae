import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';

const global = [{ "q": "O que e o Speculum Animae?", "a": "E uma plataforma de testes de autoconhecimento com foco em personalidade, temperamentos e virtudes." }, { "q": "Os testes sao diagnosticos clinicos?", "a": "Nao. Os testes sao informativos e nao substituem avaliacao profissional." }, { "q": "Preciso criar conta para usar?", "a": "Voce pode iniciar sem conta, mas recursos de historico e salvamento exigem login." }, { "q": "Meus dados ficam salvos?", "a": "Se voce estiver logado, o sistema pode salvar seu historico. Dados nao sao vendidos." }, { "q": "Posso refazer um teste?", "a": "Sim. Voce pode refazer quando quiser para comparar resultados." }, { "q": "Quanto tempo leva cada teste?", "a": "Em media de 5 a 15 minutos, dependendo do numero de afirmacoes." }, { "q": "Como interpretar os resultados?", "a": "Use como ponto de partida. Leia as descricoes e reflita sobre exemplos reais do seu dia." }, { "q": "Existe opcao de PDF?", "a": "Quando um teste oferecer relatorio em PDF, o botao aparecera no resultado." }, { "q": "Os dados sao privados?", "a": "Sim. Usamos boas praticas de seguranca e nao compartilhamos dados sem consentimento." }, { "q": "Havera novos testes?", "a": "Sim. A plataforma e evolutiva e novos instrumentos serao adicionados." }];
const byTest = { "temperamentos-classicos": [{ "q": "Temperamento e o mesmo que personalidade?", "a": "Nao. Temperamento descreve tendencias basicas; personalidade inclui historia, escolhas e contexto." }, { "q": "Posso ter mais de um temperamento forte?", "a": "Sim. Combinacoes sao comuns e ajudam a explicar variacoes no comportamento." }, { "q": "O resultado muda com o tempo?", "a": "Pode mudar com experiencias, habitos e maturidade emocional." }, { "q": "Como usar o resultado no dia a dia?", "a": "Observe gatilhos, identifique excessos e pratique ajustes pequenos e constantes." }, { "q": "Qual a diferenca entre colerico e sanguineo?", "a": "O colerico tende a ser mais diretivo e focado em metas; o sanguineo e mais sociavel e espontaneo." }, { "q": "Este teste define quem eu sou?", "a": "Nao. E um retrato do momento, util para reflexao, nao um rotulo fixo." }], "12-camadas": [{ "q": "O que sao as 12 camadas?", "a": "Sao niveis que organizam aspectos internos para ajudar na autoobservacao." }, { "q": "Preciso responder tudo de uma vez?", "a": "O ideal e responder em uma sessao para manter consistencia." }, { "q": "Como o teste calcula os resultados?", "a": "Ele usa a media das afirmacoes dentro de cada grupo de camadas." }, { "q": "Por que algumas perguntas parecem parecidas?", "a": "Isso ajuda a validar o tema e captar nuances de percepcao." }, { "q": "Como usar o resultado na pratica?", "a": "Compare as camadas mais altas e mais baixas e observe onde ajustar habitos." }, { "q": "Posso refazer para acompanhar mudancas?", "a": "Sim. Repetir o teste ajuda a acompanhar evolucao pessoal." }] };
const faqData = {
  global,
  byTest
};
const payload = faqData;
const FAQ_SLUG_ALIASES = {
  "twelve-layers": "12-camadas",
  temperaments: "temperamentos-classicos",
  "temperaments-compatibility": "temperament-compatibility"
};
function getGlobalFaq() {
  return payload.global.slice();
}
function getFaqByTestSlug(slug) {
  const direct = payload.byTest[slug];
  if (direct) return direct.slice();
  const alias = FAQ_SLUG_ALIASES[slug];
  if (!alias) return [];
  return payload.byTest[alias]?.slice() ?? [];
}
function buildFaqSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a
      }
    }))
  };
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FaqAccordion",
  __ssrInlineRender: true,
  props: {
    items: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-3" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(`<details class="rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm transition dark:border-slate-800 dark:bg-slate-900/80"><summary class="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-slate-800 dark:text-slate-100"><span>${ssrInterpolate(item.q)}</span><span class="text-xs font-semibold text-slate-400 dark:text-slate-500">+</span></summary><p class="mt-2 text-sm text-slate-600 dark:text-slate-300">${ssrInterpolate(item.a)}</p></details>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/faq/FaqAccordion.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const FaqAccordion = Object.assign(_sfc_main$1, { __name: "FaqAccordion" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FaqSection",
  __ssrInlineRender: true,
  props: {
    title: {},
    items: {},
    description: {},
    kicker: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><header class="space-y-2">`);
      if (__props.kicker) {
        _push(`<p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">${ssrInterpolate(__props.kicker)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h2 class="font-display text-2xl tracking-tight text-slate-900 dark:text-slate-50">${ssrInterpolate(__props.title)}</h2>`);
      if (__props.description) {
        _push(`<p class="text-sm text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
      _push(ssrRenderComponent(FaqAccordion, { items: __props.items }, null, _parent));
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/faq/FaqSection.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const FaqSection = Object.assign(_sfc_main, { __name: "FaqSection" });

export { FaqSection as F, getFaqByTestSlug as a, buildFaqSchema as b, getGlobalFaq as g };
//# sourceMappingURL=FaqSection-CdJoqg28.mjs.map
