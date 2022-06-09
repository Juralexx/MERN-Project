import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client'
import Paths from './components/routes/routes';
import { MediaContext, UidContext, UserContext } from "./components/AppContext"
import { getUser, receiveAcceptFriendRequest, receiveCancelFriendRequest, receiveDeleteFriend, receiveFriendRequest, receiveRefuseFriendRequest } from './actions/user.action';
import { receiveAcceptMemberRequest, receiveCancelMemberRequest, receiveMemberRequest, removeProjectFromMember, receiveRefuseMemberRequest, removeMember, receiveCreateTask, receiveChangeTask, receiveDeleteTask, receiveChangeTaskState, receiveUnsetAdmin, receiveSetAdmin, receiveChangeTaskStatus } from './actions/project.action';
import { receiveAddMember, receiveCreateConversation, receiveDeleteConversation, receiveDeleteMessage, receiveNewMember, receiveRemovedMember, receiveRemoveMember, receiveNewMessage, receiveUpdateMessage, receiveAddEmoji, receiveRemoveEmoji, receiveRemoveFile, receiveCustomizeUserPseudo, receiveUpdateConversationInfos, receiveUploadConversationPicture, receiveRemoveConversationPicture } from './actions/messenger.action';
import NotificationCard from './components/mini-nav/notifications/notification-card/NotificationCard';
import useMediaQuery from './components/tools/hooks/useMediaQuery';

