/***************************************************************************************************************************************************/
/*************************************************** PUSH AND REMOVE USER FROM TASK ARRAY **********************************************************/

export const addMemberToTask = (element, array, setArray) => {
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

export const removeMemberFromTask = (element, array, setArray) => {
    let arr = array.filter(member => member.id === element.id)
    setArray(arr)
}