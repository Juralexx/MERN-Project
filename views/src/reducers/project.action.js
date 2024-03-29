import axios from "axios";

export const GET_PROJECT = "GET_PROJECT"

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

export const UPDATE_PICTURES = "UPDATE_PICTURES"

export const updateProjectPictures = (projectId, formData, pictures) => {
     return async (dispatch) => {
          await axios
               .put(`${process.env.REACT_APP_API_URL}api/project/${projectId}/uploads/pictures/update/`, formData)
               .then(() => dispatch({ type: UPDATE_PICTURES, payload: { pictures } }))
               .catch(err => console.error(err))
     }
}

export const RECEIVE_UPDATE_PICTURES = "RECEIVE_UPDATE_PICTURES"

export const receiveUpdateProjectPictures = (pictures) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_UPDATE_PICTURES, payload: { pictures } })
     }
}

export const DELETE_PICTURES = "DELETE_PICTURES"

export const deleteProjectPictures = (projectId, picture) => {
     return async (dispatch) => {
          await axios({
               method: "put",
               url: `${process.env.REACT_APP_API_URL}api/project/${projectId}/uploads/pictures/delete/`,
               data: { picture }
          })
               .then(() => dispatch({ type: DELETE_PICTURES, payload: { projectId, picture } }))
               .catch(err => console.error(err))
     }
}

export const RECEIVE_DELETE_PICTURES = "RECEIVE_DELETE_PICTURES"

export const receiveDeleteProjectPictures = (picture) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_DELETE_PICTURES, payload: { picture } })
     }
}

export const UPDATE_PROJECT = "UPDATE_PROJECT"

/**
 * Update projet function
 * @param {*} projectId 
 * @param {*} title 
 * @param {*} url 
 * @param {*} subtitle 
 * @param {*} category 
 * @param {*} tags 
 * @param {*} state 
 * @param {*} location 
 * @param {*} description 
 * @param {*} end 
 * @param {*} works 
 * @param {*} content 
 */

export const updateProject = (projectId, title, url, subtitle, category, tags, state, location, description, end, works, content, networks) => {
     return async (dispatch) => {
          await axios({
               method: "put",
               url: `${process.env.REACT_APP_API_URL}api/project/` + projectId,
               data: {
                    title,
                    url,
                    subtitle,
                    category,
                    tags,
                    state,
                    location,
                    description,
                    end,
                    works,
                    content,
                    networks
               }
          })
               .then(() => dispatch({
                    type: UPDATE_PROJECT,
                    payload: {
                         title,
                         url,
                         subtitle,
                         category,
                         tags,
                         state,
                         location,
                         description,
                         end,
                         works,
                         content,
                         networks
                    }
               }))
               .catch(err => console.error(err))
     }
}

export const LIKE = "LIKE"

/**
 * Like projet function
 * @param {*} projectId Project ID
 * @param {*} userId User ID
 */

export const likeProject = (projectId, userId) => {
     return async (dispatch) => {
          await axios({
               method: "patch",
               url: `${process.env.REACT_APP_API_URL}api/project/${projectId}/like/`,
               data: {
                    userId: userId
               }
          })
               .then(() => dispatch({ type: LIKE, payload: { projectId, userId } }))
               .catch(err => console.error(err))
     }
}

export const UNLIKE = "UNLIKE"

/**
 * Unlike projet function
 * @param {*} projectId Project ID
 * @param {*} userId User ID
 */

export const unlikeProject = (projectId, userId) => {
     return async (dispatch) => {
          await axios({
               method: "patch",
               url: `${process.env.REACT_APP_API_URL}api/project/${projectId}/unlike/`,
               data: {
                    userId: userId
               }
          })
               .then(() => dispatch({ type: UNLIKE, payload: { projectId, userId } }))
               .catch(err => console.error(err))
     }
}

export const FOLLOW = "FOLLOW"

/**
 * Follow projet function
 * @param {*} projectId Project ID
 * @param {*} userId User ID
 */

export const followProject = (projectId, userId) => {
     return async (dispatch) => {
          await axios({
               method: "patch",
               url: `${process.env.REACT_APP_API_URL}api/project/${projectId}/follow/`,
               data: {
                    userId: userId
               }
          })
               .then(() => dispatch({ type: FOLLOW, payload: { projectId, userId } }))
               .catch(err => console.error(err))
     }
}

export const UNFOLLOW = "UNFOLLOW"

/**
 * Unfollow projet function
 * @param {*} projectId Project ID
 * @param {*} userId User ID
 */

export const unfollowProject = (projectId, userId) => {
     return async (dispatch) => {
          await axios({
               method: "patch",
               url: `${process.env.REACT_APP_API_URL}api/project/${projectId}/unfollow/`,
               data: {
                    userId: userId
               }
          })
               .then(() => dispatch({ type: UNFOLLOW, payload: { projectId, userId } }))
               .catch(err => console.error(err))
     }
}

export const FAVORITE = "FAVORITE"

/**
 * Add projet to favorites function
 * @param {*} projectId Project ID
 * @param {*} userId User ID
 */

