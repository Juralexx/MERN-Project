import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { followProject, unfollowProject } from "../../../actions/project.action";
import { UidContext } from "../../AppContext";
import { MdOutlineBookmarkBorder, MdOutlineBookmark } from 'react-icons/md'

const FollowersButton = ({ project, onClick }) => {
    const uid = useContext(UidContext)
    const [followed, setFollowed] = useState(false)
    const [text, setText] = useState("")
    const dispatch = useDispatch()

    const follow = () => {
        dispatch(followProject(project._id, uid))
        setFollowed(true)
    }
    const unfollow = () => {
        dispatch(unfollowProject(project._id, uid))
        setFollowed(false)
    }

    useEffect(() => {
        if (project.followers.includes(uid))
            setFollowed(true)
        else setFollowed(false)
    }, [project.followers, uid])

    useEffect(() => {
        if (uid) {
            if (project.followers.includes(uid)) {
                if (followed) {
                    if (project.followers.length > 1) {
                        setText(`Vous et  ${project.followers.length - 1}`)
                    } else if (project.followers.length === 1) {
                        setText("Vous")
                    } else if (project.followers.length === 0) {
                        setText("Vous")
                    }
                } else {
                    setText(project.followers.length - 1)
                }
            } else {
                if (followed) {
                    if (project.followers.length > 1) {
                        setText(`Vous et  ${project.followers.length}`)
                    } else if (project.followers.length === 1) {
                        setText("Vous et 1")
                    } else if (project.followers.length === 0) {
                        setText("Vous")
                    }
                } else {
                    setText(project.followers.length)
                }
            }
        } else {
            setText(project.followers.length)
        }
    }, [followed, project.followers, uid])

    return (
        <>
            {uid === null &&
                <div className="action-btn follow">
                    <button>
                        <MdOutlineBookmarkBorder />
                    </button>
                    <p>{text}</p>
                </div>
            }
            {uid &&
                !followed &&
                <div className="action-btn follow">
                    <button onClick={follow}>
                        <MdOutlineBookmarkBorder />
                    </button>
                    <p onClick={onClick}>{text}</p>
                </div>
            }
            {uid &&
                followed &&
                <div className="action-btn follow">
                    <button onClick={unfollow}>
                        <MdOutlineBookmark />
                    </button>
                    <p onClick={onClick}>{text}</p>
                </div>
            }
        </>
    )
}

export default FollowersButton;