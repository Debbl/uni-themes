import { useTheme } from 'best-themes'

export function Switcher({ serverTheme }: { serverTheme: string | null }) {
  const { theme, resolvedTheme, systemTheme, themes, setTheme } = useTheme()

  return (
    <div className='card'>
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
        <dt>server cookie</dt>
        <dd>{serverTheme ?? 'null (not set yet)'}</dd>
      </dl>
    </div>
  )
}
