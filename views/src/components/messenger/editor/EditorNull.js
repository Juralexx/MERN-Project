import ReactQuill from "react-quill"
import Icon from "../../tools/icons/Icon"
import EditorToolbar, { formats, modules } from '../editor/EditorToolbar'
//import EmojiPicker from "../tools/EmojiPicker"

const EditorNull = () => {
    return (
        <div className="conversation-bottom">
            <div className="conversation-toolsbox">
                <div className="message-text-editor">
                    <EditorToolbar style={{ display: "none" }} />
                    <div className="message-editor-container">
                        <ReactQuill
                            defaultValue=""
                            placeholder="Envoyer un message..."
                            formats={formats}
                            modules={modules}
                        />
                    </div>
                    <div className="message-text-tools">
                        <div className="text-tools-left">
                            <button className="menu-tools-btn"><Icon name="Plus" /></button>
                            <div className="tools-group">
                                {/*<EmojiPicker placement="top-start" btnClassName="text-tools" icon={<Icon name="Emoji" />} />*/}
                                <button className="text-tools"><Icon name="At" /></button>
                                <button className="text-tools"><Icon name="Font" /></button>
                            </div>
                            <div className="tools-group">
                                <button className="text-tools files-upload"><Icon name="Picture" /></button>
                                <button className="text-tools"><Icon name="Link" /></button>
                            </div>
                        </div>
                        <div className="text-tools-right">
                            <button className="send-tool"><Icon name="Send" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditorNull