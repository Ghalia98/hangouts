import React, { useContext } from 'react';
// import * as IoIcons from "react-icons/io";
import axios from 'axios';
// import { IconContext } from 'react-icons'
// import { useState } from 'react';
import { AuthContext } from "../context/auth";


function GoingBtn(props) {
    // const [invitationList, setInvitationList] = useState('')
    // const [goingList, setGoingList] = useState('')
    const { user: currentUser } = useContext(AuthContext)

    const updateGoingList = () => {
        const storedToken = localStorage.getItem('authToken')
        axios.put(`/api/events/${props.eventId}/update/going-list`, { currentUserName: currentUser.name }, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err))

        console.log(props.event)
    }


    const handleGoingList = () => {
        updateGoingList()
    }
    return (
        <>
            {/* <IoIcons.IoAddOutline /> */}
            <button onClick={handleGoingList}>Going</button>
        </>
    )
}

export default GoingBtn