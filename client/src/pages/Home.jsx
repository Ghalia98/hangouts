import { React, useState } from 'react';
import EventList from '../components/EventList';
import EventCreatePopup from '../components/EventCreatePopup';
import EventCreateForm from '../components/EventCreateForm';
import SearchBar from '../components/SearchBar';
import Messenger from '../components/Messenger';
import { useContext } from "react";
import { AuthContext } from "../context/auth";
import * as RiIcons from "react-icons/ri"
import * as MdIcons from "react-icons/md"
import * as BsIcons from "react-icons/bs"
import { IconContext } from 'react-icons'
import './home.css'

function Home(prop) {

    const [search, setSearch] = useState('')
    const [popup, setPopup] = useState(false)
    const [chat, setChat] = useState(false)
    const { isLoggedIn } = useContext(AuthContext);


    return (
        <section id='home-page'>
            <div className='home-page-container'>
                {isLoggedIn && (
                    <>
                        <div className="action-container">
                            <IconContext.Provider value={{ size: '40px' }}>

                                <div className='create-hangout' onClick={() => setPopup(true)} >

                                    <MdIcons.MdOutlineAdd />
                                    <h3>Create Hangout</h3>



                                </div>
                                <div className='chat-btn-container' onClick={() => setChat((chat) => !chat)}>
                                    <BsIcons.BsChatRightQuote />
                                    <h3>Chat With Friends</h3>
                                </div>
                            </IconContext.Provider>
                        </div>
                    </>
                )}


                <SearchBar setSearch={setSearch} search={search} />
                <EventList setSearch={setSearch} search={search} />

                <EventCreatePopup trigger={popup} setTrigger={setPopup}>
                    <h2>Create a Hangout</h2>
                    <EventCreateForm />
                </EventCreatePopup>
                <IconContext.Provider value={{ size: '40px' }}>
                    <span className="change-bg-icon">
                        <RiIcons.RiImageEditLine onClick={prop.renderBgImg} />
                    </span>
                </IconContext.Provider>
            </div>
            {chat &&
                <div><Messenger /></div>
            }
        </section>
    )
}

export default Home;