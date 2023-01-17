import axios from "axios"
import { acceptMemberRequest, cancelMemberRequest, refuseMemberRequest, removeMember, sendMemberRequest, setAdmin, unsetAdmin } from "../../../reducers/project.action"
import { randomID } from "../../Utils"

/**
 * Send member request
 * @param {*} membersArray Members array to send request to
 * @param {*} user User that send request
 * @param {*} project Project
 * @param {*} websocket Websocket
 * @param {*} dispatch Redux dispatch function
 */

export const sendProjectMemberRequest = (membersArray, user, project, websocket, dispatch) => {
    const randomid = randomID(24)
    if (membersArray.length > 0) {
        membersArray.map(async (element) => {
            const request = {
                memberId: element._id,
                pseudo: element.pseudo,
                picture: element.picture,
                requesterId: user._id,
                requester: user.pseudo,
                date: new Date().toISOString(),
                notificationId: randomid,
            }
            const notification = {
                _id: randomid,
                type: "project-member-request",
                projectId: project._id,
                projectTitle: project.title,
                projectUrl: project.URL,
                requesterId: user._id,
                requester: user.pseudo,
                requesterPicture: user.picture,
                date: new Date().toISOString(),
                seen: false
            }
            return (
                websocket.current.emit("memberRequest", {
                    receiverId: element._id,
                    notification: notification
                }),
                dispatch(sendMemberRequest(element._id, project._id, notification, request))
            )
        })
    }
}

/**
 * Cancel member request sent
 * @param {*} request Request object
 * @param {*} project Project of the request
 * @param {*} websocket Websocket
 * @param {*} dispatch Redux dispatch function
 */

export const cancelProjectMemberRequest = (request, project, websocket, dispatch) => {
    websocket.current.emit("cancelMemberRequest", {
        notificationId: request.notificationId,
        receiverId: request.memberId
    })
    dispatch(cancelMemberRequest(request.memberId, project._id, request.notificationId))
}

/**
 * Accept member request
 * @param {*} notification Notification object
 * @param {*} user User that accept request
 * @param {*} websocket Websocket
 * @param {*} dispatch Redux dispatch function
 */

export const acceptProjectMemberRequest = async (notification, user, websocket, dispatch) => {
    const activity = { type: "join-project", who: user.pseudo, date: new Date().toISOString() }
    const member = { _id: user._id, pseudo: user.pseudo, picture: user.picture, role: "user", since: new Date().toISOString() }
    await axios.get(`${process.env.REACT_APP_API_URL}api/project/${notification.projectId}`)
        .then(res => {
            res.data.members.map(async element => {
                return await websocket.current.emit("acceptMemberRequest", {
                    member: member,
                    receiverId: element._id,
                    activity: activity
                })
            })
        })
    Object.assign(notification, { state: "accepted" })
    dispatch(acceptMemberRequest(user._id, member, notification.projectId, notification.notificationId, activity))
}

/**
 * Refuse member request
 * @param {*} notification Notification object
 * @param {*} user User that accept request
 * @param {*} websocket Websocket
 * @param {*} dispatch Redux dispatch function
 */

export const refuseProjectMemberRequest = (notification, user, websocket, dispatch) => {
    websocket.current.emit("refuseMemberRequest", {
        userId: user._id,
        receiverId: notification.requesterId
    })
    dispatch(refuseMemberRequest(user._id, notification.projectId, notification._id))
}

/**
 * Exclude member from project
 * @param {*} member Member to exclude
 * @param {*} user User that excludes
 * @param {*} project Project to excluse from
 * @param {*} websocket Websocket
 */

export const excludeMember = (member, user, project, websocket) => {
    const activity = {
        type: "exclude-from-project",
        who: user,
        excluded: member.pseudo,
        date: new Date().toISOString()
    }
    websocket.current.emit("leaveProject", {
        receiverId: member._id,
        projectId: project._id
    })
    const members = project.members.filter(element => element._id !== member._id)
    members.map(element => {
        return websocket.current.emit("removeMember", {
            receiverId: element._id,
            memberId: member._id,
            projectId: project._id,
            activity: activity
        })
    })
}

/**
 * Leave project
 * @param {*} user User that leaves projects
 * @param {*} project Project to leave from
 * @param {*} websocket Websocket
 * @param {*} dispatch Redux dispatch function
 */

