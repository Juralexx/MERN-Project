import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import { formatDistanceToNowStrict } from 'date-fns'
import { fr } from 'date-fns/locale';
import { charSetToChar, checkTheme, dateParser, dateParserWithoutYear, randomNbID, removeHTMLMarkers } from '../../Utils'
import { addEmoji, addMember, deleteConversation, deleteFile, deleteMessage, removeEmoji, removeMember, updateMessage } from '../../../actions/messenger.action';
import { coverPicture } from '../../tools/functions/useAvatar';
import { IoDocumentTextOutline } from 'react-icons/io5';
import axios from 'axios';

/**
 * Delta convertion
 */

export function convertEditorToHTML(message) {
    let callback = {}
    let converter = new QuillDeltaToHtmlConverter(message.text[0].ops, callback)
    let html = converter.convert(message.text[0].ops)
    return ({ __html: html })
}

export function convertEditorToString(message) {
    let callback = {}
    let converter = new QuillDeltaToHtmlConverter(message.text[0].ops, callback)
    let html = converter.convert(message.text[0].ops)
    return html
}

export function convertEditorToStringNoHTML(message) {
    let callback = {}
    let converter = new QuillDeltaToHtmlConverter(message.text[0].ops, callback)
    let html = converter.convert(message.text[0].ops)
    return charSetToChar(removeHTMLMarkers(html))
}

export function convertDeltaToHTML(message) {
    let callback = {}
    let converter = new QuillDeltaToHtmlConverter(message.text.ops, callback)
    let html = converter.convert(message.text.ops)
    return ({ __html: html })
}

export function convertDeltaToString(message) {
    let callback = {}
    let converter = new QuillDeltaToHtmlConverter(message.text.ops, callback)
    let html = converter.convert(message.text.ops)
    return html
}

export function convertDeltaToStringNoHTML(message) {
    let callback = {}
    let converter = new QuillDeltaToHtmlConverter(message.text.ops, callback)
    let html = converter.convert(message.text.ops)
    return charSetToChar(removeHTMLMarkers(html))
}

/**
 * Convert date. If date > 1 year, return date with year, else no.
 */

export function getDate(date) {
    let diffInMinutes = Math.abs(new Date(date) - new Date());
    let checkDate = diffInMinutes / (1000 * 60 * 60 * 24);
    if (checkDate > 1) {
        let getDateInDays = dateParserWithoutYear(date)
        return getDateInDays
    } else {
        let getDateInHours = formatDistanceToNowStrict(new Date(date), new Date(), { locale: fr, includeSeconds: true })
        if (getDateInHours === "0 seconds")
            return "À l'instant"
        else return getDateInHours
    }
}

/**
 * Return all members except user
 */

export const getMembers = (conversation, uid) => {
    const members = conversation.members.filter(member => member._id !== uid)
    return members
}

/**
 * Keep only id, pseudo and picture from users and return array
 */

export const userToMember = (members) => {
    let arr = []
    members.forEach(member => {
        arr.push({ _id: member._id, pseudo: member.pseudo, picture: member.picture })
    })
    return arr
}

/**
 * Return all IDs except userID
 */

export const otherMembersIDs = (conversation, uid) => {
    const membersId = conversation.members.filter(member => member._id !== uid)
    let memberIds = []
    membersId.map(member => {
        return memberIds = [...memberIds, member._id]
    })
    return memberIds
}

/**
 * If user is not selected, push it in array, else remove it from array
 */

export const pushUserInArray = (member, array) => {
    if (!array.some(e => e._id === member._id)) {
        return [...array, { _id: member._id, pseudo: member.pseudo, picture: member.picture, date: new Date().toISOString() }]
    } else {
        let arr = [...array]
        let index = arr.findIndex(e => e._id === member._id)
        arr.splice(index, 1)
        return arr
    }
}

/**
 * Remove user from array
 */

export const removeUserFromArray = (member, array) => {
    let arr = [...array]
    let index = arr.findIndex(e => e._id === member._id)
    arr.splice(index, 1)
    return arr
}

/**
 * Find if a conversation if selected members already exists
 */

