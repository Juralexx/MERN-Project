import React, { useContext, useState } from 'react'
import { MessengerContext } from '../AppContext';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Mousewheel } from "swiper";
import "swiper/css/navigation";
import 'swiper/css';
import { ToolsBtn } from '../tools/global/Button';
import Icon from '../tools/icons/Icon';
import { IconInput } from '../tools/global/Inputs';
import { ConversationLoader, OnlineUserMobileLoader } from './tools/Loaders';
import Conversation from './Conversation';
import NewConversationModal from './NewConversationModal';
import TemporaryConversation from './tools/TemporaryConversation';
import { fullImage } from '../Utils';
import { useSearchConversation } from './hooks/useSearchConversation';
import { useOnline } from '../tools/custom-hooks/useOnline';

const MobileConversationMenu = ({ fetched, fetchedContacts, onlineUsers, newMessage, notification, setRightbar }) => {
    const { contactsArr, conversations } = useContext(MessengerContext)
    const [openNewGroupConv, setOpenNewGroupConv] = useState(false)
    const { findConversation, search, setSearch } = useSearchConversation(Object.keys(conversations.temporaryConversation).length > 0 ? [conversations.temporaryConversation, ...conversations.allConversations] : conversations.allConversations)
    const { online, offline } = useOnline(contactsArr, onlineUsers)

    return (
        <div className="conversation-menu-mobile">
            <div className="conversation-menu-mobile-header">
                <h2 className="bold">Conversations</h2>
                <div className="conversation-menu-mobile-tools">
                    <ToolsBtn onClick={() => setOpenNewGroupConv(true)}>
                        <Icon name="Chat" />
                    </ToolsBtn>
                    <ToolsBtn>
                        <Link to="/messenger/new">
                            <Icon name="Edit" />
                        </Link>
                    </ToolsBtn>
                    <ToolsBtn onClick={() => setRightbar(prev => ({ ...prev, state: 'open' }))} >
                        <Icon name="Menu" />
                    </ToolsBtn>
                </div>
            </div>

            <div className="new-conversation-btn">
                <Link to='/messenger/new'>
                    <Icon name="Edit" />
                </Link>
            </div>

            {!fetchedContacts ? (
                (online.length > 0 || offline.length > 0) && (
                    <Swiper
                        className="mobile-menu-swipper"
                        keyboard={{ enabled: true }}
                        mousewheel={true}
                        modules={[Navigation, Keyboard, Mousewheel]}
                        slidesPerView="auto"
                        spaceBetween={5}
                    >
                        {online.length > 0 &&
                            online.map((element, key) => {
                                return (
                                    <SwiperSlide key={key} className="online-user online">
                                        <div className="online-user-img" style={fullImage(element.picture)}></div>
                                        <div className="online-user-pseudo">
                                            {element.pseudo}
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                        {offline.length > 0 &&
                            offline.map((element, key) => {
                                return (
                                    <SwiperSlide key={key} className="online-user offline">
                                        <div className="online-user-img" style={fullImage(element.picture)}></div>
                                        <div className="online-user-pseudo">
                                            {element.pseudo}
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                )
            ) : (
                <div className="mobile-menu-swipper">
                    <OnlineUserMobileLoader />
                </div>
            )}

            <div className="search py-2 mb-2">
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
                open={openNewGroupConv}
                setOpen={setOpenNewGroupConv}
            />

            {fetched ? (
                conversations.notFavorites.length > 0
                    || conversations.favorites.length > 0
                    || Object.keys(conversations.temporaryConversation).length > 0 ? (
                    !search.state ? (
                        <>
                            {Object.keys(conversations.temporaryConversation).length > 0 &&
                                <TemporaryConversation />
                            }
                            {conversations.favorites.length > 0 &&
                                <div className="conversations_container">
                                    <div className="conversation-menu-mobile-tool">
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
                            }
                            {conversations.notFavorites.length > 0 && (
                                <div className="conversations_container">
                                    <div className="conversation-menu-mobile-tool">
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
                            <div className="conversation-menu-mobile-tool">
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

export default MobileConversationMenu