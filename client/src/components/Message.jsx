import React from 'react'
import './message.css'
import { format } from 'timeago.js'

function Message({ message, own }) {
    console.log(message)
    return (
        <>

            <div className={own ? 'message own' : 'message'}>
                <p className='message-text'>{message.text}</p>
            </div>
            <div className={own ? 'message-footer message own' : 'message-footer message'}>
                {format(message.createdAt)}
            </div>
        </>
    )
}

export default Message