import React from 'react';
import { Link } from 'react-router-dom'
import ToolsMenu from '../tools/global/ToolsMenu';
import { ToolsBtn } from '../tools/global/Button';
import { fullImage } from '../Utils';
import Icon from '../tools/icons/Icon';
import { useOnline } from '../tools/custom-hooks/useOnline';

const OnlineMembers = ({ onlineUsers, members, setRightbar, handleClick }) => {
    const { online, offline } = useOnline(members, onlineUsers)

    return (
        <>
            <div className="flex items-center justify-between p-1 mb-[10px]">
                <div className="go-back !mb-0 absolute">
                    <Icon name="ArrowLeft" onClick={() => setRightbar({ state: 'open', displayed: 'contacts' })} />
                </div>
                <h2 className="bold ml-11">Membres</h2>
                <div className="flex">
                    <ToolsBtn onClick={() => setRightbar({ open: false, displayed: "contacts" })}>
                        <Icon name="Cross" />
                    </ToolsBtn>
                </div>
            </div>
            {online.length > 0 || offline.length > 0 ? (
                <>
                    {online.length > 0 &&
                        <>
                            <div className="online-title">
                                En ligne - <span>{online.length}</span>
                            </div>
                            {online.map((element, key) => {
                                return (
                                    <div className="online-users online" key={key}>
                                        <div className="online-user">
                                            <div className="online-user-img" style={fullImage(element.picture)}></div>
                                            <div className="online-user-name">
                                                <div className="online-user-pseudo">
                                                    {element.pseudo}
                                                </div>
                                                <div className="online-user-status">
                                                    <em>Actif</em>
                                                </div>
                                            </div>
                                        </div>
                                        <ToolsMenu mobile mobileFull>
                                            <div className="tools_choice" onClick={() => handleClick(element)}>
                                                <Icon name="Message" />Envoyer un message
                                            </div>
                                            <div className="tools_choice">
                                                <Link to={"/" + element.pseudo}>
                                                    <Icon name="Reply" />Voir le profil
                                                </Link>
                                            </div>
                                        </ToolsMenu>
                                    </div>
                                )
                            })}
                        </>
                    }
                    {offline.length > 0 &&
                        <>
                            <div className="online-title">
                                Hors ligne - <span>{offline.length}</span>
                            </div>
                            {offline.map((element, key) => {
                                return (
                                    <div className="online-users offline" key={key}>
                                        <div className="online-user">
                                            <div className="online-user-img" style={fullImage(element.picture)}></div>
                                            <div className="online-user-name">
                                                <div className="online-user-pseudo">
                                                    {element.pseudo}
                                                </div>
                                                <div className="online-user-status">
                                                    <em>Déconnecté</em>
                                                </div>
                                            </div>
                                        </div>
                                        <ToolsMenu mobile mobileFull>
                                            <div className="tools_choice" onClick={() => handleClick(element)}>
                                                <Icon name="Message" />Envoyer un message
                                            </div>
                                            <div className="tools_choice">
                                                <Link to={"/" + element.pseudo}>
                                                    <Icon name="Reply" />Voir le profil
                                                </Link>
                                            </div>
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