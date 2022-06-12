import React, { useContext, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Mousewheel } from "swiper";
import "swiper/css/navigation";
import 'swiper/css';
import { Link } from 'react-router-dom';
import { MessengerContext } from '../AppContext';
import { useOnline } from './functions/useOnline';
import { useTwoLevelSearch } from '../tools/hooks/useTwoLevelSearch';
import Conversation from './Conversation';
import NewConversationModal from './NewConversationModal';
import TemporaryConversation from './tools/TemporaryConversation';
import Tooltip from '../tools/global/Tooltip';
import { IconInput } from '../tools/global/Inputs';
import { IconToggle } from '../tools/global/Button';
import { avatar } from '../tools/hooks/useAvatar';
import { ConversationLoader, OnlineUserMobileLoader } from './tools/Loaders';
import { AiOutlineEdit, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FaCaretDown } from 'react-icons/fa';
import { BiSearchAlt } from 'react-icons/bi';
import { HiMenuAlt3 } from 'react-icons/hi';

const MobileMenu = ({ fetched, fetchedFriends, onlineUsers, favorites, conversations, setConversations, temporaryConv, setTemporaryConv, newMessage, notification, setRightbar }) => {
    const { friendsArr } = useContext(MessengerContext)
    const [open, setOpen] = useState(false)
    const { twoLevelSearch, isInResults, query, setQuery } = useTwoLevelSearch([...favorites, ...conversations], 'members', 'pseudo')
    const { online, offline } = useOnline(friendsArr, onlineUsers)

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

            <div className="new-conversation-btn">
                <Link to='/messenger/new'>
                    <AiOutlineEdit />
                </Link>
            </div>

            {!fetchedFriends ? (
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
                                        <div className="online-user-img" style={avatar(element.picture)}></div>
                                        <div className="online-user-pseudo">{element.pseudo}</div>
                                    </SwiperSlide>
                                )
                            })
                        }
                        {offline.length > 0 &&
                            offline.map((element, key) => {
                                return (
                                    <SwiperSlide key={key} className="online-user offline">
                                        <div className="online-user-img" style={avatar(element.picture)}></div>
                                        <div className="online-user-pseudo">{element.pseudo}</div>
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
                                        conversations={conversations}
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