import React, { useState } from 'react'
import Modal from '../../tools/global/Modal'
import { customizeUserPseudo, removeConversationPicture, updateConversationInfos, uploadConversationPicture } from '../../../actions/messenger.action'
import { ClassicInput, Textarea } from '../../tools/global/Inputs'
import { Button, TextButton } from '../../tools/global/Button'
import { MediumAvatar } from '../../tools/global/Avatars'
import { RiEdit2Fill } from 'react-icons/ri'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { IoText, IoTrashBin } from 'react-icons/io5'
import { MdCheck, MdClear, MdOutlineImage, MdOutlineImageNotSupported } from 'react-icons/md'
import { otherMembersIDs } from '../functions/function'

const Customization = ({ uid, websocket, conversation, dispatch }) => {
    const [file, setFile] = useState()
    const [edit, setEdit] = useState(false)

    const [pseudos, setPseudos] = useState(false)
    const [editPseudo, setEditPseudo] = useState(null)
    const [pseudo, setPseudo] = useState("")

    const [name, setName] = useState(conversation.name)
    const [description, setDescription] = useState(conversation.description)

    const updateInformations = async () => {
        otherMembersIDs(conversation, uid).map(memberId => {
            return websocket.current.emit("updateConversation", {
                receiverId: memberId,
                name: name,
                description: description
            })
        })
        dispatch(updateConversationInfos(conversation._id, name, description))
        setEdit(false)
    }

    const updatePseudo = (userId) => {
        otherMembersIDs(conversation, uid).map(memberId => {
            return websocket.current.emit("customizeConversationPseudo", {
                receiverId: memberId,
                userId: userId,
                pseudo: pseudo
            })
        })
        dispatch(customizeUserPseudo(conversation._id, userId, pseudo))
        setPseudo("")
        setEditPseudo(null)
    }

    const uploadPicture = () => {
        let formData = new FormData()
        formData.append("file", file)
        dispatch(uploadConversationPicture(conversation._id, formData))
        otherMembersIDs(conversation, uid).map(memberId => {
            return websocket.current.emit("updateConversationPicture", {
                receiverId: memberId,
                picture: `${process.env.REACT_APP_API_URL}uploads/conversations/${conversation._id}/${conversation._id}.jpg`
            })
        })
        setFile(null)
    }

    const deletePicture = () => {
        dispatch(removeConversationPicture(conversation._id))
        otherMembersIDs(conversation, uid).map(memberId => {
            return websocket.current.emit("deleteConversationPicture", {
                receiverId: memberId
            })
        })
    }

    return (
        <div className="tools-displayer-content">
            <div className="tools-choice" onClick={() => setEdit(true)}><HiOutlineMenuAlt2 /> Modifier les informations</div>
            <div className="tools-choice relative file_upload">
                <MdOutlineImage /> Modifier la photo
                <input type="file" className="upload" name="file" accept=".jpg, .jpeg, .png" onInput={(e) => setFile(e.target.files[0])} onChange={uploadPicture} />
            </div>
            <div className="tools-choice" onClick={() => deletePicture()}><MdOutlineImageNotSupported /> Supprimer la photo</div>
            <div className="tools-choice" onClick={() => setPseudos(true)}><IoText /> Modifier les pseudos</div>

            <Modal open={edit} setOpen={setEdit} className="edit-conversation-modal">
                <h2>Modication des informations</h2>
                <div className="w-full">
                    <div className="bold mb-2">Nom de la conversation</div>
                    <ClassicInput className="full" placeholder="Nom de la conversation..." defaultValue={conversation.name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="w-full mt-4">
                    <div className="bold mb-2">Description de la conversation</div>
                    <Textarea className="w-full" placeholder="Description de la conversation..." defaultValue={conversation.description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="flex justify-end mt-6">
                    <TextButton className="mr-2" text="Annuler" onClick={() => setEdit(false)} />
                    <Button text="Enregistrer" onClick={updateInformations} />
                </div>
            </Modal>

            <Modal open={pseudos} setOpen={setPseudos} className="custom-pseudo-modal">
                <h2>Pseudos</h2>
                <div className="conversation-members max-h-[500px] custom-scrollbar">
                    {conversation.members.map((member, key) => {
                        return (
                            <div className="conversation-member relative" key={key}>
                                {editPseudo !== key ? (
                                    <>
                                        <div className="flex items-center">
                                            <MediumAvatar pic={member.picture} />
                                            <div>
                                                <div className="bold">{member.pseudo}</div>
                                                <div className="f-12 txt-sec">{member.custom_pseudo ? member.custom_pseudo : 'Définir un pseudo'}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <button onClick={() => setEditPseudo(key)}><RiEdit2Fill className="w-5 h-5" /></button>
                                            {member.custom_pseudo &&
                                                <button onClick={() => updatePseudo(member._id)}><IoTrashBin className="ml-3 red w-5 h-5" /></button>
                                            }
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex items-center grow">
                                        <MediumAvatar pic={member.picture} />
                                        <ClassicInput className="full small" placeholder={member.pseudo} defaultValue={member.custom_pseudo} onChange={(e) => setPseudo(e.target.value)} />
                                        <button className="ml-3" onClick={() => setEditPseudo(null)}><MdClear className="w-5 h-5" /></button>
                                        <button className="ml-3" onClick={() => updatePseudo(member._id)}><MdCheck className="w-5 h-5" /></button>
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

export default Customization