import axios from "axios";

export const GET_PROJECT = "GET_PROJECT"

export const UPDATE_PICTURES = "UPDATE_PICTURES"
export const RECEIVE_UPDATE_PICTURES = "RECEIVE_UPDATE_PICTURES"
export const DELETE_PICTURES = "DELETE_PICTURES"
export const RECEIVE_DELETE_PICTURES = "RECEIVE_DELETE_PICTURES"

export const UPDATE_PROJECT = "UPDATE_PROJECT"

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
               .get(`${process.env.REACT_APP_API_URL}api/project/${projectId}`)
               .then(res => {
                    dispatch({ type: GET_PROJECT, payload: res.data })
               })
               .catch(err => console.error(err))
     }
}

/*******************************************************************************************************************************/
/********************************************************* PICTURES ************************************************************/

export const updateProjectPictures = (projectId, formData, pictures) => {
     return async (dispatch) => {
          await axios
               .put(`${process.env.REACT_APP_API_URL}api/project/update-pictures/${projectId}`, formData)
               .then(() => {
                    dispatch({ type: UPDATE_PICTURES, payload: { pictures } })
               })
               .catch(err => console.error(err))
     }
}

export const receiveUpdateProjectPictures = (pictures) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_UPDATE_PICTURES, payload: { pictures } })
     }
}

export const deleteProjectPictures = (projectId, picture) => {
     return async (dispatch) => {
          await axios({
               method: "put",
               url: `${process.env.REACT_APP_API_URL}api/project/delete-pictures/` + projectId,
               data: { picture }
          })
               .then(() => {
                    dispatch({ type: DELETE_PICTURES, payload: { projectId, picture } })
               })
               .catch(err => console.error(err))
     }
}

export const receiveDeleteProjectPictures = (picture) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_DELETE_PICTURES, payload: { picture } })
     }
}

/*******************************************************************************************************************************/
/******************************************************* INFORMATIONS **********************************************************/

export const updateProject = (projectId, title, url, subtitle, category, tags, state, location, department, region, new_region, description, numberofcontributors, end, works, content) => {
     return async (dispatch) => {
          await axios({
               method: "put",
               url: `${process.env.REACT_APP_API_URL}api/project/` + projectId,
               data: { title, url, subtitle, category, tags, state, location, department, region, new_region, description, numberofcontributors, end, works, content }
          })
               .then(() => {
                    dispatch({ type: UPDATE_PROJECT, payload: { title, url, subtitle, category, state, location, department, region, new_region, description, numberofcontributors, end, works, content } })
               })
               .catch(err => console.error(err))
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
               .then(() => {
                    dispatch({ type: LIKE, payload: { projectId, posterId } })
               })
               .catch(err => console.error(err))
     }
}

export const unlikeProject = (projectId, userId) => {
     return async (dispatch) => {
          await axios({
               method: "patch",
               url: `${process.env.REACT_APP_API_URL}api/project/unlike/` + projectId,
               data: { id: userId }
          })
               .then(() => {
                    dispatch({ type: UNLIKE, payload: { projectId, userId } })
               })
               .catch(err => console.error(err))
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
               .then(() => {
                    dispatch({ type: FOLLOW, payload: { projectId, userId } })
               })
               .catch(err => console.error(err))
     }
}

export const unfollowProject = (projectId, userId) => {
     return async (dispatch) => {
          await axios({
               method: "patch",
               url: `${process.env.REACT_APP_API_URL}api/project/unfollow/` + projectId,
               data: { followerId: userId }
          })
               .then(() => {
                    dispatch({ type: UNFOLLOW, payload: { projectId, userId } })
               })
               .catch(err => console.error(err))
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
               .then(() => {
                    dispatch({ type: FAVORITE, payload: { projectId, userId } })
               })
               .catch(err => console.error(err))
     }
}

export const unfavoriteProject = (projectId, userId) => {
     return async (dispatch) => {
          await axios({
               method: "patch",
               url: `${process.env.REACT_APP_API_URL}api/project/unfavorite/` + projectId,
               data: { userId: userId }
          })
               .then(() => {
                    dispatch({ type: UNFAVORITE, payload: { projectId, userId } })
               })
               .catch(err => console.error(err))
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
               .then(() => {
                    dispatch({ type: SEND_MEMBER_REQUEST, payload: { userId, request } })
               })
               .catch(err => console.error(err))
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
               .then(() => {
                    dispatch({ type: CANCEL_MEMBER_REQUEST, payload: { userId } })
               })
               .catch(err => console.error(err))
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
               .then(() => {
                    dispatch({ type: ACCEPT_MEMBER_REQUEST, payload: { userId, projectId, activity } })
               })
               .catch(err => console.error(err))
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
               .then(() => {
                    dispatch({ type: REFUSE_MEMBER_REQUEST, payload: { userId, notificationId } })
               })
               .catch(err => console.error(err))
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
               .then(() => {
                    dispatch({ type: NAME_ADMIN, payload: { userId, activity } })
               })
               .catch(err => console.error(err))
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
               .then(() => {
                    dispatch({ type: UNNAME_ADMIN, payload: { userId } })
               })
               .catch(err => console.error(err))
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
               .then(() => {
                    dispatch({ type: REMOVE_MEMBER, payload: { projectId, memberId, activity } })
               })
               .catch(err => console.error(err))
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
               .then(() => {
                    dispatch({ type: CREATE_TASK, payload: { task, activity } })
               })
               .catch(err => console.error(err))
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
               .then(() => {
                    dispatch({ type: UPDATE_TASK, payload: { task, activity } })
               })
               .catch(err => console.error(err))
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
               .then(() => {
                    dispatch({ type: UPDATE_TASK_STATE, payload: { taskId, state, activity } })
               })
               .catch(err => console.error(err))
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
               .then(() => {
                    dispatch({ type: UPDATE_TASK_STATUS, payload: { taskId, status, activity } })
               })
               .catch(err => console.error(err))
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
               .then(() => {
                    dispatch({ type: DELETE_TASK, payload: { taskId, activity } })
               })
               .catch(err => console.error(err))
     }
}

export const receiveDeleteTask = (taskId, activity) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_DELETE_TASK, payload: { taskId, activity } })
     }
}