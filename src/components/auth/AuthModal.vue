<!-- src/components/auth/AuthModal.vue -->
<template>
  <BaseModal
    :model-value="internalOpen"
    @update:model-value="(v) => emit('update:open', v)"
    @close="emit('close')"
  >
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

      <!-- Tabs Entrar / Cadastrar -->
      <div class="flex gap-2 rounded-full bg-slate-100 p-1 text-xs dark:bg-slate-800">
        <button
          type="button"
          class="flex-1 rounded-full px-3 py-1.5 font-medium transition"
          :class="
            mode === 'signin'
              ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-50'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100'
          "
          @click="switchMode('signin')"
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
          @click="switchMode('signup')"
        >
          Cadastrar-se
        </button>
      </div>

      <!-- Mensagens de erro -->
      <div v-if="localError || errorMessage" class="rounded-lg bg-red-50 px-3 py-2 text-[0.7rem] text-red-700 dark:bg-red-900/40 dark:text-red-200">
        {{ localError || errorMessage }}
      </div>

      <!-- Formulário -->
      <form class="space-y-4" @submit.prevent="handleSubmit">
        <!-- Nome completo (apenas cadastro) -->
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

        <!-- Sexo (apenas cadastro) -->
        <div v-if="mode === 'signup'" class="space-y-1">
          <p class="text-xs font-medium text-slate-700 dark:text-slate-200">
            Sexo
          </p>
          <div class="flex gap-2">
            <label
              class="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[0.7rem] text-slate-700 shadow-sm transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-500"
            >
              <input
                v-model="gender"
                type="radio"
                value="male"
                class="h-3 w-3 border-slate-300 text-indigo-600 focus:ring-indigo-500"
              >
              <span>Masculino</span>
            </label>
            <label
              class="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[0.7rem] text-slate-700 shadow-sm transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-500"
            >
              <input
                v-model="gender"
                type="radio"
                value="female"
                class="h-3 w-3 border-slate-300 text-indigo-600 focus:ring-indigo-500"
              >
              <span>Feminino</span>
            </label>
          </div>
        </div>

        <!-- E-mail -->
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

        <!-- Senha -->
        <div class="space-y-2">
          <label class="block text-xs font-medium text-slate-700 dark:text-slate-200">
            Senha
            <input
              v-model="password"
              type="password"
              required
              minlength="8"
              class="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm outline-none ring-indigo-500/0 transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500 dark:hover:border-slate-500"
              autocomplete="current-password"
            >
          </label>

          <!-- Link Esqueci senha (só login) -->
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

        <!-- Confirmação de senha + força (apenas cadastro) -->
        <div v-if="mode === 'signup'" class="space-y-2">
          <label class="block text-xs font-medium text-slate-700 dark:text-slate-200">
            Confirmar senha
            <input
              v-model="passwordConfirm"
              type="password"
              required
              minlength="8"
              class="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm outline-none ring-indigo-500/0 transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500 dark:hover:border-slate-500"
              autocomplete="new-password"
            >
          </label>

          <div class="space-y-1">
            <div class="flex items-center justify-between text-[0.65rem]">
              <span>
                Força da senha:
                <span :class="['font-semibold', strengthLabelClass]">
                  {{ passwordStrengthLabel }}
                </span>
              </span>

              <span v-if="password && passwordConfirm && !passwordsMatch" class="text-[0.65rem] text-red-500">
                As senhas não coincidem
              </span>
            </div>

            <div class="h-1 w-full rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                class="h-1 rounded-full transition-all"
                :class="strengthBarClass"
                :style="{ width: strengthBarWidth }"
              />
            </div>
          </div>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/5 disabled:cursor-not-allowed disabled:opacity-60"
          :disabled="loading || !canSubmit"
        >
          <span v-if="loading">Processando...</span>
          <span v-else>
            {{ mode === 'signin' ? 'Entrar' : 'Criar conta' }}
          </span>
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
          class="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:hover:bg-slate-800"
          :disabled="loading"
          @click="handleGoogle"
        >
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
  loading?: boolean;
  errorMessage?: string | null;
}>();

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
  (e: 'close'): void;
  (e: 'submit-email', payload: {
    mode: 'signin' | 'signup';
    email: string;
    password: string;
    name?: string;
    gender?: 'male' | 'female';
  }): void;
  (e: 'google-auth', payload: { mode: 'signin' | 'signup' }): void;
}>();

