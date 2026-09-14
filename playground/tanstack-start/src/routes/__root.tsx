import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import { ThemeProvider } from 'best-themes'
import { ThemeScript } from 'best-themes/script'
import { getThemeFromRequest } from 'best-themes/server'
import appCss from '../styles.css?url'

/** What the server sees in the cookie - null until the user picks a theme. */
const getServerTheme = createServerFn().handler(() =>
  getThemeFromRequest(getRequest()),
)

export const Route = createRootRoute({
  loader: () => getServerTheme(),
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'best-themes · TanStack Start' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <ThemeScript storage='cookie' />
        <HeadContent />
      </head>
      <body>
        <ThemeProvider storage='cookie'>
          <main>
            <Outlet />
          </main>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
