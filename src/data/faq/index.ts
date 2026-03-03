import faqData from './faq.json';
import type { FaqData, FaqItem } from '~/types/faq';

type FaqPayload = FaqData;

const payload = faqData as unknown as FaqPayload;

const FAQ_SLUG_ALIASES: Record<string, string> = {
  'twelve-layers': '12-camadas',
  temperaments: 'temperamentos-classicos',
  'temperaments-compatibility': 'temperament-compatibility',
};

export function getGlobalFaq(): FaqItem[] {
  return payload.global.slice();
}

export function getFaqByTestSlug(slug: string): FaqItem[] {
  const direct = payload.byTest[slug];
  if (direct) return direct.slice();

  const alias = FAQ_SLUG_ALIASES[slug];
  if (!alias) return [];
  return payload.byTest[alias]?.slice() ?? [];
}
