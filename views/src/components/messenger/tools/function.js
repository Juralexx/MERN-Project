import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import { formatDistanceToNowStrict } from 'date-fns'
import { fr } from 'date-fns/locale';
import { dateParserWithoutYear } from '../../Utils'

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

export const getMembers = (conversation, uid) => {
    const members = conversation.members.filter(member => member.id !== uid)
    return members
}

export const otherMembers = (conversation, uid) => {
    const membersId = conversation.members.filter(member => member.id !== uid)
    let memberIds = []
    membersId.map(member => {
        return memberIds = [...memberIds, member.id]
    })
    return memberIds
}