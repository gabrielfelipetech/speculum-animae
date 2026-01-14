<template>
  <section class="mx-auto max-w-4xl space-y-6 px-4 py-8">
    <nav class="text-xs text-slate-500 dark:text-slate-400">
      <NuxtLink
        to="/"
        class="transition hover:text-indigo-600 dark:hover:text-amber-300"
      >
        Home
      </NuxtLink>
      <span class="px-2">/</span>
      <span>Privacidade</span>
    </nav>

    <header class="space-y-2">
      <p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
        Legal
      </p>
      <h1 class="font-display text-3xl tracking-tight text-slate-900 dark:text-slate-50">
        Pol&iacute;tica de privacidade
      </h1>
      <p class="text-sm text-slate-600 dark:text-slate-300">
        Explicamos de forma simples como coletamos e utilizamos informa&ccedil;&otilde;es
        ao longo da sua experi&ecirc;ncia.
      </p>
    </header>

    <div class="space-y-4">
      <article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <h2 class="text-base font-semibold text-slate-900 dark:text-slate-50">
          1. Quem somos (Controlador e contato)
        </h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          O Speculum Animae &eacute; o controlador dos dados tratados nesta plataforma.
          Para d&uacute;vidas sobre privacidade e solicita&ccedil;&otilde;es relacionadas a dados pessoais,
          fale com:
          <a
            href="mailto:contato@speculumanimae.com.br"
            class="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-amber-300 dark:hover:text-amber-200"
          >
            contato@speculumanimae.com.br
          </a>.
        </p>
      </article>

      <article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <h2 class="text-base font-semibold text-slate-900 dark:text-slate-50">
          2. Dados que coletamos
        </h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Podemos coletar:
        </p>
        <ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
          <li>
            Dados de conta: nome (quando informado), e-mail, identificadores da conta
            (ex.: id do usu&aacute;rio).
          </li>
          <li>
            Dados de autentica&ccedil;&atilde;o: informa&ccedil;&otilde;es necess&aacute;rias para login
            (tratadas via Supabase). N&atilde;o armazenamos sua senha em texto.
          </li>
          <li>
            Dados de uso e navega&ccedil;&atilde;o: p&aacute;ginas acessadas, intera&ccedil;&otilde;es
            e eventos t&eacute;cnicos (ex.: logs de erro).
          </li>
          <li>
            Dados t&eacute;cnicos: IP, data/hora de acesso, device/user-agent, identificadores
            de sess&atilde;o.
          </li>
          <li>
            Prefer&ecirc;ncias: tema (dark/light), idioma, ajustes de UI salvos no
            localStorage/cookies.
          </li>
          <li>
            Resultados de testes: respostas, pontua&ccedil;&otilde;es e relat&oacute;rios gerados.
            Quando voc&ecirc; est&aacute; logado, esses resultados podem ser sincronizados com sua conta.
          </li>
          <li>
            Pagamentos (quando aplic&aacute;vel): status de assinatura/compra e identificadores
            de transa&ccedil;&atilde;o. Dados de cart&atilde;o s&atilde;o processados pelo Stripe e n&atilde;o ficam
            armazenados no Speculum Animae.
          </li>
        </ul>
      </article>

      <article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <h2 class="text-base font-semibold text-slate-900 dark:text-slate-50">
          3. Para que usamos os dados (finalidades)
        </h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Usamos os dados para:
        </p>
        <ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
          <li>Autenticar sua conta e manter sess&otilde;es seguras.</li>
          <li>Gerar e exibir resultados dos testes e relat&oacute;rios.</li>
          <li>Sincronizar hist&oacute;rico na nuvem (quando voc&ecirc; est&aacute; logado).</li>
          <li>Personalizar sua experi&ecirc;ncia (ex.: tema e prefer&ecirc;ncias).</li>
          <li>Prevenir fraude e abuso (ex.: tentativas de burlar paywall, uso automatizado indevido).</li>
          <li>Melhorar estabilidade e performance (diagn&oacute;stico de erros e m&eacute;tricas de uso).</li>
          <li>Processar assinaturas e permitir acesso a conte&uacute;do premium (quando aplic&aacute;vel).</li>
          <li>Comunicar atualiza&ccedil;&otilde;es relevantes do servi&ccedil;o, quando necess&aacute;rio.</li>
        </ul>
      </article>

      <article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <h2 class="text-base font-semibold text-slate-900 dark:text-slate-50">
          4. Bases legais (LGPD)
        </h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Tratamos dados pessoais com base em:
        </p>
        <ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
          <li>
            Execu&ccedil;&atilde;o de contrato: para fornecer a plataforma, autentica&ccedil;&atilde;o e
            entrega de resultados.
          </li>
          <li>
            Leg&iacute;timo interesse: para seguran&ccedil;a, preven&ccedil;&atilde;o a abuso e melhoria do servi&ccedil;o.
          </li>
          <li>
            Consentimento: quando necess&aacute;rio (ex.: cookies n&atilde;o essenciais, comunica&ccedil;&otilde;es opcionais).
          </li>
          <li>
            Cumprimento de obriga&ccedil;&atilde;o legal/regulat&oacute;ria: quando aplic&aacute;vel (ex.: reten&ccedil;&otilde;es exigidas por lei).
          </li>
        </ul>
      </article>

      <article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <h2 class="text-base font-semibold text-slate-900 dark:text-slate-50">
          5. Cookies e localStorage
        </h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Utilizamos cookies/localStorage principalmente para:
        </p>
        <ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
          <li>Manter prefer&ecirc;ncias (ex.: tema dark/light).</li>
          <li>Suportar sess&atilde;o e seguran&ccedil;a.</li>
          <li>Melhorar a experi&ecirc;ncia e reduzir erros.</li>
        </ul>
        <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
          Voc&ecirc; pode limpar cookies/localStorage no navegador, mas isso pode resetar
          prefer&ecirc;ncias e exigir novo login.
        </p>
      </article>

      <article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <h2 class="text-base font-semibold text-slate-900 dark:text-slate-50">
          6. Compartilhamento com terceiros
        </h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Podemos compartilhar dados com provedores essenciais:
        </p>
        <ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
          <li>Supabase: autentica&ccedil;&atilde;o e armazenamento (conta e dados associados).</li>
          <li>Stripe: pagamentos e gerenciamento de assinatura (quando aplic&aacute;vel).</li>
        </ul>
        <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
          Esses provedores tratam dados conforme seus pr&oacute;prios termos e medidas de seguran&ccedil;a.
        </p>
      </article>

      <article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <h2 class="text-base font-semibold text-slate-900 dark:text-slate-50">
          7. Transfer&ecirc;ncia internacional
        </h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Alguns provedores podem processar dados fora do Brasil. Quando isso ocorrer,
          adotamos medidas para manter a prote&ccedil;&atilde;o adequada, incluindo contratos e
          salvaguardas compat&iacute;veis com a LGPD.
        </p>
      </article>

      <article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <h2 class="text-base font-semibold text-slate-900 dark:text-slate-50">
          8. Reten&ccedil;&atilde;o e exclus&atilde;o
        </h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Mantemos dados apenas pelo tempo necess&aacute;rio para as finalidades descritas, por exemplo:
        </p>
        <ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
          <li>Conta e perfil: enquanto sua conta existir.</li>
          <li>Resultados sincronizados: enquanto sua conta existir ou at&eacute; voc&ecirc; solicitar exclus&atilde;o (quando aplic&aacute;vel).</li>
          <li>Logs e seguran&ccedil;a: por per&iacute;odo limitado para auditoria e preven&ccedil;&atilde;o a abuso.</li>
        </ul>
        <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
          Voc&ecirc; pode solicitar exclus&atilde;o da conta e dos dados associados pelo e-mail
          <a
            href="mailto:contato@speculumanimae.com.br"
            class="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-amber-300 dark:hover:text-amber-200"
          >
            contato@speculumanimae.com.br
          </a>,
          respeitando limites legais e t&eacute;cnicos (ex.: backups).
        </p>
      </article>

      <article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <h2 class="text-base font-semibold text-slate-900 dark:text-slate-50">
          9. Direitos do titular
        </h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Voc&ecirc; pode solicitar:
        </p>
        <ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
          <li>Confirma&ccedil;&atilde;o e acesso aos dados.</li>
          <li>Corre&ccedil;&atilde;o.</li>
          <li>Portabilidade (quando aplic&aacute;vel).</li>
          <li>Anonimiza&ccedil;&atilde;o, bloqueio ou elimina&ccedil;&atilde;o.</li>
          <li>Informa&ccedil;&atilde;o sobre compartilhamento.</li>
          <li>Revoga&ccedil;&atilde;o de consentimento (quando aplic&aacute;vel).</li>
        </ul>
        <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
          Para exercer direitos:
          <a
            href="mailto:contato@speculumanimae.com.br"
            class="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-amber-300 dark:hover:text-amber-200"
          >
            contato@speculumanimae.com.br
          </a>.
        </p>
      </article>

      <article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <h2 class="text-base font-semibold text-slate-900 dark:text-slate-50">
          10. Seguran&ccedil;a
        </h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Adotamos medidas t&eacute;cnicas e organizacionais para proteger dados, como criptografia
          em tr&acirc;nsito (HTTPS), controle de acesso e pol&iacute;ticas de seguran&ccedil;a no banco.
          Ainda assim, nenhum sistema &eacute; 100% imune a incidentes.
        </p>
      </article>

      <article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <h2 class="text-base font-semibold text-slate-900 dark:text-slate-50">
          11. Menores de idade
        </h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          O Speculum Animae n&atilde;o &eacute; destinado a menores de 18 anos. Se voc&ecirc; acreditar
          que um menor forneceu dados pessoais, entre em contato para avaliarmos a remo&ccedil;&atilde;o.
        </p>
      </article>

      <article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <h2 class="text-base font-semibold text-slate-900 dark:text-slate-50">
          12. Atualiza&ccedil;&otilde;es desta pol&iacute;tica
        </h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Podemos atualizar esta pol&iacute;tica periodicamente. Quando houver mudan&ccedil;as
          relevantes, comunicaremos pelos canais oficiais do site.
        </p>
      </article>

      <article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <h2 class="text-base font-semibold text-slate-900 dark:text-slate-50">
          13. Contato
        </h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          D&uacute;vidas ou solicita&ccedil;&otilde;es:
          <a
            href="mailto:contato@speculumanimae.com.br"
            class="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-amber-300 dark:hover:text-amber-200"
          >
            contato@speculumanimae.com.br
          </a>.
        </p>
      </article>
    </div>

    <p class="text-xs text-slate-500 dark:text-slate-400">
      &Uacute;ltima atualiza&ccedil;&atilde;o: 2026-01-13
    </p>
  </section>
</template>

<script setup lang="ts">
import { useSeoMeta } from '#imports';

useSeoMeta({
  title: 'Pol\u00edtica de privacidade',
  description:
    'Explicamos de forma simples como coletamos e utilizamos informa\u00e7\u00f5es ao longo da sua experi\u00eancia.',
});
</script>
