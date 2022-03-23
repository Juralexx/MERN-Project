import axios from "axios"
import { acceptMemberRequest, cancelMemberRequest, refuseMemberRequest, removeMember, sendMemberRequest, setAdmin, unsetAdmin } from "../../../actions/project.action"

/***************************************************************************************************************************************************/
/****************************************************************** REQUEST ************************************************************************/

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
    const activity = { type: "join-project", who: user.pseudo, date: new Date().toISOString() }
    const member = { id: user._id, pseudo: user.pseudo, picture: user.picture, role: "user", since: new Date().toISOString() }
    await axios.get(`${process.env.REACT_APP_API_URL}api/project/single/${request.projectId}`)
        .then(res => {
            res.data.members.map(async element => {
                return await websocket.current.emit("acceptMemberRequest", {
                    member: member,
                    receiverId: element.id,
                    activity: activity
                })
            })
        })
    Object.assign(request, { state: "accepted" })
    dispatch(acceptMemberRequest(user._id, member, request.projectId, request.type, activity))
}

export const refuseProjectMemberRequest = (request, user, websocket, dispatch) => {
    websocket.current.emit("refuseMemberRequest", {
        userId: user._id,
        receiverId: request.requesterId
    })
    Object.assign(request, { state: "refused" })
    dispatch(refuseMemberRequest(user._id, request.projectId, request.type))
}

/***************************************************************************************************************************************************/
/************************************************************* EXCLUDE / LEAVE *********************************************************************/

export const excludeMember = (member, user, project, websocket) => {
    const activity = { type: "exclude-from-project", who: user, excluded: member.pseudo, date: new Date().toISOString() }
    websocket.current.emit("leaveProject", {
        receiverId: member.id,
        projectId: project._id
    })
    project.members.map(element => {
        return websocket.current.emit("removeMember", {
            receiverId: element.id,
            memberId: member.id,
            projectId: project._id,
            activity: activity
        })
    })
}

export const leaveProject = (user, project, websocket, dispatch) => {
    const activity = { type: "leave-project", leaver: user.pseudo, date: new Date().toISOString() }
    project.members.map(async member => {
        return await websocket.current.emit("removeMember", {
            receiverId: member.id,
            memberId: user._id,
            activity: activity
        })
    })
    websocket.current.emit("leaveProject", {
        receiverId: user._id,
        projectId: project._id
    })
    dispatch(removeMember(project._id, user._id))
}

/***************************************************************************************************************************************************/
/****************************************************************** FUNCTIONS **********************************************************************/

export const getRole = (element) => {
    if (element.role === "manager") return "Manageur"
    else if (element.role === "admin") return "Administrateur"
    else return "Membre"
}

export const addMemberToArray = (element, user, array, setArray) => {
    let userProperties = {
        id: element._id,
        pseudo: element.pseudo,
        picture: element.picture,
        requesterId: user._id,
        requester: user.pseudo,
        date: new Date().toISOString()
    }
    if (!array.some(member => member.id === element._id)) {
        setArray(array => [...array, userProperties])
    } else {
        let arr = array.filter(member => member.id !== element._id && member.pseudo !== element.pseudo)
        setArray(arr)
    }
}

export const removeMemberFromArray = (element, array, setArray) => {
    let arr = array.filter(member => member.id !== element.id)
    setArray(arr)
}

export const highlightIt = (array, element, isInResult, search) => {
    return ({
        background: array.some(member => member.id === element._id) ? "#6366f1" : "",
        display: search ? (isInResult.includes(element) ? "flex" : "none") : ("flex")
    })
}

/***************************************************************************************************************************************************/
/******************************************************************** ADMIN ************************************************************************/

export const nameAdmin = (member, project, user, websocket, dispatch) => {
    const activity = { type: "name-admin", who: user.pseudo, newAdmin: member.pseudo, date: new Date().toISOString() }
    const members = project.members.filter(member => member.id !== user._id)
    members.map(async member => {
        return await websocket.current.emit("nameAdmin", {
            receiverId: member.id,
            userId: member.id,
            activity: activity
        })
    })
    dispatch(setAdmin(member.id, project._id, activity))
}

export const removeAdmin = (member, project, user, websocket, dispatch) => {
    const members = project.members.filter(member => member.id !== user._id)
    members.map(async member => {
        return await websocket.current.emit("removeAdmin", {
            receiverId: member.id,
            userId: member.id,
        })
    })
    dispatch(unsetAdmin(member.id, project._id))
}