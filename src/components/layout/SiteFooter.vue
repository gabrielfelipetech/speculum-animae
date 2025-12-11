<!-- src/components/layout/SiteFooter.vue -->
<template>
  <footer
    class="mt-10 border-t border-slate-200 bg-white/80 text-slate-800 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/90 dark:text-slate-100"
  >
    <div
      class="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 md:flex-row md:items-start md:justify-between"
    >
      <!-- Branding + mensagem bíblica -->
      <section class="space-y-3 md:max-w-xl">
        <div class="space-y-1">
          <p class="text-sm font-semibold tracking-[0.16em] text-slate-500 dark:text-slate-400">
            SPECULUM ANIMAE
          </p>
        </div>

        <figure
          class="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm italic text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
        >
          <blockquote class="leading-relaxed">
            «Conhece a ti mesmo, e a tuas falhas, e assim viverás.»
          </blockquote>
          <figcaption class="mt-1 text-xs not-italic text-slate-500 dark:text-slate-400">
            (Santo Agostinho)
          </figcaption>
        </figure>
      </section>

    </div>

    <div
      class="border-t border-slate-200 px-4 py-4 text-center text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-500"
    >
      <p>
        © {{ currentYear }} Speculum Animae. Todos os direitos reservados.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear: number = new Date().getFullYear();
</script>
