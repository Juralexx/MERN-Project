import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { followProject, unfollowProject } from "../../../actions/project.action";
import { UidContext } from "../../AppContext";
import { MdOutlineBookmarkBorder, MdOutlineBookmark } from 'react-icons/md'
import { IconToggle } from "./Button";

const FollowersButton = ({ project, onClick }) => {
    const uid = useContext(UidContext)
    const dispatch = useDispatch()
    const [followed, setFollowed] = useState(false)
    const [action, setAction] = useState("")
    const follow = () => { dispatch(followProject(project._id, uid)); setFollowed(true) }
    const unfollow = () => { dispatch(unfollowProject(project._id, uid)); setFollowed(false) }

    useEffect(() => {
        if (uid) {
            if (project.followers.includes(uid)) { setFollowed(true) }
            else { setFollowed(false) }
        }
    }, [project.followers, uid])

    useEffect(() => {
        if (uid) {
            if (project.followers.includes(uid)) {
                if (followed) {
                    if (project.followers.length > 1)
                        setAction(<span>Vous et {project.followers.length - 1} personnes</span>)
                    if (project.followers.length === 1)
                        setAction(<span>Vous</span>)
                    if (project.followers.length === 0)
                        setAction(<span>Vous</span>)
                }
                if (!followed) { setAction(<span>{project.followers.length - 1}</span>) }
            } else {
                if (followed) {
                    if (project.followers.length > 1)
                        setAction(<span>Vous et {project.followers.length} personnes</span>)
                    if (project.followers.length === 1)
                        setAction(<span>Vous et 1 personne</span>)
                    if (project.followers.length === 0)
                        setAction(<span>Vous</span>)
                }
                if (!followed) { setAction(<span>{project.followers.length}</span>) }
            }
        } else {
            setAction(<span>{project.followers.length}</span>)
        }
    }, [followed, project.followers, uid])

    return (
        <>
            {uid === null && (
                <div className="relative flex items-center">
                    <IconToggle icon={<MdOutlineBookmarkBorder className="w-6 h-6 fill-follow" />} color="yellow-400" />
                    <p>{action}</p>
                </div>
            )}
            {uid && !followed && (
                <div className="relative flex items-center">
                    <IconToggle icon={<MdOutlineBookmarkBorder className="w-6 h-6 fill-follow" />} color="yellow-400" onClick={follow} />
                    <p onClick={onClick}>{action}</p>
                </div>
            )}
            {uid && followed && (
                <div className="relative flex items-center">
                    <IconToggle icon={<MdOutlineBookmark className="w-6 h-6 fill-follow" />} color="yellow-400" onClick={unfollow} />
                    <p onClick={onClick}>{action}</p>
                </div>
            )}
        </>
    )
}

export default FollowersButton;