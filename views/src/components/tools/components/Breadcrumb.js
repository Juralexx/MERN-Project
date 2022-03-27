import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'

const Breadcrumb = ({ project, description, tasks, messenger, members }) => {

    const getCrumb = () => {
        if (description) return "Description"
        else if (tasks) return "Tâches"
        else if (messenger) return "Messenger"
        else if (members) return "Membres"
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