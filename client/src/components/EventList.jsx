import { React, useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from './EventCard';
import './eventList.css'

function EventList() {
    const [events, setEvents] = useState([])

    // get all events
    const getEvents = () => {
        axios.get('/api/events')
            .then(res => {
                console.log(res.data)
                setEvents(res.data)
                // setEvents[res]
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getEvents()
    }, [])
    return (
        <>
            <div class="grid-container">
                {events.map(event => <div class="grid-item"> <EventCard key={event._id} {...event} /> </div>)}
            </div>
        </>
    )
}

export default EventList