import { ThemeProvider } from 'best-themes'
import { ThemeScript } from 'best-themes/script'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'best-themes playground',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <ThemeScript disableTransitionOnChange />
      </head>
      <body>
        <ThemeProvider disableTransitionOnChange>{children}</ThemeProvider>
      </body>
    </html>
  )
}
