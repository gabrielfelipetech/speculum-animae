import faqData from './faq.json';
import type { FaqData, FaqItem } from '~/types/faq';

type FaqPayload = FaqData;

const payload = faqData as unknown as FaqPayload;

export function getGlobalFaq(): FaqItem[] {
  return payload.global.slice();
}

export function getFaqByTestSlug(slug: string): FaqItem[] {
  return payload.byTest[slug]?.slice() ?? [];
}
