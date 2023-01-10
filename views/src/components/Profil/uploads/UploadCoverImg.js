import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCoverPicture, uploadCoverPicture } from "../../../actions/user.action.upload";
import ToolsMenu from "../../tools/global/ToolsMenu";

const UploadCoverImg = ({ user }) => {
    const [file, setFile] = useState();
    const dispatch = useDispatch()
    // const error = useSelector((state) => state.errorsReducer.uploadProfilPictureErrors)

    const handleSave = (e) => {
        let data = new FormData()
        data.append("userId", user._id)
        data.append("file", file)
        dispatch(uploadCoverPicture(data, user._id));
        setFile(null)
    }

    const deletePicture = () => dispatch(deleteCoverPicture(user._id, user.picture))

    return (
        <ToolsMenu className="cover_picture_tools">
            <div className="tools_choice relative file_upload">
                <p>Modifier ma photo</p>
                <input
                    type="file"
                    className="upload"
                    name="file"
                    accept=".jpg, .jpeg, .png"
                    onInput={(e) => setFile(e.target.files[0])}
                    onChange={handleSave}
                />
            </div>
            <div className="tools_choice" onClick={deletePicture}>Supprimer ma photo</div>
        </ToolsMenu>
    )
}

export default UploadCoverImg;