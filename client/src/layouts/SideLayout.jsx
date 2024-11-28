import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation} from 'react-router-dom';
import '../styles/SideLayout.css';
import monitorImage from '/images/menu.png';
import aboutImage from '/images/about.png';

export default function RootLayout() {
    const location = useLocation();
    const [curpage, setcurpage] = useState("")
    useEffect(() => {
        // Extract and log the page name
        const pageName = location.pathname === '/' ? 'Dashboard' : location.pathname.replace('/', '');
        setcurpage(pageName.toUpperCase());
    }, [location]);
    return (
        <main>
            <div className="mainheader">MyReactERP || {curpage}</div>
            <div className="maincontent">
                <div className="side-menu">
                    <div className="logo"></div>
                    <NavLink to="/" className="mains"><img src={monitorImage}/>Dashboard</NavLink>
                    <NavLink to="about" className="mains"><img src={aboutImage}/>About</NavLink>
                    <div className="devider"></div>
                    <div className="channel">Cross Application</div>
                    <NavLink to="customer" className="route">Customer Master</NavLink>
                    <NavLink to="supplier" className="route">Supplier Master</NavLink>
                    <div className="devider"></div>
                    <div className="channel">Sales</div>
                    <NavLink to="sales" className="route">Sales Order</NavLink>
                    <NavLink to="collection" className="route">Collection</NavLink>
                </div>
                <div className="contentbody">
                    <Outlet />
                </div>
            </div>
            
        </main>
    );
}
