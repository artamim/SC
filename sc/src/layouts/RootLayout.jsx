import React from 'react';
import { NavLink, Outlet} from 'react-router-dom';
import '../styles/RootLayout.css';

export default function RootLayout() {
    return (
        <header>
            <nav>
                <div></div>
                <ul className="right-menu">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="about">About</NavLink></li>
                    <li><NavLink to="signout">SignOut</NavLink></li>
                </ul>
            </nav>
            <main>
                <Outlet />
            </main>
        </header>
    );
}
