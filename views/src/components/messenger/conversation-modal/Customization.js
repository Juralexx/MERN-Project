import React, { useState } from 'react'
import Modal from '../../tools/components/Modal'
import { customizeUserPseudo, updateConversationInfos, uploadConversationPicture } from '../../../actions/messenger.action'
import { ClassicInput, Textarea } from '../../tools/components/Inputs'
import { Button, TextButton } from '../../tools/components/Button'
import { MediumAvatar } from '../../tools/components/Avatars'
import { RiEdit2Fill } from 'react-icons/ri'
import { BiImage } from 'react-icons/bi'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { IoText, IoTrashBin } from 'react-icons/io5'
import { MdCheck, MdClear } from 'react-icons/md'

const Customization = ({ uid, websocket, conversation, dispatch }) => {
    const [file, setFile] = useState()
    const [edit, setEdit] = useState(false)

    const [pseudos, setPseudos] = useState(false)
    const [editPseudo, setEditPseudo] = useState(null)
    const [pseudo, setPseudo] = useState("")

    const [name, setName] = useState(conversation.name)
    const [description, setDescription] = useState(conversation.description)

    const handleInformations = async () => {
        dispatch(updateConversationInfos(conversation._id, name, description))
        setEdit(false)
    }

    const handlePseudo = (memberId) => {
        dispatch(customizeUserPseudo(conversation._id, memberId, pseudo))
        setPseudo("")
        setEditPseudo(null)
    }

    const handlePicture = () => {
        let formData = new FormData()
        formData.append("file", file)
        dispatch(uploadConversationPicture(conversation._id, formData))
        setFile(null)
    }

    return (
        <>
            <div className="tools-choice" onClick={() => setEdit(true)}><HiOutlineMenuAlt2 /> Modifier les informations</div>
            <div className="tools-choice relative file_upload">
                <BiImage /> Modifier la photo
                <input type="file" className="upload" name="file" accept=".jpg, .jpeg, .png" onInput={(e) => setFile(e.target.files[0])} onChange={handlePicture} />
            </div>
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
                    <Button text="Enregistrer" onClick={handleInformations} />
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
                                                <button onClick={() => handlePseudo(member._id)}><IoTrashBin className="ml-3 red w-5 h-5" /></button>
                                            }
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex items-center grow">
                                        <MediumAvatar pic={member.picture} />
                                        <ClassicInput className="full small" placeholder={member.pseudo} defaultValue={member.custom_pseudo} onChange={(e) => setPseudo(e.target.value)} />
                                        <button className="ml-3" onClick={() => setEdit(null)}><MdClear className="w-5 h-5" /></button>
                                        <button className="ml-3" onClick={() => handlePseudo(member._id)}><MdCheck className="w-5 h-5" /></button>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </Modal>
        </>
    )
}

export default Customization