export const favoriteProject = (projectId, userId) => {
     return async (dispatch) => {
          await axios({
               method: "patch",
               url: `${process.env.REACT_APP_API_URL}api/project/${projectId}/favorite/`,
               data: {
                    userId: userId
               }
          })
               .then(() => dispatch({ type: FAVORITE, payload: { projectId, userId } }))
               .catch(err => console.error(err))
     }
}

export const UNFAVORITE = "UNFAVORITE"

/**
 * Remove projet from favorites function
 * @param {*} projectId Project ID
 * @param {*} userId User ID
 */

export const unfavoriteProject = (projectId, userId) => {
     return async (dispatch) => {
          await axios({
               method: "patch",
               url: `${process.env.REACT_APP_API_URL}api/project/${projectId}/unfavorite/`,
               data: {
                    userId: userId
               }
          })
               .then(() => dispatch({ type: UNFAVORITE, payload: { projectId, userId } }))
               .catch(err => console.error(err))
     }
}

/**
 * Members request from the project
 */

export const SEND_MEMBER_REQUEST_FROM_PROJECT = "SEND_MEMBER_REQUEST_FROM_PROJECT"

/**
 * Send a member request from an already project member
 * @param {*} userId User that will receive the member request
 * @param {*} projectId Project ID
 * @param {*} request Request object to send
 * @param {*} notification Notification object to send
 */

export const sendMemberRequestFromProject = (userId, projectId, request, notification) => {
     return async (dispatch) => {
          await axios({
               method: "put",
               url: `${process.env.REACT_APP_API_URL}api/project/${projectId}/members/request/send/`,
               data: {
                    userId,
                    request,
                    notification
               }
          })
               .then(() => dispatch({ type: SEND_MEMBER_REQUEST_FROM_PROJECT, payload: { request } }))
               .catch(err => console.error(err))
     }
}

export const RECEIVE_MEMBER_REQUEST_FROM_PROJECT = "RECEIVE_MEMBER_REQUEST_FROM_PROJECT"

export const receiveMemberRequestFromProject = (request, notification) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_MEMBER_REQUEST_FROM_PROJECT, payload: { request, notification } })
     }
}

export const CANCEL_MEMBER_REQUEST_FROM_PROJECT = "CANCEL_MEMBER_REQUEST_FROM_PROJECT"

/**
 * Cancel the member request sent from the project
 * @param {*} request Request object to cancel
 */

export const cancelMemberRequestFromProject = (request) => {
     return async (dispatch) => {
          await axios({
               method: "put",
               url: `${process.env.REACT_APP_API_URL}api/project/${request.projectId}/members/request/cancel/${request._id}/`,
               data: {
                    userId: request.member._id,
                    notificationId: request.notificationId
               }
          })
               .then(() => dispatch({ type: CANCEL_MEMBER_REQUEST_FROM_PROJECT, payload: { requestId: request._id } }))
               .catch(err => console.error(err))
     }
}

export const RECEIVE_CANCEL_MEMBER_REQUEST_FROM_PROJECT = "RECEIVE_CANCEL_MEMBER_REQUEST_FROM_PROJECT"

export const receiveCancelMemberRequestFromProject = (requestId, notificationId) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_CANCEL_MEMBER_REQUEST_FROM_PROJECT, payload: { requestId, notificationId } })
     }
}

export const ACCEPT_MEMBER_REQUEST = "ACCEPT_MEMBER_REQUEST"

export const acceptMemberRequestFromProject = (userId, member, projectId, notificationId, activity) => {
     return async (dispatch) => {
          await axios({
               method: "put",
               url: `${process.env.REACT_APP_API_URL}api/project/${projectId}/members/request/accept/`,
               data: { userId, member, notificationId, activity }
          })
               .then(() => dispatch({ type: ACCEPT_MEMBER_REQUEST, payload: { userId, projectId, activity } }))
               .catch(err => console.error(err))
     }
}

export const RECEIVE_ACCEPT_MEMBER_REQUEST = "RECEIVE_ACCEPT_MEMBER_REQUEST"

export const receiveAcceptMemberRequestFromProject = (member, activity) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_ACCEPT_MEMBER_REQUEST, payload: { member, activity } })
     }
}

export const REFUSE_MEMBER_REQUEST_FROM_PROJECT = "REFUSE_MEMBER_REQUEST_FROM_PROJECT"

/**
 * Cancel the member request sent from a user
 * @param {*} request Request object
 */

export const refuseMemberRequestFromProject = (request) => {
     return async (dispatch) => {
          await axios({
               method: "put",
               url: `${process.env.REACT_APP_API_URL}api/project/${request.projectId}/members/request/refuse/${request._id}`,
               data: {
                    userId: request.requester._id,
                    notificationId: request.notificationId
               }
          })
               .then(() => dispatch({ type: REFUSE_MEMBER_REQUEST_FROM_PROJECT, payload: { requestId: request._id } }))
               .catch(err => console.error(err))
     }
}

export const RECEIVE_REFUSE_MEMBER_REQUEST_FROM_PROJECT = "RECEIVE_REFUSE_MEMBER_REQUEST_FROM_PROJECT"

