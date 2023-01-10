import React, { useContext } from 'react';
import { MessengerContext } from '../AppContext';
import { Link } from 'react-router-dom'
import { useOnline } from './functions/useOnline';
import ToolsMenu from '../tools/global/ToolsMenu';
import { IconToggle } from '../tools/global/Button';
import { BiSearchAlt } from 'react-icons/bi';
import { HiArrowSmLeft } from 'react-icons/hi';
import { IoArrowRedo, IoClose } from 'react-icons/io5';
import { MdOutlineMessage } from 'react-icons/md';
import { fullImage } from '../Utils';

const OnlineMembers = ({ onlineUsers, members, setRightbar, handleClick }) => {
    const { md } = useContext(MessengerContext)
    const { online, offline } = useOnline(members, onlineUsers)

    return (
        <>
            <div className="flex items-center justify-between p-1 mb-[10px]">
                <div className="go-back !mb-0 absolute">
                    <HiArrowSmLeft onClick={() => setRightbar(({ state: !md ? 'open' : 'closed', displayed: 'contacts' }))} />
                </div>
                <h2 className="bold ml-11">Membres</h2>
                <div className="flex">
                    <IconToggle icon={<BiSearchAlt />} />
                    <IconToggle icon={<IoClose />} onClick={() => setRightbar({ open: false, displayed: "contacts" })} />
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
                                            <div className="online-user-img" style={fullImage(element.picture)}></div>
                                            <div className="online-user-name">
                                                <div className="online-user-pseudo">{element.pseudo}</div>
                                                <div className="online-user-status"><em>Actif</em></div>
                                            </div>
                                        </div>
                                        <ToolsMenu  mobile mobileFull>
                                            <div className="tools_choice" onClick={() => handleClick(element)}><MdOutlineMessage />Envoyer un message</div>
                                            <div className="tools_choice"><IoArrowRedo /><Link to={"/" + element.pseudo}>Voir le profil</Link></div>
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
                                            <div className="online-user-img" style={fullImage(element.picture)}></div>
                                            <div className="online-user-name">
                                                <div className="online-user-pseudo">{element.pseudo}</div>
                                                <div className="online-user-status"><em>Déconnecté</em></div>
                                            </div>
                                        </div>
                                        <ToolsMenu  mobile mobileFull>
                                            <div className="tools_choice" onClick={() => handleClick(element)}><MdOutlineMessage />Envoyer un message</div>
                                            <div className="tools_choice"><IoArrowRedo /><Link to={"/" + element.pseudo}>Voir le profil</Link></div>
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