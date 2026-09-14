'use client'

import { Link } from 'best-i18n/next/navigation'
import { useI18n } from 'best-i18n/react/macro'

export default function HomePage() {
  const t = useI18n()

  const features = [
    {
      title: t`Zero FOUC`,
      body: t`A synchronous inline script resolves the theme before first paint - on every framework, not just Next.js.`,
    },
    {
      title: t`No React 19 warnings`,
      body: t`The script renders from your server layout, never from a client component, so remounts cannot trigger the "script tag while rendering" error.`,
    },
    {
      title: t`Server-side reading`,
      body: t`Cookie mode lets loaders, server components and server functions know the theme - getTheme() for Next.js, getThemeFromRequest() everywhere else.`,
    },
    {
      title: t`Framework-agnostic core`,
      body: t`A plain DOM store with a 30-line useSyncExternalStore binding. Next.js, React Router, TanStack Start and Vite ship as subpath entries.`,
    },
  ]

  return (
    <main className='flex flex-1 flex-col items-center px-4 py-16 text-center'>
      <h1 className='mb-4 text-4xl font-bold'>uni-themes</h1>
      <p className='text-fd-muted-foreground mb-8 max-w-xl text-lg'>
        {t`Theme switching for React apps — zero-FOUC, React 19 safe, and it works the same in Next.js, React Router, TanStack Start and Vite.`}
      </p>
      <pre className='bg-fd-muted mb-8 rounded-lg px-6 py-3 text-sm'>
        <code>pnpm add uni-themes</code>
      </pre>
      <div className='mb-16 flex gap-4'>
        <Link
          href='/docs'
          className='bg-fd-primary text-fd-primary-foreground rounded-full px-6 py-2 font-medium'
        >
          {t`Get started`}
        </Link>
        <a
          href='https://github.com/Debbl/best-themes'
          className='border-fd-border rounded-full border px-6 py-2 font-medium'
        >
          GitHub
        </a>
      </div>
      <div className='grid max-w-4xl gap-4 text-left sm:grid-cols-2'>
        {features.map((f) => (
          <div key={f.title} className='border-fd-border rounded-lg border p-5'>
            <h2 className='mb-2 font-semibold'>{f.title}</h2>
            <p className='text-fd-muted-foreground text-sm'>{f.body}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
