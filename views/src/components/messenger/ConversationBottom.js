import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import ReactQuill from "react-quill";
import { Quill } from "react-quill";
import EditorToolbar, { formats, modules } from "./tools/EditorToolbar";
import ScrollButton from './tools/ScrollButton';
import Typing from './tools/Typing';
import EmojiPicker from '../tools/components/EmojiPicker';
import { getMembers, otherMembersIDs, returnMembers } from './tools/function';
import { TinyAvatar } from '../tools/components/Avatars';
import { addActive, checkTheme } from '../Utils';
import { IoSend, IoText } from 'react-icons/io5'
import { BsPlusLg } from 'react-icons/bs'
import { BsEmojiSmile } from 'react-icons/bs'
import { FiAtSign, FiPaperclip } from 'react-icons/fi'
import { FaPhotoVideo } from 'react-icons/fa';

const ConversationBottom = ({ user, websocket, convWrapperRef, lastMessageRef, quillRef, handleSubmit, isTyping, setTyping, typingContext, currentChat }) => {
    const [isToolbar, setToolbar] = useState(true)
    const [isTools, setTools] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [position, setPosition] = useState(0)

    const [isEmoji, setEmoji] = useState(false)
    const [emojiArr, setEmojiArr] = useState([])
    const [hasShortcuts, setHasShortcuts] = useState([])
    const [shortcuts, setShortcuts] = useState([])
    const [emojisResults, setEmojisResults] = useState([])

    const members = useMemo(() => getMembers(currentChat, user._id), [currentChat, user._id])
    const [isMention, setMention] = useState(false)
    const [mentionsResults, setMentionResults] = useState(members)

    const [files, setFiles] = useState([])
    const [focused, setFocused] = useState(false)

    const handleNewMessage = (text, delta, source, editor) => {
        let quill = quillRef.current.getEditor()
        quill.focus()
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
                                    Object.values(res.data).forEach(e => {
                                        if (e.emoticons) {
                                            setHasShortcuts(s => [...s, e])
                                            e.emoticons.forEach(shortcut => {
                                                setShortcuts(s => [...s, shortcut])
                                            })
                                        }
                                    })
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
                        if (/\W|[_]/g.test(query)) { //if str has any symbols
                            query = query.replace(/\W|_/g, '[$&]'); //use brekits [ ] for that symbols
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

    /**
     * Insert emoji if shortcut is detected
     */

    const onKeyPressed = (event) => {
        let quill = quillRef.current.getEditor()
        quill.focus()
        let txt = quill.getText()
        let index = quill.getSelection().index

        if (event.keyCode === 32 || event.keyCode === 13) {
            if (shortcuts.length > 0) {
                shortcuts.some(shortcut => {
                    if (txt.includes(shortcut)) {
                        let emoji = hasShortcuts.find(e => e.emoticons.includes(shortcut))
                        if (event.keyCode === 13) {
                            quill.deleteText(index - shortcut.length, shortcut.length)
                            quill.insertText(index - shortcut.length, emoji.skins[0].native)
                            quill.setSelection(quill.getSelection().index + 1)
                        }
                        else if (event.keyCode === 32) {
                            quill.deleteText(index - (shortcut.length + 1), shortcut.length)
                            quill.insertText(index - (shortcut.length + 1), emoji.skins[0].native)
                            quill.setSelection(quill.getSelection().index)
                        }
                    }
                })
            }
            if (emojiArr.length > 0) {
                emojiArr.some(emoji => {
                    if (txt.includes(`:${emoji.id}:`)) {
                        let emoticon = emojiArr.find(e => e.id === emoji.id)
                        if (event.keyCode === 13) {
                            quill.deleteText(index - (emoji.id.length + 2), emoji.id.length + 2)
                            quill.insertText(index - (emoji.id.length + 2), emoticon.skins[0].native)
                            quill.setSelection(quill.getSelection().index + 1)
                        }
                        else if (event.keyCode === 32) {
                            quill.deleteText(index - (emoji.id.length + 3), emoji.id.length + 3)
                            quill.insertText(index - (emoji.id.length + 3), emoticon.skins[0].native)
                            quill.setSelection(quill.getSelection().index)
                        }
                    }
                })
            }
        }
    }

    /**
     * On autocomplete mention selection
     */

    const onMention = (mention) => {
        let quill = quillRef.current.getEditor()
        quill.focus()
        let range = quill.getSelection()
        quill.deleteText(position, range.index)
        console.log(range.index)
        if (quill.getText()[position] === '@') {
            quill.deleteText(position, 1)
        }
        quill.insertText(position, `@${mention.pseudo}`, {
            'color': '#18A5D6',
            'bold': true,
            'list': 'bullet',
            'check': 'todo',
        }, true)
        quill.insertText(position + mention.pseudo.length + 1, "\u00a0", {
            'color': `${checkTheme('#232221', '#ffffff')}`,
            'bold': false
        })
        setMention(false)
        setPosition(0)
        setMentionResults(members)
    }

    /**
     * On autocomplete emoji selection
     */

    const onEmoji = (emoji) => {
        let quill = quillRef.current.getEditor()
        quill.focus()
        let range = quill.getSelection()
        quill.deleteText(position, range.index)
        quill.insertText(position, emoji.skins[0].native)
        quill.insertText(position + 2, "\u00a0", {
            'color': `${checkTheme('#232221', '#ffffff')}`,
            'bold': false
        })
        setEmoji(false)
        setPosition(0)
        setEmojisResults([])
    }

    /**
     * Place autocomplete container upon cursor
     */

    const placeUponCursor = () => {
        if (isMention || isEmoji) {
            let quill = quillRef.current.getEditor()
            quill.focus()
            let quillHeight = quillRef.current.editor.scroll.domNode.offsetHeight
            let pos = quill.getBounds(position)
            return {
                bottom: quillHeight - pos.bottom + pos.height,
                left: pos.left,
                right: pos.right,
            }
        }
    }

    /**
     * On mention button press
     */

    const openMention = () => {
        let quill = quillRef.current.getEditor()
        quill.focus()
        let pos = quill.getSelection().index
        let txt = quill.getText()
        let previous = txt[pos - 1]

        if (!isMention) {
            if ((/\s/).test(previous) || (!(/\s/).test(previous) && previous === undefined)) {
                quill.insertText(pos, "@", {
                    'color': checkTheme('#232221', '#ffffff'),
                    'bold': true
                }, true)
            } else if (!(/\s/).test(previous) && previous !== undefined && previous !== '@') {
                quill.insertText(pos, "\u00a0", {
                    'color': checkTheme('#232221', '#ffffff'),
                }, true)
                quill.insertText(pos + 1, "@", {
                    'color': checkTheme('#232221', '#ffffff'),
                    'bold': true
                }, true)
            }
            setMention(true)
        } else {
            setMention(false)
        }
    }

    /**
     * On emoji picker selection
     */

    const pickEmoji = (emoji) => {
        let quill = quillRef?.current?.getEditor()
        let position = quill.getSelection().index
        quill.insertText(position, emoji.native)
    }

    /**
     * On enterkey press
     */

    const Delta = Quill.import('delta')

    useEffect(() => {
        if (quillRef?.current) {
            let quill = quillRef?.current?.getEditor()
            quill.keyboard.addBinding({ key: 13, shiftKey: true }, (range, ctx) => {
                quill.insertText(range.index, '\n');
            })
            quill.keyboard.addBinding({ key: 13 }, () => { })
            quill.keyboard.addBinding({ key: 32 }, (range, ctx) => {
                quill.insertText(range.index, '\u00a0');
            })
            quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
                const ops = delta.ops.map((op) => ({ insert: op.insert }));
                return new Delta(ops)
            })
        }
    }, [quillRef?.current])

    /**
     * On message submission
     */

    const onSubmit = () => {
        console.log('submitted')
        let quill = quillRef?.current?.getEditor()
        if (quill.getLength() > 1) {
            handleSubmit(currentChat, quill.getContents())
            quill.deleteText(0, quill.getLength())
            setTyping(false)
        }
    }

    /**
     * Files dropzone
     */

    const getEditorHeight = () => {
        let quill = quillRef?.current?.getEditor()
        if (quill) {
            let quillHeight = quillRef.current.editor.scroll.domNode.offsetHeight
            let quillWidth = quillRef.current.editor.scroll.domNode.offsetWidth
            return {
                height: quillHeight,
                width: quillWidth
            }
        }
    }

    const getFiles = (filesArray) => {
        return files.concat(Array.from(filesArray))
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/jpeg, image/jpg, image/png, image/gif, image/tiff, image/bmp',
        maxSize: 5000000,
        noClick: true,
        onDrag: () => quillRef.current.focus(),
        onDrop: files => {
            getFiles(files)
            quillRef.current.focus()
            console.log('dropped')
        }
    })

    const onUpload = () => {

    }

    return (
        <div className="conversation-bottom">
            <Typing
                typingContext={typingContext}
                currentChat={currentChat}
                isTyping={isTyping}
            />
            <div className={`conversation-toolsbox ${addActive(isDragActive, "active")}`}>
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
                    <EditorToolbar style={{ display: isToolbar ? "block" : "none" }} />
                    <ReactQuill
                        ref={quillRef}
                        placeholder={`Envoyer un message à ${returnMembers(members)}`}
                        defaultValue=""
                        onChange={handleNewMessage}
                        onKeyUp={e => onKeyPressed(e)}
                        modules={modules}
                        formats={formats}
                        onBlur={() => setFocused(false)}
                    />
                    <div {...getRootProps({ className: `message-dropzone ${focused ? "hidden" : "block"}` })} style={getEditorHeight()} onClick={() => { setFocused(true); quillRef?.current?.focus() }}>
                        <input {...getInputProps()} name="files" />
                    </div>
                </div>
                <div className="message-text-tools">
                    <div className="text-tools-left">
                        <button className="menu-tools-btn" onClick={() => setTools(!isTools)}><BsPlusLg /></button>
                        <div className="tools-group">
                            <EmojiPicker placement="top" btnClassName="text-tools" icon={<BsEmojiSmile />} onSelect={pickEmoji} onClick={() => quillRef?.current?.focus()} />
                            <button className="text-tools" onClick={openMention}><FiAtSign /></button>
                            <button className="text-tools" onClick={() => setToolbar(!isToolbar)}><IoText /></button>
                        </div>
                        <div className="tools-group">
                            <button className="text-tools" {...getRootProps()}><input {...getInputProps()} name="files" /><FaPhotoVideo /></button>
                            <button className="text-tools"><FiPaperclip /></button>
                        </div>
                    </div>
                    {isTools && <div className="message-text-tools-menu"></div>}
                    <div className="text-tools-right">
                        <button className="send-tool" disabled={disabled} onClick={onSubmit}><IoSend /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConversationBottom