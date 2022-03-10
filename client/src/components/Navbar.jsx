import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as CgIcons from "react-icons/cg"
import * as MdIcons from "react-icons/md"
import * as FiIcons from "react-icons/fi"
import * as HiIcons from "react-icons/hi"
import './Navbar.css'
import { IconContext } from 'react-icons';
import { useContext } from "react";
import { AuthContext } from "../context/auth";



function Navbar() {

    const [sidebar, setSidebar] = useState(false)
    const { logoutUser, isLoggedIn, user: currentUser } = useContext(AuthContext);

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
                    <h2 className='greeting'>Hi {currentUser?.name} 👋</h2>

                    <li className='nav-text'>
                        <Link to={'/'}>
                            <AiIcons.AiFillHome />
                            <span>Home</span>
                        </Link>
                    </li>
                    {isLoggedIn &&

                        <li className='nav-text'>
                            <Link to={'/profile'}>
                                <CgIcons.CgProfile />
                                <span>Profile</span>
                            </Link>
                        </li>
                    }
                    <li className='nav-text'>
                        <Link to={'/'}>
                            <MdIcons.MdCreate />
                            <span>Create Hangout</span>
                        </Link>
                    </li>
                    {!isLoggedIn &&
                        <>
                            <li className='nav-text'>
                                <Link to={'/login'}>
                                    <HiIcons.HiLogin />
                                    <span>Log in</span>
                                </Link>
                            </li>

                            <li className='nav-text'>
                                <Link to={'/signup'}>
                                    <HiIcons.HiLogin />
                                    <span>Signup</span>
                                </Link>
                            </li>
                        </>
                    }
                    {isLoggedIn &&
                        <li className='nav-text'>
                            <Link to={'/login'} onClick={logoutUser}>
                                <FiIcons.FiLogOut />
                                <span>Log out</span>
                            </Link>
                        </li>
                    }
                </ul>
            </nav>
        </>
    )
}

export default Navbar