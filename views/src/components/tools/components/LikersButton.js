import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { UidContext } from '../../AppContext';
import { likeProject, unlikeProject } from '../../../actions/project.action';
import Icon from "../icons/Icon";

const LikersButton = ({ project, onClick }) => {
    const uid = useContext(UidContext)
    const dispatch = useDispatch()
    const [liked, setLiked] = useState(false)
    const [text, setText] = useState("")

    const like = () => { 
        dispatch(likeProject(project._id, uid))
        setLiked(true)
    }
    const unlike = () => {
        dispatch(unlikeProject(project._id, uid))
        setLiked(false)
    }

    useEffect(() => {
        if (project.likers.includes(uid))
            setLiked(true)
        else setLiked(false)
    }, [project.likers, uid])

    useEffect(() => {
        if (uid) {
            if (project.likers.includes(uid)) {
                if (liked) {
                    if (project.likers.length > 1) {
                        setText(`Vous et  ${project.likers.length - 1}`)
                    } else if (project.likers.length === 1) {
                        setText("Vous")
                    } else if (project.likers.length === 0) {
                        setText("Vous")
                    }
                } else {
                    setText(project.likers.length - 1)
                }
            }
            else {
                if (liked) {
                    if (project.likers.length > 1) {
                        setText(`Vous et  ${project.likers.length}`)
                    } else if (project.likers.length === 1) {
                        setText("Vous et 1")
                    } else if (project.likers.length === 0) {
                        setText("Vous")
                    }
                } else {
                    setText(project.likers.length)
                }
            }
        } else {
            setText(project.likers.length)
        }
    }, [liked, project.likers, uid])

    return (
        <>
            {uid === null &&
                <div className="action-btn like">
                    <Link to='/login'>
                        <Icon name="Like" />
                    </Link>
                    <p>{text}</p>
                </div>
            }
            {uid &&
                !liked &&
                <div className="action-btn like">
                    <button onClick={like}>
                        <Icon name="Like" />
                    </button>
                    <p onClick={onClick}>{text}</p>
                </div>
            }
            {uid &&
                liked &&
                <div className="action-btn like">
                    <button onClick={unlike}>
                        <Icon name="Like" />
                    </button>
                    <p onClick={onClick}>{text}</p>
                </div>
            }
        </>
    )
}

export default LikersButton