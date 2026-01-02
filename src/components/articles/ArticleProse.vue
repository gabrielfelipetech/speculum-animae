<template>
  <div class="space-y-5 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
    <template v-for="(block, index) in blocks" :key="`${block.type}-${index}`">
      <h2 v-if="block.type === 'h2'" class="font-display text-2xl text-slate-900 dark:text-slate-50">
        {{ block.text }}
      </h2>
      <h3 v-else-if="block.type === 'h3'" class="font-display text-xl text-slate-900 dark:text-slate-50">
        {{ block.text }}
      </h3>
      <p v-else-if="block.type === 'p'">
        {{ block.text }}
      </p>
      <ul v-else-if="block.type === 'ul'" class="space-y-2 pl-5">
        <li v-for="(item, itemIndex) in block.items" :key="itemIndex" class="list-disc">
          {{ item }}
        </li>
      </ul>
      <ol v-else-if="block.type === 'ol'" class="space-y-2 pl-5">
        <li v-for="(item, itemIndex) in block.items" :key="itemIndex" class="list-decimal">
          {{ item }}
        </li>
      </ol>
      <blockquote
        v-else-if="block.type === 'quote'"
        class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm italic text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200"
      >
        <p>{{ block.text }}</p>
        <footer v-if="block.cite" class="mt-2 text-xs not-italic text-slate-500 dark:text-slate-400">
          {{ block.cite }}
        </footer>
      </blockquote>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ArticleBodyBlock } from '~/types/articles';

defineProps<{
  blocks: ArticleBodyBlock[];
}>();
</script>
