import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./tools/EditorToolbar";
import EmojiPicker from '../tools/components/EmojiPicker';
import Tooltip from '../tools/components/Tooltip';
import { Emoji } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import ToolsMenu from '../tools/components/ToolsMenu';
import { useClickOutside } from '../tools/functions/useClickOutside';
import { avatar } from '../tools/functions/useAvatar';
import { concatSameEmojis, convertEditorToHTML, convertEditorToString, modifyMessage, otherMembersIDs, removeMessage } from './tools/function';
import { getHourOnly, randomNbID } from '../Utils';
import { MdOutlineAddReaction, MdOutlineContentCopy } from 'react-icons/md'
import { IoArrowUndoOutline, IoSend, IoTrashOutline } from 'react-icons/io5'
import { BiFontFamily } from 'react-icons/bi'
import { FiAtSign, FiEdit, FiThumbsUp } from 'react-icons/fi'
import { addEmoji, removeEmoji } from '../../actions/messenger.action';

const Message = ({ user, uid, websocket, message, uniqueKey, className, currentChat, dispatch }) => {
    const [messageToModify, setMessageToModify] = useState(false)
    const [openEditorToolbar, setOpenEditorToolbar] = useState(false)
    const [modifiedMessage, setModifiedMessage] = useState("")
    const messageRef = useRef()
    const [hovered, setHovered] = useState(false)
    const [opened, setOpened] = useState(false)
    useClickOutside(messageRef, setOpened, false)
    const [emojis, setEmojis] = useState(concatSameEmojis(message.emojis))
    let like = { id: "+1", name: "Thumbs Up Sign", short_names: ["+1", "thumbsup"], colons: ":+1:", emoticons: [], unified: "1f44d", skin: 1, native: "👍" }

    useEffect(() => {
        if (message.emojis.length > 0)
            setEmojis(concatSameEmojis(message.emojis))
    }, [message.emojis.length])

    const handleEmoji = (emoji) => {
        let emoj = { ...emoji, _id: randomNbID(24), sender_pseudo: user.pseudo, sender_id: uid }
        otherMembersIDs(currentChat, uid).map(memberId => {
            return websocket.current.emit("addEmoji", {
                receiverId: memberId,
                conversationId: currentChat._id,
                messageId: message._id,
                emoji: emoj
            })
        })
        dispatch(addEmoji(currentChat._id, message._id, emoj))
    }

    const deleteEmoji = (emojisGrouped) => {
        let emoji = emojisGrouped.find(e => e.sender_id === uid)
        otherMembersIDs(currentChat, uid).map(memberId => {
            return websocket.current.emit("removeEmoji", {
                receiverId: memberId,
                conversationId: currentChat._id,
                messageId: message._id,
                emojiId: emoji._id
            })
        })
        dispatch(removeEmoji(currentChat._id, message._id, emoji._id))
    }

    const handleEditor = (text, delta, source, editor) => {
        setModifiedMessage(editor.getContents())
    }

    return (
        <div className={opened ? "message-container hovered " + className : "message-container " + className} data-hour={getHourOnly(new Date(message.createdAt))} ref={messageRef} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <div className="message" style={{ display: messageToModify === uniqueKey && "flex", minWidth: messageToModify === uniqueKey && "100%" }}>
                <div className="message-left">
                    <div className="message-img" style={avatar(message.sender_picture)}></div>
                </div>
                <div className="message-right">
                    <div className="message-right-top">{message.sender_pseudo} <span>{getHourOnly(new Date(message.createdAt))}</span></div>

                    {message && messageToModify !== uniqueKey ? (
                        <div className="message-text" dangerouslySetInnerHTML={convertEditorToHTML(message)}></div>
                    ) : (
                        <div className="message-text-editor conversation-toolsbox">
                            <EditorToolbar display={openEditorToolbar} />
                            <ReactQuill
                                onChange={handleEditor}
                                defaultValue={convertEditorToString(message)}
                                placeholder="Rédiger un messager..."
                                modules={modules}
                                formats={formats}
                            />
                            <div className="message-text-tools">
                                <div className="text-tools-left">
                                    <EmojiPicker btnClassName="text-tools" onSelect={emoji => handleEmoji(emoji)} />
                                    <button className="text-tools"><FiAtSign /></button>
                                    <button className="text-tools" onClick={() => setOpenEditorToolbar(!openEditorToolbar)}><BiFontFamily /></button>
                                </div>
                                <div className="text-tools-right">
                                    <button className="text-tools !mr-2" onClick={() => setMessageToModify(-1)}>Annuler</button>
                                    <button className="send-tool" onClick={() => { modifyMessage(message, modifiedMessage, currentChat, uid, websocket, dispatch); setMessageToModify(-1) }}><IoSend /></button>
                                </div>
                            </div>
                        </div>
                    )}

                    {emojis.length > 0 &&
                        <div className="message-emoji-container">
                            {emojis.map((emojisGrouped, key) => {
                                let names = emojisGrouped.map(e => { return e.sender_pseudo })
                                let ids = emojisGrouped.map(e => { return e.sender_id })
                                let emoji = emojisGrouped[0]
                                return (
                                    <div className={`${ids.includes(uid) ? "emoji own" : "emoji"}`} key={key} onClick={() => ids.includes(uid) ? deleteEmoji(emojisGrouped) : handleEmoji(emojisGrouped[0])}>
                                        <Tooltip content={
                                            <div className="emoji-popup">
                                                <Emoji emoji={emoji} size={36} set='twitter' />
                                                {names.length > 1 ? (
                                                    <p>{names.toString().replace(",", ", ") + " ont réagit avec " + emoji.colons}</p>
                                                ) : (
                                                    <p>{emoji.sender_pseudo + " a réagit avec " + emoji.colons}</p>
                                                )}
                                            </div>
                                        }>
                                            <Emoji emoji={emoji} size={16} set='twitter' />
                                        </Tooltip>
                                        {emojisGrouped.length > 1 &&
                                            <p>{emojisGrouped.length}</p>
                                        }
                                    </div>
                                )
                            })}
                            <EmojiPicker btnClassName="emoji-add" onSelect={handleEmoji} onClick={() => setOpened(!opened)} />
                        </div>
                    }
                </div>

                {(hovered || opened) && !messageToModify &&
                    <div className="message-actions">
                        <Tooltip content={<p>Liker</p>}>
                            <div className="message-actions-btn" onClick={() => handleEmoji(like)}><FiThumbsUp /></div>
                        </Tooltip>
                        <Tooltip content={<p>Réagir</p>}>
                            <EmojiPicker btnClassName="message-actions-btn" onSelect={handleEmoji} onClick={() => setOpened(!opened)} />
                        </Tooltip>
                        <Tooltip content={<p>Répondre</p>}>
                            <div className="message-actions-btn"><IoArrowUndoOutline /></div>
                        </Tooltip>
                        {message.sender === uid &&
                            <Tooltip content={<p>Modifier</p>}>
                                <div className="message-actions-btn" onClick={() => setMessageToModify(uniqueKey)}><FiEdit /></div>
                            </Tooltip>
                        }
                        <ToolsMenu btnClassName="message-actions-btn" onClick={() => setOpened(!opened)}>
                            <div className="tools_choice"><IoArrowUndoOutline /> Répondre</div>
                            <div className="tools_choice"><MdOutlineAddReaction /> Ajouter une réaction</div>
                            <div className="tools_choice" onClick={() => navigator.clipboard.writeText(message.text)}><MdOutlineContentCopy /> Copier le message</div>
                            {message.sender === uid &&
                                <>
                                    <div className="tools_choice" onClick={() => setMessageToModify(uniqueKey)}><FiEdit /> Modifier le message</div>
                                    <div className="tools_choice" onClick={() => removeMessage(message, currentChat, uid, websocket, dispatch)}><IoTrashOutline />Supprimer le message</div>
                                </>
                            }
                        </ToolsMenu>
                    </div>
                }
            </div>
        </div>
    )
}

export default Message;
