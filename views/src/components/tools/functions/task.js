import { changeTaskState, deleteTask } from "../../../actions/project.action"

export const changeState = async (element, project, user, websocket, dispatch) => {
    const state = () => { if (element.state !== "done") { return "done" } else { return "todo" } }
    const activity = { type: "update-task-state", who: user.pseudo, task: element.title, prevState: stateToString(element.state), newState: stateToString(state()), date: new Date().toISOString() }
    const members = project.members.filter(member => member.id !== user._id)
    members.map(member => {
        return websocket.current.emit('updateTaskState', {
            receiverId: member.id,
            taskId: element._id,
            state: state(),
            activity: activity
        })
    })
    dispatch(changeTaskState(project._id, element._id, state(), activity))
}

export const removeTask = (task, project, user, websocket, dispatch) => {
    const activity = { type: "delete-task", who: user.pseudo, task: task.title, date: new Date().toISOString() }
    const members = project.members.filter(member => member.id !== user._id)
    members.map(member => {
        return websocket.current.emit('deleteTask', {
            receiverId: member.id,
            taskId: task._id,
            activity: activity
        })
    })
    dispatch(deleteTask(project._id, task._id, activity))
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
    let arr = array.filter(member => member.id !== element.id)
    setArray(arr)
}

/***************************************************************************************************************************************************/
/*************************************************************** COMPARE DATES *********************************************************************/

export const isDatePassed = (date) => {
    let today = new Date().toISOString()
    if (date.substring(0, 10) === today.substring(0, 10)) {
        return "orange"
    } else if (date.substring(0, 10) > today.substring(0, 10)) {
        return "green"
    } else {
        return "red"
    }
}

/***************************************************************************************************************************************************/
/******************************************************************* STATES ************************************************************************/

export const stateToBackground = (element) => {
    if (element === "todo") {
        return "orange"
    } else if (element === "in progress") {
        return "blue"
    } else if (element === "done") {
        return "green"
    }
}

export const stateToString = (element) => {
    if (element === "todo") {
        return "À traiter"
    } else if (element === "in progress") {
        return "En cours"
    } else if (element === "done") {
        return "Terminée"
    }
}

/***************************************************************************************************************************************************/
/******************************************************************* STATUS ************************************************************************/

export const statusToBorder = (element) => {
    if (element === "normal") {
        return "normal"
    } else if (element === "important") {
        return "important"
    } else if (element === "priority") {
        return "priority"
    }
}

export const statusToBackground = (element) => {
    if (element === "normal") {
        return "blue"
    } else if (element === "important") {
        return "orange"
    } else if (element === "priority") {
        return "red"
    }
}

export const statusToString = (element) => {
    if (element === "normal") {
        return "Normal"
    } else if (element === "important") {
        return "Important"
    } else if (element === "priority") {
        return "Prioritaire"
    }
}