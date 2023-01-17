import { useState } from "react"

/**
 * Two levels search function : array.filter(element => element[property].some(prop => regexp.test(prop[param])))
 * @param {*} array Array to search in
 */

export function useSearchConversation(array) {
    const [search, setSearch] = useState({
        state: false,
        query: '',
        results: []
    })

    const findConversation = () => {
        let isEmpty = !search.results || search.results.length === 0
        let regexp = new RegExp(search.query, 'i');

        if (!search.query || search.query.trim() === "") return
        if (search.query.length >= 2) {
            const isPseudos = array.filter(element => element['members'].some(prop => regexp.test(prop['pseudo'])))

            const isTitle = array.filter(element => regexp.test(element['name']))

            let unique = [...new Set([...isPseudos, ...isTitle])]

            setSearch(prevState => ({ ...prevState, state: true, results: unique }))
            if (isEmpty) {
                setSearch(prevState => ({ ...prevState, state: false }))
            }
        } else {
            setSearch(prevState => ({ ...prevState, state: false }))
        }
    }

    return { findConversation, search, setSearch }
}