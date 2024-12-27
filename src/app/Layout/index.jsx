import React from 'react';
import './layout.scss';
import Sidebar from './Navigation/Sidebar';
import Footer from './Navigation/Footer';
import NavBar from "./Navigation/Navbar";
import {Outlet} from "react-router-dom";

function Layout() {
    return (
        <div className={'main-container'}>
            {/* <NavBar/> */}
            <NavBar/>
            <Sidebar/>
            <Footer/>
            <div className='content-block'>
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
