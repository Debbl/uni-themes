import Link from 'next/link'
import { Switcher } from '../switcher'

export default function OtherPage() {
  return (
    <main>
      <h1>/other</h1>
      <Switcher />
      <p>
        <Link href='/'>Back to /</Link>
      </p>
    </main>
  )
}
