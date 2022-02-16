import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { getHourOnly } from '../Utils';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import { Picker } from 'emoji-mart'
import { Emoji } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import { MdOutlineContentCopy, MdOutlineAddReaction } from 'react-icons/md'
import { BsThreeDotsVertical } from 'react-icons/bs'

const Message = ({ message, own, uniqueKey, userId }) => {
    const userData = useSelector((state) => state.userReducer)
    const avatar = (props) => { return ({ backgroundImage: `url(${props})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }) }
    const [hoveredCard, setHoveredCard] = useState(-1)
    const [openToolsMenu, setOpenToolsMenu] = useState(false)
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
    const [emojis, setEmojis] = useState(message.emojis)
    const wrapperRef = useRef()

    const showCardHandler = (key) => { setHoveredCard(key) }
    const hideCardHandler = () => { setHoveredCard(-1) }

    const handleEmoji = async (emoji) => {
        setEmojis([...emojis, emoji])
        Object.assign(emoji, { emoji_sender: userData.pseudo, emoji_sender_id: userId })
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/messages/single/${message._id}`,
            data: { emojis: emoji }
        })
        setOpenEmojiPicker(false)
    }

    const deleteEmoji = async (emoji) => {
        var storedArray = emojis.slice()
        var index = storedArray.findIndex(element => element.id === emoji.id && element.sender_pseudo === emoji.sender_pseudo)
        storedArray.splice(index, 1)
        setEmojis(storedArray)

        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/messages/single/remove-emoji/${message._id}`,
            data: { emojis: emoji }
        })
    }

    const handleClickOutside = (e) => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(e.target)) {
            setOpenEmojiPicker(false)
        }
    }; useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function getMessage() {
        var callback = {}
        var converter = new QuillDeltaToHtmlConverter(message.text[0].ops, callback)
        var html = converter.convert(message.text[0].ops)
        return ({ __html: html })
    }

    return (
        <div className={own ? "message own" : "message"} onMouseLeave={hideCardHandler} onMouseEnter={() => showCardHandler(uniqueKey)}>
            <div className="message-left">
                <div className="message-img" style={avatar(message.sender_picture)}></div>
            </div>
            <div className="message-right">
                <div className="message-right-top">
                    <div className="message-sender">{message.sender_pseudo}</div>
                    <div className="time-ago">{getHourOnly(new Date(message.createdAt))}</div>
                </div>

                {message && <div className="message-text" dangerouslySetInnerHTML={getMessage()}></div>}

                {emojis && emojis.length > 0 && (
                    <div className="emoji-container">
                        {emojis.map((emoji, i) => {
                            return (
                                <div className="emoji" key={i}>
                                    <Emoji emoji={emoji} size={18} onClick={emoji.emoji_sender_id === userId && (() => deleteEmoji(emoji))} />
                                </div>
                            )
                        })}
                        <div className="emoji-add">
                            <MdOutlineAddReaction onClick={() => setOpenEmojiPicker(true)} />
                        </div>
                    </div>
                )}
            </div>
            <div className="message-actions" ref={wrapperRef} style={{ display: hoveredCard === uniqueKey ? 'flex' : 'none' }}>
                {openEmojiPicker && <Picker emoji="point_up" onClick={(emoji) => handleEmoji(emoji)} style={{ position: "absolute", top: -80, right: 0, transform: "scale(0.7)", zIndex: 10 }} />}
                <div className="message-actions-btn"><Emoji emoji="thumbsup" size={16} /></div>
                <div className="message-actions-btn"><Emoji emoji=":white_check_mark:" size={16} /></div>
                <div className="message-actions-btn"><Emoji emoji=":grin:" size={16} /></div>
                <div className="message-actions-btn" onClick={() => setOpenEmojiPicker(!openEmojiPicker)}><MdOutlineAddReaction /></div>
                <div className="message-actions-btn" onClick={() => navigator.clipboard.writeText(message.text)}><MdOutlineContentCopy /></div>
                <div className="message-actions-btn" onClick={() => setOpenToolsMenu(!openToolsMenu)}><BsThreeDotsVertical /></div>

                {openToolsMenu && (
                    <div className="message-tools-menu">
                        <button>Supprimer le message</button>
                        <button>Modifier le message</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Message;
