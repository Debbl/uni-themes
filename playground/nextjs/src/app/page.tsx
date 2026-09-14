import Link from 'next/link'
import { Switcher } from './switcher'

export default function Page() {
  return (
    <main>
      <h1>uni-themes</h1>
      <Switcher />
      <p>
        <Link href='/other'>Navigate to /other</Link> and back — remounting
        route segments must not log React 19 script warnings in dev.
      </p>
    </main>
  )
}
