function getOrCreateClientId() {
  {
    return null;
  }
}
function getLastResultId(slug, actorKey) {
  return null;
}
function setLastResultId(slug, id, actorKey) {
  return;
}
function clearLastResultId(slug, actorKey) {
  return;
}
function isValidUuid(value) {
  return typeof value === "string" && /^[0-9a-f-]{36}$/i.test(value);
}
function buildUserActorKey(userId) {
  if (!isValidUuid(userId)) return null;
  return `u:${userId}`;
}
function buildClientActorKey(clientId) {
  if (typeof clientId !== "string" || clientId.length === 0) return null;
  return `c:${clientId}`;
}

export { buildClientActorKey as a, buildUserActorKey as b, getLastResultId as c, clearLastResultId as d, getOrCreateClientId as g, setLastResultId as s };
//# sourceMappingURL=actorKey-DUnMpcbL.mjs.map
