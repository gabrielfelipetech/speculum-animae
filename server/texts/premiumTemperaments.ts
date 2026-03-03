import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export type TemperamentId =
  | 'choleric'
  | 'sanguine'
  | 'phlegmatic'
  | 'melancholic';

export type TemperamentPremiumText = {
  temperament: TemperamentId;
  overview: string;
  strengths: string;
  weaknesses: string;
  practices: string;
  career: string;
  relationships: string;
  checklist: string[];
};

type SectionKey =
  | 'overview'
  | 'strengths'
  | 'weaknesses'
  | 'practices'
  | 'career'
  | 'relationships';

type SectionScore = {
  index: number;
  score: number;
};

const TEMPERAMENT_IDS: TemperamentId[] = [
  'choleric',
  'sanguine',
  'phlegmatic',
  'melancholic',
];

const FILE_MATCH_TOKENS: Record<TemperamentId, string> = {
  choleric: 'coler',
  sanguine: 'sanguin',
  phlegmatic: 'fleumat',
  melancholic: 'melancol',
};

export const TEMPERAMENT_LABELS_PT: Record<TemperamentId, string> = {
  choleric: 'Colerico',
  sanguine: 'Sanguineo',
  phlegmatic: 'Fleumatico',
  melancholic: 'Melancolico',
};

export const TEMPERAMENT_FILENAME_SLUGS: Record<TemperamentId, string> = {
  choleric: 'colerico',
  sanguine: 'sanguineo',
  phlegmatic: 'fleumatico',
  melancholic: 'melancolico',
};

const SECTION_KEYWORDS: Record<SectionKey, string[]> = {
  overview: [
    'visao geral',
    'origem',
    'descricao',
    'caracteristicas',
    'temperamento',
  ],
  strengths: [
    'qualidades',
    'virtudes',
    'pontos fortes',
    'forcas',
    'estabilidade',
    'determinacao',
    'autoconfianca',
  ],
  weaknesses: [
    'desafios',
    'defeitos',
    'fraquezas',
    'riscos',
    'pontos de atencao',
    'pode',
    'tendencia',
    'dificuldade',
  ],
  practices: [
    'crescimento',
    'desenvolvimento',
    'disciplina',
    'pratic',
    'aprender',
    'exercicio',
    'autocontrole',
    'melhoria',
  ],
  career: [
    'carreira',
    'trabalho',
    'profissional',
    'lideranca',
    'equipe',
    'produtividade',
    'metas',
  ],
  relationships: [
    'relacionamentos',
    'familia',
    'amizades',
    'afetiv',
    'social',
    'conviv',
    'casamento',
    'vincul',
  ],
};

const INLINE_SOURCE_REGEX =
  /\b(?:https?:\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+(?:\/\S*)?\b/gi;
const COMBINING_MARKS_REGEX = /[\u0300-\u036f]/g;
const MULTI_SPACES_REGEX = /\s{2,}/g;
const LEADING_BULLET_REGEX = /^[*\-•]\s*/;
const GENERIC_SECTION_FALLBACK =
  'Texto premium consolidado a partir do material de referencia deste temperamento, com foco em leitura pratica e aplicacao no dia a dia.';

function normalizeForMatch(value: string): string {
  return value
    .normalize('NFD')
    .replace(COMBINING_MARKS_REGEX, '')
    .toLowerCase();
}

function normalizeSpaces(value: string): string {
  return value.replace(MULTI_SPACES_REGEX, ' ').trim();
}

function stripInlineSources(value: string): string {
  return normalizeSpaces(value.replace(INLINE_SOURCE_REGEX, ' '));
}

function isTemperamentTextFile(fileName: string): boolean {
  const normalized = normalizeForMatch(fileName);
  return normalized.includes('temperamento') && normalized.endsWith('.txt');
}

function isNoiseLine(line: string): boolean {
  const normalized = normalizeForMatch(line);
  if (!normalized) return true;
  if (/^\d+$/.test(normalized)) return true;
  if (
    /^(?:https?:\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+(?:\/\S*)?$/.test(
      normalized,
    )
  ) {
    return true;
  }
  if (
    normalized.startsWith('fontes') ||
    normalized.startsWith('citacoes') ||
    normalized.startsWith('citacoes integradas') ||
    normalized.startsWith('matriz comparativa') ||
    normalized.startsWith('tabela de referencia')
  ) {
    return true;
  }
  return false;
}

function isNoiseParagraph(paragraph: string): boolean {
  const normalized = normalizeForMatch(paragraph);
  return (
    normalized.includes('exemplos historicos') ||
    normalized.includes('personagens historicos') ||
    normalized.includes('citacoes integradas') ||
    normalized.includes('tabela de referencia cruzada') ||
    normalized.startsWith('iv. ') ||
    normalized.startsWith('iii. ') ||
    normalized.startsWith('ii. ')
  );
}

function isHeadingParagraph(paragraph: string): boolean {
  const noPunctuation = !/[.!?]/.test(paragraph);
  return noPunctuation && paragraph.length < 90;
}

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => normalizeSpaces(sentence))
    .filter((sentence) => sentence.length > 30);
}

