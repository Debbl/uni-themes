import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    'index': 'src/index.ts',
    'script': 'src/script.ts',
    'core': 'src/core/index.ts',
    'server': 'src/server.ts',
    'next': 'src/next.ts',
  },
  // Next.js keys client/server boundaries off the specifier as written.
  external: [/^next(\/|$)/],
  sourcemap: true,
  dts: { sourcemap: true },
})
