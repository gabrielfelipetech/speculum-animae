import { e as resolveAuthUser, c as createError, f as getQuery, h as getHeader } from './nitro.mjs';

function normalizeClientId(value) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}
function resolveAnonymousClientId(event, input) {
  var _a, _b;
  const query = getQuery(event);
  return (_b = (_a = normalizeClientId(input == null ? void 0 : input.clientId)) != null ? _a : normalizeClientId(query.clientId)) != null ? _b : normalizeClientId(getHeader(event, "x-client-id"));
}
async function resolveBillingAuthContext(event, input) {
  var _a;
  const authUser = await resolveAuthUser(event);
  if (authUser == null ? void 0 : authUser.id) {
    return {
      userId: authUser.id,
      email: (_a = authUser.email) != null ? _a : void 0,
      isAuthenticated: true,
      actorKey: authUser.id
    };
  }
  const clientId = resolveAnonymousClientId(event, input);
  if (!clientId) {
    throw createError({
      statusCode: 400,
      message: "clientId nao informado para checkout anonimo."
    });
  }
  return {
    isAuthenticated: false,
    actorKey: clientId
  };
}

export { resolveBillingAuthContext as r };
//# sourceMappingURL=auth.mjs.map
