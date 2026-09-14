import { ThemeProvider } from 'uni-themes'
import { ThemeScript } from 'uni-themes/script'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'uni-themes playground',
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
