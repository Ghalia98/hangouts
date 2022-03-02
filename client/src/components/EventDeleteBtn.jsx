import axios from 'axios'
import { React } from 'react'
import { useNavigate } from 'react-router-dom'

function EventDeleteBtn({ eventId }) {
    const navigate = useNavigate()

    const deleteEventHandler = () => {
        axios.delete(`/api/events/${eventId}`)
            .then(() => {
                // redirect to homepage
                navigate('/')
            })
    }

    return (
        <>
            <button type='button' onClick={deleteEventHandler}>Delete</button>
        </>
    )
}

export default EventDeleteBtn