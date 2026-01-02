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

    <div v-else>
      <LikertTestView :config="likertConfig" :fresh="isFresh" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter, useSeoMeta } from '#imports';
import { getLikertTestBySlug } from '~/config/tests';
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

const route = useRoute();
const router = useRouter();

const slug = computed(() => String(route.params.slug || ''));

const isFresh = computed(() => route.query.fresh === '1');

const likertConfig = computed(() => getLikertTestBySlug(slug.value));

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

function isPublicSlug(value: string): value is PublicSlug {
  return value === '12-camadas' || value === 'temperamentos-classicos';
}

function goHome(): void {
  router.push('/');
}
</script>
