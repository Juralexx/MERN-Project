import React from 'react'
import { Link } from 'react-router-dom';
import { stateToBackground, stateToString } from '../projects/functions';
import FavoriteButton from '../tools/components/FavoriteButton'
import FollowersButton from '../tools/components/FollowersButton'
import LikersButton from '../tools/components/LikersButton'
import Icon from '../tools/icons/Icon';
import { dateParser, fullImage } from '../Utils';

const ProjectCard = ({ project, user, setOpenLikersModal, setOpenFollowersModal }) => {

    return (
        <div className='card'>
            <div className="card-img" style={fullImage(`${process.env.REACT_APP_API_URL}files/img/paysage-3.jpg`)}></div>
            <div className={`state ${stateToBackground(project)}`}>
                {stateToString(project.state)}
            </div>
            {project.poster._id !== user._id &&
                <FavoriteButton project={project} />
            }
            <div className="card-body">
                <Link to={"/project/" + project.URLID + "/" + project.URL}>
                    <div className="card-title">
                        <h4>{project.title}</h4>
                        <p>
                            <Icon name="Position" />
                            <span>{project.location.city + ", " + project.location.department}</span>
                        </p>
                        <p>
                            <Icon name="List" />
                            <span>{project.category}</span>
                        </p>
                    </div>
                </Link>
                <div className="card-description">
                    {project.description}
                </div>
                <div className="card-footer flex col-12">
                    <div className="footer-left col-8">
                        <LikersButton
                            project={project}
                            onClick={() => setOpenLikersModal(true)}
                        />
                        <FollowersButton
                            project={project}
                            onClick={() => setOpenFollowersModal(true)}
                        />
                    </div>
                    <div className="footer-right col-4 flex pt-2">
                        <div className="footer-name">
                            <p className="name">
                                <Link to={`/user/${project.poster.pseudo}`}>
                                    {project.poster.pseudo}
                                </Link>
                            </p>
                            <p className="date">{dateParser(project.createdAt)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard