<template>
  <main class="mx-auto max-w-4xl px-4 py-8">
    <div class="space-y-10">
      <LikertTestView :config="testConfig" :fresh="isFresh" />

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
import { computed, onMounted, ref } from 'vue';
import {
  createError,
  navigateTo,
  useHead,
  useRoute,
  useSeoMeta,
} from '#imports';
import {
  getCanonicalTestSlug,
  getTestBySlug,
  isEnabledTestSlug,
  type EnabledTestSlug,
} from '~/config/tests';
import { getAllArticles } from '~/data/articles';
import { getFaqByTestSlug } from '~/data/faq';
import { buildFaqSchema } from '~/utils/seo/faqSchema';
import RelatedArticles from '~/components/articles/RelatedArticles.vue';
import FaqSection from '~/components/faq/FaqSection.vue';
import LikertTestView from '~/components/tests/LikertTestView.vue';
import { useLastResultRedirect } from '~/composables/useLastResultRedirect';

const route = useRoute();

definePageMeta({
  key: (currentRoute) => String(currentRoute.params.slug || ''),
});

const requestedSlug = String(route.params.slug || '');
const canonicalSlug = getCanonicalTestSlug(requestedSlug);

if (requestedSlug !== canonicalSlug) {
  await navigateTo(
    {
      path: `/testes/${canonicalSlug}`,
      query: route.query,
    },
    { redirectCode: 302 },
  );
}

if (!isEnabledTestSlug(canonicalSlug)) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Test not found',
  });
}

const slug: EnabledTestSlug = canonicalSlug;
const testConfig = getTestBySlug(slug);

if (!testConfig) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Test not found',
  });
}

const isFresh = computed(() => {
  const value = route.query.fresh;
  if (Array.isArray(value)) return value.includes('1');
  return value === '1';
});

const { tryRedirectToLastResult } = useLastResultRedirect();
const didRedirect = ref(false);
const attemptedRedirect = ref(false);

async function tryInitialLastResultRedirect(): Promise<void> {
  if (!import.meta.client) return;
  if (didRedirect.value || attemptedRedirect.value) return;
  if (isFresh.value) return;

  attemptedRedirect.value = true;

  try {
    const redirected = await tryRedirectToLastResult(slug);
    didRedirect.value = redirected;
  } catch {
    // Keep the runner available if redirect fails.
    didRedirect.value = false;
  }
}

onMounted(() => {
  void tryInitialLastResultRedirect();
});

type SeoPayload = {
  title: string;
  description: string;
};

const SEO_BY_SLUG: Record<EnabledTestSlug, SeoPayload> = {
  'twelve-layers': {
    title: 'Teste das 12 camadas da personalidade',
    description:
      'Explore suas camadas internas e descubra padroes de personalidade com perguntas guiadas.',
  },
  temperaments: {
    title: 'Teste dos temperamentos classicos',
    description:
      'Identifique seu temperamento dominante e como ele influencia suas escolhas diarias.',
  },
  'temperaments-compatibility': {
    title: 'Teste de compatibilidade de temperamentos',
    description:
      'Veja afinidades de estilo relacional e pontos de ajuste para convivencias mais harmoniosas.',
  },
};

const TEST_CATEGORY_BY_SLUG: Record<EnabledTestSlug, string> = {
  'twelve-layers': 'personalidade',
  temperaments: 'temperamentos',
  'temperaments-compatibility': 'relacionamentos',
};

const faqItems = computed(() => getFaqByTestSlug(slug));
const relatedArticles = computed(() => {
  const category = TEST_CATEGORY_BY_SLUG[slug];
  return getAllArticles()
    .filter((article) => article.category === category)
    .slice(0, 4);
});

const seoData = computed<SeoPayload>(() => {
  return (
    SEO_BY_SLUG[slug] ?? {
      title: testConfig.title,
      description: testConfig.description,
    }
  );
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
</script>
