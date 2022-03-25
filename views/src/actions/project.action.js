import axios from "axios";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

export const GET_PROJECT = "GET_PROJECT"
export const UPDATE_TITLE = "UPDATE_TITLE"
export const UPDATE_TITLEURL = "UPDATE_TITLEURL"
export const UPDATE_CATEGORY = "UPDATE_CATEGORY"
export const UPDATE_CONTENT = "UPDATE_CONTENT"
export const UPDATE_LOCATION = "UPDATE_LOCATION"
export const UPDATE_NUMBEROFCONTRIBUTORS = "UPDATE_NUMBEROFCONTRIBUTORS"
export const UPDATE_WORKS = "UPDATE_WORKS"
export const UPDATE_END = "UPDATE_END"
export const UPDATE_STATE = "UPDATE_STATE"

export const LIKE = "LIKE"
export const UNLIKE = "UNLIKE"
export const FOLLOW = "FOLLOW"
export const UNFOLLOW = "UNFOLLOW"
export const FAVORITE = "FAVORITE"
export const UNFAVORITE = "UNFAVORITE"

export const REMOVE_MEMBER = "REMOVE_MEMBER"
export const REMOVE_PROJECT_FROM_MEMBER = "REMOVE_PROJECT_FROM_MEMBER"
export const RECEIVE_PROJECT_LEAVER = "RECEIVE_PROJECT_LEAVER"

export const SEND_MEMBER_REQUEST = "SEND_MEMBER_REQUEST"
export const RECEIVE_MEMBER_REQUEST = "RECEIVE_MEMBER_REQUEST"
export const CANCEL_MEMBER_REQUEST = "CANCEL_MEMBER_REQUEST"
export const RECEIVE_CANCEL_MEMBER_REQUEST = "RECEIVE_CANCEL_MEMBER_REQUEST"
export const ACCEPT_MEMBER_REQUEST = "ACCEPT_MEMBER_REQUEST"
export const RECEIVE_ACCEPT_MEMBER_REQUEST = "RECEIVE_ACCEPT_MEMBER_REQUEST"
export const REFUSE_MEMBER_REQUEST = "REFUSE_MEMBER_REQUEST"
export const RECEIVE_REFUSE_MEMBER_REQUEST = "RECEIVE_REFUSE_MEMBER_REQUEST"

export const NAME_ADMIN = "NAME_ADMIN"
export const RECEIVE_NAME_ADMIN = "RECEIVE_NAME_ADMIN"
export const UNNAME_ADMIN = "UNNAME_ADMIN"
export const RECEIVE_UNNAME_ADMIN = "RECEIVE_UNNAME_ADMIN"

export const CREATE_TASK = "CREATE_TASK"
export const RECEIVE_CREATE_TASK = "RECEIVE_CREATE_TASK"
export const UPDATE_TASK = "UPDATE_TASK"
export const RECEIVE_UPDATE_TASK = "RECEIVE_UPDATE_TASK"
export const UPDATE_TASK_STATE = "UPDATE_TASK_STATE"
export const RECEIVE_UPDATE_TASK_STATE = "RECEIVE_UPDATE_TASK_STATE"
export const UPDATE_TASK_STATUS = "UPDATE_TASK_STATUS"
export const RECEIVE_UPDATE_TASK_STATUS = "RECEIVE_UPDATE_TASK_STATUS"
export const DELETE_TASK = "DELETE_TASK"
export const RECEIVE_DELETE_TASK = "RECEIVE_DELETE_TASK"

export const getProject = (projectId) => {
    return async (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/project/single/${projectId}`)
            .then((res) => {
                dispatch({ type: GET_PROJECT, payload: res.data })
            })
            .catch((err) => console.log(err))
    }
}

export const updateState = (projectId, state) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/` + projectId,
            data: { state }
        })
            .then((res) => {
                dispatch({ type: UPDATE_STATE, payload: state })
            })
            .catch((err) => console.log(err))
    }
}

export const updateTitle = (projectId, title) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/` + projectId,
            data: { title }
        })
            .then((res) => {
                dispatch({ type: UPDATE_TITLE, payload: title })
            })
            .catch((err) => console.log(err))
    }
}

export const updateTitleURL = (projectId, titleURL) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/` + projectId,
            data: { titleURL }
        })
            .then((res) => {
                dispatch({ type: UPDATE_TITLEURL, payload: titleURL })
            })
            .catch((err) => console.log(err))
    }
}

export const updateCategory = (projectId, category) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/` + projectId,
            data: { category }
        })
            .then((res) => {
                dispatch({ type: UPDATE_CATEGORY, payload: category })
            })
            .catch((err) => console.log(err))
    }
}

export const updateContent = (projectId, content) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/` + projectId,
            data: { content }
        })
            .then((res) => {
                let callback = {}
                let deltaOps = res.data.content[0].ops
                let converter = new QuillDeltaToHtmlConverter(deltaOps, callback)
                let html = converter.convert(deltaOps)
                content = html
                dispatch({ type: UPDATE_CONTENT, payload: content })
            })
            .catch((err) => console.log(err))
    }
}

