import { d as defineEventHandler, w as withCriticalApiLogging, k as getRouterParam, c as createError, f as getQuery, l as resolveUserId, s as serverSupabaseClient, i as useStorage } from '../../../_/nitro.mjs';
import { buildReportFromStoredResult } from '../report-builders/dispatch.mjs';
import '@bugsnag/js';
import '@supabase/ssr';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vue';
import 'vue-router';
import 'node:fs';
import 'node:path';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'better-sqlite3';
import '../report-builders/twelveLayers.mjs';
import '../../../_/normalizeScale.mjs';
import '../report-builders/temperaments.mjs';
import '../../../_/premiumTemperaments.mjs';
import '../report-builders/temperamentsCompatibility.mjs';
import '../report-builders/assessments.mjs';

const _id__get = defineEventHandler(async (event) => {
  const ctx = { area: "results.detail", authUserId: null };
  return await withCriticalApiLogging(event, ctx, async () => {
    var _a, _b, _c;
    const id = getRouterParam(event, "id");
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "ID de sessao nao informado"
      });
    }
    const query = getQuery(event);
    const clientId = typeof query.clientId === "string" ? query.clientId : null;
    const authUserId = await resolveUserId(event);
    ctx.authUserId = authUserId;
    const userId = authUserId;
    if (!userId && !clientId) {
      throw createError({
        statusCode: 400,
        message: "clientId nao informado"
      });
    }
    let entry = null;
    const canAccess = (storedUserId, storedClientId) => {
      if (storedUserId) {
        return Boolean(userId && storedUserId === userId);
      }
      return Boolean(clientId && storedClientId && clientId === storedClientId);
    };
    try {
      const supabase = await serverSupabaseClient(event);
      const { data, error } = await supabase.from("test_results").select("*").eq("session_id", id).maybeSingle();
      if (!error && data) {
        if (!canAccess(data.user_id, data.client_id)) {
          throw createError({
            statusCode: 403,
            message: "Voce nao tem permissao para ver estes resultados."
          });
        }
        entry = {
          id: data.session_id,
          slug: data.slug,
          userId: data.user_id,
          email: null,
          clientId: data.client_id,
          results: data.results,
          topSummaries: (_a = data.top_summaries) != null ? _a : void 0,
          meta: (_b = data.meta) != null ? _b : void 0,
          timestamp: data.created_at
        };
      } else if (error) {
        console.error(
          "[Supabase] erro ao buscar resultado, fallback para storage",
          error
        );
      }
    } catch (err) {
      console.error(
        "[Supabase] erro inesperado ao buscar resultado, fallback para storage",
        err
      );
    }
    if (!entry) {
      const storage = useStorage("results");
      const all = (_c = await storage.getItem("items")) != null ? _c : [];
      const fromStorage = all.find((item) => item.id === id);
      if (fromStorage) {
        if (!canAccess(fromStorage.userId, fromStorage.clientId)) {
          throw createError({
            statusCode: 403,
            message: "Voce nao tem permissao para ver estes resultados."
          });
        }
        entry = fromStorage;
      }
    }
    if (!entry) {
      throw createError({
        statusCode: 404,
        message: "Resultados nao encontrados"
      });
    }
    const report = buildReportFromStoredResult(entry);
    if (!report) {
      throw createError({
        statusCode: 404,
        message: "Resultados desse teste nao estao disponiveis."
      });
    }
    return report;
  });
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
