/**
 * One level search function : array.filter(element => regexp.test(element[value]))
 */

export const oneLevelSearch = (query, array, value, isResults, setResults, setSearch) => {
    let isEmpty = !isResults || isResults.length === 0
    let regexp = new RegExp(query, 'i')

    if (!query || query.trim() === "") { return }
    if (query.length >= 2) {
        const response = array.filter(element => regexp.test(element[value]))
        setResults(response)
        setSearch(true)
        if (isEmpty) {
            setSearch(false)
        }
    } else {
        setSearch(false)
    }
}

/**
 * Two levels search function : array.filter(element => element[property].some(prop => regexp.test(prop[value])))
 */

export const twoLevelSearch = (query, array, property, value, isResults, setResults, setSearch) => {
    const isEmpty = !isResults || isResults.length === 0
    const regexp = new RegExp(query, 'i');

    if (!query || query.trim() === "") { return }
    if (query.length >= 2) {
        const res = array.filter(element => element[property].some(prop => regexp.test(prop[value])))
        setResults(res)
        setSearch(true)
        if (isEmpty) {
            setSearch(false)
        }
    } else {
        setSearch(false)
    }
}