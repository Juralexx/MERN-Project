import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { UidContext } from '../AppContext';
import Conversation from './Conversation';
import Message from './Message';
import OnlineUsers from './OnlineUsers';
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux';

const Messenger = () => {
    const uid = useContext(UidContext)
    const userData = useSelector((state) => state.userReducer)
    const [conversations, setConversations] = useState([])
    const [conversationsFound, setConversationsFound] = useState(false)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState()
    const [lastMessage, setLastMessage] = useState()
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const scrollToLastMessage = useRef()
    const websocket = useRef()

    useEffect(() => {
        websocket.current = io('ws://localhost:3001')
        websocket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [])

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages(previousMessages => [...previousMessages, arrivalMessage])
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        websocket.current.emit("addUser", uid)
        websocket.current.on("getUsers", async (users) => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
                setOnlineUsers(response.data.friends.filter((f) => users.some((u) => u.userId === f.friend)))
            } catch (err) {
                console.log(err)
            }
        })
    }, [uid])

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}api/conversations/${uid}`)
                setConversations(res.data)
                setConversationsFound(true)
            } catch (err) {
                console.error(err)
            }
        }
        getConversations()
    }, [uid])

    useEffect(() => {
        const getLastConversation = () => {
            if (conversationsFound) {
                var storedArray = conversations.slice()
                const sort = storedArray.sort((a, b) => { return b.updatedAt - a.updatedAt })
                const sorted = sort.shift()
                setCurrentChat(sorted)
            }
        }
        getLastConversation()
    }, [conversations, conversationsFound])

    useEffect(() => {
        const getMessages = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}api/messages/${currentChat._id}`)
            setMessages(response.data)
            setLastMessage(messages.pop())
        }
        getMessages()
    }, [currentChat, messages])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const message = {
            sender: uid,
            sender_pseudo: userData.pseudo,
            text: newMessage,
            conversationId: currentChat._id,
        }

        const receiverId = currentChat.members.find((member) => member !== uid);

        websocket.current.emit("sendMessage", {
            senderId: uid,
            receiverId,
            text: newMessage,
        });

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}api/messages/`, message)
            setMessages([...messages, response.data])
            setNewMessage('')
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        scrollToLastMessage.current?.scrollIntoView()
    }, [messages])

    return (
        <div className="messenger">
            <div className="conversation-menu">
                <div className="conversation-menu-wrapper">
                    <input placeholder="Rechercher une conversation..." className="conversation-menu-input" />
                    {conversations.map((element, key) => {
                        return (
                            <div onClick={() => setCurrentChat(element)} key={key}>
                                <Conversation conversation={element} displayLastMessage={lastMessage} />
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="conversation-box">
                <div className="conversation-box-wrapper">
                    {currentChat ? (
                        <div className="conversation-top">
                            {messages.map((message, key) => {
                                return (
                                    <div ref={scrollToLastMessage} key={key}>
                                        <Message message={message} own={message.sender === uid} />
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <p>Créer votre première conversation pour commencer à chatter !</p>
                    )}
                    <div className="conversation-bottom">
                        <textarea className="conversation-input" placeholder="Écrire..." onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></textarea>
                        <button className="btn btn-secondary" onClick={handleSubmit}>Envoyer</button>
                    </div>
                </div>
            </div>

            <div className="online-users-container">
                <div className="online-users-wrapper">
                    <OnlineUsers onlineUsers={onlineUsers} currentId={uid} changeCurrentChat={setCurrentChat} />
                </div>
            </div>
        </div>
    );
};

export default Messenger;
