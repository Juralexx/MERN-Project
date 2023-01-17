import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client'
import Paths from './components/routes/routes';
import { MediaContext, UidContext, UserContext } from "./components/AppContext"
import { getUser, receiveAcceptContactRequest, receiveCancelContactRequest, receiveDeleteContact, receiveContactRequest, receiveRefuseContactRequest } from './reducers/user.action';
import { receiveAcceptMemberRequest, receiveCancelMemberRequest, receiveMemberRequest, removeProjectFromMember, receiveRefuseMemberRequest, removeMember, receiveCreateTask, receiveChangeTask, receiveDeleteTask, receiveChangeTaskState, receiveUnsetAdmin, receiveSetAdmin, receiveChangeTaskStatus, receiveCreateQNA, receiveUpdateQNA, receiveDeleteQNA, receiveCreateActuality, receiveUpdateActuality, receiveDeleteActuality } from './reducers/project.action';
import { receiveAddMember, receiveCreateConversation, receiveDeleteConversation, receiveDeleteMessage, receiveNewMember, receiveRemovedMember, receiveRemoveMember, receiveNewMessage, receiveUpdateMessage, receiveAddEmoji, receiveRemoveEmoji, receiveRemoveFile, receiveCustomizeUserPseudo, receiveUpdateConversationInfos, receiveUploadConversationPicture, receiveRemoveConversationPicture } from './reducers/messenger.action';
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

        if (uid) {
            dispatch(getUser(uid))
        }

    }, [uid, dispatch])

    useEffect(() => {
        if (Object.keys(user).length > 0) {
            websocket.current.emit("addUser", { userId: user._id })
            websocket.current.on("getUsers", users => {
                setOnlineUsers(user.contacts.filter(contact => users.some(user => user.userId === contact._id)))
            })
        }
        return () => websocket.current.off("getUsers")
    }, [user])

    useEffect(() => {
        websocket.current.on("logout", data => {
            let online = onlineUsers.filter(user => user._id !== data.userId)
            setOnlineUsers(online)
        })
        websocket.current.on("sendMessageNotification", data => {
            setNotification({ type: "new-message", ...data.message })
            setSend(true)
        })
        websocket.current.on("getMessage", data => {
            dispatch(receiveNewMessage(data.message))
        })
        websocket.current.on("updateMessage", data => {
            dispatch(receiveUpdateMessage(data.messageId, data.text))
        })
        websocket.current.on("deleteMessage", data => {
            dispatch(receiveDeleteMessage(data.messageId))
        })
        websocket.current.on("deleteFile", data => {
            dispatch(receiveRemoveFile(data.messageId, data.file))
        })
        websocket.current.on("addEmoji", data => {
            dispatch(receiveAddEmoji(data.messageId, data.emoji))
        })
        websocket.current.on("removeEmoji", data => {
            dispatch(receiveRemoveEmoji(data.messageId, data.emojiId))
        })
        websocket.current.on("addConversation", data => {
            dispatch(receiveCreateConversation(data.conversationId))
        })
        websocket.current.on("updateConversation", data => {
            dispatch(receiveUpdateConversationInfos(data.name, data.description))
        })
        websocket.current.on("updateConversationPicture", data => {
            dispatch(receiveUploadConversationPicture(data.picture))
        })
        websocket.current.on("deleteConversationPicture", () => {
            dispatch(receiveRemoveConversationPicture())
        })
        websocket.current.on("deleteConversation", data => {
            dispatch(receiveDeleteConversation(data.conversationId))
        })
        websocket.current.on("addConversationMember", data => {
            dispatch(receiveNewMember(data.newMember))
        })
        websocket.current.on("joinConversation", data => {
            dispatch(receiveAddMember(data.conversationId))
        })
        websocket.current.on("removeConversationMember", data => {
            dispatch(receiveRemovedMember(data.memberId))
        })
        websocket.current.on("leaveConversation", data => {
            dispatch(receiveRemoveMember(data.conversationId))
        })
        websocket.current.on("customizeConversationPseudo", data => {
            dispatch(receiveCustomizeUserPseudo(data.userId, data.pseudo))
        })

        websocket.current.on("contactRequest", data => {
            dispatch(receiveContactRequest(data.notification))
            setNotification(data.notification)
            setSend(true)
        })
        websocket.current.on("cancelContactRequest", data => {
            dispatch(receiveCancelContactRequest(data.type, data.requesterId))
        })
        websocket.current.on("acceptContactRequest", data => {
            dispatch(receiveAcceptContactRequest(data.contact))
        })
        websocket.current.on("refuseContactRequest", data => {
            dispatch(receiveRefuseContactRequest(data.userId))
        })
        websocket.current.on("deleteContact", data => {
            dispatch(receiveDeleteContact(data.userId))
        })

        websocket.current.on("memberRequest", data => {
            dispatch(receiveMemberRequest(data.notification))
            setNotification(data.notification)
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

        websocket.current.on("createQna", data => {
            dispatch(receiveCreateQNA(data.qna, data.activity))
        })
        websocket.current.on("updateQna", data => {
            dispatch(receiveUpdateQNA(data.qna, data.activity))
        })
        websocket.current.on("deleteQna", data => {
            dispatch(receiveDeleteQNA(data.activity))
        })

        websocket.current.on("createActuality", data => {
            dispatch(receiveCreateActuality(data.actuality, data.activity))
        })
        websocket.current.on("updateActuality", data => {
            dispatch(receiveUpdateActuality(data.actuality, data.activity))
        })
        websocket.current.on("deleteActuality", data => {
            dispatch(receiveDeleteActuality(data.actuality, data.activity))
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
        websocket.current.on("updateTaskStatus", data => {
            dispatch(receiveChangeTaskStatus(data.taskId, data.status, data.activity))
        })
        websocket.current.on("deleteTask", data => {
            dispatch(receiveDeleteTask(data.taskId, data.activity))
        })
        return () => {
            websocket.current.off("contactRequest")
            websocket.current.off("cancelContactRequest")
            websocket.current.off("acceptContactRequest")
            websocket.current.off("refuseContactRequest")

            websocket.current.off("deleteContact")

            websocket.current.off("memberRequest")
            websocket.current.off("cancelMemberRequest")
            websocket.current.off("acceptMemberRequest")
            websocket.current.off("refuseMemberRequest")

            websocket.current.off("nameAdmin")
            websocket.current.off("removeAdmin")

            websocket.current.off("removeMember")
            websocket.current.off("leaveProject")

            websocket.current.off("createQna")
            websocket.current.off("updateQna")
            websocket.current.off("deleteQna")

            websocket.current.off("createActuality")
            websocket.current.off("updateActuality")
            websocket.current.off("deleteActuality")

            websocket.current.off("createTask")
            websocket.current.off("updateTask")
            websocket.current.off("updateTaskState")
            websocket.current.off("updateTaskStatus")
            websocket.current.off("deleteTask")

            websocket.current.off("sendMessageNotification")
            websocket.current.off("getMessage")
            websocket.current.off("updateMessage")
            websocket.current.off("deleteMessage")
            websocket.current.off("deleteFile")
            websocket.current.off("addEmoji")
            websocket.current.off("removeEmoji")
            websocket.current.off("addConversation")
            websocket.current.off("updateConversation")
            websocket.current.off("updateConversationPicture")
            websocket.current.off("deleteConversationPicture")
            websocket.current.off("deleteConversation")
            websocket.current.off("addConversationMember")
            websocket.current.off("joinConversation")
            websocket.current.off("removeConversationMember")
            websocket.current.off("leaveConversation")
            websocket.current.off("customizeConversationPseudo")
        }
    }, [websocket.current, websocket, onlineUsers, dispatch])

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
                        send={send}
                        setSend={setSend}
                    />
                </MediaContext.Provider>
            </UserContext.Provider>
        </UidContext.Provider>
    )
}

export default App;