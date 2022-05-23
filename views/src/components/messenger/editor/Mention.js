import React from 'react'
import { TinyAvatar } from '../../tools/components/Avatars'
import { checkTheme } from '../../Utils'
import { placeUponCursor } from '../tools/function'

const Mention = ({ members, quill, isMention, setMention, mentionsResults, setMentionResults, position, setPosition }) => {

    const onMention = (mention) => {
        quill.focus()
        let range = quill.getSelection()
        quill.deleteText(position, range.index)
        if (quill.getText()[position] === '@') {
            quill.deleteText(position, 1)
        }
        quill.insertText(position, `@${mention.pseudo}`, {
            'color': '#ffb004',
            'background': 'rgba(255, 176, 4, 0.12)',
            code: true
        }, true).setAttribute('class','spanblock');
        quill.insertText(position + mention.pseudo.length + 1, "\u00a0", {
            'color': `${checkTheme('#232221', '#ffffff')}`,
            'bold': false
        })
        setMention(false)
        setPosition(0)
        setMentionResults(members)
    }

    return (
        isMention &&
        mentionsResults.length > 0 &&
        <div tabIndex="0" className="auto-complete-container custom-scrollbar max-w-[300px]" style={placeUponCursor(quill)}>
            {mentionsResults.map((element, key) => {
                return (
                    <div
                        className={`${mentionsResults.some(e => e.pseudo) ? "auto-complete-item" : "auto-complete-item hidden"}`}
                        key={key}
                        onClick={() => onMention(element)}
                    >
                        <div className="flex items-center">
                            <TinyAvatar pic={element.picture} />
                            <p>{element.pseudo}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Mention