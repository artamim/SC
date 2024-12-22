import React, { useState, useEffect, useContext } from 'react';
import { NavLink, Outlet, useLocation} from 'react-router-dom';
import '../styles/SideLayout.css';
import monitorImage from '/images/menu.png';
import aboutImage from '/images/about.png';
import poweroffImage from '/images/power-off.png';

export default function RootLayout() {
    const location = useLocation();
    const [time, setTime] = useState()
    //const {user} = useContext(AuthContext);
    const [curpage, setcurpage] = useState("")
    {/*useEffect(() => {
        // Extract and log the page name
        const pageName = location.pathname === '/home' ? 'Dashboard' : location.pathname.replace('/', '');
        setcurpage(pageName.toUpperCase());
    }, [location]);*/}

    useEffect(() => {

        setInterval(() => {
    
            const dateObject = new Date()
        
            let hour = dateObject.getHours()
            const minute = dateObject.getMinutes()
            const second = dateObject.getSeconds()
        
            const amPm = hour >= 12 ? "PM" : "AM";
            const hour12 = hour % 12 || 12; // Convert 0 to 12 for 12AM

            // Pad minutes and seconds to always have two digits
            const formattedMinute = minute.toString().padStart(2, "0");
            const formattedSecond = second.toString().padStart(2, "0");

            const currentTime = `${hour12}:${formattedMinute}:${formattedSecond} ${amPm}`;

          
          setTime(currentTime)
        }, 1000)
    
    }, [])

    return (
        <main>
            <div className="mainheader">MyReactERP || {time}</div>
            <div className="maincontent">
                <div className="side-menu">
                    <div className="side-menu-route">
                        <div className="logo"></div>
                        <NavLink index className="mains"><img src={monitorImage}/>Dashboard</NavLink>
                        <NavLink to="about" className="mains"><img src={aboutImage}/>About</NavLink>
                        <div className="devider"></div>
                        <div className="channel">Cross Application</div>
                        <NavLink to="customer" className="route">Customer Master</NavLink>
                        <NavLink to="supplier" className="route">Supplier Master</NavLink>
                        <NavLink to="item" className="route">Item Master</NavLink>
                        <div className="devider"></div>
                        <div className="channel">Sales</div>
                        <NavLink to="salesorder" className="route">Sales Order</NavLink>
                        <NavLink to="collection" className="route">Collection</NavLink>
                    </div>
                    {/*<NavLink to="signout" className="signout">{user.id}</NavLink>*/}
                    <div className="signout">
                        <b>Hardcode Tamim</b>
                        <div style={{height:"10px"}}></div>
                        <NavLink to="/signout"><img src={poweroffImage}/><b>LogOut</b></NavLink>
                    </div>
                </div>
                <div className="contentbody">
                    <Outlet />
                </div>
            </div>
            
        </main>
    );
}
