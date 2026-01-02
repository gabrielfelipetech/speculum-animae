<template>
  <div class="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
    <span>Atualizado em {{ formattedDate }}</span>
    <span aria-hidden="true">-</span>
    <span>{{ readingMinutes }} min de leitura</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  updatedAt: string;
  readingMinutes: number;
}>();

const formattedDate = computed(() => formatDate(props.updatedAt));

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
</script>
