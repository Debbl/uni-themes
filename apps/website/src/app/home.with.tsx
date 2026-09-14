import Link from 'next/link'
import { i18n } from '~/lib/i18n'

const CONTENT = {
  en: {
    tagline:
      'Theme switching for React apps — zero-FOUC, React 19 safe, and it works the same in Next.js, React Router, TanStack Start and Vite.',
    getStarted: 'Get started',
    features: [
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
        body: 'Cookie mode lets loaders, server components and server functions know the theme - getTheme() for Next.js, getThemeFromRequest() everywhere else.',
      },
      {
        title: 'Framework-agnostic core',
        body: 'A plain DOM store with a 30-line useSyncExternalStore binding. Next.js, React Router, TanStack Start and Vite ship as subpath entries.',
      },
    ],
  },
  zh: {
    tagline:
      'React 应用的主题切换 — 零闪烁、React 19 安全,在 Next.js、React Router、TanStack Start 和 Vite 中行为一致。',
    getStarted: '快速开始',
    features: [
      {
        title: '零闪烁(FOUC)',
        body: '同步内联脚本在首次绘制前完成主题解析 — 对所有框架生效,而不只是 Next.js。',
      },
      {
        title: '没有 React 19 警告',
        body: '脚本由 server layout 渲染,从不经过客户端组件,路由重挂载不可能触发 "script tag while rendering" 错误。',
      },
      {
        title: '服务端读取',
        body: 'Cookie 模式让 loader、服务端组件和 server function 都能读到主题 — Next.js 用 getTheme(),其他框架用 getThemeFromRequest()。',
      },
      {
        title: '框架无关内核',
        body: '纯 DOM store 加 30 行 useSyncExternalStore 绑定。Next.js、React Router、TanStack Start 和 Vite 以子路径入口提供。',
      },
    ],
  },
} satisfies Record<string, unknown>

export function WithHomePage(lang: string) {
  const c = CONTENT[lang as keyof typeof CONTENT] ?? CONTENT.en
  const docsUrl = lang === i18n.defaultLanguage ? '/docs' : `/${lang}/docs`

  return (
    <main className='flex flex-1 flex-col items-center px-4 py-16 text-center'>
      <h1 className='mb-4 text-4xl font-bold'>best-themes</h1>
      <p className='text-fd-muted-foreground mb-8 max-w-xl text-lg'>
        {c.tagline}
      </p>
      <pre className='bg-fd-muted mb-8 rounded-lg px-6 py-3 text-sm'>
        <code>pnpm add best-themes</code>
      </pre>
      <div className='mb-16 flex gap-4'>
        <Link
          href={docsUrl}
          className='bg-fd-primary text-fd-primary-foreground rounded-full px-6 py-2 font-medium'
        >
          {c.getStarted}
        </Link>
        <a
          href='https://github.com/Debbl/best-themes'
          className='border-fd-border rounded-full border px-6 py-2 font-medium'
        >
          GitHub
        </a>
      </div>
      <div className='grid max-w-4xl gap-4 text-left sm:grid-cols-2'>
        {c.features.map((f) => (
          <div key={f.title} className='border-fd-border rounded-lg border p-5'>
            <h2 className='mb-2 font-semibold'>{f.title}</h2>
            <p className='text-fd-muted-foreground text-sm'>{f.body}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
