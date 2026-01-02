export type FaqItem = {
  q: string;
  a: string;
};

export type FaqData = {
  global: FaqItem[];
  byTest: Record<string, FaqItem[]>;
};
