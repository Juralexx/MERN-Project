import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'

export function parseDescriptionToInnerHTML(project) {
    var description = project.content[0].ops
    var callback = {}
    var converter = new QuillDeltaToHtmlConverter(description, callback)
    var html = converter.convert(description)
        if (html.length >= 170) {
            if (html.substring(169, 170) === " ") {
                var cleanSpaces = html.replace(html.substring(169, 170), "")
                html = cleanSpaces.substring(0, 170) + "..."
            }
            html = html.substring(0, 170) + "..."
        }
        return ({ __html: html })
}

export function parseDescription(project) {
    var description = project.content[0].ops
    var callback = {}
    var converter = new QuillDeltaToHtmlConverter(description, callback)
    var html = converter.convert(description)
        if (html.length >= 170) {
            if (html.substring(169, 170) === " ") {
                var cleanSpaces = html.replace(html.substring(169, 170), "")
                html = cleanSpaces.substring(0, 170) + "..."
            }
            html = html.substring(0, 170) + "..."
        }
        return html
}