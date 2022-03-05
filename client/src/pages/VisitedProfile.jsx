import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from "../context/auth";


function VisitedProfile() {
    const { id } = useParams()
    const [user, setUser] = useState({})
    const storedToken = localStorage.getItem('authToken')

    useEffect(() => {
        fetchUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchUser = () => {
        axios.get(`/api/users/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(res => {
                setUser(res.data)
                console.log(res)
                setFollow(res.data.followers === undefined ? false : res.data.followers.includes(currentUser._id))

            })
            .catch(err => console.log(err))
    }

    // console.log(user)

    const { user: currentUser } = useContext(AuthContext)

    const [follow, setFollow] = useState(user.followers === undefined ? false : user.followers.includes(currentUser?._id))
    console.log(user)


    const followHandler = () => {
        if (follow) {
            console.log(user.followers)
            axios.put(`/api/users/${id}/unfollow`, { userId: currentUser._id }, { headers: { Authorization: `Bearer ${storedToken}` } })
                .then(res => console.log(res.data))
                .catch(err => console.log(err))
        } else {
            axios.put(`/api/users/${id}/follow`, { userId: currentUser._id }, { headers: { Authorization: `Bearer ${storedToken}` } })
                .then(res => console.log(res.data))
                .catch(err => console.log(err))
        }
        setFollow(!follow)
    }

    return (
        <div style={{ color: "white" }}>
            Visited Profile
            <div>
                {/* <img src="" alt="" /> */}

                <h1>{user.name}</h1>
                <button onClick={followHandler}>
                    {follow ? 'following' : 'follow'}
                </button>
            </div>
            <div className='my-events-container'>

            </div>
            <div className='invitations-container'>

            </div>
            <div className='followers-list-container'>

            </div>
            <div className='following-list-container'>

            </div>
        </div>
    )
}

export default VisitedProfile;