import ReactQuill from "react-quill"
import EditorToolbar, { formats, modules } from '../editor/EditorToolbar'
import EmojiPicker from "./EmojiPicker"
import { MdOutlineAdd, MdOutlineAlternateEmail, MdOutlineLink } from "react-icons/md"
import { BsEmojiSmile } from "react-icons/bs"
import { FaPhotoVideo } from "react-icons/fa"
import { IoSend, IoText } from "react-icons/io5"

const EditorNull = () => {
    return (
        <div className="conversation-bottom">
            <div className="conversation-toolsbox">
                <div className="message-text-editor">
                    <EditorToolbar style={{ display: "block" }} />
                    <div className="message-editor-container">
                        <ReactQuill
                            defaultValue=""
                            placeholder="Envoyer un message..."
                            formats={formats}
                            modules={modules}
                        />
                    </div>
                    <div className="message-text-tools">
                        <div className="text-tools-left">
                            <button className="menu-tools-btn"><MdOutlineAdd /></button>
                            <div className="tools-group">
                                <EmojiPicker placement="top-start" btnClassName="text-tools" icon={<BsEmojiSmile />} />
                                <button className="text-tools"><MdOutlineAlternateEmail /></button>
                                <button className="text-tools"><IoText /></button>
                            </div>
                            <div className="tools-group">
                                <button className="text-tools files-upload"><FaPhotoVideo /></button>
                                <button className="text-tools"><MdOutlineLink /></button>
                            </div>
                        </div>
                        <div className="text-tools-right">
                            <button className="send-tool"><IoSend /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditorNull