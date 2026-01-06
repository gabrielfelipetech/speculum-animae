// server/api/results.post.ts
import { serverSupabaseClient } from '#supabase/server';
import { resolveAuthUser } from '../utils/authUser';

export type ReportSlug =
  | 'twelve-layers'
  | 'temperaments'
  | 'love-languages'
  | 'attachment-styles'
  | 'conflict-communication'
  | 'jealousy-boundaries'
  | 'temperament-compatibility'
  | 'big-five'
  | 'disc'
  | 'self-sabotage'
  | 'procrastination'
  | 'decision-making'
  | 'learning-style-practice'
  | 'study-focus-attention'
  | 'study-habits'
  | 'metacognition'
  | 'work-values'
  | 'motivators'
  | 'leadership-style'
  | 'teamwork-collaboration'
  | 'anxiety-triggers'
  | 'burnout-stress'
  | 'habits-consistency'
  | 'sleep-energy'
  | 'archetypes'
  | 'self-esteem'
  | 'emotional-intelligence';

const REPORT_SLUGS: ReportSlug[] = [
  'twelve-layers',
  'temperaments',
  'love-languages',
  'attachment-styles',
  'conflict-communication',
  'jealousy-boundaries',
  'temperament-compatibility',
  'big-five',
  'disc',
  'self-sabotage',
  'procrastination',
  'decision-making',
  'learning-style-practice',
  'study-focus-attention',
  'study-habits',
  'metacognition',
  'work-values',
  'motivators',
  'leadership-style',
  'teamwork-collaboration',
  'anxiety-triggers',
  'burnout-stress',
  'habits-consistency',
  'sleep-energy',
  'archetypes',
  'self-esteem',
  'emotional-intelligence',
];

function isValidReportSlug(value: string): value is ReportSlug {
  return REPORT_SLUGS.includes(value as ReportSlug);
}

export interface StoredResult {
  id: string; // sessionId
  slug: ReportSlug;
  userId?: string | null;
  email?: string | null;
  clientId?: string | null;
  results: { groupId: string; name: string; average: number }[];
  topSummaries?: {
    groupId: string;
    name: string;
    title: string;
    average: number;
    description: string;
  }[];
  meta?: {
    title?: string;
    subtitle?: string;
    groupsLabel?: string;
  };
  timestamp: string;
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    sessionId: string;
    clientId?: string | null;
    slug: ReportSlug;
    results: { groupId: string; name: string; average: number }[];
    topSummaries?: StoredResult['topSummaries'];
    meta?: StoredResult['meta'];
  }>(event);

  const slug = body.slug;

  if (!isValidReportSlug(slug)) {
    throw createError({
      statusCode: 400,
      message: 'slug invalido',
    });
  }

  const authUser = await resolveAuthUser(event);
  const userId = authUser?.id ?? null;
  const clientId =
    userId === null && typeof body.clientId === 'string' ? body.clientId : null;

  if (!userId && !clientId) {
    throw createError({
      statusCode: 400,
      message: 'clientId nao informado',
    });
  }

  // 1) Sempre salvar localmente como fallback
  const storage = useStorage<StoredResult[]>('results');
  const key = 'items';

  const entry: StoredResult = {
    id: body.sessionId,
    slug,
    userId: userId ?? null,
    email: null,
    clientId: userId ? null : clientId,
    results: body.results,
    topSummaries: body.topSummaries ?? undefined,
    meta: body.meta ?? undefined,
    timestamp: new Date().toISOString(),
  };

  const current = (await storage.getItem(key)) ?? [];
  current.push(entry);
  await storage.setItem(key, current);

  // 2) Tentar sincronizar com Supabase (apenas se estiver logado)
  try {
    if (userId) {
      const supabase = await serverSupabaseClient(event);

      const { error } = await supabase.from('test_results').insert({
        id: crypto.randomUUID(),
        session_id: body.sessionId,
        user_id: userId,
        client_id: null,
        slug,
        results: body.results,
        top_summaries: body.topSummaries ?? null,
        meta: body.meta ?? null,
      });

      if (error) {
        console.error('[Supabase] erro ao inserir test_results', error);
      }
    }
  } catch (err) {
    console.error('[Supabase] erro inesperado ao sincronizar resultados', err);
  }

  return { id: entry.id };
});
