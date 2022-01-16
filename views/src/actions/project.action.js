import axios from "axios";

export const GET_PROJECT = "GET_PROJECT"

export const getProject = (uid) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/project/${uid}`)
            .then((res) => {
                dispatch({ type: GET_PROJECT, payload: res.data })
            })
            .catch((err) => console.log(err))
    }
}