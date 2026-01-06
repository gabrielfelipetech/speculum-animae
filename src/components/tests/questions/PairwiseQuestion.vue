<template>
  <div
    class="space-y-3"
    :aria-labelledby="labelledById"
    :aria-describedby="describedById"
    :aria-invalid="hasError ? 'true' : undefined"
    :aria-disabled="disabled ? 'true' : undefined"
    :data-error="hasError ? 'true' : undefined"
  >
    <p class="text-[0.7rem] text-slate-500 dark:text-slate-400">
      Escolha uma opcao em cada par.
    </p>

    <div
      v-for="(pair, index) in question.pairs"
      :key="pairKey(pair, index)"
      class="space-y-2 rounded-xl border border-slate-200/80 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
    >
      <p
        :id="pairLabelId(index)"
        class="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400"
      >
        Comparacao {{ index + 1 }}
      </p>

      <div
        class="grid gap-3 sm:grid-cols-2"
        role="radiogroup"
        :aria-labelledby="groupLabelledBy(index)"
        :aria-describedby="describedById"
        :aria-invalid="hasError ? 'true' : undefined"
      >
        <label
          class="flex cursor-pointer items-center justify-center rounded-xl border border-slate-200/80 bg-white/90 px-3 py-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200"
          :class="[
            selectedClass(index, pair.left.id),
            disabled ? 'cursor-not-allowed opacity-60' : '',
          ]"
        >
          <input
            class="sr-only"
            type="radio"
            :name="`${name}-${index}`"
            :value="pair.left.id"
            :checked="currentSelections[index] === pair.left.id"
            :aria-labelledby="groupLabelledBy(index)"
            :aria-describedby="describedById"
            :aria-invalid="hasError ? 'true' : undefined"
            :disabled="disabled"
            @change="select(index, pair.left.id)"
          />
          {{ pair.left.label }}
        </label>

        <label
          class="flex cursor-pointer items-center justify-center rounded-xl border border-slate-200/80 bg-white/90 px-3 py-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200"
          :class="[
            selectedClass(index, pair.right.id),
            disabled ? 'cursor-not-allowed opacity-60' : '',
          ]"
        >
          <input
            class="sr-only"
            type="radio"
            :name="`${name}-${index}`"
            :value="pair.right.id"
            :checked="currentSelections[index] === pair.right.id"
            :aria-labelledby="groupLabelledBy(index)"
            :aria-describedby="describedById"
            :aria-invalid="hasError ? 'true' : undefined"
            :disabled="disabled"
            @change="select(index, pair.right.id)"
          />
          {{ pair.right.label }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PairwisePair, PairwiseQuestion } from '~/types/tests';

const props = defineProps<{
  question: PairwiseQuestion;
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

const hasError = computed(() => props.error === true);
const safeName = computed(() =>
  props.name.replace(/[^a-zA-Z0-9_-]/g, '-'),
);

const currentSelections = computed(() => normalizeSelections(props.modelValue));

function normalizeSelections(value: string[] | null): string[] {
  const raw = Array.isArray(value)
    ? value.filter((item) => typeof item === 'string')
    : [];

  return props.question.pairs.map((pair, index) => {
    const selection = raw[index];
    if (selection === pair.left.id || selection === pair.right.id) {
      return selection;
    }
    return '';
  });
}

function isComplete(selections: string[]): boolean {
  if (props.question.pairs.length === 0) return false;
  return props.question.pairs.every((pair, index) => {
    const selection = selections[index];
    return selection === pair.left.id || selection === pair.right.id;
  });
}

function select(pairIndex: number, optionId: string): void {
  if (props.disabled) return;
  const next = currentSelections.value.slice();
  const wasComplete = isComplete(next);
  next[pairIndex] = optionId;
  emit('update:modelValue', next);
  if (!wasComplete && isComplete(next)) emit('answered');
}

function selectedClass(pairIndex: number, optionId: string): string {
  if (currentSelections.value[pairIndex] !== optionId) return '';
  return 'border-brand-500 text-brand-700 ring-2 ring-brand-500 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-950';
}

function pairLabelId(index: number): string {
  return `${safeName.value}-pair-${index}`;
}

function groupLabelledBy(index: number): string {
  const pairId = pairLabelId(index);
  if (!props.labelledById) return pairId;
  return `${props.labelledById} ${pairId}`;
}

function pairKey(pair: PairwisePair, index: number): string {
  return `${index}-${pair.left.id}-${pair.right.id}`;
}
</script>
