// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config';

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
  ],
  css: ['~/assets/css/tailwind.css'],
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
  runtimeConfig: {
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL,
      supabaseAnonKey:
        process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY ??
        process.env.NUXT_PUBLIC_SUPABASE_KEY ??
        process.env.SUPABASE_KEY,
    },
  },
  app: {
    head: {
      title: 'Speculum Animae',
      meta: [
        {
          name: 'description',
          content:
            'Plataforma de testes de personalidade, temperamento e virtudes.',
        },
      ],
    },
  },
});
