import React, { useContext, useState } from 'react'
import { MessengerContext } from '../../AppContext';
import Icon from '../../tools/icons/Icon';
import Tooltip from '../../tools/global/Tooltip';
import FsLightbox from 'fslightbox-react';
import { download } from '../../Utils';
import { deleteFiles } from '../actions';
import { returnMessageFiles } from '../functions';

const File = ({ message, file }) => {
    const { uid, user, currentChat, websocket, dispatch } = useContext(MessengerContext)
    const [toggler, setToggler] = useState(false)

    return (
        <div className="message-files-container">
            <p className="txt-sec f-12">
                {file.name}
            </p>
            <div className="files-block">
                {returnMessageFiles(file)}
                <div className="files-tools">
                    <Tooltip content={<p>Agrandir</p>}>
                        <button onClick={() => setToggler(true)}>
                            <Icon name="PositionSquare" />
                        </button>
                    </Tooltip>
                    <Tooltip content={<p>Ouvrir&nbsp;dans&nbsp;une&nbsp;nouvelle&nbsp;fenêtre</p>}>
                        <button>
                            <a href={file.url} rel="noreferrer" target="_blank">
                                <Icon name="Redo" />
                            </a>
                        </button>
                    </Tooltip>
                    <Tooltip content={<p>Télécharger</p>}>
                        <button className="files-tools-btn" onClick={() => download(file)}>
                            <Icon name="Download" />
                        </button>
                    </Tooltip>
                    {file.userId === uid &&
                        <Tooltip content={<p>Supprimer</p>}>
                            <button className="files-tools-btn" onClick={() => deleteFiles(file, user, websocket, currentChat, message._id, dispatch)}>
                                <Icon name="Cross" />
                            </button>
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