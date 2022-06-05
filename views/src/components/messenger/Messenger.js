import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useLocationchange } from './functions/useLocationchange';
import { useFetchFriends } from './functions/useFetchFriends';
import { useGetMembers } from './functions/useGetMembers'
import { useTyping } from './functions/useTyping';
import { useCheckLocation } from './functions/useCheckLocation';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { MessengerContext } from '../AppContext';
import ConversationsMenu from './ConversationsMenu';
import ConversationTools from './ConversationTools';
import ReactPlayer from 'react-player'
import ConversationBox from './ConversationBox';
import New from './New';
import { sendMessage, setLastMessageSeen } from '../../actions/messenger.action';
import { convertDeltaToStringNoHTML, isURLInText, otherMembersIDs, returnURLsInText } from './functions/function';
import { randomNbID } from '../Utils';

const Messenger = ({ uid, user, websocket, onlineUsers }) => {
    const [conversations, setConversations] = useState([])
    const [favorites, setFavorites] = useState([])
    const [currentChat, setCurrentChat] = useState({})
    const [isLoading, setLoading] = useState(true)

    const [temporaryConv, setTemporaryConv] = useState({})

    const [messagesDates, setMessagesDates] = useState([])
    const [newMessage, setNewMessage] = useState({})
    const [notification, setNotification] = useState({})

    const [tools, setTools] = useState(false)

    const { friendsArr, fetchedFriends } = useFetchFriends(user)
    const { isTyping, setTyping, typingContext, setTypingContext } = useTyping(currentChat)
    const { members } = useGetMembers(uid, currentChat)

    useLocationchange(user, websocket, currentChat)
    const { isParam } = useCheckLocation()
    const dispatch = useDispatch()
    const location = useLocation()

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

    /**
     * Get conversations
     */

    useEffect(() => {
        if (user && conversations.length === 0 && favorites.length === 0) {
            if (user.conversations && user.conversations.length > 0) {
                try {
                    const promises = user.conversations.map(async conv => {
                        return await axios
                            .get(`${process.env.REACT_APP_API_URL}api/conversation/${conv.id}`)
                            .then(res => res.data)
                            .catch(err => console.error(err))
                    })
                    Promise.all(promises).then(res => {
                        if (res.length > 0) {
                            const sort = res.sort((a, b) => {
                                return b.updatedAt.localeCompare(a.updatedAt)
                            })
                            const favs = user.conversations.filter(conv => conv.favorite === true)
                            if (favs.length > 0) {
                                setFavorites(
                                    sort.filter(conv => favs.some(fav => fav.id === conv._id))
                                )
                                setConversations(
                                    sort.filter(conv => !favs.some(fav => fav.id === conv._id))
                                )
                            } else {
                                setConversations(sort)
                            }
                            setTimeout(() => setLoading(false), 2000)
                        }
                    })
                } catch (err) {
                    console.error(err)
                }
            } else {
                setTimeout(() => setLoading(false), 2000)
            }
        }
    }, [user, conversations, dispatch])

    /**
     * FONCTIONS
     */

    const handleSubmit = (quill, conversation, files, shared) => {
        isParam(conversation._id, '/messenger/' + conversation._id)

        if (quill.getLength() > 1 || files.length > 0) {
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

    console.log(isLoading)

    return (
        <MessengerContext.Provider value={{ uid, user, websocket, friendsArr, dispatch }}>
            <div className="messenger">
                <ConversationsMenu
                    favorites={favorites}
                    conversations={conversations}
                    setConversations={setConversations}
                    currentChat={currentChat}
                    setCurrentChat={setCurrentChat}
                    changeCurrentChat={changeCurrentChat}
                    temporaryConv={temporaryConv}
                    setTemporaryConv={setTemporaryConv}
                    isLoading={isLoading}
                    newMessage={newMessage}
                    notification={notification}
                />

                <Routes>
                    {!isLoading &&
                        conversations.length > 0 ? (
                            <Route path="*" element={<Navigate to={conversations[0]?._id} />} />
                        ) : (
                            <Route path="*" element={<Navigate to='new' />} />
                        )
                    }

                    <Route path=":id" element={
                        <ConversationBox
                            isLoading={isLoading}
                            currentChat={currentChat}
                            setCurrentChat={setCurrentChat}
                            onlineUsers={onlineUsers}
                            messagesDates={messagesDates}
                            setMessagesDates={setMessagesDates}
                            handleSubmit={handleSubmit}
                            typingContext={typingContext}
                            isTyping={isTyping}
                            setTools={setTools}
                        />
                    } />

                    <Route path="new" element={
                        <New
                            conversations={conversations}
                            currentChat={currentChat}
                            setCurrentChat={setCurrentChat}
                            changeCurrentChat={changeCurrentChat}
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

                <ConversationTools
                    onlineUsers={onlineUsers}
                    fetchedFriends={fetchedFriends}
                    setCurrentChat={setCurrentChat}
                    changeCurrentChat={changeCurrentChat}
                    tools={tools}
                    setTools={setTools}
                    conversations={conversations.concat(favorites)}
                    setConversations={setConversations}
                    currentChat={currentChat}
                    members={members}
                />
            </div>
        </MessengerContext.Provider>
    )
}

export default Messenger;