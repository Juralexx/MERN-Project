import React, { useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../../tools/editor/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { updateContent } from "../../../actions/project.action";
import { RoundedButton, Button } from "../../tools/components/Button";
import { FaPen } from 'react-icons/fa'
import { convertDeltaToHTML } from "../../messenger/tools/function";

const Content = ({ project }) => {
    const projectData = useSelector((state) => state.projectReducer)
    const [content, setContent] = useState("")
    const [updateContentForm, setUpdateContentForm] = useState(false)
    const [value, setValue] = useState(false)
    const dispatch = useDispatch()
    const [modified, setModified] = useState(false)

    const handleChange = (text, delta, source, editor) => {
        setContent(editor.getContents());
        setValue(true)
    }

    const hideContentUpdater = () => { setUpdateContentForm(false) }

    const handleContent = () => {
        dispatch(updateContent(project._id, content))
        setUpdateContentForm(false)
        setModified(true)
    }

    return (
        <div className="flex items-center justify-between w-full py-5 px-7">
            {!updateContentForm ? (
                <>
                    {modified ? (
                        <p dangerouslySetInnerHTML={{ __html: projectData.content }}></p>
                    ) : (
                        <p dangerouslySetInnerHTML={convertDeltaToHTML(project.content[0])}></p>
                    )}
                    <RoundedButton icon={<FaPen className="w-3 h-3" />} color="background_primary" hoverColor="background_primary_x_light" onClick={() => setUpdateContentForm(!updateContentForm)}>Modifier</RoundedButton>
                </>
            ) : (
                <div className="flex flex-col">
                    <div className="text-editor">
                        <EditorToolbar />
                        <ReactQuill
                            name="content"
                            id="content"
                            style={{ height: 200 }}
                            theme="snow"
                            defaultValue={modified ? (projectData.content) : (project.content[0].ops)}
                            onChange={handleChange}
                            placeholder={"Décrivez votre projet..."}
                            modules={modules}
                            formats={formats}
                        />
                    </div>
                    <div className="flex">
                        <Button text="Annuler" onClick={hideContentUpdater} />
                        <Button text="Enregistrer" disabled={!value} onClick={handleContent} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Content;