import React, { useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import ReactQuill from "react-quill";
import { Quill } from "react-quill";
import EditorToolbar, { formats, modules } from "./EditorToolbar";
import ScrollButton from '../tools/ScrollButton';
import Typing from '../tools/Typing';
import EmojiPicker from '../tools/EmojiPicker';
import ErrorModal from '../../tools/components/ErrorModal';
import Mention from './Mention';
import Emoji from './Emoji';
import Link from './Link';
import { getMembers, isFile, isImage, isVideo, returnEditorFiles, removeFile, otherMembersIDs, returnMembers, getEditorHeight, openMention, pickEmoji } from '../tools/function';
import { addActive } from '../../Utils';
import { IoSend, IoText } from 'react-icons/io5'
import { BsEmojiSmile } from 'react-icons/bs'
import { FaPhotoVideo } from 'react-icons/fa'
import { MdClear, MdOutlineLink, MdOutlineAlternateEmail, MdOutlineAdd } from 'react-icons/md';

const Editor = ({ user, websocket, convWrapperRef, lastMessageRef, handleSubmit, isTyping, setTyping, typingContext, currentChat }) => {
    const [isToolbar, setToolbar] = useState(false)
    const [isTools, setTools] = useState(false)
    const [position, setPosition] = useState(0)
    const [disabled, setDisabled] = useState(true)

    const [isEmoji, setEmoji] = useState(false)
    const [emojiArr, setEmojiArr] = useState([])
    const [hasShortcuts, setHasShortcuts] = useState([])
    const [shortcuts, setShortcuts] = useState([])
    const [emojisResults, setEmojisResults] = useState([])

    const members = useMemo(() => getMembers(currentChat, user._id), [currentChat, user._id])
    const [isMention, setMention] = useState(false)
    const [mentionsResults, setMentionResults] = useState(members)

    const [isLink, setLink] = useState(false)

    const [files, setFiles] = useState([])
    const [focused, setFocused] = useState(false)
    const [uploadErr, setUploadErr] = useState([])
    const filesRef = useRef()

    const quillRef = useRef()
    let quill = quillRef?.current?.getEditor()

    const handleNewMessage = (text, delta, source, editor) => {
        let length = editor.getLength()
        let txt = editor.getText()

        if (!isTyping) {
            otherMembersIDs(currentChat, user._id).map(memberId => {
                return websocket.current.emit('typing', {
                    sender: user.pseudo,
                    receiverId: memberId,
                    conversationId: currentChat._id
                })
            })
        }

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
     * On enterkey press
     */

    const Delta = Quill.import('delta')

    useEffect(() => {
        if (quill) {
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
    }, [quill, Delta])

    /**
     * On message submission
     */

    const onSubmit = () => {
        if (quill.getLength() > 1 || files.length > 0) {
            let messageContent = quill.getLength() > 1 ? quill.getContents() : []
            handleSubmit(currentChat, messageContent, files)
            if (quill.getLength() > 1) {
                quill.deleteText(0, quill.getLength())
                setTyping(false)
            }
            if (files.length > 0) {
                setFiles([])
            }
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        maxSize: 500000000,
        onDrag: () => quillRef.current.focus(),
        onDrop: files => {
            files.forEach(file => {
                if (isImage(file) || isVideo(file) || isFile(file)) {
                    if (file.size > 10000000) {
                        setUploadErr(err => [...err, { name: file.name, error: 'Fichier trop volumineux' }])
                    } else {
                        setFiles(f => [...f, file])
                        if (disabled) {
                            setDisabled(false)
                        }
                    }
                } else {
                    setUploadErr(err => [...err, { name: file.name, error: 'Ce type de fichier n\'est pas accepté' }])
                }
            })
            quillRef.current.focus()
        }
    })

    return (
        <div className="conversation-bottom">
            <Typing
                typingContext={typingContext}
                currentChat={currentChat}
                isTyping={isTyping}
            />
            <div className={`conversation-toolsbox ${addActive(isDragActive, "active")}`}>
                <ScrollButton
                    convWrapperRef={convWrapperRef?.current}
                    scrollTo={lastMessageRef}
                />
                <div className="message-text-editor">
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

                    <EditorToolbar style={{ display: isToolbar ? "block" : "none" }} />
                    <div className="message-editor-container">
                        <ReactQuill
                            ref={quillRef}
                            placeholder={`Envoyer un message à ${returnMembers(members)}`}
                            modules={modules}
                            formats={formats}
                            defaultValue=""
                            onChange={handleNewMessage}
                            onKeyUp={e => onKeyPressed(e)}
                            onBlur={() => setFocused(false)}
                        />
                        <div {...getRootProps({ className: `message-dropzone ${focused && files.length === 0 ? "hidden" : "block"}` })} style={getEditorHeight(quill, files, filesRef)} onClick={() => { setFocused(true); quillRef?.current?.focus() }}>
                            <input {...getInputProps()} name="files" />
                        </div>
                        <div className={`editor-files-container ${files.length === 0 ? "!hidden" : "flex"}`} ref={filesRef}>
                            {files.length > 0 &&
                                files.map((file, key) => {
                                    return (
                                        <div className="files-block" key={key}>
                                            {returnEditorFiles(file)}
                                            <div className="delete-btn" onClick={() => setFiles(removeFile(files, key))}><MdClear /></div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="message-text-tools">
                    <div className="text-tools-left">
                        <button className={`menu-tools-btn ${addActive(isTools, "active")}`} onClick={() => setTools(!isTools)}><MdOutlineAdd /></button>
                        <div className="tools-group">
                            <EmojiPicker placement="top-start" btnClassName="text-tools" icon={<BsEmojiSmile />} onSelect={emoji => pickEmoji(emoji, quill)} onClick={() => quillRef?.current?.focus()} />
                            <button className="text-tools" onClick={() => openMention(quill, isMention, setMention)}><MdOutlineAlternateEmail /></button>
                            <button className="text-tools" onClick={() => setToolbar(!isToolbar)}><IoText /></button>
                        </div>
                        <div className="tools-group">
                            <button className="text-tools files-upload" {...getRootProps()}><input {...getInputProps()} name="files" /><FaPhotoVideo /></button>
                            <button className="text-tools" onClick={() => setLink(!isLink)}><MdOutlineLink /></button>
                        </div>
                    </div>
                    {isTools && <div className="message-text-tools-menu"></div>}
                    <div className="text-tools-right">
                        <button className="send-tool" disabled={disabled} onClick={onSubmit}><IoSend /></button>
                    </div>
                </div>
            </div>
            {uploadErr.length > 0 &&
                <ErrorModal
                    title="Erreur, certains fichiers non pas pu être importés"
                    text={uploadErr.map((f, key) => {
                        return <p key={key}>{f.name + " : " + f.error}</p>
                    })}
                />
            }
        </div>
    )
}

export default Editor