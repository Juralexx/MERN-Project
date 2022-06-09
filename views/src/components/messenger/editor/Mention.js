import React, { useContext } from 'react'
import { MediaContext } from '../../AppContext'
import { TinyAvatar } from '../../tools/global/Avatars'
import { checkTheme } from '../../Utils'
import { placeUponCursor } from '../functions/function'

const Mention = ({ quill, members, isMention, setMention, mentionsResults, setMentionResults, position, setPosition }) => {
    const { sm } = useContext(MediaContext)
    const styles = quill ? placeUponCursor(quill) : { left: 0, right: 0, bottom: 0 }

    const onMention = (mention) => {
        quill.focus()
        let range = quill.getSelection()
        quill.deleteText(position, range.index)
        if (quill.getText()[position] === '@') {
            quill.deleteText(position, 1)
        }
        quill.insertText(position, `@${mention.pseudo}`, {
            'color': '#ffb004',
            'background': 'rgba(255, 176, 4, 0.12)'
        }, true)
        quill.insertText(position + mention.pseudo.length + 1, "\u00a0", {
            'color': `${checkTheme('#232221', '#ffffff')}`,
            'bold': false,
            'background': 'inherit',
        })
        setMention(false)
        setPosition(0)
        setMentionResults(members)
    }

    return (
        isMention && (
            mentionsResults.length > 0 && (
                <div tabIndex="0" className="auto-complete-container custom-scrollbar mention" style={{ left: !sm && styles.left, right: !sm && styles.right, bottom: !sm && styles.bottom }}>
                    {mentionsResults.map((element, key) => {
                        return (
                            <div
                                className="auto-complete-item"
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
        )
    )
}

export default Mention

// {`${mentionsResults.some(e => e.pseudo) ? "auto-complete-item" : "auto-complete-item hidden"`}