'use client'

import { useTheme } from 'best-themes'

export function Switcher() {
  const { theme, resolvedTheme, systemTheme, themes, setTheme } = useTheme()

  return (
    <>
      <div className='card'>
        <p style={{ marginTop: 0 }}>
          {['system', ...themes].map((t) => (
            <button
              key={t}
              type='button'
              data-active={theme === t}
              onClick={() => setTheme(t)}
              style={{ marginRight: '0.5rem' }}
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
      </div>
      <div className='card'>
        <p style={{ margin: 0 }}>
          Body and cards have a deliberately slow 0.5s transition:
          theme changes should still snap instantly
          (<code>disableTransitionOnChange</code>), and reloading the page must
          never flash the wrong theme.
        </p>
      </div>
    </>
  )
}
