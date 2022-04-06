import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { useLocation } from 'react-router-dom'

const Breadcrumb = ({ project }) => {
    const location = useLocation()

    const getCrumb = () => {
        if (location.pathname.includes("about")) return "À propos"
        else if (location.pathname.includes("tasks")) return "Tâches"
        else if (location.pathname.includes("messenger")) return "Messenger"
        else if (location.pathname.includes("members")) return "Membres"
        else return "Accueil"
    }

    const bread = [project.title, getCrumb()]

    return (
        <div className="dashboard-breadcrumb">
            <div className="crumb">
                <div>Mes projets</div>
            </div>
            {bread.map((crumb, key) => {
                return (
                    <div className="crumb" key={key}>
                        <IoIosArrowForward />
                        <div>{crumb}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default Breadcrumb