function App() {
    const user = useSelector(state => state.userReducer)
    const [uid, setUid] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [notification, setNotification] = useState({})
    const [send, setSend] = useState(false)
    const dispatch = useDispatch()
    const websocket = useRef(io(`${process.env.REACT_APP_API_URL}`))

    const xs = useMediaQuery('(max-width: 576px)')
    const sm = useMediaQuery('(max-width: 768px)')
    const md = useMediaQuery('(max-width: 1024px)')
    const lg = useMediaQuery('(max-width: 1200px)')
    const xl = useMediaQuery('(max-width: 1366px)')

    useEffect(() => {
        const fetchToken = async () => {
            await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}jwtid`,
                withCredentials: true,
            })
                .then(res => setUid(res.data))
                .catch(err => console.error(err))
        }
        fetchToken()

        if (uid) dispatch(getUser(uid))

    }, [uid, dispatch])

    useEffect(() => {
        const socket = websocket.current
        if (Object.keys(user).length > 0) {
            socket.emit("addUser", { userId: user._id })
            socket.on("getUsers", users => {
                setOnlineUsers(user.friends.filter(f => users.some(u => u.userId === f.friend)))
            })
        }
        return () => socket.off("getUsers")
    }, [user])

    useEffect(() => {
        const socket = websocket.current
        socket.on("logout", data => {
            let online = onlineUsers.filter(u => u.friend !== data.userId)
            setOnlineUsers(online)
        })
        socket.on("sendMessageNotification", data => {
            setNotification({ type: "new-message", ...data.message })
            setSend(true)
        })
        socket.on("getMessage", data => {
            dispatch(receiveNewMessage(data.message))
        })
        socket.on("updateMessage", data => {
            dispatch(receiveUpdateMessage(data.messageId, data.text))
        })
        socket.on("deleteMessage", data => {
            dispatch(receiveDeleteMessage(data.messageId))
        })
        socket.on("deleteFile", data => {
            dispatch(receiveRemoveFile(data.messageId, data.file))
        })
        socket.on("addEmoji", data => {
            dispatch(receiveAddEmoji(data.messageId, data.emoji))
        })
        socket.on("removeEmoji", data => {
            dispatch(receiveRemoveEmoji(data.messageId, data.emojiId))
        })
        socket.on("addConversation", data => {
            dispatch(receiveCreateConversation(data.conversationId))
        })
        socket.on("updateConversation", data => {
            dispatch(receiveUpdateConversationInfos(data.name, data.description))
        })
        socket.on("updateConversationPicture", data => {
            dispatch(receiveUploadConversationPicture(data.picture))
        })
        socket.on("deleteConversationPicture", () => {
            dispatch(receiveRemoveConversationPicture())
        })
        socket.on("deleteConversation", data => {
            dispatch(receiveDeleteConversation(data.conversationId))
        })
        socket.on("addConversationMember", data => {
            dispatch(receiveNewMember(data.newMember))
        })
        socket.on("joinConversation", data => {
            dispatch(receiveAddMember(data.conversationId))
        })
        socket.on("removeConversationMember", data => {
            dispatch(receiveRemovedMember(data.memberId))
        })
        socket.on("leaveConversation", data => {
            dispatch(receiveRemoveMember(data.conversationId))
        })
        socket.on("customizeConversationPseudo", data => {
            dispatch(receiveCustomizeUserPseudo(data.userId, data.pseudo))
        })


        socket.on("friendRequest", data => {
            dispatch(receiveFriendRequest(data.notification))
            setNotification(data.notification)
            setSend(true)
        })
        socket.on("cancelFriendRequest", data => {
            dispatch(receiveCancelFriendRequest(data.type, data.requesterId))
        })
        socket.on("acceptFriendRequest", data => {
            dispatch(receiveAcceptFriendRequest(data.friend))
        })
        socket.on("refuseFriendRequest", data => {
            dispatch(receiveRefuseFriendRequest(data.userId))
        })
        socket.on("deleteFriend", data => {
            dispatch(receiveDeleteFriend(data.userId))
        })
        socket.on("memberRequest", data => {
            dispatch(receiveMemberRequest(data.notification))
            setNotification(data.notification)
            setSend(true)
        })
        socket.on("cancelMemberRequest", data => {
            dispatch(receiveCancelMemberRequest(data.notificationId))
        })
        socket.on("acceptMemberRequest", data => {
            dispatch(receiveAcceptMemberRequest(data.member, data.activity))
        })
        socket.on("refuseMemberRequest", data => {
            dispatch(receiveRefuseMemberRequest(data.userId))
        })
        socket.on("nameAdmin", data => {
            dispatch(receiveSetAdmin(data.userId, data.activity))
        })
        socket.on("removeAdmin", data => {
            dispatch(receiveUnsetAdmin(data.userId))
        })
        socket.on("removeMember", data => {
            dispatch(removeMember(data.projectId, data.memberId, data.activity))
        })
        socket.on("leaveProject", data => {
            dispatch(removeProjectFromMember(data.projectId))
        })
        socket.on("createTask", data => {
            dispatch(receiveCreateTask(data.task, data.activity))
        })
        socket.on("updateTask", data => {
            dispatch(receiveChangeTask(data.task, data.activity))
        })
        socket.on("updateTaskState", data => {
            dispatch(receiveChangeTaskState(data.taskId, data.state, data.activity))
        })
        socket.on("updateTaskStatus", data => {
            dispatch(receiveChangeTaskStatus(data.taskId, data.status, data.activity))
        })
        socket.on("deleteTask", data => {
            dispatch(receiveDeleteTask(data.taskId, data.activity))
        })
        return () => {
            socket.off("sendMessageNotification")
            socket.off("updateMessage")
            socket.off("deleteMessage")
            socket.off("deleteFile")
            socket.off("addEmoji")
            socket.off("removeEmoji")
            socket.off("addConversation")
            socket.off("updateConversation")
            socket.off("updateConversationPicture")
            socket.off("deleteConversationPicture")
            socket.off("deleteConversation")
            socket.off("addConversationMember")
            socket.off("joinConversation")
            socket.off("removeConversationMember")
            socket.off("leaveConversation")
            socket.off("customizeConversationPseudo")
            socket.off("friendRequest")
            socket.off("cancelFriendRequest")
            socket.off("acceptFriendRequest")
            socket.off("refuseFriendRequest")
            socket.off("deleteFriend")
            socket.off("memberRequest")
            socket.off("cancelMemberRequest")
            socket.off("acceptMemberRequest")
            socket.off("refuseMemberRequest")
            socket.off("nameAdmin")
            socket.off("removeAdmin")
            socket.off("removeMember")
            socket.off("leaveProject")
            socket.off("createTask")
            socket.off("updateTask")
            socket.off("updateTaskState")
            socket.off("updateTaskStatus")
            socket.off("deleteTask")
        }
    }, [websocket.current, onlineUsers, dispatch])

    return (
        <UidContext.Provider value={uid}>
            <UserContext.Provider value={user}>
                <MediaContext.Provider value={{ xs, sm, md, lg, xl }}>
                    <Paths
                        uid={uid}
                        user={user}
                        websocket={websocket}
                        onlineUsers={onlineUsers}
                    />
                    <NotificationCard
                        user={user}
                        websocket={websocket}
                        notification={notification}
                        setSend={setSend}
                        send={send}
                    />
                </MediaContext.Provider>
            </UserContext.Provider>
        </UidContext.Provider>
    )
}

export default App;