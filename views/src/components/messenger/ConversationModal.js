import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ImCross } from 'react-icons/im'
import { dateParser } from '../Utils'

const ConversationModal = ({ setOpen, open, conversation, uid, friends, avatar, deleteConversation, leaveConversation, addNewMember }) => {
    const coverClass = open ? 'modal-cover modal-cover-active' : 'modal-cover'
    const containerClass = open ? 'modal-container modal-container-active show-modal' : 'modal-container hide-modal'
    const modalClose = () => { setOpen(false) }
    
    const [displayInfos, setDisplayInfos] = useState(true)
    const [displayMembers, setDisplayMembers] = useState(false)
    const [name, setName] = useState(conversation.name)
    const [changeName, setChangeName] = useState(false)
    const [description, setDescription] = useState(conversation.description)
    const [changeDescription, setChangeDescription] = useState(false)
    
    const [addMember, setAddMember] = useState(false)
    const [membersToAdd, setMembersToAdd] = useState([])

    const [isMemberInResult, setMemberInResult] = useState([])
    const [search, setSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const isEmpty = !isMemberInResult || isMemberInResult.length === 0
    const regexp = new RegExp(searchQuery, 'i')

    const handleInputChange = (e) => { setSearchQuery(e.target.value) }
    const searchMember = () => {
        if (!searchQuery || searchQuery.trim() === "") { return }
        if (searchQuery.length >= 2) {
            const response = conversation.members.filter(member => regexp.test(member.pseudo))
            setMemberInResult(response)
            setSearch(true)
            if (isEmpty) {
                setSearch(false)
            }
        } else { setSearch(false) }
    }

    const submitDescription = async () => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/conversations/${conversation._id}`,
            data: {
                description: description,
            }
        })
        setChangeDescription(false)
    }
    const submitName = async () => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/conversations/${conversation._id}`,
            data: {
                name: name,
            }
        })
        setChangeName(false)
    }

    useEffect(() => {
        var ids = []
        conversation.members.map(members => { return ids = [...ids, members.id] })
        const notInConvYet = friends.filter(friend => !ids.includes(friend.friend))
        const findFutureMembers = notInConvYet.map(async (friend) => {
            return await axios.get(`${process.env.REACT_APP_API_URL}api/user/${friend.friend}`)
                .then((res) => res.data)
                .catch((err) => console.error(err))
        })
        Promise.all(findFutureMembers).then((res) => {
            setMembersToAdd(res)
        })
    }, [friends])

    return (
        <>
            <div className={containerClass + " conversation-modal"}>
                <div className="modal-inner">
                    <div className="close-modal" onClick={() => { modalClose() }}><ImCross /></div>
                    <div className='header'>
                        {conversation.name && <div className="conversation-name">{conversation.name}</div>}
                        <ul>
                            <li onClick={() => { setDisplayInfos(true); setDisplayMembers(false) }}>À propos</li>
                            <li onClick={() => { setDisplayInfos(false); setDisplayMembers(true) }}>Membres</li>
                        </ul>
                    </div>
                    <div className='body'>
                        {displayInfos &&
                            <div className="conversation-infos">
                                <div className="conversation-infos-bloc">
                                    {changeName ? (
                                        <div className="left">
                                            <div className="title">Nom</div>
                                            <div className="info">
                                                <input className="conversation-menu-input" defaultValue={conversation.name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                            <button className="btn btn-primary" onClick={() => setChangeName(!changeName)}>Annuler</button>
                                            <button className="btn btn-primary" onClick={submitName}>Valider</button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="left">
                                                <div className="title">Nom</div>
                                                <div className="info">{name !== "" && name !== undefined ? (name) : ('Pas encore de nom')}</div>
                                            </div>
                                            <div className="right">
                                                {conversation.owner.id === uid && (
                                                    <button className="btn btn-primary" onClick={() => setChangeName(!changeName)}>Modifier</button>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="conversation-infos-bloc">
                                    {changeDescription ? (
                                        <div className="left">
                                            <div className="title">Description</div>
                                            <div className="info">
                                                <input className="conversation-menu-input" defaultValue={conversation.description} onChange={(e) => setDescription(e.target.value)} />
                                            </div>
                                            <button className="btn btn-primary" onClick={() => setChangeDescription(!changeDescription)}>Annuler</button>
                                            <button className="btn btn-primary" onClick={submitDescription}>Valider</button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="left">
                                                <div className="title">Description</div>
                                                <div className="info">{description !== "" && description !== undefined ? (description) : ('Pas encore de description')}</div>
                                            </div>
                                            <div className="right">
                                                {conversation.owner.id === uid && (
                                                    <button className="btn btn-primary" onClick={() => setChangeDescription(!changeDescription)}>Modifier</button>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="conversation-infos-bloc">
                                    <div className="left">
                                        <div className="title">Créé par</div>
                                        <div className="info">{conversation.creator.pseudo} le {dateParser(conversation.createdAt)}</div>
                                    </div>
                                </div>
                                <div className="conversation-infos-bloc">
                                    <div className="left">
                                        <div className="title">Propriétaire</div>
                                        <div className="info">{conversation.owner.pseudo}</div>
                                    </div>
                                </div>
                                <div className="conversation-infos-bloc">
                                    <button className="btn btn-primary" onClick={() => { leaveConversation(conversation, uid); setOpen(false) }}>Quitter la conversation</button>
                                    {conversation.owner.id === uid && <button className="btn btn-primary" onClick={() => { deleteConversation(conversation); setOpen(false) }}>Supprimer la conversation</button>}
                                </div>
                            </div>
                        }
                        {displayMembers &&
                            <>
                                <input placeholder="Rechercher un membre..." type="search" value={searchQuery} onInput={handleInputChange} onChange={searchMember} />
                                {!addMember && (
                                    <>
                                        <button className="btn btn-primary" onClick={() => setAddMember(!addMember)}>Ajouter un membre</button>
                                        <div className="conversation-members">
                                            {conversation.members.map((member, key) => {
                                                return (
                                                    <div className="conversation-member" key={key} style={{ display: search ? (isMemberInResult.includes(member) ? "flex" : "none") : ("flex") }}>
                                                        <div className="conversation-member-infos">
                                                            <div className="conversation-member-avatar" style={avatar(member.picture)}></div>
                                                            <div className="pseudo">{member.pseudo}</div>
                                                        </div>
                                                        {conversation.owner.id === uid && member.id !== uid &&
                                                            <button className="btn btn-primary" onClick={() => leaveConversation(conversation, member.id)}>Supprimer</button>
                                                        }
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </>
                                )}
                                {addMember && (
                                    <div className="conversation-members">
                                        {membersToAdd.length > 0 && (
                                            membersToAdd.map((member, key) => {
                                                return (
                                                    <div className="conversation-member" key={key} style={{ display: search ? (isMemberInResult.includes(member) ? "flex" : "none") : ("flex") }}>
                                                        <div className="conversation-member-infos">
                                                            <div className="conversation-member-avatar" style={avatar(member.picture)}></div>
                                                            <div className="pseudo">{member.pseudo}</div>
                                                        </div>
                                                        <button className="btn btn-primary" onClick={() => addNewMember(conversation, member)}>Ajouter</button>
                                                    </div>
                                                )
                                            })
                                        )}
                                        <button className="btn btn-primary" onClick={() => setAddMember(!addMember)}>Terminé</button>
                                    </div>
                                )}
                            </>
                        }
                    </div>
                </div>
            </div>
            <div className={coverClass} onClick={modalClose}></div>
        </>
    )
}

export default ConversationModal