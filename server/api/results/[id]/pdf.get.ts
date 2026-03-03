import { serverSupabaseClient } from '#supabase/server';
import type { H3Event } from 'h3';
import type { StoredResult } from '../../results.post';
import { generateTemperamentsPdfBinary } from '../../report-builders/temperamentsPdfRender';
import { resolveUserId } from '../../../utils/resolveUserId';
import { withCriticalApiLogging } from '../../../utils/bugsnag';

interface StoredResultRow {
  session_id: string;
  slug: StoredResult['slug'];
  user_id: string | null;
  client_id: string | null;
  results: StoredResult['results'];
  top_summaries: StoredResult['topSummaries'] | null;
  meta: StoredResult['meta'] | null;
  created_at: string;
}

type AccessContext = {
  userId: string | null;
  clientId: string | null;
};

async function loadStoredResult(
  event: H3Event,
  id: string,
  access: AccessContext,
): Promise<StoredResult | null> {
  const { userId, clientId } = access;

  if (!userId && !clientId) {
    throw createError({
      statusCode: 400,
      message: 'clientId not provided',
    });
  }

  const canAccess = (
    storedUserId?: string | null,
    storedClientId?: string | null,
  ): boolean => {
    if (storedUserId) {
      return Boolean(userId && storedUserId === userId);
    }
    if (userId) {
      return false;
    }
    return Boolean(clientId && storedClientId && storedClientId === clientId);
  };

  try {
    const supabase = await serverSupabaseClient(event);

    const { data, error } = await supabase
      .from('test_results')
      .select('*')
      .eq('session_id', id)
      .maybeSingle<StoredResultRow>();

    if (!error && data) {
      if (!canAccess(data.user_id, data.client_id)) {
        throw createError({
          statusCode: 403,
          message: 'You do not have permission to access this report.',
        });
      }

      return {
        id: data.session_id,
        slug: data.slug,
        userId: data.user_id,
        email: null,
        clientId: data.client_id,
        results: data.results,
        topSummaries: data.top_summaries ?? undefined,
        meta: data.meta ?? undefined,
        timestamp: data.created_at,
      };
    }

    if (error) {
      console.error('[Supabase] failed to load PDF result, fallback to storage', error);
    }
  } catch (error) {
    console.error('[Supabase] unexpected PDF read error, fallback to storage', error);
  }

  const storage = useStorage<StoredResult[]>('results');
  const all = (await storage.getItem('items')) ?? [];
  const entry = all.find((item) => item.id === id) ?? null;

  if (!entry) return null;

  if (!canAccess(entry.userId, entry.clientId)) {
    throw createError({
      statusCode: 403,
      message: 'You do not have permission to access this report.',
    });
  }

  return entry;
}

export default defineEventHandler(async (event) => {
  const ctx = { area: 'results.pdf', authUserId: null as string | null };

  return await withCriticalApiLogging(event, ctx, async () => {
    const id = getRouterParam(event, 'id');

    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'Session id not provided.',
      });
    }

    const query = getQuery(event);
    const clientId = typeof query.clientId === 'string' ? query.clientId : null;
    const authUserId = await resolveUserId(event);
    ctx.authUserId = authUserId;

    const entry = await loadStoredResult(event, id, {
      userId: authUserId,
      clientId,
    });

    if (!entry) {
      throw createError({
        statusCode: 404,
        message: 'Results not found for PDF generation.',
      });
    }

    if (entry.slug !== 'temperaments') {
      throw createError({
        statusCode: 400,
        message: 'PDF report is available only for temperaments.',
      });
    }

    const { fileName, buffer } = await generateTemperamentsPdfBinary(entry);
    setHeader(event, 'Content-Type', 'application/pdf');
    setHeader(event, 'Content-Disposition', `inline; filename="${fileName}"`);

    return buffer;
  });
});
