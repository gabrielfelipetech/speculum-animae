// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/components/**/*.{vue,js,ts}',
    './src/layouts/**/*.{vue,js,ts}',
    './src/pages/**/*.{vue,js,ts}',
    './src/app.vue',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
        display: ['system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
