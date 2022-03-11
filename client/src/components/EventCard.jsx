import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './EventCard.css'
import { AuthContext } from "../context/auth";
import * as BsIcons from "react-icons/bs";
import { IconContext } from 'react-icons';
import { useNavigate } from 'react-router-dom';



function EventCard({ title, _id, creator, guestList }) {

    // console.log(_id)
    const { user: currentUser } = useContext(AuthContext)
    const [isFav, setIsFav] = useState(false)
    const storedToken = localStorage.getItem('authToken')
    const navigate = useNavigate()

    const handleFavList = () => {
        axios.put(`/api/users/${_id}/add/fav-list`, { userId: currentUser._id }, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(res => {
                console.log(res)
                setIsFav((isFav) => !isFav)
                navigate('/profile')

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
    }, [_id, currentUser])
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
                <>
                    <div class="card">

                        <Link to={`/events/${_id}`}>
                            <h3 class="title">{title}</h3>


                            <div class="bar">
                                <div class="emptybar"></div>
                                <div class="filledbar"></div>
                            </div>
                            <div class="circle">
                                <Link to={`/${creator && creator._id}/Profile`}>
                                    <h3>Created by:<span className="creator">{creator && creator.name}</span></h3>
                                </Link>

                            </div>
                        </Link>

                        <div className='fav-icon'>
                            <IconContext.Provider value={{ color: '#a83f39', size: '20px' }}>
                                < BsIcons.BsSuitHeart onClick={handleFavList} />
                            </IconContext.Provider>
                        </div>
                    </div>
                </>


            </>
        </>
    )

}

export default EventCard