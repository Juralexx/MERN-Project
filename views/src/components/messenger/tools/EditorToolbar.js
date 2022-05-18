import React from "react";
import { Quill } from "react-quill";
// import MagicUrl from "quill-magic-url/src";
// import { ImageDrop } from 'quill-image-drop-module';
// import { ImageHandler, VideoHandler, AttachmentHandler } from "quill-upload";

// Quill.register('modules/magicUrl', MagicUrl)
// Quill.register('modules/imageDrop', ImageDrop);
// Quill.register("modules/imageHandler", ImageHandler);
// Quill.register("modules/videoHandler", VideoHandler);
// Quill.register("modules/attachmentHandler", AttachmentHandler);

export const modules = {
    toolbar: {
        container: "#toolbar",
    },
    history: {
        delay: 500,
        maxStack: 100,
        userOnly: true
    },
    // magicUrl: true,
    // imageDrop: true,
    // imageHandler: {
    //   upload: file => {
    //     // return a Promise that resolves in a link to the uploaded image
    //     return new Promise((resolve, reject) => {
    //         const fd = new FormData()
    //         fd.append("file", file)
    //         return file
    //     });
    //   }
    // },
    // videoHandler: {
    //     upload: (file) => {
    //         return new Promise((resolve, reject) => {
    //             const fd = new FormData()
    //             fd.append("file", file)
    //             console.log(file)
    //         })
    //     }
    // },
    // attachmentHandler: {
    //     upload: (file) => {
    //         console.log(file)
    //     }
    // },
    keyboard: {
        bindings: {
            enter: {
                key: 13,
                handler: () => { }
            }
        }
    },
}

export const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "indent",
    "link",
    "image",
    "video",
    "attachment",
    "background",
    "color",
    "code-block"
];

export const QuillToolbar = ({ style }) => (
    <div id="toolbar" style={style}>
        <span className="ql-formats border-r">
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
            <button className="ql-strike" />
        </span>
        <span className="ql-formats border-r">
            <button className="ql-list" value="ordered" />
            <button className="ql-list" value="bullet" />
        </span>
        <span className="ql-formats border-r">
            <button className="ql-indent" value="-1" />
            <button className="ql-indent" value="+1" />
        </span>
        <span className="ql-formats border-r">
            <button className="ql-link" />
            {/* <button className="ql-image" />
            <button className="ql-video" />
            <button className="ql-attachment" /> */}
        </span>
        <span className="ql-formats">
            <button className="ql-code-block" />
            <button className="ql-clean" />
        </span>
    </div>
)

export default QuillToolbar;
