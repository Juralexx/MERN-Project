import React, { useContext, useState } from 'react';
import axios from 'axios';
import { addActive } from '../Utils';
import { Button, TextButton } from '../tools/components/Button';
import { ClassicInput, IconInput, Textarea } from '../tools/components/Inputs';
import { MediumAvatar, TinyAvatar } from '../tools/components/Avatars';
import { isInResults, isSelected } from '../tools/functions/member';
import { isConversation, otherMembersIDs, pushUserInArray, removeUserFromArray } from './functions/function';
import { oneLevelSearch } from '../tools/functions/searches';
import Modal from '../tools/components/Modal';
import { IoClose } from 'react-icons/io5'
import { BiSearchAlt } from 'react-icons/bi';
import { MessengerContext } from '../AppContext';

const NewConversationModal = ({ open, setOpen, conversations, setConversations, changeCurrentChat }) => {
    const { uid, user, websocket, friendsArr } = useContext(MessengerContext)
    const [navbar, setNavbar] = useState(1)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [picture, setPicture] = useState(null)
    const [members, setMembers] = useState([])

    const createNewConversation = async () => {
        let usr = { _id: user._id, pseudo: user.pseudo, picture: user.picture, date: new Date().toISOString() }
        let isConv = isConversation(conversations, [...members, usr])

        if (members.length === 1 && isConv !== false) {
            changeCurrentChat(isConv)
            console.log(isConv)
        } else {
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
            }).then(async res => {
                if (res.data && picture !== null) {
                    let formData = new FormData()
                    formData.append('file', picture)
                    await axios
                        .put(`${process.env.REACT_APP_API_URL}api/conversation/${res.data._id}/upload`, formData)
                        .catch(err => console.log(err))
                }
                otherMembersIDs(res.data, uid).map(memberId => {
                    return websocket.current.emit("addConversation", {
                        receiverId: memberId,
                        conversationId: res.data._id
                    })
                })
                setConversations(convs => [...convs, res.data])
                changeCurrentChat(res.data)
            })
        }
        setMembers([])
        setNavbar(1)
        setName("")
        setDescription("")
        setOpen(false)
    }

    const [search, setSearch] = useState(false)
    const [query, setQuery] = useState("")
    const [isResults, setResults] = useState([])

    return (
        <Modal open={open} setOpen={setOpen} className="add-conversation-modal">
            <div className="modal_nav pb-2 border-b">
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
                        className="full is_start_icon mb-3 small"
                        placeholder="Rechercher un membre..."
                        icon={<BiSearchAlt />} value={query}
                        onInput={e => setQuery(e.target.value)}
                        onChange={() => oneLevelSearch(query, friendsArr, 'pseudo', isResults, setResults, setSearch)}
                    />
                    <div className="user_selecter">
                        {friendsArr.length > 0 ? (
                            <div className="user_displayer">
                                {friendsArr.map((element, key) => {
                                    return (
                                        <div className={`user_display_choice ${isSelected(members, element)} ${isInResults(element, isResults, search, "flex")}`} onClick={() => setMembers(pushUserInArray(element, members))} key={key}>
                                            <div className="user">
                                                <MediumAvatar pic={element.picture} />
                                                <div>
                                                    <p>{element.pseudo}</p>
                                                    <p>{element.work && element.work}</p>
                                                </div>
                                            </div>
                                            {members.some(member => member._id === element._id) ? (
                                                <TextButton text="Retirer" className="light_delete" />
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
                    <div className="pt-3">
                        <div className="title">Nom</div>
                        <div className="info">
                            <ClassicInput className="full" value={name} onChange={e => setName((e.target.value).substring(0, 50))} placeholder="Nom de la conversation..." />
                            <div className="field_infos !w-full">{name.length} / 50 caractères</div>
                        </div>
                    </div>
                    <div className="pt-3">
                        <div className="title">Description</div>
                        <div className="info">
                            <Textarea className="w-full" value={description} onChange={e => setDescription((e.target.value).substring(0, 500))} placeholder="Description de la conversation..." />
                            <div className="field_infos !w-full">{description.length} / 500 caractères</div>
                        </div>
                    </div>
                </>
            )}
            <div className='conversation-btn_container'>
                <Button text="Créer la conversation" disabled={members.length < 1} onClick={createNewConversation} />
            </div>
        </Modal>
    )
}

export default NewConversationModal;