import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '../tools/icons/Icon'
import { dateParser } from '../Utils'
import { stateToBackground, stateToString } from './functions'

const ProjectCard = ({ element }) => {
    return (
        <div className="project-card">
            <div className='row'>
                <div className="col-0 col-md-3 project-picture">
                    <img src={element.pictures[0]} alt={element.title} />
                </div>
                <div className="col-12 col-md-9 project-card-content">
                    <div className="project-card-content-top">
                        <h2 className='one_line'>
                            <Link to={`${element.URLID}/${element.URL}`}>{element.title}</Link>
                        </h2>
                        <h3 className='one_line'>{element.subtitle}</h3>
                        <div className={`state ${stateToBackground(element)}`}>{stateToString(element.state)}</div>
                        <div className="infos_field">
                            <Icon name="Calendar" /> {dateParser(element.createdAt)}
                        </div>
                        <div className="infos_field">
                            <Icon name="Position" /> {element.location.city} - {element.location.department} ({element.location.code_department})
                        </div>
                        <div className="infos_field">
                            <Icon name="List" /> {element.category}
                        </div>
                    </div>
                    <div className="project-tags">
                        {element.tags.map((tag, i) => {
                            return <div className="tag" key={i}><span>#</span>{tag}</div>
                        })}
                    </div>
                    <div className="description">{element.description}</div>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard