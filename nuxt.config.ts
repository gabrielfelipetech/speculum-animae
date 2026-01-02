// nuxt.config.ts
import { readFileSync } from 'node:fs'
import { defineNuxtConfig } from 'nuxt/config'

type ArticleManifest = {
  articles: Array<{ slug: string }>
}

const manifestRaw = readFileSync(
  new URL('./src/data/articles/articles/index.json', import.meta.url),
  'utf-8',
).replace(/^\uFEFF/, '')

const manifest = JSON.parse(manifestRaw) as ArticleManifest
const articleUrls = manifest.articles.map((article) => `/artigos/${article.slug}`)

export default defineNuxtConfig({
  srcDir: 'src/',
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/supabase',
    '@nuxtjs/sitemap',
  ],

  css: ['~/assets/css/tailwind.css'],

  site: {
    url: process.env.NUXT_SITE_URL ?? 'https://speculumanimae.com.br',
    name: 'Speculum Animae',
  },

  runtimeConfig: {
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    public: {
      siteUrl: process.env.NUXT_SITE_URL,

      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL,
      supabaseAnonKey:
        process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY ??
        process.env.NUXT_PUBLIC_SUPABASE_KEY ??
        process.env.SUPABASE_KEY,
    },
  },

  // Evita indexar páginas privadas/sensíveis via header
  routeRules: {
    '/resultados/**': { headers: { 'x-robots-tag': 'noindex, nofollow' } },
    '/testes/historico': { headers: { 'x-robots-tag': 'noindex, nofollow' } },
    '/auth/**': { headers: { 'x-robots-tag': 'noindex, nofollow' } },
    '/api/**': { headers: { 'x-robots-tag': 'noindex, nofollow' } },
  },

  sitemap: {
    includeAppSources: false,
    urls: ['/', '/testes/12-camadas', '/testes/temperamentos-classicos', '/artigos', ...articleUrls],
    exclude: ['/resultados/**', '/testes/historico', '/auth/**', '/api/**'],
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  tailwindcss: {
    viewer: false,
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  supabase: {
    redirect: false,
  },

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Plataforma de testes de personalidade, temperamento e virtudes.',
        },
        { name: 'theme-color', content: '#0f172a' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon-48.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
    },
  },
})
