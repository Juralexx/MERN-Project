import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { MessengerContext } from '../AppContext';
import { useLocationchange } from './functions/useLocationchange';
import { useScrollToLast } from './functions/useScrollToLast';
import { useFetchFriends } from './functions/useFetchFriends';
import { useGetMembers } from './functions/useGetMembers'
import { useTyping } from './functions/useTyping';
import { useInfiniteScroll } from './functions/useScroll';
import { getConversation, sendMessage, setLastMessageSeen } from '../../actions/messenger.action';
import { getHoursDiff, getMessagesDates, otherMembersIDs } from './functions/function';
import { randomNbID } from '../Utils';
import { EmptyDialog, EmptyGroup, NoConversation } from './tools/Empty'
import { ChatLoader, SmallLoader } from './tools/Loaders';
import ConversationHeader from './ConversationHeader';
import ConversationsMenu from './ConversationsMenu';
import ConversationTools from './ConversationTools';
import MessageDate from './message/MessageDate';
import Message from './message/Message';
import SearchHeader from './SearchHeader';
import Editor from './editor/Editor';

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

    const lastmessageRef = useRef()
    const convWrapperRef = useRef()
    const dispatch = useDispatch()

    const { friendsArr, fetchedFriends } = useFetchFriends(user)
    const { isTyping, setTyping, typingContext, setTypingContext } = useTyping(currentChat)
    const { members } = useGetMembers(uid, currentChat)
    useLocationchange(user, websocket, currentChat)
    useScrollToLast(lastmessageRef, isLoading)
    const { pushMore, number } = useInfiniteScroll(currentChat, convWrapperRef)

    /**
     * is on messenger
     */

    useLayoutEffect(() => {
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
        if (user && conversations.length === 0) {
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
    }, [user, conversations, dispatch])

    /**
     * Dispatch current conversation
     */

    useEffect(() => {
        if (Object.keys(reducer).length > 0 && !currentChat.temporary) {
            setCurrentChat(reducer)
            if (reducer.messages.length > 0) {
                setMessagesDates(getMessagesDates(reducer.messages))
            }
            if (Object.keys(currentChat).length > 0) {
                setTimeout(() => setLoading(false), 1000)
            }
        }
    }, [reducer, currentChat])

    /**
     * FONCTIONS
     */

    const handleSubmit = (conversation, messageContent, files, shared) => {
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
        if (shared) {
            Object.assign(message, { shared: shared })
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
        if (currentChat?._id !== conversation._id && currentChat.messages.length > 0)
            dispatch(setLastMessageSeen(uid, currentChat._id, currentChat.messages[currentChat.messages.length - 1]._id))
        if (!conversation.temporary) {
            dispatch(getConversation(conversation._id))
            setCurrentChat(conversation)
            setMessagesDates(getMessagesDates(conversation?.messages))
            websocket.current.emit("changeCurrentConversation", {
                userId: uid,
                conversationId: conversation._id
            })
        } else {
            setCurrentChat(conversation)
        }
    }

    const onConversationClick = (conversation) => {
        changeCurrentChat(conversation)
        if (searchHeader)
            setSearchHeader(false)
        if (blank)
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
        <MessengerContext.Provider value={{ uid, user, websocket, friendsArr, dispatch }}>
            <div className="messenger">
                <ConversationsMenu
                    favorites={favorites}
                    conversations={conversations}
                    setConversations={setConversations}
                    currentChat={currentChat}
                    setCurrentChat={setCurrentChat}
                    changeCurrentChat={changeCurrentChat}
                    onConversationClick={onConversationClick}
                    temporaryConv={temporaryConv}
                    setTemporaryConv={setTemporaryConv}
                    setSearchHeader={setSearchHeader}
                    setBlank={setBlank}
                    isLoading={isLoading}
                    newMessage={newMessage}
                    notification={notification}
                />
                <div className="conversation-box">
                    <div className="conversation-box-wrapper">
                        {!isLoading &&
                            <>
                                {Object.keys(currentChat).length > 0 &&
                                    <>
                                        {!searchHeader ? (
                                            <ConversationHeader
                                                onlineUsers={onlineUsers}
                                                setTools={setTools}
                                                currentChat={currentChat}
                                                members={members}
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
                                                <>
                                                    {pushMore && <SmallLoader />}
                                                    {currentChat.messages.length > 0 ? (
                                                        currentChat.messages.slice(number, currentChat.messages.length).map((message, key, array) => {
                                                            return (
                                                                <div ref={lastmessageRef} key={key}>
                                                                    {messagesDates.some(el => el.date === message.createdAt.substring(0, 10) && el.index === key) &&
                                                                        <MessageDate
                                                                            messagesDates={messagesDates}
                                                                            message={message}
                                                                        />
                                                                    }
                                                                    <Message
                                                                        message={message}
                                                                        className={key > 0 && getHoursDiff(array[key - 1], message)}
                                                                        uniqueKey={key}
                                                                        currentChat={currentChat}
                                                                        handleSubmit={handleSubmit}
                                                                    />
                                                                </div>
                                                            )
                                                        })
                                                    ) : (
                                                        currentChat.type === "dialog" ? <EmptyDialog currentChat={currentChat} /> : <EmptyGroup currentChat={currentChat} />
                                                    )}
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                        <Editor
                                            handleSubmit={handleSubmit}
                                            isTyping={isTyping}
                                            setTyping={setTyping}
                                            typingContext={typingContext}
                                            convWrapperRef={convWrapperRef}
                                            lastmessageRef={lastmessageRef}
                                            currentChat={currentChat}
                                            members={members}
                                        />
                                    </>
                                }

                                {Object.keys(currentChat).length === 0 &&
                                    <>
                                        {searchHeader &&
                                            <>
                                                <SearchHeader
                                                    setCurrentChat={setCurrentChat}
                                                    changeCurrentChat={changeCurrentChat}
                                                    conversations={conversations.concat(favorites)}
                                                    setBlank={setBlank}
                                                    temporaryConv={temporaryConv}
                                                    setTemporaryConv={setTemporaryConv}
                                                />
                                                <div className="conversation-box-container custom-scrollbar" ref={convWrapperRef}>
                                                    {blank ? (
                                                        <></>
                                                    ) : (
                                                        currentChat.type === "dialog" ? <EmptyDialog currentChat={currentChat} /> : <EmptyGroup currentChat={currentChat} />
                                                    )}
                                                </div>
                                            </>
                                        }
                                        {!searchHeader &&
                                            <NoConversation />
                                        }
                                    </>
                                }
                            </>
                        }

                        {isLoading &&
                            <ChatLoader />
                        }
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
                    currentChat={currentChat}
                    members={members}
                />
            </div>
        </MessengerContext.Provider>
    )
}

export default Messenger;