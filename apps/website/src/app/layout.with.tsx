import { ThemeProvider } from 'best-themes'
import { ThemeScript } from 'best-themes/script'
import { Provider } from '~/components/provider'
import { ThemeToggle } from '~/components/theme-toggle'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const DESCRIPTIONS: Record<string, string> = {
  en: 'Theme switching for React apps: framework-agnostic core, zero-FOUC inline script, no React 19 script warnings.',
  zh: 'React 应用的主题切换:框架无关内核、零闪烁内联脚本、没有 React 19 script 警告。',
}

export function withGenerateMetadata(lang: string): Metadata {
  return {
    metadataBase: new URL('https://best-themes.aiwan.run'),
    title: {
      default: 'best-themes',
      template: '%s | best-themes',
    },
    description: DESCRIPTIONS[lang] ?? DESCRIPTIONS.en,
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
          <Provider lang={lang}>
            {children}
            <ThemeToggle />
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}
