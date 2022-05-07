import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { UidContext, UserContext } from '../AppContext';
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux';
import MessageDate from './MessageDate';
import Message from './Message';
import OnlineUsers from './OnlineUsers';
import ConversationHeader from './ConversationHeader';
import ConversationsMenu from './ConversationsMenu';
import ConversationBottom from './ConversationBottom';

const Messenger = ({ websocket, friends, onlineUsers }) => {
    const uid = useContext(UidContext)
    const user = useContext(UserContext)
    const userData = useSelector((state) => state.userReducer)
    const [conversations, setConversations] = useState([])
    const [conversationsFound, setConversationsFound] = useState(false)
    
    const [currentChat, setCurrentChat] = useState(null)
    
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState({})
    const [getNewMessage, setGetNewMessage] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState("")
    const [modifiedMessage, setModifiedMessage] = useState("")
    const [messagesDates, setMessagesDates] = useState([])
    
    const [notification, setNotification] = useState("")
    
    const [isTyping, setTyping] = useState(false)
    const [typingContext, setTypingContext] = useState("")
    
    const lastMessageRef = useRef()
    const convWrapperRef = useRef()
    const quillRef = useRef()

    useEffect(() => {
        websocket.current = io('ws://localhost:3001')
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
        websocket.current.on("addConversation", data => {
            let newConversation = { conversation: data.conversation }
            setConversations(conversations => [...conversations, newConversation])
        })
        websocket.current.on("deleteConversation", data => {
            const index = conversations.findIndex(conversation => conversation._id !== data.conversationId)
            setConversations(conversations.splice(index, 1))
        })
        websocket.current.on("modifyMessage", data => {
            let object = messages.find(message => message._id === data.messageId)
            object.text = data.text
            setMessages(messages => [...messages, object])
        })
        websocket.current.on("deleteMessage", data => {
            const array = messages.filter(message => message.conversationId === data.conversationId)
            const index = array.findIndex(message => message._id === data.messageId)
            setMessages(messages.splice(index, 1))
        })
        websocket.current.on("addEmoji", data => {
            const array = messages.slice()
            let mess = array.filter(message => message._id === data.messageId)
            console.log(mess)
            mess[0].emojis.push(data.emoji)
            setMessages(messages => [...messages, mess])
        })
    }, [websocket.current])

    useEffect(() => {
        if (currentChat) {
            function getTyping() {
                const membersId = currentChat.members.filter(member => member.id !== uid)
                let ids = []
                membersId.map(member => { return ids = [...ids, member.id] })

                ids.map(memberId => {
                    return websocket.current.emit("typing", {
                        sender: userData.pseudo,
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
    }, [currentChat])

    useEffect(() => {
        let interval
        if (isTyping) {
            interval = setInterval(() => { setTyping(false) }, 5000)
        } else clearInterval(interval)
        return () => clearInterval(interval)
    }, [isTyping])

    useEffect(() => {
        arrivalMessage
            && currentChat?.members.some(member => member.id === arrivalMessage.sender)
            && (setMessages(previousMessages => [...previousMessages, arrivalMessage]))
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        if (currentChat) {
            websocket.current.emit("onMessenger", {
                userId: uid,
                conversationId: currentChat._id
            })
        }
    }, [uid, onlineUsers.length, websocket, currentChat])

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}api/conversations/${uid}`)
                const realConversations = res.data.filter(conv => conv.waiter !== uid)
                setConversations(realConversations.sort((a, b) => { return b.updatedAt.localeCompare(a.updatedAt) }))
                setConversationsFound(true)
            } catch (err) {
                console.error(err)
            }
        }
        getConversations()
    }, [uid, conversations.length])

    useEffect(() => {
        if (conversations)
            setCurrentChat(conversations[0])
    }, [conversations, conversationsFound])

    useEffect(() => {
        if (currentChat) {
            const getMessages = async () => {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}api/messages/${currentChat._id}`)
                setMessages(response.data)

                if (!arrivalMessage) {
                    let array = []
                    response.data.map((messages, key) => { return array = [...array, { index: key, date: messages.createdAt.substring(0, 10) }] })
                    let filteredArray = []
                    array.filter((item) => {
                        let i = filteredArray.findIndex(element => (element.date === item.date));
                        if (i <= -1) { filteredArray.push(item) }
                        return null;
                    });
                    setMessagesDates(filteredArray)
                }
            }
            getMessages()
        }
    }, [currentChat, messages.length, arrivalMessage])

    /*************************************************************************************** */
    /************************************ FONCTIONS **************************************** */

    const handleSubmit = async (e) => {
        const message = {
            sender: uid,
            sender_pseudo: userData.pseudo,
            sender_picture: userData.picture,
            text: newMessage,
            conversationId: currentChat._id,
        }
        if (currentChat.members.length > 2) {
            let ids = []
            currentChat.members.map(member => { return ids = [...ids, member.id] })
            ids.map(memberId => {
                return websocket.current.emit("sendMessage", {
                    senderId: uid,
                    sender_pseudo: userData.pseudo,
                    sender_picture: userData.picture,
                    receiverId: memberId,
                    text: [newMessage],
                    conversationId: currentChat._id
                })
            })

            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}api/messages/`, message)
                setMessages([...messages, response.data])
                setNewMessage('')
                setGetNewMessage(response.data)
            } catch (err) {
                console.log(err)
            }
        } else {
            const receiver = currentChat.members.find(member => member.id !== uid)
            if (currentChat.waiter === receiver.id) {
                const removeWaiter = async () => {
                    let data = { waiter: receiver.id }
                    await axios.put(`${process.env.REACT_APP_API_URL}api/conversations/${currentChat._id}/remove-waiter`, data)
                    websocket.current.emit("addConversation", {
                        receiverId: receiver.id,
                        conversation: currentChat
                    })
                }
                removeWaiter()
            }
            websocket.current.emit("sendMessage", {
                senderId: uid,
                sender_pseudo: userData.pseudo,
                sender_picture: userData.picture,
                receiverId: receiver.id,
                text: [newMessage],
                conversationId: currentChat._id
            })

            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}api/messages/`, message)
                setMessages([...messages, response.data])
                setNewMessage('')
                setGetNewMessage(response.data)
            } catch (err) {
                console.log(err)
            }
        }
    }

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView()
    }, [messages.length])

    const getMembers = (conversation) => {
        const members = conversation.members.filter(member => member.id !== uid)
        return members
    }

    const changeCurrentChat = async (conversation) => {
        const messageId = currentChat.messages[currentChat.messages.length - 1]
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/conversation/last-message-seen/${uid}`,
            data: {
                conversationId: currentChat._id,
                messageId: messageId
            },
        }).then(res => res.data).catch(err => console.log(err))
        websocket.current.emit("changeCurrentConversation", {
            userId: uid,
            conversationId: conversation._id
        })
    }

    const deleteConversation = async (element) => {
        const membersId = element.members.filter(member => member.id !== uid)
        let ids = []
        membersId.map(member => { return ids = [...ids, member.id] })

        ids.map(memberId => {
            return websocket.current.emit("deleteConversation", {
                receiverId: memberId,
                conversationId: element._id,
            })
        })

        await axios
            .delete(`${process.env.REACT_APP_API_URL}api/conversations/${element._id}`)
            .then((res) => {
                let storedArray = conversations.slice()
                let todelete = storedArray.find(conversation => conversation._id === element._id)
                storedArray.splice(todelete, 1)
                setConversations(storedArray)
            })
            .catch((err) => console.log(err))
    }

    const leaveConversation = async (element, memberId) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/conversations/${element._id}/pull`,
            data: { memberId }
        })
    }

    const addNewMember = async (element, member) => {
        let newMember = {
            id: member._id,
            pseudo: member.pseudo,
            picture: member.picture
        }
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/conversations/${element._id}/add`,
            data: { newMember }
        })
    }

    const deleteMessage = async (message) => {
        let ids = []
        currentChat.members.map(member => { return ids = [...ids, member.id] })

        ids.map(memberId => {
            return websocket.current.emit("deleteMessage", {
                receiverId: memberId,
                conversationId: currentChat._id,
                messageId: message._id
            })
        })

        await axios
            .delete(`${process.env.REACT_APP_API_URL}api/messages/${message._id}`)
            .then((res) => res.data)
            .catch((err) => console.log(err))
    }

    const modifyMessage = async (message) => {
        let ids = []
        currentChat.members.map(member => { return ids = [...ids, member.id] })
        ids.map(memberId => {
            return websocket.current.emit("modifyMessage", {
                receiverId: memberId,
                conversationId: currentChat._id,
                messageId: message._id,
                text: [modifiedMessage]
            })
        })

        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/messages/single/${message._id}`,
            data: { text: modifiedMessage }
        })
    }

    return (
        <div className="messenger">
            <ConversationsMenu
                uid={uid}
                friends={friends}
                websocket={websocket}
                setCurrentChat={setCurrentChat}
                conversations={conversations}
                setConversations={setConversations}
                changeCurrentChat={changeCurrentChat}
                getNewMessage={getNewMessage}
                notification={notification}
                user={user}
            />
            <div className="conversation-box">
                <div className="conversation-box-wrapper">
                    {currentChat ? (
                        <>
                            <ConversationHeader
                                uid={uid}
                                friends={friends}
                                getMembers={getMembers}
                                currentChat={currentChat}
                                deleteConversation={deleteConversation}
                                leaveConversation={leaveConversation}
                                addNewMember={addNewMember}
                            />
                            <div className="conversation-box-container" ref={convWrapperRef}>
                                {messages.map((message, key) => {
                                    return (
                                        <div key={key}>
                                            {messagesDates.some(element => element.date === message.createdAt.substring(0, 10) && element.index === key) && (
                                                <MessageDate message={message} />
                                            )}
                                            <div ref={lastMessageRef}>
                                                <Message
                                                    message={message}
                                                    own={message.sender === uid}
                                                    uniqueKey={key}
                                                    uid={uid}
                                                    currentChat={currentChat}
                                                    websocket={websocket}
                                                    modifyMessage={modifyMessage}
                                                    setModifiedMessage={setModifiedMessage}
                                                    deleteMessage={deleteMessage}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
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
                        <div className="conversation-box-container">
                            <p>Créer votre première conversation pour commencer à chatter !</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="online-users-container">
                <h3>Contacts</h3>
                <OnlineUsers
                    onlineUsers={onlineUsers}
                    currentId={uid}
                    user={user}
                    changeCurrentChat={setCurrentChat}
                    setConversations={setConversations}
                    conversations={conversations}
                />
            </div>
        </div>
    );
};

export default Messenger;