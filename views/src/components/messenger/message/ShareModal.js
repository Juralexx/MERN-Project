import React, { useContext, useEffect, useRef, useState } from 'react'
import Modal from '../../tools/components/Modal'
import ReactQuill from "react-quill";
import EditorToolbar, { formats, modules } from '../editor/EditorToolbar';
import EmojiPicker from '../tools/EmojiPicker';
import Mention from '../editor/Mention';
import Emoji from '../editor/Emoji';
import Link from '../editor/Link';
import { MessengerContext } from '../../AppContext';
import { useQuill } from '../editor/useQuill';
import { useEmoji } from '../editor/useEmoji';
import { useMention } from '../editor/useMention';
import { pickEmoji, convertDeltaToStringNoHTML } from '../functions/function';
import { IoText } from 'react-icons/io5'
import { BsEmojiSmile } from 'react-icons/bs'
import { MdOutlineLink, MdOutlineAlternateEmail } from 'react-icons/md';
import { SmallAvatar } from '../../tools/components/Avatars';
import { dateParserWithoutYear, getHourOnly } from '../../Utils';

const ShareModal = ({ open, setOpen, message, handleSubmit }) => {
    const { currentChat, members } = useContext(MessengerContext)

    const quillRef = useRef()
    let quill = quillRef?.current?.getEditor()
    useQuill(quill)

    const [isToolbar, setToolbar] = useState(true)
    const [position, setPosition] = useState(0)
    const [disabled, setDisabled] = useState(true)

    const { isMention, setMention, mentionsResults, setMentionResults, openMention } = useMention(quill, members)
    const { isEmoji, setEmoji, emojisResults, setEmojisResults, emojiArr, onKeyPressed } = useEmoji(quill)

    const [isLink, setLink] = useState(false)

    useEffect(() => {
        if (quill)
            quill.focus()
    }, [quill])

    /**
     * Handle message 
     */

    const handleNewMessage = (text, delta, source, editor) => {
        if (quill) {
            let length = editor.getLength()
            let txt = editor.getText()

            if (length > 1) {
                setDisabled(false)
            } else setDisabled(true)

            if (length <= 1) {
                setPosition(0)
                if (isMention) {
                    setMention(false)
                }
                if (isEmoji) {
                    setEmoji(false)
                }
            }

            if (length > 1) {
                let index = editor.getSelection().index
                let previous = txt[index - 2]
                let current = txt[index - 1]

                if (!isMention) {
                    if (current === '@' && (previous === undefined || !(/[a-zA-Z]/).test(previous))) {
                        setMention(true)
                        setPosition(index - 1)
                    }
                } else {
                    if (txt[position] !== "@") {
                        setMention(false)
                    } else if (length > position + 1) {
                        let query = txt.slice(position + 1, length - 1)

                        if (!query || query.length === 0) {
                            setMentionResults(members)
                        } else if (query.trim() === "") {
                            setMention(false)
                        } else {
                            let regexp = new RegExp(query, 'i')
                            const results = members.filter(member => regexp.test(member['pseudo']))
                            setMentionResults(results)
                        }
                    } else if (length === position + 1) {
                        let next = txt[position + 1]

                        if (!(/[a-zA-Z]/).test(next) || (/\s/).test(next)) {
                            setMention(false)
                        }
                    }
                }

                if (!isEmoji) {
                    if (current === ':' && (previous === undefined || !(/[a-zA-Z]/).test(previous))) {
                        setEmoji(true)
                        setPosition(index - 1)
                    }
                } else {
                    if (txt[position] !== ":") {
                        setEmoji(false)
                    } else if (length > position + 1) {
                        let query = txt.slice(position + 1, length - 1)

                        if (!query || query.length === 0) {
                            setEmojisResults([])
                        } else if (query.trim() === "") {
                            setEmoji(false)
                        } else {
                            if (/\W|[_]/g.test(query)) {
                                query = query.replace(/\W|_/g, '[$&]')
                            }
                            let regexp = new RegExp(query, 'i')
                            const results = emojiArr.filter(emoji => regexp.test(emoji.id))
                            setEmojisResults(results)
                        }
                    } else if (length === position + 1) {
                        let next = txt[position + 1]

                        if ((/\s/).test(next)) {
                            setEmoji(false)
                        }
                    }
                }
            }
        }
    }

    /**
     * On message submission
     */

    const onSubmit = () => {
        if (quill.getLength() > 1) {
            let messageContent = quill.getLength() > 1 ? quill.getContents() : []
            handleSubmit(currentChat, messageContent, [], message)
            setOpen(false)
        }
    }

    return (
        <Modal open={open} setOpen={setOpen} className="share-message-modal">
            <h2>Partagez ce message</h2>
            <div className="conversation-toolsbox">
                <div className="message-text-editor">
                    <EditorToolbar />
                    <div className="message-editor-container min-h-[100px]">
                        <Mention
                            quill={quill}
                            members={members}
                            isMention={isMention}
                            setMention={setMention}
                            mentionsResults={mentionsResults}
                            setMentionResults={setMentionResults}
                            position={position}
                            setPosition={setPosition}
                        />
                        <Emoji
                            quill={quill}
                            isEmoji={isEmoji}
                            setEmoji={setEmoji}
                            emojisResults={emojisResults}
                            setEmojisResults={setEmojisResults}
                            position={position}
                            setPosition={setPosition}
                        />
                        <Link
                            quill={quill}
                            isLink={isLink}
                            setLink={setLink}
                            position={position}
                        />
                        <ReactQuill
                            ref={quillRef}
                            placeholder="Modification du message"
                            modules={modules}
                            formats={formats}
                            defaultValue=""
                            onChange={handleNewMessage}
                            onKeyUp={event => onKeyPressed(event)}
                        />
                    </div>
                </div>
                <div className="message-text-tools">
                    <div className="text-tools-left">
                        <EmojiPicker placement="top-start" btnClassName="text-tools" icon={<BsEmojiSmile />} onSelect={emoji => pickEmoji(emoji, quill)} onClick={() => quillRef?.current?.focus()} />
                        <button className="text-tools" onClick={() => openMention(quill)}><MdOutlineAlternateEmail /></button>
                        <button className="text-tools" onClick={() => setToolbar(!isToolbar)}><IoText /></button>
                        <button className="text-tools" onClick={() => setLink(!isLink)}><MdOutlineLink /></button>
                    </div>
                </div>
            </div>
            <div className="message-preview small">
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
            <div className="btn-container">
                <button className="cancel-tool" onClick={() => setOpen(false)}>Annuler</button>
                <button className="save-tool" disabled={disabled} onClick={onSubmit}>Partager</button>
            </div>
        </Modal>
    )
}

export default ShareModal