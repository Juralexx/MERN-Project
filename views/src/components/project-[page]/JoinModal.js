import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Modal from '../tools/global/Modal'
import Checkbox from '../tools/global/Checkbox'
import { Button } from '../tools/global/Button'
import { Textarea } from '../tools/global/Inputs'
import { addOrRemoveItem, randomNbLtID } from '../Utils'
import { sendUserMemberRequest } from '../tools/functions/member'

const JoinModal = ({ open, setOpen, project, user, websocket }) => {
    const dispatch = useDispatch()

    const [request, setRequest] = useState({
        _id: randomNbLtID(24),
        requester: {
            _id: user._id,
            pseudo: user.pseudo,
            picture: user.picture
        },
        projectId: project._id,
        description: '',
        works: [],
        requestedAt: new Date().toISOString()
    })

    return (
        <Modal open={open} setOpen={setOpen} className="join-modal">
            <h2>Rejoindre le projet</h2>
            <div className='mt-4'>
                <p>Pourquoi souhaitez-vous rejoindre ce projet ?</p>
                <Textarea
                    type="text"
                    className="w-full mt-2"
                    placeholder="Descrivez pourquoi vous souhaitez rejoindre ce projet..."
                    value={request.description}
                    onChange={e => setRequest(prevState => ({ ...prevState, description: e.target.value }))}
                />
            </div>
            {project.works.length > 0 &&
                <div className='mt-6'>
                    <p className='mb-2'>Avez-vous une ou plusieurs des compétences suivantes recherchées par le créateur du projet ?</p>
                    {project.works.map((work, i) => {
                        return (
                            <div className='flex py-2' key={i}>
                                <Checkbox
                                    uniqueKey={i}
                                    className="mr-2"
                                    checked={request.works.includes(work)}
                                    onChange={() => setRequest(prevState => ({ ...prevState, works: addOrRemoveItem(request.works, work, i) }))}
                                />
                                <div>
                                    <p>{work.name}</p>
                                    <p>{work.description ? work.description : <em className='txt-sec'>Aucune description</em>}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
            <div className='btn-container'>
                <Button
                    onClick={() => {
                        sendUserMemberRequest(request, user, project, websocket, dispatch)
                        setOpen(false)
                    }}
                    disabled={request.description.length === 0}
                >
                    Envoyer ma demande
                </Button>
            </div>
        </Modal>
    )
}

export default JoinModal