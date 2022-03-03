import { React, useState } from 'react';
import EventList from '../components/EventList';
import EventCreatePopup from '../components/EventCreatePopup';
import EventCreateForm from '../components/EventCreateForm';
import SearchBar from '../components/SearchBar';

function Home() {
    const [search, setSearch] = useState('')
    const [popup, setPopup] = useState(false)


    return (
        <>
            Home Page
            <SearchBar setSearch={setSearch} search={search} />
            <EventList setSearch={setSearch} search={search} />
            <button onClick={() => setPopup(true)}>Create a Hangout</button>
            <EventCreatePopup trigger={popup} setTrigger={setPopup}>
                <h2>Create a Hangout</h2>
                <EventCreateForm />
            </EventCreatePopup>

        </>
    )
}

export default Home;