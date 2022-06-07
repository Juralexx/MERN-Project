import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useTwoLevelSearch } from '../tools/hooks/useTwoLevelSearch';
import Conversation from './Conversation';
import NewConversationModal from './NewConversationModal';
import TemporaryConversation from './tools/TemporaryConversation';
import Tooltip from '../tools/global/Tooltip';
import { IconInput } from '../tools/global/Inputs';
import { IconToggle } from '../tools/global/Button';
import { ConversationLoader } from './tools/Loaders';
import { AiOutlineEdit, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FaCaretDown } from 'react-icons/fa';
import { BiSearchAlt } from 'react-icons/bi';
import { HiMenuAlt3 } from 'react-icons/hi';

const MobileMenu = ({ fetched, favorites, conversations, setConversations, temporaryConv, setTemporaryConv, currentChat, setCurrentChat, changeCurrentChat, newMessage, notification, setRightbar }) => {
    const [open, setOpen] = useState(false)
    const { twoLevelSearch, isInResults, query, setQuery } = useTwoLevelSearch([...favorites, ...conversations], 'members', 'pseudo')

    return (
        <div className="conversation-menu-mobile">
            <div className="conversation-menu-mobile-header">
                <h2 className="bold">Conversations</h2>
                <div className="conversation-menu-mobile-tools">
                    <Tooltip content={<p>Nouvelle&nbsp;conversation de groupe</p>} placement="bottom">
                        <IconToggle icon={<AiOutlineUsergroupAdd />} onClick={() => setOpen(true)} />
                    </Tooltip>
                    <Tooltip content={<p>Nouvelle&nbsp;conversation</p>} placement="bottom">
                        <Link to="/messenger/new"><IconToggle icon={<AiOutlineEdit />} /></Link>
                    </Tooltip>
                    <Tooltip content={<p>Contacts&nbsp;en&nbsp;ligne</p>} placement="bottom">
                        <IconToggle icon={<HiMenuAlt3 />} onClick={() => setRightbar(prev => ({ ...prev, state: prev.state === 'open' ? 'closed' : 'open' }))} />
                    </Tooltip>
                </div>
            </div>
            <div className="search py-2 mb-2">
                <IconInput
                    className="full is_start_icon small"
                    icon={<BiSearchAlt />}
                    placeholder="Rechercher une conversation..."
                    value={query}
                    onInput={e => setQuery(e.target.value)}
                    onChange={twoLevelSearch}
                />
            </div>

            <NewConversationModal
                open={open}
                setOpen={setOpen}
                changeCurrentChat={changeCurrentChat}
                conversations={conversations.concat(favorites)}
                setConversations={setConversations}
            />

            {fetched ? (
                conversations.length > 0 || favorites.length > 0 || Object.keys(temporaryConv).length > 0 ? (
                    <>
                        {favorites.length > 0 &&
                            <div className="conversations_container">
                                <div className="conversation-menu-mobile-tool">Favoris <FaCaretDown /></div>
                                {favorites.map((element, key) => {
                                    return (
                                        <div className={`${isInResults(element, "block")}`} key={key}>
                                            <Conversation
                                                conversation={element}
                                                newMessage={newMessage}
                                                notification={notification}
                                                onConversationClick={() => changeCurrentChat(element)}
                                                currentChat={currentChat}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        }
                        <div className="conversations_container">
                            <div className="conversation-menu-mobile-tool">Messages <FaCaretDown /></div>
                            {Object.keys(temporaryConv).length > 0 &&
                                <div className={`${isInResults(temporaryConv, "block")}`}>
                                    <TemporaryConversation
                                        temporaryConv={temporaryConv}
                                        setTemporaryConv={setTemporaryConv}
                                        setCurrentChat={setCurrentChat}
                                        conversations={conversations}
                                        currentChat={currentChat}
                                    />
                                </div>
                            }
                            {conversations.map((element, key) => {
                                return (
                                    <div className={`${isInResults(element, "block")}`} key={key}>
                                        <Conversation
                                            conversation={element}
                                            newMessage={newMessage}
                                            notification={notification}
                                            onConversationClick={() => changeCurrentChat(element)}
                                            currentChat={currentChat}
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
                <ConversationLoader />
            )}
        </div>
    )
}

export default MobileMenu