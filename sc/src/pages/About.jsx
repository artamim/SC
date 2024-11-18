import { useState } from 'react'
import '../styles/About.css'

function About() {
  const [count, setCount] = useState(0)

  return (
    <div className = "abt-mn-main">
      <div className = "abt-mn">
        <h2>About This Project</h2>
        <p>This a simple project built with Pern Tehnology. I specially chose postgres show my prowess on a relational database.</p>
      </div>
    </div>
  )
}

export default About
