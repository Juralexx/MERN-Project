import { useState } from "react"

/**
 * Two levels search function : array.filter(element => element[property].some(prop => regexp.test(prop[param])))
 * @param {*} array Array to search in
 * @param {*} property Property of object to search in. Ex : members, objects...
 * @param {*} param Param used to search for. Ex : pseudo, title...
 */

export function useTwoLevelSearch(array, property, param) {
    const [search, setSearch] = useState({
        state: false,
        query: '',
        results: []
    })


    const twoLevelSearch = () => {
        let isEmpty = !search.results || search.results.length === 0
        let regexp = new RegExp(search.query, 'i');

        if (!search.query || search.query.trim() === "") return
        if (search.query.length >= 2) {
            const response = array.filter(element => element[property].some(prop => regexp.test(prop[param])))
            setSearch(prevState => ({ ...prevState, state: true, results: response }))
            if (isEmpty) {
                setSearch(prevState => ({ ...prevState, state: false }))
            }
        } else {
            setSearch(prevState => ({ ...prevState, state: false }))
        }
    }

    /**
     * Check if element is in search results
     * @param {*} element Element to check
     * @param {*} classe Class to add if element is in results
     */

    const isUserInSearchResults = (element, classe) => {
        let paramArray = []
        element[property].forEach(prop => paramArray.push(prop[param]))

        if (search.state) {
            search.results.map((result, key) => {
                return result
            }).map((e, i) => {
                return e[property]
            }).map((el, j) => {
                if (paramArray.includes(el[param])) {
                    return classe
                } else {
                    return '!hidden'
                }
            })
        } else {
            return classe
        }
    }

    return { twoLevelSearch, isUserInSearchResults, search, setSearch }
}