import axios from "axios";

export const GET_PROJECT = "GET_PROJECT"
export const UPDATE_TITLE = "UPDATE_TITLE"
export const UPDATE_TITLEURL = "UPDATE_TITLEURL"
export const UPDATE_CATEGORY = "UPDATE_CATEGORY"
export const UPDATE_CONTENT = "UPDATE_CONTENT"
export const UPDATE_LOCATION = "UPDATE_LOCATION"
export const UPDATE_NUMBEROFCONTRIBUTORS = "UPDATE_NUMBEROFCONTRIBUTORS"
export const UPDATE_CONTRIBUTORS = "UPDATE_CONTRIBUTORS"
export const UPDATE_END = "UPDATE_END"

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