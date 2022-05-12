import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getConversation, sendMessage, setLastMessageSeen } from '../../actions/messenger.action';
import { getMessagesDates, otherMembersIDs } from './tools/function';
import { randomNbID } from '../Utils';
import { EmptyDialog, EmptyGroup, NoConversation } from './tools/Empty'
import MessageDate from './MessageDate';
import Message from './Message';
import OnlineUsers from './OnlineUsers';
import ConversationHeader from './ConversationHeader';
import ConversationsMenu from './ConversationsMenu';
import ConversationBottom from './ConversationBottom';
import SearchHeader from './SearchHeader';
import { MessageLoader } from './tools/Loaders';

const Messenger = ({ uid, user, websocket, onlineUsers }) => {
    const reducer = useSelector(state => state.messengerReducer)
    const [conversations, setConversations] = useState([])
    const [favorites, setFavorites] = useState([])
    const [currentChat, setCurrentChat] = useState({})
    const [isLoading, setLoading] = useState(true)

    const [friendsArr, setFriendsArr] = useState([])
    const [fetchedFriends, setFetchedFriends] = useState(true)

    const [searchHeader, setSearchHeader] = useState(false)
    const [blank, setBlank] = useState(false)
    const [temporaryConv, setTemporaryConv] = useState({})

    const [messages, setMessages] = useState([])
    const [messagesDates, setMessagesDates] = useState([])
    const [newMessage, setNewMessage] = useState({})
    const [getNewMessage, setGetNewMessage] = useState([])

    const lastMessageRef = useRef()
    const convWrapperRef = useRef()
    const quillRef = useRef()
    const dispatch = useDispatch()

    /**
     * get conversations
     */

    useEffect(() => {
        if (user.conversations && user.conversations.length > 0) {
            const getConversations = async () => {
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
            }
            getConversations()
        } else setLoading(false)
    }, [user.conversations, dispatch])

    /**
     * Dispatch current conversation
     */

    useEffect(() => {
        if (Object.keys(reducer).length > 0) {
            setCurrentChat(reducer)
            setMessages(reducer.messages)
            if (reducer.messages.length > 0) {
                setMessagesDates(getMessagesDates(reducer.messages))
            }
            setLoading(false)
        }
    }, [reducer])

    /**
     * Fetch friends
     */

    useEffect(() => {
        if (user.friends) {
            const fetchFriends = () => {
                try {
                    const allFriends = user.friends.map(async friend => {
                        return await axios
                            .get(`${process.env.REACT_APP_API_URL}api/user/${friend.friend}`)
                            .then(res => res.data)
                            .catch(err => console.error(err))
                    })
                    Promise.all(allFriends).then(res => {
                        setFriendsArr(res)
                        setFetchedFriends(false)
                    })
                } catch (err) {
                    console.log(err)
                }
            }
            fetchFriends()
        }
    }, [user.friends])

    /**
     * typing
     */

    const [isTyping, setTyping] = useState(false)
    const [typingContext, setTypingContext] = useState("")

    useEffect(() => {
        if (currentChat) {
            const getTyping = () => {
                otherMembersIDs(currentChat, uid).map(memberId => {
                    return websocket.current.emit("typing", {
                        sender: user.pseudo,
                        receiverId: memberId,
                        conversationId: currentChat._id
                    })
                })
            }
            const quill = quillRef?.current
            quill?.addEventListener("keypress", getTyping)
            return () => quill?.removeEventListener("keypress", getTyping)
        }
    }, [currentChat, uid, user.pseudo, websocket])

    useEffect(() => {
        let interval
        if (isTyping)
            interval = setInterval(() => { setTyping(false) }, 5000)
        else clearInterval(interval)
        return () => clearInterval(interval)
    }, [isTyping])

    /**
     * Scroll to last message
     */

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView()
    }, [messages.length])

    /**
     * Set last message seen on window close or url change
     */

    window.onbeforeunload = () => {
        if (user.conversations) {
            if (currentChat.messages.length > 0 && currentChat._id)
                dispatch(setLastMessageSeen(uid, currentChat._id, currentChat.messages[currentChat.messages.length - 1]._id))
        }
    }

    window.addEventListener('locationchange', () => {
        if (currentChat.messages.length > 0 && currentChat._id)
            dispatch(setLastMessageSeen(uid, currentChat._id, currentChat.messages[currentChat.messages.length - 1]._id))
    })

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
    }, [uid, onlineUsers.length, websocket.current, currentChat])

    /**
     * FONCTIONS
     */

    const handleSubmit = async (conversation) => {
        const message = {
            _id: randomNbID(24),
            sender: uid,
            sender_pseudo: user.pseudo,
            sender_picture: user.picture,
            text: [newMessage],
            conversationId: conversation._id,
            createdAt: new Date().toISOString()
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
            const receiver = conversation.members.find(member => member.id !== uid)
            if (conversation.waiter) {
                const removeWaiter = async () => {
                    await axios.put(`${process.env.REACT_APP_API_URL}api/conversation/${conversation._id}/remove-waiter`, { waiter: receiver.id })
                    websocket.current.emit("addConversation", {
                        receiverId: receiver.id,
                        conversation: conversation
                    })
                }
                removeWaiter()
            }
            websocket.current.emit("sendMessage", {
                receiverId: receiver.id,
                conversationId: conversation._id,
                message: message
            })
        }
        dispatch(sendMessage(conversation._id, message))
        setNewMessage('')
    }

    const changeCurrentChat = (conversation) => {
        setLoading(true)
        if (currentChat.messages.length > 0 && currentChat._id && currentChat._id !== conversation._id)
            dispatch(setLastMessageSeen(uid, currentChat._id, currentChat.messages[currentChat.messages.length - 1]._id))
        if (conversation._id) {
            if (!currentChat._id || currentChat._id !== conversation._id) {
                dispatch(getConversation(conversation._id))
                websocket.current.emit("changeCurrentConversation", {
                    userId: uid,
                    conversationId: conversation._id
                })
            }
        }
        setMessagesDates(getMessagesDates(conversation.messages))
        setMessages(conversation.messages)
        setCurrentChat(conversation)
        setLoading(false)
    }

    const onConversationClick = (conversation) => {
        dispatch(getConversation(conversation._id))
        if (searchHeader)
            setSearchHeader(false)
        setBlank(false)
    }

    /**
    * Websocket
    */

    const [notification, setNotification] = useState("")

    useEffect(() => {
        websocket.current.on("getMessage", data => {
            setGetNewMessage(data.message)
            setTyping(false)
            setTypingContext("")
        })
        websocket.current.on("getNotification", data => {
            setNotification(data.message)
            setTyping(false)
            setTypingContext("")
        })
        websocket.current.on('typing', data => {
            setTyping(true)
            setTypingContext({
                sender: data.sender,
                conversationId: data.conversationId
            })
        })
    }, [websocket.current, websocket])

    return (
        <div className="messenger">
            <ConversationsMenu
                uid={uid}
                user={user}
                websocket={websocket}
                friendsArr={friendsArr}
                conversations={conversations}
                setConversations={setConversations}
                favorites={favorites}
                currentChat={currentChat}
                setCurrentChat={setCurrentChat}
                setSearchHeader={setSearchHeader}
                setBlank={setBlank}
                onConversationClick={onConversationClick}
                getNewMessage={getNewMessage}
                notification={notification}
                isLoading={isLoading}
            />
            <div className="conversation-box">
                <div className="conversation-box-wrapper">
                    {Object.keys(currentChat).length > 0 ? (
                        <>
                            {!searchHeader ? (
                                <ConversationHeader
                                    uid={uid}
                                    user={user}
                                    websocket={websocket}
                                    friendsArr={friendsArr}
                                    currentChat={currentChat}
                                    dispatch={dispatch}
                                />
                            ) : (
                                <SearchHeader
                                    uid={uid}
                                    user={user}
                                    friendsArr={friendsArr}
                                    setCurrentChat={setCurrentChat}
                                    changeCurrentChat={changeCurrentChat}
                                    conversations={conversations.concat(favorites)}
                                    setConversations={setConversations}
                                    setBlank={setBlank}
                                    temporaryConv={temporaryConv}
                                    setTemporaryConv={setTemporaryConv}
                                />
                            )}
                            <div className="conversation-box-container" ref={convWrapperRef}>
                                {!blank ? (
                                    !isLoading ? (
                                        currentChat.messages.length > 0 ? (
                                            messages.map((message, key) => {
                                                return (
                                                    <div key={key}>
                                                        {messagesDates.some(element => element.date === message.createdAt.substring(0, 10) && element.index === key) &&
                                                            <MessageDate message={message} />
                                                        }
                                                        <div ref={lastMessageRef}>
                                                            <Message
                                                                uid={uid}
                                                                user={user}
                                                                websocket={websocket}
                                                                message={message}
                                                                own={message.sender === uid}
                                                                uniqueKey={key}
                                                                currentChat={currentChat}
                                                                dispatch={dispatch}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        ) : (
                                            currentChat.type === "dialog" ? (
                                                <EmptyDialog uid={uid} currentChat={currentChat} />
                                            ) : (
                                                <EmptyGroup uid={uid} currentChat={currentChat} />
                                            )
                                        )
                                    ) : (
                                        <MessageLoader />
                                    )
                                ) : (
                                    <></>
                                )}
                            </div>
                            <ConversationBottom
                                convWrapperRef={convWrapperRef}
                                lastMessageRef={lastMessageRef}
                                quillRef={quillRef}
                                setNewMessage={setNewMessage}
                                newMessage={newMessage}
                                handleSubmit={handleSubmit}
                                typingContext={typingContext}
                                currentChat={currentChat}
                                isTyping={isTyping}
                            />
                        </>
                    ) : (
                        <NoConversation />
                    )}
                </div>
            </div>
            <OnlineUsers
                uid={uid}
                user={user}
                onlineUsers={onlineUsers}
                friendsArr={friendsArr}
                fetchedFriends={fetchedFriends}
                conversations={conversations.concat(favorites)}
                setConversations={setConversations}
                setCurrentChat={setCurrentChat}
                changeCurrentChat={setCurrentChat}
                dispatch={dispatch}
            />
        </div>
    );
};

export default Messenger;