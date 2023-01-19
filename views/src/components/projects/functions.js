/**
 * Sort project by chronological dates
 * @param {*} projects 
 */

export const sortByRecent = (projects) => {
    const array = projects.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) })
    return array
}

/**
 * Sort project by unchronological dates
 * @param {*} projects 
 */

export const sortByOld = (projects) => {
    const array = projects.sort((a, b) => { return new Date(a.createdAt) - new Date(b.createdAt) })
    return array
}

/**
 * Return projects matching required state
 * @param {*} projects 
 * @param {*} state 
 */

export const sortByState = (projects, state) => {
    const array = projects.filter(project => project.state === state)
    return array
}

/**
 * Sort project by selected filter
 * @param {*} projects 
 * @param {*} state 
 */

export const sortProjects = (projects, state) => {
    switch (state) {
        case "chronological":
            return sortByRecent(projects)
        case "unchronological":
            return sortByOld(projects)
        case "worked on":
            return sortByState(projects, "worked on")
        case "in progress":
            return sortByState(projects, "in progress")
        case "done":
            return sortByState(projects, "done")
        default:
            return projects
    }
}

/**
 * Convert project state to background color
 * @param {*} project Project
 */

export const stateToBackground = (project) => {
    switch (project.state) {
        case "worked on":
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
 * Convert project state to readdable string
 * @param {*} element Project state
 */

export const stateToString = (element) => {
    switch (element) {
        case "worked on":
            return "En préparation"
        case "in progress":
            return "En cours"
        case "done":
            return "Terminée"
        default:
            return "En cours"
    }
}

/**
 * Convert project state to readdable string
 * @param {*} filter Filter to convert
 */

export const filterToString = (filter) => {
    switch (filter) {
        case "chronological":
            return "Plus récent au plus ancien"
        case "unchronological":
            return "Plus ancien au plus récent"
        case "worked on":
            return "En préparation"
        case "in progress":
            return "En cours"
        case "done":
            return "Terminée"
        default:
            return ''
    }
}