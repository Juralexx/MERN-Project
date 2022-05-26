import React, { useEffect, useRef, useState } from 'react';
import { Emoji } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import EmojiPicker from '../../tools/components/EmojiPicker';
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../editor/EditorToolbar";
import Tooltip from '../../tools/components/Tooltip';
import ToolsMenu from '../../tools/components/ToolsMenu';
import Warning from '../../tools/components/Warning';
import { useClickOutside } from '../../tools/functions/useClickOutside';
import { avatar } from '../../tools/functions/useAvatar';
import { SmallAvatar } from '../../tools/components/Avatars';
import { concatSameEmojis, convertDeltaToHTML, convertDeltaToString, convertDeltaToStringNoHTML, deleteFiles, handleEditor, like, modifyMessage, otherMembersIDs, removeMessage, returnMessageFiles } from '../tools/function';
import { dateParserWithoutYear, download, getHourOnly, randomNbID } from '../../Utils';
import { addEmoji, removeEmoji } from '../../../actions/messenger.action';
import { MdClear, MdFileDownload, MdAddReaction, MdThumbUp } from 'react-icons/md'
import { IoArrowRedo, IoArrowUndo, IoTrashBin } from 'react-icons/io5'
import { RiEdit2Fill, RiFileCopyFill } from 'react-icons/ri';
import { BiFontFamily } from 'react-icons/bi'

