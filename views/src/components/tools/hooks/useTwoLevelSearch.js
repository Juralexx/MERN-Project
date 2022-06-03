import { useState } from "react"

/**
 * Two levels search function : array.filter(element => element[property].some(prop => regexp.test(prop[param])))
 * @param {*} array Array to search on
 * @param {*} property Property of object to search on. Ex : members, objects...
 * @param {*} param Param used to search. Ex : pseudo, title...
 */

export function useTwoLevelSearch(array, property, param) {
    const [search, setSearch] = useState(false)
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])

    const twoLevelSearch = () => {
        const isEmpty = !results || results.length === 0
        const regexp = new RegExp(query, 'i');
    
        if (!query || query.trim() === "") { return }
        if (query.length >= 2) {
            const res = array.filter(element => element[property].some(prop => regexp.test(prop[param])))
            setResults(res)
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

    const isInResults = (element, classe) => {
        if (search) {
            if (results.includes(element)) return classe
            else return '!hidden'
        } else return classe
    }

    return { twoLevelSearch, isInResults, query, setQuery }
}