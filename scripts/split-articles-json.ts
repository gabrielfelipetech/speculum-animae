import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

type ArticleRecord = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  coverImage?: string;
  relatedTestSlugs: string[];
  body: unknown;
};

const currentDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(currentDir, '..');
const legacyPath = join(root, 'src', 'data', 'articles', 'articles.json');
const outputDir = join(root, 'src', 'data', 'articles', 'articles');
const manifestPath = join(outputDir, 'index.json');

if (!existsSync(legacyPath)) {
  console.error(`Legacy file not found: ${legacyPath}`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });

const raw = readFileSync(legacyPath, 'utf-8').replace(/^\uFEFF/, '');
const parsed = JSON.parse(raw) as unknown;
const articles = getArticles(parsed);

const manifest = {
  articles: articles.map((article) => {
    const file = `${article.slug}.json`;
    const outputPath = join(outputDir, file);
    const articleJson = JSON.stringify(article, null, 2);
    writeFileSync(outputPath, articleJson, 'utf-8');

    return {
      slug: article.slug,
      title: article.title,
      description: article.description,
      category: article.category,
      tags: article.tags,
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt,
      coverImage: article.coverImage,
      relatedTestSlugs: article.relatedTestSlugs,
      file,
    };
  }),
};

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
console.log(`Wrote manifest: ${manifestPath}`);
console.log(`Wrote ${manifest.articles.length} article files to ${outputDir}`);

function getArticles(value: unknown): ArticleRecord[] {
  if (!isRecord(value)) return [];
  const articlesValue = value.articles;
  if (!Array.isArray(articlesValue)) return [];
  return articlesValue.filter(isArticleRecord);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isArticleRecord(value: unknown): value is ArticleRecord {
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
    'body' in value
  );
}
