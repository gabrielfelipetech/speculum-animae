import { d as defineEventHandler, w as withCriticalApiLogging, i as useStorage } from '../../_/nitro.mjs';
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

const results_get = defineEventHandler(async (event) => {
  const authUserId = null;
  return await withCriticalApiLogging(
    event,
    { area: "results.list", authUserId },
    async () => {
      var _a;
      const storage = useStorage("results");
      const key = "items";
      const all = ((_a = await storage.getItem(key)) != null ? _a : []).sort(
        (a, b) => a.timestamp < b.timestamp ? 1 : -1
      );
      return { items: all };
    }
  );
});

export { results_get as default };
//# sourceMappingURL=results.get.mjs.map
