import { beforeEach, describe, expect, it } from 'vitest'
import { buildThemeScript } from '../src/core/script.ts'

function runScript(config?: Parameters<typeof buildThemeScript>[0]) {
  // eslint-disable-next-line no-new-func
  new Function(buildThemeScript(config))()
}

const html = () => document.documentElement

beforeEach(() => {
  localStorage.clear()
  document.cookie = 'theme=; Max-Age=0; Path=/'
  html().className = ''
  html().removeAttribute('data-theme')
  html().style.colorScheme = ''
})

describe('buildThemeScript', () => {
  it('falls back to the system theme when nothing is stored', () => {
    runScript()
    // happy-dom reports prefers-color-scheme: dark as non-matching
    expect(html().classList.contains('light')).toBe(true)
    expect(html().style.colorScheme).toBe('light')
  })

  it('applies the theme stored in localStorage', () => {
    localStorage.setItem('theme', 'dark')
    runScript()
    expect(html().classList.contains('dark')).toBe(true)
    expect(html().style.colorScheme).toBe('dark')
  })

  it('prefers the cookie in cookie mode', () => {
    document.cookie = 'theme=dark; Path=/'
    localStorage.setItem('theme', 'light')
    runScript({ storage: 'cookie' })
    expect(html().classList.contains('dark')).toBe(true)
  })

  it('replaces a previously applied theme class', () => {
    html().classList.add('dark')
    localStorage.setItem('theme', 'light')
    runScript()
    expect(html().classList.contains('dark')).toBe(false)
    expect(html().classList.contains('light')).toBe(true)
  })

  it('writes a data attribute when configured', () => {
    localStorage.setItem('theme', 'dark')
    runScript({ attribute: 'data-theme' })
    expect(html().getAttribute('data-theme')).toBe('dark')
    expect(html().classList.length).toBe(0)
  })

  it('ignores stored values outside the theme list', () => {
    localStorage.setItem('theme', 'hacked')
    runScript({ defaultTheme: 'light' })
    expect(html().classList.contains('light')).toBe(true)
  })

  it('respects forcedTheme over the stored value', () => {
    localStorage.setItem('theme', 'light')
    runScript({ forcedTheme: 'dark' })
    expect(html().classList.contains('dark')).toBe(true)
  })

  it('never emits a raw </script> even from hostile config', () => {
    const script = buildThemeScript({ storageKey: '</script><script>alert(1)' })
    expect(script).not.toContain('</script>')
    expect(script).not.toContain('<script')
  })
})
