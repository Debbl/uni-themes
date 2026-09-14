import { useTheme } from 'best-themes'
import { useRouteLoaderData } from 'react-router'
import type { loader as rootLoader } from './root'

export function Switcher() {
  const { theme, resolvedTheme, systemTheme, themes, setTheme } = useTheme()
  const data = useRouteLoaderData<typeof rootLoader>('root')

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
        <dd>{data?.serverTheme ?? 'null (not set yet)'}</dd>
      </dl>
    </div>
  )
}
