export function parseThemeCookie(
  cookieHeader: string | null | undefined,
  storageKey = 'theme',
): string | null {
  if (!cookieHeader) return null
  const parts = `; ${cookieHeader}`.split(`; ${storageKey}=`)
  if (parts.length < 2) return null
  const raw = parts[1]!.split(';')[0]!
  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}

export function serializeThemeCookie(
  theme: string,
  storageKey = 'theme',
  maxAge = 60 * 60 * 24 * 365,
): string {
  return `${storageKey}=${encodeURIComponent(theme)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`
}
