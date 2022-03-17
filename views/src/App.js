import React, { useEffect, useRef, useState } from 'react';
import Index from './components/routes/index';
import { UidContext, UserContext } from "./components/AppContext"
import axios from 'axios';
import { getUser } from './actions/user.action';
import { useDispatch } from 'react-redux'
import { io } from 'socket.io-client'
import NotificationCard from './components/mini-nav/notifications/notification-card/NotificationCard';

function App() {
    const [uid, setUid] = useState(null)
    const [user, setUser] = useState(null)
    const [friends, setFriends] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sentNotification, setSentNotification] = useState({})
    const [send, setSend] = useState(false)
    const dispatch = useDispatch()
    const websocket = useRef()
    websocket.current = io('ws://localhost:3001')

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
            const fetchUser = async () => {
                await axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
                    .then((res) => setUser(res.data))
            }
            fetchUser()
        }
    }, [uid, dispatch])

    useEffect(() => {
        if (user) {
            websocket.current.emit("addUser", { userId: user._id })
            websocket.current.on("getUsers", (users) => {
                setFriends(user.friends)
                setOnlineUsers(user.friends.filter((f) => users.some((u) => u.userId === f.friend)))
            })
        }
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
            setSentNotification({
                type: data.type,
                requesterId: data.requesterId,
                requester: data.requester,
                requesterPicture: data.requesterPicture,
                createdAt: data.date
            })
            setSend(true)
        })
        websocket.current.on("sendMemberProjectRequestNotification", data => {
            setSentNotification({
                type: data.type,
                projectId: data.projectId,
                projectTitle: data.projectTitle,
                projectURL: data.projectUrl,
                requesterId: data.requesterId,
                requester: data.requester,
                requesterPicture: data.requesterPicture
            })
            setSend(true)
        })
    }, [websocket.current])

    return (
        <UidContext.Provider value={uid}>
            <UserContext.Provider value={user}>
                <Index websocket={websocket} friends={friends} onlineUsers={onlineUsers} />
                {send && <NotificationCard sentNotification={sentNotification} setSend={setSend} send={send} user={user} websocket={websocket}/>}
            </UserContext.Provider>
        </UidContext.Provider>
    );
}

export default App;