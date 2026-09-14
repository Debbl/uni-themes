import { ThemeProvider } from 'best-themes'
import { ThemeScript } from 'best-themes/script'
import { getThemeFromRequest } from 'best-themes/server'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router'
import stylesheet from './app.css?url'
import type { LoaderFunctionArgs } from 'react-router'

export function loader({ request }: LoaderFunctionArgs) {
  /** What the server sees in the cookie - null until the user picks a theme. */
  return { serverTheme: getThemeFromRequest(request) }
}

export function links() {
  return [{ rel: 'stylesheet', href: stylesheet }]
}

export default function App() {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>best-themes · React Router</title>
        <ThemeScript storage='cookie' />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider storage='cookie'>
          <main>
            <Outlet />
          </main>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
