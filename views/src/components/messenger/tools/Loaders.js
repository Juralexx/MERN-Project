import { BiFontFamily } from "react-icons/bi"
import { BsEmojiSmile } from "react-icons/bs"
import { FiAtSign } from "react-icons/fi"
import { IoSend } from "react-icons/io5"
import ReactQuill from "react-quill"
import EditorToolbar, { formats } from '../editor/EditorToolbar'
import EmojiPicker from "../../tools/components/EmojiPicker"

export const ConversationLoader = () => {
    return (
        [...Array(5)].map((_, key) => {
            return (
                <div className="conversation" key={key}>
                    <div className="conversation_inner">
                        <div className="conversation-img-container">
                            <div className="loading-circle-36 loading"></div>
                        </div>
                        <div className="conversation-infos">
                            <div className="conversation-infos-top mb-2">
                                <div className="conversation-name loading-small-title loading"></div>
                                <div className="conversation-date loading-tiny-text loading"></div>
                            </div>
                            <div className="last-message-wrapper">
                                <div className="last-message loading-long-text loading"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    )
}

export const OnlineUserLoader = () => {
    return (
        [...Array(5)].map((_, key) => {
            return (
                <div className="online-users" key={key}>
                    <div className="online-user">
                        <div className="loading-circle-36 loading"></div>
                        <div className="online-user-name">
                            <div className="loading-small-title loading"></div>
                            <div className="loading-short-text mt-2 pulse loading"></div>
                        </div>
                    </div>
                </div>
            )
        })
    )
}

export const ChatLoader = () => {
    return (
        <>
            <div className="conversation-box-top">
                <div className="conversation-box-members">
                    <div className="conversation-img-container">
                        <div className="conversation-img loading-circle-36 loading"></div>
                    </div>
                    <div className="conversation-name loading-small-title loading mt-1"></div>
                </div>
            </div>
            <div className="conversation-box-container">
                {[...Array(6)].map((_, key) => {
                    return (
                        <div className="message-container loader" key={key}>
                            <div className="message">
                                <div className="message-left">
                                    <div className="message-img loading-circle-38 loading"></div>
                                </div>
                                <div className="message-right">
                                    <div className="message-right-top">
                                        <div className="message-sender loading-small-title loading"></div>
                                        <div className="loading-short-text loading mt-2 ml-2"></div>
                                    </div>
                                    <div className="loading-medium-card loading mt-2"></div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* <div className="conversation-bottom">
                <div className="conversation-toolsbox">
                    <div className="message-text-editor">
                        <EditorToolbar style={{ display: "none" }} />
                        <ReactQuill
                            defaultValue=""
                            placeholder="Envoyer un message..."
                            formats={formats}
                        />
                    </div>
                    <div className="message-text-tools">
                        <div className="text-tools-left">
                            <EmojiPicker placement="top" btnClassName="text-tools" icon={<BsEmojiSmile />} />
                            <button className="text-tools"><FiAtSign /></button>
                            <button className="text-tools"><BiFontFamily /></button>
                        </div>
                        <div className="text-tools-right">
                            <button className="send-tool"><IoSend /></button>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}