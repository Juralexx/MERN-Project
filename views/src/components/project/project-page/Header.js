import React from 'react'
import { IoHeart } from 'react-icons/io5'
import { MdOutlineBookmark } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { dateParser } from '../../Utils'

const Header = ({ project }) => {
    return (
        <div className="header">
            <h1>{project.title}</h1>
            <h2>{project.subtitle}</h2>
            <div className="infos">
                <div className="infos-content">à <Link to="/">{project.location} ({project.code_department})</Link></div>
                <div className="infos-content">proposé par <Link to={"/" + project.posterPseudo}>{project.posterPseudo}</Link></div>
                <div className="infos-content">{dateParser(project.createdAt)}</div>
            </div>
            <div className="project-tags">
                {project.tags.map((tag, i) => {
                    return <div key={i}>#{tag}</div>
                })}
            </div>
            <div className="actions">
                <div className="users-actions likes"><IoHeart /> {project.likers.length}</div>
                <div className="users-actions follows"><MdOutlineBookmark /> {project.followers.length}</div>
            </div>
        </div>
    )
}

export default Header