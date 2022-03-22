import { changeTaskState, deleteTask } from "../../../actions/project.action"

export const changeState = async (element, project, user, websocket, dispatch) => {
    const state = () => { if (element.state === "undone") { return "done" } else { return "undone" } }
    const members = project.members.filter(member => member.id !== user._id)
    members.map(member => {
        return websocket.current.emit('updateTaskState', {
            receiverId: member.id,
            taskId: element._id,
            state: state()
        })
    })
    dispatch(changeTaskState(project._id, element._id, state()))
}

export const removeTask = (task, project, user, websocket, dispatch) => {
    const members = project.members.filter(member => member.id !== user._id)
    members.map(member => {
        return websocket.current.emit('deleteTask', {
            receiverId: member.id,
            taskId: task._id
        })
    })
    dispatch(deleteTask(project._id, task._id))
}

/***************************************************************************************************************************************************/
/*************************************************** PUSH AND REMOVE USER FROM TASK ARRAY **********************************************************/

export const addMemberToArray = (element, array, setArray) => {
    let userProperties = {
        id: element.id,
        pseudo: element.pseudo,
        picture: element.picture,
        since: new Date().toISOString()
    }
    if (!array.some(member => member.id === element.id)) {
        setArray(array => [...array, userProperties])
    } else {
        let arr = array.filter(member => member.id !== element.id && member.pseudo !== element.pseudo)
        setArray(arr)
    }
}

export const removeMemberFromArray = (element, array, setArray) => {
    let arr = array.filter(member => member.id === element.id)
    setArray(arr)
}

/***************************************************************************************************************************************************/
/*************************************************************** COMPARE DATES *********************************************************************/

export const isDatePassed = (date) => {
    let today = new Date().toISOString()
    if (date.substr(0, 10) === today.substring(0, 10)) {
        return "orange"
    } else if (date.substr(0, 10) > today.substring(0, 10)) {
        return "green"
    } else {
        return "red"
    }
}