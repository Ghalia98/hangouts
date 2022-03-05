import { React, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


function EventEdit() {
    // states
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [location, setLocation] = useState('')
    const [invitationList, setInvitationList] = useState('')
    const [privateSetting, setPrivateSetting] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()


    //  add time state to edit event page when you add it to the model


    useEffect(() => {
        const storedToken = localStorage.getItem('authToken')
        axios.get(`/api/events/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(res => {
                const { title, description, date, time, location, guestList, privateSetting } = res.data;
                setTitle(title);
                setDescription(description);
                setDate(date);
                setTime(time);
                setLocation(location);
                setInvitationList(guestList);
                setPrivateSetting(privateSetting);
                console.log(guestList)

            })
            .catch(err => console.log(err))

    }, [])

    const handleSubmit = e => {
        e.preventDefault();
        const reqBody = { title, description, location, date, time, guestList: invitationList.toString(), privateSetting }
        console.log(reqBody)
        const storedToken = localStorage.getItem('authToken')
        axios.put(`/api/events/${id}`, reqBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(() => {
                navigate(`/events/${id}`)
            })
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
                    <input type="checkbox" id='privateSetting' onChange={(e) => setPrivateSetting(e.target.checked)} checked={privateSetting} />
                </div>
                <button type='submit' >Save</button>
            </form>
        </>
    )
}

export default EventEdit