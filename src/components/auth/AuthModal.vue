<template>
  <BaseModal v-model="internalOpen" @close="$emit('close')">
    <div class="space-y-5">
      <!-- Cabeçalho -->
      <header class="space-y-1">
        <p class="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          Acesso
        </p>
        <h2 class="text-lg font-semibold leading-tight">
          {{ mode === 'signin' ? 'Entrar na sua conta' : 'Criar uma conta' }}
        </h2>
        <p class="text-xs text-slate-500 dark:text-slate-400">
          Use seu e-mail ou continue com o Google.
        </p>
      </header>

      <!-- Tabs simples: Entrar / Cadastrar -->
      <div class="flex gap-2 rounded-full bg-slate-100 p-1 text-xs dark:bg-slate-800">
        <button
          type="button"
          class="flex-1 rounded-full px-3 py-1.5 font-medium transition"
          :class="
            mode === 'signin'
              ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-50'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100'
          "
          @click="mode = 'signin'"
        >
          Entrar
        </button>
        <button
          type="button"
          class="flex-1 rounded-full px-3 py-1.5 font-medium transition"
          :class="
            mode === 'signup'
              ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-50'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100'
          "
          @click="mode = 'signup'"
        >
          Cadastrar-se
        </button>
      </div>

      <!-- Formulário -->
      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div v-if="mode === 'signup'" class="space-y-2">
          <label class="block text-xs font-medium text-slate-700 dark:text-slate-200">
            Nome completo
            <input
              v-model="name"
              type="text"
              class="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm outline-none ring-indigo-500/0 transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500 dark:hover:border-slate-500"
              autocomplete="name"
            >
          </label>
        </div>

        <div class="space-y-2">
          <label class="block text-xs font-medium text-slate-700 dark:text-slate-200">
            E-mail
            <input
              v-model="email"
              type="email"
              required
              class="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm outline-none ring-indigo-500/0 transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500 dark:hover:border-slate-500"
              autocomplete="email"
            >
          </label>
        </div>

        <div class="space-y-2">
          <label class="block text-xs font-medium text-slate-700 dark:text-slate-200">
            Senha
            <input
              v-model="password"
              type="password"
              required
              class="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm outline-none ring-indigo-500/0 transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500 dark:hover:border-slate-500"
              autocomplete="current-password"
            >
          </label>
          <div
            v-if="mode === 'signin'"
            class="flex justify-end"
          >
            <button
              type="button"
              class="text-[0.7rem] font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Esqueci minha senha
            </button>
          </div>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/5"
        >
          {{ mode === 'signin' ? 'Entrar' : 'Criar conta' }}
        </button>

        <!-- Divisor -->
        <div class="flex items-center gap-2">
          <div class="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
          <span class="text-[0.65rem] uppercase tracking-[0.15em] text-slate-400">
            ou
          </span>
          <div class="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        </div>

        <!-- Google -->
        <button
          type="button"
          class="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:hover:bg-slate-800"
          @click="handleGoogle"
        >
          <!-- Placeholder do ícone do Google -->
          <span class="inline-flex h-4 w-4 items-center justify-center rounded-sm bg-white text-[0.6rem] leading-none text-slate-900 shadow dark:bg-slate-200">
            G
          </span>
          <span>
            {{ mode === 'signin' ? 'Continuar com Google' : 'Cadastrar com Google' }}
          </span>
        </button>

        <p class="text-[0.65rem] leading-snug text-slate-400">
          Ao continuar, você concorda com os termos de uso e com a política de privacidade do Speculum Animae.
        </p>
      </form>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import BaseModal from '~/components/base/BaseModal.vue';

const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
  (e: 'close'): void;
  (e: 'submit-email', payload: { mode: 'signin' | 'signup'; email: string; password: string; name?: string }): void;
  (e: 'google-auth', payload: { mode: 'signin' | 'signup' }): void;
}>();

const internalOpen = computed({
  get: () => props.open,
  set: (value: boolean) => emit('update:open', value),
});

const mode = ref<'signin' | 'signup'>('signin');
const name = ref('');
const email = ref('');
const password = ref('');

function handleSubmit(): void {
  emit('submit-email', {
    mode: mode.value,
    email: email.value,
    password: password.value,
    name: mode.value === 'signup' ? name.value : undefined,
  });

  // aqui você pode decidir fechar ou não automaticamente
  // internalOpen.value = false;
}

function handleGoogle(): void {
  emit('google-auth', {
    mode: mode.value,
  });

  // idem comentário acima – normalmente o redirecionamento
  // do provedor acontece aqui
}
</script>
