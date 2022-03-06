import React, { useContext } from 'react';
import { AuthContext } from "../context/auth";
import { DisconnectedProfile } from './VisitedProfile';


function Profile() {
    const { user: currentUser } = useContext(AuthContext)
    // if (!currentUser) {
    //     return <div></div>
    // }
    // let name = null
    // if (currentUser) {
    //     name = currentUser.name
    // }

    return (
        // <div style={{ color: "white" }}>
        //     Profile
        //     <div>
        //         {/* <img src="" alt="" /> */}

        //         <h1>{currentUser?.name}</h1>
        //     </div>
        //     <div className='my-events-container'>

        //     </div>
        //     <div className='invitations-container'>

        //     </div>
        //     <div className='followers-list-container'>

        //     </div>
        //     <div className='following-list-container'>

        //     </div>
        // </div>
        <DisconnectedProfile user={currentUser} currentUserId={currentUser?._id} onFollowChange={() => { }} follow={true} />
    )
}

export default Profile