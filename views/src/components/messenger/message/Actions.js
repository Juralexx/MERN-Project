import React, { useContext, useState } from 'react';
import { MessengerContext } from '../../AppContext';
import Icon from '../../tools/icons/Icon';
import EmojiPicker from '../tools/EmojiPicker';
import Tooltip from '../../tools/global/Tooltip';
import ToolsMenu from '../../tools/global/ToolsMenu';
import MobileEmojiPicker from '../tools/MobileEmojiPicker';
import { convertDeltaToStringNoHTML, like } from '../functions';
import useClipboard from '../../tools/hooks/useClipboard';
import { addClass } from '../../Utils';

const Actions = ({ message, opened, setOpened, modify, setModify, setShare, handleEmoji, setWarning, uniqueKey }) => {
    const { uid, xs } = useContext(MessengerContext)
    const { copy } = useClipboard()
    const [openMobPicker, setOpenMobPicker] = useState(false)

    return (
        !xs ? (
            <div className={`message-actions ${addClass(opened, 'active')} ${addClass(modify === uniqueKey, '!hidden')}`}>
                <Tooltip content={<p>Liker</p>}>
                    <div className="message-actions-btn" onClick={() => handleEmoji(like)}>
                        <Icon name="Like" />
                    </div>
                </Tooltip>
                <Tooltip content={<p>Réagir</p>}>
                    <EmojiPicker
                        btnClassName="message-actions-btn"
                        onSelect={emoji => handleEmoji(emoji)}
                        onClick={() => setOpened(!opened)}
                    />
                </Tooltip>
                <Tooltip content={<p>Répondre</p>}>
                    <div className="message-actions-btn" onClick={() => setShare(true)}>
                        <Icon name="Redo" />
                    </div>
                </Tooltip>
                {message.sender === uid &&
                    <Tooltip content={<p>Modifier</p>}>
                        <div className="message-actions-btn" onClick={() => setModify(uniqueKey)}>
                            <Icon name="Edit" />
                        </div>
                    </Tooltip>
                }
                <ToolsMenu btnClassName="message-actions-btn" onClick={() => setOpened(!opened)} openXs={opened}>
                    <div className="tools_choice" onClick={() => setShare(true)}>
                        <Icon name="Redo" /> Répondre
                    </div>
                    <div className="tools_choice" onClick={() => copy(convertDeltaToStringNoHTML(message))}>
                        <Icon name="Clipboard" /> Copier le message
                    </div>
                    {message.sender === uid &&
                        <>
                            <div className="tools_choice" onClick={() => setModify(uniqueKey)}>
                                <Icon name="Edit" /> Modifier le message
                            </div>
                            <div className="tools_choice red" onClick={() => {
                                setWarning(true)
                                setOpened(true)
                            }}>
                                <Icon name="Trash" />Supprimer le message
                            </div>
                        </>
                    }
                </ToolsMenu>
            </div>
        ) : (
            <>
                <div className={`mobile-menu ${addClass(opened, 'active')}`} onClick={() => setOpened(!opened)}>
                    <div className="mobile-menu-tools">
                        <div className="tools_choice" onClick={() => setOpenMobPicker(true)}>
                            <Icon name="Reaction" /> Ajouter une réaction
                        </div>
                        <div className="tools_choice" onClick={() => setShare(true)}>
                            <Icon name="Redo" /> Répondre
                        </div>
                        <div className="tools_choice" onClick={() => copy(convertDeltaToStringNoHTML(message))}>
                            <Icon name="Clipboard" /> Copier le message
                        </div>
                        {message.sender === uid &&
                            <>
                                <div className="tools_choice" onClick={() => setModify(uniqueKey)}>
                                    <Icon name="Edit" /> Modifier le message
                                </div>
                                <div className="tools_choice red" onClick={() => {
                                    setWarning(true)
                                    setOpened(true)
                                }}>
                                    <Icon name="Trash" />Supprimer le message
                                </div>
                            </>
                        }
                    </div>
                </div>
                <MobileEmojiPicker
                    open={openMobPicker}
                    setOpen={setOpenMobPicker}
                    onSelect={emoji => handleEmoji(emoji)}
                    onClick={() => setOpened(!opened)}
                />
            </>
        )
    )
}

export default Actions