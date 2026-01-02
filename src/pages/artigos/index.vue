<template>
  <section class="mx-auto max-w-5xl space-y-8 px-4 py-8">
    <header class="space-y-3">
      <p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
        Speculum Animae
      </p>
      <h1 class="font-display text-3xl tracking-tight md:text-4xl">Artigos</h1>
      <p class="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
        Leituras sobre personalidade, temperamentos, virtudes e relacionamentos para apoiar seu
        autoconhecimento.
      </p>
    </header>

    <ArticlesFilters
      :search="search"
      :category="selectedCategory"
      :tag="selectedTag"
      :categories="categories"
      :tags="visibleTags"
      @update:search="(value) => (search = value)"
      @update:category="(value) => (selectedCategory = value)"
      @update:tag="(value) => (selectedTag = value)"
    />

    <div v-if="filteredArticles.length" class="grid gap-4 md:grid-cols-2">
      <ArticleCard v-for="article in filteredArticles" :key="article.slug" :article="article" />
    </div>

    <div v-else class="rounded-2xl border border-dashed border-slate-200 bg-white/80 p-6 text-center dark:border-slate-800 dark:bg-slate-900/60">
      <p class="text-sm text-slate-600 dark:text-slate-300">
        Nenhum artigo encontrado. Tente outro termo ou ajuste os filtros.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useSeoMeta } from '#imports';
import { getAllArticles, getArticleCategories, getArticleTags } from '~/data/articles';
import ArticleCard from '~/components/articles/ArticleCard.vue';
import ArticlesFilters from '~/components/articles/ArticlesFilters.vue';

useSeoMeta({
  title: 'Artigos',
  description: 'Artigos sobre personalidade, temperamentos, virtudes e relacionamentos.',
});

const allArticles = getAllArticles();
const categories = getArticleCategories();
const allTags = getArticleTags();

const search = ref('');
const selectedCategory = ref('all');
const selectedTag = ref<string | null>(null);

const visibleTags = computed(() => {
  if (selectedCategory.value === 'all') return allTags;
  const categoryArticles = allArticles.filter(
    (article) => article.category === selectedCategory.value,
  );
  return Array.from(new Set(categoryArticles.flatMap((article) => article.tags))).sort();
});

watch([selectedCategory, visibleTags], () => {
  if (selectedTag.value && !visibleTags.value.includes(selectedTag.value)) {
    selectedTag.value = null;
  }
});

const filteredArticles = computed(() => {
  const query = search.value.trim().toLowerCase();
  return allArticles.filter((article) => {
    const matchesQuery =
      !query ||
      article.title.toLowerCase().includes(query) ||
      article.description.toLowerCase().includes(query) ||
      article.tags.some((tag) => tag.toLowerCase().includes(query));

    const matchesCategory =
      selectedCategory.value === 'all' || article.category === selectedCategory.value;

    const matchesTag = !selectedTag.value || article.tags.includes(selectedTag.value);

    return matchesQuery && matchesCategory && matchesTag;
  });
});
</script>
