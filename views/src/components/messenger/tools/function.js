import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import { formatDistanceToNowStrict } from 'date-fns'
import { fr } from 'date-fns/locale';
import { dateParserWithoutYear } from '../../Utils'
import { addMember, deleteConversation, deleteMessage, removeMember, updateMessage } from '../../../actions/messenger.action';

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

export function convertDeltaToHTML(message) {
    let callback = {}
    let converter = new QuillDeltaToHtmlConverter(message.ops, callback)
    let html = converter.convert(message.ops)
    return ({ __html: html })
}

export function convertDeltaToString(message) {
    let callback = {}
    let converter = new QuillDeltaToHtmlConverter(message.ops, callback)
    let html = converter.convert(message.ops)
    return html
}

export function convertEditorToStringNoHTML(message) {
    let callback = {}
    let converter = new QuillDeltaToHtmlConverter(message.text[0].ops, callback)
    let html = converter.convert(message.text[0].ops)
    var regex = /(<([^>]+)>)/ig
    return html.replace(regex, '')
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
    const members = conversation.members.filter(member => member.id !== uid)
    return members
}

/**
 * Keep only id, pseudo and picture from users and return array
 */

export const userToMember = (members) => {
    let arr = []
    members.forEach(member => {
        arr.push({ id: member._id, pseudo: member.pseudo, picture: member.picture })
    })
    return arr
}

/**
 * Return all IDs except userID
 */

export const otherMembersIDs = (conversation, uid) => {
    const membersId = conversation.members.filter(member => member.id !== uid)
    let memberIds = []
    membersId.map(member => {
        return memberIds = [...memberIds, member.id]
    })
    return memberIds
}

/**
 * If user is not selected, push it in array, else remove it from array
 */

export const pushUserInArray = (member, array) => {
    if (!array.some(e => e.id === member._id)) {
        return [...array, { id: member._id, pseudo: member.pseudo, picture: member.picture }]
    } else {
        let arr = [...array]
        let index = arr.findIndex(e => e.id === member._id)
        arr.splice(index, 1)
        return arr
    }
}

/**
 * Remove user from array
 */

export const removeUserFromArray = (member, array) => {
    let arr = [...array]
    let index = arr.findIndex(e => e.id === member.id)
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
                const conversation = convs.filter(conv => conv.members[0].id === members[0]._id || conv.members[1].id === members[0]._id)
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
        return members[0].pseudo + ", " + members[1].pseudo
    else if (members.length === 3)
        return members[0].pseudo + ", " + members[1].pseudo + ", " + members[2].pseudo
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

export const getHoursDiff = (prev, current, next) => {
    let classes = []
    if (next.sender === current.sender) {
        classes.push('no-date')
    }
    if (prev.sender === current.sender) {
        let hourDiff = new Date(current.createdAt) - new Date(prev.createdAt)
        let prevTimeDiff = Math.floor((hourDiff % 86400000) / 3600000)
        if (prevTimeDiff < 3)
            classes.push('minify')
        else classes.push('normal')
    } else {
        classes.push('normal')
    }
    return classes.toString().replace(',', ' ')
}

/**
 * Modify message
 */

export const modifyMessage = (message, text, conversation, uid, websocket, dispatch) => {
    otherMembersIDs(conversation, uid).map(memberId => {
        return websocket.current.emit("updateMessage", {
            receiverId: memberId,
            messageId: message._id,
            text: [text]
        })
    })
    dispatch(updateMessage(conversation._id, message._id, [text]))
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