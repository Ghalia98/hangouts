import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FavEventBox from './FavEventBox'


function FavList(prop) {
    const [favList, setFavList] = useState([])
    const storedToken = localStorage.getItem('authToken')

    // const favEventsList = favListEvents()

    // setFavListObjArr(favListEvents)
    useEffect(() => {
        if (prop.userId) {
            axios.get(`/api/users/${prop.userId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
                .then(res => {
                    setFavList(res.data.favList)
                    // console.log(favListEvents())
                })
        }

    }, [prop.userId])


    return (
        <div>
            {favList.length !== 0 &&
                <h3>Events interested in:</h3>
            }
            {favList.map((eventId, index) => {
                return <FavEventBox key={index} favEventId={eventId} />
            })}
        </div>
    )
}



export default FavList