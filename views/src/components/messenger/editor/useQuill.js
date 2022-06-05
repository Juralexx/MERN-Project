import normalizeUrl from "normalize-url";
import { useLayoutEffect, useRef } from "react";
import { Quill } from "react-quill";

export function useQuill() {
    const Delta = Quill.import('delta')

    const quillRef = useRef()
    const quill = quillRef?.current?.getEditor()

    useLayoutEffect(() => {
        if (quill) {
            quill.keyboard.addBinding({ key: 13, shiftKey: true }, (range, ctx) => {
                quill.insertText(range.index, '\n');
            })
            // quill.keyboard.addBinding({ key: 32 }, (range, ctx) => {
            //     quill.insertText(range.index, '\u00a0');
            // })
            quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
                const ops = delta.ops.map((op) => ({ insert: op.insert }));
                return new Delta(ops)
            })
        }
    }, [quill, Delta])

    // const autoDetectUrl = () => {
    //     let text = quill.getText()
    //     const regexp = /(https?:\/\/|www\.)[\w-.]+\.[\w-.]+[\S]+/i
    //     let matches = text.match(regexp)

    //     if (regexp.test(text)) {
    //         const results = []

    //         for (let match in matches) {
    //             console.log(match)
    //             let result = {}
    //             result['link'] = match
    //             result['startsAt'] = text.indexOf(match)
    //             result['endsAt'] = text.indexOf(match) + match.length
    //             results.push(result)
    //         }

    //         results.forEach(url => {
    //             quill.deleteText(url.startsAt, url.endsAt)
    //             quill.insertText(url.startsAt, url.link, {
    //                 'link': normalizeUrl(url.link),
    //                 'target': '_blank'
    //             })
    //         })
    //     }
    // }

    return { quill, quillRef }
}