<template>
  <section class="mx-auto max-w-4xl space-y-8 px-4 py-8">
    <nav
      aria-label="Breadcrumb"
      class="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
    >
      <NuxtLink to="/" class="hover:text-indigo-600 dark:hover:text-amber-300">Home</NuxtLink>
      <span aria-hidden="true">/</span>
      <NuxtLink to="/artigos" class="hover:text-indigo-600 dark:hover:text-amber-300">Artigos</NuxtLink>
      <span aria-hidden="true">/</span>
      <span>{{ categoryLabel }}</span>
      <span aria-hidden="true">/</span>
      <span class="text-slate-500 dark:text-slate-300">{{ article?.title ?? 'Artigo' }}</span>
    </nav>

    <div v-if="!article" class="space-y-3">
      <h1 class="font-display text-2xl tracking-tight">Artigo nao encontrado</h1>
      <p class="text-sm text-slate-600 dark:text-slate-300">
        Nao encontramos este artigo. Verifique o link ou volte para a lista de artigos.
      </p>
      <BaseButton type="button" @click="goToArticles">Voltar para artigos</BaseButton>
    </div>

    <article v-else class="space-y-6">
      <header class="space-y-3">
        <p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
          {{ categoryLabel }}
        </p>
        <h1 class="font-display text-3xl tracking-tight md:text-4xl">
          {{ article.title }}
        </h1>
        <p class="text-sm text-slate-600 dark:text-slate-300">
          {{ article.description }}
        </p>
        <ArticleMetaBar :updated-at="article.updatedAt" :reading-minutes="article.readingMinutes" />
      </header>

      <img
        v-if="article.coverImage"
        :src="article.coverImage"
        :alt="article.title"
        class="w-full rounded-2xl border border-slate-200 object-cover shadow-sm dark:border-slate-800"
      />

      <ArticleProse :blocks="article.body" />
    </article>

    <section
      v-if="relatedTests.length"
      class="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-6 shadow-sm dark:border-amber-300/30 dark:bg-amber-300/10"
    >
      <h2 class="font-display text-xl text-slate-900 dark:text-slate-50">Ir para o teste relacionado</h2>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Continue sua jornada aplicando o que leu em um teste pratico.
      </p>
      <div class="mt-4 flex flex-wrap gap-3">
        <NuxtLink
          v-for="test in relatedTests"
          :key="test.slug"
          :to="test.href"
          class="rounded-full border border-indigo-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700 transition hover:border-indigo-300 hover:shadow-sm dark:border-amber-300/40 dark:bg-slate-950 dark:text-amber-200"
        >
          {{ test.title }}
        </NuxtLink>
      </div>
    </section>

    <RelatedArticles
      v-if="relatedArticles.length"
      title="Artigos relacionados"
      :articles="relatedArticles"
      description="Leituras que aprofundam temas semelhantes."
    />
  </section>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { createError, useAsyncData, useRoute, useRouter, useSeoMeta, useRuntimeConfig } from '#imports';
import { getArticleBySlug, getCategoryLabel, getRelatedArticles } from '~/data/articles';
import ArticleMetaBar from '~/components/articles/ArticleMetaBar.vue';
import ArticleProse from '~/components/articles/ArticleProse.vue';
import RelatedArticles from '~/components/articles/RelatedArticles.vue';
import BaseButton from '~/components/base/BaseButton.vue';

const route = useRoute();
const router = useRouter();
const runtime = useRuntimeConfig();

definePageMeta({
  key: (route) => String(route.params.slug || ''),
});

const slug = computed(() => String(route.params.slug || ''));
const articleKey = computed(() => `article-${slug.value}`);

const { data: article, pending } = await useAsyncData(articleKey, () =>
  getArticleBySlug(slug.value),
);

watchEffect(() => {
  if (!pending.value && !article.value) {
    throw createError({ statusCode: 404, statusMessage: 'Artigo nao encontrado' });
  }
});

const categoryLabel = computed(() =>
  article.value ? getCategoryLabel(article.value.category) : 'Categoria',
);

const relatedArticles = computed(() =>
  article.value ? getRelatedArticles(article.value, 4) : [],
);

const TEST_LINKS: Record<string, { slug: string; title: string; href: string }> = {
  'temperamentos-classicos': {
    slug: 'temperamentos-classicos',
    title: 'Teste de temperamentos classicos',
    href: '/testes/temperamentos-classicos',
  },
  '12-camadas': {
    slug: '12-camadas',
    title: 'Teste das 12 camadas',
    href: '/testes/12-camadas',
  },
};

const relatedTests = computed(() => {
  if (!article.value) return [];
  return article.value.relatedTestSlugs
    .map((slugKey) => TEST_LINKS[slugKey])
    .filter((item): item is { slug: string; title: string; href: string } => Boolean(item));
});

const siteUrl = String(runtime.public.siteUrl || 'https://speculumanimae.com.br').replace(
  /\/$/,
  '',
);

useSeoMeta(() => {
  const title = article.value?.title ?? 'Artigo nao encontrado';
  const description =
    article.value?.description ?? 'Nao encontramos este artigo no Speculum Animae.';
  const ogImage = article.value?.coverImage
    ? `${siteUrl}${article.value.coverImage}`
    : undefined;

  return {
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage,
    ogType: 'article',
  };
});

function goToArticles(): void {
  router.push('/artigos');
}
</script>
