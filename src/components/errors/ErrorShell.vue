<template>
  <section
    class="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white/95 via-slate-50/90 to-indigo-50/80 p-6 shadow-sm dark:border-slate-800 dark:from-slate-950 dark:via-slate-900/80 dark:to-slate-950 sm:p-8"
  >
    <div
      class="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-200/40 blur-3xl dark:bg-amber-400/10"
    />
    <div
      class="pointer-events-none absolute -left-20 bottom-0 h-36 w-36 rounded-full bg-slate-200/60 blur-3xl dark:bg-slate-800/60"
    />

    <div class="relative space-y-4">
      <p
        v-if="statusLabel"
        class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"
      >
        {{ statusLabel }}
      </p>
      <h1 class="font-display text-2xl tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
        {{ title }}
      </h1>
      <p class="text-sm text-slate-600 dark:text-slate-300">
        {{ description }}
      </p>
      <div v-if="$slots.actions" class="flex flex-wrap items-center gap-3 pt-2">
        <slot name="actions" />
      </div>
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  statusLabel?: string;
}>();
</script>
