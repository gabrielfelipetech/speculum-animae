import Bugsnag from '@bugsnag/js';
import BugsnagPluginVue from '@bugsnag/plugin-vue';
import BugsnagPerformance from '@bugsnag/browser-performance';
import type { Router } from 'vue-router';
import { watch, type Plugin } from 'vue';
import { defineNuxtPlugin, useRuntimeConfig, useSupabaseUser } from '#imports';

type BreadcrumbMetadata = Record<string, unknown>;

function getReleaseStage(value?: string | null): 'development' | 'production' {
  if (value === 'production') return 'production';
  if (value === 'development') return 'development';
  return import.meta.dev ? 'development' : 'production';
}

function getRouter(nuxtApp: { $router?: Router }): Router | null {
  return nuxtApp.$router ?? null;
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const apiKey = config.public.bugsnagApiKey;
  if (!apiKey) return;

  const releaseStage = getReleaseStage(config.public.releaseStage);
  const appVersion = config.public.appVersion ?? 'dev';

  Bugsnag.start({
    apiKey,
    plugins: [new BugsnagPluginVue()],
    releaseStage,
    appVersion,
    enabledReleaseStages: ['development', 'production'],
  });

  BugsnagPerformance.start({ apiKey });

  const vuePlugin = Bugsnag.getPlugin('vue');
  if (vuePlugin) {
    nuxtApp.vueApp.use(vuePlugin as Plugin);
  }

  const router = getRouter(nuxtApp);
  if (router) {
    router.afterEach((to, from) => {
      Bugsnag.leaveBreadcrumb(
        'route-change',
        { to: to.path, from: from.path } satisfies BreadcrumbMetadata,
        'navigation',
      );
    });
  }

  const user = useSupabaseUser();
  watch(
    user,
    (value) => {
      if (!value?.id) {
        Bugsnag.setUser();
        return;
      }

      const metadata = value.user_metadata ?? {};
      const fullName =
        typeof metadata.full_name === 'string'
          ? metadata.full_name
          : typeof metadata.name === 'string'
            ? metadata.name
            : undefined;

      Bugsnag.setUser(value.id, value.email ?? undefined, fullName);
    },
    { immediate: true },
  );

  nuxtApp.provide('bugsnag', Bugsnag);
  nuxtApp.provide('logBreadcrumb', (name: string, metadata?: BreadcrumbMetadata) => {
    Bugsnag.leaveBreadcrumb(name, metadata);
  });

  if (import.meta.dev) {
    const globalTarget = globalThis as typeof globalThis & {
      bugsnagTestNotify?: () => void;
    };
    globalTarget.bugsnagTestNotify = () => {
      Bugsnag.notify(new Error('Bugsnag test error'));
    };
  }
});
