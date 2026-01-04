<template>
  <article
    class="flex h-full flex-col rounded-2xl border bg-white/95 p-5 shadow-sm transition dark:bg-slate-900/80"
    :class="
      plan.highlight
        ? 'border-indigo-300 shadow-md dark:border-amber-300/70'
        : 'border-slate-200 dark:border-slate-800'
    "
  >
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        <p class="text-sm font-semibold text-slate-900 dark:text-slate-50">
          {{ plan.name }}
        </p>
        <span
          v-if="plan.badge"
          class="rounded-full bg-indigo-100 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-indigo-700 dark:bg-amber-300/20 dark:text-amber-200"
        >
          {{ plan.badge }}
        </span>
      </div>
      <p class="text-xs text-slate-500 dark:text-slate-400">
        {{ plan.description }}
      </p>
    </div>

    <div class="mt-4 flex items-end gap-2">
      <span class="text-3xl font-semibold text-slate-900 dark:text-slate-50">
        {{ priceLabel }}
      </span>
      <span class="text-xs text-slate-500 dark:text-slate-400">
        {{ cadenceLabel }}
      </span>
    </div>

    <ul class="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-300">
      <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-2">
        <Icon name="mdi:check" size="16" class="mt-0.5 text-indigo-600 dark:text-amber-300" />
        <span>{{ feature }}</span>
      </li>
    </ul>

    <div class="mt-6">
      <NuxtLink
        v-if="isFreePlan"
        to="/testes"
        class="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-amber-300 dark:hover:text-amber-200"
      >
        {{ plan.ctaLabel }}
      </NuxtLink>

      <button
        v-else
        type="button"
        class="inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-amber-300/80 dark:focus-visible:ring-offset-slate-950"
        :class="
          plan.highlight
            ? 'bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-amber-300 dark:text-slate-900'
            : 'border border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-amber-300 dark:hover:text-amber-200'
        "
        :disabled="isLoading"
        @click="handleAction"
      >
        <span v-if="isLoading">{{ loadingLabel }}</span>
        <span v-else>{{ actionLabel }}</span>
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { BillingPaidPlanKey, BillingPlan } from '~/types/billing';

const props = defineProps<{
  plan: BillingPlan;
  isLoggedIn: boolean;
  isPremium: boolean;
  isLoading: boolean;
}>();

const emit = defineEmits<{
  (e: 'checkout', plan: BillingPaidPlanKey): void;
  (e: 'portal'): void;
}>();

const isFreePlan = computed(() => props.plan.key === 'free');
const canManage = computed(
  () => props.isLoggedIn && props.isPremium && !isFreePlan.value,
);

const actionLabel = computed(() =>
  canManage.value ? 'Gerenciar assinatura' : props.plan.ctaLabel,
);

const loadingLabel = computed(() => (canManage.value ? 'Abrindo...' : 'Iniciando...'));

const priceLabel = computed(() => {
  const price = props.plan.price;
  if (!price || price.unitAmount === 0) {
    return 'R$ 0';
  }
  const value = price.unitAmount / 100;
  return `R$ ${value.toLocaleString('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
});

const cadenceLabel = computed(() => {
  const price = props.plan.price;
  if (!price || price.unitAmount === 0) {
    return 'para sempre';
  }
  if (price.interval === 'month') return 'por mes';
  if (price.interval === 'year') return 'por ano';
  return '';
});

function handleAction(): void {
  if (isFreePlan.value) return;
  if (canManage.value) {
    emit('portal');
    return;
  }
  emit('checkout', props.plan.key as BillingPaidPlanKey);
}
</script>
