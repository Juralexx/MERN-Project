import { useState } from "react"
import { removeAccents } from "../../Utils"

/**
 * One level search function : array.filter(element => regexp.test(element[value]))
 * @param {*} array Array to search on
 * @param {*} param Param used to search. Ex : pseudo, title...
 */

export function useOneLevelSearch(array, param) {
    const [search, setSearch] = useState(false)
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])

    const oneLevelSearch = () => {
        let isEmpty = !results || results.length === 0
        let regexp = new RegExp(query, 'i')

        if (!query || query.trim() === "") { return }
        if (query.length >= 2) {
            const response = array.filter(element => regexp.test(removeAccents(element[param])))
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
     * @param {*} element Element to check if is in results array
     * @param {*} classe Classe to add if element is in results
     */

    const isUserInSearchResults = (element, classe) => {
        if (search) {
            if (results.includes(element)) return classe
            else return '!hidden'
        } else return classe
    }

    return { oneLevelSearch, isUserInSearchResults, query, setQuery }
}