export const receiveRefuseMemberRequestFromProject = (requestId) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_REFUSE_MEMBER_REQUEST_FROM_PROJECT, payload: { requestId } })
     }
}

/*******************************************************************************************************************************/
/******************************************************* NAME ADMIN ************************************************************/

export const NAME_ADMIN = "NAME_ADMIN"

export const setAdmin = (userId, projectId, activity) => {
     return async (dispatch) => {
          await axios({
               method: "put",
               url: `${process.env.REACT_APP_API_URL}api/project/${projectId}/members/admins/add/`,
               data: { userId, activity }
          })
               .then(() => dispatch({ type: NAME_ADMIN, payload: { userId, activity } }))
               .catch(err => console.error(err))
     }
}

export const RECEIVE_NAME_ADMIN = "RECEIVE_NAME_ADMIN"

export const receiveSetAdmin = (userId, activity) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_NAME_ADMIN, payload: { userId, activity } })
     }
}

export const UNNAME_ADMIN = "UNNAME_ADMIN"

export const unsetAdmin = (userId, projectId) => {
     return async (dispatch) => {
          await axios({
               method: "put",
               url: `${process.env.REACT_APP_API_URL}api/project/${projectId}/members/admins/remove/`,
               data: { userId }
          })
               .then(() => dispatch({ type: UNNAME_ADMIN, payload: { userId } }))
               .catch(err => console.error(err))
     }
}

export const RECEIVE_UNNAME_ADMIN = "RECEIVE_UNNAME_ADMIN"

export const receiveUnsetAdmin = (userId) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_UNNAME_ADMIN, payload: { userId } })
     }
}

/*******************************************************************************************************************************/
/****************************************************** LEAVE PROJECT **********************************************************/

export const REMOVE_MEMBER = "REMOVE_MEMBER"

export const removeMember = (projectId, memberId, activity) => {
     return async (dispatch) => {
          await axios({
               method: "put",
               url: `${process.env.REACT_APP_API_URL}api/project/${projectId}/members/remove/`,
               data: { memberId, activity }
          })
               .then(() => dispatch({ type: REMOVE_MEMBER, payload: { projectId, memberId, activity } }))
               .catch(err => console.error(err))
     }
}
export const REMOVE_PROJECT_FROM_MEMBER = "REMOVE_PROJECT_FROM_MEMBER"

export const removeProjectFromMember = (projectId) => {
     return async (dispatch) => {
          dispatch({ type: REMOVE_PROJECT_FROM_MEMBER, payload: { projectId } })
     }
}

/*******************************************************************************************************************************/
/********************************************************* TASKS ***************************************************************/

export const RECEIVE_CREATE_TASK = "RECEIVE_CREATE_TASK"

export const receiveCreateTask = (task, activity) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_CREATE_TASK, payload: { task, activity } })
     }
}

export const RECEIVE_UPDATE_TASK = "RECEIVE_UPDATE_TASK"

export const receiveChangeTask = (task, activity) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_UPDATE_TASK, payload: { task, activity } })
     }
}

export const RECEIVE_UPDATE_TASK_STATE = "RECEIVE_UPDATE_TASK_STATE"

export const receiveChangeTaskState = (taskId, state, activity) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_UPDATE_TASK_STATE, payload: { taskId, state, activity } })
     }
}

export const RECEIVE_COMMENT_TASK = "RECEIVE_COMMENT_TASK"

export const receiveCommentTask = (taskId, comment) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_COMMENT_TASK, payload: { taskId, comment } })
     }
}

export const RECEIVE_DELETE_TASK = "RECEIVE_DELETE_TASK"

export const receiveDeleteTask = (taskId, activity) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_DELETE_TASK, payload: { taskId, activity } })
     }
}

/**
 * QNA
 */

export const RECEIVE_CREATE_QNA = "RECEIVE_CREATE_QNA"

export const receiveCreateQNA = (qna, activity) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_CREATE_QNA, payload: { qna, activity } })
     }
}

export const RECEIVE_UPDATE_QNA = "RECEIVE_UPDATE_QNA"

export const receiveUpdateQNA = (qna, activity) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_UPDATE_QNA, payload: { qna, activity } })
     }
}

export const RECEIVE_DELETE_QNA = "RECEIVE_DELETE_QNA"

export const receiveDeleteQNA = (activity) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_DELETE_QNA, payload: { activity } })
     }
}

/**
 * ACTUALITY
 */

export const RECEIVE_CREATE_ACTUALITY = "RECEIVE_CREATE_ACTUALITY"

export const receiveCreateActuality = (actuality, activity) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_CREATE_ACTUALITY, payload: { actuality, activity } })
     }
}

export const RECEIVE_UPDATE_ACTUALITY = "RECEIVE_UPDATE_ACTUALITY"

export const receiveUpdateActuality = (actuality, activity) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_UPDATE_ACTUALITY, payload: { actuality, activity } })
     }
}

export const RECEIVE_DELETE_ACTUALITY = "RECEIVE_DELETE_ACTUALITY"

export const receiveDeleteActuality = (actuality, activity) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_DELETE_ACTUALITY, payload: { actuality, activity } })
     }
}