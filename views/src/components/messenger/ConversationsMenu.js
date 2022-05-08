import React, { useState } from 'react'
import Conversation from './Conversation';
import NewConversationModal from './NewConversationModal';
import { ClassicInput } from '../tools/components/Inputs';

const ConversationsMenu = ({ friends, uid, user, isLoading, setCurrentChat, conversations, changeCurrentChat, getNewMessage, notification, setConversations, websocket }) => {
    const [isConversationInResult, setConversationsInResult] = useState([])
    const [search, setSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const isEmpty = !isConversationInResult || isConversationInResult.length === 0
    const regexp = new RegExp(searchQuery, 'i');

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
            <div className="flex pb-5">
                <div className="search_input">
                    <ClassicInput
                        className="full"
                        placeholder="Rechercher une conversation..."
                        value={searchQuery}
                        onInput={e => setSearchQuery(e.target.value)}
                        onChange={searchConversation}
                    />
                </div>
                <div className="create_conversation_tools">
                    <NewConversationModal
                        user={user}
                        friends={friends}
                        currentId={uid}
                        changeCurrentChat={setCurrentChat}
                        websocket={websocket}
                        setConversations={setConversations}
                    />
                </div>
            </div>

            {!isLoading ? (
                conversations.length > 0 ? (
                    conversations.map((element, key) => {
                        return (
                            <div key={key} onClick={() => changeCurrentChat(element)} style={{ display: search ? (isConversationInResult.includes(element) ? "block" : "none") : ("block") }}>
                                <Conversation
                                    uid={uid}
                                    user={user}
                                    conversation={element}
                                    newMessage={getNewMessage}
                                    notification={notification}
                                />
                            </div>
                        )
                    })
                ) : (
                    <div className="no-conversation-yet !mt-10">
                        <p>Aucune conversation à afficher...</p>
                    </div>
                )
            ) : (
                [...Array(5)].map((_, key) => {
                    return (
                        <div className="conversation" key={key}>
                            <div className="conversation-img-container">
                                <div className="conversation-img loading"></div>
                            </div>
                            <div className="conversation-infos">
                                <div className="conversation-infos-top">
                                    <div className="loading-small-title loading"></div>
                                    <div className="loading-tiny-text loading"></div>
                                </div>
                                <div className="flex mt-4">
                                    <div className="loading-short-text loading mr-2"></div>
                                    <div className="loading-long-text loading"></div>
                                </div>
                            </div>
                        </div>
                    )
                })
            )}
        </div>
    )
}

export default ConversationsMenu