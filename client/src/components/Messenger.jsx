import axios from 'axios';
import React, { useContext, useState, useEffect, useRef } from 'react';
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
    const [receivedMessage, setReceivedMessage] = useState(null)
    const socket = useRef()
    const storedToken = localStorage.getItem('authToken')

    // console.log(currentUser)

    useEffect(() => {
        socket.current = io("ws://localhost:5005");
        socket.current.on("getMessage", data => {
            setReceivedMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })

    }, [])

    useEffect(() => {
        receivedMessage && currentChat?.members.includes(receivedMessage.sender) &&
            setMessages((old) => [...old, receivedMessage]);
    }, [receivedMessage, currentChat])

    useEffect(() => {
        if (currentUser) {
            socket.current.emit("addUser", currentUser?._id);
            socket.current.on("getUsers", users => {
                console.log(users)
            })
        }
    }, [currentUser])

    useEffect(() => {
        if (currentUser) {
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
        }
    }, [currentUser?._id])

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
        if (currentUser) {
            e.preventDefault();
            const message = {
                sender: currentUser?._id,
                text: newMessage,
                conversationId: currentChat._id
            }

            const receiverId = currentChat.members.find(member => member !== currentUser._id)
            socket.current.emit("sendMessage", {
                senderId: currentUser?._id,
                receiverId,
                text: newMessage
            })

            try {
                const res = await axios.post("/api/messages", message, { headers: { Authorization: `Bearer ${storedToken}` } });
                setMessages([...messages, res.data]);
                setNewMessage("");
            }
            catch (err) {
                console.log(err)
            }
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