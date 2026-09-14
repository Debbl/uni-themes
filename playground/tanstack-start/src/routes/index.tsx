import { createFileRoute, Link, useLoaderData } from '@tanstack/react-router'
import { Switcher } from '../components/switcher'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const serverTheme = useLoaderData({ from: '__root__' })
  return (
    <>
      <h1>uni-themes · TanStack Start</h1>
      <Switcher serverTheme={serverTheme} />
      <p>
        Pick a theme, reload: the server cookie row should match and the page
        must not flash. <Link to='/other'>/other</Link>
      </p>
    </>
  )
}
