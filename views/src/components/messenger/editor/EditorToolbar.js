import React from "react";
import { Quill } from "react-quill";
import QuillAutoDetectUrl from "quill-auto-detect-url";
// import { urlEmbed, urlEmbedModule } from 'quill-url-embeds'

// Quill.register({
//   'blots/urlEmbed': urlEmbed,
//   'modules/urlEmbeds': urlEmbedModule({
//     metaApi
//   })
// })

Quill.register("modules/autoDetectUrl", QuillAutoDetectUrl);

// Quill.register('modules/magicUrl', MagicUrl)

export const modules = {
    toolbar: {
        container: "#toolbar",
    },
    history: {
        delay: 500,
        maxStack: 100,
        userOnly: true
    },
    keyboard: {
        bindings: {
            enter: {
                key: 13,
                handler: () => { }
            }
        }
    },
    autoDetectUrl: {
        urlRegularExpression: /(https?:\/\/|www\.)[\w-.]+\.[\w-.]+[\S]+/i,
    },
    // urlEmbeds: {}
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
        <span className="ql-formats before">
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
            <button className="ql-strike" />
        </span>
        <span className="ql-formats before">
            <button className="ql-list" value="ordered" />
            <button className="ql-list" value="bullet" />
        </span>
        <span className="ql-formats before">
            <button className="ql-indent" value="-1" />
            <button className="ql-indent" value="+1" />
        </span>
        {/* <span className="ql-formats border-r">
            <button className="ql-link" />
            <button className="ql-image" />
            <button className="ql-video" />
            <button className="ql-attachment" />
        </span> */}
        <span className="ql-formats">
            <button className="ql-code-block" />
            <button className="ql-clean" />
        </span>
    </div>
)

export default QuillToolbar;
