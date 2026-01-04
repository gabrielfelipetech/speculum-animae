<template>
  <section class="space-y-12">
    <section
      class="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-indigo-50 px-6 py-8 shadow-sm dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 md:px-10 md:py-12"
    >
      <div
        class="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-indigo-200/60 blur-3xl dark:bg-amber-300/20"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute bottom-0 left-0 h-40 w-40 -translate-x-1/3 translate-y-1/3 rounded-full bg-slate-200/70 blur-3xl dark:bg-slate-700/40"
        aria-hidden="true"
      />

      <div class="relative z-10 space-y-4">
        <p
          class="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400"
        >
          Planos
        </p>
        <h1 class="font-display text-3xl tracking-tight text-slate-900 dark:text-slate-50 md:text-4xl">
          Assinatura premium para aprofundar seus resultados.
        </h1>
        <p class="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
          Desbloqueie relatorios completos, PDFs premium e historico na nuvem. Escolha o ritmo
          que combina com a sua jornada e cancele quando quiser.
        </p>

        <div class="flex flex-wrap items-center gap-3">
          <a
            href="#precos"
            class="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-sm transition hover:bg-indigo-700 dark:bg-amber-300 dark:text-slate-900"
          >
            Ver precos
          </a>
          <NuxtLink
            to="/testes"
            class="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/80 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-amber-300 dark:hover:text-amber-200"
          >
            Explorar testes
          </NuxtLink>
        </div>

        <p class="text-xs text-slate-500 dark:text-slate-400">
          Se estiver logado, usamos seu e-mail automaticamente no checkout.
        </p>
      </div>
    </section>

    <div
      v-if="statusMessage"
      class="rounded-xl border px-4 py-3 text-xs shadow-sm"
      :class="statusTone"
    >
      {{ statusMessage }}
    </div>

    <section id="precos" class="space-y-6">
      <header class="space-y-2">
        <p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
          Planos e valores
        </p>
        <h2 class="text-xl font-semibold text-slate-900 dark:text-slate-50">
          Escolha o plano ideal para voce.
        </h2>
        <p class="text-sm text-slate-600 dark:text-slate-300">
          Todos os planos pagos liberam relatorios completos, PDF premium e acesso prioritario a
          novos testes.
        </p>
      </header>

      <PlansGrid
        :plans="plans"
        :customer="customer"
        :checkout-plan="checkoutPlan"
        :portal-loading="portalLoading"
        @checkout="startCheckout"
        @portal="startPortal"
      />

      <div
        v-if="requestError"
        class="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700 dark:border-rose-800/80 dark:bg-rose-950/40 dark:text-rose-200"
      >
        {{ requestError }}
      </div>
    </section>

    <section class="grid gap-6 md:grid-cols-2">
      <article class="space-y-4 rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <div class="space-y-2">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            O que voce desbloqueia
          </p>
          <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-50">
            Relatorios completos e praticos.
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-300">
            Cada relatorio premium traz interpretacoes, pontos de atencao e caminhos de crescimento.
          </p>
        </div>
        <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <li class="flex items-start gap-2">
            <Icon name="mdi:star-outline" size="18" class="mt-0.5 text-indigo-600 dark:text-amber-300" />
            <span>Analise profunda de resultados e combinacoes.</span>
          </li>
          <li class="flex items-start gap-2">
            <Icon name="mdi:file-pdf-box" size="18" class="mt-0.5 text-indigo-600 dark:text-amber-300" />
            <span>PDF premium para baixar e guardar.</span>
          </li>
          <li class="flex items-start gap-2">
            <Icon name="mdi:cloud-outline" size="18" class="mt-0.5 text-indigo-600 dark:text-amber-300" />
            <span>Historico sincronizado para rever quando quiser.</span>
          </li>
        </ul>
      </article>

      <article class="space-y-4 rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <div class="space-y-2">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Garantias
          </p>
          <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-50">
            Flexibilidade total para voce.
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-300">
            Assine com tranquilidade. Voce pode cancelar ou trocar de plano quando quiser.
          </p>
        </div>
        <div class="grid gap-3 text-xs text-slate-600 dark:text-slate-300 sm:grid-cols-2">
          <div class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 dark:border-slate-800 dark:bg-slate-950">
            <p class="text-xs font-semibold text-slate-900 dark:text-slate-50">Cancelamento rapido</p>
            <p class="mt-1 text-[0.7rem] text-slate-500 dark:text-slate-400">
              Sem fidelidade ou letras miudas.
            </p>
          </div>
          <div class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 dark:border-slate-800 dark:bg-slate-950">
            <p class="text-xs font-semibold text-slate-900 dark:text-slate-50">Suporte humano</p>
            <p class="mt-1 text-[0.7rem] text-slate-500 dark:text-slate-400">
              Resolvemos duvidas com agilidade.
            </p>
          </div>
        </div>
      </article>
    </section>

    <section class="space-y-4">
      <header class="space-y-2">
        <p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
          Perguntas frequentes
        </p>
        <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-50">
          Dicas antes de assinar.
        </h3>
      </header>

      <div class="grid gap-4 md:grid-cols-2">
        <details class="group rounded-xl border border-slate-200 bg-white/95 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <summary class="cursor-pointer text-sm font-semibold text-slate-800 dark:text-slate-100">
            O que muda no relatorio premium?
          </summary>
          <p class="mt-2 text-xs text-slate-600 dark:text-slate-300">
            Voce recebe interpretacoes completas, secao de crescimento, alertas e PDF para baixar.
          </p>
        </details>
        <details class="group rounded-xl border border-slate-200 bg-white/95 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <summary class="cursor-pointer text-sm font-semibold text-slate-800 dark:text-slate-100">
            Posso cancelar quando quiser?
          </summary>
          <p class="mt-2 text-xs text-slate-600 dark:text-slate-300">
            Sim. Voce pode cancelar a qualquer momento pelo checkout ou entrando em contato com o suporte.
          </p>
        </details>
        <details class="group rounded-xl border border-slate-200 bg-white/95 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <summary class="cursor-pointer text-sm font-semibold text-slate-800 dark:text-slate-100">
            Preciso estar logado para assinar?
          </summary>
          <p class="mt-2 text-xs text-slate-600 dark:text-slate-300">
            Recomendamos entrar para vincular a assinatura automaticamente ao seu perfil.
          </p>
        </details>
        <details class="group rounded-xl border border-slate-200 bg-white/95 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <summary class="cursor-pointer text-sm font-semibold text-slate-800 dark:text-slate-100">
            Quais formas de pagamento estao disponiveis?
          </summary>
          <p class="mt-2 text-xs text-slate-600 dark:text-slate-300">
            Cartoes de credito e debitados habilitados no Stripe Checkout.
          </p>
        </details>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useLazyAsyncData, useRoute, useSeoMeta, useSupabaseUser } from '#imports';
