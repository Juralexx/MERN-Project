import React, { useContext, useState } from 'react'
import { MessengerContext } from '../../AppContext'
import Files from './Files'
import Settings from './Settings'
import AddMembers from './AddMembers'
import DialogCustomization from './DialogCustomization'
import { IconToggle } from '../../tools/global/Button'
import { returnMembers } from '../functions/function'
import { setFavorite, setUnfavorite } from '../functions/actions'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { TiStarOutline, TiStar } from 'react-icons/ti'
import { HiArrowSmLeft } from 'react-icons/hi'
import { FiFileText } from 'react-icons/fi'
import { BiImages } from 'react-icons/bi'
import { IoClose } from 'react-icons/io5'
import { fullImage } from '../../Utils'

const DialogTools = ({ open, setOpen, conversation, members }) => {
    const { uid, user, dispatch, md } = useContext(MessengerContext)
    const [navbar, setNavbar] = useState(null)
    const [addMembers, setAddMembers] = useState(false)
    const [files, setFiles] = useState({ open: false, type: null })

    const display = (value) => { if (navbar === value) { return null } else return value }

    return (
        <div className="conversation-tools-container custom-scrollbar">
            <div className={`${!addMembers && files.open === false && open ? "conversation-tools-content" : "conversation-tools-content vanish-left"}`}>
                <div className="go-back absolute top-1 left-[10px]">
                    <HiArrowSmLeft onClick={() => setOpen(({ state: !md ? 'open' : 'closed', displayed: 'contacts' }))} />
                </div>
                <IconToggle icon={<IoClose />} className="absolute right-2 top-1" onClick={() => setOpen({ open: false, displayed: "contacts" })} />
                <div className="conversation-tools-header">
                    <div className="conversation-img-container">
                        <div className="conversation-img" style={fullImage(members[0].picture)}></div>
                    </div>
                    <div className="flex items-center pb-3">
                        <div className="conversation-name">{returnMembers(members)}</div>
                    </div>

                    {user.favorite_conversations && user.favorite_conversations.includes(conversation._id) ? (
                        <div className="tools-choice" onClick={() => setUnfavorite(conversation._id, uid, dispatch)}><TiStar />Retirer des favoris</div>
                    ) : (
                        <div className="tools-choice" onClick={() => setFavorite(conversation._id, uid, dispatch)}><TiStarOutline />Ajouter aux favoris</div>
                    )}
                </div>

                <div className={`${navbar === 4 ? "tools-displayer open" : "tools-displayer"}`}>
                    <div className="tools-displayer-title" onClick={() => setNavbar(display(4))}>
                        <p>Personnalisation</p>
                        <MdOutlineKeyboardArrowDown />
                    </div>
                    <DialogCustomization
                        conversation={conversation}
                    />
                </div>

                <div className={`${navbar === 3 ? "tools-displayer open" : "tools-displayer"}`}>
                    <div className="tools-displayer-title" onClick={() => setNavbar(display(3))}>
                        <p>Fichiers <span>{conversation.files.length}</span></p>
                        <MdOutlineKeyboardArrowDown />
                    </div>
                    <div className="tools-displayer-content">
                        <div className="tools-choice" onClick={() => setFiles({ open: true, type: 'medias' })}><BiImages /> Multimédia</div>
                        <div className="tools-choice" onClick={() => setFiles({ open: true, type: 'files' })}><FiFileText /> Fichiers</div>
                    </div>
                </div>

                <div className={`${navbar === 5 ? "tools-displayer open" : "tools-displayer"}`}>
                    <div className="tools-displayer-title" onClick={() => setNavbar(display(5))}>
                        <p>Paramètres</p>
                        <MdOutlineKeyboardArrowDown />
                    </div>
                    <Settings
                        conversation={conversation}
                    />
                </div>
            </div>

            <div className={`${addMembers ? "conversation-tools-content" : "conversation-tools-content vanish-right"}`}>
                <AddMembers
                    conversation={conversation}
                    setAddMembers={setAddMembers}
                />
            </div>

            <div className={`${files.open === true ? "conversation-tools-content" : "conversation-tools-content vanish-right"}`}>
                {files.open === true &&
                    <Files
                        files={files}
                        setFiles={setFiles}
                        conversation={conversation}
                    />
                }
            </div>
        </div>
    )
}

export default DialogTools