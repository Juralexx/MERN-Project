import React, { useState } from 'react';
import axios from 'axios';
import { addActive } from '../Utils';
import { Button, TextButton } from '../tools/components/Button';
import { ClassicInput, IconInput, Textarea } from '../tools/components/Inputs';
import { MediumAvatar, TinyAvatar } from '../tools/components/Avatars';
import { isInResults, isSelected } from '../tools/functions/member';
import { otherMembersIDs, pushUserInArray, removeUserFromArray } from './tools/function';
import { oneLevelSearch } from '../tools/functions/searches';
import Modal from '../tools/components/Modal';
import { IoClose } from 'react-icons/io5'
import { BiSearchAlt } from 'react-icons/bi';

const NewConversationModal = ({ open, setOpen, uid, user, websocket, friendsArr, changeCurrentChat }) => {
    const [navbar, setNavbar] = useState(1)
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [members, setMembers] = useState([])

    const createNewConversation = async () => {
        let usr = { id: user._id, pseudo: user.pseudo, picture: user.picture }
        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/conversation/`,
            data: {
                type: members.length === 1 ? "dialog" : "group",
                name: name,
                description: description,
                members: [usr, ...members],
                owner: usr,
                creator: usr
            }
        }).then(res => {
            otherMembersIDs(res.data, uid).map(memberId => {
                return websocket.current.emit("addConversation", {
                    receiverId: memberId,
                    conversationId: res.data._id
                })
            })
            setMembers([])
            setNavbar(1)
            setName()
            setDescription()
            setOpen(false)
            changeCurrentChat(res.data)
        })
    }

    const [search, setSearch] = useState(false)
    const [query, setQuery] = useState("")
    const [isResults, setResults] = useState([])

    return (
        <>
            <Modal open={open} setOpen={setOpen} className="add-conversation-modal">
                <div className="modal_nav">
                    <div className={`modal_nav-item ${addActive(navbar === 1, "active")}`} onClick={() => setNavbar(1)}>Membres</div>
                    <div className={`modal_nav-item ${addActive(navbar === 2, "active")}`} onClick={() => setNavbar(2)}>À propos</div>
                </div>
                {navbar === 1 ? (
                    <>
                        <div className="user_in_array-container">
                            {members.length > 0 && (
                                members.map((element, key) => {
                                    return (
                                        <div className="user_in_array" key={key}>
                                            <TinyAvatar pic={element.picture} />
                                            <p>{element.pseudo}</p>
                                            <IoClose onClick={() => setMembers(removeUserFromArray(element, members))} />
                                        </div>
                                    )
                                })
                            )}
                        </div>
                        <IconInput
                            className="full is_start_icon mb-3"
                            placeholder="Rechercher un membre..."
                            icon={<BiSearchAlt />} value={query}
                            onInput={e => setQuery(e.target.value)}
                            onChange={() => oneLevelSearch(query, friendsArr, 'pseudo', isResults, setResults, setSearch)}
                        />
                        <div className="user_selecter">
                            {open &&
                                friendsArr.length > 0 ? (
                                friendsArr &&
                                <div className="user_displayer">
                                    {friendsArr.map((element, key) => {
                                        return (
                                            <div className={`user_display_choice ${isSelected(members, element)} ${isInResults(element, isResults, search, "flex")}`} onClick={() => setMembers(pushUserInArray(element, members))} key={key}>
                                                <div className="user">
                                                    <MediumAvatar pic={element.picture} />
                                                    <p>{element.pseudo}</p>
                                                </div>
                                                {members.some(member => member.id === element._id) ? (
                                                    <TextButton text="Retirer" />
                                                ) : (
                                                    <TextButton text="Ajouter" />
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : (
                                <div className="no-conversation-yet !mt-10">
                                    <p>Vous n'avez pas encore de contact...</p>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="py-3">
                            <div className="title">Nom</div>
                            <div className="info">
                                <ClassicInput className="full" onChange={e => setName(e.target.value)} placeholder="Nom de la conversation..." />
                            </div>
                        </div>
                        <div className="py-3">
                            <div className="title">Description</div>
                            <div className="info">
                                <Textarea className="full" onChange={e => setDescription(e.target.value)} placeholder="Description de la conversation..." />
                            </div>
                        </div>
                    </>
                )}
                <div className='conversation-btn_container'>
                    <Button text="Créer la conversation" disabled={members.length < 1} onClick={createNewConversation} />
                </div>
            </Modal>
        </>
    )
}

export default NewConversationModal;