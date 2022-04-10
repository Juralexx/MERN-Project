/***************************************************************************************************************************************************/
/**************************************************************** SORTED ARRAY *********************************************************************/

export const sortByRecent = (projects, setProjects, setFilter, setDisplay) => {
    const array = projects.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) })
    setProjects(array)
    setFilter("Plus récent au plus ancien")
    setDisplay(false)
}

export const sortByOld = (projects, setProjects, setFilter, setDisplay) => {
    const array = projects.sort((a, b) => { return new Date(a.createdAt) - new Date(b.createdAt) })
    setProjects(array)
    setFilter("Plus ancien au plus récent")
    setDisplay(false)
}

export const sortByWorkedOn = (projects, setProjects, setFilter, setDisplay) => {
    const array = projects.filter(project => project.state === "worked on")
    setProjects(array)
    setFilter("En préparation")
    setDisplay(false)
}

export const sortByInProgress = (projects, setProjects, setFilter, setDisplay) => {
    const array = projects.filter(project => project.state === "in progress")
    setProjects(array)
    setFilter("En cours")
    setDisplay(false)
}

export const sortByDone = (projects, setProjects, setFilter, setDisplay) => {
    const array = projects.filter(project => project.state === "done")
    setProjects(array)
    setFilter("Terminé")
    setDisplay(false)
}

export const checkDateSort = (isByRecent, setIsByRecent, projects, setProjects, setFilter, setDisplay) => {
    if (isByRecent) {
        sortByOld(projects, setProjects, setFilter, setDisplay)
        setIsByRecent(false)
    } else {
        sortByRecent(projects, setProjects, setFilter, setDisplay)
        setIsByRecent(true)
    }
}