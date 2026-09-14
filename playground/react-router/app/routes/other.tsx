import { Link } from 'react-router'
import { Switcher } from '../switcher'

export default function Other() {
  return (
    <>
      <h1>/other</h1>
      <Switcher />
      <p>
        <Link to='/'>Back to /</Link>
      </p>
    </>
  )
}
