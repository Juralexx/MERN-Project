import { changeTaskState, deleteTask } from "../../../reducers/project.action"

/**
 * Update selected task state
 * @param {*} element Selected task
 * @param {*} newState New state of the selected task
 * @param {*} project Project of the task
 * @param {*} user User that update state
 * @param {*} websocket Websocket
 * @param {*} dispatch Redux dispatch function
 */

export const updateState = async (element, newState, project, user, websocket, dispatch) => {
    const activity = {
        type: "update-task-state",
        who: user.pseudo,
        task: element.title,
        prevState: stateToString(element.state),
        newState: stateToString(newState),
        date: new Date().toISOString()
    }
    //const members = project.members.filter(member => member._id !== user._id)
    project.members.map(member => {
        return websocket.current.emit('updateTaskState', {
            receiverId: member._id,
            taskId: element._id,
            state: newState,
            activity: activity
        })
    })
    dispatch(changeTaskState(project._id, element._id, newState, activity))
}

/**
 * Delected selected task
 * @param {*} element Selected task
 * @param {*} project Project of the task
 * @param {*} user User that remove task
 * @param {*} websocket Websocket
 * @param {*} dispatch Redux dispatch function
 */

export const removeTask = (task, project, user, websocket, dispatch) => {
    const activity = {
        type: "delete-task",
        who: user.pseudo,
        task: task.title,
        date: new Date().toISOString()
    }
    const members = project.members.filter(member => member._id !== user._id)
    members.map(member => {
        return websocket.current.emit('deleteTask', {
            receiverId: member._id,
            taskId: task._id,
            activity: activity
        })
    })
    dispatch(deleteTask(project._id, task._id, activity))
}

/**
 * Add or remove member to array on selection
 * @param {*} element Selected member
 * @param {*} array Array to add member in
 */

export const addMemberToArray = (element, array) => {
    let userProperties = {
        _id: element._id,
        pseudo: element.pseudo,
        picture: element.picture,
        since: new Date().toISOString()
    }
    if (!array.some(member => member._id === element._id)) {
        return [...array, userProperties]
    } else {
        let arr = array.filter(member => member._id !== element._id && member.pseudo !== element.pseudo)
        return arr
    }
}

/**
 * Remove selected member from array
 * @param {*} element Member to remove
 * @param {*} array Array to remove from
 */

export const removeMemberFromArray = (element, array) => {
    let arr = array.filter(member => member._id !== element._id)
    return arr
}

/**
 * Check if selected date is passed
 * @param {*} date Date to check if is passed
 */

export const isDatePassed = (date) => {
    let today = new Date().toISOString()
    if (date.substring(0, 10) === today.substring(0, 10)) {
        return "orange"
    } else if (date.substring(0, 10) > today.substring(0, 10)) {
        return "green"
    } else return "red"
}

/**
 * Convert state to color
 * @param {*} element State to convert
 */

export const stateToBackground = (element) => {
    switch (element) {
        case "todo":
            return "orange"
        case "in progress":
            return "blue"
        case "done":
            return "green"
        default:
            return "blue"
    }
}

/**
 * Convert state to readable string
 * @param {*} element State to convert
 */

export const stateToString = (element) => {
    switch (element) {
        case "todo":
            return "À traiter"
        case "in progress":
            return "En cours"
        case "done":
            return "Terminée"
        default:
            return "En cours"
    }
}

/**
 * Convert status to border color
 * @param {*} element Status to convert
 */

export const statusToBorder = (element) => {
    switch (element) {
        case "normal":
            return "normal"
        case "important":
            return "important"
        case "priority":
            return "priority"
        default:
            return "normal"
    }
}

/**
 * Convert status to background color
 * @param {*} element 
 */

export const statusToBackground = (element) => {
    switch (element) {
        case "normal":
            return "blue"
        case "important":
            return "orange"
        case "priority":
            return "red"
        default:
            return "blue"
    }
}

/**
 * Convert status to readable string
 * @param {*} element Status to convert
 */

export const statusToString = (element) => {
    switch (element) {
        case "normal":
            return "Normal"
        case "important":
            return "Important"
        case "priority":
            return "Prioritaire"
        default:
            return "Normal"
    }
}

/**
 * Sort tasks array by date in chronological order
 * @param {*} tasks Tasks array
 */

export const sortByCreationDate = (tasks) => {
    const array = tasks.sort((a, b) => { return new Date(b.date) - new Date(a.date) })
    return array
}

/**
 * Sort tasks array by date in unchronological order
 * @param {*} tasks Tasks array
 */

export const sortByEndDate = (tasks) => {
    const array = tasks.sort((a, b) => { return new Date(a.end) - new Date(b.end) })
    return array
}

/**
 * Sort tasks array by state
 * @param {*} tasks Tasks array
 */

export const sortByState = (tasks) => {
    const todo = tasks.filter(element => element.state === "todo")
    const inProgress = tasks.filter(element => element.state === "in progress")
    const done = tasks.filter(element => element.state === "done")
    return todo.concat(inProgress, done)
}

/**
 * Sort tasks array by status
 * @param {*} tasks Tasks array
 */

export const sortByStatus = (tasks) => {
    const normal = tasks.filter(element => element.status === "normal")
    const important = tasks.filter(element => element.status === "important")
    const priority = tasks.filter(element => element.status === "priority")
    return priority.concat(important, normal)
}

/**
 * Return random ID
 * @param {*} num 
 */

export const randomizeCheckboxID = (num) => {
    return Math.cbrt((((num * 7482) + 596) * 18))
}