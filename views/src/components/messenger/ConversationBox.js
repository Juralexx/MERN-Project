import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useInfiniteScroll } from './hooks/useInfiniteScroll'
import { useScrollToLast } from './hooks/useScrollToLast'
import { MessengerContext } from '../AppContext';
import ConversationHeader from './ConversationHeader'
import Editor from './editor/Editor'
import MobileEditor from './editor/MobileEditor';
import Message from './message/Message'
import { EmptyConversation } from './tools/Empty'
import { ChatLoader, SmallLoader } from './tools/Loaders'
import { dateParser } from '../Utils';
import { getHoursDiff, getMessagesDates } from './functions'
import { getConversation } from '../../reducers/messenger.action'
import ScrollButton from './tools/ScrollButton';

const ConversationBox = ({ onlineUsers, handleSubmit, isTyping, setRightbar }) => {
    const { user, conversations, setConversations, members, navigate, dispatch, sm } = useContext(MessengerContext)
    const { id } = useParams()
    const reducer = useSelector(state => state.messengerReducer)

    const convWrapperRef = useRef()
    const { pushMore, number } = useInfiniteScroll(conversations.currentChat, convWrapperRef)

    const [isLoading, setLoading] = useState(true)
    const { lastmessageRef } = useScrollToLast(isLoading)

    const currentChat = conversations.currentChat

    /**
     * 
     */

    useEffect(() => {
        if (isLoading) {
            if (Object.keys(user).length > 0) {
                if (user?.conversations?.length > 0) {
                    if (conversations?.allConversations.length > 0) {
                        if (!conversations?.allConversations.some(conv => conv._id === id)) {
                            navigate('/messenger/' + conversations.allConversations[0]._id)
                        }
                    }
                } else {
                    navigate('/messenger/new')
                }
            }
        }
    }, [isLoading, user, conversations, reducer, id, navigate])

    /**
     * 
     */

    useEffect(() => {
        if (id) {
            if (Object.keys(reducer).length === 0 || reducer._id !== id) {
                setLoading(true)
                dispatch(getConversation(id))
            }
            if (Object.keys(reducer).length > 0) {
                setConversations(convs => ({ ...convs, currentChat: reducer }))
                if (reducer.messages.length > 0) {
                    setConversations(convs => ({ ...convs, messagesDates: getMessagesDates(reducer.messages) }))
                }
                setTimeout(() => setLoading(false), 1000)
            }
        }
    }, [id, reducer, currentChat])

    /**
     * 
     */

    return (
        !isLoading ? (
            Object.keys(currentChat).length > 0 &&
            <>
                <ConversationHeader
                    onlineUsers={onlineUsers}
                    setRightbar={setRightbar}
                    members={members}
                />
                <div className="conversation-box-container custom-scrollbar" ref={convWrapperRef}>
                    {pushMore &&
                        <SmallLoader />
                    }
                    {currentChat.messages.length > 0 ? (
                        currentChat.messages.slice(number, currentChat.messages.length).map((message, key, array) => {
                            return (
                                <div ref={lastmessageRef} key={key}>
                                    {conversations.messagesDates.some(el => el.date === message.createdAt.substring(0, 10) && el.index === key) && (
                                        <div className="messages-date">
                                            <div className="date">
                                                {dateParser(message.createdAt)}
                                            </div>
                                        </div>
                                    )}
                                    <Message
                                        message={message}
                                        className={key > 0 && getHoursDiff(array[key - 1], message)}
                                        uniqueKey={key}
                                        members={members}
                                        handleSubmit={handleSubmit}
                                    />
                                </div>
                            )
                        })
                    ) : (
                        <EmptyConversation currentChat={currentChat} />
                    )}
                </div>
                <div className="conversation-bottom">
                    <ScrollButton
                        convWrapperRef={convWrapperRef}
                        scrollTo={lastmessageRef}
                    />
                    {!sm ? (
                        <Editor
                            members={members}
                            handleSubmit={handleSubmit}
                            isTyping={isTyping}
                            convWrapperRef={convWrapperRef}
                            lastmessageRef={lastmessageRef}
                        />
                    ) : (
                        <MobileEditor
                            members={members}
                            handleSubmit={handleSubmit}
                            isTyping={isTyping}
                            convWrapperRef={convWrapperRef}
                            lastmessageRef={lastmessageRef}
                        />
                    )}
                </div>
            </>
        ) : (
            <ChatLoader />
        )
    )
}

export default ConversationBox