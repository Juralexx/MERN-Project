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
 * @param {*} geolocalisation 
 * @param {*} location 
 * @param {*} department 
 * @param {*} code_department 
 * @param {*} region 
 * @param {*} code_region 
 * @param {*} new_region 
 * @param {*} code_new_region 
 * @param {*} description 
 * @param {*} end 
 * @param {*} works 
 * @param {*} content 
 */

export const updateProject = (projectId, title, url, subtitle, category, tags, state, geolocalisation, location, department, code_department, region, code_region, new_region, code_new_region, description, end, works, content) => {
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
                    geolocalisation,
                    location,
                    department,
                    code_department,
                    region,
                    code_region,
                    new_region,
                    code_new_region,
                    description,
                    end,
                    works,
                    content
               }
          })
               .then(() => dispatch({
                    type: UPDATE_PROJECT,
                    payload: {
                         title,
                         url,
                         subtitle,
                         category,
                         state,
                         geolocalisation,
                         location,
                         department,
                         code_department,
                         region,
                         code_region,
                         new_region,
                         code_new_region,
                         description,
                         end,
                         works,
                         content
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

/*******************************************************************************************************************************/
/*************************************************** MEMBER REQUEST ACTION *****************************************************/

export const SEND_MEMBER_REQUEST = "SEND_MEMBER_REQUEST"

export const sendMemberRequest = (userId, projectId, notification, request) => {
     return async (dispatch) => {
          await axios({
               method: "put",
               url: `${process.env.REACT_APP_API_URL}api/project/${projectId}/members/request/send/`,
               data: { userId, request, notification }
          })
               .then(() => dispatch({ type: SEND_MEMBER_REQUEST, payload: { userId, request } }))
               .catch(err => console.error(err))
     }
}

export const RECEIVE_MEMBER_REQUEST = "RECEIVE_MEMBER_REQUEST"

export const receiveMemberRequest = (notification) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_MEMBER_REQUEST, payload: { notification } })
     }
}

export const CANCEL_MEMBER_REQUEST = "CANCEL_MEMBER_REQUEST"

export const cancelMemberRequest = (userId, projectId, notificationId) => {
     return async (dispatch) => {
          await axios({
               method: "put",
               url: `${process.env.REACT_APP_API_URL}api/project/${projectId}/members/request/cancel/`,
               data: { userId, notificationId }
          })
               .then(() => dispatch({ type: CANCEL_MEMBER_REQUEST, payload: { userId } }))
               .catch(err => console.error(err))
     }
}

export const RECEIVE_CANCEL_MEMBER_REQUEST = "RECEIVE_CANCEL_MEMBER_REQUEST"

export const receiveCancelMemberRequest = (notificationId) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_CANCEL_MEMBER_REQUEST, payload: { notificationId } })
     }
}

export const ACCEPT_MEMBER_REQUEST = "ACCEPT_MEMBER_REQUEST"

export const acceptMemberRequest = (userId, member, projectId, notificationId, activity) => {
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

export const receiveAcceptMemberRequest = (member, activity) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_ACCEPT_MEMBER_REQUEST, payload: { member, activity } })
     }
}

export const REFUSE_MEMBER_REQUEST = "REFUSE_MEMBER_REQUEST"

export const refuseMemberRequest = (userId, projectId, notificationId) => {
     return async (dispatch) => {
          await axios({
               method: "put",
               url: `${process.env.REACT_APP_API_URL}api/project/${projectId}/members/request/refuse/`,
               data: { userId, notificationId }
          })
               .then(() => dispatch({ type: REFUSE_MEMBER_REQUEST, payload: { userId, notificationId } }))
               .catch(err => console.error(err))
     }
}

export const RECEIVE_REFUSE_MEMBER_REQUEST = "RECEIVE_REFUSE_MEMBER_REQUEST"

export const receiveRefuseMemberRequest = (userId) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_REFUSE_MEMBER_REQUEST, payload: { userId } })
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

export const CREATE_TASK = "CREATE_TASK"

export const createTask = (projectId, task, activity) => {
     return async (dispatch) => {
          await axios({
               method: "put",
               url: `${process.env.REACT_APP_API_URL}api/project/${projectId}/tasks/add/`,
               data: { task, activity }
          })
               .then(() => dispatch({ type: CREATE_TASK, payload: { task, activity } }))
               .catch(err => console.error(err))
     }
}

