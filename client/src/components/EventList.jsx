import { React, useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from './EventCard';

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
            {events.map(event => <EventCard key={event._id} {...event} />)}
        </>
    )
}

export default EventList