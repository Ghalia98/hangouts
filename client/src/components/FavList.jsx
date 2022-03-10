import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FavEventBox from './FavEventBox';
import './FavList.css'


function FavList(prop) {
    const [favList, setFavList] = useState([])
    const storedToken = localStorage.getItem('authToken')
    const [isEditOn, setIsEditOn] = useState(false)

    // const favEventsList = favListEvents()

    // setFavListObjArr(favListEvents)
    const displayFavList = () => {
        if (prop.userId) {
            axios.get(`/api/users/${prop.userId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
                .then(res => {
                    setFavList(res.data.favList)
                    // console.log(favListEvents())
                })
        }
    }
    const handleEditList = () => {
        setIsEditOn((isEditOn) => !isEditOn)
    }
    useEffect(() => {

        displayFavList()

    }, [prop.userId])


    return (
        <div>
            {favList.length !== 0 && (
                <>
                    <h3>Saved Events:</h3>
                    <button className='edit-fav-list-button' onClick={handleEditList}>Edit</button>
                </>
            )

            }
            {favList.map((eventId, index) => {
                return <FavEventBox key={index} favEventId={eventId} displayFavList={displayFavList} setFavList={setFavList} favList={favList} isEditOn={isEditOn} />
            })}
        </div>
    )
}



export default FavList