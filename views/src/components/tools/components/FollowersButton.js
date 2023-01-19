import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Icon from "../icons/Icon";
import { UidContext } from "../../AppContext";
import { followProject, unfollowProject } from "../../../reducers/project.action";

const FollowersButton = ({ project, onClick }) => {
    const uid = useContext(UidContext)
    const [followed, setFollowed] = useState(false)
    const [text, setText] = useState("")
    const dispatch = useDispatch()

    /**
     * 
     */

    const follow = () => {
        if (project.poster._id !== uid) {
            dispatch(followProject(project._id, uid))
            setFollowed(true)
        }
    }
    const unfollow = () => {
        if (project.poster._id !== uid) {
            dispatch(unfollowProject(project._id, uid))
            setFollowed(false)
        }
    }

    /**
     * 
     */

    useEffect(() => {
        if (project.followers.includes(uid))
            setFollowed(true)
        else setFollowed(false)
    }, [project.followers, uid])

    /**
     * 
     */

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

    /**
     * 
     */

    return (
        <>
            {uid === null &&
                <div className="action-btn follow">
                    <Link to='/login'>
                        <Icon name="Bookmark" />
                        <p>{text}</p>
                    </Link>
                </div>
            }
            {uid &&
                !followed &&
                <div className="action-btn follow">
                    <button onClick={follow}>
                        <Icon name="Bookmark" />
                        <p onClick={onClick}>{text}</p>
                    </button>
                </div>
            }
            {uid &&
                followed &&
                <div className="action-btn follow">
                    <button onClick={unfollow}>
                        <Icon name="Bookmark" />
                        <p onClick={onClick}>{text}</p>
                    </button>
                </div>
            }
        </>
    )
}

export default FollowersButton;