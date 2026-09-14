import { serializeThemeCookie } from './cookie.ts'
import { resolveConfig } from './types.ts'
import type { ThemeConfig, ThemeState } from './types.ts'

export interface ThemeStore {
  getSnapshot: () => ThemeState
  getServerSnapshot: () => ThemeState
  subscribe: (listener: () => void) => () => void
  setTheme: (theme: string) => void
  themes: string[]
  forcedTheme: string | undefined
}

const isBrowser = typeof window !== 'undefined'
const DARK_QUERY = '(prefers-color-scheme: dark)'

export function createThemeStore(config: ThemeConfig = {}): ThemeStore {
  const c = resolveConfig(config)
  const listeners = new Set<() => void>()
  const media = isBrowser && c.enableSystem ? window.matchMedia(DARK_QUERY) : undefined
  let detach: (() => void) | undefined
  /** Last resolved theme this store wrote to the DOM; null = not yet applied. */
  let applied: string | null = null

  const systemTheme = (): 'light' | 'dark' | undefined =>
    media ? (media.matches ? 'dark' : 'light') : undefined

  const readStored = (): string | null => {
    if (!isBrowser || c.storage === 'none') return null
    if (c.storage === 'cookie') {
      const parts = `; ${document.cookie}`.split(`; ${c.storageKey}=`)
      if (parts.length > 1) {
        const raw = parts[1]!.split(';')[0]!
        try {
          return decodeURIComponent(raw)
        } catch {
          return raw
        }
      }
    }
    try {
      return localStorage.getItem(c.storageKey)
    } catch {
      return null
    }
  }

  const normalize = (theme: string | null): string =>
    theme && (c.themes.includes(theme) || theme === 'system') ? theme : c.defaultTheme

  const resolve = (theme: string): string => {
    const target = c.forcedTheme ?? theme
    return target === 'system' ? (systemTheme() ?? 'light') : target
  }

  const makeState = (theme: string): ThemeState => ({
    theme,
    resolvedTheme: resolve(theme),
    systemTheme: systemTheme(),
  })

  let state: ThemeState = makeState(normalize(readStored()))

  // What the server (and hydration's first pass) sees. `resolvedTheme` guesses
  // light for 'system'; the client corrects it right after hydration.
  const serverState: ThemeState = {
    theme: c.defaultTheme,
    resolvedTheme:
      c.forcedTheme ?? (c.defaultTheme === 'system' ? 'light' : c.defaultTheme),
    systemTheme: undefined,
  }

  const applyDom = () => {
    if (!isBrowser) return
    const resolved = state.resolvedTheme
    if (resolved === applied) return
    const firstApply = applied === null
    const write = () => {
      const html = document.documentElement
      if (c.attribute === 'class') {
        html.classList.remove(...c.themes)
        html.classList.add(resolved)
      } else {
        html.setAttribute(c.attribute, resolved)
      }
      if (c.enableColorScheme) {
        html.style.colorScheme
          = resolved === 'dark' || resolved === 'light' ? resolved : ''
      }
    }
    // The first apply repeats what the inline script already did (or paints a
    // script-less SPA) - nothing changes visually, so no suppression needed.
    if (c.disableTransitionOnChange && !firstApply) withoutTransitions(write)
    else write()
    applied = resolved
  }

  const update = (theme: string) => {
    const next = makeState(theme)
    if (
      next.theme === state.theme
      && next.resolvedTheme === state.resolvedTheme
      && next.systemTheme === state.systemTheme
    ) {
      return
    }
    state = next
    applyDom()
    for (const listener of listeners) listener()
  }

  const persist = (theme: string) => {
    if (!isBrowser || c.storage === 'none') return
    try {
      localStorage.setItem(c.storageKey, theme)
    } catch {}
    if (c.storage === 'cookie') {
      document.cookie = serializeThemeCookie(theme, c.storageKey)
    }
  }

  const setTheme = (theme: string) => {
    persist(theme)
    update(theme)
  }

  const attach = () => {
    if (!isBrowser) return
    const onMedia = () => update(state.theme)
    media?.addEventListener('change', onMedia)
    const onStorage = (e: StorageEvent) => {
      if (e.key === c.storageKey) update(normalize(e.newValue))
    }
    window.addEventListener('storage', onStorage)
    detach = () => {
      media?.removeEventListener('change', onMedia)
      window.removeEventListener('storage', onStorage)
      detach = undefined
    }
  }

  // Listeners attach on first subscriber and detach with the last one, so a
  // store created during render (and thrown away by StrictMode's double
  // render) never leaks.
  const subscribe = (listener: () => void) => {
    if (listeners.size === 0) {
      attach()
      applyDom()
    }
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
      if (listeners.size === 0) detach?.()
    }
  }

  return {
    getSnapshot: () => state,
    getServerSnapshot: () => serverState,
    subscribe,
    setTheme,
    themes: c.themes,
    forcedTheme: c.forcedTheme,
  }
}

function withoutTransitions(write: () => void) {
  const style = document.createElement('style')
  style.appendChild(
    document.createTextNode(
      '*,*::before,*::after{transition:none!important}',
    ),
  )
  document.head.appendChild(style)
  write()
  // Force a reflow so the frame lands with transitions off.
  window.getComputedStyle(document.body)
  setTimeout(() => style.remove(), 1)
}
