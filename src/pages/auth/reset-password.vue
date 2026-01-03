<!-- src/pages/auth/reset-password.vue -->
<template>
  <section class="min-h-screen bg-slate-50/70 py-10 dark:bg-slate-950">
    <div class="mx-auto max-w-md space-y-6 px-4">
      <header class="space-y-1">
        <p
          class="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"
        >
          Recuperação
        </p>
        <h1 class="text-xl font-semibold text-slate-900 dark:text-slate-50">
          Definir nova senha
        </h1>
        <p class="text-xs text-slate-500 dark:text-slate-400">
          Escolha uma nova senha para sua conta.
        </p>
      </header>

      <div
        v-if="message"
        class="rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200"
      >
        {{ message }}
      </div>

      <div
        v-if="errorMsg"
        class="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-900/40 dark:text-red-200"
      >
        {{ errorMsg }}
      </div>

      <form class="space-y-4" @submit.prevent="submit">
        <label class="block text-xs font-medium text-slate-700 dark:text-slate-200">
          Nova senha
          <input
            v-model="password"
            type="password"
            minlength="8"
            required
            class="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm outline-none transition
                   hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40
                   dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:hover:border-slate-500"
            autocomplete="new-password"
          >
        </label>

        <label class="block text-xs font-medium text-slate-700 dark:text-slate-200">
          Confirmar senha
          <input
            v-model="confirm"
            type="password"
            minlength="8"
            required
            class="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm outline-none transition
                   hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40
                   dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:hover:border-slate-500"
            autocomplete="new-password"
          >
        </label>

        <button
          type="submit"
          class="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition
                 hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
                 disabled:cursor-not-allowed disabled:opacity-60"
          :disabled="loading || !canSubmit"
        >
          <span v-if="loading">Salvando...</span>
          <span v-else>Atualizar senha</span>
        </button>

        <NuxtLink
          to="/"
          class="block text-center text-[0.7rem] font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-50"
        >
          Voltar para a home
        </NuxtLink>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRouter, useSeoMeta } from '#app';
import { useSupabaseClient } from '#imports';

useSeoMeta({
  robots: 'noindex, nofollow',
  title: 'Redefinir senha',
});

const supabase = useSupabaseClient();
const router = useRouter();

const password = ref('');
const confirm = ref('');
const loading = ref(false);
const errorMsg = ref<string | null>(null);
const message = ref<string | null>(null);

const canSubmit = computed(() => {
  return password.value.length >= 8 && confirm.value.length >= 8 && password.value === confirm.value;
});

onMounted(async () => {
  // Se o usuário abrir essa página sem estar em "recovery", updateUser vai falhar.
  // Não bloqueia por completo, mas já dá uma mensagem mais clara.
  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    errorMsg.value = 'Link inválido ou expirado. Solicite novamente a recuperação de senha.';
  }
});

async function submit() {
  errorMsg.value = null;
  message.value = null;

  if (!canSubmit.value) {
    errorMsg.value = 'As senhas não coincidem ou são muito curtas.';
    return;
  }

  loading.value = true;
  try {
    const { error } = await supabase.auth.updateUser({ password: password.value });
    if (error) throw error;

    message.value = 'Senha atualizada com sucesso. Você será redirecionado.';
    setTimeout(() => router.push('/'), 800);
  } catch (e) {
    const anyErr = e as { message?: unknown };
    errorMsg.value = typeof anyErr?.message === 'string' ? anyErr.message : 'Erro ao atualizar senha.';
  } finally {
    loading.value = false;
  }
}
</script>
