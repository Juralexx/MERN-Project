import React, { useContext, useRef, useState } from 'react';
import ReactPlayer from 'react-player/lazy'
import Tooltip from '../../tools/global/Tooltip';
import Warning from '../../tools/global/Warning';
import Emojis from './Emojis';
import Editor from './Editor';
import ShareModal from './ShareModal';
import Actions from './Actions';
import { MessengerContext } from '../../AppContext';
import { useEmojis } from './useEmojis';
import { useClickOutside } from '../../tools/hooks/useClickOutside';
import { useCheckLocation } from '../functions/useCheckLocation';
import { useLongPress } from '../../tools/hooks/useLongPress';
import { avatar } from '../../tools/hooks/useAvatar';
import { SmallAvatar } from '../../tools/global/Avatars';
import FsLightbox from 'fslightbox-react';
import { deleteFiles, removeMessage } from '../functions/actions';
import { convertDeltaToHTML, convertDeltaToStringNoHTML, getUserPseudo, returnMessageFiles } from '../functions/function';
import { dateParserWithoutYear, download, getHourOnly } from '../../Utils';
import { MdClear, MdFileDownload, MdFullscreen } from 'react-icons/md'
import { IoArrowRedo } from 'react-icons/io5'
;

const Message = ({ message, uniqueKey, className, handleSubmit, currentChat, members }) => {
    const { uid, user, websocket, dispatch, mediaXs } = useContext(MessengerContext)
    const [modify, setModify] = useState(-1)
    const [warning, setWarning] = useState(false)
    const [toggler, setToggler] = useState(false)
    const { isParam } = useCheckLocation()

    const [share, setShare] = useState(false)

    const messageRef = useRef()
    const [opened, setOpened] = useState(false)
    useClickOutside(messageRef, setOpened, false)
    const longPressProps = useLongPress({
        onLongPress: () => mediaXs ? setOpened(true) : {},
    })

    const { emojis, handleEmoji } = useEmojis(message, currentChat)

    return (
        <div
            ref={messageRef}
            className={opened ? "message-container hovered " + className : "message-container " + className}
            data-hour={getHourOnly(new Date(message.createdAt))}
            {...longPressProps}
        >
            <div className="message">
                <div className="message-left">
                    <div className="message-img" style={avatar(message.sender_picture)}></div>
                </div>
                <div className="message-right">
                    <div className="message-right-top">
                        {getUserPseudo(currentChat.members, message.sender, message.sender_pseudo)}
                        <span>{getHourOnly(new Date(message.createdAt))} {message.modified && "(modifié)"}</span>
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
                                        <div className="message-files-container" key={key}>
                                            <p className="txt-sec f-12">{file.name}</p>
                                            <div className="files-block">
                                                {returnMessageFiles(file)}
                                                <div className="files-tools">
                                                    <Tooltip content={<p>Agrandir</p>}>
                                                        <button onClick={() => setToggler(true)}><MdFullscreen /></button>
                                                    </Tooltip>
                                                    <Tooltip content={<p>Ouvrir&nbsp;dans&nbsp;une&nbsp;nouvelle&nbsp;fenêtre</p>}>
                                                        <button><a href={file.url} rel="noreferrer" target="_blank"><IoArrowRedo /></a></button>
                                                    </Tooltip>
                                                    <Tooltip content={<p>Télécharger</p>}>
                                                        <button className="files-tools-btn" onClick={() => download(file)}><MdFileDownload /></button>
                                                    </Tooltip>
                                                    {file.userId === uid &&
                                                        <Tooltip content={<p>Supprimer</p>}>
                                                            <button className="files-tools-btn" onClick={() => deleteFiles(file, user, websocket, currentChat, message._id, dispatch, isParam)}><MdClear /></button>
                                                        </Tooltip>
                                                    }
                                                </div>
                                            </div>
                                            <FsLightbox
                                                toggler={toggler}
                                                sources={[file.url]}
                                                onClose={() => setToggler(false)}
                                            />
                                        </div>
                                    )
                                })
                            }

                            {message.shared &&
                                <div className="shared-message">
                                    <div className="message-top">
                                        <div className="message-img" style={avatar(message.shared.sender_picture)}></div>
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
                            currentChat={currentChat}
                            members={members}
                        />
                    )}
                    <Emojis
                        uid={uid}
                        emojis={emojis}
                        handleEmoji={handleEmoji}
                        opened={opened}
                        setOpened={setOpened}
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