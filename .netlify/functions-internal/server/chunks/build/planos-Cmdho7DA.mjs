import { d as useRoute, e as useSupabaseUser, f as useLazyAsyncData, a as useSeoMeta, _ as __nuxt_component_0$1, c as __nuxt_component_1 } from './server.mjs';
import { defineComponent, ref, watch, computed, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { g as getSupabaseAccessToken } from './authToken-u3KDyLrx.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "PlanCard",
  __ssrInlineRender: true,
  props: {
    plan: {},
    isLoggedIn: { type: Boolean },
    isPremium: { type: Boolean },
    isLoading: { type: Boolean }
  },
  emits: ["checkout", "portal"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isFreePlan = computed(() => props.plan.key === "free");
    const canManage = computed(
      () => props.isLoggedIn && props.isPremium && !isFreePlan.value
    );
    const actionLabel = computed(
      () => canManage.value ? "Gerenciar assinatura" : props.plan.ctaLabel
    );
    const loadingLabel = computed(() => canManage.value ? "Abrindo..." : "Iniciando...");
    const priceLabel = computed(() => {
      const price = props.plan.price;
      if (!price || price.unitAmount === 0) {
        return "R$ 0";
      }
      const value = price.unitAmount / 100;
      return `R$ ${value.toLocaleString("pt-BR", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      })}`;
    });
    const cadenceLabel = computed(() => {
      const price = props.plan.price;
      if (!price || price.unitAmount === 0) {
        return "para sempre";
      }
      if (price.interval === "month") return "por mes";
      if (price.interval === "year") return "por ano";
      return "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<article${ssrRenderAttrs(mergeProps({
        class: [
          "flex h-full flex-col rounded-2xl border bg-white/95 p-5 shadow-sm transition dark:bg-slate-900/80",
          __props.plan.highlight ? "border-indigo-300 shadow-md dark:border-amber-300/70" : "border-slate-200 dark:border-slate-800"
        ]
      }, _attrs))}><div class="space-y-2"><div class="flex items-center gap-2"><p class="text-sm font-semibold text-slate-900 dark:text-slate-50">${ssrInterpolate(__props.plan.name)}</p>`);
      if (__props.plan.badge) {
        _push(`<span class="rounded-full bg-indigo-100 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-indigo-700 dark:bg-amber-300/20 dark:text-amber-200">${ssrInterpolate(__props.plan.badge)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><p class="text-xs text-slate-500 dark:text-slate-400">${ssrInterpolate(__props.plan.description)}</p></div><div class="mt-4 flex items-end gap-2"><span class="text-3xl font-semibold text-slate-900 dark:text-slate-50">${ssrInterpolate(priceLabel.value)}</span><span class="text-xs text-slate-500 dark:text-slate-400">${ssrInterpolate(cadenceLabel.value)}</span></div><ul class="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-300"><!--[-->`);
      ssrRenderList(__props.plan.features, (feature) => {
        _push(`<li class="flex items-start gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:check",
          size: "16",
          class: "mt-0.5 text-indigo-600 dark:text-amber-300"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(feature)}</span></li>`);
      });
      _push(`<!--]--></ul><div class="mt-6">`);
      if (isFreePlan.value) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/testes",
          "data-cy": `plan-action-${__props.plan.key}`,
          class: "inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-amber-300 dark:hover:text-amber-200"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.plan.ctaLabel)}`);
            } else {
              return [
                createTextVNode(toDisplayString(__props.plan.ctaLabel), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<button type="button"${ssrRenderAttr("data-cy", `plan-action-${__props.plan.key}`)} class="${ssrRenderClass([
          __props.plan.highlight ? "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-amber-300 dark:text-slate-900" : "border border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-amber-300 dark:hover:text-amber-200",
          "inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-amber-300/80 dark:focus-visible:ring-offset-slate-950"
        ])}"${ssrIncludeBooleanAttr(__props.isLoading) ? " disabled" : ""}>`);
        if (__props.isLoading) {
          _push(`<span>${ssrInterpolate(loadingLabel.value)}</span>`);
        } else {
          _push(`<span>${ssrInterpolate(actionLabel.value)}</span>`);
        }
        _push(`</button>`);
      }
      _push(`</div></article>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/billing/PlanCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const PlanCard = Object.assign(_sfc_main$2, { __name: "BillingPlanCard" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PlansGrid",
  __ssrInlineRender: true,
  props: {
    plans: {},
    customer: {},
    checkoutPlan: {},
    portalLoading: { type: Boolean }
  },
  emits: ["checkout", "portal"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    function isPlanLoading(planKey) {
      if (props.customer.isPremium && planKey !== "free") {
        return props.portalLoading;
      }
      return props.checkoutPlan === planKey;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid gap-6 md:grid-cols-3" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.plans, (plan) => {
        _push(ssrRenderComponent(PlanCard, {
          key: plan.key,
          plan,
          "is-logged-in": __props.customer.isLoggedIn,
          "is-premium": __props.customer.isPremium,
          "is-loading": isPlanLoading(plan.key),
          onCheckout: ($event) => emit("checkout", $event),
          onPortal: ($event) => emit("portal")
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/billing/PlansGrid.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const PlansGrid = Object.assign(_sfc_main$1, { __name: "BillingPlansGrid" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "planos",
  __ssrInlineRender: true,
  setup(__props) {
    const fallbackPlans = [
      {
        key: "free",
        name: "Essencial",
        description: "Para explorar os testes principais.",
        price: { id: "price_free", unitAmount: 0, currency: "BRL" },
        features: [
          "Resultados essenciais e visao geral",
          "Acesso a testes publicos",
          "Historico salvo no navegador"
        ],
        ctaLabel: "Comecar agora"
      },
      {
        key: "premium_monthly",
        name: "Premium mensal",
        description: "Flexibilidade para ir mais fundo.",
        price: {
          id: "price_premium_monthly",
          unitAmount: 2900,
          currency: "BRL",
          interval: "month",
          intervalCount: 1
        },
        features: [
          "Relatorios completos em todos os testes",
          "PDF premium para baixar",
          "Historico sincronizado na nuvem",
          "Prioridade em novos testes"
        ],
        badge: "Flexivel",
        ctaLabel: "Assinar mensal"
      },
      {
        key: "premium_annual",
        name: "Premium anual",
        description: "Economia para quem leva a jornada a serio.",
        price: {
          id: "price_premium_annual",
          unitAmount: 29e3,
          currency: "BRL",
          interval: "year",
          intervalCount: 1
        },
        features: [
          "Tudo do plano mensal",
          "Economia equivalente a 2 meses",
          "Atendimento prioritario",
          "Acesso antecipado a novos relatorios"
        ],
        badge: "Melhor valor",
        highlight: true,
        ctaLabel: "Assinar anual"
      }
    ];
    const fallbackCustomer = { isLoggedIn: false, isPremium: false };
    const route = useRoute();
    const supabaseUser = useSupabaseUser();
    const checkoutPlan = ref(null);
    const portalLoading = ref(false);
    const requestError = ref(null);
    const loadedFor = ref(null);
    const { data, refresh } = useLazyAsyncData(
      () => "billing-plans",
      async () => {
        const token = await getSupabaseAccessToken();
        const headers = {};
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        return await $fetch("/api/billing/plans", {
          credentials: "include",
          headers: Object.keys(headers).length ? headers : void 0
        });
      },
      {
        server: false,
        default: () => ({ plans: fallbackPlans, customer: fallbackCustomer }),
        getCachedData: () => void 0
      }
    );
    watch(
      () => supabaseUser.value?.id,
      async (id) => {
        if (!id) {
          loadedFor.value = null;
          await refresh();
          return;
        }
        if (loadedFor.value === id) return;
        loadedFor.value = id;
        await refresh();
      },
      { immediate: true }
    );
    const plans = computed(() => data.value?.plans ?? fallbackPlans);
    const customer = computed(
      () => data.value?.customer ?? fallbackCustomer
    );
    const statusMessage = computed(() => {
      const status = route.query.status;
      if (status === "success") {
        return "Pagamento confirmado. Em instantes liberamos o acesso premium.";
      }
      if (status === "cancel") {
        return "Checkout cancelado. Voce pode retomar a qualquer momento.";
      }
      if (status === "portal") {
        return "Portal de cobranca em preparacao. Em breve voce podera gerenciar sua assinatura.";
      }
      return "";
    });
    const statusTone = computed(() => {
      const status = route.query.status;
      if (status === "success") {
        return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-700/70 dark:bg-emerald-950/40 dark:text-emerald-200";
      }
      if (status === "cancel") {
        return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800/60 dark:bg-amber-950/40 dark:text-amber-200";
      }
      if (status === "portal") {
        return "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-700/60 dark:bg-indigo-950/40 dark:text-indigo-200";
      }
      return "border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300";
    });
    async function startCheckout(plan) {
      return;
    }
    async function startPortal() {
      return;
    }
    useSeoMeta({
      title: "Planos e assinatura premium",
      description: "Escolha o plano ideal para desbloquear relatorios premium do Speculum Animae."
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-12" }, _attrs))}><section class="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-indigo-50 px-6 py-8 shadow-sm dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 md:px-10 md:py-12"><div class="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-indigo-200/60 blur-3xl dark:bg-amber-300/20" aria-hidden="true"></div><div class="pointer-events-none absolute bottom-0 left-0 h-40 w-40 -translate-x-1/3 translate-y-1/3 rounded-full bg-slate-200/70 blur-3xl dark:bg-slate-700/40" aria-hidden="true"></div><div class="relative z-10 space-y-4"><p class="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400"> Planos </p><h1 class="font-display text-3xl tracking-tight text-slate-900 dark:text-slate-50 md:text-4xl"> Assinatura premium para aprofundar seus resultados. </h1><p class="max-w-2xl text-sm text-slate-600 dark:text-slate-300"> Desbloqueie relatorios completos, PDFs premium e historico na nuvem. Escolha o ritmo que combina com a sua jornada e cancele quando quiser. </p><div class="flex flex-wrap items-center gap-3"><a href="#precos" class="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-sm transition hover:bg-indigo-700 dark:bg-amber-300 dark:text-slate-900"> Ver precos </a>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/testes",
        class: "inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/80 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-amber-300 dark:hover:text-amber-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Explorar testes `);
          } else {
            return [
              createTextVNode(" Explorar testes ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="text-xs text-slate-500 dark:text-slate-400"> Se estiver logado, usamos seu e-mail automaticamente no checkout. </p></div></section>`);
      if (statusMessage.value) {
        _push(`<div class="${ssrRenderClass([statusTone.value, "rounded-xl border px-4 py-3 text-xs shadow-sm"])}">${ssrInterpolate(statusMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section id="precos" class="space-y-6"><header class="space-y-2"><p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400"> Planos e valores </p><h2 class="text-xl font-semibold text-slate-900 dark:text-slate-50"> Escolha o plano ideal para voce. </h2><p class="text-sm text-slate-600 dark:text-slate-300"> Todos os planos pagos liberam relatorios completos, PDF premium e acesso prioritario a novos testes. </p></header>`);
      _push(ssrRenderComponent(PlansGrid, {
        plans: plans.value,
        customer: customer.value,
        "checkout-plan": checkoutPlan.value,
        "portal-loading": portalLoading.value,
        onCheckout: startCheckout,
        onPortal: startPortal
      }, null, _parent));
      if (requestError.value) {
        _push(`<div class="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700 dark:border-rose-800/80 dark:bg-rose-950/40 dark:text-rose-200">${ssrInterpolate(requestError.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section><section class="grid gap-6 md:grid-cols-2"><article class="space-y-4 rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><div class="space-y-2"><p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"> O que voce desbloqueia </p><h3 class="text-lg font-semibold text-slate-900 dark:text-slate-50"> Relatorios completos e praticos. </h3><p class="text-sm text-slate-600 dark:text-slate-300"> Cada relatorio premium traz interpretacoes, pontos de atencao e caminhos de crescimento. </p></div><ul class="space-y-2 text-sm text-slate-600 dark:text-slate-300"><li class="flex items-start gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:star-outline",
        size: "18",
        class: "mt-0.5 text-indigo-600 dark:text-amber-300"
      }, null, _parent));
      _push(`<span>Analise profunda de resultados e combinacoes.</span></li><li class="flex items-start gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:file-pdf-box",
        size: "18",
        class: "mt-0.5 text-indigo-600 dark:text-amber-300"
      }, null, _parent));
      _push(`<span>PDF premium para baixar e guardar.</span></li><li class="flex items-start gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:cloud-outline",
        size: "18",
        class: "mt-0.5 text-indigo-600 dark:text-amber-300"
      }, null, _parent));
      _push(`<span>Historico sincronizado para rever quando quiser.</span></li></ul></article><article class="space-y-4 rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><div class="space-y-2"><p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"> Garantias </p><h3 class="text-lg font-semibold text-slate-900 dark:text-slate-50"> Flexibilidade total para voce. </h3><p class="text-sm text-slate-600 dark:text-slate-300"> Assine com tranquilidade. Voce pode cancelar ou trocar de plano quando quiser. </p></div><div class="grid gap-3 text-xs text-slate-600 dark:text-slate-300 sm:grid-cols-2"><div class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 dark:border-slate-800 dark:bg-slate-950"><p class="text-xs font-semibold text-slate-900 dark:text-slate-50">Cancelamento rapido</p><p class="mt-1 text-[0.7rem] text-slate-500 dark:text-slate-400"> Sem fidelidade ou letras miudas. </p></div><div class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 dark:border-slate-800 dark:bg-slate-950"><p class="text-xs font-semibold text-slate-900 dark:text-slate-50">Suporte humano</p><p class="mt-1 text-[0.7rem] text-slate-500 dark:text-slate-400"> Resolvemos duvidas com agilidade. </p></div></div></article></section><section class="space-y-4"><header class="space-y-2"><p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400"> Perguntas frequentes </p><h3 class="text-lg font-semibold text-slate-900 dark:text-slate-50"> Dicas antes de assinar. </h3></header><div class="grid gap-4 md:grid-cols-2"><details class="group rounded-xl border border-slate-200 bg-white/95 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><summary class="cursor-pointer text-sm font-semibold text-slate-800 dark:text-slate-100"> O que muda no relatorio premium? </summary><p class="mt-2 text-xs text-slate-600 dark:text-slate-300"> Voce recebe interpretacoes completas, secao de crescimento, alertas e PDF para baixar. </p></details><details class="group rounded-xl border border-slate-200 bg-white/95 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><summary class="cursor-pointer text-sm font-semibold text-slate-800 dark:text-slate-100"> Posso cancelar quando quiser? </summary><p class="mt-2 text-xs text-slate-600 dark:text-slate-300"> Sim. Voce pode cancelar a qualquer momento pelo checkout ou entrando em contato com o suporte. </p></details><details class="group rounded-xl border border-slate-200 bg-white/95 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><summary class="cursor-pointer text-sm font-semibold text-slate-800 dark:text-slate-100"> Preciso estar logado para assinar? </summary><p class="mt-2 text-xs text-slate-600 dark:text-slate-300"> Recomendamos entrar para vincular a assinatura automaticamente ao seu perfil. </p></details><details class="group rounded-xl border border-slate-200 bg-white/95 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><summary class="cursor-pointer text-sm font-semibold text-slate-800 dark:text-slate-100"> Quais formas de pagamento estao disponiveis? </summary><p class="mt-2 text-xs text-slate-600 dark:text-slate-300"> Cartoes de credito e debitados habilitados no Stripe Checkout. </p></details></div></section></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/planos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=planos-Cmdho7DA.mjs.map
