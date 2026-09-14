import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createThemeStore } from '../src/core/store.ts'

const html = () => document.documentElement

beforeEach(() => {
  localStorage.clear()
  document.cookie = 'theme=; Max-Age=0; Path=/'
  html().className = ''
  html().removeAttribute('data-theme')
  html().style.colorScheme = ''
})

describe('createThemeStore', () => {
  it('initializes from localStorage and applies on first subscribe', () => {
    localStorage.setItem('theme', 'dark')
    const store = createThemeStore()
    store.subscribe(() => {})
    expect(store.getSnapshot()).toMatchObject({
      theme: 'dark',
      resolvedTheme: 'dark',
    })
    expect(html().classList.contains('dark')).toBe(true)
  })

  it('defaults to system resolved via matchMedia', () => {
    const store = createThemeStore()
    expect(store.getSnapshot()).toMatchObject({
      theme: 'system',
      resolvedTheme: 'light',
      systemTheme: 'light',
    })
  })

  it('setTheme updates state, DOM and storage, and notifies', () => {
    const store = createThemeStore()
    const listener = vi.fn()
    store.subscribe(listener)
    store.setTheme('dark')
    expect(listener).toHaveBeenCalledTimes(1)
    expect(store.getSnapshot().resolvedTheme).toBe('dark')
    expect(html().classList.contains('dark')).toBe(true)
    expect(html().classList.contains('light')).toBe(false)
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('setting the same theme is a no-op', () => {
    const store = createThemeStore()
    const listener = vi.fn()
    store.subscribe(listener)
    store.setTheme('dark')
    store.setTheme('dark')
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('snapshot identity is stable between changes', () => {
    const store = createThemeStore()
    expect(store.getSnapshot()).toBe(store.getSnapshot())
    const before = store.getSnapshot()
    store.setTheme('dark')
    expect(store.getSnapshot()).not.toBe(before)
  })

  it('cookie mode writes the cookie and mirrors to localStorage', () => {
    const store = createThemeStore({ storage: 'cookie' })
    store.setTheme('dark')
    expect(document.cookie).toContain('theme=dark')
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it("storage 'none' never persists", () => {
    const store = createThemeStore({ storage: 'none' })
    store.setTheme('dark')
    expect(localStorage.getItem('theme')).toBeNull()
    expect(document.cookie).not.toContain('dark')
  })

  it('forcedTheme pins the resolved theme but keeps the selection', () => {
    const store = createThemeStore({ forcedTheme: 'light' })
    store.subscribe(() => {})
    store.setTheme('dark')
    expect(store.getSnapshot().theme).toBe('dark')
    expect(store.getSnapshot().resolvedTheme).toBe('light')
    expect(html().classList.contains('light')).toBe(true)
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('syncs from other tabs via the storage event', () => {
    const store = createThemeStore()
    store.subscribe(() => {})
    window.dispatchEvent(
      new StorageEvent('storage', { key: 'theme', newValue: 'dark' }),
    )
    expect(store.getSnapshot().theme).toBe('dark')
    expect(html().classList.contains('dark')).toBe(true)
  })

  it('getServerSnapshot never touches the DOM value', () => {
    localStorage.setItem('theme', 'dark')
    const store = createThemeStore()
    expect(store.getServerSnapshot()).toMatchObject({
      theme: 'system',
      resolvedTheme: 'light',
      systemTheme: undefined,
    })
    expect(store.getServerSnapshot()).toBe(store.getServerSnapshot())
  })

  it('detaches listeners when the last subscriber leaves', () => {
    const store = createThemeStore()
    const unsubscribe = store.subscribe(() => {})
    unsubscribe()
    window.dispatchEvent(
      new StorageEvent('storage', { key: 'theme', newValue: 'dark' }),
    )
    expect(store.getSnapshot().theme).toBe('system')
  })
})
