import ReactQuill from "react-quill"
import useMediaQuery from "../../tools/hooks/useMediaQuery"
import EditorToolbar, { formats, modules } from '../editor/EditorToolbar'
import EmojiPicker from "./EmojiPicker"
import Icon from "../../tools/icons/Icon"

export const SmallLoader = () => {
    return (
        <div className="message-container loader">
            <div className="message">
                <div className="message-left">
                    <div className="message-img loading-circle-38 loading-skeleton"></div>
                </div>
                <div className="message-right">
                    <div className="message-right-top">
                        <div className="message-sender loading-h14-w80 loading-skeleton"></div>
                        <div className="loading-h12-w60 loading-skeleton mt-2 ml-2"></div>
                    </div>
                    <div className="loading-h14-w300 loading-skeleton mt-2"></div>
                    <div className="loading-h14-w220 loading-skeleton mt-2"></div>
                </div>
            </div>
        </div>
    )
}

export const ConversationLoader = () => {
    const md = useMediaQuery('(min-width:1024px')

    const arr = [
        {
            circle: 'loading-h14-w100',
            title: 'loading-h12-w30',
            message: 'loading-h12-w160',
        },
        {
            circle: 'loading-h14-w120',
            title: 'loading-h12-w30',
            message: 'loading-h12-w180',
        },
        {
            circle: 'loading-h14-w60',
            title: 'loading-h12-w30',
            message: 'loading-h12-w100',
        },
        {
            circle: 'loading-h14-w100',
            title: 'loading-h12-w30',
            message: 'loading-h12-w160',
        },
        {
            circle: 'loading-h14-w80',
            title: 'loading-h12-w30',
            message: 'loading-h12-w140',
        }

    ]

    return (
        arr.map((el, key) => {
            return (
                <div className="conversation" key={key}>
                    <div className="conversation_inner">
                        <div className="conversation-img-container">
                            <div className={`${md ? "loading-circle-36 loading-skeleton" : "loading-circle-36 !m-0 loading-skeleton"}`}></div>
                        </div>
                        <div className="conversation-infos">
                            <div className="conversation-infos-top mb-2">
                                <div className={`conversation-name ${el.circle} loading-skeleton`}></div>
                                <div className={`conversation-date ${el.title} loading-skeleton`}></div>
                            </div>
                            <div className="last-message-wrapper">
                                <div className={`last-message ${el.message} loading-skeleton`}></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    )
}

export const OnlineUserLoader = () => {
    const arr = [
        {
            name: 'loading-h14-w80',
            status: 'loading-h12-w60',
        },
        {
            name: 'loading-h14-w120',
            status: 'loading-h12-w80',
        },
        {
            name: 'loading-h14-w140',
            status: 'loading-h12-w60',
        },
        {
            name: 'loading-h14-w80',
            status: 'loading-h12-w120',
        },
        {
            name: 'loading-h14-w140',
            status: 'loading-h12-w60',
        }

    ]

    return (
        arr.map((el, key) => {
            return (
                <div className="online-users" key={key}>
                    <div className="online-user">
                        <div className="loading-circle-36 loading"></div>
                        <div className="online-user-name">
                            <div className={`${el.name} loading`}></div>
                            <div className={`${el.status} mt-2 pulse loading`}></div>
                        </div>
                    </div>
                </div>
            )
        })
    )
}

export const ChatLoader = () => {
    const xs = useMediaQuery('(min-width:577px')
    return (
        xs && (
            <>
                <div className="conversation-box-top">
                    <div className="conversation-box-members">
                        <div className="conversation-img-container">
                            <div className="conversation-img loading-circle-36 loading-skeleton"></div>
                        </div>
                        <div className="conversation-name loading-h14-w100 loading-skeleton mt-1"></div>
                    </div>
                </div>
                <div className="conversation-box-container custom-scrollbar">
                    <div className="message-container">
                        <div className="message">
                            <div className="message-left">
                                <div className="message-img loading-circle-38 loading-animated-skeleton"></div>
                            </div>
                            <div className="message-right">
                                <div className="message-right-top">
                                    <div className="message-sender loading-h14-w100 loading-animated-skeleton animation-delay-200"></div>
                                    <div className="loading-h12-w60 loading-animated-skeleton mt-2 ml-2 animation-delay-200"></div>
                                </div>
                                <div className="loading-h20-w200 loading-animated-skeleton mt-2 animation-delay-400"></div>
                            </div>
                        </div>
                    </div>
                    <div className="message-container">
                        <div className="message">
                            <div className="message-left">
                                <div className="message-img loading-circle-38 loading-animated-skeleton"></div>
                            </div>
                            <div className="message-right">
                                <div className="message-right-top">
                                    <div className="message-sender loading-h14-w60 loading-animated-skeleton animation-delay-200"></div>
                                    <div className="loading-h12-w60 loading-animated-skeleton mt-2 ml-2 animation-delay-200"></div>
                                </div>
                                <div className="loading-h14-w300 loading-animated-skeleton mt-2 animation-delay-400"></div>
                            </div>
                        </div>
                    </div>
                    <div className="message-container">
                        <div className="message">
                            <div className="message-left">
                                <div className="message-img loading-circle-38 loading-animated-skeleton"></div>
                            </div>
                            <div className="message-right">
                                <div className="message-right-top">
                                    <div className="message-sender loading-h14-w100 loading-animated-skeleton animation-delay-200"></div>
                                    <div className="loading-h12-w60 loading-animated-skeleton mt-2 ml-2 animation-delay-200"></div>
                                </div>
                                <div className="loading-h20-w300 loading-animated-skeleton mt-2 animation-delay-400"></div>
                                <div className="loading-h14-w200 loading-animated-skeleton mt-2 animation-delay-600"></div>
                            </div>
                        </div>
                    </div>
                    <div className="message-container">
                        <div className="message">
                            <div className="message-left">
                                <div className="message-img loading-circle-38 loading-animated-skeleton"></div>
                            </div>
                            <div className="message-right">
                                <div className="message-right-top">
                                    <div className="message-sender loading-h14-w120 loading-animated-skeleton animation-delay-200"></div>
                                    <div className="loading-h12-w60 loading-animated-skeleton mt-2 ml-2 animation-delay-200"></div>
                                </div>
                                <div className="loading-h14-w220 loading-animated-skeleton mt-2 animation-delay-400"></div>
                                <div className="loading-h40-w350 loading-animated-skeleton mt-2 animation-delay-600"></div>
                            </div>
                        </div>
                    </div>
                    <div className="message-container">
                        <div className="message">
                            <div className="message-left">
                                <div className="message-img loading-circle-38 loading-animated-skeleton"></div>
                            </div>
                            <div className="message-right">
                                <div className="message-right-top">
                                    <div className="message-sender loading-h14-w100 loading-animated-skeleton animation-delay-200"></div>
                                    <div className="loading-h12-w60 loading-animated-skeleton mt-2 ml-2 animation-delay-200"></div>
                                </div>
                                <div className="loading-h20-w200 loading-animated-skeleton mt-2 animation-delay-400"></div>
                            </div>
                        </div>
                    </div>
                    <div className="message-container">
                        <div className="message">
                            <div className="message-left">
                                <div className="message-img loading-circle-38 loading"></div>
                            </div>
                            <div className="message-right">
                                <div className="message-right-top">
                                    <div className="message-sender loading-h14-w80 loading-animated-skeleton animation-delay-200"></div>
                                    <div className="loading-h12-w60 loading-animated-skeleton mt-2 ml-2 animation-delay-200"></div>
                                </div>
                                <div className="loading-h14-w200 loading-animated-skeleton mt-2 animation-delay-400"></div>
                                <div className="loading-h14-w300 loading-animated-skeleton mt-2 animation-delay-600"></div>
                                <div className="loading-h14-w160 loading-animated-skeleton mt-2 animation-delay-800"></div>
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
                                    <button className="menu-tools-btn"><Icon name="Plus" /></button>
                                    <div className="tools-group">
                                        <EmojiPicker placement="top-start" btnClassName="text-tools" icon={<Icon name="Emoji" />} />
                                        <button className="text-tools"><Icon name="At" /></button>
                                        <button className="text-tools"><Icon name="Font" /></button>
                                    </div>
                                    <div className="tools-group">
                                        <button className="text-tools files-upload"><Icon name="Picture" /></button>
                                        <button className="text-tools"><Icon name="Link" /></button>
                                    </div>
                                </div>
                                <div className="text-tools-right">
                                    <button className="send-tool"><Icon name="Send" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    )
}

export const OnlineUserMobileLoader = () => {
    return (
        [...Array(12)].map((_, key) => {
            return (
                <div className="online-user" key={key}>
                    <div className="loading-circle-38 loading-skeleton !mr-0 mb-2"></div>
                    <div className="online-user-name">
                        <div className="loading-h14-w50 loading-skeleton"></div>
                    </div>
                </div>
            )
        })
    )
}