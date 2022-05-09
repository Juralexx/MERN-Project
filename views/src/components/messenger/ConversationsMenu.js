import React, { useState } from 'react'
import Conversation from './Conversation';
import NewConversationModal from './NewConversationModal';
import { IconInput } from '../tools/components/Inputs';
import { IconToggle } from '../tools/components/Button';
import { isInResults } from '../tools/functions/member';
import { twoLevelSearch } from '../tools/functions/searches';
import { FaCaretDown } from 'react-icons/fa';
import { BiSearchAlt } from 'react-icons/bi';
import { HiPencilAlt } from 'react-icons/hi'
import { AiOutlineUsergroupAdd } from 'react-icons/ai';

const ConversationsMenu = ({ uid, user, websocket, isLoading, friendsArr, conversations, favorites, setConversations, setCurrentChat, changeCurrentChat, setSearchHeader, setBlank, getNewMessage, notification }) => {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState(false)
    const [query, setQuery] = useState("")
    const [isResults, setResults] = useState([])

    return (
        <div className="conversation-menu">
            <div className="flex justify-between pb-3">
                <h2 className="bold">Conversations</h2>
                <div className="flex">
                    <IconToggle icon={<AiOutlineUsergroupAdd />} className="mr-2" onClick={() => setOpen(true)} />
                    <IconToggle icon={<HiPencilAlt />} onClick={() => { setSearchHeader(true); setBlank(true) }} />
                </div>
            </div>
            <div className="pb-4 mb-3 border-b">
                <IconInput
                    className="full is_start_icon"
                    icon={<BiSearchAlt />}
                    placeholder="Rechercher une conversation..."
                    value={query}
                    onInput={e => setQuery(e.target.value)}
                    onChange={() => twoLevelSearch(query, [...favorites, ...conversations], 'members', 'pseudo', isResults, setResults, setSearch)}
                />
            </div>
            <NewConversationModal
                open={open}
                setOpen={setOpen}
                uid={uid}
                user={user}
                friendsArr={friendsArr}
                changeCurrentChat={setCurrentChat}
                websocket={websocket}
                setConversations={setConversations}
            />

            {!isLoading ? (
                conversations.length > 0 || favorites.length > 0 ? (
                    <>
                        {favorites.length > 0 &&
                            <div className="conversations_container">
                                <div className="conversation-menu-tool">Favoris <FaCaretDown /></div>
                                {favorites.map((element, key) => {
                                    return (
                                        <div className={`${isInResults(element, isResults, search, "block")}`} key={key} onClick={() => changeCurrentChat(element)}>
                                            <Conversation
                                                uid={uid}
                                                user={user}
                                                conversation={element}
                                                newMessage={getNewMessage}
                                                notification={notification}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        }
                        <div className="conversations_container">
                            <div className="conversation-menu-tool">Conversations <FaCaretDown /></div>
                            {conversations.map((element, key) => {
                                return (
                                    <div key={key} onClick={() => changeCurrentChat(element)} style={{ display: search ? (isResults.includes(element) ? "block" : "none") : ("block") }}>
                                        <Conversation
                                            uid={uid}
                                            user={user}
                                            conversation={element}
                                            newMessage={getNewMessage}
                                            notification={notification}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </>
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