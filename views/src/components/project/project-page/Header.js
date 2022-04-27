import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { dateParser } from '../../Utils'
import { projectPicture } from '../../tools/functions/useAvatar'
import { followProject, likeProject, unfollowProject, unlikeProject } from '../../../actions/project.action'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { MdOutlineBookmark, MdOutlineBookmarkBorder } from 'react-icons/md'
import { FiMapPin } from 'react-icons/fi'
import { FiCalendar } from 'react-icons/fi'

const Header = ({ user, project }) => {
    const [liked, setLiked] = useState(false)
    const [followed, setFollowed] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (project.likers.includes(user._id)) setLiked(true)
        else setLiked(false)
    }, [project.likers, user._id])

    const like = () => { dispatch(likeProject(project._id, user._id)); setLiked(true) }
    const unlike = () => { dispatch(unlikeProject(project._id, user._id)); setLiked(false) }

    useEffect(() => {
        if (user._id)
            if (project.followers.includes(user._id)) { setFollowed(true) }
            else { setFollowed(false) }
    }, [project.followers, user._id])

    const follow = () => { dispatch(followProject(project._id, user._id)); setFollowed(true) }
    const unfollow = () => { dispatch(unfollowProject(project._id, user._id)); setFollowed(false) }

    return (
        <div className="header">
            <div className="content-box">
                <div className="header-top">
                    <h1>{project.title}</h1>
                    <p>{project.category}</p>
                </div>
                <div className="header-inner">
                    <div className="header-left" style={projectPicture(project.pictures[0])}></div>
                    <div className="header-right">
                        <h2>{project.subtitle}</h2>
                        <p>Créé par <Link to={"/" + project.posterPseudo}>{project.posterPseudo}</Link></p>
                        <div className="infos">
                            <div className="infos-content"><FiMapPin /> <Link to="/">{project.location} ({project.code_department})</Link></div>
                            <div className="infos-content"><FiCalendar /> {dateParser(project.createdAt)}</div>
                        </div>
                        <div className="project-tags">
                            {project.tags.map((tag, i) => {
                                return <div className="tag" key={i}><span>#</span> {tag}</div>
                            })}
                        </div>
                        <div className="actions">
                            {user._id === null &&
                                <button className="btn action-btn like">Soutenir <IoHeartOutline /></button>
                            }
                            {user._id && !liked &&
                                <button className="btn action-btn like" onClick={like}>Soutenir <IoHeartOutline /></button>
                            }
                            {user._id && liked &&
                                <button className="btn action-btn like" onClick={unlike}>Ne plus soutenir <IoHeart /></button>
                            }
                            {user._id === null &&
                                <button className="btn action-btn follow">Suivre <MdOutlineBookmarkBorder /></button>
                            }
                            {user._id && !followed &&
                                <button className="btn action-btn follow" onClick={follow}>Suivre <MdOutlineBookmarkBorder /></button>
                            }
                            {user._id && followed &&
                                <button className="btn action-btn follow" onClick={unfollow}>Ne plus suivre <MdOutlineBookmark /></button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header