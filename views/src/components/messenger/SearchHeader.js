import React, { useContext, useRef, useState } from 'react'
import { TinyAvatar } from '../tools/global/Avatars'
import { useClickOutside } from '../tools/hooks/useClickOutside'
import { isConversation, removeSelected, userToMember } from './functions/function'
import { MessengerContext } from '../AppContext'
import { IoClose } from 'react-icons/io5'
import { useOneLevelSearch } from '../tools/hooks/useOneLevelSearch'

const SearchHeader = ({ setCurrentChat, changeCurrentChat, conversations, setBlank, temporaryConv, setTemporaryConv }) => {
    const { user, friendsArr } = useContext(MessengerContext)
    const [friends, setFriends] = useState(temporaryConv.members ? friendsArr.filter(f => !temporaryConv.members?.some(m => m._id === f._id)) : friendsArr)
    const { oneLevelSearch, isInResults, query, setQuery } = useOneLevelSearch(friends, 'pseudo')
    const [members, setMembers] = useState([])
    const wrapperRef = useRef()
    const [open, setOpen] = useState(friends.length > 0 ? true : false)
    useClickOutside(wrapperRef, () => setOpen(false))
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
                    temporary: true,
                    type: mbrsArr.length > 1 ? 'group' : 'dialog',
                    members: mbrsArr,
                    creator: { _id: user._id, pseudo: user.pseudo, picture: user.picture },
                    messages: [],
                    createdAt: new Date().toISOString()
                }
                setTemporaryConv(conversation)
                changeCurrentChat(conversation)
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
                        temporary: true,
                        type: mbrs.length > 1 ? 'group' : 'dialog',
                        members: mbrs,
                        creator: { _id: user._id, pseudo: user.pseudo, picture: user.picture },
                        messages: [],
                        createdAt: new Date().toISOString()
                    }
                    setTemporaryConv(conversation)
                    changeCurrentChat(conversation)
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
    )
}

export default SearchHeader