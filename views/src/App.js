import React, { useEffect, useRef, useState } from 'react';
import Index from './components/routes/index';
import { UidContext, UserContext } from "./components/AppContext"
import axios from 'axios';
import { getUser, receiveAcceptFriendRequest, receiveCancelFriendRequest, receiveFriendRequest } from './actions/user.action';
import { useDispatch } from 'react-redux'
import { io } from 'socket.io-client'
import NotificationCard from './components/mini-nav/notifications/notification-card/NotificationCard';
import { useSelector } from 'react-redux';
import { receiveAcceptProjectMemberRequest, receiveCancelProjectMemberRequest, receiveProjectLeaver, receiveProjectMemberRequest, removeProjectFromMember } from './actions/project.action';

function App() {
    const user = useSelector((state) => state.userReducer)
    const [uid, setUid] = useState(null)
    const [friends, setFriends] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sentNotification, setSentNotification] = useState({})
    const [send, setSend] = useState(false)
    const dispatch = useDispatch()
    const websocket = useRef()
    websocket.current = io('http://localhost:3001')

    useEffect(() => {
        const fetchToken = async () => {
            await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}jwtid`,
                withCredentials: true,
            })
                .then((res) => { setUid(res.data) })
                .catch((err) => console.log(err))
        }
        fetchToken()

        if (uid) {
            dispatch(getUser(uid))
            // const fetchUser = async () => {
            //     await axios
            //         .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
            //         .then((res) => setUser(res.data))
            // }
            // fetchUser()
        }
    }, [uid, dispatch])

    useEffect(() => {
        if (Object.keys(user).length > 0) {
            websocket.current.emit("addUser", { userId: user._id })
            websocket.current.on("getUsers", (users) => {
                setFriends(user.friends)
                setOnlineUsers(user.friends.filter((f) => users.some((u) => u.userId === f.friend)))
            })
        }
        return () => websocket.current.off("getUsers")
    }, [user])

    useEffect(() => {
        if (!window.location.href.includes("messenger")) {
            websocket.current.emit("leaveMessenger", {
                userId: uid
            })
        }
    }, [uid, websocket])

    useEffect(() => {
        websocket.current.on("sendMessageNotification", data => {
            setSentNotification({
                type: "new-message",
                sender: data.senderId,
                sender_pseudo: data.sender_pseudo,
                sender_picture: data.sender_picture,
                text: data.text,
                conversationId: data.conversationId,
                createdAt: new Date().toISOString()
            })
            setSend(true)
        })
        websocket.current.on("friendRequestNotification", data => {
            dispatch(receiveFriendRequest(data.notification))
            setSentNotification(data.notification)
            setSend(true)
        })
        websocket.current.on("cancelFriendRequestNotification", data => {
            dispatch(receiveCancelFriendRequest(data.type, data.requesterId))
        })
        websocket.current.on("acceptFriendRequest", data => {
            dispatch(receiveAcceptFriendRequest(data.friend))
        })
        websocket.current.on("sendMemberProjectRequestNotification", data => {
            dispatch(receiveProjectMemberRequest(data.notification))
            setSentNotification(data.notification)
            setSend(true)
        })
        websocket.current.on("acceptMemberProjectRequestNotification", data => {
            dispatch(receiveAcceptProjectMemberRequest(data.member))
        })
        websocket.current.on("getLeaverProject", data => {
            dispatch(receiveProjectLeaver(data.memberId))
        })
        websocket.current.on("cancelMemberProjectRequestNotification", data => {
            dispatch(receiveCancelProjectMemberRequest(data.type, data.requesterId))
        })
        websocket.current.on("leaveProject", data => {
            dispatch(removeProjectFromMember(data.projectId))
        })
        return () => {
            websocket.current.off("sendMessageNotification")
            websocket.current.off("friendRequestNotification")
            websocket.current.off("cancelFriendRequestNotification")
            websocket.current.off("acceptFriendRequest")
            websocket.current.off("sendMemberProjectRequestNotification")
            websocket.current.off("acceptMemberProjectRequestNotification")
            websocket.current.off("getLeaverProject")
            websocket.current.off("cancelMemberProjectRequestNotification")
            websocket.current.off("leaveProject")
        }
    }, [websocket.current])

    return (
        <UidContext.Provider value={uid}>
            <UserContext.Provider value={user}>
                <Index websocket={websocket} friends={friends} onlineUsers={onlineUsers} user={user} />
                {send && <NotificationCard sentNotification={sentNotification} setSend={setSend} send={send} user={user} websocket={websocket}/>}
            </UserContext.Provider>
        </UidContext.Provider>
    );
}

export default App;