export const updateLocation = (projectId, location, department, region, new_region) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/` + projectId,
            data: { location, department, region, new_region }
        })
            .then((res) => {
                dispatch({ type: UPDATE_LOCATION, location: location, department: department, region: region, new_region: new_region })
            })
            .catch((err) => console.log(err))
    }
}

export const updateNumberofcontributors = (projectId, numberofcontributors) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/` + projectId,
            data: { numberofcontributors }
        })
            .then((res) => {
                dispatch({ type: UPDATE_NUMBEROFCONTRIBUTORS, payload: numberofcontributors })
            })
            .catch((err) => console.log(err))
    }
}

export const updateWorks = (projectId, works) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/` + projectId,
            data: { works }
        })
            .then((res) => {
                dispatch({ type: UPDATE_WORKS, payload: works })
            })
            .catch((err) => console.log(err))
    }
}

export const updateEnd = (projectId, end) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/` + projectId,
            data: { end }
        })
            .then((res) => {
                dispatch({ type: UPDATE_END, payload: end })
            })
            .catch((err) => console.log(err))
    }
}

/*******************************************************************************************************************************/
/*********************************************************** LIKE **************************************************************/

export const likeProject = (projectId, posterId) => {
    return async (dispatch) => {
        await axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/project/like/` + projectId,
            data: { id: posterId }
        })
            .then((res) => {
                dispatch({ type: LIKE, payload: { projectId, posterId } })
            })
            .catch((err) => console.log(err))
    }
}

export const unlikeProject = (projectId, userId) => {
    return async (dispatch) => {
        await axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/project/unlike/` + projectId,
            data: { id: userId }
        })
            .then((res) => {
                dispatch({ type: UNLIKE, payload: { projectId, userId } })
            })
            .catch((err) => console.log(err))
    }
}

/*******************************************************************************************************************************/
/********************************************************** FOLLOW *************************************************************/

export const followProject = (projectId, userId) => {
    return async (dispatch) => {
        await axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/project/follow/` + projectId,
            data: { followerId: userId }
        })
            .then((res) => {
                dispatch({ type: FOLLOW, payload: { projectId, userId } })
            })
            .catch((err) => console.log(err))
    }
}

export const unfollowProject = (projectId, userId) => {
    return async (dispatch) => {
        await axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/project/unfollow/` + projectId,
            data: { followerId: userId }
        })
            .then((res) => {
                dispatch({ type: UNFOLLOW, payload: { projectId, userId } })
            })
            .catch((err) => console.log(err))
    }
}

/*******************************************************************************************************************************/
/********************************************************** FAVORITES **********************************************************/

export const favoriteProject = (projectId, userId) => {
    return async (dispatch) => {
        await axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/project/favorite/` + projectId,
            data: { userId: userId }
        })
            .then((res) => {
                dispatch({ type: FAVORITE, payload: { projectId, userId } })
            })
            .catch((err) => console.log(err))
    }
}

export const unfavoriteProject = (projectId, userId) => {
    return async (dispatch) => {
        await axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/project/unfavorite/` + projectId,
            data: { userId: userId }
        })
            .then((res) => {
                dispatch({ type: UNFAVORITE, payload: { projectId, userId } })
            })
            .catch((err) => console.log(err))
    }
}

/*******************************************************************************************************************************/
/*************************************************** MEMBER REQUEST ACTION *****************************************************/

export const sendMemberRequest = (userId, projectId, notification, request) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/send-member-request/` + projectId,
            data: { userId, request, notification }
        })
            .then((res) => {
                dispatch({ type: SEND_MEMBER_REQUEST, payload: { userId, request } })
            })
            .catch((err) => console.log(err))
    }
}

export const receiveMemberRequest = (notification) => {
    return async (dispatch) => {
        dispatch({ type: RECEIVE_MEMBER_REQUEST, payload: { notification } })
    }
}

export const cancelMemberRequest = (userId, projectId, notificationId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/cancel-member-request/` + projectId,
            data: { userId, notificationId }
        })
            .then((res) => {
                dispatch({ type: CANCEL_MEMBER_REQUEST, payload: { userId } })
            })
            .catch((err) => console.log(err))
    }
}

export const receiveCancelMemberRequest = (notificationId) => {
    return async (dispatch) => {
        dispatch({ type: RECEIVE_CANCEL_MEMBER_REQUEST, payload: { notificationId } })
    }
}

