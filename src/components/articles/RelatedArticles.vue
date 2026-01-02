<template>
  <section v-if="articles.length" class="space-y-4">
    <header class="space-y-2">
      <p
        v-if="kicker"
        class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"
      >
        {{ kicker }}
      </p>
      <h2 class="font-display text-2xl tracking-tight text-slate-900 dark:text-slate-50">
        {{ title }}
      </h2>
      <p v-if="description" class="text-sm text-slate-600 dark:text-slate-300">
        {{ description }}
      </p>
    </header>

    <div class="grid gap-4 md:grid-cols-2">
      <ArticleCard v-for="article in articles" :key="article.slug" :article="article" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ArticleMeta } from '~/types/articles';
import ArticleCard from '~/components/articles/ArticleCard.vue';

defineProps<{
  title: string;
  articles: ArticleMeta[];
  description?: string;
  kicker?: string;
}>();
</script>
