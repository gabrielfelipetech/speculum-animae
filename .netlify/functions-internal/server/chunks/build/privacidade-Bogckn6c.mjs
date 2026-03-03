import { a as useSeoMeta, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import '../_/nitro.mjs';
import '@bugsnag/js';
import '@supabase/ssr';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vue-router';
import 'node:fs';
import 'node:path';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'better-sqlite3';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "privacidade",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Política de privacidade",
      description: "Explicamos de forma simples como coletamos e utilizamos informações ao longo da sua experiência."
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-4xl space-y-6 px-4 py-8" }, _attrs))}><nav class="text-xs text-slate-500 dark:text-slate-400">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "transition hover:text-indigo-600 dark:hover:text-amber-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Home `);
          } else {
            return [
              createTextVNode(" Home ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="px-2">/</span><span>Privacidade</span></nav><header class="space-y-2"><p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400"> Legal </p><h1 class="font-display text-3xl tracking-tight text-slate-900 dark:text-slate-50"> Política de privacidade </h1><p class="text-sm text-slate-600 dark:text-slate-300"> Explicamos de forma simples como coletamos e utilizamos informações ao longo da sua experiência. </p></header><div class="space-y-4"><article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> 1. Quem somos (Controlador e contato) </h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300"> O Speculum Animae é o controlador dos dados tratados nesta plataforma. Para dúvidas sobre privacidade e solicitações relacionadas a dados pessoais, fale com: <a href="mailto:contato@speculumanimae.com.br" class="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-amber-300 dark:hover:text-amber-200"> contato@speculumanimae.com.br </a>. </p></article><article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> 2. Dados que coletamos </h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300"> Podemos coletar: </p><ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300"><li> Dados de conta: nome (quando informado), e-mail, identificadores da conta (ex.: id do usuário). </li><li> Dados de autenticação: informações necessárias para login (tratadas via Supabase). Não armazenamos sua senha em texto. </li><li> Dados de uso e navegação: páginas acessadas, interações e eventos técnicos (ex.: logs de erro). </li><li> Dados técnicos: IP, data/hora de acesso, device/user-agent, identificadores de sessão. </li><li> Preferências: tema (dark/light), idioma, ajustes de UI salvos no localStorage/cookies. </li><li> Resultados de testes: respostas, pontuações e relatórios gerados. Quando você está logado, esses resultados podem ser sincronizados com sua conta. </li><li> Pagamentos (quando aplicável): status de assinatura/compra e identificadores de transação. Dados de cartão são processados pelo Stripe e não ficam armazenados no Speculum Animae. </li></ul></article><article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> 3. Para que usamos os dados (finalidades) </h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300"> Usamos os dados para: </p><ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300"><li>Autenticar sua conta e manter sessões seguras.</li><li>Gerar e exibir resultados dos testes e relatórios.</li><li>Sincronizar histórico na nuvem (quando você está logado).</li><li>Personalizar sua experiência (ex.: tema e preferências).</li><li>Prevenir fraude e abuso (ex.: tentativas de burlar paywall, uso automatizado indevido).</li><li>Melhorar estabilidade e performance (diagnóstico de erros e métricas de uso).</li><li>Processar assinaturas e permitir acesso a conteúdo premium (quando aplicável).</li><li>Comunicar atualizações relevantes do serviço, quando necessário.</li></ul></article><article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> 4. Bases legais (LGPD) </h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300"> Tratamos dados pessoais com base em: </p><ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300"><li> Execução de contrato: para fornecer a plataforma, autenticação e entrega de resultados. </li><li> Legítimo interesse: para segurança, prevenção a abuso e melhoria do serviço. </li><li> Consentimento: quando necessário (ex.: cookies não essenciais, comunicações opcionais). </li><li> Cumprimento de obrigação legal/regulatória: quando aplicável (ex.: retenções exigidas por lei). </li></ul></article><article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> 5. Cookies e localStorage </h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300"> Utilizamos cookies/localStorage principalmente para: </p><ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300"><li>Manter preferências (ex.: tema dark/light).</li><li>Suportar sessão e segurança.</li><li>Melhorar a experiência e reduzir erros.</li></ul><p class="mt-3 text-sm text-slate-600 dark:text-slate-300"> Você pode limpar cookies/localStorage no navegador, mas isso pode resetar preferências e exigir novo login. </p></article><article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> 6. Compartilhamento com terceiros </h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300"> Podemos compartilhar dados com provedores essenciais: </p><ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300"><li>Supabase: autenticação e armazenamento (conta e dados associados).</li><li>Stripe: pagamentos e gerenciamento de assinatura (quando aplicável).</li></ul><p class="mt-3 text-sm text-slate-600 dark:text-slate-300"> Esses provedores tratam dados conforme seus próprios termos e medidas de segurança. </p></article><article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> 7. Transferência internacional </h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300"> Alguns provedores podem processar dados fora do Brasil. Quando isso ocorrer, adotamos medidas para manter a proteção adequada, incluindo contratos e salvaguardas compatíveis com a LGPD. </p></article><article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> 8. Retenção e exclusão </h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300"> Mantemos dados apenas pelo tempo necessário para as finalidades descritas, por exemplo: </p><ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300"><li>Conta e perfil: enquanto sua conta existir.</li><li>Resultados sincronizados: enquanto sua conta existir ou até você solicitar exclusão (quando aplicável).</li><li>Logs e segurança: por período limitado para auditoria e prevenção a abuso.</li></ul><p class="mt-3 text-sm text-slate-600 dark:text-slate-300"> Você pode solicitar exclusão da conta e dos dados associados pelo e-mail <a href="mailto:contato@speculumanimae.com.br" class="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-amber-300 dark:hover:text-amber-200"> contato@speculumanimae.com.br </a>, respeitando limites legais e técnicos (ex.: backups). </p></article><article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> 9. Direitos do titular </h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300"> Você pode solicitar: </p><ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300"><li>Confirmação e acesso aos dados.</li><li>Correção.</li><li>Portabilidade (quando aplicável).</li><li>Anonimização, bloqueio ou eliminação.</li><li>Informação sobre compartilhamento.</li><li>Revogação de consentimento (quando aplicável).</li></ul><p class="mt-3 text-sm text-slate-600 dark:text-slate-300"> Para exercer direitos: <a href="mailto:contato@speculumanimae.com.br" class="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-amber-300 dark:hover:text-amber-200"> contato@speculumanimae.com.br </a>. </p></article><article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> 10. Segurança </h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300"> Adotamos medidas técnicas e organizacionais para proteger dados, como criptografia em trânsito (HTTPS), controle de acesso e políticas de segurança no banco. Ainda assim, nenhum sistema é 100% imune a incidentes. </p></article><article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> 11. Menores de idade </h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300"> O Speculum Animae não é destinado a menores de 18 anos. Se você acreditar que um menor forneceu dados pessoais, entre em contato para avaliarmos a remoção. </p></article><article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> 12. Atualizações desta política </h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300"> Podemos atualizar esta política periodicamente. Quando houver mudanças relevantes, comunicaremos pelos canais oficiais do site. </p></article><article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> 13. Contato </h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300"> Dúvidas ou solicitações: <a href="mailto:contato@speculumanimae.com.br" class="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-amber-300 dark:hover:text-amber-200"> contato@speculumanimae.com.br </a>. </p></article></div><p class="text-xs text-slate-500 dark:text-slate-400"> Última atualização: 2026-01-13 </p></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/privacidade.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=privacidade-Bogckn6c.mjs.map
