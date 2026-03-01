export function pickLocalized(
  map: Record<string, string> | undefined,
  locale: string,
  fallback: string,
): string | undefined {
  if (!map) return fallback

  const direct = map[locale]
  if (direct) return direct

  const base = locale.split('-')[0]
  if (base && map[base]) return map[base]

  return map['pt-BR'] ?? fallback
}
