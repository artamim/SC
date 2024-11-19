import { useState } from 'react'
import '../styles/About.css'

function About() {
  const [count, setCount] = useState(0)

  return (
    <div className = "abt-mn-main">
      <div className = "abt-mn">
        <h2 style={{color:"#15B2D1"}}>Project Overview</h2>
        <p>This project is a full-stack application built using the PERN stack, incorporating best practices in modern web development and database management. The primary objective is to create a secure, efficient, and user-friendly system with the following features:</p>
        <ul>
          <li><b>Frontend: </b>A React-based interface designed for seamless navigation, utilizing React Router for dynamic and declarative routing.</li>
          <li><b>Backend: </b>An Express.js server handling API requests, integrating JWT authentication for secure user sessions.</li>
          <li><b>Database: </b>PostgreSQL as the database management system, adhering to the principles of 1NF, 2NF, and 3NF normalization to ensure efficient data organization and integrity.</li>
          <li><b>Security: </b>Implementation of SQL injection prevention techniques to protect against malicious database queries.</li>
        </ul>
      </div>
    </div>
  )
}

export default About
