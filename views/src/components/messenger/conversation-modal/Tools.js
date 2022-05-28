import React, { useState, useMemo } from 'react'
import { getMembers, returnMembers } from '../tools/function'
import { avatar } from '../../tools/functions/useAvatar'
import Files from './Files'
import Members from './Members'
import Main from './Main'
import Customization from './Customization'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import AddMembers from './AddMembers'
import { FiFileText } from 'react-icons/fi'
import { BiImages } from 'react-icons/bi'
import Settings from './Settings'
import { HiArrowSmLeft } from 'react-icons/hi'

const Tools = ({ uid, websocket, dispatch, open, setOpen, conversation, friendsArr }) => {
    const members = useMemo(() => getMembers(conversation, uid), [conversation, uid])
    const [navbar, setNavbar] = useState(null)
    const [addMembers, setAddMembers] = useState(false)
    const [files, setFiles] = useState({ open: false, type: null })

    const display = (value) => {
        if (navbar === value) {
            return null
        } else return value
    }

    return (
        <div className="conversation-tools-container">
            <div className={`${!addMembers && files.open === false && open ? "conversation-tools-content" : "conversation-tools-content vanish-left"}`}>
                <div className="go-back">
                    <HiArrowSmLeft onClick={() => setOpen(false)} />
                    <p>Retour</p>
                </div>
                <div className="conversation-tools-header">
                    <div className="conversation-img-container">
                        {conversation.picture ? (
                            <div className="conversation-picture" style={avatar(conversation.picture)}></div>
                        ) : (
                            members.slice(0, 3).map((element, key) => {
                                return (
                                    <div className="conversation-img" key={key} style={avatar(element.picture)}></div>
                                )
                            })
                        )}
                    </div>
                    {conversation.name ? (
                        <div className="bold text-lg">{conversation.name}</div>
                    ) : (
                        <div className="flex items-center pb-3">
                            <div className="conversation-name">{returnMembers(members)}</div>
                        </div>
                    )}
                </div>

                <div className={`${navbar === 1 ? "tools-displayer open" : "tools-displayer"}`}>
                    <div className="tools-displayer-title" onClick={() => setNavbar(display(1))}>
                        <p>À propos</p>
                        <MdOutlineKeyboardArrowDown />
                    </div>
                    <Main
                        conversation={conversation}
                    />
                </div>

                <div className={`${navbar === 2 ? "tools-displayer open" : "tools-displayer"}`}>
                    <div className="tools-displayer-title" onClick={() => setNavbar(display(2))}>
                        <p>Membres <span>{members.length + 1}</span></p>
                        <MdOutlineKeyboardArrowDown />
                    </div>
                    <Members
                        uid={uid}
                        websocket={websocket}
                        members={members}
                        setAddMembers={setAddMembers}
                        conversation={conversation}
                        dispatch={dispatch}
                    />
                </div>

                <div className={`${navbar === 3 ? "tools-displayer open" : "tools-displayer"}`}>
                    <div className="tools-displayer-title" onClick={() => setNavbar(display(3))}>
                        <p>Fichiers <span>{conversation.files.length}</span></p>
                        <MdOutlineKeyboardArrowDown />
                    </div>
                    <div className="tools-choice" onClick={() => setFiles({ open: true, type: 'medias' })}><BiImages /> Multimédia</div>
                    <div className="tools-choice" onClick={() => setFiles({ open: true, type: 'files' })}><FiFileText /> Fichiers</div>
                </div>

                <div className={`${navbar === 4 ? "tools-displayer open" : "tools-displayer"}`}>
                    <div className="tools-displayer-title" onClick={() => setNavbar(display(4))}>
                        <p>Personnalisation</p>
                        <MdOutlineKeyboardArrowDown />
                    </div>
                    <Customization
                        uid={uid}
                        websocket={websocket}
                        conversation={conversation}
                        dispatch={dispatch}
                    />
                </div>

                <div className={`${navbar === 5 ? "tools-displayer open" : "tools-displayer"}`}>
                    <div className="tools-displayer-title" onClick={() => setNavbar(display(5))}>
                        <p>Paramètres</p>
                        <MdOutlineKeyboardArrowDown />
                    </div>
                    <Settings
                        uid={uid}
                        websocket={websocket}
                        conversation={conversation}
                        dispatch={dispatch}
                    />
                </div>
            </div>

            <div className={`${addMembers ? "conversation-tools-content" : "conversation-tools-content vanish-right"}`}>
                <AddMembers
                    uid={uid}
                    websocket={websocket}
                    friendsArr={friendsArr}
                    conversation={conversation}
                    setAddMembers={setAddMembers}
                    dispatch={dispatch}
                />
            </div>

            <div className={`${files.open === true ? "conversation-tools-content" : "conversation-tools-content vanish-right"}`}>
                <Files
                    uid={uid}
                    websocket={websocket}
                    files={files}
                    setFiles={setFiles}
                    conversation={conversation}
                    dispatch={dispatch}
                />
            </div>
        </div>
    )
}

export default Tools