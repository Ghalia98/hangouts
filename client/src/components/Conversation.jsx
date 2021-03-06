import axios from 'axios'
import React, { useState, useEffect } from 'react'

function Conversation({ conversation, currentUser }) {
    const [user, setUser] = useState(null)
    const storedToken = localStorage.getItem('authToken')
    useEffect(() => {
        if (conversation) {
            const friendId = conversation.members.find(memberId => memberId !== currentUser._id)
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




    return (
        <div className='convo'>
            {user &&
                <h3 className='conv-name'>{user.name}</h3>
            }
        </div>
    )
}

export default Conversation