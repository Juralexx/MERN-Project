import React from 'react'
import { useDispatch } from 'react-redux'
import { BigAvatar } from '../../tools/global/Avatars'
import { Button, TextButton } from '../../tools/global/Button'
import Icon from '../../tools/icons/Icon'
import Modal from '../../tools/global/Modal'
import { cancelProjectMemberRequest, refuseProjectMemberRequest } from '../../tools/functions/member'
import { dateParser } from '../../Utils'

const MembersRequests = ({ open, setOpen, project, websocket }) => {
    const dispatch = useDispatch()

    return (
        <Modal open={open} setOpen={setOpen}>
            <h2>Demandes d'adhésion en cours</h2>
            <div className="member-requests">
                {project.member_request_sent.length > 0 || project.member_request.length > 0 ? (
                    <>
                        {project.member_request_sent.length > 0 &&
                            <>
                                <h4>Demandes envoyées</h4>
                                {project.member_request_sent.map((request, key) => {
                                    return (
                                        <div className="member-request" key={key}>
                                            <div className="member-requests-left">
                                                <BigAvatar pic={request.member.picture} />
                                                <div>
                                                    <div className="member-requests-pseudo">
                                                        {request.member.pseudo}
                                                    </div>
                                                    <div className="member-requests-details">
                                                        le {dateParser(request.requestedAt)} par {request.requester.pseudo}
                                                    </div>
                                                </div>
                                            </div>
                                            <TextButton onClick={() => cancelProjectMemberRequest(request, websocket, dispatch)} className="ml-5">
                                                Annuler
                                            </TextButton>
                                        </div>
                                    )
                                })}
                            </>
                        }
                        {project.member_request.length > 0 &&
                            <>
                                <h4>Demandes reçues</h4>
                                {project.member_request.map((request, key) => {
                                    return (
                                        <div className="member-request" key={key}>
                                            <div className="member-requests-left">
                                                <BigAvatar pic={request.requester.picture} />
                                                <div>
                                                    <div className="member-requests-pseudo">
                                                        {request.requester.pseudo}
                                                    </div>
                                                    <div className="member-requests-details">
                                                        le {dateParser(request.requestedAt)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex'>
                                                <Button className="ml-5">
                                                    Accepter
                                                </Button>
                                                <TextButton className="ml-2" onClick={() => refuseProjectMemberRequest(request, websocket, dispatch)}>
                                                    Refuser
                                                </TextButton>
                                            </div>
                                        </div>
                                    )
                                })}
                            </>
                        }
                    </>
                ) : (
                    <div className="empty-requests">
                        <Icon name="BoxEmpty" />
                        <div>Vous n'avez pas de demande en cours</div>
                    </div>
                )}
            </div>
        </Modal>
    )
}

export default MembersRequests