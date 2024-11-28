import React, { useEffect } from 'react';
import '../styles/Landing.css';
import infoImage from '/images/info.png';
import { NavLink } from 'react-router-dom';

function Landing() {

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
            <NavLink to={"login"} className="loginbtn">
              Log In
            </NavLink>
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
