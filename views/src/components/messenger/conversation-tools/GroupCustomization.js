import React, { useContext, useState } from 'react'
import Modal from '../../tools/global/Modal'
import Icon from '../../tools/icons/Icon'
import { Button, TextButton } from '../../tools/global/Button'
import { MediumAvatar } from '../../tools/global/Avatars'
import { ClassicInput, Textarea } from '../../tools/global/Inputs'
import { MessengerContext } from '../../AppContext'
import { useCheckLocation } from '../hooks/useCheckLocation'
import { customizeUserPseudo, removeConversationPicture, updateConversationInfos, uploadConversationPicture } from '../../../reducers/messenger.action'
import { otherMembersIDs } from '../functions'

const GroupCustomization = ({ conversation }) => {
    const { uid, websocket, dispatch } = useContext(MessengerContext)
    const { doesLocationIncludesParam } = useCheckLocation()
    const [open, setOpen] = useState(false)

    const [conversationInfos, setConversationInfos] = useState({
        name: conversation.name,
        description: conversation.description,
        picture: conversation.picture
    })

    /**
     * 
     */

    const updateInformations = async () => {
        await doesLocationIncludesParam(conversation._id, '/messenger/' + conversation._id)

        otherMembersIDs(conversation, uid).map(memberId => {
            return websocket.current.emit("updateConversation", {
                receiverId: memberId,
                name: conversationInfos.name,
                description: conversationInfos.description
            })
        })
        dispatch(updateConversationInfos(conversation._id, conversationInfos.name, conversationInfos.description))
        setOpen(false)
    }

    /**
     * 
     */

    const [editedPseudo, setEditedPseudo] = useState({
        key: null,
        pseudo: ""
    })

    const updatePseudo = async (userId) => {
        await doesLocationIncludesParam(conversation._id, '/messenger/' + conversation._id)

        otherMembersIDs(conversation, uid).map(memberId => {
            return websocket.current.emit("customizeConversationPseudo", {
                receiverId: memberId,
                userId: userId,
                pseudo: editedPseudo.pseudo
            })
        })
        dispatch(customizeUserPseudo(conversation._id, userId, editedPseudo.pseudo))
        setEditedPseudo({ pseudo: "", key: null })
    }

    /**
     * 
     */

    const uploadPicture = async () => {
        await doesLocationIncludesParam(conversation._id, '/messenger/' + conversation._id)

        let formData = new FormData()
        formData.append("file", conversationInfos.file)
        otherMembersIDs(conversation, uid).map(memberId => {
            return websocket.current.emit("updateConversationPicture", {
                receiverId: memberId,
                picture: `${process.env.REACT_APP_API_URL}uploads/conversations/${conversation._id}/${conversation._id}.jpg`
            })
        })
        dispatch(uploadConversationPicture(conversation._id, formData))
        setConversationInfos(infos => ({ ...infos, picture: null }))
    }

    /**
     * 
     */

    const deletePicture = async () => {
        await doesLocationIncludesParam(conversation._id, '/messenger/' + conversation._id)
        dispatch(removeConversationPicture(conversation._id))
        otherMembersIDs(conversation, uid).map(memberId => {
            return websocket.current.emit("deleteConversationPicture", {
                receiverId: memberId
            })
        })
    }

    return (
        <div className="tools-displayer-content">
            <div className="tools-choice" onClick={() => setOpen('edit')}>
                <Icon name="Article" /> Modifier les informations
            </div>
            <div className="tools-choice file_upload">
                <Icon name="Picture" /> Modifier la photo
                <input
                    type="file"
                    className="upload"
                    name="file"
                    accept=".jpg, .jpeg, .png"
                    onInput={e => setConversationInfos(infos => ({ ...infos, picture: e.target.files[0] }))}
                    onChange={uploadPicture}
                />
            </div>
            <div className="tools-choice" onClick={() => deletePicture()}>
                <Icon name="DeleteFile" /> Supprimer la photo
            </div>
            <div className="tools-choice" onClick={() => setOpen('pseudos')}>
                <Icon name="Font" /> Modifier les pseudos
            </div>

            <Modal open={open === 'edit'} setOpen={setOpen} className="edit-conversation-modal">
                <h2>Modication des informations</h2>
                <div className="mb-2 mt-4">Nom de la conversation</div>
                <ClassicInput
                    className="full"
                    placeholder="Nom de la conversation..."
                    defaultValue={conversation.name}
                    onChange={e => setConversationInfos(infos => ({ ...infos, name: (e.target.value).substring(0, 50) }))}
                />
                <div className="field_infos !w-full">
                    {conversationInfos.name.length} / 50 caractères
                </div>
                <div className="mb-2 mt-4">Description de la conversation</div>
                <Textarea
                    className="w-full"
                    placeholder="Description de la conversation..."
                    defaultValue={conversation.description}
                    onChange={(e) => setConversationInfos(infos => ({ ...infos, description: (e.target.value).substring(0, 500) }))}
                />
                <div className="field_infos !w-full">
                    {conversationInfos.description.length} / 500 caractères
                </div>
                <div className="btn-container">
                    <TextButton className="mr-2" onClick={() => setOpen(false)}>
                        Annuler
                    </TextButton>
                    <Button onClick={updateInformations}>
                        Enregistrer
                    </Button>
                </div>
            </Modal>

            <Modal open={open === 'pseudos'} setOpen={setOpen} className="custom-pseudo-modal">
                <h2>Pseudos</h2>
                <div className="conversation-members custom-scrollbar">
                    {conversation.members.map((member, key) => {
                        return (
                            <div className="conversation-member" key={key}>
                                {editedPseudo.key !== key ? (
                                    <>
                                        <div className="flex items-center">
                                            <MediumAvatar pic={member.picture} />
                                            <div>
                                                <div className="bold">
                                                    {member.pseudo}
                                                </div>
                                                <div className="f-12 txt-sec">
                                                    {member.custom_pseudo ? member.custom_pseudo : 'Définir un pseudo'}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <button onClick={() => setEditedPseudo(prevState => ({ ...prevState, key: key }))}>
                                                <Icon name="Edit" className="w-5 h-5" />
                                            </button>
                                            {member.custom_pseudo &&
                                                <button onClick={() => updatePseudo(member._id)}>
                                                    <Icon name="Trash" className="ml-3 red w-5 h-5" />
                                                </button>
                                            }
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex items-center grow">
                                        <MediumAvatar pic={member.picture} />
                                        <ClassicInput
                                            className="full small"
                                            placeholder={member.pseudo}
                                            defaultValue={member.custom_pseudo}
                                            onChange={e => setEditedPseudo(prevState => ({ ...prevState, pseudo: e.target.value }))}
                                        />
                                        <button className="ml-3" onClick={() => setEditedPseudo(prevState => ({ ...prevState, key: null }))}>
                                            <Icon name="Cross" className="w-5 h-5" />
                                        </button>
                                        {editedPseudo.pseudo.length > 0 &&
                                            <button className="ml-3" onClick={() => updatePseudo(member._id)}>
                                                <Icon name="Check" className="w-5 h-5" />
                                            </button>
                                        }
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </Modal>
        </div>
    )
}

export default GroupCustomization