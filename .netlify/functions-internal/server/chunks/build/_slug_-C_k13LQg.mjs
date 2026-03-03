import { defineComponent, withAsyncContext, computed, ref, mergeProps, unref, toRefs, watch, resolveDirective, withCtx, createTextVNode, createBlock, openBlock, isRef, reactive, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrGetDirectiveProps, ssrRenderList, ssrRenderAttr, ssrRenderStyle, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { g as getCanonicalTestSlug, i as isEnabledTestSlug, b as getTestBySlug } from './index-AMOb42s-.mjs';
import { b as getAllArticles } from './ArticleCard-5A0TYOxQ.mjs';
import { a as getFaqByTestSlug, b as buildFaqSchema, F as FaqSection } from './FaqSection-CdJoqg28.mjs';
import { R as RelatedArticles } from './RelatedArticles-B9sZooMY.mjs';
import { d as useRoute, n as navigateTo, j as createError, a as useSeoMeta, b as useHead, i as useRouter, e as useSupabaseUser, B as BaseButton, S as SkeletonBlock } from './server.mjs';
import { b as buildUserActorKey, a as buildClientActorKey, g as getOrCreateClientId, c as getLastResultId, s as setLastResultId } from './actorKey-DUnMpcbL.mjs';
import { u as useReveal } from './useReveal-DIep_XVD.mjs';
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

const OUTER_BASE_SIZE = 38;
const OUTER_STEP = 6;
const INNER_BASE_SIZE = 10;
const INNER_STEP = 2;
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "LikertQuestion",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: Number,
      default: null
    },
    name: {
      type: String,
      required: true
    },
    minLabel: {
      type: String,
      default: ""
    },
    maxLabel: {
      type: String,
      default: ""
    },
    labelledById: {
      type: String,
      default: void 0
    },
    describedById: {
      type: String,
      default: void 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "answered"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const options = [1, 2, 3, 4, 5, 6, 7];
    const internalValue = computed(() => props.modelValue ?? null);
    const hasError = computed(() => props.error === true);
    const minLabelComputed = computed(
      () => props.minLabel ?? "Discordo totalmente"
    );
    const maxLabelComputed = computed(
      () => props.maxLabel ?? "Concordo totalmente"
    );
    const CENTER_INDEX = Math.floor(options.length / 2);
    function distanceFromCenter(index) {
      return Math.abs(index - CENTER_INDEX);
    }
    function outerSizeStyle(index) {
      const distance = distanceFromCenter(index);
      const size = OUTER_BASE_SIZE + OUTER_STEP * distance;
      return {
        width: `${size}px`,
        height: `${size}px`
      };
    }
    function innerSizeStyle(index) {
      const distance = distanceFromCenter(index);
      const size = INNER_BASE_SIZE + INNER_STEP * distance;
      return {
        width: `${size}px`,
        height: `${size}px`
      };
    }
    function zoneFromIndex(index) {
      if (index <= 2) return "disagree";
      if (index === 3) return "neutral";
      return "agree";
    }
    function outerCircleClass(index, isSelected) {
      const zone = zoneFromIndex(index);
      const disabledClass = props.disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer";
      let base = "";
      if (zone === "agree") {
        base = isSelected ? "border-green-500 bg-green-50 text-green-700 dark:border-green-300 dark:bg-green-900/40" : "border-green-300 text-green-600 hover:border-green-400 dark:border-green-700 dark:text-green-300 dark:hover:border-green-500";
        return `${base} ${disabledClass}`;
      }
      if (zone === "disagree") {
        base = isSelected ? "border-red-500 bg-red-50 text-red-700 dark:border-red-300 dark:bg-red-900/40" : "border-red-300 text-red-600 hover:border-red-400 dark:border-red-700 dark:text-red-300 dark:hover:border-red-500";
        return `${base} ${disabledClass}`;
      }
      base = isSelected ? "border-slate-400 bg-slate-50 text-slate-700 dark:border-slate-200 dark:bg-slate-800/80" : "border-slate-300 text-slate-500 hover:border-slate-400 dark:border-slate-600 dark:text-slate-300 dark:hover:border-slate-400";
      return `${base} ${disabledClass}`;
    }
    function innerDotClass(index, isSelected) {
      if (!isSelected) return "bg-transparent";
      const zone = zoneFromIndex(index);
      if (zone === "agree") {
        return "bg-green-500 dark:bg-green-300";
      }
      if (zone === "disagree") {
        return "bg-red-500 dark:bg-red-300";
      }
      return "bg-slate-400 dark:bg-slate-200";
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "space-y-3",
        "aria-disabled": __props.disabled ? "true" : void 0,
        "data-error": hasError.value ? "true" : void 0
      }, _attrs))}><div class="flex justify-between text-[0.7rem] text-slate-500 dark:text-slate-400"><span>${ssrInterpolate(minLabelComputed.value)}</span><span>${ssrInterpolate(maxLabelComputed.value)}</span></div><div class="flex items-center justify-between gap-2"><!--[-->`);
      ssrRenderList(options, (option, index) => {
        _push(`<label class="${ssrRenderClass([outerCircleClass(index, option === internalValue.value), "relative flex cursor-pointer items-center justify-center rounded-full border-2 text-[0.65rem] font-medium transition focus-within:ring-2 focus-within:ring-brand-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-50 dark:focus-within:ring-offset-slate-950"])}" style="${ssrRenderStyle(outerSizeStyle(index))}"><span class="sr-only">${ssrInterpolate(__props.name)} option ${ssrInterpolate(option)}</span><input class="sr-only" type="radio"${ssrRenderAttr("name", __props.name)}${ssrRenderAttr("value", option)}${ssrIncludeBooleanAttr(option === internalValue.value) ? " checked" : ""}${ssrRenderAttr("aria-labelledby", __props.labelledById)}${ssrRenderAttr("aria-describedby", __props.describedById)}${ssrRenderAttr("aria-invalid", hasError.value ? "true" : void 0)}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""}><span class="${ssrRenderClass([innerDotClass(index, option === internalValue.value), "block rounded-full transition"])}" style="${ssrRenderStyle(innerSizeStyle(index))}"></span></label>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tests/questions/LikertQuestion.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const LikertQuestion = Object.assign(_sfc_main$a, { __name: "TestsQuestionsLikertQuestion" });
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "RankingQuestion",
  __ssrInlineRender: true,
  props: {
    question: {},
    modelValue: {},
    name: {},
    labelledById: {},
    describedById: {},
    disabled: { type: Boolean },
    error: { type: Boolean }
  },
  emits: ["update:modelValue", "answered"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const optionMap = computed(() => {
      const map = /* @__PURE__ */ new Map();
      for (const option of props.question.options) {
        map.set(option.id, option.label);
      }
      return map;
    });
    const defaultOrder = computed(
      () => props.question.options.map((option) => option.id)
    );
    const currentOrder = computed(() => {
      if (Array.isArray(props.modelValue) && props.modelValue.length > 0) {
        return props.modelValue;
      }
      return defaultOrder.value;
    });
    const hasError = computed(() => props.error === true);
    function optionLabel(optionId) {
      return optionMap.value.get(optionId) ?? optionId;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "space-y-2",
        role: "list",
        "aria-labelledby": __props.labelledById,
        "aria-describedby": __props.describedById,
        "aria-invalid": hasError.value ? "true" : void 0,
        "aria-disabled": __props.disabled ? "true" : void 0,
        "data-error": hasError.value ? "true" : void 0
      }, _attrs))}><p class="text-[0.7rem] text-slate-500 dark:text-slate-400"> Reordene as opcoes usando os botoes ou as setas do teclado. </p><ul class="space-y-2"><!--[-->`);
      ssrRenderList(currentOrder.value, (optionId, index) => {
        _push(`<li class="${ssrRenderClass([__props.disabled ? "cursor-not-allowed opacity-60" : "", "flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white/80 px-3 py-2 text-sm shadow-sm focus-within:ring-2 focus-within:ring-brand-500 dark:border-slate-800 dark:bg-slate-900/80"])}"${ssrRenderAttr("tabindex", __props.disabled ? -1 : 0)}><div class="flex items-center gap-3"><span class="text-xs font-semibold text-slate-500 dark:text-slate-300">${ssrInterpolate(index + 1)}</span><span class="text-slate-700 dark:text-slate-200">${ssrInterpolate(optionLabel(optionId))}</span></div><div class="flex items-center gap-1"><button type="button" class="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[0.65rem] font-semibold text-slate-600 transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"${ssrIncludeBooleanAttr(__props.disabled || index === 0) ? " disabled" : ""}${ssrRenderAttr("aria-label", `Mover ${optionLabel(optionId)} para cima`)}> Cima </button><button type="button" class="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[0.65rem] font-semibold text-slate-600 transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"${ssrIncludeBooleanAttr(__props.disabled || index === currentOrder.value.length - 1) ? " disabled" : ""}${ssrRenderAttr("aria-label", `Mover ${optionLabel(optionId)} para baixo`)}> Baixo </button></div></li>`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tests/questions/RankingQuestion.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const RankingQuestion = Object.assign(_sfc_main$9, { __name: "TestsQuestionsRankingQuestion" });
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "PairwiseQuestion",
  __ssrInlineRender: true,
  props: {
    question: {},
    modelValue: {},
    name: {},
    labelledById: {},
    describedById: {},
    disabled: { type: Boolean },
    error: { type: Boolean }
  },
  emits: ["update:modelValue", "answered"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const hasError = computed(() => props.error === true);
    const safeName = computed(
      () => props.name.replace(/[^a-zA-Z0-9_-]/g, "-")
    );
    const currentSelections = computed(() => normalizeSelections(props.modelValue));
    function normalizeSelections(value) {
      const raw = Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
      return props.question.pairs.map((pair, index) => {
        const selection = raw[index];
        if (selection === pair.left.id || selection === pair.right.id) {
          return selection;
        }
        return "";
      });
    }
    function selectedClass(pairIndex, optionId) {
      if (currentSelections.value[pairIndex] !== optionId) return "";
      return "border-brand-500 text-brand-700 ring-2 ring-brand-500 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-950";
    }
    function pairLabelId(index) {
      return `${safeName.value}-pair-${index}`;
    }
    function groupLabelledBy(index) {
      const pairId = pairLabelId(index);
      if (!props.labelledById) return pairId;
      return `${props.labelledById} ${pairId}`;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "space-y-3",
        "aria-labelledby": __props.labelledById,
        "aria-describedby": __props.describedById,
        "aria-invalid": hasError.value ? "true" : void 0,
        "aria-disabled": __props.disabled ? "true" : void 0,
        "data-error": hasError.value ? "true" : void 0
      }, _attrs))}><p class="text-[0.7rem] text-slate-500 dark:text-slate-400"> Escolha uma opcao em cada par. </p><!--[-->`);
      ssrRenderList(__props.question.pairs, (pair, index) => {
        _push(`<div class="space-y-2 rounded-xl border border-slate-200/80 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><p${ssrRenderAttr("id", pairLabelId(index))} class="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400"> Comparacao ${ssrInterpolate(index + 1)}</p><div class="grid gap-3 sm:grid-cols-2" role="radiogroup"${ssrRenderAttr("aria-labelledby", groupLabelledBy(index))}${ssrRenderAttr("aria-describedby", __props.describedById)}${ssrRenderAttr("aria-invalid", hasError.value ? "true" : void 0)}><label class="${ssrRenderClass([[
          selectedClass(index, pair.left.id),
          __props.disabled ? "cursor-not-allowed opacity-60" : ""
        ], "flex cursor-pointer items-center justify-center rounded-xl border border-slate-200/80 bg-white/90 px-3 py-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200"])}"><input class="sr-only" type="radio"${ssrRenderAttr("name", `${__props.name}-${index}`)}${ssrRenderAttr("value", pair.left.id)}${ssrIncludeBooleanAttr(currentSelections.value[index] === pair.left.id) ? " checked" : ""}${ssrRenderAttr("aria-labelledby", groupLabelledBy(index))}${ssrRenderAttr("aria-describedby", __props.describedById)}${ssrRenderAttr("aria-invalid", hasError.value ? "true" : void 0)}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""}> ${ssrInterpolate(pair.left.label)}</label><label class="${ssrRenderClass([[
          selectedClass(index, pair.right.id),
          __props.disabled ? "cursor-not-allowed opacity-60" : ""
        ], "flex cursor-pointer items-center justify-center rounded-xl border border-slate-200/80 bg-white/90 px-3 py-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200"])}"><input class="sr-only" type="radio"${ssrRenderAttr("name", `${__props.name}-${index}`)}${ssrRenderAttr("value", pair.right.id)}${ssrIncludeBooleanAttr(currentSelections.value[index] === pair.right.id) ? " checked" : ""}${ssrRenderAttr("aria-labelledby", groupLabelledBy(index))}${ssrRenderAttr("aria-describedby", __props.describedById)}${ssrRenderAttr("aria-invalid", hasError.value ? "true" : void 0)}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""}> ${ssrInterpolate(pair.right.label)}</label></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tests/questions/PairwiseQuestion.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const PairwiseQuestion = Object.assign(_sfc_main$8, { __name: "TestsQuestionsPairwiseQuestion" });
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "ChoiceQuestion",
  __ssrInlineRender: true,
  props: {
    question: {},
    modelValue: {},
    name: {},
    labelledById: {},
    describedById: {},
    disabled: { type: Boolean },
    error: { type: Boolean }
  },
  emits: ["update:modelValue", "answered"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const hasError = computed(() => props.error === true);
    const inputType = computed(() => props.question.multiple ? "checkbox" : "radio");
    const inputName = computed(
      () => props.question.multiple ? `${props.name}[]` : props.name
    );
    const selectedSet = computed(() => new Set(props.modelValue ?? []));
    const minSelections = computed(
      () => typeof props.question.minSelections === "number" ? props.question.minSelections : 1
    );
    const maxSelections = computed(
      () => typeof props.question.maxSelections === "number" ? props.question.maxSelections : props.question.options.length
    );
    const selectionHint = computed(() => {
      if (!props.question.multiple) return "Escolha uma opcao.";
      if (minSelections.value === maxSelections.value) {
        return `Escolha ${minSelections.value} opcao(oes).`;
      }
      return `Escolha entre ${minSelections.value} e ${maxSelections.value} opcoes.`;
    });
    function isSelected(optionId) {
      return selectedSet.value.has(optionId);
    }
    function selectedClass(optionId) {
      if (!isSelected(optionId)) return "";
      return "border-brand-500 text-brand-700 ring-2 ring-brand-500 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-950";
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "space-y-2",
        "aria-labelledby": __props.labelledById,
        "aria-describedby": __props.describedById,
        "aria-invalid": hasError.value ? "true" : void 0,
        "aria-disabled": __props.disabled ? "true" : void 0,
        "data-error": hasError.value ? "true" : void 0
      }, _attrs))}>`);
      if (selectionHint.value) {
        _push(`<p class="text-[0.7rem] text-slate-500 dark:text-slate-400">${ssrInterpolate(selectionHint.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="space-y-2"><!--[-->`);
      ssrRenderList(__props.question.options, (option) => {
        _push(`<label class="${ssrRenderClass([[selectedClass(option.id), __props.disabled ? "cursor-not-allowed opacity-60" : ""], "flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200/80 bg-white/90 px-3 py-2 text-sm text-slate-700 shadow-sm transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200"])}"><input class="h-4 w-4 accent-brand-500"${ssrRenderAttr("type", inputType.value)}${ssrRenderAttr("name", inputName.value)}${ssrRenderAttr("value", option.id)}${ssrIncludeBooleanAttr(isSelected(option.id)) ? " checked" : ""}${ssrRenderAttr("aria-labelledby", __props.labelledById)}${ssrRenderAttr("aria-describedby", __props.describedById)}${ssrRenderAttr("aria-invalid", hasError.value ? "true" : void 0)}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""}><span>${ssrInterpolate(option.label)}</span></label>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tests/questions/ChoiceQuestion.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const ChoiceQuestion = Object.assign(_sfc_main$7, { __name: "TestsQuestionsChoiceQuestion" });
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "QuestionRenderer",
  __ssrInlineRender: true,
  props: {
    question: {},
    modelValue: {},
    name: {},
    minLabel: {},
    maxLabel: {},
    labelledById: {},
    describedById: {},
    disabled: { type: Boolean },
    error: { type: Boolean }
  },
  emits: ["update:modelValue", "answered"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.question.type === "likert") {
        _push(ssrRenderComponent(LikertQuestion, mergeProps({
          "model-value": typeof __props.modelValue === "number" ? __props.modelValue : null,
          name: __props.name,
          "min-label": __props.minLabel,
          "max-label": __props.maxLabel,
          "labelled-by-id": __props.labelledById,
          "described-by-id": __props.describedById,
          disabled: __props.disabled,
          error: __props.error,
          "onUpdate:modelValue": (value) => emit("update:modelValue", value),
          onAnswered: () => emit("answered")
        }, _attrs), null, _parent));
      } else if (__props.question.type === "rank") {
        _push(ssrRenderComponent(RankingQuestion, mergeProps({
          question: __props.question,
          "model-value": Array.isArray(__props.modelValue) ? __props.modelValue : null,
          name: __props.name,
          "labelled-by-id": __props.labelledById,
          "described-by-id": __props.describedById,
          disabled: __props.disabled,
          error: __props.error,
          "onUpdate:modelValue": (value) => emit("update:modelValue", value),
          onAnswered: () => emit("answered")
        }, _attrs), null, _parent));
      } else if (__props.question.type === "pairwise") {
        _push(ssrRenderComponent(PairwiseQuestion, mergeProps({
          question: __props.question,
          "model-value": Array.isArray(__props.modelValue) ? __props.modelValue : null,
          name: __props.name,
          "labelled-by-id": __props.labelledById,
          "described-by-id": __props.describedById,
          disabled: __props.disabled,
          error: __props.error,
          "onUpdate:modelValue": (value) => emit("update:modelValue", value),
          onAnswered: () => emit("answered")
        }, _attrs), null, _parent));
      } else {
        _push(ssrRenderComponent(ChoiceQuestion, mergeProps({
          question: __props.question,
          "model-value": Array.isArray(__props.modelValue) ? __props.modelValue : null,
          name: __props.name,
          "labelled-by-id": __props.labelledById,
          "described-by-id": __props.describedById,
          disabled: __props.disabled,
          error: __props.error,
          "onUpdate:modelValue": (value) => emit("update:modelValue", value),
          onAnswered: () => emit("answered")
        }, _attrs), null, _parent));
      }
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tests/QuestionRenderer.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const QuestionRenderer = Object.assign(_sfc_main$6, { __name: "TestsQuestionRenderer" });
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "LikertTestHeader",
  __ssrInlineRender: true,
  props: {
    config: {}
  },
  setup(__props) {
    const props = __props;
    const { config } = toRefs(props);
    const headerRef = ref(null);
    const { revealNow } = useReveal();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({
        ref_key: "headerRef",
        ref: headerRef,
        class: "space-y-2 reveal"
      }, _attrs))}><h1 class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">${ssrInterpolate(unref(config).title)}</h1><h2 class="font-display text-2xl tracking-tight md:text-3xl">${ssrInterpolate(unref(config).subtitle)}</h2><p class="max-w-2xl text-sm text-slate-600 dark:text-slate-300">${ssrInterpolate(unref(config).description)}</p>`);
      if (unref(config).disclaimer) {
        _push(`<p class="max-w-2xl rounded-lg border border-amber-200/70 bg-amber-50/80 p-3 text-[0.7rem] text-amber-900 dark:border-amber-500/40 dark:bg-amber-900/20 dark:text-amber-100">${ssrInterpolate(unref(config).disclaimer)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tests/LikertTestHeader.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const LikertTestHeader = Object.assign(_sfc_main$5, { __name: "TestsLikertTestHeader" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "LikertTestProgress",
  __ssrInlineRender: true,
  props: {
    answeredCount: {},
    totalQuestions: {},
    totalGroups: {},
    currentGroupNumber: {},
    overallProgressPercent: {}
  },
  setup(__props) {
    const props = __props;
    const {
      answeredCount,
      totalQuestions,
      totalGroups,
      currentGroupNumber,
      overallProgressPercent
    } = toRefs(props);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white/90 px-4 py-3 text-xs dark:border-slate-800 dark:bg-slate-900/80" }, _attrs))}><div class="flex flex-col gap-1"><span class="font-medium text-slate-700 dark:text-slate-200"> Progresso do questionário </span><span class="text-[0.7rem] text-slate-500 dark:text-slate-400">${ssrInterpolate(unref(answeredCount))} de ${ssrInterpolate(unref(totalQuestions))} afirmações respondidas </span>`);
      if (unref(totalGroups) > 0) {
        _push(`<span class="text-[0.7rem] text-slate-500 dark:text-slate-400"> Etapa ${ssrInterpolate(unref(currentGroupNumber))} de ${ssrInterpolate(unref(totalGroups))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="w-full max-w-xs"><div class="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"><div class="h-full bg-brand-500 dark:bg-amber-400" style="${ssrRenderStyle({ width: unref(overallProgressPercent) + "%" })}"></div></div></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tests/LikertTestProgress.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const LikertTestProgress = Object.assign(_sfc_main$4, { __name: "TestsLikertTestProgress" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "LikertTestResultsGeneric",
  __ssrInlineRender: true,
  props: {
    results: {},
    topSummaries: {}
  },
  setup(__props) {
    const props = __props;
    const { results, topSummaries } = toRefs(props);
    const weakestGroups = computed(() => {
      if (!results.value || results.value.length === 0) return [];
      const sortedAsc = [...results.value].slice().sort(
        (a, b) => a.average - b.average
      );
      return sortedAsc.slice(0, 3);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="space-y-3"><h3 class="font-display text-lg tracking-tight"> Aspectos mais predominantes </h3><div class="space-y-2"><!--[-->`);
      ssrRenderList(unref(topSummaries), (summary) => {
        _push(`<article class="rounded-xl border border-slate-200/80 bg-white/90 p-3 text-sm dark:border-slate-800 dark:bg-slate-900/80"><header class="mb-1 flex items-center justify-between gap-2 text-xs"><div><p class="font-medium">${ssrInterpolate(summary.name)}</p><p class="text-[0.7rem] text-slate-500 dark:text-slate-400">${ssrInterpolate(summary.title)}</p></div></header><p class="text-xs text-slate-600 dark:text-slate-300">${ssrInterpolate(summary.description)}</p></article>`);
      });
      _push(`<!--]--></div></div>`);
      if (weakestGroups.value.length) {
        _push(`<div class="space-y-3"><h3 class="font-display text-lg tracking-tight"> Aspectos que pedem fortalecimento </h3><ul class="space-y-1 text-xs text-slate-600 dark:text-slate-300"><!--[-->`);
        ssrRenderList(weakestGroups.value, (group) => {
          _push(`<li class="flex items-start gap-2"><span class="mt-[2px] h-1.5 w-1.5 rounded-full bg-red-400 dark:bg-red-300"></span><span><span class="font-medium">${ssrInterpolate(group.name)}</span><span class="text-slate-500 dark:text-slate-400"> - tende a se manifestar de forma mais frágil ou instável no momento. </span></span></li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tests/LikertTestResultsGeneric.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const LikertTestResultsGeneric = Object.assign(_sfc_main$3, { __name: "TestsLikertTestResultsGeneric" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "LikertTestResultsTemperaments",
  __ssrInlineRender: true,
  props: {
    results: {}
  },
  setup(__props) {
    const props = __props;
    const { results } = toRefs(props);
    const temperamentProfile = computed(() => {
      if (!results.value || results.value.length === 0) return null;
      const sorted = [...results.value].slice().sort(
        (a, b) => b.average - a.average
      );
      const primary = sorted[0];
      const secondary = sorted[1];
      const diff = secondary != null ? primary.average - secondary.average : 0;
      const isMixed = !!secondary && diff <= 0.5;
      return {
        primary,
        secondary: secondary ?? null,
        isMixed
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (temperamentProfile.value) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-3" }, _attrs))}><h3 class="font-display text-lg tracking-tight"> Seu temperamento </h3><div class="space-y-2 rounded-2xl border border-slate-200/80 bg-white/90 p-4 text-sm dark:border-slate-800 dark:bg-slate-900/80"><p class="text-sm text-slate-700 dark:text-slate-100"> Temperamento predominante: <span class="font-semibold">${ssrInterpolate(temperamentProfile.value.primary.name)}</span></p>`);
        if (temperamentProfile.value.isMixed && temperamentProfile.value.secondary) {
          _push(`<p class="text-xs text-slate-600 dark:text-slate-300"> Também há uma presença significativa de <span class="font-semibold">${ssrInterpolate(temperamentProfile.value.secondary.name)}</span>, formando um perfil misto (por exemplo, ${ssrInterpolate(temperamentProfile.value.primary.name)}–${ssrInterpolate(temperamentProfile.value.secondary.name)}). </p>`);
        } else {
          _push(`<p class="text-xs text-slate-600 dark:text-slate-300"> Os demais traços aparecem em segundo plano, como matizes do seu modo predominante de reagir, sentir e se relacionar. </p>`);
        }
        _push(`</div></section>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tests/LikertTestResultsTemperaments.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const LikertTestResultsTemperaments = Object.assign(_sfc_main$2, { __name: "TestsLikertTestResultsTemperaments" });
const LIKERT_SCALES = {
  agreement: {
    minLabel: "Discordo totalmente",
    maxLabel: "Concordo totalmente"
  },
  frequency: {
    minLabel: "Nunca",
    maxLabel: "Sempre"
  },
  intensity: {
    minLabel: "Muito baixo",
    maxLabel: "Muito alto"
  }
};
function resolveScaleLabels(scale, minOverride, maxOverride) {
  const fallback = LIKERT_SCALES.agreement;
  const base = scale ? LIKERT_SCALES[scale] ?? fallback : fallback;
  return {
    minLabel: minOverride ?? base.minLabel,
    maxLabel: maxOverride ?? base.maxLabel
  };
}
function useSaveResult() {
  const isSaving = ref(false);
  const lastError = ref(null);
  async function saveLikertResult(args) {
    return null;
  }
  return { saveLikertResult, isSaving, lastError };
}
function addScore(buckets, dimension, value) {
  if (!buckets[dimension]) {
    buckets[dimension] = [];
  }
  buckets[dimension].push(value);
}
function clampLikert(value) {
  if (Number.isNaN(value)) return 0;
  return Math.min(7, Math.max(1, value));
}
function computeLikertScores(answers, questions) {
  const buckets = {};
  for (const question of questions) {
    const raw = answers[question.key];
    if (typeof raw !== "number") continue;
    const reversed = question.reverse ? 8 - raw : raw;
    const value = clampLikert(reversed);
    addScore(buckets, question.dimension, value);
  }
  return buckets;
}
function computeRankScores(order, mapping) {
  const buckets = {};
  const optionIds = Object.keys(mapping);
  const optionCount = optionIds.length;
  if (optionCount === 0 || order.length === 0) return buckets;
  const denominator = Math.max(1, optionCount - 1);
  for (const optionId of optionIds) {
    const index = order.indexOf(optionId);
    if (index < 0) continue;
    const value = 7 - index * 6 / denominator;
    addScore(buckets, mapping[optionId], value);
  }
  return buckets;
}
function computePairwiseScores(choices, pairs) {
  const buckets = {};
  if (pairs.length === 0 || choices.length === 0) return buckets;
  pairs.forEach((pair, index) => {
    const selection = choices[index];
    if (selection !== pair.left.id && selection !== pair.right.id) return;
    const winner = selection === pair.left.id ? pair.left : pair.right;
    const loser = selection === pair.left.id ? pair.right : pair.left;
    addScore(buckets, winner.dimension, 7);
    addScore(buckets, loser.dimension, 1);
  });
  return buckets;
}
function computeChoiceScores(selected, mapping) {
  const buckets = {};
  const optionIds = Object.keys(mapping);
  if (optionIds.length === 0) return buckets;
  const selectedSet = new Set(selected);
  for (const optionId of optionIds) {
    const value = selectedSet.has(optionId) ? 7 : 1;
    addScore(buckets, mapping[optionId], value);
  }
  return buckets;
}
function buildAnswerKey(groupId, questionId) {
  return `${groupId}:${questionId}`;
}
function resolveQuestionSet(config) {
  return config.questionSet ?? config.groups;
}
function flattenQuestions(config) {
  const items = [];
  const groups = resolveQuestionSet(config);
  for (const group of groups) {
    for (const question of group.questions) {
      items.push({
        groupId: group.id,
        groupName: group.name,
        questionId: question.id,
        question
      });
    }
  }
  return items;
}
function isStringArray$1(value) {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}
function buildDimensionMap(options, overrides) {
  const map = {};
  for (const option of options) {
    map[option.id] = overrides?.[option.id] ?? option.id;
  }
  return map;
}
function sanitizeRankOrder(raw, options) {
  if (!isStringArray$1(raw)) return null;
  const optionIds = options.map((opt) => opt.id);
  if (raw.length !== optionIds.length) return null;
  if (new Set(raw).size !== optionIds.length) return null;
  if (raw.some((id) => !optionIds.includes(id))) return null;
  return raw;
}
function sanitizePairwiseChoices(raw, pairs) {
  if (pairs.length === 0) return null;
  const choices = isStringArray$1(raw) ? raw : typeof raw === "string" ? [raw] : null;
  if (!choices || choices.length !== pairs.length) return null;
  for (let index = 0; index < pairs.length; index += 1) {
    const pair = pairs[index];
    const selection = choices[index];
    if (selection !== pair.left.id && selection !== pair.right.id) {
      return null;
    }
  }
  return choices;
}
function sanitizeChoiceSelection(raw, options, multiple, minSelections, maxSelections) {
  const optionIds = options.map((opt) => opt.id);
  const rawList = isStringArray$1(raw) ? raw : typeof raw === "string" ? [raw] : null;
  if (!rawList) return null;
  const filtered = rawList.filter((id) => optionIds.includes(id));
  const unique = Array.from(new Set(filtered));
  const min = multiple ? typeof minSelections === "number" ? minSelections : 1 : 1;
  const max = multiple ? typeof maxSelections === "number" ? maxSelections : optionIds.length : 1;
  if (unique.length < min || unique.length > max) return null;
  if (!multiple && unique.length !== 1) return null;
  return unique;
}
function mergeScores(target, next) {
  for (const [dimension, values] of Object.entries(next)) {
    if (!target[dimension]) {
      target[dimension] = [];
    }
    target[dimension].push(...values);
  }
}
function scoreTest(config, answers) {
  const groups = resolveQuestionSet(config);
  const buckets = {};
  const likertInputs = [];
  const likertAnswers = {};
  const questions = flattenQuestions(config);
  for (const question of questions) {
    const key = buildAnswerKey(question.groupId, question.questionId);
    const raw = answers[key] ?? null;
    const q = question.question;
    if (q.type === "likert") {
      likertInputs.push({ key, dimension: q.dimension, reverse: q.reverse });
      likertAnswers[key] = typeof raw === "number" ? raw : null;
      continue;
    }
    if (q.type === "rank") {
      const order = sanitizeRankOrder(raw, q.options);
      if (!order) continue;
      const mapping2 = buildDimensionMap(q.options, q.dimensionMap);
      mergeScores(buckets, computeRankScores(order, mapping2));
      continue;
    }
    if (q.type === "pairwise") {
      const choices = sanitizePairwiseChoices(raw, q.pairs);
      if (!choices) continue;
      mergeScores(buckets, computePairwiseScores(choices, q.pairs));
      continue;
    }
    const selected = sanitizeChoiceSelection(
      raw,
      q.options,
      q.multiple,
      q.minSelections,
      q.maxSelections
    );
    if (!selected) continue;
    const mapping = buildDimensionMap(q.options, q.dimensionMap);
    mergeScores(buckets, computeChoiceScores(selected, mapping));
  }
  mergeScores(buckets, computeLikertScores(likertAnswers, likertInputs));
  const results = groups.map((group) => {
    const values = buckets[group.id] ?? [];
    const sum = values.reduce((total, value) => total + value, 0);
    return {
      groupId: group.id,
      name: group.name,
      average: values.length > 0 ? sum / values.length : 0
    };
  });
  results.sort((a, b) => b.average - a.average);
  return results;
}
function fieldKeyInternal(groupId, questionId) {
  return `${groupId}:${questionId}`;
}
function chooseStepSize(total) {
  const candidates = [5, 4, 6];
  const found = candidates.find((size) => total > 0 && total % size === 0);
  return found ?? 5;
}
function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}
function normalizePairwiseSelections(question, raw) {
  if (question.pairs.length === 0) return null;
  const selections = isStringArray(raw) ? raw : typeof raw === "string" ? [raw] : null;
  if (!selections) return null;
  return question.pairs.map((pair, index) => {
    const selection = selections[index];
    if (selection === pair.left.id || selection === pair.right.id) {
      return selection;
    }
    return "";
  });
}
function isAnswerComplete(question, answer) {
  const q = question.question;
  if (q.type === "likert") {
    return typeof answer === "number" && !Number.isNaN(answer);
  }
  if (q.type === "pairwise") {
    const normalized = normalizePairwiseSelections(q, answer);
    if (!normalized) return false;
    return q.pairs.every((pair, index) => {
      const selection = normalized[index];
      return selection === pair.left.id || selection === pair.right.id;
    });
  }
  if (q.type === "rank") {
    if (!isStringArray(answer)) return false;
    if (answer.length !== q.options.length) return false;
    const optionIds = new Set(q.options.map((opt) => opt.id));
    if (answer.some((id) => !optionIds.has(id))) return false;
    return new Set(answer).size === q.options.length;
  }
  if (!isStringArray(answer)) return false;
  const minSelections = typeof q.minSelections === "number" ? q.minSelections : 1;
  const maxSelections = typeof q.maxSelections === "number" ? q.maxSelections : q.options.length;
  if (q.multiple) {
    return answer.length >= minSelections && answer.length <= maxSelections;
  }
  return answer.length === 1;
}
function useLikertTestRunner(config, options) {
  const cfg = isRef(config) ? config : ref(config);
  const answers = reactive({});
  const currentGroupIndex = ref(0);
  const submittedCurrentStep = ref(false);
  const results = ref(null);
  const lastResultId = ref(null);
  const conceptualGroups = computed(
    () => cfg.value.questionSet ?? cfg.value.groups
  );
  const flatQuestions = computed(() => {
    const items = [];
    for (const group of conceptualGroups.value) {
      for (const q of group.questions) {
        items.push({
          groupId: group.id,
          groupName: group.name,
          questionId: q.id,
          text: q.text,
          question: q
        });
      }
    }
    return items;
  });
  computed(() => {
    const map = /* @__PURE__ */ new Map();
    for (const item of flatQuestions.value) {
      map.set(fieldKeyInternal(item.groupId, item.questionId), item);
    }
    return map;
  });
  const orderedQuestions = ref([]);
  const stepSize = computed(() => chooseStepSize(flatQuestions.value.length));
  const steps = computed(() => {
    const base = orderedQuestions.value.length > 0 ? orderedQuestions.value : flatQuestions.value;
    const size = stepSize.value;
    const chunks = [];
    for (let i = 0; i < base.length; i += size) {
      chunks.push({
        id: `step-${i / size + 1}`,
        questions: base.slice(i, i + size)
      });
    }
    return chunks;
  });
  const groups = computed(() => steps.value);
  const totalGroups = computed(() => groups.value.length);
  const groupLabel = computed(() => cfg.value.groupsLabel ?? "Etapa");
  const currentGroup = computed(
    () => groups.value[currentGroupIndex.value] ?? null
  );
  const currentGroupNumber = computed(
    () => currentGroupIndex.value + 1
  );
  const isFirstGroup = computed(
    () => currentGroupIndex.value === 0
  );
  const isLastGroup = computed(
    () => currentGroupIndex.value === totalGroups.value - 1
  );
  function fieldKey(groupId, questionId) {
    return fieldKeyInternal(groupId, questionId);
  }
  const totalQuestions = computed(
    () => flatQuestions.value.length
  );
  const answeredCount = computed(() => {
    let count = 0;
    for (const question of flatQuestions.value) {
      const key = fieldKeyInternal(question.groupId, question.questionId);
      if (isAnswerComplete(question, answers[key] ?? null)) count += 1;
    }
    return count;
  });
  function isStepComplete(step) {
    return step.questions.every(
      (q) => isAnswerComplete(
        q,
        answers[fieldKeyInternal(q.groupId, q.questionId)] ?? null
      )
    );
  }
  function isTestComplete() {
    return flatQuestions.value.every(
      (q) => isAnswerComplete(
        q,
        answers[fieldKeyInternal(q.groupId, q.questionId)] ?? null
      )
    );
  }
  const currentGroupTotalQuestions = computed(
    () => currentGroup.value ? currentGroup.value.questions.length : 0
  );
  const currentGroupAnsweredCount = computed(() => {
    const group = currentGroup.value;
    if (!group) return 0;
    return group.questions.filter(
      (q) => isAnswerComplete(
        q,
        answers[fieldKeyInternal(q.groupId, q.questionId)] ?? null
      )
    ).length;
  });
  const canGoNext = computed(() => {
    const group = currentGroup.value;
    if (!group) return false;
    return isStepComplete(group);
  });
  const overallProgressPercent = computed(() => {
    if (totalQuestions.value === 0) return 0;
    const ratio = answeredCount.value / totalQuestions.value;
    return Math.min(100, Math.round(ratio * 100));
  });
  computed(
    () => `likert-test:${cfg.value.slug}:answers`
  );
  watch(
    () => ({ ...answers }),
    (value) => {
      return;
    },
    { deep: true }
  );
  function getSummaryRule(score) {
    const rules = cfg.value.scoring.summaryRules;
    if (!rules || !rules.length) return null;
    return rules.find((rule) => score >= rule.min && score <= rule.max) ?? null;
  }
  const topSummaries = computed(() => {
    if (!results.value) return [];
    const top = results.value.slice(0, 3);
    return top.map((result) => {
      const rule = getSummaryRule(result.average);
      if (!rule) return null;
      const description = rule.descriptionTemplate.replace(
        /{{LAYER}}/g,
        result.name
      );
      return {
        groupId: result.groupId,
        name: result.name,
        average: result.average,
        title: rule.title,
        description
      };
    }).filter(
      (item) => item !== null
    );
  });
  const { saveLikertResult, isSaving } = useSaveResult();
  async function computeResults() {
    const allComplete = isTestComplete();
    if (!allComplete) {
      submittedCurrentStep.value = true;
      return;
    }
    const groupResults = scoreTest(cfg.value, answers);
    results.value = groupResults;
    const savedId = await saveLikertResult({
      config: cfg.value,
      answers,
      results: groupResults,
      topSummaries: topSummaries.value
    });
    lastResultId.value = savedId ?? null;
  }
  function goPrevious() {
    if (currentGroupIndex.value === 0) return;
    submittedCurrentStep.value = false;
    currentGroupIndex.value -= 1;
  }
  function isQuestionAnswered(question) {
    return isAnswerComplete(
      question,
      answers[fieldKeyInternal(question.groupId, question.questionId)] ?? null
    );
  }
  function goNext() {
    if (!currentGroup.value) return;
    if (!canGoNext.value) {
      submittedCurrentStep.value = true;
      return;
    }
    submittedCurrentStep.value = false;
    if (isLastGroup.value) {
      void computeResults();
    } else {
      currentGroupIndex.value += 1;
    }
  }
  return {
    config: cfg,
    answers,
    currentGroupIndex,
    submittedCurrentStep,
    results,
    lastResultId,
    isSaving,
    groups,
    totalGroups,
    groupLabel,
    currentGroup,
    currentGroupNumber,
    isFirstGroup,
    isLastGroup,
    totalQuestions,
    answeredCount,
    currentGroupTotalQuestions,
    currentGroupAnsweredCount,
    canGoNext,
    overallProgressPercent,
    topSummaries,
    isQuestionAnswered,
    fieldKey,
    goPrevious,
    goNext
  };
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LikertTestView",
  __ssrInlineRender: true,
  props: {
    config: {},
    fresh: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const { config } = toRefs(props);
    const router = useRouter();
    const supabaseUser = useSupabaseUser();
    const actorKey = computed(() => {
      const userKey = buildUserActorKey(supabaseUser.value?.id ?? null);
      if (userKey) return userKey;
      const clientId = getOrCreateClientId();
      return buildClientActorKey(clientId);
    });
    const storedLastResultId = computed(
      () => getLastResultId(config.value.slug, actorKey.value)
    );
    const skipAutoComputeOnMount = computed(
      () => props.fresh !== true && Boolean(storedLastResultId.value)
    );
    function getScaleLabels(question) {
      if (question.type !== "likert") return null;
      return resolveScaleLabels(
        question.scaleKey ?? config.value.scale,
        config.value.scaleMinLabel,
        config.value.scaleMaxLabel
      );
    }
    const {
      answers,
      currentGroupIndex,
      submittedCurrentStep,
      results,
      lastResultId,
      isSaving,
      totalGroups,
      currentGroup,
      currentGroupNumber,
      isFirstGroup,
      isLastGroup,
      totalQuestions,
      answeredCount,
      currentGroupTotalQuestions,
      currentGroupAnsweredCount,
      canGoNext,
      overallProgressPercent,
      topSummaries,
      isQuestionAnswered,
      fieldKey,
      goPrevious
    } = useLikertTestRunner(config, {
      fresh: props.fresh === true,
      skipAutoComputeOnMount: skipAutoComputeOnMount.value
    });
    const questionRefs = ref([]);
    const shouldRedirectOnComplete = ref(false);
    function questionKey(question) {
      return fieldKey(question.groupId, question.questionId);
    }
    function questionLabelId(question) {
      return `question-${questionKey(question).replace(/:/g, "-")}`;
    }
    function questionErrorId(question) {
      return `question-error-${questionKey(question).replace(/:/g, "-")}`;
    }
    function isQuestionInvalid(question) {
      return submittedCurrentStep.value && !isQuestionAnswered(question);
    }
    watch(currentGroupIndex, () => {
      questionRefs.value = [];
      submittedCurrentStep.value = false;
      return;
    });
    watch(lastResultId, (id) => {
      if (!id || !shouldRedirectOnComplete.value) return;
      shouldRedirectOnComplete.value = false;
      setLastResultId(config.value.slug, id, actorKey.value);
      router.push({ path: `/resultados/${id}`, query: { t: config.value.slug } });
    });
    function handleQuestionAnswered(questionIndex) {
      return;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_reveal = resolveDirective("reveal");
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(LikertTestHeader, { config: unref(config) }, null, _parent));
      _push(ssrRenderComponent(LikertTestProgress, {
        "answered-count": unref(answeredCount),
        "total-questions": unref(totalQuestions),
        "total-groups": unref(totalGroups),
        "current-group-number": unref(currentGroupNumber),
        "overall-progress-percent": unref(overallProgressPercent)
      }, null, _parent));
      _push(`<form class="space-y-6">`);
      if (unref(currentGroup)) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          "data-test-step-container": "",
          class: "rounded-2xl border border-slate-200/80 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-900/80 reveal"
        }, ssrGetDirectiveProps(_ctx, _directive_reveal, 120)))}><div class="mb-3 flex items-start justify-between gap-3"><div><h3 class="text-sm font-semibold leading-tight">Afirmações</h3><p class="text-xs text-slate-500 dark:text-slate-400"> Responda com sinceridade; não há respostas certas ou erradas. </p></div><span class="text-[0.65rem] text-slate-500 dark:text-slate-400">${ssrInterpolate(unref(currentGroupAnsweredCount))} / ${ssrInterpolate(unref(currentGroupTotalQuestions))} afirmações desta etapa </span></div><div class="space-y-4"><!--[-->`);
        ssrRenderList(unref(currentGroup).questions, (question, questionIndex) => {
          _push(`<div class="space-y-3 rounded-xl bg-slate-50/70 p-4 dark:bg-slate-800/80" tabindex="0"><p${ssrRenderAttr("id", questionLabelId(question))} class="text-sm font-medium text-slate-800 dark:text-slate-100">${ssrInterpolate(question.text)}</p><div class="text-[0.7rem] text-slate-500 dark:text-slate-400"> Afirmação ${ssrInterpolate(questionIndex + 1)} de ${ssrInterpolate(unref(currentGroupTotalQuestions))}</div>`);
          _push(ssrRenderComponent(QuestionRenderer, {
            question: question.question,
            "model-value": unref(answers)[questionKey(question)] ?? null,
            name: questionKey(question),
            "min-label": getScaleLabels(question.question)?.minLabel,
            "max-label": getScaleLabels(question.question)?.maxLabel,
            "labelled-by-id": questionLabelId(question),
            "described-by-id": isQuestionInvalid(question) ? questionErrorId(question) : void 0,
            disabled: unref(isSaving),
            error: isQuestionInvalid(question),
            "onUpdate:modelValue": (value) => {
              unref(answers)[questionKey(question)] = value;
            },
            onAnswered: ($event) => handleQuestionAnswered()
          }, null, _parent));
          if (isQuestionInvalid(question)) {
            _push(`<p${ssrRenderAttr("id", questionErrorId(question))} class="text-[0.7rem] text-red-500"> Responda esta afirmação. </p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex flex-wrap items-center justify-between gap-3">`);
      _push(ssrRenderComponent(BaseButton, {
        type: "button",
        class: "!bg-slate-200 !text-slate-800 hover:!bg-slate-300 dark:!bg-slate-800 dark:!text-slate-50 dark:hover:!bg-slate-700",
        disabled: unref(isFirstGroup),
        onClick: unref(goPrevious)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Voltar `);
          } else {
            return [
              createTextVNode(" Voltar ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(BaseButton, {
        type: "submit",
        disabled: !unref(canGoNext) || unref(isSaving),
        variant: unref(isLastGroup) ? "gradient" : "gradient"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!unref(isLastGroup)) {
              _push2(`<span${_scopeId}>Continuar</span>`);
            } else {
              _push2(`<span${_scopeId}>Ver resultado</span>`);
            }
          } else {
            return [
              !unref(isLastGroup) ? (openBlock(), createBlock("span", { key: 0 }, "Continuar")) : (openBlock(), createBlock("span", { key: 1 }, "Ver resultado"))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form>`);
      if (unref(isSaving)) {
        _push(`<div class="space-y-3">`);
        _push(ssrRenderComponent(SkeletonBlock, { class: "h-6 w-1/3" }, null, _parent));
        _push(ssrRenderComponent(SkeletonBlock, { class: "h-24 w-full rounded-2xl" }, null, _parent));
        _push(ssrRenderComponent(SkeletonBlock, { class: "h-24 w-full rounded-2xl" }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(results) && unref(results).length && unref(config).category !== "temperaments") {
        _push(ssrRenderComponent(LikertTestResultsGeneric, {
          results: unref(results),
          "top-summaries": unref(topSummaries)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(results) && unref(results).length && unref(config).category === "temperaments") {
        _push(ssrRenderComponent(LikertTestResultsTemperaments, { results: unref(results) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tests/LikertTestView.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const LikertTestView = Object.assign(_sfc_main$1, { __name: "TestsLikertTestView" });
function useLastResultRedirect() {
  useRouter();
  const supabaseUser = useSupabaseUser();
  const actorKey = computed(() => {
    const userKey = buildUserActorKey(supabaseUser.value?.id ?? null);
    if (userKey) return userKey;
    const clientId = getOrCreateClientId();
    return buildClientActorKey(clientId);
  });
  function getActorKey() {
    return actorKey.value;
  }
  async function tryRedirectToLastResult(slug) {
    return false;
  }
  return {
    getActorKey,
    tryRedirectToLastResult
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const requestedSlug = String(route.params.slug || "");
    const canonicalSlug = getCanonicalTestSlug(requestedSlug);
    if (requestedSlug !== canonicalSlug) {
      [__temp, __restore] = withAsyncContext(() => navigateTo(
        {
          path: `/testes/${canonicalSlug}`,
          query: route.query
        },
        { redirectCode: 302 }
      )), await __temp, __restore();
    }
    if (!isEnabledTestSlug(canonicalSlug)) {
      throw createError({
        statusCode: 404,
        statusMessage: "Test not found"
      });
    }
    const slug = canonicalSlug;
    const testConfig = getTestBySlug(slug);
    if (!testConfig) {
      throw createError({
        statusCode: 404,
        statusMessage: "Test not found"
      });
    }
    const isFresh = computed(() => {
      const value = route.query.fresh;
      if (Array.isArray(value)) return value.includes("1");
      return value === "1";
    });
    useLastResultRedirect();
    ref(false);
    ref(false);
    const SEO_BY_SLUG = {
      "twelve-layers": {
        title: "Teste das 12 camadas da personalidade",
        description: "Explore suas camadas internas e descubra padroes de personalidade com perguntas guiadas."
      },
      temperaments: {
        title: "Teste dos temperamentos classicos",
        description: "Identifique seu temperamento dominante e como ele influencia suas escolhas diarias."
      },
      "temperaments-compatibility": {
        title: "Teste de compatibilidade de temperamentos",
        description: "Veja afinidades de estilo relacional e pontos de ajuste para convivencias mais harmoniosas."
      }
    };
    const TEST_CATEGORY_BY_SLUG = {
      "twelve-layers": "personalidade",
      temperaments: "temperamentos",
      "temperaments-compatibility": "relacionamentos"
    };
    const faqItems = computed(() => getFaqByTestSlug(slug));
    const relatedArticles = computed(() => {
      const category = TEST_CATEGORY_BY_SLUG[slug];
      return getAllArticles().filter((article) => article.category === category).slice(0, 4);
    });
    const seoData = computed(() => {
      return SEO_BY_SLUG[slug] ?? {
        title: testConfig.title,
        description: testConfig.description
      };
    });
    useSeoMeta(() => ({
      title: seoData.value.title,
      description: seoData.value.description
    }));
    useHead(() => {
      if (!faqItems.value.length) return {};
      return {
        script: [
          {
            type: "application/ld+json",
            children: JSON.stringify(buildFaqSchema(faqItems.value))
          }
        ]
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-4xl px-4 py-8" }, _attrs))}><div class="space-y-10">`);
      _push(ssrRenderComponent(LikertTestView, {
        config: unref(testConfig),
        fresh: isFresh.value
      }, null, _parent));
      if (relatedArticles.value.length) {
        _push(ssrRenderComponent(RelatedArticles, {
          title: "Artigos relacionados",
          articles: relatedArticles.value,
          description: "Leituras alinhadas ao tema deste teste."
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (faqItems.value.length) {
        _push(ssrRenderComponent(FaqSection, {
          title: "Perguntas frequentes",
          items: faqItems.value,
          description: "Respostas rapidas para as duvidas mais comuns sobre este teste."
        }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/testes/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-C_k13LQg.mjs.map
