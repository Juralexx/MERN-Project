import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { UidContext } from '../../AppContext';
import { likeProject, unlikeProject } from '../../../actions/project.action';
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { IconToggle } from "./Button";

const LikersButton = ({ project, onClick }) => {
    const uid = useContext(UidContext)
    const dispatch = useDispatch()
    const [liked, setLiked] = useState(false)
    const [action, setAction] = useState("")
    const like = () => { dispatch(likeProject(project._id, uid)); setLiked(true) }
    const unlike = () => { dispatch(unlikeProject(project._id, uid)); setLiked(false) }

    useEffect(() => {
        if (project.likers.includes(uid)) { setLiked(true) }
        else { setLiked(false) }
    }, [project.likers, uid])

    useEffect(() => {
        if (project.likers.includes(uid)) {
            if (liked) {
                if (project.likers.length > 1)
                    setAction(<span>Vous et {project.likers.length - 1}</span>)
                if (project.likers.length === 1)
                    setAction(<span>Vous</span>)
                if (project.likers.length === 0)
                    setAction(<span>Vous</span>)
            }
            if (!liked) { setAction(<span>{project.likers.length - 1}</span>) }
        }
        else {
            if (liked) {
                if (project.likers.length > 1)
                    setAction(<span>Vous et {project.likers.length}</span>)
                if (project.likers.length === 1)
                    setAction(<span>Vous et 1</span>)
                if (project.likers.length === 0)
                    setAction(<span>Vous</span>)
            }
            if (!liked) { setAction(<span>{project.likers.length}</span>) }
        }
    }, [liked, project.likers, uid])

    return (
        <>
            {uid === null && (
                <div className="relative flex items-center">
                    <IconToggle icon={<IoHeartOutline className="w-6 h-6 stroke-title" />} hoverColor="bg-title/50" />
                    <p>{action}</p>
                </div>
            )}
            {uid && !liked && (
                <div className="relative flex items-center">
                    <IconToggle icon={<IoHeartOutline className="w-6 h-6 stroke-title" />} hoverColor="bg-title/50" onClick={like} />
                    <p onClick={onClick}>{action}</p>
                </div>
            )}
            {uid && liked && (
                <div className="relative flex items-center">
                    <IconToggle icon={<IoHeart className="w-6 h-6 fill-title" />} color="title" onClick={unlike} />
                    <p onClick={onClick}>{action}</p>
                </div>
            )}
        </>
    )
}

export default LikersButton