import { u as useI18n, a as useSeoMeta, b as useHead, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, computed, ref, resolveDirective, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrGetDirectiveProps, ssrRenderComponent } from 'vue/server-renderer';
import { a as allTests } from './index-AMOb42s-.mjs';
import { b as buildFaqSchema, F as FaqSection, g as getGlobalFaq } from './FaqSection-CdJoqg28.mjs';
import { u as useReveal } from './useReveal-DIep_XVD.mjs';
import { T as TestCard } from './TestCard-h-wOKSiP.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useSeoMeta(() => ({
      title: t("shome.title"),
      description: t("shome.description")
    }));
    const allLikertTests = allTests.likert;
    const availableTests = computed(() => allLikertTests.slice());
    const globalFaq = getGlobalFaq();
    ref(null);
    const { revealNow } = useReveal();
    useHead(() => ({
      script: [
        {
          type: "application/ld+json",
          children: JSON.stringify(buildFaqSchema(globalFaq))
        }
      ]
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _directive_reveal = resolveDirective("reveal");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-5xl space-y-10 px-4 py-8" }, _attrs))}><header class="space-y-3 reveal"><p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">${ssrInterpolate(unref(t)("shome.kicker"))}</p><h1 class="font-display text-3xl tracking-tight md:text-4xl">${ssrInterpolate(unref(t)("shome.title"))}</h1><p class="max-w-2xl text-sm text-slate-600 dark:text-slate-300">${ssrInterpolate(unref(t)("shome.description"))}</p></header><section class="space-y-4"><h2 class="text-sm font-semibold text-slate-700 dark:text-slate-200">${ssrInterpolate(unref(t)("shome.sections.availableTests"))}</h2><div class="grid gap-4 md:grid-cols-2"><!--[-->`);
      ssrRenderList(availableTests.value, (test, index) => {
        _push(`<div${ssrRenderAttrs(mergeProps({
          key: test.id,
          class: "reveal"
        }, ssrGetDirectiveProps(_ctx, _directive_reveal, index * 80)))}>`);
        _push(ssrRenderComponent(TestCard, {
          test,
          variant: "core"
        }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></section><section class="space-y-4"><h2 class="text-sm font-semibold text-slate-700 dark:text-slate-200">${ssrInterpolate(unref(t)("shome.sections.articlesTitle"))}</h2><div class="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 md:flex-row md:items-center md:justify-between"><div class="space-y-2"><h3 class="font-display text-xl text-slate-900 dark:text-slate-50">${ssrInterpolate(unref(t)("shome.sections.articlesCardTitle"))}</h3><p class="text-sm text-slate-600 dark:text-slate-300">${ssrInterpolate(unref(t)("shome.sections.articlesCardDescription"))}</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/artigos",
        class: "inline-flex items-center justify-center rounded-full border border-indigo-200 bg-indigo-600 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-sm transition hover:bg-indigo-700 dark:border-amber-300/40 dark:bg-amber-300 dark:text-slate-900"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("common.actions.viewArticles"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("common.actions.viewArticles")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><section id="faq" class="space-y-4">`);
      _push(ssrRenderComponent(FaqSection, {
        kicker: unref(t)("shome.faq.kicker"),
        title: unref(t)("shome.faq.title"),
        items: unref(globalFaq),
        description: unref(t)("shome.faq.description")
      }, null, _parent));
      _push(`</section></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BlJd4ZuT.mjs.map
