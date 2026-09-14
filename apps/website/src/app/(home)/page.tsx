import Link from 'next/link'

const FEATURES = [
  {
    title: 'Zero FOUC',
    body: 'A synchronous inline script resolves the theme before first paint - on every framework, not just Next.js.',
  },
  {
    title: 'No React 19 warnings',
    body: 'The script renders from your server layout, never from a client component, so remounts cannot trigger the "script tag while rendering" error.',
  },
  {
    title: 'Server-side reading',
    body: "Cookie mode lets loaders, server components and server functions know the theme - getTheme() for Next.js, getThemeFromRequest() everywhere else.",
  },
  {
    title: 'Framework-agnostic core',
    body: 'A plain DOM store with a 30-line useSyncExternalStore binding. Next.js, React Router, TanStack Start and Vite ship as subpath entries.',
  },
]

export default function HomePage() {
  return (
    <main className='flex flex-1 flex-col items-center px-4 py-16 text-center'>
      <h1 className='mb-4 text-4xl font-bold'>best-themes</h1>
      <p className='text-fd-muted-foreground mb-8 max-w-xl text-lg'>
        Theme switching for React apps — zero-FOUC, React 19 safe, and it works
        the same in Next.js, React Router, TanStack Start and Vite.
      </p>
      <pre className='bg-fd-muted mb-8 rounded-lg px-6 py-3 text-sm'>
        <code>pnpm add best-themes</code>
      </pre>
      <div className='mb-16 flex gap-4'>
        <Link
          href='/docs'
          className='bg-fd-primary text-fd-primary-foreground rounded-full px-6 py-2 font-medium'
        >
          Get started
        </Link>
        <a
          href='https://github.com/Debbl/best-themes'
          className='border-fd-border rounded-full border px-6 py-2 font-medium'
        >
          GitHub
        </a>
      </div>
      <div className='grid max-w-4xl gap-4 text-left sm:grid-cols-2'>
        {FEATURES.map((f) => (
          <div key={f.title} className='border-fd-border rounded-lg border p-5'>
            <h2 className='mb-2 font-semibold'>{f.title}</h2>
            <p className='text-fd-muted-foreground text-sm'>{f.body}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
