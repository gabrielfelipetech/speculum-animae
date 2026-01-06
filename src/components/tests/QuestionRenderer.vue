<template>
  <LikertQuestion
    v-if="question.type === 'likert'"
    :model-value="typeof modelValue === 'number' ? modelValue : null"
    :name="name"
    :min-label="minLabel"
    :max-label="maxLabel"
    :labelled-by-id="labelledById"
    :described-by-id="describedById"
    :disabled="disabled"
    :error="error"
    @update:modelValue="(value) => emit('update:modelValue', value)"
    @answered="() => emit('answered')"
  />

  <RankingQuestion
    v-else-if="question.type === 'rank'"
    :question="question"
    :model-value="Array.isArray(modelValue) ? modelValue : null"
    :name="name"
    :labelled-by-id="labelledById"
    :described-by-id="describedById"
    :disabled="disabled"
    :error="error"
    @update:modelValue="(value) => emit('update:modelValue', value)"
    @answered="() => emit('answered')"
  />

  <PairwiseQuestion
    v-else-if="question.type === 'pairwise'"
    :question="question"
    :model-value="Array.isArray(modelValue) ? modelValue : null"
    :name="name"
    :labelled-by-id="labelledById"
    :described-by-id="describedById"
    :disabled="disabled"
    :error="error"
    @update:modelValue="(value) => emit('update:modelValue', value)"
    @answered="() => emit('answered')"
  />

  <ChoiceQuestion
    v-else
    :question="question"
    :model-value="Array.isArray(modelValue) ? modelValue : null"
    :name="name"
    :labelled-by-id="labelledById"
    :described-by-id="describedById"
    :disabled="disabled"
    :error="error"
    @update:modelValue="(value) => emit('update:modelValue', value)"
    @answered="() => emit('answered')"
  />
</template>

<script setup lang="ts">
import type { TestAnswer, TestQuestion } from '~/types/tests';
import LikertQuestion from '~/components/tests/questions/LikertQuestion.vue';
import RankingQuestion from '~/components/tests/questions/RankingQuestion.vue';
import PairwiseQuestion from '~/components/tests/questions/PairwiseQuestion.vue';
import ChoiceQuestion from '~/components/tests/questions/ChoiceQuestion.vue';

defineProps<{
  question: TestQuestion;
  modelValue: TestAnswer | null;
  name: string;
  minLabel?: string;
  maxLabel?: string;
  labelledById?: string;
  describedById?: string;
  disabled?: boolean;
  error?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: TestAnswer): void;
  (e: 'answered'): void;
}>();
</script>
