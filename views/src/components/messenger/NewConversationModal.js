import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useOneLevelSearch } from '../tools/hooks/useOneLevelSearch';
import { MessengerContext } from '../AppContext';
import Modal from '../tools/global/Modal';
import { Button, TextButton } from '../tools/global/Button';
import { ClassicInput, IconInput, Textarea } from '../tools/global/Inputs';
import { MediumAvatar, TinyAvatar } from '../tools/global/Avatars';
import { isSelected } from '../tools/functions/member';
import { addClass } from '../Utils';
import { isConversation, otherMembersIDs, pushUserInArray, removeUserFromArray } from './functions/function';
import { IoClose } from 'react-icons/io5'
import { BiSearchAlt } from 'react-icons/bi';

const NewConversationModal = ({ open, setOpen, conversations, setConversations }) => {
    const { uid, user, websocket, friendsArr, changeCurrentChat } = useContext(MessengerContext)
    const [navbar, setNavbar] = useState(1)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [members, setMembers] = useState([])

    const { oneLevelSearch, isInResults, query, setQuery } = useOneLevelSearch(friendsArr, 'pseudo')

    const createNewConversation = async () => {
        let usr = { _id: user._id, pseudo: user.pseudo, picture: user.picture, date: new Date().toISOString() }
        let isConv = isConversation(conversations, [...members, usr])

        if (members.length === 1 && isConv !== false) {
            changeCurrentChat(isConv)
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
            }).then(res => {
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

    return (
        <Modal open={open} setOpen={setOpen} className="add-conversation-modal">
            <h2>Nouvelle conversation</h2>
            <div className="modal_nav pb-2 border-b">
                <div className={`modal_nav-item ${addClass(navbar === 1, "active")}`} onClick={() => setNavbar(1)}>Membres</div>
                <div className={`modal_nav-item ${addClass(navbar === 2, "active")}`} onClick={() => setNavbar(2)}>?? propos</div>
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
                        icon={<BiSearchAlt />}
                        value={query}
                        onInput={e => setQuery(e.target.value)}
                        onChange={oneLevelSearch}
                    />
                    <div className="user_selecter">
                        {friendsArr.length > 0 ? (
                            <div className="user_displayer">
                                {friendsArr.map((element, key) => {
                                    return (
                                        <div className={`user_display_choice ${isSelected(members, element)} ${isInResults(element, "flex")}`} onClick={() => setMembers(pushUserInArray(element, members))} key={key}>
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
                    <div className="pt-1">
                        <div className="title">Nom</div>
                        <div className="info">
                            <ClassicInput className="full" value={name} onChange={e => setName((e.target.value).substring(0, 50))} placeholder="Nom de la conversation..." />
                            <div className="field_infos !w-full">{name.length} / 50 caract??res</div>
                        </div>
                    </div>
                    <div className="pt-1">
                        <div className="title">Description</div>
                        <div className="info">
                            <Textarea className="w-full" value={description} onChange={e => setDescription((e.target.value).substring(0, 500))} placeholder="Description de la conversation..." />
                            <div className="field_infos !w-full">{description.length} / 500 caract??res</div>
                        </div>
                    </div>
                </>
            )}
            <div className='conversation-btn_container'>
                <Button text="Cr??er la conversation" disabled={members.length < 1} onClick={createNewConversation} />
            </div>
        </Modal>
    )
}

export default NewConversationModal;