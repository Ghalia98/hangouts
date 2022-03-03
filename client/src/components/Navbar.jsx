import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData"
import './navbar.css'
import { IconContext } from 'react-icons'

function Navbar() {
    const [sidebar, setSidebar] = useState(false)
    return (
        <>
            <div className='navbar'>
                <IconContext.Provider value={{ color: '#fff' }}>
                    <Link to="#" className={sidebar ? "hide-menu-bars" : "menu-bars"}>
                        <FaIcons.FaBars onClick={() => setSidebar(!sidebar)} />
                    </Link>
                </IconContext.Provider>
            </div>

            <nav className={sidebar ? 'nav-menu active' : 'nav-menu '}>
                <ul className='nav-menu-items' onClick={() => setSidebar(!sidebar)}>
                    <li className='navbar-toggle'>
                        <IconContext.Provider value={{ color: '#fff' }}>
                            <Link to='#' className='menu-bars'>
                                < AiIcons.AiOutlineClose />
                            </Link>
                        </IconContext.Provider>

                    </li>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </>
    )
}

export default Navbar