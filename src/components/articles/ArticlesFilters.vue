<template>
  <div class="space-y-4 rounded-2xl border border-slate-200 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-900/80">
    <div class="grid gap-3 md:grid-cols-[1.4fr_0.6fr]">
      <label class="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        Buscar
        <input
          :value="search"
          type="search"
          placeholder="Buscar por titulo, descricao ou tag"
          class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-amber-300 dark:focus:ring-amber-300/30"
          @input="onSearchInput"
        />
      </label>

      <label class="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        Categoria
        <select
          :value="category"
          class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-amber-300 dark:focus:ring-amber-300/30"
          @change="onCategoryChange"
        >
          <option value="all">Todas</option>
          <option v-for="value in categories" :key="value" :value="value">
            {{ getCategoryLabel(value) }}
          </option>
        </select>
      </label>
    </div>

  </div>
</template>

<script setup lang="ts">
import { getCategoryLabel } from '~/data/articles';

const props = defineProps<{
  search: string;
  category: string;
  tag: string | null;
  categories: string[];
  tags: string[];
}>();

const emit = defineEmits<{
  (e: 'update:search', value: string): void;
  (e: 'update:category', value: string): void;
  (e: 'update:tag', value: string | null): void;
}>();

function onSearchInput(event: Event): void {
  const target = event.target as HTMLInputElement | null;
  emit('update:search', target?.value ?? '');
}

function onCategoryChange(event: Event): void {
  const target = event.target as HTMLSelectElement | null;
  emit('update:category', target?.value ?? 'all');
}

function toggleTag(value: string): void {
  emit('update:tag', props.tag === value ? null : value);
}

function clearTag(): void {
  emit('update:tag', null);
}
</script>
