import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { io } from 'socket.io-client'
import Index from './components/routes/index';
import { UidContext, UserContext } from "./components/AppContext"
import { getUser, receiveAcceptFriendRequest, receiveCancelFriendRequest, receiveFriendRequest, receiveRefuseFriendRequest } from './actions/user.action';
import { receiveAcceptMemberRequest, receiveCancelMemberRequest, receiveMemberRequest, removeProjectFromMember, receiveRefuseMemberRequest, removeMember, receiveCreateTask, receiveChangeTask, receiveDeleteTask, receiveChangeTaskState, receiveUnsetAdmin, receiveSetAdmin } from './actions/project.action';
import NotificationCard from './components/mini-nav/notifications/notification-card/NotificationCard';

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
                setOnlineUsers(user.friends.filter(f => users.some(u => u.userId === f.friend)))
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
        websocket.current.on("friendRequest", data => {
            dispatch(receiveFriendRequest(data.notification))
            setSentNotification(data.notification)
            setSend(true)
        })
        websocket.current.on("cancelFriendRequest", data => {
            dispatch(receiveCancelFriendRequest(data.type, data.requesterId))
        })
        websocket.current.on("acceptFriendRequest", data => {
            dispatch(receiveAcceptFriendRequest(data.friend))
        })
        websocket.current.on("refuseFriendRequest", data => {
            dispatch(receiveRefuseFriendRequest(data.userId))
        })
        websocket.current.on("memberRequest", data => {
            dispatch(receiveMemberRequest(data.notification))
            setSentNotification(data.notification)
            setSend(true)
        })
        websocket.current.on("cancelMemberRequest", data => {
            dispatch(receiveCancelMemberRequest(data.notificationId))
        })
        websocket.current.on("acceptMemberRequest", data => {
            dispatch(receiveAcceptMemberRequest(data.member, data.activity))
        })
        websocket.current.on("refuseMemberRequest", data => {
            dispatch(receiveRefuseMemberRequest(data.userId))
        })
        websocket.current.on("nameAdmin", data => {
            dispatch(receiveSetAdmin(data.userId, data.activity))
        })
        websocket.current.on("removeAdmin", data => {
            dispatch(receiveUnsetAdmin(data.userId))
        })
        websocket.current.on("removeMember", data => {
            dispatch(removeMember(data.projectId, data.memberId, data.activity))
        })
        websocket.current.on("leaveProject", data => {
            dispatch(removeProjectFromMember(data.projectId))
        })
        websocket.current.on("createTask", data => {
            dispatch(receiveCreateTask(data.task, data.activity))
        })
        websocket.current.on("updateTask", data => {
            dispatch(receiveChangeTask(data.task, data.activity))
        })
        websocket.current.on("updateTaskState", data => {
            dispatch(receiveChangeTaskState(data.taskId, data.state, data.activity))
        })
        websocket.current.on("deleteTask", data => {
            dispatch(receiveDeleteTask(data.taskId, data.activity))
        })
        return () => {
            websocket.current.off("sendMessageNotification")
            websocket.current.off("friendRequest")
            websocket.current.off("cancelFriendRequest")
            websocket.current.off("acceptFriendRequest")
            websocket.current.off("refuseFriendRequest")
            websocket.current.off("memberRequest")
            websocket.current.off("cancelMemberRequest")
            websocket.current.off("acceptMemberRequest")
            websocket.current.off("refuseMemberRequest")
            websocket.current.off("nameAdmin")
            websocket.current.off("removeAdmin")
            websocket.current.off("removeMember")
            websocket.current.off("leaveProject")
            websocket.current.off("createTask")
            websocket.current.off("updateTask")
            websocket.current.off("updateTaskState")
            websocket.current.off("deleteTask")
        }
    }, [websocket.current, dispatch])

    return (
        <UidContext.Provider value={uid}>
            <UserContext.Provider value={user}>
                <Index websocket={websocket} friends={friends} onlineUsers={onlineUsers} user={user} />
                {send && <NotificationCard sentNotification={sentNotification} setSend={setSend} send={send} user={user} websocket={websocket} />}
            </UserContext.Provider>
        </UidContext.Provider>
    );
}

export default App;