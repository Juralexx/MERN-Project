import React, { useContext, useState } from 'react';
import axios from 'axios';
import { MessengerContext } from '../AppContext';
import Modal from '../tools/global/Modal';
import Icon from '../tools/icons/Icon';
import { Button } from '../tools/global/Button';
import { ClassicInput, IconInput, Textarea } from '../tools/global/Inputs';
import { MediumAvatar, TinyAvatar } from '../tools/global/Avatars';
import { isSelected } from '../tools/functions/member';
import { addClass } from '../Utils';
import { useOneLevelSearch } from '../tools/custom-hooks/useOneLevelSearch';
import { isAlreadyConversationExisting, otherMembersIDs, pushUserInArray, removeUserFromArray } from './functions';

const NewConversationModal = ({ open, setOpen }) => {
    const { uid, user, websocket, contactsArr, changeCurrentChat, conversations, setConversations } = useContext(MessengerContext)
    const { oneLevelSearch, isElementInSearchResults, search, setSearch } = useOneLevelSearch(contactsArr, 'pseudo')
    const [navbar, setNavbar] = useState(1)

    const [newConversation, setNewConversation] = useState({
        name: '',
        description: '',
        members: [],
    })

    const createNewConversation = async () => {
        let usr = {
            _id: user._id,
            pseudo: user.pseudo,
            picture: user.picture,
            date: new Date().toISOString()
        }
        let isConv = isAlreadyConversationExisting(conversations.allConversations, [...newConversation.members, usr])

        if (newConversation.members.length === 1 && isConv !== false) {
            changeCurrentChat(isConv)
        } else {
            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/conversation/`,
                data: {
                    type: newConversation.members.length === 1 ? "dialog" : "group",
                    name: newConversation.name,
                    description: newConversation.description,
                    members: [usr, ...newConversation.members],
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
                setConversations(convs => ({ ...convs, notFavorites: [...conversations.notFavorites, res.data] }))
                changeCurrentChat(res.data)
            })
        }
        setNewConversation({ name: '', description: '', members: [] })
        setNavbar(1)
        setOpen(false)
    }

    return (
        <Modal open={open} setOpen={setOpen} className="add-conversation-modal">
            <h2>Nouvelle conversation</h2>
            <div className="modal_nav">
                <div className={`modal_nav-item ${addClass(navbar === 1, "active")}`} onClick={() => setNavbar(1)}>
                    Membres
                </div>
                <div className={`modal_nav-item ${addClass(navbar === 2, "active")}`} onClick={() => setNavbar(2)}>
                    À propos
                </div>
            </div>
            {navbar === 1 ? (
                <>
                    <div className="user_in_array-container">
                        {newConversation.members.length > 0 && (
                            newConversation.members.map((element, key) => {
                                return (
                                    <div className="user_in_array" key={key}>
                                        <TinyAvatar pic={element.picture} />
                                        <p>{element.pseudo}</p>
                                        <Icon
                                            name="Cross"
                                            onClick={() => setNewConversation(prevState => ({ ...prevState, members: removeUserFromArray(element, newConversation.members) }))}
                                        />
                                    </div>
                                )
                            })
                        )}
                    </div>
                    <IconInput
                        className="is_start_icon mb-3"
                        placeholder="Rechercher un membre..."
                        icon={<Icon name="Search" />}
                        value={search.query}
                        onInput={e => setSearch(prevState => ({ ...prevState, query: e.target.value }))}
                        onChange={oneLevelSearch}
                    />
                    <div className="user_selecter">
                        {contactsArr.length > 0 ? (
                            <div className="user_displayer">
                                {contactsArr.map((element, key) => {
                                    return (
                                        <div
                                            className={`user_display_choice !justify-between  ${isSelected(newConversation.members, element)} ${isElementInSearchResults(element, "flex")}`}
                                            onClick={() => setNewConversation(prevState => ({ ...prevState, members: pushUserInArray(element, newConversation.members) }))}
                                            key={key}
                                        >
                                            <div className="user">
                                                <MediumAvatar pic={element.picture} />
                                                <div>
                                                    <p>{element.pseudo}</p>
                                                    <p>{element.work && element.work}</p>
                                                </div>
                                            </div>
                                            {newConversation.members.some(member => member._id === element._id) ? (
                                                <Icon name="DeleteUser" />
                                            ) : (
                                                <Icon name="AddUser" />
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
                            <ClassicInput
                                className="full"
                                value={newConversation.name}
                                onChange={e => setNewConversation(prevState => ({ ...prevState, name: (e.target.value).substring(0, 50) }))}
                                placeholder="Nom de la conversation..."
                            />
                            <div className="field_infos !w-full">
                                {newConversation.name.length} / 50 caractères
                            </div>
                        </div>
                    </div>
                    <div className="pt-1">
                        <div className="title">Description</div>
                        <div className="info">
                            <Textarea
                                className="w-full"
                                value={newConversation.description}
                                onChange={e => setNewConversation(prevState => ({ ...prevState, description: (e.target.value).substring(0, 500) }))}
                                placeholder="Description de la conversation..."
                            />
                            <div className="field_infos !w-full">
                                {newConversation.description.length} / 500 caractères
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div className='btn-container'>
                <Button disabled={newConversation.members.length < 1} onClick={createNewConversation}>
                    Créer la conversation
                </Button>
            </div>
        </Modal>
    )
}

export default NewConversationModal;