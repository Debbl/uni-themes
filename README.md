# uni-themes

Theme switching for React apps — framework-agnostic core, zero-FOUC inline script, no React 19 script warnings. Works with Next.js, React Router, TanStack Start and Vite.

Docs: <https://uni-themes.aiwan.run>

- **[`apps/website`](./apps/website)** — the documentation site (`pnpm dev:website`, deploys to uni-themes.aiwan.run)

- **[`packages/uni-themes`](./packages/uni-themes)** — the library ([README](./packages/uni-themes/README.md))
- **[`playground/nextjs`](./playground/nextjs)** — Next.js App Router playground (`pnpm dev:next`)
- **[`playground/react-router`](./playground/react-router)** — React Router 7 / Remix successor, cookie mode + loader reading (`pnpm dev:rr`)
- **[`playground/tanstack-start`](./playground/tanstack-start)** — TanStack Start, cookie mode + server function reading (`pnpm dev:tanstack`)
- **[`playground/vite`](./playground/vite)** — Vite SPA playground (`pnpm dev:vite`)

```bash
pnpm install
pnpm build       # build the library (playgrounds resolve its dist)
pnpm test
pnpm dev:next
```

## License

MIT © [Brendan Dash](https://aiwan.run)
