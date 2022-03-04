import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../context/auth";


function FollowBtn() {
    const { user: currentUser } = useContext(AuthContext)
    const followHandler = () => {
        // axios.put(`/api/users/${currentUser.id}/follow`,)
        //     .then()
        //     .catch(err => console.log(err))
    }
    return (
        <div>
            <button onClick={followHandler}>Follow</button>
        </div>
    )
}

export default FollowBtn