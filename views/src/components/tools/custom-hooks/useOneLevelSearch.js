import { useState } from "react"
import { removeAccents } from "../../Utils"

/**
 * One level search function : array.filter(element => regexp.test(element[value]))
 * @param {*} array Array to search in
 * @param {*} param Param used to search. Ex : pseudo, title...
 */

export function useOneLevelSearch(array, param) {
    const [search, setSearch] = useState({
        state: false,
        query: '',
        results: []
    })

    const oneLevelSearch = () => {
        let isEmpty = !search.results || search.results.length === 0
        let regexp = new RegExp(search.query, 'i')

        if (!search.query || search.query.trim() === "") return
        if (search.query.length >= 2) {
            const response = array.filter(element => regexp.test(removeAccents(element[param])))
            console.log(response)
            setSearch(prevState => ({ ...prevState, state: true, results: response }))
            if (isEmpty)
                return
        } else {
            setSearch(prevState => ({ ...prevState, state: false }))
        }
    }

    /**
     * Check if user is in search results
     * @param {*} element User to check
     * @param {*} classe Class to add if user is in results
     */

    const isUserInSearchResults = (element, classe) => {
        if (search.state) {
            for (let i = 0; i < search.results.length; i++) {
                if (search.results[i].pseudo === element.pseudo) {
                    return classe
                } else {
                    return '!hidden'
                }
            }
        } else return classe
    }

    return { oneLevelSearch, isUserInSearchResults, search, setSearch }
}