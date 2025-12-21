<template>
  <div class="space-y-3">
    <div
      class="flex justify-between text-[0.7rem] text-slate-500 dark:text-slate-400"
    >
      <span>{{ minLabelComputed }}</span>
      <span>{{ maxLabelComputed }}</span>
    </div>

    <div class="flex items-center justify-between gap-2">
      <label
        v-for="(option, index) in options"
        :key="option"
        class="relative flex cursor-pointer items-center justify-center rounded-full border-2 text-[0.65rem] font-medium transition focus-within:ring-2 focus-within:ring-brand-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-50 dark:focus-within:ring-offset-slate-950"
        :class="outerCircleClass(index, option === internalValue)"
        :style="outerSizeStyle(index)"
      >
        <span class="sr-only">
          {{ name }} – opção {{ option }}
        </span>

        <input
          class="sr-only"
          type="radio"
          :name="name"
          :value="option"
          :checked="option === internalValue"
          @change="onSelect(option)"
        />

        <span
          class="block rounded-full transition"
          :class="innerDotClass(index, option === internalValue)"
          :style="innerSizeStyle(index)"
        />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// LikertScaleQuestion.vue
const props = defineProps({
  modelValue: {
    type: Number,
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  minLabel: {
    type: String,
    default: '',
  },
  maxLabel: {
    type: String,
    default: '',
  },
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
  (e: 'answered'): void; // dispara quando a pergunta for respondida pela primeira vez
}>();

// 7 pontos – da esquerda (discordo) para a direita (concordo)
const options = [1, 2, 3, 4, 5, 6, 7];

const internalValue = computed<number | null>(() => props.modelValue ?? null);

// por padrão: esquerda discordo, direita concordo
const minLabelComputed = computed(
  () => props.minLabel ?? 'Discordo totalmente',
);
const maxLabelComputed = computed(
  () => props.maxLabel ?? 'Concordo totalmente',
);

// índice central (valor 4)
const CENTER_INDEX = Math.floor(options.length / 2); // 3
const OUTER_BASE_SIZE = 38; // px para o central
const OUTER_STEP = 6; // px de incremento em cada "anel"
const INNER_BASE_SIZE = 10; // px para o central (pode ajustar)
const INNER_STEP = 2; // px de incremento para o dot

function distanceFromCenter(index: number): number {
  return Math.abs(index - CENTER_INDEX);
}

// tamanhos do círculo externo (label)
function outerSizeStyle(index: number): Record<string, string> {
  const distance = distanceFromCenter(index);
  const size = OUTER_BASE_SIZE + OUTER_STEP * distance;
  return {
    width: `${size}px`,
    height: `${size}px`,
  };
}

// tamanhos do círculo interno (dot)
function innerSizeStyle(index: number): Record<string, string> {
  const distance = distanceFromCenter(index);
  const size = INNER_BASE_SIZE + INNER_STEP * distance;
  return {
    width: `${size}px`,
    height: `${size}px`,
  };
}

// AGORA: esquerda = disagree (vermelho), direita = agree (verde)
function zoneFromIndex(index: number): 'disagree' | 'neutral' | 'agree' {
  if (index <= 2) return 'disagree'; // 1, 2, 3  -> vermelho
  if (index === 3) return 'neutral'; // 4        -> cinza
  return 'agree'; // 5, 6, 7 -> verde
}

function outerCircleClass(index: number, isSelected: boolean): string {
  const zone = zoneFromIndex(index);

  if (zone === 'agree') {
    // verde (concordo)
    return isSelected
      ? 'border-green-500 bg-green-50 text-green-700 dark:border-green-300 dark:bg-green-900/40'
      : 'border-green-300 text-green-600 hover:border-green-400 dark:border-green-700 dark:text-green-300 dark:hover:border-green-500';
  }

  if (zone === 'disagree') {
    // vermelho (discordo)
    return isSelected
      ? 'border-red-500 bg-red-50 text-red-700 dark:border-red-300 dark:bg-red-900/40'
      : 'border-red-300 text-red-600 hover:border-red-400 dark:border-red-700 dark:text-red-300 dark:hover:border-red-500';
  }

  // neutro (cinza)
  return isSelected
    ? 'border-slate-400 bg-slate-50 text-slate-700 dark:border-slate-200 dark:bg-slate-800/80'
    : 'border-slate-300 text-slate-500 hover:border-slate-400 dark:border-slate-600 dark:text-slate-300 dark:hover:border-slate-400';
}

function innerDotClass(index: number, isSelected: boolean): string {
  if (!isSelected) return 'bg-transparent';

  const zone = zoneFromIndex(index);

  if (zone === 'agree') {
    return 'bg-green-500 dark:bg-green-300';
  }
  if (zone === 'disagree') {
    return 'bg-red-500 dark:bg-red-300';
  }
  return 'bg-slate-400 dark:bg-slate-200';
}

function onSelect(option: number): void {
  const wasEmpty = internalValue.value == null;
  emit('update:modelValue', option);

  if (wasEmpty) {
    emit('answered');
  }
}
</script>