const internalOpen = computed({
  get: () => props.open,
  set: (value: boolean) => emit('update:open', value),
});

const mode = ref<'signin' | 'signup'>('signin');
const name = ref('');
const gender = ref<'male' | 'female' | ''>('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');

const localError = ref<string | null>(null);

const passwordsMatch = computed(
  () =>
    !password.value ||
    !passwordConfirm.value ||
    password.value === passwordConfirm.value,
);

const passwordScore = computed(() => {
  const value = password.value;

  let score = 0;
  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
  if (/\d/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;

  if (!value) return 0;
  if (score <= 1) return 1; // fraca
  if (score === 2) return 2; // média
  return 3; // forte
});

const passwordStrengthLabel = computed(() => {
  switch (passwordScore.value) {
    case 1:
      return 'Fraca';
    case 2:
      return 'Média';
    case 3:
      return 'Forte';
    default:
      return '—';
  }
});

const strengthLabelClass = computed(() => {
  switch (passwordScore.value) {
    case 1:
      return 'text-red-600 dark:text-red-400';
    case 2:
      return 'text-yellow-600 dark:text-yellow-400';
    case 3:
      return 'text-emerald-600 dark:text-emerald-400';
    default:
      return 'text-slate-500';
  }
});

const strengthBarClass = computed(() => {
  switch (passwordScore.value) {
    case 1:
      return 'bg-red-500 dark:bg-red-400';
    case 2:
      return 'bg-yellow-500 dark:bg-yellow-400';
    case 3:
      return 'bg-emerald-500 dark:bg-emerald-400';
    default:
      return 'bg-transparent';
  }
});

const strengthBarWidth = computed(() => {
  switch (passwordScore.value) {
    case 1:
      return '33%';
    case 2:
      return '66%';
    case 3:
      return '100%';
    default:
      return '0%';
  }
});

const canSubmit = computed(() => {
  if (mode.value === 'signin') {
    return !!email.value && !!password.value;
  }

  // signup
  const baseOk =
    !!name.value &&
    !!email.value &&
    !!password.value &&
    !!passwordConfirm.value &&
    !!gender.value;

  return (
    baseOk &&
    passwordsMatch.value &&
    passwordScore.value >= 2 && // pelo menos "média"
    password.value.length >= 8
  );
});

function switchMode(next: 'signin' | 'signup') {
  mode.value = next;
  localError.value = null;

  if (next === 'signin') {
    // não precisa limpar tudo, mas podemos limpar campos específicos
    passwordConfirm.value = '';
  }
}

function handleSubmit(): void {
  localError.value = null;

  if (!email.value || !password.value) {
    localError.value = 'Preencha e-mail e senha.';
    return;
  }

  if (mode.value === 'signup') {
    if (!name.value || !gender.value) {
      localError.value = 'Preencha nome e sexo.';
      return;
    }
    if (!passwordsMatch.value) {
      localError.value = 'As senhas não coincidem.';
      return;
    }
    if (passwordScore.value < 2) {
      localError.value =
        'Use uma senha mais forte (8+ caracteres, letras maiúsculas/minúsculas, números e símbolo).';
      return;
    }
  }

  emit('submit-email', {
    mode: mode.value,
    email: email.value,
    password: password.value,
    name: mode.value === 'signup' ? name.value : undefined,
    gender:
      mode.value === 'signup'
        ? (gender.value as 'male' | 'female')
        : undefined,
  });
}

function handleGoogle(): void {
  localError.value = null;
  emit('google-auth', {
    mode: mode.value,
  });
}
</script>
