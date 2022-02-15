import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaPen, FaTrash, } from 'react-icons/fa'
import { MdOutlineContentCopy, MdOutlineAddReaction } from 'react-icons/md'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { getHourOnly } from '../Utils';
import { Picker } from 'emoji-mart'
import { Emoji } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import axios from 'axios';

const Message = ({ message, own, uniqueKey }) => {
    const userData = useSelector((state) => state.userReducer)
    const avatar = (props) => { return ({ backgroundImage: `url(${props})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }) }
    const [hoveredCard, setHoveredCard] = useState(-1)
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
    const [emojis, setEmojis] = useState(message.emojis)
    const [openToolsMenu, setOpenToolsMenu] = useState(false)
    const showCardHandler = (key) => { setHoveredCard(key) }
    const hideCardHandler = () => { setHoveredCard(-1) }

    const handleEmoji = async (emoji) => {
        setEmojis([...emojis, emoji])
        Object.assign(emoji, { emoji_sender: userData.pseudo })
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
                <p className="message-text">
                    {message.text}
                </p>

                {openEmojiPicker &&
                    <Picker
                        emoji="point_up"
                        onClick={(emoji) => handleEmoji(emoji)}
                        style={{ position: "absolute", top: -80, right: -370, transform: "scale(0.7)", zIndex: 10 }}
                    />
                }

                {emojis.length !== 0 && (
                    <div className="emoji-container">
                        {emojis.map((emoji, i) => {
                            return (
                                <div className="emoji" key={i}>
                                    <Emoji emoji={emoji} size={18} onClick={() => deleteEmoji(emoji)} />
                                </div>
                            )
                        })}
                        <div className="emoji-add">
                            <MdOutlineAddReaction onClick={() => setOpenEmojiPicker(!openEmojiPicker)} />
                        </div>
                    </div>
                )}
            </div>
            <div className="message-actions" style={{ display: hoveredCard === uniqueKey ? 'flex' : 'none' }}>
                <div className="message-actions-btn"><Emoji emoji="thumbsup" size={16} /></div>
                <div className="message-actions-btn"><Emoji emoji=":white_check_mark:" size={16} /></div>
                <div className="message-actions-btn"><Emoji emoji=":grin:" size={16} /></div>
                <div className="message-actions-btn" onClick={() => setOpenEmojiPicker(!openEmojiPicker)}><MdOutlineAddReaction /></div>
                <div className="message-actions-btn" onClick={() => navigator.clipboard.writeText(message.text)}><MdOutlineContentCopy /></div>
                <div className="message-actions-btn"><FaPen /></div>
                <div className="message-actions-btn"><FaTrash /></div>
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
