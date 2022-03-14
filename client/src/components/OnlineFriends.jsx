import axios from 'axios';
import React, { useState, useEffect } from 'react';

function OnlineFriends({ onlineUsers, currentId, setCurrentChat }) {

    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const storedToken = localStorage.getItem('authToken')



    useEffect(() => {
        console.log(currentId)

        if (currentId) {
            const getFriends = async () => {
                const res = await axios.get("/api/users/friends/" + currentId, { headers: { Authorization: `Bearer ${storedToken}` } })
                setFriends(res.data)
                console.log('res')
            }
            getFriends();
            console.log(friends)
        }
    }, [currentId])

    console.log(friends)

    useEffect(() => {
        if (onlineUsers) {
            setOnlineFriends(friends.filter(f => onlineUsers.includes(f._id)))
            console.log(onlineFriends)
        }

    }, [friends, onlineUsers])

    const handleClick = async (user) => {

        try {
            const res = await axios.get(`/api/conversations/find/${currentId}/${user._id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            console.log(res)
            setCurrentChat(res.data)
        }
        catch {

        }
    }

    return (
        <>
            <div style={{ color: '#FAEBD7' }}>OnlineFriends</div>
            {onlineFriends.map((f, index) => {
                return <p style={{ color: '#FAEBD7' }} key={index} onClick={() => handleClick(f)}>{f.name}</p>
            })}
        </>
    )
}

export default OnlineFriends