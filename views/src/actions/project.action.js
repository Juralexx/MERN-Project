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

export const SEND_MEMBER_REQUEST = "SEND_MEMBER_REQUEST"
export const CANCEL_SENT_MEMBER_REQUEST = "CANCEL_SENT_MEMBER_REQUEST"
export const ACCEPT_MEMBER_REQUEST = "ACCEPT_MEMBER_REQUEST"
export const REFUSE_MEMBER_REQUEST = "REFUSE_MEMBER_REQUEST"

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
                var callback = {}
                var deltaOps = res.data.content[0].ops
                var converter = new QuillDeltaToHtmlConverter(deltaOps, callback)
                var html = converter.convert(deltaOps)
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

export const removeMember = (projectId, memberId) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/remove-user/` + projectId,
            data: { memberId: memberId }
        })
            .then((res) => {
                dispatch({ type: REMOVE_MEMBER, payload: { projectId, memberId } })
            })
            .catch((err) => console.log(err))
    }
}

export const sendProjectMemberRequest = (userId, projectId, notification, request) => {
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

export const cancelProjectMemberRequest = (userId, projectId, type) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/cancel-member-request/` + projectId,
            data: { userId, type }
        })
            .then((res) => {
                dispatch({ type: CANCEL_SENT_MEMBER_REQUEST, payload: { userId } })
            })
            .catch((err) => console.log(err))
    }
}

export const acceptProjectMemberRequest = (userId, member, projectId, type) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/accept-member-request/` + projectId,
            data: { userId, member, type }
        })
            .then((res) => {
                dispatch({ type: ACCEPT_MEMBER_REQUEST, payload: { userId, projectId, member } })
            })
            .catch((err) => console.log(err))
    }
}

export const refuseProjectMemberRequest = (userId, projectId, type) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/refuse-member-request/` + projectId,
            data: { userId: userId, type: type }
        })
            .then((res) => res.data)
            .catch((err) => console.log(err))
    }
}