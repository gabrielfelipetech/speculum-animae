<template>
  <main class="mx-auto max-w-4xl px-4 py-8">
    <div v-if="!likertConfig">
      <h1 class="font-display text-2xl tracking-tight">
        Teste não encontrado
      </h1>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Não encontramos nenhum teste com esse endereço. Verifique se o link
        está correto ou volte para a página inicial.
      </p>
      <BaseButton type="button" class="mt-4" @click="goHome">
        Voltar para a página inicial
      </BaseButton>
    </div>

    <div v-else class="space-y-10">
      <LikertTestView :config="likertConfig" :fresh="isFresh" />

      <RelatedArticles
        v-if="relatedArticles.length"
        title="Artigos relacionados"
        :articles="relatedArticles"
        description="Leituras alinhadas ao tema deste teste."
      />

      <FaqSection
        v-if="faqItems.length"
        title="Perguntas frequentes"
        :items="faqItems"
        description="Respostas rapidas para as duvidas mais comuns sobre este teste."
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useHead, useRoute, useRouter, useSeoMeta } from '#imports';
import { getLikertTestBySlug } from '~/config/tests';
import { getAllArticles } from '~/data/articles';
import { getFaqByTestSlug } from '~/data/faq';
import { buildFaqSchema } from '~/utils/seo/faqSchema';
import RelatedArticles from '~/components/articles/RelatedArticles.vue';
import FaqSection from '~/components/faq/FaqSection.vue';
import LikertTestView from '~/components/tests/LikertTestView.vue';
import BaseButton from '~/components/base/BaseButton.vue';

type PublicSlug = '12-camadas' | 'temperamentos-classicos';

type SeoPayload = {
  title: string;
  description: string;
};

const SEO_BY_SLUG: Record<PublicSlug, SeoPayload> = {
  '12-camadas': {
    title: 'Teste das 12 camadas da personalidade',
    description:
      'Explore suas camadas internas e descubra padrões de personalidade com perguntas guiadas.',
  },
  'temperamentos-classicos': {
    title: 'Teste dos temperamentos clássicos',
    description:
      'Identifique seu temperamento dominante e como ele influencia suas escolhas diárias.',
  },
};

const TEST_CATEGORY_BY_SLUG: Record<PublicSlug, string> = {
  '12-camadas': 'personalidade',
  'temperamentos-classicos': 'temperamentos',
};

const route = useRoute();
const router = useRouter();

const slug = computed(() => String(route.params.slug || ''));

const isFresh = computed(() => route.query.fresh === '1');

const likertConfig = computed(() => getLikertTestBySlug(slug.value));
const faqItems = computed(() => getFaqByTestSlug(slug.value));
const relatedArticles = computed(() => {
  if (!isPublicSlug(slug.value)) return [];
  const category = TEST_CATEGORY_BY_SLUG[slug.value];
  return getAllArticles().filter((article) => article.category === category).slice(0, 4);
});

const seoData = computed<SeoPayload>(() => {
  if (isPublicSlug(slug.value)) return SEO_BY_SLUG[slug.value];
  if (likertConfig.value) {
    return {
      title: likertConfig.value.title,
      description: likertConfig.value.description,
    };
  }
  return {
    title: 'Teste não encontrado',
    description: 'Não encontramos nenhum teste com esse endereço.',
  };
});

useSeoMeta(() => ({
  title: seoData.value.title,
  description: seoData.value.description,
}));

useHead(() => {
  if (!faqItems.value.length) return {};
  return {
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(buildFaqSchema(faqItems.value)),
      },
    ],
  };
});

function isPublicSlug(value: string): value is PublicSlug {
  return value === '12-camadas' || value === 'temperamentos-classicos';
}

function goHome(): void {
  router.push('/');
}
</script>
