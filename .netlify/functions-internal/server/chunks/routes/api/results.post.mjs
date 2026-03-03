import { d as defineEventHandler, w as withCriticalApiLogging, r as readBody, c as createError, e as resolveAuthUser, i as useStorage, s as serverSupabaseClient } from '../../_/nitro.mjs';
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

const CANONICAL_RESULT_SLUG_BY_INPUT = {
  "twelve-layers": "twelve-layers",
  temperaments: "temperaments",
  "temperaments-compatibility": "temperaments-compatibility",
  "temperament-compatibility": "temperaments-compatibility"
};
function normalizeIncomingReportSlug(value) {
  const normalized = CANONICAL_RESULT_SLUG_BY_INPUT[value];
  return normalized != null ? normalized : null;
}
const results_post = defineEventHandler(async (event) => {
  const ctx = { area: "results.create", authUserId: null };
  return await withCriticalApiLogging(event, ctx, async () => {
    var _a, _b, _c, _d, _e, _f;
    const body = await readBody(event);
    const slug = normalizeIncomingReportSlug(body.slug);
    if (!slug) {
      throw createError({
        statusCode: 400,
        message: "slug invalido"
      });
    }
    const authUser = await resolveAuthUser(event);
    const authUserId = (_a = authUser == null ? void 0 : authUser.id) != null ? _a : null;
    ctx.authUserId = authUserId;
    const userId = authUserId;
    const clientId = userId === null && typeof body.clientId === "string" ? body.clientId : null;
    if (!userId && !clientId) {
      throw createError({
        statusCode: 400,
        message: "clientId nao informado"
      });
    }
    const storage = useStorage("results");
    const key = "items";
    const entry = {
      id: body.sessionId,
      slug,
      userId: userId != null ? userId : null,
      email: null,
      clientId: userId ? null : clientId,
      results: body.results,
      topSummaries: (_b = body.topSummaries) != null ? _b : void 0,
      meta: (_c = body.meta) != null ? _c : void 0,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    const current = (_d = await storage.getItem(key)) != null ? _d : [];
    current.push(entry);
    await storage.setItem(key, current);
    try {
      if (userId) {
        const supabase = await serverSupabaseClient(event);
        const { error } = await supabase.from("test_results").insert({
          id: crypto.randomUUID(),
          session_id: body.sessionId,
          user_id: userId,
          client_id: null,
          slug,
          results: body.results,
          top_summaries: (_e = body.topSummaries) != null ? _e : null,
          meta: (_f = body.meta) != null ? _f : null
        });
        if (error) {
          console.error("[Supabase] erro ao inserir test_results", error);
        }
      }
    } catch (err) {
      console.error("[Supabase] erro inesperado ao sincronizar resultados", err);
    }
    return { id: entry.id };
  });
});

export { results_post as default };
//# sourceMappingURL=results.post.mjs.map
