import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { a as useSeoMeta, h as useSupabaseClient } from './server.mjs';
import '../_/nitro.mjs';
import '@bugsnag/js';
import '@supabase/ssr';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
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
  __name: "callback",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      robots: "noindex, nofollow",
      title: "Conectando conta"
    });
    useRouter();
    useSupabaseClient();
    const errorText = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950" }, _attrs))}><div class="px-6 text-center"><p class="text-sm text-slate-700 dark:text-slate-200"> Conectando sua conta, aguarde... </p>`);
      if (errorText.value) {
        _push(`<p class="mt-3 text-xs text-red-600 dark:text-red-400">${ssrInterpolate(errorText.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/callback.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=callback-BiR2m7rd.mjs.map
