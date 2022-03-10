import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from "../context/auth";
import FavList from '../components/FavList';
import './visited-profile.css';
import './disconnected-profile.css'



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
        <div className="disconnected-profile">

            <div className='profile-pic-container'>
                <img src="https://images.unsplash.com/photo-1584119164246-461d43e9bab3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHw%3D&w=1000&q=80" alt="profile pic" />
            </div>
            <div className='social-media-info'>
                <div className='user-name'>
                    <h1>{user.name}</h1>
                </div>
                <div className='follow-count'>
                    <p>{user?.followers?.length} followers</p>
                    <p>{user?.following?.length} following</p>
                </div>
            </div>
            <div>
                {/* <img src="" alt="" /> */}

                {user?._id !== currentUserId &&
                    <button onClick={onFollowChange}>
                        {follow ? 'following' : 'follow'}
                    </button>
                }
            </div>
            <div className='saved-events-container'>
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