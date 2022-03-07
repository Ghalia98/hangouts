import React, { useState, useEffect } from 'react'
import axios from 'axios'


function FavEventBox(prop) {
    const storedToken = localStorage.getItem('authToken')
    const [favEvent, setFavEvent] = useState({})
    const fetchEvent = () => {
        axios.get(`/api/events/${[prop.favEventId]}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(res => {
                setFavEvent(res.data)
            })
    }

    useEffect(() => {
        fetchEvent()
    }, [prop])

    const handleRemoveEvent = () => {
        axios.delete(`/api/events/${[prop.favEventId]}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then()
            .catch(err => console.log(err))
        fetchEvent()
    }

    return (
        <>
            {favEvent && (
                <div>
                    <span>Title:</span>
                    <p>{favEvent && favEvent.title}</p>
                    <span>Date:</span>
                    <p>{favEvent && favEvent.date}</p>
                    <span>Time:</span>
                    <p>{favEvent && favEvent.time}</p>
                    <span>Location:</span>
                    <p>{favEvent && favEvent.location}</p>
                    <button onClick={handleRemoveEvent}>remove</button>
                </div>
            )}
        </>
    )
}

export default FavEventBox