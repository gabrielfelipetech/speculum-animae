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
  __name: "termos",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Termos de uso",
      description: "Estes termos descrevem as regras básicas para utilizar o Speculum Animae."
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
      _push(`<span class="px-2">/</span><span>Termos</span></nav><header class="space-y-2"><p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400"> Legal </p><h1 class="font-display text-3xl tracking-tight text-slate-900 dark:text-slate-50"> Termos de uso </h1><p class="text-sm text-slate-600 dark:text-slate-300"> Estes termos descrevem as regras básicas para utilizar o Speculum Animae. </p></header><div class="space-y-4"><article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> 1. Aceitação </h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300"> Ao acessar ou utilizar o Speculum Animae, você declara que leu, compreendeu e concorda com estes termos e com a Política de Privacidade. </p></article><article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> 2. Elegibilidade e idade mínima </h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300"> O Speculum Animae é destinado a pessoas com 18 anos ou mais. Ao utilizar a plataforma, você declara cumprir essa condição. </p></article><article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> 3. Uso do serviço </h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300"> Você concorda em usar o serviço de forma responsável, respeitando as leis aplicáveis e evitando qualquer uso indevido da plataforma. </p></article><article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> 4. Conta e segurança </h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300"> Você é responsável por manter suas credenciais em sigilo e por todas as atividades realizadas em sua conta. Caso suspeite de uso não autorizado, altere sua senha e entre em contato. </p></article><article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> 5. Condutas proibidas </h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300"> É proibido: </p><ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300"><li>Tentar burlar restrições de acesso (paywall) ou recursos premium.</li><li>Usar bots, scraping ou automações para coletar conteúdo/dados do site.</li><li>Tentar explorar falhas, realizar engenharia reversa ou comprometer a segurança.</li><li>Publicar ou inserir conteúdo ilegal, ofensivo ou que viole direitos de terceiros.</li></ul></article><article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> 6. Conteúdo, testes e resultados </h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300"> Os testes e resultados são informativos e educacionais. Eles não substituem diagnósticos profissionais, avaliações clínicas ou aconselhamento especializado. Decisões tomadas com base nos resultados são de responsabilidade do usuário. </p></article><article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> 7. Propriedade intelectual </h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300"> O conteúdo do Speculum Animae (textos, testes, marca, layout e materiais) é protegido por direitos autorais e outras leis. Você não pode copiar, redistribuir, revender ou explorar comercialmente sem autorização. </p></article><article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> 8. Planos, pagamentos e cancelamento (quando aplicável) </h2><ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300"><li>Planos pagos podem liberar recursos premium, como relatórios completos e PDFs premium.</li><li>Pagamentos são processados pelo Stripe.</li><li>A assinatura pode renovar automaticamente conforme o plano escolhido.</li><li> Você pode cancelar de forma automática pelo Portal de Assinatura (Stripe) quando disponível no seu painel/área de planos. Após o cancelamento, o acesso premium permanece até o fim do período já pago. </li></ul></article><article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> 9. Reembolsos </h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300"> Como regra, cobranças já processadas não são reembolsáveis, salvo quando exigido por lei ou em casos excepcionais avaliados pelo suporte. </p></article><article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> 10. Disponibilidade e limitações </h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300"> O serviço é fornecido como está e pode passar por indisponibilidades temporárias. Não garantimos disponibilidade ininterrupta. </p></article><article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> 11. Alterações do serviço e destes termos </h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300"> Podemos atualizar funcionalidades e estes termos periodicamente. Mudanças relevantes podem ser comunicadas pelos canais oficiais do site. </p></article><article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> 12. Lei aplicável e foro </h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300"> Estes termos são regidos pelas leis do Brasil. Fica eleito o foro do Rio de Janeiro/RJ para resolver eventuais controvérsias, salvo disposição legal diferente. </p></article><article class="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"><h2 class="text-base font-semibold text-slate-900 dark:text-slate-50"> 13. Contato </h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300"> Em caso de dúvidas, escreva para <a href="mailto:contato@speculumanimae.com.br" class="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-amber-300 dark:hover:text-amber-200"> contato@speculumanimae.com.br </a>. </p></article></div><p class="text-xs text-slate-500 dark:text-slate-400"> Última atualização: 2026-01-13 </p></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/termos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=termos-ASCfCuLG.mjs.map
