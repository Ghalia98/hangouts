import axios from 'axios'
import React, { useState, useEffect } from 'react'

function Conversation({ conversation, currentUser }) {
    const [user, setUser] = useState(null)
    const storedToken = localStorage.getItem('authToken')
    useEffect(() => {
        if (conversation) {
            const friendId = conversation.members.find(memberId => memberId !== currentUser?._id)
            // console.log(friendId)
            const fetchUser = async () => {
                try {
                    const res = await axios.get(`/api/users/${friendId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
                    // console.log(res)
                    setUser(res.data)
                } catch (err) {
                    console.log(err)
                }
            }
            fetchUser()
        }
    }, [currentUser, conversation])


    // console.log(user)

    return (
        <div className='convo'>
            {user &&
                <h1 className='conv-name'>{user.name}</h1>
            }
        </div>
    )
}

export default Conversation