import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/auth';
import Conversation from './Conversation';
import Message from './Message';
import './Messenger.css';
import { io } from 'socket.io-client';


function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null)
    const { user: currentUser } = useContext(AuthContext);
    const [newMessage, setNewMessage] = useState('')
    const [socket, setSocket] = useState(null)
    const storedToken = localStorage.getItem('authToken')

    // console.log(currentUser)
    useEffect(() => {
        setSocket(io("ws://localhost:5005"))
    }, [])



    useEffect(() => {
        const fetchConvos = async () => {
            try {
                const res = await axios.get(`/api/conversations/${currentUser._id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
                setConversations(res.data)
                // console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        fetchConvos()
    }, [currentUser._id])

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get(`/api/messages/${currentChat?._id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
                setMessages(res.data)
                // console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        fetchMessages()
    }, [currentChat])
    // console.log(user)

    const handleSend = async (e) => {
        e.preventDefault();
        const message = {
            sender: currentUser._id,
            text: newMessage,
            conversationId: currentChat._id
        }

        try {
            const res = await axios.post('/api/messages', message, { headers: { Authorization: `Bearer ${storedToken}` } })
            console.log(res)
            setMessages([...messages, res.data])
            setNewMessage('')
        }
        catch (err) {
            console.log(err)
        }

    }
    return (
        <div className='row-container'>
            <div>
                <input placeholder='search for friends' />

                {conversations && conversations.map(convo => {
                    return (
                        <div onClick={() => setCurrentChat(convo)} key={convo._id} >
                            <Conversation conversation={convo} currentUser={currentUser} key={convo._id} />
                        </div>)
                })}
                <Conversation />
            </div>
            <div className='messenger-container'>
                {currentChat ?
                    <>
                        <div className='message-box'>
                            {messages.map(msg => {
                                return <Message message={msg} key={msg._id} own={msg.sender === currentUser._id} />
                            })}
                        </div>
                        {/* <div><Message /></div>
                <div><Message own={true} /></div> */}
                        <div>
                            <textarea className='chatInput' placeholder='send a message..' value={newMessage} onChange={(e) => setNewMessage(e.target.value)}></textarea>
                            <button className='chatSubmitBtn' onClick={handleSend}>Send</button>


                        </div>
                    </>
                    : <span>Start a hangout chat</span>}
            </div>
        </div>
    )
}

export default Messenger