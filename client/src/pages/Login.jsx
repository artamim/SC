import { useEffect } from 'react'
import '../styles/Login.css'

function Login() {

  /*adding this bcuz the css in Login.css is adding 10px
   to html which is changing the font size of all pages is the app. 
   IDK why.*/

  useEffect(() => {
    document.documentElement.style.fontSize = '10px';
    return () => {
      document.documentElement.style.fontSize = '';
    };
  }, []);

  return (
    <div className="loginfbdy">
      <div className="container1">
        <form action="">
            <h1 className="form-header">Sign In</h1>

            <input type="email" placeholder="Email" className="form-input" />
            <label for="email" className="form-label">Email</label>
    
            <input type="password" placeholder="Password" className="form-input" />
            <label for="password" className="form-label">Password</label>

            <button className="form-btn"></button>
        </form>
      </div>
    </div>
  )
}

export default Login
