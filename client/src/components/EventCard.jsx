import React from 'react'
import { Link } from 'react-router-dom'

function EventCard({ title, _id }) {
    return (
        <>
            <Link to={`/events/${_id}`}>
                <h1>{title}</h1>
            </Link>
        </>
    )
}

export default EventCard