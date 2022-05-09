import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { addActive, dateParser } from '../Utils'
import Modal from '../tools/components/Modal'
import { Button, TextButton } from '../tools/components/Button'
import { ClassicInput, IconInput, Textarea } from '../tools/components/Inputs'
import { MediumAvatar } from '../tools/components/Avatars'
import { isInResults } from '../tools/functions/member'
import { otherMembersIDs } from './tools/function'
import { oneLevelSearch } from '../tools/functions/searches'
import { BiSearchAlt, BiUserPlus } from 'react-icons/bi'

const ConversationModal = ({ setOpen, open, conversation, uid, friendsArr, deleteConversation, leaveConversation, addNewMember }) => {
    const [navbar, setNavbar] = useState(1)
    const [name, setName] = useState(conversation.name)
    const [changeName, setChangeName] = useState(false)
    const [description, setDescription] = useState(conversation.description)
    const [changeDescription, setChangeDescription] = useState(false)

    const [addMember, setAddMember] = useState(false)
    const [membersToAdd, setMembersToAdd] = useState([])

    const [isResults, setResults] = useState([])
    const [search, setSearch] = useState(false)
    const [query, setQuery] = useState("")

    const submitDescription = async () => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/conversation/${conversation._id}`,
            data: { description: description }
        })
        setChangeDescription(false)
    }
    const submitName = async () => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/conversation/${conversation._id}`,
            data: { name: name }
        })
        setChangeName(false)
    }

    useEffect(() => {
        let ids = otherMembersIDs(conversation, uid)
        const notInConvYet = friendsArr.filter(f => !ids.includes(f._id))
        setMembersToAdd(notInConvYet)
    }, [friendsArr, conversation, uid])

    return (
        <Modal open={open} setOpen={setOpen} className="conversation-modal">
            {conversation.name &&
                <div className="px-3 pb-3 bold">{conversation.name}</div>
            }
            <div className="modal_nav">
                <div className={`modal_nav-item ${addActive(navbar === 1, "active")}`} onClick={() => setNavbar(1)}>À propos</div>
                <div className={`modal_nav-item ${addActive(navbar === 2, "active")}`} onClick={() => setNavbar(2)}>Membres <span>{conversation.members.length}</span></div>
            </div>
            {navbar === 1 ? (
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
                                    <div className="bold mb-2">Description</div>
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
                            <div className="bold mb-2">Créé par</div>
                            <div className="txt-sec">{conversation.creator.pseudo} le {dateParser(conversation.createdAt)}</div>
                        </div>
                    </div>
                    <div className="conversation-infos-bloc">
                        <div className="w-full">
                            <div className="bold mb-2">Propriétaire</div>
                            <div className="txt-sec">{conversation.owner.pseudo}</div>
                        </div>
                    </div>
                    <div className="conversation-btn_container">
                        <TextButton text="Quitter" className="mr-2" onClick={() => { leaveConversation(conversation, uid); setOpen(false) }} />
                        {conversation.owner.id === uid && <Button text="Supprimer" onClick={() => { deleteConversation(conversation); setOpen(false) }} />}
                    </div>
                </div>
            ) : (
                <>
                    <IconInput
                        className="full is_start_icon"
                        placeholder="Rechercher un membre..."
                        icon={<BiSearchAlt />}
                        value={query}
                        onInput={e => setQuery(e.target.value)}
                        onChange={() => oneLevelSearch(query, conversation.members, 'pseudo', isResults, setResults, setSearch)}
                    />
                    {!addMember && (
                        <>
                            <div className="add-more-users mt-3" onClick={() => setAddMember(!addMember)}>
                                <BiUserPlus />
                                <p>Ajouter des personnes</p>
                            </div>
                            <div className="conversation-members">
                                {conversation.members.map((member, key) => {
                                    return (
                                        <div className={`${isInResults(member, isResults, search, "flex")} justify-between py-2`} key={key}>
                                            <div className="flex items-center">
                                                <MediumAvatar pic={member.picture} />
                                                <div>{member.pseudo}</div>
                                            </div>
                                            {conversation.owner.id === uid && member.id !== uid &&
                                                <TextButton text="Supprimer" onClick={() => leaveConversation(conversation, member.id)} />
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
                                                <TextButton text="Ajouter" onClick={() => addNewMember(conversation, member)} />
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
            )}
        </Modal>
    )
}

export default ConversationModal