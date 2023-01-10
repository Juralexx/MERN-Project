import React, { useContext, useRef, useState } from 'react';
import ReactPlayer from 'react-player/lazy'
import Warning from '../../tools/global/Warning';
import Emojis from './Emojis';
import Editor from './Editor';
import ShareModal from './ShareModal';
import File from './File';
import Actions from './Actions';
import { MessengerContext } from '../../AppContext';
import { useEmojis } from './useEmojis';
import { useClickOutside } from '../../tools/hooks/useClickOutside';
import { useCheckLocation } from '../functions/useCheckLocation';
import { useLongPress } from '../../tools/hooks/useLongPress';
import { SmallAvatar } from '../../tools/global/Avatars';
import { removeMessage } from '../functions/actions';
import { convertDeltaToHTML, convertDeltaToStringNoHTML, getUserPseudo, returnMessageFiles } from '../functions/function';
import { dateParserWithoutYear, fullImage, getHourOnly } from '../../Utils';
;

const Message = ({ message, uniqueKey, className, handleSubmit, members }) => {
    const { uid, websocket, currentChat, dispatch, xs } = useContext(MessengerContext)
    const [modify, setModify] = useState(-1)
    const [warning, setWarning] = useState(false)
    const { isParam } = useCheckLocation()

    const [share, setShare] = useState(false)

    const messageRef = useRef()
    const [opened, setOpened] = useState(false)
    useClickOutside(messageRef, () => setOpened(false))
    const longPressProps = useLongPress({
        onLongPress: () => xs ? setOpened(true) : {},
    })

    const { emojis, handleEmoji } = useEmojis(message, currentChat)

    return (
        <div ref={messageRef}
            className={opened ? "message-container hovered " + className : "message-container " + className}
            data-hour={getHourOnly(new Date(message.createdAt))}
            {...longPressProps}
        >
            <div className="message">
                <div className="message-left">
                    <div className="message-img" style={fullImage(message.sender_picture)}></div>
                </div>
                <div className="message-right">
                    <div className="message-right-top">
                        {getUserPseudo(currentChat.members, message.sender, message.sender_pseudo)}
                        <span>{getHourOnly(new Date(message.createdAt))} {message.modified && "- modifié"}</span>
                    </div>

                    {message && modify !== uniqueKey ? (
                        <>
                            {Object.keys(message.text).length > 0 &&
                                <div className="message-text" dangerouslySetInnerHTML={convertDeltaToHTML(message)}></div>
                            }
                            {message.embeds?.length > 0 &&
                                message.embeds.map((url, key) => {
                                    return (
                                        <div className="embed-block" key={key}>
                                            <div className="embed-content">
                                                <ReactPlayer
                                                    className="embed-player"
                                                    onProgress={() => { return 'loading' }}
                                                    url={url}
                                                    controls={true}
                                                    width='100%'
                                                    height='100%'
                                                />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {message.files?.length > 0 &&
                                message.files.map((file, key) => {
                                    return (
                                        <div key={key}>
                                            <File
                                                file={file}
                                                message={message}
                                            />
                                        </div>
                                    )
                                })
                            }
                            {message.shared &&
                                <div className="shared-message">
                                    <div className="message-top">
                                        <div className="message-img" style={fullImage(message.shared.sender_picture)}></div>
                                        <div className="message-infos">
                                            {getUserPseudo(currentChat.members, message.shared.sender, message.shared.sender_pseudo)}
                                            <span>{getHourOnly(new Date(message.shared.createdAt))} {message.shared.modified && "(modifié)"}</span>
                                        </div>
                                    </div>
                                    <div className="message-bottom">
                                        <div className="message-text" dangerouslySetInnerHTML={convertDeltaToHTML(message.shared)}></div>
                                        {message.shared.files && message.shared.files.length > 0 &&
                                            message.shared.files.map((file, key) => {
                                                return (
                                                    <div className="message-files-container" key={key}>
                                                        <p className="txt-sec f-12">{file.name}</p>
                                                        <div className="files-block">
                                                            {returnMessageFiles(file)}
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            }
                        </>
                    ) : (
                        <Editor
                            message={message}
                            setModify={setModify}
                            setOpened={setOpened}
                            members={members}
                        />
                    )}
                    <Emojis
                        uid={uid}
                        emojis={emojis}
                        handleEmoji={handleEmoji}
                    />
                </div>
                <Actions
                    message={message}
                    opened={opened}
                    setOpened={setOpened}
                    modify={modify}
                    setModify={setModify}
                    setShare={setShare}
                    handleEmoji={handleEmoji}
                    setWarning={setWarning}
                    uniqueKey={uniqueKey}
                />
                {warning &&
                    <Warning
                        title="Supprimer le message"
                        text="Voulez-vous vraiment supprimer ce message ? Cette action est irréversible."
                        validateBtn="Supprimer"
                        className="delete"
                        open={warning}
                        setOpen={setWarning}
                        onValidate={() => removeMessage(message, currentChat, uid, websocket, dispatch, isParam)}
                        onClose={() => setOpened(false)}
                    >
                        <div className="message-preview">
                            <div className="message-preview-left">
                                <SmallAvatar pic={message.sender_picture} />
                            </div>
                            <div className="message-preview-right">
                                <div className="message-preview-right-top">
                                    {message.sender_pseudo} <span>{dateParserWithoutYear(message.createdAt)} à {getHourOnly(new Date(message.createdAt))}</span>
                                </div>
                                <p className="message-text">
                                    {Object.keys(message.text).length > 0 ? (
                                        convertDeltaToStringNoHTML(message)
                                    ) : (
                                        message.files.length > 0 && message.files[0].name
                                    )}
                                </p>
                            </div>
                        </div>
                    </Warning>
                }
                {share &&
                    <ShareModal
                        open={share}
                        setOpen={setShare}
                        message={message}
                        handleSubmit={handleSubmit}
                        currentChat={currentChat}
                        members={members}
                    />
                }
            </div>
        </div>
    )
}

export default Message