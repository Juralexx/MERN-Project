export const sortByRecent = (projects) => {
    const array = projects.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) })
    return array
}

export const sortByOld = (projects) => {
    const array = projects.sort((a, b) => { return new Date(a.createdAt) - new Date(b.createdAt) })
    return array
}

export const sortByWorkedOn = (projects) => {
    const array = projects.filter(project => project.state === "worked on")
    return array
}

export const sortByInProgress = (projects) => {
    const array = projects.filter(project => project.state === "in progress")
    return array
}

export const sortByDone = (projects) => {
    const array = projects.filter(project => project.state === "done")
    return array
}

/**
 * 
 */

export const stateToBackground = (project) => {
    if (project.state === "worked on") return "orange"
    else if (project.state === "in progress") return "blue"
    else if (project.state === "done") return "green"
}

export const stateToString = (element) => {
    if (element === "worked on") {
        return "En préparation"
    } else if (element === "in progress") {
        return "En cours"
    } else if (element === "done") {
        return "Terminée"
    }
}