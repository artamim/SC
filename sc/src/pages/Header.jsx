import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../styles/Header.css'

function Header() {
  const [count, setCount] = useState(0)

  return (
    <div className="header">
      <div></div>
      <ul className="right-menu">
        <li><Link to="/">Home</Link></li>
        <li><NavLink to="about">About</NavLink></li>
      </ul>
    </div>
  )
}

export default Header
