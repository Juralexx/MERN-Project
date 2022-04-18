import React, { useState } from 'react'
import Conversation from './Conversation';
import NewConversationModal from './NewConversationModal';
import { Button } from '../tools/components/Button';
import { ClassicInput } from '../tools/components/Inputs';

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
            <div className="flex">
                <Button text="Rechercher" onClick={() => setOpenConversationsInput(!openConversationsInput)} />
                <NewConversationModal
                    friends={friends}
                    currentId={uid}
                    changeCurrentChat={setCurrentChat}
                    websocket={websocket}
                    setConversations={setConversations}
                />
            </div>
            {openConversationsInput &&
                <ClassicInput
                    className="full"
                    placeholder="Rechercher une conversation..."
                    value={searchQuery}
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
    )
}

export default ConversationsMenu