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
        <div className="header lg:pt-14">
            <img className="block lg:hidden h-auto max-h-[430px] object-cover w-full" src={project.pictures[0]} alt={project.title} />
            <div className="container-lg">
                <div className="mx-auto py-4 lg:py-7 relative text-left lg:text-center">
                    <h1 className="text-[28px] lg:text-[36px] bold">{project.title}</h1>
                    <p className="text-[16px]">{project.category}</p>
                </div>
                <div className="header-inner row relative xl:px-7 py-3">
                    <div className="col-12 col-lg-7 z-10 order-2 lg:order-1">
                        <div className="hidden lg:block h-[350px] w-full relative" style={projectPicture(project.pictures[0])}></div>
                        <div className="header_left-bottom txt-sec flex justify-between py-3">
                            <div>
                                <p>Créé par</p>
                                <Link to={"/" + project.posterPseudo} className="flex items-center bold">
                                    <SmallAvatar pic={project.posterAvatar} className="mr-2" />
                                    {project.posterPseudo}
                                </Link>
                            </div>
                            <div>le {dateParser(project.createdAt)}</div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-5 order-1 lg:order-2 lg:pl-7">
                        <h2 className="txt-prim text-[16px] max-w-[700px]">{project.subtitle}</h2>
                        <div className="py-2">
                            <div className="flex items-center py-1 txt-prim">
                                <FiMapPin className="mr-2" /> <p><Link to="/" className="bold">{project.location} ({project.code_department})</Link></p>
                            </div>
                            {project.start && !project.end &&
                                <div className="flex items-center py-1 txt-prim">
                                    <FiCalendar className="mr-2 txt-sec" /> <p>le <span className="bold">{dateParser(project.start)}</span></p>
                                </div>
                            }
                            {project.end && !project.start &&
                                <div className="flex items-center py-1 txt-prim">
                                    <FiCalendar className="mr-2 txt-sec" /> <p>jusqu'au <span className="bold">{dateParser(project.end)}</span></p>
                                </div>
                            }
                            {project.end && project.start &&
                                <div className="flex items-center py-1 txt-prim">
                                    <FiCalendar className="mr-2 txt-sec" /> <p>du <span className="bold">{dateParser(project.start)}</span> au <span>{dateParser(project.end)}</span></p>
                                </div>
                            }
                        </div>
                        <div className="btn join-btn">Rejoindre le projet</div>
                        <div className="project-tags">
                            {project.tags.map((tag, i) => {
                                return <div className="tag" key={i}><span>#</span> {tag}</div>
                            })}
                        </div>
                        <div className="flex pt-5">
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
        </div>
    )
}

export default Header