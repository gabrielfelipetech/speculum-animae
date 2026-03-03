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
const isNetlifyBuild = process.env.NETLIFY === 'true'

export default defineNuxtConfig({
  srcDir: 'src/',
  compatibilityDate: '2026-01-14',
  nitro: {
    ...(isNetlifyBuild ? { preset: 'netlify' } : {}),
    serverAssets: [
      {
        dir: './src/assets/texts',
        baseName: 'assets/texts',
        pattern: '**/*.txt',
      },
    ],
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxtjs/supabase',
    '@nuxtjs/sitemap',
  ],

  css: ['~/assets/css/tailwind.css', '~/assets/css/motion.css'],

  site: {
    url: process.env.NUXT_SITE_URL ?? 'https://speculumanimae.com.br',
    name: 'Speculum Animae',
  },

  runtimeConfig: {
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    public: {
      siteUrl: process.env.NUXT_SITE_URL,
      stripePublicKey: process.env.NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      bugsnagApiKey: process.env.NUXT_PUBLIC_BUGSNAG_API_KEY,
      appVersion: process.env.NUXT_PUBLIC_APP_VERSION ?? 'dev',
      releaseStage: process.env.NUXT_PUBLIC_RELEASE_STAGE,

      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL,
      supabaseAnonKey:
        process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY ??
        process.env.NUXT_PUBLIC_SUPABASE_KEY ??
        process.env.SUPABASE_KEY,
    },
  },

  // Evita indexar paginas privadas/sensiveis via header
  routeRules: {
    '/resultados/**': { headers: { 'x-robots-tag': 'noindex, nofollow' } },
    '/testes/historico': { headers: { 'x-robots-tag': 'noindex, nofollow' } },
    '/auth/**': { headers: { 'x-robots-tag': 'noindex, nofollow' } },
    '/api/**': { headers: { 'x-robots-tag': 'noindex, nofollow' } },
  },

  sitemap: {
    includeAppSources: false,
    urls: [
      '/',
      '/testes/twelve-layers',
      '/testes/temperaments',
      '/testes/temperaments-compatibility',
      '/artigos',
      '/planos',
      ...articleUrls,
    ],
    exclude: ['/resultados/**', '/testes/historico', '/auth/**', '/api/**'],
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  tailwindcss: {
    viewer: false,
  },

  i18n: {
    restructureDir: 'src',
    defaultLocale: 'pt-BR',
    strategy: 'no_prefix',
    langDir: 'locales',
    locales: [
      { code: 'pt-BR', iso: 'pt-BR', name: 'Portuguese', file: 'pt-BR.json' },
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
      { code: 'es', iso: 'es-ES', name: 'Spanish', file: 'es.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'sa_locale',
      redirectOn: 'root',
      fallbackLocale: 'pt-BR',
    },
    vueI18n: './i18n.config.ts',
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
