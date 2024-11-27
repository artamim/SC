import React from 'react';
import { NavLink, Outlet} from 'react-router-dom';
import '../styles/HeaderLayout.css';

export default function HeaderLayout() {
    return (
        <header>
            <nav>
                <div></div>
                <ul className="right-menu">
                    <li><NavLink to="/">Dashboard</NavLink></li>
                    <li><NavLink to="about">About</NavLink></li>
                    <li><NavLink to="signout">SignOut</NavLink></li>
                </ul>
            </nav>
            <main>
                <div className="main-body">
                    <Outlet />
                </div>
            </main>
        </header>
    );
}