export const isConversation = (conversations, members) => {
    if (conversations.length > 0) {
        const convs = conversations.filter(conv => conv.members.length === members.length)
        if (convs.length > 0) {
            if (members.length === 2) {
                const conversation = convs.filter(conv => conv.members[0]._id === members[0]._id || conv.members[1]._id === members[0]._id)
                if (conversation.length > 0) {
                    return conversation[0]
                } else {
                    return false
                }
            } else {
                let membersIDs = []
                members.forEach(member => {
                    membersIDs.push(member._id)
                })
                for (let i = 0; i < convs.length; i++) {
                    let convIDs = []
                    convs[i].members.forEach(member => {
                        convIDs.push(member.id)
                    })
                    if (JSON.stringify(convIDs.sort()) === JSON.stringify(membersIDs.sort())) {
                        return convs[i]
                    } else if (i === (convs.length - 1)) {
                        return false
                    }
                }
            }
        } else return false
    }
}

/**
 * Remove user already selected from array
 */

export const removeSelected = (array, userId) => {
    let arr = [...array]
    let i = arr.findIndex(e => e._id === userId)
    arr.splice(i, 1)
    return arr
}

/**
 * Return users pseudo
 */

export const returnMembers = (members) => {
    if (members.length === 1)
        return members[0].pseudo
    else if (members.length === 2)
        return members[0].pseudo + " et " + members[1].pseudo
    else if (members.length === 3)
        return members[0].pseudo + ", " + members[1].pseudo + " et " + members[2].pseudo
    else if (members.length > 3)
        return members[0].pseudo + ", " + members[1].pseudo + ", " + members[2].pseudo + " et " + (members.length - 3) + " autres"
}

/**
 * Return users pseudo
 */

export const returnConversationPseudo = (conversation, message, uid) => {
    if (conversation.type === 'group') {
        if (message.sender === uid) {
            return "Vous : "
        } else return conversation.sender_pseudo
    } else {
        if (message.sender === uid) {
            return "Vous : "
        } else return
    }
}

/**
 * Get all messages differents dates
 */

export const getMessagesDates = (messages) => {
    if (messages.length > 0) {
        let array = []
        messages.map((message, key) => {
            return array = [...array, { index: key, date: message.createdAt.substring(0, 10) }]
        })
        let filteredArray = []
        array.filter(item => {
            let i = filteredArray.findIndex(e => e.date === item.date);
            if (i <= -1) { filteredArray.push(item) }
            return null
        })
        return filteredArray
    }
}

/**
 * Minimize message height and remove pseudo and hours if previous and this message is under certain time
 */

export const getHoursDiff = (prev, current) => {
    if (prev.sender === current.sender) {
        let hourDiff = new Date(current.createdAt) - new Date(prev.createdAt)
        let prevTimeDiff = (hourDiff % 86400000) / 3600000
        if (prevTimeDiff < 0.2)
            return 'minify'
        else return 'normal'
    } else {
        return 'normal'
    }
}

/**
 * Like object
 */

export const like = { id: "+1", name: "Thumbs Up Sign", short_names: ["+1", "thumbsup"], colons: ":+1:", emoticons: [], unified: "1f44d", skin: 1, native: "👍" }

/**
 * Check file extension
 */

export const isImage = (file) => {
    const types = ['image/jpg', 'image/jpeg', 'image/bmp', 'image/gif', 'image/png', 'image/svg+xml'];
    return types.some(el => file.type === el);
}

export const isVideo = (file) => {
    const types = ['video/mp4', 'video/webm', 'video/x-m4v', 'video/quicktime'];
    return types.some(el => file.type === el);
}

