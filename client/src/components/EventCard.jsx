import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './event-card.css'
import { AuthContext } from "../context/auth";
import * as BsIcons from "react-icons/bs";
import { IconContext } from 'react-icons';



function EventCard({ title, _id, creator }) {

    // console.log(_id)
    const { user: currentUser } = useContext(AuthContext)
    const [isFav, setIsFav] = useState('')
    const storedToken = localStorage.getItem('authToken')

    const handleFavList = () => {
        axios.put(`/api/users/${_id}/update/fav-list`, { userId: currentUser._id }, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(res => {
                console.log(res)
                setIsFav(true)

            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        console.log('hi')
        if (currentUser) {
            setIsFav(currentUser.favList.includes(_id))
            console.log('valueee', (currentUser.favList.includes(_id)))
            console.log(currentUser)
        }
    }, [])
    // useEffect((_id) => {
    //     if (currentUser) {
    //         axios.get(`/api/users/${currentUser._id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
    //             .then(res => {
    //                 setIsFav(res.data.favList.includes(_id))
    //             })
    //     }
    // }, [isFav])

    return (
        <>
            <>
                <Link to={`/events/${_id}`}>
                    <h1>{title}</h1>
                </Link>
                <Link to={`/${creator && creator._id}/Profile`}>
                    <h3>Created by:<span className="creator">{creator && creator.name}</span></h3>
                </Link>
                <br /> <br />

            </>
            <div className='fav-icon'>
                <IconContext.Provider value={{ color: '#a83f39', size: '20px' }}>
                    {isFav ? < BsIcons.BsSuitHeartFill onClick={handleFavList} /> : < BsIcons.BsSuitHeart onClick={handleFavList} />}
                </IconContext.Provider>
            </div>
        </>

    )

}

export default EventCard