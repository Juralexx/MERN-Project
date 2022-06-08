import React, { useContext, useRef, useState } from 'react';
import EmojiPicker from '../tools/EmojiPicker';
import { Picker } from 'emoji-mart';
import Tooltip from '../../tools/global/Tooltip';
import ToolsMenu from '../../tools/global/ToolsMenu';
import { convertDeltaToStringNoHTML, like } from '../functions/function';
import { addClass, checkTheme } from '../../Utils';
import useClipboard from '../../tools/hooks/useClipboard';
import { MessengerContext } from '../../AppContext';
import { MdThumbUp } from 'react-icons/md'
import { IoArrowUndo, IoTrashBin } from 'react-icons/io5'
import { RiEdit2Fill, RiFileCopyFill } from 'react-icons/ri';
import { MdAddReaction } from 'react-icons/md';

const Actions = ({ message, opened, setOpened, modify, setModify, setShare, handleEmoji, setWarning, uniqueKey }) => {
    const { uid, mediaXs } = useContext(MessengerContext)
    const { copy } = useClipboard()

    const checkTheme = () => {
        const theme = localStorage.getItem("theme")
        if (theme !== null && theme === "light")
            return 'light'
        else return 'dark'
    }

    return (
        !mediaXs ? (
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
            opened &&
            <>
                {/* <div className="mobile-menu" onClick={() => setOpened(!opened)}>
                    <div className="tools-choice" onClick={() => copy(convertDeltaToStringNoHTML(message))}><MdAddReaction /> Ajouter une réaction</div>
                    <div className="tools-choice" onClick={() => setShare(true)}><IoArrowUndo /> Répondre</div>
                    <div className="tools-choice" onClick={() => copy(convertDeltaToStringNoHTML(message))}><RiFileCopyFill /> Copier le message</div>
                    {message.sender === uid &&
                        <>
                            <div className="tools-choice" onClick={() => setModify(uniqueKey)}><RiEdit2Fill /> Modifier le message</div>
                            <div className="tools-choice red" onClick={() => { setWarning(true); setOpened(true) }}><IoTrashBin />Supprimer le message</div>
                        </>
                    }
                </div> */}
                <div className="mobile-emoji-picker">
                    <Picker
                        theme={checkTheme()}
                        set='twitter'
                        sheetSize={64}
                        color="#5a7df0"
                        useButton={true}
                        emojiSize={26}
                        perLine={7}
                        showPreview={false}
                        emojiTooltip={false}
                    />
                </div>
            </>
        )
    )
}

export default Actions