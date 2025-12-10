<!-- src/components/results/PremiumBlock.vue -->
<template>
  <div class="relative mt-4">
    <!-- texto borrado de fundo + espaçador para garantir altura -->
    <div
      class="select-none blur-sm opacity-35 pointer-events-none text-slate-700 dark:text-slate-200"
      aria-hidden="true"
    >
      <slot />
      <!-- aumenta a altura mínima do bloco para caber o card -->
      <div class="h-20" />
    </div>

    <!-- overlay premium -->
    <div
      class="absolute inset-0 z-10 flex items-center justify-center
             bg-gradient-to-b from-white/60 via-white/80 to-white
             dark:from-slate-900/60 dark:via-slate-900/80 dark:to-slate-900"
    >
      <div
        class="w-full max-w-md rounded-2xl border border-amber-300 bg-amber-50
               px-6 py-5 text-center text-xs shadow-lg
               dark:border-amber-500/60 dark:bg-amber-900"
      >
        <p class="text-sm font-bold text-amber-900 dark:text-amber-100">
          Conteúdo disponível no relatório completo
        </p>
        <p
          class="mt-2 text-xs leading-relaxed text-amber-900/80 dark:text-amber-100/80"
        >
          Desbloqueie o PDF premium para ler esta análise detalhada, com
          recomendações práticas e interpretações avançadas.
        </p>

        <button
          type="button"
          :disabled="!sessionId"
          @click="handleUnlock"
          class="mt-4 inline-flex items-center justify-center rounded-full
                 bg-amber-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider
                 text-white shadow-sm ring-1 ring-amber-300/50
                 transition-all hover:bg-amber-600 hover:shadow-md hover:scale-105
                 active:scale-95"
        >
          Desbloquear relatório
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from '#imports';

const route = useRoute();

const sessionId = computed(() => {
  const raw = route.params.sessionId;
  if (typeof raw === 'string') return raw;
  if (Array.isArray(raw)) return raw[0] as string;
  return null;
});

function handleUnlock(): void {
  if (!process.client) return;
  if (!sessionId.value) {
    console.warn('[PremiumBlock] sessionId não encontrado na rota /resultados/:sessionId');
    return;
  }

  window.location.href = `/api/results/${sessionId.value}/pdf`;
}
</script>
