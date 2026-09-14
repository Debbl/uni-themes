import { cookies } from 'next/headers'

/**
 * Read the theme in a Next.js server component, route handler, or server
 * action. Requires `storage: 'cookie'`; returns null for first-time visitors.
 */
export async function getTheme(storageKey = 'theme'): Promise<string | null> {
  const store = await cookies()
  return store.get(storageKey)?.value ?? null
}
