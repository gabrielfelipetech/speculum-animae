<template>
  <div
    class="space-y-3"
    :aria-disabled="disabled ? 'true' : undefined"
    :data-error="hasError ? 'true' : undefined"
  >
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
          {{ name }} option {{ option }}
        </span>

        <input
          class="sr-only"
          type="radio"
          :name="name"
          :value="option"
          :checked="option === internalValue"
          :aria-labelledby="labelledById"
          :aria-describedby="describedById"
          :aria-invalid="hasError ? 'true' : undefined"
          :disabled="disabled"
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
  labelledById: {
    type: String,
    default: undefined,
  },
  describedById: {
    type: String,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
  (e: 'answered'): void;
}>();

// 7 points from left (disagree) to right (agree)
const options = [1, 2, 3, 4, 5, 6, 7];

const internalValue = computed<number | null>(() => props.modelValue ?? null);
const hasError = computed(() => props.error === true);

// Default labels: left disagree, right agree
const minLabelComputed = computed(
  () => props.minLabel ?? 'Discordo totalmente',
);
const maxLabelComputed = computed(
  () => props.maxLabel ?? 'Concordo totalmente',
);

// Center index (value 4)
const CENTER_INDEX = Math.floor(options.length / 2);
const OUTER_BASE_SIZE = 38;
const OUTER_STEP = 6;
const INNER_BASE_SIZE = 10;
const INNER_STEP = 2;

function distanceFromCenter(index: number): number {
  return Math.abs(index - CENTER_INDEX);
}

// Outer circle sizes (label)
function outerSizeStyle(index: number): Record<string, string> {
  const distance = distanceFromCenter(index);
  const size = OUTER_BASE_SIZE + OUTER_STEP * distance;
  return {
    width: `${size}px`,
    height: `${size}px`,
  };
}

// Inner dot sizes
function innerSizeStyle(index: number): Record<string, string> {
  const distance = distanceFromCenter(index);
  const size = INNER_BASE_SIZE + INNER_STEP * distance;
  return {
    width: `${size}px`,
    height: `${size}px`,
  };
}

// Left = disagree (red), right = agree (green)
function zoneFromIndex(index: number): 'disagree' | 'neutral' | 'agree' {
  if (index <= 2) return 'disagree';
  if (index === 3) return 'neutral';
  return 'agree';
}

function outerCircleClass(index: number, isSelected: boolean): string {
  const zone = zoneFromIndex(index);
  const disabledClass = props.disabled
    ? 'opacity-60 cursor-not-allowed'
    : 'cursor-pointer';
  let base = '';

  if (zone === 'agree') {
    base = isSelected
      ? 'border-green-500 bg-green-50 text-green-700 dark:border-green-300 dark:bg-green-900/40'
      : 'border-green-300 text-green-600 hover:border-green-400 dark:border-green-700 dark:text-green-300 dark:hover:border-green-500';
    return `${base} ${disabledClass}`;
  }

  if (zone === 'disagree') {
    base = isSelected
      ? 'border-red-500 bg-red-50 text-red-700 dark:border-red-300 dark:bg-red-900/40'
      : 'border-red-300 text-red-600 hover:border-red-400 dark:border-red-700 dark:text-red-300 dark:hover:border-red-500';
    return `${base} ${disabledClass}`;
  }

  base = isSelected
    ? 'border-slate-400 bg-slate-50 text-slate-700 dark:border-slate-200 dark:bg-slate-800/80'
    : 'border-slate-300 text-slate-500 hover:border-slate-400 dark:border-slate-600 dark:text-slate-300 dark:hover:border-slate-400';

  return `${base} ${disabledClass}`;
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
  if (props.disabled) return;
  const wasEmpty = internalValue.value == null;
  emit('update:modelValue', option);

  if (wasEmpty) {
    emit('answered');
  }
}
</script>