export const RECEIVE_CREATE_TASK = "RECEIVE_CREATE_TASK"

export const receiveCreateTask = (task, activity) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_CREATE_TASK, payload: { task, activity } })
     }
}

export const UPDATE_TASK = "UPDATE_TASK"

export const changeTask = (projectId, task, activity) => {
     return async (dispatch) => {
          await axios({
               method: "put",
               url: `${process.env.REACT_APP_API_URL}api/project/${projectId}/tasks/update/`,
               data: { taskId: task._id, task, activity }
          })
               .then(() => dispatch({ type: UPDATE_TASK, payload: { task, activity } }))
               .catch(err => console.error(err))
     }
}

export const RECEIVE_UPDATE_TASK = "RECEIVE_UPDATE_TASK"

export const receiveChangeTask = (task, activity) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_UPDATE_TASK, payload: { task, activity } })
     }
}

export const UPDATE_TASK_STATE = "UPDATE_TASK_STATE"

export const changeTaskState = (projectId, taskId, state, activity) => {
     return async (dispatch) => {
          await axios({
               method: "put",
               url: `${process.env.REACT_APP_API_URL}api/project/${projectId}/tasks/update/`,
               data: { taskId, state, activity }
          })
               .then(() => dispatch({ type: UPDATE_TASK_STATE, payload: { taskId, state, activity } }))
               .catch(err => console.error(err))
     }
}

export const RECEIVE_UPDATE_TASK_STATE = "RECEIVE_UPDATE_TASK_STATE"

export const receiveChangeTaskState = (taskId, state, activity) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_UPDATE_TASK_STATE, payload: { taskId, state, activity } })
     }
}

export const UPDATE_TASK_STATUS = "UPDATE_TASK_STATUS"

export const changeTaskStatus = (projectId, taskId, status, activity) => {
     return async (dispatch) => {
          await axios({
               method: "put",
               url: `${process.env.REACT_APP_API_URL}api/project/${projectId}/tasks/update/`,
               data: { taskId, status, activity }
          })
               .then(() => dispatch({ type: UPDATE_TASK_STATUS, payload: { taskId, status, activity } }))
               .catch(err => console.error(err))
     }
}

export const RECEIVE_UPDATE_TASK_STATUS = "RECEIVE_UPDATE_TASK_STATUS"

export const receiveChangeTaskStatus = (taskId, status, activity) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_UPDATE_TASK_STATUS, payload: { taskId, status, activity } })
     }
}

export const COMMENT_TASK = "COMMENT_TASK"

export const commentTask = (projectId, taskId, comment) => {
     return async (dispatch) => {
          await axios({
               method: "put",
               url: `${process.env.REACT_APP_API_URL}api/project/${projectId}/tasks/comment/`,
               data: { taskId, comment }
          })
               .then(() => dispatch({ type: COMMENT_TASK, payload: { taskId, comment } }))
               .catch(err => console.error(err))
     }
}

export const RECEIVE_COMMENT_TASK = "RECEIVE_COMMENT_TASK"

export const receiveCommentTask = (taskId, comment) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_COMMENT_TASK, payload: { taskId, comment } })
     }
}

export const DELETE_TASK = "DELETE_TASK"

export const deleteTask = (projectId, taskId, activity) => {
     return async (dispatch) => {
          await axios({
               method: "put",
               url: `${process.env.REACT_APP_API_URL}api/project/${projectId}/tasks/delete/`,
               data: { taskId, activity }
          })
               .then(() => dispatch({ type: DELETE_TASK, payload: { taskId, activity } }))
               .catch(err => console.error(err))
     }
}

export const RECEIVE_DELETE_TASK = "RECEIVE_DELETE_TASK"

export const receiveDeleteTask = (taskId, activity) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_DELETE_TASK, payload: { taskId, activity } })
     }
}

/*******************************************************************************************************************************/
/*********************************************************** QNA ***************************************************************/

export const CREATE_QNA = "CREATE_QNA"

