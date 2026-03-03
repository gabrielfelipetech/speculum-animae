import { d as defineEventHandler, e as resolveAuthUser, c as createError, s as serverSupabaseClient } from '../../_/nitro.mjs';
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

const myResults_get = defineEventHandler(async (event) => {
  const user = await resolveAuthUser(event);
  if (!user) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized"
    });
  }
  try {
    const supabase = await serverSupabaseClient(event);
    const { data, error } = await supabase.from("test_results").select("session_id, slug, created_at, meta").eq("user_id", user.id).order("created_at", { ascending: false });
    if (error) {
      console.error("[Supabase] erro ao buscar test_results", error);
      return { items: [] };
    }
    const items = (data != null ? data : []).map((row) => {
      var _a;
      return {
        id: row.session_id,
        slug: row.slug,
        timestamp: row.created_at,
        meta: (_a = row.meta) != null ? _a : void 0
      };
    });
    return { items };
  } catch (err) {
    console.error("[Supabase] erro inesperado em /api/my-results", err);
    return { items: [] };
  }
});

export { myResults_get as default };
//# sourceMappingURL=my-results.get.mjs.map
