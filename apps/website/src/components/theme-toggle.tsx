'use client'

import { useTheme } from 'uni-themes'
import { Monitor, Moon, Sun } from 'lucide-react'

const MODES = ['system', 'light', 'dark']

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const next = MODES[(MODES.indexOf(theme) + 1) % MODES.length] ?? 'system'
  const Icon = theme === 'system' ? Monitor : theme === 'dark' ? Moon : Sun

  return (
    <button
      type='button'
      onClick={() => setTheme(next)}
      title={`theme: ${theme} (click for ${next})`}
      className='bg-fd-background text-fd-foreground border-fd-border fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-full border px-3 py-2 text-sm shadow-md'
    >
      <Icon className='size-4' />
      {theme}
    </button>
  )
}
