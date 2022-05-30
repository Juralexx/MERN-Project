import { useState } from "react"
import { checkTheme } from "../../Utils"

export function useMention(quill, members) {
    const [isMention, setMention] = useState(false)
    const [mentionsResults, setMentionResults] = useState(members)

    /**
     * On mention on button press
     */

    const openMention = () => {
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

    return { isMention, setMention, mentionsResults, setMentionResults, openMention }
}