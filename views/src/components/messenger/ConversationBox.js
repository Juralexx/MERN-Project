import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useGetMembers } from './functions/useGetMembers'
import { useInfiniteScroll } from './functions/useInfiniteScroll'
import { useScrollToLast } from './functions/useScrollToLast'
import { MessengerContext } from '../AppContext';
import ConversationHeader from './ConversationHeader'
import Editor from './editor/Editor'
import Message from './message/Message'
import MessageDate from './message/MessageDate'
import { EmptyDialog, EmptyGroup } from './tools/Empty'
import { ChatLoader, SmallLoader } from './tools/Loaders'
import { getHoursDiff, getMessagesDates } from './functions/function'
import { getConversation } from '../../actions/messenger.action'

const ConversationBox = ({ currentChat, setCurrentChat, onlineUsers, messagesDates, setMessagesDates,  handleSubmit, typingContext, isTyping, setTools }) => {
    const { uid, user } = useContext(MessengerContext)
    const { id } = useParams()
    const reducer = useSelector(state => state.messengerReducer)
    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(true)
    const convWrapperRef = useRef()
    const { pushMore, number } = useInfiniteScroll(currentChat, convWrapperRef)
    const { lastmessageRef } = useScrollToLast(isLoading)
    const { members } = useGetMembers(uid, currentChat)

    useEffect(() => {
        if (Object.keys(reducer).length === 0 || reducer._id !== id) {
            setLoading(true)
            dispatch(getConversation(id))
        }
        if (Object.keys(reducer).length > 0 && !currentChat.temporary) {
            setCurrentChat(reducer)
            if (reducer.messages.length > 0) {
                setMessagesDates(getMessagesDates(reducer.messages))
            }
            setTimeout(() => setLoading(false), 1000)
        }
    }, [id, reducer, currentChat])

    return (
        <div className="conversation-box">
            <div className="conversation-box-wrapper">
                {!isLoading &&
                    Object.keys(currentChat).length > 0 &&
                    <>
                        <ConversationHeader
                            onlineUsers={onlineUsers}
                            setTools={setTools}
                            currentChat={currentChat}
                            members={members}
                        />
                        <div className="conversation-box-container custom-scrollbar" ref={convWrapperRef}>
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
                                                    members={members}
                                                    handleSubmit={handleSubmit}
                                                />
                                            </div>
                                        )
                                    })
                                ) : (
                                    currentChat.type === "dialog" ? <EmptyDialog currentChat={currentChat} /> : <EmptyGroup currentChat={currentChat} />
                                )}
                            </>
                        </div>
                        <Editor
                            members={members}
                            currentChat={currentChat}
                            handleSubmit={handleSubmit}
                            isTyping={isTyping}
                            typingContext={typingContext}
                            convWrapperRef={convWrapperRef}
                            lastmessageRef={lastmessageRef}
                        />
                    </>
                }

                {isLoading &&
                    <ChatLoader />
                }
            </div>
        </div>
    )
}

export default ConversationBox