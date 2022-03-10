import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../context/auth";
import { IoMdRemoveCircle } from "react-icons/io";
import { BiDetail } from 'react-icons/bi'
import { IconContext } from 'react-icons';
import './FavEventBox.css'
import { Navigate, useNavigate } from 'react-router-dom';


function FavEventBox(props) {
    const { user: currentUser } = useContext(AuthContext)
    const storedToken = localStorage.getItem('authToken')
    const [favEvent, setFavEvent] = useState({})
    const navigate = useNavigate()
    const fetchEvent = () => {
        axios.get(`/api/events/${props.favEventId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(res => {
                setFavEvent(res.data)
            })
    }

    useEffect(() => {

        fetchEvent()
        // props.displayFavList()


    }, [props.favEventId])

    useEffect(() => {
        props.displayFavList()
    }, [favEvent])



    const handleRemoveEvent = () => {
        axios.put(`/api/users/${props.favEventId}/remove/fav-list`, { userId: currentUser._id }, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(
                fetchEvent()
            )
            .catch(err => console.log(err))
    }


    const handleNavToEvent = () => {
        navigate(`/events/${props.favEventId}`)
    }

    // console.log(isEditOn)

    return (
        <>

            {favEvent && (
                <div className='details-container'>

                    {props?.isEditOn ?
                        <IconContext.Provider value={{ color: 'rgba(0, 0, 0, 0.671)', size: '22px' }} >
                            <IoMdRemoveCircle className='remove-icon' onClick={handleRemoveEvent} />
                        </IconContext.Provider>
                        : <IconContext.Provider value={{ color: 'rgba(0, 0, 0, 0.6)', size: '22px' }} >
                            <BiDetail className='view-details-icon' onClick={handleNavToEvent} />
                        </IconContext.Provider>}
                    <p>Event: {favEvent && favEvent.title}</p>
                    <p>Date: {favEvent && favEvent.date}</p>
                    <p>Time: {favEvent && favEvent.time}</p>
                    <p>Location: {favEvent && favEvent.location}</p>
                </div>
            )}
        </>
    )
}

export default FavEventBox