function sentenceLimit(text: string, maxSentences: number): string {
  const sentences = splitSentences(text);
  if (sentences.length === 0) return normalizeSpaces(text);
  return sentences.slice(0, maxSentences).join(' ');
}

function cleanParagraph(block: string): string {
  const rawLines = block
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .filter((line) => !isNoiseLine(line));

  if (rawLines.length === 0) return '';

  const lines = rawLines.map((line) => line.replace(LEADING_BULLET_REGEX, ''));
  const allBulletLines = rawLines.every((line) => LEADING_BULLET_REGEX.test(line));

  const combined = allBulletLines ? lines.join('. ') : lines.join(' ');
  const withoutSources = stripInlineSources(combined);
  if (!withoutSources) return '';
  return normalizeSpaces(withoutSources);
}

function extractParagraphs(rawText: string): string[] {
  const blocks = rawText.replace(/\r\n/g, '\n').split(/\n\s*\n+/);
  return blocks
    .map(cleanParagraph)
    .filter((paragraph) => paragraph.length > 60)
    .filter((paragraph) => !isHeadingParagraph(paragraph))
    .filter((paragraph) => !isNoiseParagraph(paragraph));
}

function scoreParagraph(paragraph: string, keywords: string[]): number {
  const normalized = normalizeForMatch(paragraph);
  let score = 0;

  for (const keyword of keywords) {
    if (normalized.includes(keyword)) {
      score += 2;
    }
  }

  return score;
}

function selectSectionText(
  paragraphs: string[],
  section: SectionKey,
  usedIndexes: Set<number>,
): string {
  const keywords = SECTION_KEYWORDS[section];
  const scored: SectionScore[] = paragraphs
    .map((paragraph, index) => ({
      index,
      score: scoreParagraph(paragraph, keywords),
    }))
    .filter((item) => !usedIndexes.has(item.index) && item.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index);

  const selectedIndexes: number[] = [];

  for (const item of scored) {
    if (selectedIndexes.length >= 2) break;
    selectedIndexes.push(item.index);
    if (paragraphs[item.index].length > 260) break;
  }

  if (selectedIndexes.length === 0) {
    const fallbackIndex = paragraphs.findIndex(
      (_paragraph, index) => !usedIndexes.has(index),
    );
    if (fallbackIndex >= 0) {
      selectedIndexes.push(fallbackIndex);
    }
  }

  if (selectedIndexes.length === 0) {
    return '';
  }

  for (const index of selectedIndexes) {
    usedIndexes.add(index);
  }

  const combined = selectedIndexes.map((index) => paragraphs[index]).join(' ');
  return sentenceLimit(combined, 6);
}

