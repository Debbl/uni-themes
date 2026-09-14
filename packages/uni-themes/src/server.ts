import { parseThemeCookie } from './core/cookie.ts'

export { parseThemeCookie, serializeThemeCookie } from './core/cookie.ts'

/**
 * Read the theme from an incoming `Request` - React Router loaders, TanStack
 * Start server functions, or any fetch-based server. Requires
 * `storage: 'cookie'`; returns null for first-time visitors.
 */
export function getThemeFromRequest(
  request: Request,
  storageKey = 'theme',
): string | null {
  return parseThemeCookie(request.headers.get('cookie'), storageKey)
}
