import React, { useState } from 'react'
import Conversation from './Conversation';
import NewConversationModal from './NewConversationModal';
import { FaSearch } from 'react-icons/fa'

const ConversationsMenu = ({ friends, uid, user, setCurrentChat, conversations, changeCurrentChat, getNewMessage, notification, setConversations, websocket }) => {
    const [isConversationInResult, setConversationsInResult] = useState([])
    const [openConversationsInput, setOpenConversationsInput] = useState(false)
    const [search, setSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const isEmpty = !isConversationInResult || isConversationInResult.length === 0
    const regexp = new RegExp(searchQuery, 'i');

    const handleInputChange = (e) => { setSearchQuery(e.target.value) }

    const searchConversation = () => {
        if (!searchQuery || searchQuery.trim() === "") { return }
        if (searchQuery.length >= 2) {
            const response = conversations.filter(conversation => conversation.members.some(member => regexp.test(member.pseudo)))
            setConversationsInResult(response)
            setSearch(true)
            if (isEmpty) {
                setSearch(false)
            }
        } else { setSearch(false) }
    }

    return (
        <div className="conversation-menu">
            <div className="conversation-menu-wrapper">
                <div style={{ display: "flex" }}>
                    <div className="btn btn-primary" onClick={() => setOpenConversationsInput(!openConversationsInput)} style={{ width: "100%", margin: "0 5px 10px 0" }}><FaSearch /></div>
                    <NewConversationModal
                        friends={friends}
                        currentId={uid}
                        changeCurrentChat={setCurrentChat}
                        websocket={websocket}
                        setConversations={setConversations}
                    />
                </div>
                {openConversationsInput &&
                    <input
                        type="search"
                        placeholder="Rechercher une conversation..."
                        className="conversation-menu-input" value={searchQuery}
                        onInput={handleInputChange}
                        onChange={searchConversation}
                    />
                }

                {conversations.map((element, key) => {
                    return (
                        <div key={key}
                            onClick={() => { changeCurrentChat(element) && setCurrentChat(element) }}
                            style={{ display: search ? (isConversationInResult.includes(element) ? "block" : "none") : ("block") }}
                        >
                            <Conversation
                                user={user}
                                conversation={element}
                                newMessage={getNewMessage}
                                notification={notification}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ConversationsMenu