import { d as defineEventHandler, w as withCriticalApiLogging, k as getRouterParam, c as createError, f as getQuery, l as resolveUserId, m as setHeader, s as serverSupabaseClient, i as useStorage } from '../../../../_/nitro.mjs';
import { generateTemperamentsPdfBinary } from '../../report-builders/temperamentsPdfRender.mjs';
import { generateTwelveLayersPdfBinary } from '../../report-builders/twelveLayersPdfRender.mjs';
import { generateTemperamentsCompatibilityPdfBinary } from '../../report-builders/temperamentsCompatibilityPdfRender.mjs';
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
import 'pdfkit';
import '../../report-builders/temperamentsPdf.mjs';
import '../../../../_/premiumTemperaments.mjs';
import '../../../../_/normalizeScale.mjs';
import '../../../../_/layout.mjs';
import '../../report-builders/twelveLayersPdf.mjs';
import '../../report-builders/temperamentsCompatibilityPdf.mjs';

async function loadStoredResult(event, id, access) {
  var _a, _b, _c, _d;
  const { userId, clientId } = access;
  if (!userId && !clientId) {
    throw createError({
      statusCode: 400,
      message: "clientId not provided"
    });
  }
  const canAccess = (storedUserId, storedClientId) => {
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
    const { data, error } = await supabase.from("test_results").select("*").eq("session_id", id).maybeSingle();
    if (!error && data) {
      if (!canAccess(data.user_id, data.client_id)) {
        throw createError({
          statusCode: 403,
          message: "You do not have permission to access this report."
        });
      }
      return {
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
    }
    if (error) {
      console.error("[Supabase] failed to load PDF result, fallback to storage", error);
    }
  } catch (error) {
    console.error("[Supabase] unexpected PDF read error, fallback to storage", error);
  }
  const storage = useStorage("results");
  const all = (_c = await storage.getItem("items")) != null ? _c : [];
  const entry = (_d = all.find((item) => item.id === id)) != null ? _d : null;
  if (!entry) return null;
  if (!canAccess(entry.userId, entry.clientId)) {
    throw createError({
      statusCode: 403,
      message: "You do not have permission to access this report."
    });
  }
  return entry;
}
const pdf_get = defineEventHandler(async (event) => {
  const ctx = { area: "results.pdf", authUserId: null };
  return await withCriticalApiLogging(event, ctx, async () => {
    const id = getRouterParam(event, "id");
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "Session id not provided."
      });
    }
    const query = getQuery(event);
    const clientId = typeof query.clientId === "string" ? query.clientId : null;
    const authUserId = await resolveUserId(event);
    ctx.authUserId = authUserId;
    const entry = await loadStoredResult(event, id, {
      userId: authUserId,
      clientId
    });
    if (!entry) {
      throw createError({
        statusCode: 404,
        message: "Results not found for PDF generation."
      });
    }
    const { fileName, buffer } = entry.slug === "temperaments" ? await generateTemperamentsPdfBinary(entry) : entry.slug === "twelve-layers" ? await generateTwelveLayersPdfBinary(entry) : entry.slug === "temperaments-compatibility" || entry.slug === "temperament-compatibility" ? await generateTemperamentsCompatibilityPdfBinary(entry) : (() => {
      throw createError({
        statusCode: 400,
        message: "PDF report not available for this test."
      });
    })();
    setHeader(event, "Content-Type", "application/pdf");
    setHeader(event, "Content-Disposition", `inline; filename="${fileName}"`);
    return buffer;
  });
});

export { pdf_get as default };
//# sourceMappingURL=pdf.get.mjs.map
