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