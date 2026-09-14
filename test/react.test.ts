import { act, createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ThemeProvider, useTheme } from '../src/index.ts'
import type { UseThemeReturn } from '../src/index.ts'
import type { Root } from 'react-dom/client'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT
  = true

let captured: UseThemeReturn | undefined
function Probe() {
  captured = useTheme()
  return null
}

let container: HTMLElement
let root: Root

beforeEach(() => {
  localStorage.clear()
  document.documentElement.className = ''
  captured = undefined
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)
})

afterEach(() => {
  act(() => root.unmount())
  container.remove()
})

describe('ThemeProvider / useTheme', () => {
  it('exposes the store state and applies the theme on mount', () => {
    localStorage.setItem('theme', 'dark')
    act(() => {
      root.render(createElement(ThemeProvider, null, createElement(Probe)))
    })
    expect(captured).toMatchObject({ theme: 'dark', resolvedTheme: 'dark' })
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('setTheme re-renders consumers and updates the DOM', () => {
    act(() => {
      root.render(createElement(ThemeProvider, null, createElement(Probe)))
    })
    expect(captured?.theme).toBe('system')
    act(() => captured!.setTheme('dark'))
    expect(captured).toMatchObject({ theme: 'dark', resolvedTheme: 'dark' })
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('passes provider config through to the store', () => {
    act(() => {
      root.render(
        createElement(
          ThemeProvider,
          { themes: ['light', 'dark', 'sepia'], defaultTheme: 'sepia', enableSystem: false },
          createElement(Probe),
        ),
      )
    })
    expect(captured).toMatchObject({ theme: 'sepia', resolvedTheme: 'sepia' })
    expect(captured?.themes).toEqual(['light', 'dark', 'sepia'])
  })

  it('works without a provider via the shared fallback store', () => {
    act(() => {
      root.render(createElement(Probe))
    })
    expect(captured?.theme).toBe('system')
    expect(typeof captured?.setTheme).toBe('function')
  })
})
