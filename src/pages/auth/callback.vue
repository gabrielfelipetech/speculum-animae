<!-- src/pages/auth/callback.vue -->
<template>
  <main class="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
    <p class="text-sm text-slate-700 dark:text-slate-200">
      Conectando sua conta, aguarde...
    </p>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useSupabaseUser } from '#imports';

const router = useRouter();
const user = useSupabaseUser();

onMounted(() => {
  setTimeout(() => {
    router.push('/');
  }, 800);
});
</script>
