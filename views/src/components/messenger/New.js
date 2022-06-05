
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useClickOutside } from '../tools/hooks/useClickOutside'
import { useOneLevelSearch } from '../tools/hooks/useOneLevelSearch'
import { MessengerContext } from '../AppContext'
import { TinyAvatar } from '../tools/global/Avatars'
import { EmptyDialog, EmptyGroup } from './tools/Empty'
import EditorNull from './editor/EditorNull'
import { getHoursDiff, getMessagesDates, isConversation, removeSelected, userToMember } from './functions/function'
import { IoClose } from 'react-icons/io5'
import { useInfiniteScroll } from './functions/useInfiniteScroll'
import { useScrollToLast } from './functions/useScrollToLast'
import Editor from './editor/Editor'
import Message from './message/Message'
import { SmallLoader } from './tools/Loaders'
import MessageDate from './message/MessageDate'

const New = ({ conversations, temporaryConv, setTemporaryConv, isTyping, typingContext, handleSubmit, messagesDates, setMessagesDates }) => {
    const { user, friendsArr } = useContext(MessengerContext)
    const [friends, setFriends] = useState([])
    const { oneLevelSearch, isInResults, query, setQuery } = useOneLevelSearch(friends, 'pseudo')

    const [currentChat, setCurrentChat] = useState({})
    const [isLoading, setLoading] = useState(true)

    const [blank, setBlank] = useState(true)

    const [members, setMembers] = useState([])
    const wrapperRef = useRef()
    const [open, setOpen] = useState(friends.length > 0 ? true : false)
    useClickOutside(wrapperRef, setOpen, false)

    const usersDisplayerRef = useRef()

    const convWrapperRef = useRef()
    const { pushMore, number } = useInfiniteScroll(currentChat, convWrapperRef)
    const { lastmessageRef } = useScrollToLast(isLoading)

    useEffect(() => {
        if (friendsArr) {
            let arr = temporaryConv.members ? friendsArr.filter(f => !temporaryConv.members?.some(m => m._id === f._id)) : friendsArr
            setFriends(arr)
            if (arr.length) setOpen(true)
        }
    }, [friendsArr, temporaryConv])

    const onSelect = (receiver) => {
        let mbrs = [...members]
        setMembers(m => [...m, receiver])
        setFriends(removeSelected(friends, receiver._id))
        let isConv = isConversation(conversations, mbrs.concat([receiver, user]))

        if (isConv !== false) {
            setLoading(true)
            setCurrentChat(isConv)
            setMessagesDates(getMessagesDates(isConv?.messages))
            setTimeout(() => setLoading(false), 1000)

            if (Object.keys(temporaryConv).length > 0)
                setTemporaryConv({})
        } else {
            const mbrsArr = userToMember([...mbrs, receiver])
            if (Object.keys(temporaryConv).length > 0) {
                setTemporaryConv({ ...temporaryConv, members: mbrsArr, type: mbrsArr.length > 1 ? 'group' : 'dialog' })
                setCurrentChat({ ...temporaryConv, members: mbrsArr, type: mbrsArr.length > 1 ? 'group' : 'dialog' })
            } else {
                const conversation = {
                    temporary: true,
                    type: mbrsArr.length > 1 ? 'group' : 'dialog',
                    members: mbrsArr,
                    creator: { _id: user._id, pseudo: user.pseudo, picture: user.picture },
                    messages: [],
                    createdAt: new Date().toISOString()
                }
                setTemporaryConv(conversation)
                setCurrentChat(conversation)
            }
        }
        setBlank(false)
        setOpen(false)
    }

    const onRemove = (receiver) => {
        const mbrs = removeSelected(members, receiver._id)
        setMembers(mbrs)
        setFriends(f => [...f, receiver])

        if (mbrs.length > 0) {
            let isConv = isConversation(conversations, [...mbrs, user])
            if (isConv !== false) {
                setLoading(true)
                setCurrentChat(isConv)
                setMessagesDates(getMessagesDates(isConv?.messages))
                setTimeout(() => setLoading(false), 1000)

                if (Object.keys(temporaryConv).length > 0) {
                    setTemporaryConv({})
                }

            } else {
                if (Object.keys(temporaryConv).length > 0) {
                    setTemporaryConv({ ...temporaryConv, members: mbrs, type: mbrs.length > 1 ? 'group' : 'dialog' })
                    setCurrentChat({ ...temporaryConv, members: mbrs, type: mbrs.length > 1 ? 'group' : 'dialog' })
                } else {
                    const conversation = {
                        temporary: true,
                        type: mbrs.length > 1 ? 'group' : 'dialog',
                        members: mbrs,
                        creator: { _id: user._id, pseudo: user.pseudo, picture: user.picture },
                        messages: [],
                        createdAt: new Date().toISOString()
                    }
                    setTemporaryConv(conversation)
                    setCurrentChat(conversation)
                }
            }
        } else {
            setBlank(true)
            setOpen(true)
        }
    }

    return (
        <>
            <div className="conversation-box">
                <div className="conversation-box-wrapper">
                    <div className="conversation-box-top">
                        <div className="search_container" ref={wrapperRef}>
                            <div className="members_displayer" ref={usersDisplayerRef}>
                                <div className="flex">
                                    {members.map((element, key) => {
                                        return (
                                            <div className="members_item" key={key}>
                                                {element.pseudo}
                                                <IoClose onClick={() => onRemove(element)} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <input
                                placeholder="Rechercher..."
                                value={query}
                                onInput={e => setQuery(e.target.value)}
                                onChange={oneLevelSearch}
                                onClick={() => setOpen(true)}
                                style={{ width: `$calc(100% - ${usersDisplayerRef?.current?.offsetWidth} +50)` }}
                            />
                            {open &&
                                <div tabIndex="0" className="auto-complete-container custom-scrollbar w-1/2 top-full">
                                    {friends.length > 0 ? (
                                        friends.map((element, key) => {
                                            return (
                                                <div className={`auto-complete-item ${isInResults(element, "flex")}`} onClick={() => onSelect(element)} key={key}>
                                                    <div className="flex items-center">
                                                        <TinyAvatar pic={element.picture} />
                                                        <p>{element.pseudo}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <div className="py-2 text-center">Aucun contact à afficher</div>
                                    )}
                                </div>
                            }
                        </div>
                    </div>
                    {blank ? (
                        <>
                            <div className="conversation-box-container custom-scrollbar">
                                <div className="h-full"></div>
                            </div>
                            <EditorNull />
                        </>
                    ) : (
                        Object.keys(currentChat).length > 0 && (
                            <>
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
                        )
                    )}
                </div>
            </div>
        </>
    )
}

export default New