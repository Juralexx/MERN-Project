import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addMember, deleteConversation, deleteMessage, getConversation, removeMember, sendMessage, setLastMessageSeen, updateMessage } from '../../actions/messenger.action';
import { otherMembersIDs } from './tools/function';
import { EmptyDialog, EmptyGroup, NoConversation } from './tools/Empty'
import MessageDate from './MessageDate';
import Message from './Message';
import OnlineUsers from './OnlineUsers';
import ConversationHeader from './ConversationHeader';
import ConversationsMenu from './ConversationsMenu';
import ConversationBottom from './ConversationBottom';
import SearchHeader from './SearchHeader';

const Messenger = ({ uid, user, websocket, onlineUsers }) => {
    const [conversations, setConversations] = useState([])
    const [favorites, setFavorites] = useState([])
    const [currentChat, setCurrentChat] = useState({})
    const [isLoading, setLoading] = useState(true)

    const [friendsArr, setFriendsArr] = useState([])
    const [fetchedFriends, setFetchedFriends] = useState(true)

    const [searchHeader, setSearchHeader] = useState(false)
    const [blank, setBlank] = useState(false)

    const [messages, setMessages] = useState([])
    const [messagesDates, setMessagesDates] = useState([])
    const [newMessage, setNewMessage] = useState({})
    const [getNewMessage, setGetNewMessage] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState("")
    const [modifiedMessage, setModifiedMessage] = useState("")

    const [notification, setNotification] = useState("")

    const [isTyping, setTyping] = useState(false)
    const [typingContext, setTypingContext] = useState("")

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
                            setCurrentChat(sort[0])
                            setMessages(sort[0].messages)
                            getMessagesDates(sort[0].messages)
                            setLoading(false)
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
    * Websocket
    */

    useEffect(() => {
        websocket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: new Date().toISOString()
            })
            setGetNewMessage({
                sender: data.senderId,
                sender_pseudo: data.sender_pseudo,
                conversationId: data.conversationId,
                text: data.text,
                createdAt: new Date().toISOString()
            })
            setTyping(false)
            setTypingContext("")
        })
        websocket.current.on("getNotification", data => {
            setNotification({
                sender: data.senderId,
                sender_pseudo: data.sender_pseudo,
                text: data.text,
                conversationId: data.conversationId,
                createdAt: new Date().toISOString()
            })
            setTyping(false)
            setTypingContext("")
        })
    }, [websocket.current, websocket])

    /**
     * typing
     */

    useEffect(() => {
        if (currentChat) {
            function getTyping() {
                const membersId = currentChat.members.filter(member => member.id !== uid)
                let ids = []
                membersId.map(member => { return ids = [...ids, member.id] })

                ids.map(memberId => {
                    return websocket.current.emit("typing", {
                        sender: user.pseudo,
                        receiverId: memberId,
                        conversationId: currentChat._id
                    })
                })
            }

            websocket.current.on('typing', data => {
                setTyping(true)
                setTypingContext({
                    sender: data.sender,
                    conversationId: data.conversationId
                })
            })

            const quill = quillRef?.current
            quill?.addEventListener("keypress", getTyping)
            return () => quill?.removeEventListener("keypress", getTyping)
        }
    }, [currentChat, uid, user.pseudo, websocket])

    useEffect(() => {
        let interval
        if (isTyping) {
            interval = setInterval(() => { setTyping(false) }, 5000)
        } else clearInterval(interval)
        return () => clearInterval(interval)
    }, [isTyping])

    /**
     * Scroll to last message
     */

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView()
    }, [messages.length])

    /**
     * arrival message
     */

    useEffect(() => {
        arrivalMessage
            && currentChat?.members.some(member => member.id === arrivalMessage.sender)
            && (setMessages(previousMessages => [...previousMessages, arrivalMessage]))
    }, [arrivalMessage, currentChat])

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
    }, [uid, onlineUsers.length, websocket, currentChat])

    /**
     * FONCTIONS
     */

    const handleSubmit = async (conversation) => {
        if (!blank) {
            const message = {
                sender: uid,
                sender_pseudo: user.pseudo,
                sender_picture: user.picture,
                text: newMessage,
                conversationId: conversation._id,
            }
            if (conversation.type === "group") {
                otherMembersIDs(conversation, uid).map(memberId => {
                    return websocket.current.emit("sendMessage", {
                        receiverId: memberId,
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
                    message: message
                })
            }
            dispatch(sendMessage(conversation._id, message))
            setNewMessage('')
        }
    }

    const changeCurrentChat = (conversation) => {
        setLoading(true)
        websocket.current.emit("changeCurrentConversation", {
            userId: uid,
            conversationId: conversation._id
        })
        if (currentChat.messages.length > 0)
            dispatch(setLastMessageSeen(uid, currentChat._id, currentChat.messages[currentChat.messages.length - 1]._id))
        dispatch(getConversation(conversation._id))
        getMessagesDates(conversation.messages)
        setMessages(conversation.messages)
        setCurrentChat(conversation)
        setLoading(false)
    }

    const deleteConv = async (conversation) => {
        otherMembersIDs(conversation, uid).map(memberId => {
            return websocket.current.emit("deleteConversation", {
                receiverId: memberId,
                conversationId: conversation._id,
            })
        })
        dispatch(deleteConversation(conversation._id))
    }

    const addNewMember = async (conversation, member) => {
        let newMember = {
            id: member._id,
            pseudo: member.pseudo,
            picture: member.picture
        }
        dispatch(addMember(conversation._id, newMember))
        otherMembersIDs(conversation, uid).map(member => {
            return websocket.current.emit("addConversationMember", {
                receiverId: member,
                newMember: newMember,
            })
        })
        return websocket.current.emit("joinConversation", {
            receiverId: newMember._id,
            conversationId: conversation._id,
        })
    }

    const leaveConversation = async (conversation, memberId) => {
        dispatch(removeMember(conversation._id, memberId))
        otherMembersIDs(conversation, uid).map(member => {
            return websocket.current.emit("removeConversationMember", {
                receiverId: member,
                memberId: memberId,
            })
        })
        return websocket.current.emit("leaveConversation", {
            receiverId: memberId,
            conversationId: conversation._id,
        })
    }

    const removeMessage = async (message) => {
        otherMembersIDs(currentChat, uid).map(memberId => {
            return websocket.current.emit("deleteMessage", {
                receiverId: memberId,
                messageId: message._id
            })
        })
        dispatch(deleteMessage(currentChat._id, message._id))
    }

    const modifyMessage = async (message) => {
        otherMembersIDs(currentChat, uid).map(memberId => {
            return websocket.current.emit("updateMessage", {
                receiverId: memberId,
                messageId: message._id,
                text: [modifiedMessage]
            })
        })
        dispatch(updateMessage(currentChat._id, message._id, modifiedMessage))
    }

    const getMessagesDates = (messages) => {
        if (messages.length > 0) {
            let array = []
            messages.map((message, key) => {
                return array = [...array, { index: key, date: message.createdAt.substring(0, 10) }]
            })
            let filteredArray = []
            array.filter(item => {
                let i = filteredArray.findIndex(e => e.date === item.date);
                if (i <= -1) { filteredArray.push(item) }
                return null
            })
            setMessagesDates(filteredArray)
        }
    }

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
                setCurrentChat={setCurrentChat}
                changeCurrentChat={changeCurrentChat}
                setSearchHeader={setSearchHeader}
                setBlank={setBlank}
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
                                    friendsArr={friendsArr}
                                    currentChat={currentChat}
                                    deleteConversation={deleteConv}
                                    leaveConversation={leaveConversation}
                                    addNewMember={addNewMember}
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
                                />
                            )}
                            <div className="conversation-box-container" ref={convWrapperRef}>
                                {!blank ? (
                                    messages.length > 0 ? (
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
                                                            modifyMessage={modifyMessage}
                                                            setModifiedMessage={setModifiedMessage}
                                                            deleteMessage={removeMessage}
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
                conversations={conversations}
                setConversations={setConversations}
                changeCurrentChat={setCurrentChat}
                dispatch={dispatch}
            />
        </div>
    );
};

export default Messenger;