export const acceptMemberRequest = (userId, member, projectId, notificationId, activity) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/accept-member-request/` + projectId,
            data: { userId, member, notificationId, activity }
        })
            .then((res) => {
                dispatch({ type: ACCEPT_MEMBER_REQUEST, payload: { userId, projectId, activity } })
            })
            .catch((err) => console.log(err))
    }
}

export const receiveAcceptMemberRequest = (member, activity) => {
    return async (dispatch) => {
        dispatch({ type: RECEIVE_ACCEPT_MEMBER_REQUEST, payload: { member, activity } })
    }
}

export const refuseMemberRequest = (userId, projectId, notificationId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/refuse-member-request/` + projectId,
            data: { userId, notificationId }
        })
            .then((res) => {
                dispatch({ type: REFUSE_MEMBER_REQUEST, payload: { userId, notificationId } })
            })
            .catch((err) => console.log(err))
    }
}

export const receiveRefuseMemberRequest = (userId) => {
    return async (dispatch) => {
        dispatch({ type: RECEIVE_REFUSE_MEMBER_REQUEST, payload: { userId } })
    }
}

/*******************************************************************************************************************************/
/******************************************************* NAME ADMIN ************************************************************/

export const setAdmin = (userId, projectId, activity) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/name-admin/` + projectId,
            data: { userId, activity }
        })
            .then((res) => {
                dispatch({ type: NAME_ADMIN, payload: { userId, activity } })
            })
            .catch((err) => console.log(err))
    }
}

export const receiveSetAdmin = (userId, activity) => {
    return async (dispatch) => {
        dispatch({ type: RECEIVE_NAME_ADMIN, payload: { userId, activity } })
    }
}

export const unsetAdmin = (userId, projectId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/remove-admin/` + projectId,
            data: { userId }
        })
            .then((res) => {
                dispatch({ type: UNNAME_ADMIN, payload: { userId } })
            })
            .catch((err) => console.log(err))
    }
}

export const receiveUnsetAdmin = (userId) => {
    return async (dispatch) => {
        dispatch({ type: RECEIVE_UNNAME_ADMIN, payload: { userId } })
    }
}

/*******************************************************************************************************************************/
/****************************************************** LEAVE PROJECT **********************************************************/

export const removeMember = (projectId, memberId, activity) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/remove-user/` + projectId,
            data: { memberId, activity }
        })
            .then((res) => {
                dispatch({ type: REMOVE_MEMBER, payload: { projectId, memberId, activity } })
            })
            .catch((err) => console.log(err))
    }
}

export const removeProjectFromMember = (projectId) => {
    return async (dispatch) => {
        dispatch({ type: REMOVE_PROJECT_FROM_MEMBER, payload: { projectId } })
    }
}

/*******************************************************************************************************************************/
/********************************************************* TASKS ***************************************************************/

export const createTask = (projectId, task, activity) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/add-task/` + projectId,
            data: { task, activity }
        })
            .then((res) => {
                dispatch({ type: CREATE_TASK, payload: { task, activity } })
            })
            .catch((err) => console.log(err))
    }
}

export const receiveCreateTask = (task, activity) => {
    return async (dispatch) => {
        dispatch({ type: RECEIVE_CREATE_TASK, payload: { task, activity } })
    }
}

export const changeTask = (projectId, task, activity) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/update-task/` + projectId,
            data: { taskId: task._id, task, activity }
        })
            .then((res) => {
                dispatch({ type: UPDATE_TASK, payload: { task, activity } })
            })
            .catch((err) => console.log(err))
    }
}

export const receiveChangeTask = (task, activity) => {
    return async (dispatch) => {
        dispatch({ type: RECEIVE_UPDATE_TASK, payload: { task, activity } })
    }
}

export const changeTaskState = (projectId, taskId, state, activity) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/update-task/` + projectId,
            data: { taskId, state, activity }
        })
            .then((res) => {
                dispatch({ type: UPDATE_TASK_STATE, payload: { taskId, state, activity } })
            })
            .catch((err) => console.log(err))
    }
}

export const receiveChangeTaskState = (taskId, state, activity) => {
    return async (dispatch) => {
        dispatch({ type: RECEIVE_UPDATE_TASK_STATE, payload: { taskId, state, activity } })
    }
}

export const changeTaskStatus = (projectId, taskId, status, activity) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/update-task/` + projectId,
            data: { taskId, status, activity }
        })
            .then((res) => {
                dispatch({ type: UPDATE_TASK_STATUS, payload: { taskId, status, activity } })
            })
            .catch((err) => console.log(err))
    }
}

export const receiveChangeTaskStatus = (taskId, status, activity) => {
    return async (dispatch) => {
        dispatch({ type: RECEIVE_UPDATE_TASK_STATUS, payload: { taskId, status, activity } })
    }
}

export const deleteTask = (projectId, taskId, activity) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/delete-task/` + projectId,
            data: { taskId, activity }
        })
            .then((res) => {
                dispatch({ type: DELETE_TASK, payload: { taskId, activity } })
            })
            .catch((err) => console.log(err))
    }
}

export const receiveDeleteTask = (taskId, activity) => {
    return async (dispatch) => {
        dispatch({ type: RECEIVE_DELETE_TASK, payload: { taskId, activity } })
    }
}