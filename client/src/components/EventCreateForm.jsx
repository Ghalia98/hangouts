import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function EventCreateForm() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [location, setLocation] = useState('')
    const [invitationList, setInvitationList] = useState('')
    const [privateSetting, setPrivateSetting] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault();
        const reqBody = { title, description, location, date, time, guestList: invitationList.toString(), privateSetting, }
        const storedToken = localStorage.getItem('authToken')
        axios.post('/api/events', reqBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(res => navigate(`/events/${res.data._id}`))
            .catch(err => console.log(err))
    }

    return (

        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input type="text" id="title" onChange={(e) => setTitle(e.target.value)} value={title} />
                </div>
                <div>
                    <label htmlFor="date">Date: </label>
                    <input type="date" id="date" onChange={(e) => setDate(e.target.value)} value={date} />
                </div>
                <div>
                    <label htmlFor="time">Time: </label>
                    <input type="time" id="time" onChange={(e) => setTime(e.target.value)} value={time} />
                </div>
                <div>
                    <label htmlFor="location">Location: </label>
                    <input type="text" id="location" onChange={(e) => setLocation(e.target.value)} value={location} />
                </div>
                <div>
                    <label htmlFor="invitation-list">Invitation List: </label>
                    <input type="text" id="invitation-list" onChange={(e) => setInvitationList(e.target.value)} value={invitationList} />
                </div>
                <div>
                    <label htmlFor="description">Description: </label>
                    <textarea name="" id="description" cols="30" rows="10" onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
                </div>
                <div>
                    <label htmlFor="privateSetting">Private: </label>
                    <input type="checkbox" id='privateSetting' onChange={(e) => setPrivateSetting(e.target.checked)} value={privateSetting} />
                </div>
                <button type='submit' >Create</button>
            </form>
        </>
    )
}

export default EventCreateForm