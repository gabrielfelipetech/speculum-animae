import { defineComponent, ref, computed, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { g as getArticleCategories, a as getArticleTags, b as getAllArticles, A as ArticleCard, c as getCategoryLabel } from './ArticleCard-5A0TYOxQ.mjs';
import { u as useI18n, a as useSeoMeta } from './server.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ArticlesFilters",
  __ssrInlineRender: true,
  props: {
    search: {},
    category: {},
    tag: {},
    categories: {},
    tags: {}
  },
  emits: ["update:search", "update:category", "update:tag"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4 rounded-2xl border border-slate-200 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-900/80" }, _attrs))}><div class="grid gap-3 md:grid-cols-[1.4fr_0.6fr]"><label class="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400"> Buscar <input${ssrRenderAttr("value", __props.search)} type="search" placeholder="Buscar por titulo, descricao ou tag" class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-amber-300 dark:focus:ring-amber-300/30"></label><label class="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400"> Categoria <select${ssrRenderAttr("value", __props.category)} class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-amber-300 dark:focus:ring-amber-300/30"><option value="all">Todas</option><!--[-->`);
      ssrRenderList(__props.categories, (value) => {
        _push(`<option${ssrRenderAttr("value", value)}>${ssrInterpolate(unref(getCategoryLabel)(value))}</option>`);
      });
      _push(`<!--]--></select></label></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/articles/ArticlesFilters.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ArticlesFilters = Object.assign(_sfc_main$1, { __name: "ArticlesFilters" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useSeoMeta(() => ({
      title: t("articlesIndex.title"),
      description: t("articlesIndex.description")
    }));
    const allArticles = getAllArticles();
    const categories = getArticleCategories();
    const allTags = getArticleTags();
    const search = ref("");
    const selectedCategory = ref("all");
    const selectedTag = ref(null);
    const visibleTags = computed(() => {
      if (selectedCategory.value === "all") return allTags;
      const categoryArticles = allArticles.filter(
        (article) => article.category === selectedCategory.value
      );
      return Array.from(new Set(categoryArticles.flatMap((article) => article.tags))).sort();
    });
    watch([selectedCategory, visibleTags], () => {
      if (selectedTag.value && !visibleTags.value.includes(selectedTag.value)) {
        selectedTag.value = null;
      }
    });
    const filteredArticles = computed(() => {
      const query = search.value.trim().toLowerCase();
      return allArticles.filter((article) => {
        const matchesQuery = !query || article.title.toLowerCase().includes(query) || article.description.toLowerCase().includes(query) || article.tags.some((tag) => tag.toLowerCase().includes(query));
        const matchesCategory = selectedCategory.value === "all" || article.category === selectedCategory.value;
        const matchesTag = !selectedTag.value || article.tags.includes(selectedTag.value);
        return matchesQuery && matchesCategory && matchesTag;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-5xl space-y-8 px-4 py-8" }, _attrs))}><header class="space-y-3"><p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">${ssrInterpolate(unref(t)("articlesIndex.kicker"))}</p><h1 class="font-display text-3xl tracking-tight md:text-4xl">${ssrInterpolate(unref(t)("articlesIndex.title"))}</h1><p class="max-w-2xl text-sm text-slate-600 dark:text-slate-300">${ssrInterpolate(unref(t)("articlesIndex.description"))}</p></header>`);
      _push(ssrRenderComponent(ArticlesFilters, {
        search: search.value,
        category: selectedCategory.value,
        tag: selectedTag.value,
        categories: unref(categories),
        tags: visibleTags.value,
        "onUpdate:search": (value) => search.value = value,
        "onUpdate:category": (value) => selectedCategory.value = value,
        "onUpdate:tag": (value) => selectedTag.value = value
      }, null, _parent));
      if (filteredArticles.value.length) {
        _push(`<div class="grid gap-4 md:grid-cols-2"><!--[-->`);
        ssrRenderList(filteredArticles.value, (article) => {
          _push(ssrRenderComponent(ArticleCard, {
            key: article.slug,
            article
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="rounded-2xl border border-dashed border-slate-200 bg-white/80 p-6 text-center dark:border-slate-800 dark:bg-slate-900/60"><p class="text-sm text-slate-600 dark:text-slate-300">${ssrInterpolate(unref(t)("articlesIndex.emptyState"))}</p></div>`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/artigos/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BJ6ZA6XS.mjs.map
