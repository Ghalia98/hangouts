import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

function EventCard({ title, _id }) {
    // const storedToken = localStorage.getItem('authToken')
    // axios.get(`/api/users/${creator}`, { headers: { Authorization: `Bearer ${storedToken}` } })
    // .then(user => console.log(user))
    // console.log(creator)
    return (
        <>
            <Link to={`/events/${_id}`}>
                <h1>{title}</h1>
                <h2>created by: </h2>
            </Link>
        </>
    )
}

export default EventCard