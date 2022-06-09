import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom'
import { MessengerContext } from '../AppContext';
import { useOnline } from './functions/useOnline';
import { useOneLevelSearch } from '../tools/hooks/useOneLevelSearch';
import ToolsMenu from '../tools/global/ToolsMenu';
import Tools from './conversation-tools/Tools';
import OnlineMembers from './OnlineMembers';
import Tooltip from '../tools/global/Tooltip';
import { OnlineUserLoader } from './tools/Loaders';
import { IconInput } from '../tools/global/Inputs';
import { IconToggle } from '../tools/global/Button';
import { isConversation } from './functions/function';
import { avatar } from '../tools/hooks/useAvatar';
import { addClass } from '../Utils';
import { BiSearchAlt } from 'react-icons/bi';
import { IoArrowRedo, IoClose } from 'react-icons/io5';
import { MdOutlineMessage } from 'react-icons/md';

const ConversationTools = ({ onlineUsers, fetchedFriends, currentChat, members, conversations, setTemporaryConv, setCurrentChat, changeCurrentChat, rightbar, setRightbar }) => {
    const { user, friendsArr, navigate } = useContext(MessengerContext)
    const { online, offline } = useOnline(friendsArr, onlineUsers)
    const [search, setSearch] = useState(false)
    const { oneLevelSearch, isInResults, query, setQuery } = useOneLevelSearch([...online, ...offline], 'pseudo')

    const handleClick = (receiver) => {
        let isConv = isConversation(conversations, [receiver, user])
        if (isConv !== false) {
            changeCurrentChat(isConv)
            navigate('/messenger/' + isConv._id)
        } else {
            const conversation = {
                temporary: true,
                type: 'dialog',
                members: [receiver],
                owner: { _id: user._id, pseudo: user.pseudo, picture: user.picture },
                creator: { _id: user._id, pseudo: user.pseudo, picture: user.picture },
                messages: [],
                createdAt: new Date().toISOString()
            }
            navigate('/messenger/new')
            setTemporaryConv(conversation)
            setCurrentChat(conversation)
        }
    }

    return (
        <div className={`conversation-tools ${addClass(rightbar.state !== 'open', "closed")}`}>
            {rightbar.displayed === 'contacts' &&
                <>
                    <div className="conversation-tools-header">
                        <h2 className="bold">Contacts</h2>
                        <div className="flex">
                            <Tooltip content={<p>Rechercher</p>} placement="bottom">
                                <IconToggle icon={<BiSearchAlt />} onClick={() => setSearch(!search)} />
                            </Tooltip>
                            <IconToggle icon={<IoClose />} onClick={() => setRightbar({ open: false, displayed: "contacts" })} />
                        </div>
                    </div>
                    {search &&
                        <div className="search py-2 mb-2">
                            <IconInput
                                className="full is_start_icon small"
                                icon={<BiSearchAlt />}
                                placeholder="Rechercher un contact..."
                                value={query}
                                onInput={e => setQuery(e.target.value)}
                                onChange={oneLevelSearch}
                            />
                        </div>
                    }
                    <div className="conversation-tools-inner">
                        {!fetchedFriends ? (
                            online.length > 0 || offline.length > 0 ? (
                                <>
                                    {online.length > 0 &&
                                        <>
                                            <div className="online-title">En ligne <span>{online.length}</span></div>
                                            {online.map((element, key) => {
                                                return (
                                                    <div className={`online-users online ${isInResults(friendsArr, "block")}`} key={key}>
                                                        <div className="online-user">
                                                            <div className="online-user-img" style={avatar(element.picture)}></div>
                                                            <div className="online-user-name">
                                                                <div className="online-user-pseudo">{element.pseudo}</div>
                                                                <div className="online-user-status"><em>Actif</em></div>
                                                            </div>
                                                        </div>
                                                        <ToolsMenu>
                                                            <div className="tools_choice" onClick={() => handleClick(element)}><MdOutlineMessage />Envoyer un message</div>
                                                            <div className="tools_choice"><IoArrowRedo /><NavLink to={"/" + element.pseudo}>Voir le profil</NavLink></div>
                                                        </ToolsMenu>
                                                    </div>
                                                )
                                            })}
                                        </>
                                    }
                                    {offline.length > 0 &&
                                        <>
                                            <div className="online-title">Hors ligne <span>{offline.length}</span></div>
                                            {offline.map((element, key) => {
                                                return (
                                                    <div className={`online-users offline ${isInResults(friendsArr, "block")}`} key={key}>
                                                        <div className="online-user">
                                                            <div className="online-user-img" style={avatar(element.picture)}></div>
                                                            <div className="online-user-name">
                                                                <div className="online-user-pseudo">{element.pseudo}</div>
                                                                <div className="online-user-status"><em>Déconnecté</em></div>
                                                            </div>
                                                        </div>
                                                        <ToolsMenu>
                                                            <div className="tools_choice" onClick={() => handleClick(element)}><MdOutlineMessage />Envoyer un message</div>
                                                            <div className="tools_choice"><IoArrowRedo /><NavLink to={"/" + element.pseudo}>Voir le profil</NavLink></div>
                                                        </ToolsMenu>
                                                    </div>
                                                )
                                            })}
                                        </>
                                    }
                                </>
                            ) : (
                                <div className="no-conversation-yet !mt-10">
                                    <p>Aucun contact à afficher...</p>
                                </div>
                            )
                        ) : (
                            <OnlineUserLoader />
                        )}
                    </div>
                </>
            }

            {rightbar.displayed === 'members' &&
                <OnlineMembers
                    onlineUsers={onlineUsers}
                    members={members}
                    setRightbar={setRightbar}
                    handleClick={handleClick}
                />
            }

            {rightbar.displayed === 'tools' &&
                <Tools
                    members={members}
                    open={rightbar.displayed === 'tools'}
                    setOpen={setRightbar}
                    conversation={currentChat}
                />
            }
        </div>
    )
}

export default ConversationTools;