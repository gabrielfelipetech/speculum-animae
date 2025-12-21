<template>
  <div class="flex flex-col items-center gap-2">
    <svg
      viewBox="0 0 120 120"
      class="h-24 w-24"
      aria-hidden="true"
    >
      <!-- trilho -->
      <circle
        cx="60"
        cy="60"
        r="52"
        class="text-slate-200 dark:text-slate-700"
        stroke="currentColor"
        stroke-width="8"
        fill="none"
      />

      <!-- progresso -->
      <circle
        cx="60"
        cy="60"
        r="52"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
        stroke-linecap="round"
        stroke="currentColor"
        stroke-width="8"
        fill="none"
        class="transition-all duration-500 ease-out"
        :class="colorClassComputed"
        transform="rotate(-90 60 60)"
      />

      <!-- valor -->
      <text
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        class="text-xl font-semibold text-slate-800 dark:text-slate-50"
      >
        {{ displayValue }}%
      </text>
    </svg>

    <span
      class="text-xs font-medium text-slate-700 dark:text-slate-200 text-center"
    >
      {{ label }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  value: number; // 0–100
  label: string;
  colorClass?: string; // ex: "text-sky-500"
}>();

const radius = 52;
const circumference = 2 * Math.PI * radius;

const normalized = computed(() => {
  const v = Math.min(100, Math.max(0, props.value));
  return v / 100;
});

const dashOffset = computed(
  () => circumference * (1 - normalized.value),
);

const displayValue = computed(() =>
  Math.round(normalized.value * 100),
);

const colorClassComputed = computed(
  () => props.colorClass ?? 'text-sky-500',
);

defineExpose({ circumference, dashOffset }); // opcional, para debug
</script>
