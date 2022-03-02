import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EventDeleteBtn from '../components/EventDeleteBtn';

function EventDetails() {
    const { id } = useParams()
    const [event, setEvent] = useState(null)
    const getEvent = () => {
        axios.get(`/api/events/${id}`)
            .then(res => setEvent(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getEvent();
    }, [])

    return (
        <>
            {event === null ? 'Loading' : <>
                <h3><strong>Title:</strong> {event.title}</h3>
                <p><strong> Location:</strong> {event.location}</p>
                <p><strong>Date:</strong> {event.date} </p>
                <p><strong>Description:</strong> {event.description}</p>
                <ul><strong>GuestList:</strong> {event.guestList.map((guest, index) => <li key={index}> {guest} </li>
                )}</ul>
            </>
            }
            <EventDeleteBtn eventId={id} />
        </>

    )
}

export default EventDetails