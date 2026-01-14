import { defineNuxtPlugin } from '#app';

type RevealBinding = number | { delay?: number; once?: boolean };

type RevealEntry = {
  delay?: number;
  once: boolean;
};

const DEFAULT_ROOT_MARGIN = '0px 0px -10% 0px';
const DEFAULT_THRESHOLD = 0.12;

function resolveBinding(binding: RevealBinding | undefined): RevealEntry {
  if (typeof binding === 'number') {
    return { delay: binding, once: true };
  }
  if (binding && typeof binding === 'object') {
    return {
      delay: binding.delay,
      once: binding.once !== false,
    };
  }
  return { once: true };
}

export default defineNuxtPlugin((nuxtApp) => {
  const observed = new Map<Element, RevealEntry>();
  const hasObserver = typeof IntersectionObserver !== 'undefined';

  const observer = hasObserver
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const target = entry.target;
            if (!(target instanceof HTMLElement)) return;
            const config = observed.get(target);
            if (config?.delay != null && Number.isFinite(config.delay)) {
              const delay = Math.max(0, config.delay);
              target.style.setProperty('--delay', `${delay}ms`);
            }
            target.classList.add('reveal--in');
            if (config?.once ?? true) {
              observer.unobserve(target);
              observed.delete(target);
            }
          });
        },
        {
          rootMargin: DEFAULT_ROOT_MARGIN,
          threshold: DEFAULT_THRESHOLD,
        },
      )
    : null;

  nuxtApp.vueApp.directive('reveal', {
    mounted(el, binding) {
      const config = resolveBinding(binding.value as RevealBinding | undefined);
      observed.set(el, config);
      if (!hasObserver || !observer) {
        if (config.delay != null && Number.isFinite(config.delay)) {
          const delay = Math.max(0, config.delay);
          el.style.setProperty('--delay', `${delay}ms`);
        }
        el.classList.add('reveal--in');
        return;
      }
      observer.observe(el);
    },
    updated(el, binding) {
      const config = resolveBinding(binding.value as RevealBinding | undefined);
      observed.set(el, config);
    },
    beforeUnmount(el) {
      if (observer) {
        observer.unobserve(el);
      }
      observed.delete(el);
    },
  });
});
