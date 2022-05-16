import React, { useMemo, useState } from 'react'
import axios from 'axios';
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./tools/EditorToolbar";
import ScrollButton from './tools/ScrollButton';
import Typing from './tools/Typing';
import EmojiPicker from '../tools/components/EmojiPicker';
import { getMembers, otherMembersIDs } from './tools/function';
import { TinyAvatar } from '../tools/components/Avatars';
import { checkTheme } from '../Utils';
import { IoSend } from 'react-icons/io5'
import { BsEmojiSmile } from 'react-icons/bs'
import { BiFontFamily } from 'react-icons/bi'
import { FiAtSign } from 'react-icons/fi'

const ConversationBottom = ({ user, websocket, convWrapperRef, lastMessageRef, quillRef, handleSubmit, isTyping, setTyping, typingContext, currentChat }) => {
    const [isToolbar, setToolbar] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [position, setPosition] = useState(0)

    const [isEmoji, setEmoji] = useState(false)
    const [emojiArr, setEmojiArr] = useState([])
    const [emojisResults, setEmojisResults] = useState([])

    const members = useMemo(() => getMembers(currentChat, user._id), [currentChat, user._id])
    const [isMention, setMention] = useState(false)
    const [mentionsResults, setMentionResults] = useState(members)

    const handleNewMessage = (text, delta, source, editor) => {
        let length = editor.getLength()
        let txt = editor.getText()

        if (editor.getLength() > 1) setDisabled(false)
        else setDisabled(true)

        if (!isTyping) {
            otherMembersIDs(currentChat, user._id).map(memberId => {
                return websocket.current.emit('typing', {
                    sender: user.pseudo,
                    receiverId: memberId,
                    conversationId: currentChat._id
                })
            })
        }

        if (length <= 1) {
            setPosition(0)
            if (isMention) {
                setMention(false)
            }
            if (isEmoji) {
                setEmoji(false)
            }
        }

        if (isEmoji) {
            setMention(false)
        } else if (isMention) {
            setEmoji(false)
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
                    if (emojiArr.length === 0) {
                        const fetch = async () => {
                            await axios.get(`${process.env.REACT_APP_API_URL}files/native.json`)
                                .then(res => {
                                    setEmojiArr(Object.values(res.data))
                                })
                        }
                        fetch()
                    }
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

    const onMention = (mention) => {
        let quill = quillRef.current.getEditor()
        quill.focus()
        let pos = quill.getSelection().index
        let range = quill.getSelection()
        quill.deleteText(pos, range.index)
        quill.insertText(pos, `@${mention.pseudo}`, {
            'color': '#18A5D6',
            'bold': true
        }, true)
        quill.insertText(pos + mention.pseudo.length + 1, "\u00a0", {
            'color': `${checkTheme('#232221', '#ffffff')}`,
            'bold': false
        })
        setMention(false)
        setPosition(0)
        setMentionResults(members)
    }

    const onEmoji = (emoji) => {
        let quill = quillRef.current.getEditor()
        quill.focus()
        let pos = quill.getSelection().index
        let range = quill.getSelection()
        quill.deleteText(pos, range.index)
        quill.insertText(pos, emoji.skins[0].native)
        quill.insertText(pos + 2, "\u00a0", {
            'color': `${checkTheme('#232221', '#ffffff')}`,
            'bold': false
        })
        setEmoji(false)
        setPosition(0)
        setEmojisResults([])
    }

    const pickEmoji = (emoji) => {
        let quill = quillRef?.current?.getEditor()
        let position = quill.getSelection().index
        quill.insertText(position, emoji.native)
    }

    const onSubmit = () => {
        let quill = quillRef?.current?.getEditor()
        handleSubmit(currentChat, quill.getContents())
        quill.deleteText(0, quill.getLength())
        setTyping(false)
    }

    const placeUponCursor = () => {
        if (isMention || isEmoji) {
            let quill = quillRef.current.getEditor()
            quill.focus()
            let current = quill.getSelection().index
            let pos = quill.getBounds(current)
            return {
                bottom: pos.bottom + 6,
                left: pos.left,
                right: pos.right,
            }
        }
    }

    return (
        <div className="conversation-bottom">
            <Typing
                typingContext={typingContext}
                currentChat={currentChat}
                isTyping={isTyping}
            />
            <div className="conversation-toolsbox">
                <ScrollButton convWrapperRef={convWrapperRef?.current} scrollTo={lastMessageRef} />
                <div className="message-text-editor">
                    {isMention &&
                        mentionsResults.length > 0 &&
                        <div tabIndex="0" className="auto-complete-container custom-scrollbar max-w-[300px]" style={placeUponCursor()}>
                            {mentionsResults.map((element, key) => {
                                return (
                                    <div className={`${mentionsResults.some(e => e.pseudo) ? "auto-complete-item" : "auto-complete-item hidden"}`} key={key} onClick={() => onMention(element)}>
                                        <div className="flex items-center">
                                            <TinyAvatar pic={element.picture} />
                                            <p>{element.pseudo}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    }
                    {isEmoji &&
                        emojisResults.length > 0 &&
                        <div tabIndex="0" className="auto-complete-container custom-scrollbar max-w-[300px]" style={placeUponCursor()}>
                            {emojisResults.slice(0, 20).map((emoji, key) => {
                                return (
                                    <div className={`${emojisResults.some(e => e.id) ? "auto-complete-item" : "auto-complete-item hidden"}`} key={key} onClick={() => onEmoji(emoji)}>
                                        <div className="flex items-center">
                                            <div>{emoji.skins[0].native}</div>
                                            <p>:{emoji.id}:</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    }
                    <EditorToolbar display={isToolbar} />
                    <ReactQuill
                        ref={quillRef}
                        onChange={handleNewMessage}
                        defaultValue=""
                        placeholder="Envoyer un message..."
                        modules={modules}
                        formats={formats}
                    />
                </div>
                <div className="message-text-tools">
                    <div className="text-tools-left">
                        <EmojiPicker placement="top" btnClassName="text-tools" icon={<BsEmojiSmile />} onSelect={pickEmoji} onClick={() => quillRef?.current?.focus()} />
                        <button className="text-tools" onClick={() => setMention(!isMention)}><FiAtSign /></button>
                        <button className="text-tools" onClick={() => setToolbar(!isToolbar)}><BiFontFamily /></button>
                    </div>
                    <div className="text-tools-right">
                        <button className="send-tool" disabled={disabled} onClick={onSubmit}><IoSend /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConversationBottom