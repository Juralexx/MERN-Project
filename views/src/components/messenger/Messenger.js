import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { MediaContext, MessengerContext } from '../AppContext';
import { useDispatch } from 'react-redux';
import { useLocationchange } from './functions/useLocationchange';
import { useGetMembers } from './functions/useGetMembers'
import { useTyping } from './functions/useTyping';
import { useCheckLocation } from './functions/useCheckLocation';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ConversationsMenu from './ConversationsMenu';
import MobileMenu from './MobileMenu';
import ConversationTools from './ConversationTools';
import ReactPlayer from 'react-player'
import ConversationBox from './ConversationBox';
import New from './New';
import { ChatLoader } from './tools/Loaders';
import { receiveCreateConversation, sendMessage, setLastMessageSeen } from '../../actions/messenger.action';
import { convertDeltaToStringNoHTML, isURLInText, otherMembersIDs, returnURLsInText } from './functions/function';
import { randomNbID } from '../Utils';
import { useFetchFriends } from '../tools/custom-hooks/useFetchFriends';

const Messenger = ({ uid, user, websocket, onlineUsers }) => {
    const [allConversations, setAllConversations] = useState([])
    const [conversations, setConversations] = useState([])
    const [favorites, setFavorites] = useState([])

    const [currentChat, setCurrentChat] = useState({})
    const [fetched, setFetched] = useState(false)

    const [temporaryConv, setTemporaryConv] = useState({})

    const [messagesDates, setMessagesDates] = useState([])
    const [newMessage, setNewMessage] = useState({})
    const [notification, setNotification] = useState({})

    const { xs, sm, md, lg } = useContext(MediaContext)
    const [rightbar, setRightbar] = useState({ state: !lg ? 'open' : 'closed', displayed: 'contacts' })

    const { friendsArr, fetchedFriends } = useFetchFriends(user)
    const { isTyping, setTyping, typingContext, setTypingContext } = useTyping(currentChat)
    const { members } = useGetMembers(uid, currentChat)

    useLocationchange(user, websocket, currentChat)
    const { isParam } = useCheckLocation()
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    /**
     * is on messenger
     */

    useEffect(() => {
        if (currentChat) {
            websocket.current.emit("onMessenger", {
                userId: uid,
                conversationId: currentChat._id
            })
        }
    }, [uid, websocket, currentChat, currentChat._id])

    /**
     * Redirection
     */

    useEffect(() => {
        if (!xs) {
            if (location.pathname === '/messenger' || location.pathname === '/messenger/') {
                if (fetched) {
                    if (user.conversations.length > 0) {
                        navigate('/messenger/' + allConversations[0]._id)
                    } else {
                        navigate('/messenger/new')
                    }
                }
            }
        }
    }, [xs, fetched, location.pathname, allConversations, user.conversations, navigate])

    /**
     * Get conversations
     */

    useEffect(() => {
        if (user && allConversations.length === 0) {
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
                            const sort = res.sort((a, b) => { return b.updatedAt.localeCompare(a.updatedAt) })
                            const favs = user.conversations.filter(conv => conv.favorite)
                            setAllConversations(sort)
                            if (favs.length > 0) {
                                setFavorites(sort.filter(conv => favs.some(fav => fav.id === conv._id)))
                                setConversations(sort.filter(conv => !favs.some(fav => fav.id === conv._id)))
                            } else {
                                setConversations(sort)
                            }
                            setTimeout(() => setFetched(true), 2000)
                        }
                    })
                } catch (err) {
                    console.error(err)
                }
            } else {
                setTimeout(() => setFetched(true), 2000)
            }
        }
    }, [user, conversations, favorites, dispatch])

    /**
     * FONCTIONS
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

    const handleSubmit = async (quill, conversation, files, shared) => {
        if (quill.getLength() > 1 || files.length > 0) {
            if (!conversation.temporary) {
                await isParam(conversation._id, '/messenger/' + conversation._id)
                postMessage(quill, conversation, files, shared)
            } else {
                let newConversation = {}
                let members = [{ _id: user._id, pseudo: user.pseudo, picture: user.picture, date: new Date().toISOString() }]
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
                    await isParam(res.data._id, '/messenger/' + res.data._id)

                    otherMembersIDs(res.data, uid).map(memberId => {
                        return websocket.current.emit("addConversation", {
                            receiverId: memberId,
                            conversationId: res.data._id
                        })
                    })
                    setTemporaryConv({})
                    setAllConversations(convs => [res.data, ...convs])
                    setConversations(convs => [res.data, ...convs])
                    changeCurrentChat(res.data)
                }).then(async () => {
                    postMessage(quill, newConversation, files, shared)
                })
            }
        } else return
    }

    const changeCurrentChat = (conversation) => {
        if (currentChat?._id !== conversation._id && currentChat?.messages?.length > 0) {
            dispatch(setLastMessageSeen(uid, currentChat._id, currentChat.messages[currentChat.messages.length - 1]._id))
        }
        if (!conversation.temporary) {
            websocket.current.emit("changeCurrentConversation", {
                userId: uid,
                conversationId: conversation._id
            })
        } else {
            setCurrentChat(conversation)
        }
    }

    /**
    * Websocket
    */

    useEffect(() => {
        websocket.current.on("getMessage", data => {
            console.log(data.message)
            setNewMessage(data.message)
            setTyping(false)
            setTypingContext({})
        })
        websocket.current.on("getNotification", data => {
            setNotification(data.message)
            setTyping(false)
            setTypingContext({})
        })
        websocket.current.on('typing', data => {
            setTyping(true)
            setTypingContext({
                sender: data.sender,
                conversationId: data.conversationId
            })
        })
    }, [websocket.current, websocket, setTyping, setTypingContext])

    return (
        <MessengerContext.Provider value={{ uid, user, websocket, friendsArr, currentChat, setCurrentChat, changeCurrentChat, dispatch, navigate, xs, sm, md, lg }}>
            <div className="messenger">
                {!xs &&
                    <ConversationsMenu
                        favorites={favorites}
                        conversations={conversations}
                        setConversations={setConversations}
                        temporaryConv={temporaryConv}
                        setTemporaryConv={setTemporaryConv}
                        fetched={fetched}
                        newMessage={newMessage}
                        notification={notification}
                        setRightbar={setRightbar}
                    />
                }
                <div className="conversation-box">
                    <div className="conversation-box-wrapper">
                        {!fetched && !xs &&
                            (location.pathname === '/messenger' || location.pathname === '/messenger/') && (
                                <ChatLoader />
                            )
                        }

                        <Routes>
                            {xs &&
                                <Route index element={
                                    <MobileMenu
                                        favorites={favorites}
                                        conversations={conversations}
                                        setConversations={setConversations}
                                        temporaryConv={temporaryConv}
                                        setTemporaryConv={setTemporaryConv}
                                        fetched={fetched}
                                        onlineUsers={onlineUsers}
                                        fetchedFriends={fetchedFriends}
                                        newMessage={newMessage}
                                        notification={notification}
                                        setRightbar={setRightbar}
                                    />
                                } />
                            }

                            <Route path=":id" element={
                                <ConversationBox
                                    conversations={allConversations}
                                    onlineUsers={onlineUsers}
                                    messagesDates={messagesDates}
                                    setMessagesDates={setMessagesDates}
                                    handleSubmit={handleSubmit}
                                    isTyping={isTyping}
                                    typingContext={typingContext}
                                    setRightbar={setRightbar}
                                />
                            } />

                            <Route path="new" element={
                                <New
                                    conversations={conversations}
                                    temporaryConv={temporaryConv}
                                    setTemporaryConv={setTemporaryConv}
                                    isTyping={isTyping}
                                    typingContext={typingContext}
                                    handleSubmit={handleSubmit}
                                    messagesDates={messagesDates}
                                    setMessagesDates={setMessagesDates}
                                />
                            } />
                        </Routes>
                    </div>
                </div>

                <ConversationTools
                    onlineUsers={onlineUsers}
                    fetchedFriends={fetchedFriends}
                    rightbar={rightbar}
                    setRightbar={setRightbar}
                    conversations={allConversations}
                    setTemporaryConv={setTemporaryConv}
                    members={members}
                />
            </div>
        </MessengerContext.Provider>
    )
}

export default Messenger;