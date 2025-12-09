<template>
  <span
    class="inline-flex items-center rounded-full border border-slate-200/70 bg-slate-50 px-2 py-0.5 text-[0.65rem] font-medium text-slate-600 transition group-hover:border-brand-400 group-hover:bg-brand-50 group-hover:text-brand-700 "
  >
    {{ label }}
  </span>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>
