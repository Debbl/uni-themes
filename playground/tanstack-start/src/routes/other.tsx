import { createFileRoute, Link, useLoaderData } from '@tanstack/react-router'
import { Switcher } from '../components/switcher'

export const Route = createFileRoute('/other')({
  component: Other,
})

function Other() {
  const serverTheme = useLoaderData({ from: '__root__' })
  return (
    <>
      <h1>/other</h1>
      <Switcher serverTheme={serverTheme} />
      <p>
        <Link to='/'>Back to /</Link>
      </p>
    </>
  )
}