function firstMeaningfulSentence(text: string): string {
  const sentence = splitSentences(text).find((item) => item.length >= 45);
  if (!sentence) return normalizeSpaces(text);
  return sentence;
}

function buildChecklist(
  data: Omit<TemperamentPremiumText, 'temperament' | 'checklist'>,
): string[] {
  const orderedSources = [
    data.strengths,
    data.weaknesses,
    data.practices,
    data.career,
    data.relationships,
  ];

  const items: string[] = [];
  const seen = new Set<string>();

  for (const source of orderedSources) {
    if (items.length >= 5) break;
    const candidate = firstMeaningfulSentence(source);
    const normalized = normalizeForMatch(candidate);
    if (!candidate || seen.has(normalized)) continue;
    seen.add(normalized);
    items.push(candidate);
  }

  return items;
}

function pickFallbackText(paragraphs: string[], preferredIndexes: number[]): string {
  for (const index of preferredIndexes) {
    const candidate = paragraphs[index];
    if (candidate && candidate.length > 40) {
      return sentenceLimit(candidate, 4);
    }
  }

  const firstAvailable = paragraphs.find((paragraph) => paragraph.length > 40);
  if (firstAvailable) {
    return sentenceLimit(firstAvailable, 4);
  }

  return GENERIC_SECTION_FALLBACK;
}

function resolveAssetsDir(): string {
  return join(process.cwd(), 'src', 'assets', 'texts');
}

function resolveFilePath(temperament: TemperamentId): string {
  const assetsDir = resolveAssetsDir();
  const files = readdirSync(assetsDir).filter(isTemperamentTextFile);
  const token = FILE_MATCH_TOKENS[temperament];

  const fileName = files.find((file) =>
    normalizeForMatch(file).includes(token),
  );

  if (!fileName) {
    throw new Error(
      `Missing premium text file for temperament "${temperament}" in src/assets/texts.`,
    );
  }

  return join(assetsDir, fileName);
}

function buildTemperamentText(temperament: TemperamentId): TemperamentPremiumText {
  const filePath = resolveFilePath(temperament);
  const rawText = readFileSync(filePath, 'utf8');
  const paragraphs = extractParagraphs(rawText);
  const usedIndexes = new Set<number>();

  const overview = selectSectionText(paragraphs, 'overview', usedIndexes);
  const strengths = selectSectionText(paragraphs, 'strengths', usedIndexes);
  const weaknesses = selectSectionText(paragraphs, 'weaknesses', usedIndexes);
  const practices = selectSectionText(paragraphs, 'practices', usedIndexes);
  const career = selectSectionText(paragraphs, 'career', usedIndexes);
  const relationships = selectSectionText(
    paragraphs,
    'relationships',
    usedIndexes,
  );

  const baseText = {
    overview: overview || pickFallbackText(paragraphs, [0, 1]),
    strengths: strengths || pickFallbackText(paragraphs, [1, 0, 2]),
    weaknesses: weaknesses || pickFallbackText(paragraphs, [2, 3, 1]),
    practices: practices || pickFallbackText(paragraphs, [3, 2, 4]),
    career: career || pickFallbackText(paragraphs, [4, 1, 0]),
    relationships: relationships || pickFallbackText(paragraphs, [5, 2, 1]),
  };

  return {
    temperament,
    ...baseText,
    checklist: buildChecklist(baseText),
  };
}

const PREMIUM_TEXT_CACHE: Partial<Record<TemperamentId, TemperamentPremiumText>> =
  {};

export function isTemperamentId(value: string): value is TemperamentId {
  return TEMPERAMENT_IDS.includes(value as TemperamentId);
}

export function getPremiumTemperamentText(
  temperament: TemperamentId,
): TemperamentPremiumText {
  const cached = PREMIUM_TEXT_CACHE[temperament];
  if (cached) {
    return cached;
  }

  const built = buildTemperamentText(temperament);
  PREMIUM_TEXT_CACHE[temperament] = built;
  return built;
}
