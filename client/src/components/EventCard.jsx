import React from 'react'
import { Link } from 'react-router-dom'
import './event-card.css'

function EventCard({ title, _id, creator }) {
    // console.log(creator)

    return (
        <>
            <Link to={`/events/${_id}`}>
                <h1>{title}</h1>
            </Link>
            <Link to={`/${creator && creator._id}/Profile`}>
                <h3>Created by:<span className="creator">{creator && creator.name}</span></h3>
            </Link>
        </>
    )
}

export default EventCard