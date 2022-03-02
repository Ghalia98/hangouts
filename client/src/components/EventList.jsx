import { React, useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from './EventCard';

function EventList() {
    const [events, setEvents] = useState([])

    // get all events
    useEffect(() => {
        axios.get('/api/events')
            .then(res => {
                console.log(res.data)
                setEvents(res.data)
                // setEvents[res]
            })
    }, [])
    return (
        <>
            {events.map(event => <EventCard key={event._id} {...event} />)}
        </>
    )
}

export default EventList