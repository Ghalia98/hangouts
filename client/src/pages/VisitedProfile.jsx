import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from "../context/auth";
import FavList from '../components/FavList';
import './visited-profile.css';



function VisitedProfile() {
    const { user: currentUser } = useContext(AuthContext)
    const { id } = useParams()
    const [user, setUser] = useState({})
    const [followers, setFollowers] = useState('Loading')
    const storedToken = localStorage.getItem('authToken')

    useEffect(() => {
        fetchUser()

    }, [followers])


    // useEffect(() => {
    //     setTimeout(() => {
    //         setFollowers(user.followers?.length)

    //     }, 3000)

    // }, [])


    const fetchUser = () => {
        axios.get(`/api/users/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(res => {
                setUser(res.data)
                console.log(res)
                setFollow(res.data.followers === undefined ? false : res.data.followers.includes(currentUser?._id))
                setFollowers(res.data.followers.length)
            })
            .catch(err => console.log(err))
    }

    // console.log(user)


    const [follow, setFollow] = useState(user.followers?.includes(currentUser?._id))
    // console.log('inital follow', follow)
    // console.log(user)

    useEffect(() => {
        setFollow(user.followers?.includes(currentUser?._id))
    }, [currentUser, user])


    const followHandler = () => {
        if (follow) {
            // console.log(user.followers.length)
            axios.put(`/api/users/${id}/unfollow`, { userId: currentUser?._id }, { headers: { Authorization: `Bearer ${storedToken}` } })
                .then(res => {
                    setFollowers(res.data.followers - 1)
                    console.log(res)
                })
                .catch(err => console.log(err))
        } else {
            axios.put(`/api/users/${id}/follow`, { userId: currentUser?._id }, { headers: { Authorization: `Bearer ${storedToken}` } })
                .then(res => {
                    setFollowers(res.data.followers + 1)
                    console.log(res)
                }
                )
                .catch(err => console.log(err))
        }
        setFollow(!follow)
    }
    return (
        <>
            <DisconnectedProfile user={user} currentUserId={currentUser?._id} onFollowChange={followHandler} follow={follow} />
        </>

    )
}



export function DisconnectedProfile({ user, currentUserId, onFollowChange, follow }) {

    // console.log(user?._id)
    return (
        <div style={{ color: "white" }}>
            Visited Profile
            <div>
                {/* <img src="" alt="" /> */}
                <h1>{user.name}</h1>
                <p>{user?.followers?.length} followers</p>
                {user?._id !== currentUserId &&
                    <button onClick={onFollowChange}>
                        {follow ? 'following' : 'follow'}
                    </button>
                }
            </div>
            <div className='interested-in-container'>
                {user?._id === currentUserId &&
                    < FavList userId={currentUserId} />}
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