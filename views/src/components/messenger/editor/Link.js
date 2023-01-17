import React, { useContext, useEffect, useRef } from 'react'
import isURL from 'validator/lib/isURL'
import { TextButton, Button } from '../../tools/global/Button'
import { IconInput } from '../../tools/global/Inputs'
import { placeUponCursor } from '../functions'
import normalizeUrl from 'normalize-url';
import { MediaContext } from '../../AppContext'
import Icon from '../../tools/icons/Icon'

const Link = ({ quill, isLink, setLink, position }) => {
    const { sm } = useContext(MediaContext)
    let styles = quill ? placeUponCursor(quill) : { left: 0, right: 0, bottom: 0 }
    const textRef = useRef()
    const linkRef = useRef()

    useEffect(() => {
        if (isLink) {
            if (quill) {
                if (linkRef?.current && textRef?.current) {
                    let range = quill.getSelection()
                    if (range.length > 0) {
                        if (isURL(quill.getText(range.index, range.length))) {
                            linkRef.current.value = quill.getText(range.index, range.length)
                        } else {
                            textRef.current.value = quill.getText(range.index, range.length)
                        }
                    }
                }
            }
        } else {
            if (linkRef?.current && textRef?.current) {
                linkRef.current.value = ''
                textRef.current.value = ''
            }
        }
    }, [quill, isLink, linkRef, textRef])

    const onLink = () => {
        let range = quill.getSelection()
        if (range) {
            if (textRef.current.value.length === 0 && linkRef.current.value.length > 0) {
                quill.formatText(range.index, range.length, {
                    'link': normalizeUrl(linkRef.current.value),
                    'target': '_blank'
                })
                quill.setSelection(range.index + linkRef.current.value.length, 0)
            } else if (textRef.current.value.length > 0 && linkRef.current.value.length === 0) {
                quill.deleteText(range.index, range.length)
                quill.insertText(range.index, textRef.current.value)
                quill.setSelection(range.index + textRef.current.value.length, 0)
            } else {
                quill.deleteText(range.index, range.length)
                quill.insertText(range.index, textRef.current.value, {
                    'link': normalizeUrl(linkRef.current.value),
                    'target': '_blank'
                })
                quill.setSelection(range.index + textRef.current.value.length, 0)
            }
        } else {
            if (textRef.current.value.length === 0 && linkRef.current.value.length > 0) {
                quill.insertText(position, linkRef.current.value, {
                    'link': normalizeUrl(linkRef.current.value),
                    'target': '_blank'
                })
                quill.setSelection(position + linkRef.current.value.length, 0)
            } else if (textRef.current.value.length > 0 && linkRef.current.value.length === 0) {
                quill.insertText(position, textRef.current.value)
                quill.setSelection(position + textRef.current.value.length, 0)
            } else {
                quill.insertText(position, textRef.current.value, {
                    'link': normalizeUrl(linkRef.current.value),
                    'target': '_blank'
                })
                quill.setSelection(position + textRef.current.value.length, 0)
            }
        }
        textRef.current.value = ''
        linkRef.current.value = ''
        setLink(false)
    }

    return (
        isLink && (
            <div className="quill-link-displayer" style={{ left: !sm && styles.left, right: !sm && styles.right, bottom: !sm && styles.bottom }}>
                <div>
                    <p className="mb-2">Texte</p>
                    <IconInput className="full is_start_icon" icon={<Icon name="Font" />} placeholder="Saisissez le texte à afficher" defaultValue='' useRef={textRef} />
                </div>
                <div className="mt-4">
                    <p className="mb-2">Lien</p>
                    <IconInput className="full is_start_icon" icon={<Icon name="Link" />} placeholder="Saisissez le lien" defaultValue='' useRef={linkRef} />
                </div>
                <div className="btn_container mt-2">
                    <TextButton onClick={() => setLink(false)}>Annuler</TextButton>
                    <Button onClick={onLink} className="ml-2">Valider</Button>
                </div>
            </div>
        )
    )
}

export default Link