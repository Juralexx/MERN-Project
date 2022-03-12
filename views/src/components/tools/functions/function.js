import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import { formatDistanceToNowStrict } from 'date-fns'
import { fr } from 'date-fns/locale';
import { dateParserWithoutYear } from '../../Utils'

export function convertEditorToHTML(message) {
    var callback = {}
    var converter = new QuillDeltaToHtmlConverter(message.text[0].ops, callback)
    var html = converter.convert(message.text[0].ops)
    return ({ __html: html })
}

export function convertEditorToString(message) {
    var callback = {}
    var converter = new QuillDeltaToHtmlConverter(message.text[0].ops, callback)
    var html = converter.convert(message.text[0].ops)
    return html
}

export function convertDeltaToHTML(message) {
    var callback = {}
    var converter = new QuillDeltaToHtmlConverter(message.ops, callback)
    var html = converter.convert(message.ops)
    return ({ __html: html })
}

export function convertDeltaToString(message) {
    var callback = {}
    var converter = new QuillDeltaToHtmlConverter(message.ops, callback)
    var html = converter.convert(message.ops)
    return html
}


export function getDate(element, setState) {
    const diffInMs = Math.abs(new Date(element.createdAt) - new Date());
    const checkDate = diffInMs / (1000 * 60 * 60 * 24);
    if (checkDate > 1) {
        const getDateInDays = dateParserWithoutYear(element.createdAt)
        setState(getDateInDays)
    } else {
        const getDateInHours = formatDistanceToNowStrict(new Date(element.createdAt), new Date(), { locale: fr, includeSeconds: true })
        setState(getDateInHours)
    }
}

export function getMembers(conversation, uid, setState) {
    const index = conversation.members.filter(member => member.id !== uid)
    setState(index)
}