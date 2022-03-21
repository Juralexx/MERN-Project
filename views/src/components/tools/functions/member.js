import axios from "axios"
import { acceptMemberRequest, cancelMemberRequest, refuseMemberRequest, removeMember, sendMemberRequest } from "../../../actions/project.action"

export const sendProjectMemberRequest = (membersArray, user, project, websocket, dispatch) => {
    if (membersArray.length > 0) {
        membersArray.map(async (element) => {
            const request = {
                memberId: element.id,
                pseudo: element.pseudo,
                picture: element.picture,
                requesterId: user._id,
                requester: user.pseudo,
                date: new Date().toISOString()
            }
            const notification = {
                type: "project-member-request",
                projectId: project._id,
                projectTitle: project.title,
                projectUrl: project.titleURL,
                requesterId: user._id,
                requester: user.pseudo,
                requesterPicture: user.picture,
                date: new Date().toISOString()
            }
            return (
                websocket.current.emit("memberRequest", {
                    receiverId: element.id,
                    notification: notification
                }),
                dispatch(sendMemberRequest(element.id, project._id, notification, request))
            )
        })
    }
}

export const cancelProjectMemberRequest = (request, project, websocket, dispatch) => {
    websocket.current.emit("cancelMemberRequest", {
        type: "project-member-request",
        requesterId: request.requesterId,
        receiverId: request.memberId
    })
    dispatch(cancelMemberRequest(request.memberId, project._id, request.type))
}

export const acceptProjectMemberRequest = async (request, user, websocket, dispatch) => {
    const member = { id: user._id, pseudo: user.pseudo, picture: user.picture, role: "user", since: new Date().toISOString() }
    await axios.get(`${process.env.REACT_APP_API_URL}api/project/single/${request.projectId}`)
        .then(res => {
            res.data.members.map(async element => {
                return await websocket.current.emit("acceptMemberRequest", {
                    member: member,
                    receiverId: element.id
                })
            })
        })
    Object.assign(request, { state: "accepted" })
    dispatch(acceptMemberRequest(user._id, member, request.projectId, request.type))
}

export const refuseProjectMemberRequest = (request, user, websocket, dispatch) => {
    websocket.current.emit("refuseMemberRequest", {
        userId: user._id,
        receiverId: request.requesterId
    })
    Object.assign(request, { state: "refused" })
    dispatch(refuseMemberRequest(user._id, request.projectId, request.type))
}

export const excludeMember = (member, project, websocket) => {
    websocket.current.emit("leaveProject", {
        receiverId: member.id,
        projectId: project._id
    })
    project.members.map(element => {
        return websocket.current.emit("removeMember", {
            receiverId: element.id,
            memberId: member.id,
            projectId: project._id
        })
    })
}

export const leaveProject = (user, project, websocket, dispatch) => {
    project.members.map(async member => {
        return await websocket.current.emit("removeMember", {
            receiverId: member.id,
            memberId: user._id,
        })
    })
    websocket.current.emit("leaveProject", {
        receiverId: user._id,
        projectId: project._id
    })
    dispatch(removeMember(project._id, user._id))
}

export const getRole = (element) => {
    if (element.role === "manager") return "Manageur"
    else if (element.role === "admin") return "Administrateur"
    else return "Membre"
}