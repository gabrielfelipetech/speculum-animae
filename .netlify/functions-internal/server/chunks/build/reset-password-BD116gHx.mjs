import { a as useSeoMeta, h as useSupabaseClient, i as useRouter, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "reset-password",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      robots: "noindex, nofollow",
      title: "Redefinir senha"
    });
    useSupabaseClient();
    useRouter();
    const password = ref("");
    const confirm = ref("");
    const loading = ref(false);
    const errorMsg = ref(null);
    const message = ref(null);
    const canSubmit = computed(() => {
      return password.value.length >= 8 && confirm.value.length >= 8 && password.value === confirm.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-50/70 py-10 dark:bg-slate-950" }, _attrs))}><div class="mx-auto max-w-md space-y-6 px-4"><header class="space-y-1"><p class="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"> Recuperação </p><h1 class="text-xl font-semibold text-slate-900 dark:text-slate-50"> Definir nova senha </h1><p class="text-xs text-slate-500 dark:text-slate-400"> Escolha uma nova senha para sua conta. </p></header>`);
      if (message.value) {
        _push(`<div class="rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200">${ssrInterpolate(message.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (errorMsg.value) {
        _push(`<div class="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-900/40 dark:text-red-200">${ssrInterpolate(errorMsg.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form class="space-y-4"><label class="block text-xs font-medium text-slate-700 dark:text-slate-200"> Nova senha <input${ssrRenderAttr("value", password.value)} type="password" minlength="8" required class="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:hover:border-slate-500" autocomplete="new-password"></label><label class="block text-xs font-medium text-slate-700 dark:text-slate-200"> Confirmar senha <input${ssrRenderAttr("value", confirm.value)} type="password" minlength="8" required class="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:hover:border-slate-500" autocomplete="new-password"></label><button type="submit" class="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"${ssrIncludeBooleanAttr(loading.value || !canSubmit.value) ? " disabled" : ""}>`);
      if (loading.value) {
        _push(`<span>Salvando...</span>`);
      } else {
        _push(`<span>Atualizar senha</span>`);
      }
      _push(`</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "block text-center text-[0.7rem] font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-50"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Voltar para a home `);
          } else {
            return [
              createTextVNode(" Voltar para a home ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</form></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/reset-password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=reset-password-BD116gHx.mjs.map
