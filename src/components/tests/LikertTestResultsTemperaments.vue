<!-- src/components/tests/LikertTestResultsTemperaments.vue -->
<template>
  <section
    v-if="temperamentProfile"
    class="space-y-3"
  >
    <h3 class="font-display text-lg tracking-tight">
      Seu temperamento
    </h3>

    <div
      class="space-y-2 rounded-2xl border border-slate-200/80 bg-white/90 p-4 text-sm dark:border-slate-800 dark:bg-slate-900/80"
    >
      <p class="text-sm text-slate-700 dark:text-slate-100">
        Temperamento predominante:
        <span class="font-semibold">
          {{ temperamentProfile.primary.name }}
        </span>
      </p>

      <p
        v-if="temperamentProfile.isMixed && temperamentProfile.secondary"
        class="text-xs text-slate-600 dark:text-slate-300"
      >
        Também há uma presença significativa de
        <span class="font-semibold">
          {{ temperamentProfile.secondary.name }}
        </span>,
        formando um perfil misto (por exemplo,
        {{ temperamentProfile.primary.name }}–{{ temperamentProfile.secondary.name }}).
      </p>

      <p
        v-else
        class="text-xs text-slate-600 dark:text-slate-300"
      >
        Os demais traços aparecem em segundo plano, como matizes do seu modo
        predominante de reagir, sentir e se relacionar.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';

type LikertResultGroup = {
  groupId: string;
  name: string;
  average: number;
  [key: string]: unknown;
};

const props = defineProps<{
  results: LikertResultGroup[];
}>();

const { results } = toRefs(props);

const temperamentProfile = computed(() => {
  if (!results.value || results.value.length === 0) return null;

  const sorted = [...results.value].slice().sort(
    (a, b) => b.average - a.average,
  );

  const primary = sorted[0];
  const secondary = sorted[1];

  const diff =
    secondary != null ? primary.average - secondary.average : 0;

  const isMixed = !!secondary && diff <= 0.5;

  return {
    primary,
    secondary: secondary ?? null,
    isMixed,
  };
});
</script>
