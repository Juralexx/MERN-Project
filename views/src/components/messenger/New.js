
import React, { useContext, useEffect, useRef, useState } from 'react'
import { MessengerContext } from '../AppContext'
import { Link } from 'react-router-dom'
import Icon from '../tools/icons/Icon'
import Editor from './editor/Editor'
import MobileEditor from './editor/MobileEditor'
import EditorNull from './editor/EditorNull'
import Message from './message/Message'
import { EmptyConversation } from './tools/Empty'
import { TinyAvatar } from '../tools/global/Avatars'
import { useClickOutside } from '../tools/hooks/useClickOutside'
import { useOneLevelSearch } from '../tools/custom-hooks/useOneLevelSearch'
import { dateParser } from '../Utils'
import { getHoursDiff, removeSelected, usersToMember } from './functions'

const New = ({ isTyping, handleSubmit }) => {
    const { user, contactsArr, sm, conversations, setConversations } = useContext(MessengerContext)
    const [contacts, setContacts] = useState([])
    const [members, setMembers] = useState([])
    const { oneLevelSearch, isElementInSearchResults, search, setSearch } = useOneLevelSearch(contacts, 'pseudo')

    const wrapperRef = useRef()
    const [open, setOpen] = useState(contacts.length > 0 ? true : false)
    useClickOutside(wrapperRef, () => setOpen(false))

    useEffect(() => {
        let temporary = conversations.temporaryConversation
        if (contactsArr) {
            let usersNotAlreadyIn = temporary.members ? contactsArr.filter(contact => !temporary.members?.some(member => member._id === contact._id)) : contactsArr
            setContacts(usersNotAlreadyIn)
            if (usersNotAlreadyIn.length)
                setOpen(true)
        }
        if (Object.keys(temporary).length > 0) {
            setMembers(temporary.members)
            setConversations(convs => ({ ...convs, currentChat: temporary }))
        } else {
            setMembers([])
            if (Object.keys(conversations.currentChat).length > 0) {
                setConversations(convs => ({ ...convs, currentChat: {} }))
            }
        }
    }, [contactsArr, conversations.temporaryConversation, conversations.currentChat])

    const onSelect = (receiver) => {
        let mbrs = [...members]
        setMembers(m => [...m, receiver])
        setContacts(removeSelected(contacts, receiver._id))

        const mbrsArr = usersToMember([...mbrs, receiver])
        if (Object.keys(conversations.temporaryConversation).length > 0) {
            setConversations(convs => ({
                ...convs,
                temporaryConversation: {
                    ...conversations.temporaryConversation,
                    members: mbrsArr,
                    type: mbrsArr.length > 1 ? 'group' : 'dialog'
                },
                currentChat: {
                    ...conversations.temporaryConversation,
                    members: mbrsArr,
                    type: mbrsArr.length > 1 ? 'group' : 'dialog'
                }
            }))
        } else {
            const conversation = {
                temporary: true,
                type: mbrsArr.length > 1 ? 'group' : 'dialog',
                members: mbrsArr,
                owner: {
                    _id: user._id,
                    pseudo: user.pseudo,
                    picture: user.picture
                },
                creator: {
                    _id: user._id,
                    pseudo: user.pseudo,
                    picture: user.picture
                },
                messages: [],
                createdAt: new Date().toISOString()
            }
            setConversations(convs => ({
                ...convs,
                temporaryConversation: conversation,
                currentChat: conversation
            }))
        }
        setOpen(false)
    }

    const onRemove = (receiver) => {
        const mbrs = removeSelected(members, receiver._id)
        setMembers(mbrs)
        setContacts([...contacts, receiver])

        if (mbrs.length > 0) {
            if (Object.keys(conversations.temporaryConversation).length > 0) {
                setConversations(convs => ({
                    ...convs,
                    temporaryConversation: {
                        ...conversations.temporaryConversation,
                        members: mbrs,
                        type: mbrs.length > 1 ? 'group' : 'dialog'
                    },
                    currentChat: {
                        ...conversations.temporaryConversation,
                        members: mbrs,
                        type: mbrs.length > 1 ? 'group' : 'dialog'
                    }
                }))
            } else {
                const conversation = {
                    temporary: true,
                    type: mbrs.length > 1 ? 'group' : 'dialog',
                    members: mbrs,
                    owner: {
                        _id: user._id,
                        pseudo: user.pseudo,
                        picture: user.picture
                    },
                    creator: {
                        _id: user._id,
                        pseudo: user.pseudo,
                        picture: user.picture
                    },
                    messages: [],
                    createdAt: new Date().toISOString()
                }
                setConversations(convs => ({
                    ...convs,
                    temporaryConversation: conversation,
                    currentChat: conversation
                }))
            }
        } else {
            if (Object.keys(conversations.temporaryConversation).length > 0) {
                setConversations(convs => ({ ...convs, temporaryConversation: {} }))
            }
            setOpen(true)
        }
    }

    return (
        <>
            <div className="conversation-box-top">
                <div className="go-back absolute">
                    <Link to="/messenger/">
                        <Icon name="ArrowLeft" />
                    </Link>
                </div>
                <div className="search_container" ref={wrapperRef}>
                    <div className="search_container-content custom-scrollbar-x">
                        <div className="members_displayer">
                            {members.map((element, key) => {
                                return (
                                    <div className="members_item" key={key}>
                                        {element.pseudo}
                                        <Icon name="Cross" onClick={() => onRemove(element)} />
                                    </div>
                                )
                            })}
                        </div>
                        <input
                            placeholder="Rechercher..."
                            value={search.query}
                            onChange={oneLevelSearch}
                            onInput={e => setSearch(prevState => ({ ...prevState, query: e.target.value }))}
                            onClick={() => setOpen(!open)}
                        />
                        {open &&
                            <div tabIndex="0" className="auto-complete-container custom-scrollbar">
                                {contacts.length > 0 ? (
                                    contacts.map((element, key) => {
                                        return (
                                            <div
                                                className={`auto-complete-item ${isElementInSearchResults(element, "flex")}`}
                                                onClick={() => onSelect(element)}
                                                key={key}
                                            >
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
            </div>

            {Object.keys(conversations.currentChat).length > 0 ? (
                <>
                    <div className="conversation-box-container custom-scrollbar">
                        {conversations.currentChat.messages.length > 0 ? (
                            conversations.currentChat.messages.map((message, key, array) => {
                                return (
                                    <div key={key}>
                                        {conversations.messagesDates.some(el => el.date === message.createdAt.substring(0, 10) && el.index === key) && (
                                            <div className="messages-date">
                                                <div className="date">{dateParser(message.createdAt)}</div>
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
                            <EmptyConversation currentChat={conversations.currentChat} />
                        )}
                    </div>
                    {!sm ? (
                        <Editor
                            members={members}
                            handleSubmit={handleSubmit}
                            isTyping={isTyping}
                        />
                    ) : (
                        <MobileEditor
                            members={members}
                            handleSubmit={handleSubmit}
                            isTyping={isTyping}
                        />
                    )}
                </>
            ) : (
                <>
                    <div className="conversation-box-container custom-scrollbar"></div>
                    <EditorNull />
                </>
            )}
        </>
    )
}

export default New