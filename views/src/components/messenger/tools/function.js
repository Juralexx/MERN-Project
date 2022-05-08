import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import { formatDistanceToNowStrict } from 'date-fns'
import { fr } from 'date-fns/locale';
import { dateParserWithoutYear } from '../../Utils'

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
        return getDateInHours
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