import manifestData from './articles/index.json';
import type {
  Article,
  ArticleBodyBlock,
  ArticleManifest,
  ArticleManifestEntry,
  ArticleMeta,
  ArticleRecord,
} from '~/types/articles';

const manifest = parseManifest(manifestData as unknown);
const manifestEntries = manifest.articles;
const articleMeta = manifestEntries.map(({ file, ...meta }) => meta);

const sortedArticles = [...articleMeta].sort(
  (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
);

const articleLoaders = import.meta.glob('./articles/*.json', { import: 'default' });
const entryBySlug = new Map(manifestEntries.map((entry) => [entry.slug, entry]));

const CATEGORY_LABELS: Record<string, string> = {
  temperamentos: 'Temperamentos',
  personalidade: 'Personalidade',
  'virtudes-habitos': 'Virtudes e habitos',
  relacionamentos: 'Relacionamentos',
};

export function getAllArticles(): ArticleMeta[] {
  return sortedArticles;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const entry = entryBySlug.get(slug);
  if (!entry) return null;

  const modulePath = `./articles/${entry.file}`;
  const loader = articleLoaders[modulePath];
  if (!loader) {
    throw new Error(`Article file not found: ${entry.file}`);
  }

  const loaded = await loader();
  const record = parseArticleRecord(loaded);
  const wordCount = countWords(extractBodyText(record.body));
  const readingMinutes = Math.max(1, Math.ceil(wordCount / 200));

  return {
    ...record,
    wordCount,
    readingMinutes,
  };
}

export function getArticleCategories(): string[] {
  return Array.from(new Set(sortedArticles.map((article) => article.category))).sort();
}

export function getArticleTags(): string[] {
  const allTags = sortedArticles.flatMap((article) => article.tags);
  return Array.from(new Set(allTags)).sort();
}

export function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category;
}

export function getRelatedArticles(article: ArticleMeta, limit = 3): ArticleMeta[] {
  const tagSet = new Set(article.tags);
  const scored = sortedArticles
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => {
      const tagScore = candidate.tags.reduce(
        (total, tag) => total + (tagSet.has(tag) ? 1 : 0),
        0,
      );
      const categoryScore = candidate.category === article.category ? 2 : 0;
      return {
        article: candidate,
        score: tagScore + categoryScore,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.article.updatedAt).getTime() - new Date(a.article.updatedAt).getTime();
    })
    .slice(0, limit)
    .map((item) => item.article);

  return scored;
}

function parseManifest(value: unknown): ArticleManifest {
  if (!isArticleManifest(value)) {
    throw new Error('Invalid articles manifest format.');
  }
  return value;
}

function parseArticleRecord(value: unknown): ArticleRecord {
  if (!isArticleRecord(value)) {
    throw new Error('Invalid article record format.');
  }
  return value;
}

function isArticleManifest(value: unknown): value is ArticleManifest {
  if (!isRecord(value)) return false;
  return Array.isArray(value.articles) && value.articles.every(isArticleManifestEntry);
}

function isArticleManifestEntry(value: unknown): value is ArticleManifestEntry {
  if (!isArticleMeta(value)) return false;
  return typeof value.file === 'string';
}

function isArticleRecord(value: unknown): value is ArticleRecord {
  if (!isArticleMeta(value)) return false;
  return Array.isArray(value.body) && value.body.every(isArticleBodyBlock);
}

function isArticleMeta(value: unknown): value is ArticleMeta {
  if (!isRecord(value)) return false;
  return (
    typeof value.slug === 'string' &&
    typeof value.title === 'string' &&
    typeof value.description === 'string' &&
    typeof value.category === 'string' &&
    Array.isArray(value.tags) &&
    value.tags.every((tag) => typeof tag === 'string') &&
    typeof value.publishedAt === 'string' &&
    typeof value.updatedAt === 'string' &&
    Array.isArray(value.relatedTestSlugs) &&
    value.relatedTestSlugs.every((slug) => typeof slug === 'string') &&
    (value.coverImage === undefined || typeof value.coverImage === 'string')
  );
}

function isArticleBodyBlock(value: unknown): value is ArticleBodyBlock {
  if (!isRecord(value)) return false;
  const type = value.type;
  if (typeof type !== 'string') return false;

  switch (type) {
    case 'p':
    case 'h2':
    case 'h3':
      return typeof value.text === 'string';
    case 'quote':
      return (
        typeof value.text === 'string' &&
        (value.cite === undefined || typeof value.cite === 'string')
      );
    case 'ul':
    case 'ol':
      return Array.isArray(value.items) && value.items.every((item) => typeof item === 'string');
    default:
      return false;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function extractBodyText(blocks: ArticleBodyBlock[]): string {
  return blocks.map((block) => blockToText(block)).join(' ');
}

function blockToText(block: ArticleBodyBlock): string {
  switch (block.type) {
    case 'p':
    case 'h2':
    case 'h3':
      return block.text;
    case 'quote':
      return block.cite ? `${block.text} ${block.cite}` : block.text;
    case 'ul':
    case 'ol':
      return block.items.join(' ');
    default:
      return '';
  }
}

function countWords(text: string): number {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (!normalized) return 0;
  return normalized.split(' ').length;
}
