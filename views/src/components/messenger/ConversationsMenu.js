import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import Icon from '../tools/icons/Icon';
import { ToolsBtn } from '../tools/global/Button';
import Conversation from './Conversation';
import NewConversationModal from './NewConversationModal';
import TemporaryConversation from './tools/TemporaryConversation';
import Tooltip from '../tools/global/Tooltip';
import { ConversationLoader } from './tools/Loaders';
import { MessengerContext } from '../AppContext';
import { IconInput } from '../tools/global/Inputs';
import { addClass } from '../Utils';
import { useSearchConversation } from './hooks/useSearchConversation';

const ConversationsMenu = ({ fetched, newMessage, notification, setRightbar }) => {
    const { md, conversations } = useContext(MessengerContext)
    const [open, setOpen] = useState(false)
    const [leftbar, setLeftbar] = useState(!md ? true : false)
    const { findConversation, search, setSearch } = useSearchConversation(Object.keys(conversations.temporaryConversation).length > 0 ? [conversations.temporaryConversation, ...conversations.allConversations] : conversations.allConversations)

    return (
        <div className={`conversation-menu ${addClass(!leftbar, 'closed')}`}>
            <div className="conversation-menu-header">
                <h2 className="bold">Conversations</h2>
                <div className="conversation-menu-tools">
                    <ToolsBtn className="toggle" onClick={() => setLeftbar(!leftbar)}>
                        {leftbar ? <Icon name="Cross" /> : <Icon name="Menu" />}
                    </ToolsBtn>

                    <div className="tools flex items-center">
                        <Tooltip content={<p>Nouvelle&nbsp;conversation de groupe</p>} placement="bottom">
                            <ToolsBtn onClick={() => setOpen(true)}>
                                <Icon name="Chat" />
                            </ToolsBtn>
                        </Tooltip>
                        <Tooltip content={<p>Nouvelle&nbsp;conversation</p>} placement="bottom">
                            <ToolsBtn>
                                <Link to="/messenger/new">
                                    <Icon name="Edit" />
                                </Link>
                            </ToolsBtn>
                        </Tooltip>
                        <Tooltip content={<p>Contacts&nbsp;en&nbsp;ligne</p>} placement="bottom">
                            <ToolsBtn onClick={() => setRightbar(prev => ({ ...prev, state: prev.state === 'open' ? 'closed' : 'open' }))}>
                                <Icon name="Menu" />
                            </ToolsBtn>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div className="search pb-2 px-2 mb-2">
                <IconInput
                    className="is_start_icon"
                    icon={<Icon name="Search" />}
                    placeholder="Rechercher une conversation..."
                    value={search.query}
                    onInput={e => setSearch(prevState => ({ ...prevState, query: e.target.value }))}
                    onChange={findConversation}
                />
            </div>

            <NewConversationModal
                open={open}
                setOpen={setOpen}
            />

            {fetched ? (
                conversations.notFavorites.length > 0 || conversations.favorites.length > 0 || Object.keys(conversations.temporaryConversation).length > 0 ? (

                    !search.state ? (
                        <>
                            {Object.keys(conversations.temporaryConversation).length > 0 &&
                                <TemporaryConversation />
                            }
                            {conversations.favorites.length > 0 && (
                                <div className="conversations_container">
                                    <div className="conversation-menu-tool">
                                        Favoris <Icon name="CaretDown" />
                                    </div>
                                    {conversations.favorites.map((element, key) => {
                                        return (
                                            <Conversation
                                                conversation={element}
                                                newMessage={newMessage}
                                                notification={notification}
                                                key={key}
                                            />
                                        )
                                    })}
                                </div>
                            )}
                            {conversations.notFavorites.length > 0 && (
                                <div className="conversations_container">
                                    <div className="conversation-menu-tool">
                                        Messages <Icon name="CaretDown" />
                                    </div>
                                    {conversations.notFavorites.map((element, key) => {
                                        return (
                                            <Conversation
                                                conversation={element}
                                                newMessage={newMessage}
                                                notification={notification}
                                                key={key}
                                            />
                                        )
                                    })}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="conversations_container">
                            <div className="conversation-menu-tool">
                                Messages <Icon name="CaretDown" />
                            </div>
                            {search.results.map((element, key) => {
                                return (
                                    <Conversation
                                        conversation={element}
                                        newMessage={newMessage}
                                        notification={notification}
                                        key={key}
                                    />
                                )
                            })}
                        </div>
                    )
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