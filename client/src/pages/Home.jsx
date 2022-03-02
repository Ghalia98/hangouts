import { React, useState } from 'react';
import EventList from '../components/EventList';
import EventCreatePopup from '../components/EventCreatePopup';
import EventCreateForm from '../components/EventCreateForm';

function Home() {

    const [popup, setPopup] = useState(false)

    return (
        <>
            Home Page
            <EventList />
            <button onClick={() => setPopup(true)}>Create a Hangout</button>
            <EventCreatePopup trigger={popup} setTrigger={setPopup}>
                <h2>Create a Hangout</h2>
                <EventCreateForm />
            </EventCreatePopup>

        </>
    )
}

export default Home;