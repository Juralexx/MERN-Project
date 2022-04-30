import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { followProject, unfollowProject } from '../../../actions/project.action'
import { MdOutlineBookmark, MdOutlineBookmarkBorder } from 'react-icons/md'


const NoContent = ({ user, project, icon, mainText, text, className }) => {
    const [followed, setFollowed] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (user._id)
            if (project.followers.includes(user._id)) { setFollowed(true) }
            else { setFollowed(false) }
    }, [project.followers, user._id])

    const follow = () => { dispatch(followProject(project._id, user._id)); setFollowed(true) }
    const unfollow = () => { dispatch(unfollowProject(project._id, user._id)); setFollowed(false) }

    return (
        <div className={`${className ? "no_content " + className : "no_content"}`}>
            <div className="svg_container">
                {icon}
            </div>
            <p>{mainText}</p>
            <span>{text}</span>
            {user && user._id === null &&
                <button className="btn action-btn follow">Suivre <MdOutlineBookmarkBorder /></button>
            }
            {user && user._id && !followed &&
                <button className="btn action-btn follow" onClick={follow}>Suivre <MdOutlineBookmarkBorder /></button>
            }
            {user && user._id && followed &&
                <button className="btn action-btn follow" onClick={unfollow}>Ne plus suivre <MdOutlineBookmark /></button>
            }
        </div>
    )
}

export default NoContent