export const leaveProject = (user, project, websocket, dispatch) => {
    const activity = { type: "leave-project", leaver: user.pseudo, date: new Date().toISOString() }
    project.members.map(async member => {
        return await websocket.current.emit("removeMember", {
            receiverId: member._id,
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

/**
 * Return member role
 * @param {*} element Member to search role from
 */

export const returnMemberRole = (element) => {
    switch (element.role) {
        case "manager":
            return "Manageur"
        case "admin":
            return "Administrateur"
        default:
            return "Membre"
    }
}

/**
 * Add or remove member to array on selection
 * @param {*} element Member to to add or remove
 * @param {*} user User that select member
 * @param {*} array Array to add member in
 */

export const addMemberToArray = (element, user, array) => {
    let userProperties = {
        _id: element._id,
        pseudo: element.pseudo,
        picture: element.picture,
        requesterId: user._id,
        requester: user.pseudo,
        date: new Date().toISOString()
    }
    if (!array.some(member => member._id === element._id)) {
        return [...array, userProperties]
    } else {
        let arr = array.filter(member => member._id !== element._id && member.pseudo !== element.pseudo)
        return arr
    }
}

/**
 * Remove selected member from array
 * @param {*} element Member to remove
 * @param {*} array Array to remove from
 */

export const removeMemberFromArray = (element, array) => {
    let arr = array.filter(member => member._id !== element._id)
    return arr
}

/**
 * Check if user is in search results
 * @param {*} element User to check
 * @param {*} results Search results
 * @param {*} search Is search active
 * @param {*} classe Class to add if user is in results
 */

export const isUserInSearchResults = (element, results, search, classe) => {
    if (search) {
        for (let i = 0; i < results.length; i++) {
            if (results[i].pseudo === element.pseudo) {
                return classe
            } else {
                return '!hidden'
            }
        }
    }
}

/**
 * Check if element is selected
 * @param {*} array Array to search in
 * @param {*} element Element to check
 */

export const isSelected = (array, element) => {
    if (array.some(member => member._id === element._id))
        return "selected"
}

/**
 * Add admin role to selected member
 * @param {*} member Member whose role needs to be changed
 * @param {*} project Project
 * @param {*} user User that changes role
 * @param {*} websocket Websocket
 * @param {*} dispatch Redux dispatch function
 */

export const nameAdmin = (member, project, user, websocket, dispatch) => {
    const activity = { type: "name-admin", who: user.pseudo, new_admin: member.pseudo, date: new Date().toISOString() }
    const members = project.members.filter(member => member._id !== user._id)
    members.map(async member => {
        return await websocket.current.emit("nameAdmin", {
            receiverId: member._id,
            userId: member._id,
            activity: activity
        })
    })
    dispatch(setAdmin(member._id, project._id, activity))
}

/**
 * Remove admin role to selected member
 * @param {*} member Member whose role needs to be changed
 * @param {*} project Project
 * @param {*} user User that changes role
 * @param {*} websocket Websocket
 * @param {*} dispatch Redux dispatch function
 */

export const removeAdmin = (member, project, user, websocket, dispatch) => {
    const members = project.members.filter(member => member._id !== user._id)
    members.map(async member => {
        return await websocket.current.emit("removeAdmin", {
            receiverId: member._id,
            userId: member._id,
        })
    })
    dispatch(unsetAdmin(member._id, project._id))
}

/**
 * Sort members array by date in chronological order
 * @param {*} members Members array
 */

export const sortByRecent = (members) => {
    const array = members.sort((a, b) => { return new Date(b.since) - new Date(a.since) })
    return array
}

/**
 * Sort members array by date in unchronological order
 * @param {*} members Members array
 */

export const sortByOld = (members) => {
    const array = members.sort((a, b) => { return new Date(a.since) - new Date(b.since) })
    return array
}

/**
 * Sort members array by roles
 * @param {*} members Members array
 */

export const sortByRole = (members) => {
    const manager = members.filter(element => element.role === "manager")
    const admins = members.filter(element => element.role === "admin")
    const users = members.filter(element => element.role === "user")
    return manager.concat(admins, users)
}

/**
 * Sort members by alphabetical order
 * @param {*} members Members array
 */

export const sortByAlpha = (members) => {
    const array = members.sort((a, b) => { return a.pseudo.toString().localeCompare(b.pseudo.toString()) })
    return array
}