export const isFile = (file) => {
    const types = [
        '.7z',
        '.ade',
        '.mde',
        '.adp',
        '.apk',
        '.appx',
        '.appxbundle',
        '.aspx',
        '.bat',
        '.com',
        '.dll',
        '.exe',
        '.msi',
        '.cab',
        '.cmd',
        '.cpl',
        '.dmg',
        '.gz',
        '.hta',
        '.ins',
        '.ipa',
        '.iso',
        '.isp',
        '.jar',
        '.js',
        '.jse',
        '.jsp',
        '.lib',
        '.lnk',
        '.msc',
        '.msix',
        '.msixbundle',
        '.msp',
        '.mst',
        '.nsh',
        '.pif',
        '.ps1',
        '.scr',
        '.sct',
        '.wsc',
        '.shb',
        '.sys',
        '.vb',
        '.vbe',
        '.vbs',
        '.vxd',
        '.wsf',
        '.wsh',
        '.tar'
    ]
    return !types.some(el => file.name.endsWith(el))
}

/**
 * Return the file preview in editor
 */

export const returnEditorFiles = (file) => {
    if (file.type.includes('image')) {
        return (
            <div className="file-img-preview" style={coverPicture(URL.createObjectURL(file))}></div>
        )
    } else {
        return (
            <div className="file-doc">
                <IoDocumentTextOutline className="file-doc-img" />
                <div className="file-doc-content">
                    <p>{file.name}</p>
                    <p>Document</p>
                </div>
            </div>
        )
    }
}

/**
 * Remove uploaded file
 */

export const removeFile = (files, index) => {
    let array = files.slice()
    array.splice(index, 1)
    return array
}

/**
 * Return the file in message
 */

export const returnMessageFiles = (file) => {
    if (file.type.includes('image')) {
        return (
            <img className="file-img" src={file.url} alt="" />
        )
    } else {
        return (
            <div className="file-doc">
                <IoDocumentTextOutline className="file-doc-img" />
                <div className="file-doc-content">
                    <p><a href={file.url}>{file.name}</a></p>
                    <p>Document</p>
                </div>
            </div>
        )
    }
}

/**
 * Modify message
 */

export const modifyMessage = (message, text, conversation, uid, websocket, dispatch) => {
    otherMembersIDs(conversation, uid).map(memberId => {
        return websocket.current.emit("updateMessage", {
            receiverId: memberId,
            messageId: message._id,
            text: text
        })
    })
    dispatch(updateMessage(conversation._id, message._id, text))
}

/**
 * Remove message
 */

export const removeMessage = (message, conversation, uid, websocket, dispatch) => {
    otherMembersIDs(conversation, uid).map(memberId => {
        return websocket.current.emit("deleteMessage", {
            receiverId: memberId,
            messageId: message._id
        })
    })
    dispatch(deleteMessage(conversation._id, message._id))
}

/**
 * Delete conversation
 */

export const deleteConv = (conversation, uid, websocket, dispatch) => {
    otherMembersIDs(conversation, uid).map(memberId => {
        return websocket.current.emit("deleteConversation", {
            receiverId: memberId,
            conversationId: conversation._id,
        })
    })
    dispatch(deleteConversation(conversation._id))
}

/**
 * Add onversation member
 */

export const addNewMember = (conversation, member, uid, websocket, dispatch) => {
    let newMember = {
        id: member._id,
        pseudo: member.pseudo,
        picture: member.picture
    }
    dispatch(addMember(conversation._id, newMember))
    otherMembersIDs(conversation, uid).map(member => {
        return websocket.current.emit("addConversationMember", {
            receiverId: member,
            newMember: newMember,
        })
    })
    return websocket.current.emit("joinConversation", {
        receiverId: newMember._id,
        conversationId: conversation._id,
    })
}

/**
 * Leave conversation
 */

export const leaveConversation = (conversation, memberId, uid, websocket, dispatch) => {
    dispatch(removeMember(conversation._id, memberId))
    otherMembersIDs(conversation, uid).map(member => {
        return websocket.current.emit("removeConversationMember", {
            receiverId: member,
            memberId: memberId,
        })
    })
    return websocket.current.emit("leaveConversation", {
        receiverId: memberId,
        conversationId: conversation._id,
    })
}

/**
 * Concat same emojis
 */

export const concatSameEmojis = (emojis) => {
    let group = emojis.reduce((r, a) => {
        r[a.id] = [...r[a.id] || [], a]
        return r
    }, {})

    return Object.values(group)
}

/**
 * Add emoji
 */

