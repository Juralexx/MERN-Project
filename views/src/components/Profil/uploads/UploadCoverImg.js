import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useClickOutside } from '../../tools/functions/useClickOutside'
import { deleteCoverPicture, uploadCoverPicture } from "../../../actions/user.action.upload";
import { ToolsBtn } from '../../tools/components/Button'
import SmallMenu from '../../tools/components/SmallMenu'
import { BiDotsHorizontalRounded } from 'react-icons/bi'

const UploadCoverImg = ({ user }) => {
    const [file, setFile] = useState();
    const [isOpen, setOpen] = useState(false)
    const toolRef = useRef()
    useClickOutside(toolRef, setOpen, false)
    const dispatch = useDispatch()
    // const error = useSelector((state) => state.errorsReducer.uploadProfilPictureErrors)

    const handleSave = (e) => {
        let data = new FormData()
        data.append("userId", user._id)
        data.append("file", file)
        dispatch(uploadCoverPicture(data, user._id));
        setFile(null)
    }

    const deletePicture = () => {
        dispatch(deleteCoverPicture(user._id, user.picture))
    }

    return (
        <div ref={toolRef} className="relative w-full h-full" right="60px">
            <ToolsBtn className="cover_picture_tools" onClick={() => setOpen(!isOpen)}><BiDotsHorizontalRounded /></ToolsBtn>
            {isOpen &&
                <SmallMenu>
                    <div className="tools_choice relative file_upload">
                        <p>Modifier ma photo</p>
                        <input type="file" className="upload" name="file" accept=".jpg, .jpeg, .png" onInput={(e) => setFile(e.target.files[0])} onChange={handleSave} />
                    </div>
                    <div className="tools_choice" onClick={deletePicture}>Supprimer ma photo</div>
                </SmallMenu>
            }
        </div>
    )
}

export default UploadCoverImg;