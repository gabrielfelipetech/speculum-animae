import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { A as ArticleCard } from './ArticleCard-5A0TYOxQ.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RelatedArticles",
  __ssrInlineRender: true,
  props: {
    title: {},
    articles: {},
    description: {},
    kicker: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.articles.length) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><header class="space-y-2">`);
        if (__props.kicker) {
          _push(`<p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">${ssrInterpolate(__props.kicker)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<h2 class="font-display text-2xl tracking-tight text-slate-900 dark:text-slate-50">${ssrInterpolate(__props.title)}</h2>`);
        if (__props.description) {
          _push(`<p class="text-sm text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.description)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</header><div class="grid gap-4 md:grid-cols-2"><!--[-->`);
        ssrRenderList(__props.articles, (article) => {
          _push(ssrRenderComponent(ArticleCard, {
            key: article.slug,
            article
          }, null, _parent));
        });
        _push(`<!--]--></div></section>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/articles/RelatedArticles.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RelatedArticles = Object.assign(_sfc_main, { __name: "ArticlesRelatedArticles" });

export { RelatedArticles as R };
//# sourceMappingURL=RelatedArticles-B9sZooMY.mjs.map
