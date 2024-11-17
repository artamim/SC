import { useState } from 'react'

function Header() {
  const [count, setCount] = useState(0)

  return (
    <div className="header">
      <div></div>
      <ul className="right-menu">
        <li>Home</li>
        <li>About</li>
      </ul>
    </div>
  )
}

export default Header
