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
import { addClass } from '../Utils';
import { AiOutlineEdit, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FaCaretDown } from 'react-icons/fa';
import { BiSearchAlt } from 'react-icons/bi';
import { HiMenuAlt3, HiOutlineMenu } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import useMediaQuery from '../tools/hooks/useMediaQuery';

const ConversationsMenu = ({ fetched, favorites, conversations, setConversations, temporaryConv, setTemporaryConv, currentChat, setCurrentChat, changeCurrentChat, newMessage, notification, setRightbar }) => {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState(false)
    const mediaMd = useMediaQuery('(min-width: 1024px)')
    const [leftbar, setLeftbar] = useState(mediaMd ? true : false)
    const { twoLevelSearch, isInResults, query, setQuery } = useTwoLevelSearch([...favorites, ...conversations], 'members', 'pseudo')

    return (
        <div className={`conversation-menu ${addClass(!leftbar, 'closed')}`}>
            <div className="conversation-menu-header">
                <h2 className="bold">Conversations</h2>
                <div className="conversation-menu-tools">
                    <IconToggle className="toggle" icon={leftbar ? <IoClose /> : <HiOutlineMenu />} onClick={() => setLeftbar(!leftbar)} />

                    <div className="tools flex items-center">
                        <Tooltip content={<p>Rechercher</p>} placement="bottom">
                            <IconToggle icon={<BiSearchAlt />} onClick={() => setSearch(!search)} />
                        </Tooltip>
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
            </div>
            {search &&
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
            }

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
                                <div className="conversation-menu-tool">Favoris <FaCaretDown /></div>
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
                            <div className="conversation-menu-tool">Messages <FaCaretDown /></div>
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

export default ConversationsMenu