export type ArticleBodyBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'quote'; text: string; cite?: string };

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  coverImage?: string;
  relatedTestSlugs: string[];
};

export type ArticleManifestEntry = ArticleMeta & {
  file: string;
};

export type ArticleManifest = {
  articles: ArticleManifestEntry[];
};

export type ArticleRecord = ArticleMeta & {
  body: ArticleBodyBlock[];
};

export type Article = ArticleRecord & {
  wordCount: number;
  readingMinutes: number;
};
