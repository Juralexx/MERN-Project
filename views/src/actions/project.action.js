import axios from "axios";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

export const GET_PROJECT = "GET_PROJECT"
export const UPDATE_TITLE = "UPDATE_TITLE"
export const UPDATE_TITLEURL = "UPDATE_TITLEURL"
export const UPDATE_CATEGORY = "UPDATE_CATEGORY"
export const UPDATE_CONTENT = "UPDATE_CONTENT"
export const UPDATE_LOCATION = "UPDATE_LOCATION"
export const UPDATE_NUMBEROFCONTRIBUTORS = "UPDATE_NUMBEROFCONTRIBUTORS"
export const UPDATE_CONTRIBUTORS = "UPDATE_CONTRIBUTORS"
export const UPDATE_END = "UPDATE_END"
export const UPDATE_STATE = "UPDATE_STATE"

export const LIKE = "LIKE"
export const UNLIKE = "UNLIKE"
export const FOLLOW = "FOLLOW"
export const UNFOLLOW = "UNFOLLOW"

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

export const updateLocation = (projectId, location) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/` + projectId,
            data: { location }
        })
            .then((res) => {
                dispatch({ type: UPDATE_LOCATION, payload: location })
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

export const updateContributors = (projectId, contributors) => {
    return async (dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/` + projectId,
            data: { contributors }
        })
            .then((res) => {
                dispatch({ type: UPDATE_CONTRIBUTORS, payload: contributors })
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