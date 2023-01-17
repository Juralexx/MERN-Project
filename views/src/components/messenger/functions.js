import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import { formatDistanceToNowStrict } from 'date-fns'
import { fr } from 'date-fns/locale';
import { charSetToChar, dateParserWithoutYear, fullImage, isImage, isVideo, removeHTMLMarkers } from '../Utils'
import VideoJS from './message/Video';
import Icon from '../tools/icons/Icon';

/**
 * 
 * @param {*} message 
 */

export function convertEditorToHTML(message) {
    let callback = {}
    let converter = new QuillDeltaToHtmlConverter(message.text[0].ops, callback)
    let html = converter.convert(message.text[0].ops)
    return ({ __html: html })
}

/**
 * 
 * @param {*} message 
 */

export function convertEditorToString(message) {
    let callback = {}
    let converter = new QuillDeltaToHtmlConverter(message.text[0].ops, callback)
    let html = converter.convert(message.text[0].ops)
    return html
}

/**
 * 
 * @param {*} message 
 */

export function convertEditorToStringNoHTML(message) {
    let callback = {}
    let converter = new QuillDeltaToHtmlConverter(message.text[0].ops, callback)
    let html = converter.convert(message.text[0].ops)
    return charSetToChar(removeHTMLMarkers(html))
}

/**
 * 
 * @param {*} message 
 */

export function convertDeltaToHTML(message) {
    let callback = {}
    let converter = new QuillDeltaToHtmlConverter(message.text.ops, callback)
    let html = converter.convert(message.text.ops)
    return ({ __html: html })
}

/**
 * 
 * @param {*} message 
 */

export function convertDeltaToString(message) {
    let callback = {}
    let converter = new QuillDeltaToHtmlConverter(message.text.ops, callback)
    let html = converter.convert(message.text.ops)
    return html
}

/**
 * 
 * @param {*} message 
 */

export function convertDeltaToStringNoHTML(message) {
    let callback = {}
    let converter = new QuillDeltaToHtmlConverter(message.text.ops, callback)
    let html = converter.convert(message.text.ops)
    return charSetToChar(removeHTMLMarkers(html))
}

/**
 * 
 * @param {*} message 
 */

export const handleEditor = (text, delta, source, editor) => {
    return editor.getContents()
}

/**
 * Like emoji object
 */

export const like = {
    id: "+1",
    name: "Thumbs Up Sign",
    short_names: ["+1", "thumbsup"],
    colons: ":+1:",
    emoticons: [],
    unified: "1f44d",
    skin: 1,
    native: "👍"
}

/**
 * Return the file preview (image, video or file) in editor
 * @param {*} file File to convert
 */

export const returnEditorFiles = (file) => {
    if (file.type.includes('image')) {
        return (
            <div className="file-img-preview" style={fullImage(URL.createObjectURL(file))}></div>
        )
    } else if (file.type.includes('video')) {
        return (
            <div className="file-doc">
                <Icon name="Play" className="file-doc-img" />
                <div className="file-doc-content">
                    <p>{file.name}</p>
                    <p>{file.type}</p>
                </div>
            </div>
        )
    } else {
        return (
            <div className="file-doc">
                <Icon name="File" className="file-doc-img" />
                <div className="file-doc-content">
                    <p>{file.name}</p>
                    <p>Document</p>
                </div>
            </div>
        )
    }
}

/**
 * Place autocomplete container upon cursor
 * @param {*} quill Quill editor ref
 */

export const placeUponCursor = (quill) => {
    if (quill?.hasFocus()) {
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
 * @param {*} quill Quill editor ref
 * @param {*} files Files array
 * @param {*} filesRef Files container ref
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
 * Add emoji to current cursor place in editor
 * @param {*} emoji Emoji object to add
 * @param {*} quill Quill editor ref
 */

export const pickEmoji = (emoji, quill) => {
    let position = quill.getSelection().index
    quill.insertText(position, emoji.native)
}

/*****************************************************/
/************** CONVERSATIONS FUNCTIONS **************/
/*****************************************************/

/**
 * Find if a conversation already exists with those members
 * @param {*} conversations Conversations array to search in
 * @param {*} members Members array
 */

export const isAlreadyConversationExisting = (conversations, members) => {
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
                        convIDs.push(member._id)
                    })
                    if (JSON.stringify(convIDs.sort()) === JSON.stringify(membersIDs.sort())) {
                        return convs[i]
                    } else if (i === (convs.length - 1)) {
                        return false
                    }
                }
            }
        } else return false
    } else return false
}


/******************************************************/
/***************** MESSAGES FUNCTIONS *****************/
/******************************************************/

/**
 * Map an messages array and return an array containing new dates only and index of it.
 * @param {*} messages Messages array
 */

export const getMessagesDates = (messages) => {
    if (messages.length > 0) {
        let array = []
        messages.map((message, key) => {
            return array = [...array, {
                index: key,
                date: message.createdAt.substring(0, 10)
            }]
        })
        let filteredArray = []
        array.filter(item => {
            let i = filteredArray.findIndex(e => e.date === item.date);
            if (i <= -1) { 
                filteredArray.push(item)
            }
            return null
        })
        return filteredArray
    }
}

