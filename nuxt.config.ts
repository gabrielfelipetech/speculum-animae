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
    '@nuxtjs/supabase', // <--- importante
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
    redirect: false, // vamos controlar o redirect no front
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
