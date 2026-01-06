<template>
  <div
    class="space-y-2"
    role="list"
    :aria-labelledby="labelledById"
    :aria-describedby="describedById"
    :aria-invalid="hasError ? 'true' : undefined"
    :aria-disabled="disabled ? 'true' : undefined"
    :data-error="hasError ? 'true' : undefined"
  >
    <p class="text-[0.7rem] text-slate-500 dark:text-slate-400">
      Reordene as opcoes usando os botoes ou as setas do teclado.
    </p>

    <ul class="space-y-2">
      <li
        v-for="(optionId, index) in currentOrder"
        :key="optionId"
        class="flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white/80 px-3 py-2 text-sm shadow-sm focus-within:ring-2 focus-within:ring-brand-500 dark:border-slate-800 dark:bg-slate-900/80"
        :class="disabled ? 'cursor-not-allowed opacity-60' : ''"
        :tabindex="disabled ? -1 : 0"
        @keydown="(event) => handleKeydown(event, optionId)"
      >
        <div class="flex items-center gap-3">
          <span class="text-xs font-semibold text-slate-500 dark:text-slate-300">
            {{ index + 1 }}
          </span>
          <span class="text-slate-700 dark:text-slate-200">
            {{ optionLabel(optionId) }}
          </span>
        </div>

        <div class="flex items-center gap-1">
          <button
            type="button"
            class="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[0.65rem] font-semibold text-slate-600 transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            :disabled="disabled || index === 0"
            :aria-label="`Mover ${optionLabel(optionId)} para cima`"
            @click="moveOption(optionId, -1)"
          >
            Cima
          </button>
          <button
            type="button"
            class="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[0.65rem] font-semibold text-slate-600 transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            :disabled="disabled || index === currentOrder.length - 1"
            :aria-label="`Mover ${optionLabel(optionId)} para baixo`"
            @click="moveOption(optionId, 1)"
          >
            Baixo
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { RankingQuestion } from '~/types/tests';

const props = defineProps<{
  question: RankingQuestion;
  modelValue: string[] | null;
  name: string;
  labelledById?: string;
  describedById?: string;
  disabled?: boolean;
  error?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
  (e: 'answered'): void;
}>();

const optionMap = computed(() => {
  const map = new Map<string, string>();
  for (const option of props.question.options) {
    map.set(option.id, option.label);
  }
  return map;
});

const defaultOrder = computed(() =>
  props.question.options.map((option) => option.id),
);

const currentOrder = computed(() => {
  if (Array.isArray(props.modelValue) && props.modelValue.length > 0) {
    return props.modelValue;
  }
  return defaultOrder.value;
});

const hasError = computed(() => props.error === true);

function optionLabel(optionId: string): string {
  return optionMap.value.get(optionId) ?? optionId;
}

function updateOrder(nextOrder: string[]): void {
  const wasEmpty =
    !Array.isArray(props.modelValue) || props.modelValue.length === 0;
  emit('update:modelValue', nextOrder);
  if (wasEmpty) emit('answered');
}

function moveOption(optionId: string, direction: -1 | 1): void {
  if (props.disabled) return;
  const order = currentOrder.value.slice();
  const index = order.indexOf(optionId);
  if (index < 0) return;

  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= order.length) return;

  [order[index], order[nextIndex]] = [order[nextIndex], order[index]];
  updateOrder(order);
}

function handleKeydown(event: KeyboardEvent, optionId: string): void {
  if (props.disabled) return;
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    moveOption(optionId, -1);
  }
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    moveOption(optionId, 1);
  }
}
</script>
