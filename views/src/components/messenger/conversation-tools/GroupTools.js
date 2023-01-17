import React, { useContext, useState } from 'react'
import { MessengerContext } from '../../AppContext'
import GroupCustomization from './GroupCustomization'
import Icon from '../../tools/icons/Icon'
import Files from './Files'
import Members from './Members'
import Main from './Main'
import Settings from './Settings'
import AddMembers from './AddMembers'
import { ToolsBtn } from '../../tools/global/Button'
import { returnMembersPseudos } from '../functions'
import { isInFavorites, setFavorite, setUnfavorite } from '../actions'
import { addClass, fullImage } from '../../Utils'

const GroupTools = ({ open, setOpen, members }) => {
    const { uid, user, dispatch, md, conversations, setConversations } = useContext(MessengerContext)
    const [navbar, setNavbar] = useState(null)
    const [addMembers, setAddMembers] = useState(false)
    const [files, setFiles] = useState({ open: false, type: null })

    return (
        <div className="conversation-tools-container custom-scrollbar">
            <div className={`conversation-tools-content ${addClass((addMembers || files.open) && open, 'vanish-left')}`}>
                <div className="go-back absolute top-1 left-[10px]">
                    <Icon
                        name="ArrowLeft"
                        onClick={() => setOpen(({ state: !md ? 'open' : 'closed', displayed: 'contacts' }))}
                    />
                </div>
                <ToolsBtn
                    className="absolute right-2 top-1"
                    onClick={() => setOpen({ open: false, displayed: "contacts" })}
                >
                    <Icon name="Cross" />
                </ToolsBtn>
                <div className="conversation-tools-header">
                    <div className="conversation-img-container">
                        {conversations.currentChat.picture ? (
                            <div className="conversation-picture" style={fullImage(conversations.currentChat.picture)}></div>
                        ) : (
                            members.slice(0, 3).map((element, key) => {
                                return <div className="conversation-img" key={key} style={fullImage(element.picture)}></div>
                            })
                        )}
                    </div>

                    {conversations.currentChat?.name ? (
                        <div className="bold text-lg">
                            {conversations.currentChat.name}
                        </div>
                    ) : (
                        <div className="flex items-center pb-3">
                            <div className="conversation-name">
                                {returnMembersPseudos(members)}
                            </div>
                        </div>
                    )}

                    {isInFavorites(user.conversations, conversations.currentChat) ? (
                        <div className="tools-choice"
                            onClick={() => {
                                setUnfavorite(conversations.currentChat._id, uid, dispatch)
                                setConversations(convs => ({
                                    ...convs,
                                    favorites: conversations.favorites.filter(c => c._id !== conversations.currentChat._id),
                                    notFavorites: [conversations.currentChat, ...conversations.notFavorites]
                                }))
                            }}
                        >
                            <Icon name="Star" /> Retirer des favoris
                        </div>
                    ) : (
                        <div className="tools-choice"
                            onClick={() => {
                                setFavorite(conversations.currentChat._id, uid, dispatch)
                                setConversations(convs => ({
                                    ...convs,
                                    favorites: [conversations.currentChat, ...conversations.favorites],
                                    notFavorites: conversations.notFavorites.filter(c => c._id !== conversations.currentChat._id)
                                }))
                            }}
                        >
                            <Icon name="StarHalf" /> Ajouter aux favoris
                        </div>
                    )}
                </div>

                <div className={`tools-displayer ${addClass(navbar === 1, 'open')}`}>
                    <div className="tools-displayer-title" onClick={() => setNavbar(navbar === 1 ? 0 : 1)}>
                        À propos <Icon name="CaretDown" />
                    </div>
                    <Main
                        conversation={conversations.currentChat}
                    />
                </div>

                <div className={`tools-displayer ${addClass(navbar === 2, 'open')}`}>
                    <div className="tools-displayer-title" onClick={() => setNavbar(navbar === 2 ? 0 : 2)}>
                        <p>Membres <span>{members.length + 1}</span></p>
                        <Icon name="CaretDown" />
                    </div>
                    <Members
                        setAddMembers={setAddMembers}
                        conversation={conversations.currentChat}
                    />
                </div>

                <div className={`tools-displayer ${addClass(navbar === 3, 'open')}`}>
                    <div className="tools-displayer-title" onClick={() => setNavbar(navbar === 3 ? 0 : 3)}>
                        <p>Fichiers <span>{conversations.currentChat.files.length}</span></p>
                        <Icon name="CaretDown" />
                    </div>
                    <div className="tools-displayer-content">
                        <div className="tools-choice" onClick={() => setFiles({ open: true, type: 'medias' })}>
                            <Icon name="Picture" /> Multimédia
                        </div>
                        <div className="tools-choice" onClick={() => setFiles({ open: true, type: 'files' })}>
                            <Icon name="FilesMultiples" /> Fichiers
                        </div>
                    </div>
                </div>

                <div className={`tools-displayer ${addClass(navbar === 4, 'open')}`}>
                    <div className="tools-displayer-title" onClick={() => setNavbar(navbar === 4 ? 0 : 4)}>
                        Personnalisation <Icon name="CaretDown" />
                    </div>
                    <GroupCustomization
                        conversation={conversations.currentChat}
                    />
                </div>

                <div className={`tools-displayer ${addClass(navbar === 5, 'open')}`}>
                    <div className="tools-displayer-title" onClick={() => setNavbar(navbar === 5 ? 0 : 5)}>
                        Paramètres <Icon name="CaretDown" />
                    </div>
                    <Settings
                        conversation={conversations.currentChat}
                    />
                </div>
            </div>

            <div className={`conversation-tools-content ${addClass(!addMembers, 'vanish-right')}`}>
                <AddMembers
                    conversation={conversations.currentChat}
                    setAddMembers={setAddMembers}
                />
            </div>

            <div className={`conversation-tools-content ${addClass(!files.open, 'vanish-right')}`}>
                <Files
                    files={files}
                    setFiles={setFiles}
                    conversation={conversations.currentChat}
                />
            </div>
        </div>
    )
}

export default GroupTools