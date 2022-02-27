import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'

export function parseDescription(project) {
    var description = project.content[0].ops
    var callback = {}
    var converter = new QuillDeltaToHtmlConverter(description, callback)
    var html = converter.convert(description)
        if (html.length >= 200) {
            if (html.substring(199, 200) === " ") {
                var cleanSpaces = html.replace(html.substring(199, 200), "")
                html = cleanSpaces.substring(0, 200) + "..."
            }
            html = html.substring(0, 200) + "..."
        }
        return ({ __html: html })
}