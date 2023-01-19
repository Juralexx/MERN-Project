import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useOneLevelSearch } from '../../tools/custom-hooks/useOneLevelSearch'
import { MessengerContext } from '../../AppContext'
import Warning from '../../tools/global/Warning'
import ToolsMenu from '../../tools/global/ToolsMenu'
import { SmallLoader } from '../tools/Loaders'
import { IconInput } from '../../tools/global/Inputs'
import { addClass, dateParser, download, fullImage } from '../../Utils'
import { deleteFiles } from '../actions'
import Icon from '../../tools/icons/Icon'

const Files = ({ conversation, files, setFiles }) => {
    const { uid, user, websocket, dispatch } = useContext(MessengerContext)
    const { oneLevelSearch, isElementInSearchResults, search, setSearch } = useOneLevelSearch(conversation.files, 'name')

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
            <div className="go-back mb-2">
                <Icon name="ArrowLeft" onClick={() => setFiles({ open: false, type: null })} />
                <p>Multimédia et fichiers</p>
            </div>
            <div className="tools-nav">
                <div className={`tools-nav-item ${addClass(files.type === 'medias', "active")}`} onClick={() => setFiles({ open: true, type: 'medias' })}>
                    Multimédia
                </div>
                <div className={`tools-nav-item ${addClass(files.type === 'files', "active")}`} onClick={() => setFiles({ open: true, type: 'files' })}>
                    Fichiers
                </div>
            </div>
            <IconInput
                className="full is_start_icon"
                placeholder="Rechercher un fichier"
                icon={<Icon name="Search" />}
                value={search.query}
                onInput={e => setSearch(prevState => ({ ...prevState, query: e.target.value }))}
                onChange={oneLevelSearch}
            />
            {!isLoading ? (
                <>
                    {files.type === 'medias' && (
                        medias.length > 0 ? (
                            <div className="conversation-medias custom-scrollbar">
                                {medias.map((file, key) => {
                                    return (
                                        <div className={`${isElementInSearchResults(file, "block")} conversation-medias-item`} style={fullImage(file.url)} key={key}>

                                            <ToolsMenu placement="bottom" btnClassName="bg-default" mobile mobileFull>
                                                <div className="tools_choice"><Icon name="Redo" /><a href={file.url} rel="noreferrer" target="_blank">Ouvrir</a></div>
                                                <div className="tools_choice" onClick={() => download(file)}><Icon name="Download" />Télécharger</div>
                                                {file.userId === uid &&
                                                    <div className="tools_choice red" onClick={() => setWarning(key)}><Icon name="Trash" />Supprimer</div>
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
                                        <div className={`${isElementInSearchResults(file, "flex")} conversation-file`} key={key}>
                                            <div className="file-doc">
                                                <Icon name="File" className="file-doc-img" />
                                                <div className="file-doc-content">
                                                    <p><a href={file.url} rel="noreferrer" target="_blank">{file.name}</a></p>
                                                    <p>{file.userPseudo} - {dateParser(file.date)}</p>
                                                </div>
                                            </div>

                                            <ToolsMenu mobile mobileFull>
                                                <div className="tools_choice"><Icon name="Redo" /><a href={file.url} rel="noreferrer" target="_blank">Ouvrir</a></div>
                                                <div className="tools_choice" onClick={() => download(file)}><Icon name="Download" />Télécharger</div>
                                                {file.userId === uid &&
                                                    <div className="tools_choice red" onClick={() => setWarning(key)}><Icon name="Trash" />Supprimer</div>
                                                }
                                            </ToolsMenu>

                                            {warning === key &&
                                                <Warning
                                                    title={`Supprimer ${file.name}`}
                                                    text={`Voulez-vous vraiment supprimer le fichier ${file.name} ? Cette action est irréversible.`}
                                                    validateBtn="Supprimer"
                                                    open={warning === key}
                                                    setOpen={setWarning}
                                                    onValidate={() => deleteFiles(file, user, websocket, conversation, file.messageId, dispatch)}
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