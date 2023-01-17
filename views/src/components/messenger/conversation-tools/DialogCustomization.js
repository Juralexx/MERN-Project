import React, { useContext, useState } from 'react'
import Modal from '../../tools/global/Modal'
import { MessengerContext } from '../../AppContext'
import { useCheckLocation } from '../hooks/useCheckLocation'
import { customizeUserPseudo } from '../../../reducers/messenger.action'
import { otherMembersIDs } from '../functions'
import { ClassicInput } from '../../tools/global/Inputs'
import { MediumAvatar } from '../../tools/global/Avatars'
import Icon from '../../tools/icons/Icon'

const DialogCustomization = ({ conversation }) => {
    const { uid, websocket, dispatch } = useContext(MessengerContext)
    const { doesLocationIncludesParam } = useCheckLocation()

    const [pseudos, setPseudos] = useState(false)
    const [editedPseudo, setEditedPseudo] = useState({ key: null, pseudo: "" })

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

    return (
        <div className="tools-displayer-content">
            <div className="tools-choice" onClick={() => setPseudos(true)}>
                <Icon name="Font" /> Modifier les pseudos
            </div>

            <Modal open={pseudos} setOpen={setPseudos} className="custom-pseudo-modal">
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
                                            className="full"
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

export default DialogCustomization