import React, { useState } from 'react'
import { Button, TextButton } from '../../tools/components/Button'
import { ClassicInput, Textarea } from '../../tools/components/Inputs'
import { updateConversationDescription, updateConversationName } from '../../../actions/messenger.action'
import { dateParser } from '../../Utils'
import { deleteConv, leaveConversation } from '../tools/function'

const Main = ({ uid, websocket, conversation, dispatch, setOpen }) => {
    const [name, setName] = useState(conversation.name)
    const [changeName, setChangeName] = useState(false)
    const [description, setDescription] = useState(conversation.description)
    const [changeDescription, setChangeDescription] = useState(false)

    const submitDescription = async () => {
        dispatch(updateConversationDescription(conversation._id, description))
        setChangeDescription(false)
    }
    const submitName = async () => {
        dispatch(updateConversationName(conversation._id, name))
        setChangeName(false)
    }

    return (
        <div className="conversation-infos">
            <div className="conversation-infos-bloc border-b">
                {changeName ? (
                    <div className="w-full">
                        <div className="bold mb-2">Nom</div>
                        <div className="txt-sec">
                            <ClassicInput className="full" placeholder="Nom de la conversation..." defaultValue={conversation.name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="flex justify-end py-2">
                            <TextButton className="mr-2" text="Annuler" onClick={() => setChangeName(!changeName)} />
                            <Button text="Valider" onClick={submitName} />
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="w-full">
                            <div className="bold mb-2">Nom</div>
                            <div className="txt-sec">{name !== "" && name !== undefined ? name : 'Pas encore de nom'}</div>
                        </div>
                        <div className="ml-10">
                            {conversation.owner._id === uid &&
                                <TextButton text="Modifier" onClick={() => setChangeName(!changeName)} />
                            }
                        </div>
                    </>
                )}
            </div>
            <div className="conversation-infos-bloc border-b">
                {changeDescription ? (
                    <div className="w-full">
                        <div className="bold mb-2">Description</div>
                        <div className="txt-sec">
                            <Textarea className="full" placeholder="Description de la conversation..." defaultValue={conversation.description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="flex justify-end py-2">
                            <TextButton className="mr-2" text="Annuler" onClick={() => setChangeDescription(!changeDescription)} />
                            <Button text="Valider" onClick={submitDescription} />
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="w-full">
                            <div className="bold mb-1">Description</div>
                            <div className="txt-sec">{description !== "" && description !== undefined ? description : 'Pas encore de description'}</div>
                        </div>
                        <div className="ml-10">
                            {conversation.owner._id === uid &&
                                <TextButton text="Modifier" onClick={() => setChangeDescription(!changeDescription)} />
                            }
                        </div>
                    </>
                )}
            </div>
            <div className="conversation-infos-bloc border-b">
                <div className="w-full">
                    <div className="bold mb-1">Créé par</div>
                    <div className="txt-sec">{conversation.creator.pseudo} le {dateParser(conversation.createdAt)}</div>
                </div>
            </div>
            <div className="conversation-infos-bloc">
                <div className="w-full">
                    <div className="bold mb-1">Propriétaire</div>
                    <div className="txt-sec">{conversation.owner.pseudo}</div>
                </div>
            </div>
            <div className="conversation-btn_container">
                <TextButton text="Quitter la conversation" className="mr-2" onClick={() => { leaveConversation(conversation, uid); setOpen(false) }} />
                {conversation.owner._id === uid && <Button className="delete" text="Supprimer la conversation" onClick={() => { deleteConv(conversation, uid, websocket, dispatch); setOpen(false) }} />}
            </div>
        </div>
    )
}

export default Main