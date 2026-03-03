import { defineComponent, ref, computed, resolveDirective, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrGetDirectiveProps, ssrRenderComponent } from 'vue/server-renderer';
import { a as allTests } from './index-AMOb42s-.mjs';
import { u as useReveal } from './useReveal-DIep_XVD.mjs';
import { T as TestCard } from './TestCard-h-wOKSiP.mjs';
import { u as useI18n, a as useSeoMeta } from './server.mjs';
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
    const { t, locale } = useI18n();
    useSeoMeta(() => ({
      title: t("testsIndex.title"),
      description: t("testsIndex.description")
    }));
    const allLikertTests = allTests.likert;
    ref(null);
    const { revealNow } = useReveal();
    function sortByTitle(a, b) {
      const currentLocale = locale.value || "pt-BR";
      return a.title.localeCompare(b.title, currentLocale);
    }
    const availableTests = computed(
      () => allLikertTests.slice().sort(sortByTitle)
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_reveal = resolveDirective("reveal");
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-5xl space-y-6 px-4 py-8" }, _attrs))}><header class="space-y-2 reveal"><p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">${ssrInterpolate(unref(t)("testsIndex.kicker"))}</p><h1 class="font-display text-3xl tracking-tight">${ssrInterpolate(unref(t)("testsIndex.title"))}</h1><p class="text-sm text-slate-600 dark:text-slate-300">${ssrInterpolate(unref(t)("testsIndex.description"))}</p></header><section class="space-y-4"><h2 class="text-sm font-semibold text-slate-700 dark:text-slate-200">${ssrInterpolate(unref(t)("shome.sections.availableTests"))}</h2><div class="grid gap-4 md:grid-cols-2"><!--[-->`);
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
      _push(`<!--]--></div></section></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/testes/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Br6QhkPS.mjs.map
