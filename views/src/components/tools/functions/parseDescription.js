import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'

export function parseDescriptionToInnerHTML(project) {
    let description = project.content[0].ops
    let callback = {}
    let converter = new QuillDeltaToHtmlConverter(description, callback)
    let html = converter.convert(description)
        if (html.length >= 170) {
            if (html.substring(169, 170) === " ") {
                let cleanSpaces = html.replace(html.substring(169, 170), "")
                html = cleanSpaces.substring(0, 170) + "..."
            }
            html = html.substring(0, 170) + "..."
        }
        return ({ __html: html })
}

export function parseDescription(project) {
    let description = project.content[0].ops
    let callback = {}
    let converter = new QuillDeltaToHtmlConverter(description, callback)
    let html = converter.convert(description)
        if (html.length >= 170) {
            if (html.substring(169, 170) === " ") {
                let cleanSpaces = html.replace(html.substring(169, 170), "")
                html = cleanSpaces.substring(0, 170) + "..."
            }
            html = html.substring(0, 170) + "..."
        }
        return html
}