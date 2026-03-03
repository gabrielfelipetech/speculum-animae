import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
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
  risks: string;
  practices: string;
  work: string;
  relationships: string;
  checklist: string[];
  // Legacy aliases used by existing report builders.
  weaknesses: string;
  career: string;
};

type SectionKey =
  | 'overview'
  | 'strengths'
  | 'risks'
  | 'practices'
  | 'work'
  | 'relationships';

type ParagraphEntry = {
  index: number;
  text: string;
  normalized: string;
  heading: SectionKey | null;
};

type ScoredParagraph = {
  entry: ParagraphEntry;
  score: number;
};

type SectionLayout = {
  minSentences: number;
  maxSentences: number;
  maxParagraphs: number;
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
    'personalidade',
    'perfil',
    'conceito',
  ],
  strengths: [
    'qualidades',
    'virtudes',
    'pontos fortes',
    'forcas',
    'forca',
    'forte',
    'talento',
    'habilidade',
    'capacidade',
    'potencial',
  ],
  risks: [
    'desafios',
    'defeitos',
    'fraquezas',
    'riscos',
    'pontos de atencao',
    'tendencia',
    'dificuldade',
    'procrastin',
    'inconst',
    'impuls',
    'vulner',
    'medo',
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
    'rotina',
    'proximos passos',
  ],
  work: [
    'carreira',
    'trabalho',
    'profissional',
    'lideranca',
    'equipe',
    'produtividade',
    'metas',
    'ambiente',
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

const HEADING_KEYWORDS: Record<SectionKey, string[]> = {
  overview: [
    'visao geral',
    'descricao completa',
    'origem e conceito',
    'caracteristicas',
    'tracos de personalidade',
    'perfil',
  ],
  strengths: ['forcas', 'forca', 'virtudes', 'qualidades', 'pontos fortes'],
  risks: ['riscos', 'fraquezas', 'defeitos', 'desafios', 'pontos de atencao'],
  practices: [
    'crescimento pessoal',
    'crescimento',
    'praticas',
    'desenvolvimento',
    'proximos passos',
  ],
  work: ['carreira', 'trabalho', 'na carreira', 'ambiente profissional'],
  relationships: ['relacionamentos', 'nos relacionamentos', 'vinculos', 'familia'],
};

const SECTION_LAYOUT: Record<SectionKey, SectionLayout> = {
  overview: { minSentences: 12, maxSentences: 20, maxParagraphs: 3 },
  strengths: { minSentences: 10, maxSentences: 18, maxParagraphs: 3 },
  risks: { minSentences: 10, maxSentences: 18, maxParagraphs: 3 },
  practices: { minSentences: 10, maxSentences: 18, maxParagraphs: 3 },
  work: { minSentences: 10, maxSentences: 18, maxParagraphs: 3 },
  relationships: { minSentences: 10, maxSentences: 18, maxParagraphs: 3 },
};

const POSITIVE_SIGNAL_KEYWORDS = [
  'virtude',
  'qualidade',
  'forca',
  'forte',
  'talento',
  'habilidade',
  'excelente',
  'potencial',
  'capacidade',
];

const RISK_SIGNAL_KEYWORDS = [
  'risco',
  'fraqueza',
  'defeito',
  'desafio',
  'vulner',
  'perigo',
  'dificuldade',
  'procrastin',
  'inconst',
  'impuls',
  'medo',
];

const INLINE_SOURCE_REGEX =
  /\b(?:https?:\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+(?:\/\S*)?\b/gi;
const HASH_UNICODE_PATTERN = /#u([0-9a-f]{4})/gi;
const COMBINING_MARKS_REGEX = /[\u0300-\u036f]/g;
const MULTI_SPACES_REGEX = /\s{2,}/g;
const DOMAIN_ONLY_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+(?:\/\S*)?$/;
const LEADING_BULLET_REGEX = /^[*\-\u2022]\s*/;
const SHORT_HEADING_MAX_CHARS = 90;
const SHORT_HEADING_MAX_WORDS = 12;
const TEMPERAMENT_TOKEN_PATTERN = '(coler|sanguin|melancol|fleumat|flegmat)';
const GENERIC_SECTION_FALLBACK =
  'Texto premium consolidado a partir do material de referencia deste temperamento, com foco em leitura pratica e aplicacao no dia a dia.';
const COMBINATION_SECTION_MARKERS = [
  'perfis combinados',
  'combinacoes do temperamento',
  'combinacoes classicas',
  'analise detalhada das variacoes',
  'matriz comparativa',
  'blends',
];
const PREMIUM_TEXTS_DIR_ENV_KEY = 'SA_PREMIUM_TEXTS_DIR';

export function normalizeForMatch(value: string): string {
  const decodedHashUnicode = value.replace(HASH_UNICODE_PATTERN, (_, hex: string) =>
    String.fromCharCode(Number.parseInt(hex, 16)),
  );

  return decodedHashUnicode
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
  if (DOMAIN_ONLY_REGEX.test(normalized)) return true;

  if (
    normalized.startsWith('fontes') ||
    normalized.startsWith('fonte') ||
    normalized.startsWith('referencias') ||
    normalized.startsWith('referencia') ||
    normalized.startsWith('bibliografia') ||
    normalized.startsWith('citacoes') ||
    normalized.startsWith('citacoes integradas') ||
    normalized.startsWith('matriz comparativa') ||
    normalized.startsWith('tabela de referencia') ||
    normalized === 'gemini'
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
    normalized.startsWith('ii. ') ||
    normalized === 'gemini'
  );
}

function isHeadingLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (isNoiseLine(trimmed)) return false;
  if (trimmed.length > SHORT_HEADING_MAX_CHARS) return false;
  if (/[.!?]/.test(trimmed)) return false;

  const normalized = normalizeForMatch(trimmed);
  const words = normalized.split(/\s+/).filter(Boolean);
  if (words.length === 0 || words.length > SHORT_HEADING_MAX_WORDS) return false;
  if (!/^[A-Za-z0-9]/.test(trimmed)) return false;

  for (const keywords of Object.values(HEADING_KEYWORDS)) {
    if (keywords.some((keyword) => normalized.includes(keyword))) {
      return true;
    }
  }

  return /^[A-Z0-9]/.test(trimmed);
}

function resolveHeadingSection(line: string): SectionKey | null {
  const normalized = normalizeForMatch(line);

  for (const section of Object.keys(HEADING_KEYWORDS) as SectionKey[]) {
    if (HEADING_KEYWORDS[section].some((keyword) => normalized.includes(keyword))) {
      return section;
    }
  }

  return null;
}

function temperamentTokenMatches(value: string): number {
  const regex = new RegExp(TEMPERAMENT_TOKEN_PATTERN, 'g');
  const matches = value.match(regex);
  return matches ? matches.length : 0;
}

function isPairHeadingLine(line: string, normalized: string): boolean {
  const canonical = normalized.replace(/–|â€“/g, '-');

  if (!canonical.includes('-')) {
    return false;
  }

  if (line.length > 120) {
    return false;
  }

  const compactPairCodeRegex =
    /\b(?:col|san|mel|fle)\s*-\s*(?:col|san|mel|fle)\b/i;

  if (compactPairCodeRegex.test(canonical)) {
    return true;
  }

  const words = canonical.split(/\s+/).filter(Boolean);
  return words.length <= 8 && temperamentTokenMatches(canonical) >= 2;
}

function isCombinationTransitionLine(line: string): boolean {
  const normalized = normalizeForMatch(line);
  const canonical = normalized.replace(/–|â€“/g, '-');

  if (
    COMBINATION_SECTION_MARKERS.some((marker) => canonical.includes(marker))
  ) {
    return true;
  }

  if (
    canonical.startsWith('temperamento') &&
    canonical.includes('combinac') &&
    canonical.length <= 120
  ) {
    return true;
  }

  return isPairHeadingLine(line, canonical);
}

function isCombinationSentence(text: string): boolean {
  const normalized = normalizeForMatch(text);

  if (normalized.includes('-') && temperamentTokenMatches(normalized) >= 2) {
    return true;
  }

  if (normalized.includes('combinac') && temperamentTokenMatches(normalized) >= 2) {
    return true;
  }

  return false;
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

function stripCombinationSentences(text: string): string {
  const sentences = splitSentences(text);
  if (sentences.length === 0) return normalizeSpaces(text);

  const filtered = sentences.filter((sentence) => !isCombinationSentence(sentence));
  if (filtered.length === 0) {
    return normalizeSpaces(sentences[0] ?? text);
  }

  return normalizeSpaces(filtered.join(' '));
}

function countKeywordMatches(haystack: string, keywords: string[]): number {
  let matches = 0;
  for (const keyword of keywords) {
    if (haystack.includes(keyword)) {
      matches += 1;
    }
  }
  return matches;
}

function scoreParagraphForSection(
  paragraph: ParagraphEntry,
  section: SectionKey,
): number {
  let score = 0;

  if (paragraph.heading === section) {
    score += 8;
  }

  const sectionKeywordMatches = countKeywordMatches(
    paragraph.normalized,
    SECTION_KEYWORDS[section],
  );
  score += sectionKeywordMatches * 2;

  if (section === 'strengths') {
    score += countKeywordMatches(paragraph.normalized, POSITIVE_SIGNAL_KEYWORDS) * 2;
    score -= countKeywordMatches(paragraph.normalized, RISK_SIGNAL_KEYWORDS);
  }

  if (section === 'risks') {
    score += countKeywordMatches(paragraph.normalized, RISK_SIGNAL_KEYWORDS) * 2;
    score -= countKeywordMatches(paragraph.normalized, POSITIVE_SIGNAL_KEYWORDS);
  }

  return score;
}

function cleanParagraphLines(lines: string[]): string {
  if (lines.length === 0) return '';

  const stripped = lines
    .map((line) => line.replace(LEADING_BULLET_REGEX, '').trim())
    .filter((line) => line.length > 0)
    .filter((line) => !isNoiseLine(line));

  if (stripped.length === 0) return '';

  const combined = stripped.join(' ');
  const withoutSources = stripInlineSources(combined);
  return normalizeSpaces(withoutSources);
}

function extractParagraphEntries(rawText: string): ParagraphEntry[] {
  const lines = rawText.replace(/\r\n/g, '\n').split('\n');
  const entries: ParagraphEntry[] = [];
  const paragraphBuffer: string[] = [];
  let activeHeading: SectionKey | null = null;
  let reachedCombinationSection = false;

  const flushParagraph = () => {
    const cleaned = cleanParagraphLines(paragraphBuffer);
    paragraphBuffer.length = 0;

    if (!cleaned || cleaned.length < 80 || isNoiseParagraph(cleaned)) {
      return;
    }

    entries.push({
      index: entries.length,
      text: cleaned,
      normalized: normalizeForMatch(cleaned),
      heading: activeHeading,
    });
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (reachedCombinationSection) {
      break;
    }

    if (!line) {
      flushParagraph();
      continue;
    }

    if (isNoiseLine(line)) {
      continue;
    }

    if (isCombinationTransitionLine(line)) {
      flushParagraph();
      // Some source files mention "combinations" in the title itself.
      // Stop only after collecting enough base temperament paragraphs.
      if (entries.length >= 8) {
        reachedCombinationSection = true;
      }
      continue;
    }

    if (isHeadingLine(line)) {
      flushParagraph();
      activeHeading = resolveHeadingSection(line);
      continue;
    }

    paragraphBuffer.push(line);
  }

  flushParagraph();
  return entries;
}

function selectSectionText(
  paragraphs: ParagraphEntry[],
  section: SectionKey,
  usedIndexes: Set<number>,
): string {
  const layout = SECTION_LAYOUT[section];
  const scored: ScoredParagraph[] = paragraphs
    .filter((paragraph) => !usedIndexes.has(paragraph.index))
    .map((paragraph) => ({
      entry: paragraph,
      score: scoreParagraphForSection(paragraph, section),
    }))
    .sort((a, b) => b.score - a.score || a.entry.index - b.entry.index);

  const selected: ParagraphEntry[] = [];
  let selectedSentences = 0;

  const pushParagraph = (paragraph: ParagraphEntry): boolean => {
    if (selected.some((entry) => entry.normalized === paragraph.normalized)) {
      return false;
    }

    selected.push(paragraph);
    usedIndexes.add(paragraph.index);
    selectedSentences += splitSentences(paragraph.text).length || 1;
    return true;
  };

  for (const candidate of scored) {
    if (selected.length >= layout.maxParagraphs) break;
    if (candidate.score <= 0 && selectedSentences >= layout.minSentences) break;
    pushParagraph(candidate.entry);
    if (selectedSentences >= layout.minSentences) break;
  }

  if (selectedSentences < layout.minSentences) {
    const fallbackParagraphs = paragraphs
      .filter((paragraph) => !usedIndexes.has(paragraph.index))
      .sort((a, b) => a.index - b.index);

    for (const paragraph of fallbackParagraphs) {
      if (selected.length >= layout.maxParagraphs) break;
      pushParagraph(paragraph);
      if (selectedSentences >= layout.minSentences) break;
    }
  }

  if (selected.length === 0) {
    return '';
  }

  const combined = selected.map((paragraph) => paragraph.text).join('\n\n');
  return sentenceLimit(combined, layout.maxSentences);
}

function firstMeaningfulSentence(text: string): string {
  const sentence = splitSentences(text).find((item) => item.length >= 45);
  if (!sentence) return normalizeSpaces(text);
  return sentence;
}

function buildChecklist(
  data: {
    overview: string;
    strengths: string;
    risks: string;
    practices: string;
    work: string;
    relationships: string;
  },
): string[] {
  const orderedSources = [
    data.strengths,
    data.risks,
    data.practices,
    data.work,
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

function pickFallbackText(
  paragraphs: ParagraphEntry[],
  preferredIndexes: number[],
): string {
  for (const index of preferredIndexes) {
    const candidate = paragraphs[index]?.text;
    if (candidate && candidate.length > 40) {
      return sentenceLimit(candidate, 4);
    }
  }

  const firstAvailable = paragraphs.find((paragraph) => paragraph.text.length > 40);
  if (firstAvailable) {
    return sentenceLimit(firstAvailable.text, 4);
  }

  return GENERIC_SECTION_FALLBACK;
}

function resolveAssetDirCandidates(): string[] {
  const envPath = process.env[PREMIUM_TEXTS_DIR_ENV_KEY]?.trim();
  const cwd = process.cwd();
  const candidates = [
    envPath,
    join(cwd, 'src', 'assets', 'texts'),
    join(cwd, 'assets', 'texts'),
    join(cwd, '.netlify', 'functions-internal', 'server', 'assets', 'texts'),
    join(cwd, '.netlify', 'functions', 'server', 'assets', 'texts'),
    join(cwd, 'dist', 'server', 'assets', 'texts'),
    join(cwd, 'dist', 'assets', 'texts'),
    join(cwd, '.output', 'server', 'assets', 'texts'),
  ].filter((candidate): candidate is string => Boolean(candidate));

  return [...new Set(candidates)];
}

function isExistingDirectory(path: string): boolean {
  if (!existsSync(path)) {
    return false;
  }

  try {
    return statSync(path).isDirectory();
  } catch {
    return false;
  }
}

function resolveAssetsDir(): string {
  const candidates = resolveAssetDirCandidates();
  const assetsDir = candidates.find(isExistingDirectory);

  if (!assetsDir) {
    throw new Error(
      `Premium temperament texts directory not found. Checked: ${candidates.join(', ')}`,
    );
  }

  return assetsDir;
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
      `Missing premium text file for temperament "${temperament}" in "${assetsDir}".`,
    );
  }

  return join(assetsDir, fileName);
}

function buildTemperamentText(temperament: TemperamentId): TemperamentPremiumText {
  const filePath = resolveFilePath(temperament);
  const rawText = readFileSync(filePath, 'utf8');
  const paragraphs = extractParagraphEntries(rawText);
  const usedIndexes = new Set<number>();

  const overview = selectSectionText(paragraphs, 'overview', usedIndexes);
  const strengths = selectSectionText(paragraphs, 'strengths', usedIndexes);
  const risks = selectSectionText(paragraphs, 'risks', usedIndexes);
  const practices = selectSectionText(paragraphs, 'practices', usedIndexes);
  const work = selectSectionText(paragraphs, 'work', usedIndexes);
  const relationships = selectSectionText(paragraphs, 'relationships', usedIndexes);

  const baseText = {
    overview: stripCombinationSentences(
      overview || pickFallbackText(paragraphs, [0, 1]),
    ),
    strengths: stripCombinationSentences(
      strengths || pickFallbackText(paragraphs, [1, 0, 2]),
    ),
    risks: stripCombinationSentences(
      risks || pickFallbackText(paragraphs, [2, 3, 1]),
    ),
    practices: stripCombinationSentences(
      practices || pickFallbackText(paragraphs, [3, 2, 4]),
    ),
    work: stripCombinationSentences(
      work || pickFallbackText(paragraphs, [4, 1, 0]),
    ),
    relationships: stripCombinationSentences(
      relationships || pickFallbackText(paragraphs, [5, 2, 1]),
    ),
  };

  return {
    temperament,
    ...baseText,
    checklist: buildChecklist(baseText),
    weaknesses: baseText.risks,
    career: baseText.work,
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

