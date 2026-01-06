<template>
  <div
    class="space-y-2"
    :aria-labelledby="labelledById"
    :aria-describedby="describedById"
    :aria-invalid="hasError ? 'true' : undefined"
    :aria-disabled="disabled ? 'true' : undefined"
    :data-error="hasError ? 'true' : undefined"
  >
    <p v-if="selectionHint" class="text-[0.7rem] text-slate-500 dark:text-slate-400">
      {{ selectionHint }}
    </p>

    <div class="space-y-2">
      <label
        v-for="option in question.options"
        :key="option.id"
        class="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200/80 bg-white/90 px-3 py-2 text-sm text-slate-700 shadow-sm transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200"
        :class="[selectedClass(option.id), disabled ? 'cursor-not-allowed opacity-60' : '']"
      >
        <input
          class="h-4 w-4 accent-brand-500"
          :type="inputType"
          :name="inputName"
          :value="option.id"
          :checked="isSelected(option.id)"
          :aria-labelledby="labelledById"
          :aria-describedby="describedById"
          :aria-invalid="hasError ? 'true' : undefined"
          :disabled="disabled"
          @change="toggle(option.id)"
        />
        <span>{{ option.label }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ChoiceQuestion } from '~/types/tests';

const props = defineProps<{
  question: ChoiceQuestion;
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

const inputType = computed(() => (props.question.multiple ? 'checkbox' : 'radio'));
const inputName = computed(() =>
  props.question.multiple ? `${props.name}[]` : props.name,
);

const selectedSet = computed(() => new Set(props.modelValue ?? []));

const minSelections = computed(() =>
  typeof props.question.minSelections === 'number'
    ? props.question.minSelections
    : 1,
);

const maxSelections = computed(() =>
  typeof props.question.maxSelections === 'number'
    ? props.question.maxSelections
    : props.question.options.length,
);

const selectionHint = computed(() => {
  if (!props.question.multiple) return 'Escolha uma opcao.';
  if (minSelections.value === maxSelections.value) {
    return `Escolha ${minSelections.value} opcao(oes).`;
  }
  return `Escolha entre ${minSelections.value} e ${maxSelections.value} opcoes.`;
});

function isSelected(optionId: string): boolean {
  return selectedSet.value.has(optionId);
}

function toggle(optionId: string): void {
  if (props.disabled) return;
  const current = new Set(selectedSet.value);
  const wasEmpty = current.size === 0;

  if (props.question.multiple) {
    if (current.has(optionId)) {
      current.delete(optionId);
    } else {
      if (current.size >= maxSelections.value) return;
      current.add(optionId);
    }
  } else {
    current.clear();
    current.add(optionId);
  }

  const next = Array.from(current);
  emit('update:modelValue', next);
  if (wasEmpty && next.length > 0) emit('answered');
}

function selectedClass(optionId: string): string {
  if (!isSelected(optionId)) return '';
  return 'border-brand-500 text-brand-700 ring-2 ring-brand-500 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-950';
}
</script>
