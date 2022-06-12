import React, { useContext, useState } from 'react'
import Modal from '../../tools/global/Modal'
import { MessengerContext } from '../../AppContext'
import { useCheckLocation } from '../functions/useCheckLocation'
import { customizeUserPseudo } from '../../../actions/messenger.action'
import { otherMembersIDs } from '../functions/function'
import { ClassicInput } from '../../tools/global/Inputs'
import { MediumAvatar } from '../../tools/global/Avatars'
import { RiEdit2Fill } from 'react-icons/ri'
import { IoText, IoTrashBin } from 'react-icons/io5'
import { MdCheck, MdClear } from 'react-icons/md'

const DialogCustomization = ({ conversation }) => {
    const { uid, websocket, dispatch } = useContext(MessengerContext)

    const [pseudos, setPseudos] = useState(false)
    const [editPseudo, setEditPseudo] = useState(null)
    const [pseudo, setPseudo] = useState("")
    const { isParam } = useCheckLocation()

    const updatePseudo = async (userId) => {
        await isParam(conversation._id, '/messenger/' + conversation._id)

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

    return (
        <div className="tools-displayer-content">
            <div className="tools-choice" onClick={() => setPseudos(true)}><IoText /> Modifier les pseudos</div>

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
                                        {pseudo.length > 0 &&
                                            <button className="ml-3" onClick={() => updatePseudo(member._id)}><MdCheck className="w-5 h-5" /></button>
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

export default DialogCustomization