import React from 'react'
import { useDispatch } from 'react-redux'
import { cancelProjectMemberRequest } from '../../../../actions/project.action'
import { Button } from '../../../tools/components/Button'
import Modal from '../../../tools/components/Modal'
import { avatar } from '../../../tools/functions/useAvatar'
import { dateParser } from '../../../Utils'

const MembersRequests = ({ open, setOpen, project, websocket, user }) => {
    const dispatch = useDispatch()

    const cancelMemberRequest = (element) => {
        websocket.current.emit("cancelMemberProjectRequestNotification", {
            type: "project-member-request",
            requesterId: element.sender,
            receiverId: user._id
        })
        dispatch(cancelProjectMemberRequest(element.memberId, project._id, element.type))
        setOpen(false)
    }

    return (
        <Modal open={open} setOpen={setOpen} css="bg-white dark:bg-background_primary shadow-custom dark:shadow-lg">
            <div className="text-lg pb-3 px-3 mb-2 border-b border-b-slate-300/30">Demandes d'adhésions en cours</div>
            {project.member_requests.map((element, key) => {
                return (
                    <div className="relative flex justify-between items-center py-3 px-3" key={key}>
                        <div className="flex">
                            <div className="h-11 w-11 rounded-full mr-4" style={avatar(element.picture)}></div>
                            <div>
                                <div className="text-lg">{element.pseudo}</div>
                                <div className="text-xs text-gray-500 dark:text-slate-400">le {dateParser(element.date)} par {element.requester}</div>
                            </div>
                        </div>
                        <div>
                            <Button text="Annuler la demande" onClick={() => cancelMemberRequest(element)} className="ml-5" />
                        </div>
                    </div>
                )
            })}
        </Modal>
    )
}

export default MembersRequests