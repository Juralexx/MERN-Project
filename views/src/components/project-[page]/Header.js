import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { dateParser, fullImage } from '../Utils'
import { MediumAvatar } from '../tools/global/Avatars'
import Share from './Share'
import { followProject, likeProject, unfollowProject, unlikeProject } from '../../actions/project.action'
import Icon from '../tools/icons/Icon'

const Header = ({ user, project }) => {
    const [liked, setLiked] = useState(false)
    const [followed, setFollowed] = useState(false)
    const [share, setShare] = useState(false)
    const dispatch = useDispatch()

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
                            <Link to={"/" + project.posterPseudo} className="flex items-center bold ml-2">
                                <MediumAvatar pic={project.posterAvatar} className="mr-2" />
                                {project.posterPseudo}
                            </Link>
                            <div>le {dateParser(project.createdAt)}</div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-5 order-1">
                        <h2>{project.subtitle}</h2>
                        <div className="py-2">
                            <div className="flex items-center py-1">
                                <Icon name="Position" className="mr-2 w-5 h-5" />
                                <p><Link to="/" className="bold">{project.location} ({project.code_department})</Link></p>
                            </div>
                            {project.start && !project.end &&
                                <div className="flex items-center py-1">
                                    <Icon name="Calendar" className="mr-2 w-5 h-5" />
                                    <p>le <span className="bold">{dateParser(project.start)}</span></p>
                                </div>
                            }
                            {project.end && !project.start &&
                                <div className="flex items-center py-1">
                                    <Icon name="Calendar" className="mr-2 w-5 h-5" />
                                    <p>jusqu'au <span className="bold">{dateParser(project.end)}</span></p>
                                </div>
                            }
                            {project.end && project.start &&
                                <div className="flex items-center py-1">
                                    <Icon name="Calendar" className="mr-2 w-5 h-5" />
                                    <p>du <span className="bold">{dateParser(project.start)}</span> au <span className="bold">{dateParser(project.end)}</span></p>
                                </div>
                            }

                            <div className="project-infos_mobile">
                                <Link to={"/" + project.posterPseudo}>
                                    <MediumAvatar pic={project.posterAvatar} className="mr-2" />
                                    {project.posterPseudo}
                                </Link>
                                <div className='flex items-center'>le {dateParser(project.createdAt)}</div>
                            </div>
                        </div>
                        <div className="btn join-btn">Rejoindre le projet</div>
                        <div className="project-tags">
                            {project.tags.map((tag, i) => {
                                return <div className="tag" key={i}><span>#</span>{tag}</div>
                            })}
                        </div>
                        <div className="project-page_actions">
                            {user._id === null &&
                                <button className="btn action-btn">
                                    Soutenir <Icon name="Like" />
                                </button>
                            }
                            {user._id && !liked &&
                                <button className="btn action-btn" onClick={like}>
                                    Soutenir <Icon name="Like" />
                                </button>
                            }
                            {user._id && liked &&
                                <button className="btn action-btn" onClick={unlike}>
                                    Ne plus soutenir <Icon name="Like" />
                                </button>
                            }
                            {user._id === null &&
                                <button className="btn action-btn">
                                    Suivre <Icon name="Bookmark" />
                                </button>
                            }
                            {user._id && !followed &&
                                <button className="btn action-btn" onClick={follow}>
                                    Suivre <Icon name="Bookmark" />
                                </button>
                            }
                            {user._id && followed &&
                                <button className="btn action-btn" onClick={unfollow}>
                                    Ne plus suivre <Icon name="Bookmark" />
                                </button>}

                            <button className="btn action-btn" onClick={() => setShare(!share)}>
                                Partager <Icon name="Share" />
                            </button>
                        </div>
                    </div>
                </div>
                <Share share={share} />
            </div>
        </div>
    )
}

export default Header