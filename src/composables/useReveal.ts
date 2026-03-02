import { onUnmounted } from 'vue';

type RevealOptions = {
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
};

type RevealRegisterOptions = {
  once?: boolean;
};

const DEFAULT_OPTIONS: Required<Pick<RevealOptions, 'rootMargin' | 'threshold' | 'once'>> = {
  rootMargin: '0px 0px -10% 0px',
  threshold: 0.12,
  once: true,
};

function isHTMLElement(value: Element | null): value is HTMLElement {
  return value instanceof HTMLElement;
}

function applyReveal(el: HTMLElement, delayMs?: number): void {
  if (typeof delayMs === 'number' && Number.isFinite(delayMs)) {
    const safeDelay = Math.max(0, delayMs);
    el.style.setProperty('--delay', `${safeDelay}ms`);
  }
  el.classList.add('reveal--in');
}

export function useReveal(options: RevealOptions = {}) {
  if (import.meta.server) {
    return {
      register: () => {},
      revealNow: () => {},
    };
  }

  function revealNow(el: Element | null, delayMs?: number): void {
    if (!isHTMLElement(el)) return;
    applyReveal(el, delayMs);
  }

  if (typeof IntersectionObserver === 'undefined') {
    return {
      register: (el: Element | null, delayMs?: number) => revealNow(el, delayMs),
      revealNow,
    };
  }

  const settings = { ...DEFAULT_OPTIONS, ...options };
  const observed = new Map<Element, { delay?: number; once: boolean }>();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target;
        if (!isHTMLElement(target)) return;
        const config = observed.get(target);
        applyReveal(target, config?.delay);
        if (config?.once ?? settings.once) {
          observer.unobserve(target);
          observed.delete(target);
        }
      });
    },
    {
      rootMargin: settings.rootMargin,
      threshold: settings.threshold,
    },
  );

  function register(el: Element | null, delayMs?: number, opts?: RevealRegisterOptions): void {
    if (!isHTMLElement(el)) return;
    const once = typeof opts?.once === 'boolean' ? opts.once : settings.once;
    observed.set(el, { delay: delayMs, once });
    observer.observe(el);
  }

  onUnmounted(() => {
    observer.disconnect();
    observed.clear();
  });

  return {
    register,
    revealNow,
  };
}
