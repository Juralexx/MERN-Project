import React, { useContext, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { MessengerContext } from '../../AppContext';
import { useQuill } from './useQuill';
import { useEmoji } from './useEmoji';
import { useMention } from './useMention';
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import EmojiPicker from '../tools/EmojiPicker';
import ErrorModal from '../../tools/global/ErrorModal';
import Mention from './Mention';
import Emoji from './Emoji';
import Link from './Link';
import Typing from '../tools/Typing';
import ScrollButton from '../tools/ScrollButton';
import { isFile, isImage, isVideo, returnEditorFiles, removeFile, otherMembersIDs, returnMembers, getEditorHeight, pickEmoji } from '../functions/function';
import { addClass } from '../../Utils';
import { MdClear, MdOutlineLink, MdOutlineAlternateEmail, MdOutlineAdd } from 'react-icons/md';
import { IoSend, IoText } from 'react-icons/io5'
import { BsEmojiSmile } from 'react-icons/bs'
import { FaPhotoVideo } from 'react-icons/fa'

const Editor = ({ handleSubmit, currentChat, members, isTyping, typingContext, lastmessageRef, convWrapperRef }) => {
    const { user, websocket } = useContext(MessengerContext)

    const [isToolbar, setToolbar] = useState(false)
    const [isTools, setTools] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [focused, setFocused] = useState(false)
    const [position, setPosition] = useState(0)

    const [files, setFiles] = useState([])
    const [uploadErr, setUploadErr] = useState([])
    const filesRef = useRef()

    const { quill, quillRef } = useQuill()

    const { isMention, setMention, mentionsResults, setMentionResults, openMention } = useMention(quill, members)
    const { isEmoji, setEmoji, emojisResults, setEmojisResults, emojiArr, detectEmojis } = useEmoji(quill)

    const [isLink, setLink] = useState(false)

    /**
     * Handle message 
     */

    const handleNewMessage = (text, delta, source, editor) => {
        if (!quill?.hasFocus()) {
            quill?.focus()
        }
        let length = editor?.getLength()
        let txt = editor?.getText()

        if (length > 1) {
            setDisabled(false)
            if (!isTyping) {
                otherMembersIDs(currentChat, user._id).map(memberId => {
                    return websocket.current.emit('typing', {
                        sender: user.pseudo,
                        receiverId: memberId,
                        conversationId: currentChat._id
                    })
                })
            }
        } else setDisabled(true)

        if (length >= 1) {

            let index = editor?.getSelection()?.index
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

    /**
     * Dropzone
     */

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        maxSize: 100000000,
        onDrag: () => quillRef.current.focus(),
        onDrop: files => {
            files.forEach(file => {
                if (isImage(file) || isVideo(file) || isFile(file)) {
                    if (file.size > 10000000) {
                        setUploadErr(err => [...err, { name: file.name, error: 'Fichier trop volumineux. Poid maximum accepté : 10Mo' }])
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
                isTyping={isTyping}
                typingContext={typingContext}
                currentChat={currentChat}
            />
            <ScrollButton
                convWrapperRef={convWrapperRef}
                scrollTo={lastmessageRef}
            />
            <div className={`conversation-toolsbox ${addClass(isDragActive, "active")}`}>
                <div className="message-text-editor">
                    <EditorToolbar style={{ display: isToolbar ? "block" : "none" }} />
                    <div className="message-editor-container">
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
                            placeholder={`Envoyer un message à ${returnMembers(members)}`}
                            modules={modules}
                            formats={formats}
                            defaultValue=""
                            onBlur={() => setFocused(false)}
                            onChange={handleNewMessage}
                            onKeyUp={event => {
                                detectEmojis(event)
                                event.keyCode === 13 && handleSubmit(quill, currentChat, files)
                            }}
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
                        <button className={`menu-tools-btn ${addClass(isTools, "active")}`} onClick={() => setTools(!isTools)}><MdOutlineAdd /></button>
                        <div className="tools-group">
                            <EmojiPicker placement="top-start" btnClassName="text-tools" icon={<BsEmojiSmile />} onSelect={emoji => pickEmoji(emoji, quill)} onClick={() => quillRef?.current?.focus()} />
                            <button className="text-tools" onClick={() => openMention(quill)}><MdOutlineAlternateEmail /></button>
                            <button className="text-tools" onClick={() => setToolbar(!isToolbar)}><IoText /></button>
                        </div>
                        <div className="tools-group">
                            <button className="text-tools files-upload" {...getRootProps()}><input {...getInputProps()} name="files" /><FaPhotoVideo /></button>
                            <button className="text-tools" onClick={() => setLink(!isLink)}><MdOutlineLink /></button>
                        </div>
                    </div>
                    {isTools && <div className="message-text-tools-menu"></div>}
                    <div className="text-tools-right">
                        <button className="send-tool" disabled={disabled} onClick={() => handleSubmit(quill, currentChat, files)}><IoSend /></button>
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
        </div>
    )
}

export default Editor