import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { UidContext } from '../../AppContext';
import { likeProject, unlikeProject } from '../../../actions/project.action';
import { IoHeart, IoHeartOutline } from 'react-icons/io5'

const LikersButton = ({ project, onClick }) => {
    const uid = useContext(UidContext)
    const dispatch = useDispatch()
    const [liked, setLiked] = useState(false)
    const [action, setAction] = useState("")
    const like = () => { dispatch(likeProject(project._id, uid)); setLiked(true) }
    const unlike = () => { dispatch(unlikeProject(project._id, uid)); setLiked(false) }

    useEffect(() => {
        if (project.likers.includes(uid)) setLiked(true)
        else setLiked(false)
    }, [project.likers, uid])

    useEffect(() => {
        if (uid) {
            if (project.likers.includes(uid)) {
                if (liked)
                    if (project.likers.length > 1) setAction(`Vous et  ${project.likers.length - 1}`)
                    else if (project.likers.length === 1) setAction("Vous")
                    else if (project.likers.length === 0) setAction("Vous")
                if (!liked) setAction(project.likers.length - 1)
            }
            else {
                if (liked)
                    if (project.likers.length > 1) setAction(`Vous et  ${project.likers.length}`)
                    else if (project.likers.length === 1) setAction("Vous et 1")
                    else if (project.likers.length === 0) setAction("Vous")
                if (!liked) setAction(project.likers.length)
            }
        } else {
            setAction(project.likers.length)
        }
    }, [liked, project.likers, uid])

    return (
        <>
            {uid === null &&
                <div className="action-btn like">
                    <button><IoHeartOutline /></button>
                    <p>{action}</p>
                </div>
            }
            {uid && !liked &&
                <div className="action-btn like">
                    <button onClick={like}><IoHeartOutline /></button>
                    <p onClick={onClick}>{action}</p>
                </div>
            }
            {uid && liked &&
                <div className="action-btn like">
                    <button onClick={unlike}><IoHeart /></button>
                    <p onClick={onClick}>{action}</p>
                </div>
            }
        </>
    )
}

export default LikersButton