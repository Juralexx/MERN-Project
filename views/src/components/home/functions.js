import axios from "axios"

export const getProject = (project, setState, setOpen) => {
    setState(project)
    setOpen(true)
}

export const getUser = async (userId, setState) => {
    await axios.get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
        .then(res => {
            setState(res.data)
        })
        .catch((err) => console.error(err))
}

export const getState = (project) => {
    if (project.state = "En préparation") return "bg-orange-400/50 border border-orange-400"
    if (project.state = "En cours") return "bg-primary"
    if (project.state = "Terminé") return "bg-green-300"
}