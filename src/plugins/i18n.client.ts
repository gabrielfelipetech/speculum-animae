import { watch, type Ref } from 'vue';
import { defineNuxtPlugin, useCookie } from '#imports';

type I18nInstance = {
  locale: Ref<string>;
  availableLocales: string[];
};

const STORAGE_KEY = 'sa_locale';

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = nuxtApp.$i18n as I18nInstance | undefined;
  if (!i18n) return;

  const localeCookie = useCookie<string>(STORAGE_KEY);
  const availableLocales = Array.isArray(i18n.availableLocales)
    ? i18n.availableLocales
    : [];

  if (typeof window !== 'undefined') {
    const storedLocale = window.localStorage.getItem(STORAGE_KEY);
    if (
      storedLocale &&
      availableLocales.includes(storedLocale) &&
      storedLocale !== i18n.locale.value
    ) {
      i18n.locale.value = storedLocale;
    }
  }

  watch(
    i18n.locale,
    (value) => {
      if (!value) return;
      localeCookie.value = value;
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, value);
      }
    },
    { immediate: true },
  );
});
