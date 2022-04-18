import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useClickOutside } from '../tools/functions/useClickOutside';
import { avatar } from '../tools/functions/useAvatar';
import { getHourOnly } from '../Utils';
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./tools/EditorToolbar";
import { Picker } from 'emoji-mart'
import { Emoji } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import { MdOutlineContentCopy, MdOutlineAddReaction } from 'react-icons/md'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoSend } from 'react-icons/io5'
import { BsEmojiSmile } from 'react-icons/bs'
import { BiFontFamily } from 'react-icons/bi'
import { FiAtSign } from 'react-icons/fi'
import { convertEditorToHTML, convertEditorToString } from './tools/function';

const Message = ({ message, own, uniqueKey, uid, currentChat, websocket, setModifiedMessage, modifyMessage, deleteMessage }) => {
    const userData = useSelector((state) => state.userReducer)
    const [hoveredCard, setHoveredCard] = useState(-1)
    const [hoveredPopup, setHoveredPopup] = useState(-1)
    const [hovered, setHovered] = useState(false)
    const [openToolsMenu, setOpenToolsMenu] = useState(false)
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
    const [emojis, setEmojis] = useState(message.emojis)
    const wrapperRef = useRef()
    const [messageToModify, setMessageToModify] = useState(-1)
    const [openEditorToolbar, setOpenEditorToolbar] = useState(false)
    const [modified, setModified] = useState(false)

    const showCardHandler = (key) => { setHoveredCard(key); setHovered(true) }
    const hideCardHandler = () => { setHoveredCard(-1); setHovered(false) }

    const handleEmoji = async (emoji) => {
        let ids = []
        currentChat.members.map(member => { return ids = [...ids, member.id] })
        ids.map(memberId => {
            return websocket.current.emit("addEmoji", {
                receiverId: memberId,
                conversationId: currentChat._id,
                messageId: message._id,
                emoji: emoji
            })
        })

        setEmojis([...emojis, emoji])
        Object.assign(emoji, { emoji_sender: userData.pseudo, emoji_sender_id: uid })
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/messages/single/${message._id}`,
            data: { emojis: emoji }
        })
        setOpenEmojiPicker(false)
    }

    const deleteEmoji = async (emoji) => {
        let storedArray = emojis.slice()
        let index = storedArray.findIndex(element => element.id === emoji.id && element.sender_pseudo === emoji.sender_pseudo)
        storedArray.splice(index, 1)
        setEmojis(storedArray)

        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/messages/single/remove-emoji/${message._id}`,
            data: { emojis: emoji }
        })
    }

    useClickOutside(wrapperRef, setOpenEmojiPicker, false)

    const handleModifiedMessage = (text, delta, source, editor) => {
        setModifiedMessage(editor.getContents());
        setModified(true)
    }

    return (
        <div className={own ? "message own" : "message"} onMouseLeave={hideCardHandler} onMouseEnter={() => showCardHandler(uniqueKey)}>
            <div className="message-left">
                <div className="message-img" style={avatar(message.sender_picture)}></div>
            </div>
            <div className="message-right">
                <div className="message-right-top">
                    <div className="message-sender">{message.sender_pseudo} <span>{getHourOnly(new Date(message.createdAt))}</span></div>
                </div>

                {message && messageToModify !== uniqueKey && <div className="message-text" dangerouslySetInnerHTML={convertEditorToHTML(message)}></div>}

                {message && messageToModify === uniqueKey &&
                    <>
                        <div className="message-text-editor">
                            <EditorToolbar display={openEditorToolbar} />
                            <div>
                                <ReactQuill
                                    onChange={handleModifiedMessage}
                                    defaultValue={convertEditorToString(message)}
                                    placeholder={"Envoyer un message..."}
                                    modules={modules}
                                    formats={formats}
                                />
                            </div>
                        </div>
                        <div className="message-text-tools">
                            <div className="left">
                                <button className="btn btn-secondary" onClick={() => setOpenEmojiPicker(!openEmojiPicker)}><BsEmojiSmile /></button>
                                <button className="btn btn-secondary"><FiAtSign /></button>
                                <button className="btn btn-secondary" onClick={() => setOpenEditorToolbar(!openEditorToolbar)}><BiFontFamily /></button>
                            </div>
                            <div className="right">
                                <button className="btn btn-secondary" onClick={() => setMessageToModify(-1)}>Annuler</button>
                                <button className="btn btn-secondary" disabled={!modified} onClick={() => { modifyMessage(message); setMessageToModify(-1) }}><IoSend /></button>
                            </div>
                        </div>
                    </>
                }

                {emojis && emojis.length > 0 && (
                    <div className="emoji-container">
                        {emojis.map((emoji, key) => {
                            return (
                                <div className="emoji" key={key} onMouseEnter={() => setHoveredPopup(key)} onMouseLeave={setHoveredPopup}>
                                    <Emoji emoji={emoji} size={14} onClick={() => emoji.emoji_sender_id === uid && (deleteEmoji(emoji))} />
                                    {hoveredPopup === key && (
                                        <div className="emoji-popup">
                                            <Emoji emoji={emoji} size={26} />
                                            <p>{emoji.emoji_sender + " a réagit avec " + emoji.colons}</p>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                        <div className="emoji-add" onClick={() => setOpenEmojiPicker(!openEmojiPicker)} ref={wrapperRef}>
                            <MdOutlineAddReaction />
                        </div>
                    </div>
                )}
            </div>
            {openEmojiPicker &&
                <div ref={wrapperRef}>
                    <Picker emoji="point_up" onClick={(emoji) => handleEmoji(emoji)} style={{ position: "absolute", top: -80, right: 0, transform: "scale(0.7)", zIndex: 10 }} />
                </div>
            }
            <div className="message-actions" ref={wrapperRef} style={{ display: hoveredCard === uniqueKey ? 'flex' : 'none' }}>
                <div className="message-actions-btn">
                    <Emoji emoji="thumbsup" size={16} />
                </div>
                <div className="message-actions-btn">
                    <Emoji emoji=":white_check_mark:" size={16} />
                </div>
                <div className="message-actions-btn">
                    <Emoji emoji=":grin:" size={16} />
                </div>
                <div className="message-actions-btn" onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>
                    <MdOutlineAddReaction />
                </div>
                <div className="message-actions-btn" onClick={() => navigator.clipboard.writeText(message.text)}>
                    <MdOutlineContentCopy />
                </div>
                <div className="message-actions-btn" onClick={() => setOpenToolsMenu(!openToolsMenu)}>
                    <BsThreeDotsVertical />
                </div>

                {openToolsMenu && hovered && (
                    message.sender === uid && (
                        <div className="message-tools-menu">
                            <button onClick={() => { deleteMessage(message); setHovered(false) }}>Supprimer le message</button>
                            <button onClick={() => { setMessageToModify(uniqueKey) }}>Modifier le message</button>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Message;
