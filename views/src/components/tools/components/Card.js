import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Icon from '../icons/Icon';
import FavoriteButton from './FavoriteButton'
import FollowersButton from './FollowersButton'
import FollowersModal from './FollowersModal';
import LikersButton from './LikersButton'
import LikersModal from './LikersModal';
import { dateParser, fullImage } from '../../Utils';
import { stateToBackground, stateToString } from '../../projects/functions';

const Card = ({ project, user, websocket, className }) => {
    const [openFollowersModal, setOpenFollowersModal] = useState(false)
    const [openLikersModal, setOpenLikersModal] = useState(false)

    return (
        <>
            <div className={className ? 'card ' + className : 'card'}>
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

            {openFollowersModal &&
                <FollowersModal
                    user={user}
                    project={project}
                    websocket={websocket}
                    open={openFollowersModal}
                    setOpen={setOpenFollowersModal}
                />
            }
            {openLikersModal &&
                <LikersModal
                    user={user}
                    project={project}
                    websocket={websocket}
                    open={openLikersModal}
                    setOpen={setOpenLikersModal}
                />
            }
        </>
    )
}

export default Card