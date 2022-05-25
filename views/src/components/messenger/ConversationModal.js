import React, { useState, useMemo } from 'react'
import { addActive, dateParser } from '../Utils'
import Modal from '../tools/components/Modal'
import { Button, TextButton } from '../tools/components/Button'
import { ClassicInput, IconInput, Textarea } from '../tools/components/Inputs'
import { MediumAvatar } from '../tools/components/Avatars'
import { isInResults } from '../tools/functions/member'
import { addNewMember, deleteConv, leaveConversation, otherMembersIDs, getMembers, returnMembers, returnMenuFiles } from './tools/function'
import { oneLevelSearch } from '../tools/functions/searches'
import { updateConversationDescription, updateConversationName } from '../../actions/messenger.action'
import { avatar } from '../tools/functions/useAvatar'
import { BiSearchAlt, BiUserPlus } from 'react-icons/bi'

const ConversationModal = ({ uid, websocket, dispatch, open, setOpen, conversation, friendsArr }) => {
    const [navbar, setNavbar] = useState(1)
    const [name, setName] = useState(conversation.name)
    const [changeName, setChangeName] = useState(false)
    const [description, setDescription] = useState(conversation.description)
    const [changeDescription, setChangeDescription] = useState(false)

    const [addMember, setAddMember] = useState(false)
    const members = useMemo(() => getMembers(conversation, uid), [conversation, uid])
    const membersToAdd = friendsArr.filter(f => !otherMembersIDs(conversation, uid).includes(f._id))

    const [isResults, setResults] = useState([])
    const [search, setSearch] = useState(false)
    const [query, setQuery] = useState("")

    const submitDescription = async () => {
        dispatch(updateConversationDescription(conversation._id, description))
        setChangeDescription(false)
    }
    const submitName = async () => {
        dispatch(updateConversationName(conversation._id, name))
        setChangeName(false)
    }

    return (
        <Modal open={open} setOpen={setOpen} className="conversation-modal">
            {conversation.name ? (
                <div className="pb-3 bold">{conversation.name}</div>
            ) : (
                <div className="flex items-center pb-3">
                    <div className="conversation-img-container">
                        {members.slice(0, 3).map((element, key) => {
                            return (
                                <div className="conversation-img" key={key} style={avatar(element.picture)}></div>
                            )
                        })}
                    </div>
                    <div className="conversation-name">{returnMembers(members)}</div>
                </div>
            )}
            <div className="modal_nav">
                <div className={`modal_nav-item ${addActive(navbar === 1, "active")}`} onClick={() => setNavbar(1)}>À propos</div>
                <div className={`modal_nav-item ${addActive(navbar === 2, "active")}`} onClick={() => setNavbar(2)}>Membres <span>{members.length}</span></div>
                {conversation.files.length > 0 && <div className={`modal_nav-item ${addActive(navbar === 3, "active")}`} onClick={() => setNavbar(3)}>Fichiers</div>}
            </div>
            {navbar === 1 &&
                <div className="conversation-infos">
                    <div className="conversation-infos-bloc border-b">
                        {changeName ? (
                            <div className="w-full">
                                <div className="bold mb-2">Nom</div>
                                <div className="txt-sec">
                                    <ClassicInput className="full" placeholder="Nom de la conversation..." defaultValue={conversation.name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="flex justify-end py-2">
                                    <TextButton className="mr-2" text="Annuler" onClick={() => setChangeName(!changeName)} />
                                    <Button text="Valider" onClick={submitName} />
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="w-full">
                                    <div className="bold mb-2">Nom</div>
                                    <div className="txt-sec">{name !== "" && name !== undefined ? name : 'Pas encore de nom'}</div>
                                </div>
                                <div className="ml-10">
                                    {conversation.owner.id === uid &&
                                        <TextButton text="Modifier" onClick={() => setChangeName(!changeName)} />
                                    }
                                </div>
                            </>
                        )}
                    </div>
                    <div className="conversation-infos-bloc border-b">
                        {changeDescription ? (
                            <div className="w-full">
                                <div className="bold mb-2">Description</div>
                                <div className="txt-sec">
                                    <Textarea className="full" placeholder="Description de la conversation..." defaultValue={conversation.description} onChange={(e) => setDescription(e.target.value)} />
                                </div>
                                <div className="flex justify-end py-2">
                                    <TextButton className="mr-2" text="Annuler" onClick={() => setChangeDescription(!changeDescription)} />
                                    <Button text="Valider" onClick={submitDescription} />
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="w-full">
                                    <div className="bold mb-1">Description</div>
                                    <div className="txt-sec">{description !== "" && description !== undefined ? description : 'Pas encore de description'}</div>
                                </div>
                                <div className="ml-10">
                                    {conversation.owner.id === uid &&
                                        <TextButton text="Modifier" onClick={() => setChangeDescription(!changeDescription)} />
                                    }
                                </div>
                            </>
                        )}
                    </div>
                    <div className="conversation-infos-bloc border-b">
                        <div className="w-full">
                            <div className="bold mb-1">Créé par</div>
                            <div className="txt-sec">{conversation.creator.pseudo} le {dateParser(conversation.createdAt)}</div>
                        </div>
                    </div>
                    <div className="conversation-infos-bloc">
                        <div className="w-full">
                            <div className="bold mb-1">Propriétaire</div>
                            <div className="txt-sec">{conversation.owner.pseudo}</div>
                        </div>
                    </div>
                    <div className="conversation-btn_container">
                        <TextButton text="Quitter la conversation" className="mr-2" onClick={() => { leaveConversation(conversation, uid); setOpen(false) }} />
                        {conversation.owner.id === uid && <Button text="Supprimer la conversation" onClick={() => { deleteConv(conversation, uid, websocket, dispatch); setOpen(false) }} />}
                    </div>
                </div>
            }
            {navbar === 2 &&
                <>
                    <IconInput
                        className="full is_start_icon mb-3"
                        placeholder="Rechercher un membre..."
                        icon={<BiSearchAlt />}
                        value={query}
                        onInput={e => setQuery(e.target.value)}
                        onChange={() => oneLevelSearch(query, members, 'pseudo', isResults, setResults, setSearch)}
                    />
                    {!addMember && (
                        <>
                            <div className="add-more-users" onClick={() => setAddMember(!addMember)}>
                                <BiUserPlus />
                                <p>Ajouter des personnes</p>
                            </div>
                            <div className="conversation-members">
                                {members.map((member, key) => {
                                    return (
                                        <div className={`${isInResults(member, isResults, search, "flex")} justify-between py-2`} key={key}>
                                            <div className="flex items-center">
                                                <MediumAvatar pic={member.picture} />
                                                <div>{member.pseudo}</div>
                                            </div>
                                            {conversation.owner.id === uid && member.id !== uid &&
                                                <TextButton text="Supprimer" onClick={() => leaveConversation(conversation, member.id, uid, websocket, dispatch)} />
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    )}
                    {addMember &&
                        <div className="conversation-members">
                            {membersToAdd.length > 0 ? (
                                <>
                                    {membersToAdd.map((member, key) => {
                                        return (
                                            <div className={`${isInResults(member, isResults, search, "flex")} justify-between py-2`} key={key}>
                                                <div className="flex items-center">
                                                    <MediumAvatar pic={member.picture} />
                                                    <div>{member.pseudo}</div>
                                                </div>
                                                <TextButton text="Ajouter" onClick={() => addNewMember(conversation, member, uid, websocket, dispatch)} />
                                            </div>
                                        )
                                    })}
                                    <Button text="Terminé" onClick={() => setAddMember(!addMember)} />
                                </>
                            ) : (
                                <>
                                    <div className="empty-array">
                                        <div><BiUserPlus /></div>
                                        <div>Tous vos contact font déjà parti de cette conversation</div>
                                    </div>
                                    <div className="flex justify-center">
                                        <Button text="Retour" onClick={() => setAddMember(!addMember)} />
                                    </div>
                                </>
                            )}
                        </div>
                    }
                </>
            }
            {conversation.files.length > 0 &&
                navbar === 3 &&
                <div className="conversation-files">
                    {conversation.files.map((file, key) => {
                        return (
                            <div className="conversation-file" key={key}>
                                {returnMenuFiles(file)}
                            </div>
                        )
                    })}
                </div>
            }
        </Modal>
    )
}

export default ConversationModal