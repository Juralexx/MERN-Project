import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { UidContext } from '../AppContext';
import Conversation from './Conversation';
import Message from './Message';
import OnlineUsers from './OnlineUsers';
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux';
import NewConversationModal from './NewConversationModal';
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { FaTrashAlt } from 'react-icons/fa'
import { ThreeDots } from 'react-loading-icons'
import EmojiPicker from './EmojiPicker';

import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./editor/EditorToolbar";
import { IoSend } from 'react-icons/io5'
import { BsEmojiSmile } from 'react-icons/bs'
import { BiFontFamily } from 'react-icons/bi'
import { FiAtSign } from 'react-icons/fi'

const Messenger = () => {
    const avatar = (props) => {
        return ({
            backgroundImage: `url(${props})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
        })
    }
    const uid = useContext(UidContext)
    const userData = useSelector((state) => state.userReducer)
    const [conversations, setConversations] = useState([])
    const [conversationsFound, setConversationsFound] = useState(false)
    const [friends, setFriends] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState({})
    const [getNewMessage, setGetNewMessage] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState("")
    const [notification, setNotification] = useState("")
    const [addConversation, setAddConversation] = useState("")
    const scrollToLastMessage = useRef()
    const websocket = useRef()
    const quillRef = useRef()
    const [isTyping, setTyping] = useState(false)
    const [whereIsTyping, setWhereIsTyping] = useState("")
    const scrollToTyper = useRef()
    const [openConvMenu, setOpenConvMenu] = useState(false)
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
    const [openEditorToolbar, setOpenEditorToolbar] = useState(false)

    const getMembers = (conversation) => {
        const array = conversation.members.slice()
        const index = array.findIndex(member => member.id === uid)
        array.splice(index, 1)
        return array
    }

    useEffect(() => {
        websocket.current = io('ws://localhost:3001')
        websocket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
            setTyping(false)
            setWhereIsTyping("")
        })
        websocket.current.on("getNotification", data => {
            setNotification({
                sender: data.senderId,
                sender_pseudo: data.sender_pseudo,
                text: data.text,
                conversationId: data.conversationId,
                createdAt: Date.now()
            })
            setTyping(false)
            setWhereIsTyping("")
        })
        websocket.current.on("addConversation", data => {
            setAddConversation({
                conversation: data.currentChat,
                sender: data.senderId,
                sender_pseudo: data.sender_pseudo,
                text: data.text,
                conversationId: data.conversationId,
                createdAt: Date.now()
            })
            // conversations.push(addConversation)
            setConversations(conversations => [...conversations, addConversation])
        })

        websocket.current.on("deleteConversation", data => {
            const index = conversations.findIndex(conversation => conversation._id !== data.conversationId)
            conversations.splice(index, 1)
            setConversations(conversations)
        })
    }, [])

    useEffect(() => {
        if (currentChat) {
            quillRef.current.addEventListener("keypress", () => {
                const membersId = currentChat.members.filter(member => member.id !== uid)
                var ids = []
                membersId.map(member => { return ids = [...ids, member.id] })

                ids.map(memberId => {
                    return websocket.current.emit("typing", {
                        sender: userData.pseudo,
                        receiverId: memberId,
                        conversationId: currentChat._id
                    })
                })
            })

            websocket.current.on('typing', data => {
                setTyping(true)
                setWhereIsTyping({
                    sender: data.sender,
                    conversationId: data.conversationId
                })
            })
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
            var conversationsIds = []
            conversations.map((conversation) => { return conversationsIds.push(conversation._id) })
            websocket.current.emit("addUser", {
                userId: uid,
                conversationId: currentChat._id
            })
        }
        websocket.current.on("getUsers", (users) => {
            const getUsers = async () => {
                if (uid) {
                    try {
                        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
                        setFriends(response.data.friends)
                        setOnlineUsers(response.data.friends.filter((f) => users.some((u) => u.userId === f.friend)))
                    } catch (err) {
                        console.log(err)
                    }
                }
            }
            getUsers()
        })
    }, [uid, onlineUsers.length, currentChat])

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}api/conversations/${uid}`)
                setConversations(res.data.sort((a, b) => { return b.updatedAt.localeCompare(a.updatedAt) }))
                setConversationsFound(true)
            } catch (err) {
                console.error(err)
            }
        }
        getConversations()
    }, [uid, conversations.length])

    useEffect(() => {
        if (conversationsFound)
            setCurrentChat(conversations[0])
    }, [conversations, conversationsFound])

    useEffect(() => {
        if (currentChat) {
            const getMessages = async () => {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}api/messages/${currentChat._id}`)
                setMessages(response.data)
            }
            getMessages()
        }
    }, [currentChat, messages.length, arrivalMessage])

    /*************************************************************************************** */
    /************************************** INPUT ****************************************** */

    const handleNewMessage = (text, delta, source, editor) => {
        setNewMessage(editor.getContents());
    }

    const handleSubmit = async (e) => {
        const message = {
            sender: uid,
            sender_pseudo: userData.pseudo,
            sender_picture: userData.picture,
            text: newMessage,
            conversationId: currentChat._id,
        }

        const membersId = currentChat.members.filter(member => member.id !== uid)
        var ids = []
        membersId.map(member => { return ids = [...ids, member.id] })

        ids.map(memberId => {
            return websocket.current.emit("sendMessage", {
                senderId: uid,
                sender_pseudo: userData.pseudo,
                receiverId: memberId,
                text: newMessage.ops,
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
    }

    useEffect(() => {
        if (!isTyping)
            scrollToLastMessage.current?.scrollIntoView()
        else
            scrollToTyper.current?.scrollIntoView()
    }, [messages, whereIsTyping])

    const [searchQuery, setSearchQuery] = useState("")
    const [isConversationInResult, setConversationsInResult] = useState([])
    const [search, setSearch] = useState(false)
    const isEmpty = !isConversationInResult || isConversationInResult.length === 0
    const regexp = new RegExp(searchQuery, 'i');

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const searchConversation = () => {
        if (!searchQuery || searchQuery.trim() === "") { return }
        if (searchQuery.length >= 2) {
            const response = conversations.filter(conversation => conversation.members.some(member => regexp.test(member.pseudo)))
            setSearch(true)
            setConversationsInResult(response)
            if (isEmpty) {
                setSearch(false)
            }
        } else {
            setSearch(false)
        }
    }

    const changeCurrentChat = (conversation) => {
        websocket.current.emit("changeCurrentConversation", {
            userId: uid,
            conversationId: conversation._id
        })
    }

    const deleteConversation = async (element) => {
        const membersId = element.members.filter(member => member.id !== uid)
        var ids = []
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
                var storedArray = conversations.slice()
                var todelete = storedArray.find(conversation => conversation._id === element._id)
                storedArray.splice(todelete, 1)
                setConversations(storedArray)
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className="messenger">
            <div className="conversation-menu">
                <div className="conversation-menu-wrapper">
                    <NewConversationModal friends={friends} currentId={uid} changeCurrentChat={setCurrentChat} />
                    <input placeholder="Rechercher une conversation..." className="conversation-menu-input" value={searchQuery} onInput={handleInputChange} onChange={searchConversation} type="search" />
                    {conversations.map((element, key) => {
                        return (
                            <div onClick={() => { setCurrentChat(element); changeCurrentChat(element) }} key={key}
                                style={{ display: search ? (isConversationInResult.includes(element) ? "block" : "none") : ("block") }}>
                                <Conversation conversation={element} newMessage={getNewMessage} notification={notification} />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="conversation-box">
                <div className="conversation-box-wrapper">
                    {currentChat ? (
                        <>
                            <div className="conversation-box-top">
                                <div className="conversation-box-members">
                                    <div className="conversation-img-container">
                                        {getMembers(currentChat).map((element, key) => {
                                            return (
                                                <div className="conversation-img" key={key} style={avatar(element.picture)}></div>
                                            )
                                        })}
                                    </div>
                                    <div className="conversation-name">
                                        {getMembers(currentChat).length === 1 && (
                                            <strong>{getMembers(currentChat)[0].pseudo}</strong>
                                        )}
                                        {getMembers(currentChat).length === 2 && (
                                            <strong>{getMembers(currentChat)[0].pseudo + ", " + getMembers(currentChat)[1].pseudo}</strong>
                                        )}
                                        {getMembers(currentChat).length === 3 && (
                                            <strong>{getMembers(currentChat)[0].pseudo + ", " + getMembers(currentChat)[1].pseudo + ", " + getMembers(currentChat)[2].pseudo}</strong>
                                        )}
                                        {getMembers(currentChat).length > 3 && (
                                            <strong>{getMembers(currentChat)[0].pseudo + ", " + getMembers(currentChat)[1].pseudo + ", " + getMembers(currentChat)[2].pseudo + " et " + (getMembers(currentChat).length - 3) + " autres"}</strong>
                                        )}
                                    </div>
                                </div>
                                <div className="conversation-box-menu">
                                    <div role="button" onClick={() => setOpenConvMenu(!openConvMenu)}><AiOutlineInfoCircle /></div>
                                </div>
                                {openConvMenu && (
                                    currentChat.owner === uid && (
                                        <div className="conversation-tools">
                                            <button onClick={() => deleteConversation(currentChat)}><FaTrashAlt /> Supprimer</button>
                                        </div>
                                    )
                                )}
                            </div>
                            <div className="conversation-box-container">
                                {messages.map((message, key) => {
                                    return (
                                        <div ref={scrollToLastMessage} key={key}>
                                            <Message message={message} own={message.sender === uid} uniqueKey={key} userId={uid} />
                                        </div>
                                    )
                                })}
                                {isTyping && (
                                    whereIsTyping.conversationId === currentChat._id && (
                                        <div ref={scrollToTyper} className="is-typing">{whereIsTyping.sender + " est en train d'écrire..."} <ThreeDots /></div>
                                    )
                                )}
                            </div>
                        </>
                    ) : (
                        <p>Créer votre première conversation pour commencer à chatter !</p>
                    )}
                    <div className="conversation-bottom">
                        <div className="message-text-editor">
                            <EditorToolbar display={openEditorToolbar} />
                            <div ref={quillRef}>
                                <ReactQuill
                                    onChange={handleNewMessage}
                                    value={newMessage}
                                    placeholder={"Envoyer un message..."}
                                    modules={modules}
                                    formats={formats}
                                />
                            </div>
                            <div className="content error"></div>
                        </div>
                        <div className="message-text-tools">
                            <div className="left">
                                <button className="btn btn-secondary" onClick={() => setOpenEmojiPicker(!openEmojiPicker)}><BsEmojiSmile /></button>
                                {openEmojiPicker && <EmojiPicker />}
                                <button className="btn btn-secondary"><FiAtSign /></button>
                                <button className="btn btn-secondary" onClick={() => setOpenEditorToolbar(!openEditorToolbar)}><BiFontFamily /></button>
                            </div>
                            <div className="right">
                                <button className="btn btn-secondary" onClick={handleSubmit}><IoSend /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="online-users-container">
                <div className="online-users-wrapper">
                    <OnlineUsers onlineUsers={onlineUsers} currentId={uid} changeCurrentChat={setCurrentChat} setConversations={setConversations} conversations={conversations} />
                </div>
            </div>
        </div>
    );
};

export default Messenger;
