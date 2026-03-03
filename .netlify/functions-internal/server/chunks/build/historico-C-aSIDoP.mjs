import { a as useSeoMeta, f as useLazyAsyncData, S as SkeletonBlock, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { g as getSupabaseAccessToken } from './authToken-u3KDyLrx.mjs';
import { a as allTests } from './index-AMOb42s-.mjs';
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
  __name: "historico",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      robots: "noindex, nofollow",
      title: "Historico de testes"
    });
    const { data, pending, error, refresh } = useLazyAsyncData(
      "my-results",
      async () => {
        const token = await getSupabaseAccessToken();
        if (!token) {
          return { items: [] };
        }
        return await $fetch("/api/my-results", {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      },
      {
        server: false,
        default: () => ({ items: [] }),
        getCachedData: () => void 0
      }
    );
    const ALLOWED_HISTORY_SLUGS = /* @__PURE__ */ new Set([
      "temperaments",
      "temperaments-compatibility",
      "twelve-layers",
      "temperament-compatibility"
    ]);
    const LEGACY_RESULT_SLUG_ALIASES = {
      "temperament-compatibility": "temperaments-compatibility"
    };
    function normalizeHistorySlug(slug) {
      return LEGACY_RESULT_SLUG_ALIASES[slug] ?? slug;
    }
    const items = computed(
      () => (data.value?.items ?? []).filter((item) => ALLOWED_HISTORY_SLUGS.has(item.slug)).map((item) => ({
        ...item,
        normalizedSlug: normalizeHistorySlug(item.slug)
      }))
    );
    const testCatalog = allTests.likert;
    const testByResultSlug = computed(() => {
      const map = /* @__PURE__ */ new Map();
      for (const test of testCatalog) {
        map.set(test.resultSlug, test);
      }
      return map;
    });
    const errorMessage = computed(() => {
      if (!error.value) return "";
      const payload = error.value;
      return payload.data?.message ?? "Erro ao carregar o historico.";
    });
    function labelBySlug(slug) {
      return testByResultSlug.value.get(slug)?.title ?? slug;
    }
    function defaultTitle(slug) {
      const test = testByResultSlug.value.get(slug);
      return test ? `Relatorio: ${test.title}` : "Relatorio do teste";
    }
    function formatDate(iso) {
      return new Date(iso).toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short"
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-50/70 py-8 dark:bg-slate-950" }, _attrs))}><div class="mx-auto max-w-5xl space-y-6 px-4"><header class="space-y-1"><p class="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"> Meus testes </p><h1 class="text-2xl font-semibold tracking-tight"> Histórico de testes </h1><p class="text-xs text-slate-500 dark:text-slate-400"> Veja todos os testes que você fez estando logado e acesse novamente seus relatórios completos. </p></header>`);
      if (unref(pending)) {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(4, (n) => {
          _push(ssrRenderComponent(SkeletonBlock, {
            key: n,
            class: "h-20 rounded-xl"
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else if (unref(error)) {
        _push(`<div class="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700 dark:border-rose-800/80 dark:bg-rose-950/40 dark:text-rose-200">${ssrInterpolate(errorMessage.value)}</div>`);
      } else if (!items.value.length) {
        _push(`<div class="rounded-lg border border-slate-200 bg-white px-4 py-3 text-xs text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"> Você ainda não possui testes salvos com sua conta. Faça um dos testes e ele aparecerá aqui. </div>`);
      } else {
        _push(`<ul class="space-y-3"><!--[-->`);
        ssrRenderList(items.value, (item) => {
          _push(`<li class="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-indigo-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/60"><div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><div class="space-y-1"><p class="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-slate-400">${ssrInterpolate(labelBySlug(item.normalizedSlug))}</p><p class="text-sm font-semibold text-slate-900 dark:text-slate-50">${ssrInterpolate(item.meta?.title || defaultTitle(item.normalizedSlug))}</p><p class="text-[0.7rem] text-slate-500 dark:text-slate-400">${ssrInterpolate(formatDate(item.timestamp))}</p></div><div class="flex items-center gap-2">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/resultados/${item.id}`,
            class: "rounded-full bg-indigo-600 px-3 py-1.5 text-[0.7rem] font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/5"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Ver relatório `);
              } else {
                return [
                  createTextVNode(" Ver relatório ")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div></li>`);
        });
        _push(`<!--]--></ul>`);
      }
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/testes/historico.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=historico-C-aSIDoP.mjs.map
