import { g as _export_sfc, u as useI18n, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, computed, mergeProps, withCtx, unref, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderAttrs } from 'vue/server-renderer';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TestTagPill",
  __ssrInlineRender: true,
  props: {
    label: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({ class: "inline-flex items-center rounded-full border border-slate-200/70 bg-slate-50 px-2 py-0.5 text-[0.65rem] font-medium text-slate-600 transition group-hover:border-brand-400 group-hover:bg-brand-50 group-hover:text-brand-700" }, _attrs))}>${ssrInterpolate(__props.label)}</span>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tests/TestTagPill.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const TestTagPill = Object.assign(_sfc_main$1, { __name: "TestsTestTagPill" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TestCard",
  __ssrInlineRender: true,
  props: {
    test: {},
    variant: {}
  },
  setup(__props) {
    const props = __props;
    const to = computed(() => ({
      path: `/testes/${props.test.slug}`,
      query: { fresh: "1" }
    }));
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: to.value,
        class: "group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-500/70 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80 sm:p-6"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-2 sm:space-y-2.5" data-v-16eaeead${_scopeId}><h3 class="font-display text-[0.72rem] font-semibold uppercase leading-snug tracking-[0.18em] text-brand-600 group-hover:text-brand-700 dark:text-amber-300 dark:group-hover:text-amber-200 sm:text-sm" data-v-16eaeead${_scopeId}>${ssrInterpolate(__props.test.title)}</h3><p class="text-[0.9rem] leading-snug text-slate-600 dark:text-slate-300 sm:text-sm" data-v-16eaeead${_scopeId}>${ssrInterpolate(__props.test.subtitle)}</p></div><div class="mt-4 flex flex-wrap items-center gap-2 sm:flex-row sm:items-center sm:justify-between" data-v-16eaeead${_scopeId}><div class="flex flex-wrap gap-1.5 mb-2" data-v-16eaeead${_scopeId}><!--[-->`);
            ssrRenderList(__props.test.tags, (tag) => {
              _push2(ssrRenderComponent(TestTagPill, {
                key: tag,
                label: tag
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></div><span class="rainbow-cta ml-auto shrink-0"${ssrRenderAttr("aria-label", unref(t)("common.actions.startTest"))} data-v-16eaeead${_scopeId}><span class="rainbow-cta__inner" data-v-16eaeead${_scopeId}><span class="inline-flex items-center gap-1 text-[11px] font-semibold" data-v-16eaeead${_scopeId}>${ssrInterpolate(unref(t)("common.actions.startTest"))} <span aria-hidden="true" data-v-16eaeead${_scopeId}>&gt;</span></span></span></span></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-2 sm:space-y-2.5" }, [
                createVNode("h3", { class: "font-display text-[0.72rem] font-semibold uppercase leading-snug tracking-[0.18em] text-brand-600 group-hover:text-brand-700 dark:text-amber-300 dark:group-hover:text-amber-200 sm:text-sm" }, toDisplayString(__props.test.title), 1),
                createVNode("p", { class: "text-[0.9rem] leading-snug text-slate-600 dark:text-slate-300 sm:text-sm" }, toDisplayString(__props.test.subtitle), 1)
              ]),
              createVNode("div", { class: "mt-4 flex flex-wrap items-center gap-2 sm:flex-row sm:items-center sm:justify-between" }, [
                createVNode("div", { class: "flex flex-wrap gap-1.5 mb-2" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.test.tags, (tag) => {
                    return openBlock(), createBlock(TestTagPill, {
                      key: tag,
                      label: tag
                    }, null, 8, ["label"]);
                  }), 128))
                ]),
                createVNode("span", {
                  class: "rainbow-cta ml-auto shrink-0",
                  "aria-label": unref(t)("common.actions.startTest")
                }, [
                  createVNode("span", { class: "rainbow-cta__inner" }, [
                    createVNode("span", { class: "inline-flex items-center gap-1 text-[11px] font-semibold" }, [
                      createTextVNode(toDisplayString(unref(t)("common.actions.startTest")) + " ", 1),
                      createVNode("span", { "aria-hidden": "true" }, ">")
                    ])
                  ])
                ], 8, ["aria-label"])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tests/TestCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TestCard = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-16eaeead"]]), { __name: "TestsTestCard" });

export { TestCard as T };
//# sourceMappingURL=TestCard-h-wOKSiP.mjs.map