const Message = ({ user, uid, websocket, message, uniqueKey, className, currentChat, dispatch }) => {
    const [modify, setModify] = useState(-1)
    const [isToolbar, setToolbar] = useState(false)
    const [modifiedMessage, setModifiedMessage] = useState("")
    const [hovered, setHovered] = useState(false)
    const [warning, setWarning] = useState(false)
    const messageRef = useRef()
    const [opened, setOpened] = useState(false)
    useClickOutside(messageRef, setOpened, false)
    const [emojis, setEmojis] = useState([])

    useEffect(() => {
        if (message.emojis.length > 0)
            setEmojis(concatSameEmojis(message.emojis))
    }, [message.emojis.length, message.emojis])

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

    return (
        <div className={opened ? "message-container hovered " + className : "message-container " + className} data-hour={getHourOnly(new Date(message.createdAt))} ref={messageRef} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <div className="message" style={{ display: modify === uniqueKey && "flex" }}>
                <div className="message-left">
                    <div className="message-img" style={avatar(message.sender_picture)}></div>
                </div>
                <div className="message-right">
                    <div className="message-right-top">{message.sender_pseudo} <span>{getHourOnly(new Date(message.createdAt))} {message.modified && "(modifié)"}</span></div>

                    {message && modify !== uniqueKey ? (
                        <>
                            {Object.keys(message.text).length > 0 &&
                                <div className="message-text" dangerouslySetInnerHTML={convertDeltaToHTML(message)}></div>
                            }
                            {message.files && message.files.length > 0 &&
                                message.files.map((file, key) => {
                                    return (
                                        <div className="message-files-container" key={key}>
                                            <p className="txt-sec f-12">{file.name}</p>
                                            <div className="files-block">
                                                {returnMessageFiles(file)}
                                                <div className="files-tools">
                                                    <button><a href={file.url} rel="noreferrer" target="_blank"><IoArrowRedo /></a></button>
                                                    <button className="files-tools-btn" onClick={() => download(file)}><MdFileDownload /></button>
                                                    <button className="files-tools-btn" onClick={() => deleteFiles(file, user, websocket, currentChat, message, dispatch)}><MdClear /></button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </>
                    ) : (
                        <div className="conversation-toolsbox">
                            <div className="message-text-editor">
                                <div className="message-editor-container">
                                    <EditorToolbar style={{ display: isToolbar ? "block" : "none" }} />
                                    <ReactQuill
                                        onChange={(text, delta, source, editor) => setModifiedMessage(handleEditor(text, delta, source, editor))}
                                        defaultValue={convertDeltaToString(message)}
                                        placeholder="Rédiger un messager..."
                                        modules={modules}
                                        formats={formats}
                                    />
                                </div>
                                <div className="message-text-tools">
                                    <div className="text-tools-left">
                                        <EmojiPicker btnClassName="text-tools" onSelect={emoji => handleEmoji(emoji)} />
                                        <button className="text-tools" onClick={() => setToolbar(!isToolbar)}><BiFontFamily /></button>
                                    </div>
                                    <div className="text-tools-right">
                                        <button className="cancel-tool" onClick={() => { setModify(-1); setOpened(!opened) }}>Annuler</button>
                                        <button className="send-tool" onClick={() => { modifyMessage(message, modifiedMessage, currentChat, uid, websocket, dispatch); setModify(-1) }}>Enregistrer</button>
                                    </div>
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
                                        <p>{emojisGrouped.length}</p>
                                    </div>
                                )
                            })}
                            <EmojiPicker btnClassName="emoji-add" onSelect={handleEmoji} onClick={() => setOpened(!opened)} />
                        </div>
                    }
                </div>

                {(hovered || opened) && modify !== uniqueKey &&
                    <div className="message-actions">
                        <Tooltip content={<p>Liker</p>}>
                            <div className="message-actions-btn" onClick={() => handleEmoji(like)}><MdThumbUp /></div>
                        </Tooltip>
                        <Tooltip content={<p>Réagir</p>}>
                            <EmojiPicker btnClassName="message-actions-btn" onSelect={handleEmoji} onClick={() => setOpened(!opened)} />
                        </Tooltip>
                        <Tooltip content={<p>Répondre</p>}>
                            <div className="message-actions-btn"><IoArrowUndo /></div>
                        </Tooltip>
                        {message.sender === uid &&
                            <Tooltip content={<p>Modifier</p>}>
                                <div className="message-actions-btn" onClick={() => setModify(uniqueKey)}><RiEdit2Fill /></div>
                            </Tooltip>
                        }
                        <ToolsMenu btnClassName="message-actions-btn" onClick={() => setOpened(!opened)}>
                            <div className="tools_choice"><IoArrowUndo /> Répondre</div>
                            <div className="tools_choice"><MdAddReaction /> Ajouter une réaction</div>
                            <div className="tools_choice" onClick={() => navigator.clipboard.writeText(convertDeltaToString(message))}><RiFileCopyFill /> Copier le message</div>
                            {message.sender === uid &&
                                <>
                                    <div className="tools_choice" onClick={() => setModify(uniqueKey)}><RiEdit2Fill /> Modifier le message</div>
                                    <div className="tools_choice" onClick={() => { setWarning(true); setOpened(true) }}><IoTrashBin />Supprimer le message</div>
                                </>
                            }
                        </ToolsMenu>
                    </div>
                }

                {warning &&
                    <Warning
                        title="Supprimer le message"
                        text="Voulez-vous vraiment supprimer ce message ? Cette action est irréversible."
                        validateBtn="Supprimer"
                        open={warning}
                        setOpen={setWarning}
                        onValidate={() => removeMessage(message, currentChat, uid, websocket, dispatch)}
                        onClose={() => setOpened(false)}
                    >
                        <div className="message-delete-preview">
                            <div className="message-preview-left">
                                <SmallAvatar pic={message.sender_picture} />
                            </div>
                            <div className="message-preview-right">
                                <div className="message-preview-right-top">
                                    {message.sender_pseudo} <span>{dateParserWithoutYear(message.createdAt)} à {getHourOnly(new Date(message.createdAt))}</span>
                                </div>
                                <p className="message-text">
                                    {Object.keys(message.text).length > 0 ? (
                                        convertDeltaToStringNoHTML(message)
                                    ) : (
                                        message.files.length > 0 && message.files[0].name
                                    )}
                                </p>
                            </div>
                        </div>
                    </Warning>
                }
            </div>
        </div>
    )
}

export default Message;
