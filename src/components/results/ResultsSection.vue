<!-- src/components/results/ResultsSection.vue -->
<template>
  <section :id="id" class="space-y-4 rounded-2xl border border-slate-200/80 bg-white/90 p-5 dark:border-slate-800 dark:bg-slate-900/90">
    <header class="space-y-1">
      <h2 class="font-display text-xl tracking-tight">
        {{ title }}
      </h2>
      <p v-if="subtitle" class="text-xs text-slate-500 dark:text-slate-400">
        {{ subtitle }}
      </p>
    </header>

    <div v-if="$slots.default" class="pt-2">
      <slot />
    </div>

    <div class="space-y-4 pt-2">
      <article
        v-for="block in blocks"
        :key="block.id"
        class="rounded-xl border border-slate-100/80 bg-slate-50/60 p-4 text-sm dark:border-slate-800 dark:bg-slate-900/80"
      >
        <h3 v-if="block.title" class="mb-1 text-[0.9rem] font-semibold">
          {{ block.title }}
        </h3>

        <!-- Conteúdo gratuito -->
        <p v-if="block.access === 'free'" class="text-slate-700 dark:text-slate-200">
          {{ block.body }}
        </p>

        <!-- Conteúdo premium com blur -->
        <PremiumBlock v-else>
          {{ block.body }}
        </PremiumBlock>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ResultBlock } from '~/types/results';
import PremiumBlock from '~/components/results/PremiumBlock.vue';

defineProps<{
  id: string;
  title: string;
  subtitle?: string;
  blocks: ResultBlock[];
}>();
</script>