import PlansGrid from '~/components/billing/PlansGrid.vue';
import type {
  BillingPaidPlanKey,
  BillingPlan,
  BillingPlansResponse,
  BillingCustomer,
} from '~/types/billing';
import { getSupabaseAccessToken } from '~/utils/authToken';

const fallbackPlans: BillingPlan[] = [
  {
    key: 'free',
    name: 'Essencial',
    description: 'Para explorar os testes principais.',
    price: { id: 'price_free', unitAmount: 0, currency: 'BRL' },
    features: [
      'Resultados essenciais e visao geral',
      'Acesso a testes publicos',
      'Historico salvo no navegador',
    ],
    ctaLabel: 'Comecar agora',
  },
  {
    key: 'premium_monthly',
    name: 'Premium mensal',
    description: 'Flexibilidade para ir mais fundo.',
    price: {
      id: 'price_premium_monthly',
      unitAmount: 2900,
      currency: 'BRL',
      interval: 'month',
      intervalCount: 1,
    },
    features: [
      'Relatorios completos em todos os testes',
      'PDF premium para baixar',
      'Historico sincronizado na nuvem',
      'Prioridade em novos testes',
    ],
    badge: 'Flexivel',
    ctaLabel: 'Assinar mensal',
  },
  {
    key: 'premium_annual',
    name: 'Premium anual',
    description: 'Economia para quem leva a jornada a serio.',
    price: {
      id: 'price_premium_annual',
      unitAmount: 29000,
      currency: 'BRL',
      interval: 'year',
      intervalCount: 1,
    },
    features: [
      'Tudo do plano mensal',
      'Economia equivalente a 2 meses',
      'Atendimento prioritario',
      'Acesso antecipado a novos relatorios',
    ],
    badge: 'Melhor valor',
    highlight: true,
    ctaLabel: 'Assinar anual',
  },
];

