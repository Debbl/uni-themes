import { ThemeProvider } from 'best-themes'
import { ThemeScript } from 'best-themes/script'
import { RootProvider } from 'fumadocs-ui/provider/next'
import { ThemeToggle } from '~/components/theme-toggle'
import './global.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://best-themes.aiwan.run'),
  title: {
    default: 'best-themes',
    template: '%s | best-themes',
  },
  description:
    'Theme switching for React apps: framework-agnostic core, zero-FOUC inline script, no React 19 script warnings.',
}

// This site dogfoods best-themes: the inline script below and our own
// ThemeProvider replace fumadocs' built-in next-themes integration.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className='flex min-h-screen flex-col'>
        <ThemeProvider>
          <RootProvider theme={{ enabled: false }} search={{ enabled: false }}>
            {children}
            <ThemeToggle />
          </RootProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
