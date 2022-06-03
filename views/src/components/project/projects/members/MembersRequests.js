import React from 'react'
import { useDispatch } from 'react-redux'
import { BigAvatar } from '../../../tools/global/Avatars'
import { TextButton } from '../../../tools/global/Button'
import Modal from '../../../tools/global/Modal'
import { cancelProjectMemberRequest } from '../../../tools/functions/member'
import { dateParser } from '../../../Utils'
import { BsSlashSquare } from 'react-icons/bs'

const MembersRequests = ({ open, setOpen, project, websocket }) => {
    const dispatch = useDispatch()

    return (
        <Modal open={open} setOpen={setOpen}>
            <h2>Demandes d'adhésions en cours</h2>
            <div className="member-requests">
                {project.member_requests.length > 0 ? (
                    project.member_requests.map((element, key) => {
                        return (
                            <div className="member-request" key={key}>
                                <div className="member-requests-left">
                                    <BigAvatar pic={element.picture} />
                                    <div>
                                        <div className="member-requests-pseudo">{element.pseudo}</div>
                                        <div className="member-requests-details">le {dateParser(element.date)} par {element.requester}</div>
                                    </div>
                                </div>
                                <TextButton text="Annuler" onClick={() => cancelProjectMemberRequest(element, project, websocket, dispatch)} className="ml-5" />
                            </div>
                        )
                    })
                ) : (
                    <div className="empty-requests">
                        <div><BsSlashSquare /></div>
                        <div>Vous n'avez pas de demandes en cours</div>
                    </div>
                )}
            </div>
        </Modal>
    )
}

export default MembersRequests