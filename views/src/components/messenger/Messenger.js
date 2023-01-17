import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { MediaContext, MessengerContext } from '../AppContext';
import { useDispatch } from 'react-redux';
import { useLocationchange } from './hooks/useLocationchange';
import { useGetMembers } from './hooks/useGetMembers'
import { useTyping } from './hooks/useTyping';
import { useCheckLocation } from './hooks/useCheckLocation';
import { useFetchContacts } from '../tools/custom-hooks/useFetchContacts';
import ConversationsMenu from './ConversationsMenu';
import MobileConversationMenu from './MobileConversationMenu';
import ConversationTools from './ConversationTools';
import ReactPlayer from 'react-player'
import ConversationBox from './ConversationBox';
import New from './New';
import { ChatLoader } from './tools/Loaders';
import { receiveCreateConversation, sendMessage, setLastConversationSeen, setLastMessageSeen } from '../../reducers/messenger.action';
import { convertDeltaToStringNoHTML, otherMembersIDs } from './functions';
import { isURLInText, returnURLsInText, randomNbID } from '../Utils';

const Messenger = ({ uid, user, websocket, onlineUsers }) => {
    const [conversations, setConversations] = useState({
        allConversations: [],
        notFavorites: [],
        favorites: [],
        currentChat: {},
        temporaryConversation: {},
        messagesDates: []
    })

    const [fetched, setFetched] = useState(false)

    const [newMessage, setNewMessage] = useState({})
    const [notification, setNotification] = useState({})

    const { xs, sm, md, lg } = useContext(MediaContext)
    const [rightbar, setRightbar] = useState({ state: !lg ? 'open' : 'closed', displayed: 'contacts' })

    const { contactsArr, fetchedContacts } = useFetchContacts(user)
    const { isTyping, setTyping } = useTyping(conversations.currentChat)
    const { members } = useGetMembers(uid, conversations.currentChat)

    useLocationchange(user, websocket, conversations.currentChat)
    const { doesLocationIncludesParam } = useCheckLocation()
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    /**
     * If user has a current conversation, emit the 'onMessenger' function
     * to be online for his contacts and set the current conversation ID to the websocket.
     * Timeout is added 'cause whithout it socket user returns undefined.
     */

    useEffect(() => {
        if (conversations.currentChat) {
            let timeout = setTimeout(() => {
                websocket.current.emit("onMessenger", {
                    userId: uid,
                    conversationId: conversations.currentChat._id
                })
            }, 1000)
            return () => clearTimeout(timeout)
        }
    }, [uid, websocket, conversations.currentChat])

    /**
     * If URL = '/messenger' redirect to the last conversation user has participated to.
     * If user doesn't have a last conversation or no conversation at all, redirect to
     * the create conversation page ('/messenger/new')
     */

    useEffect(() => {
        if (!xs) {
            if (location.pathname === '/messenger' || location.pathname === '/messenger/') {
                if (fetched) {
                    if (user.conversations.length > 0) {
                        if (user.last_conversation && conversations.allConversations.some(conv => conv._id === user.last_conversation)) {
                            navigate('/messenger/' + user.last_conversation)
                        } else {
                            if (conversations.allConversations[0]._id !== user.last_conversation) {
                                navigate('/messenger/' + conversations.allConversations[0]._id)
                            } else {
                                navigate('/messenger/' + conversations.allConversations[1]._id)
                            }
                        }
                    } else {
                        navigate('/messenger/new')
                    }
                }
            }
        }
    }, [xs, fetched, location.pathname, conversations.allConversations, user.conversations, navigate])

    /**
     * Get all user conversations and store them in the 'conversations' variable :
     * - allConversations : all user conversations sorted by dates
     * - favorites : all favorites user conversations
     * - notFavorites : all others the conversations that are not favorites
     */

    useEffect(() => {
        if (Object.keys(user).length > 0) {
            if (conversations.allConversations.length === 0) {
                if (user?.conversations?.length > 0) {
                    try {
                        const promises = user.conversations.map(async conv => {
                            return await axios
                                .get(`${process.env.REACT_APP_API_URL}api/conversation/${conv.id}`)
                                .then(res => res.data)
                                .catch(err => console.error(err))
                        })
                        Promise.all(promises).then(res => {
                            if (res.length > 0) {
                                const sortedConvs = res.sort((a, b) => {
                                    return b.updatedAt.localeCompare(a.updatedAt)
                                })
                                const favorites = user.conversations.filter(conv => conv.favorite)
                                if (favorites.length > 0) {
                                    setConversations(convs => ({
                                        ...convs,
                                        allConversations: sortedConvs,
                                        notFavorites: sortedConvs.filter(conv => !favorites.some(fav => fav.id === conv._id)),
                                        favorites: sortedConvs.filter(conv => favorites.some(fav => fav.id === conv._id)),
                                    }))
                                } else {
                                    setConversations(convs => ({
                                        ...convs,
                                        allConversations: sortedConvs,
                                        notFavorites: sortedConvs
                                    }))
                                }
                                let timeout = setInterval(() => setFetched(true), 3000)
                                return () => clearInterval(timeout)
                            }
                        })
                    } catch (err) {
                        console.error(err)
                    }
                } else {
                    setTimeout(() => setFetched(true), 2000)
                }
            }
        }
    }, [user, conversations, conversations.allConversations, dispatch])

    /**
     * Post message function
     * @param {*} quill Quill editor ref
     * @param {*} conversation Conversation to post the message to
     * @param {*} files Files to upload if message contains any files
     * @param {*} shared Variable to check if the message is a shared one (response of an already posted message)
     */

    const postMessage = (quill, conversation, files, shared) => {
        let messageContent = quill.getLength() > 1 ? quill.getContents() : []

        const message = {
            _id: randomNbID(24),
            sender: uid,
            sender_pseudo: user.pseudo,
            sender_picture: user.picture,
            text: messageContent,
            conversationId: conversation._id,
            emojis: [],
            createdAt: new Date().toISOString()
        }

        if (shared) {
            Object.assign(message, { shared: shared })
        }

        let text = convertDeltaToStringNoHTML(message)

        if (isURLInText(text)) {
            let embeds = []
            returnURLsInText(text).forEach(url => {
                if (ReactPlayer.canPlay(url)) {
                    embeds.push(url)
                }
            })
            if (embeds.length > 0) {
                Object.assign(message, { embeds: embeds })
            }
        }

        let filesArr = []
        if (files.length > 0) {
            files.forEach((file, key) => {
                filesArr.push({
                    _id: message._id + key,
                    type: file.type,
                    name: file.name,
                    url: URL.createObjectURL(file),
                    date: new Date().toISOString(),
                    userId: user._id,
                    userPseudo: user.pseudo,
                    messageId: message._id,
                })
            })
        }

        dispatch(sendMessage(conversation._id, { ...message, files: filesArr }))
            .then(async () => {
                let uploads = []
                if (files.length > 0) {
                    let formData = new FormData()
                    for (let i = 0; i < files.length; i++) {
                        formData.append('files', files[i])
                    }
                    await axios
                        .put(`${process.env.REACT_APP_API_URL}api/conversation/${conversation._id}/upload-files/${message._id}/${user._id}/${user.pseudo}`, formData)
                        .then(res => {
                            uploads = res.data.files
                            files.splice(0, files.length)
                        })
                        .catch(err => console.log(err))
                }

                setNewMessage(message)

                if (quill.getLength() > 1) {
                    quill.deleteText(0, quill.getLength())
                }

                if (conversation.type === "group") {
                    otherMembersIDs(conversation, uid).map(memberId => {
                        return websocket.current.emit("sendMessage", {
                            receiverId: memberId,
                            conversationId: conversation._id,
                            message: { ...message, files: uploads }
                        })
                    })
                } else {
                    const receiver = conversation.members.find(member => member._id !== uid)
                    websocket.current.emit("sendMessage", {
                        receiverId: receiver._id,
                        conversationId: conversation._id,
                        message: { ...message, files: uploads }
                    })
                }
            })
    }

    /**
     * Handle editor function to post the message
     * @param {*} quill Quill editor ref
     * @param {*} conversation Conversation to handle submission to
     * @param {*} files Files to upload if message contains any files
     * @param {*} shared Variable to check if the message is a shared one (response of an already posted message)
     */

    const handleSubmit = async (quill, conversation, files, shared) => {
        if (quill.getLength() > 1 || files.length > 0) {
            if (!conversation.temporary) {
                await doesLocationIncludesParam(conversation._id, '/messenger/' + conversation._id)
                postMessage(quill, conversation, files, shared)
            } else {
                let newConversation = {}
                let members = [{
                    _id: user._id,
                    pseudo: user.pseudo,
                    picture: user.picture,
                    date: new Date().toISOString()
                }]
                conversation.members.map(member => {
                    return (
                        members.push({
                            _id: member._id,
                            pseudo: member.pseudo,
                            picture: member.picture,
                            date: new Date().toISOString(),
                            requester: user._id,
                            requester_pseudo: user.pseudo
                        })
                    )
                })
                await axios({
                    method: "post",
                    url: `${process.env.REACT_APP_API_URL}api/conversation/`,
                    data: {
                        type: conversation.type,
                        members: members,
                        owner: conversation.owner,
                        creator: conversation.creator
                    }
                }).then(async res => {
                    dispatch(receiveCreateConversation(res.data._id))
                    newConversation = res.data

                    setConversations(convs => ({
                        ...convs,
                        allConversations: [res.data, ...conversations.allConversations],
                        notFavorites: [res.data, ...conversations.notFavorites],
                        currentChat: res.data,
                        temporaryConversation: {}
                    }))

                    navigate('/messenger/' + res.data._id)

                    otherMembersIDs(res.data, uid).map(memberId => {
                        return websocket.current.emit("addConversation", {
                            receiverId: memberId,
                            conversationId: res.data._id
                        })
                    })
                }).then(async () => {
                    postMessage(quill, newConversation, files, shared)
                })
            }
        } else return
    }

    /**
     * Change the current chat to move to the required conversation
     * @param {*} conversation Conversation to move to
     */

    const changeCurrentChat = (conversation) => {
        let current = conversations?.currentChat
        if (current._id !== conversation._id && current?.messages?.length > 0)
            dispatch(setLastMessageSeen(
                uid,
                current._id,
                current.messages[current.messages.length - 1]._id
            ))
        if (!conversation.temporary) {
            websocket.current.emit("changeCurrentConversation", {
                userId: uid,
                conversationId: conversation._id
            })
            dispatch(setLastConversationSeen(uid, conversation._id))
        }
        else setConversations(convs => ({ ...convs, currentChat: conversation }))
    }

    /**
    * Websocket to handle to the websocket functions
    */

    useEffect(() => {
        websocket.current.on("getMessage", data => {
            setNewMessage(data.message)
            setTyping({ state: false, context: {} })
        })
        websocket.current.on("getNotification", data => {
            setNotification(data.message)
            setTyping({ state: false, context: {} })
        })
        websocket.current.on('typing', data => {
            setTyping({
                state: true,
                context: {
                    sender: data.sender,
                    conversationId: data.conversationId
                }
            })
        })
    }, [websocket.current, websocket, setTyping])

    return (
        <MessengerContext.Provider value={{
            uid,
            user,
            websocket,
            contactsArr,
            conversations,
            setConversations,
            members,
            changeCurrentChat,
            dispatch,
            navigate,
            xs, sm, md, lg
        }}>
            <div className="messenger">
                {!xs &&
                    <ConversationsMenu
                        fetched={fetched}
                        newMessage={newMessage}
                        notification={notification}
                        setRightbar={setRightbar}
                    />
                }
                <div className="conversation-box">
                    {fetched &&
                        !xs &&
                        (location.pathname === '/messenger' || location.pathname === '/messenger/') && (
                            <ChatLoader />
                        )
                    }

                    <Routes>
                        {xs &&
                            <Route index element={
                                <MobileConversationMenu
                                    fetched={fetched}
                                    onlineUsers={onlineUsers}
                                    fetchedContacts={fetchedContacts}
                                    newMessage={newMessage}
                                    notification={notification}
                                    setRightbar={setRightbar}
                                />
                            } />
                        }

                        <Route path=":id" element={
                            <ConversationBox
                                onlineUsers={onlineUsers}
                                handleSubmit={handleSubmit}
                                isTyping={isTyping}
                                setRightbar={setRightbar}
                            />
                        } />

                        <Route path="new" element={
                            <New
                                isTyping={isTyping}
                                handleSubmit={handleSubmit}
                            />
                        } />
                    </Routes>
                </div>

                <ConversationTools
                    onlineUsers={onlineUsers}
                    fetchedContacts={fetchedContacts}
                    rightbar={rightbar}
                    setRightbar={setRightbar}
                    members={members}
                />
            </div>
        </MessengerContext.Provider>
    )
}

export default Messenger;