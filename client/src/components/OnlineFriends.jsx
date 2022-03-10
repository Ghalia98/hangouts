import axios from 'axios';
import React, { useState, useEffect } from 'react';

function OnlineFriends({ onlineUsers, currentId, setCurrentChat }) {

    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const storedToken = localStorage.getItem('authToken')



    // useEffect(() => {
    //     if (currentId) {
    //         const getFriends = async () => {
    //             const res = await axios.get("/api/users/friends/" + currentId, { headers: { Authorization: `Bearer ${storedToken}` } })
    //             setFriends(res.data)
    //             console.log('res')
    //         }
    //         getFriends();
    //         console.log(friends)
    //     }
    // }, [currentId])

    // console.log(friends)

    return (
        <div>OnlineFriends</div>
    )
}

export default OnlineFriends