import { React, useState } from 'react';
import EventList from '../components/EventList';
import EventCreatePopup from '../components/EventCreatePopup';
import EventCreateForm from '../components/EventCreateForm';
import SearchBar from '../components/SearchBar';
import Messenger from '../components/Messenger';
import { useContext } from "react";
import { AuthContext } from "../context/auth";
import * as RiIcons from "react-icons/ri"
import { IconContext } from 'react-icons'
import './home.css'

function Home(prop) {

    const [search, setSearch] = useState('')
    const [popup, setPopup] = useState(false)
    const { isLoggedIn } = useContext(AuthContext);


    return (
        <section id='home-page'>
            <div>
                Home Page
                <SearchBar setSearch={setSearch} search={search} />
                <EventList setSearch={setSearch} search={search} />
                {isLoggedIn && (
                    <button onClick={() => setPopup(true)}>Create a Hangout</button>
                )}
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
            <div><Messenger /></div>
        </section>
    )
}

export default Home;