export const handleEmoji = (emoji, user, websocket, currentChat, message, dispatch) => {
    let emoj = { ...emoji, _id: randomNbID(24), sender_pseudo: user.pseudo, sender_id: user._id }
    otherMembersIDs(currentChat, user._id).map(memberId => {
        return websocket.current.emit("addEmoji", {
            receiverId: memberId,
            conversationId: currentChat._id,
            messageId: message._id,
            emoji: emoj
        })
    })
    dispatch(addEmoji(currentChat._id, message._id, emoj))
}

/**
 * Remove emoji
 */

export const deleteEmoji = (emojisGrouped, user, websocket, currentChat, message, dispatch) => {
    let emoji = emojisGrouped.find(e => e.sender_id === user._id)
    dispatch(removeEmoji(currentChat._id, message._id, emoji._id))
    otherMembersIDs(currentChat, user._id).map(memberId => {
        return websocket.current.emit("removeEmoji", {
            receiverId: memberId,
            conversationId: currentChat._id,
            messageId: message._id,
            emojiId: emoji._id
        })
    })
}

/**
 * Delete file
 */

export const deleteFiles = (file, user, websocket, currentChat, message, dispatch) => {
    otherMembersIDs(currentChat, user._id).map(memberId => {
        return websocket.current.emit("deleteFile", {
            receiverId: memberId,
            conversationId: currentChat._id,
            messageId: message._id,
            file: file
        })
    })
    dispatch(deleteFile(currentChat._id, message._id, file))
    if (message.text) {
        if (message.text.length === 0 && message.files.length - 1 <= 0) {
            removeMessage(message, currentChat, user._id, websocket, dispatch)
        }
    } else {
        const fecthMessage = async () => {
            await axios.get(`${process.env.REACT_APP_API_URL}api/conversation/${currentChat._id}/${message}`)
                .then(res => {
                    if (res.data.text.length === 0 && res.data.files.length - 1 <= 0) {
                        removeMessage(message, currentChat, user._id, websocket, dispatch)
                    }
                })
        }
        fecthMessage()
    }
}

/**
 * Place autocomplete container upon cursor
 */

export const placeUponCursor = (quill) => {
    if (quill) {
        quill.focus()
        let range = quill.getSelection()
        let quillHeight = quill.scroll.domNode.offsetHeight
        let pos = quill.getBounds(range.index)
        return {
            bottom: quillHeight - pos.bottom + pos.height,
            left: pos.left,
            right: pos.right,
        }
    }
}

/**
 * If no files are uploaded, file dropzone get height of editor, else it gets the height of files container.
 */

export const getEditorHeight = (quill, files, filesRef) => {
    if (quill) {
        if (files.length > 0 && filesRef.current) {
            let filesHeight = filesRef.current.offsetHeight
            let filesWidth = quill.offsetWidth
            return {
                height: filesHeight,
                width: filesWidth
            }
        } else {
            let quillHeight = quill.scroll.domNode.offsetHeight
            let quillWidth = quill.scroll.domNode.offsetWidth
            return {
                height: quillHeight,
                width: quillWidth
            }
        }
    }
}

/**
 * On mention on button press
 */

export const openMention = (quill, isMention, setMention) => {
    quill.focus()
    let pos = quill.getSelection().index
    let txt = quill.getText()
    let previous = txt[pos - 1]

    if (!isMention) {
        if ((/\s/).test(previous) || (!(/\s/).test(previous) && previous === undefined)) {
            quill.insertText(pos, "@", {
                'color': checkTheme('#232221', '#ffffff'),
                'bold': true
            }, true)
        } else if (!(/\s/).test(previous) && previous !== undefined && previous !== '@') {
            quill.insertText(pos, "\u00a0", {
                'color': checkTheme('#232221', '#ffffff'),
            }, true)
            quill.insertText(pos + 1, "@", {
                'color': checkTheme('#232221', '#ffffff'),
                'bold': true
            }, true)
        }
        setMention(true)
    } else {
        setMention(false)
    }
}

/**
 * On emoji picker selection
 */

export const pickEmoji = (emoji, quill) => {
    let position = quill.getSelection().index
    quill.insertText(position, emoji.native)
}