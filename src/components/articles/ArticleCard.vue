<template>
  <NuxtLink
    :to="`/artigos/${article.slug}`"
    class="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80"
  >
    <div class="space-y-3">
      <div class="flex flex-wrap items-center justify-between gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
        <span>{{ categoryLabel }}</span>
        <span class="text-slate-400">{{ formattedDate }}</span>
      </div>
      <h3 class="text-lg font-semibold text-slate-900 transition group-hover:text-indigo-700 dark:text-slate-50 dark:group-hover:text-amber-300">
        {{ article.title }}
      </h3>
      <p class="text-sm text-slate-600 dark:text-slate-300">
        {{ article.description }}
      </p>
    </div>

    <span class="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-amber-300">
      Ler artigo
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ArticleMeta } from '~/types/articles';
import { getCategoryLabel } from '~/data/articles';

const props = defineProps<{
  article: ArticleMeta;
}>();

const categoryLabel = computed(() => getCategoryLabel(props.article.category));
const formattedDate = computed(() => formatDate(props.article.updatedAt));

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
</script>
