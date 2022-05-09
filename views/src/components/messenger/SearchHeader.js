import React, { useRef, useState } from 'react'
import { TinyAvatar } from '../tools/components/Avatars'
import { isInResults } from '../tools/functions/member'
import { oneLevelSearch } from '../tools/functions/searches'
import { useClickOutside } from '../tools/functions/useClickOutside'
import { isConversation, pushUserInArray, removeSelected } from './tools/function'
import { IoClose } from 'react-icons/io5'

const SearchHeader = ({ uid, user, friendsArr, setCurrentChat, changeCurrentChat, conversations, setConversations, setBlank }) => {
    const [search, setSearch] = useState(false)
    const [query, setQuery] = useState("")
    const [isResults, setResults] = useState([])
    const [friends, setFriends] = useState(friendsArr)
    const [members, setMembers] = useState([])
    const wrapperRef = useRef()
    const [open, setOpen] = useState(true)
    useClickOutside(wrapperRef, setOpen, false)
    const usersDisplayerRef = useRef()

    const onSelect = (receiver) => {
        let mbrs = [...members]
        setMembers(m => [...m, receiver])
        setFriends(removeSelected(friends, receiver))
        let isConv = isConversation(conversations, mbrs.concat([receiver, user]))
        if (isConv !== false) {
            changeCurrentChat(isConv)
        } else {
            const conversation = {
                type: members.length > 1 ? 'group' : 'dialog',
                members: [{ id: user._id, pseudo: user.pseudo, picture: user.picture }, { id: receiver._id, pseudo: receiver.pseudo, picture: receiver.picture }],
                creator: { id: user._id, pseudo: user.pseudo, picture: user.picture },
                waiter: receiver._id,
                messages: [],
                createdAt: new Date().toISOString()
            }
            setCurrentChat(conversation)
            setConversations(convs => [...convs, conversation])
        }
    }

    const onRemove = (receiver) => {
        let mbrs = removeSelected(members, receiver)
        setMembers(removeSelected(members, receiver))
        setFriends(f => [...f, receiver])

        if (mbrs.length > 0) {
            let isConv = isConversation(conversations, [...mbrs, user])
            if (isConv !== false) {
                changeCurrentChat(isConv)
            } else {
                const conversation = {
                    type: members.length > 1 ? 'group' : 'dialog',
                    members: [{ id: user._id, pseudo: user.pseudo, picture: user.picture }, { id: receiver._id, pseudo: receiver.pseudo, picture: receiver.picture }],
                    creator: { id: user._id, pseudo: user.pseudo, picture: user.picture },
                    waiter: receiver._id,
                    messages: [],
                    createdAt: new Date().toISOString()
                }
                setCurrentChat(conversation)
                setConversations(convs => [...convs, conversation])
            }
        } else {
            setBlank(true)
            setOpen(true)
        }
    }

    return (
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
                    onChange={() => oneLevelSearch(query, friendsArr, 'pseudo', isResults, setResults, setSearch)}
                    onClick={() => setOpen(true)}
                    style={{ width: `$calc(100% - ${usersDisplayerRef?.current?.offsetWidth} +50)` }}
                />
                {open &&
                    <div tabIndex="0" className="auto-complete-container custom-scrollbar w-1/2 top-full">
                        {friends.map((element, key) => {
                            return (
                                <div className={`auto-complete-item ${isInResults(element, isResults, search, "flex")}`} onClick={() => { onSelect(element); setBlank(false); setOpen(false) }} key={key}>
                                    <div className="flex items-center">
                                        <TinyAvatar pic={element.picture} />
                                        <p>{element.pseudo}</p>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default SearchHeader