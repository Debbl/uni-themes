import { useTheme } from 'best-themes'

export function App() {
  const { theme, resolvedTheme, systemTheme, themes, setTheme } = useTheme()

  return (
    <main>
      <h1>best-themes / vite</h1>
      <p>
        {['system', ...themes].map((t) => (
          <button
            key={t}
            type='button'
            data-active={theme === t}
            onClick={() => setTheme(t)}
          >
            {t}
          </button>
        ))}
      </p>
      <dl>
        <dt>theme</dt>
        <dd>{theme}</dd>
        <dt>resolvedTheme</dt>
        <dd>{resolvedTheme}</dd>
        <dt>systemTheme</dt>
        <dd>{systemTheme ?? 'undefined'}</dd>
      </dl>
      <p>
        No inline script needed in a SPA — the provider applies the theme
        before first paint. StrictMode is on to prove the store survives
        double-rendering.
      </p>
    </main>
  )
}
