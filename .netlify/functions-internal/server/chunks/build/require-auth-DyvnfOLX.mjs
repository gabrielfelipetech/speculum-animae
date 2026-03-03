import { m as defineNuxtRouteMiddleware } from './server.mjs';
import 'vue';
import '../_/nitro.mjs';
import '@bugsnag/js';
import '@supabase/ssr';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vue-router';
import 'node:fs';
import 'node:path';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'better-sqlite3';
import '@iconify/vue';
import 'vue/server-renderer';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const requireAuth = defineNuxtRouteMiddleware(async () => {
  return;
});

export { requireAuth as default };
//# sourceMappingURL=require-auth-DyvnfOLX.mjs.map
