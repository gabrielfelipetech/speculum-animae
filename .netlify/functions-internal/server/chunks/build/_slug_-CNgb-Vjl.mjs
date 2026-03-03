import { d as useRoute, i as useRouter, k as useAsyncData, j as createError, l as useRuntimeConfig, a as useSeoMeta, _ as __nuxt_component_0$1, B as BaseButton } from './server.mjs';
import { defineComponent, computed, withAsyncContext, watchEffect, mergeProps, withCtx, createTextVNode, unref, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { d as getArticleBySlug, c as getCategoryLabel, e as getRelatedArticles } from './ArticleCard-5A0TYOxQ.mjs';
import { R as RelatedArticles } from './RelatedArticles-B9sZooMY.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ArticleMetaBar",
  __ssrInlineRender: true,
  props: {
    updatedAt: {},
    readingMinutes: {}
  },
  setup(__props) {
    const props = __props;
    const formattedDate = computed(() => formatDate(props.updatedAt));
    function formatDate(value) {
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return value;
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400" }, _attrs))}><span>Atualizado em ${ssrInterpolate(formattedDate.value)}</span><span aria-hidden="true">-</span><span>${ssrInterpolate(__props.readingMinutes)} min de leitura</span></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/articles/ArticleMetaBar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ArticleMetaBar = Object.assign(_sfc_main$2, { __name: "ArticlesArticleMetaBar" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ArticleProse",
  __ssrInlineRender: true,
  props: {
    blocks: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-5 text-sm leading-relaxed text-slate-700 dark:text-slate-200" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.blocks, (block, index) => {
        _push(`<!--[-->`);
        if (block.type === "h2") {
          _push(`<h2 class="font-display text-2xl text-slate-900 dark:text-slate-50">${ssrInterpolate(block.text)}</h2>`);
        } else if (block.type === "h3") {
          _push(`<h3 class="font-display text-xl text-slate-900 dark:text-slate-50">${ssrInterpolate(block.text)}</h3>`);
        } else if (block.type === "p") {
          _push(`<p>${ssrInterpolate(block.text)}</p>`);
        } else if (block.type === "ul") {
          _push(`<ul class="space-y-2 pl-5"><!--[-->`);
          ssrRenderList(block.items, (item, itemIndex) => {
            _push(`<li class="list-disc">${ssrInterpolate(item)}</li>`);
          });
          _push(`<!--]--></ul>`);
        } else if (block.type === "ol") {
          _push(`<ol class="space-y-2 pl-5"><!--[-->`);
          ssrRenderList(block.items, (item, itemIndex) => {
            _push(`<li class="list-decimal">${ssrInterpolate(item)}</li>`);
          });
          _push(`<!--]--></ol>`);
        } else if (block.type === "quote") {
          _push(`<blockquote class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm italic text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200"><p>${ssrInterpolate(block.text)}</p>`);
          if (block.cite) {
            _push(`<footer class="mt-2 text-xs not-italic text-slate-500 dark:text-slate-400">${ssrInterpolate(block.cite)}</footer>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</blockquote>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/articles/ArticleProse.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ArticleProse = Object.assign(_sfc_main$1, { __name: "ArticlesArticleProse" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const router = useRouter();
    const runtime = useRuntimeConfig();
    const slug = computed(() => String(route.params.slug || ""));
    const articleKey = computed(() => `article-${slug.value}`);
    const { data: article, pending } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      articleKey,
      () => getArticleBySlug(slug.value),
      "$aJUbk0-F40"
    )), __temp = await __temp, __restore(), __temp);
    watchEffect(() => {
      if (!pending.value && !article.value) {
        throw createError({ statusCode: 404, statusMessage: "Artigo nao encontrado" });
      }
    });
    const categoryLabel = computed(
      () => article.value ? getCategoryLabel(article.value.category) : "Categoria"
    );
    const relatedArticles = computed(
      () => article.value ? getRelatedArticles(article.value, 4) : []
    );
    const TEST_LINKS = {
      "temperamentos-classicos": {
        slug: "temperaments",
        title: "Teste de temperamentos classicos",
        href: "/testes/temperaments?fresh=1"
      },
      "12-camadas": {
        slug: "twelve-layers",
        title: "Teste das 12 camadas",
        href: "/testes/twelve-layers?fresh=1"
      }
    };
    const relatedTests = computed(() => {
      if (!article.value) return [];
      return article.value.relatedTestSlugs.map((slugKey) => TEST_LINKS[slugKey]).filter((item) => Boolean(item));
    });
    const siteUrl = String(runtime.public.siteUrl || "https://speculumanimae.com.br").replace(
      /\/$/,
      ""
    );
    useSeoMeta(() => {
      const title = article.value?.title ?? "Artigo nao encontrado";
      const description = article.value?.description ?? "Nao encontramos este artigo no Speculum Animae.";
      const ogImage = article.value?.coverImage ? `${siteUrl}${article.value.coverImage}` : void 0;
      return {
        title,
        description,
        ogTitle: title,
        ogDescription: description,
        ogImage,
        ogType: "article"
      };
    });
    function goToArticles() {
      router.push("/artigos");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-4xl space-y-8 px-4 py-8" }, _attrs))}><nav aria-label="Breadcrumb" class="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "hover:text-indigo-600 dark:hover:text-amber-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Home`);
          } else {
            return [
              createTextVNode("Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span aria-hidden="true">/</span>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/artigos",
        class: "hover:text-indigo-600 dark:hover:text-amber-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Artigos`);
          } else {
            return [
              createTextVNode("Artigos")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span aria-hidden="true">/</span><span>${ssrInterpolate(categoryLabel.value)}</span><span aria-hidden="true">/</span><span class="text-slate-500 dark:text-slate-300">${ssrInterpolate(unref(article)?.title ?? "Artigo")}</span></nav>`);
      if (!unref(article)) {
        _push(`<div class="space-y-3"><h1 class="font-display text-2xl tracking-tight">Artigo nao encontrado</h1><p class="text-sm text-slate-600 dark:text-slate-300"> Nao encontramos este artigo. Verifique o link ou volte para a lista de artigos. </p>`);
        _push(ssrRenderComponent(BaseButton, {
          type: "button",
          onClick: goToArticles
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Voltar para artigos`);
            } else {
              return [
                createTextVNode("Voltar para artigos")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<article class="space-y-6"><header class="space-y-3"><p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">${ssrInterpolate(categoryLabel.value)}</p><h1 class="font-display text-3xl tracking-tight md:text-4xl">${ssrInterpolate(unref(article).title)}</h1><p class="text-sm text-slate-600 dark:text-slate-300">${ssrInterpolate(unref(article).description)}</p>`);
        _push(ssrRenderComponent(ArticleMetaBar, {
          "updated-at": unref(article).updatedAt,
          "reading-minutes": unref(article).readingMinutes
        }, null, _parent));
        _push(`</header>`);
        if (unref(article).coverImage) {
          _push(`<img${ssrRenderAttr("src", unref(article).coverImage)}${ssrRenderAttr("alt", unref(article).title)} class="w-full rounded-2xl border border-slate-200 object-cover shadow-sm dark:border-slate-800">`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(ArticleProse, {
          blocks: unref(article).body
        }, null, _parent));
        _push(`</article>`);
      }
      if (relatedTests.value.length) {
        _push(`<section class="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-6 shadow-sm dark:border-amber-300/30 dark:bg-amber-300/10"><h2 class="font-display text-xl text-slate-900 dark:text-slate-50">Ir para o teste relacionado</h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300"> Continue sua jornada aplicando o que leu em um teste pratico. </p><div class="mt-4 flex flex-wrap gap-3"><!--[-->`);
        ssrRenderList(relatedTests.value, (test) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: test.slug,
            to: test.href,
            class: "rounded-full border border-indigo-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700 transition hover:border-indigo-300 hover:shadow-sm dark:border-amber-300/40 dark:bg-slate-950 dark:text-amber-200"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(test.title)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(test.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div></section>`);
      } else {
        _push(`<!---->`);
      }
      if (relatedArticles.value.length) {
        _push(ssrRenderComponent(RelatedArticles, {
          title: "Artigos relacionados",
          articles: relatedArticles.value,
          description: "Leituras que aprofundam temas semelhantes."
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/artigos/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-CNgb-Vjl.mjs.map
