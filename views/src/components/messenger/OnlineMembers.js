import React from 'react';
import { NavLink } from 'react-router-dom'
import { useOnline } from './functions/useOnline';
import ToolsMenu from '../tools/global/ToolsMenu';
import { IconToggle } from '../tools/global/Button';
import { avatar } from '../tools/hooks/useAvatar';
import { BiSearchAlt } from 'react-icons/bi';
import { HiArrowSmLeft } from 'react-icons/hi';

const OnlineMembers = ({ onlineUsers, members, setRightbar, handleClick }) => {
    const { online, offline } = useOnline(members, onlineUsers)

    return (
        <>
            <div className="flex items-center justify-between p-1 mb-3">
                <div className="go-back !mb-0 absolute">
                    <HiArrowSmLeft onClick={() => setRightbar(prev => ({ ...prev, displayed: 'contacts' }))} />
                </div>
                <h2 className="bold ml-11">Membres</h2>
                <div className="flex">
                    <IconToggle icon={<BiSearchAlt />} />
                </div>
            </div>
            {online.length > 0 || offline.length > 0 ? (
                <>
                    {online.length > 0 &&
                        <>
                            <div className="online-title">En ligne <span>{online.length}</span></div>
                            {online.map((element, key) => {
                                return (
                                    <div className="online-users online" key={key}>
                                        <div className="online-user">
                                            <div className="online-user-img" style={avatar(element.picture)}></div>
                                            <div className="online-user-name">
                                                <div className="online-user-pseudo">{element.pseudo}</div>
                                                <div className="online-user-status"><em>Actif</em></div>
                                            </div>
                                        </div>
                                        <ToolsMenu>
                                            <div className="tools_choice" onClick={() => handleClick(element)}>Conversation</div>
                                            <div className="tools_choice"><NavLink to={"/" + element.pseudo}>Voir le profil</NavLink></div>
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
                                    <div className="online-users offline" key={key}>
                                        <div className="online-user">
                                            <div className="online-user-img" style={avatar(element.picture)}></div>
                                            <div className="online-user-name">
                                                <div className="online-user-pseudo">{element.pseudo}</div>
                                                <div className="online-user-status"><em>Déconnecté</em></div>
                                            </div>
                                        </div>
                                        <ToolsMenu>
                                            <div className="tools_choice" onClick={() => handleClick(element)}>Conversation</div>
                                            <div className="tools_choice"><NavLink to={"/" + element.pseudo}>Voir le profil</NavLink></div>
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
            )}
        </>
    )
}

export default OnlineMembers;