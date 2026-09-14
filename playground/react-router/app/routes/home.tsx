import { Link } from 'react-router'
import { Switcher } from '../switcher'

export default function Home() {
  return (
    <>
      <h1>uni-themes · React Router</h1>
      <Switcher />
      <p>
        Pick a theme, reload: the server cookie row should match and the page
        must not flash. <Link to='/other'>/other</Link>
      </p>
    </>
  )
}
