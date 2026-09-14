import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'best-themes',
    },
    githubUrl: 'https://github.com/Debbl/best-themes',
    // The floating ThemeToggle in the root layout replaces this - it runs on
    // best-themes itself, not the next-themes integration fumadocs ships.
    themeSwitch: { enabled: false },
  }
}
