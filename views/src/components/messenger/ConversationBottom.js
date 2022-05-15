import React, { useEffect, useState } from 'react'
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./tools/EditorToolbar";
import ScrollButton from './tools/ScrollButton';
import Typing from './tools/Typing';
import EmojiPicker from '../tools/components/EmojiPicker';
import { IoSend } from 'react-icons/io5'
import { BsEmojiSmile } from 'react-icons/bs'
import { BiFontFamily } from 'react-icons/bi'
import { FiAtSign } from 'react-icons/fi'

const ConversationBottom = ({ convWrapperRef, lastMessageRef, quillRef, newMessage, setNewMessage, handleSubmit, isTyping, typingContext, currentChat }) => {
    const [openEditorToolbar, setOpenEditorToolbar] = useState(false)
    const [cursorPosition, setCursorPosition] = useState()

    const handleNewMessage = (text, delta, source, editor) => {
        setNewMessage(editor.getContents())
    }

    const pickEmoji = (emoji) => {
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
            <div className="conversation-toolsbox">
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
                    <div className="text-tools-left">
                        <EmojiPicker placement="top" btnClassName="text-tools" icon={<BsEmojiSmile />} onSelect={pickEmoji} />
                        <button className="text-tools"><FiAtSign /></button>
                        <button className="text-tools" onClick={() => setOpenEditorToolbar(!openEditorToolbar)}><BiFontFamily /></button>
                    </div>
                    <div className="text-tools-right">
                        <button className="send-tool" disabled={newMessage.length === 0} onClick={() => handleSubmit(currentChat)}><IoSend /></button>
                    </div>
                </div>
            </div>
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