export const createQNA = (projectId, qna, activity) => {
     return async (dispatch) => {
          await axios({
               method: "put",
               url: `${process.env.REACT_APP_API_URL}api/project/${projectId}/qna/add/`,
               data: { qna, activity }
          })
               .then(() => dispatch({ type: CREATE_QNA, payload: { qna, activity } }))
               .catch(err => console.error(err))
     }
}

export const RECEIVE_CREATE_QNA = "RECEIVE_CREATE_QNA"

export const receiveCreateQNA = (qna, activity) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_CREATE_QNA, payload: { qna, activity } })
     }
}

export const UPDATE_QNA = "UPDATE_QNA"

export const updateQNA = (projectId, qna, activity) => {
     return async (dispatch) => {
          await axios({
               method: "put",
               url: `${process.env.REACT_APP_API_URL}api/project/${projectId}/qna/update/`,
               data: { qna, activity }
          })
               .then(() => dispatch({ type: UPDATE_QNA, payload: { qna, activity } }))
               .catch(err => console.error(err))
     }
}

export const RECEIVE_UPDATE_QNA = "RECEIVE_UPDATE_QNA"

export const receiveUpdateQNA = (qna, activity) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_UPDATE_QNA, payload: { qna, activity } })
     }
}

export const DELETE_QNA = "DELETE_QNA"

export const deleteQNA = (projectId, activity) => {
     return async (dispatch) => {
          await axios({
               method: "put",
               url: `${process.env.REACT_APP_API_URL}api/project/${projectId}/qna/delete/`,
               data: { activity }
          })
               .then(() => dispatch({ type: DELETE_QNA, payload: { activity } }))
               .catch(err => console.error(err))
     }
}

export const RECEIVE_DELETE_QNA = "RECEIVE_DELETE_QNA"

export const receiveDeleteQNA = (activity) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_DELETE_QNA, payload: { activity } })
     }
}

/*******************************************************************************************************************************/
/******************************************************* ACTUALITY *************************************************************/

export const CREATE_ACTUALITY = "CREATE_ACTUALITY"

export const createActuality = (projectId, actuality, activity) => {
     return async (dispatch) => {
          await axios({
               method: "put",
               url: `${process.env.REACT_APP_API_URL}api/project/${projectId}/actualities/add/`,
               data: { actuality, activity }
          })
               .then(() => dispatch({ type: CREATE_ACTUALITY, payload: { actuality, activity } }))
               .catch(err => console.error(err))
     }
}

export const RECEIVE_CREATE_ACTUALITY = "RECEIVE_CREATE_ACTUALITY"

export const receiveCreateActuality = (actuality, activity) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_CREATE_ACTUALITY, payload: { actuality, activity } })
     }
}

export const UPDATE_ACTUALITY = "UPDATE_ACTUALITY"

export const updateActuality = (projectId, actualityId, title, url, description) => {
     return async (dispatch) => {
          await axios({
               method: "put",
               url: `${process.env.REACT_APP_API_URL}api/project/${projectId}/actualities/update/`,
               data: { actualityId, title, url, description }
          })
               .then(() => dispatch({ type: UPDATE_ACTUALITY, payload: { actualityId, title, url, description } }))
               .catch(err => console.error(err))
     }
}

export const RECEIVE_UPDATE_ACTUALITY = "RECEIVE_UPDATE_ACTUALITY"

export const receiveUpdateActuality = (actualityId, title, url, description) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_UPDATE_ACTUALITY, payload: { actualityId, title, url, description } })
     }
}

export const DELETE_ACTUALITY = "DELETE_ACTUALITY"

export const deleteActuality = (projectId, actualityId) => {
     return async (dispatch) => {
          await axios({
               method: "put",
               url: `${process.env.REACT_APP_API_URL}api/project/${projectId}/actualities/delete/`,
               data: { actualityId }
          })
               .then(() => dispatch({ type: DELETE_ACTUALITY, payload: { actualityId } }))
               .catch(err => console.error(err))
     }
}

export const RECEIVE_DELETE_ACTUALITY = "RECEIVE_DELETE_ACTUALITY"

export const receiveDeleteActuality = (actualityId) => {
     return async (dispatch) => {
          dispatch({ type: RECEIVE_DELETE_ACTUALITY, payload: { actualityId } })
     }
}