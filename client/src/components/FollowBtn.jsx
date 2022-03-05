// import axios from 'axios';
// import React, { useEffect, useState, useContext } from 'react';
// import { AuthContext } from "../context/auth";


// function FollowBtn(props) {
//     const { user: currentUser } = useContext(AuthContext)
//     const storedToken = localStorage.getItem('authToken')

//     const [follow, setFollow] = useState(props.visitedUser.followers === undefined ? false : props.visitedUser.followers.includes(currentUser._id))
//     console.log(props.visitedUser)


//     const followHandler = () => {
//         if (follow) {
//             console.log(props.visitedUser.followers)
//             axios.put(`/api/users/${props.visitedUserId}/unfollow`, { userId: currentUser._id }, { headers: { Authorization: `Bearer ${storedToken}` } })
//                 .then(res => console.log(res.data))
//                 .catch(err => console.log(err))
//         } else {
//             axios.put(`/api/users/${props.visitedUserId}/follow`, { userId: currentUser._id }, { headers: { Authorization: `Bearer ${storedToken}` } })
//                 .then(res => console.log(res.data))
//                 .catch(err => console.log(err))
//         }
//         setFollow(!follow)

//     }




//     // useEffect(() => {
//     //     const getFriends = async () => {
//     //         try {
//     //             const friendList = await axios.get("/users/friends/" + user._id);
//     //             setFriends(friendList.data);
//     //         } catch (err) {
//     //             console.log(err);
//     //         }
//     //     };
//     //     getFriends();
//     // }, [user]);

//     // const handleClick = async () => {
//     //     try {
//     //         if (followed) {
//     //             await axios.put(`/users/${user._id}/unfollow`, {
//     //                 userId: currentUser._id,
//     //             });
//     //             dispatch({ type: "UNFOLLOW", payload: user._id });
//     //         } else {
//     //             await axios.put(`/users/${user._id}/follow`, {
//     //                 userId: currentUser._id,
//     //             });
//     //             dispatch({ type: "FOLLOW", payload: user._id });
//     //         }
//     //         setFollowed(!followed);
//     //     } catch (err) {
//     //     }
//     // };
//     return (
//         <div>
//             <button onClick={followHandler}>
//                 {follow ? 'following' : 'follow'}
//             </button>
//         </div>
//     )
// }

// export default FollowBtn