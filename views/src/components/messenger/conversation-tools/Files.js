import React, { useMemo, useState } from 'react'
import Warning from '../../tools/global/Warning'
import ToolsMenu from '../../tools/global/ToolsMenu'
import { IconInput } from '../../tools/global/Inputs'
import { coverPicture } from '../../tools/hooks/useAvatar'
import { addClass, dateParser, download } from '../../Utils'
import { BiSearchAlt } from 'react-icons/bi'
import { MdFileDownload } from 'react-icons/md'
import { IoArrowRedo, IoDocumentTextOutline, IoTrashBin } from 'react-icons/io5'
import { HiArrowSmLeft } from 'react-icons/hi'
import { deleteFiles } from '../functions/actions'
import { useOneLevelSearch } from '../../tools/hooks/useOneLevelSearch'

const Files = ({ uid, websocket, conversation, files, setFiles, dispatch }) => {
    const { oneLevelSearch, isInResults, query, setQuery } = useOneLevelSearch(conversation.files, 'name')

    const [warning, setWarning] = useState(-1)

    const medias = useMemo(() => conversation.files.filter(file => file.type === 'image' || files.type === 'video'), [conversation.files])
    const docs = useMemo(() => conversation.files.filter(file => file.type !== 'image' && files.type !== 'video'), [conversation.files])

    return (
        <>
            <div className="go-back">
                <HiArrowSmLeft onClick={() => setFiles({ open: false, type: null })} />
                <p>Multimédia et fichiers</p>
            </div>
            <div className="tools-nav">
                <div className={`tools-nav-item ${addClass(files.type === 'medias', "active")}`} onClick={() => setFiles({ open: true, type: 'medias' })}>Multimédia</div>
                <div className={`tools-nav-item ${addClass(files.type === 'files', "active")}`} onClick={() => setFiles({ open: true, type: 'files' })}>Fichiers</div>
            </div>
            <IconInput
                className="full is_start_icon small mb-3"
                placeholder="Rechercher un fichier"
                icon={<BiSearchAlt />}
                value={query}
                onInput={e => setQuery(e.target.value)}
                onChange={oneLevelSearch}
            />
            {files.type === 'medias' &&
                <div className="conversation-files custom-scrollbar">
                    {medias.map((file, key) => {
                        return (
                            <div className={`${isInResults(file, "flex")} conversation-file`} key={key}>
                                <div className="file-doc">
                                    {file.type.includes('image') ? (
                                        <div className="file-img-preview" style={coverPicture(file.url)}></div>
                                    ) : (
                                        <IoDocumentTextOutline className="file-doc-img" />
                                    )}
                                    <div className="file-doc-content">
                                        <p><a href={file.url} rel="noreferrer" target="_blank">{file.name}</a></p>
                                        <p>{file.userPseudo} - {dateParser(file.date)}</p>
                                    </div>
                                </div>

                                <ToolsMenu>
                                    <div className="tools_choice"><IoArrowRedo /><a href={file.url} rel="noreferrer" target="_blank">Ouvrir</a></div>
                                    <div className="tools_choice" onClick={() => download(file)}><MdFileDownload />Télécharger</div>
                                    {file.userId === uid &&
                                        <div className="tools_choice red" onClick={() => setWarning(key)}><IoTrashBin />Supprimer</div>
                                    }
                                </ToolsMenu>

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
                            </div>
                        )
                    })}
                </div>
            }
            {files.type === 'files' &&
                <div className="conversation-files custom-scrollbar">
                    {docs.map((file, key) => {
                        return (
                            <div className={`${isInResults(file, "flex")} conversation-file`} key={key}>
                                <div className="file-doc">
                                    <IoDocumentTextOutline className="file-doc-img" />
                                    <div className="file-doc-content">
                                        <p><a href={file.url} rel="noreferrer" target="_blank">{file.name}</a></p>
                                        <p>{file.userPseudo} - {dateParser(file.date)}</p>
                                    </div>
                                </div>

                                <ToolsMenu>
                                    <div className="tools_choice"><IoArrowRedo /><a href={file.url} rel="noreferrer" target="_blank">Ouvrir</a></div>
                                    <div className="tools_choice" onClick={() => download(file)}><MdFileDownload />Télécharger</div>
                                    {file.userId === uid &&
                                        <div className="tools_choice red" onClick={() => setWarning(key)}><IoTrashBin />Supprimer</div>
                                    }
                                </ToolsMenu>

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
                            </div>
                        )
                    })}
                </div>
            }
        </>
    )
}

export default Files