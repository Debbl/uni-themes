export type Theme = 'light' | 'dark' | 'system' | (string & {})

export interface ThemeState {
  /** The selected theme, possibly `'system'`. */
  theme: string
  /** `theme` with `'system'` resolved to `'light'` / `'dark'`; equals `theme` otherwise. */
  resolvedTheme: string
  /** What the OS prefers right now. `undefined` on the server or when `enableSystem` is false. */
  systemTheme: 'light' | 'dark' | undefined
}

export interface ThemeConfig {
  /** Selectable themes, excluding `'system'`. Default `['light', 'dark']`. */
  themes?: string[]
  /** Default `'system'` when `enableSystem`, `'light'` otherwise. */
  defaultTheme?: string
  /** Track `prefers-color-scheme` and offer `'system'`. Default `true`. */
  enableSystem?: boolean
  /** Where the resolved theme lands on `<html>`. Default `'class'`. */
  attribute?: 'class' | `data-${string}`
  /** Storage key (and cookie name). Default `'theme'`. */
  storageKey?: string
  /**
   * `'localStorage'` (default) persists client-side only. `'cookie'` also
   * writes a cookie so the server can read the theme (see `best-themes/server`
   * and `best-themes/next`); localStorage is still mirrored for cross-tab
   * sync. `'none'` never persists.
   */
  storage?: 'localStorage' | 'cookie' | 'none'
  /** Keep `<html style="color-scheme">` in sync. Default `true`. */
  enableColorScheme?: boolean
  /** Suppress CSS transitions for the frame a theme change lands on. Default `false`. */
  disableTransitionOnChange?: boolean
  /** Pin the rendered theme; `setTheme` still persists the user's choice. */
  forcedTheme?: string
}

export type ResolvedThemeConfig = Required<Omit<ThemeConfig, 'forcedTheme'>> &
  Pick<ThemeConfig, 'forcedTheme'>

export function resolveConfig(config: ThemeConfig = {}): ResolvedThemeConfig {
  const enableSystem = config.enableSystem ?? true
  return {
    themes: config.themes ?? ['light', 'dark'],
    defaultTheme: config.defaultTheme ?? (enableSystem ? 'system' : 'light'),
    enableSystem,
    attribute: config.attribute ?? 'class',
    storageKey: config.storageKey ?? 'theme',
    storage: config.storage ?? 'localStorage',
    enableColorScheme: config.enableColorScheme ?? true,
    disableTransitionOnChange: config.disableTransitionOnChange ?? false,
    forcedTheme: config.forcedTheme,
  }
}
