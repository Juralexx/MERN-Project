import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Icon from '../tools/icons/Icon'
import { Button } from '../tools/global/Button'
import { MediumAvatar } from '../tools/global/Avatars'
import Share from './Share'
import { dateParser, fullImage } from '../Utils'
import { followProject, likeProject, unfollowProject, unlikeProject } from '../../reducers/project.action'

const Header = ({ user, project }) => {
    const [liked, setLiked] = useState(false)
    const [followed, setFollowed] = useState(false)
    const [share, setShare] = useState(false)
    const dispatch = useDispatch()

    /**
     * 
     */

    useEffect(() => {
        if (project.likers.includes(user._id))
            setLiked(true)
        else setLiked(false)
    }, [project.likers, user._id])

    const like = () => {
        dispatch(likeProject(project._id, user._id))
        setLiked(true)
    }
    const unlike = () => {
        dispatch(unlikeProject(project._id, user._id))
        setLiked(false)
    }

    /**
     * 
     */

    useEffect(() => {
        if (user._id)
            if (project.followers.includes(user._id))
                setFollowed(true)
            else setFollowed(false)
    }, [project.followers, user._id])

    const follow = () => {
        dispatch(followProject(project._id, user._id))
        setFollowed(true)
    }
    const unfollow = () => {
        dispatch(unfollowProject(project._id, user._id))
        setFollowed(false)
    }

    /**
     * 
     */

    return (
        <div className="project-page_header">
            <img className='mobile-img' src={project.pictures[0]} alt={project.title} />
            <div className="container-lg">
                <div className="header-title">
                    <h1>{project.title}</h1>
                    <p>{project.category}</p>
                </div>
                <div className="header-inner row">
                    <div className="col-12 col-lg-7 z-10">
                        <div className="project-picture" style={fullImage(project.pictures[0])}></div>
                        <div className="project-infos">
                            <Link to={"/" + project.poster.pseudo} className="flex items-center bold ml-2">
                                <MediumAvatar pic={project.poster.picture} className="mr-2" />
                                {project.poster.pseudo}
                            </Link>
                            <div>Posté le {dateParser(project.createdAt)}</div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-5 order-1">
                        <h2>{project.subtitle}</h2>
                        <div className="py-2">
                            <div className="flex items-center py-1">
                                <Icon name="Position" className="mr-2 w-5 h-5" />
                                <Link to={`/search/?location=${project.location.city}`} className="bold">
                                    {project.location.city} ({project.location.code_department})
                                </Link>
                            </div>
                            {project.day &&
                                <div className="flex items-center py-1">
                                    <Icon name="Calendar" className="mr-2 w-5 h-5" />
                                    <p>Le <span className="font-medium">{dateParser(project.day)}</span></p>
                                </div>
                            }
                            {project.start && !project.end &&
                                <div className="flex items-center py-1">
                                    <Icon name="Calendar" className="mr-2 w-5 h-5" />
                                    <p>Commence le <span className="font-medium">{dateParser(project.start)}</span></p>
                                </div>
                            }
                            {project.end && !project.start &&
                                <div className="flex items-center py-1">
                                    <Icon name="Calendar" className="mr-2 w-5 h-5" />
                                    <p>Jusqu'au <span className="font-medium">{dateParser(project.end)}</span></p>
                                </div>
                            }
                            {project.end && project.start &&
                                <div className="flex items-center py-1">
                                    <Icon name="Calendar" className="mr-2 w-5 h-5" />
                                    <p>Du <span className="font-medium">{dateParser(project.start)}</span> au <span className="font-medium">{dateParser(project.end)}</span></p>
                                </div>
                            }

                            <div className="project-infos_mobile">
                                <Link to={"/" + project.poster.pseudo}>
                                    <MediumAvatar pic={project.poster.picture} className="mr-2" />
                                    {project.poster.pseudo}
                                </Link>
                                <div className='flex items-center'>
                                    Posté le {dateParser(project.createdAt)}
                                </div>
                            </div>
                        </div>
                        <Button className="join-btn">
                            Rejoindre le projet
                        </Button>
                        <div className="project-tags">
                            {project.tags.map((tag, i) => {
                                return <div className="tag" key={i}><span>#</span>{tag}</div>
                            })}
                        </div>
                        <div className="project-page_actions">
                            {user._id === null &&
                                <Button className="action-btn like">
                                    Soutenir <Icon name="Heart" />
                                </Button>
                            }
                            {user._id && !liked ? (
                                <Button className="action-btn like" onClick={like}>
                                    Soutenir <Icon name="Heart" />
                                </Button>
                            ) : (
                                <Button className="action-btn like" onClick={unlike}>
                                    Ne plus soutenir <Icon name="Heart" />
                                </Button>
                            )}
                            {user._id === null &&
                                <Button className="action-btn follow">
                                    Suivre <Icon name="Bookmark" />
                                </Button>
                            }
                            {user._id && !followed ? (
                                <Button className="action-btn follow" onClick={follow}>
                                    Suivre <Icon name="Bookmark" />
                                </Button>
                            ) : (
                                <Button className="action-btn follow" onClick={unfollow}>
                                    Ne plus suivre <Icon name="Bookmark" />
                                </Button>
                            )}

                            <Button className="action-btn share" onClick={() => setShare(!share)}>
                                Partager <Icon name="Share" />
                            </Button>
                        </div>
                    </div>
                </div>
                <Share share={share} />
            </div>
        </div>
    )
}

export default Header