import { React, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import EventDeleteBtn from '../components/EventDeleteBtn';
import GoingBtn from '../components/GoingBtn';

function EventDetails() {
    const { id } = useParams()
    const [event, setEvent] = useState(null)
    const getEvent = () => {
        const storedToken = localStorage.getItem('authToken')
        axios.get(`/api/events/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(res => setEvent(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getEvent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {event === null ? 'Loading' : <>
                <h3><strong>Title:</strong> {event.title}</h3>
                <p><strong>Date:</strong> {event.date} </p>
                <p><strong>Time:</strong> {event.time} </p>
                <p><strong> Location:</strong> {event.location}</p>
                <p><strong>Description:</strong> {event.description}</p>
                <ul><strong>GuestList:</strong> {event.guestList.map((guest, index) => <li key={index}> {guest} </li>
                )}</ul>
            </>
            }
            <Link to={`/events/${id}/edit`}>
                <button>Edit</button>
            </Link>
            <EventDeleteBtn eventId={id} />

            <GoingBtn event={event} setEvent={setEvent} eventId={id} />
        </>

    )
}

export default EventDetails