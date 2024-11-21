import React from 'react';
import { NavLink, Outlet} from 'react-router-dom';
import '../styles/SideLayout.css';

export default function RootLayout() {
    return (
        <main>
            <div className="side-menu">
                <div>Dashboard</div>
                <div>Dashboard</div>
                <div>Dashboard</div>
                <div>Dashboard</div>
                <div>Dashboard</div>
            </div>
            <div className="contentbody">
                <Outlet />
            </div>
        </main>
    );
}
