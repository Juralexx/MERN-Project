import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useOneLevelSearch } from '../../tools/hooks/useOneLevelSearch'
import { useCheckLocation } from '../functions/useCheckLocation'
import { MessengerContext } from '../../AppContext'
import Warning from '../../tools/global/Warning'
import ToolsMenu from '../../tools/global/ToolsMenu'
import { SmallLoader } from '../tools/Loaders'
import { IconInput } from '../../tools/global/Inputs'
import { coverPicture } from '../../tools/hooks/useAvatar'
import { addClass, dateParser, download } from '../../Utils'
import { deleteFiles } from '../functions/actions'
import { BiSearchAlt } from 'react-icons/bi'
import { MdFileDownload } from 'react-icons/md'
import { IoArrowRedo, IoDocumentTextOutline, IoTrashBin } from 'react-icons/io5'
import { HiArrowSmLeft } from 'react-icons/hi'

const Files = ({ conversation, files, setFiles }) => {
    const { uid, user, websocket, dispatch } = useContext(MessengerContext)
    const { oneLevelSearch, isInResults, query, setQuery } = useOneLevelSearch(conversation.files, 'name')
    const { isParam } = useCheckLocation()

    const [isLoading, setLoading] = useState(true)
    const [warning, setWarning] = useState(-1)

    const medias = useMemo(() => conversation.files.filter(file => file.type.includes('image') || file.type.includes('video')), [conversation.files])
    const docs = useMemo(() => conversation.files.filter(file => !file.type.includes('image') && !file.type.includes('video')), [conversation.files])

    useEffect(() => {
        if (conversation.files.length > 0) {
            if (docs.length > 0 || medias.length > 0) {
                setLoading(false)
            }
        } else {
            setLoading(false)
        }
    }, [isLoading, docs, medias, conversation.files])

    return (
        <>
            <div className="go-back ml-[10px] mb-2">
                <HiArrowSmLeft onClick={() => setFiles({ open: false, type: null })} />
                <p>Multimédia et fichiers</p>
            </div>
            <div className="tools-nav">
                <div className={`tools-nav-item ${addClass(files.type === 'medias', "active")}`} onClick={() => setFiles({ open: true, type: 'medias' })}>Multimédia</div>
                <div className={`tools-nav-item ${addClass(files.type === 'files', "active")}`} onClick={() => setFiles({ open: true, type: 'files' })}>Fichiers</div>
            </div>
            <div className="px-[10px]">
                <IconInput
                    className="full is_start_icon small mb-3"
                    placeholder="Rechercher un fichier"
                    icon={<BiSearchAlt />}
                    value={query}
                    onInput={e => setQuery(e.target.value)}
                    onChange={oneLevelSearch}
                />
            </div>
            {!isLoading ? (
                <>
                    {files.type === 'medias' && (
                        medias.length > 0 ? (
                            <div className="conversation-medias custom-scrollbar">
                                {medias.map((file, key) => {
                                    return (
                                        <div className={`${isInResults(file, "block")} conversation-medias-item`} style={coverPicture(file.url)} key={key}>

                                            <ToolsMenu placement="bottom" btnClassName="bg-default" mobile mobileFull>
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
                                                    onValidate={() => deleteFiles(file, uid, websocket, conversation, file.messageId, dispatch, isParam)}
                                                    onClose={() => setWarning(false)}
                                                >
                                                </Warning>
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="empty-array">
                                <div>Aucun médias à afficher...</div>
                            </div>
                    ))}
                    {files.type === 'files' && (
                        docs.length > 0 ? (
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

                                            <ToolsMenu mobile mobileFull>
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
                                                    onValidate={() => deleteFiles(file, user, websocket, conversation, file.messageId, dispatch, isParam)}
                                                    onClose={() => setWarning(false)}
                                                >
                                                </Warning>
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="empty-array">
                                <div>Aucun fichiers à afficher...</div>
                            </div>
                   ))}
                </>
            ) : (
                <SmallLoader />
            )}
        </>
    )
}

export default Files