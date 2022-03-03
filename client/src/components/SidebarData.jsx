import React from 'react';
import * as AiIcons from "react-icons/ai"
import * as CgIcons from "react-icons/cg"
import * as MdIcons from "react-icons/md"
import * as FiIcons from "react-icons/fi"
import * as HiIcons from "react-icons/hi"
let value = 'sonme key value'

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text',
        isPublic: true
    },
    {
        title: 'Profile',
        path: '/profile',
        icon: <CgIcons.CgProfile />,
        cName: 'nav-text',
        showToNotLoggedIn: false
    },
    {
        title: 'Create Hangout',
        path: '/',
        icon: <MdIcons.MdCreate />,
        cName: 'nav-text',
        showToNotLoggedIn: false
    },
    {
        title: 'Log in',
        path: '/login',
        icon: <HiIcons.HiLogin />,
        cName: 'nav-text',
        showToLoggedIn: false
    },
    {
        title: 'Sign up',
        path: '/signup',
        icon: <HiIcons.HiLogin />,
        cName: 'nav-text',
        showToNotLoggedIn: true
    },
    {
        title: 'Log out',
        path: '/logout',
        icon: <FiIcons.FiLogOut />,
        cName: 'nav-text',
        showToNotLoggedIn: false,
        logoutUser: value
    }

]