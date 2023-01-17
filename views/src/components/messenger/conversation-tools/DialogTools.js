import React, { useContext, useState } from 'react'
import { MessengerContext } from '../../AppContext'
import Icon from '../../tools/icons/Icon'
import Files from './Files'
import Settings from './Settings'
import DialogCustomization from './DialogCustomization'
import { ToolsBtn } from '../../tools/global/Button'
import { returnMembersPseudos } from '../functions'
import { isInFavorites, setFavorite, setUnfavorite } from '../actions'
import { addClass, fullImage } from '../../Utils'

const DialogTools = ({ open, setOpen, members }) => {
    const { uid, user, dispatch, md, conversations, setConversations } = useContext(MessengerContext)
    const [navbar, setNavbar] = useState(null)
    const [files, setFiles] = useState({ open: false, type: null })

    return (
        <div className="conversation-tools-container custom-scrollbar">
            <div className={`conversation-tools-content ${addClass(files.open && open, 'vanish-left')}`}>
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
                        <div className="conversation-img" style={fullImage(members[0].picture)}></div>
                    </div>
                    <div className="flex items-center pb-3">
                        <div className="conversation-name">
                            {returnMembersPseudos(members)}
                        </div>
                    </div>

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
                        Personnalisation <Icon name="CaretDown" />
                    </div>
                    <DialogCustomization
                        conversation={conversations.currentChat}
                    />
                </div>

                <div className={`tools-displayer ${addClass(navbar === 2, 'open')}`}>
                    <div className="tools-displayer-title" onClick={() => setNavbar(navbar === 2 ? 0 : 2)}>
                        <p>Fichiers <span>{conversations.currentChat.files.length}</span></p>
                        <Icon name="CaretDown" />
                    </div>
                    <div className="tools-displayer-content">
                        <div className="tools-choice" onClick={() => setFiles({ open: true, type: 'medias' })}>
                            <Icon name="Pictures" /> Multimédia
                        </div>
                        <div className="tools-choice" onClick={() => setFiles({ open: true, type: 'files' })}>
                            <Icon name="File" /> Fichiers
                        </div>
                    </div>
                </div>

                <div className={`tools-displayer ${addClass(navbar === 3, 'open')}`}>
                    <div className="tools-displayer-title" onClick={() => setNavbar(navbar === 3 ? 0 : 3)}>
                        <p>Paramètres</p>
                        <Icon name="CaretDown" />
                    </div>
                    <Settings
                        conversation={conversations.currentChat}
                    />
                </div>
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

export default DialogTools