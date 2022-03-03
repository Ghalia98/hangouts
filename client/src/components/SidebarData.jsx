import React from 'react';
import * as AiIcons from "react-icons/ai"
import * as CgIcons from "react-icons/cg"
import * as MdIcons from "react-icons/md"
import * as FiIcons from "react-icons/fi"
import * as HiIcons from "react-icons/hi"

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Profile',
        path: '/profile',
        icon: <CgIcons.CgProfile />,
        cName: 'nav-text'
    },
    {
        title: 'Create Hangout',
        path: '/',
        icon: <MdIcons.MdCreate />,
        cName: 'nav-text'
    },
    {
        title: 'Log in',
        path: '/login',
        icon: <HiIcons.HiLogin />,
        cName: 'nav-text'
    },
    {
        title: 'Sign up',
        path: '/signup',
        icon: <HiIcons.HiLogin />,
        cName: 'nav-text'
    },
    {
        title: 'Log out',
        path: '/logout',
        icon: <FiIcons.FiLogOut />,
        cName: 'nav-text'
    }

]