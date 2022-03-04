import React, { useContext } from 'react';
import FollowBtn from '../components/FollowBtn';
import { AuthContext } from "../context/auth";


function Profile() {
    const { user: currentUser } = useContext(AuthContext)
    return (
        <div style={{ color: "white" }}>
            Profile
            <div>
                {/* <img src="" alt="" /> */}
                <h1>{currentUser.name}</h1>
                <FollowBtn />
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

export default Profile