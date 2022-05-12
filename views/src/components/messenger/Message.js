import React, { useRef, useState } from 'react';
import axios from 'axios';
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./tools/EditorToolbar";
import { Picker } from 'emoji-mart'
import { Emoji } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import ToolsMenu from '../tools/components/ToolsMenu';
import { useClickOutside } from '../tools/functions/useClickOutside';
import { avatar } from '../tools/functions/useAvatar';
import { convertEditorToHTML, convertEditorToString, modifyMessage, removeMessage } from './tools/function';
import { getHourOnly } from '../Utils';
import { MdOutlineContentCopy, MdOutlineAddReaction } from 'react-icons/md'
import { IoSend } from 'react-icons/io5'
import { BsEmojiSmile } from 'react-icons/bs'
import { BiFontFamily } from 'react-icons/bi'
import { FiAtSign } from 'react-icons/fi'

const Message = ({ user, uid, websocket, message, own, uniqueKey, currentChat, dispatch }) => {
    const [hoveredCard, setHoveredCard] = useState(-1)
    const [hoveredPopup, setHoveredPopup] = useState(-1)
    const [messageToModify, setMessageToModify] = useState(-1)
    const [openEditorToolbar, setOpenEditorToolbar] = useState(false)
    const [modifiedMessage, setModifiedMessage] = useState("")

    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
    const [emojis, setEmojis] = useState(message.emojis)
    const wrapperRef = useRef()
    useClickOutside(wrapperRef, setOpenEmojiPicker, false)

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
        Object.assign(emoji, { emoji_sender: user.pseudo, emoji_sender_id: uid })
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

    const handleModifiedMessage = (text, delta, source, editor) => {
        setModifiedMessage(editor.getContents())
    }

    return (
        <div className={own ? "message-container own" : "message-container"}>
            <div className="message" onMouseLeave={() => setHoveredCard(-1)} onMouseEnter={() => setHoveredCard(uniqueKey)} style={{ display: messageToModify === uniqueKey && "flex", minWidth: messageToModify === uniqueKey && "100%" }}>
                <div className="message-content" style={{ display: messageToModify === uniqueKey && "flex", minWidth: messageToModify === uniqueKey && "100%" }}>
                    <div className="message-left">
                        <div className="message-img" style={avatar(message.sender_picture)}></div>
                    </div>
                    <div className="message-right">
                        <div className="message-right-top">
                            <div className="message-sender">{message.sender_pseudo}</div>
                        </div>

                        {message && messageToModify !== uniqueKey ? (
                            <>
                                <div className="message-text" dangerouslySetInnerHTML={convertEditorToHTML(message)}></div>
                                <div className="message-right-bottom">{getHourOnly(new Date(message.createdAt))}</div>
                            </>
                        ) : (
                            <>
                                <div className="message-text-editor conversation-toolsbox">
                                    <EditorToolbar display={openEditorToolbar} />
                                    <ReactQuill
                                        onChange={handleModifiedMessage}
                                        defaultValue={convertEditorToString(message)}
                                        placeholder="Rédiger un messager..."
                                        modules={modules}
                                        formats={formats}
                                    />
                                    <div className="message-text-tools">
                                        <div className="text-tools-left">
                                            <button className="text-tools" onClick={() => setOpenEmojiPicker(!openEmojiPicker)}><BsEmojiSmile /></button>
                                            <button className="text-tools"><FiAtSign /></button>
                                            <button className="text-tools" onClick={() => setOpenEditorToolbar(!openEditorToolbar)}><BiFontFamily /></button>
                                        </div>
                                        <div className="text-tools-right">
                                            <button className="text-tools !mr-2" onClick={() => setMessageToModify(-1)}>Annuler</button>
                                            <button className="send-tool" onClick={() => { modifyMessage(message, modifiedMessage, currentChat, uid, websocket, dispatch); setMessageToModify(-1) }}><IoSend /></button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

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
                    <div className="message-actions" ref={wrapperRef} style={{ display: hoveredCard === uniqueKey && messageToModify !== uniqueKey ? 'flex' : 'none' }}>
                        <div className="message-actions-btn"><Emoji emoji="thumbsup" size={16} /></div>
                        <div className="message-actions-btn"><Emoji emoji=":white_check_mark:" size={16} /></div>
                        <div className="message-actions-btn"><Emoji emoji=":grin:" size={16} /></div>
                        <div className="message-actions-btn" onClick={() => setOpenEmojiPicker(!openEmojiPicker)}><MdOutlineAddReaction /></div>
                        <div className="message-actions-btn" onClick={() => navigator.clipboard.writeText(message.text)}><MdOutlineContentCopy /></div>
                        <ToolsMenu>
                            {message.sender === uid &&
                                <>
                                    <div className="tools_choice" onClick={() => removeMessage(message, currentChat, uid, websocket, dispatch)}>Supprimer le message</div>
                                    <div className="tools_choice" onClick={() => setMessageToModify(uniqueKey)}>Modifier le message</div>
                                </>
                            }
                        </ToolsMenu>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Message;
