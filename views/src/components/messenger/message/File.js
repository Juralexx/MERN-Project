import React, { useContext, useState } from 'react'
import { MessengerContext } from '../../AppContext';
import { useCheckLocation } from '../functions/useCheckLocation';
import Tooltip from '../../tools/global/Tooltip';
import FsLightbox from 'fslightbox-react';
import { download } from '../../Utils';
import { deleteFiles } from '../functions/actions';
import { returnMessageFiles } from '../functions/function';
import { MdClear, MdFileDownload, MdFullscreen } from 'react-icons/md'
import { IoArrowRedo } from 'react-icons/io5'

const File = ({ message, file }) => {
    const { uid, user, currentChat, websocket, dispatch } = useContext(MessengerContext)
    const { isParam } = useCheckLocation()
    const [toggler, setToggler] = useState(false)

    return (
        <div className="message-files-container">
            <p className="txt-sec f-12">{file.name}</p>
            <div className="files-block">
                {returnMessageFiles(file)}
                <div className="files-tools">
                    <Tooltip content={<p>Agrandir</p>}>
                        <button onClick={() => setToggler(true)}><MdFullscreen /></button>
                    </Tooltip>
                    <Tooltip content={<p>Ouvrir&nbsp;dans&nbsp;une&nbsp;nouvelle&nbsp;fenêtre</p>}>
                        <button><a href={file.url} rel="noreferrer" target="_blank"><IoArrowRedo /></a></button>
                    </Tooltip>
                    <Tooltip content={<p>Télécharger</p>}>
                        <button className="files-tools-btn" onClick={() => download(file)}><MdFileDownload /></button>
                    </Tooltip>
                    {file.userId === uid &&
                        <Tooltip content={<p>Supprimer</p>}>
                            <button className="files-tools-btn" onClick={() => deleteFiles(file, user, websocket, currentChat, message._id, dispatch, isParam)}><MdClear /></button>
                        </Tooltip>
                    }
                </div>
            </div>
            <FsLightbox
                toggler={toggler}
                sources={[file.url]}
                onClose={() => setToggler(false)}
            />
        </div>
    )
}

export default File