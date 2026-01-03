<template>
  <section class="mx-auto max-w-4xl space-y-6 px-4 py-8">
    <header class="space-y-2">
      <p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
        Speculum Animae
      </p>
      <h1 class="font-display text-3xl tracking-tight">Testes</h1>
      <p class="text-sm text-slate-600 dark:text-slate-300">
        Escolha um teste para iniciar sua jornada de autoconhecimento.
      </p>
    </header>

    <div class="grid gap-4 sm:grid-cols-2">
      <NuxtLink
        v-for="item in publicTests"
        :key="item.slug"
        :to="item.href"
        class="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-indigo-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
      >
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          {{ item.kicker }}
        </p>
        <h2 class="mt-2 text-base font-semibold text-slate-900 dark:text-slate-50">
          {{ item.title }}
        </h2>
        <p class="mt-1 text-xs text-slate-500 dark:text-slate-300">
          {{ item.description }}
        </p>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSeoMeta } from '#imports';

type PublicTest = {
  slug: '12-camadas' | 'temperamentos-classicos';
  title: string;
  description: string;
  kicker: string;
  href: string;
};

const publicTests: PublicTest[] = [
  {
    slug: '12-camadas',
    title: 'Teste das 12 camadas da personalidade',
    description: 'Avalie suas camadas internas com perguntas guiadas e claras.',
    kicker: 'Personalidade',
    href: '/testes/12-camadas?fresh=1',

  },
  {
    slug: 'temperamentos-classicos',
    title: 'Temperamentos clássicos',
    description: 'Descubra seu perfil clássico e como ele impacta seu dia a dia.',
    kicker: 'Temperamento',
    href: '/testes/temperamentos-classicos?fresh=1',

  },
];

useSeoMeta({
  title: 'Testes',
  description: 'Lista de testes públicos do Speculum Animae para começar agora.',
});
</script>
