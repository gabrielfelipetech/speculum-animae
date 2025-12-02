<!-- src/components/tests/LikertTestPremiumTeaser.vue -->
<template>
  <section
    class="space-y-2 rounded-2xl border border-dashed border-amber-400/60 bg-amber-50/40 p-4 dark:border-amber-300/60 dark:bg-amber-900/10"
  >
    <h3 class="text-sm font-semibold text-amber-800 dark:text-amber-200">
      Relatório premium (ideia para monetização)
    </h3>
    <p class="text-xs text-amber-900/90 dark:text-amber-100/90">
      Depois de finalizar o teste, você poderá oferecer um PDF detalhado com
      análise completa, gráficos e recomendações personalizadas, disponível
      apenas para quem adquirir o relatório premium.
    </p>
    <BaseButton type="button" class="mt-1" disabled>
      Relatório Premium em PDF (em breve)
    </BaseButton>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '~/components/base/BaseButton.vue';
</script>
