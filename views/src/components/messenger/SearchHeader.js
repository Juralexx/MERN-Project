import React, { useRef, useState } from 'react'
import { TinyAvatar } from '../tools/components/Avatars'
import { isInResults } from '../tools/functions/member'
import { oneLevelSearch } from '../tools/functions/searches'
import { useClickOutside } from '../tools/functions/useClickOutside'
import { isConversation, removeSelected, userToMember } from './tools/function'
import { IoClose } from 'react-icons/io5'

const SearchHeader = ({ uid, user, friendsArr, setCurrentChat, changeCurrentChat, conversations, setConversations, setBlank, temporaryConv, setTemporaryConv }) => {
    const [search, setSearch] = useState(false)
    const [query, setQuery] = useState("")
    const [isResults, setResults] = useState([])
    
    const [friends, setFriends] = useState(friendsArr.filter(f => !temporaryConv.members?.some(m => m._id === f._id)) || friendsArr)
    const [members, setMembers] = useState(temporaryConv.members || [])
    const wrapperRef = useRef()
    const [open, setOpen] = useState(friends.length > 0 ? true : false)
    useClickOutside(wrapperRef, setOpen, false)
    const usersDisplayerRef = useRef()

    const onSelect = (receiver) => {
        let mbrs = [...members]
        setMembers(m => [...m, receiver])
        setFriends(removeSelected(friends, receiver._id))
        let isConv = isConversation(conversations, mbrs.concat([receiver, user]))

        if (isConv !== false) {
            changeCurrentChat(isConv)
            if (Object.keys(temporaryConv).length > 0)
                setTemporaryConv({})
        } else {
            const mbrsArr = userToMember([...mbrs, receiver])
            if (Object.keys(temporaryConv).length > 0) {
                setTemporaryConv({...temporaryConv, members: mbrsArr, type: mbrsArr.length > 1 ? 'group' : 'dialog' })
                setCurrentChat({...temporaryConv,  members: mbrsArr, type: mbrsArr.length > 1 ? 'group' : 'dialog' })
            } else {
                const conversation = {
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
                changeCurrentChat(isConv)
                if (Object.keys(temporaryConv).length > 0)
                    setTemporaryConv({})
            } else {
                if (Object.keys(temporaryConv).length > 0) {
                    setTemporaryConv({...temporaryConv, members: mbrs, type: mbrs.length > 1 ? 'group' : 'dialog' })
                    setCurrentChat({...temporaryConv,  members: mbrs, type: mbrs.length > 1 ? 'group' : 'dialog' })
                } else {
                    const conversation = {
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
        <div className="conversation-box-top">
            <div className="search_container" ref={wrapperRef}>
                <div className="members_displayer" ref={usersDisplayerRef}>
                    <div className="flex">
                        {members?.map((element, key) => {
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
                    onChange={() => oneLevelSearch(query, friends, 'pseudo', isResults, setResults, setSearch)}
                    onClick={() => setOpen(true)}
                    style={{ width: `$calc(100% - ${usersDisplayerRef?.current?.offsetWidth} +50)` }}
                />
                {open &&
                    <div tabIndex="0" className="auto-complete-container custom-scrollbar w-1/2 top-full">
                        {friends.length > 0 ? (
                            friends.map((element, key) => {
                                return (
                                    <div className={`auto-complete-item ${isInResults(element, isResults, search, "flex")}`} onClick={() => onSelect(element)} key={key}>
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
    )
}

export default SearchHeader