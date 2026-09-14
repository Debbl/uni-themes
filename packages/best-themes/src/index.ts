'use client'

import {
  createContext,
  createElement,
  useContext,
  useMemo,
  useRef,
  useSyncExternalStore,
} from 'react'
import { createThemeStore } from './core/store.ts'
import type { ReactNode } from 'react'
import type { ThemeStore } from './core/store.ts'
import type { ThemeConfig, ThemeState } from './core/types.ts'

export type { Theme, ThemeConfig, ThemeState } from './core/types.ts'

const ThemeContext = createContext<ThemeStore | undefined>(undefined)

export interface ThemeProviderProps extends ThemeConfig {
  children?: ReactNode
}

export function ThemeProvider({ children, ...config }: ThemeProviderProps) {
  // Config is captured on first render: swapping it mid-session would need a
  // new store plus a DOM re-apply, and no real app changes theme config live.
  const ref = useRef<ThemeStore | undefined>(undefined)
  ref.current ??= createThemeStore(config)
  return createElement(ThemeContext.Provider, { value: ref.current }, children)
}

export interface UseThemeReturn extends ThemeState {
  setTheme: (theme: string) => void
  themes: string[]
  forcedTheme: string | undefined
}

/** Shared by every `useTheme` outside a provider, so they stay in sync. */
let fallbackStore: ThemeStore | undefined

export function useTheme(): UseThemeReturn {
  const store = useContext(ThemeContext) ?? (fallbackStore ??= createThemeStore())
  const state = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  )
  return useMemo(
    () => ({
      ...state,
      setTheme: store.setTheme,
      themes: store.themes,
      forcedTheme: store.forcedTheme,
    }),
    [state, store],
  )
}
