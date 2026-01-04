<template>
  <div class="grid gap-6 md:grid-cols-3">
    <PlanCard
      v-for="plan in plans"
      :key="plan.key"
      :plan="plan"
      :is-logged-in="customer.isLoggedIn"
      :is-premium="customer.isPremium"
      :is-loading="isPlanLoading(plan.key)"
      @checkout="emit('checkout', $event)"
      @portal="emit('portal')"
    />
  </div>
</template>

<script setup lang="ts">
import PlanCard from '~/components/billing/PlanCard.vue';
import type {
  BillingCustomer,
  BillingPaidPlanKey,
  BillingPlan,
} from '~/types/billing';

const props = defineProps<{
  plans: BillingPlan[];
  customer: BillingCustomer;
  checkoutPlan: BillingPaidPlanKey | null;
  portalLoading: boolean;
}>();

const emit = defineEmits<{
  (e: 'checkout', plan: BillingPaidPlanKey): void;
  (e: 'portal'): void;
}>();

function isPlanLoading(planKey: BillingPlan['key']): boolean {
  if (props.customer.isPremium && planKey !== 'free') {
    return props.portalLoading;
  }
  return props.checkoutPlan === planKey;
}
</script>
