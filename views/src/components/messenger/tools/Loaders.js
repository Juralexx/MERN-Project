export const ConversationLoader = () => {
    return (
        [...Array(5)].map((_, key) => {
            return (
                <div className="conversation" key={key}>
                    <div className="conversation-img-container">
                        <div className="conversation-img loading"></div>
                    </div>
                    <div className="conversation-infos">
                        <div className="conversation-infos-top">
                            <div className="loading-small-title loading"></div>
                            <div className="loading-tiny-text loading"></div>
                        </div>
                        <div className="flex mt-4">
                            <div className="loading-short-text loading mr-2"></div>
                            <div className="loading-long-text loading"></div>
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

export const MessageLoader = () => {
    return (
        [...Array(6)].map((_, key) => {
            return (
                <div className="message-container loader" key={key}>
                    <div className="message">
                        <div className="message-content">
                            <div className="message-left">
                                <div className="message-img loading-circle-38 loading"></div>
                            </div>
                            <div className="message-right">
                                <div className="message-right-top">
                                    <div className="message-sender loading-small-title loading"></div>
                                </div>
                                <div className="loading-medium-card loading mt-2"></div>
                                <div className="message-right-bottom loading-short-text loading mt-2 !ml-auto"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    )
}