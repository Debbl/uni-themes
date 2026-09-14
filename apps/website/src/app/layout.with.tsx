import { t } from 'best-i18n/macro'
import { setRequestLocale } from 'best-i18n/next/server'
import { LocaleProvider } from 'best-i18n/react'
import { ThemeProvider } from 'best-themes'
import { ThemeScript } from 'best-themes/script'
import { Provider } from '~/components/provider'
import { ThemeToggle } from '~/components/theme-toggle'
import { i18nConfig } from '~/lib/best-i18n'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export function withGenerateMetadata(lang: string): Metadata {
  setRequestLocale(lang)

  return {
    metadataBase: new URL('https://best-themes.aiwan.run'),
    title: {
      default: 'best-themes',
      template: '%s | best-themes',
    },
    description: t`Theme switching for React apps: framework-agnostic core, zero-FOUC inline script, no React 19 script warnings.`,
  }
}

// This site dogfoods best-themes: the inline script below and our own
// ThemeProvider replace fumadocs' built-in next-themes integration.
export function WithLayout(lang: string, { children }: { children: ReactNode }) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className='flex min-h-screen flex-col'>
        <ThemeProvider>
          <LocaleProvider locale={lang} config={i18nConfig}>
            <Provider lang={lang}>
              {children}
              <ThemeToggle />
            </Provider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
