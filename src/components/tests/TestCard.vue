<!-- src/components/tests/TestCard.vue (ou o arquivo onde está esse card) -->
<template>
  <NuxtLink
    :to="to"
    class="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/90
           p-4 shadow-sm transition
           hover:-translate-y-0.5 hover:border-brand-500/70 hover:shadow-md
           dark:border-slate-800 dark:bg-slate-900/80
           sm:p-6"
  >
    <div class="space-y-2 sm:space-y-2.5">
      <h3
        class="font-display text-[0.72rem] font-semibold uppercase leading-snug tracking-[0.18em]
               text-brand-600 group-hover:text-brand-700
               dark:text-amber-300 dark:group-hover:text-amber-200
               sm:text-sm"
      >
        {{ test.title }}
      </h3>

      <p class="text-[0.9rem] leading-snug text-slate-600 dark:text-slate-300 sm:text-sm">
        {{ test.subtitle }}
      </p>
    </div>

    <!-- FOOTER -->
    <div class="mt-4 flex flex-wrap items-center gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex flex-wrap gap-1.5 mb-2">
        <TestTagPill v-for="tag in test.tags" :key="tag" :label="tag" />
      </div>

      

      <span class="rainbow-cta  ml-auto shrink-0" aria-label="Iniciar teste">
        <span class="rainbow-cta__inner">
          <span class="inline-flex items-center gap-1 text-[11px] font-semibold">
            Iniciar Teste <span aria-hidden="true">→</span>
          </span>
        </span>
      </span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
import type { TestConfig } from '~/types/tests'
import TestTagPill from '~/components/tests/TestTagPill.vue'

const props = defineProps<{
  test: TestConfig;
  variant: 'core' | 'other';
}>();
const to = computed(() => ({
  path: `/testes/${props.test.slug}`,
  query: { fresh: '1' },
}));
</script>

<style scoped>
@keyframes rainbow-shift {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}

/*
  Importante: NÃO defina display aqui.
  Se você definir display (ex.: flex) no CSS scoped, ele pode sobrescrever o `sm:hidden`
  e o botão aparecer no desktop (causando “dois botões”).
*/

.rainbow-cta {
  position: relative;
  border-radius: 8px;
  padding: 2px; /* espessura da borda */
  isolation: isolate;
}

/* Borda com gradiente animado */
.rainbow-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    90deg,
    #00f5ff,
    #00ff6a,
    #ffe600,
    #ff7a00,
    #ff00c8,
    #7a5cff,
    #00f5ff
  );
  background-size: 300% 300%;
  animation: rainbow-shift 5.2s linear infinite;
  z-index: -1;
}

/* Glow externo (mais sutil) */
.rainbow-cta::after {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: inherit;
  background: inherit;
  background-size: 300% 300%;
  animation: rainbow-shift 2.2s linear infinite;
  filter: blur(10px);
  opacity: 0.45;
  z-index: -2;
}

/* Miolo do botão */
.rainbow-cta__inner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: inherit;
  padding: 7px 10px; /* menor no mobile */
  white-space: nowrap;
  background: var(--cta-fill);
  color: var(--cta-text);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  transition: transform 120ms ease;
}

.rainbow-cta:active .rainbow-cta__inner {
  transform: translateY(1px);
}

/* Light */
.rainbow-cta {
  --cta-fill: rgba(255, 255, 255, 0.92);
  --cta-text: #0f172a;
}

/* Dark */
:global(html.dark) .rainbow-cta {
  --cta-fill: rgba(15, 23, 42, 0.92);
  --cta-text: #f8fafc;
}

@media (prefers-reduced-motion: reduce) {
  .rainbow-cta::before,
  .rainbow-cta::after {
    animation: none;
  }
}
</style>
