/***************************************************************************************************************************************************/
/**************************************************************** SORTED ARRAY *********************************************************************/

export const sortByRecent = (projects, setProjects, setFilter) => {
    const array = projects.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) })
    setProjects(array)
    setFilter("Plus récent au plus ancien")
}

export const sortByOld = (projects, setProjects, setFilter) => {
    const array = projects.sort((a, b) => { return new Date(a.createdAt) - new Date(b.createdAt) })
    setProjects(array)
    setFilter("Plus ancien au plus récent")
}

export const sortByWorkedOn = (projects, setProjects, setFilter) => {
    const array = projects.filter(project => project.state === "worked on")
    setProjects(array)
    setFilter("En préparation")
}

export const sortByInProgress = (projects, setProjects, setFilter) => {
    const array = projects.filter(project => project.state === "in progress")
    setProjects(array)
    setFilter("En cours")
}

export const sortByDone = (projects, setProjects, setFilter) => {
    const array = projects.filter(project => project.state === "done")
    setProjects(array)
    setFilter("Terminé")
}

export const checkDateSort = (isByRecent, setIsByRecent, projects, setProjects, setFilter) => {
    if (isByRecent) {
        sortByOld(projects, setProjects, setFilter)
        setIsByRecent(false)
    } else {
        sortByRecent(projects, setProjects, setFilter)
        setIsByRecent(true)
    }
}