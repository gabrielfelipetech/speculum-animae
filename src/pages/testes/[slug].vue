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
import { useRoute, useRouter, useHead } from '#imports';
import { getLikertTestBySlug } from '~/config/tests';
import LikertTestView from '~/components/tests/LikertTestView.vue';
import BaseButton from '~/components/base/BaseButton.vue';

const route = useRoute();
const router = useRouter();

const slug = computed(() => route.params.slug as string);

const isFresh = computed(() => route.query.fresh === '1');

const likertConfig = computed(() => getLikertTestBySlug(slug.value));

useHead(() => ({
  title: likertConfig.value
    ? `${likertConfig.value.title} | Speculum Animae`
    : 'Teste não encontrado | Speculum Animae',
  meta: likertConfig.value
    ? [
        {
          name: 'description',
          content: likertConfig.value.description,
        },
      ]
    : [],
}));

function goHome(): void {
  router.push('/');
}
</script>
