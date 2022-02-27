import React, { useState } from 'react'

const SortComponent = ({ table, setSortedTable }) => {
    const [sortedValue, setSortedValue] = useState("Trier")
    const [display, setDisplay] = useState(false)

    function sortByLikes() {
        const sort = table.sort((a, b) => { return b.likers.length - a.likers.length })
        setSortedTable(sort)
        setSortedValue("Trier par nombre de likes")
        setDisplay(false)
    }
    function sortByFollows() {
        const sort = table.sort((a, b) => { return b.followers.length - a.followers.length })
        setSortedTable(sort)
        setSortedValue("Trier par nombre de follows")
        setDisplay(false)
    }
    function sortByDate() {
        const sort = table.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) })
        setSortedTable(sort)
        setSortedValue("Trier par date")
        setDisplay(false)
    }
    function sortedByStateUnderPreparation() {
        const array = table.filter((element) => { return element.state === "En préparation" })
        setSortedTable(array)
        setSortedValue("Project en préparation")
        setDisplay(false)
    }
    function sortedByStateInPorgress() {
        const array = table.filter((element) => { return element.state === "En cours" })
        setSortedTable(array)
        setSortedValue("Project en cours")
        setDisplay(false)
    }
    function sortedByStateCompleted() {
        const array = table.filter((element) => { return element.state === "Terminé" })
        setSortedTable(array)
        setSortedValue("Project terminé")
        setDisplay(false)
    }
    
    return (
        <>
            <button onClick={() => setDisplay(!display)}>{sortedValue}</button>
            {display && (
                <div className="category-selection">
                    <option onClick={() => sortByLikes()}>Trier par nombre de likes</option>
                    <option onClick={() => sortByFollows()}>Trier par nombre de follows</option>
                    <option onClick={() => sortByDate()}>Trier par date</option>
                    <option onClick={() => sortedByStateUnderPreparation()}>Project en préparation</option>
                    <option onClick={() => sortedByStateInPorgress()}>Project en cours</option>
                    <option onClick={() => sortedByStateCompleted()}>Project terminé</option>
                </div>
            )}
        </>
    )
}

export default SortComponent