import { React, useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from './EventCard';
import './eventList.css'

function EventList(props) {
    const [events, setEvents] = useState([])

    // get all events
    const getEvents = () => {
        const storedToken = localStorage.getItem('authToken')
        axios.get('/api/events', { headers: { Authorization: `Bearer ${storedToken}` } })
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
            <div className="grid-container">
                {events.filter(event => {
                    return event.title.toLowerCase().includes(props.search.toLowerCase())
                }).map(event => <div className="grid-item" key={event._id}> <EventCard key={event._id} {...event} /> </div>)}
            </div>
        </>
    )
}

export default EventList