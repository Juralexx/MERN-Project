import { useEffect } from "react";
import { Quill } from "react-quill";

export function useQuill(quill) {
    const Delta = Quill.import('delta')

    useEffect(() => {
        if (quill) {
            quill.keyboard.addBinding({ key: 13, shiftKey: true }, (range, ctx) => {
                quill.insertText(range.index, '\n');
            })
            quill.keyboard.addBinding({ key: 13 }, () => { })
            quill.keyboard.addBinding({ key: 32 }, (range, ctx) => {
                quill.insertText(range.index, '\u00a0');
            })
            quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
                const ops = delta.ops.map((op) => ({ insert: op.insert }));
                return new Delta(ops)
            })
        }
    }, [quill, Delta])
}