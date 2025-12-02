<!-- src/components/results/PremiumBlock.vue -->
<template>
  <div class="relative overflow-hidden">
    <p class="select-none text-slate-700 opacity-20 blur-sm dark:text-slate-200">
      <slot />
    </p>

    <div
      class="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-b from-white/80 via-white/80 to-white/90 dark:from-slate-900/80 dark:via-slate-900/85 dark:to-slate-900/90"
    >
      <div
        class="pointer-events-auto w-full max-w-sm rounded-2xl border border-amber-300/70 bg-amber-50/95 p-4 text-center text-xs shadow-md dark:border-amber-500/60 dark:bg-amber-900/80"
      >
        <p class="font-semibold text-amber-900 dark:text-amber-100">
          Conteúdo disponível no relatório completo
        </p>
        <p class="mt-1 text-[0.7rem] text-amber-900/80 dark:text-amber-100/80">
          Desbloqueie o PDF premium para ler esta análise detalhada, com recomendações práticas e
          interpretações avançadas.
        </p>
        <button
          type="button"
          class="mt-3 inline-flex items-center justify-center rounded-full px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-amber-50 ring-1 ring-amber-300/70 transition hover:bg-amber-600 hover:ring-amber-400 dark:bg-amber-500 dark:ring-amber-400"
        >
          Desbloquear relatório completo
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
