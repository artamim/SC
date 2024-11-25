import React, { useEffect, useRef } from 'react';
import '../styles/Landing.css';
import infoImage from '/images/info.png';

function Landing() {
  const loginbtnRef = useRef(null);
  const signupbtnRef = useRef(null);

  useEffect(() => {
    if (loginbtnRef.current && signupbtnRef.current) {
      const signupWidth = signupbtnRef.current.offsetWidth; // Get the width of the "Sign Up" button
      loginbtnRef.current.style.width = `${signupWidth}px`; // Apply the width to the "Log In" button
    }
  }, []);

  return (
    <div className="mainlanding">
      <div className="mainlandingheader">
        <div></div>
      </div>
      <div className="circle">
        <div>
          <h2><b>My ERP Project</b></h2>
          <div>
            <nobr style={{color:"#656E6F"}}>This is my small project that is still in development!!</nobr>
          </div>
          <div className="buttonline">
            <div className="loginbtn" ref={loginbtnRef}>
              Log In
            </div>
            <div className="signupbtn" ref={signupbtnRef}>
              Sign Up
            </div>
          </div>
        </div>
      </div>
      <div className="mainlandingabout">
        <img src={infoImage}/>
      </div>
    </div>
  );
}

export default Landing;
