import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { dateParser } from '../../Utils'
import { projectPicture } from '../../tools/functions/useAvatar'
import { followProject, likeProject, unfollowProject, unlikeProject } from '../../../actions/project.action'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { MdOutlineBookmark, MdOutlineBookmarkBorder } from 'react-icons/md'
import { FiMapPin } from 'react-icons/fi'
import { FiCalendar } from 'react-icons/fi'
import { SmallAvatar } from '../../tools/components/Avatars'

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
        <div className="header content_box !pt-14">
            <div className="header-top">
                <h1>{project.title}</h1>
                <p>{project.category}</p>
            </div>
            <div className="header-inner">
                <div className="header_left">
                    <div className="header-img" style={projectPicture(project.pictures[0])}></div>
                    <div className="header_right-bottom">
                        <div><p>Créé par</p><Link to={"/" + project.posterPseudo}> <SmallAvatar pic={project.posterAvatar} /> {project.posterPseudo}</Link></div>
                        <div>le {dateParser(project.createdAt)}</div>
                    </div>
                </div>
                <div className="header_right">
                    <h2>{project.subtitle}</h2>
                    <div className="infos">
                        <div className="infos-content">
                            <FiMapPin /> <p><Link to="/">{project.location} ({project.code_department})</Link></p>
                        </div>
                        {project.start && !project.end &&
                            <div className="infos-content">
                                <FiCalendar /> <p>le <span>{dateParser(project.start)}</span></p>
                            </div>
                        }
                        {project.end && !project.start &&
                            <div className="infos-content">
                                <FiCalendar /> <p>jusqu'au <span>{dateParser(project.end)}</span></p>
                            </div>
                        }
                        {project.end && project.start &&
                            <div className="infos-content">
                                <FiCalendar /> <p>du <span>{dateParser(project.start)}</span> au <span>{dateParser(project.end)}</span></p>
                            </div>
                        }
                    </div>
                    <div className="btn join-btn">Rejoindre le projet</div>
                    <div className="project-tags">
                        {project.tags.map((tag, i) => {
                            return <div className="tag" key={i}><span>#</span> {tag}</div>
                        })}
                    </div>
                    <div className="actions">
                        {user._id === null && <button className="btn action-btn like">Soutenir <IoHeartOutline /></button>}
                        {user._id && !liked && <button className="btn action-btn like" onClick={like}>Soutenir <IoHeartOutline /></button>}
                        {user._id && liked && <button className="btn action-btn like" onClick={unlike}>Ne plus soutenir <IoHeart /></button>}
                        {user._id === null && <button className="btn action-btn follow">Suivre <MdOutlineBookmarkBorder /></button>}
                        {user._id && !followed && <button className="btn action-btn follow" onClick={follow}>Suivre <MdOutlineBookmarkBorder /></button>}
                        {user._id && followed && <button className="btn action-btn follow" onClick={unfollow}>Ne plus suivre <MdOutlineBookmark /></button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header