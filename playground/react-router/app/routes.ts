import { index, route } from '@react-router/dev/routes'
import type { RouteConfig } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('other', 'routes/other.tsx'),
] satisfies RouteConfig
