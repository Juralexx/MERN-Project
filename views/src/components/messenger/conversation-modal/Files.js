import React, { useState } from 'react'
import { coverPicture } from '../../tools/functions/useAvatar'
import { dateParser, download } from '../../Utils'
import { deleteFiles } from '../tools/function'
import Warning from '../../tools/components/Warning'
import Tooltip from '../../tools/components/Tooltip'
import { IconInput } from '../../tools/components/Inputs'
import { oneLevelSearch } from '../../tools/functions/searches'
import { isInResults } from '../../tools/functions/member'
import { BiSearchAlt } from 'react-icons/bi'
import { MdFileDownload } from 'react-icons/md'
import { IoArrowRedo, IoDocumentTextOutline, IoTrashBin } from 'react-icons/io5'

const Files = ({ uid, websocket, conversation, dispatch }) => {
    const [warning, setWarning] = useState(-1)

    const [isResults, setResults] = useState([])
    const [search, setSearch] = useState(false)
    const [query, setQuery] = useState("")

    return (
        <>
            <IconInput
                className="full is_start_icon small mb-3"
                placeholder="Rechercher un fichier"
                icon={<BiSearchAlt />}
                value={query}
                onInput={e => setQuery(e.target.value)}
                onChange={() => oneLevelSearch(query, conversation.files, 'name', isResults, setResults, setSearch)}
            />
            <div className="conversation-files custom-scrollbar">
                {conversation.files.map((file, key) => {
                    return (
                        <>
                            <div className={`${isInResults(file, isResults, search, "flex")} conversation-file`} key={key}>
                                <div className="file-doc">
                                    {file.type.includes('image') ? (
                                        <div className="file-img-preview" style={coverPicture(file.url)}></div>
                                    ) : (
                                        <IoDocumentTextOutline className="file-doc-img" />
                                    )}
                                    <div className="file-doc-content">
                                        <p><a href={file.url} rel="noreferrer" target="_blank">{file.name}</a></p>
                                        <p>Partagé par {file.userPseudo} le {dateParser(file.date)}</p>
                                    </div>
                                </div>
                                <div className="file-tools">
                                    <Tooltip content={<p>Ouvrir</p>}>
                                        <button><a href={file.url} rel="noreferrer" target="_blank"><IoArrowRedo /></a></button>
                                    </Tooltip>
                                    <Tooltip content={<p>Télécharger</p>}>
                                        <button onClick={() => download(file)}><MdFileDownload /></button>
                                    </Tooltip>
                                    {file.userId === uid &&
                                        <Tooltip content={<p>Supprimer</p>}>
                                            <button onClick={() => setWarning(key)}><IoTrashBin className="red" /></button>
                                        </Tooltip>
                                    }
                                </div>
                            </div>
                            {warning === key &&
                                <Warning
                                    title={`Supprimer ${file.name}`}
                                    text={`Voulez-vous vraiment supprimer le fichier ${file.name} ? Cette action est irréversible.`}
                                    validateBtn="Supprimer"
                                    open={warning === key}
                                    setOpen={setWarning}
                                    onValidate={() => deleteFiles(file, uid, websocket, conversation, file.messageId, dispatch)}
                                    onClose={() => setWarning(false)}
                                >
                                </Warning>
                            }
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default Files