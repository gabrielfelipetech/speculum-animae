import type { Directive } from 'vue';
import { defineNuxtPlugin } from '#imports';

type RevealBinding = Readonly<{
  delayMs?: number;
  distancePx?: number;
  once?: boolean;
}>;

type RevealDefaults = Readonly<{
  delayMs: number;
  distancePx: number;
  once: boolean;
}>;

const DEFAULTS: RevealDefaults = {
  delayMs: 0,
  distancePx: 12,
  once: true,
};

const observers = new WeakMap<HTMLElement, IntersectionObserver>();

function toOptions(binding: RevealBinding | undefined): RevealDefaults {
  return {
    delayMs: typeof binding?.delayMs === 'number' ? binding.delayMs : DEFAULTS.delayMs,
    distancePx: typeof binding?.distancePx === 'number' ? binding.distancePx : DEFAULTS.distancePx,
    once: typeof binding?.once === 'boolean' ? binding.once : DEFAULTS.once,
  };
}

function applyHiddenState(el: HTMLElement, options: RevealDefaults): void {
  el.style.opacity = '0';
  el.style.transform = `translate3d(0, ${options.distancePx}px, 0)`;
  el.style.willChange = 'opacity, transform';
  el.style.transitionProperty = 'opacity, transform';
  el.style.transitionDuration = '420ms';
  el.style.transitionTimingFunction = 'cubic-bezier(0.22, 1, 0.36, 1)';
  el.style.transitionDelay = `${Math.max(0, options.delayMs)}ms`;
}

function applyVisibleState(el: HTMLElement): void {
  el.style.opacity = '1';
  el.style.transform = 'translate3d(0, 0, 0)';
}

function cleanup(el: HTMLElement): void {
  const obs = observers.get(el);
  if (obs) {
    obs.disconnect();
    observers.delete(el);
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const revealDirective: Directive<HTMLElement, RevealBinding | undefined> = {
    getSSRProps() {
      return {};
    },

    mounted(el, binding) {
      const options = toOptions(binding.value);

      applyHiddenState(el, options);

      if (typeof IntersectionObserver === 'undefined') {
        requestAnimationFrame(() => applyVisibleState(el));
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;

            applyVisibleState(el);

            if (options.once) {
              observer.unobserve(el);
              cleanup(el);
            }
          }
        },
        {
          root: null,
          threshold: 0.12,
          rootMargin: '0px 0px -10% 0px',
        },
      );

      observers.set(el, observer);
      observer.observe(el);
    },

    unmounted(el) {
      cleanup(el);
    },
  };

  nuxtApp.vueApp.directive('reveal', revealDirective);
});
