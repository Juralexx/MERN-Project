import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { followProject, unfollowProject } from "../../../actions/project.action";
import { UidContext } from "../../AppContext";
import { MdOutlineBookmarkBorder, MdOutlineBookmark } from 'react-icons/md'
import { IconToggle } from "./Button";

const FollowersButton = ({ project, onClick }) => {
    const uid = useContext(UidContext)
    const [followed, setFollowed] = useState(false)
    const [action, setAction] = useState("")
    const dispatch = useDispatch()
    const follow = () => { dispatch(followProject(project._id, uid)); setFollowed(true) }
    const unfollow = () => { dispatch(unfollowProject(project._id, uid)); setFollowed(false) }

    useEffect(() => {
        if (uid)
            if (project.followers.includes(uid)) { setFollowed(true) }
            else { setFollowed(false) }
    }, [project.followers, uid])

    useEffect(() => {
        if (uid) {
            if (project.followers.includes(uid)) {
                if (followed)
                    if (project.followers.length > 1) setAction(`Vous et  ${project.followers.length - 1}`)
                    else if (project.followers.length === 1) setAction("Vous")
                    else if (project.followers.length === 0) setAction("Vous")
                if (!followed) setAction(project.followers.length - 1)
            } else {
                if (followed)
                    if (project.followers.length > 1) setAction(`Vous et  ${project.followers.length}`)
                    else if (project.followers.length === 1) setAction("Vous et 1")
                    else if (project.followers.length === 0) setAction("Vous")
                if (!followed) setAction(project.followers.length)
            }
        } else {
            setAction(project.followers.length)
        }
    }, [followed, project.followers, uid])

    return (
        <>
            {uid === null &&
                <div className="action-btn follow">
                    <IconToggle icon={<MdOutlineBookmarkBorder />} />
                    <p>{action}</p>
                </div>
            }
            {uid && !followed &&
                <div className="action-btn follow">
                    <IconToggle icon={<MdOutlineBookmarkBorder />} onClick={follow} />
                    <p onClick={onClick}>{action}</p>
                </div>
            }
            {uid && followed &&
                <div className="action-btn follow">
                    <IconToggle icon={<MdOutlineBookmark />} onClick={unfollow} />
                    <p onClick={onClick}>{action}</p>
                </div>
            }
        </>
    )
}

export default FollowersButton;