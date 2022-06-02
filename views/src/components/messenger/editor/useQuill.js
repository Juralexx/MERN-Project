import { useLayoutEffect, useRef } from "react";
import { Quill } from "react-quill";

export function useQuill() {
    const Delta = Quill.import('delta')

    const quillRef = useRef()
    let quill = quillRef?.current?.getEditor()

    useLayoutEffect(() => {
        if (quill) {
            quill.keyboard.addBinding({ key: 13, shiftKey: true }, (range, ctx) => {
                quill.insertText(range.index, '\n');
            })
            quill.keyboard.addBinding({
                key: 13,
                shiftKey: false
            }, () => console.log('') )
            quill.keyboard.addBinding({ key: 32 }, (range, ctx) => {
                quill.insertText(range.index, '\u00a0');
            })
            quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
                const ops = delta.ops.map((op) => ({ insert: op.insert }));
                return new Delta(ops)
            })
        }
    }, [quill, Delta])

    return { quill, quillRef }
}