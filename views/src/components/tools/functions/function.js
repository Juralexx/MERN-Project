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

export const highlightIt = (array, element, isInResult, search) => {
    return ({
        background: array.some(member => member.id === element.id) ? "#6366f1" : "",
        display: search ? (isInResult.includes(element) ? "flex" : "none") : ("flex")
    })
}

export const getDifference = (one, two) => {
    return "+ " + (two - one)
}