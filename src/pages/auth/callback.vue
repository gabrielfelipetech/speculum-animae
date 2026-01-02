<!-- src/pages/auth/callback.vue -->
<template>
  <main class="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
    <div class="px-6 text-center">
      <p class="text-sm text-slate-700 dark:text-slate-200">
        Conectando sua conta, aguarde...
      </p>

      <p v-if="errorText" class="mt-3 text-xs text-red-600 dark:text-red-400">
        {{ errorText }}
      </p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useSeoMeta, useSupabaseClient } from '#imports'
import { useRouter } from 'vue-router'

useSeoMeta({
  robots: 'noindex, nofollow',
  title: 'Conectando conta',
})

const router = useRouter()
const supabase = useSupabaseClient()

const errorText = ref<string | null>(null)

onMounted(async () => {
  if (!import.meta.client) return

  try {
    const url = window.location.href
    const params = new URL(url).searchParams

    // Erros que podem vir do provedor
    const oauthError = params.get('error')
    const oauthErrorDesc = params.get('error_description')
    if (oauthError) {
      errorText.value = oauthErrorDesc ?? 'Falha ao conectar com o provedor.'
      // volta pra home mesmo assim (ou para uma tela de login)
      await router.replace('/')
      return
    }

    // Fluxo padrão do Supabase OAuth: vem um `code=...`
    const hasCode = params.has('code')
    if (hasCode) {
      const { error } = await supabase.auth.exchangeCodeForSession(url)
      if (error) {
        errorText.value = error.message
        await router.replace('/')
        return
      }
    } else {
      // Se não tem code, tenta ao menos pegar sessão (caso já esteja logado)
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        // nada pra finalizar
        await router.replace('/')
        return
      }
    }

    // Aqui a sessão deve estar pronta
    await router.replace('/')
  } catch {
    errorText.value = 'Não foi possível finalizar o login. Tente novamente.'
    await router.replace('/')
  }
})
</script>