/**
 * Check if user has a custom pseudo, if yes dispatch it, else dispatch default pseudo
 * @param {*} members Array of members
 * @param {*} userId User ID
 * @param {*} pseudo Pseudo to return if user doesn't have a custom pseudo
 */

export const getUserPseudo = (members, userId, pseudo) => {
    let user = members.find(member => member._id === userId)

    if (user) {
        if (user.custom_pseudo)
            return user.custom_pseudo
        else return pseudo
    } else return pseudo
}

/**
 * Minimize message height and remove pseudo and hours if the previous message is sent from the same user less than 20 minutes ago
 * @param {*} prev Previous message
 * @param {*} current Current message
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
 * Return the file in message
 * @param {*} file File to return
 */

export const returnMessageFiles = (file) => {
    if (isImage(file)) {
        return (
            <img className="file-img" src={file.url} alt="" />
        )
    } else if (isVideo(file)) {
        return (
            <div className="video-block">
                <VideoJS
                    className="video-player"
                    url={file.url}
                    type={file.type}
                />
            </div>
        )
    } else {
        // if (isEmbeddable(file)) {
        //     return (
        //         <iframe
        //             src={file.url}
        //             title={file.name}
        //             name={file.name}
        //             width="500"
        //             frameBorder="0"
        //             scrolling="no"
        //             loading="lazy"
        //         >
        //         </iframe>
        //     )
        // } else {
            return (
                <div className="file-doc">
                    <Icon name="File" className="file-doc-img" />
                    <div className="file-doc-content">
                        <p className="bold">
                            <a href={file.url}>{file.name}</a>
                        </p>
                        <p>{file.type}</p>
                    </div>
                </div>
            )
        // }
    }
}

/****************************************************************/
/***************** CONVERSATION TOOLS FUNCTIONS *****************/
/****************************************************************/

/**
 * Convert date. If date > 1 year, return date with year, else no.
 * @param {*} date Date to convert
 */

export function getDate(date) {
    let diffInMinutes = Math.abs(new Date(date) - new Date())
    let checkDate = diffInMinutes / (1000 * 60 * 60 * 24)
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
 * Check if user is online
 * @param {*} contact User to check if is online
 * @param {*} onlineUsers All online users
 */

export const isOnline = (contact, onlineUsers) => {
    if (contact) {
        let online = onlineUsers.some(user => user._id === contact._id)
        return online
    }
}

/**
 * Return all conversation members except user
 * @param {*} conversation Conversation to take members in
 * @param {*} uid User ID
 */

export const getMembers = (conversation, uid) => {
    const members = conversation.members.filter(member => member._id !== uid)
    return members
}

/**
 * Keep only id, pseudo and picture from users and return members array
 * @param {*} members Members to convert
 */

export const usersToMember = (members) => {
    let arr = []
    members.forEach(member => {
        arr.push({
            _id: member._id,
            pseudo: member.pseudo,
            picture: member.picture
        })
    })
    return arr
}

/**
 * Return all conversation members IDs except userID
 * @param {*} conversation Conversation to take members in
 * @param {*} uid User ID
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
 * @param {*} member Member to push or remove from array
 * @param {*} array Array to push or remove from
 */

export const pushUserInArray = (member, array) => {
    if (!array.some(el => el._id === member._id)) {
        return [...array, {
            _id: member._id,
            pseudo: member.pseudo,
            picture: member.picture,
            date: new Date().toISOString()
        }]
    } else {
        let arr = [...array]
        let index = arr.findIndex(el => el._id === member._id)
        arr.splice(index, 1)
        return arr
    }
}

/**
 * Remove user from array
 * @param {*} member Member to remove from array
 * @param {*} array Array to remove from
 */

export const removeUserFromArray = (member, array) => {
    let arr = [...array]
    let index = arr.findIndex(el => el._id === member._id)
    arr.splice(index, 1)
    return arr
}

/**
 * Remove user already selected from array
 * @param {*} array Array to remove from
 * @param {*} userId ID of user to remove
 */

export const removeSelected = (array, userId) => {
    let arr = [...array]
    let index = arr.findIndex(el => el._id === userId)
    arr.splice(index, 1)
    return arr
}

/**
 * Return users pseudo for conversation title (ex: Pseudo 1, Pseudo 2 et Pseudo 3)
 * @param {*} members Members array
 */

export const returnMembersPseudos = (members) => {
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
 * Return pseudo from last message sender, or not if last message is from current user, in conversation preview
 * @param {*} conversation Current conversation
 * @param {*} message Last message
 * @param {*} uid Current user ID
 */

export const returnConversationPseudo = (conversation, message, uid) => {
    if (conversation.type === 'group') {
        if (message.sender === uid) {
            return (
                <div className="mr-1">Vous :</div>
            )
        } else return (
            <div className="mr-1">{conversation.sender_pseudo}</div>
        )
    } else {
        if (message.sender === uid) {
            return (
                <div className="mr-1">Vous :</div>
            )
        } else return
    }
}

/**
 * Remove uploaded file
 * @param {*} files Files array
 * @param {*} index Index of file to remove
 */

export const removeFile = (files, index) => {
    let array = files.slice()
    array.splice(index, 1)
    return array
}