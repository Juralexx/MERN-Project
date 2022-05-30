import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getConversation, sendMessage, setLastMessageSeen } from '../../actions/messenger.action';
import { getHoursDiff, getMessagesDates, otherMembersIDs } from './functions/function';
import { randomNbID } from '../Utils';
import { EmptyDialog, EmptyGroup, NoConversation } from './tools/Empty'
import { ChatLoader } from './tools/Loaders';
import ConversationHeader from './ConversationHeader';
import ConversationsMenu from './ConversationsMenu';
import ConversationTools from './ConversationTools';
import MessageDate from './message/MessageDate';
import Message from './message/Message';
import SearchHeader from './SearchHeader';
import Editor from './editor/Editor';
import Typing from './tools/Typing'
import ScrollButton from './tools/ScrollButton'
import { MessengerContext } from '../AppContext';
import { useLocationchange } from './functions/useLocationchange';
import { useScrollToLast } from './functions/useScrollToLast';
import { useFetchFriends } from './functions/useFetchFriends';
import { useGetMembers } from './functions/useGetMembers';
import { useTyping } from './functions/useTyping';

const Messenger = ({ uid, user, websocket, onlineUsers }) => {
    const reducer = useSelector(state => state.messengerReducer)
    const [conversations, setConversations] = useState([])
    const [favorites, setFavorites] = useState([])
    const [currentChat, setCurrentChat] = useState({})
    const [isLoading, setLoading] = useState(true)

    const [searchHeader, setSearchHeader] = useState(false)
    const [blank, setBlank] = useState(false)
    const [temporaryConv, setTemporaryConv] = useState({})

    const [messagesDates, setMessagesDates] = useState([])
    const [newMessage, setNewMessage] = useState([])
    const [notification, setNotification] = useState("")

    const [tools, setTools] = useState(false)

    const lastMessageRef = useRef()
    const convWrapperRef = useRef()
    const dispatch = useDispatch()

    const { friendsArr, fetchedFriends } = useFetchFriends(user)
    const members = useGetMembers(user._id, currentChat)
    useLocationchange(user, websocket, currentChat)
    useScrollToLast(lastMessageRef)
    const { isTyping, setTyping, typingContext, setTypingContext } = useTyping(currentChat)

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
     * Get conversations
     */

    useEffect(() => {
        if (user) {
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
                            const sort = res.sort((a, b) => { return b.updatedAt.localeCompare(a.updatedAt) })
                            const favs = user.conversations.filter(conv => conv.favorite === true)
                            if (favs.length > 0) {
                                setFavorites(sort.filter(conv => favs.some(fav => fav.id === conv._id)))
                                setConversations(sort.filter(conv => !favs.some(fav => fav.id === conv._id)))
                            } else setConversations(sort)
                            dispatch(getConversation(sort[0]._id))
                        }
                    })
                } catch (err) {
                    console.error(err)
                }
            } else {
                setTimeout(() => setLoading(false), 2000)
            }
        }
    }, [user, dispatch])

    /**
     * Dispatch current conversation
     */

    useEffect(() => {
        if (Object.keys(reducer).length > 0) {
            setCurrentChat(reducer)
            if (reducer.messages.length > 0) {
                setMessagesDates(getMessagesDates(reducer.messages))
            }
            if (Object.keys(currentChat).length > 0) {
                setLoading(false)
            }
        }
    }, [reducer, currentChat])

    /**
     * FONCTIONS
     */

    const handleSubmit = (conversation, messageContent, files) => {
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
        if (files.length > 0) {
            let filesArr = []
            files.forEach((file, key) => {
                if (file.type.includes('image')) {
                    filesArr.push({
                        _id: key,
                        type: 'image',
                        name: file.name,
                        url: URL.createObjectURL(file),
                        date: new Date().toISOString(),
                        userId: user._id,
                        userPseudo: user.pseudo,
                        messageId: message._id,
                    })
                } else {
                    filesArr.push({
                        _id: key,
                        type: 'document',
                        name: file.name,
                        url: URL.createObjectURL(file),
                        date: new Date().toISOString(),
                        userId: user._id,
                        userPseudo: user.pseudo,
                        messageId: message._id,
                    })
                }
            })
            Object.assign(message, { files: filesArr })
        }
        if (conversation.type === "group") {
            otherMembersIDs(conversation, uid).map(memberId => {
                return websocket.current.emit("sendMessage", {
                    receiverId: memberId,
                    conversationId: conversation._id,
                    message: message
                })
            })
        } else {
            const receiver = conversation.members.find(member => member._id !== uid)
            websocket.current.emit("sendMessage", {
                receiverId: receiver._id,
                conversationId: conversation._id,
                message: message
            })
        }
        dispatch(sendMessage(conversation._id, message, files, user))
        setNewMessage(message)
    }

    const changeCurrentChat = (conversation) => {
        setLoading(true)
        if (currentChat.messages.length > 0 && currentChat._id && currentChat._id !== conversation._id)
            dispatch(setLastMessageSeen(uid, currentChat._id, currentChat.messages[currentChat.messages.length - 1]._id))
        if (conversation._id) {
            if (currentChat._id && currentChat._id !== conversation._id) {
                dispatch(getConversation(conversation._id))
                websocket.current.emit("changeCurrentConversation", {
                    userId: uid,
                    conversationId: conversation._id
                })
            }
        }
        setMessagesDates(getMessagesDates(conversation.messages))
        setCurrentChat(conversation)
        setLoading(false)
    }

    const onConversationClick = (conversation) => {
        changeCurrentChat(conversation)
        if (searchHeader)
            setSearchHeader(false)
        setBlank(false)
    }

    /**
    * Websocket
    */

    useEffect(() => {
        websocket.current.on("getMessage", data => {
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
        <MessengerContext.Provider value={{ uid, user, websocket, isLoading, friendsArr, currentChat, members, dispatch }}>
            <div className="messenger">
                <ConversationsMenu
                    conversations={conversations}
                    setConversations={setConversations}
                    favorites={favorites}
                    setCurrentChat={setCurrentChat}
                    changeCurrentChat={changeCurrentChat}
                    temporaryConv={temporaryConv}
                    setTemporaryConv={setTemporaryConv}
                    setSearchHeader={setSearchHeader}
                    setBlank={setBlank}
                    onConversationClick={onConversationClick}
                    newMessage={newMessage}
                    notification={notification}
                    isLoading={isLoading}
                />
                <div className="conversation-box">
                    <div className="conversation-box-wrapper">
                        {!isLoading ? (
                            Object.keys(currentChat).length > 0 ? (
                                <>
                                    {!searchHeader ? (
                                        <ConversationHeader
                                            onlineUsers={onlineUsers}
                                            setTools={setTools}
                                        />
                                    ) : (
                                        <SearchHeader
                                            setCurrentChat={setCurrentChat}
                                            changeCurrentChat={changeCurrentChat}
                                            conversations={conversations.concat(favorites)}
                                            setBlank={setBlank}
                                            temporaryConv={temporaryConv}
                                            setTemporaryConv={setTemporaryConv}
                                        />
                                    )}
                                    <div className="conversation-box-container custom-scrollbar" ref={convWrapperRef}>
                                        {!blank ? (
                                            currentChat.messages.length > 0 ? (
                                                currentChat.messages.map((message, key, array) => {
                                                    return (
                                                        <div key={key}>
                                                            {messagesDates.some(el => el.date === message.createdAt.substring(0, 10) && el.index === key) &&
                                                                <MessageDate
                                                                    messagesDates={messagesDates}
                                                                    message={message}
                                                                />
                                                            }
                                                            <div ref={lastMessageRef}>
                                                                <Message
                                                                    message={message}
                                                                    className={key > 0 && getHoursDiff(array[key - 1], message)}
                                                                    uniqueKey={key}
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            ) : (
                                                currentChat.type === "dialog" ? <EmptyDialog /> : <EmptyGroup />
                                            )
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                    <div className="conversation-bottom">
                                        <Typing 
                                            isTyping={isTyping}
                                            typingContext={typingContext}
                                            currentChat={currentChat}
                                        />
                                        <ScrollButton
                                            convWrapperRef={convWrapperRef}
                                            scrollTo={lastMessageRef}
                                        />
                                        <Editor
                                            handleSubmit={handleSubmit}
                                            isTyping={isTyping}
                                            setTyping={setTyping}
                                        />
                                    </div>
                                </>
                            ) : (
                                <NoConversation />
                            )
                        ) : (
                            <ChatLoader />
                        )}
                    </div>
                </div>
                <ConversationTools
                    onlineUsers={onlineUsers}
                    fetchedFriends={fetchedFriends}
                    setCurrentChat={setCurrentChat}
                    changeCurrentChat={changeCurrentChat}
                    tools={tools}
                    setTools={setTools}
                    conversations={conversations.concat(favorites)}
                    setConversations={setConversations}
                />
            </div>
        </MessengerContext.Provider>
    )
}

export default Messenger;