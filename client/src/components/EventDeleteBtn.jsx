import axios from 'axios'
import { React } from 'react'
import { useNavigate } from 'react-router-dom'

function EventDeleteBtn({ eventId, eventCreator }) {
    const navigate = useNavigate()
    const deleteEventHandler = () => {
        const storedToken = localStorage.getItem('authToken')
        axios.delete(`/api/events/${eventId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(() => {
                // redirect to homepage
                navigate('/')
            })
    }

    return (
        <>

            <button type='button' onClick={deleteEventHandler} className="delete btn" >Delete</button>

        </>
    )
}

export default EventDeleteBtn