const fallbackCustomer: BillingCustomer = { isLoggedIn: false, isPremium: false };

const route = useRoute();
const supabaseUser = useSupabaseUser();
const checkoutPlan = ref<BillingPaidPlanKey | null>(null);
const portalLoading = ref(false);
const requestError = ref<string | null>(null);
const loadedFor = ref<string | null>(null);

const { data, refresh } = useLazyAsyncData<BillingPlansResponse>(
  () => 'billing-plans',
  async () => {
    const token = await getSupabaseAccessToken();
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return await $fetch<BillingPlansResponse>('/api/billing/plans', {
      credentials: 'include',
      headers: Object.keys(headers).length ? headers : undefined,
    });
  },
  {
    server: false,
    default: () => ({ plans: fallbackPlans, customer: fallbackCustomer }),
    getCachedData: () => undefined,
  },
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
  { immediate: true },
);

const plans = computed(() => data.value?.plans ?? fallbackPlans);
const customer = computed(
  () => data.value?.customer ?? fallbackCustomer,
);

const statusMessage = computed(() => {
  const status = route.query.status;
  if (status === 'success') {
    return 'Pagamento confirmado. Em instantes liberamos o acesso premium.';
  }
  if (status === 'cancel') {
    return 'Checkout cancelado. Voce pode retomar a qualquer momento.';
  }
  if (status === 'portal') {
    return 'Portal de cobranca em preparacao. Em breve voce podera gerenciar sua assinatura.';
  }
  return '';
});

const statusTone = computed(() => {
  const status = route.query.status;
  if (status === 'success') {
    return 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-700/70 dark:bg-emerald-950/40 dark:text-emerald-200';
  }
  if (status === 'cancel') {
    return 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800/60 dark:bg-amber-950/40 dark:text-amber-200';
  }
  if (status === 'portal') {
    return 'border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-700/60 dark:bg-indigo-950/40 dark:text-indigo-200';
  }
  return 'border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300';
});

async function startCheckout(plan: BillingPaidPlanKey): Promise<void> {
  if (!import.meta.client) return;
  if (checkoutPlan.value) return;

  requestError.value = null;
  checkoutPlan.value = plan;

  try {
    const token = await getSupabaseAccessToken();
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await $fetch<{ url: string }>('/api/billing/checkout', {
      method: 'POST',
      credentials: 'include',
      headers: Object.keys(headers).length ? headers : undefined,
      body: { plan },
    });

    if (response?.url) {
      window.location.href = response.url;
      return;
    }

    requestError.value = 'Nao foi possivel iniciar o checkout.';
  } catch (error) {
    const payload = error as { data?: { message?: string } };
    requestError.value =
      payload.data?.message ?? 'Nao foi possivel iniciar o checkout.';
  } finally {
    checkoutPlan.value = null;
  }
}

async function startPortal(): Promise<void> {
  if (!import.meta.client) return;
  if (portalLoading.value) return;

  requestError.value = null;
  portalLoading.value = true;

  try {
    const token = await getSupabaseAccessToken();
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await $fetch<{ url: string }>('/api/billing/portal', {
      method: 'POST',
      credentials: 'include',
      headers: Object.keys(headers).length ? headers : undefined,
    });

    if (response?.url) {
      window.location.href = response.url;
      return;
    }

    requestError.value = 'Nao foi possivel abrir o portal de cobranca.';
  } catch (error) {
    const payload = error as { data?: { message?: string } };
    requestError.value =
      payload.data?.message ?? 'Nao foi possivel abrir o portal de cobranca.';
  } finally {
    portalLoading.value = false;
  }
}

useSeoMeta({
  title: 'Planos e assinatura premium',
  description: 'Escolha o plano ideal para desbloquear relatorios premium do Speculum Animae.',
});
</script>
