import ReactQuill from "react-quill"
import EditorToolbar, { formats, modules } from '../editor/EditorToolbar'
import EmojiPicker from "./EmojiPicker"
import { MdOutlineAdd, MdOutlineAlternateEmail, MdOutlineLink } from "react-icons/md"
import { BsEmojiSmile } from "react-icons/bs"
import { FaPhotoVideo } from "react-icons/fa"
import { IoSend, IoText } from "react-icons/io5"

export const SmallLoader = () => {
    return (
        <div className="message-container loader">
            <div className="message">
                <div className="message-left">
                    <div className="message-img loading-circle-38 loading"></div>
                </div>
                <div className="message-right">
                    <div className="message-right-top">
                        <div className="message-sender loading-h14-w80 loading"></div>
                        <div className="loading-h12-w60 loading mt-2 ml-2"></div>
                    </div>
                    <div className="loading-h20-w200 loading mt-2"></div>
                    <div className="loading-h20-w400 loading mt-2"></div>
                    <div className="loading-h20-w300 loading mt-2"></div>
                </div>
            </div>
        </div>
    )
}

export const ConversationLoader = () => {
    return (
        <>
            <div className="conversation">
                <div className="conversation_inner">
                    <div className="conversation-img-container">
                        <div className="loading-circle-36 loading"></div>
                    </div>
                    <div className="conversation-infos">
                        <div className="conversation-infos-top mb-2">
                            <div className="conversation-name loading-h14-w100 loading"></div>
                            <div className="conversation-date loading-h12-w30 loading"></div>
                        </div>
                        <div className="last-message-wrapper">
                            <div className="last-message loading-h12-w160 loading"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="conversation">
                <div className="conversation_inner">
                    <div className="conversation-img-container">
                        <div className="loading-circle-36 loading"></div>
                    </div>
                    <div className="conversation-infos">
                        <div className="conversation-infos-top mb-2">
                            <div className="conversation-name loading-h14-w120 loading"></div>
                            <div className="conversation-date loading-h12-w30 loading"></div>
                        </div>
                        <div className="last-message-wrapper">
                            <div className="last-message loading-h12-w180 loading"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="conversation">
                <div className="conversation_inner">
                    <div className="conversation-img-container">
                        <div className="loading-circle-36 loading"></div>
                    </div>
                    <div className="conversation-infos">
                        <div className="conversation-infos-top mb-2">
                            <div className="conversation-name loading-h14-w60 loading"></div>
                            <div className="conversation-date loading-h12-w30 loading"></div>
                        </div>
                        <div className="last-message-wrapper">
                            <div className="last-message loading-h12-w100 loading"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="conversation">
                <div className="conversation_inner">
                    <div className="conversation-img-container">
                        <div className="loading-circle-36 loading"></div>
                    </div>
                    <div className="conversation-infos">
                        <div className="conversation-infos-top mb-2">
                            <div className="conversation-name loading-h14-w80 loading"></div>
                            <div className="conversation-date loading-h12-w30 loading"></div>
                        </div>
                        <div className="last-message-wrapper">
                            <div className="last-message loading-h12-w140 loading"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="conversation">
                <div className="conversation_inner">
                    <div className="conversation-img-container">
                        <div className="loading-circle-36 loading"></div>
                    </div>
                    <div className="conversation-infos">
                        <div className="conversation-infos-top mb-2">
                            <div className="conversation-name loading-h14-w100 loading"></div>
                            <div className="conversation-date loading-h12-w30 loading"></div>
                        </div>
                        <div className="last-message-wrapper">
                            <div className="last-message loading-h12-w160 loading"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const OnlineUserLoader = () => {
    return (
        <>
            <div className="online-users">
                <div className="online-user">
                    <div className="loading-circle-36 loading"></div>
                    <div className="online-user-name">
                        <div className="loading-h14-w80 loading"></div>
                        <div className="loading-h12-w60 mt-2 pulse loading"></div>
                    </div>
                </div>
            </div>
            <div className="online-users">
                <div className="online-user">
                    <div className="loading-circle-36 loading"></div>
                    <div className="online-user-name">
                        <div className="loading-h14-w120 loading"></div>
                        <div className="loading-h12-w80 mt-2 pulse loading"></div>
                    </div>
                </div>
            </div>
            <div className="online-users">
                <div className="online-user">
                    <div className="loading-circle-36 loading"></div>
                    <div className="online-user-name">
                        <div className="loading-h14-w140 loading"></div>
                        <div className="loading-h12-w60 mt-2 pulse loading"></div>
                    </div>
                </div>
            </div>
            <div className="online-users">
                <div className="online-user">
                    <div className="loading-circle-36 loading"></div>
                    <div className="online-user-name">
                        <div className="loading-h14-w80 loading"></div>
                        <div className="loading-h12-w120 mt-2 pulse loading"></div>
                    </div>
                </div>
            </div>
            <div className="online-users">
                <div className="online-user">
                    <div className="loading-circle-36 loading"></div>
                    <div className="online-user-name">
                        <div className="loading-h14-w140 loading"></div>
                        <div className="loading-h12-w60 mt-2 pulse loading"></div>
                    </div>
                </div>
            </div>
        </>
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
                    <div className="conversation-name loading-h14-w100 loading mt-1"></div>
                </div>
            </div>
            <div className="conversation-box-container">
                <div className="message-container loader">
                    <div className="message">
                        <div className="message-left">
                            <div className="message-img loading-circle-38 loading"></div>
                        </div>
                        <div className="message-right">
                            <div className="message-right-top">
                                <div className="message-sender loading-h14-w100 loading"></div>
                                <div className="loading-h12-w60 loading mt-2 ml-2"></div>
                            </div>
                            <div className="loading-h20-w200 loading mt-2"></div>
                        </div>
                    </div>
                </div>
                <div className="message-container loader">
                    <div className="message">
                        <div className="message-left">
                            <div className="message-img loading-circle-38 loading"></div>
                        </div>
                        <div className="message-right">
                            <div className="message-right-top">
                                <div className="message-sender loading-h14-w60 loading"></div>
                                <div className="loading-h12-w60 loading mt-2 ml-2"></div>
                            </div>
                            <div className="loading-h40-w350 loading mt-2"></div>
                        </div>
                    </div>
                </div>
                <div className="message-container loader">
                    <div className="message">
                        <div className="message-left">
                            <div className="message-img loading-circle-38 loading"></div>
                        </div>
                        <div className="message-right">
                            <div className="message-right-top">
                                <div className="message-sender loading-h14-w100 loading"></div>
                                <div className="loading-h12-w60 loading mt-2 ml-2"></div>
                            </div>
                            <div className="loading-h20-w300 loading mt-2"></div>
                            <div className="loading-h20-w200 loading mt-2"></div>
                        </div>
                    </div>
                </div>
                <div className="message-container loader">
                    <div className="message">
                        <div className="message-left">
                            <div className="message-img loading-circle-38 loading"></div>
                        </div>
                        <div className="message-right">
                            <div className="message-right-top">
                                <div className="message-sender loading-h14-w120 loading"></div>
                                <div className="loading-h12-w60 loading mt-2 ml-2"></div>
                            </div>
                            <div className="loading-h20-w400 loading mt-2"></div>
                            <div className="loading-h40-w350 loading mt-2"></div>
                        </div>
                    </div>
                </div>
                <div className="message-container loader">
                    <div className="message">
                        <div className="message-left">
                            <div className="message-img loading-circle-38 loading"></div>
                        </div>
                        <div className="message-right">
                            <div className="message-right-top">
                                <div className="message-sender loading-h14-w100 loading"></div>
                                <div className="loading-h12-w60 loading mt-2 ml-2"></div>
                            </div>
                            <div className="loading-h20-w200 loading mt-2"></div>
                        </div>
                    </div>
                </div>
                <div className="message-container loader">
                    <div className="message">
                        <div className="message-left">
                            <div className="message-img loading-circle-38 loading"></div>
                        </div>
                        <div className="message-right">
                            <div className="message-right-top">
                                <div className="message-sender loading-h14-w80 loading"></div>
                                <div className="loading-h12-w60 loading mt-2 ml-2"></div>
                            </div>
                            <div className="loading-h20-w200 loading mt-2"></div>
                            <div className="loading-h20-w400 loading mt-2"></div>
                            <div className="loading-h20-w300 loading mt-2"></div>
                        </div>
                    </div>
                </div>
                <div className="message-container loader">
                    <div className="message">
                        <div className="message-left">
                            <div className="message-img loading-circle-38 loading"></div>
                        </div>
                        <div className="message-right">
                            <div className="message-right-top">
                                <div className="message-sender loading-h14-w100 loading"></div>
                                <div className="loading-h12-w60 loading mt-2 ml-2"></div>
                            </div>
                            <div className="loading-h20-w300 loading mt-2"></div>
                        </div>
                    </div>
                </div>
                <div className="message-container loader">
                    <div className="message">
                        <div className="message-left">
                            <div className="message-img loading-circle-38 loading"></div>
                        </div>
                        <div className="message-right">
                            <div className="message-right-top">
                                <div className="message-sender loading-h14-w40 loading"></div>
                                <div className="loading-h12-w60 loading mt-2 ml-2"></div>
                            </div>
                            <div className="loading-h20-w200 loading mt-2"></div>
                            <div className="loading-h20-w400 loading mt-2"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="conversation-bottom">
                <div className="conversation-toolsbox">
                    <div className="message-text-editor">
                        <EditorToolbar style={{ display: "none" }} />
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
        </>
    )
}