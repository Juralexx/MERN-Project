import React, { useContext, useState } from 'react';
import useClipboard from '../../tools/hooks/useClipboard';
import { MessengerContext } from '../../AppContext';
import EmojiPicker from '../tools/EmojiPicker';
import Tooltip from '../../tools/global/Tooltip';
import ToolsMenu from '../../tools/global/ToolsMenu';
import MobileEmojiPicker from '../tools/MobileEmojiPicker';
import { convertDeltaToStringNoHTML, like } from '../functions/function';
import { addClass } from '../../Utils';
import { MdThumbUp } from 'react-icons/md'
import { IoArrowUndo, IoTrashBin } from 'react-icons/io5'
import { RiEdit2Fill, RiFileCopyFill } from 'react-icons/ri';
import { MdAddReaction } from 'react-icons/md';

const Actions = ({ message, opened, setOpened, modify, setModify, setShare, handleEmoji, setWarning, uniqueKey }) => {
    const { uid, xs } = useContext(MessengerContext)
    const { copy } = useClipboard()
    const [openMobPicker, setOpenMobPicker] = useState(false)

    return (
        !xs ? (
            <div className={`message-actions ${addClass(opened, 'active')} ${addClass(modify === uniqueKey, '!hidden')}`}>
                <Tooltip content={<p>Liker</p>}>
                    <div className="message-actions-btn" onClick={() => handleEmoji(like)}><MdThumbUp /></div>
                </Tooltip>
                <Tooltip content={<p>Réagir</p>}>
                    <EmojiPicker btnClassName="message-actions-btn" onSelect={emoji => handleEmoji(emoji)} onClick={() => setOpened(!opened)} />
                </Tooltip>
                <Tooltip content={<p>Répondre</p>}>
                    <div className="message-actions-btn" onClick={() => setShare(true)}><IoArrowUndo /></div>
                </Tooltip>
                {message.sender === uid &&
                    <Tooltip content={<p>Modifier</p>}>
                        <div className="message-actions-btn" onClick={() => setModify(uniqueKey)}><RiEdit2Fill /></div>
                    </Tooltip>
                }
                <ToolsMenu btnClassName="message-actions-btn" onClick={() => setOpened(!opened)} openXs={opened}>
                    <div className="tools_choice" onClick={() => setShare(true)}><IoArrowUndo /> Répondre</div>
                    <div className="tools_choice" onClick={() => copy(convertDeltaToStringNoHTML(message))}><RiFileCopyFill /> Copier le message</div>
                    {message.sender === uid &&
                        <>
                            <div className="tools_choice" onClick={() => setModify(uniqueKey)}><RiEdit2Fill /> Modifier le message</div>
                            <div className="tools_choice red" onClick={() => { setWarning(true); setOpened(true) }}><IoTrashBin />Supprimer le message</div>
                        </>
                    }
                </ToolsMenu>
            </div>
        ) : (
            <>
                <div className={`mobile-menu ${addClass(opened, 'active')}`} onClick={() => setOpened(!opened)}>
                    <div className="tools_choice" onClick={() => setOpenMobPicker(true)}><MdAddReaction /> Ajouter une réaction</div>
                    <div className="tools_choice" onClick={() => setShare(true)}><IoArrowUndo /> Répondre</div>
                    <div className="tools_choice" onClick={() => copy(convertDeltaToStringNoHTML(message))}><RiFileCopyFill /> Copier le message</div>
                    {message.sender === uid &&
                        <>
                            <div className="tools_choice" onClick={() => setModify(uniqueKey)}><RiEdit2Fill /> Modifier le message</div>
                            <div className="tools_choice red" onClick={() => { setWarning(true); setOpened(true) }}><IoTrashBin />Supprimer le message</div>
                        </>
                    }
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