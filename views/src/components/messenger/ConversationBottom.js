import React, { useEffect } from 'react'
import { useState } from 'react'
import ScrollButton from './tools/ScrollButton';
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./tools/EditorToolbar";
import Typing from './tools/Typing';
import { IoSend } from 'react-icons/io5'
import { BsEmojiSmile } from 'react-icons/bs'
import { BiFontFamily } from 'react-icons/bi'
import { FiAtSign } from 'react-icons/fi'

const ConversationBottom = ({ convWrapperRef, lastMessageRef, quillRef, setNewMessage, newMessage, handleSubmit, typingContext, currentChat, isTyping }) => {
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
    const [openEditorToolbar, setOpenEditorToolbar] = useState(false)
    const [cursorPosition, setCursorPosition] = useState()
    const [addEmoji, setAddEmoji] = useState(false)
    const [emoji, setEmoji] = useState()
    const [isContent, setContent] = useState(false)

    const handleNewMessage = (text, delta, source, editor) => {
        setNewMessage(editor.getContents())
        setContent(true)
    }

    const pickEmoji = (emoji) => {
        setAddEmoji(true)
        setEmoji(emoji.native)
        quillRef.current.focus()
        document.getElementsByClassName('.ql-editor p').textContent += emoji.native
    }

    useEffect(() => {
        quillRef.current.selectionEnd = cursorPosition
    }, [cursorPosition])

    return (
        <div className="conversation-bottom">
            <Typing
                typingContext={typingContext}
                currentChat={currentChat}
                isTyping={isTyping}
            />
            <ScrollButton convWrapperRef={convWrapperRef?.current} scrollTo={lastMessageRef} />
            <div className="message-text-editor">
                <EditorToolbar display={openEditorToolbar} />
                <div ref={quillRef}>
                    <ReactQuill
                        onChange={handleNewMessage}
                        value={newMessage}
                        placeholder="Envoyer un message..."
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
                    <button className="btn btn-secondary" disabled={!isContent} onClick={handleSubmit}><IoSend /></button>
                </div>
            </div>
            {openEmojiPicker && <Picker onClick={(emoji) => pickEmoji(emoji)} style={{ position: "absolute", bottom: -30, left: -54, transform: "scale(0.7)", zIndex: 10 }} />}
        </div>
    )
}

export default ConversationBottom

// const [cursorPosition, setCursorPosition] = useState()
// const pickEmoji = (e, {emoji}) => {
//     quillRef.focus()
//     const start = newMessage.substring(0, quillRef.selectionStart)
//     const end = newMessage.substring(quillRef.selectionStart)
//     const msg = start + emoji + end
//     setNewMessage(msg)
//     setCursorPosition(start.length + emoji.length)
// }