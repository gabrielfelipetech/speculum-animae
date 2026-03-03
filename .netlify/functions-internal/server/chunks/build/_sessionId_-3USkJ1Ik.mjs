import { a as useSeoMeta, d as useRoute, f as useLazyAsyncData, S as SkeletonBlock, _ as __nuxt_component_0$1, i as useRouter, e as useSupabaseUser, B as BaseButton } from './server.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createTextVNode, ref, resolveDirective, createBlock, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrGetDirectiveProps, ssrRenderList, ssrRenderStyle, ssrRenderSlot, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { g as getSupabaseAccessToken } from './authToken-u3KDyLrx.mjs';
import { u as useReveal } from './useReveal-DIep_XVD.mjs';
import { b as buildUserActorKey, a as buildClientActorKey, g as getOrCreateClientId, d as clearLastResultId } from './actorKey-DUnMpcbL.mjs';
import '../_/nitro.mjs';
import '@bugsnag/js';
import '@supabase/ssr';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vue-router';
import 'node:fs';
import 'node:path';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'better-sqlite3';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "PremiumBlock",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const supabaseUser = useSupabaseUser();
    const isDownloading = ref(false);
    computed(() => {
      const raw = supabaseUser.value?.id;
      return typeof raw === "string" && /^[0-9a-f-]{36}$/i.test(raw);
    });
    const sessionId = computed(() => {
      const raw = route.params.sessionId;
      if (typeof raw === "string") return raw;
      if (Array.isArray(raw)) return raw[0];
      return null;
    });
    function handleUnlock() {
      if (isDownloading.value) return;
      return;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative mt-4" }, _attrs))}><div class="pointer-events-none select-none blur-sm opacity-35 text-slate-700 dark:text-slate-200" aria-hidden="true">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`<div class="h-20"></div></div><div class="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-white/60 via-white/80 to-white dark:from-slate-900/60 dark:via-slate-900/80 dark:to-slate-900"><div class="w-full max-w-md rounded-2xl border border-amber-300 bg-amber-50 px-6 py-5 text-center text-xs shadow-lg dark:border-amber-500/60 dark:bg-amber-900"><p class="text-sm font-bold text-amber-900 dark:text-amber-100"> Conteúdo disponível no relatório completo </p><p class="mt-2 text-xs leading-relaxed text-amber-900/80 dark:text-amber-100/80"> Desbloqueie o PDF premium para ler esta análise detalhada, com recomendações práticas e interpretações avançadas. </p>`);
      _push(ssrRenderComponent(BaseButton, {
        type: "button",
        disabled: !sessionId.value || isDownloading.value,
        variant: "gradient",
        class: "mt-4 rounded-full",
        onClick: handleUnlock
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (isDownloading.value) {
              _push2(`<span${_scopeId}>Gerando PDF...</span>`);
            } else {
              _push2(`<span${_scopeId}>Desbloquear relatório</span>`);
            }
          } else {
            return [
              isDownloading.value ? (openBlock(), createBlock("span", { key: 0 }, "Gerando PDF...")) : (openBlock(), createBlock("span", { key: 1 }, "Desbloquear relatório"))
            ];
          }
        }),
        _: 1
      }, _parent));
      if (isDownloading.value) {
        _push(ssrRenderComponent(SkeletonBlock, { class: "mx-auto mt-3 h-3 w-2/3" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/results/PremiumBlock.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const PremiumBlock = Object.assign(_sfc_main$b, { __name: "ResultsPremiumBlock" });
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "ResultsSection",
  __ssrInlineRender: true,
  props: {
    id: {},
    title: {},
    subtitle: {},
    blocks: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: __props.id,
        class: "space-y-4 rounded-2xl border border-slate-200/80 bg-white/90 p-5 dark:border-slate-800 dark:bg-slate-900/90"
      }, _attrs))}><header class="space-y-1"><h2 class="font-display text-xl tracking-tight">${ssrInterpolate(__props.title)}</h2>`);
      if (__props.subtitle) {
        _push(`<p class="text-xs text-slate-500 dark:text-slate-400">${ssrInterpolate(__props.subtitle)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
      if (_ctx.$slots.default) {
        _push(`<div class="pt-2">`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="space-y-4 pt-2"><!--[-->`);
      ssrRenderList(__props.blocks, (block) => {
        _push(`<article class="rounded-xl border border-slate-100/80 bg-slate-50/60 p-4 text-sm dark:border-slate-800 dark:bg-slate-900/80">`);
        if (block.title) {
          _push(`<h3 class="mb-1 text-[0.9rem] font-semibold">${ssrInterpolate(block.title)}</h3>`);
        } else {
          _push(`<!---->`);
        }
        if (block.access === "free") {
          _push(`<p class="text-slate-700 dark:text-slate-200">${ssrInterpolate(block.body)}</p>`);
        } else {
          _push(ssrRenderComponent(PremiumBlock, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(block.body)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(block.body), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        }
        _push(`</article>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/results/ResultsSection.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const ResultsSection = Object.assign(_sfc_main$a, { __name: "ResultsSection" });
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "ResultsSidebarLink",
  __ssrInlineRender: true,
  props: {
    href: {},
    label: {},
    number: {},
    icon: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<a${ssrRenderAttrs(mergeProps({
        href: __props.href,
        class: "flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
      }, _attrs))}>`);
      if (__props.number) {
        _push(`<span class="flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 text-[0.65rem] dark:border-slate-600">${ssrInterpolate(__props.number)}</span>`);
      } else if (__props.icon === "lock") {
        _push(`<span class="flex h-5 w-5 items-center justify-center"> 🔒 </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span>${ssrInterpolate(__props.label)}</span></a>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/results/ResultsSidebarLink.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const ResultsSidebarLink = Object.assign(_sfc_main$9, { __name: "ResultsSidebarLink" });
const sectionDelayBase$2 = 200;
const sectionDelayStep$2 = 80;
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "TwelveLayersResultView",
  __ssrInlineRender: true,
  props: {
    report: {},
    testSlug: {}
  },
  setup(__props) {
    const props = __props;
    const report = props.report;
    const router = useRouter();
    const supabaseUser = useSupabaseUser();
    const isDownloading = ref(false);
    const testSlug = computed(() => props.testSlug ?? null);
    const actorKey = computed(() => {
      const userKey = buildUserActorKey(supabaseUser.value?.id ?? null);
      if (userKey) return userKey;
      return buildClientActorKey(getOrCreateClientId());
    });
    computed(() => {
      const raw = supabaseUser.value?.id;
      return typeof raw === "string" && /^[0-9a-f-]{36}$/i.test(raw);
    });
    ref(null);
    const { revealNow } = useReveal();
    const ctaDelay = sectionDelayBase$2 + sectionDelayStep$2 * 4;
    const nextStepDelay = ctaDelay + sectionDelayStep$2;
    function handleRetake() {
      if (!testSlug.value) return;
      clearLastResultId(testSlug.value, actorKey.value);
      router.push({ path: `/testes/${testSlug.value}`, query: { fresh: "1" } });
    }
    function downloadPdf() {
      if (isDownloading.value || true) return;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_reveal = resolveDirective("reveal");
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "mx-auto flex max-w-6xl gap-8 px-4 py-10" }, _attrs))}><div class="flex-1 space-y-8"><header id="overview" class="rounded-3xl bg-gradient-to-br from-amber-200/60 to-amber-50 p-6 dark:from-amber-900/30 dark:to-slate-900/80 reveal"><div class="flex flex-wrap items-start justify-between gap-4"><div><p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"> Seu retrato nas 12 camadas </p><h1 class="mt-2 font-display text-3xl tracking-tight md:text-4xl">${ssrInterpolate(unref(report).overall.title)}</h1><p class="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">${ssrInterpolate(unref(report).overall.subtitle)}</p></div></div></header>`);
      if (unref(report).traits.graph?.length) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "rounded-2xl border border-slate-200/80 bg-white/90 p-5 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/80 reveal" }, ssrGetDirectiveProps(_ctx, _directive_reveal, 120)))}><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> Mapa das 12 camadas </h2><p class="mt-1 text-xs text-slate-500 dark:text-slate-400"> Cada barra representa a intensidade média de uma camada na sua personalidade (escala de 0 a 10). </p><div class="mt-4 space-y-3"><!--[-->`);
        ssrRenderList(unref(report).traits.graph, (point) => {
          _push(`<div class="space-y-1"><div class="flex items-center justify-between text-[0.7rem]"><span class="font-medium text-slate-700 dark:text-slate-200">${ssrInterpolate(point.label)}</span><span class="text-slate-500 dark:text-slate-400">${ssrInterpolate(point.value.toFixed(2))} / 10 </span></div><div class="h-2 rounded-full bg-slate-200/80 dark:bg-slate-800/80"><div class="h-2 rounded-full bg-amber-500 dark:bg-amber-400" style="${ssrRenderStyle({ width: `${point.value / 10 * 100}%` })}"></div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(ResultsSection, mergeProps({
        id: "traits",
        title: "1. Traços de personalidade",
        blocks: unref(report).traits.blocks,
        class: "reveal"
      }, ssrGetDirectiveProps(_ctx, _directive_reveal, sectionDelayBase$2)), null, _parent));
      _push(ssrRenderComponent(ResultsSection, mergeProps({
        id: "career",
        title: "2. Carreira",
        blocks: unref(report).career.blocks,
        class: "reveal"
      }, ssrGetDirectiveProps(_ctx, _directive_reveal, sectionDelayBase$2 + sectionDelayStep$2)), null, _parent));
      _push(ssrRenderComponent(ResultsSection, mergeProps({
        id: "growth",
        title: "3. Crescimento pessoal",
        blocks: unref(report).growth.blocks,
        class: "reveal"
      }, ssrGetDirectiveProps(_ctx, _directive_reveal, sectionDelayBase$2 + sectionDelayStep$2 * 2)), null, _parent));
      _push(ssrRenderComponent(ResultsSection, mergeProps({
        id: "relationships",
        title: "4. Relacionamentos",
        blocks: unref(report).relationships.blocks,
        class: "reveal"
      }, ssrGetDirectiveProps(_ctx, _directive_reveal, sectionDelayBase$2 + sectionDelayStep$2 * 3)), null, _parent));
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "relatorio-completo",
        class: "mt-6 rounded-2xl border border-amber-300/70 bg-amber-50/80 p-5 text-sm dark:border-amber-500/50 dark:bg-amber-900/20 reveal"
      }, ssrGetDirectiveProps(_ctx, _directive_reveal, ctaDelay)))}><h2 class="font-semibold text-amber-900 dark:text-amber-100"> Desbloqueie o relatório PDF completo </h2><p class="mt-1 text-slate-700 dark:text-slate-200"> Veja todas as interpretações detalhadas, exemplos práticos, combinações entre camadas e um plano de crescimento passo a passo baseado no seu resultado. </p>`);
      _push(ssrRenderComponent(BaseButton, {
        type: "button",
        variant: "gradient",
        class: "mt-4 rounded-full",
        disabled: isDownloading.value,
        onClick: downloadPdf
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (isDownloading.value) {
              _push2(`<span${_scopeId}>Gerando PDF...</span>`);
            } else {
              _push2(`<span${_scopeId}>Baixar relatório completo (PDF)</span>`);
            }
          } else {
            return [
              isDownloading.value ? (openBlock(), createBlock("span", { key: 0 }, "Gerando PDF...")) : (openBlock(), createBlock("span", { key: 1 }, "Baixar relatório completo (PDF)"))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (testSlug.value) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "rounded-2xl border border-slate-200/80 bg-white/90 p-5 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/80 reveal" }, ssrGetDirectiveProps(_ctx, _directive_reveal, nextStepDelay)))}><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> Proximo passo </h2><p class="mt-1 text-xs text-slate-500 dark:text-slate-300"> Refaca o teste para gerar um novo resultado atualizado. </p>`);
        _push(ssrRenderComponent(BaseButton, {
          type: "button",
          class: "mt-3 rounded-full text-xs font-semibold uppercase tracking-[0.18em]",
          onClick: handleRetake
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Refazer teste `);
            } else {
              return [
                createTextVNode(" Refazer teste ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><aside class="sticky top-4 hidden w-64 self-start rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 md:block"><p class="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"> Nesta página </p><nav class="mt-3 space-y-1 text-sm">`);
      _push(ssrRenderComponent(ResultsSidebarLink, {
        href: "#overview",
        label: "Resumo geral",
        number: "1"
      }, null, _parent));
      _push(ssrRenderComponent(ResultsSidebarLink, {
        href: "#traits",
        label: "Traços de personalidade",
        number: "2"
      }, null, _parent));
      _push(ssrRenderComponent(ResultsSidebarLink, {
        href: "#career",
        label: "Carreira",
        number: "3"
      }, null, _parent));
      _push(ssrRenderComponent(ResultsSidebarLink, {
        href: "#growth",
        label: "Crescimento pessoal",
        number: "4"
      }, null, _parent));
      _push(ssrRenderComponent(ResultsSidebarLink, {
        href: "#relationships",
        label: "Relacionamentos",
        number: "5"
      }, null, _parent));
      _push(ssrRenderComponent(ResultsSidebarLink, {
        href: "#relatorio-completo",
        label: "Relatório completo (PDF)",
        icon: "lock"
      }, null, _parent));
      _push(`</nav></aside></section>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/results/TwelveLayersResultView.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const TwelveLayersResultsView = Object.assign(_sfc_main$8, { __name: "ResultsTwelveLayersResultView" });
const sectionDelayBase$1 = 200;
const sectionDelayStep$1 = 80;
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "TemperamentsResultView",
  __ssrInlineRender: true,
  props: {
    report: {},
    sessionId: {},
    testSlug: {}
  },
  setup(__props) {
    const props = __props;
    const report = props.report;
    const router = useRouter();
    const supabaseUser = useSupabaseUser();
    const testSlug = computed(() => props.testSlug ?? null);
    const isDownloading = ref(false);
    ref(null);
    const { revealNow } = useReveal();
    const ctaDelay = sectionDelayBase$1 + sectionDelayStep$1 * 4;
    const nextStepDelay = ctaDelay + sectionDelayStep$1;
    computed(() => {
      const raw = supabaseUser.value?.id;
      return typeof raw === "string" && /^[0-9a-f-]{36}$/i.test(raw);
    });
    const actorKey = computed(() => {
      const userKey = buildUserActorKey(supabaseUser.value?.id ?? null);
      if (userKey) return userKey;
      return buildClientActorKey(getOrCreateClientId());
    });
    function downloadPdf() {
      if (isDownloading.value) return;
    }
    function handleRetake() {
      if (!testSlug.value) return;
      clearLastResultId(testSlug.value, actorKey.value);
      router.push({ path: `/testes/${testSlug.value}`, query: { fresh: "1" } });
    }
    const graphPoints = computed(() => {
      const scores = report.temperament.scores?.length ? report.temperament.scores : [
        report.temperament.primary,
        ...report.temperament.secondary ? [report.temperament.secondary] : []
      ];
      return [...scores].sort((a, b) => b.average - a.average).map((item) => ({
        label: item.name,
        base10: item.average
      }));
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_reveal = resolveDirective("reveal");
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "mx-auto flex max-w-6xl gap-8 px-4 py-10" }, _attrs))}><div class="flex-1 space-y-8"><header id="overview" class="rounded-3xl bg-gradient-to-br from-emerald-200/60 to-emerald-50 p-6 dark:from-emerald-900/30 dark:to-slate-900/80 reveal"><div class="flex flex-wrap items-start justify-between gap-4"><div><p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400"> Retrato de temperamento </p><h1 class="mt-2 font-display text-3xl tracking-tight md:text-4xl">${ssrInterpolate(unref(report).overall.title)}</h1><p class="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">${ssrInterpolate(unref(report).overall.subtitle)}</p></div></div></header><div${ssrRenderAttrs(mergeProps({ class: "rounded-2xl border border-slate-200/80 bg-white/90 p-5 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/80 reveal" }, ssrGetDirectiveProps(_ctx, _directive_reveal, 120)))}><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> Intensidade dos temperamentos </h2><p class="mt-1 text-xs text-slate-500 dark:text-slate-400"> Cada barra mostra o quanto cada temperamento aparece em você. Os valores foram convertidos para uma escala de 0 a 10. </p><div class="mt-4 space-y-3"><!--[-->`);
      ssrRenderList(graphPoints.value, (score) => {
        _push(`<div class="space-y-1"><div class="flex items-center justify-between text-[0.7rem]"><span class="font-medium text-slate-700 dark:text-slate-200">${ssrInterpolate(score.label)}</span><span class="text-slate-500 dark:text-slate-400"> Media (0-10): ${ssrInterpolate(score.base10.toFixed(2))}</span></div><div class="h-2 rounded-full bg-slate-200/80 dark:bg-slate-800/80"><div class="h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" style="${ssrRenderStyle({ width: `${score.base10 / 10 * 100}%` })}"></div></div></div>`);
      });
      _push(`<!--]--></div></div>`);
      _push(ssrRenderComponent(ResultsSection, mergeProps({
        id: "traits",
        title: "1. Traços e dinâmica do temperamento",
        blocks: unref(report).traits.blocks,
        class: "reveal"
      }, ssrGetDirectiveProps(_ctx, _directive_reveal, sectionDelayBase$1)), null, _parent));
      _push(ssrRenderComponent(ResultsSection, mergeProps({
        id: "career",
        title: "2. Carreira, ambição e estilo de trabalho",
        blocks: unref(report).career.blocks,
        class: "reveal"
      }, ssrGetDirectiveProps(_ctx, _directive_reveal, sectionDelayBase$1 + sectionDelayStep$1)), null, _parent));
      _push(ssrRenderComponent(ResultsSection, mergeProps({
        id: "growth",
        title: "3. Crescimento, virtudes e estresse",
        blocks: unref(report).growth.blocks,
        class: "reveal"
      }, ssrGetDirectiveProps(_ctx, _directive_reveal, sectionDelayBase$1 + sectionDelayStep$1 * 2)), null, _parent));
      _push(ssrRenderComponent(ResultsSection, mergeProps({
        id: "relationships",
        title: "4. Relacionamentos e afetividade",
        blocks: unref(report).relationships.blocks,
        class: "reveal"
      }, ssrGetDirectiveProps(_ctx, _directive_reveal, sectionDelayBase$1 + sectionDelayStep$1 * 3)), null, _parent));
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "relatorio-completo",
        class: "mt-6 rounded-2xl border border-emerald-300/70 bg-emerald-50/80 p-5 text-sm dark:border-emerald-500/50 dark:bg-emerald-900/20 reveal"
      }, ssrGetDirectiveProps(_ctx, _directive_reveal, ctaDelay)))}><h2 class="font-semibold text-emerald-900 dark:text-emerald-100"> Relatório PDF completo de temperamentos </h2><p class="mt-1 text-slate-700 dark:text-slate-200"> No PDF você terá a leitura aprofundada do seu temperamento principal e secundário, riscos típicos, virtudes-chave, sugestões para trabalho, família e vida afetiva. </p>`);
      _push(ssrRenderComponent(BaseButton, {
        type: "button",
        variant: "gradient",
        class: "mt-4 rounded-full",
        disabled: isDownloading.value,
        onClick: downloadPdf
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (isDownloading.value) {
              _push2(`<span${_scopeId}>Gerando PDF...</span>`);
            } else {
              _push2(`<span${_scopeId}>Baixar relatório completo (PDF)</span>`);
            }
          } else {
            return [
              isDownloading.value ? (openBlock(), createBlock("span", { key: 0 }, "Gerando PDF...")) : (openBlock(), createBlock("span", { key: 1 }, "Baixar relatório completo (PDF)"))
            ];
          }
        }),
        _: 1
      }, _parent));
      if (isDownloading.value) {
        _push(ssrRenderComponent(SkeletonBlock, { class: "mt-3 h-3 w-2/3" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (testSlug.value) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "rounded-2xl border border-slate-200/80 bg-white/90 p-5 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/80 reveal" }, ssrGetDirectiveProps(_ctx, _directive_reveal, nextStepDelay)))}><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> Proximo passo </h2><p class="mt-1 text-xs text-slate-500 dark:text-slate-300"> Refaca o teste para gerar um novo resultado atualizado. </p>`);
        _push(ssrRenderComponent(BaseButton, {
          type: "button",
          class: "mt-3 rounded-full text-xs font-semibold uppercase tracking-[0.18em]",
          onClick: handleRetake
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Refazer teste `);
            } else {
              return [
                createTextVNode(" Refazer teste ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><aside class="sticky top-4 hidden w-64 self-start rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 md:block"><p class="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"> Nesta página </p><nav class="mt-3 space-y-1 text-sm">`);
      _push(ssrRenderComponent(ResultsSidebarLink, {
        href: "#overview",
        label: "Visão geral",
        number: "1"
      }, null, _parent));
      _push(ssrRenderComponent(ResultsSidebarLink, {
        href: "#traits",
        label: "Traços e comportamento",
        number: "2"
      }, null, _parent));
      _push(ssrRenderComponent(ResultsSidebarLink, {
        href: "#career",
        label: "Carreira",
        number: "3"
      }, null, _parent));
      _push(ssrRenderComponent(ResultsSidebarLink, {
        href: "#growth",
        label: "Crescimento pessoal",
        number: "4"
      }, null, _parent));
      _push(ssrRenderComponent(ResultsSidebarLink, {
        href: "#relationships",
        label: "Relacionamentos",
        number: "5"
      }, null, _parent));
      _push(ssrRenderComponent(ResultsSidebarLink, {
        href: "#relatorio-completo",
        label: "Relatório completo (PDF)",
        icon: "lock"
      }, null, _parent));
      _push(`</nav></aside></section>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/results/TemperamentsResultView.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const TemperamentsResultsView = Object.assign(_sfc_main$7, { __name: "ResultsTemperamentsResultView" });
const sectionDelayBase = 400;
const sectionDelayStep = 80;
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "AssessmentResultsView",
  __ssrInlineRender: true,
  props: {
    report: {},
    testSlug: {},
    theme: {}
  },
  setup(__props) {
    const props = __props;
    const router = useRouter();
    const supabaseUser = useSupabaseUser();
    const report = props.report;
    const theme = props.theme;
    const isDownloading = ref(false);
    const testSlug = computed(() => props.testSlug ?? null);
    const actorKey = computed(() => {
      const userKey = buildUserActorKey(supabaseUser.value?.id ?? null);
      if (userKey) return userKey;
      return buildClientActorKey(getOrCreateClientId());
    });
    ref(null);
    const { revealNow } = useReveal();
    const ids = {
      overview: "overview",
      summary: "summary",
      scores: "scores",
      recommendations: "recommendations"
    };
    const sidebarSections = computed(() => report.sections ?? []);
    const sectionsCount = computed(() => report.sections?.length ?? 0);
    const canDownloadPdf = computed(
      () => report.kind === "temperamentCompatibility"
    );
    computed(() => {
      const raw = supabaseUser.value?.id;
      return typeof raw === "string" && /^[0-9a-f-]{36}$/i.test(raw);
    });
    const nextStepDelay = computed(
      () => sectionDelayBase + sectionDelayStep * (sectionsCount.value + 1)
    );
    function handleRetake() {
      if (!testSlug.value) return;
      clearLastResultId(testSlug.value, actorKey.value);
      router.push({ path: `/testes/${testSlug.value}`, query: { fresh: "1" } });
    }
    function downloadPdf() {
      if (!canDownloadPdf.value || isDownloading.value || true) return;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_reveal = resolveDirective("reveal");
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "mx-auto flex max-w-6xl gap-8 px-4 py-10" }, _attrs))}><div class="flex-1 space-y-8"><header${ssrRenderAttr("id", ids.overview)} class="${ssrRenderClass(["rounded-3xl p-6", unref(theme).heroClass, "reveal"])}"><div class="flex flex-wrap items-start justify-between gap-4"><div><p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">${ssrInterpolate(unref(theme).kicker)}</p><h1 class="mt-2 font-display text-3xl tracking-tight md:text-4xl">${ssrInterpolate(unref(report).title)}</h1><p class="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">${ssrInterpolate(unref(report).subtitle)}</p></div></div></header>`);
      if (unref(report).disclaimer) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "rounded-2xl border border-amber-200/70 bg-amber-50/80 p-4 text-xs text-amber-900 dark:border-amber-500/40 dark:bg-amber-900/20 dark:text-amber-100 reveal" }, ssrGetDirectiveProps(_ctx, _directive_reveal, 80)))}>${ssrInterpolate(unref(report).disclaimer)}</section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: ids.summary,
        class: "rounded-2xl border border-slate-200/80 bg-white/90 p-5 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/80 reveal"
      }, ssrGetDirectiveProps(_ctx, _directive_reveal, 160)))}><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> Resumo do perfil </h2><ul class="mt-3 space-y-2 text-xs text-slate-600 dark:text-slate-300"><!--[-->`);
      ssrRenderList(unref(report).summary, (item, index) => {
        _push(`<li class="flex gap-2"><span class="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-300"></span><span>${ssrInterpolate(item)}</span></li>`);
      });
      _push(`<!--]--></ul></section>`);
      if (unref(report).scores.length) {
        _push(`<section${ssrRenderAttrs(mergeProps({
          id: ids.scores,
          class: "rounded-2xl border border-slate-200/80 bg-white/90 p-5 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/80 reveal"
        }, ssrGetDirectiveProps(_ctx, _directive_reveal, 240)))}><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> Pontuacao por dimensao </h2><p class="mt-1 text-xs text-slate-500 dark:text-slate-400"> Valores na escala de 0 a 10 para cada dimensao avaliada. </p><div class="mt-4 space-y-3"><!--[-->`);
        ssrRenderList(unref(report).scores, (point) => {
          _push(`<div class="space-y-1"><div class="flex items-center justify-between text-[0.7rem]"><span class="font-medium text-slate-700 dark:text-slate-200">${ssrInterpolate(point.label)}</span><span class="text-slate-500 dark:text-slate-400">${ssrInterpolate(point.raw.toFixed(2))} / 10 </span></div><div class="h-2 rounded-full bg-slate-200/80 dark:bg-slate-800/80"><div class="${ssrRenderClass([unref(theme).barClass, "h-2 rounded-full"])}" style="${ssrRenderStyle({ width: `${point.normalized}%` })}"></div></div></div>`);
        });
        _push(`<!--]--></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: ids.recommendations,
        class: "rounded-2xl border border-slate-200/80 bg-white/90 p-5 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/80 reveal"
      }, ssrGetDirectiveProps(_ctx, _directive_reveal, 320)))}><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> Recomendacoes praticas </h2><ul class="mt-3 space-y-2 text-xs text-slate-600 dark:text-slate-300"><!--[-->`);
      ssrRenderList(unref(report).recommendations, (item, index) => {
        _push(`<li class="flex gap-2"><span class="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400 dark:bg-emerald-300"></span><span>${ssrInterpolate(item)}</span></li>`);
      });
      _push(`<!--]--></ul></section><!--[-->`);
      ssrRenderList(unref(report).sections ?? [], (section, index) => {
        _push(ssrRenderComponent(ResultsSection, mergeProps({
          id: section.id,
          key: section.id,
          title: section.title,
          subtitle: section.subtitle,
          blocks: section.blocks,
          class: "reveal"
        }, ssrGetDirectiveProps(_ctx, _directive_reveal, sectionDelayBase + sectionDelayStep * index)), null, _parent));
      });
      _push(`<!--]-->`);
      if (canDownloadPdf.value) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "rounded-2xl border border-rose-300/70 bg-rose-50/80 p-5 text-sm dark:border-rose-500/40 dark:bg-rose-900/20 reveal" }, ssrGetDirectiveProps(_ctx, _directive_reveal, nextStepDelay.value + 80)))}><h2 class="text-base font-semibold text-rose-900 dark:text-rose-100"> Relatorio PDF completo </h2><p class="mt-1 text-xs text-slate-600 dark:text-slate-300"> Gere o PDF com analise detalhada e plano pratico de ajustes em escala 0-10. </p>`);
        _push(ssrRenderComponent(BaseButton, {
          type: "button",
          variant: "gradient",
          class: "mt-3 rounded-full",
          disabled: isDownloading.value,
          onClick: downloadPdf
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (isDownloading.value) {
                _push2(`<span${_scopeId}>Gerando PDF...</span>`);
              } else {
                _push2(`<span${_scopeId}>Baixar relatorio completo (PDF)</span>`);
              }
            } else {
              return [
                isDownloading.value ? (openBlock(), createBlock("span", { key: 0 }, "Gerando PDF...")) : (openBlock(), createBlock("span", { key: 1 }, "Baixar relatorio completo (PDF)"))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</section>`);
      } else {
        _push(`<!---->`);
      }
      if (testSlug.value) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "rounded-2xl border border-slate-200/80 bg-white/90 p-5 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/80 reveal" }, ssrGetDirectiveProps(_ctx, _directive_reveal, nextStepDelay.value)))}><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> Proximo passo </h2><p class="mt-1 text-xs text-slate-500 dark:text-slate-300"> Refaca o teste para gerar um novo resultado atualizado. </p>`);
        _push(ssrRenderComponent(BaseButton, {
          type: "button",
          class: "mt-3 rounded-full text-xs font-semibold uppercase tracking-[0.18em]",
          onClick: handleRetake
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Refazer teste `);
            } else {
              return [
                createTextVNode(" Refazer teste ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><aside class="sticky top-4 hidden w-64 self-start rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 md:block"><p class="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"> Nesta pagina </p><nav class="mt-3 space-y-1 text-sm">`);
      _push(ssrRenderComponent(ResultsSidebarLink, {
        href: `#${ids.overview}`,
        label: "Visao geral",
        number: "1"
      }, null, _parent));
      _push(ssrRenderComponent(ResultsSidebarLink, {
        href: `#${ids.summary}`,
        label: "Resumo",
        number: "2"
      }, null, _parent));
      _push(ssrRenderComponent(ResultsSidebarLink, {
        href: `#${ids.scores}`,
        label: "Pontuacoes",
        number: "3"
      }, null, _parent));
      _push(ssrRenderComponent(ResultsSidebarLink, {
        href: `#${ids.recommendations}`,
        label: "Recomendacoes",
        number: "4"
      }, null, _parent));
      _push(`<!--[-->`);
      ssrRenderList(sidebarSections.value, (section, index) => {
        _push(ssrRenderComponent(ResultsSidebarLink, {
          key: section.id,
          href: `#${section.id}`,
          label: section.title,
          number: String(index + 5)
        }, null, _parent));
      });
      _push(`<!--]--></nav></aside></section>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/results/AssessmentResultsView.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const AssessmentResultsView = Object.assign(_sfc_main$6, { __name: "ResultsAssessmentResultsView" });
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "PersonalityResultsView",
  __ssrInlineRender: true,
  props: {
    report: {},
    testSlug: {}
  },
  setup(__props) {
    const props = __props;
    const report = props.report;
    const testSlug = props.testSlug ?? null;
    const theme = {
      kicker: "Perfil de personalidade",
      heroClass: "bg-gradient-to-br from-indigo-200/60 to-indigo-50 dark:from-indigo-900/30 dark:to-slate-900/80",
      barClass: "bg-indigo-500 dark:bg-indigo-400"
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AssessmentResultsView, mergeProps({
        report: unref(report),
        "test-slug": unref(testSlug),
        theme
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/results/PersonalityResultsView.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const PersonalityResultsView = Object.assign(_sfc_main$5, { __name: "ResultsPersonalityResultsView" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "RelationshipsResultsView",
  __ssrInlineRender: true,
  props: {
    report: {},
    testSlug: {}
  },
  setup(__props) {
    const props = __props;
    const report = props.report;
    const testSlug = props.testSlug ?? null;
    const theme = {
      kicker: "Retrato dos relacionamentos",
      heroClass: "bg-gradient-to-br from-rose-200/60 to-rose-50 dark:from-rose-900/30 dark:to-slate-900/80",
      barClass: "bg-rose-500 dark:bg-rose-400"
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AssessmentResultsView, mergeProps({
        report: unref(report),
        "test-slug": unref(testSlug),
        theme
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/results/RelationshipsResultsView.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const RelationshipsResultsView = Object.assign(_sfc_main$4, { __name: "ResultsRelationshipsResultsView" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "StudyResultsView",
  __ssrInlineRender: true,
  props: {
    report: {},
    testSlug: {}
  },
  setup(__props) {
    const props = __props;
    const report = props.report;
    const testSlug = props.testSlug ?? null;
    const theme = {
      kicker: "Perfil de estudo",
      heroClass: "bg-gradient-to-br from-cyan-200/60 to-cyan-50 dark:from-cyan-900/30 dark:to-slate-900/80",
      barClass: "bg-cyan-500 dark:bg-cyan-400"
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AssessmentResultsView, mergeProps({
        report: unref(report),
        "test-slug": unref(testSlug),
        theme
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/results/StudyResultsView.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const StudyResultsView = Object.assign(_sfc_main$3, { __name: "ResultsStudyResultsView" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "WorkResultsView",
  __ssrInlineRender: true,
  props: {
    report: {},
    testSlug: {}
  },
  setup(__props) {
    const props = __props;
    const report = props.report;
    const testSlug = props.testSlug ?? null;
    const theme = {
      kicker: "Perfil profissional",
      heroClass: "bg-gradient-to-br from-amber-200/60 to-amber-50 dark:from-amber-900/30 dark:to-slate-900/80",
      barClass: "bg-amber-500 dark:bg-amber-400"
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AssessmentResultsView, mergeProps({
        report: unref(report),
        "test-slug": unref(testSlug),
        theme
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/results/WorkResultsView.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const WorkResultsView = Object.assign(_sfc_main$2, { __name: "ResultsWorkResultsView" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "WellbeingResultsView",
  __ssrInlineRender: true,
  props: {
    report: {},
    testSlug: {}
  },
  setup(__props) {
    const props = __props;
    const report = props.report;
    const testSlug = props.testSlug ?? null;
    const theme = {
      kicker: "Bem-estar e habitos",
      heroClass: "bg-gradient-to-br from-emerald-200/60 to-emerald-50 dark:from-emerald-900/30 dark:to-slate-900/80",
      barClass: "bg-emerald-500 dark:bg-emerald-400"
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AssessmentResultsView, mergeProps({
        report: unref(report),
        "test-slug": unref(testSlug),
        theme
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/results/WellbeingResultsView.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const WellbeingResultsView = Object.assign(_sfc_main$1, { __name: "ResultsWellbeingResultsView" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[sessionId]",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      robots: "noindex, nofollow",
      title: "Resultados"
    });
    const route = useRoute();
    const sessionId = computed(() => String(route.params.sessionId ?? ""));
    const testSlug = computed(() => {
      const value = route.query.t;
      if (Array.isArray(value)) return value[0] ?? null;
      return typeof value === "string" ? value : null;
    });
    const { data, error, pending } = useLazyAsyncData(
      `results-${sessionId.value}`,
      async () => {
        const headers = {};
        const query = {};
        const token = await getSupabaseAccessToken();
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        return $fetch(`/api/results/${sessionId.value}`, {
          headers: Object.keys(headers).length ? headers : void 0,
          query: Object.keys(query).length ? query : void 0
        });
      },
      {
        server: false,
        getCachedData: () => void 0
      }
    );
    const isLoading = computed(() => pending.value || !data.value && !error.value);
    const errorMessage = computed(() => {
      if (!error.value) return "";
      const anyError = error.value;
      return anyError.data?.message ?? "Erro ao carregar resultados.";
    });
    const twelveReport = computed(() => {
      const r = data.value;
      return r && r.kind === "twelveLayers" ? r : null;
    });
    const temperamentReport = computed(() => {
      const r = data.value;
      return r && r.kind === "temperaments" ? r : null;
    });
    const assessmentReport = computed(() => {
      const r = data.value;
      return r && r.kind !== "twelveLayers" && r.kind !== "temperaments" ? r : null;
    });
    const personalityKinds = [
      "bigFive",
      "disc",
      "selfSabotage",
      "procrastination",
      "decisionMaking",
      "archetypes",
      "selfEsteem",
      "emotionalIntelligence"
    ];
    const relationshipKinds = [
      "loveLanguages",
      "attachment",
      "conflictCommunication",
      "jealousyBoundaries",
      "temperamentCompatibility"
    ];
    const studyKinds = [
      "learningStyle",
      "studyFocus",
      "studyHabits",
      "metacognition"
    ];
    const workKinds = [
      "workValues",
      "motivators",
      "leadershipStyle",
      "teamwork"
    ];
    const wellbeingKinds = [
      "anxietyTriggers",
      "burnoutStress",
      "habitsConsistency",
      "sleepEnergy"
    ];
    const personalityReport = computed(() => {
      if (!assessmentReport.value) return null;
      return personalityKinds.includes(assessmentReport.value.kind) ? assessmentReport.value : null;
    });
    const relationshipReport = computed(() => {
      if (!assessmentReport.value) return null;
      return relationshipKinds.includes(assessmentReport.value.kind) ? assessmentReport.value : null;
    });
    const studyReport = computed(() => {
      if (!assessmentReport.value) return null;
      return studyKinds.includes(assessmentReport.value.kind) ? assessmentReport.value : null;
    });
    const workReport = computed(() => {
      if (!assessmentReport.value) return null;
      return workKinds.includes(assessmentReport.value.kind) ? assessmentReport.value : null;
    });
    const wellbeingReport = computed(() => {
      if (!assessmentReport.value) return null;
      return wellbeingKinds.includes(assessmentReport.value.kind) ? assessmentReport.value : null;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      if (isLoading.value) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-50/70 dark:bg-slate-950" }, _attrs))}><div class="mx-auto max-w-5xl space-y-4 px-4 py-10">`);
        _push(ssrRenderComponent(SkeletonBlock, { class: "h-10 w-2/3" }, null, _parent));
        _push(ssrRenderComponent(SkeletonBlock, { class: "h-5 w-full" }, null, _parent));
        _push(ssrRenderComponent(SkeletonBlock, { class: "h-5 w-5/6" }, null, _parent));
        _push(ssrRenderComponent(SkeletonBlock, { class: "h-40 w-full rounded-2xl" }, null, _parent));
        _push(ssrRenderComponent(SkeletonBlock, { class: "h-32 w-full rounded-2xl" }, null, _parent));
        _push(`</div></section>`);
      } else if (unref(error)) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-50/70 dark:bg-slate-950" }, _attrs))}><div class="mx-auto max-w-3xl space-y-4 px-4 py-10"><h1 class="text-xl font-semibold text-slate-900 dark:text-slate-50"> Resultado indisponível </h1><p class="text-sm text-slate-600 dark:text-slate-300">${ssrInterpolate(errorMessage.value)}</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "inline-flex items-center rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Voltar para a página inicial `);
            } else {
              return [
                createTextVNode(" Voltar para a página inicial ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></section>`);
      } else if (twelveReport.value || temperamentReport.value || assessmentReport.value) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-50/70 dark:bg-slate-950" }, _attrs))}>`);
        if (twelveReport.value) {
          _push(ssrRenderComponent(TwelveLayersResultsView, {
            report: twelveReport.value,
            "test-slug": testSlug.value
          }, null, _parent));
        } else if (temperamentReport.value) {
          _push(ssrRenderComponent(TemperamentsResultsView, {
            report: temperamentReport.value,
            "session-id": sessionId.value,
            "test-slug": testSlug.value
          }, null, _parent));
        } else if (personalityReport.value) {
          _push(ssrRenderComponent(PersonalityResultsView, {
            report: personalityReport.value,
            "test-slug": testSlug.value
          }, null, _parent));
        } else if (relationshipReport.value) {
          _push(ssrRenderComponent(RelationshipsResultsView, {
            report: relationshipReport.value,
            "test-slug": testSlug.value
          }, null, _parent));
        } else if (studyReport.value) {
          _push(ssrRenderComponent(StudyResultsView, {
            report: studyReport.value,
            "test-slug": testSlug.value
          }, null, _parent));
        } else if (workReport.value) {
          _push(ssrRenderComponent(WorkResultsView, {
            report: workReport.value,
            "test-slug": testSlug.value
          }, null, _parent));
        } else if (wellbeingReport.value) {
          _push(ssrRenderComponent(WellbeingResultsView, {
            report: wellbeingReport.value,
            "test-slug": testSlug.value
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</section>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/resultados/[sessionId].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_sessionId_-3USkJ1Ik.mjs.map
