import React, { useContext } from 'react';
import { AuthContext } from "../context/auth";
import { DisconnectedProfile } from './VisitedProfile';
import './Profile.css'

function Profile() {
    const { user: currentUser } = useContext(AuthContext)
    return (

        <DisconnectedProfile user={currentUser} currentUserId={currentUser?._id} onFollowChange={() => { }} follow={true} />
    )
}

export default Profile